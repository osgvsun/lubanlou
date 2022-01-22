if (!isRegisterBack) {
    layer.open({
        type: 1,
        area: ['60%', '60%'],
        title: '个人用户服务条款',
        skin: 'layui-layer-rim',
        content: $('#details'),
        btn: ['同意并继续'],
        resize: false,
        scrollbar: false,
        move: false,
        closeBtn:0,
        // 弹窗回调
        success: function (layero, index) {
            $.ajax({
                url: apiGateWayHost + "/usercenter/clause/get",
                type: "GET",
                async: false,
                data: {type: '个人用户服务条款'},
                success: function (res) {
                    if (res.data != null){
                        $(".layui-layer-title").text(res.data.name);
                        $('#infoTest').html(res.data.content);
                        $('.tos_name').text('《' + res.data.name + '》')
                    }

                }
            });
            // 回车点击同意协议
            document.onkeypress = function (event) {
                let e = event || window.event;
                if (e && e.keyCode === 13) { //回车键的键值为13
                    $(".layui-layer-btn0").click(function () {
                        document.onkeypress = null;
                    })
                    $(".layui-layer-btn0").click();
                }
            };
        },
        // yes回调
        yes: function (index) {
            $("#tos").attr("checked", "checked");
            $("#tos_bp").attr("checked", "checked");
            layer.close(index); //如果设定了yes回调，需进行手工关闭
        },
        // 窗口关闭触发
        end: function () {
            bindEvent();
        },
        // 关闭后回调
        cancel:function(){
            location.href = location.origin;
        }
    })
}

//新用户注册
function userRegisterType() {
    $('.userRegister').show();
    $('.type_choose').hide();
    $('.login_form').removeClass('chooseType');
}

//手机绑定学工号
function boundPhoneNumberType() {
    $('.boundPhoneNumber').show();
    $('.type_choose').hide();
    $('.login_form').removeClass('chooseType');
}

function bindEvent() {
    document.onkeypress = function (event) {
        let e = event || window.event;
        if (e && e.keyCode === 13) { //回车键的键值为13
            $("button[data-step-type=next]").click();
        }
    }
}

$(function () {
    js_bind()
})

function js_bind() {
    $("input[id='password']").bind("input",function(e){
        if (!pwdReg.test(e.target.value)) {
            msgTextShow("密码格式须为8~20位数字及字母组合");
            inputFocus("input[id='password']")
        }else{
            msgTextHide()
        }
    })
}

// 步骤跳转(新用户注册)
function stepJump(num) {
    bindEvent();
    let step = Math.abs($(".item_step").css("margin-left").split("px")[0]) / 346;
    if (num < 0) {
        $("button[data-step-type=next]").show();
        $("button[data-step-type=submit]").hide();
    }
    let sum = step + num;
    if (sum < 0 || sum > 3 || !checkTos()) {
        return;
    }
    let username = $("input[id='username']").val()
    if (inputRegCname.test(username)){
        msgTextShow("学号/工号不能使用中文!");
        inputFocus("#username")
        return false;
    } else {
        msgTextHide();
    }

    switch (sum) {
        case 0:
            $("button[data-step-type=pre]").hide();
            break;
        case 1:
            if (!step_3_check()) {
                return;
            }
            $("button[data-step-type=pre]").show();
            $("button[data-step-type=next]").hide();
            $("button[data-step-type=submit]").show();
            document.onkeypress = function (event) {
                let e = event || window.event;
                if (e && e.keyCode === 13) { //回车键的键值为13
                    $("button[data-step-type=submit]").click();
                }
            }
            break;
        case 2:
            // if (!step_2_check()) {
            if (!step_1_check()) {
                return;
            }
            $("button[data-step-type=next]").hide();
            $("button[data-step-type=submit]").show();
            document.onkeypress = function (event) {
                let e = event || window.event;
                if (e && e.keyCode === 13) { //回车键的键值为13
                    $("button[data-step-type=submit]").click();
                }
            }
            break;
    }
    msgTextHide();
    $(".item_step").css("margin-left", `calc(-346px * ${sum})`)
}

