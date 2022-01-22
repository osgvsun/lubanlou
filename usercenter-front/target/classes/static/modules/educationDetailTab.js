var show_personConfig_uid=GetQueryString("showConfigUid");
var beOperatedUsername=GetQueryString('changeRole');
var currentRole=JSON.parse(localStorage['role']).roleList[0].id;
var userId = JSON.parse(localStorage['role']).id;
var tableField=[{title:'序号', width:100, type:"numbers"}] ;
$.ajax({
    url: userCenterHost + '/usercenter/getMenuTree',
    async: false,
    type: "GET",
    data:{
        roleId:currentRole,
        beOperatedUsername:beShowUsername,
        menuId:show_personConfig_uid,
        beOperatedRoleName:beOperatedUsername,
        target:1
    },
    contentType: "json;charset=UTF-8",
    success: function (show_data) {
        var show_config_data=show_data.nextLevelConfigSet;
        for(var i=0;i<show_config_data.length;i++){
                if(show_config_data[i].config.adminSetting==1||show_config_data[i].config.selfSetting==1){
                    if(show_config_data[i].config.field=='overseasDegree'||show_config_data[i].config.field=='overseasExperience'){
                        tableField.push({
                            field: show_config_data[i].config.field,
                            title: show_config_data[i].config.name,
                            align: 'center',
                            width: '120',
                            templet:function(d){
                                var data='';
                                if(d.overseasDegree=='0'||d.overseasExperience=='0'){
                                    data='否';
                                }
                                if(d.overseasDegree=='1'||d.overseasExperience=='1'){
                                    data='是';
                                }
                                return data;
                            }
                        });
                    }
                    if(show_config_data[i].config.field=='workEndTime'){
                        tableField.push({
                            field: show_config_data[i].config.field,
                            title: show_config_data[i].config.name,
                            align: 'center',
                            width: '120',
                            templet:function(d){
                                var data='';
                                if(d.workEndTime==null){
                                    data='至今';
                                }
                                else {
                                    data=d.workEndTime
                                }
                                return data;
                            }
                        });
                    }
                    else {
                        tableField.push({field: show_config_data[i].config.field, title:show_config_data[i].config.name, align:'center',width:'120'});
                    }
                    $("."+show_config_data[i].config.field).parent().parent().show();
                    var editField=document.getElementsByName(show_config_data[i].config.field);
                    for(var r=0;r<editField.length;r++)
                    {
                        if(show_config_data[i].config.edit == 3){
                            editField[r].disabled=true
                        }
                    }
                }
                else{
                    $("."+show_config_data[i].config.field).removeAttr("lay-verify");
                }
        }
            tableField.push({fixed: 'right', title: '操作',align: 'center', toolbar: '#edit1',width:200});
    }
});
layui.define(function (e) {
    layui.use(['index','form', 'laydate','table'], function() {
        var $ = layui.$,
            admin = layui.admin,
            element = layui.element,
            layer = layui.layer,
            laydate = layui.laydate,
            form = layui.form;
        table = layui.table;
        //教育背景表格渲染
        table.render({
            elem: '#edubgInfo'
            ,url: userCenterHost+'/usercenter/getUserEdubgInfo'
            ,method:'post'
            ,where:{
                userId:  userId
            }
            ,cols: [tableField]
            //,skin: 'line' //表格风格
            ,even: true
            ,page: false //是否显示分页
            //,limits: [5, 7, 10]
            //,limit: 5 //每页默认显示的数量
        });
        //工作履历表格渲染
        table.render({
            elem: '#workHistoryInfo'
            ,url: userCenterHost+'/usercenter/getUserWorkHistoryInfo'
            ,method:'post'
            ,where:{
                userId: userId
            }
            ,cols: [tableField]
            //,skin: 'line' //表格风格
            ,even: true
            ,page: false //是否显示分页
            //,limits: [5, 7, 10]
            //,limit: 5 //每页默认显示的数量
        });
        //培训经历表格渲染
        table.render({
            elem: '#trainExperienceInfo'
            ,url: userCenterHost+'/usercenter/getUserTrainInfo'
            ,method:'post'
            ,where:{
                username:beShowUsername
            }
            ,cols: [tableField]
            //,skin: 'line' //表格风格
            ,even: true
            ,page: false //是否显示分页
            //,limits: [5, 7, 10]
            //,limit: 5 //每页默认显示的数量
        });

        //教育背景起止时间
        laydate.render({
            elem: '#eduStartStopTime_add',
            type: 'month',
            range: true
        });
        laydate.render({
            elem: '#eduStartStopTime',
            type: 'month',
            range: true
        });

        //工作履历起止时间
        // laydate.render({
        //     elem: '.workStartStopTime_add',
        //     type: 'month',
        //     // range: true
        // });
        laydate.render({
            elem: '#workStartTime_add',
            type: 'month',
            // range: true
        });
        laydate.render({
            elem: '#workStopTime_add',
            type: 'month'
        });
        laydate.render({
            elem: '#workStartTime',
            type: 'month',
            // range: true
        });
        laydate.render({
            elem: '#workEndTime',
            type: 'month'
        });

        //访学、进修及培训经历起止时间
        laydate.render({
            elem: '#trainStartStopTime_add',
            type: 'month',
            range: true,
        });
        laydate.render({
            elem: '#trainStartStopTime',
            type: 'month',
            range: true,
        });
        /* 监听提交 */
        form.on('submit(edubgInfo)', function (data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                , btn: ['确定', '取消'] //按钮
                , yes: function () {
                    $("#edubgInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    layer.closeAll();
                    var field=data.field;
                    field['username']=beShowUsername;
                    // if(!field.hasOwnProperty("overseasDegree")){
                    //     alert("是否海外获得学位！")
                    // }
                    // else {
                        admin.req({
                            url: userCenterHost + '/usercenter/saveUserEdubgInfo',
                            data:field,
                            dataType: 'text',
                            method: 'POST'
                            , success: function (res) {
                                if (!res.code) {
                                    parent.layer.alert("提交成功！");
                                    $(".clearForm").trigger("click");
                                    $("#edubgInfoAdd").hide();
                                    table.reload('edubgInfo');
                                    $(".buttonAdd").show();
                                }
                                else{
                                    console.log(res.msg);
                                    parent.layer.alert("提交失败");
                                }
                            }
                        })
                    // }
                }
            })
            return false;
        });
        form.on('submit(workHistoryInfo)', function (data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                , btn: ['确定', '取消'] //按钮
                , yes: function () {
                    $(".clearForm").trigger("click");
                    $("#workHistoryInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    $("#workHistoryInfoAdd").hide();
                    layer.closeAll();
                    var field=data.field;
                    field['username']=beShowUsername;
                    // var workStartStopTime=field.workStartTime+' - '+field.workEndTime;
                    // field['workStartStopTime']=workStartStopTime;
                    admin.req({
                        url: userCenterHost + '/usercenter/saveUserWorkHistoryInfo',
                        data:field,
                        // dataType: 'text',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("提交成功！");
                                table.reload('workHistoryInfo');
                                $(".buttonAdd").show();
                            }
                            else{
                                console.log(res.msg);
                                parent.layer.alert("提交失败");
                            }
                        }
                    })
                }
            })
            return false;
        });
        form.on('submit(trainExperienceInfo)', function (data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                , btn: ['确定', '取消'] //按钮
                , yes: function () {
                    $("#trainExperienceInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    layer.closeAll();
                    var field=data.field;
                    field['username']=beShowUsername;
                    if(!field.hasOwnProperty("overseasExperience")){
                       alert("请选择是否海外培训经历！")
                    }
                    else {
                        admin.req({
                            url: userCenterHost + '/usercenter/saveUserTrainInfo',
                            data:field,
                            dataType: 'text',
                            method: 'POST'
                            , success: function (res) {
                                if (!res.code) {
                                    parent.layer.alert("提交成功！");
                                    $(".clearForm").trigger("click");
                                    $("#trainExperienceInfoAdd").hide();
                                    table.reload('trainExperienceInfo');
                                    $(".buttonAdd").show();
                                }
                                else{
                                    console.log(res.msg);
                                    parent.layer.alert("提交失败")
                                }
                            }
                        })
                    }

                }
            })
            return false;
        });

