$(function () {
    var date = new Date().format("yyyy-MM-dd").substring(0, 7).replace(/\//g, "-");
    $("#searchDate").val(date)
})
var searchDate = $("#searchDate").val();
var RoundTripController =
    {
        SearchRequest: {
            "searchDate": searchDate,
        },
        Language: "CN",
    };
var ConditionController = RoundTripController;
var dateline = new dateLine();
$('.form_date').datetimepicker({
    language: 'zh-CN',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    startDate: new Date(),
    forceParse: 0,
    format: 'yyyy-mm-dd'
}).on('changeDate', function (e) {
    console.log(e);
    var dateStr = dateline.getMonthString(new Date(e.date));
    console.log(dateStr);
    changeMonth(dateStr);
});
/*$(function(){
    var currdate = new Date($("#searchDate").val().replace(/-/g, "/"));
    var enddate = new Date(dateline.addDays(currdate,7));
    var i=0;
    while (currdate.valueOf() < enddate){
        var week;
        var date1;
        week = dateline.weekcn[currdate.getDay()];
        date1 = dateline.getDateString(currdate).substring(5);
        var tmpDate = dateline.getDateString(currdate);
        var owli = $("#flightlistnav").find("li[class=navcols]").eq(i);
        var $a = owli.find("a");
        $a.attr("data-href","../instrument/doInstrumentMachineApp?insUid="+$("#insUid").val()+"&searchDate="+tmpDate)
        var div = owli.find("div");
        div.html("<em value=" + tmpDate + ">" + date1 + "</em><em>&nbsp;(" + week + ")</em>");
        if(i==0){
            div.attr("class", "f_l_nb");
        }
        currdate.setUTCDate(currdate.getUTCDate() + 1);
        i++;
    }
})*/

$(function () {
    var cuurrdateStr = $("#searchDate").val().replace(/-/g, "/") + "/01";
    var currdate = new Date(cuurrdateStr);
    var enddateStr = dateline.addMonths(currdate, 7) + "/01";
    var enddate = new Date(enddateStr);
    var i = 0;
    while (currdate.valueOf() < enddate) {
        var date1;
        date1 = dateline.getMonthString(currdate);
        var tmpDate = dateline.getMonthString(currdate);
        var owli = $("#flightlistnav").find("li[class=navcols]").eq(i);
        var $a = owli.find("a");
        $a.attr("data-href", "../instrument/doInstrumentMachineApp?insUid=" + $("#insUid").val() + "&searchDate=" + tmpDate)
        var div = owli.find("div");
        div.html("<em value=" + tmpDate + ">" + date1 + "</em>");
        if (i == 0) {
            div.attr("class", "f_l_nb");
        }

        currdate.setMonth(currdate.getMonth() + 1);
        i++;
    }

})
$("#lowlistnav").on("click", ".navcols a", function () {
    var searchDate = $(this).find("div").find("em").attr("value");
    $("#searchDate").val(searchDate);
    changeMonth(searchDate);
    $(this).find("div").removeClass("f_l_na").addClass("f_l_nb");
    $(this).parent().siblings().find("a").find("div").removeClass("f_l_nb").addClass("f_l_na");
})


var resCount = 0;
var resId = 0;
var is_dater;
var is_table;
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$(document).ready(function (e) {
    var dateStr = dateline.getMonthString(new Date());
    console.log(dateStr);
    changeMonth(dateStr);
});


function getBillings(uid) {

    $.ajax({
        type: 'post',
        async: false,
        url: '../instrument/findConfigSpecimenBillingByItemUid?itemUid=' + uid,
        success: function (data) {

            console.log(data);
            $("#billings" + uid).html(data);
        },
        error: function () {
            alert("222");
        }
    });
}

function saveInstrumentSpecimenApp(insUid) {
    var pUid = $("#pUid").val();
    var specimenDesc = $("#specimenDesc").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var direction = $("#direction").val();
    var billingsValue = $("input[name='billing']:checked").val();
    var billings = $("input[name='billing']");
    var needTeacher = $("#needTeacher").val();
    //获取name为num1的标签，即勾选了的收费项将其输入框的name属性由num置为num1
    var num = $("input[name='num1']");
    var specimenName = $("#specimenName").val();
    var sentTim = $("#sentTime").val();
    var expectedTime = $("#expectedTime").val();
    var specimenNumber = $("#specimenNumber").val();

    var radios = $("input[name='getForm']:checked").val();
    if (radios == null) {
        alert("请选择取样形式！！！")
        return false;
    }

    if (specimenName == null || specimenName == "") {
        alert("请输入样品名称")
        return false;
    }

    if (specimenNumber == null || specimenNumber === ''||specimenNumber==='0') {
        alert('请先选择样品数量！');
        return false;
    }

    if (sentTim == null || sentTim == "") {
        alert("请选择送样时间")
        return false;
    }

    if (expectedTime == undefined || expectedTime == "") {
        alert("请选择期望时间")
        return false;
    }
    var isNeedBilling = $("#isNeedBilling").val();

    if (isNeedBilling != null) {
        if (billingsValue == null) {
            alert("请选择项目！")
            return false;
        }
        var flag = true;
        for (var i = 0; i < num.length; i++) {
            if (num[i].value == null || num[i].value == 0 || num[i].value == "") {
                flag = false;
            }
        }
        if (!flag) {
            alert('请填写收费项数量！');
            return false;
        }
        //针对存在项目收费项时，项目样品总数不可大于送样总数
        var count = 0;
        var nums = "";
        var array = new Array();
        for (var i = 0; i < num.length; i++) {
            var itemSpecimenNumber = num[i].value;
            count += parseInt(itemSpecimenNumber);
            array.push(itemSpecimenNumber);
        }
        //江苏理工需求：不需要判断样品总数
        var isJudgeSampleNumber = $("#isJudgeSampleNumber").val();
        if (isJudgeSampleNumber == "yes") {
            if (count > parseInt(specimenNumber)) {
                alert('项目样品总数量不能大于样品总数');
                return false;
            }
        } else if (isJudgeSampleNumber == "no") {

        }
        nums = array.join(",");
    }

    if (direction == null || direction == '') {
        alert("请填写使用方向！");
    } else {
        if (phone === null || phone === "" || !(/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(phone))) {
            alert("请填写格式正确的电话号码！");
            return false;
        } else if (email === null || email === "" || !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email))) {
            alert("请填写格式正确的邮箱地址！");
            return false;
        } else if (checkExtend(insUid)) {
            var labRoomAdminUsername = $("#labRoomAdminUsername").val();
            var sentTime = $('#sentTime').val();
            var expectedTime = $('#expectedTime').val();
            var searchDate = sentTime + "," + expectedTime;
            var isChargePersonalOrTeam = "";
            var isCreditLimitOrPrestore = "";
            if (($("#isCreditLimitOrNotPersonal").val() === 'yes' && $("#isCreditLimitOrNotTeam").val() === 'yes' && $("#isCreditLimitOrNot").val() === 'yes') || ($("#isPrestoreOrNotPersonal").val() === 'yes' && $("#isPrestoreOrNotTeam").val() === 'yes' && $("#isPrestoreOrNot").val() === 'yes')) {
                var display = $("#personalAndTeam").css('display');
                if (display != 'none') {
                    if (isChargePersonal.checked) {
                        isChargePersonalOrTeam = "isChargePersonal";
                    }
                    if (isChargeTeam.checked) {
                        isChargePersonalOrTeam = "isChargeTeam";
                    }
                } else {
                    $("td[id^='isChargePersonalOrTeam']").each(function (i) {
                        var display = $(this).parent().css('display');
                        if (display != "none") {
                            isChargePersonalOrTeam = $(this).attr("value");
                        }
                    })
                }
            } else {
                $("td[id^='isChargePersonalOrTeam']").each(function (i) {
                    var display = $(this).parent().css('display');
                    if (display != "none") {
                        isChargePersonalOrTeam = $(this).attr("value");
                    }
                })
            }
            if ($("#isCreditLimitOrNot").val() === 'yes' && $("#isPrestoreOrNot").val() === 'yes') {
                if (isCreditLimit.checked) {
                    isCreditLimitOrPrestore = "isCreditLimit";
                }
                if (isPrestore.checked) {
                    isCreditLimitOrPrestore = "isPrestore";
                }
            } else {
                isCreditLimitOrPrestore = $("#isCreditLimitOrPrestore").attr("value");
            }

            $.ajax({
                type: 'post',
                async: false,
                url: '../instrument/saveInstrumentSpecimenApp?insUid=' + insUid + '&schoolDeviceNumber=' + labRoomAdminUsername + '&searchDate=' + searchDate + '&needTeacher=' + needTeacher + '&pUid=' + pUid,
                data: $.param({
                    'isChargePersonalOrTeam': isChargePersonalOrTeam,
                    'isCreditLimitOrPrestore': isCreditLimitOrPrestore,
                    'specimenDesc': specimenDesc,
                    'num1': nums
                }) + '&' + $("form").serialize(),
                success: function (data) {
                    if (data == "lackLabRoomAdminUser") {
                        alert("本实验室没有实验室管理员！");
                    }
                    if (data == "cant_reservation") {
                        alert("该仪器没有被管理员初始化，不可预约，请联系管理员");
                    }
                    if (data == "teacherException") {
                        alert("请输入或选择正确的教师！");
                    }
                    if (data == "overNumber") {
                        alert("预约数量超出上限！");
                    }
                    if (data == "cantOverdraft") {
                        alert("扣款失败,透支额度不足");
                    }
                    if (data == "success") {
                        var str = $("#configbasicAttention").val();
                        var basicAttention = str.replace(/<[^>]+>/g, "");
                        // alert("提交成功！ \n 管理员名字:" + $("#viewInstrumentmgrCname").val() + " \n 管理员电话:" + $("#mgrusertelephone").val() + "\n 注意事项:" + basicAttention);
                        alert("提交成功！ \n 管理员名字:" + $("#viewInstrumentmgrCname").val() + " \n 管理员电话:" + $("#mgrusertelephone").val());
                        window.location = "../instrument/instrumentAppList?currpage=1";
                    }
                    if (data == "error") {
                        alert("扣款失败，请确认课题组是否选择");
                    }
                    if (data == "cantAfford") {
                        alert("扣款失败，余额不足");
                    }
                    if (data == 'noCommonTeam') {
                        alert('请选择课题组！');
                    }
                },
                error: function () {
                    alert("字段填写有误！");
                }
            });
        }
    }
}

