/*2020.11.11 只要template_process_indicator表中的字段有sort,result中就必定有他的一个位置,
但存数据是用sort遍历的下标+1来存取或判断,sort只用来排序*/
// var evaluationHost =apiGateWayHost+"/configcenter/",
const zuulHost =apiGateWayHost,
      zuulHostTest =apiGateWayHostTest;
var selectConfig = [],//记录配置项为单选下拉框的下标
    multiSelectConfig = [],//记录配置项为多选下拉框的下标
    inputConfig = [],//记录配置项为输入框的下标
    numberConfig = [],//记录配置项为数字框的下标
    urlConfig = [],//记录配置项为外链的下标
    textConfig = [],//记录配置项为多行文本框的下标
    fileConfig = [],//记录配置项为附件的下标
    dateConfig = [],//记录配置项为日期的下标
    dateTimeConfig = [],//记录配置项为日期时间的下标
    rangeDateConfig = [],//记录配置项为范围日期的下标
    rangeTimeConfig = [],//记录配置项为范围时间的下标
    rangeDateTimeConfig = [],//记录配置项为范围日期+时间的下标
    localObjectConfig = [],//记录配置项为本地(存在configcenter表)对象的下标
    localObjects = [],//本地(存在configcenter表)对象存储
    radioConfig = [],//记录配置项为单选框的下标
    checkboxConfig = [],//记录配置项为多选框的下标
    evaluationTabConfig = [],//记录配置项为评分项的下标
    tableConfig = [],//记录配置项为数据列表的下标
    evaluationTable = [],//记录父指标项表格id
    evaluationTabTarget = [],//记录所有结果为需要保存的id
    evaluationTabTargetAllType = [],//记录所有指标项选中值
    evaluationTabResult = [],//记录指标项的结果
    auditConfig = [],//记录配置项为审核的下标
    messageConfig = [],//记录配置项为发送短信/邮箱的下标
    taskConfig = [],//记录配置项为支线/任务选择的下标
    localVariableDatas = [],//记录需要用到局部变量的数据
    linkageConfig = [],//记录需要联动的配置项
    textareafullscreens = [],//需要全屏的textarea
    currusername,//當前登錄人的工號
    currcname,//當前登錄人的姓名
    timetableProcessId,//当前对应阶段id
    processKey,//流程引擎key
    processCname,//阶段名称
    submitNoJump = true,//提交完成是否跳转
    msgindex,
    otherStepResult = new Array(),
    otherStepResultFlag = false,
    steps = [],//所有阶段
    submitOrSave = true,//true提交false保存
    linkageType, //需要联动的字段类型
    userStatus = [];//indicator_ename字段的不同身份存储
