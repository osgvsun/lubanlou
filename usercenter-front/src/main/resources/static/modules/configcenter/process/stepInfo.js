// var evaluationHost =apiGateWayHost+"/configcenter/";
var zuulHost =apiGateWayHost,
    selectConfig = [],//记录配置项为单选下拉框的下标
    multiSelectConfig = [],//记录配置项为多选下拉框的下标
    inputConfig = [],//记录配置项为输入框的下标
    urlConfig = [],//记录配置项为外链的下标
    textConfig = [],//记录配置项为多行文本框的下标
    fileConfig = [],//记录配置项为附件的下标
    dateConfig = [],//记录配置项为日期的下标
    rangeDateConfig = [],//记录配置项为范围日期的下标
    rangeTimeConfig = [],//记录配置项为范围时间的下标
    tableConfig = [],//记录配置项为数据列表的下标
    rangeDateTimeConfig = [],//记录配置项为范围日期+时间的下标
    localObjectConfig = [],//记录配置项为本地(存在configcenter表)对象的下标
    localObjects = [],//本地(存在configcenter表)对象存储
    radioConfig = [],//记录配置项为单选框的下标
    evaluationTabConfig = [],//记录配置项为评分项的下标
    evaluationTable = [],//记录父指标项表格id
    evaluationTabTarget = [],//记录所有结果为需要保存的id
    evaluationTabTargetAllType = [],//记录所有指标项选中值
    evaluationTabResult = [],//记录指标项的结果
    auditConfig = [],//记录配置项为审核的下标
    localVariableDatas = [],//记录需要用到局部变量的数据
    steps = [],//所有阶段
    evaluationTabStep = [],//记录配置项为指标项的步骤
    textareafullscreens = [],//需要全屏的textarea
    currusername,//當前登錄人的工號
    currcname;//當前登錄人的姓名
