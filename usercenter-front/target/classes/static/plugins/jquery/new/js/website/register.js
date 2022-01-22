//检查用户名是否存在
function judgeTUserExtend(username) {
    var str=false;
    $.ajax({
        type: 'post',
        async: false,
        url: '../framework/register/judgeTUserExtend?username=' + username,
        success: function (data) {
            if(data=="true"){
                str=true;
            } else{
                str=false;
            }
        },
        error: function () {
        }
    });
    return str;
}
function register(){
    var username = $("#username").val();
    var pwd = $("#pwd").val();
    // alert(md5(pwd))
    var repwd = $("#repwd").val();
    var cname = $("#cname").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var delegate=$("#delegate").val();
    var communicationaddress=$("#communicationaddress").val();
    var labcenter=$("#labcenter").val();
    var unitname=$("#unitname").val();
    var address=$("#address").val();
    var bankaddress=$("#bankaddress").val();
    var bankcard=$("#bankcard").val();
    var taxid=$("#taxid").val();

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
    }else if(judgeTUserExtend(username)){
        $.ajax({
            type: 'post',
            async: false,
            url: '../framework/register/register',
            data: $("#registershow").serialize(),
            success: function(data) {
                alert("注册成功！");
                window.location.href="../website/index";
            },
            error:function() {
                alert("注册失败，发生异常");
            }
        });
    }else {
        alert("用户已存在！");
    }
}
$(".verify").click(
    function() {
        var username = $("#username").val();
        var pwd = $("#pwd").val();
        var pwd = $("#pwd").val();
        var repwd = $("#repwd").val();
        var phone = $("#phone").val();
        var email = $("#email").val();
        if (username === null || username === "" || username.length < 6 || username.length > 14) {
            alert("请填写长度在7-13之间的英文格式用户名！");
            return false;
        } else if (pwd === null || pwd === "" || pwd.length < 6 || pwd.length > 14) {
            alert("请填写长度在7-13之间的英文格式密码！");
            return false;
        } else if (pwd != repwd) {
            alert("两次密码不相同！");
            return false;
        } else if (phone === null || phone === "" || !(/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(phone))) {
            alert("请填写常用的手机号码！");
            return false;
        } else if (email === null || email === "" || !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email))) {
            alert("请填写格式正确的邮箱地址！");
            return false;
        } else{
            $(this).parent().parent(".register_btm").removeClass("rb_block");
            $(this).parent().parent().next(".register_btm").addClass("rb_block");
            $(this).parent().parent(".register_btm").siblings(".register_top").find("div:last-child").addClass("rt_select");
            $(this).parent().parent(".register_btm").siblings(".register_top").find("div:first-child").removeClass("rt_select");
        }
    }
);