//监听教育背景编辑
        table.on('tool(edubgInfo)', function (obj) {
            var data = obj.data;
            if (obj.event === 'detail') {
                layer.msg('ID：' + data.id + ' 的查看操作');
            }
            else if (obj.event === 'del') {
                layer.confirm('真的删除行么', function (index) {
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/usercenter/deleteUserEdubgInfo',
                        data: data,
                        dataType: 'text',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("删除成功!")
                                table.reload('postInfo');
                            }
                            else{
                                console.log(res.msg);
                                parent.layer.alert("删除失败！")
                            }
                        }
                    });
                    layer.close(index);
                });
            }
            else if (obj.event === 'edit') {
                /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
                var edit_div = '#edubgInfo_uid';
                editStandard(data, edit_div);
                for (var i = 0; i < Object.entries(data).length; i++) {
                    if(Object.entries(data)[i][0]=='overseasDegree'){
                        $("input[name='overseasDegree'][value='"+Object.entries(data)[i][1]+"']").attr("checked",true);
                    }
                }
                var eduStartStopTime=$("#enrollmentTime").val()+' - '+$("#graduationTime").val();
                $("#eduStartStopTime").val(eduStartStopTime);
                form.render();
                layer.open({
                    type: 1
                    , title: '编辑'
                    , area: ['60%', '50%']
                    , id: 'layerDemo1' //防止重复弹出
                    , content: $('#edit_edubgInfo')
                    , btnAlign: 'c' //按钮居中
                    , shade: 0 //不显示遮罩
                    , yes: function () {
                        layer.closeAll();
                    }
                });
            }
        });
        //监听工作履历编辑
        table.on('tool(workHistoryInfo)', function (obj) {
            var data = obj.data;
            if (obj.event === 'detail') {
                layer.msg('ID：' + data.id + ' 的查看操作');
            }
            else if (obj.event === 'del') {
                layer.confirm('真的删除行么', function (index) {
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/usercenter/deleteUserWorkHistoryInfo',
                        data: data,
                        dataType: 'text',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("删除成功!")
                                table.reload('postInfo');
                            }
                            else{
                                console.log(res.msg);
                                parent.layer.alert("删除失败！")

                            }
                        }
                    })
                    layer.close(index);
                });
            }
            else if (obj.event === 'edit') {
                /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
                var edit_div = '#workHistoryInfo_uid';
                editStandard(data, edit_div);
                // var workStartStopTime=$("#workStartTime").val()+' - '+$("#workEndTime").val();
                // $("#workStartStopTime").val(workStartStopTime);
                form.render();
                layer.open({
                    type: 1
                    , title: '编辑'
                    , area: ['60%', '50%']
                    , id: 'layerDemo2' //防止重复弹出
                    , content: $('#edit_workHistoryInfo')
                    , btnAlign: 'c' //按钮居中
                    , shade: 0 //不显示遮罩
                    , yes: function () {
                        layer.closeAll();
                    }
                });
            }
        });
        //监听培训经历编辑
        table.on('tool(trainExperienceInfo)', function (obj) {
            var data = obj.data;
            if (obj.event === 'detail') {
                layer.msg('ID：' + data.id + ' 的查看操作');
            }
            else if (obj.event === 'del') {
                layer.confirm('真的删除行么', function (index) {
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/usercenter/deleteUserTrainInfo',
                        data: data,
                        dataType: 'text',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("删除成功!")
                                table.reload('postInfo');
                            }
                            else{
                                console.log(res.msg);
                                parent.layer.alert("删除失败！")
                            }
                        }
                    })
                    layer.close(index);
                });
            }
            else if (obj.event === 'edit') {
                /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
                var edit_div = '#trainExperienceInfo_uid';
                editStandard(data, edit_div);
                for (var i = 0; i < Object.entries(data).length; i++) {
                    if(Object.entries(data)[i][0]=='overseasExperience'){
                        $("input[name='overseasExperience'][value='"+Object.entries(data)[i][1]+"']").attr("checked",true);
                    }
                }
                var trainStartStopTime=$("#trainStartTime").val()+' - '+$("#trainEndTime ").val();
                $("#trainStartStopTime").val(trainStartStopTime);
                form.render();
                layer.open({
                    type: 1
                    , title: '编辑'
                    , area: ['60%', '50%']
                    , id: 'layerDemo3' //防止重复弹出
                    , content: $('#edit_trainExperienceInfo')
                    , btnAlign: 'c' //按钮居中
                    , shade: 0 //不显示遮罩
                    , yes: function () {
                        layer.closeAll();
                    }
                });
            }
        });

        /*
        * 下拉框数据读取显示
        * */

        //学位
        $.ajax({
            url: userCenterHost + '/usercenter/dropDownBoxController/getDegree',
            type: 'GET',
            success: function (res) {
                if(!res.code){
                    var data=res.data;
                    for (var i = 0; i < data.length; i++) {
                        var option = '<option value="' + data[i].degree + '">' + data[i].degree + '</option>';
                        $(".degree").append(option);
                        form.render();
                    }
                }
                else{
                    console.log(res.msg);
                }

            }

        })
    });
    e('educationDetailTab',{});
});


$(".header_edit").click(
    function () {
        $(".buttonAdd").hide();
        $(this).parents().find(".fill_box").slideDown();
    }
);

$(".edit_hide").click(
    function () {
        $(".buttonAdd").show();
        $(this).parents().parents().parents().parents(".fill_box").hide();
    }
);
var user=$("input[name='username']") ;
user.each(function(){
    $(this).val(currentUsername);
});