layui.define(function (e) {
    layui.config({
        base:'../'
    }).extend({
        index:'lib/index'
    }).use(['index','table','layer','laydate','form','element','util'],function () {
        var $ = layui.$,
            layer = layui.layer,
            table = layui.table,
            laydate = layui.laydate,
            element = layui.element,
            util = layui.util,
            form = layui.form;
        getCurrentUser();
        //回到顶部
        // util.fixbar({
        //     bgcolor: '#409eff'
        //     ,showHeight: 100
        //     ,css: {right: 20, bottom: 10}
        //     ,bar1: '任务一;'
        //     ,bar2: '任务二;'
        //     ,css: {right: 20, bottom: 10}
            // ,click: function(type){
            //     console.log(type);
            //     if(type === 'bar1'){
            //         layer.confirm('确定打印?', function(index){
            //             layer.close(index);
            //             window.print();
            //             // $('.step-all-info').jqprint();
            //         });
            //     }else if(type === 'bar2') {
            //         layer.confirm('确定导出为word?', function(index){
            //             layer.close(index);
            //             $("input,select option").each(function(){
            //                 $(this).attr('value',$(this).val());
            //             });
            //             var element = $(".step-all-info").html();
            //             html2pdf().from(element).save();
            //             // $(".step-all-info").wordExport('word文档')
            //         });
            //     }
            // }
        // });
        function getCurrentUser() {
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
        window.getResultsByTemplateId = function(obj) {
        // function getResultsByTemplateId(){
            $.ajax({
                url: evaluationHost + 'api/timetable/info?timetableId='+timetableId,
                async: false,
                type: "get",
                success:function (res) {
                    console.log(res);
                    var data = res.data[0];
                    var str = '';
                    var stepIndex;
                    var historyStr = '';
                    var historyFlag = true;
                    $.each(data.timetableProcessDTOS,function (index,item) {
                        if(historyFlag && item.isChose == 1){
                            historyStr+='<div class="item_box">' +
                                '<div class="item-header">' +
                                '<i class="fa fa-dot-circle-o"></i>' +
                                '</div>' +
                                '<div class="item-content">';
                            if(item.processStep != currentStep){
                                historyStr+='<a class="jump_to_step" href="#stepInfo'+ item.processStep +'">'+item.processCname+'</a>';
                            }else{
                                historyStr+=item.processCname;
                            }
                            historyStr+='</div>' +
                                '</div>'
                        }
                        var f = true;
                        $.each(item.configIndicators,function (i,d) {
                            // if((d.indicatorName!=null&&d.indicatorName.indexOf('|count|')!=-1&&currentStep>=item.processStep)||(d.indicatorName!=null&&d.indicatorName.indexOf('|count|')!=-1&&currentStep == 0)) {//特殊处理的步骤:招募人员列表
                            if(d.indicatorName!=null&&(currentStep>=item.processStep||currentStep == 0)&&(d.indicatorName.indexOf('|count|')!=-1||d.indicatorName.indexOf('|autoInsert|')!=-1) && item.isChose == 1) {//特殊处理的步骤:招募人员列表
                                f = false;
                                str += specialTemplateConfigInfo(data,'table',item,currentStep,currusername,'info');
                            }
                        });
                        if(f){
                            if((currentStep>item.processStep||currentStep == 0) && item.isChose == 1){
                                str += '<div class="layui-col-md12" id="step_info_' + item.processStep + '_'+ item.parallelTask +'">' +
                                    '<div class="layui-card">' +
                                    '<div class="layui-card-header"><a name="stepInfo' + item.processStep + '">' + item.processCname + '</a></div>' +
                                    '<div class="layui-card-body">' +
                                    '<div class="layui-row layui-col-space20">' +
                                    '<form class="layui-form detail_item" action="" lay-filter="stepInfo_' + item.processStep + '_'+ item.parallelTask + '" id="stepInfo_' + item.processStep + '_'+ item.parallelTask + '">';
                                // str += configInput(item,data);
                                str += configInputByInfo(item,data);
                                str+='</form></div></div></div></div>'
                                if(specialSteps.length>0){
                                    specialStepRender(data.processKey);
                                }
                            }
                        }
                        if(currentStep == item.processStep){
                            historyFlag = false;
                        }
                        // if(data.processKey == "enlist_process"||data.processKey == "hire_process"||data.processKey == "examRegistration_process"){//招募/考试报名
                        //     var f = true;
                        //     $.each(item.configIndicators,function (i,d) {
                        //         if(d.indicatorName!=null&&d.indicatorName.indexOf('|count|')!=-1) {//特殊处理的步骤:招募人员列表
                        //             f = false;
                        //             str += specialTemplateConfigInfo(data,'table',item,currentStep,currusername,'info');
                        //         }
                        //     });
                        //     if(f){
                        //         if(currentStep>item.processStep||currentStep == 0){
                        //             str += configInput(item,data);
                        //         }
                        //     }
                        // }else{
                        //     if(currentStep>item.processStep||currentStep == 0){
                        //         str += configInput(item,data);
                        //     }
                        // }
                        // if(currentStep == item.processStep){
                        //     historyFlag = false;
                        // }

                    });
                    $('.item_box_limit').html(historyStr);

                    // console.log(steps)
                    $('.step-all-info').html(str);
                    if(specialSteps.length>0){
                        specialStepRender(data.processKey);
                    }
                    var params = getResultByInfo(data);
                    $.each(steps,function (i,d) {
                        form.val('stepInfo_'+d.step+'_'+d.task, params[i]);
                    })
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

                },
                error:function () {
                    alert("查看当前阶段信息失败!");
                    return false;
                }
            });
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
                    listUrl += listUrl.indexOf('?')!=-1 ? '&timetableId='+item.parentValue : '?timetableId='+item.parentValue
                    var headerUrl = listUrl;
                    $.ajax({
                        url:headerUrl,
                        async:false,
                        success: function (res) {
                            var coll = [];
                            var col = [];
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
                        elem: '#evaluationScoreTable_'+item.index+'_'+item.processStep,
                        url: listUrl, //数据接口
                        title: item.cname,
                        page: false,
                        limit: 999999, //page设置为false时limit默认10
                        toolbar:  '<div>'+ item.cname +'</div>' ,
                        parseData: function(res){ //res 即为原始返回的数据
                            // console.log(res);
                            var pdata = {
                                "code": 0, //解析接口状态
                                "msg": "", //解析提示文本
                                "count": res.total, //解析数据长度
                                "data": [] //解析数据列表
                            };
                            var selectId = $('#tableConfig'+item.index).val();
                            if(res.code == 500){
                                return pdata;
                            }
                            if(res.data.length>0){
                                // console.log(pdata);
                                var ids = '';
                                $.each(res.data,function(index,item){
                                    ids += item.id+',';
                                    $.each(selectId.split(','),function (i,d) {
                                        if(d == item.id){
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
                                        }
                                    })
                                })
                                ids = (ids.substring(ids.length - 1) == ',') ? ids.substring(0, ids.length - 1) : ids;
                            }
                            return pdata;
                        },
                        cols: cols,
                        data: table,
                        even: true,
                        id: 'evaluationScoreTable_'+item.index+'_'+item.processStep,
                    });
                }else{
                    listUrl = `${evaluationHost}api/timetableResult/results?timetableId=${timetableId}&processStep=${item.processStep}`
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
                                        firldstr = d[`evaluationScore${value.sort}`];
                                        break;
                                    case 'select':
                                        firldstr = d[`evaluationScore${value.sort}`]!=null ? d[`evaluationScore${value.sort}`].split('_')[d[`evaluationScore${value.sort}`].split('_').length-1] : '';
                                        break;
                                }
                                return firldstr;

                            }
                        }
                        o['data-contentType'] = value.contentType;
                        col.push(o)

                    })
                    // col.push({
                    //     fixed: 'right',
                    //     title: '操作',
                    //     toolbar: `#tabletoolbar_${item.index}`
                    // })
                    coll.push(col);
                    cols = coll;
                    //liebiao
                    table.render({
                        elem: '#evaluationScoreTable_'+item.index+'_'+item.processStep,
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
                                // pdata.data = res.data;
                                $.each(res.data,function(index,item){
                                    var record = {};
                                    record = item;
                                    // record.flag = true;
                                    if(!item.evaluationScore1 && !item.evaluationScore2 && !item.evaluationScore3){
                                        console.log('null data');
                                    }else{
                                        pdata.data.push(record);
                                    }

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
                        id: 'evaluationScoreTable_'+item.index+'_'+item.processStep,
                    });
                    //监听工具条
                    var filter = 'evaluationScoreTable_'+item.index+'_'+item.processStep;
                    table.on(`tool(${filter})`, function(obj){
                        let _this = $(this);
                    });
                }

            })
        }
        getResultsByTemplateId();
        //页面字段生成
        // function configInput(item,spdata) {
        //     var str = '';
        //     if(item.timetableResults.length>0) {
        //         var step = new Object();//所有阶段
        //         var is = [];//获取所有name
        //         step['step'] = item.processStep;
        //         str += '<div class="layui-col-md12" id="step_info_' + item.processStep + '">' +
        //             '<div class="layui-card">' +
        //             '<div class="layui-card-header"><a name="stepInfo' + item.processStep + '">' + item.processCname + '</a></div>' +
        //             '<div class="layui-card-body">' +
        //             '<div class="layui-row layui-col-space20">' +
        //             '<form class="layui-form detail_item" action="" lay-filter="stepInfo_' + item.processStep + '" id="stepInfo_' + item.processStep + '">';
        //         $.each(item.configIndicators, function (i, d) {
        //             is.push('evaluationScore' + (i + 1));
        //             if(d.indicatorName == null){d.indicatorName = ''}
        //             if (d.indicatorName.indexOf('|each|') == -1) {
        //             if (d.contentType == "text") {
        //                 textConfig.push((i + 1));
        //                 str += '<div class="layui-row">' +
        //                     '<div class="layui-col-lg12">';
        //                 if(d.comment!=''&&d.comment!=null){
        //                     str+='<label class="layui-form-label" lay-tips="'+ d.comment +'">' + d.indicatorCname + '</label>';
        //                 }else{
        //                     str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
        //                 }
        //                 str+='<div class="layui-input-block">' +
        //                     '<textarea type="text" name="evaluationScore' + (i + 1) + '" id="showConfig' + (i + 1) + '" autocomplete="off" disabled="disabled" readonly="readonly" class="layui-textarea"></textarea>' +
        //                     '</div></div></div>';
        //             } else if (d.contentType == "url") {
        //                 urlConfig.push((i + 1));
        //                 if (d.url == null) {
        //                     d.url = 'http://www.baidu.com'
        //                 }
        //                 str += '<div class="layui-row">' +
        //                     '<div class="layui-col-lg12">';
        //                 if(d.comment!=''&&d.comment!=null){
        //                     str+='<label class="layui-form-label" lay-tips="'+ d.comment +'">' + d.indicatorCname + '</label>';
        //                 }else{
        //                     str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
        //                 }
        //                 str+='<div class="layui-input-block">' +
        //                     '<a id="evaluationScore' + (i + 1) + '" href="' + d.url + '?username=' + currentUsername + '" target="_blank">点我进入' + d.indicatorCname + '</a>' +
        //                     '</div></div></div>';
        //             } else if (d.contentType == "multiSelect") {
        //                 str += '<div class="layui-row">' +
        //                     '<div class="layui-col-lg12">';
        //                 if(d.comment!=''&&d.comment!=null){
        //                     str+='<label class="layui-form-label" lay-tips="'+ d.comment +'">' + d.indicatorCname + '</label>';
        //                 }else{
        //                     str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
        //                 }
        //                 str+='<div class="layui-input-block">' +
        //                     '<textarea type="text" name="evaluationScore' + (i + 1) + '" id="showConfig' + (i + 1) + '" autocomplete="off" disabled="disabled" readonly="readonly" class="layui-textarea"></textarea>' +
        //                     '</div></div></div>';
        //             } else if (d.contentType == "file") {
        //                 fileConfig.push((i + 1));
        //                 str += '<div class="layui-row">' +
        //                     '<div class="layui-col-lg12">';
        //                 if(d.comment!=''&&d.comment!=null){
        //                     str+='<label class="layui-form-label" lay-tips="'+ d.comment +'">' + d.indicatorCname + '</label>';
        //                 }else{
        //                     str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
        //                 }
        //                 str+='<div class="layui-input-block">';
        //                 if (d.indicatorName.indexOf('|show|') != -1) {
        //                     str += '<a class="file_show" id="fileConfig' + (i + 1) + '" title="点我预览' + d.indicatorCname + '">';
        //                 } else {
        //                     str += '<a class="file_download" id="fileConfig' + (i + 1) + '" title="点我下载' + d.indicatorCname + '">';
        //                 }
        //                 str += '<input type="button" class="layui-input" name="evaluationScore' + (i + 1) + '" autocomplete="off" disabled="disabled" readonly="readonly" />' +
        //                     '</a>' +
        //                     '</div></div></div>';
        //             } else if (d.contentType == 'import') {
        //                 str += '';
        //             } else if (d.contentType == 'export') {
        //                 if (step['step'] != 1) {
        //                     var importStep = 0;
        //                     for (var j = 0; j < d.indicatorName.split('|').length; j++) {
        //                         if (d.indicatorName.split('|')[j].indexOf('stepResult') != -1) {
        //                             importStep = d.indicatorName.split('|')[j].replace(/[^0-9]/ig, "");
        //                         }
        //                     }
        //                     // fileConfig.push((i+1));
        //                     str += '<div class="layui-row">' +
        //                         '<div class="layui-col-lg12">';
        //                     if(d.comment!=''&&d.comment!=null){
        //                         str+='<label class="layui-form-label" lay-tips="'+ d.comment +'">' + d.indicatorCname + '</label>';
        //                     }else{
        //                         str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
        //                     }
        //                     str+='<div class="layui-input-block">' +
        //                         '<button type="button" class="layui-btn" onclick="exportFile(' + (i + 1) + ',' + importStep + ')">导出</button>' +
        //                         // '<input id="export'+ (i+1) +'" class="layui-input layui-disabled" disabled=""/>' +
        //                         '</div></div></div>';
        //                 }
        //             } else if (d.contentType == "localObject") {
        //                 localObjects.push({
        //                     index: (i + 1),
        //                     objects: d.configIndicatorDTOS,
        //                     indicatorName: d.indicatorName
        //                 });
        //                 if (d.indicatorName == 'select' || d.indicatorName == 'select2') {
        //                     str += '<div class="layui-row">' +
        //                         '<div class="layui-col-lg12">' ;
        //                     if(d.comment!=''&&d.comment!=null){
        //                         str+='<label class="layui-form-label" lay-tips="'+ d.comment +'">' + d.indicatorCname + '</label>';
        //                     }else{
        //                         str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
        //                     }
        //                     str+='<div class="layui-input-block">' +
        //                         '<input type="text" class="layui-input" id="showConfig' + (i + 1) + '" name="evaluationScore' + (i + 1) + '" autocomplete="off" disabled="disabled" readonly="readonly">' +
        //                         '</div></div></div>';
        //                 } else {
        //                     str += '<div class="layui-row">' +
        //                         '<div class="layui-col-lg12">' ;
        //                     if(d.comment!=''&&d.comment!=null){
        //                         str+='<label class="layui-form-label" lay-tips="'+ d.comment +'">' + d.indicatorCname + '</label>';
        //                     }else{
        //                         str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
        //                     }
        //                     str+='<div class="layui-input-block" id="evaluationScore' + (i + 1) + '">' +
        //                         // '<textarea type="text" name="evaluationScore'+ (i+1) +'" id="showConfig'+ (i+1) +'" autocomplete="off" disabled="disabled" readonly="readonly" class="layui-textarea"></textarea>' +
        //                         '</div></div></div>';
        //                 }
        //
        //             } else if (d.contentType == 'evaluationTab') {
        //                 evaluationTabConfig.push({index: (i + 1), objects: d, step: item.processStep});
        //                 evaluationTabStep.push(item.processStep);
        //                 str += '<div class="layui-row">' +
        //                     '<div class="layui-col-lg12">' ;
        //                 if(d.comment!=''&&d.comment!=null){
        //                     str+='<label class="layui-form-label" lay-tips="'+ d.comment +'">' + d.indicatorCname + '</label>';
        //                 }else{
        //                     str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
        //                 }
        //                 str+='<div class="layui-input-block">';
        //                 if (d.configIndicatorDTOS.length == 0) {
        //                     str += '<span style="padding-left: 10px;">所有指标项已合格!</span>'
        //                 } else {
        //                     str += '<div class="layui-card-body" style="padding-top: 0">' +
        //                         '<div class="layui-tab layui-tab-brief" lay-filter="evaluationTabConfig_' + (i + 1) + '_' + item.processStep + '">' +
        //                         '<ul class="layui-tab-title">';
        //                     var tableId;
        //                     $.each(d.configIndicatorDTOS, function (i1, d1) {
        //                         if (objectLevel == 2) {
        //                             $.each(d1.configIndicatorDTOS, function (i2, d2) {
        //                                 evaluationTable.push({
        //                                     step: item.processStep,
        //                                     id: (i + 1) + '_' + d2.id + '_' + item.processStep
        //                                 });
        //                                 // evaluationTable.push((i+1)+'_'+d2.id+'_'+item.processStep);
        //                                 if (i2 == 0) {
        //                                     tableId = d2.id;
        //                                     str += ' <li class="layui-this" id="parentTab_' + (i + 1) + '_' + d2.id + '_' + item.processStep + '">' + d1.indicatorCname + ':' + d2.indicatorCname + '</li>';
        //                                 } else {
        //                                     str += ' <li id="parentTab_' + (i + 1) + '_' + d2.id + '_' + item.processStep + '">' + d1.indicatorCname + ':' + d2.indicatorCname + '</li>';
        //                                 }
        //                             })
        //                         }
        //                     });
        //                     str += '</ul>' +
        //                         '<div class="layui-tab-content">' +
        //                         '<div class="layui-tab-item layui-show layui-tab-' + (i + 1) + '">' +
        //                         '<table class="layui-hide add_progress" id="evaluationTable_' + (i + 1) + '_' + tableId + '_' + item.processStep + '" lay-filter="evaluationTable_' + (i + 1) + '_' + tableId + '_' + item.processStep + '"></table>';
        //                     // ' <script type="text/html" id="toolbar_'+ (i+1) +'_'+ tableId +'">' +
        //                     // '<a class="layui-btn layui-btn-xs" lay-event="download">下载</a>' +
        //                     // '<a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="delete">删除</a>' +
        //                     // '</script>';
        //                     str += '</div></div></div></div>';
        //                 }
        //
        //                 str += '</div></div></div>';
        //             } else if (d.contentType == 'table') {
        //                 str += specialTemplateConfigInput(spdata, d, currusername,item.processStep, 'info')
        //             } else {
        //                 str += '<div class="layui-row">' +
        //                     '<div class="layui-col-lg12">' ;
        //                 if(d.comment!=''&&d.comment!=null){
        //                     str+='<label class="layui-form-label" lay-tips="'+ d.comment +'">' + d.indicatorCname + '</label>';
        //                 }else{
        //                     str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
        //                 }
        //                 str+='<div class="layui-input-block">' +
        //                     '<input type="text" class="layui-input" id="showConfig' + (i + 1) + '" name="evaluationScore' + (i + 1) + '" autocomplete="off" disabled="disabled" readonly="readonly">' +
        //                     '</div></div></div>';
        //             }
        //             }
        //         });
        //
        //         str+='</form></div></div></div></div>'
        //         step['name'] = is;
        //         steps.push(step);
        //         if(specialSteps.length>0){
        //             specialStepRender(spdata.processKey);
        //         }
        //     }
        //     return str;
        // }
        //选项卡切换监听
        function elementChange() {
            $.each(evaluationTabConfig,function (index,item) {
                var filter = 'evaluationTabConfig_'+item.index+'_'+item.step;
                element.on('tab('+ filter +')', function(data){
                    // console.log(this); //当前Tab标题所在的原始DOM元素
                    // console.log(data.index); //得到当前Tab的所在下标
                    // console.log(data.elem.context.id); //得到当前的Tab大容器
                    var id = data.elem.context.id;
                    // timetableConfig = id.split('_')[1];
                    var str = '<table class="layui-hide add_progress" id="evaluationTable_'+ id.split('_')[1]+'_'+id.split('_')[2] +'_'+ id.split('_')[3] +'" lay-filter="evaluationTable_'+ id.split('_')[1]+'_'+id.split('_')[2] +'_'+ id.split('_')[3] +'"></table>';
                    // str += ' <script type="text/html" id="toolbar_'+ id +'">' +
                    //     '<a class="layui-btn layui-btn-xs" lay-event="download">下载</a>' +
                    //     '</script>';
                    var index = id.split('_')[1];
                    $('.layui-tab-'+index).html(str);
                    element.render('tab');
                    targetList(id.split('_')[1]+'_'+id.split('_')[2]+'_'+id.split('_')[3]);
                });
            })
        }
        //导出附件
        window.exportFile = function (index,importStep,task) {
            let url = evaluationHost+ 'api/timetableResult/exportResultToExcel?timetableId='+timetableId+'&step='+importStep;
            if(task!=null &&  task!= 0)
                url+='&parallelTask='+task;
            location.href = url;
        };
        //获取第一个所有指标项
        function getAllTarget(stage) {
            if(stage == 1){
                if(evaluationTable.length>0){
                    var id;
                    $.each(evaluationTabStep,function (i,d) {
                        var flag = false;
                        $.each(evaluationTable,function (index,item) {
                            if(d == item.step&&flag == false){
                                flag = true;
                                id = item.id
                            }
                        })
                        if(flag){
                            targetList(id);
                        }
                    })

                }
                // console.log(evaluationTable)
            }
        }
        //获取指标项表格
        function targetList(item) {
            var configIndex = item.split('_')[0];
            var targetId = item.split('_')[1];
            var currentStep = item.split('_')[2];
            var data = [];
            var col = [];
            var cols = [];
            var configData = '';
            console.log(evaluationTabConfig);
            var options;
            $.each(evaluationTabConfig,function (index,item) {
                if(currentStep == item.step && item.index == configIndex){
                    options = item.objects.indicatorOptions.split(',');
                }
            });
            col.push(
                {title:'序号',width:50,type:"numbers"},
                {field: 'targetName',title: '指标', align: 'center'},
                {field: 'result',title: '结果', align: 'center'}
            );
            cols.push(col);
            $.each(evaluationTabConfig,function (index,item) {
                if(currentStep == item.step && configIndex == item.index){
                    if(item.objects.configIndicatorDTOS.length>0) {
                        $.each(item.objects.configIndicatorDTOS, function (i, d) {
                            if(objectLevel == 2){
                                $.each(d.configIndicatorDTOS, function (i1, d1) {
                                    var flag = false;
                                    if(targetId == d1.id){
                                        flag = true;
                                    }
                                    if(flag){
                                        $.each(d1.configIndicatorDTOS, function (i2, d2) {
                                            $.each(evaluationTabResult,function (j,k) {
                                                if(currentStep == k.step && configIndex == k.index){
                                                    if(k.result.indexOf(d2.id)!=-1){
                                                        data.push({id: d2.id,targetName:d2.indicatorCname,result: options[1]});
                                                    }else{
                                                        data.push({id: d2.id,targetName:d2.indicatorCname,result: options[0]});
                                                    }
                                                }
                                            })
                                        })
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
                even: true
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
    });
    e("phenomMenuList",{})
});