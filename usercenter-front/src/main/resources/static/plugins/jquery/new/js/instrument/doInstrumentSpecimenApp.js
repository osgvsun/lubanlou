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
        "M+": this.getMonth() + 1, //??????
        "d+": this.getDate(), //???
        "h+": this.getHours(), //??????
        "m+": this.getMinutes(), //???
        "s+": this.getSeconds(), //???
        "q+": Math.floor((this.getMonth() + 3) / 3), //??????
        "S": this.getMilliseconds() //??????
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
    //??????name???num1??????????????????????????????????????????????????????name?????????num??????num1
    var num = $("input[name='num1']");
    var specimenName = $("#specimenName").val();
    var sentTim = $("#sentTime").val();
    var expectedTime = $("#expectedTime").val();
    var specimenNumber = $("#specimenNumber").val();

    var radios = $("input[name='getForm']:checked").val();
    if (radios == null) {
        alert("??????????????????????????????")
        return false;
    }

    if (specimenName == null || specimenName == "") {
        alert("?????????????????????")
        return false;
    }

    if (specimenNumber == null || specimenNumber === ''||specimenNumber==='0') {
        alert('???????????????????????????');
        return false;
    }

    if (sentTim == null || sentTim == "") {
        alert("?????????????????????")
        return false;
    }

    if (expectedTime == undefined || expectedTime == "") {
        alert("?????????????????????")
        return false;
    }
    var isNeedBilling = $("#isNeedBilling").val();

    if (isNeedBilling != null) {
        if (billingsValue == null) {
            alert("??????????????????")
            return false;
        }
        var flag = true;
        for (var i = 0; i < num.length; i++) {
            if (num[i].value == null || num[i].value == 0 || num[i].value == "") {
                flag = false;
            }
        }
        if (!flag) {
            alert('???????????????????????????');
            return false;
        }
        //???????????????????????????????????????????????????????????????????????????
        var count = 0;
        var nums = "";
        var array = new Array();
        for (var i = 0; i < num.length; i++) {
            var itemSpecimenNumber = num[i].value;
            count += parseInt(itemSpecimenNumber);
            array.push(itemSpecimenNumber);
        }
        //????????????????????????????????????????????????
        var isJudgeSampleNumber = $("#isJudgeSampleNumber").val();
        if (isJudgeSampleNumber == "yes") {
            if (count > parseInt(specimenNumber)) {
                alert('?????????????????????????????????????????????');
                return false;
            }
        } else if (isJudgeSampleNumber == "no") {

        }
        nums = array.join(",");
    }

    if (direction == null || direction == '') {
        alert("????????????????????????");
    } else {
        if (phone === null || phone === "" || !(/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(phone))) {
            alert("???????????????????????????????????????");
            return false;
        } else if (email === null || email === "" || !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email))) {
            alert("???????????????????????????????????????");
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
                        alert("???????????????????????????????????????");
                    }
                    if (data == "cant_reservation") {
                        alert("????????????????????????????????????????????????????????????????????????");
                    }
                    if (data == "teacherException") {
                        alert("????????????????????????????????????");
                    }
                    if (data == "overNumber") {
                        alert("???????????????????????????");
                    }
                    if (data == "cantOverdraft") {
                        alert("????????????,??????????????????");
                    }
                    if (data == "success") {
                        var str = $("#configbasicAttention").val();
                        var basicAttention = str.replace(/<[^>]+>/g, "");
                        // alert("??????????????? \n ???????????????:" + $("#viewInstrumentmgrCname").val() + " \n ???????????????:" + $("#mgrusertelephone").val() + "\n ????????????:" + basicAttention);
                        alert("??????????????? \n ???????????????:" + $("#viewInstrumentmgrCname").val() + " \n ???????????????:" + $("#mgrusertelephone").val());
                        window.location = "../instrument/instrumentAppList?currpage=1";
                    }
                    if (data == "error") {
                        alert("?????????????????????????????????????????????");
                    }
                    if (data == "cantAfford") {
                        alert("???????????????????????????");
                    }
                    if (data == 'noCommonTeam') {
                        alert('?????????????????????');
                    }
                },
                error: function () {
                    alert("?????????????????????");
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
        alert("????????????????????????");
    } else {
        if (phone === null || phone === "" || !(/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(phone))) {
            alert("???????????????????????????????????????");
            return false;
        } else if (email === null || email === "" || !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email))) {
            alert("???????????????????????????????????????");
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
                        alert("???????????????????????????????????????");
                    }
                    if (data == "cant_reservation") {
                        alert("????????????????????????????????????????????????????????????????????????");
                    }
                    if (data == "teacherException") {
                        alert("????????????????????????????????????");
                    }
                    if (data == "overNumber") {
                        alert("???????????????????????????");
                    }
                    if (data == "success") {
                        var str = $("#configbasicAttention").val();
                        var basicAttention = str.replace(/<[^>]+>/g, "");
                        alert("??????????????? \n ???????????????:" + $("#viewInstrumentmgrCname").val() + " \n ???????????????:" + $("#mgrusertelephone").val() + "\n ????????????:" + basicAttention);
                        window.location = "../website/instrumentShareing?currpage=1";
                    }
                    if (data == 'noCommonTeam') {
                        alert('?????????????????????');
                    }
                },
                error: function () {
                    alert("?????????????????????");
                }
            });
        }
    }
}

