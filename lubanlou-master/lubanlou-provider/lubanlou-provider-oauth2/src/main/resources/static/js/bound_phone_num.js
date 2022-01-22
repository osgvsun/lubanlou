// js
$(function () {
    js_bind();
})

function js_bind() {
    // 回车提交表单
    document.onkeypress = function (event) {
        let e = event || window.event;
        if (e && e.keyCode === 13) { //回车键的键值为13
            $("#login_form_btn").click();
        }
    };
}

let phoneReg = /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\d{8}$/;

// 提交
function verSubmit() {
    let username = $("input[id='username']").val(),
        passwd = $("input[id='password']").val(),
        phone = $("input[id='phone']").val(),
        code = $("input[id='login_code']").val();
    if (!username) {
        msgTextShow("用户名不能为空,请输入用户名!");
        inputFocus("#username")
        return false;
    }
    if (!passwd) {
        msgTextShow("密码不能为空,请输入密码!");
        inputFocus("#password")
        return false;
    } else if (passwd.length < 6) {
        msgTextShow("至少输入六位数的密码!");
        inputFocus("#password")
        return false;
    }
    if (!phone) {
        msgTextShow("请输入手机号!");
        inputFocus("#phone")
        return false;
    } else if (!phoneReg.test(phone) && $(".item_code_pic")[0].style.display != 'none') {
        msgTextShow("请输入正确的手机格式!");
        inputFocus("#phone")
        return false;
    }
    // 验证码存在才判断
    if (!code && $(".item_code_pic")[0].style.display != 'none') {
        msgTextShow("验证码不能为空,请输入验证码!");
        inputFocus("#login_code")
        return false;
    }
    Cookies.remove(timeCookieName);
    $("#loginForm").submit();
}
