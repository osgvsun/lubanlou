function returnlogin(){
    window.location.href='http://localhost/index';
}
// 用戶註冊
function register(){
    var username = $("#username").val();
    var pwd = $("#pwd").val();
    var repwd = $("#repwd").val();
    var cname = $("#cname").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var fileId=$("#fileId").val();
    var schoolSite=$("#schoolSite").val();

    if(username === null || username === "" ||username.length<6||username.length>14){
        alert("请填写长度在7-13之间的英文格式用户名！");
        return false;
    }else if(pwd === null || pwd === ""||pwd.length<6||pwd.length>14) {
        alert("请填写长度在7-13之间的英文格式密码！");
        return false;
    }else if(pwd!=repwd) {
        alert("两次密码不相同！");
        return false;
    }else if(phone === null || phone === "" || !(/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(phone))) {
        alert("请填写常用的手机号码！");
        return false;
    }else if(email === null || email === "" || !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email))) {
        alert("请填写格式正确的邮箱地址！");
        return false;
    }else{
        var value=$("#registershow").serialize();
        $.ajax({
            type: 'post',
            async: false,
            url: userCenterHost+'/usercenter/register',
            data: {
                username:username,
                password:pwd,
                cname:cname,
                phone:phone,
                email:email,
                fileId:fileId,
                dbName:schoolSite
            },
            success: function(res) {
                if(!res.code){
                    alert("注册成功！");
                    window.location.href='http://localhost/index';
                }
                else {
                    alert(res.msg);
                }

            },
            error:function() {
                alert("注册失败，发生异常");
            }
        });
    }
}
$("input[type=file]").change(function (e) {
    var file = this.files[0];
    console.log(file);
    resourceContainer.getDirectoryIdByPath({
        path: '用户中心/注册文件',
        success: function (directoryId) {
            var formData = new FormData();
            formData.append('siteName', '用户中心');
            formData.append('username', currentUsername);
            formData.append('fileTags', '注册图片');
            formData.append('files', file);
            formData.append('directoryId', directoryId);
            resourceContainer.uploadFile({
                formData: formData,
                afterUploadSuccess: function (data) {
                    $("#fileId").val(data.fileIds[0]);
                    alert("上传成功");
                }, uploadFail: function (reason) {
                    alert("上传失败:" + reason);
                }
            });
        },
        fail: function (reason) {
            alert("获取目录id失败:" + reason);
        }, needToken: true
    });
})

//获取学校下拉框信息
layui.use(['form'],function (){
    var $ = layui.$,
        form = layui.form;
    $.ajax({
        url: userCenterHost + '/usercenter/dropDownBoxController/getSchool',
        type: 'GET',
        success: function (res) {
            for (var i = 0; i < res.length; i++) {
                var option = '<option value="' + res[i].dbName + '">' + res[i].schoolName + '</option>';
                $("#schoolSite").append(option);
            }
            form.render();
        }
    });
})

