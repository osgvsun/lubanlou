var usename=currentUsername;
var role_name=GetQueryString("role_name");
var serverHostArray = document.location.href.split('/');
var serverHost = serverHostArray[0] + "//" + serverHostArray[2] + "/" + serverHostArray[3] + "/";
var serverHostFilter = serverHostArray[0] + "//" + serverHostArray[2] + "";
window.onload=function () {
    if(role_name==null){
        $.ajax({
            url: userCenterHost + '/getTeacherBasicInfo',
            async: false,
            type: "GET",
            data: {
                username: currentUsername
            },
            contentType:"application/json",
            success: function (res) {
                if(!res.code){
                    var data=res.data;
                    localStorage['role'] = JSON.stringify(data);
                    if(data.roleList.length){
                        role_name=data.roleList[0].roleName;
                        localStorage['roleCname'] = data.roleList[0].roleCname;
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
    }
    var currentRoleUid=JSON.parse(localStorage['role']).roleList[0].id;
    $.ajax({
        url: userCenterHost + '/getMenuTree',
        async: false,
        type: "GET",
        data:{
            username:currentUsername,
            roleId:currentRoleUid,
            target:1
        },
        contentType: "json;charset=UTF-8",
        success: function (data) {
            localStorage['tree'] = JSON.stringify(data);
        }
    });
    var dataObject = JSON.parse(localStorage['tree']);
    var role = JSON.parse(localStorage['role']);
    var currentRole=role.roleList[0];
    var menu1 = dataObject.nextLevelConfigSet;
//登入默认页面
    if(currentRole.roleName=='ROLE_ADMIN'){
        $('#lay_src').attr('lay-attr',serverHost+'manager/personalInfo?currentShowRole=ROLE_TEACHER');
        $('#lay_src').attr('lay-id',serverHost+'manager/personalInfo?currentShowRole=ROLE_TEACHER');
        $('#iframe_src').attr('src',serverHost+'manager/personalInfo?currentShowRole=ROLE_TEACHER');
    } else if (currentRole.roleName=='ROLE_UNIT'){
        $('#lay_src').attr('lay-attr',serverHost + 'manager/tabContent/personInfo/unitEnterpriseUser?gsiName=' + sessionStorage.getItem('name') + '&changeRole=ROLE_UNIT');
        $('#lay_src').attr('lay-id',serverHost + 'manager/tabContent/personInfo/unitEnterpriseUser?gsiName=' + sessionStorage.getItem('name') + '&changeRole=ROLE_UNIT');
        $('#iframe_src').attr('src',serverHost + 'manager/tabContent/personInfo/unitEnterpriseUser?gsiName=' + sessionStorage.getItem('name') + '&changeRole=ROLE_UNIT');
        $('#LAY-system-side-menu').attr('style', 'display: none');
        $('#iframe_src').load(function() {
            var contentStyle = document.getElementById('iframe_src').contentWindow;
            contentStyle.document.getElementsByClassName("detail_item")[0].style.padding = '20px';
            $("#iframe_src").contents().find(".layui-form-item").children('.layui-col-lg12').eq(0).css('display', 'none');
            $("#iframe_src").contents().find(".layui-form-item").children('.layui-col-lg12').eq(1).css('display', 'none');
            $("#iframe_src").contents().find(".layui-form-item").children('.layui-col-lg12').eq(2).css('display', 'none');
            $("#iframe_src").contents().find(".layui-form-item").children('.layui-col-lg12').eq(3).css('display', 'none');
            $("#iframe_src").contents().find(".layui-form-item").children('.layui-col-lg12').eq(4).css('display', 'none');
            $("#iframe_src").contents().find(".layui-form-item").children('.layui-col-lg12').eq(6).css('display', 'none');
            $("#iframe_src").contents().find(".layui-form-item").children('.layui-col-lg12').eq(8).css('display', 'none');
            $("#iframe_src").contents().find(".layui-form-item").children('.layui-col-lg4').eq(0).css('display', 'none');
            $("#iframe_src").contents().find(".layui-form-item").children('.layui-col-lg4').eq(1).css('display', 'none');

            $("#iframe_src").contents().find("#enterprise").children('.layui-col-lg12').eq(0).css('display', 'none');
            $("#iframe_src").contents().find("#enterprise").children('.layui-col-lg12').eq(1).css('display', 'none');
            $("#iframe_src").contents().find("#enterprise").children('.layui-col-lg12').eq(2).css('display', 'none');
            $("#iframe_src").contents().find("#enterprise").children('.layui-col-lg12').eq(3).css('display', 'none');
            $("#iframe_src").contents().find("#enterprise").children('.layui-col-lg12').eq(4).css('display', 'none');
            $("#iframe_src").contents().find("#enterprise").children('.layui-col-lg12').eq(5).css('display', 'none');
            $("#iframe_src").contents().find("#enterprise").children('.layui-col-lg12').eq(6).css('display', 'none');
            $("#iframe_src").contents().find("#enterprise").children('.layui-col-lg12').eq(8).css('display', 'none');
            $("#iframe_src").contents().find("#enterprise").children('.layui-col-lg12').eq(10).css('display', 'none');
            $("#iframe_src").contents().find("#enterprise").children('.layui-col-lg4').eq(0).css('display', 'none');
            $("#iframe_src").contents().find("#enterprise").children('.layui-col-lg4').eq(1).css('display', 'none');

        })
    }
    else{
        $('#lay_src').attr('lay-attr',serverHost+'teacher/personalInfo');
        $('#lay_src').attr('lay-id',serverHost+'teacher/personalInfo');
        $('#iframe_src').attr('src',serverHost+'teacher/personalInfo');
    }
    var roleLista='';
    for(var i=0;i<role.roleList.length;i++){
        var rolrUl='<a onclick="roleChange('+role.roleList[i].id+')">'+role.roleList[i].roleCname+'</a>';
        roleLista=roleLista+rolrUl;
    }
    $("#roleList").append(roleLista);
    if(role_name=="ROLE_ADMIN"){
        //设置首次进入为系统管理界面
        if(GetQueryString("role_name")==null){
            window.location.href=serverHost+'system_index';
        }
        $(".roleChange").css('display','inline-block');
    }
    var currentName= localStorage['roleCname']+':'+role.cname;
    document.getElementById("currentName").innerText = currentName;
    for (var i = 0; i < menu1.length; i++) {
        firstMenu(menu1[i],currentRole.roleName);
    }
}

//绘制单个左侧菜单栏
function firstMenu(item, roleObject) {
    if (roleObject == 'ROLE_TEACHER'||roleObject =='ROLE_STUDENT') {
        if(item.config.admin!=1){
            if (item.config.adminSetting == '1' || item.config.selfSetting == '1') {
                if(item.config.href.substr(0, 1) == "/"){
                    var html = '<li class="layui-nav-item nav-item"> <a  lay-href="' + (!item.config.href.startsWith('http') ? serverHostFilter + item.config.href : item.config.href) + '?currentShowRole=' + roleObject +'" lay-direction="2"><i class="layui-icon layui-icon-auz"></i>' +
                        '<cite>' + item.config.name + '</cite></a></li>';
                } else {
                    var html = '<li class="layui-nav-item nav-item"> <a  lay-href="' + (!item.config.href.startsWith('http') ? serverHost + item.config.href : item.config.href) + '?currentShowRole='+ roleObject +'" lay-direction="2"><i class="layui-icon layui-icon-auz"></i>' +
                        '<cite>' + item.config.name + '</cite></a></li>';
                }

                $("#LAY-system-side-menu").append(html);
            }
        }
        if(item.config.admin==1){
            if (item.config.adminSetting == '1' || item.config.selfSetting == '1') {
                $(".manage").css('display','inline-block');
                if(item.config.href.substr(0, 1) == "/"){
                    var html = ' <dd data-name="userManagement"><a  lay-href="' + (!item.config.href.startsWith('http') ? serverHostFilter + item.config.href : item.config.href) + '?currentShowRole=ROLE_STUDENT" lay-direction="2">' +
                        '<cite>' + item.config.name + '</cite></a></li>';
                } else {
                    var html = ' <dd data-name="userManagement"><a  lay-href="' + (!item.config.href.startsWith('http') ? serverHost + item.config.href : item.config.href) + '?currentShowRole=ROLE_STUDENT" lay-direction="2">' +
                        '<cite>' + item.config.name + '</cite></a></li>';
                }

                $("#layui-nav-child").append(html);
            }
        }

    }
    else if (roleObject =='ROLE_ADMIN') {
        if (item.config.admin == 1&&item.config.category != '系统管理') {
            if(item.config.href.substr(0, 1) == "/"){
                var html = '<li class="layui-nav-item nav-item"> <a  lay-href="' + (!item.config.href.startsWith('http') ? serverHostFilter + item.config.href : item.config.href) + '?currentShowRole=ROLE_ADMIN" lay-direction="2"><i class="layui-icon layui-icon-auz"></i>' +
                    '<cite>' + item.config.name + '</cite></a></li>';
            } else {
                var html = '<li class="layui-nav-item nav-item"> <a  lay-href="' + (!item.config.href.startsWith('http') ? serverHost + item.config.href : item.config.href) + '?currentShowRole=ROLE_ADMIN" lay-direction="2"><i class="layui-icon layui-icon-auz"></i>' +
                    '<cite>' + item.config.name + '</cite></a></li>';
            }

            $("#LAY-system-side-menu").append(html);
        }
    }
}
layui.define(function (e) {
    layui.use('form', function () {
        var e = (layui.$, layui.table);
        var $ = layui.jquery,
            form=layui.form
        form.verify({
            oldPassword: function(value) {

            },
            pass: [/(.+){6,12}$/, '密码必须6到12位'],
        });
        form.on('submit(editPassword)', function(data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                ,btn: ['确定','取消'] //按钮
                ,yes:function(){
                    if(data.field.reNewPassword==data.field.newPassword){
                        modifyPass(currentUsername,data.field);
                    }
                    else{
                        alert('输入的两次密码不一致！');
                    }
                    layer.closeAll();
                }
            })
            return false;
        });
    }),
        e("roleManage",{})

});