//??????????????????????????????
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
            // alert("???????????????");
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
        //alert("????????????????????????");
        //return false;
        //?????????false????????????true?????????????????????
        return true;
    }
    var yearStart1 = $('#sentTime').val();
    var yearEnd1 = $('#expectedTime').val();
    if (CompareDate(yearStart1, yearEnd1) == true) {
        alert("???????????????????????????????????????");
        return false;
    }
    $("#specimenDesc").val(specimenDesc);
    return true;
}

var layDateConfig;
layui.use("laydate", function () {
    var laydate = layui.laydate;
    //????????????laydate??????
    layDateConfig = laydate.render({
        elem: '#expectedTime', //????????????
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
                if (true) {//???????????????
                    if ($(this).hasClass("timeChosen")) {
                        alert("?????????!");
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
                        alert("??????????????????!");
                    }
                    if ($(this).hasClass("bgpink")) {
                        $("#sentTime").val("");
                        $("#expectedTime").val("");
                        alert("???????????????????????????!");
                    }
                    if ($(this).hasClass("bgyellow")) {
                        $("#sentTime").val("");
                        $("#expectedTime").val("");
                        alert("????????????????????????!");
                    }
                }
            });
        });
}

//??????????????????
function CompareDate(d1, d2) {
    return ((new Date(d1.replace(/-/g, "\/"))) > (new Date(d2.replace(/-/g, "\/"))));
}

function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//??????cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function expectBillingApp() {
    var insUid = $('#insUid').val();
    //????????????
    var allSpecimenNumber = document.getElementById("specimenNumber").value;
    if (allSpecimenNumber == null || allSpecimenNumber == '' || allSpecimenNumber == 0) {
        alert("?????????????????????");
        return false;
    }
    //??????????????????????????????
    var billings = document.getElementsByName("billing");
    for (var i = 0; i < billings.length; i++) {
        //??????????????????/??????
        //?????????????????????????????????
        if (billings[i].checked == true && document.getElementById('num' + billings[i].value).hidden == true) {
            document.getElementById('num' + billings[i].value).hidden = false;
            document.getElementById('num' + billings[i].value).name = 'num1';
        }
        //????????????????????????????????????
        if (billings[i].checked == false && document.getElementById('num' + billings[i].value).hidden == false) {
            document.getElementById('num' + billings[i].value).hidden = true;
            document.getElementById('num' + billings[i].value).name = 'num';
        }
        //??????????????????/??????
        if (billings[i].checked == true && document.getElementById('num' + billings[i].value).type == "hidden") {
            document.getElementById('num' + billings[i].value).name = 'num1';
        }
        if (billings[i].checked == false && document.getElementById('num' + billings[i].value).type == "hidden") {
            document.getElementById('num' + billings[i].value).name = 'num';
        }
    }
    //????????????????????????????????????????????????
    var isJudgeSampleNumber = $("#isJudgeSampleNumber").val();
    if (isJudgeSampleNumber == "yes") {
        var itemSpecimenNumber;
        var count = 0;
        //?????????????????????????????????
        var numss = document.getElementsByName("num1");
        for (var i = 0; i < numss.length; i++) {
            //????????????????????????
            itemSpecimenNumber = numss[i].value;
            if (itemSpecimenNumber != '' && itemSpecimenNumber != null) {
                //???????????????????????????
                count += parseInt(itemSpecimenNumber);
            }
        }
        if (count > parseInt(allSpecimenNumber)) {
            alert('?????????????????????????????????????????????');
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
                alert('?????????????????????????????????');
            } else {
                $("#expectBilling").val(data);
                $("#priceExpect").val(data);
            }

        },
        error: function () {
            alert("????????????????????????");
            // alert("????????????????????????");
        }
    });
}

