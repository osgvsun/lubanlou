let pwdReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/;
// js
$(function () {
    js_bind();
})

// js绑定
function js_bind() {
    // 菜单选择显示效果
    $(".login_type_btn div").click(function () {
        // menu
        $(this).addClass("login_type_btn_choose").siblings("div").removeClass(
            "login_type_btn_choose")
        // detail
        $(".login_detail > div").hide();
        $(".login_detail > div:nth-child(" + $(this).attr("index") + ")").show();
    })
    // 登录密码强校验
    $("input[id='login_password']").bind("input",function(e){
        if (!pwdReg.test(e.target.value)) {
            msgTextShow("密码较弱可能有安全隐患，建议修改",2);
        }else{
            msgTextHide()
        }
    })
}

// 回车提交表单
document.onkeypress = function (event) {
    var e = event || window.event;
    if (e && e.keyCode === 13) { //回车键的键值为13
        $("#login_form_btn").click();
    }
};

// 更新验证码
function reloadImg() {
    $(".code_pic").attr("src", $(".code_pic").attr("src").split("?")[0] + "?" + new Date().getTime())
}

// submit
function verSubmit() {
    var uname = $.trim($("#login_name").val());
    var passwd = $.trim($("#login_password").val());
    if (uname == "" || uname == null) {
        msgTextShow("用户名不能为空,请输入用户名!");
        inputFocus("#login_name")
        return false;
    }
    if (passwd == "" || passwd == null) {
        msgTextShow("密码不能为空,请输入密码!");
        inputFocus("#login_password")
        return false;
    }

    var vilidcode = $.trim($("#login_code").val());
    if (vilidcode == "" || vilidcode == null) {
        msgTextShow("验证码不能为空,请输入验证码!");
        inputFocus("#login_code")
        return false;
    }

    if(passwordEncode) {
        let encodePwd = encodeAesString(passwd, AES_KEY, AES_IV); //密文
        $("#encode_password").val(encodePwd);
    }else {
        $("#encode_password").val(passwd);
    }
    $("#loginForm").submit();
}

function encodeAesString(data,key,iv){
    var key = CryptoJS.enc.Utf8.parse(key);
    var iv = CryptoJS.enc.Utf8.parse(iv);
    var encrypted =CryptoJS.AES.encrypt(data,key,{
        iv:iv,
        mode:CryptoJS.mode.CBC,
        padding:CryptoJS.pad.Pkcs7
    });
    //返回的是base64格式的密文
    return encrypted;
}

// encrypted 为是base64格式的密文
function decodeAesString(encrypted,key,iv){
    var key = CryptoJS.enc.Utf8.parse(key);
    var iv = CryptoJS.enc.Utf8.parse(iv);
    var decrypted =CryptoJS.AES.decrypt(encrypted,key,{
        iv:iv,
        mode:CryptoJS.mode.CBC,
        padding:CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}