var show_personConfig_uid=GetQueryString("showConfigUid");
var beOperatedUsername=GetQueryString('changeRole');
var currentRole=JSON.parse(localStorage['role']).roleList[0].id;
var tableField=[{title:'序号', width:100, type:"numbers"}] ;
var userId = JSON.parse(localStorage['role']).id;
$.ajax({
    url: userCenterHost + '/getMenuTree',
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
                    if(show_config_data[i].config.field=='transformSituation'){
                        tableField.push({
                            field: show_config_data[i].config.field,
                            title: show_config_data[i].config.name,
                            align: 'center',
                            width: '120',
                            templet: function(d){
                                var data=d.transformSituation;
                                if(d.transformSituation=='0'){
                                    data='否';
                                }
                                if(d.transformSituation=='1'){
                                    data='是';
                                }
                                return data;
                            }
                        });
                    }
                    else{
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
    layui.use(['index', 'form', 'laydate','table'], function() {
        var $ = layui.$,
            admin = layui.admin,
            element = layui.element,
            layer = layui.layer,
            laydate = layui.laydate,
            form = layui.form,
            table=layui.table;
        //代表作表格渲染
        table.render({
            elem: '#masterWorkInfo'
            ,url: userCenterHost+'/getUserMasterWorkInfo'
            ,method:'post'
            ,where:{
                userId: userId
            }
            ,cols: [tableField,]
            //,skin: 'line' //表格风格
            ,even: true
            ,page: false //是否显示分页
            //,limits: [5, 7, 10]
            //,limit: 5 //每页默认显示的数量
        });
        //授权专利表格渲染
        table.render({
            elem: '#authorizedPatentInfo'
            ,url: userCenterHost+'/getUserAuthorizedPatentInfo'
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

        //代表作发表时间
        laydate.render({
            elem: '#publicationTime_add',
            type: 'year'
        });
        laydate.render({
            elem: '#publicationTime',
            type: 'year'
        });

        //授权专利获批年份
        laydate.render({
            elem: '#patentTime_add',
            type: 'year'
        });
        laydate.render({
            elem: '#patentTime',
            type: 'year'
        });
        laydate.render({
            elem: '#patentTimeInput',
            type: 'year'
        });

        /* 监听提交 */
        form.on('submit(masterWorkInfo)', function(data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                ,btn: ['确定','取消'] //按钮
                ,yes:function(){
                    $(".clearForm").trigger("click");
                    $("#masterInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    $("#masterInfoAdd").hide();
                    layer.closeAll();
                    var field=data.field;
                    field['username']=beShowUsername;
                    admin.req({
                        url: userCenterHost + '/saveUserMasterWorkInfo',
                        data:field,
                        dataType: 'json',
                        method: 'POST'
                        ,success: function(res){
                            if(!res.code){
                                parent.layer.alert("提交成功！");
                                table.reload('masterWorkInfo');
                                $(".header_edit").show();
                            }
                            else{
                                console.log(res.msg);
                                parent.layer.alert("提交失败")
                            }
                        }
                    })
                }
            })
            return false;
        });
        form.on('submit(authorizedPatentInfo)', function(data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                ,btn: ['确定','取消'] //按钮
                ,yes:function(){
                    $(".clearForm").trigger("click");
                    $("#authorizedPatentInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    $("#authorizedPatentInfoAdd").hide();
                    layer.closeAll();
                    var field=data.field;
                    field['username']=beShowUsername;
                    admin.req({
                        url: userCenterHost + '/saveUserAuthorizedPatentInfo',
                        data:field,
                        dataType: 'json',
                        method: 'POST'
                        ,success: function(res){
                            if(!res.code){
                                parent.layer.alert("提交成功！");
                                table.reload('authorizedPatentInfo');
                                $(".header_edit").show();
                            }
                            else{
                                console.log(res.msg);
                                parent.layer.alert("提交失败")
                            }
                        }
                    })
                }
            })
            return false;
        });
        //监听代表作编辑
        table.on('tool(masterWorkInfo)', function(obj){
            var data = obj.data;
            if(obj.event == 'detail'){
                layer.msg('ID：'+ data.id + ' 的查看操作');
            }
            else if(obj.event == 'del'){
                layer.confirm('真的删除行么', function(index){
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/deleteUserMasterWorkInfo',
                        data: data,
                        dataType: 'json',
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
            else if(obj.event == 'edit'){
                /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
                var edit_div='#masterWorkInfo_uid';
                editStandard(data,edit_div);
                form.render();
                layer.open({
                    type: 1
                    ,title:'编辑'
                    ,area: ['60%', '50%']
                    ,id: 'layerDemo1' //防止重复弹出
                    ,content: $('#edit_masterWorkInfo')
                    ,btnAlign: 'c' //按钮居中
                    ,shade: 0 //不显示遮罩
                    ,yes: function(){
                        layer.closeAll();
                    }
                });
            }
        });
        //监听授权专利信息编辑
        table.on('tool(authorizedPatentInfo)', function(obj){
            var data = obj.data;
            if(obj.event == 'detail'){
                layer.msg('ID：'+ data.id + ' 的查看操作');
            }
            else if(obj.event == 'del'){
                layer.confirm('真的删除行么', function(index){
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/deleteUserAuthorizedPatentInfo',
                        data: data,
                        dataType: 'json',
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
            else if(obj.event == 'edit'){
                /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
                var edit_div='#authorizedPatentInfo_uid';
                editStandard(data,edit_div);
                for (var i = 0; i < Object.entries(data).length; i++) {
                    if(Object.entries(data)[i][0]=='transformSituation'){
                        $("input[name='transformSituation'][value='"+Object.entries(data)[i][1]+"']").attr("checked",true);
                        if(Object.entries(data)[i][1]==0){
                            $(".transferAmount").hide();
                        }
                    }
                }
                form.render();
                layer.open({
                    type: 1
                    ,title:'编辑'
                    ,area: ['60%', '50%']
                    ,id: 'layerDemo2'//防止重复弹出
                    ,content: $('#edit_authorizedPatentInfo')
                    ,btnAlign: 'c' //按钮居中
                    ,shade: 0 //不显示遮罩
                    ,yes: function(){
                        layer.closeAll();
                    }
                });
            }
        });
        active = {
            reload_authorized: function () {
                var patentNameReload=$('#patentNameInput');
                var patentTimeReload=$('#patentTimeInput');

                //执行重载
                table.reload('authorizedPatentInfo', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        patentName: patentNameReload.val(),
                        patentTime:patentTimeReload.val(),
                    }
                });
            },
            reload_masterWork: function () {
                var projectNameReload=$('#thesisTitleInput');
                var projectSourceReload=$('#periodicalInput');

                //执行重载
                table.reload('masterWorkInfo', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        projectName: projectNameReload.val(),
                        projectSource:projectSourceReload.val(),
                    }
                });
            },

        };
        /*
    * 下拉框数据读取显示
    * */

        //本人角色
        $.ajax({
            url:userCenterHost+'/dropDownBoxController/getCharacter',
            type:'GET',
            data:{fromMasterWork:'true'},
            success:function (res) {
                if(!res.code){
                    var data=res.data;
                    for(var i=0;i<data.length;i++){
                        var option= '<option value="'+data[i].character+'">'+data[i].character+'</option>';
                        $(".characters").append(option);
                        form.render();
                    }
                }
                else{
                    console.log(res.msg);
                }


            }

        })
        $('.patenInput .layui-btn').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
        $('.eduprojectInput .layui-btn').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
        $('.masterWorkInput .layui-btn').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });

    });
    e("masterDetailTab",{})
});

$(".header_edit").click(
    function () {
        $(".header_edit").hide();
        $(this).parents().find(".fill_box").slideDown();
    }
);

$(".edit_hide").click(
    function () {
        $(".header_edit").show();
        $(this).parents().parents().parents().parents(".fill_box").hide();
    }
);

$(".tstrue").click(
    function() {
        $(".transferAmount").show();
    }
);
$(".tsfalse").click(
    function() {
        $(".transferAmount").hide();
        $(".transferAmount").val('');
        $(".transferAmount").removeAttr("lay-verify");
    }
);
var user=$("input[name='username']") ;
user.each(function(){
    $(this).val(currentUsername);
});