function saveInstrumentSpecimenAppForSharing(insUid) {
    var phone = $("#phone").val();
    var email = $("#email").val();
    var direction = $("#direction").val();
    if (direction == null || direction == '') {
        alert("请填写项目名称！");
    } else {
        if (phone === null || phone === "" || !(/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(phone))) {
            alert("请填写格式正确的电话号码！");
            return false;
        } else if (email === null || email === "" || !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email))) {
            alert("请填写格式正确的邮箱地址！");
            return false;
        } else if (checkExtend(insUid)) {
            var labRoomAdminUsername = $("#labRoomAdminUsername").val();
            var sentTime = $('#sentTime').val();
            var expectedTime = $('#expectedTime').val();
            var searchDate = sentTime + "," + expectedTime;

            $.ajax({
                type: 'post',
                async: false,
                url: '../instrument/saveInstrumentSpecimenApp?insUid=' + insUid + '&schoolDeviceNumber=' + labRoomAdminUsername + '&searchDate=' + searchDate,
                data: $("form").serialize(),
                success: function (data) {
                    if (data == "lackLabRoomAdminUser") {
                        alert("本实验室没有实验室管理员！");
                    }
                    if (data == "cant_reservation") {
                        alert("该仪器没有被管理员初始化，不可预约，请联系管理员");
                    }
                    if (data == "teacherException") {
                        alert("请输入或选择正确的教师！");
                    }
                    if (data == "overNumber") {
                        alert("预约数量超出上限！");
                    }
                    if (data == "success") {
                        var str = $("#configbasicAttention").val();
                        var basicAttention = str.replace(/<[^>]+>/g, "");
                        alert("提交成功！ \n 管理员名字:" + $("#viewInstrumentmgrCname").val() + " \n 管理员电话:" + $("#mgrusertelephone").val() + "\n 注意事项:" + basicAttention);
                        window.location = "../website/instrumentShareing?currpage=1";
                    }
                    if (data == 'noCommonTeam') {
                        alert('请选择课题组！');
                    }
                },
                error: function () {
                    alert("字段填写有误！");
                }
            });
        }
    }
}