layui.define(function (e) {
    layui.config({
        base:'../'
    }).extend({
        index:'lib/index',
        // tableEdit:'../layui/lay/modules/tableEdit'
    }).use(['index','table','layer','laydate','form','element','util'],function (){
        var $ = layui.$,
            layer = layui.layer,
            table = layui.table,
            // tableEdit = layui.tableEdit,
            laydate = layui.laydate,
            form = layui.form,
            util = layui.util,
            element = layui.element;
        // $('.quick_line').append('<a>123</a>')
        // var evaluationHost =apiGateWayHost+"/configcenter/",
        var globalVariableInfos,//之前的阶段需要在此阶段再次使用值的指标项(indicatorName一样)
            // step = 2,//當前階段
            isNew = true,//是否需要填写
            isNewStep = true,//是否為當前步驟
            currentStep = 2,//该业务當前階段
            initialStep = 1,//该业务当前真实阶段
                // showConfig = [],//记录查看
            templateInfo,//模板信息
            flagSP = true;
        //阶段总览
        var stepInfo = {
            stepInfo: function() {
                var index = layer.open({
                    type: 2 //此处以iframe举例
                    ,
                    title: '阶段总览',
                    area: ['36%', '100%'],
                    offset: 'r',
                    shade: 0,
                    maxmin: true,
                    content: 'stepInfo?timetableId='+timetableId+'&clientId='+clientId+'&templateId='+templateId+'&step='+step,
                    zIndex: layer.zIndex //重点1
                    ,
                    success: function(layero) {
                        layer.setTop(layero); //重点2
                    }
                });
            }
        };
        $('.stepInfo').on('click', function() {
            var othis = $(this),
                method = othis.data('method');
            stepInfo[method] ? stepInfo[method].call(this, othis) : '';
        });
        getCurrentUser();
        if(timetableId == null){//第一步
            getConfigByTemplateId();
        }else{
            getTimetableById();
        }

        //回到顶部
        // var util1 = util.fixbar({
        //     bgcolor: '#409eff'
        // });
        //当前登录人
        function getCurrentUser(){
            $.ajax({
                url: 'getCurrentUser',
                // dataType: 'json',
                async: false,
                type: 'get',
                success: function (res) {
                    currusername = res.username;
                    currcname = res.cname;
                }
            });
        }
        //获取当前阶段信息
        function getTimetableById() {
            $.ajax({
                url: evaluationHost+'api/timetable/infoById?timetableId='+timetableId,
                // dataType: 'json',
                async: false,
                type: 'get',
                success: function (res) {
                    if(res.code == 200){
                        currentStep = res.data.currentStep;
                        if(step<currentStep){
                            isNew = false;
                            isNewStep = false;
                            $('.nextStep').removeClass('layui-hide');
                            $('.submitStep').addClass('layui-hide');
                            getResultsByTemplateId();
                            util1 = util.fixbar({
                                bgcolor: '#409eff'
                                ,bar1: '&#xe66d;'
                                ,css: {right: 20, bottom: 10}
                                ,click: function(type){
                                    // console.log(type);
                                    if(type === 'bar1'){
                                        layer.confirm('确定打印?', function(index){
                                            layer.close(index);
                                            window.print();
                                            // $('.step-all-info').jqprint();
                                        });
                                    }
                                }
                            });
                        }else if(step == currentStep){
                            getConfigByTemplateId();
                        }
                    }else{
                        layer.msg('获取业务总表失败!')
                    }
                }
            });
        }
        window.jumpStep = function (step,task) {
            window.location.href='stepCircle?timetableId='+timetableId+'&clientId='+clientId+'&templateId='+templateId+'&step='+step;
        };
        //配置项
        function getConfigByTemplateId(){
            var cdata;
            var spData;
            var str = '';
            var tableFlag = false;//是否在填写表单页面展示表格
            // if(step == 1){
            if(!timetableId){
                $('.item_box_limit').html('暂无流转历史');
                $('.stepInfo').hide();
                // $('.saveStep').hide();
                $.ajax({
                    url: evaluationHost+'api/configIndicator/list?templateId='+ templateId +'&step='+ step +'&page=1&limit=999',
                    dataType: 'json',
                    async: false,
                    type: 'get',
                    success: function (res) {
                        // console.log(res);
                        cdata = res.data;
                    },
                    error:function () {
                        alert("获取配置项失败！");
                    }
                });
            }else{
                var spRenderFlag = false;//是否需要获取之前填写的内容(表单编辑赋值)
                var repeatStep = 0;//重复的最后一阶段
                $.ajax({
                    url: evaluationHost+'api/timetable/info?timetableId='+timetableId,
                    dataType: 'json',
                    async: false,
                    type: 'get',
                    success: function (res){
                        // console.log(res);
                        globalVariableInfos = res.data[0].globalVariableInfos;
                        var globalVariableValue;
                        // if(Object.keys(globalVariableInfos).length == 1){
                            for (var key in globalVariableInfos) {
                                if(key.indexOf('|globalVariable|'!=null)){
                                    globalVariableValue = globalVariableInfos[key].configIndicatorCname+'：'+globalVariableInfos[key].result;
                                }
                            }

                        // }
                        // if (JSON.stringify(globalVariableInfos) != JSON.stringify({})){
                        //     $.cookie('globalVariableInfos',globalVariableInfos,{path:"/"})
                        // }
                        var historyStr = '';
                        var historyFlag = true;
                        var historySteps = [];
                        processKey = res.data[0].processKey;
                        let isTaskStep = false;
                        $.each(res.data[0].timetableProcessDTOS,function (index,item){
                            if(historyFlag && item.isChose == 1){
                                historyStr+='<div class="item_box">' +
                                    '<div class="item-header">' +
                                    '<i class="fa fa-dot-circle-o"></i>' +
                                    '</div>' +
                                    '<div class="item-content">';
                                if(item.processStep != step){
                                    // historyStr+='<a class="jump_to_step" onclick="jumpStep('+ item.processStep +')">'+item.processCname+'</a>';
                                    historyStr+='<a class="jump_to_step" >'+item.processCname+'</a>';
                                }else{
                                    // if(parent.taskList.length>0 && item.isChose == 1)
                                    //     historyStr+=item.processCname;
                                    // if(parent.taskList.length == 0)
                                        historyStr+=item.processCname;
                                }
                                historyStr+='</div>' +
                                    '</div>'
                            }
                            if(item.processStep == step && item.isChose == 1 ){
                                initialStep = item.initialStep;
                                if(!isTaskStep){
                                    if((task!=null && item.parallelTask == task) || task == null){
                                    if(historySteps.lastIndexOf(item.initialStep+'_'+item.parallelTask)!=-1){
                                        spRenderFlag = true;
                                        repeatStep = historySteps.lastIndexOf(item.initialStep+'_'+item.parallelTask)+1;
                                    }else if(item.timetableResults.length>0){
                                        spRenderFlag = true;
                                    }
                                    processCname = item.processCname;
                                    if(globalVariableValue){
                                        $('#step_header').html(item.processCname+'<div style="float: right">'+ globalVariableValue +'</div>');
                                    }else{
                                        $('#step_header').html(item.processCname);
                                    }
                                    $.each(item.configIndicators,function (i,d) {
                                        if(d.indicatorName!=null&&d.indicatorName.indexOf('|autoInsert|')!=-1) {//特殊处理的步骤:招募人员列表
                                            tableFlag = true;
                                            otherStepResultFlag = true;
                                            otherStepResult = item.timetableResults;
                                            str+='<div class="layui-row">' +
                                                '<div class="layui-col-lg12">';
                                            str+='<label class="layui-form-label">列表</label>';
                                            str+='<div class="layui-input-block">';
                                            str += specialTemplateConfigInfo(res.data[0],'table',item,step,currusername,'circle');
                                            str+='</div></div></div>'
                                            str+='<div class="layui-form-item tutor-block layui-hide">' +
                                                '<div class="layui-input-block">' +
                                                '<button type="button" id="saveTimetable" class="layui-btn" lay-submit lay-filter="saveTimetable">保存</button>' +
                                                '<button type="reset" class="layui-btn layui-btn-primary">重置</button>' +
                                                '</div>' +
                                                '</div>';
                                        }
                                    });
                                    cdata = item.configIndicators;

                                    spData = res.data[0];
                                    timetableProcessId = item.timetableProcessId;
                                    task = item.parallelTask;
                                    $.each(parent.taskList,function (j,o) {
                                        if(o.step == step && item.isChose == 1){
                                            // $('.quick_line').append(`<a>${o.name}</a>`);
                                            isTaskStep = true;
                                            return false;
                                        }
                                    })
                                    }
                                }
                                if(item.isChose == 1 && (res.data[0].timetableProcessDTOS[index+1]!=null && res.data[0].timetableProcessDTOS[index+1].processStep > step || res.data[0].timetableProcessDTOS[index+1]!=null && res.data[0].timetableProcessDTOS[index+1].processStep == step && res.data[0].timetableProcessDTOS[index+1].isChose == 0  || res.data[0].timetableProcessDTOS[index+1]==null))
                                    historyFlag = false;
                                if(item.parallelTask!=0)
                                $('.quick_line').append(`<a href="stepCircle?timetableId=${timetableId}&clientId=${clientId}&templateId=${templateId}&step=${item.processStep}&task=${item.parallelTask}">${item.processCname}</a>`);
                            }
                            historySteps.push(item.initialStep+'_'+item.parallelTask);
                        });
                        $('.item_box_limit').html(historyStr)
                    },
                    error:function (){
                        alert("获取配置项失败！");
                    }
                });
            }
            if(!tableFlag){
                str += '<input type="hidden" name="id" id="id"/>' ;
                var spValue = [];
                // timetableId = data.data.evaluationTimetable.id;
                $.each(cdata, function (index, item) {
                    spValue.push('evaluationScore'+(index+1));
                    if(item.indicatorEname!=null && item.indicatorEname == 'targetUsers'){
                        userStatus.push({'indicatorEname': 'targetUsers','index': (index + 1)})
                    }else if(item.indicatorEname!=null && item.indicatorEname == 'initiatorUsers'){
                        userStatus.push({'indicatorEname': 'initiatorUsers','index': (index + 1)})
                    }
                    if(item.indicatorName == null){item.indicatorName = ''}
                    if(item.indicatorName.indexOf('|count|')!=-1){
                        flagSP = false;
                        spRenderFlag = false;
                    }
                    if(item.isShow != 2) {
                        if (item.indicatorName != null && item.indicatorName.indexOf('localVariable') != -1) {
                            localVariableDatas.push({index: (index + 1), indicatorName: item.indicatorName});
                        }
                        if (item.indicatorName.indexOf('|each|') == -1) {
                        if (item.contentType == 'select') {
                            let selectObject = new Object();
                            selectObject['index'] = index+1;
                            selectObject['url'] = item.url;
                            selectObject['type'] = item.indicatorName;
                            selectObject['id'] = item.id;
                            selectObject['isRequired'] = item.isRequired;
                            selectObject['configIndicatorDTOS'] = item.configIndicatorDTOS;
                            if (item.indicatorName.indexOf('|linkage') != -1) {
                                for (var j = 0; j < item.indicatorName.split('|').length; j++) {
                                    if (item.indicatorName.split('|')[j].indexOf('linkage') != -1) {
                                        selectObject['parentId'] = item.indicatorName.split('|')[j].replace(/[^0-9]/ig, "");
                                    }
                                }
                                selectObject['linkageType'] = 'select';
                                linkageConfig.push(selectObject);
                            }
                            selectConfig.push(selectObject)
                            str += '<div class="layui-row">' +
                                '<div class="layui-col-lg12">';
                            str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                            str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` +
                                '<select name="evaluationScore' + (index + 1) + '" id="selectConfig' + (index + 1) + '" lay-filter="select' + (index + 1) + '" lay-search="">' +
                                '<option value="">请选择' + item.indicatorCname + '</option>' +
                                '</select>' +
                                '</div></div></div>';
                        } else if (item.contentType == 'multiSelect') {
                            multiSelectConfig.push({index: (index + 1), url: item.url, type: item.indicatorName, isRequired: item.isRequired, configIndicatorDTOS: item.configIndicatorDTOS});
                            str += '<div class="layui-row">' +
                                '<div class="layui-col-lg12">' ;
                            str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                            str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` +
                                '<div id="multiSelectConfig' + (index + 1) + '" class="xm-select-demo"></div>' +
                                '</div></div></div>';
                        } else if (item.contentType == 'input') {
                            inputConfig.push({index: (index + 1), url: item.url, type: item.indicatorName, isRequired: item.isRequired});
                            if (item.indicatorName == 'current' || item.indicatorName.indexOf('|currentLogin|') != -1 || item.indicatorName.indexOf('|current|') != -1) {
                                if(item.indicatorName.indexOf('|currentLogin|') != -1&&!flagSP){spRenderFlag =true;}
                                str += '<div class="layui-row">' +
                                    '<div class="layui-col-lg12">' ;
                                str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                                str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` +
                                    '<input type="text" id="inputConfig' + (index + 1) + '" name="evaluationScore' + (index + 1) + '"  lay-verify="" placeholder="请填写' + item.indicatorCname + '" autocomplete="on" class="layui-input layui-hide" />' +
                                    '<input type="text" id="inputConfigShow' + (index + 1) + '" name="evaluationScoreShow' + (index + 1) + '"  lay-verify="" placeholder="请填写' + item.indicatorCname + '" autocomplete="on" class="layui-input layui-disabled" disabled="" />' +
                                    '</div></div></div>';
                            } else {
                                str += '<div class="layui-row">' +
                                    '<div class="layui-col-lg12">' ;
                                str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                                str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` +
                                    '<input type="text" id="inputConfig' + (index + 1) + '" name="evaluationScore' + (index + 1) + '" placeholder="请填写' + item.indicatorCname + '" autocomplete="on" class="layui-input" />' +
                                    '</div></div></div>';
                            }
                        } else if (item.contentType == 'number') {
                            numberConfig.push({index: (index + 1), type: item.indicatorName, isRequired: item.isRequired});
                            str += '<div class="layui-row">' +
                                '<div class="layui-col-lg12">';
                            str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                            str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` +
                                '<input type="text" onkeyup="onlyNonNegative(this)" id="inputConfig' + (index + 1) + '" name="evaluationScore' + (index + 1) + '" placeholder="请填写' + item.indicatorCname + '" autocomplete="on" class="layui-input" />' +
                                '</div></div></div>';
                        } else if (item.contentType == 'url') {
                            var urlObject = new Object();
                            urlObject['index'] = (index + 1);
                            urlObject['type'] = item.indicatorName;
                            urlObject['id'] = item.id;
                            urlObject['url'] = item.url;
                            urlObject['isRequired'] = item.isRequired;
                            if (item.indicatorName.indexOf('linkage') != -1) {
                                for (var j = 0; j < item.indicatorName.split('|').length; j++) {
                                    if (item.indicatorName.split('|')[j].indexOf('linkage') != -1) {
                                        urlObject['parentId'] = item.indicatorName.split('|')[j].replace(/[^0-9]/ig, "");
                                    }
                                }
                                urlObject['linkageType'] = 'url';
                                linkageConfig.push(urlObject);
                            }
                            urlConfig.push(urlObject);
                            if (item.url == null) {
                                item.url = 'http://www.baidu.com'
                            }
                            str += '<div class="layui-row">' +
                                '<div class="layui-col-lg12">';
                            str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                            str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` ;
                            var globalVariableFlag = false;
                            for (var i = 0; i < item.indicatorName.split('|').length; i++) {
                                if (item.indicatorName.split('|')[i].indexOf('globalVariable') != -1) {//判断是否需要拿到之前步骤所填的参数传给超链接
                                    var globalVariable = '|' + item.indicatorName.split('|')[i] + '|';
                                    for (var key in globalVariableInfos) {
                                        if (globalVariable == key) {
                                            globalVariableFlag = true;
                                            let u = item.url.indexOf('?') == -1 ? `${item.url}?username=${currentUsername}&globalVariable=${globalVariableInfos[key].result}` : `${item.url}&username=${currentUsername}&globalVariable=${globalVariableInfos[key].result}`
                                            // $.cookie('urlConfig',globalVariableInfos[key],{path:"/",secure:false});
                                            str += '<a id="evaluationScore' + (index + 1) + '" href="' + u + '" target="_blank">点我进入' + item.indicatorCname + '</a>';
                                            break;
                                        }
                                    }
                                }
                            }
                            if (item.indicatorName.indexOf('|pay|') != -1) {//支付必须先提交
                                str += '<a id="evaluationScore' + (index + 1) + '" data="0" onclick="firstSubmit(\'' + item.url + '\',this)" >点我进入' + item.indicatorCname + '</a>';
                            } else if (item.indicatorName.indexOf('|linkage') != -1) {//联动框
                                str += '<a id="evaluationScore' + (index + 1) + '" target="_blank" ></a>';
                            } else if (item.indicatorName.indexOf('|current|') != -1 || item.indicatorName == 'current') {//当前登录
                                str += '<a id="evaluationScore' + (index + 1) + '" target="_blank" >点我进入' + item.indicatorCname + '</a>';
                            } else {
                                if (!globalVariableFlag) {
                                    let u = item.url.indexOf('?') == -1 ? `${item.url}?username=${currentUsername}` : `${item.url}&username=${currentUsername}`
                                    str += '<a id="evaluationScore' + (index + 1) + '" href="' + u + '" target="_blank">点我进入' + item.indicatorCname + '</a>';
                                }
                            }
                            str += '</div></div></div>';
                        } else if (item.contentType == 'text') {
                            var textObject = new Object();
                            textObject['index'] = (index + 1);
                            textObject['type'] = item.indicatorName;
                            textObject['id'] = item.id;
                            textObject['url'] = item.url;
                            textObject['isRequired'] = item.isRequired;
                            // textConfig.push((index+1));
                            if (item.indicatorName.indexOf('linkage') != -1) {
                                for (var j = 0; j < item.indicatorName.split('|').length; j++) {
                                    if (item.indicatorName.split('|')[j].indexOf('linkage') != -1) {
                                        textObject['parentId'] = item.indicatorName.split('|')[j].replace(/[^0-9]/ig, "");
                                    }
                                }
                                textObject['linkageType'] = 'text';
                                // linkageType = 'text';
                                str += '<div class="layui-row">' +
                                    '<div class="layui-col-lg12">';
                                str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                                str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` +
                                    '<textarea type="text"  id="textConfig' + (index + 1) + '" name="evaluationScore' + (index + 1) + '"   placeholder="请填写' + item.indicatorCname + '" autocomplete="on" class="layui-textarea" readonly="" ></textarea>' +
                                    '</div></div></div>';
                                linkageConfig.push(textObject);
                            }else {
                                str += '<div class="layui-row">' +
                                    '<div class="layui-col-lg12">';
                                str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                                str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` +
                                    '<textarea type="text"  id="textConfig' + (index + 1) + '" name="evaluationScore' + (index + 1) + '"   placeholder="请填写' + item.indicatorCname + '" autocomplete="on" class="layui-textarea"></textarea>' +
                                    '</div></div></div>';
                            }
                            textConfig.push(textObject);
                        } else if (item.contentType == 'file') {
                            fileConfig.push({index: (index + 1),isRequired: item.isRequired});
                            str += '<div class="layui-row">' +
                                '<div class="layui-col-lg12">';
                            str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                            str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` +
                                '<button type="button" class="layui-btn" onclick="uploadFileMeeting(' + (index + 1) + ','+ step +')">上传附件</button>' +
                                '<input id="fileUpload' + (index + 1) + '_'+ step +'" name="evaluationScore' + (index + 1) + '" class="layui-input layui-disabled" disabled=""/>' +
                                '</div></div></div>';
                        } else if (item.contentType == 'import') {
                            var importStep = 0;
                            var isOverride = false;
                            for (var j = 0; j < item.indicatorName.split('|').length; j++) {
                                if (item.indicatorName.split('|')[j].indexOf('stepResult') != -1) {
                                    importStep = item.indicatorName.split('|')[j].replace(/[^0-9]/ig, "");
                                }else {
                                    importStep = step;
                                }
                                if(item.indicatorName.split('|')[j].indexOf('override') != -1){
                                    isOverride = true;
                                }
                                // if(item.indicatorName.split('|')[j].indexOf('userInfo') != -1){
                                //     isOverride = true;
                                // }
                            }
                            if(!flagSP){
                                var s = $('#step_header').html();
                                var iorestr = '<div style="float: right;font-weight: normal;font-size: 15px">' +
                                    '<input style="width: 160px" id="importFile' + (index + 1) + '" type="file" accept=\'.xls,.xlsx\'/>' +
                                    `<button type="button" class="layui-btn layui-btn-sm layui-btn-radius layui-btn-normal" onclick="importFile(${(index + 1)},${importStep},${isOverride},${task},'${item.indicatorName}','${item.url}')">${item.indicatorCname}</button>`
                                // '<button class="layui-btn layui-btn-sm layui-btn-radius layui-btn-normal" ' +
                                //     'onclick="importFile(' + (index + 1) + ',' + importStep +',' + isOverride +',' + task + ','+ item.indicatorName +','+ item.url +')">'+ item.indicatorCname +'</button></div>'
                                $('#step_header').html(s+iorestr);
                            }
                            if (flagSP) {
                                str += '<div class="layui-row">' +
                                    '<div class="layui-col-lg12">';
                                str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                                str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` +
                                    '<input style="width: 160px" id="importFile' + (index + 1) + '" type="file" accept=\'.xls,.xlsx\'/>' +
                                    `<button type="button" class="layui-btn" onclick="importFile(${(index + 1)},${importStep},${isOverride},${task},'${item.indicatorName}','${item.url}')">导入</button>` +
                                    // '<input id="import'+ (index+1) +'" class="layui-input layui-disabled" disabled=""/>' +
                                    '</div></div></div>';
                            }
                        } else if (item.contentType == 'export') {
                            if (step != 1&&flagSP) {
                                var importStep = 0;
                                for (var j = 0; j < item.indicatorName.split('|').length; j++) {
                                    if (item.indicatorName.split('|')[j].indexOf('stepResult') != -1) {
                                        importStep = item.indicatorName.split('|')[j].replace(/[^0-9]/ig, "");
                                    }else {
                                        importStep = step;
                                    }
                                }
                                str += '<div class="layui-row">' +
                                    '<div class="layui-col-lg12">' ;
                                str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                                str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` +
                                    '<button type="button" class="layui-btn" onclick="exportFile(' + (index + 1) + ',' + importStep+ ',' + task + ')">导出</button>' +
                                    // '<input id="export'+ (index+1) +'" class="layui-input layui-disabled" disabled=""/>' +
                                    '</div></div></div>';
                            }
                        } else if (item.contentType == 'date') {
                            dateConfig.push({index:index+1,indicatorName: item.indicatorName,isRequired: item.isRequired});
                            if(item.indicatorName.indexOf('|currentDate|') != -1&&!flagSP){spRenderFlag =true;}
                            str += '<div class="layui-row">' +
                                '<div class="layui-col-lg12">';
                            str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                            str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` +
                                '<input type="text" id="dateConfig' + (index + 1) + '" name="evaluationScore' + (index + 1) + '"  placeholder="请选择' + item.indicatorCname + '" autocomplete="off" class="layui-input" />' +
                                '</div></div></div>';
                        } else if (item.contentType == 'dateTime') {
                            dateTimeConfig.push({index:index+1,indicatorName: item.indicatorName,isRequired: item.isRequired});
                            str += '<div class="layui-row">' +
                                '<div class="layui-col-lg12">';
                            str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                            str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` +
                                '<input type="text" id="dateTimeConfig' + (index + 1) + '" name="evaluationScore' + (index + 1) + '" placeholder="请选择' + item.indicatorCname + '" autocomplete="off" class="layui-input" />' +
                                '</div></div></div>';
                        } else if (item.contentType == 'rangeDate') {
                            rangeDateConfig.push({index:index+1,indicatorName: item.indicatorName,isRequired: item.isRequired});
                            str += '<div class="layui-row">' +
                                '<div class="layui-col-lg12">' ;
                            str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                            str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` +
                                '<input type="text" id="rangeDateConfig' + (index + 1) + '" name="evaluationScore' + (index + 1) + '" placeholder="请选择' + item.indicatorCname + '" autocomplete="off" class="layui-input" />' +
                                '</div></div></div>';
                        } else if (item.contentType == 'rangeTime') {
                            rangeTimeConfig.push({index:index+1,indicatorName: item.indicatorName,isRequired: item.isRequired});
                            str += '<div class="layui-row">' +
                                '<div class="layui-col-lg12">';
                            str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                            str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` +
                                '<input type="text" id="rangeTimeConfig' + (index + 1) + '" name="evaluationScore' + (index + 1) + '" placeholder="请选择' + item.indicatorCname + '" autocomplete="off" class="layui-input" />' +
                                '</div></div></div>';
                        } else if (item.contentType == 'rangeDateTime') {
                            rangeDateTimeConfig.push({index:index+1,indicatorName: item.indicatorName,isRequired: item.isRequired});
                            str += '<div class="layui-row">' +
                                '<div class="layui-col-lg12">';
                            str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                            str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` +
                                '<input type="text" id="rangeDateTimeConfig' + (index + 1) + '" name="evaluationScore' + (index + 1) + '" placeholder="请选择' + item.indicatorCname + '" autocomplete="off" class="layui-input" />' +
                                '</div></div></div>';
                        } else if (item.contentType == 'radio') {
                            radioConfig.push({index:index+1,indicatorName: item.indicatorName,isRequired: item.isRequired});
                            if (item.indicatorName.indexOf('audit')!=-1) {
                                $('.stepInfo').click();
                                auditConfig.push((index + 1));
                            } else if (item.indicatorName.indexOf('|message|')!=-1){
                                messageConfig.push((index + 1));
                            }
                            str += '<div class="layui-row">' +
                                '<div class="layui-col-lg12">';
                            str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                            str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` ;
                            if(item.indicatorOptions ==  null||item.indicatorOptions==''){
                                str+='<input type="radio" name="evaluationScore' + (index + 1) + '" value="合格" title="合格">' +
                                '<input type="radio" name="evaluationScore' + (index + 1) + '" value="不合格" title="不合格" checked>';
                            }else{
                                var options = item.indicatorOptions.indexOf(',')!=-1?item.indicatorOptions.split(','):item.indicatorOptions.split('，');
                                $.each(options,function (j,o) {
                                    str+='<input type="radio" name="evaluationScore' + (index + 1) + '" value="'+ (j+1) +'" title="'+ o +'">'
                                })
                            }
                                // '<input type="text" id="isAudit'+ templateId +'" name="isAudit'+ templateId +'"  lay-verify="required" placeholder="请选择'+ item.indicatorCname +'" autocomplete="off" class="layui-input" />' +
                            str+='</div></div></div>';
                        } else if (item.contentType == 'checkbox') {
                            checkboxConfig.push({index:index+1,indicatorName: item.indicatorName,isRequired: item.isRequired});
                            str += '<div class="layui-row">' +
                                '<div class="layui-col-lg12">';
                            str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                            str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)" style="padding: 9px 0;">` ;
                            if (item.indicatorName.indexOf('|taskSelect|')!=-1){
                                taskConfig.push((index + 1));
                                console.log(parent.taskList);
                                $.each(parent.taskList,function (i,d) {
                                    if(d.step == (initialStep+1))
                                        str+='<input type="checkbox" lay-skin="primary" name="evaluationScore' + (index + 1) + '" value="'+ d.task +'" title="'+ d.name +'">'
                                })
                            }else{
                                var options = item.indicatorOptions.indexOf(',')!=-1?item.indicatorOptions.split(','):item.indicatorOptions.split('，');
                                $.each(options,function (j,o) {
                                    str+='<input type="checkbox" lay-skin="primary" name="evaluationScore' + (index + 1) + '" value="'+ (j+1) +'" title="'+ o +'">'
                                })
                            }
                                // '<input type="text" id="isAudit'+ templateId +'" name="isAudit'+ templateId +'"  lay-verify="required" placeholder="请选择'+ item.indicatorCname +'" autocomplete="off" class="layui-input" />' +
                            str+='</div>' +
                                // '<span style="color: red">12312312312312312312313213</span>' +
                                '</div></div>';
                        } else if (item.contentType == 'evaluationTab') {
                            evaluationTabConfig.push({index: (index + 1), objects: item, isRequired: item.isRequired});
                            str += '<div class="layui-row">' +
                                '<div class="layui-col-lg12">';
                            str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                            str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` ;
                            if (item.configIndicatorDTOS.length == 0) {
                                str += '<span>所有指标项已合格!</span>'
                            } else {
                                str += '<div class="layui-card-body" style="padding-top: 0">' +
                                    '<div class="layui-tab layui-tab-brief" lay-filter="evaluationTabConfig_' + (index + 1) + '">' +
                                    '<ul class="layui-tab-title">';
                                var tableId;
                                $.each(item.configIndicatorDTOS, function (i1, d1) {
                                    if (objectLevel == 2) {
                                        $.each(d1.configIndicatorDTOS, function (i2, d2) {
                                            evaluationTable.push((index + 1) + '_' + d2.id);
                                            if (i2 == 0) {
                                                tableId = d2.id;
                                                str += ' <li class="layui-this" id="parentTab_' + (index + 1) + '_' + d2.id + '">' + d1.indicatorCname + ':' + d2.indicatorCname + '</li>';
                                            } else {
                                                str += ' <li id="parentTab_' + (index + 1) + '_' + d2.id + '">' + d1.indicatorCname + ':' + d2.indicatorCname + '</li>';
                                            }
                                        })
                                    }
                                });
                                str += '</ul>' +
                                    '<div class="layui-tab-content">' +
                                    '<div class="layui-tab-item layui-show layui-tab-' + (index + 1) + '">' +
                                    '<table class="layui-hide add_progress" id="evaluationTable_' + (index + 1) + '_' + tableId + '" lay-filter="evaluationTable_' + (index + 1) + '_' + tableId + '"></table>';
                                // ' <script type="text/html" id="toolbar_'+ (index+1) +'_'+ tableId +'">' +
                                // '<a class="layui-btn layui-btn-xs" lay-event="download">下载</a>' +
                                // '<a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="delete">删除</a>' +
                                // '</script>';
                                str += '</div></div></div></div>';
                            }
                            str += '</div></div></div>';
                        } else if (item.contentType == "localObject") {
                            localObjects.push({
                                index: (index + 1),
                                objects: item.configIndicatorDTOS,
                                isRequired: item.isRequired,
                                indicatorName: item.indicatorName
                            });
                            localObjectConfig.push({index: (index + 1), indicatorName: item.indicatorName});
                            str += '<div class="layui-row">' +
                                '<div class="layui-col-lg12">' ;
                            str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                            str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` ;
                            if (item.indicatorName == 'localVariable') {
                                for (var i = 0; i < objectLevel; i++) {
                                    if (objectLevel == 2 && i == 1) {
                                        str += '<div id="localObjectConfig' + (i + 1) + '_' + (index + 1) + '" class="xm-select-demo"></div>';
                                    } else {
                                        str += '<select class="localObject" name="localObject' + (i + 1) + '_' + (index + 1) + '" id="localObject' + (i + 1) + '_' + (index + 1) + '" lay-filter="localObject' + (i + 1) + '_' + (index + 1) + '" lay-search="">' +
                                            '<option value="">请选择' + (i + 1) + '级选项</option>' +
                                            '</select>'
                                    }
                                }
                                str += '<a class="layui-btn" id="add_object' + (index + 1) + '" onclick="addObject(' + (index + 1) + ')">添加</a>';
                            } else {
                                for (var i = 0; i < objectLevel; i++) {
                                    if (objectLevel == 2 && i == 1) {
                                        // str+='<div id="localObjectConfig'+ (i+1) +'_'+ (index+1) +'" class="xm-select-demo"></div>';
                                    } else {
                                        str += '<select class="localObject" name="localObject' + (i + 1) + '_' + (index + 1) + '" id="localObject' + (i + 1) + '_' + (index + 1) + '" lay-filter="localObject' + (i + 1) + '_' + (index + 1) + '" lay-search="">' +
                                            '<option value="">请选择' + (i + 1) + '级选项</option>' +
                                            '</select>'
                                        str += '<div id="localObjectSonConfigBowl_' + (index + 1) + '" style="width: 40%;margin: 0;float: left;"></div>'
                                    }
                                }
                            }
                            str += '</div></div></div>';
                        } else if (item.contentType == 'table') {
                            if(item.indicatorName.indexOf('stepResult')!=-1){
                                str += specialTemplateConfigInput(spData, item, currusername,step ,'circle')
                            // }else if(item.indicatorName.indexOf('|checkbox|')!=-1){
                            }else {
                                var tableObj = new Object();
                                tableObj['index'] = index+1;
                                tableObj['url'] = item.url;
                                tableObj['type'] = item.indicatorName;
                                tableObj['isRequired'] = item.isRequired;
                                tableObj['configIndicatorDTOS'] = item.configIndicatorDTOS;
                                if (item.indicatorName.indexOf('linkage') != -1) {
                                    for (var j = 0; j < item.indicatorName.split('|').length; j++) {
                                        if (item.indicatorName.split('|')[j].indexOf('linkage') != -1) {
                                            tableObj['parentId'] = item.indicatorName.split('|')[j].replace(/[^0-9]/ig, "");
                                        }
                                    }
                                    $.each(cdata,function (key,value) {
                                        if(value.id == tableObj['parentId'])
                                            tableObj['parentIndex'] = key+1;
                                    })
                                    // linkageType = 'table';
                                    tableObj['linkageType'] = 'table';
                                    linkageConfig.push(tableObj)
                                }
                                str += '<div class="layui-row">' +
                                    '<div class="layui-col-lg12">';
                                str+='<label class="layui-form-label">' + item.indicatorCname + '</label>';
                                str+=`<div class="layui-input-block" onclick="showComment('${item.comment}',this)">` +
                                    '<input type="hidden" id="tableConfig' + (index + 1) + '" name="evaluationScore' + (index + 1) + '" autocomplete="on" class="layui-input" />' +
                                    '<table class="layui-table" id="evaluationScoreTable_' + (index + 1) + '" lay-filter="evaluationScoreTable_' + (index + 1) + '"></table>';
                                if(!item.url){
                                    str+=`<script type="text/html" id="tabletoolbar_${index+1}">
                                            <div class="layui-btn-group">
                                            {{#  if(!d.flag){ }}
                                                <a class="layui-btn layui-btn-xs" lay-event="save">保存</a>
                                                <a class="layui-btn layui-btn-xs" lay-event="cancel">取消</a>
                                              {{#  } }}
                                              {{#  if(d.flag){ }}
                                                <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
                                                <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
                                            {{#  } }}
                                            </div>
                                          </script>`;
                                }

                                str+='</div></div></div>';
                                tableConfig.push(tableObj)
                            }
                        }
                    }
                    }
                });
                str+='<div class="layui-form-item tutor-block layui-hide">' +
                    '<div class="layui-input-block">' +
                    '<button type="button" id="saveTimetable" class="layui-btn" lay-submit lay-filter="saveTimetable">保存</button>' +
                    '<button type="reset" class="layui-btn layui-btn-primary">重置</button>' +
                    '</div>' +
                    '</div>';

            }
            $('#currentStep').html(str);
            if(specialSteps.length>0){
                specialStepRender(processKey);
            }
            form.render();
            getTemplateType();
            element.render('tab');
            getAllTarget(1);
            elementChange();
            configRender();
            if(spRenderFlag && spValue && auditConfig.length==0){
                // if(processKey == "enlist_process"||processKey == "hire_process"||processKey == "examRegistration_process"){//招募
                let showStep = repeatStep > 0 ? repeatStep : step;//需要默认展示的数据的所属步骤
                let paramSP = getValueSP(processKey,spValue,spData,showStep,currusername);
                form.val('currentStep', paramSP );
                resultsInit(paramSP);
                form.render('select');
                // }
            }
        }
        //结果
        function getResultsByTemplateId(){
            $.ajax({
                url: evaluationHost + 'api/timetable/info?timetableId='+timetableId,
                async: false,
                type: "get",
                success:function (res) {
                    // console.log(res);
                    var data = res.data[0];
                    var str = '';
                    var is = [];//获取所有name
                    var stepIndex;
                    var historyStr = '';
                    var historyFlag = true;
                    var tableFlag = false;//是否在展示页面展示表格
                    $.each(data.timetableProcessDTOS,function (index,item) {

                        if(historyFlag && item.isChose == 1){
                            historyStr+='<div class="item_box">' +
                                '<div class="item-header">' +
                                '<i class="fa fa-dot-circle-o"></i>' +
                                '</div>' +
                                '<div class="item-content">';
                            if(item.processStep != step){
                                historyStr+='<a class="jump_to_step">'+item.processCname+'</a>';
                                // historyStr+='<a class="jump_to_step" onclick="jumpStep('+ item.processStep +')">'+item.processCname+'</a>';
                            }else{
                                historyStr+=item.processCname;
                            }
                            historyStr+='</div>' +
                                '</div>'
                        }
                        if(data.currentStep == item.processStep && item.isChose == 1 && (data.timetableProcessDTOS[index+1]!=null && data.timetableProcessDTOS[index+1].processStep!=data.currentStep || data.timetableProcessDTOS[index+1]==null)){
                            historyFlag = false;
                        }
                        // if(data.processKey == "enlist_process"||data.processKey == "examRegistration_process"){//招募
                            var f = true;
                            if(step == item.processStep){
                                $('#step_header').html(item.processCname);
                                // if(!tableConfig){
                                    $.each(item.configIndicators,function (i,d) {
                                        if(d.indicatorName!=null&&(d.indicatorName.indexOf('|count|')!=-1||d.indicatorName.indexOf('|autoInsert|')!=-1)) {//特殊处理的步骤:招募人员列表
                                            f = false;
                                            if(d.indicatorName.indexOf('|autoInsert|')!=-1){
                                                str+='<div class="layui-row">' +
                                                    '<div class="layui-col-lg12">';
                                                str+='<label class="layui-form-label">列表</label>';
                                                str+='<div class="layui-input-block">';
                                            }
                                            str += specialTemplateConfigInfo(data,'table',item,step,currusername,'circleinfo');
                                            if(d.indicatorName.indexOf('|autoInsert|')!=-1){
                                                str+='</div></div></div>'
                                            }
                                        }
                                    });
                                    if(f){
                                        stepIndex = index;
                                        str += configInputByInfo(item,data);
                                    }
                                // }

                            }


                        // }

                    });
                    $('.item_box_limit').html(historyStr)
                    $('#currentStep').html(str);
                    if(specialSteps.length>0){
                        specialStepRender(data.processKey);
                    }
                    var params = getResultByInfo(data);
                    $.each(steps,function (i,d) {
                        form.val('currentStep', params[i]);
                    })

                    // form.val('currentStep', param);
                    element.render('tab');
                    getAllTarget(1);
                    elementChange();
                    fileInit();
                    // $.each($(".file_download"), function (index, obj) {
                    //     $(obj).click(function(){
                    //         resourceContainer.downLoadFile({
                    //             fileId: $(obj).attr("data")
                    //         })
                    //     });
                    // });
                    // $.each($(".file_show"), function (index, obj) {
                    //     $(obj).click(function(){
                    //         resourceContainer.getFileById({
                    //             success:function(result){
                    //                 if(isPdf(result.fileName)){
                    //                     layer.open({
                    //                         type: 2,
                    //                         area: ['1000px', '650px'],
                    //                         fixed: false, //不固定
                    //                         maxmin: true,
                    //                         content: result.url
                    //                     });
                    //                 }else{
                    //                     // layer.msg('不是pdf,暂不支持预览谢谢!');
                    //                     layer.confirm('抱歉,此文件不是pdf文件,暂不支持预览!', {
                    //                         btn: ['下载','关闭'] //按钮
                    //                         , offset: ['150px', '40%']
                    //                     }, function(index){
                    //                         resourceContainer.downLoadFile({
                    //                             fileId: $(obj).attr("data")
                    //                         })
                    //                         layer.close(index);
                    //                     }, function(index){
                    //                         layer.close(index);
                    //                     });
                    //                 }
                    //                 // $('#photo_img').attr("src", result.url);
                    //             },
                    //             fail:function(){
                    //                 alert('文件获取失败！');
                    //                 // $('#photo_img').attr("src",'');
                    //             },
                    //             fileId:$(obj).attr("data"),
                    //             needToken:true
                    //         })
                    //     });
                    // });
                    resultsInit();
                    // configRender();
                },
                error:function () {
                    alert("查看当前阶段信息失败!");
                    return false;
                }
            });
        }
        //页面字段生成
        function configInput(item) {
            var str = '';
            return str;
        }
        function resultsInit(paramSP) {
            //列表table
            $.each(tableConfig,function (index,item) {
                //获取表头
                var cols = [];
                var listUrl = '';
                if(item.url){
                    var regex = new RegExp("http");
                    if(regex.test(item.url)){
                        listUrl +=item.url;
                    }else{
                        listUrl+=zuulHost+item.url;
                    }
                    var parentValue;
                    listUrl += listUrl.indexOf('?')!=-1 ? '&templateId='+templateId : '?templateId='+templateId
                    if(paramSP){
                        listUrl+='&timetableId='+ paramSP[`evaluationScore${item.parentIndex}`]+'&selectedResultIds='+ paramSP[`evaluationScore${item.index}`];
                    }else{
                        listUrl+='&timetableId='+item.parentValue;
                    }
                    var headerUrl = listUrl;
                    $.ajax({
                        url:headerUrl,
                        async:false,
                        success: function (res) {
                            var coll = [];
                            var col = [];
                            if(item.type.indexOf('|checkbox|')!=-1){
                                col.push(
                                    {type:'checkbox'},
                                );
                            }
                            col.push(
                                {title:'序号',minWidth:50,align: 'center',type:"numbers"},
                                // {field: 'name',title:'名称',minWidth:100,align: 'center'},
                            );
                            // $.each(res.data,function (index,item){
                            if(res.code==200&&res.data.length>0){
                                if(res.data[0].infoMap!=null){
                                    var infoIndex = 0;
                                    $.each(res.data[0].infoMap,function (i,d) {
                                        col.push({field: 'header'+infoIndex, title:i,minWidth:100,align:'center'})
                                        infoIndex++;
                                    })
                                }
                            }else if(res.code == 500){
                                layer.msg(res.msg);
                            }
                            // col.push(
                            //     {title: '操作', align: 'center',width: 200, toolbar: '#toolbar'}
                            // );
                            coll.push(col);
                            cols = coll;
                        }
                    })
                    //liebiao
                    table.render({
                        elem: '#evaluationScoreTable_'+item.index,
                        url: listUrl, //数据接口
                        title: '列表',
                        page: false,
                        limit: 999,
                        parseData: function(res){ //res 即为原始返回的数据
                            // console.log(res);
                            var pdata = {
                                "code": 0, //解析接口状态
                                "msg": "", //解析提示文本
                                "count": res.total, //解析数据长度
                                "data": [] //解析数据列表
                            };
                            // var selectId = $('#tableConfig'+item.index).val();
                            if(res.code == 500){
                                return pdata;
                            }
                            if(res.data.length>0){
                                // console.log(pdata);
                                var ids = '';
                                $.each(res.data,function(index,item){
                                    ids += item.id+',';
                                    var record = {};
                                    record.id = item.id;
                                    record.name = item.name;
                                    var infoIndex = 0;
                                    if(item.infoMap!=null){
                                        $.each(item.infoMap,function (i,d) {
                                            record['header'+infoIndex] = d;
                                            infoIndex++;
                                        })
                                    }
                                    pdata.data.push(record);
                                })
                                ids = (ids.substring(ids.length - 1) == ',') ? ids.substring(0, ids.length - 1) : ids;
                            }
                            return pdata;
                        },
                        cols: cols,
                        data: table,
                        even: true,
                        id: 'evaluationScoreTable_'+item.index,
                        done: function (res) {
                            var checked = $('#tableConfig'+item.index).val().split(',');
                            for(var i=0;i<res.data.length;i++){
                                for(var j=0;j<checked.length;j++){
                                    if(res.data[i].id==checked[j]){
                                        //这里才是真正的有效勾选
                                        res.data[i]["LAY_CHECKED"]='true';
                                        //找到对应数据改变勾选样式，呈现出选中效果
                                        var index= res.data[i]['LAY_TABLE_INDEX'];
                                        $('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').prop('checked', true);
                                        $('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').next().addClass('layui-form-checked');
                                    }
                                }
                            }
                        }
                    });
                }

            })
        }
        //配置项渲染
        // window.configRender = function () {
        function configRender() {
            //多选
            $.each(multiSelectConfig,function (index,item) {
                var multis = 'multiSelectConfig'+item.index;
                // var regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
                var regex = new RegExp("http");
                if(regex.test(item.url)){
                    var url =item.url;
                }else{
                    var url=zuulHost+item.url;
                }
                if(item.type == 'current' || item.type.indexOf('|current|') != -1) {
                    url += url.indexOf('?')!=-1 ? '&username='+currusername : '?username='+currusername
                }
                if(item.type.indexOf('|search|')!=-1){//数据过多需要筛选 远程搜索
                    multis = xmSelect.render({
                        el: '#multiSelectConfig'+item.index,
                        name: 'evaluationScore'+item.index,
                        autoRow: true,
                        // toolbar: { show: true,showIcon: false },
                        filterable: true,
                        remoteSearch: true,
                        theme: {color: '#1E9FFF'},
                        model: {icon: 'hidden'},
                        remoteMethod: function(val, cb, show){
                            //这里如果val为空, 则不触发搜索
                            if(!val){
                                return cb([]);
                            }
                            url = funcUrlDel('keyword',url);
                            url += url.indexOf('?')!=-1 ? '&keyword='+val : '?keyword='+val
                            $.ajax({
                                url: url,
                                async: false,
                                type: 'get',
                                // headers: {"x-datasource": "limsproduct"},
                                success: function (res) {
                                    var data1 = [];
                                    $.each(res.data, function (index, item) {
                                        var d = {name: item.text,value: item.id};
                                        data1.push(d);
                                        // str+='<option value="'+ item.id +'">'+ item.text +'</option>'
                                    });
                                    cb(data1)
                                }
                            });
                        }
                    });
                }else{
                    multis = xmSelect.render({
                        el: '#multiSelectConfig'+item.index,
                        name: 'evaluationScore'+item.index,
                        filterable: true,
                        // toolbar: {show: true, showIcon: false},
                        theme: {color: '#1E9FFF',},
                        model: {icon: 'hidden',},
                        data: []
                    });
                    if(item.url!=null && item.url!=''){
                        $.ajax({
                            url: url,
                            dataType: 'json',
                            async: false,
                            type: 'post',
                            success: function (res) {
                                var data1 = [];
                                $.each(res.data, function (index, item) {
                                    var d = {name: item.text,value: item.id};
                                    data1.push(d);
                                    // str+='<option value="'+ item.id +'">'+ item.text +'</option>'
                                });
                                multis.update({
                                    data:data1
                                })
                            }
                        });
                    }else{
                        var data1 = [];
                        $.each(item.configIndicatorDTOS,function (i, d) {
                            var o = {name: d.indicatorCname,value: d.id};
                            data1.push(o);
                            // str+='<option value="'+ item.id +'">'+ item.text +'</option>'
                        });
                        multis.update({
                            data:data1
                        })
                    }
                }
                if(item.isRequired === 1){
                    multis.update({
                        layVerify: 'required'
                    })
                }
            });
            window.getDay = function (dd) {
                var week = dd.getDay(); //获取时间的星期数
                var minus = (week - 3) >= 0 ? -(7- week + 3) : week - 3;
                dd.setDate(dd.getDate() - minus); //获取minus天前的日期
                var y = dd.getFullYear();
                var m = dd.getMonth() + 1; //获取月份
                var d = dd.getDate();
                return y + "-" + m + "-" + d;
            }
            //日期
            $.each(dateConfig,function (index,item) {
                if(item.indicatorName.indexOf('|currentDate|')!=-1){
                    laydate.render({
                        elem: '#dateConfig'+item.index,
                        trigger: 'click',
                        value: new Date(),
                    });
                    $('#dateConfig'+item.index).attr('disabled','disabled');
                }else if(item.indicatorName.indexOf('|wednesday|')!=-1){
                    var weekday = getDay(new Date());
                    laydate.render({
                        elem: '#dateConfig'+item.index,
                        trigger: 'click',
                        value: weekday,
                    });
                }else{
                    laydate.render({
                        elem: '#dateConfig'+item.index,
                        trigger: 'click',
                    });
                }
                if(item.isRequired === 1){
                    $(`[name='evaluationScore${item.index}']`).attr('lay-verify','required');
                }
            });
            //日期时间
            $.each(dateTimeConfig,function (index,item) {
                if(item.indicatorName.indexOf('|current|')!=-1){
                    laydate.render({
                        elem: '#dateTimeConfig'+item.index,
                        type: 'datetime',
                        trigger: 'click',
                        value: new Date()
                    });
                    $('#dateTimeConfig'+item.index).attr('disabled','disabled');
                    setInterval(function () {
                        var date = new Date();
                        var y = date.getFullYear();
                        var m = date.getMonth()+1;
                        var d = date.getDate();
                        var h = date.getHours();
                        var min = date.getMinutes();
                        var s = date.getSeconds();
                        var str=y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d)+'  '+(h<10?('0'+h):h)+':'+(min<10?('0'+min):min)+':'+(s<10?('0'+s):s);
                        $('#dateTimeConfig'+item.index).val(str);
                    }, 1000);
                }else{
                    laydate.render({
                        elem: '#dateTimeConfig'+item.index,
                        type: 'datetime',
                        trigger: 'click',
                    });
                }
                if(item.isRequired === 1){
                    $(`[name='evaluationScore${item.index}']`).attr('lay-verify','required');
                }
            });
            //链接
            $.each(urlConfig,function (index,item) {
                var url = '';
                if(item.url != null || item.url != '') {
                    if (item.type == 'current' || item.type.indexOf('|current|') != -1) {
                        // var regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
                        var regex = new RegExp("http");
                        if (regex.test(item.url)) {
                            url += item.url;
                        } else {
                            url += zuulHost + item.url;
                        }
                        url += url.indexOf('?')!=-1 ? '&username='+currusername : '?username='+currusername
                        $.ajax({
                            url: url,
                            // dataType: 'json',
                            async: false,
                            type: 'get',
                            success: function (res) {
                                if (Array.isArray(res.data)) {
                                    // $('#evaluationScore'+item.index).text(res.data[0].text);
                                    $('#evaluationScore' + item.index).attr('href', res.data[0].text);
                                } else {
                                    // $('#evaluationScore'+item.index).text(res.data.text);
                                    $('#evaluationScore' + item.index).attr('href', res.data.text);
                                }
                                // console.log(res)
                            }
                        });
                    }
                }
            });
            //文本框
            $.each(textConfig,function (index,item) {
                var url = '';
                if(item.url != null || item.url != '') {
                    if (item.type == 'current' || item.type.indexOf('|current|') != -1) {
                        // var regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
                        var regex = new RegExp("http");
                        if (regex.test(item.url)) {
                            url += item.url;
                        } else {
                            url += zuulHost + item.url;
                        }
                        url += url.indexOf('?')!=-1 ? '&username='+currusername : '?username='+currusername
                        $.ajax({
                            url: url,
                            // dataType: 'json',
                            async: false,
                            type: 'get',
                            success: function (res) {
                                if (Array.isArray(res.data)) {
                                    $('#textConfig'+item.index).text(res.data[0].text)
                                } else {
                                    $('#textConfig'+item.index).text(res.data.text)
                                }
                                // console.log(res)
                            }
                        });
                    }
                }
                $('#textConfig'+item.index).textareafullscreen();
                if(item.isRequired === 1){
                    $(`[name='evaluationScore${item.index}']`).attr('lay-verify','required');
                }
            });

            //日期范围
            $.each(rangeDateConfig,function (index,item) {
                laydate.render({
                    elem: '#rangeDateConfig'+item.index,
                    trigger: 'click'
                    // min:minDate()
                    , range: '~'
                });
                if(item.isRequired === 1){
                    $(`[name='evaluationScore${item.index}']`).attr('lay-verify','required');
                }
            });
            //时间范围
            $.each(rangeTimeConfig,function (index,item) {
                laydate.render({
                    elem: '#rangeTimeConfig'+item.index
                    ,trigger: 'click'
                    ,type: 'time'
                    // min:minDate()
                    , range: '~'
                });
                if(item.isRequired === 1){
                    $(`[name='evaluationScore${item.index}']`).attr('lay-verify','required');
                }
            });
            //日期时间范围
            $.each(rangeDateTimeConfig,function (index,item) {
                laydate.render({
                    elem: '#rangeDateTimeConfig'+item.index
                    ,trigger: 'click'
                    ,type: 'datetime'
                    // min:minDate()
                    , range: '~'
                });
                if(item.isRequired === 1){
                    $(`[name='evaluationScore${item.index}']`).attr('lay-verify','required');
                }
            });
            //当前(...)举个栗子:当前登录人/等前所属学期
            $.each(inputConfig,function (index,item) {
                var url = '';
                if(item.url != null){
                    if (item.type == 'current'){
                        // var regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
                        var regex = new RegExp("http");
                        if(regex.test(item.url)){
                            url +=item.url;
                        }else{
                            url+=zuulHost+item.url;
                        }
                        $.ajax({
                            url: url+'?username='+currusername,
                            // dataType: 'json',
                            async: false,
                            type: 'get',
                            success: function (res) {
                                if(Array.isArray(res.data)){
                                    $('#inputConfig'+item.index).val(res.data[0].id+'_'+res.data[0].text);
                                    $('#inputConfigShow'+item.index).val(res.data[0].text);
                                }else{
                                    $('#inputConfig'+item.index).val(res.data.id+'_'+res.data.text);
                                    $('#inputConfigShow'+item.index).val(res.data.text);
                                }
                                // console.log(res)
                            }
                        });
                    }else if(item.type.indexOf('|currentLogin|')!=-1){
                        $('#inputConfig'+item.index).val(currusername+'_'+currcname);
                        $('#inputConfigShow'+item.index).val(currcname);
                    }
                }
                if(item.isRequired === 1){
                    $(`[name='evaluationScore${item.index}']`).attr('lay-verify','required');
                }
            });
            //数字框
            $.each(numberConfig,function (index,item) {
                if(item.isRequired === 1){
                    $(`[name='evaluationScore${item.index}']`).attr('lay-verify','required');
                }
            })
            //单选框
            $.each(radioConfig,function (index,item) {
                if(item.isRequired === 1){
                    $(`[name='evaluationScore${item.index}']`).attr('lay-verify','required');
                }
            })
            //复选框
            $.each(checkboxConfig,function (index,item) {
                if(item.isRequired === 1){
                    $(`[name='evaluationScore${item.index}']`).attr('lay-verify','required');
                }
            })
            //上传附件
            $.each(fileConfig,function (index,item) {
                if(item.isRequired === 1){
                    $(`[name='evaluationScore${item.index}']`).attr('lay-verify','required');
                }
            })
            //单选框
            $.each(selectConfig,function (index,item) {
                // var url = zuulHost+item.url;
                // var regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
                if(!item.url){
                    $.each(item.configIndicatorDTOS,function (i, d) {
                        $('#selectConfig'+item.index).append(new Option(d.indicatorCname, d.id));// 下拉菜单里添加元素
                    });
                    form.render("select");
                    return true;
                }
                var regex = new RegExp("http");
                if(regex.test(item.url)){
                    var url =item.url;
                }else{
                    var url=zuulHost+item.url;
                }
                if(item.type.indexOf('|current|')!=-1){
                    url += url.indexOf('?')!=-1 ? '&username='+currusername : '?username='+currusername

                    // url+='?username='+currusername;
                }
                $.ajax({
                    url: url,
                    dataType: 'json',
                    async: false,
                    type: 'post',
                    // headers: {"x-datasource": "limsproduct"},
                    success: function (res) {
                        // console.log(res)
                        $.each(res.data, function (i, d) {
                            $('#selectConfig'+item.index).append(new Option(d.text, d.id));// 下拉菜单里添加元素
                        });
                        form.render("select");
                        if(item.type.indexOf('|linkage|')!=-1){
                            let filter = 'select'+item.index;
                            form.on('select('+filter+')', function(data){
                                console.log(data.value); //得到被选中的值
                                var son;
                                $.each(linkageConfig,function (i,d) {
                                // })
                                switch (d.linkageType) {
                                    case 'select' :
                                        if(item.id == d.parentId){
                                            son = d;
                                            // var regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
                                            var regex =  new RegExp("http");
                                            let sonurl = son.url
                                            if(!regex.test(son.url)){
                                                sonurl = zuulHost + sonurl;
                                            }
                                            sonurl += sonurl.indexOf('?')!=-1 ? '&id='+data.value : '?id='+data.value
                                            if(son.type.indexOf('|current|')!=-1){
                                                sonurl += '&username='+currusername
                                            }
                                            $.ajax({
                                                url: sonurl,
                                                dataType: 'json',
                                                async: false,
                                                type: 'post',
                                                success: function (res) {
                                                    $('#selectConfig'+son.index).empty();
                                                    $('#selectConfig'+son.index).prepend('<option value="">请选择</option>')
                                                    $.each(res.data, function (ii, dd) {
                                                        $('#selectConfig'+son.index).append(new Option(dd.text, dd.id));// 下拉菜单里添加元素
                                                    });
                                                    form.render("select");
                                                }
                                            });
                                        }
                                        break;
                                        case 'multiSelect' :
                                        if(item.id == d.parentId){
                                            son = d;
                                            var multis = 'multiSelectConfig'+son.index;
                                            // var regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
                                            var regex = new RegExp("http");
                                            if(regex.test(son.url)){
                                                var url =son.url;
                                            }else{
                                                var url=zuulHost+son.url;
                                            }
                                            if(son.type == 'current' || son.type.indexOf('|current|') != -1) {
                                                url += url.indexOf('?')!=-1 ? '&username='+currusername : '?username='+currusername
                                            }
                                            multis = xmSelect.render({
                                                el: '#multiSelectConfig'+son.index,
                                                name: 'evaluationScore'+son.index,
                                                filterable: true,
                                                // toolbar: {show: true, showIcon: false},
                                                theme: {color: '#1E9FFF',},
                                                model: {icon: 'hidden',},
                                                data: []
                                            });
                                            if(son.url!=null || son.url!=''){
                                                $.ajax({
                                                    url: url,
                                                    dataType: 'json',
                                                    async: false,
                                                    type: 'post',
                                                    success: function (res) {
                                                        var data1 = [];
                                                        $.each(res.data, function (index, item) {
                                                            var d = {name: item.text,value: item.id};
                                                            data1.push(d);
                                                            // str+='<option value="'+ item.id +'">'+ item.text +'</option>'
                                                        });
                                                        multis.update({
                                                            data:data1
                                                        })
                                                    }
                                                });
                                            }
                                        }
                                        break;
                                        case 'text' :
                                        // $.each(textConfig,function (i,d) {
                                        if(item.id == d.parentId){
                                            son = d;
                                            // var regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
                                            var regex =  new RegExp("http");
                                            let sonurl = son.url
                                            if(!regex.test(son.url)){
                                                sonurl =zuulHost+sonurl;
                                            }
                                            $.ajax({
                                                url: sonurl+'?id='+data.value,
                                                dataType: 'json',
                                                async: false,
                                                type: 'get',
                                                success: function (res) {
                                                    // console.log(res)
                                                    var str = '';
                                                    if(res.data.length>0){
                                                        $.each(res.data[0],function (i) {
                                                            str+=i+'：'+res.data[0][i]+'\n'
                                                        })
                                                    }
                                                    $('#textConfig'+son.index).text(str);
                                                }
                                            });
                                        }
                                        // })
                                        break;
                                        case 'url' :
                                            if(item.id == d.parentId){
                                                son = d;
                                                if(son.url.indexOf('resourceCloud')!=-1){//教学平台课程资源展示
                                                    let courseInfo = `${data.value}_${$(data.elem).find('option:selected').text()}`
                                                    $('#evaluationScore'+son.index).text('点我查看课程资源');
                                                    $('#evaluationScore'+son.index).attr('href',son.url + '?username=' + currentUsername + '&globalVariable=' + courseInfo);
                                                }else if(son.url.indexOf('personalInfo')!=-1){//选择人的简历/信息
                                                    let username = data.value;
                                                    $('#evaluationScore'+son.index).text('点我查看该人信息');
                                                    $('#evaluationScore'+son.index).attr('href',son.url + '?username=' + username);
                                                }else{
                                                    // var regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
                                                    var regex =  new RegExp("http");
                                                    let sonurl = son.url
                                                    if(!regex.test(son.url)){
                                                        sonurl =zuulHost+sonurl;
                                                    }
                                                    $.ajax({
                                                        url: sonurl+'?id='+data.value,
                                                        dataType: 'json',
                                                        async: false,
                                                        type: 'get',
                                                        success: function (res) {
                                                            // console.log(res)
                                                            var str = '';
                                                            if(res.data.length>0){
                                                                $.each(res.data[0],function (i) {
                                                                    if(i == 'text')
                                                                        str+=res.data[0][i];
                                                                })
                                                            }
                                                            $('#evaluationScore'+son.index).text(str);
                                                            $('#evaluationScore'+son.index).attr('href',str);
                                                        }
                                                    });
                                                }

                                            }
                                        break;
                                    case 'table' :
                                        if(item.id == d.parentId){
                                            son = d;
                                        }
                                        //获取表头
                                        var cols = [];
                                        var listUrl = '';
                                        var regex = new RegExp("http");
                                        listUrl += regex.test(son.url) ? son.url : zuulHost+son.url
                                        listUrl += listUrl.indexOf('?')!=-1 ? '&timetableId='+data.value+'&templateId='+templateId : '?timetableId='+data.value+'&templateId='+templateId
                                        $.ajax({
                                            url:listUrl,
                                            async:false,
                                            success: function (res) {
                                                var coll = [];
                                                var col = [];
                                                if(son.type.indexOf('|checkbox|')!=-1){
                                                    col.push(
                                                        {type:'checkbox'},
                                                    );
                                                }
                                                col.push(
                                                    {title:'序号',minWidth:50,align: 'center',type:"numbers"},
                                                    // {field: 'name',title:'名称',minWidth:100,align: 'center'},
                                                );
                                                // $.each(res.data,function (index,item){
                                                if(res.code==200&&res.data.length>0){
                                                    if(res.data[0].infoMap!=null){
                                                        var infoIndex = 0;
                                                        $.each(res.data[0].infoMap,function (i,d) {
                                                            col.push({field: 'header'+infoIndex, title:i,minWidth:100,align:'center'})
                                                            infoIndex++;
                                                        })
                                                    }
                                                }else if(res.code == 500){
                                                    layer.msg(res.msg);
                                                }
                                                // col.push(
                                                //     {title: '操作', align: 'center',width: 200, toolbar: '#toolbar'}
                                                // );
                                                coll.push(col);
                                                cols = coll;
                                            }
                                        })
                                        table.reload('evaluationScoreTable_'+son.index, {
                                            url: listUrl
                                            ,cols: cols
                                        });
                                        break;
                                    default :
                                        console.error('未找到联动相关项!');
                                }
                            })
                            });
                        }
                    }
                });
                if(item.isRequired === 1){
                    $(`[name='evaluationScore${item.index}']`).attr('lay-verify','required');
                }
            });
            //多重选择框
            $.each(localObjects,function (index,item) {
                // for(var n = 0;n<objectLevel;n++){
                // $.each(localObjects,function (i,d) {
                //     if(d.index == item.index){
                $.each(item.objects,function (i1,d1) {
                    $('#localObject1'+'_'+item.index).append(new Option(d1.indicatorCname, d1.id));// 下拉菜单里添加元素
                })
                    // }
                //
                // });
                form.render("select");
                if(item.indicatorName == 'localVariable'){
                    if(objectLevel == 2){
                        var lo = 'localObjectConfig'+item.index;
                        lo = xmSelect.render({
                            el: '#localObjectConfig2_'+item.index,
                            name: 'evaluationScore'+item.index,
                            style: {
                                width: '40%',
                                margin: 0,
                                float: 'left',
                            },
                            tips: '请选择2级选项',
                            layVerify: 'required',
                            toolbar: {show: true, showIcon: false},
                            theme: {color: '#1E9FFF',},
                            model: {icon: 'hidden',},
                            data: []
                        });

                        form.on('select(localObject1_'+ item.index +')', function(data){
                            var data1 = [];
                            $.each(localObjects,function (i,d) {
                                if(d.index == item.index){
                                    $.each(d.objects,function (i1,d1) {
                                        if(d1.id == data.value){
                                            $.each(d1.configIndicatorDTOS,function (i2,d2){
                                                var d = {name: d2.indicatorCname,value: d2.id};
                                                data1.push(d);
                                                // $('#localObject2'+'_'+item).append(new Option(d2.indicatorCname, d2.id));// 下拉菜单里添加元素
                                            })
                                        }
                                    })
                                }

                            });
                            lo.update({
                                data:data1
                            });
                            form.render("select");
                        });

                    }
                }else{
                    form.on('select(localObject1_'+ item.index +')', function(data){
                        var strLocal = '';
                        var dateflag = false;
                        // var strLocal = '<div id="localObjectSonBowl'+ item.index +'">';
                        $.each(localObjects,function (i,d) {
                            if(d.index == item.index){
                                $.each(d.objects,function (i1,d1) {
                                    if(d1.id == data.value&&d1.configIndicatorDTOS.length>0){
                                        if(d.indicatorName == 'checkTimeType'){
                                            if(d1.contentType == 'date'){
                                                dateflag = true;
                                                strLocal+='<input type="text" id="localObjectSonConfig" name="localObjectSonConfig'+ item.index +'"  lay-verify="required" placeholder="请选择日期" autocomplete="off" class="layui-input" />'
                                            }else if(d1.contentType == 'week'){
                                                var weeks = [1,2,3,4,5,6,7];
                                                strLocal+='<select name="localObjectSonConfig'+ item.index +'" id="localObjectSonConfig'+ item.index +'" lay-verify="required" lay-search="">' +
                                                    '<option value="">请选择周次</option>';
                                                $.each(weeks,function (i2,d2) {
                                                    strLocal+='<option value="'+ d2 +'">周'+ d2 +'</option>';
                                                });
                                                strLocal+='</select>';
                                            }else if(d1.contentType == 'month'){
                                                var months = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
                                                strLocal+='<select name="localObjectSonConfig'+ item.index +'" id="localObjectSonConfig'+ item.index +'" lay-verify="required" lay-search="">' +
                                                    '<option value="">请选择每月几号</option>';
                                                $.each(months,function (i2,d2) {
                                                    strLocal+='<option value="'+ d2 +'">'+ d2 +'</option>';
                                                });
                                                strLocal+='</select>';
                                            }
                                        }else{
                                            strLocal+='<select name="localObjectSonConfig'+ item.index +'" id="localObjectSonConfig'+ item.index +'" lay-verify="required" lay-search="">' +
                                                '<option value="">请选择二级选项</option>';
                                            $.each(d1.configIndicatorDTOS,function (i2,d2) {
                                                strLocal+='<option value="'+ d2.id +'">'+ d2.indicatorCname +'</option>';
                                            });
                                            strLocal+='</select>';
                                        }

                                    }
                                })
                            }

                        });
                        // strLocal+='</div>'
                        $('#localObjectSonConfigBowl_'+item.index).html(strLocal);
                        form.render();
                        if(dateflag){
                            laydate.render({
                                elem: '#localObjectSonConfig',
                                trigger: 'click',
                                // min:minDate()
                                // , range: '~'
                            });
                        }
                    });
                }

                // }
            });
            //列表table
            $.each(tableConfig,function (index,item) {
                //获取表头
                var cols = [];
                var listUrl;
                if(item.url){
                    var regex = new RegExp("http");
                    if(regex.test(item.url)){
                        listUrl=item.url;
                    }else{
                        listUrl=zuulHost+item.url;
                    }
                    var headerUrl = listUrl;
                    $.ajax({
                        url:headerUrl,
                        async:false,
                        success: function (res) {
                            var coll = [];
                            var col = [];
                            if(item.type.indexOf('|checkbox|')!=-1){
                                col.push(
                                    {type:'checkbox'},
                                );
                            }
                            col.push(
                                {title:'序号',minWidth:50,align: 'center',type:"numbers"},
                                // {field: 'name',title:'名称',minWidth:100,align: 'center'},
                            );
                            // $.each(res.data,function (index,item){
                            if(res.code==200&&res.data.length>0){
                                if(res.data[0].infoMap!=null){
                                    var infoIndex = 0;
                                    $.each(res.data[0].infoMap,function (i,d) {
                                        col.push({field: 'header'+infoIndex, title:i,minWidth:100,align:'center'})
                                        infoIndex++;
                                    })
                                }
                            }else if(res.code == 500){
                                layer.msg(res.msg);
                            }
                            // col.push(
                            //     {title: '操作', align: 'center',width: 200, toolbar: '#toolbar'}
                            // );
                            coll.push(col);
                            cols = coll;
                        }
                    })
                    //liebiao
                    table.render({
                        elem: '#evaluationScoreTable_'+item.index,
                        url: listUrl, //数据接口
                        title: '列表',
                        page: false,
                        limit: 999,
                        parseData: function(res){ //res 即为原始返回的数据
                            // console.log(res);
                            var pdata = {
                                "code": 0, //解析接口状态
                                "msg": "", //解析提示文本
                                "count": res.total ? res.total : res.count, //解析数据长度
                                "data": [] //解析数据列表
                            };
                            if(res.code == 500){
                                return pdata;
                            }
                            if(res.data.length>0){
                                // console.log(pdata);
                                var ids = '';
                                $.each(res.data,function(index,item){
                                    ids += item.id+',';
                                    var record = {};
                                    record.id = item.id;
                                    record.name = item.name;
                                    var infoIndex = 0;
                                    if(item.infoMap!=null){
                                        $.each(item.infoMap,function (i,d) {
                                            record['header'+infoIndex] = d;
                                            infoIndex++;
                                        })
                                    }
                                    pdata.data.push(record);
                                })
                                ids = (ids.substring(ids.length - 1) == ',') ? ids.substring(0, ids.length - 1) : ids;
                            }
                            return pdata;
                        },
                        cols: cols,
                        data: [],
                        even: true,
                        id: 'evaluationScoreTable_'+item.index,
                    });
                }else{
                    listUrl = `${evaluationHost}api/timetableResult/results?timetableProcessId=${timetableProcessId}`
                    $(`#evaluationScoreTable_${item.index}`).parent().before(`<button class="layui-btn layui-btn-xs" style="position: absolute;left: 83px;top: 39px;" type="button" onclick="newRow(${item.index})">添加一行</button>`)
                    var coll = [];
                    var col = [];
                    $.each(item.configIndicatorDTOS,function (key,value) {
                        let o = new Object();
                        o = {
                            field: `evaluationScore${value.sort}`,
                            title:value.indicatorCname,
                            minWidth:80,
                            align:'center',
                            templet: function(d){
                                let firldstr = '';
                                switch (value.contentType) {
                                    case 'input':
                                        if(!d.flag) {
                                            let input = `<input class="layui-input" style="border: #eee solid 1px;border-radius: 2px;" type="text" name="evaluationScore${value.sort}" id="evaluationScore${value.sort}" value="" />`
                                            firldstr = input;
                                        }else{
                                            if(d[`evaluationScore${value.sort}`]){
                                                firldstr = d[`evaluationScore${value.sort}`].split('_')[d[`evaluationScore${value.sort}`].split('_').length-1];
                                            }else{
                                                firldstr = '';
                                            }

                                        }
                                        break;
                                    case 'select':
                                        if(!d.flag) {
                                            let select = '<select name="evaluationScore' + value.sort + '" id="selectConfig' + value.sort + '" lay-filter="select' + value.sort + '" lay-search="">' +
                                                '<option value="">请选择' + value.indicatorCname + '</option>' +
                                                '</select>'
                                            firldstr = select;
                                        }else{
                                            if(d[`evaluationScore${value.sort}`]){
                                                firldstr = d[`evaluationScore${value.sort}`];
                                            }else{
                                                firldstr = '';
                                            }
                                        }
                                        break;
                                }
                                return firldstr;

                            }
                        }
                        o['data-contentType'] = value.contentType;
                        col.push(o)

                    })
                    col.push({
                        // fixed: 'right',
                        title: '操作',
                        minWidth: 100,
                        toolbar: `#tabletoolbar_${item.index}`
                    })
                    coll.push(col);
                    cols = coll;
                    //liebiao
                    table.render({
                        elem: '#evaluationScoreTable_'+item.index,
                        url: listUrl, //数据接口
                        title: '列表',
                        page: true, //开启分页
                        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
                            //curr: 5, //设定初始在第 5 页
                            groups: 1, //只显示 1 个连续页码
                            first: false, //不显示首页
                            last: true //显示尾页
                        },
                        parseData: function(res){ //res 即为原始返回的数据
                            console.log(res);
                            var pdata = {
                                "code": 0, //解析接口状态
                                "msg": "", //解析提示文本
                                "count": res.total ? res.total : res.count, //解析数据长度
                                "data": [] //解析数据列表
                            };
                            if(res.code == 500){
                                return pdata;
                            }
                            if(res.data.length>0){
                                $.each(res.data,function(index,item){
                                    var record = {};
                                    record = item;
                                    record.flag = true;
                                    pdata.data.push(record);
                                })
                            }
                            return pdata;
                        },
                        cols: cols,
                        data: [],
                        even: true,
                        page: true,
                        limits: [5, 10, 15, 20],
                        limit: 5, //每页默认显示的数量
                        request:{
                            page:'page',
                            limit:'limit'
                        },
                        id: 'evaluationScoreTable_'+item.index,
                        done: function (res, curr) {
                            $.each(res.data,function(i,d){
                                if(d.flag == false){
                                    $.each(item.configIndicatorDTOS,function (j,o) {
                                        switch (o.contentType) {
                                            case 'input':
                                                $(`[name=evaluationScore${o.sort}]`).val(d[`evaluationScore${o.sort}`]);
                                                break;
                                            case 'select':
                                                if(!o.url){
                                                    $.each(o.configIndicatorDTOS,function (m, n) {
                                                        $('#selectConfig'+o.sort).append(new Option(n.indicatorCname, n.id));// 下拉菜单里添加元素
                                                    });
                                                    form.render("select");
                                                    $(`[name=evaluationScore${o.sort}]`).val(d[`evaluationScore${o.sort}`]);
                                                }else{
                                                    var regex = new RegExp("http");
                                                    if(regex.test(o.url)){
                                                        var url =o.url;
                                                    }else{
                                                        var url=zuulHost+o.url;
                                                    }
                                                    if(o.indicatorName.indexOf('|current|')!=-1){
                                                        url += url.indexOf('?')!=-1 ? '&username='+currusername : '?username='+currusername

                                                        // url+='?username='+currusername;
                                                    }
                                                    $.ajax({
                                                        url: url,
                                                        dataType: 'json',
                                                        async: false,
                                                        type: 'post',
                                                        // headers: {"x-datasource": "limsproduct"},
                                                        success: function (res) {
                                                            // console.log(res)
                                                            $.each(res.data, function (m, n) {
                                                                $(`[name=evaluationScore${o.sort}]`).append(new Option(n.text, n.id));// 下拉菜单里添加元素
                                                            });

                                                            $(`[name=evaluationScore${o.sort}]`).val(d[`evaluationScore${o.sort}`].split('_')[0]);
                                                            form.render("select");
                                                        }
                                                    })
                                                }
                                                $(`[name=evaluationScore${o.sort}]`).next().find('input').click(function () {
                                                    let x = $(this).offset().top;
                                                    let y = $(this).offset().left;
                                                   $(this).parent().next().css({
                                                       'position': 'fixed',
                                                       'min-width': `${$(this).parent().width()}px`,
                                                       'top': `${x+30}px`,
                                                       'left': `${y}px`
                                                   })
                                                })
                                                break;
                                        }

                                    })
                                    return false;
                                }
                            })
                        }
                    });
                    //监听工具条
                    var filter = 'evaluationScoreTable_'+item.index;
                    let currpage = 1;//当前页码
                    let editornew = false;//当前是否有数据在编辑/新增状态,如果有则不允许另开一条数据编辑/新增
                    table.on(`tool(${filter})`, function(obj){
                        let _this = $(this);
                        if(obj.event === 'save'){
                            let newdata = new Object();
                            if(obj.data.id){
                                newdata = obj.data;
                            }
                            $.each(cols[0],function (key,value) {
                                switch (value['data-contentType']) {
                                    case 'input':
                                        newdata[value.field] = $(`[name=${value.field}]`).val();
                                        break;
                                    case 'select':
                                        newdata[value.field] = $(`[name=${value.field}]`).val()+'_'+$(`[name=${value.field}]`).find("option:selected").text();
                                        break;
                                }
                            })
                            console.log(newdata);
                            submitNoJump = false;
                            submitOrSave = false;
                            saveNewTimetable(newdata,step,[]);
                            table.reload(filter,{
                                url:listUrl,
                                page:{curr:currpage}
                                // limit:5
                            });
                            editornew = false;
                            submitNoJump = true;
                        }else if(obj.event === 'cancel'){
                            editornew = false;
                            table.reload(filter,{
                                url:listUrl,
                                page:{curr:currpage}
                                // limit:5
                            });
                        }else if(obj.event === 'del'){
                            layer.confirm('真的删除行么', function(index) {
                                $.ajax({
                                    url: `${evaluationHost}api/timetableResult/results/${obj.data.id}`,
                                    type: 'DELETE',
                                    success: function (res) {
                                        if(res.code === 0){
                                            layer.msg('删除成功');
                                            table.reload(filter,{
                                                url:listUrl,
                                                page:{curr:1}
                                                // limit:5
                                            });
                                        }
                                    }
                                });
                                layer.close(index);
                            });
                        }else if(obj.event === 'edit'){
                            if(!editornew){
                                editornew = true
                            }else{
                                layer.alert('您当前已在编辑/新增状态,请先保存再进行编辑!谢谢配合');
                                return false;
                            }
                            currpage = $(".layui-laypage-em").next().html(); //当前页码值
                            var oldData = table.cache[filter];
                            $.each(oldData,function (key,value) {
                                if(value.id === obj.data.id){
                                    value.flag = false;
                                    return false;
                                }
                            })
                            table.reload(filter,{
                                url: null,
                                data : oldData,
                                page:{curr:1}  //当前页
                                // limit:5
                            });
                        }
                    });
                    //表格类型新增一行数据
                    window.newRow = function (index) {
                        if(!editornew){
                            editornew = true
                        }else{
                            layer.alert('您当前已在编辑/新增状态,请先保存再进行新增!谢谢配合');
                            return false;
                        }
                        let old = table.cache[`evaluationScoreTable_${index}`];
                        // console.log(cols);
                        let newData = new Object();
                        $.each(cols[0],function (key,value) {
                            newData[value.field] = '';
                        })
                        newData['flag'] = false;
                        old.unshift(newData);
                        table.reload(`evaluationScoreTable_${index}`,{
                            url: null,
                            data : old,
                            // limit: old.length
                        });
                    }
                }

            })
            if(extendsField){
                let fields = extendsField.split(',');
                $.each(fields,function (key, value) {
                    if(value.indexOf('projectName')!==-1){
                        $('[name=evaluationScore'+ value.split('@')[1] +']').val(value.split('@')[3])
                        $('[name=evaluationScore'+ value.split('@')[1] +']').attr('disabled','disabled');
                    }else if(value.indexOf('initiatorUsers')!==-1){
                        let objs = value.split('@')[3].split(',');
                        let s = '';
                        let selected = [];
                        if(objs.length>0){
                            $.each(objs,function (i,d) {
                                s+=d.split('_')[0]+',';
                                selected.push({name: d.split('_')[d.split('_').length-1],value: d.split('_')[0], selected: true})
                            })
                            s = s.slice(0,s.length-1);
                            $('[name=evaluationScore'+ value.split('@')[1] +']').val(s);
                            let xmList = xmSelect.get('#multiSelectConfig' + value.split('@')[1]);
                            // let multis = 'multiSelectConfig'+value.split('@')[1];
                            xmList[0].update({data: selected});
                        }
                    }
                })
                form.render();
            }
        }
        //选项卡切换监听
        function elementChange() {
            $.each(evaluationTabConfig,function (index,item) {
                var filter = 'evaluationTabConfig_'+item.index;
                element.on('tab('+ filter +')', function(data){
                    // console.log(this); //当前Tab标题所在的原始DOM元素
                    // console.log(data.index); //得到当前Tab的所在下标
                    // console.log(data.elem.context.id); //得到当前的Tab大容器
                    var id = data.elem.context.id;
                    // timetableConfig = id.split('_')[1];
                    var str = '<table class="layui-hide add_progress" id="evaluationTable_'+ id.split('_')[1]+'_'+id.split('_')[2] +'" lay-filter="evaluationTable_'+ id.split('_')[1]+'_'+id.split('_')[2] +'"></table>';
                    // str += ' <script type="text/html" id="toolbar_'+ id +'">' +
                    //     '<a class="layui-btn layui-btn-xs" lay-event="download">下载</a>' +
                    //     '</script>';
                    var index = id.split('_')[1];
                    $('.layui-tab-'+index).html(str);
                    element.render('tab');
                    targetList(id.split('_')[1]+'_'+id.split('_')[2]);
                });
            })
        }
        //获取第一个所有指标项
        function getAllTarget(stage) {
            if(stage == 1){
                if(evaluationTable.length>0){
                    targetList(evaluationTable[0]);
                }
                // console.log(evaluationTable)
            }
        }
        //获取指标项表格
        function targetList(item) {
            var configIndex = item.split('_')[0];
            var targetId = item.split('_')[1];
            var data = [];
            var col = [];
            var cols = [];
            var configData = '';
            // console.log(evaluationTabConfig);
            var options;
            $.each(evaluationTabConfig,function (index,item) {
                if(item.index == configIndex){
                    options = item.objects.indicatorOptions.split(',');
                }
            });
            if(!isNewStep){
                col.push(
                    {title:'序号',width:50,type:"numbers"},
                    {field: 'targetName',title: '指标', align: 'center'},
                    {field: 'result',title: '结果', align: 'center'}
                );
            }else{
                col.push(
                    {title:'序号',width:50,type:"numbers"},
                    {field: 'targetName',title: '指标', align: 'center'}
                );
                $.each(options,function (index,item) {
                    col.push({title: item,field: 'target'+index,width:100, align: 'center', templet: function(d){
                        return '<input type="radio" name="target_'+ d.id +'" value="'+ item +'" lay-skin="primary">'
                    }});
                })
            }
            cols.push(col);
            $.each(evaluationTabConfig,function (index,item) {
                if(configIndex == item.index){
                    if(item.objects.configIndicatorDTOS.length>0) {
                        $.each(item.objects.configIndicatorDTOS, function (i, d) {
                            if(objectLevel == 2){
                                $.each(d.configIndicatorDTOS, function (i1, d1) {
                                    var flag = false;
                                    if(targetId == d1.id){
                                        flag = true;
                                    }
                                    if(flag){
                                        if(!isNewStep){
                                            $.each(d1.configIndicatorDTOS, function (i2, d2) {
                                                $.each(evaluationTabResult,function (j,k) {
                                                    if(configIndex == k.index){
                                                        if(k.result.indexOf(d2.id)!=-1){
                                                            data.push({id: d2.id,targetName:d2.indicatorCname,result: options[1]});
                                                        }else{
                                                            data.push({id: d2.id,targetName:d2.indicatorCname,result: options[0]});
                                                        }
                                                    }
                                                })
                                            })
                                        }else{
                                            $.each(d1.configIndicatorDTOS,function (i2,d2) {
                                                data.push({id: d2.id,targetName:d2.indicatorCname,parentId: d2.parentId});
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            });
            // var toolbar = '#toolbar_'+item;
            table.render({
                elem: '#evaluationTable_'+item,
                title: '指标列表',
                page: false,
                cols: cols,
                data: data,
                even: true,
                done: function(res, curr, count) {
                    //默认选中
                    if(evaluationTabTargetAllType.length>0){
                        $.each(res.data,function (index,item) {
                            $.each(evaluationTabTargetAllType,function (i,d) {
                                if(d.id == item.id){
                                    var name = 'target_'+d.id
                                    $("input[name="+name+"][value="+ d.result +"]").prop("checked","true");
                                }
                            });
                        });
                        form.render();
                    }
                    // 监听单选单击事件,其中my_table_1是table的lay-filter的属性值
                    var filter = 'evaluationTable_'+item;
                    table.on('row('+ filter +')',function(obj){
                        // 其中，obj是单选后当前行的数据
                        // console.log(obj);
                        var name = 'target_'+obj.data.id
                        var checked = $('input[name="'+ name +'"]:checked').val();
                        if(checked == undefined){checked = ''};
                        var tarFlag = true;
                        $.each(evaluationTabTargetAllType,function (index,item) {
                            if(item.id == obj.data.id){
                                // evaluationTabTarget.splice(index, 1);
                                tarFlag = false;
                            }
                            if(!tarFlag){
                                item.result = checked;
                            }
                        });
                        if(tarFlag){
                            evaluationTabTargetAllType.push({index: configIndex,id: obj.data.id,result: checked});
                        }
                        if(checked == options[1]){
                            var flag = true;
                            $.each(evaluationTabTarget,function (index,item) {
                                if(item.id == obj.data.id){
                                    // evaluationTabTarget.splice(index, 1);
                                    flag = false;
                                }
                            });
                            if(flag){
                                evaluationTabTarget.push({index: configIndex,id: obj.data.id});
                            }
                        }else if(checked == options[0]){
                            $.each(evaluationTabTarget,function (index,item) {
                                if(item.id == obj.data.id){
                                    evaluationTabTarget.splice(index, 1);
                                    return false;
                                }
                            })
                        }
                        // window.parent.document.getElementById("contents").contentWindow.reSeGYS(obj.data.ck2, obj.data.ck3);
                        // window.parent.closeWinSelect();
                    });
                }
            });
            //监听行工具事件
            // table.on('tool(meetingFiles_'+ item +')', function(obj) { //注：tool 是工具条事件名，meetingTable 是 table 原始容器的属性 lay-filter="对应的值"
            //     var data = obj.data //获得当前行数据
            //         ,
            //         layEvent = obj.event; //获得 lay-event 对应的值
            //     //下载附件
            //     if(obj.event === 'download') {
            //         // console.log(data);
            //         downLoadFile(data.fileId);
            //     };
            //     //删除附件
            //     if(obj.event === 'delete') {
            //         // console.log(data);
            //     };
            // });
        }
        //添加对象
        window.addObject = function (index) {
            $('#objectadded'+ index).remove();
            var xmList = xmSelect.get('#localObjectConfig2_'+index);
            var obids = xmList[0].getValue('value');
            var str = '<div class="layui-collapse" id="objectadded'+ index +'">';
            $.each(localObjects,function (i,d) {
                if(d.index == index){
                    $.each(d.objects,function (i1,d1) {
                        $.each(d1.configIndicatorDTOS,function (i2,d2){
                            $.each(obids,function (index,item) {
                                if(item == d2.id){
                                    str+='<div class="layui-colla-item">' +
                                        '<h2 class="layui-colla-title">'+ d2.indicatorCname +'</h2>' +
                                        '<div class="layui-colla-content"><ul>';
                                    if(d2.configIndicatorDTOS.length>0){
                                        $.each(d2.configIndicatorDTOS,function (i3,d3) {
                                            str+='<li id="level3'+ d3.id +'">'+ d3.indicatorCname +'</li>'
                                        })
                                    }
                                    str+='</ul></div></div>'
                                }
                            })
                        })
                    })
                }

            })
            str+='</div>';
            $('#add_object'+index).after(str);
            element.render("collapse")
        };
        //上传附件
        window.uploadFileMeeting = function (index,step) {
            var temp = templateInfo.templateCname+templateInfo.id+'('+ step +')';
            openUploadWindowByPath('配置中心/业务流程记录/'+temp,index,step);
        };
        //导入附件
        window.importFile = function (index,importStep,isOverride,task,indicatorName,url) {
            // var fileData = new Object();
            if(indicatorName.indexOf('|userInfo|')!=-1){
                var formData = new FormData();
                if(!timetableId){
                    formData.append('templateId', templateId);
                    formData.append('sourceProject', clientId);
                    formData.append('initiatorUsername', currusername);
                    formData.append('initiatorCname', currcname);
                    formData.append('businessIds', businessId);
                }else{
                    formData.append('timetableId', timetableId);
                }
                formData.append('file', $("#importFile"+index)[0].files[0]);
                console.log(formData);
                var regex = new RegExp("http");
                let importUrl = '';
                if(regex.test(url)){
                    importUrl=url;
                }else{
                    importUrl=zuulHost+url;
                }
                $.ajax({
                    url: importUrl,
                    type:'post',
                    data:formData,
                    async: false,
                    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
                    processData: false,// 告诉jQuery不要去处理发送的数据
                    success: function (res) {
                        // console.log(res);
                        if(res.code == 0){
                            layer.msg('<span style="color:white;">导入成功!</span>');
                            if(!timetableId){
                                timetableId = res.data[0].id;
                                timetableProcessId = res.data[0].timetableProcessDTOS[0].timetableProcessId
                            }
                            // window.location.reload()
                        }
                        else{layer.msg('<span style="color:white;">导入失败!</span>')}
                    }
                })
            }else{
                if(importStep == 0 ||importStep == 1){layer.msg('请设置导入字段indicator_name或者第一步不能导入!');return false}
                var name = $("#importFile"+index).val();
                // fileData['timetableProcessId'] = timetableProcessId;
                // fileData['file'] = $("#importFile"+index)[0].files[0];
                var formData = new FormData();
                formData.append('timetableId', timetableId);
                formData.append('isOverride', isOverride);
                formData.append('step', importStep);
                if(task!=null &&  task!= 0){
                    formData.append('parallelTask', task);
                }
                formData.append('file', $("#importFile"+index)[0].files[0]);
                $.ajax({
                    url: evaluationHost + 'api/timetableResult/resultByExcel',
                    type:'post',
                    data:formData,
                    async: false,
                    contentType: false,// 告诉jQuery不要去设置Content-Type请求头
                    processData: false,// 告诉jQuery不要去处理发送的数据
                    success: function (res) {
                        // console.log(res);
                        if(res.code == 200){
                            layer.msg('<span style="color:white;">导入成功!</span>');
                            // window.location.reload()
                        }
                        else{layer.msg('<span style="color:white;">导入失败!</span>')}
                    }
                })
            }

        };
        //导出附件
        window.exportFile = function (index,importStep,task) {
            let url = evaluationHost+ 'api/timetableResult/exportResultToExcel?timetableId='+timetableId+'&step='+importStep;
            if(task!=null &&  task!= 0)
                url+='&parallelTask='+task;
            location.href = url;
        };
        //获取当前模板类型
        function getTemplateType(){
            $.ajax({
                url: evaluationHost + 'api/template/info?templateId='+templateId,
                type:'get',
                async: false,
                success:function (res){
                    // console.log(res)
                    templateInfo = res.data;
                    // if(templateInfo.isAudit == 1){
                    //     var str = '';
                    //     str+='<div class="layui-row">' +
                    //         '<div class="layui-col-lg12">' +
                    //         '<label class="layui-form-label">结果</label>' +
                    //         '<div class="layui-input-block">' +
                    //         '<input type="radio" name="isAudit'+ templateId +'" value="1" title="通过">' +
                    //         '<input type="radio" name="isAudit'+ templateId +'" value="0" title="不通过" checked>' +
                    //         // '<input type="text" id="isAudit'+ templateId +'" name="isAudit'+ templateId +'"  lay-verify="required" placeholder="请选择'+ item.indicatorCname +'" autocomplete="off" class="layui-input" />' +
                    //         '</div></div></div>';
                    //     $('.tutor-block').before(str);
                    //     // form.render();
                    // }
                },
                error:function () {
                    layer.msg("获取模板列表失敗！");
                }
            });
        }
        window.firstSubmit = function(url,obj){
            submitNoJump = false;
            // layer.msg('提交不允许跳转!')
            layer.confirm('点击链接将自动提交表单', function(index) {
                if($(obj).attr('data')==1){
                    layer.msg('<span style="color:white;">您已缴费完成,请勿重新缴费!</span><br>');
                }else{
                    $.cookie('resultId',$('#id').val());
                    $.cookie('payIndex',$(obj).attr('id').replace(/[^0-9]/ig,""));
                    window.open(url+'?username='+ currentUsername,'_blank');
                    $("#saveTimetable").click();
                }
                // return true;
            });
        }
        form.on('submit(saveTimetable)', function(data){
            console.log('保存');
            $("[data-method='submit']").attr("disabled",true).css("pointer-events","none");
            $("[data-method='save']").attr("disabled",true).css("pointer-events","none");
            // console.log(data.elem); //被执行事件的元素DOM对象，一般为button对象
            // console.log(data.form);//被执行提交的form对象，一般在存在form标签时才会返回
            // console.log(data.field);//当前容器的全部表单字段，名值对形式：{name: value}
            var d1 = data.field;
            var configIndicatorDTOss = [];
            // console.log(d1);
            $.each(multiSelectConfig,function (index,item){
                var xmList = xmSelect.get('#multiSelectConfig'+item.index);
                var valueArr = xmList[0].getValue('value');
                var nameArr = xmList[0].getValue('name');
                var str = '';
                $.each(valueArr,function (i,d) {
                    str+=d+'_'+nameArr[i]+',';
                });
                str = str.slice(0,str.length-1);
                // d1['evaluationScore'+item.index] = xmList[0].getValue('valueStr')+'_'+xmList[0].getValue('nameStr')
                d1['evaluationScore'+item.index] = str;
            });
            $.each(selectConfig,function (index,item) {
                d1['evaluationScore'+item.index] += '_'+$('#selectConfig'+item.index).find("option:selected").text();
            });
            $.each(localObjects,function (index,item) {
                if(item.indicatorName == 'checkTimeType'){
                    d1['evaluationScore'+item.index] = d1['localObject1_'+item.index]+'_'+d1['localObjectSonConfig'+item.index]
                }else if(item.indicatorName == 'select'){
                    d1['evaluationScore'+item.index] = d1['localObject1_'+item.index]+'_'+$('#localObject1_'+item.index).find("option:selected").text();
                }else if(item.indicatorName == 'select2'){
                    if($('#localObject1_'+item.index).val()!=''){
                        d1['evaluationScore'+item.index] = $('#localObject1_'+item.index).find("option:selected").text()+'_'+$('#localObjectSonConfigBowl_'+item.index).find("option:selected").text()
                    }else{
                        d1['evaluationScore'+item.index] = $('.last_choose').text();
                    }
                }
            });
            $.each(evaluationTabTarget,function (index,item) {
                d1['evaluationScore'+item.index] = d1['evaluationScore'+item.index] ? d1['evaluationScore'+item.index]+item.id+',' : item.id+',';
                // d1['evaluationScore'+item.index] += item.id+',';
            });
            $.each(checkboxConfig,function (index,item) {
                let tasks = '';
                $('input[name="evaluationScore'+ item.index +'"]:checked').each(function() { //遍历所有被选中的name为selectFlag的 checkbox
                    tasks+=$(this).val()+'_'+$(this).attr('title')+',';
                });
                tasks = (tasks.substring(tasks.length - 1) == ',') ? tasks.substring(0, tasks.length - 1) : tasks
                d1['evaluationScore'+item.index] = tasks;
            });
            $.each(urlConfig,function (index,item) {
                if(item.type.indexOf('|pay|')!=-1){
                    var isPay = $('#evaluationScore'+item.index).attr('data');
                    d1['evaluationScore'+item.index] = isPay;
                }else {
                    d1['evaluationScore'+item.index] = $('#evaluationScore'+item.index).attr('href')
                }
            });
            $.each(evaluationTabConfig,function (index,item) {
                if(evaluationTabTarget.length>0){
                    d1['evaluationScore'+item.index] = d1['evaluationScore'+item.index].substring(0,d1['evaluationScore'+item.index].length-1);
                }else{
                    d1['evaluationScore'+item.index] = ''
                }
            });
            var newOtherStepResults = new Array();
            $.each(tableConfig,function (index,item) {
                if(item.type.indexOf('|checkbox|')!=-1){
                    var str = '';
                    var checkStatus = table.checkStatus('evaluationScoreTable_'+item.index)
                    $.each(checkStatus.data,function (i,data) {
                        str += data.id+',';
                        var otherStepResultDto = new Object();
                        otherStepResultDto['initiatorUsername'] = currusername;
                        otherStepResultDto['initiatorCname'] = currcname;
                        for(var k in data){
                            if(k.indexOf('header')!=-1){
                                otherStepResultDto['evaluationScore'+(Number(k.replace(/[^0-9]/ig,""))+1)] = data[k];
                            }
                        }
                        newOtherStepResults.push(otherStepResultDto);
                    })
                    str = str ? str.slice(0,str.length-1) : str;
                    d1['evaluationScore'+item.index] = str;
                }
                // d1['evaluationScore'+item.index] =
            });
            if(otherStepResultFlag){
                $.each(otherStepResult,function (index,data) {
                    delete data.id;
                    delete data.timetableProcessId;
                })
                newOtherStepResults = otherStepResult;
            }
            console.log(d1);
            saveNewTimetable(d1,step,newOtherStepResults);
        });
        function loading(msg){
            msgindex = layer.msg(msg, {
                icon:16,
                shade:[0.1, '#fff'],
                time:false,  //不自动关闭
                offsetqiuchuy:"100px"
            })
        }
        function saveNewTimetable(d1,step,otherStepResults) {
            // if(step == 1){
            if(!timetableId){
                // var loading = layer.load(1, {
                //     shade: [0.1,'#fff'] //0.1透明度的白色背景
                // });
                const getTimetable = new Promise((resolve, reject) => {
                    $.ajax({
                        url:evaluationHost+'api/timetable/timetableByTemplate',
                        // dataType: 'json',
                        data: {templateId:templateId,sourceProject:0,initiatorUsername:currusername,initiatorCname:currcname},
                        type: 'post',
                        async: false,
                        // contentType:"application/json;charset=utf-8",
                        success:function (data) {
                            // console.log(data);
                            resolve(data);
                        },
                        error: function () {
                            alert("后台保存业务总表报错");
                            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                        }
                    })
                })
                getTimetable.then(
                    (data) => {
                        if(data.code == '200'){
                            d1['businessKey'] = data.data[0].id;
                            d1['timetableProcessId'] = data.data[0].timetableProcessDTOS[0].timetableProcessId;
                            d1['initiatorUsername'] = currusername;
                            d1['initiatorCname'] = currcname;
                            var newTimetableResultDTO = new Object();
                            newTimetableResultDTO['timetableResult'] = d1;
                            newTimetableResultDTO['submitUser'] = currusername;
                            if(!submitOrSave){
                                newTimetableResultDTO['isComplete'] = -1;
                            }else{
                                newTimetableResultDTO['isComplete'] = 0;
                            }
                            newTimetableResultDTO['timetableProcessId'] = data.data[0].timetableProcessDTOS[0].timetableProcessId;
                            if(otherStepResults.length>0){
                                newTimetableResultDTO['otherStepResults'] = otherStepResults;
                            }
                            if(auditConfig.length>0){
                                var isAudit = $('input[name="evaluationScore'+ auditConfig[0] +'"]:checked').val();
                                if(isAudit == '合格'){//临时
                                    newTimetableResultDTO['result'] = 'pass';
                                }else if(isAudit == '不合格'){
                                    newTimetableResultDTO['result'] = 'fail';
                                }else{
                                    newTimetableResultDTO['result'] =  isAudit;
                                }
                            }
                            if(taskConfig.length>0){
                                let tasks = '';
                                $('input[name="evaluationScore'+ taskConfig[0] +'"]:checked').each(function() { //遍历所有被选中的name为selectFlag的 checkbox
                                    tasks+=$(this).val()+',';
                                });
                                tasks = (tasks.substring(tasks.length - 1) == ',') ? tasks.substring(0, tasks.length - 1) : tasks
                                newTimetableResultDTO['taskList'] =  tasks;
                            }
                            if(messageConfig.length>0){
                                var sendMsg = $('input[name="evaluationScore'+ messageConfig[0] +'"]:checked').val();
                                if(sendMsg == 1){
                                    // layer.msg('需要发送信息');
                                    let target = [];
                                    let initiator = [];
                                    let valueStr = '';
                                    let messageUserDtos = [];
                                    $.each(userStatus,function (i,d) {
                                        let xmList = xmSelect.get('#multiSelectConfig'+d.index);
                                        if(d.indicatorEname == 'targetUsers'){
                                            target = xmList[0].getValue('value');
                                        }else if(d.indicatorEname == 'initiatorUsers'){
                                            initiator = xmList[0].getValue('value');
                                        }
                                        valueStr += xmList[0].getValue('valueStr')+',';
                                    })
                                    //获取用户基本信息
                                    $.ajaxSettings.async = false;
                                    $.get( userCenterHost + '/usercenter/getBasicInfo',{usernames: valueStr}, function (res) {
                                        // console.log(res);
                                        if (res.data.length>0) {
                                            $.each(res.data,function (i,d) {
                                                if(target.indexOf(d.username)!=-1){
                                                    messageUserDtos.push({username: d.username,cname: d.cname,phone: d.phone,email: d.email,status: 'targetUsers'})
                                                }else{
                                                    messageUserDtos.push({username: d.username,cname: d.cname,phone: d.phone,email: d.email,status: 'initiatorUsers'})
                                                }
                                            })
                                        }
                                    })
                                    $.ajaxSettings.async = true;
                                    newTimetableResultDTO['messageUserDTOS'] = messageUserDtos;
                                    // console.log(messageUserDtos);
                                }
                            }
                            // newTimetableResultDTO['stageId'] = currusername;
                            var data2 = JSON.stringify(newTimetableResultDTO);
                            saveResult(data2)
                        }else{
                            alert("后台保存业务总表报错");
                            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                        }
                    },
                    (err) => {
                        alert("后台保存业务总表报错");
                        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                    }
                )
                // layer.close(loading);
            }else{
                if(otherStepResultFlag){
                    d1 = null;
                }
                if(!otherStepResultFlag){
                    d1['timetableProcessId'] = timetableProcessId;
                    d1['initiatorUsername'] = currusername;
                    d1['initiatorCname'] = currcname;
                }
                var timetableResultDTO = new Object();
                timetableResultDTO['timetableResult'] = d1;
                timetableResultDTO['submitUser'] = currusername;
                timetableResultDTO['stageId'] = step;
                timetableResultDTO['timetableProcessId'] = timetableProcessId;
                timetableResultDTO['processCname'] = processCname;
                if(otherStepResults.length>0){
                    timetableResultDTO['otherStepResults'] = otherStepResults;
                }
                if(auditConfig.length>0){
                    var isAudit = $('input[name="evaluationScore'+ auditConfig[0] +'"]:checked').val();
                    if(isAudit == '合格'){//临时
                        timetableResultDTO['result'] = 'pass';
                    }else if(isAudit == '不合格'){
                        timetableResultDTO['result'] = 'fail';
                    }else{
                        timetableResultDTO['result'] =  isAudit;
                    }
                }
                if(taskConfig.length>0){
                    let tasks = '';
                    $('input[name="evaluationScore'+ taskConfig[0] +'"]:checked').each(function() { //遍历所有被选中的name为selectFlag的 checkbox
                        tasks+=$(this).val()+',';
                    });
                    tasks = (tasks.substring(tasks.length - 1) == ',') ? tasks.substring(0, tasks.length - 1) : tasks
                    timetableResultDTO['taskList'] =  tasks;
                }
                if(messageConfig.length>0) {
                    var sendMsg = $('input[name="evaluationScore' + messageConfig[0] + '"]:checked').val();
                    if (sendMsg == 1) {
                        // layer.msg('需要发送信息');
                        let target = [];
                        let initiator = [];
                        let valueStr = '';
                        let messageUserDtos = [];
                        $.each(userStatus, function (i, d) {
                            let xmList = xmSelect.get('#multiSelectConfig' + d.index);
                            if (d.indicatorEname == 'targetUsers') {
                                target = xmList[0].getValue('value');
                            } else if (d.indicatorEname == 'initiatorUsers') {
                                initiator = xmList[0].getValue('value');
                            }
                            valueStr += xmList[0].getValue('valueStr') + ',';
                        })
                        //获取用户基本信息
                        $.ajaxSettings.async = false;
                        $.get(userCenterHost + '/usercenter/getBasicInfo', {usernames: valueStr}, function (res) {
                            // console.log(res);
                            if (res.data.length > 0) {
                                $.each(res.data, function (i, d) {
                                    if(target.indexOf(d.username)!=-1){
                                        messageUserDtos.push({username: d.username,cname: d.cname,phone: d.phone,email: d.email,status: 'targetUsers'})
                                    }else{
                                        messageUserDtos.push({username: d.username,cname: d.cname,phone: d.phone,email: d.email,status: 'initiatorUsers'})
                                    }
                                })
                            }
                        })
                        $.ajaxSettings.async = true;
                        timetableResultDTO['messageUserDTOS'] = messageUserDtos;
                        // console.log(messageUserDtos);
                    }
                }
                // 保存
                if(!flagSP||!submitOrSave){
                    timetableResultDTO['isComplete'] = -1;
                    var data = JSON.stringify(timetableResultDTO);
                    saveSpecialTemplateResult(processKey,data,'normal',step)
                }else{
                    if(step == 1){
                        timetableResultDTO['isComplete'] = 0;
                    }else{
                        timetableResultDTO['isComplete'] = 1;
                    }
                    var data = JSON.stringify(timetableResultDTO);
                    // 保存
                    saveResult(data)
                }
            }
        }
        function saveResult(data2) {
            // var data2 = JSON.stringify(d1);
            // 保存
            let saveResult = new Promise((resolve, reject) => {
                $.ajax({
                    // url:zuulUrl+'api/meetingProcess/saveMeetingProcess',
                    url:evaluationHost+'api/timetableResult/resultNew',
                    dataType: 'json',
                    data: data2,
                    type: 'post',
                    async: false,
                    contentType:"application/json;charset=utf-8",
                    beforeSend: function () {
                        loading("数据提交中,请耐心等待......");
                    },
                    complete: function (){
                        layer.close(msgindex);
                        $("[data-method='submit']").removeClass('disabled');
                        $("[data-method='save']").removeClass('disabled');
                    },
                    success:function (res) {
                        // console.log(res);
                        if(res.code == '200'){
                            if(res.msg == "over"){
                                if(processKey == 'enlist_process'){
                                    specialSaveApi(processKey,res.data);
                                }else{
                                    layer.msg('流程已结束!');
                                    var index = parent.layer.getFrameIndex(window.name);
                                    parent.layer.close(index);
                                    window.parent.location.reload();
                                }
                            }else if(res.msg == "incomplete"){
                                let alert = layer.alert('您当前阶段还有任务未提交,如果是需要重复提交的阶段需要去总览提交',function (index) {
                                    layer.close(alert);
                                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                                });
                            }else if(res.msg == "executed"){
                                layer.alert('您当前任务已经提交!',function (index) {
                                    var index = parent.layer.getFrameIndex(window.name);
                                    parent.layer.close(index);
                                    window.parent.location.reload();
                                });
                            }else{
                                if(submitNoJump){
                                    var index = parent.layer.getFrameIndex(window.name);
                                    parent.layer.close(index);
                                    window.parent.location.reload();
                                }else{
                                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                                }
                            }
                        }else{
                            layer.msg(res.msg);
                            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                        }
                    },
                    error: function () {
                        alert("后台保存数据报错");
                        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                    }
                });
            })
        }
        //提交表单
        var submitStep = {
            submit: function() {
                // var submit = body.find("#saveTimetable");
                submitOrSave = true;
                $("#saveTimetable").click();
            },
            save: function() {
                // var submit = body.find("#saveTimetable");
                submitOrSave = false;
                $("#saveTimetable").click();
            }
        };
        $('.submitStep').on('click', function() {
            var othis = $(this),
                method = othis.data('method');
            submitStep[method] ? submitStep[method].call(this, othis) : '';
        });
        //下一步页面
        var nextStep = {
            nextStep: function() {
                var that = this;
                window.location.href='stepCircle?timetableId='+timetableId+'&clientId='+clientId+'&templateId='+templateId+'&step='+(step+1);
            }
        };
        $('.nextStep').on('click', function() {
            var othis = $(this),
                method = othis.data('method');
            nextStep[method] ? nextStep[method].call(this, othis) : '';
        });
        //上一步页面
        var lastStep = {
            lastStep: function() {
                var that = this;
                window.location.href='stepCircle?timetableId='+timetableId+'&clientId='+clientId+'&templateId='+templateId+'&step='+(step-1);
            }
        };
        $('.lastStep').on('click', function() {
            var othis = $(this),
                method = othis.data('method');
            lastStep[method] ? lastStep[method].call(this, othis) : '';
        });
        /**
         * 只允许数字
         * @param obj
         */
        window.onlyNonNegative = function (obj) {
            var inputChar = event.keyCode;
            //alert(event.keyCode);

            //1.判断是否有多于一个小数点
            if(inputChar==190 ) {//输入的是否为.
                var index1 = obj.value.indexOf(".") + 1;//取第一次出现.的后一个位置
                var index2 = obj.value.indexOf(".",index1);
                while(index2!=-1) {
                    //alert("有多个.");

                    obj.value = obj.value.substring(0,index2);
                    index2 = obj.value.indexOf(".",index1);
                }
            }
            //2.如果输入的不是.或者不是数字，替换 g:全局替换
            obj.value = obj.value.replace(/[^(\d|.)]/g,"");
        }
        /**
         * 删除url中指定参数
         * @param parameter 数组或字符串, url 链接
         * @returns {string}
         */
        window.funcUrlDel = function(parameter,url) {
            var urlparts = url.split('?');
            if(urlparts.length >= 2) {
                //参数名前缀
                var prefix = encodeURIComponent(parameter) + '=';
                var pars = urlparts[1].split(/[&;]/g);
                //循环查找匹配参数
                for(var i = pars.length; i-- > 0;) {
                    if(pars[i].lastIndexOf(prefix, 0) !== -1) {
                        //存在则删除
                        pars.splice(i, 1);
                    }
                }
                return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
            }
            return url;
        }
    });
    e("phenomMenuList",{})
});