function expectBillingForProject() {
    var insUid = $('#insUid').val();
    var pUid = $("#pUid").val();
    var allSpecimenNumber = document.getElementById("specimenNumber").value;
    if (allSpecimenNumber == null || allSpecimenNumber == '' || allSpecimenNumber == 0) {
        alert("?????????????????????");
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
                alert('?????????????????????????????????');
            } else {
                $("#expectBilling").val(data);
                $("#priceExpect").val(data);
            }

        },
        error: function () {
            alert("????????????????????????");
        }
    });
}

//????????????????????????
$(".save_sample_btn").click(function () {
    var hasChoose = false;
    var mustFlag = true;
    var chosePro = "";
    //?????????????????????
    var clickFlag = true;
    //???????????????
    $(".choose_property").find("input[type='checkbox']").each(function (i) {
        //?????????
        var sum = $(this).parent().parent().parent().siblings("th").html();
        if ($(this).prop('checked')) {//?????????????????? ?????????
            if (clickFlag) {
                chosePro += " " + sum + ":";
            }
            clickFlag = false;
        }
        if ($(this).prop('checked')) {//?????????????????? ?????????
            hasChoose = true;
            chosePro += $(this).siblings("label").html() + " ";
        }
    });
    $(".choose_property").find("input[type='radio']").each(function (i) {
        var sum = $(this).parent().parent().parent().siblings("th").html();
        if ($(this).prop('checked')) {//?????????????????? ?????????
            hasChoose = true;
            chosePro += " " + sum + ":";
            chosePro += $(this).siblings("label").html() + " ";
        }
    });
    $(".choose_property").find("input[type='text']").each(function (i) {
        var sum = $(this).parent().siblings("th").html();
        if ($(this).val() != "") {//?????????????????? ?????????
            hasChoose = true;
            chosePro += " " + sum + ":";
            chosePro += $(this).val() + " ";
        }
    });
    $(".choose_property").find("td[class='aProperty']").each(function (i) {
        $(this).find("input[type='checkbox']").each(function (j) {
            if ($(this).attr("data") == "(??????)") {
                if ($(this).prop('checked')) {//?????????????????? ?????????
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
    //???????????????????????????
    // $(".choose_property").find("input[type='checkbox']").each(function(i){
    //     if($(this).attr("data") == "(??????)"){
    //         if(!$(this).prop('checked')){//?????????????????? ?????????
    //             mustFlag=false;
    //         }
    //     }
    // });

    if (!mustFlag) {
        alert("???????????????????????????????????????????????????")
    } else {
        if (hasChoose == false) {
            alert("????????????????????????");
        }
        else {
            var $td = $("<th>????????????</th><td>" + chosePro + "</td>");
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

//????????????????????????????????????
// 1????????????????????????2?????????????????????
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

//????????????????????????????????????
function showChargeRole() {
    var isCreditLimitOrNot = $("#isCreditLimitOrNot").val();
    var isPrestoreOrNot = $("#isPrestoreOrNot").val();
    var personalOrTeam = "";
    //??????????????????
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
    //??????????????????
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