//检查保存样品描述信息
function checkExtend(insUid) {
    var specimenDesc = "";
    var list;
    $.ajax({
        type: 'post',
        async: false,
        url: '../instrument/findConfigSpecimenExtendList?insUid=' + insUid,
        success: function (data) {
            list = data;
        },
        error: function () {
            // alert("缺少字段！");
        }
    });
    var flag = 1;
    for (var i = 0; i < list.length; i++) {
        if (list[i].style == 2) {
            specimenDesc = specimenDesc + list[i].name + ":" + $('#' + list[i].uid).val() + ";";
            if ($('#' + list[i].uid).val() == '') {
                flag = 0;
            }
        }
        if (list[i].style == 0) {
            var radio = document.getElementsByName("" + list[i].uid);
            for (var j = 0; j < radio.length; j++) {
                if (radio[j].checked) {
                    specimenDesc = specimenDesc + list[i].name + ":" + radio[j].value + ";";
                }
            }
            if (radio.length <= 0) {
                flag = 0;
            }
        }
        if (list[i].style == 1) {
            var checkbox = document.getElementsByName("" + list[i].uid);
            specimenDesc = specimenDesc + list[i].name + ":{";
            for (var k = 0; k < checkbox.length; k++) {
                if (checkbox[k].checked) {
                    specimenDesc = specimenDesc + checkbox[k].value + ",";
                }
            }
            specimenDesc = specimenDesc.substring(0, specimenDesc.length - 1);
            specimenDesc = specimenDesc + "};";
            if (checkbox.length <= 0) {
                flag = 0;
            }
        }
    }
    if (flag == 0) {
        //alert("样品描述不完整！");
        //return false;
        //之前是false，现统一true，一定进入方法
        return true;
    }
    var yearStart1 = $('#sentTime').val();
    var yearEnd1 = $('#expectedTime').val();
    if (CompareDate(yearStart1, yearEnd1) == true) {
        alert("送样时间不能大于期望时间！");
        return false;
    }
    $("#specimenDesc").val(specimenDesc);
    return true;
}