// 步骤跳转(手机绑定学工号)
function stepJumpBp(num) {
    bindEvent();
    let step = Math.abs($(".item_step_bp").css("margin-left").split("px")[0]) / 346;
    if (num < 0) {
        $("button[data-step-type=nextBp]").show();
        $("button[data-step-type=submitBp]").hide();
    }
    let sum = step + num;
    if (sum < 0 || sum > 3 || !checkTos()) {
        return;
    }
    let usernameBp = $("input[id='username_bp']").val();
    if (inputRegCname.test(usernameBp)){
        msgTextShowBp("学号/工号不能使用中文!");
        inputFocus("#username_bp")
        return false;
    }
    else {
        msgTextHide();
    }
    switch (sum) {
        case 0:
            $("button[data-step-type=preBp]").hide();
            break;
        case 1:
            //判断工号是否重复
            if (!step_3_check_bp() || step_3_checkUserName_bp()) {
                return;
            }
            $("button[data-step-type=preBp]").show();
            break;
        case 2:
            if (!step_1_checkBp()) {
                return;
            }
            $("button[data-step-type=nextBp]").hide();
            $("button[data-step-type=submitBp]").show();
            document.onkeypress = function (event) {
                let e = event || window.event;
                if (e && e.keyCode === 13) { //回车键的键值为13
                    $("button[data-step-type=submitBp]").click();
                }
            }
            break;
    }
    msgTextHide();
    $(".item_step_bp").css("margin-left", `calc(-346px * ${sum})`)
}

//直达
function stepNonstop(num) {
    for (let i = 0; i < num; i++) {
        $("button[data-step-type=next]").click();
    }
    msgTextShow()
}

// 判断是否勾选条款
function checkTos() {
    let tosChecked = $("#tos").is(":checked");
    if (!tosChecked) {
        msgTextShow("不同意服务条款，无法注册");
    }
    return tosChecked;
}

// 判断是否勾选条款
function checkTosBp() {
    let tosChecked = $("#tos_bp").is(":checked");
    if (!tosChecked) {
        msgTextShowBp("不同意服务条款，无法注册");
    }
    return tosChecked;
}

let phoneReg = /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\d{8}$/;
let emailReg = /^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
let inputReg = /^(\s*)(?=[^ ]+$)/g;
let inputRegCname = new RegExp("[\\u4E00-\\u9FFF]+","g");
let pwdReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/;

// 手机号
function step_1_check() {
    let phone = $("input[id='phone']").val(),
        code = $("input[id='login_code']").val(),
        passwd = $("input[id='password']").val(),
        confirmPasswd = $("input[id='confirmPassword']").val();
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
    } else {
        let isTrue = true;
        $.ajax({
            type: "GET",
            async: false,
            url: location.origin + "/uaa/checkSecurityCode",
            data: {
                securityCode: code
            }, success: function (data) {
                if (data.msg != "success") {
                    msgTextShow(data.msg);
                    isTrue = false;
                }
            }
        })
        if (!isTrue) return false;
    }

    if (!passwd) {
        msgTextShow("密码不能为空,请输入密码!");
        inputFocus("#password")
        return false;
    } else if (!pwdReg.test(passwd)) {
        msgTextShow("密码格式须为8~20位数字及字母组合");
        inputFocus("#password")
        return false;
    }
    if (!confirmPasswd) {
        msgTextShow("确认密码不能为空,请输入确认密码!");
        inputFocus("#confirmPassword")
        return false;
    }
    if (passwd !== confirmPasswd) {
        msgTextShow("两次输入的密码不一致!");
        inputFocus("#confirmPassword")
        return false;
    }
    return true;
}

// 手机号
function step_1_checkBp() {
    let phone = $("input[id='phone_bp']").val(),
        code = $("input[id='login_code_bp']").val();
    // 验证码存在才判断
    if (!code && $(".item_code_pic")[0].style.display != 'none') {
        msgTextShowBp("验证码不能为空,请输入验证码!");
        inputFocus("#login_code_bp")
        return false;
    } else {
        let isTrue = true;
        $.ajax({
            type: "GET",
            async: false,
            url: location.origin + "/uaa/checkSecurityCode",
            data: {
                securityCode: code
            }, success: function (data) {
                if (data.msg != "success") {
                    msgTextShowBp(data.msg);
                    isTrue = false;
                }
            }
        })
        if (!isTrue) return false;
    }
    return true;
}

$('#cname').blur(function () {
    let cname = $("#cname").val();
    if(!inputReg.test(cname)){
        msgTextShow("姓名不能输入空格，请重新输入!");
        inputFocus("#cname")
        return false;
    } else {
        msgTextHide();
    }
});
// 姓名 邮箱
function step_2_check() {
    let cname = $("#cname").val();
    if (!cname) {
        msgTextShow("姓名不能为空,请输入姓名!");
        inputFocus("input[name=cname]")
        return false;
    }
    if(!inputReg.test(cname)){
        msgTextShow("姓名不能输入空格，请重新输入!");
        inputFocus("#cname")
        return false;
    } else {
        msgTextHide();
    }
    let email = $("input[id='email']").val();
    if (!email) {
        msgTextShow("邮箱不能为空,请输入邮箱!");
        inputFocus("#email")
        return false;
    }
    if (!emailReg.test(email)) {
        msgTextShow("请输入正确的邮箱格式!");
        inputFocus("#email")
        return false;
    }
    return true;
}

