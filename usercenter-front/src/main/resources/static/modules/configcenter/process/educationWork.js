var ccrole;
var ccroleCname;
var cctree;
layui.define(function (e) {

    layui.use(['index', 'form', 'laydate', 'table'], function () {
        var $ = layui.$,
            admin = layui.admin,
            element = layui.element,
            layer = layui.layer,
            laydate = layui.laydate,
            form = layui.form;
        table = layui.table;
        $(document).ready(function () {
            var curruser = localStorage.getItem("role");
            var userId = JSON.parse(localStorage['role']).id;
            curruser = JSON.parse(curruser);
            if(curruser.username != username){$('.header_edit').hide()}
            $.ajax({
                url: userCenterHost + '/usercenter/getTeacherBasicInfo',
                async: false,
                type: "GET",
                data: {
                    username: username
                },
                contentType:"application/json",
                success: function (res) {
                    if(!res.code){
                        var data=res.data;
                        ccrole = JSON.stringify(data);
                        if(data.roleList.length){
                            role_name=data.roleList[0].roleName;
                            ccroleCname = data.roleList[0].roleCname;
                        }
                        else{
                            alert("接口返回用户权限出错！")
                        }

                    }
                    else{
                        alert(res.msg);
                    }

                }
            });
            var currentRoleUid=JSON.parse(ccrole).roleList[0].id;
            $.ajax({
                url: userCenterHost + '/usercenter/getMenuTree',
                async: false,
                type: "GET",
                data:{
                    username:username,
                    roleId:currentRoleUid,
                    target:1
                },
                contentType: "json;charset=UTF-8",
                success: function (data) {
                    console.log(data);
                    cctree = JSON.stringify(data);
                }
            });
            var dataObject = JSON.parse(cctree).nextLevelConfigSet;
            var role = JSON.parse(ccrole).roleList[0].roleName;
            for (var i = 0; i < dataObject.length; i++) {
                if (dataObject[i].config.name === "教育背景及工作经历" && dataObject[i].config.admin != 1) {
                    if (role == 'ROLE_TEACHER' || role == 'ROLE_STUDENT') {
                        if (dataObject[i].config.adminSetting == 1 || dataObject[i].config.selfSetting == 1) {
                            var personTree = dataObject[i].nextLevelConfigSet;
                            for (var j = 0; j < personTree.length; j++) {
                                if (personTree[j].config.adminSetting == 1 || personTree[j].config.selfSetting == 1) {
                                    $('#' + personTree[j].config.tableName).css("display", "block");
                                    var level3 = personTree[j].nextLevelConfigSet;
                                    var tableField = [{
                                        title: '序号',
                                        width: 100,
                                       type:"numbers"
                                    }];
                                    for (var k = 0; k < level3.length; k++) {
                                        if (level3[k].config.adminSetting == 1 || level3[k].config.selfSetting == 1) {
                                            if(level3[k].config.field=='overseasDegree'||level3[k].config.field=='overseasExperience'){
                                                tableField.push({
                                                    field: level3[k].config.field,
                                                    title: level3[k].config.name,
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
                                            else if(level3[k].config.field=='workEndTime'){
                                                tableField.push({
                                                    field: level3[k].config.field,
                                                    title: level3[k].config.name,
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
                                            else{
                                                tableField.push({
                                                    field: level3[k].config.field,
                                                    title: level3[k].config.name,
                                                    align: 'center',
                                                    width: '120'
                                                });
                                            }
                                            $("."+level3[k].config.field).parent().parent().show();
                                            var editField=document.getElementsByName(level3[k].config.field);
                                            for(var r=0;r<editField.length;r++)
                                            {
                                                if(level3[k].config.edit == 0||level3[k].config.edit == 1){
                                                    editField[r].disabled=true
                                                }
                                            }
                                        }
                                        else{
                                            $("."+level3[k].config.field).removeAttr("lay-verify");
                                        }
                                    }
                                    var table1 = personTree[j].config.tableName;
                                    if (table1 === 'user_edubg_info') {
                                        tableField.push({
                                            fixed: 'right',
                                            title: '操作',
                                            align: 'center',
                                            toolbar: '#edit1',
                                            width: 200
                                        });
                                        table.render({
                                            elem: '#edubgInfo'
                                            , url: userCenterHost + '/usercenter/getUserEdubgInfo'
                                            , method: 'post'
                                            , where: {
                                                userId: userId
                                            }
                                            , cols: [tableField]
                                            //,skin: 'line' //表格风格
                                            , even: true
                                            , page: false //是否显示分页
                                            //,limits: [5, 7, 10]
                                            //,limit: 5 //每页默认显示的数量
                                        });
                                    }
                                    if (table1 === 'user_work_history_info') {
                                        tableField.push({
                                            fixed: 'right',
                                            title: '操作',
                                            align: 'center',
                                            toolbar: '#edit2',
                                            width: 200
                                        });
                                        table.render({
                                            elem: '#workHistoryInfo'
                                            , url: userCenterHost + '/usercenter/getUserWorkHistoryInfo'
                                            , method: 'post'
                                            , where: {
                                                userId: userId
                                            }
                                            , cols: [tableField]
                                            //,skin: 'line' //表格风格
                                            , even: true
                                            , page: false //是否显示分页
                                            //,limits: [5, 7, 10]
                                            //,limit: 5 //每页默认显示的数量
                                        });
                                    }
                                    if (table1 === 'user_train_info') {
                                        tableField.push({
                                            fixed: 'right',
                                            title: '操作',
                                            align: 'center',
                                            toolbar: '#edit3',
                                            width: 200
                                        });
                                        table.render({
                                            elem: '#trainExperienceInfo'
                                            , url: userCenterHost + '/usercenter/getUserTrainInfo'
                                            , method: 'post'
                                            , where: {
                                                username: currentUsername
                                            }
                                            , cols: [tableField]
                                            //,skin: 'line' //表格风格
                                            , even: true
                                            ,page: false //是否显示分页
                                            //,limits: [5, 7, 10]
                                            //,limit: 5 //每页默认显示的数量
                                        });
                                    }
                                }
                            }
                        }
                    }
                    break;
                }
            }
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
            // range: true
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
                    field['username']=currentUsername;
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
                                    $(".clearForm").trigger("click");
                                    parent.layer.alert("提交成功！");
                                    $("#edubgInfoAdd").hide();
                                    table.reload('edubgInfo');
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
                    field['username']=currentUsername;
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
                    field['username']=currentUsername;
                    if(!field.hasOwnProperty("overseasExperience")){
                        alert("是否海外培训经历！")
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
        //判断结束时间是否大于开始时间
        function check(startTime,endTime){
            if(startTime.length==0){
                return false;
            }
            else {
                if(startTime.length>0 && endTime.length>0){
                    var startTmp=startTime.split("-");
                    var endTmp=endTime.split("-");
                    var sd=new Date(startTmp[0],startTmp[1],startTmp[2]);
                    var ed=new Date(endTmp[0],endTmp[1],endTmp[2]);
                    if(sd.getTime()>ed.getTime()){
                        alert("开始日期不能大于结束日期");
                        return false;
                    }
                }
                return true;
            }
        }
    });
    e('educationWork',{});
});

$(".header_edit").click(
    function () {
        $(this).hide();
        $(this).parents().siblings(".layui-card-body").find(".detail_item").hide();
        $(this).parents().siblings(".layui-card-body").find(".fill_box").slideDown();
    }
);

$(".edit_hide").click(
    function () {
        $(this).parents().parents().parents().parents().parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
        $(this).parents().parents().parents().parents(".fill_box").hide();
        $(this).parents().parents().parents().parents().siblings(".detail_item").fadeIn();
    }
);