var layDateConfig;
layui.use("laydate", function () {
    var laydate = layui.laydate;
    //执行一个laydate实例
    layDateConfig = laydate.render({
        elem: '#expectedTime', //指定元素
        min: 0,
        btns: ['clear', 'confirm']
    });
});

function changeMonth(dateStr) {
    $('#orderMonth').empty();
    var postdate = dateStr.substring(0, 7);
    $.get("../instrument/getInstrumentSpecimenAppValidDate?configUid=" + $("#configId").val() + "&postdate=" + postdate,
        function (jsonData) {
            data = jsonData;
            var datestr = dateStr;
            var currdate = new Date(datestr);
            is_table = new iStyle_TimeMonth(currdate);
            is_table.load(data, currdate, null);
            $(".timeDiv").click(function () {
                var time = $(this).children(".timespan").html();
                if (true) {//之后需判冲
                    if ($(this).hasClass("timeChosen")) {
                        alert("已选择!");
                    }
                    else {
                        if ($(this).hasClass("bggreen")) {
                            $(this).addClass("timeChosen");
                        }
                        $(this).siblings().removeClass("timeChosen")
                        var currDate = $("#searchDate").val();
                        if (time.length == 1) {
                            time = currDate.substring(0, 8) + "-0" + time;
                        }
                        else {
                            time = currDate.substring(0, 8) + "-" + time;
                        }
                        resCount++;
                        resId++;
                        $("#sentTime").val(time);
                        $("#expectedTime").val(time);
                        var expectedTimedate = new Date(time);
                        layDateConfig.config.min = {
                            year: expectedTimedate.getFullYear(),
                            month: expectedTimedate.getMonth(),
                            date: expectedTimedate.getDate()
                        };
                    }
                    if ($(this).hasClass("bggrey")) {
                        $("#sentTime").val("");
                        $("#expectedTime").val("");
                        alert("不可送样时间!");
                    }
                    if ($(this).hasClass("bgpink")) {
                        $("#sentTime").val("");
                        $("#expectedTime").val("");
                        alert("已达可接收样品上限!");
                    }
                    if ($(this).hasClass("bgyellow")) {
                        $("#sentTime").val("");
                        $("#expectedTime").val("");
                        alert("该时间当前不可选!");
                    }
                }
            });
        });
}

