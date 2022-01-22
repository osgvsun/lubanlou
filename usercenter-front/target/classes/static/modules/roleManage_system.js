var role_name=localStorage['roleCname'];
var serverHostArray = document.location.href.split('/');
var serverHost = serverHostArray[0] + "//" + serverHostArray[2] + "/" + serverHostArray[3] + "/";
var serverHostFilter = serverHostArray[0] + "//" + serverHostArray[2] + "";
layui.define(function (e) {
    /* 自定义验证规则 */
    layui.use('form', function () {
        var e = (layui.$, layui.table);
        var $ = layui.jquery,
            form=layui.form;
        let pwdReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/;
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
                    if (!pwdReg.test(data.field.newPassword)) {
                        alert('密码格式须为8~20位数字及字母组合');
                        return false;
                    }
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
        $("#newPassword").bind("input propertychange",function(e){
            if (!pwdReg.test(e.target.value)) {
                $('.msg').closest('.layui-col-lg12').css("display", "block");
            }else{
                $('.msg').closest('.layui-col-lg12').css("display", "none");
            }
        })
    }),
        e("roleManage_system",{})
});

//绘制单个左侧菜单栏
function firstMenu(item, roleObject) {
     if (roleObject === 'ROLE_ADMIN') {
        if (item.config.category == '系统管理') {
            //将普通用户管理和单位用户管理放置用户管理栏目下
            if(item.config.id=='28'||item.config.id=='322'){
                    $(".UserManage").css('display','inline-block');
                    var userManagehtml = ' <dd data-name="userManagement"><a  lay-href="' + (!item.config.href.startsWith('http') ? serverHost + item.config.href : item.config.href) + '" lay-direction="2">' +
                        '<cite>' + item.config.name + '</cite></a></dd>';
                    $("#layui-nav-child").append(userManagehtml);
            }
            //将人员状态和人才称号栏目放置字段维护栏目下
            else if(item.config.id=='308'||item.config.id=='310'){
                $(".filedManage").css('display','inline-block');
                var filedManagehtml = ' <dd data-name="filedManage"><a  lay-href="' + (!item.config.href.startsWith('http') ? serverHost + item.config.href : item.config.href) + '" lay-direction="2">' +
                    '<cite>' + item.config.name + '</cite></a></dd>';
                $("#layui-nav-filedchild").append(filedManagehtml);
            }
            //将图表统计，系统日志栏目位置放到字段维护之后（根据id定位栏目）
            else if(item.config.id=='202'||item.config.id=='27'){
                var htmlend = '<li class="layui-nav-item nav-item"> <a  lay-href="' + (!item.config.href.startsWith('http') ? serverHost + item.config.href : item.config.href) + '" lay-direction="2"><i class="layui-icon layui-icon-auz"></i>' +
                    '<cite>' + item.config.name + '</cite></a>'
                $(".filedManage").after(htmlend);
            }
            else {
                if(item.config.href.substr(0, 1) == "/"){
                    var html = '<li class="layui-nav-item nav-item"> <a  lay-href="' + (!item.config.href.startsWith('http') ? serverHostFilter + item.config.href : item.config.href) + '" lay-direction="2"><i class="layui-icon layui-icon-auz"></i>' +
                        '<cite>' + item.config.name + '</cite></a>'
                } else {
                    var html = '<li class="layui-nav-item nav-item"> <a  lay-href="' + (!item.config.href.startsWith('http') ? serverHost + item.config.href : item.config.href) + '" lay-direction="2"><i class="layui-icon layui-icon-auz"></i>' +
                        '<cite>' + item.config.name + '</cite></a>'
                }

            }
            $(".filedManage").before(html);
        }
    }
}
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
