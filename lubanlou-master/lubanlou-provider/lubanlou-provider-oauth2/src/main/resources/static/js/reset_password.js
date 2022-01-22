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
    // 密码动态校验
    $("input[id='password']").bind("input",function(e){
        if (!pwdReg.test(e.target.value)) {
            msgTextShow("密码格式须为8~20位数字及字母组合");
            inputFocus("input[id='password']")
        }else{
            msgTextHide()
        }
    })
}

let phoneReg = /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\d{8}$/;
let pwdReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/;

// 提交
function verSubmit() {
    let passwd = $.trim($("input[id='password']").val()),
        confirmPasswd = $.trim($("input[id='confirmPassword']").val()),
        phone = $.trim($("input[id='phone']").val()),
        code = $.trim($("input[id='login_code']").val());
    if (!passwd) {
        msgTextShow("密码不能为空,请输入密码!");
        inputFocus("#password");
        return false;
    } else if (!pwdReg.test(passwd)) {
        msgTextShow("密码格式须为8~20位数字及字母组合");
        inputFocus("#password");
        return false;
    }
    if (!confirmPasswd) {
        msgTextShow("确认密码不能为空,请输入确认密码!");
        inputFocus("#confirmPassword");
        return false;
    }
    if (passwd !== confirmPasswd) {
        msgTextShow("两次输入的密码不一致!");
        inputFocus("#confirmPassword");
        return false;
    }
    if (!phone) {
        msgTextShow("请输入手机号!");
        inputFocus("#phone");
        return false;
    } else if (!phoneReg.test(phone) && $(".item_code_pic")[0].style.display != 'none') {
        msgTextShow("请输入正确的手机格式!");
        inputFocus("#phone");
        return false;
    }
    // 验证码存在才判断
    if (!code && $(".item_code_pic")[0].style.display != 'none') {
        msgTextShow("验证码不能为空,请输入验证码!");
        inputFocus("#login_code");
        return false;
    }
    Cookies.remove(timeCookieName);
    $("#loginForm").submit();
}
