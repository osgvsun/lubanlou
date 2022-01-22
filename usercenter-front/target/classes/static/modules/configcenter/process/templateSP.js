/**
 * 特殊模板特殊处理
 * Created by ylj on 2020/7/21.
 */
// var evaluationHost =apiGateWayHost+"/configcenter/";
var specialSteps = [];
var auths = [];
var currentStep;
var currUsername;
var spdata;
var tableEachIndex  = 1;
function loading(msg){
    msgindex = layer.msg(msg, {
        icon:16,
        shade:[0.1, '#fff'],
        time:false,  //不自动关闭
        offsetqiuchuy:"100px"
    })
}
//特殊模板保存
function saveSpecialTemplateResult(processKey,result,type,step) {
    // if(processKey == 'enlist_process'||processKey == 'hire_process'||processKey == 'examRegistration_process'){//招募
        $.ajax({
            url:evaluationHost+'api/timetableResult/resultNew',
            dataType: 'json',
            data: result,
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
                    layer.msg('提交成功');
                    if(type == 'normal'){
                        if(submitNoJump){
                            var index = parent.layer.getFrameIndex(window.name);
                            parent.layer.close(index);
                            window.parent.location.reload();
                        }else if((task!=null && task > 0) || !submitNoJump){
                            return false;
                        }else{
                            var resultIndex;
                            var indicatorIndex;
                            $.each(res.data[0].timetableProcessDTOS[step-1].configIndicators,function (index,item) {
                                if(item.indicatorName.indexOf('|currentLogin|')!=-1){
                                    indicatorIndex = index;
                                    return false;
                                }
                            })
                            if(indicatorIndex!=undefined){
                                $.each(res.data[0].timetableProcessDTOS[step-1].timetableResults,function (index,item) {
                                    if(item['evaluationScore'+(indicatorIndex+1)].split('_')[0] == currusername){resultIndex = index;return false;}
                                })
                            }
                            if(resultIndex!=undefined){
                                $.cookie('resultId',res.data[0].timetableProcessDTOS[step-1].timetableResults[0].id);
                            }
                            // window.location.reload();
                            var index = parent.layer.getFrameIndex(window.name);
                            parent.layer.close(index);
                            window.parent.location.reload();
                            // return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                        }
                    }else if(type == 'special'){
                        window.location.reload();
                    }

                }else{
                    layer.msg('后台保存数据报错');
                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                }
            },
            error: function () {
                alert("后台保存数据报错");
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            }
        })
    // }
}
//特殊模板后续保存
function specialSaveApi(processKey,res) {
    var projectId;
    var ii;
    // if(processKey == 'enlist_process') {//招募
        var usernames = '';
        $.each(res[0].timetableProcessDTOS,function (index,data) {
            $.each(data.configIndicators,function (i,d) {
                if(d.url!=null&&d.url.indexOf('api/getProjectList')!=-1){
                    projectId = data.timetableResults[0]['evaluationScore'+(i+1)].split('_')[0];
                    return false;
                }
            })
        })
    if(!projectId){
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
        window.parent.location.reload();
        return false;
    }
        $.each(res[0].timetableProcessDTOS[1].timetableResults,function (index,data) {
            if(data.enabled==1){
                usernames+=data['evaluationScore1'].split('_')[0]+','
            }
        })
        // if(usernames.substring(usernames.length-1)==','){
        //     usernames.substring(0,usernames.length-1);
        // }
        usernames = (usernames.substring(usernames.length - 1) == ',') ? usernames.substring(0, usernames.length - 1) : usernames
        // (usernames.substring(usernames.length-1)==',')?usernames.substring(0,usernames.length-1):usernames;
        $.ajax({
            url: zuulHost +'/xmgl/gvsunxmgl/api/saveNewProjectMembers?projectId='+projectId+'&usernames='+usernames,
            type: 'get',
            async: false,
            dataType: 'json',
            success: function (res) {
                if(res.msg == 'success'){
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                    window.parent.location.reload();
                }
            }

        })
    // }
}
//特殊步骤显示
function specialTemplateConfigInfo(data,type,result,currentStep,currusername,method) {
    // console.log(result);
    var processKey = data.processKey;
    // specialSteps = [];
    var spStep = new Object();
    var currauth = $.cookie('currauth');
    auths = data.timetableProcessDTOS[0].authorityNamesEdit;
    currUsername = currusername;
    spStep['step'] = result.processStep;
    spStep['method'] = method;
    spStep['thisStep'] = result.processStep;
    spStep['thisTask'] = result.parallelTask;
    spStep['spData'] = data;
    spStep['type'] = type;//table
    spStep['auditbar'] = false;//是否需要审核
    spStep['toolbar'] = false;//是否需要针对用户
    spStep['result'] = result.timetableResults;//表格步骤的结果
    spStep['config'] = result.configIndicators;//表格步骤的指标项
    spStep['eachConfig'] = []; //新的指标项的下标
    var str = '';
    if(method == 'info'){
        str+= '<div class="layui-col-md12" id="step_info_'+ result.processStep + '_'+ result.parallelTask +'">' +
            '<div class="layui-card">' +
            '<div class="layui-card-header"><a id="stepInfo'+ result.processStep +'_'+ result.parallelTask +'" name="stepInfo'+ result.processStep +'">'+ result.processCname +'</a>';
        // if(processKey == 'enlist_process'||processKey == 'hire_process'||processKey == 'examRegistration_process') {//招募.考试报名
        var nextFlag = false;
        $.each(result.configIndicators,function (i,d) {
            if(d.indicatorName.indexOf('|count|')!=-1){
                nextFlag = true;
                return false;
            }
        })
        if(nextFlag){
            if(data.timetableProcessDTOS[0].authorityNamesEdit.length == 0 && currentStep == result.processStep){
                str+='<button class="layui-btn next_step" style="float: right;margin-right: 5px;" type="button" onclick="btnEvent(\''+ processKey +'\','+ result.parallelTask +','+ result.initialStep +')">进入下一步</button>';
            }
            $.each(data.timetableProcessDTOS[0].authorityNamesEdit,function (index,item) {
                if(item == currauth&&currentStep == result.processStep){
                    str+='<button class="layui-btn next_step" style="float: right;margin-right: 5px;" type="button" onclick="btnEvent(\''+ processKey +'\','+ result.parallelTask +','+ result.initialStep +')">进入下一步</button>';
                    return false;
                }
            })
        }
        // }
        str+='</div>' +
            '<div class="layui-card-body">' +
            '<div class="layui-row layui-col-space20">' +
            '<form class="layui-form detail_item" action="" lay-filter="stepInfo_'+ result.processStep + '_'+ result.parallelTask + '" id="stepInfo_'+ result.processStep + '_'+ result.parallelTask + '">';
    }
    // if(processKey == 'enlist_process'||processKey == 'hire_process'||processKey == 'examRegistration_process'){//招募.考试报名
        str+='<table class="layui-table" id="processTable_'+ result.processStep + '_'+ result.parallelTask + '" lay-filter="processTable_'+ result.processStep + '_'+ result.parallelTask + '"></table>' ;
        if(processKey == 'enlist_process'||processKey == 'hire_process'){//审核
            if(method == 'info'&&currentStep!=0&&processKey == 'enlist_process'){
                spStep['auditbar'] = true;
            }
            str += '<script type="text/html" id="auditbar_' + result.processStep + '">' +
                '<div class="layui-btn-group">' +
                '{{# if(d.enabled=="√"){ }}' +
                '<a class="layui-btn layui-btn-danger layui-btn-xs" data="0" lay-event="resultEnabled">不通过</a>' +
                '{{# } else if(d.enabled=="×"){ }}' +
                '<a class="layui-btn layui-btn-xs" data="1" lay-event="resultEnabled">通过</a>' +
                '{{# } else{ }}' +
                '<a class="layui-btn layui-btn-xs" data="1" lay-event="resultEnabled">通过</a>' +
                '<a class="layui-btn layui-btn-danger layui-btn-xs" data="0" lay-event="resultEnabled">不通过</a>' +
                '{{# } }}' +
                '</div>' +
                '</script>';
        }
    // }
    if(method == 'info'){
        str+='</form></div></div></div></div>'
    }
    specialSteps.push(spStep);
    return str;
}
//特殊步骤特殊类型输入
function specialTemplateConfigInput(spData,config,currusername,thisStep,method) {
    var processKey = spData.processKey;
    spdata = spData;
    var spStep = new Object();
    var currauth = $.cookie('currauth');
    auths = spData.timetableProcessDTOS[0].authorityNamesEdit;
    currUsername = currusername;

    var str = '';
    str+='<div class="layui-row">'+
        '<div class="layui-col-lg12">' ;
    str+='<label class="layui-form-label">' + config.indicatorCname + '</label>';
    if(method == 'circle'&&processKey == 'enlist_process'){/**/
        str+='<button class="layui-btn layui-btn-xs" style="position: absolute;left: 83px;top: 39px;" type="button" onclick="addMember(\''+ processKey +'\',\''+ config.indicatorName.split('_')[config.indicatorName.split('_').length-1] +'\')">自行添加</button>';
    }
    str+=`<div class="layui-input-block" onclick="showComment('${config.comment}',this)">`;
    // if(processKey == 'enlist_process'||processKey == 'hire_process'||processKey == 'examRegistration_process') {//  招募/考试报名
        // specialSteps = [];
        // var tableStep = config.indicatorName.split('_')[config.indicatorName.split('_').length-1];
        for(var i = 0;i<config.indicatorName.split('|').length;i++){
            if(config.indicatorName.split('|')[i].indexOf('stepResult')!=-1){
                var tableStep = config.indicatorName.split('|')[i].replace(/[^0-9]/ig,"");
            }
        }
        spStep['step'] = spData.currentStep;
        spStep['thisStep'] = thisStep;
        spStep['thisTask'] = spData['timetableProcessDTOS'][thisStep-1].parallelTask;
        spStep['spData'] = spData;
        spStep['currProcess'] = spData['timetableProcessDTOS'][thisStep-1];//当前步骤
        // spStep['step'] = tableStep;
        spStep['auditbar'] = false;//是否需要审核
        spStep['toolbar'] = false;//是否有针对用户指标
        spStep['type'] = config.contentType; //table
        spStep['method'] = method; //table
        spStep['result'] = spData['timetableProcessDTOS'][tableStep-1].timetableResults; //表格步骤的结果
        spStep['config'] = spData['timetableProcessDTOS'][tableStep-1].configIndicators;//表格步骤的指标项
        // spStep['currentresult'] = spData['timetableProcessDTOS'][spData.currentStep-1].timetableResults;//当前步骤的结果
        // spStep['currentconfig'] = spData['timetableProcessDTOS'][spData.currentStep-1].configIndicators;//当前步骤的指标项
        spStep['eachConfig'] = []; //新的指标项的下标
        str += '<table class="layui-table" id="processTable_' + thisStep + '_' + spData['timetableProcessDTOS'][thisStep-1].parallelTask + '" lay-filter="processTable_' + thisStep + '_' + spData['timetableProcessDTOS'][thisStep-1].parallelTask + '"></table>';
        if(processKey == 'enlist_process'||processKey == 'hire_process'){//审核
            method == 'info'?spStep['auditbar'] = false:spStep['auditbar'] = true;
            str += '<script type="text/html" id="auditbar_' + spData.currentStep + '">' +
                '<div class="layui-btn-group">' +
                '{{# if(d.enabled=="√"){ }}' +
                '<a class="layui-btn layui-btn-danger layui-btn-xs" data="0" lay-event="resultEnabled">不通过</a>' +
                '{{# } else if(d.enabled=="×"){ }}' +
                '<a class="layui-btn layui-btn-xs" data="1" lay-event="resultEnabled">通过</a>' +
                '{{# } else{ }}' +
                '<a class="layui-btn layui-btn-xs" data="1" lay-event="resultEnabled">通过</a>' +
                '<a class="layui-btn layui-btn-danger layui-btn-xs" data="0" lay-event="resultEnabled">不通过</a>' +
                '{{# } }}' +
                '</div>' +
                '</script>';
        }
        // if(method=='circle'){
            var eachConfigFlag = false;
            for(var i=0;i<spData.timetableProcessDTOS[thisStep-1].configIndicators.length;i++){
                if(spData.timetableProcessDTOS[thisStep-1].configIndicators[i].indicatorName.indexOf('|each|')!=-1){
                    spStep['toolbar'] = true;//是否有针对用户指标
                    eachConfigFlag = true;
                    break;
                }
            }
            if(eachConfigFlag){
                str += '<script type="text/html" id="toolbar_' + thisStep + '">' +
                    '<div class="layui-btn-group">';
                $.each(spData.timetableProcessDTOS[thisStep-1].configIndicators,function (index,item) {
                    if(item.indicatorName.indexOf('|each|')!=-1){
                        spStep['eachConfig'].push(index+1);
                        str+='<a class="layui-btn layui-btn-xs" data="'+ item.contentType +'" lay-event="eachConfig'+ (index+1) +'">'+ item.indicatorCname +'</a>'
                    }
                })
                str+='</div></script>';
            }
        // }


        specialSteps.push(spStep);
    // }
        str+='</div></div></div>'
    return str;
}
//特殊步骤所需表格
function specialStepRender(processKey) {
    var currauth = $.cookie('currauth');
    var enableFlag = '';
    var enableIndex;
    var allInfoFlag = true;//是否展示所有数据
    var allInfoFlag2 = true;
    $.each(auths,function (i3,d3) {
        if(d3 == currauth){
            allInfoFlag2 = false;
        }
    })
    if(auths.length>0&&processKey!='charge_process'&&processKey!='apply_purchase_process'){
        // allInfoFlag2?allInfoFlag = false:allInfoFlag = true;
        if(allInfoFlag2){
            allInfoFlag = false;
        }
    }
    $.each(specialSteps,function (index,item) {
        $.each(item.config, function (i2, d2) {
            if (d2.indicatorName.indexOf('|count|') != -1) {
                allInfoFlag = true;
                return false;
            }else if(d2.indicatorName.indexOf('|autoInsert|') != -1){
                allInfoFlag = true;
                return false;
            }
        })
    })
    $.each(specialSteps,function (index,item) {
        if(item.type == 'table'){
            layui.use(['table'], function(){
                var table = layui.table;
                var data = [];
                var cols = [];
                var col = [];
                col.push({title:'序号',width:50,type:"numbers"});
                $.each(item.config,function (i,d) {
                    if(d.indicatorName!=null&&d.indicatorName.indexOf('|currentLogin|')!=-1&&d.indicatorName.indexOf('|count|')!=-1){enableFlag = 'enable'};
                    if(d.contentType == 'url'){
                        if(d.indicatorName.indexOf('|pay|')!=-1){//缴费 0未缴费 1已缴费
                            enableIndex = i+1;
                            enableFlag = 'pay'
                            col.push({title:d.indicatorCname,align: 'center',field:'evaluationScore'+(i+1)});
                        }else{
                            col.push({
                                title:d.indicatorCname,
                                align: 'center',
                                field:'evaluationScore'+(i+1),
                                templet: function(d1){
                                    if(d.indicatorName.indexOf('|current|')!=-1||d.indicatorName.indexOf('|linkage')!=-1||d.indicatorName.indexOf('current')!=-1) {//当前登录人所属数据或者联动数据
                                        return '<a id="evaluationScore'+ (i+1) +'" href="'+ d1[['evaluationScore'+(i+1)]] +'" target="_blank">点我进入'+ d.indicatorCname +'</a>'
                                    }else{
                                        let u = d.url.indexOf('?') == -1 ? `${d.url}?username=${d1.username}` : `${d.url}&username=${d1.username}`
                                        return '<a id="evaluationScore'+ (i+1) +'" href="'+ u +'" target="_blank">点我进入'+ d.indicatorCname +'</a>'
                                    }
                                }
                            });
                        }

                    }else if(d.contentType == 'file'){
                        col.push({
                            title:d.indicatorCname,
                            align: 'center',
                            field:'evaluationScore'+(i+1),
                            templet: function(d1){
                                let str = '';
                                if(d1['evaluationScore'+(i+1)]!=null){
                                    $.each(d1['evaluationScore'+(i+1)].split(','),function (key, value) {
                                        if(d.indicatorName.indexOf('|show|')!=-1){
                                            str+= '<a class="file_a file_show_table'+ tableEachIndex +'" id="fileConfig'+ (i+1) +'_'+ key +'_'+ item.thisStep +'" data="'+ value.split('_')[0] +'" title="点我预览'+ d.indicatorCname +'">' +
                                                '<input type="button" class="layui-input" autocomplete="off" disabled="disabled" readonly="readonly" value="'+ value.split('_')[value.split('_').length-1] +'"/>' +
                                                '</a>'
                                        }else{
                                            str+= '<a class="file_a file_download_table'+ tableEachIndex +'" id="fileConfig'+ (i+1) +'_'+ key +'_'+ item.thisStep +'" data="'+ value.split('_')[0] +'" title="点我下载'+ d.indicatorCname +'">' +
                                                '<input type="button" class="layui-input" autocomplete="off" disabled="disabled" readonly="readonly" value="'+ value.split('_')[value.split('_').length-1] +'"/>' +
                                                '</a>'
                                        }
                                    })
                                }else{
                                    str+= '无';
                                }
                                return str;
                            }
                        });
                    }else if(d.contentType == 'import'){
                        if(item.method != 'circleinfo'&&item.method != 'info'){
                            var importStep = 0;
                            var isOverride = false;
                            for (var j = 0; j < d.indicatorName.split('|').length; j++) {
                                if (d.indicatorName.split('|')[j].indexOf('stepResult') != -1) {
                                    importStep = d.indicatorName.split('|')[j].replace(/[^0-9]/ig, "");
                                }else {
                                    importStep = item.thisStep;
                                }
                                if(d.indicatorName.split('|')[j].indexOf('override') != -1){
                                    isOverride = true;
                                }
                            }
                            var str = '<div class="layui-row">' +
                                '<div class="layui-col-lg12">';
                            str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
                            str+=`<div class="layui-input-block" onclick="showComment('${d.comment}',this)">` +
                                '<button class="layui-btn" type="button" onclick="importFile(' + (i + 1) + ',' + importStep+ ',' + isOverride+ ',' + item.thisTask + ')">导入</button>' +
                                '<input style="width: 160px;" id="importFile' + (i + 1) + '" type="file" accept=\'.xls,.xlsx\'/>' +
                                '</div></div></div>';
                            $('#currentStep').append(str);
                        }
                    }else if(d.contentType == 'export'){
                        if(item.method != 'circleinfo'){
                            var importStep = 0;
                            for (var j = 0; j < d.indicatorName.split('|').length; j++) {
                                if (d.indicatorName.split('|')[j].indexOf('stepResult') != -1) {
                                    importStep = d.indicatorName.split('|')[j].replace(/[^0-9]/ig, "");
                                }else {
                                    importStep = item.thisStep;
                                }
                            }
                            if(item.method == 'info'){
                                var str='<button style="float: right;margin-right: 5px;" class="layui-btn"  type="button" onclick="exportFile(' + (i + 1) + ',' + importStep + ',' + item.thisTask + ')">导出</button>';
                                // $('.next_step').after(str);
                                $('#stepInfo'+item.thisStep+'_'+item.thisTask).after(str);
                            }else{
                                var str = '<div class="layui-row">' +
                                    '<div class="layui-col-lg12">';
                                str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
                                str+=`<div class="layui-input-block" onclick="showComment('${d.comment}',this)">` +
                                    '<button class="layui-btn"  type="button" onclick="exportFile(' + (i + 1) + ',' + importStep  + ',' + item.thisTask + ')">导出</button>' +
                                    '</div></div></div>';
                                $('#currentStep').append(str);
                            }
                            // $('#processTable_'+item.thisStep).after(str);
                        }
                    }else{
                        col.push({title:d.indicatorCname,align: 'center',field:'evaluationScore'+(i+1)});
                    }
                });

                $.each(item.result,function (i,d) {
                    var coll = new Object();
                    coll['id'] = d.id;
                    var flag = true;
                    $.each(item.config,function (i2,d2) {
                        var myselfFlag = false;//是否是自己
                        if(d2.indicatorName == null){d2.indicatorName = ''}
                        if(d.initiatorUsername!=null&&d.initiatorUsername!=''){ //2020/12/02日修改,新增发起用户字段 老数据或者导入的数据没有发起用户
                            if(!allInfoFlag){//判断是否需要显示所有报名信息
                                if(d.initiatorUsername == currUsername){
                                    coll['username']=d.initiatorUsername;
                                    if(d2.indicatorName.indexOf('|currentLogin|')!=-1||d2.contentType == 'select'){
                                        if(d['evaluationScore'+(i2+1)]){
                                            if(d['evaluationScore'+(i2+1)].split('_').length == 1){
                                                coll['evaluationScore'+(i2+1)] = d['evaluationScore'+(i2+1)].split('_')[0];
                                            }else{
                                                coll['evaluationScore'+(i2+1)] = d['evaluationScore'+(i2+1)].split('_')[d['evaluationScore'+(i2+1)].split('_').length-1];
                                            }
                                        }
                                    }else if(d2.indicatorName == 'select'&&d['evaluationScore'+(i2+1)]){
                                        coll['evaluationScore'+(i2+1)] = d['evaluationScore'+(i2+1)].split('_')[d['evaluationScore'+(i2+1)].split('_').length-1];
                                    }else if(d2.contentType == 'url'&&d['evaluationScore'+(i2+1)]&&(d2.indicatorName.indexOf('current')!=-1||d2.indicatorName.indexOf('|current|')!=-1||d2.indicatorName.indexOf('|linkage')!=-1)){
                                        coll['evaluationScore'+(i2+1)] = d['evaluationScore'+(i2+1)];
                                    }else{
                                        coll['evaluationScore'+(i2+1)] = d['evaluationScore'+(i2+1)];
                                    }
                                }else{
                                    flag = false;
                                    return true
                                }
                            }else{
                                coll['username']=d.initiatorUsername;
                                if(d2.indicatorName.indexOf('|currentLogin|')!=-1||d2.contentType == 'select'){
                                    if(d['evaluationScore'+(i2+1)]){
                                        if(d['evaluationScore'+(i2+1)].split('_').length == 1){
                                            coll['evaluationScore'+(i2+1)] = d['evaluationScore'+(i2+1)].split('_')[0];
                                        }else{
                                            coll['evaluationScore'+(i2+1)] = d['evaluationScore'+(i2+1)].split('_')[d['evaluationScore'+(i2+1)].split('_').length-1];
                                        }
                                    }
                                }else if(d2.indicatorName == 'select'&&d['evaluationScore'+(i2+1)]){
                                    coll['evaluationScore'+(i2+1)] = d['evaluationScore'+(i2+1)].split('_')[d['evaluationScore'+(i2+1)].split('_').length-1];
                                }else{
                                    coll['evaluationScore'+(i2+1)] = d['evaluationScore'+(i2+1)];
                                }
                            }
                        }else{
                            if(!allInfoFlag){//判断是否需要显示所有报名信息

                                $.each(item.config,function (i3,d3) {//通过遍历找到哪条数据为登录人
                                    if(d3.indicatorName == null){d3.indicatorName = ''}
                                    if(d3.indicatorName.indexOf('|currentLogin|')!=-1){
                                        if(d['evaluationScore'+(i3+1)]!=null){
                                            if(d['evaluationScore'+(i3+1)].split('_')[0] == currUsername){
                                                myselfFlag = true;
                                                return false;
                                            }
                                        }

                                    }
                                })
                                if(myselfFlag){
                                    if(d2.indicatorName.indexOf('|currentLogin|')!=-1||d2.contentType == 'select'){
                                        if(d['evaluationScore'+(i2+1)]){
                                            if(d2.indicatorName.indexOf('|currentLogin|')!=-1){
                                                coll['username']=d['evaluationScore'+(i2+1)].split('_')[0];
                                            }
                                            if(d['evaluationScore'+(i2+1)].split('_').length == 1){
                                                coll['evaluationScore'+(i2+1)] = d['evaluationScore'+(i2+1)].split('_')[0];
                                            }else{
                                                coll['evaluationScore'+(i2+1)] = d['evaluationScore'+(i2+1)].split('_')[d['evaluationScore'+(i2+1)].split('_').length-1];
                                            }
                                        }
                                    }else if(d2.indicatorName == 'select'&&d['evaluationScore'+(i2+1)]){
                                        coll['evaluationScore'+(i2+1)] = d['evaluationScore'+(i2+1)].split('_')[d['evaluationScore'+(i2+1)].split('_').length-1];
                                    }else{
                                        coll['evaluationScore'+(i2+1)] = d['evaluationScore'+(i2+1)];
                                    }
                                }else{
                                    flag = false;
                                    return true
                                }
                            }else{
                                if(d2.indicatorName.indexOf('|currentLogin|')!=-1||d2.contentType == 'select'){
                                    if(d['evaluationScore'+(i2+1)]){
                                        if(d2.indicatorName.indexOf('|currentLogin|')!=-1){
                                            coll['username']=d['evaluationScore'+(i2+1)].split('_')[0];
                                        }
                                        if(d['evaluationScore'+(i2+1)].split('_').length == 1){
                                            coll['evaluationScore'+(i2+1)] = d['evaluationScore'+(i2+1)].split('_')[0];
                                        }else{
                                            coll['evaluationScore'+(i2+1)] = d['evaluationScore'+(i2+1)].split('_')[d['evaluationScore'+(i2+1)].split('_').length-1];
                                        }
                                    }
                                }else if(d2.indicatorName == 'select'&&d['evaluationScore'+(i2+1)]){
                                    coll['evaluationScore'+(i2+1)] = d['evaluationScore'+(i2+1)].split('_')[d['evaluationScore'+(i2+1)].split('_').length-1];
                                }else{
                                    coll['evaluationScore'+(i2+1)] = d['evaluationScore'+(i2+1)];
                                }
                            }
                        }
                    });
                    var enabled;
                    switch (enableFlag) {
                        case "enable"://招募
                            if(d['enabled']==1){
                                enabled = '√';
                            }else if(d['enabled']==0){
                                enabled = '×';
                            }else{
                                enabled = '未审核';
                            }
                            break;
                        case "pay"://支付报名
                            if(d['evaluationScore'+enableIndex]==1){
                                enabled = '√';
                            }else if(d['evaluationScore'+enableIndex]==0){
                                enabled = '×';
                            }
                            break;
                        default:
                            enabled = '';
                            break;
                    }
                    // d['enabled'] == 1 ? enabled = '√':enabled = '×';
                    coll['enabled'] = enabled;
                    if(flag){data.push(coll);}//如果不是显示所有信息就不push
                });
                switch (enableFlag) {
                    case "enable":
                        col.push({title: '是否通过', align: 'center',field:'enabled'});
                        break;
                    case "pay":
                        col.push({title: '是否缴费', align: 'center',field:'enabled'});
                        break;
                    default:
                        // enabled = '';
                        break;
                }
                $.each(auths,function (i,d) {
                    if(d == currauth){
                        if(item.auditbar){
                            // if(processKey == 'enlist_process'||processKey == 'hire_process'){}
                            col.push({title: '审核', align: 'center',minWidth: 115, toolbar: '#auditbar_'+item.step});
                        }
                        if(item.toolbar){
                            // if(processKey == 'enlist_process'||processKey == 'hire_process'){}
                            col.push({title: '操作', align: 'center',minWidth: 180, toolbar: '#toolbar_'+item.thisStep});
                        }
                    }
                })
                cols.push(col);
                table.render({
                    elem: '#processTable_'+item.thisStep+'_'+item.thisTask,
                    title: '',
                    page: false,
                    cols: cols,
                    data: data,
                    limit: Number.MAX_VALUE,
                    even: true,
                    done: function(res, curr, count){
                        fileInit(tableEachIndex);
                        // $.each($(".file_download_table"+tableEachIndex), function (index, obj) {
                        //     $(obj).click(function(){
                        //         resourceContainer.downLoadFile({
                        //             fileId: $(obj).attr("data")
                        //         })
                        //     });
                        // });
                        // $.each($(".file_show_table"+tableEachIndex), function (index, obj) {
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
                        tableEachIndex++;
                    }
                });
                //监听工具条
                var filter = 'processTable_'+item.thisStep+'_'+item.thisTask;
                table.on('tool('+ filter +')', function(obj){
                    var data = obj.data;
                    var _this = $(this);
                    if(obj.event === 'resultEnabled'){
                        // layer.msg($(this).attr('data'));
                        $.ajax({
                            url:evaluationHost+'api/timetableResult/resultEnabled?timetableResultId='+data.id+'&enabled='+$(this).attr('data'),
                            // dataType: 'json',
                            // data: {timetableResultId:data.id,enabled:$(this).attr('data')},
                            type: 'post',
                            async: false,
                            // contentType:"application/json;charset=utf-8",
                            success:function (res) {
                                console.log(res);
                                if(res.code == 0){
                                    window.location.reload()
                                }
                            },
                            error: function () {
                                alert("后台保存数据报错");
                                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                            }
                        })
                    }
                    $.each(item.eachConfig,function (j,o) {
                        if(obj.event === 'eachConfig'+o){
                            var currentconfig = item.currProcess.configIndicators;
                            // console.log(_this.attr('data'));
                            // step = step.replace(/[^0-9]/ig,"");
                            var str = ' <div class="layui-card-body">'+
                                '<div class="layui-row layui-col-space20">'+
                                '<form class="layui-form detail_item" action="" lay-filter="addEachConfig" id="addEachConfig">' +
                                '<input name="id" type="hidden"/>'
                            // var cdata = spdata['timetableProcessDTOS'][step-1].configIndicators;
                            // $.each(cdata, function (index, item) {
                                if(currentconfig[o-1].indicatorName == null){currentconfig[o-1].indicatorName = ''}
                                if(currentconfig[o-1].indicatorName.indexOf('|count|')!=-1){flagSP = false}
                                if(currentconfig[o-1].isShow != 2){
                                    str += configFormSP(currentconfig,o,obj.data.username,item.method);
                                }
                            // });
                            str+='<div class="layui-form-item tutor-block layui-hide">' +
                                '<div class="layui-input-block">' +
                                '<button type="button" id="saveEachConfig" class="layui-btn" lay-submit lay-filter="saveEachConfig">保存</button>' +
                                '<button type="reset" class="layui-btn layui-btn-primary">重置</button>' +
                                '</div>' +
                                '</div>' +
                                '</form></div></div>';
                            layui.use(['layer','form'], function(){
                                var layer = layui.layer,
                                    form = layui.form;
                                var spValue = [];
                                spValue.push('evaluationScore'+o);
                                var btn = [];
                                if(item.method != 'info'){
                                    btn = ['确定', '取消'];
                                }
                                var index = layer.open({
                                    // type: 2 //此处以iframe举例
                                    // ,
                                    title: _this.text(),
                                    area: ['500px', '400px'],
                                    shade: 0.5,
                                    maxmin: true,
                                    content: str,
                                    btn: btn,
                                    zIndex: layer.zIndex, //重点1
                                    success: function(layero) {
                                        var paramSP = getValueSP(processKey,spValue,item.spData,item.thisStep,obj.data.username);
                                        form.val('addEachConfig', paramSP );
                                        // form.render('select');
                                        if(item.method == 'info'){
                                            $('select').attr('disabled', 'disabled');
                                            $('input').attr('disabled', 'disabled');
                                            $('textarea').attr('disabled', 'disabled');
                                        }
                                        form.render();
                                        configRenderSP();
                                    },
                                    yes: function(index, layero) {
                                        $('#saveEachConfig').click();
                                    }
                                });
                                form.on('submit(saveEachConfig)', function(data){
                                    // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
                                    // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
                                    // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
                                    var d1 = data.field;
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
                                        }
                                    });
                                    $.each(evaluationTabTarget,function (index,item) {
                                        d1['evaluationScore'+item.index] = '';
                                    });
                                    $.each(evaluationTabTarget,function (index,item) {
                                        d1['evaluationScore'+item.index] += item.id+',';
                                    });
                                    $.each(evaluationTabConfig,function (index,item) {
                                        if(evaluationTabTarget.length>0){
                                            d1['evaluationScore'+item.index] = d1['evaluationScore'+item.index].substring(0,d1['evaluationScore'+item.index].length-1);
                                        }else{
                                            d1['evaluationScore'+item.index] = ''
                                        }
                                    });
                                    d1['timetableProcessId'] = item.currProcess.timetableProcessId;
                                    d1['initiatorUsername'] = currusername;
                                    d1['initiatorCname'] = currcname;
                                    d1['targetUsername'] = obj.data.username;
                                    var timetableResultDTO = new Object();
                                    for (var key in d1){
                                        if(key == 'sendMessage'){
                                            d1['sendMessage'] = '';
                                            $('input:checkbox[name=sendMessage]').each(function () {
                                                if($(this).prop('checked')){
                                                    d1['sendMessage']+=$(this).val()+',';
                                                }
                                            })
                                        }
                                    }
                                    timetableResultDTO['timetableResult'] = d1;
                                    timetableResultDTO['isComplete'] = -1;
                                    var data2 = JSON.stringify(timetableResultDTO);
                                    saveSpecialTemplateResult(processKey,data2,'special',item.step)
                                    // return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                                });
                            });
                        }
                    })
                });
            });

        }
    })
    $('textarea').each(function () {
        $(this).textareafullscreen();
    })
}
//进入下一部(总览)
window.btnEvent = function (processKey,task,initialStep) {
    var process = new Object();
    process['processKey'] = processKey;
    process['submitUser'] = currUsername;
    process['businessKey'] = timetableId;
    // process['processCname'] = processCname;
    process['templateId'] = templateId;
    process['projectName'] = clientId;
    process['stageId'] = initialStep;
    if(task != 0){
        process['taskNum'] = task;
    }
    $.ajax({
        url:zuulHost+'/process/api/process/completeTaskOfCheckProcess',
        dataType: 'json',
        data: JSON.stringify(process),
        type: 'post',
        async: false,
        contentType:"application/json;charset=utf-8",
        success:function (res) {
            // console.log(res);
            if(res.code === 0){
                if(res.msg == 'incomplete'){
                    let alert = layer.alert('您当前阶段还有任务未提交.',function (index) {
                        layer.close(alert);
                        return false;
                    });
                }else if(res.msg == "executed"){
                    layer.alert('您当前任务已经提交!',function (index) {
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                        window.parent.location.reload();
                    });
                }else{
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                    window.parent.location.reload();
                }
            }
            else{
                if(res.msg == "executed"){
                    layer.alert('您当前任务已经提交!',function (index) {
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                        window.parent.location.reload();
                    });
                }else{
                    layer.msg("后台进行流程实例报错");
                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                }
            }
        },
        error: function () {
            alert("后台进行流程实例报错");
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        }
    })
    // alert(processKey);
};
//自行添加人员(第三步填写)
function addMember(processKey,step) {
    console.log(spdata);
    step = step.replace(/[^0-9]/ig,"");
    var str = ' <div class="layui-card-body">'+
        '<div class="layui-row layui-col-space20">'+
        '<form class="layui-form detail_item" action="" lay-filter="addMember" id="addMember">';
    var cdata = spdata['timetableProcessDTOS'][step-1].configIndicators;
    $.each(cdata, function (index, item) {
        if(item.indicatorName == null){item.indicatorName = ''}
        if(item.indicatorName.indexOf('|count|')!=-1){flagSP = false}
        if(item.isShow != 2){
            str += configFormSP(cdata,index+1,'','');
        }
    });
    str+='<div class="layui-form-item tutor-block layui-hide">' +
        '<div class="layui-input-block">' +
        '<button type="button" id="saveMember" class="layui-btn" lay-submit lay-filter="saveMember">保存</button>' +
        '<button type="reset" class="layui-btn layui-btn-primary">重置</button>' +
        '</div>' +
        '</div>' +
        '</form></div></div>';
    layui.use(['layer','form'], function(){
        var layer = layui.layer,
            form = layui.form;
        var index = layer.open({
            // type: 2 //此处以iframe举例
            // ,
            title: '自行添加',
            area: ['500px', '400px'],
            shade: 0.5,
            maxmin: true,
            content: str,
            btn: ['确定', '取消'],
            zIndex: layer.zIndex, //重点1
            success: function(layero) {
                form.render();
                configRenderSP();
            },
            yes: function(index, layero) {
                $('#saveMember').click();
            }
        });
        form.on('submit(saveMember)', function(data){
            // console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
            // console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
            // console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
            // return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            var d1 = data.field;
            console.log(d1);
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
                }
            });
            $.each(evaluationTabTarget,function (index,item) {
                d1['evaluationScore'+item.index] = '';
            });
            $.each(evaluationTabTarget,function (index,item) {
                d1['evaluationScore'+item.index] += item.id+',';
            });
            $.each(evaluationTabConfig,function (index,item) {
                if(evaluationTabTarget.length>0){
                    d1['evaluationScore'+item.index] = d1['evaluationScore'+item.index].substring(0,d1['evaluationScore'+item.index].length-1);
                }else{
                    d1['evaluationScore'+item.index] = ''
                }
            });
            d1['timetableProcessId'] = spdata['timetableProcessDTOS'][step-1].timetableProcessId;
            d1['initiatorUsername'] = currusername;
            d1['initiatorCname'] = currcname;
            var timetableResultDTO = new Object();
            timetableResultDTO['timetableResult'] = d1;
            timetableResultDTO['isComplete'] = -1;
            var data2 = JSON.stringify(timetableResultDTO);
            saveSpecialTemplateResult(spdata.processKey,data2,'special',step-1)
        });
    });

};
//特殊模板赋值(填写表单)
function getValueSP(processKey,spValue,spData,step,currusername) {
    var param = {};
    // if(step == 2){
        // if(processKey == "enlist_process"||processKey == "hire_process"||processKey == "examRegistration_process"){//招募/考试报名
            var data = spData;
            var stepIndex = (task == null||task == 0)?(step-1):(step-1+(task-1));
            var resultIndex;
            var indicatorIndex;
            $.each(spData.timetableProcessDTOS[stepIndex].configIndicators,function (index,item) {
                if(item.indicatorName.indexOf('|currentLogin|')!=-1||item.indicatorName.indexOf('|currentDate|')!=-1){
                    indicatorIndex = index;
                    return false
                }
            })
            if(indicatorIndex!=undefined&&indicatorIndex!=null){
                var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                $.each(spData.timetableProcessDTOS[stepIndex].timetableResults,function (index,item) {
                    if(item['evaluationScore'+(indicatorIndex+1)].split('_')[0] == currusername||item['evaluationScore'+(indicatorIndex+1)] == currentdate){resultIndex = index;return false}
                });
            }else{
                resultIndex = spData.currentStep>=step?0:null;
                $.each(spData.timetableProcessDTOS[stepIndex].timetableResults,function (index,item) {
                    if(item.targetUsername == currusername){resultIndex = index;return false}
                });
            }
            if(processKey === 'processKey')
                resultIndex = 0;
            if(resultIndex!=undefined&&resultIndex!=null){
                // var strid = "param.id='" + data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex]['id']+"'";
                var strid = (spData.currentStep==step || processKey === 'processKey')?"param.id='" + data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex]['id']+"'":"param.id=''";
                eval(strid);
                $.each(spValue,function (index,item){
                    index = item.replace(/[^0-9]/ig,"")-1;
                    if(data.timetableProcessDTOS[stepIndex].configIndicators[index].indicatorName == null){data.timetableProcessDTOS[stepIndex].configIndicators[index].indicatorName = ''};
                    if(data.timetableProcessDTOS[stepIndex].configIndicators[index].contentType == "select"){
                        var str = "param." + item + "='" + data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex][item].split('_')[0]+"'";
                    }else if(data.timetableProcessDTOS[stepIndex].configIndicators[index].contentType == "text"){
                        // var text = data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex][item].replace(/\n/g,"<br/>");
                        // var str = "param." + item + "='" + text+"'";
                        //这样写是因为/n不会被eval(str)执行 会报错
                        var str = '';
                        $("[name="+ item +"]").html(data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex][item]);
                    }else if(data.timetableProcessDTOS[stepIndex].configIndicators[index].contentType == "checkbox"){
                        var myCheckbox = $("input[name='evaluationScore"+ (index+1) +"']");
                        var arr = [];
                        var objs = data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex][item].split(',');
                        var s = '';
                        if(objs.length>0){
                            $.each(objs,function (i,d) {
                                arr.push(d.split('_')[0])
                            })
                        }
                        for (var j = 0; j < arr.length; j++) { //数据库返回的需要选中项的值，我这里只返回了value，有需要可以返回数组对象
                            for (var i = 0; i < myCheckbox.length; i++) {//遍历checkbox所有项
                                if (myCheckbox[i].value == arr[j]) {
                                    myCheckbox[i].checked = true;//设置选中项
                                }
                            }
                        }
                    }else if(data.timetableProcessDTOS[stepIndex].configIndicators[index].contentType == "sendMessage"){
                        if(data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex][item] == null){data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex][item] = ''}
                        var str = "param." + item + "='" + data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex][item]+"'";
                    }else if(data.timetableProcessDTOS[stepIndex].configIndicators[index].contentType == "multiSelect"){
                        var objs = data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex][item].split(',');
                        var selected = [];
                        var s = '';
                        if(objs.length>0){
                            $.each(objs,function (i,d) {
                                s+=d.split('_')[d.split('_').length-1]+',';
                                selected.push({name: d.split('_')[d.split('_').length-1],value: d.split('_')[0], selected: true})
                            })
                            s = s.slice(0,s.length-1);
                        }
                        if(data.timetableProcessDTOS[stepIndex].configIndicators[index].indicatorName.indexOf('|search|')!=-1){
                            var multis = 'multiSelectConfig'+(index+1);
                            multis = xmSelect.render({
                                el: '#multiSelectConfig'+(index+1),
                                name: 'evaluationScore'+(index+1),
                                layVerify: 'required',
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
                                    var regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
                                    if(regex.test(data.timetableProcessDTOS[stepIndex].configIndicators[index].url)){
                                        var url =data.timetableProcessDTOS[stepIndex].configIndicators[index].url;
                                    }else{
                                        var url=zuulHost+data.timetableProcessDTOS[stepIndex].configIndicators[index].url;
                                    }
                                    $.ajax({
                                        url: url+'?keyword='+val,
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
                            multis.update({data: selected})
                        }else{
                            var str = "param." + item + "='" + s +"'";
                        }
                    }else if(data.timetableProcessDTOS[stepIndex].configIndicators[index].contentType == "file"){
                        if(data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex][item] == ''){
                            var str = "param." + item + "='未提交'";
                        }else{
                            if(data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex][item]){
                                let files = data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex][item].split(',');
                                $.each(files, function (key, value) {
                                    if(data.timetableProcessDTOS[stepIndex].configIndicators[index].indicatorName.indexOf('|show|')!=-1){
                                        $('#fileUpload'+(index+1)+'_'+step).before('<a class="file_show" id="fileConfig'+ (index+1) +'_'+ key +'_'+step+'" title="点我下载'+ data.timetableProcessDTOS[stepIndex].configIndicators[index].indicatorCname +'">点我预览'+ value.split('_')[value.split('_').length-1] +'</a>');
                                    }else {
                                        $('#fileUpload'+(index+1)+'_'+step).before('<a class="file_download" id="fileConfig'+ (index+1) +'_'+ key +'_'+step+'" title="点我下载'+ data.timetableProcessDTOS[stepIndex].configIndicators[index].indicatorCname +'">点我下载'+ value.split('_')[value.split('_').length-1] +'</a>');
                                    }
                                    $('#fileConfig'+(index+1)+'_'+key+'_'+step).attr("data",value.split('_')[0]);

                                })
                            }
                            var str = "param." + item + "='" + data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex][item]+"'";
                        }
                    }else if(data.timetableProcessDTOS[stepIndex].configIndicators[index].contentType == "evaluationTab"){
                        evaluationTabResult.push({index: (index+1),result: data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex][item]})
                    }else if(data.timetableProcessDTOS[stepIndex].configIndicators[index].indicatorName.indexOf('|pay|')!=-1){//缴费 0未缴费 1已缴费
                        $('#'+item).attr('data',data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex][item])
                        // evaluationTabResult.push({index: (index+1),result: data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex][item]})
                    }else if(data.timetableProcessDTOS[stepIndex].configIndicators[index].contentType == "localObject"){
                        if(data.timetableProcessDTOS[stepIndex].configIndicators[index].indicatorName == 'select'){
                            var str = "param.localObject1_" + (index+1) + "='" + data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex][item].split('_')[0]+"'";
                        }else if(data.timetableProcessDTOS[stepIndex].configIndicators[index].indicatorName == 'select2'){
                            $('#localObjectSonConfigBowl_'+(index+1)).after('<div class="last_choose">'+ data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex][item] +'</div>')
                        }else{
                            var str = '';
                            var localStr = '';
                            var obids = data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex][item].split(',');
                            // var localStr = '<div class="layui-collapse" id="objectadded'+ index +'">';
                            $.each(localObjects,function (i,d) {
                                if(d.index == (index+1)){
                                    if(d.indicatorName == 'localVariable'){
                                        $.each(d.objects,function (i1,d1) {
                                            $.each(d1.configIndicatorDTOS,function (i2,d2){
                                                $.each(obids,function (index,item) {
                                                    if(item == d2.id){
                                                        localStr+='<div class="layui-collapse" id="objectadded'+ index +'">';
                                                        localStr+='<div class="layui-colla-item">' +
                                                            '<h2 class="layui-colla-title">'+ d2.indicatorCname +'</h2>' +
                                                            '<div class="layui-colla-content"><ul>';
                                                        if(d2.configIndicatorDTOS.length>0){
                                                            $.each(d2.configIndicatorDTOS,function (i3,d3) {
                                                                localStr+='<li id="level3'+ d3.id +'">'+ d3.indicatorCname +'</li>'
                                                            })
                                                        }
                                                        localStr+='</ul></div></div>';
                                                        localStr+='</div>';
                                                    }
                                                })
                                            })
                                        })
                                    }else if(d.indicatorName == 'checkTimeType'){
                                        localStr+='<input type="text" class="layui-input" id="showConfig'+ d.index +'" name="'+ item +'" autocomplete="off" disabled="disabled" readonly="readonly">';
                                        var id= obids[0].split('_')[0];
                                        $.each(d.objects,function (i1,d1) {
                                            if(d1.id == id){
                                                if(d1.contentType == 'week'){
                                                    str = "param." + item + "='" + d1.indicatorCname+"，每周"+ obids[0].split('_')[obids[0].split('_').length-1] +"'";
                                                }else if(d1.contentType == 'month'){
                                                    str = "param." + item + "='" + d1.indicatorCname+"，每月"+ obids[0].split('_')[obids[0].split('_').length-1] +"号'";
                                                }else{
                                                    str = "param." + item + "='" + d1.indicatorCname+"，"+ obids[0].split('_')[obids[0].split('_').length-1] +"'";
                                                }
                                            }
                                        })
                                    }
                                }
                            });
                            $('#'+item).html(localStr);
                            layui.element.render("collapse")
                        }
                    }else{
                        var str = "param." + item + "='" + data.timetableProcessDTOS[stepIndex].timetableResults[resultIndex][item]+"'";
                    }
                    eval(str);
                });
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
            // }

            // layui.use(['form'], function(){
            //     var form = layui.form;
            //     form.val('currentStep', param);
            //     form.render('select')
            // });

        // }
    }
    return param;

}
window.configFormSP = function (currentconfig,index,username,method){
    var o = index;
    index = index-1;
    var str = '';
    if(currentconfig[index].indicatorName!=null&&currentconfig[index].indicatorName.indexOf('localVariable') !=-1 ){
        localVariableDatas.push({index:o,indicatorName: currentconfig[index].indicatorName});
    }
    if(currentconfig[index].contentType == 'select'){
        if(typeof(selectConfig)!='undefined'){selectConfig.push({index:o,url:currentconfig[index].url});}
        str+='<div class="layui-row">' +
            '<div class="layui-col-lg12">' ;
        str+='<label class="layui-form-label">' + currentconfig[index].indicatorCname + '</label>';
        str+=`<div class="layui-input-block" onclick="showComment('${currentconfig[index].comment}',this)">` +
            '<select name="evaluationScore'+ o +'" id="selectConfig'+ o +'" lay-verify="required" lay-filter="select'+ o +'" lay-search="">' +
            '<option value="">请选择'+ currentconfig[index].indicatorCname +'</option>' +
            '</select>' +
            '</div></div></div>';
    }else if(currentconfig[index].contentType == 'multiSelect'){
        if(typeof(multiSelectConfig)!='undefined'){multiSelectConfig.push({index: o,url: currentconfig[index].url,type: currentconfig[index].indicatorName});}
        str+='<div class="layui-row">' +
            '<div class="layui-col-lg12">' ;
        str+='<label class="layui-form-label">' + currentconfig[index].indicatorCname + '</label>';
        str+=`<div class="layui-input-block" onclick="showComment('${currentconfig[index].comment}',this)">` +
            '<div id="multiSelectConfig'+ o +'" class="xm-select-demo"></div>' +
            '</div></div></div>';
    }else if(currentconfig[index].contentType == 'input'){
        // inputConfig.push({index: o,url: currentconfig[index].url,type: currentconfig[index].indicatorName});
        str+='<div class="layui-row">' +
            '<div class="layui-col-lg12">' ;
        str+='<label class="layui-form-label">' + currentconfig[index].indicatorCname + '</label>';
        str+=`<div class="layui-input-block" onclick="showComment('${currentconfig[index].comment}',this)">` +
            '<input type="text" id="inputConfig'+ o +'" name="evaluationScore'+ o +'"  lay-verify="required" placeholder="请填写'+ currentconfig[index].indicatorCname +'" autocomplete="on" class="layui-input" />' +
            '</div></div></div>';
    }else if(currentconfig[index].contentType == 'number'){
        str+='<div class="layui-row">' +
            '<div class="layui-col-lg12">' ;
        str+='<label class="layui-form-label">' + currentconfig[index].indicatorCname + '</label>';
        str+=`<div class="layui-input-block" onclick="showComment('${currentconfig[index].comment}',this)">` +
            '<input type="text" onkeyup="onlyNonNegative(this)" id="inputConfig'+ o +'" name="evaluationScore'+ o +'"  lay-verify="required" placeholder="请填写'+ currentconfig[index].indicatorCname +'" autocomplete="on" class="layui-input" />' +
            '</div></div></div>';
    }
        // else if(currentconfig[index].contentType == 'url'){
        //     urlConfig.push(o);
        //     if(currentconfig[index].url == null){currentconfig[index].url='http://www.baidu.com'}
        //     str+='<div class="layui-row">' +
        //         '<div class="layui-col-lg12">' ;
        //         if(currentconfig[index].comment!=''&&currentconfig[index].comment!=null){
        //             str+='<label class="layui-form-label" lay-tips="'+ currentconfig[index].comment +'">' + currentconfig[index].indicatorCname + '</label>';
        //         }else{
        //             str+='<label class="layui-form-label">' + currentconfig[index].indicatorCname + '</label>';
        //         }
        //         str+='<div class="layui-input-block">' +
        //         '<a id="urlConfig'+ o +'" href="'+ currentconfig[index].url +'?username='+ currentUsername +'" target="_blank">点我进入'+ currentconfig[index].indicatorCname +'</a>' +
        //         '</div></div></div>';
    // }
    else if(currentconfig[index].contentType == 'text'){
        if(typeof(textConfig)!='undefined'){textConfig.push(o);}
        str+='<div class="layui-row">' +
            '<div class="layui-col-lg12">';
        str+='<label class="layui-form-label">' + currentconfig[index].indicatorCname + '</label>';
        str+=`<div class="layui-input-block" onclick="showComment('${currentconfig[index].comment}',this)">` +
            '<textarea type="text"  id="textConfig'+ o +'" name="evaluationScore'+ o +'"   placeholder="请填写'+ currentconfig[index].indicatorCname +'" autocomplete="on" class="layui-textarea" ></textarea>' +
            '</div></div></div>';
    }else if(currentconfig[index].contentType == 'file'){
        if(typeof(fileConfig)!='undefined'){fileConfig.push(o);}
        str+='<div class="layui-row">' +
            '<div class="layui-col-lg12">' ;
        str+='<label class="layui-form-label">' + currentconfig[index].indicatorCname + '</label>';
        str+=`<div class="layui-input-block" onclick="showComment('${currentconfig[index].comment}',this)">` +
            '<button type="button" class="layui-btn" onclick="uploadFileMeeting('+ o +')">上传附件</button>' +
            '<input id="fileUpload'+ o +'" name="evaluationScore'+ o +'" class="layui-input layui-disabled" disabled=""/>' +
            '</div></div></div>';
    }else if(currentconfig[index].contentType == 'date'){
        if(typeof(dateConfig)!='undefined'){dateConfig.push(o);}
        str+='<div class="layui-row">' +
            '<div class="layui-col-lg12">' ;
        str+='<label class="layui-form-label">' + currentconfig[index].indicatorCname + '</label>';
        str+=`<div class="layui-input-block" onclick="showComment('${currentconfig[index].comment}',this)">` +
            '<input type="text" id="dateConfig'+ o +'" name="evaluationScore'+ o +'"  lay-verify="required" placeholder="请选择'+ currentconfig[index].indicatorCname +'" autocomplete="off" class="layui-input" />' +
            '</div></div></div>';
    }else if(currentconfig[index].contentType == 'rangeDate'){
        if(typeof(rangeDateConfig)!='undefined'){rangeDateConfig.push(o);}
        str+='<div class="layui-row">' +
            '<div class="layui-col-lg12">' ;
        str+='<label class="layui-form-label">' + currentconfig[index].indicatorCname + '</label>';
        str+=`<div class="layui-input-block" onclick="showComment('${currentconfig[index].comment}',this)">` +
            '<input type="text" id="rangeDateConfig'+ o +'" name="evaluationScore'+ o +'"  lay-verify="required" placeholder="请选择'+ currentconfig[index].indicatorCname +'" autocomplete="off" class="layui-input" />' +
            '</div></div></div>';
    }else if(currentconfig[index].contentType == 'rangeTime'){
        if(typeof(rangeTimeConfig)!='undefined'){rangeTimeConfig.push(o);}
        str+='<div class="layui-row">' +
            '<div class="layui-col-lg12">';
        str+='<label class="layui-form-label">' + currentconfig[index].indicatorCname + '</label>';
        str+=`<div class="layui-input-block" onclick="showComment('${currentconfig[index].comment}',this)">` +
            '<input type="text" id="rangeTimeConfig'+ o +'" name="evaluationScore'+ o +'"  lay-verify="required" placeholder="请选择'+ currentconfig[index].indicatorCname +'" autocomplete="off" class="layui-input" />' +
            '</div></div></div>';
    }else if(currentconfig[index].contentType == 'radio'){
        if(typeof(radioConfig)!='undefined'){radioConfig.push(o);}
        if(currentconfig[index].indicatorName.indexOf('audit')!=-1){
            auditConfig.push(o);
            str+='<div class="layui-row">' +
                '<div class="layui-col-lg12">' ;
            str+='<label class="layui-form-label">' + currentconfig[index].indicatorCname + '</label>';
            str+=`<div class="layui-input-block" onclick="showComment('${currentconfig[index].comment}',this)">` +
                '<input type="radio" name="evaluationScore'+ o +'" value="合格" title="合格">' +
                '<input type="radio" name="evaluationScore'+ o +'" value="不合格" title="不合格" checked>' +
                // '<input type="text" id="isAudit'+ templateId +'" name="isAudit'+ templateId +'"  lay-verify="required" placeholder="请选择'+ currentconfig[index].indicatorCname +'" autocomplete="off" class="layui-input" />' +
                '</div></div></div>';
        }

    }else if(currentconfig[index].contentType == 'checkbox'){
        if(typeof(checkboxConfig)!='undefined'){checkboxConfig.push(o);}
        str += '<div class="layui-row">' +
            '<div class="layui-col-lg12">';
        str+='<label class="layui-form-label">' + currentconfig[index].indicatorCname + '</label>';
        str+=`<div class="layui-input-block" onclick="showComment('${currentconfig[index].comment}',this)" style="padding: 9px 0;">`;
        if (currentconfig[index].indicatorName.indexOf('|taskSelect|')!=-1){
            // taskConfig.push(o);
            // console.log(parent.taskList);
            $.each(parent.taskList,function (i,d) {
                str+='<input type="checkbox" lay-skin="primary" name="evaluationScore' + o + '" value="'+ d.task +'" title="'+ d.name +'">'
            })
        }
        // '<input type="text" id="isAudit'+ templateId +'" name="isAudit'+ templateId +'"  lay-verify="required" placeholder="请选择'+ currentconfig[index].indicatorCname +'" autocomplete="off" class="layui-input" />' +
        str+='</div></div></div>';

    }else if(currentconfig[index].contentType == 'evaluationTab'){
        if(typeof(evaluationTabConfig)!='undefined'){evaluationTabConfig.push({index:o,objects: currentconfig[index]});}
        str+='<div class="layui-row">' +
            '<div class="layui-col-lg12">' ;
        str+='<label class="layui-form-label">' + currentconfig[index].indicatorCname + '</label>';
        str+=`<div class="layui-input-block" onclick="showComment('${currentconfig[index].comment}',this)">` ;
        if(currentconfig[index].configIndicatorDTOS.length==0){
            str+='<span>所有指标项已合格!</span>'
        }else{
            str+='<div class="layui-card-body" style="padding-top: 0">' +
                '<div class="layui-tab layui-tab-brief" lay-filter="evaluationTabConfig_'+ o +'">' +
                '<ul class="layui-tab-title">';
            var tableId;
            $.each(currentconfig[index].configIndicatorDTOS,function (i1,d1) {
                if(objectLevel == 2){
                    $.each(d1.configIndicatorDTOS,function (i2,d2) {
                        evaluationTable.push(o+'_'+d2.id);
                        if(i2 == 0){
                            tableId = d2.id;
                            str+=' <li class="layui-this" id="parentTab_'+ o+'_'+d2.id +'">'+ d1.indicatorCname +':'+ d2.indicatorCname +'</li>';
                        }else{
                            str+=' <li id="parentTab_'+ o+'_'+d2.id +'">'+ d1.indicatorCname +':'+ d2.indicatorCname +'</li>';
                        }
                    })
                }
            });
            str+='</ul>' +
                '<div class="layui-tab-content">' +
                '<div class="layui-tab-item layui-show layui-tab-'+ o +'">' +
                '<table class="layui-hide add_progress" id="evaluationTable_'+ o +'_'+ tableId +'" lay-filter="evaluationTable_'+ o +'_'+ tableId +'"></table>';
            // ' <script type="text/html" id="toolbar_'+ o +'_'+ tableId +'">' +
            // '<a class="layui-btn layui-btn-xs" lay-event="download">下载</a>' +
            // '<a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="delete">删除</a>' +
            // '</script>';
            str+='</div></div></div></div>';
        }
        str+='</div></div></div>';
    }else if(currentconfig[index].contentType == "sendMessage"){//发送短信/邮件
        var pae = getPhoneAndEmailByUsername(username);
        str+='<div class="layui-row">' +
            '<div class="layui-col-lg12">' ;
        str+='<label class="layui-form-label">' + currentconfig[index].indicatorCname + '</label>';
        str+=`<div class="layui-input-block" onclick="showComment('${currentconfig[index].comment}',this)">` +
            ' <input type="checkbox" name="sendMessage" lay-skin="primary" title="手机" value="'+ pae.phone +'" checked="">'+
            ' <input type="checkbox" name="sendMessage" lay-skin="primary" title="邮箱" value="'+ pae.email +'" checked="">' +
            ' <textarea type="text"  id="textConfig'+ o +'" name="evaluationScore'+ o +'"   placeholder="请填写'+ currentconfig[index].indicatorCname +'" autocomplete="on" class="layui-textarea" ></textarea>';
        str+='</div></div></div>';
    }else if(currentconfig[index].contentType == "localObject"){
        if(typeof(localObjects)!='undefined'){localObjects.push({index:o,objects: currentconfig[index].configIndicatorDTOS,indicatorName: currentconfig[index].indicatorName});}
        if(typeof(localObjectConfig)!='undefined'){localObjectConfig.push({index:o,indicatorName: currentconfig[index].indicatorName});}
        str+='<div class="layui-row">' +
            '<div class="layui-col-lg12">' ;
        str+='<label class="layui-form-label">' + currentconfig[index].indicatorCname + '</label>';
        str+=`<div class="layui-input-block" onclick="showComment('${currentconfig[index].comment}',this)">` ;
        if(currentconfig[index].indicatorName == 'localVariable'){
            for(var i = 0;i<objectLevel;i++){
                if(objectLevel == 2&&i == 1){
                    str+='<div id="localObjectConfig'+ (i+1) +'_'+ o +'" class="xm-select-demo"></div>';
                }else{
                    str+='<select class="localObject" name="localObject'+ (i+1) +'_'+ o +'" id="localObject'+ (i+1) +'_'+ o +'" lay-filter="localObject'+ (i+1) +'_'+ o +'" lay-search="">' +
                        '<option value="">请选择'+ (i+1) +'级选项</option>' +
                        '</select>'
                }
            }
            str+='<a class="layui-btn" id="add_object'+ o +'" onclick="addObject('+ o +')">添加</a>';
        }else{
            for(var i = 0;i<objectLevel;i++){
                if(objectLevel == 2&&i == 1){
                    // str+='<div id="localObjectConfig'+ (i+1) +'_'+ o +'" class="xm-select-demo"></div>';
                }else{
                    str+='<select class="localObject" name="localObject'+ (i+1) +'_'+ o +'" id="localObject'+ (i+1) +'_'+ o +'" lay-filter="localObject'+ (i+1) +'_'+ o +'" lay-search="">' +
                        '<option value="">请选择'+ (i+1) +'级选项</option>' +
                        '</select>'
                    str+='<div id="localObjectSonConfigBowl" style="width: 40%;margin: 0;float: left;"></div>'
                }
            }
        }
        str+='</div></div></div>';
    }
    return str;
}

