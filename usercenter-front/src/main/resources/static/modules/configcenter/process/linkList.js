const evaluationHost =apiGateWayHost+"/configcenter/";
var taskList = [];//并行阶段集合
layui.define(function (e) {
    layui.config({
        base:'../'
    }).extend({
        index:'lib/index'
    }).use(['index','table','form','layer','element'],function () {
        var $ = layui.$,
            layer = layui.layer,
            form = layui.form,
            table = layui.table,
            element = layui.element;
        var url,//列表api
        timeFlag = 1,//0:已结束1:进行中2:未开始
        currcname,//当前登录人姓名
        curruserdetail,//当前登录人个人信息
        currusername,//当前登录人工号
        currauth = [],//当前登录人选择权限
        authorities,//当前登录人拥有权限
        templateId,//进入页面的第一个模板id
        nextTemplateId,//子流程模板id
        cols = [],//根据模板获取列表表头
        firstStepName,//当前模板第一阶段名称
        nextConfigFirstStepName,//子流程模板第一阶段名称
        exactSearchDTO  = [],//记录列表筛选项
        nextIndicator  = [],//子流程第一步配置项
        currentauth = $.cookie('currauth'),
        currentauthName =  $.cookie("currentauthName"),
        timeFlag ,
        deleteFlag = 0 ,//0不可以删除 1可以删除
        infoCname,//总览按钮文本
        nextStepCname,//下一阶段按钮文本
        nextTemplateStepCname,//子流程下一阶段按钮文本
        extendsField = '',//继承字段
        allProcess,//所有阶段信息
        newAuth = false,//填写权限
        processKey;//当前模板流程
        //菜单栏
        $(".levelup_nav").hover(
            function() {
                $(this).children(".levelup_list").stop().slideDown(500);
            },
            function() {
                $(this).children(".levelup_list").stop().slideUp(500);
            }
        );
        getAllTemplates();
        getNextConfigInfo();
        getTemplateInfo();
        getCurrentUser();
        //根据flag获取列表0:已结束1:进行中2:未开始
        var exportFlag = 0;
        function getCurrentUser() {
            $.ajax({
                url: 'getCurrentUser',
                // dataType: 'json',
                async: false,
                type: 'get',
                success: function (res) {
                    currusername = res.username;
                    currcname = res.cname;
                    authorities = res.authorityMap[$('#clientId').val()];
                    $.ajax({
                        url: apiGateWayHost+'/usercenter/userInfo?username='+currusername,
                        // dataType: 'json',
                        async: false,
                        type: 'get',
                        success: function (res) {
                            // console.log(res);
                            curruserdetail = res;
                            if(authorities && authorities.length>1){
                                if(currentauth == undefined||currentauth == ''){
                                    var str = '';
                                    str+='<div class="layui-form">';
                                    $.each(authorities,function (index,item) {
                                        str+=' <input type="radio" name="auth" value="'+ item.name +'" title="'+ item.cname +'" checked="">'
                                    });
                                    str+='</div>'
                                    layer.confirm(str,{
                                        btn: ['确定'],
                                        title : '请选择权限',
                                        closeBtn :0,//不显示关闭按钮
                                        success: function(){
                                            form.render();
                                        },
                                        btn1: function (index) {
                                            currentauthName =  $("input[name='auth']:checked").attr('title');
                                            $('.changeAuth').html('切换权限（'+ $("input[name='auth']:checked").attr('title') +'）');
                                            currauth.push($("input[name='auth']:checked").val());
                                            // currauth = $("input[name='auth']:checked").val();
                                            getInfoByAuthorityName(currauth[0]);
                                            getTemplateProcess(currauth[0]);
                                            layer.close(index);
                                        }
                                    });
                                }else{
                                    currauth.push(currentauth);
                                    getInfoByAuthorityName(currauth[0]);
                                    getTemplateProcess(currauth[0]);
                                }
                                $.each(authorities,function (index,item) {
                                    if(currentauth == item.name){
                                        currentauthName = item.cname;
                                        $.cookie("currentauthName",currentauthName);
                                    }
                                });
                                $('.changeAuth').html('切换权限（'+ currentauthName +'）');
                                $('.changeAuth').removeClass('layui-hide');
                            }else{
                                if(authorities && authorities.length>0){
                                    currauth.push(authorities[0].name);
                                }
                                getInfoByAuthorityName(currauth[0]);
                                getTemplateProcess(currauth[0]);
                            }
                        }
                    });
                }
            });
        }
        function getTemplateProcess(currAuth) {
            $.ajax({
                url: evaluationHost + 'api/templateProcess/infoByTemplateAndStep?templateId='+templateId+'&authorityName='+currAuth,
                type:'get',
                async: false,
                success:function (res){
                    // console.log(res);
                    allProcess = res.data;
                    let taskStep = 0;
                    $.each(allProcess,function (i,d) {
                        if(d.parallelTask!=0){
                            taskStep = taskStep == 0 ? d.processStep : (taskStep == d.processStep ? taskStep : d.processStep);
                            taskList.push({step: taskStep,task: d.parallelTask,name: d.processCname});
                        }
                    })
                    $.each(res.data,function (index,obj) {
                        if(obj.processStep === 1){
                            firstStepName = obj.processCname;
                            $('.addTimetable').html(firstStepName);
                            if(obj.authorityNamesEdit.length == 0){
                                $('.addTimetable').removeClass('layui-hide');
                            }else{
                                $.each(obj.authorityNamesEdit,function (index,item) {
                                    $.each(currauth,function (i,d) {
                                        if(item == d){
                                            $('.addTimetable').removeClass('layui-hide');
                                        }
                                    })
                                })
                            }
                        }
                        if(obj.showLabel){
                            $('.all_step').append('<li data="'+ obj.processStep +'">'+ obj.processCname +'</li>')
                        }
                    })
                    if($('.all_step').children('li').length === 0){
                        $('.all_step').parent().remove();
                        getTableHeader();
                        tableRender();
                    }else{
                        $('.all_step').parent().show()
                        $(".layui-tab-card").append($("#common_table"));
                        $('.all_step').children('li').eq(0).addClass('layui-this');
                        var step1st = $('.all_step').children('li').eq(0).attr('data') === 'null'? null : $('.all_step').children('li').eq(0).attr('data');
                        getTableHeader(step1st);
                        tableRender(step1st);
                    }
                },
                error:function () {
                    layer.msg("获取第一阶段信息失败！");
                }
            });
        }
        function getNextConfigTemplateProcess(currAuth) {
            $.ajax({
                url: evaluationHost + 'api/templateProcess/infoByTemplateAndStep?templateId='+nextTemplateId+'&authorityName='+currAuth,
                type:'get',
                async: false,
                success:function (res){
                    // console.log(res);
                    allProcess = res.data;
                    let taskStep = 0;
                    $.each(allProcess,function (i,d) {
                        if(d.parallelTask!=0){
                            taskStep = taskStep == 0 ? d.processStep : (taskStep == d.processStep ? taskStep : d.processStep);
                            taskList.push({step: taskStep,task: d.parallelTask,name: d.processCname});
                        }
                    })
                    $.each(res.data,function (index,obj) {
                        if(obj.processStep === 1){
                            nextConfigFirstStepName = obj.processCname;
                            if(obj.authorityNamesEdit.length == 0){
                                newAuth = true;
                            }else{
                                $.each(obj.authorityNamesEdit,function (index,item) {
                                    $.each(currauth,function (i,d) {
                                        if(item == d){
                                            newAuth = true;
                                        }
                                    })
                                })
                            }
                        }
                    })
                },
                error:function () {
                    layer.msg("获取子流程第一阶段信息失败！");
                }
            });
        }
        function getNextConfigIndicator() {
            $.ajax({
                url: evaluationHost+'api/configIndicator/list?templateId='+ nextTemplateId +'&step=1&page=1&limit=999',
                dataType: 'json',
                async: false,
                type: 'get',
                success: function (res) {
                    // console.log(res);
                    nextIndicator = res.data;
                },
                error:function () {
                    alert("获取子流程配置项失败！");
                }
            });
        }
        //根据权限获取筛选项
        function getInfoByAuthorityName(currauth) {
            $.cookie("currauth",currauth);
            $.ajax({
                url: evaluationHost + 'api/templateAuthority/infoByAuthorityName?authorityName='+currauth+'&templateId='+templateId,
                type:'get',
                async: false,
                success:function (res){
                    // console.log(res);
                    if(res.data!=null&&res.data.length>0){
                        $.each(res.data,function (index,item) {
                            var searchValue;
                            if(item.configIndicatorSearchName == 'company'){//企业,事业,单位,公司
                                if(curruserdetail.data.enterpriseUser!=null){
                                    searchValue = curruserdetail.data.enterpriseUser.id+'_'+curruserdetail.data.enterpriseUser.enterpriseName;
                                }else if(curruserdetail.data.governmentUser!=null){
                                    searchValue = curruserdetail.data.governmentUser.id+'_'+curruserdetail.data.governmentUser.gsiName;
                                }
                            }else if(item.configIndicatorSearchName == 'academy'){//当前登录人学院
                                searchValue = curruserdetail.data.normalUser.college+'_'+curruserdetail.data.normalUser.collegeName;
                            }else if(item.configIndicatorSearchName == 'currentuser'){//当前登录人相关
                                searchValue = currusername+'_'+currcname;
                            }
                            exactSearchDTO.push({
                                configIndicatorId: item.configIndicatorId,
                                searchValue: searchValue
                            })
                        })
                    }
                },
                error:function () {
                    layer.msg("获取筛选项失敗！");
                }
            });
        }
        function getAllTemplates() {
            $.ajax({
                url: evaluationHost + 'api/template/infoByConfigType?configType='+configType,
                type:'get',
                async: false,
                success:function (res){
                    if(res.data.length==1){
                        templateId = res.data[0].id;
                        processKey = res.data[0].processKey;
                    }else if(res.data.length == 0){
                        layer.msg("当前业务未创建模板!");
                    }else{
                        $('.timetable_tool').removeClass('layui-hide');
                        var str = '';
                        $.each(res.data,function (index,item){
                            str +='<option value="'+ item.id +'">'+ item.templateCname +'</option>'
                        });
                        $('#template').append(str);
                        processKey = res.data[0].processKey;
                        templateId = res.data[0].id;
                        form.render('select');
                    }
                    switch (processKey) {
                        case 'newAnimal_process':
                            $('.accessSetting').removeClass('layui-hide');
                            $('.temporary_header').removeClass('layui-hide');
                            $('.feedingCharge').removeClass('layui-hide');
                            $('.feedingAudit').removeClass('layui-hide');
                            break;
                        case 'animal_process':
                            $('.accessSetting').removeClass('layui-hide');
                            $('.temporary_header').removeClass('layui-hide');
                            $('.feedingCharge').removeClass('layui-hide');
                            $('.feedingAudit').removeClass('layui-hide');
                            break;
                        case 'projectAudit_process':
                        case 'newProjectExecute_process':
                            $('.common_header').removeClass('layui-hide');
                            $('.tableReport').removeClass('layui-hide');
                            break;
                        default:
                            $('.common_header').removeClass('layui-hide');
                            break;
                    }

                    // console.log(res);
                },
                error:function () {
                    layer.msg("获取模板列表失敗！");
                }
            });
        }
        //获取子流程信息
        function getNextConfigInfo() {
            $.ajax({
                url: evaluationHost + 'api/template/infoByConfigType?configType='+nextConfig,
                type:'get',
                async: false,
                success:function (res){
                    if(res.data.length>0){
                        nextTemplateId = res.data[0].id;
                        nextTemplateStepCname = res.data[0].nextStepCname;
                        $('#clientId').val(res.data[0].sourceProject);
                        getNextConfigTemplateProcess(currauth[0]);
                        getNextConfigIndicator();
                    }else{
                        layer.msg("子流程未配置");
                    }
                },
                error:function () {
                    layer.msg("获取子流程模板列表失敗！");
                }
            });
            // const nextConfigTemplate = new Promise((resolve, reject) => {
            //
            // })
            // nextConfigTemplate.then(res => {
            //     if(res.data.length>0){
            //         nextTemplateId = res.data[0].id;
            //         nextTemplateStepCname = res.data[0].nextStepCname;
            //         $('#clientId').val(res.data[0].sourceProject);
            //         getNextConfigTemplateProcess(currauth[0]);
            //         getNextConfigIndicator();
            //     }else{
            //         layer.msg("子流程未配置");
            //     }
            // })

        }
        function getTemplateInfo() {
            $.ajax({
                url: evaluationHost + 'api/template/info?templateId='+templateId,
                type:'get',
                async: false,
                success:function (res){
                    nextStepCname = res.data.nextStepCname;
                    infoCname = res.data.infoCname;
                    $('.legend_select').html(res.data.templateCname);
                    $(document).attr("title",res.data.templateCname);
                },
                error:function () {
                    layer.msg("获取模板信息失敗！");
                }
            });
        }
        //获取表头
        function getTableHeader(stepShow) {
            var url = stepShow ? evaluationHost + 'api/configIndicator/displayIndicator?templateId='+templateId+'&stepShow='+stepShow : evaluationHost + 'api/configIndicator/displayIndicator?templateId='+templateId
            $.ajax({
                url: url,
                type:'get',
                async: false,
                success:function (res) {
                    // console.log(res);
                    var coll = [];
                    var col = [];
                    col.push(
                        {type:'checkbox'},
                        {title:'序号',width:50,type:"numbers"}
                    );
                    $.each(res.data,function (index,item){
                        col.push({
                            field: 'header'+item.id, title:item.indicatorCname,align:'center'
                        })
                    });
                    col.push(
                        {field: 'currentStep',title: '当前阶段', align: 'center'},
                        {title: '操作', align: 'center',minWidth: 210, toolbar: '#edit'}
                    );
                    coll.push(col);
                    cols = coll;
                },
                error:function (){
                    layer.msg("获取模板列表失敗！");
                }
            });
        }
        function tableRender(stepShow) {
            var data = {
                exactSearchDTOList: exactSearchDTO,
                templateId: templateId,
                timeFlag: 0,
                processStep: stepShow
            };
            var commonTable = table.render({
                elem: '#menu',
                id: 'commonList',
                // url: evaluationHost + 'api/timetable/info?templateId='+templateId+'&timeFlag=1', //数据接口
                url: evaluationHost + 'api/timetable/infoByExactSearch', //数据接口
                method:'POST',
                where: data,
                contentType: "application/json;charset=UTF-8",
                title: $('.legend_select').text(),
                // totalRow: true, //开启合计行
                // toolbar: true,
                // defaultToolbar: ['filter', 'exports', 'print', ],
                page: true, //开启分页
                page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                    layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
                    //curr: 5, //设定初始在第 5 页
                    groups: 1, //只显示 1 个连续页码
                    first: false, //不显示首页
                    last: true //显示尾页
                },
                parseData: function(res){ //res 即为原始返回的数据
                    var pdata = {
                        "code": 0, //解析接口状态
                        "msg": "", //解析提示文本
                        "count": res.total, //解析数据长度
                        "data": [] //解析数据列表
                    };
                    pdata.data = parmaData(res);
                    return pdata;
                },
                cols: cols,
                data: table,
                //skin: 'line' ,//表格风格
                even: true,
                page: true,
                limits: [5, 10, 15, 20],
                limit: 15, //每页默认显示的数量
                request:{
                    page:'page',
                    limit:'limit'
                },
                done:function(res,curr,count){ // 隐藏列
                    if(deleteFlag == 0){
                        $(".layui-table-box").find("[data-field=0]").css("display","none");
                    }
                    if(infoCname!=null&&infoCname!=''){
                        $('[lay-event="detail"]').html(infoCname);
                    }
                    if(nextStepCname!=null&&nextStepCname!=''){
                        $('[lay-event="nextstep"]').html(nextStepCname);
                    }
                    $('.layui-tab-item').height($('.layui-tab-item').children().height());
                }
            });
        }

        //监听行工具操作
        table.on("tool(menuList)",function (obj) {
            var data=obj.data;
            //获取继承字段
            let exField = '';
            if(extendsField!=''){
                $.each(extendsField.split(','),function (key, value) {
                    if(value)
                        exField += value+'@'+data[value.split('@')[0]]+','
                })
            }
            //子流程列表
            if(obj.event === 'nextList'){
                let url = 'commonList?configType='+nextConfig+'&extendsField='+exField;
                window.open(url,'_blank');
            }
            //填写子流程
            if(obj.event === 'new'){
                var index = layer.open({
                    type: 2 //此处以iframe举例
                    ,
                    title: '阶段流转',
                    area: ['390px', '260px'],
                    shade: 0,
                    maxmin: true,
                    content: 'stepCircle?clientId='+$('#clientId').val()+'&templateId='+nextTemplateId+'&step=1&firstStepName='+nextConfigFirstStepName+'&extendsField='+exField,
                    zIndex: layer.zIndex //重点1
                    ,
                    success: function(layero) {
                        layer.setTop(layero); //重点2
                    }
                });
                layer.full(index);
            }
            //阶段总览
            if(obj.event === 'detail'){
                var index = layer.open({
                    type: 2 //此处以iframe举例
                    ,
                    title: '阶段总览',
                    area: ['390px', '260px'],
                    shade: 0,
                    maxmin: true,
                    content: 'stepInfo?timetableId='+data.id+'&clientId='+$('#clientId').val()+'&templateId='+templateId+'&step='+data.step,
                    zIndex: layer.zIndex //重点1
                    ,
                    success: function(layero) {
                        layer.setTop(layero); //重点2
                    }
                });
                layer.full(index);
            }
        })

        function parmaData(res){
            // $("div[lay-id='exprortTable']").hide();
            // console.log(res);
            var data = []
            if(res.data.length>0){
                firstStepName = res.data[0].timetableProcessDTOS[0].processCname;
                data = [];
                $.each(res.data ,function (index,item){
                    let record = {};
                    record.id = item.id;
                    record.step = item.currentStep;
                    if(newAuth){
                        record.newFlag = 1
                    }else{
                        record.newFlag = 0;
                    }
                    record.deleteFlag = 0;
                    record.timeFlag = timeFlag;
                    //如果还在第一阶段则创建人和设置删除权限都可以删除
                    if(item.currentStep === 1){
                        if(item.timetableProcessDTOS[0].timetableResults.length>0 && item.timetableProcessDTOS[0].timetableResults[0].initiatorUsername==currusername){
                            record.deleteFlag = 1;
                            // deleteFlag = 1;
                            $('.deleteTimetable').removeClass('layui-hide');
                        }
                    }
                    if(item.currentStep>0){
                        if(item.timetableProcessDTOS[item.currentStep-1].authorityNamesDelete.length!=0){
                            $.each(item.timetableProcessDTOS[item.currentStep-1].authorityNamesDelete,function (ii,data) {
                                $.each(currauth,function (i,d) {
                                    if(data == d){
                                        record.deleteFlag = 1;
                                        // deleteFlag = 1;
                                        $('.deleteTimetable').removeClass('layui-hide');
                                    }
                                })
                            })
                        }else{
                            record.deleteFlag = 1;
                        }
                    }else{
                        record.deleteFlag = 1;
                    }
                    record.currentStep = '';
                    if(item.timetableProcessDTOS.length!=0){
                        if(item.timetableProcessDTOS[0].timetableResults.length!=0){
                            $.each(item.timetableProcessDTOS,function (i,d) {
                                let isTaskStep = false;//是否是并行阶段
                                if(d.processStep == item.currentStep){
                                    if(d.isChose == 1){
                                        record.currentStep += d.processCname+','
                                    }
                                }else if(item.currentStep == 0){
                                    record.currentStep = '已结束';
                                }
                            });
                            $.each(item.timetableProcessDTOS,function (j,o) {
                                $.each(o.configIndicators,function (i,d) {
                                    $.each(nextIndicator,function (key, value) {
                                        let extendsEname = ['projectName','initiatorUsers'];//需要集成到子流程的字段英文名称
                                        $.each(extendsEname,function (m,n) {
                                            if(value.indicatorEname === n && d.indicatorEname === n) {
                                                extendsField += extendsField.indexOf(n) === -1 ? `${d.indicatorEname}@${key + 1}@${value.id},` : '';
                                                record[n] = o.timetableResults[0]['evaluationScore' + (i + 1)];
                                                return false;
                                            }
                                        })
                                    })
                                    // if(d.isShow == 1 || d.isShow == 2){
                                    $.each(cols[0],function (i2,d2) {
                                        if(d2.field&&d2.field.replace(/[^0-9]/ig,"") === d.id.toString()){
                                            if(o.timetableResults.length>0){
                                                if(d.indicatorName == null){d.indicatorName = ''}
                                                if(!(o.timetableResults[0]['evaluationScore' + (i + 1)] == null)){
                                                    if(d.indicatorName == 'current'||d.indicatorName.indexOf('|currentLogin|')!=-1||d.contentType == 'select'){
                                                        record['header'+d.id] = o.timetableResults[0]['evaluationScore'+(i+1)].split('_')[o.timetableResults[0]['evaluationScore'+(i+1)].split('_').length-1]
                                                    }else if(d.contentType == 'localObject'&&d.indicatorName == 'select'){
                                                        if(o.timetableResults[0]['evaluationScore'+(i+1)]!=null){
                                                            record['header'+d.id] = o.timetableResults[0]['evaluationScore'+(i+1)].split('_')[o.timetableResults[0]['evaluationScore'+(i+1)].split('_').length-1]
                                                        }
                                                    }else if(d.contentType == 'multiSelect') {
                                                        let objs = o.timetableResults[0]['evaluationScore' + (i + 1)].split(',');
                                                        let str = '';
                                                        if (objs.length > 0) {
                                                            $.each(objs, function (i, d) {
                                                                str += d.split('_')[d.split('_').length - 1] + ',';
                                                            })
                                                            str = str.slice(0, str.length - 1);
                                                        }
                                                        record['header' + d.id] = str;
                                                    }else if(d.contentType == 'radio') {
                                                        let options = d.indicatorOptions.indexOf(',')!=-1?d.indicatorOptions.split(','):d.indicatorOptions.split('，');
                                                        record['header' + d.id] = options[Number(o.timetableResults[0]['evaluationScore'+(i+1)])-1];
                                                    }else if(d.contentType == 'checkbox') {
                                                        let objs = o.timetableResults[0]['evaluationScore' + (i + 1)].split(',');
                                                        let str = '';
                                                        if (objs.length > 0) {
                                                            $.each(objs, function (i, d) {
                                                                str += d.split('_')[d.split('_').length - 1] + ',';
                                                            })
                                                            str = str.slice(0, str.length - 1);
                                                        }
                                                        record['header' + d.id] = str;
                                                    }else{
                                                        record['header'+d.id] = o.timetableResults[0]['evaluationScore'+(i+1)]
                                                    }
                                                }
                                            }else{
                                                if(record['header'+d.id] == ''||record['header'+d.id] == null){
                                                    record['header'+d.id] = '';
                                                }

                                            }
                                        }
                                    })

                                    // }
                                });
                            })

                            data.push(record);
                        }
                    }
                });
                // console.log(pdata);
            }
            return data;
        }
        active={

        }
        $('.breadcrumb_select').on('click', function(){
            var othis = $(this), type = othis.data('type');
            active[type] ? active[type].call(this, othis) : '';
        });
        //切换权限
        changeAuth={
            changeAuth:function () {
                var str = '';
                str+='<div class="layui-form">';
                $.each(authorities,function (index,item) {
                    if(currentauth == item.name){
                        str+=' <input type="radio" name="auth" value="'+ item.name +'" title="'+ item.cname +'" checked="">'
                    }else{
                        str+=' <input type="radio" name="auth" value="'+ item.name +'" title="'+ item.cname +'">'
                    }

                });
                str+='</div>'
                layer.confirm(str,{
                    btn: ['确定'],
                    title : '请选择权限',
                    closeBtn :0,//不显示关闭按钮
                    success: function(){
                        form.render();
                    },
                    btn1: function (index) {
                        $.cookie("currauth",$("input[name='auth']:checked").val());
                        window.location.reload()
                        // currauth = [];
                        // currauth.push($("input[name='auth']:checked").val());
                        // // currauth = $("input[name='auth']:checked").val();
                        // getInfoByAuthorityName(currauth[0]);
                        // getTemplateProcess();
                        // getTableHeader();
                        // tableRender();
                        // layer.close(index);
                    }
                });
            }
        }
        $('.breadcrumb_select').on('click', function(){
            var othis = $(this), type = othis.data('type');
            changeAuth[type] ? changeAuth[type].call(this, othis) : '';
        });
        //批量删除
        deleteTimetable={
            deleteTimetable:function () {
                var checkStatus = table.checkStatus('commonList');
                var data = checkStatus.data;
                var timetableIds = '';
                $.each(data,function (index,item) {
                    timetableIds+=item.id+',';
                });
                timetableIds=timetableIds.substring(0,timetableIds.length-1);
                $.ajax({
                    url:  evaluationHost + 'api/timetable/deleteAll?timetableIds='+timetableIds,
                    // data: jsonData,
                    async: false,
                    type: "POST",
                    // contentType: "application/json;charset=UTF-8",
                    success:function (res){
                        // console.log(res);
                        if(res.code == 200){
                            location.reload();
                        }else{
                            alert("删除失败！");
                        }

                    },
                    error: function () {
                        alert("后台出了点问题，请重试！");
                        return false;
                    }
                });
            }
        }
        $('.breadcrumb_select').on('click', function(){
            var othis = $(this), type = othis.data('type');
            deleteTimetable[type] ? deleteTimetable[type].call(this, othis) : '';
        })
        //查看报表
        tableReport={
            tableReport:function () {
                window.open('tableReport?configType='+ configType,'_blank');
            }
        }
        $('.breadcrumb_select').on('click', function(){
            var othis = $(this), type = othis.data('type');
            tableReport[type] ? tableReport[type].call(this, othis) : '';
        })
        //搜索
        // var $ = layui.$,
            reload = {
                reload: function() {
                    var search_box = $('#search_box');
                    var data1 = {
                        exactSearchDTOList: exactSearchDTO,
                        templateId: templateId,
                        timeFlag: timeFlag,
                        search: search_box.val()
                    };
                    //执行重载
                    table.reload('commonList', {
                        page: {
                            curr: 1 //重新从第 1 页开始
                        },
                        where: data1
                    }, 'data');
                }
            };

        $('.tabsearch .layui-btn').on('click', function() {
            var type = $(this).data('type');
            reload[type] ? reload[type].call(this) : '';
        });
    })
    e("phenomMenuList",{})
})