$('#cname_bp').blur(function () {
    let cname = $("#cname_bp").val()
    if(!inputReg.test(cname)){
        msgTextShowBp("姓名不能输入空格，请重新输入!");
        inputFocus("#cname_bp")
        return false;
    }else {
        // $('.msg_error').removeAttr('style')
        // $("#username").blur();
        msgTextHide();
    }

});
// 姓名 邮箱
function step_2_check_Bp() {
    let cname = $("#cname_bp").val(),
        passwd = $("input[id='password_bp_check']").val(),
        confirmPasswd = $("input[id='confirmPassword_bp_check']").val();
    if (!cname) {
        msgTextShowBp("姓名不能为空,请输入姓名!");
        inputFocus("input[name=cname_bp]")
        return false;
    }
    if(!inputReg.test(cname)){
        msgTextShowBp("姓名不能输入空格，请重新输入!");
        inputFocus("#cname_bp")
        return false;
    } else {
        msgTextHide();
        // $("#username").blur();
    }
    let email = $("input[id='email_bp']").val();
    if (!email) {
        msgTextShowBp("邮箱不能为空,请输入邮箱!");
        inputFocus("#email_bp")
        return false;
    }
    if (!emailReg.test(email)) {
        msgTextShowBp("请输入正确的邮箱格式!");
        inputFocus("#email_bp")
        return false;
    }
    return true;
}
$('#username').blur(function () {
    let username = $("input[id='username']").val();
    if(!inputReg.test(username)){
        msgTextShow("学号/工号不能输入空格，请重新输入!");
        inputFocus("#username")
        return false;
    } else {
        msgTextHide();
    }
});
function step_3_check() {
    let username = $("input[id='username']").val();
    let dataSource = $("#dataSource").val();
    if (!username) {
        msgTextShow("学号/工号不能为空,请输入工号!");
        inputFocus("#username");
        return false;
    }
    if(!inputReg.test(username)){
        msgTextShow("学号/工号不能输入空格，请重新输入!");
        inputFocus("#username")
        return false;
    } else {
        msgTextHide();
    }
    if (!dataSource) {
        msgTextShow("数据源不能为空,请选择数据源!");
        inputFocus("#dataSource")
        return false;
    }
    if (!step_3_checkUserName()){
        return false;
    }
    if (!step_1_check()) {
        return false;
    }
    return true;
};

$('#username_bp').blur(function () {
    let username = $("input[id='username_bp']").val();
    if(!inputReg.test(username)){
        msgTextShowBp("学号/工号不能输入空格，请重新输入!");
        inputFocus("#username_bp")
        return false;
    } else {
        msgTextHide();
    }
});
function step_3_checkUserName_bp() {
    let username = $("input[id='username_bp']").val(),
        dataSource = $("#dataSource_bp").val();
    let isPass = false;
    $.ajax({
        url: location.origin + "/uaa/checkUserExist",
        type: "GET",
        async: false,
        data: {
            username:username,
            schoolName:dataSource
        }, success: function (res) {
            if (!res.data) {
                msgTextShowBp("当前数据源下没有这个工号!");
                isPass = true;
            }
        },error:function(){
            msgTextShowBp("验证学号/工号是否重复失败!");
            isPass = true;
        }
    })
    return isPass;
}

function step_3_check_bp() {
    let username = $("input[id='username_bp']").val(),
        dataSource = $("#dataSource_bp").val(),
        passwd = $("input[id='password_bp']").val(),
        confirmPasswd = $("input[id='confirmPassword_bp']").val();
    if (!username) {
        msgTextShowBp("学号/工号不能为空,请输入工号!");
        inputFocus("#username_bp")
        return false;
    }
    if(!inputReg.test(username)){
        msgTextShowBp("学号/工号不能输入空格，请重新输入!");
        inputFocus("#username_bp")
        return false;
    } else {
        msgTextHide();
    }
    if (!dataSource && dataSourceDtosSize !== 1) {
        msgTextShowBp("数据源不能为空,请选择数据源!");
        inputFocus("#dataSource_bp")
        return false;
    }
    if (!passwd) {
        msgTextShowBp("密码不能为空,请输入密码!");
        inputFocus("#password_bp")
        return false;
    }
    return true;
}

// 提交
function verSubmit() {
    if (!checkTos() || !step_3_check() || !step_2_check() || !step_1_check()) {
        return false;
    }
    msgTextHide();
    //到最后一个
    $("button[data-step-type=pre]").hide();
    $("button[data-step-type=submit]").removeAttr("onclick");
    $("button[data-step-type=submit]").text("提交中...");
    $("button[data-step-type=submit]").css({color: "white", background: "var(--color-main)", cursor: "default"});
    $("#dataSource").removeAttr("disabled");
    setTimeout(function () {
        Cookies.remove(timeCookieName);
        $("#loginForm").submit();
    }, 500)
}

