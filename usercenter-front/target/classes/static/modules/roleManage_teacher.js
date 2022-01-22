var role_name=localStorage['roleCname'];
var serverHostArray = document.location.href.split('/');
var serverHost = serverHostArray[0] + "//" + serverHostArray[2] + "/" + serverHostArray[3] + "/";
var serverHostFilter = serverHostArray[0] + "//" + serverHostArray[2] + "";
//绘制单个左侧菜单栏
function firstMenu(item, roleObject) {
     if (roleObject === 'ROLE_ADMIN') {
        if (item.config.admin == 1&&item.config.category != '系统管理') {
            if(item.config.href.substr(0, 1) == "/"){
                var html = '<li class="layui-nav-item nav-item"> <a  lay-href="' + serverHostFilter + item.config.href + '?currentShowRole=ROLE_TEACHER" lay-direction="2"><i class="layui-icon layui-icon-auz"></i>' +
                    '<cite>' + item.config.name + '</cite></a></li>';
            } else {
                var html = '<li class="layui-nav-item nav-item"> <a  lay-href="' + serverHost + item.config.href + '?currentShowRole=ROLE_TEACHER" lay-direction="2"><i class="layui-icon layui-icon-auz"></i>' +
                    '<cite>' + item.config.name + '</cite></a></li>';
            }
            $("#LAY-system-side-menu").append(html);
        }

    }
}
/* 自定义验证规则 */
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
        e("roleManage_student",{})
});

var dataObject = JSON.parse(localStorage['tree']);
var role = JSON.parse(localStorage['role']);
var currentRole=role.roleList[0];
var menu1 = dataObject.nextLevelConfigSet;
window.onload = function () {
    var roleLista='';
    for(var i=0;i<role.roleList.length;i++){
        var rolrUl='<a onclick="roleChange('+role.roleList[i].id+')">'+role.roleList[i].roleCname+'</a>';
        roleLista=roleLista+rolrUl;
    }
    $("#roleList").append(roleLista);
    if(role_name=="ROLE_ADMIN"){
        $(".roleChange").css('display','inline-block');
    }
    var currentName=localStorage['roleCname']+':'+role.cname;
    document.getElementById("currentName").innerText = currentName;
    for (var i = 0; i < menu1.length; i++) {
        firstMenu(menu1[i],currentRole.roleName);
    }
}
