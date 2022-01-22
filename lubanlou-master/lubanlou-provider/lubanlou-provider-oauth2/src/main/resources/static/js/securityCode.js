/**
 * 验证码的js
 * */
let timeCookieName = "timeTotal"

// 检测cookie
let timeTotal = Cookies.get(timeCookieName);
if (timeTotal != undefined && timeTotal != 'NaN' && timeTotal != 'null') {
    //cookie存在倒计时
    timeKeeping(+timeTotal)
}

// 获取验证码
function getSecurityCode(url, isResetPassword) {
    let phone = $("input[id='phone']").val();
    let testerPhone = $("input[id='tester_phone']").val();
    if (!phone) {
        msgTextShow("请输入手机号!");
        inputFocus("#phone");
    } else if (!phoneReg.test(phone)) {
        msgTextShow("请输入正确的手机格式!");
        inputFocus("#phone");
    } else {
        $(".code_btn").addClass("ibtn_disabled").attr("disabled", "disabled")
        $.ajax({
            type: 'GET',
            url: url ? url : "getSecurityCode",
            data: {
                phone: phone,
                isResetPassword: isResetPassword ? true : false,
                testerPhone: (testerPhone ? testerPhone : ""),
                schoolName: ($("#dataSource").val() ? $("#dataSource").val() : ""),
            },
            success: function (resultDataDto) {
                if (resultDataDto.code === 0) {
                    msgTextShow("发送成功，请注意查收!", 1);
                    timeKeeping(120);
                    listenCode();
                } else {
                    $(".code_btn").removeClass("ibtn_disabled").removeAttr("disabled")
                    msgTextShow("发送失败," + resultDataDto.msg);
                }
            },
            error: function () {
                msgTextShow("发送失败!");
                $(".code_btn").removeClass("ibtn_disabled").removeAttr("disabled")
            }
        });
    }
}
// 获取验证码(手机绑定学工号)
function getSecurityCodeBp(url, isResetPassword) {
    let phone = $("input[id='phone_bp']").val();
    let testerPhone = $("input[id='tester_phone_bp']").val();
    if (!phone) {
        msgTextShowBp("请输入手机号!");
        inputFocus("#phone_bp")
    } else if (!phoneReg.test(phone)) {
        msgTextShowBp("请输入正确的手机格式!");
        inputFocus("#phone_bp")
    } else {
        $(".code_btn").addClass("ibtn_disabled").attr("disabled", "disabled")
        $.ajax({
            type: 'GET',
            url: url ? url : "getSecurityCode",
            data: {
                phone: phone,
                isResetPassword: isResetPassword ? true : false,
                testerPhone: (testerPhone ? testerPhone : ""),
                schoolName: ($("#dataSource_bp").val() ? $("#dataSource_bp").val() : ""),
            },
            success: function (resultDataDto) {
                if (resultDataDto.code === 0) {
                    msgTextShowBp("发送成功，请注意查收!", 1);
                    timeKeeping();
                    listenCodeBp();
                } else {
                    $(".code_btn").removeClass("ibtn_disabled").removeAttr("disabled")
                    msgTextShowBp("发送失败," + resultDataDto.msg);
                }
            },
            error: function () {
                msgTextShowBp("发送失败!");
                $(".code_btn").removeClass("ibtn_disabled").removeAttr("disabled")
            }
        });
    }
}

// 验证码开始计时
function timeKeeping(num = 60) {
    // 等待60s 可自定义时间
    let codeBtnVal = $(".code_btn").val();
    $(".code_btn").addClass("ibtn_disabled").attr("disabled", "disabled").val(num + "s");
    let timer = setInterval(function () {
        --num;
        if (num === 0) {
            // 暂停计时器
            clearInterval(timer)
            Cookies.remove(timeCookieName);
            $(".code_btn").removeClass("ibtn_disabled").removeAttr("disabled").val(codeBtnVal);
        } else {
            $(".code_btn").val(num + "s");
            Cookies.set(timeCookieName, num);
        }
    }, 1000)
}

// 监听验证码
function listenCode() {
    let timer;
    document.querySelector("#login_code").addEventListener("input", function (e) {
        clearTimeout(timer);
        let val = e.srcElement.value
        if (val) {
            timer = setTimeout(function () {
                $.ajax({
                    type: "GET",
                    url: location.origin + "/uaa/checkSecurityCode",
                    data: {
                        securityCode: e.srcElement.value
                    }, success: function (data) {
                        if (data.msg == "success") {
                            msgTextShow("验证码输入正确", 1);
                        } else {
                            msgTextShow(data.msg);
                        }
                    }, error: function (err) {

                    }
                })
            }, 500)
        } else {
            msgTextHide();
        }
    })
}
// 监听验证码
function listenCodeBp() {
    let timer;
    document.querySelector("#login_code_bp").addEventListener("input", function (e) {
        clearTimeout(timer);
        let val = e.srcElement.value
        if (val) {
            timer = setTimeout(function () {
                $.ajax({
                    type: "GET",
                    url: location.origin + "/uaa/checkSecurityCode",
                    data: {
                        securityCode: e.srcElement.value
                    }, success: function (data) {
                        if (data.msg == "success") {
                            msgTextShowBp("验证码输入正确", 1);
                        } else {
                            msgTextShowBp(data.msg);
                        }
                    }, error: function (err) {

                    }
                })
            }, 500)
        } else {
            msgTextHide();
        }
    })
}