//比较日期大小
function CompareDate(d1, d2) {
    return ((new Date(d1.replace(/-/g, "\/"))) > (new Date(d2.replace(/-/g, "\/"))));
}

function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function expectBillingApp() {
    var insUid = $('#insUid').val();
    //样品总数
    var allSpecimenNumber = document.getElementById("specimenNumber").value;
    if (allSpecimenNumber == null || allSpecimenNumber == '' || allSpecimenNumber == 0) {
        alert("请输入样品总数");
        return false;
    }
    //每个项目底下的小项数
    var billings = document.getElementsByName("billing");
    for (var i = 0; i < billings.length; i++) {
        //对于单位为元/样的
        //选中该小项则显示输入框
        if (billings[i].checked == true && document.getElementById('num' + billings[i].value).hidden == true) {
            document.getElementById('num' + billings[i].value).hidden = false;
            document.getElementById('num' + billings[i].value).name = 'num1';
        }
        //未选中该小项则隐藏文本框
        if (billings[i].checked == false && document.getElementById('num' + billings[i].value).hidden == false) {
            document.getElementById('num' + billings[i].value).hidden = true;
            document.getElementById('num' + billings[i].value).name = 'num';
        }
        //对于单位为元/次的
        if (billings[i].checked == true && document.getElementById('num' + billings[i].value).type == "hidden") {
            document.getElementById('num' + billings[i].value).name = 'num1';
        }
        if (billings[i].checked == false && document.getElementById('num' + billings[i].value).type == "hidden") {
            document.getElementById('num' + billings[i].value).name = 'num';
        }
    }
    //江苏理工需求：不需要判断样品总数
    var isJudgeSampleNumber = $("#isJudgeSampleNumber").val();
    if (isJudgeSampleNumber == "yes") {
        var itemSpecimenNumber;
        var count = 0;
        //小项的样品数文本框个数
        var numss = document.getElementsByName("num1");
        for (var i = 0; i < numss.length; i++) {
            //每个小项的样品数
            itemSpecimenNumber = numss[i].value;
            if (itemSpecimenNumber != '' && itemSpecimenNumber != null) {
                //所有小项样品数之和
                count += parseInt(itemSpecimenNumber);
            }
        }
        if (count > parseInt(allSpecimenNumber)) {
            alert('项目样品数之和不能大于样品总数');
            return false;
        }
    } else if (isJudgeSampleNumber == "no") {

    }

    $.ajax({
        type: 'post',
        dataType: "text",
        async: false,
        url: '../instrument/expectBillingApp?insUid=' + insUid + '&type=' + 2,
        data: $("form").serialize(),
        success: function (data) {
            // alert(data)
            if (data == 'numInvalid') {
                alert('填写的数量有误或未填写');
            } else {
                $("#expectBilling").val(data);
                $("#priceExpect").val(data);
            }

        },
        error: function () {
            alert("先填写样品数量！");
            // alert("发生了一个错误！");
        }
    });
}