// 提交
function verSubmitBp() {
    if (!checkTosBp() || !step_3_check_bp() || !step_2_check_Bp() || !step_1_checkBp()) {
        return false;
    }
    msgTextHide();
    //到最后一个
    $("button[data-step-type=preBp]").hide();
    $("button[data-step-type=submitBp]").removeAttr("onclick");
    $("button[data-step-type=submitBp]").text("提交中...");
    $("button[data-step-type=submitBp]").css({color: "white", background: "var(--color-main)", cursor: "default"});
    $("#dataSource_bp").removeAttr("disabled");
    setTimeout(function () {
        Cookies.remove(timeCookieName);
        $("#boundForm").submit();
    }, 500)
}

// 想要获取的cook键值
var sourceCookie = this.getCookie('datasource.cookie');
//根据value值设置select的option选中
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

//工号一栏默认使用年月日+4位流水号
var date = new Date();
var currentTime = date.getUTCFullYear().toString() ;
var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
var randUsername = currentTime + month + day + Math.floor(Math.random() * 9000 + 1000);
$('#username').val(randUsername);
window.onload = function () {
    function jsSelectItemByValue(objSelect, objItemText) {
        for (var i = 0; i < objSelect.options.length; i++) {
            if (objSelect.options[i].value == objItemText) {
                objSelect.options[i].selected = true;
                break;
            }
        }
    }
    var selectedValue = sourceCookie;
    console.log(selectedValue)
    selectedValue.includes("-") ? selectedValue = selectedValue.split("-")[0] : ''
    jsSelectItemByValue(document.getElementById('dataSource_bp'),selectedValue);
    jsSelectItemByValue(document.getElementById('dataSource'),selectedValue);
    if(selectedValue == "limsproduct" || selectedValue == null || selectedValue == "" || $(`option[value=${selectedValue}]`).length === 0){
        document.getElementById('dataSource_bp').removeAttribute("disabled");
        document.getElementById('dataSource').removeAttribute("disabled");
    }else {
        document.getElementById('dataSource_bp').setAttribute("disabled","disabled");
        document.getElementById('dataSource').setAttribute("disabled","disabled");
    };
    if (selectedValue == "bedulims"){
        document.getElementById('dataSource').parentElement.style.display = "none";
    }
    if (dataSourceDtosSize === 1) {
        document.getElementById('dataSource_bp').parentElement.style.display = "none";
    }
    $('#cname').blur(function () {
        let cname = $("#cname").val();
        if(!inputReg.test(cname)){
            msgTextShow("姓名不能输入空格，请重新输入!");
            inputFocus("#cname")
            return false;
        } else {
            msgTextHide();
        }
    });
    $('#cname_bp').blur(function () {
        let cname = $("#cname_bp").val()
        if(!inputReg.test(cname)){
            msgTextShowBp("姓名不能输入空格，请重新输入!");
            inputFocus("#cname_bp")
            return false;
        } else {
            msgTextHide();
        }
    });
    $('#username').blur(function () {
        let username = $("input[id='username']").val();
        if(!inputReg.test(username)){
            msgTextShow("学号/工号不能输入空格，请重新输入!");
            inputFocus("#username")
            return false;
        } else {
            msgTextHide();
            // $("#username").blur();
        }
        if (inputRegCname.test(username)){
            msgTextShow("学号/工号不能使用中文!");
            inputFocus("#username")
            return false;
        }
        else {
            msgTextHide();
        }
    });
    $('#username_bp').blur(function () {
        let username = $("input[id='username_bp']").val();
        if(!inputReg.test(username)){
            msgTextShowBp("学号/工号不能输入空格，请重新输入!");
            inputFocus("#username_bp")
            return false;
        } else {
            msgTextHide();
        }
        if (inputRegCname.test(username)){
            msgTextShowBp("学号/工号不能使用中文!");
            inputFocus("#username_bp")
            return false;
        }
        else {
            msgTextHide();
        }
    });
}

function step_3_checkUserName() {
    let username = $("input[id='username']").val();
    let dataSource = $("#dataSource").val();
    let isPass = false;
    $.ajax({
        url: location.origin + "/uaa/checkUserExist",
        type: "GET",
        async: false,
        data: {
            username:username,
            schoolName:dataSource
        }, success: function (res) {
            if (res.data){
                msgTextShow("该学号/工号已存在!");
            }else {
                isPass = true;
            }
        },error:function(){
            msgTextShow("验证学号/工号是否存在时失败!");
            isPass = true;
        }
    })
    return isPass;
}
