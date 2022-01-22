const evaluationHost =apiGateWayHost+"/configcenter/";
var taskList = [];//并行阶段集合
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
        cols = [],//根据模板获取列表表头
        firstStepName,//当前模板第一阶段名称
        exactSearchDTO  = [],//记录列表筛选项
        currentauth = $.cookie('currauth'),
        currentauthName =  $.cookie("currentauthName"),
        deleteFlag = 0 ,//0不可以删除 1可以删除
        infoCname,//总览按钮文本
        nextStepCname,//下一阶段按钮文本
        allProcess,//所有阶段信息
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
    getTemplateInfo();
    getCurrentUser();
    // exportFileRender();
    //根据flag获取列表0:已结束1:进行中2:未开始
    var exportFlag = 0;
    window.commonListRouteByTimeFlag = function (flag,obj) {
        var step1st = null;
        if(flag!=1){
            // $('.all_step').html('<li class="layui-this">所有阶段</li>')
            $('.customtab_one').append($("#common_table"));
            $('.all_step').parent().hide();
            getTableHeader(step1st);
        }else{
            var str = '';
            $.each(allProcess,function (index,object) {
                if(object.showLabel){
                    str+='<li data="'+ object.processStep +'">'+ object.processCname +'</li>';
                }
            })
            $(".layui-tab-card").append($("#common_table"));
            $('.all_step').html(str)
            $('.all_step').parent().show()
            $('.all_step').children('li').eq(0).addClass('layui-this');
            step1st = $('.all_step').children('li').eq(0).attr('data') === 'null'? null : $('.all_step').children('li').eq(0).attr('data');
            getTableHeader(step1st);
            // tableRender(step1st);
        }
        // if(flag!=0){
        //     $('.export_file').remove();
        //     exportFlag = 0;
        // }else if(flag == 0&&exportFlag == 0){
        //     $('.tabsearch').append('<button class="layui-btn export_file" type="button" onclick="exportFile()">' +
        //         '                            <i class="layui-icon layui-icon-export"></i>导出' +
        //         '                        </button>');
        //     exportFlag++
        // }
        $('.time_tab').find('.layui-this').removeClass('layui-this');
        $(obj).parent().addClass('layui-this');
        timeFlag = flag;
        var data = {
            exactSearchDTOList: exactSearchDTO,
            templateId: templateId,
            timeFlag: timeFlag,
            processStep: step1st
        };
        table.reload('commonList', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where:data
            // url: evaluationHost + 'api/timetable/info?templateId='+templateId+'&timeFlag='+flag
        });
    };
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
                    success: function (r) {
                        // console.log(r);
                        curruserdetail = r;
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
    //根据权限获取筛选项
    function getInfoByAuthorityName(currauth) {
        $.cookie("currauth",currauth);
        //是否有继承字段需要筛选
        if(extendsField){
            let fields = extendsField.split(',');
            $.each(fields,function (key, value) {
                if(value){
                    exactSearchDTO.push({
                        configIndicatorId: value.split('@')[2],
                        searchValue: value.split('@')[3]
                    })
                }
            })
        }
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
    // form.on('select(allTemplates)', function(data){
    //     // console.log(data.elem); //得到select原始DOM对象
    //     // console.log(data.value); //得到被选中的值
    //     // console.log(data.othis); //得到美化后的DOM对象
    //     templateId = data.value;
    //     getTemplateInfo();
    //     getTableHeader();
    //     //执行重载
    //     table.reload('commonList', {
    //         url: evaluationHost + 'api/timetable/info?templateId='+templateId+'&timeFlag=1', //数据接口
    //         cols: cols,
    //     }, 'data');
    // });
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
                $('#clientId').val(res.data.sourceProject);
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
            timeFlag: 1,
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
        //删除
        if(obj.event === 'del'){
            layer.confirm('您确定删除吗?如果删除后数据将无法复原!', function(index){
                // obj.del(); //删除对应行（tr）的DOM结构
                $.ajax({
                    url:  evaluationHost + 'api/timetable/deleteAll?timetableIds='+data.id,
                    // data: jsonData,
                    async: false,
                    type: "POST",
                    // contentType: "application/json;charset=UTF-8",
                    success:function (res){
                        // console.log(res);
                        location.reload();
                    },
                    error: function () {
                        alert("后台出了点问题，请重试！");
                        return false;
                    }
                });
                layer.close(index);
                //向服务端发送删除指令
            });
        }
        //下一阶段
        if(obj.event === 'nextstep'){
            // var that = this;
            // let str = '<ul>\n' +
            //     '        <li><a href="#home">Home</a>\n' +
            //     '        </li>\n' +
            //     '        <li><a href="#about">About</a>\n' +
            //     '        </li>\n' +
            //     '        <li><a href="#contact">Contact</a>\n' +
            //     '        </li>\n' +
            //     '    </ul>'
            // var index = layer.tips(str, that, {
            //     // time: -1,
            //     // shade: 0,
            //     // shadeClose: true,
            //     skin: 'layer-demo-class'
            // }); //在元素的事件回调体中，follow直接赋予this即可
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '阶段流转',
                area: ['390px', '260px'],
                shade: 0,
                maxmin: true,
                content: 'stepCircle?timetableId='+data.id+'&clientId='+$('#clientId').val()+'&templateId='+templateId+'&step='+data.step,
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
    }),

        element.on('tab(step_change)', function (obj) {
            // console.log(obj);
            var pstep = $(this).attr('data') === 'null' ? null : $(this).attr('data');
            getTableHeader(pstep);
            var data = {
                exactSearchDTOList: exactSearchDTO,
                templateId: templateId,
                timeFlag: timeFlag,
                processStep: pstep
            };
            table.render({
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
        });
    function parmaData(res){
        // $("div[lay-id='exprortTable']").hide();
        // console.log(res);
        var data = []
        if(res.data.length>0){
            firstStepName = res.data[0].timetableProcessDTOS[0].processCname;
            data = [];
            $.each(res.data ,function (index,item){
                var record = {};
                record.id = item.id;
                record.step = item.currentStep;
                record.nextFlag = 0;
                record.deleteFlag = 0;
                record.timeFlag = timeFlag;
                //如果还在第一阶段则创建人和设置删除权限都可以删除
                if(item.currentStep == 1){
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
                if(timeFlag === 0)
                    record.deleteFlag = 0;
                record.currentStep = '';
                if(item.timetableProcessDTOS.length!=0){
                    if(item.timetableProcessDTOS[0].timetableResults.length!=0){
                        $.each(item.timetableProcessDTOS,function (i,d) {
                            let isTaskStep = false;//是否是并行阶段
                            if(d.processStep == item.currentStep){
                                if(d.isChose == 1){
                                    record.currentStep += d.processCname+','
                                }
                                // if(!isTaskStep) //不是并行阶段
                                //     record.currentStep = d.processCname;
                                if(d.authorityNamesEdit!=null){
                                    if(d.authorityNamesEdit.length==0){
                                        record.nextFlag = 1;
                                    }else{
                                        $.each(d.authorityNamesEdit,function (k,v) {
                                            $.each(currauth,function (dex,val) {
                                                if(v == val){
                                                    record.nextFlag = 1;
                                                }
                                            })
                                        })
                                    }

                                }
                            }else if(item.currentStep == 0){
                                record.currentStep = '已结束';
                            }
                        });
                        $.each(item.timetableProcessDTOS,function (j,o) {
                            $.each(o.configIndicators,function (i,d) {
                                // if(d.isShow == 1 || d.isShow == 2){
                                $.each(cols[0],function (i2,d2) {
                                    if(d2.field&&d2.field.replace(/[^0-9]/ig,"") === d.id.toString()){
                                        if(o.timetableResults.length>0){
                                            if(d.indicatorName == null){d.indicatorName = ''};
                                            if(o.timetableResults[0]['evaluationScore'+(i+1)]!=null){
                                                if(d.indicatorName == 'current'||d.indicatorName.indexOf('|currentLogin|')!=-1||d.contentType == 'select'){
                                                    record['header'+d.id] = o.timetableResults[0]['evaluationScore'+(i+1)].split('_')[o.timetableResults[0]['evaluationScore'+(i+1)].split('_').length-1]
                                                }else if(d.contentType == 'localObject'&&d.indicatorName == 'select'){
                                                    if(o.timetableResults[0]['evaluationScore'+(i+1)]!=null){
                                                        record['header'+d.id] = o.timetableResults[0]['evaluationScore'+(i+1)].split('_')[o.timetableResults[0]['evaluationScore'+(i+1)].split('_').length-1]
                                                    }
                                                }else if(d.contentType == 'multiSelect') {
                                                    var objs = o.timetableResults[0]['evaluationScore' + (i + 1)].split(',');
                                                    var str = '';
                                                    if (objs.length > 0) {
                                                        $.each(objs, function (i, d) {
                                                            str += d.split('_')[d.split('_').length - 1] + ',';
                                                        })
                                                        str = str.slice(0, str.length - 1);
                                                    }
                                                    record['header' + d.id] = str;
                                                }else if(d.contentType == 'radio') {
                                                    var options = d.indicatorOptions.indexOf(',')!=-1?d.indicatorOptions.split(','):d.indicatorOptions.split('，');
                                                    record['header' + d.id] = options[Number(o.timetableResults[0]['evaluationScore'+(i+1)])-1];
                                                }else if(d.contentType == 'checkbox') {
                                                    var objs = o.timetableResults[0]['evaluationScore' + (i + 1)].split(',');
                                                    var str = '';
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
    let active={
        addTimetable:function () {
            // 多窗口模式，层叠置顶
            // alert(evaluationHost);
            if(processKey == 'newAnimal_process'){
                //如果是动物管理流程 新建之前需要判断该学生是否通过培训考试
                // if(apiGateWayHost.indexOf('api')!=-1){
                //     var url=apiGateWayHost.replace('api','gvsunExam/views/isPassApi');
                // }else{
                var url = currHost+'/gvsunExam/views/isPassApi';
                // }
                $.post(url,{username: currusername},function(result){
                    if(result){
                        var index = layer.open({
                            type: 2 //此处以iframe举例
                            ,
                            title: '新建',
                            area: ['390px', '260px'],
                            shade: 0,
                            maxmin: true,
                            // content: 'newTimetable?flag=0&templateId='+templateId+'&clientId='+$('#clientId').val(),
                            content: 'stepCircle?clientId='+$('#clientId').val()+'&templateId='+templateId+'&step=1&firstStepName='+firstStepName,
                            zIndex: layer.zIndex //重点1
                            ,
                            success: function(layero) {
                                layer.setTop(layero); //重点2
                            }
                        });
                        layer.full(index);
                    }else{
                        layer.alert('请先通过考试和培训后，才可进行申购！')
                    }
                });
            }else{
                var index = layer.open({
                    type: 2 //此处以iframe举例
                    ,
                    title: '新建',
                    area: ['390px', '260px'],
                    shade: 0,
                    maxmin: true,
                    // content: 'newTimetable?flag=0&templateId='+templateId+'&clientId='+$('#clientId').val(),
                    content: 'stepCircle?clientId='+$('#clientId').val()+'&templateId='+templateId+'&step=1&firstStepName='+firstStepName,
                    zIndex: layer.zIndex //重点1
                    ,
                    success: function(layero) {
                        layer.setTop(layero); //重点2
                    }
                });
                layer.full(index);
            }

        }
    }
    $('.breadcrumb_select').on('click', function(){
        var othis = $(this), type = othis.data('type');
        active[type] ? active[type].call(this, othis) : '';
    });
    //切换权限
    let changeAuth={
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
    function exportFileRender(){
        var data = {
            exactSearchDTOList: exactSearchDTO,
            templateId: templateId,
            timeFlag: timeFlag
        };
        table.render({
            elem: '#exprortTable',
            id: 'exprortTable',
            // url: evaluationHost + 'api/timetable/info?templateId='+templateId+'&timeFlag=1', //数据接口
            url: evaluationHost + 'api/timetable/infoByExactSearch', //数据接口
            method:'POST',
            where: data,
            contentType: "application/json;charset=UTF-8",
            title: $('.layui-card-header').text(),
            // toolbar: true,
            // defaultToolbar: ['filter', 'exports', 'print', ],
            page: true, //开启分页
            page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
                //curr: 5, //设定初始在第 5 页
                groups: 1, //只显示 1 个连续页码
                first: false, //不显示首页
                last: false //不显示尾页
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
            limit: 999999, //每页默认显示的数量
            request:{
                page:'page',
                limit:'limit'
            },
            done: function (res) {
                // if(timeFlag == 0&&exportFlag==0){
                //     $('.tabsearch').append('<button class="layui-btn export_file" type="button" onclick="exportFile()">' +
                //         '                            <i class="layui-icon layui-icon-export"></i>导出' +
                //         '                        </button>');
                //     exportFlag++
                // }
                table.exportFile('exprortTable',res.data,'xls'); //导出数据
            }
        });
    }
    window.exportFile = function () {
        layer.msg('导出中······请稍等片刻')
        // var data = layui.table.cache["exprortTable"];
        exportFileRender();
        // var data1 = {
        //     exactSearchDTOList: exactSearchDTO,
        //     templateId: templateId,
        //     timeFlag: timeFlag,
        // };
        // //执行重载
        // table.reload('exprortTable', {
        //     page: {
        //         curr: 1 //重新从第 1 页开始
        //     },
        //     where: data1,
        //     done: function (res) {
        //         table.exportFile('exprortTable'); //导出数据
        //     }
        // }, 'data');

    }
})