//页面字段生成
window.configInputByInfo = function (item,spdata,index) {
    // function configInput(item,spdata) {
    var str = '';
    // if(item.timetableResults.length>0) {
        var step = new Object();//所有阶段
        var is = [];//获取所有name
        if(item.processStep){
            step['step'] = item.processStep;
        }else{
            step['step'] = index;
        }

        $.each(item.configIndicators, function (i, d) {
            is.push('evaluationScore' + (i + 1));
            if(d.indicatorName == null){d.indicatorName = ''}
            if (d.indicatorName.indexOf('|each|') == -1) {
                if (d.contentType == "text") {
                    if(typeof(textConfig)!='undefined'){ textConfig.push((i + 1));}
                    str += '<div class="layui-row">' +
                        '<div class="layui-col-lg12">';
                    str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
                    str+=`<div class="layui-input-block" onclick="showComment('${d.comment}',this)">
 <textarea style="overflow-y: hidden;" type="text" name="evaluationScore${i + 1}" id="showConfig${i + 1}" autocomplete="off" disabled="" readonly="" class="layui-textarea"></textarea>
                        </div></div></div>`;
                } else if (d.contentType == "url") {
                    if(typeof(urlConfig)!='undefined'){ urlConfig.push((i + 1));}
                    if (d.url == null) {
                        d.url = 'http://www.baidu.com'
                    }
                    str += '<div class="layui-row">' +
                        '<div class="layui-col-lg12">';
                    str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
                    let u = d.url.indexOf('?') == -1 ? `${d.url}?username=${currentUsername}` : `${d.url}&username=${currentUsername}`
                    str+=`<div class="layui-input-block" onclick="showComment('${d.comment}',this)">` +
                        '<a id="evaluationScore' + (i + 1) + '" href="' + u + '" target="_blank">点我进入' + d.indicatorCname + '</a>' +
                        '</div></div></div>';
                } else if (d.contentType == "multiSelect") {
                    str += '<div class="layui-row">' +
                        '<div class="layui-col-lg12">';
                    str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
                    str+=`<div class="layui-input-block" onclick="showComment('${d.comment}',this)">` +
                        '<textarea style="overflow-y: hidden;" type="text" name="evaluationScore' + (i + 1) + '" id="showConfig' + (i + 1) + '" autocomplete="off" disabled="disabled" readonly="readonly" class="layui-textarea"></textarea>' +
                        '</div></div></div>';
                } else if (d.contentType == "file") {
                    if(typeof(fileConfig)!='undefined'){fileConfig.push((i + 1));}
                    str += '<div class="layui-row">' +
                        '<div class="layui-col-lg12">';
                    str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
                    str+=`<div class="layui-input-block" onclick="showComment('${d.comment}',this)">` ;
                    // if (d.indicatorName.indexOf('|show|') != -1) {
                    //     str += '<a class="file_show" id="fileConfig' + (i + 1) + '" title="点我预览' + d.indicatorCname + '">';
                    // } else {
                    //     str += '<a class="file_download" id="fileConfig' + (i + 1) + '" title="点我下载' + d.indicatorCname + '">';
                    // }
                    let upstep =  item.processStep ? item.processStep : index;
                    str += '<input type="button" class="layui-input" id="fileUpload' + (i + 1) + '_'+ upstep +'"  name="evaluationScore' + (i + 1) + '" autocomplete="off" disabled="disabled" readonly="readonly" />' +
                        '</a>' +
                        '</div></div></div>';
                } else if (d.contentType == 'import') {
                    str += '';
                } else if (d.contentType == 'export') {
                    if (step['step'] != 1) {
                        var importStep = 0;
                        for (var j = 0; j < d.indicatorName.split('|').length; j++) {
                            if (d.indicatorName.split('|')[j].indexOf('stepResult') != -1) {
                                importStep = d.indicatorName.split('|')[j].replace(/[^0-9]/ig, "");
                            }else{
                                importStep = step['step'];
                            }
                        }
                        // fileConfig.push((i+1));
                        str += '<div class="layui-row">' +
                            '<div class="layui-col-lg12">';
                        str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
                        str+=`<div class="layui-input-block" onclick="showComment('${d.comment}',this)">` +
                            '<button type="button" class="layui-btn" onclick="exportFile(' + (i + 1) + ',' + importStep  + ',' + item.thisTask + ')">导出</button>' +
                            // '<input id="export'+ (i+1) +'" class="layui-input layui-disabled" disabled=""/>' +
                            '</div></div></div>';
                    }
                } else if (d.contentType == "localObject") {
                    if(typeof(localObjects)!='undefined'){
                        localObjects.push({
                            index: (i + 1),
                            objects: d.configIndicatorDTOS,
                            indicatorName: d.indicatorName
                        });
                    }

                    if (d.indicatorName == 'select' || d.indicatorName == 'select2') {
                        str += '<div class="layui-row">' +
                            '<div class="layui-col-lg12">' ;
                        str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
                        str+=`<div class="layui-input-block" onclick="showComment('${d.comment}',this)">` +
                            '<input type="text" class="layui-input" id="showConfig' + (i + 1) + '" name="evaluationScore' + (i + 1) + '" autocomplete="off" disabled="disabled" readonly="readonly">' +
                            '</div></div></div>';
                    } else {
                        str += '<div class="layui-row">' +
                            '<div class="layui-col-lg12">' ;
                        str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
                        str+=`<div class="layui-input-block" onclick="showComment('${d.comment}',this)" id="evaluationScore${(i + 1)}">` +
                            // '<textarea type="text" name="evaluationScore'+ (i+1) +'" id="showConfig'+ (i+1) +'" autocomplete="off" disabled="disabled" readonly="readonly" class="layui-textarea"></textarea>' +
                            '</div></div></div>';
                    }

                } else if (d.contentType == 'evaluationTab') {
                    if(typeof(evaluationTabConfig)!='undefined'){ evaluationTabConfig.push({index: (i + 1), objects: d, step: item.processStep});}
                    if(typeof(evaluationTabStep)!='undefined'){ evaluationTabStep.push(item.processStep);}
                    str += '<div class="layui-row">' +
                        '<div class="layui-col-lg12">' ;
                    str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
                    str+=`<div class="layui-input-block" onclick="showComment('${d.comment}',this)">` ;
                    if (d.configIndicatorDTOS.length == 0) {
                        str += '<span style="padding-left: 10px;">所有指标项已合格!</span>'
                    } else {
                        str += '<div class="layui-card-body" style="padding-top: 0">' +
                            '<div class="layui-tab layui-tab-brief" lay-filter="evaluationTabConfig_' + (i + 1) + '_' + item.processStep + '">' +
                            '<ul class="layui-tab-title">';
                        var tableId;
                        $.each(d.configIndicatorDTOS, function (i1, d1) {
                            if (objectLevel == 2) {
                                $.each(d1.configIndicatorDTOS, function (i2, d2) {
                                    if(typeof(evaluationTable)!='undefined'){
                                        evaluationTable.push({
                                            step: item.processStep,
                                            id: (i + 1) + '_' + d2.id + '_' + item.processStep
                                        });
                                    }
                                    // evaluationTable.push((i+1)+'_'+d2.id+'_'+item.processStep);
                                    if (i2 == 0) {
                                        tableId = d2.id;
                                        str += ' <li class="layui-this" id="parentTab_' + (i + 1) + '_' + d2.id + '_' + item.processStep + '">' + d1.indicatorCname + ':' + d2.indicatorCname + '</li>';
                                    } else {
                                        str += ' <li id="parentTab_' + (i + 1) + '_' + d2.id + '_' + item.processStep + '">' + d1.indicatorCname + ':' + d2.indicatorCname + '</li>';
                                    }
                                })
                            }
                        });
                        str += '</ul>' +
                            '<div class="layui-tab-content">' +
                            '<div class="layui-tab-item layui-show layui-tab-' + (i + 1) + '">' +
                            '<table class="layui-hide add_progress" id="evaluationTable_' + (i + 1) + '_' + tableId + '_' + item.processStep + '" lay-filter="evaluationTable_' + (i + 1) + '_' + tableId + '_' + item.processStep + '"></table>';
                        // ' <script type="text/html" id="toolbar_'+ (i+1) +'_'+ tableId +'">' +
                        // '<a class="layui-btn layui-btn-xs" lay-event="download">下载</a>' +
                        // '<a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="delete">删除</a>' +
                        // '</script>';
                        str += '</div></div></div></div>';
                    }

                    str += '</div></div></div>';
                } else if (d.contentType == 'table') {
                    if(d.indicatorName.indexOf('stepResult')!=-1){
                        str += specialTemplateConfigInput(spdata, d, currusername,item.processStep, 'info')
                    }else{
                        var tableObj = new Object();
                        tableObj['index'] = i+1;
                        tableObj['url'] = d.url;
                        tableObj['type'] = d.indicatorName;
                        tableObj['processStep'] = item.processStep;
                        tableObj['cname'] = d.indicatorCname;
                        tableObj['configIndicatorDTOS'] = d.configIndicatorDTOS;
                        if (d.indicatorName.indexOf('linkage') != -1) {
                            for (var j = 0; j < d.indicatorName.split('|').length; j++) {
                                if (d.indicatorName.split('|')[j].indexOf('linkage') != -1) {
                                    tableObj['parentId'] = d.indicatorName.split('|')[j].replace(/[^0-9]/ig, "");
                                }
                            }
                        }
                        $.each(item.configIndicators,function (j,b) {
                            if(b.id == tableObj['parentId']){
                                tableObj['parentIndex'] = j+1;
                            }
                        })
                        for(var k in item.timetableResults[0]){
                            if(k == 'evaluationScore'+tableObj['parentIndex']){
                                tableObj['parentValue'] = item.timetableResults[0][k].split('_')[0];
                            }
                        }
                        str += '<div class="layui-row">' +
                            '<div class="layui-col-lg12">';
                        str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
                        str+=`<div class="layui-input-block" onclick="showComment('${d.comment}',this)">` +
                            '<input type="hidden" id="tableConfig' + (i + 1) + '" name="evaluationScore' + (i + 1) + '" autocomplete="on" class="layui-input" />' +
                            '<table class="layui-table" id="evaluationScoreTable_' + (i + 1) + '_'+ item.processStep +'" lay-filter="evaluationScoreTable_' + (i + 1) + '_'+ item.processStep +'"></table>' +
                            '</div></div></div>';
                        tableConfig.push(tableObj)
                    }
                } else {
                    str += '<div class="layui-row">' +
                        '<div class="layui-col-lg12">' ;
                    str+='<label class="layui-form-label">' + d.indicatorCname + '</label>';
                    str+=`<div class="layui-input-block" onclick="showComment('${d.comment}',this)">` +
                        '<input type="text" class="layui-input" id="showConfig' + (i + 1) + '" name="evaluationScore' + (i + 1) + '" autocomplete="off" disabled="disabled" readonly="readonly">' +
                        '</div></div></div>';
                }
            }

        });
        step['task'] = item.parallelTask;
        // str+='</form></div></div></div></div>'
        step['name'] = is;

        steps.push(step);
        // if(specialSteps.length>0){
        //     specialStepRender(spdata.processKey);
        // }
    // }
    return str;
}