function expectBillingForProject() {
    var insUid = $('#insUid').val();
    var pUid = $("#pUid").val();
    var allSpecimenNumber = document.getElementById("specimenNumber").value;
    if (allSpecimenNumber == null || allSpecimenNumber == '' || allSpecimenNumber == 0) {
        alert("请输入样品总数");
        return false;
    }
    $.ajax({
        type: 'post',
        dataType: "text",
        async: false,
        url: '../instrument/expectBillingForProject?allSpecimenNumber=' + allSpecimenNumber + '&pUid=' + pUid,
        data: $("form").serialize(),
        success: function (data) {
            // alert(data)
            if (data == 'numInvalid') {
                alert('填写的数量有误或未填写');
            } else {
                $("#expectBilling").val(data);
                $("#priceExpect").val(data);
            }

        },
        error: function () {
            alert("先填写样品数量！");
        }
    });
}

//保存样品送检属性
$(".save_sample_btn").click(function () {
    var hasChoose = false;
    var mustFlag = true;
    var chosePro = "";
    //判断是否要添加
    var clickFlag = true;
    //判断多选框
    $(".choose_property").find("input[type='checkbox']").each(function (i) {
        //项目名
        var sum = $(this).parent().parent().parent().siblings("th").html();
        if ($(this).prop('checked')) {//获取是否选中 并判断
            if (clickFlag) {
                chosePro += " " + sum + ":";
            }
            clickFlag = false;
        }
        if ($(this).prop('checked')) {//获取是否选中 并判断
            hasChoose = true;
            chosePro += $(this).siblings("label").html() + " ";
        }
    });
    $(".choose_property").find("input[type='radio']").each(function (i) {
        var sum = $(this).parent().parent().parent().siblings("th").html();
        if ($(this).prop('checked')) {//获取是否选中 并判断
            hasChoose = true;
            chosePro += " " + sum + ":";
            chosePro += $(this).siblings("label").html() + " ";
        }
    });
    $(".choose_property").find("input[type='text']").each(function (i) {
        var sum = $(this).parent().siblings("th").html();
        if ($(this).val() != "") {//获取是否选中 并判断
            hasChoose = true;
            chosePro += " " + sum + ":";
            chosePro += $(this).val() + " ";
        }
    });
    $(".choose_property").find("td[class='aProperty']").each(function (i) {
        $(this).find("input[type='checkbox']").each(function (j) {
            if ($(this).attr("data") == "(必填)") {
                if ($(this).prop('checked')) {//获取是否选中 并判断
                    mustFlag = true;
                } else {
                    mustFlag = false;
                    return false;
                }
            }
        })
        if (mustFlag) {
            return false;
        }
    });
    //判断多选框必填选项
    // $(".choose_property").find("input[type='checkbox']").each(function(i){
    //     if($(this).attr("data") == "(必填)"){
    //         if(!$(this).prop('checked')){//获取是否选中 并判断
    //             mustFlag=false;
    //         }
    //     }
    // });

    if (!mustFlag) {
        alert("不符合必选送检属性，不可预约该设备")
    } else {
        if (hasChoose == false) {
            alert("请先选择样品属性");
        }
        else {
            var $td = $("<th>样品属性</th><td>" + chosePro + "</td>");
            $("#samplePro").append($td);
            $("#specimenDesc").val("" + chosePro);
            $(".black-overlay").css("display", "none");
            $("#samplePro").css("display", "none");
        }
    }
})

function load() {
    showChargeRole();
}

//选择收费模式获取收费主体
// 1是信誉额度模式，2是预存缴费模式
function getChargeRole(chargeRoleFlag) {
    var isPersonal = "yes";
    var isTeam = "yes";
    if (chargeRoleFlag == 1) {
        isPersonal = $("#isCreditLimitOrNotPersonal").val();
        isTeam = $("#isCreditLimitOrNotTeam").val();
    }
    else if (chargeRoleFlag == 2) {
        isPersonal = $("#isPrestoreOrNotPersonal").val();
        isTeam = $("#isPrestoreOrNotTeam").val();
    }
    if (isPersonal == "yes" && isTeam == "yes") {
        $("#personalAndTeam").css("display", "");
        $("#personal").css("display", "none");
        $("#team").css("display", "none");
    }
    else if (isPersonal == "yes" && isTeam == "no") {
        $("#personal").css("display", "");
        $("#personalAndTeam").css("display", "none");
        $("#team").css("display", "none");
    }
    else if (isPersonal == "no" && isTeam == "yes") {
        $("#team").css("display", "");
        $("#personalAndTeam").css("display", "none");
        $("#personal").css("display", "none");
    } else if (isPersonal == "no" && isTeam == "no") {
        $("#personalAndTeam").css("display", "none");
        $("#personal").css("display", "none");
        $("#team").css("display", "none");
    }
}

//根据收费模式显示收费主体
function showChargeRole() {
    var isCreditLimitOrNot = $("#isCreditLimitOrNot").val();
    var isPrestoreOrNot = $("#isPrestoreOrNot").val();
    var personalOrTeam = "";
    //信誉额度模式
    if (isCreditLimitOrNot == "yes" && isPrestoreOrNot == "no") {
        personalOrTeam = "isCreditLimitOrNot";
        $("#personalAndTeamDetail").val(personalOrTeam);
        var isCreditLimitOrNotPersonal = $("#isCreditLimitOrNotPersonal").val();
        var isCreditLimitOrNotTeam = $("#isCreditLimitOrNotTeam").val();
        if (isCreditLimitOrNotPersonal == "yes" && isCreditLimitOrNotTeam == "yes") {
            $("#personalAndTeam").css("display", "");
            $("#personal").hide();
            $("#team").hide();
        } else if (isCreditLimitOrNotPersonal == "yes" && isCreditLimitOrNotTeam == "no") {
            $("#personal").css("display", "");
            $("#personalAndTeam").hide();
            $("#team").hide();
        } else if (isCreditLimitOrNotPersonal == "no" && isCreditLimitOrNotTeam == "yes") {
            $("#team").css("display", "");
            $("#personalAndTeam").hide();
            $("#personal").hide();
        }
    }
    //预存缴费模式
    else if (isCreditLimitOrNot == "no" && isPrestoreOrNot == "yes") {
        var isPrestoreOrNotPersonal = $("#isPrestoreOrNotPersonal").val();
        var isPrestoreOrNotTeam = $("#isPrestoreOrNotTeam").val();
        if (isPrestoreOrNotPersonal == "yes" && isPrestoreOrNotTeam == "yes") {
            $("#personalAndTeam").css("display", "");
            $("#personal").hide();
            $("#team").hide();
        } else if (isPrestoreOrNotPersonal == "yes" && isPrestoreOrNotTeam == "no") {
            $("#personal").css("display", "");
            $("#personalAndTeam").hide();
            $("#team").hide();
        } else if (isPrestoreOrNotPersonal == "no" && isPrestoreOrNotTeam == "yes") {
            $("#team").css("display", "");
            $("#personalAndTeam").hide();
            $("#personal").hide();
        }
    }
}