window.getResultByInfo = function(data,username){
    var params = [];
    var result_index = 0;
    var step_index = 0;
    $.each(steps,function (i,d) {
        var param = {};
        if(username){
            $.each(data.timetableProcessDTOS,function (j,o) {
                if(o.processStep == d.step && o.parallelTask == d.task){
                    step_index = j;
                    $.each(o.timetableResults,function (m,n) {
                        if(n.initiatorUsername == username){
                            result_index = m
                            return false
                        }
                        result_index = n.initiatorUsername == username ? m : null
                    })
                }
            })
        }else{
            $.each(data.timetableProcessDTOS,function (j,o) {
                if(!o.processStep){
                    step_index = (d.task == null||d.task == 0)?(d.step-1):(d.step-1+(d.task-1));
                    return false;
                }
                if(o.processStep == d.step && o.parallelTask == d.task){
                    step_index = j;
                    return false;
                }
            })
        }
        param['code'] = result_index == null?404:200;
        $.each(d.name,function (index,item) {
            if(result_index == null){
                var str = "param." + item + "=''";
                eval(str);
                return true;
            }
            // if(item.step == d.step){
            if(data.timetableProcessDTOS[step_index].configIndicators[index].indicatorName == null){data.timetableProcessDTOS[step_index].configIndicators[index].indicatorName = ''};
            if((data.timetableProcessDTOS[step_index].configIndicators[index].indicatorName == "current"||data.timetableProcessDTOS[step_index].configIndicators[index].indicatorName.indexOf('|current|')!=-1||data.timetableProcessDTOS[step_index].configIndicators[index].indicatorName.indexOf('|currentLogin|')!=-1||data.timetableProcessDTOS[step_index].configIndicators[index].contentType == "select")
                && data.timetableProcessDTOS[step_index].configIndicators[index].contentType != "url"
            ){
                var str = "param." + item + "='" + data.timetableProcessDTOS[step_index].timetableResults[result_index][item].split('_')[data.timetableProcessDTOS[step_index].timetableResults[result_index][item].split('_').length-1]+"'";
            }else if(data.timetableProcessDTOS[step_index].configIndicators[index].contentType == "text"){
                // var text = data.timetableProcessDTOS[step_index].timetableResults[result_index][item].replace(/\n/g,"<br/>");
                // var text = data.timetableProcessDTOS[step_index].timetableResults[result_index][item];
                // var str = "param." + item + "='" + text+"'";
                //这样写是因为/n不会被eval(str)执行 会报错
                var str = '';
                $("[name="+ item +"]").val(data.timetableProcessDTOS[step_index].timetableResults[result_index][item]);
                textareafullscreens.push(item);
                // var str = '';
                // $("#step_info_"+ d.step +" [name="+ item +"]").html(data.timetableProcessDTOS[step_index].timetableResults[result_index][item]);
            }else if(data.timetableProcessDTOS[step_index].configIndicators[index].contentType == "url"){
                $('#'+item).attr('href', data.timetableProcessDTOS[step_index].timetableResults[result_index][item]);
            }else if(data.timetableProcessDTOS[step_index].configIndicators[index].contentType == "input"){
                //针对input输入链接在详情页面直接可以点击跳转
                if(data.timetableProcessDTOS[step_index].timetableResults[result_index][item].indexOf('http://')!=-1 || data.timetableProcessDTOS[step_index].timetableResults[result_index][item].indexOf('https://')!=-1){
                    $("[name="+ item +"]").before(`<a target="_blank" id="showInput${index+1}" title="点我跳转" href="${data.timetableProcessDTOS[step_index].timetableResults[result_index][item]}">${data.timetableProcessDTOS[step_index].timetableResults[result_index][item]}</a>`);
                    $("[name="+ item +"]").remove();
                }else{
                    var str = "param." + item + "='" + data.timetableProcessDTOS[step_index].timetableResults[result_index][item]+"'";
                }
            }else if(data.timetableProcessDTOS[step_index].configIndicators[index].contentType == "multiSelect"){
                var objs = data.timetableProcessDTOS[step_index].timetableResults[result_index][item].split(',');
                var s = '';
                if(objs.length>0){
                    $.each(objs,function (i,d) {
                        s+=d.split('_')[d.split('_').length-1]+',';
                    })
                    s = s.slice(0,s.length-1);
                }
                var str = "param." + item + "='" + s +"'";
                textareafullscreens.push(item);
            }else if(data.timetableProcessDTOS[step_index].configIndicators[index].contentType == "checkbox"){
                var objs = data.timetableProcessDTOS[step_index].timetableResults[result_index][item].split(',');
                var s = '';
                if(objs.length>0){
                    $.each(objs,function (i,d) {
                        s+=d.split('_')[d.split('_').length-1]+',';
                    })
                    s = s.slice(0,s.length-1);
                }
                var str = "param." + item + "='" + s +"'";
            }else if(data.timetableProcessDTOS[step_index].configIndicators[index].contentType == "file"){
                if(data.timetableProcessDTOS[step_index].timetableResults[result_index][item] == ''){
                    var str = "param." + item + "='未提交'";
                }else{
                    if(data.timetableProcessDTOS[step_index].timetableResults[result_index][item]){
                        let files = data.timetableProcessDTOS[step_index].timetableResults[result_index][item].split(',');
                        $.each(files, function (key, value) {
                            $('#fileConfig'+(index+1)+'_'+ key +'_'+ d.step).remove();
                            if(data.timetableProcessDTOS[step_index].configIndicators[index].indicatorName.indexOf('|show|')!=-1){
                                $('#fileUpload'+(index+1)+'_'+d.step).before('<a class="file_show" id="fileConfig'+ (index+1) +'_'+ key +'_'+ d.step +'" title="点我下载'+ data.timetableProcessDTOS[step_index].configIndicators[index].indicatorCname +'">点我预览'+ value.split('_')[value.split('_').length-1] +'</a>');
                            }else {
                                $('#fileUpload'+(index+1)+'_'+d.step).before('<a class="file_download" id="fileConfig'+ (index+1) +'_'+ key +'_'+ d.step +'" title="点我下载'+ data.timetableProcessDTOS[step_index].configIndicators[index].indicatorCname +'">点我下载'+ value.split('_')[value.split('_').length-1] +'</a>');
                            }
                            $('#fileConfig'+(index+1)+'_'+key+'_'+d.step).attr("data",value.split('_')[0]);
                        })
                        var str = "param." + item + "='" + data.timetableProcessDTOS[step_index].timetableResults[result_index][item].split('_')[data.timetableProcessDTOS[step_index].timetableResults[result_index][item].split('_').length-1]+"'";
                    }
                    // $('#fileConfig'+(index+1)).attr("data",data.timetableProcessDTOS[step_index].timetableResults[result_index][item].split('_')[0]);
                }

            }else if(data.timetableProcessDTOS[step_index].configIndicators[index].contentType == "radio"){
                // if(data.timetableProcessDTOS[step_index].configIndicators[index].indicatorName.indexOf('|audit|')!=-1&&data.timetableProcessDTOS[step_index].configIndicators[index].indicatorOptions !=  null&&data.timetableProcessDTOS[step_index].configIndicators[index].indicatorOptions!=''){
                if(data.timetableProcessDTOS[step_index].configIndicators[index].indicatorOptions !=  null&&data.timetableProcessDTOS[step_index].configIndicators[index].indicatorOptions!=''){
                    var options = data.timetableProcessDTOS[step_index].configIndicators[index].indicatorOptions.indexOf(',')!=-1?data.timetableProcessDTOS[step_index].configIndicators[index].indicatorOptions.split(','):data.timetableProcessDTOS[step_index].configIndicators[index].indicatorOptions.split('，');
                    var str = "param." + item + "='" + options[Number(data.timetableProcessDTOS[step_index].timetableResults[result_index][item])-1]+"'";
                }else{
                    var str = "param." + item + "='" + data.timetableProcessDTOS[step_index].timetableResults[result_index][item]+"'";
                }
            }else if(data.timetableProcessDTOS[step_index].configIndicators[index].contentType == "evaluationTab"){
                evaluationTabResult.push({index: (index+1),result: data.timetableProcessDTOS[step_index].timetableResults[result_index][item],step: d.step})
            }else if(data.timetableProcessDTOS[step_index].configIndicators[index].contentType == "localObject"){
                if(data.timetableProcessDTOS[step_index].configIndicators[index].indicatorName == 'select'){
                    var str = "param." + item + "='" + data.timetableProcessDTOS[step_index].timetableResults[result_index][item].split('_')[data.timetableProcessDTOS[step_index].timetableResults[result_index][item].split('_').length-1]+"'";
                }else if(data.timetableProcessDTOS[step_index].configIndicators[index].indicatorName == 'select2'){
                    var str = "param." + item + "='" + data.timetableProcessDTOS[step_index].timetableResults[result_index][item]+"'";
                }else{
                    // console.log('1');
                    var str = '';
                    var localStr = '';
                    var obids = data.timetableProcessDTOS[step_index].timetableResults[result_index][item].split(',');
                    $.each(localObjects,function (i,d) {
                        if(d.index == (index+1)){
                            if(d.indicatorName == 'localVariable'){
                                $.each(d.objects,function (i1,d1) {
                                    $.each(d1.configIndicatorDTOS,function (i2,d2){
                                        $.each(obids,function (j,k) {
                                            if(k == d2.id){
                                                localStr+='<div class="layui-collapse" id="objectadded'+ j +'">';
                                                localStr+='<div class="layui-colla-item">' +
                                                    '<h2 class="layui-colla-title">'+ d2.indicatorCname +'</h2>' +
                                                    '<div class="layui-colla-content"><ul>';
                                                if(d2.configIndicatorDTOS.length>0){
                                                    $.each(d2.configIndicatorDTOS,function (i3,d3) {
                                                        localStr+='<li id="level3'+ d3.id +'">'+ d3.indicatorCname +'</li>'
                                                    })
                                                }
                                                localStr+='</ul></div></div>';
                                                localStr+='</div>';
                                            }
                                        })
                                    })
                                })
                            }else if(d.indicatorName == 'checkTimeType'){
                                localStr+='<input type="text" class="layui-input" id="showConfig'+ d.index +'" name="'+ item +'" autocomplete="off" disabled="disabled" readonly="readonly">';
                                var id= obids[0].split('_')[0];
                                $.each(d.objects,function (i1,d1) {
                                    if(d1.id == id){
                                        if(d1.contentType == 'week'){
                                            str = "param." + item + "='" + d1.indicatorCname+"，每周"+ obids[0].split('_')[obids[0].split('_').length-1] +"'";
                                        }else if(d1.contentType == 'month'){
                                            str = "param." + item + "='" + d1.indicatorCname+"，每月"+ obids[0].split('_')[obids[0].split('_').length-1] +"号'";
                                        }else{
                                            str = "param." + item + "='" + d1.indicatorCname+"，"+ obids[0].split('_')[obids[0].split('_').length-1] +"'";
                                        }
                                    }
                                })
                            }
                        }

                    })
                    $('#'+item).html(localStr);
                    layui.element.render("collapse")
                }
            }else{
                var str = "param." + item + "='" + data.timetableProcessDTOS[step_index].timetableResults[result_index][item]+"'";
            }
            // }
            eval(str);
        });
        params.push(param)
    });
    return params;
}
layui.use(['table','layer','laydate','form','element','util'],function (){
    var $ = layui.$,
        layer = layui.layer,
        table = layui.table,
        laydate = layui.laydate,
        form = layui.form,
        util = layui.util,
        element = layui.element
    ;

window.configRenderSP = function () {
// function configRenderSP() {
    $.each(multiSelectConfig,function (index,item) {
        var multis = 'multiSelectConfig'+item.index;
        if(item.type.indexOf('|search|')!=-1){//数据过多需要筛选 远程搜索
            multis = xmSelect.render({
                el: '#multiSelectConfig'+item.index,
                name: 'evaluationScore'+item.index,
                layVerify: 'required',
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
                    $.ajax({
                        url: zuulHost+item.url+'?keyword='+val,
                        async: false,
                        type: 'get',
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
                layVerify: 'required',
                // toolbar: {show: true, showIcon: false},
                theme: {color: '#1E9FFF',},
                model: {icon: 'hidden',},
                data: []
            });
            if(item.url!=null){
                $.ajax({
                    url: zuulHost+item.url,
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
    });
    $.each(dateConfig,function (index,item) {
        laydate.render({
            elem: '#dateConfig'+item,
            trigger: 'click',
            // min:minDate()
            // , range: '~'
        });
    });
    $.each(rangeDateConfig,function (index,item) {
        laydate.render({
            elem: '#rangeDateConfig'+item,
            trigger: 'click'
            // min:minDate()
            , range: '~'
        });
    });
    $.each(rangeTimeConfig,function (index,item) {
        laydate.render({
            elem: '#rangeTimeConfig'+item
            ,trigger: 'click'
            ,type: 'time'
            // min:minDate()
            , range: '~'
        });
    });
    $.each(inputConfig,function (index,item) {
        var url = '';
        if(item.url != null){
            if (item.type == 'current'){
                url = zuulHost+item.url;
                $.ajax({
                    url: url,
                    // dataType: 'json',
                    async: false,
                    type: 'get',
                    success: function (res) {
                        $('#inputConfig'+item.index).val(res.data[0].id+'_'+res.data[0].text);
                        $('#inputConfigShow'+item.index).val(res.data[0].text);
                        // console.log(res)
                    }
                });
            }else if(item.type.indexOf('|currentLogin|')!=-1){
                $('#inputConfig'+item.index).val(currusername+'_'+currcname);
                $('#inputConfigShow'+item.index).val(currcname);
            }
        }
    });
    $.each(selectConfig,function (index,item) {
        $.ajax({
            url: zuulHost+item.url,
            dataType: 'json',
            async: false,
            type: 'post',
            success: function (res) {
                // console.log(res)
                $.each(res.data, function (i, d) {
                    $('#selectConfig'+item.index).append(new Option(d.text, d.id));// 下拉菜单里添加元素
                });
                form.render("select");
            }
        });
    });
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
                            if(d1.id == data.value){
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
                            }
                        })
                    }

                });
                // strLocal+='</div>'
                $('#localObjectSonConfigBowl').html(strLocal);
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
}
});
//备注
window.showComment = function (comment,obj) {
    $('.commentMessage').remove();
    if(comment!=='null' && comment!=='')
        $(obj).after(`<span class="commentMessage" style="color: red;">${comment}</span>`)
};
window.getPhoneAndEmailByUsername = function (username) {
    var pae = new Object();
    if(username == ''){layer.msg('没有获取到用户名!');return false;}
    //获取用户基本信息
    $.ajaxSettings.async = false;
    $.get( userCenterHost + '/usercenter/getTeacherBasicInfo',{username: username}, function (res) {
        if (!res.code) {
            pae['code'] = true;
            pae['phone'] = res.data.phone;
            pae['email'] = res.data.email;
        } else {
            console.error(res.msg);
        }
    })
    $.ajaxSettings.async = true;
    return pae;
}