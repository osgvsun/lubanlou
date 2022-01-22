/*window.setInterval(function(){
    var t=$(window.parent).scrollTop()-85;
    var offsetTop = $('#orderDiv').offset().top-50;
    var htmlheight = window.innerHeight;
    var boxheight = $(".right_table").height();
    var dHeight = htmlheight - boxheight;
    if(t>= offsetTop && t< dHeight){

        $(".right_table").css({"position":"fixed",
            "width":"27%",
            "right":"5%",
            "top":t+"px",
            "height":"510px"});
    }else{
        $(".right_table").css({"width":"30%",
            "position":"relative",
            "top":"0",
            "right":"0",
            "height":"auto"});
    }
},500);*/
//定义的变量
var openTimeList;
var openTimeCantList;
var labRoomLimitTime;
var resCount = 0;
var resId = 0;
var is_dater;
var is_table;
var configMachineLeverSecond;
var minBiggerThanMax;
var data = [
    {"id": 11, "date": "2017-07-27", "purpose": "金相分析", "startTime": "13:00", "endTime": "17:00", "user": "10103724"},
    {"id": 1, "date": "2017-07-27", "startTime": "13:00", "endTime": "15:00", "user": "curr"},
    {"id": 23, "date": "2017-07-27", "startTime": "11:00", "endTime": "13:00", "user": "curr"},
    {"id": 17, "date": "2017-07-27", "purpose": "金相分析", "startTime": "1:00", "endTime": "5:00", "user": "curruser"}

]
var data1 = [
    {"id": 11, "date": "2017-07-27", "purpose": "金相分析", "startTime": "1:00", "endTime": "5:00", "user": "curruser"},
    {"id": 1, "date": "2017-07-27", "startTime": "13:00", "endTime": "15:00", "user": "curr"},
    {"id": 23, "date": "2017-07-27", "startTime": "11:00", "endTime": "13:00", "user": "curr"}
]

var jsonData = {
    "total": 4,
    "rows": [
        {
            "description": "排课及预约",
            "deviceNumber": "20110135",
            "startDate": "2017-09-11 08:25:00",
            "endDate": "2017-09-11 11:25:00",
            "labRoomId": null
        },
        {
            "description": "排课及预约",
            "deviceNumber": "20110135",
            "startDate": "2018-09-12 08:25:00",
            "endDate": "2018-09-12 09:45:00",
            "labRoomId": null
        },
        {
            "description": "排课及预约",
            "deviceNumber": "20110135",
            "startDate": "2018-09-19 08:25:00",
            "endDate": "2018-09-19 09:45:00",
            "labRoomId": null
        },
        {
            "description": "排课及预约",
            "deviceNumber": "20110135",
            "startDate": "2018-09-26 08:25:00",
            "endDate": "2018-09-26 09:45:00",
            "labRoomId": null
        }
    ]
}
var searchDates = $("#searchDate").val();
var RoundTripController =
    {
        SearchRequest: {
            "searchDate": searchDates,
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
    console.log($("#insUid").val());
    console.log(e);
    var dateStr = dateline.getDateString(e.date);
    console.log(dateStr);
    $("#searchDate").val(dateStr)
    setCookie("searchDate", document.getElementById("searchDate").value);
    //window.location.href="?searchDate='"+dateStr+"'";
    var myData = {
        "searchData": $("#searchDate").val(),
        "insUid": $("#insUid").val()
    }
    $.ajax({
        type: 'post',
        async: false,
        data: myData,
        url: "../instrument/changeInstrumentMachineAppDate",
        success: function (data) {
            console.log(data);
            document.getElementById("searchDate").value = data.searchDate;
            //initdate();
            changeDays();
            initdate();
        },
        error: function () {
            initdate();
            //window.location.reload();
        }
    })


});

function initdate() {
    var currdate = new Date($("#searchDate").val().replace(/-/g, "/"));
    var enddate = new Date(dateline.addDays(currdate, 7));
    var i = 0;

    while (currdate.valueOf() < enddate) {
        var week;
        var date1;
        week = dateline.weekcn[currdate.getDay()];
        date1 = dateline.getDateString(currdate).substring(5);
        var tmpDate = dateline.getDateString(currdate);
        var owli = $("#flightlistnav").find("li[class=navcols]").eq(i);
        var $a = owli.find("a");
        // $a.attr("data-href","../instrument/changeInstrumentMachineAppDate")

        var div = owli.find("div");
        div.html("<em value=" + tmpDate + ">" + date1 + "</em><em>&nbsp;(" + week + ")</em>");
        if (i == 0) {
            div.attr("class", "f_l_nb");
        }

        currdate.setUTCDate(currdate.getUTCDate() + 1);
        i++;
    }
}

$("#lowlistnav").on("click", ".navcols a", function () {
    var dateStr = $(this).find("em").eq(0).attr("value");
    $("#searchDate").val(dateStr)
    $(this).find("div").addClass("f_l_nb").removeClass("f_l_na");
    $(this).parent().siblings().find("a").find("div").removeClass("f_l_nb").addClass("f_l_na")
    var $href = $(this).attr("data-href");
    setCookie("searchDate", document.getElementById("searchDate").value);
    var myData = {
        "searchData": $("#searchDate").val(),
        "insUid": $("#insUid").val()
    }
    $.ajax({
        type: 'post',
        async: false,
        data: myData,
        url: "../instrument/changeInstrumentMachineAppDate",
        success: function (data) {
            document.getElementById("searchDate").value = data.searchDate;
            document.getElementById("minAheadHour").innerText = data.minAheadHour;
            document.getElementById("maxAheadHour").innerText = data.maxAheadHour;
            changeDays();
        },
        error: function () {

        }
    })
})

var date1 = getCookie("searchDate");
if (date1 == null || date1 == "") {
    date1 = new Date();
} else {
    date1 = new Date(date1);
}
// var startH = Number(openTimeList[0].startTime.substring(0,2));
// var startM = Number(openTimeList[0].startTime.substring(3,5));
// var endH = Number(openTimeList[0].endTime.substring(0,2));
// var endM = Number(openTimeList[0].endTime.substring(3,5));

var startH = 0;
var startM = 0;
var endH = 24;
var endM = 0;
// var timeArea=getOpenTimeArea(openTimeList);
// var timeAreaArray=timeArea.split("$");
date1.setHours(startH, startM)
// date1.setHours(timeAreaArray[0],timeAreaArray[1]);
var date2 = new Date();
date2.setHours(endH, endM);
// date2.setHours(timeAreaArray[2],timeAreaArray[3]);

var interval = $("#timeLineInterval").val() * 60;
$(document).ready(function (e) {
    var existLabRoomAdmin = $("#existLabRoomAdmin").val();
    if (existLabRoomAdmin == "true") {

    } else {
        //alert("本实验室没有实验室管理员！");
    }
    setCookie("searchDate", "");
    initdate();
    changeDays();
    hideForDelay();
    //如果有预热，提示需提前进行仪器预热
    var isPreheat = $("#isPreheat").val();//是否需要预热
    var preheatTime=$("#preheatTime").val();//预热的时长
    var appOriginalUid = "";
    appOriginalUid = $("#appOriginalUid").val();
    if(isPreheat==='1'&&preheatTime!==""&&appOriginalUid===""){
        alert("该仪器需要提前"+preheatTime+"小时进行仪器预热操作！");
    }
});

function isOtherExist(before, after) {
    for (var i = before + 1; i < after; i++) {
        var obj = document.getElementById('timeDiv' + i);
        if (obj.className != "timeDiv timeChosen bggreen" && obj.className != "timeDiv bggrey") {
            return true;
        }
    }
    return false;
}

function getTime(insUid) {
    var searchDateChosen = $("#searchDate").val();
    var divNum = parseInt((24 - 0) * 60 / interval);
    for (var i = 0; i < divNum; i++) {
        var obj5 = document.getElementById('timeDiv' + i);
        if (obj5.className == "timeDiv timeChosen bggreen") {
            var time = obj5.firstElementChild.innerText;
            var $span1 = $("<span>" + time + "</span>");
            var $i = $("<i class='fa fa-times r close' title='关闭'></i>");
            var $selectTime = $("<input name='selectTime' type='hidden' value='" + time + "'/>");
            var $div = $("<div></div>");
            $div.append($selectTime);
            $div.append($span1);
            $div.append($i);
            var $divNew = $("<div class='course_select sample' id='d" + i + "'></div>");
            $divNew.append($div);
            $(".public_message").find(".sample:last").after($divNew);
        }
    }
    $.ajax({
        type: 'post',
        async: false,
        url: '../instrument/getBeginAndEndTime?insUid=' + insUid + '&searchDate=' + searchDateChosen,
        data: $('form').serialize(),
        success: function (data) {
            $("#beginAndEnd").val(data);
        }
    });
}

function getApiTimetableTable() {
    var arr = new Object();
    var beginAndEnd = $("#beginAndEnd").val();
    // arr.deviceNumber=$("#deviceNumber").val();
    // arr.startDate=beginAndEnd.split("/")[0];
    // arr.endDate=beginAndEnd.split("/")[1];
    // arr.labRoomId=-1;
    var deviceNumber = $("#deviceNumber").val();
    var startDate = beginAndEnd.split("/")[0];
    var endDate = beginAndEnd.split("/")[1];
    var labRoomId = -1
    var arrs = JSON.stringify(arr);
    var arrss = encodeURIComponent(encodeURIComponent(arrs));
    var mydata = {
        "deviceNumber": deviceNumber,
        "startDate": startDate,
        "endDate": endDate,
        "labRoomId": labRoomId
    }
    $.ajax({
        url: "../instrument/apiTimetableTable",
        // contentType: "application/json;charset=utf-8",
        // dataType: "jsonp",
        // jsonp:"callback",
        type: "post",
        async: false,
        data: mydata,
        success: function (json) {
            if (json.responseText == "no") {
                alert("所选择的实训室资源冲突，请重新选择或者用调整排课操作，谢谢。");
                isConflict = 0;
            }
        },
        error: function () {
            if (jsonData.responseText == "no") {
                alert("所选择的实训室资源冲突，请重新选择或者用调整预约时间，谢谢。");
                isConflict = 0;
            }
        }
    });
}


function saveInstrumentMachineApp(insUid) {
    // getTime(insUid);
    // //项目预约
    // getApiTimetableTable();
    var pUid = "";
    pUid = $("#pUid").val();
    // return false;
    //校外送样检测
    var nonschoolAppUid = "";
    nonschoolAppUid = $("#nonschoolAppUid").val();
    //延时
    var appOriginalUid = "";
    appOriginalUid = $("#appOriginalUid").val();
    var maxDelay = "";
    maxDelay = $("#maxDelay").val();
    //预约时长
    if ($("#durationHours").val() == 0) {
        alert("请选择预约时长！！！");
        return false;
    }
    if (appOriginalUid != "") {
        if (maxDelay < $("#durationHours").val() * 60) {
            alert("选择时间大于最大可延时时间");
            return false;
        }
    }
    var isNeedRepairApp = $('input:radio[name="isNeedRepairApp"]:checked').val();
    var isNeedChargeItem = $("input[name ='items1']").val();
    var items2 = [];
    //判断是否存在收费项目
    if (isNeedChargeItem != null && appOriginalUid == "") {
        //单选收费
        var items1 = $("input[name ='items1']:checked").val();
        console.log(items1);
        if (items1 == null) {
            alert("请选择主收费项")
            return false;
        }
        //多选收费
        var flag = true;
        $('input[name="items2"]:checked').each(function () {
            var item = $(this).val();
            items2.push(item);
            var number = $("#" + item).val().toString();
            if (number == "") {
                alert("请填写数量");
                //这里return false没用 只会对each()里的方法有效，还会继续执行
                flag = false;
            }
            items2.push(number);

        });
        if (!flag) {
            return false;
        }
    }

    // 其他预约内容模块
    var isAppMoreInformation = $("#isAppMoreInformation").val();
    var isSubmit = true;
    if ("yes" === isAppMoreInformation && appOriginalUid === "") {
        $.ajax({
            url: "../config/getAppInformationField?insUid=" + insUid,
            type: 'get',
            async: false,
            success: function (e) {
                if (e != "") {
                    var appInformationFieldArray = JSON.parse(e);
                    for (var i = 0; i < appInformationFieldArray.length; i++) {
                        if(appInformationFieldArray[i].necessary == "1"){
                            if($('#information_'+appInformationFieldArray[i].uid).val() == ""){
                                alert("请输入其他内容必填项");
                                isSubmit = false;
                                return;
                            }
                        }
                    }
                }
            }
        });
    }
    if(!isSubmit){
        return;
    }

    var searchDateChosen = $("#searchDate").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var reservationFlag = getCookie("reservationFlag");
    if ((phone === null || phone === "" || !(/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(phone))) && appOriginalUid == "") {
        alert("请填写格式正确的电话号码！");
        return false;
    } else if ((email === null || email === "" || !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email)) && appOriginalUid == "")) {
        alert("请填写格式正确的邮箱地址！");
        return false;
    } else if (reservationFlag == "lower") {
        alert("少于最少预约时间块，无法预约！");
    } else if (reservationFlag == "larger") {
        alert("大于最多预约时间块，无法预约！");
    }
    else {
        var teacher = $("#teacher").val();
        var needTeacherAudit = $("#needTeacherAudits").val();
        if (needTeacherAudit == '1' && (teacher == null || teacher == '') && appOriginalUid == "") {
            alert("请选择导师！");
        } else {
            var direction = $("#direction").val();
            var content = $("#content").val();
                if (isNeedRepairApp == 1 && appOriginalUid == "") {
                    content = "未填写内容";
                }
                var isZhiyuanHonorsProgramStudent = $("#isZhiyuanHonorsProgramStudent").val();
                if(isZhiyuanHonorsProgramStudent=="yes") {
                    var isHonorStudent = $('input[name="isHonorStudent"]:checked').val();
                    if (isHonorStudent == null) {
                        alert("请选择是否为在读致远荣誉计划学生");
                        return false;
                    }
                }
                var specimenNumber = $("#specimenNumber").val();
                if ((specimenNumber == null || specimenNumber == '') && appOriginalUid == "") {
                    alert("请输入样品总数");
                    return false;
                }
                if ((content == null || content == '') && appOriginalUid == "") {
                    alert("请填写预约内容！");
                } else {
                    var divNum = parseInt((24 - 0) * 60 / interval);
                    for (var i = 0; i < divNum; i++) {
                        var obj5 = document.getElementById('timeDiv' + i);
                        if (obj5.className == "timeDiv timeChosen bggreen") {
                            var time = obj5.firstElementChild.innerText;
                            var $span1 = $("<span>" + time + "</span>");
                            var $i = $("<i class='fa fa-times r close' title='关闭'></i>");
                            var $selectTime = $("<input name='selectTime' type='hidden' value='" + time + "'/>");
                            var $div = $("<div></div>");
                            $div.append($selectTime);
                            $div.append($span1);
                            $div.append($i);
                            var $divNew = $("<div class='course_select sample' id='d" + i + "'></div>");
                            $divNew.append($div);
                            $(".public_message").find(".sample:last").after($divNew);
                        }
                    }
                    var currDate = $("#iStyle_DateViewer").val();
                    var labRoomAdminUsername = $("#labRoomAdminUsername").val();
                    var needTeacher = $("#needTeacher").val();
                    var machineFirstAudit = $("#machineFirstAudit").val();
                    var needTeamHeader = $("#needTeamHeader").val();
                    var needLabManager = $("#needLabManager").val();
                    var needExCenterDirector = $("#needExCenterDirector").val();
                    var needEquipmentAdmin = $("#needEquipmentAdmin").val();
                    var authority = $("#authority").val();
                    var isChargePersonalOrTeam = "";
                    var isCreditLimitOrPrestore = "";
                    // 判断是个人还是课题组
                    if (($("#isCreditLimitOrNotPersonal").val() === 'yes' && $("#isCreditLimitOrNotTeam").val() === 'yes' && $("#isCreditLimitOrNot").val() === 'yes') || ($("#isPrestoreOrNotPersonal").val() === 'yes' && $("#isPrestoreOrNotTeam").val() === 'yes' && $("#isPrestoreOrNot").val() === 'yes')) {
                        var display = $("#personalAndTeam").css('display');
                        if (display != 'none') {
                            if (isChargePersonal.checked) {
                                isChargePersonalOrTeam = "isChargePersonal";
                            }
                            if (isChargeTeam.checked) {
                                isChargePersonalOrTeam = "isChargeTeam";
                            }
                            if (isChargePersonal.checked == false && isChargeTeam.checked == false) {
                                alert("请选择收费主体")
                                return false;
                            }
                        } else {
                            $("span[id^='isChargePersonalOrTeam']").each(function (i) {
                                var display = $(this).parent().css('display');
                                if (display != "none") {
                                    isChargePersonalOrTeam = $(this).attr("value");
                                }
                            })
                        }
                    } else {
                        $("span[id^='isChargePersonalOrTeam']").each(function (i) {
                            var display = $(this).parent().css('display');
                            if (display != "none") {
                                isChargePersonalOrTeam = $(this).attr("value");
                            }
                        })
                        // isChargePersonalOrTeam=$("#isChargePersonalOrTeam").attr("value");
                    }
                    //判断信誉额度还是预存缴费
                    if (($("#isCreditLimitOrNot").val() === 'yes' && $("#isPrestoreOrNot").val() === 'yes') && appOriginalUid == "") {
                        if (isCreditLimit.checked) {
                            isCreditLimitOrPrestore = "isCreditLimit";
                        }
                        if (isPrestore.checked) {
                            isCreditLimitOrPrestore = "isPrestore";
                        }
                        if (isCreditLimit.checked == false && isPrestore.checked == false) {
                            alert("请选择收费模式");
                            return false;
                        }
                    } else {
                        isCreditLimitOrPrestore = $("#isCreditLimitOrPrestore").attr("value");
                    }
                    if (((needTeacher == 'true' && $("#minAheadByTutorValue").val() != "无限制")&&isChargePersonalOrTeam=='isChargeTeam' || (needTeamHeader == 'true' && $("#minAheadByTutorValue").val() != "无限制")) && appOriginalUid == "" && isChargePersonalOrTeam == 'isChargeTeam') {
                        alert("请预约的同学注意，此设备需要导师/课题组负责人审核并且要在" + $("#minAheadByTutorValue").val() + "小时内审核，否则超时，自动拒绝审核,请及时提醒导师进行审核工作！");
                    }
                    //如果有预热，提示需提前进行仪器预热
                    var isPreheat = $("#isPreheat").val();//是否需要预热
                    var preheatTime=$("#preheatTime").val();//预热的时长
                    $.ajax({
                        type: 'post',
                        async: false,
                        url: '../instrument/saveInstrumentMachineApp?insUid=' + insUid + '&schoolDeviceNumber=' + labRoomAdminUsername + '&searchDate=' + searchDateChosen + '&needTeacherAudit=' + needTeacher + '&needTeamHeaderAudit=' + needTeamHeader + '&pUid=' + pUid + '&nonschoolAppUid=' + nonschoolAppUid + '&appOriginalUid=' + appOriginalUid,
                        data: $.param({
                            'isNeedRepairApp': isNeedRepairApp,
                            'isChargePersonalOrTeam': isChargePersonalOrTeam,
                            'isCreditLimitOrPrestore': isCreditLimitOrPrestore,
                            'needLabManager': needLabManager,
                            'needExCenterDirector': needExCenterDirector,
                            'needEquipmentAdmin': needEquipmentAdmin,
                            'item1': items1,
                            'item2': items2.toString(),
                            'isZhiyuanHonorsProgramStudent':isZhiyuanHonorsProgramStudent,
                            'isHonorStudent':isHonorStudent
                        }) + "&" + $('form').serialize(),
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
                            if (data == "conflict") {
                                alert("该时间段已有人选择");
                                window.location.reload();
                            }
                            if (data == "notEnough") {
                                alert("该设备需要预热，请预留足够的预热时间");
                                window.location.reload();
                            }
                            if (data == "success") {
                                var str = $("#configbasicAttention").val();
                                var basicAttention = str.replace(/<[^>]+>/g, "");
                                if(isPreheat==1&&preheatTime!==""&&appOriginalUid==""){
                                    alert("请预约的同学注意，此设备需要预热，请提前"+preheatTime+"小时进行到达实验室进行仪器预热操作！");
                                }
                                // alert("提交成功！ \n 管理员名字:" + $("#viewInstrumentmgrCname").val() + " \n 管理员电话:" + $("#mgrusertelephone").val() + "\n 注意事项:" + basicAttention);
                                alert("提交成功！ \n 管理员名字:" + $("#viewInstrumentmgrCname").val() + " \n 管理员电话:" + $("#mgrusertelephone").val());
                                if (pUid != "" && pUid != "null") {//回到项目预约
                                    window.location = "../project/viewProjectAppStat?pAppUid=" + pUid;
                                } else {//非项目预约来
                                    window.location = "../instrument/instrumentAppList?currpage=1";
                                }
                            }
                            if (data == "configMachineNotExist") {
                                alert("没有正确设置机时预约相关参数，程序出错了！");
                            }
                            if (data == "error") {
                                alert("扣款失败，请确认课题组是否选择");
                            }
                            if (data == "cantAfford") {
                                alert("扣款失败，余额不足");
                            }
                            if (data == 'cantOverdraft') {
                                alert('扣款失败,透支额度不足');
                            }
                            if (data == 'noCommonTeam') {
                                alert('请选择课题组！');
                            }
                            if (data == 'noSpecimenNumber') {
                                alert('请填写样品总数！');
                            }

                        },
                        error: function () {
                            alert("缺少字段或本实验室没有实验室管理员或程序出错！");
                        }
                    });
                }
            }
    }

}

//设备管理员机时预约
function saveInstrumentMachineApp1(insUid) {
    var pUid = "";
    pUid = $("#pUid").val();
    //校外送样检测
    var nonschoolAppUid = "";
    nonschoolAppUid = $("#nonschoolAppUid").val();
    //送样检测
    var specimenAppUid = "";
    specimenAppUid = $("#specimenAppUid").val();
    var isSpecimen = "";
    isSpecimen = $("#isSpecimen").val();
    var searchDateChosen = $("#searchDate").val();
    var reservationFlag = getCookie("reservationFlag");
    var isNeedRepairApp = $('input:radio[name="isNeedRepairApp"]:checked').val();
    if (isSpecimen == "true") {
        isNeedRepairApp = -1;
    }
    var isChargePersonalOrTeam = "";
    var isCreditLimitOrPrestore = "";
    if (reservationFlag == "lower") {
        alert("少于最少预约时间块，无法预约！");
    } else if (reservationFlag == "larger") {
        alert("大于最多预约时间块，无法预约！");
    }
    else {
        //var teacher=$("#teacher").val();
        if (false) {
            alert("请选择导师！");
        } else {
            var timeArea = getOpenTimeArea(openTimeList);
            var timeAreaArray = timeArea.split("$");
            var divNum = parseInt((24 - 0) * 60 / interval);
            // var divNum=parseInt(
            //     (
            //     parseInt(timeAreaArray[2])-parseInt(timeAreaArray[0])
            //     )
            //     *60/interval);
            for (var i = 0; i < divNum; i++) {
                var obj5 = document.getElementById('timeDiv' + i);
                if (obj5.className == "timeDiv timeChosen bggreen") {
                    var time = obj5.firstElementChild.innerText;
                    var $span1 = $("<span>" + time + "</span>");
                    var $i = $("<i class='fa fa-times r close' title='关闭'></i>");
                    var $selectTime = $("<input name='selectTime' type='hidden' value='" + time + "'/>");
                    var $div = $("<div></div>");
                    $div.append($selectTime);
                    $div.append($span1);
                    $div.append($i);
                    var $divNew = $("<div class='course_select sample' id='d" + i + "'></div>");
                    $divNew.append($div);
                    $(".public_message").find(".sample:last").after($divNew);
                }
            }
            var currDate = $("#iStyle_DateViewer").val();
            var labRoomAdminUsername = $("#labRoomAdminUsername").val();
            var machineFirstAudit = $("#machineFirstAudit").val();
            var needTeacher = $("#needTeacher").val();
            var needTeamHeader = $("#needTeamHeader").val();
            var needLabManager = $("#needLabManager").val();
            var needExCenterDirector = $("#needExCenterDirector").val();
            var needEquipmentAdmin = $("#needEquipmentAdmin").val();
            var authority = $("#authority").val();
            if ($("#minAheadByTutorValue").val() != "无限制" && authority != "EQUIPMENTADMIN" && authority != "SUPERADMIN") {
                alert("请预约的同学注意，此设备需要导师/课题组负责人审核并且要在" + $("#minAheadByTutorValue").val() + "小时内审核，否则超时，自动拒绝审核,请及时提醒导师进行审核工作！");
            }
            $.ajax({
                type: 'post',
                async: false,
                url: '../instrument/saveInstrumentMachineApp?insUid=' + insUid + '&schoolDeviceNumber=' + labRoomAdminUsername + '&searchDate=' + searchDateChosen + '&needTeacherAudit=' + needTeacher + '&needTeamHeaderAudit=' + needTeamHeader + '&pUid=' + pUid + '&nonschoolAppUid=' + nonschoolAppUid + '&specimenAppUid=' + specimenAppUid,
                data: $.param({
                    'isNeedRepairApp': isNeedRepairApp,
                    'isChargePersonalOrTeam': isChargePersonalOrTeam,
                    'isCreditLimitOrPrestore': isCreditLimitOrPrestore,
                    'needLabManager': needLabManager,
                    'needExCenterDirector': needExCenterDirector,
                    'needEquipmentAdmin': needEquipmentAdmin
                }) + "&" + $('form').serialize(),
                success: function (data) {
                    if (data == "lackLabRoomAdminUser") {
                        alert("本实验室没有实验室管理员，不可预约!");
                    }
                    if (data == "noLabManager") {
                        alert("本实验室没有实验室管理员，不可预约");
                    }
                    if (data == "cant_reservation") {
                        alert("该仪器没有被管理员初始化，不可预约，请联系管理员");
                    }
                    if (data == "success") {
                        if (pUid != "" && pUid != "null") {//回到项目预约
                            window.location = "../project/newProjectApp?currpage=1&pAppUid=" + pUid;
                        } else {//非项目预约来
                            window.location = "../instrument/instrumentAppList?currpage=1";
                        }
                    }
                    //送样检测的仪器预约
                    if (data == "specimenSuccess") {
                        window.location = "../instrument/confirmSpecimen?uid=" + specimenAppUid;
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
                    alert("缺少字段或本实验室没有实验室管理员或程序出错！");
                }
            });
        }

    }

}

function deleteRes(id) {
    $("#d" + id).remove();
    resCount--;
    //预约时长
    $("#duration").html((resCount * $("#timeLineInterval").val()) + "小时");
    $("#durationHours").val(resCount * $("#timeLineInterval").val());
}

Date.prototype.DateAdd = function (strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
        case 's' :
            return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'n' :
            return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h' :
            return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd' :
            return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w' :
            return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q' :
            return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm' :
            return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y' :
            return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
}

function beforeWeek() {
    if (element.find("em").attr("class") == "disable") {
        alert("sas");
    } else {
        var time = document.getElementById("searchDate").value;
        var tmp = new Date(time).DateAdd('h', -8).DateAdd('w', -1).Format("yyyy-MM-dd");
        document.getElementById("searchDate").value = tmp;
        setCookie("searchDate", document.getElementById("searchDate").value);
        changeDays();
    }

}

function nextWeek() {
    var time = document.getElementById("searchDate").value;
    var tmp = new Date(time).DateAdd('h', -8).DateAdd('w', 1).Format("yyyy-MM-dd");
    document.getElementById("searchDate").value = tmp;
    setCookie("searchDate", document.getElementById("searchDate").value);
    changeDays();
}

function changeDays() {
    // ajax获取该设备的机时预约记录
    $('#orderDiv').empty();
    var date1 = getCookie("searchDate");
    if (date1 == null || date1 == "") {
        date1 = new Date();
    } else {
        date1 = new Date(date1);
    }
    $.get("../instrument/getInstrumentMachineAppList?configUid=" + $("#configId").val(),
        function (jsonData) {
            data = jsonData;
            //开始小时
            var startH = 0;
            //开始分钟
            var startM = 0;
            //结束小时
            var endH = 24;
            //结束分钟
            var endM = 0;
            // var startH = Number(openTimeList[0].startTime.substring(0,2));
            // var startM = Number(openTimeList[0].startTime.substring(3,5));
            // var endH = Number(openTimeList[0].endTime.substring(0,2));
            // var endM = Number(openTimeList[0].endTime.substring(3,5));
            // date1.setHours(startH,startM)
            // var date2 = new Date();
            // date2.setHours(endH,endM);
            // var timeArea=getOpenTimeArea(openTimeList);
            // var timeAreaArray=timeArea.split("$");
            //开始的时间（年月日时分）
            date1.setHours(startH, startM)
//             date1.setHours(timeAreaArray[0],timeAreaArray[1]);
            var date2 = new Date();
            //结束的时间（年月日时分）
            date2.setHours(endH, endM);
//             date2.setHours(timeAreaArray[2],timeAreaArray[3]);
            //is_dater = new iStyle_LineDatepicker("#iStyle_DateViewer","");
            is_table = new iStyle_TimeDiv(date1, date2, interval);
            var thisUser = document.getElementById("usernames").value;
            //把已经预约的时间块上色
            is_table.load(data, date1, thisUser);

            // window.parent.reinitIframe();

            //总的时间块
            var divNum = parseInt((24 - 0) * 60 / interval);
            //  var divNum=parseInt(
            //      (
            //          parseInt(timeAreaArray[2])-parseInt(timeAreaArray[0])
            //      )
            //      *60/interval);

            //全部被不能用
            for (var i = 0; i < divNum; i++) {
                var obj = document.getElementById('timeDiv' + i);
                if (obj.className == "timeDiv bggrey") {
                    document.getElementById('timeDiv' + i).className = "timeDiv bgred";
                }
            }
            //当前时间
            var currDateString = $("#searchDate").val();
            //时间块开始的时间（年月日时分）
            var currDate = new Date($("#searchDate").val().replace(/-/g, "\/") + " 00:00").Format("yyyy-MM-dd hh:mm");
            //选择的日期（年月日）
            var chooseDate = $("#searchDate").val();
            var openTimeFlag = false;
            var openTimeNot = "";
            //循环设置的开放时间list
            for (var i = 0; i < openTimeList.length; i++) {
                //这里的加一秒和减一秒是为了比较
                //开放时间的开始
                var DateEnd = new Date(openTimeList[i].endDate.replace(/-/g, "\/") + " 00:01").Format("yyyy-MM-dd hh:mm");
                //开放时间的结束
                var DateStart = new Date(openTimeList[i].startDate.replace(/-/g, "\/") + " 00:00").DateAdd('s', -1).Format("yyyy-MM-dd hh:mm");
                //开放的周几
                var weeks = openTimeList[i].weeks;
                //var currWeek=new Date(openTimeList[i].startDate+" 00:00").getDay();
                //当前周几
                var currWeek = new Date(chooseDate.replace(/-/g, "\/")).getDay();
                if (currWeek == 0) {
                    currWeek = 7;
                }
                //判断是否在这个星期范围之内
                if (weeks.indexOf(currWeek) != -1) {
                    //如果当前时间在开放时间内，则进行操作，否则不必开放
                    if (CompareDate(DateEnd, currDate) && CompareDate(currDate, DateStart)) {
                        //具体开放时间（几点几分）
                        //当前开放的开始时间（几点几分）
                        var openTimeThatDayStringBegin = new Date((currDateString + " " + openTimeList[i].startTime).replace(/-/g, "\/")).Format("yyyy-MM-dd hh:mm");
                        //当前开放的结束时间（几点几分）
                        var openTimeThatDayStringEnd = new Date((currDateString + " " + openTimeList[i].endTime).replace(/-/g, "\/")).Format("yyyy-MM-dd hh:mm");
                        //开始放色块
                        //把开放时间块放开
                        for (var j = 0; j < divNum; j++) {
                            var tmp = new Date(chooseDate.replace(/-/g, "\/")).DateAdd('n', j * interval).Format("yyyy-MM-dd hh:mm");
                            if (CompareDate(tmp, openTimeThatDayStringBegin) && CompareDate2(openTimeThatDayStringEnd, tmp)) {
                                var obj = document.getElementById('timeDiv' + j);
                                if (obj.className == "timeDiv bgred") {
                                    document.getElementById('timeDiv' + j).className = "timeDiv bggrey";
                                }
                            }
                        }
                        openTimeFlag = true;
                    }
                }
            }
            var notOpenFlag = true;
            //循环设置的禁止时间list
            for (var i = 0; i < openTimeCantList.length; i++) {
                //禁止时间的开始与结束
                //这里的加一秒和减一秒是为了比较
                var DateEnd = new Date(openTimeCantList[i].endDate.replace(/-/g, "\/") + " 00:01").Format("yyyy-MM-dd hh:mm");
                var DateStart = new Date(openTimeCantList[i].startDate.replace(/-/g, "\/") + " 00:00").DateAdd('s', -1).Format("yyyy-MM-dd hh:mm");
                var weeks = openTimeCantList[i].weeks;
                // var currWeek=new Date(openTimeCantList[i].startDate+" 00:00").getDay();
                // if(currWeek == 0){
                //     currWeek=7;
                // }else{
                //     currWeek++;
                // }
                var currWeek = new Date(chooseDate.replace(/-/g, "\/")).getDay();
                if (currWeek == 0) {
                    currWeek = 7;
                }
                //判断是否在这个星期范围之内
                if (weeks.indexOf(currWeek) != -1) {
                    //如果当前时间在开放时间内，则进行操作，否则不必开放
                    if (CompareDate(DateEnd, currDate) && CompareDate(currDate, DateStart)) {
                        notOpenFlag = false;
                        //具体开放时间
                        var openTimeThatDayStringBegin = new Date((currDateString + " " + openTimeCantList[i].startTime).replace(/-/g, "\/")).Format("yyyy-MM-dd hh:mm");
                        var openTimeThatDayStringEnd = new Date((currDateString + " " + openTimeCantList[i].endTime).replace(/-/g, "\/")).Format("yyyy-MM-dd hh:mm");
                        console.log(openTimeThatDayStringBegin);
                        console.log(openTimeThatDayStringEnd);
                        //开始放色块
                        for (var j = 0; j < divNum; j++) {
                            var tmp = new Date(chooseDate.replace(/-/g, "\/")).DateAdd('n', j * interval).Format("yyyy-MM-dd hh:mm");
                            if (CompareDate(tmp, openTimeThatDayStringBegin) && CompareDate(openTimeThatDayStringEnd, tmp)) {
                                var obj = document.getElementById('timeDiv' + j);
                                if (obj.className == "timeDiv bggrey") {
                                    document.getElementById('timeDiv' + j).className = "timeDiv bgred";
                                }
                            }
                        }
                        openTimeNot += " " + openTimeCantList[i].startTime + "~" + openTimeCantList[i].endTime;
                    }
                }
            }
            // 设备管理员本人 不受开放时间限制
            if ($("#mgr").val() == "1") {
                openTimeFlag = true;
                notOpenFlag = true;
            }
            if (!openTimeFlag) {
                alert("注意！今日不开放！");
            }
            if (!notOpenFlag && openTimeFlag) {
                alert("注意！今日不开放时间为：" + openTimeNot);
            }
            var limitExist = false;
            //labroomlimittime
            for (var i = 0; i < labRoomLimitTime.length; i++) {
                var start = new Date(labRoomLimitTime[i][0].replace(/-/g, "\/")).Format("yyyy-MM-dd hh:mm");
                var end = new Date(labRoomLimitTime[i][1].replace(/-/g, "\/")).Format("yyyy-MM-dd hh:mm");
                // alert(start);
                // alert(end);
                var chooseDate = $("#searchDate").val();
                for (var j = 0; j < divNum; j++) {
                    var tmp = new Date(chooseDate.replace(/-/g, "\/")).DateAdd('h', -8).DateAdd('n', j * interval).Format("yyyy-MM-dd hh:mm");
                    if (CompareDate(tmp, start) && CompareDate(end, tmp)) {
                        limitExist = true;
                        var obj = document.getElementById('timeDiv' + j);
                        if (obj.className == "timeDiv bggrey") {
                            document.getElementById('timeDiv' + j).className = "timeDiv bgred";

                        }
                    }
                }
            }
            if (limitExist) {
                alert("注意！今日有部分时间因为上课的原因无法预约！");
            }
            //去掉不可预约的点
            //是否延时
            var applyDelay = $("#applyDelay").val();
            var minAheadHour = $("#minAheadHour").text() * 60;
            if (applyDelay == "true") {
                minAheadHour = 0;
            }
            var maxAheadHour = $("#maxAheadHour").text() * 60;
            var chooseDate = $("#searchDate").val();
            //根据当前时间、最少、最大提前预约时间算出来的可以预约的时间段
            var startAppTime = new Date().DateAdd('n', minAheadHour).Format("yyyy-MM-dd hh:mm");
            var endAppTime = new Date().DateAdd('n', maxAheadHour).Format("yyyy-MM-dd hh:mm");
            for (var i = 0; i < divNum; i++) {
                var tmp = new Date(chooseDate).DateAdd('h', -8).DateAdd('n', i * interval).Format("yyyy-MM-dd hh:mm");
                if (CompareDate(startAppTime, tmp) || CompareDate(tmp, endAppTime)) {
                    var obj = document.getElementById('timeDiv' + i);
                    if (obj.className == "timeDiv bggrey") {
                        document.getElementById('timeDiv' + i).className = "timeDiv bgred";
                    }

                }
            }
            //中医药周五17:00后不可预约
            var isStudentCantAppOnSaturdayAndSunday = $("#isStudentCantAppOnSaturdayAndSunday").val();
            var authorityName = $("#authority").val();
            //当前登录时间
            var currentTime = new Date();
            var currentDay = currentTime.getDay();
            if (isStudentCantAppOnSaturdayAndSunday == "yes" && authorityName == "STUDENT" && currentDay != 2 && currentDay != 3 && currentDay != 4) {
                var currentDate = currentTime.Format("yyyy-MM-dd");
                var currentHour = currentTime.getHours();
                if (currentDay == 0) {
                    currentDay = 7;
                }
                var closeTimeBegin;
                var closeTimeEnd;
                var endDate;
                var searchDate = $("#searchDate").val();
                //周五17:00后机时预约
                if (currentDay == 5 && currentHour >= 17) {
                    endDate = new Date(currentDate).DateAdd('d', 3).Format("yyyy-MM-dd");
                    closeTimeBegin = new Date((currentDate + " " + "17:00:00").replace(/-/g, "\/")).Format("yyyy-MM-dd hh:mm");
                    closeTimeEnd = new Date((endDate + " " + "07:59:00").replace(/-/g, "\/")).Format("yyyy-MM-dd hh:mm");
                    for (var i = 0; i < divNum; i++) {
                        var tmp = new Date(searchDate.replace(/-/g, "\/")).DateAdd('n', i * interval).Format("yyyy-MM-dd hh:mm");
                        if (CompareDate(tmp, closeTimeBegin) && CompareDate(closeTimeEnd, tmp)) {
                            var obj = document.getElementById('timeDiv' + i);
                            if (obj.className == "timeDiv bggrey") {
                                document.getElementById('timeDiv' + i).className = "timeDiv bgred";
                            }
                        }
                    }
                }
                //周六机时预约
                else if (currentDay == 6) {
                    endDate = new Date(currentDate).DateAdd('d', 2).Format("yyyy-MM-dd");
                    closeTimeBegin = new Date((currentDate + " " + "00:00:00").replace(/-/g, "\/")).Format("yyyy-MM-dd hh:mm");
                    closeTimeEnd = new Date((endDate + " " + "07:59:00").replace(/-/g, "\/")).Format("yyyy-MM-dd hh:mm");
                    for (var i = 0; i < divNum; i++) {
                        var tmp = new Date(searchDate.replace(/-/g, "\/")).DateAdd('n', i * interval).Format("yyyy-MM-dd hh:mm");
                        if (CompareDate(tmp, closeTimeBegin) && CompareDate(closeTimeEnd, tmp)) {
                            var obj = document.getElementById('timeDiv' + i);
                            if (obj.className == "timeDiv bggrey") {
                                document.getElementById('timeDiv' + i).className = "timeDiv bgred";
                            }
                        }
                    }
                }
                //周日机时预约
                else if (currentDay == 7) {
                    endDate = new Date(currentDate).DateAdd('d', 1).Format("yyyy-MM-dd");
                    closeTimeBegin = new Date((currentDate + " " + "00:00:00").replace(/-/g, "\/")).Format("yyyy-MM-dd hh:mm");
                    closeTimeEnd = new Date((endDate + " " + "07:59:00").replace(/-/g, "\/")).Format("yyyy-MM-dd hh:mm");
                    for (var i = 0; i < divNum; i++) {
                        var tmp = new Date(searchDate.replace(/-/g, "\/")).DateAdd('n', i * interval).Format("yyyy-MM-dd hh:mm");
                        if (CompareDate(tmp, closeTimeBegin) && CompareDate(closeTimeEnd, tmp)) {
                            var obj = document.getElementById('timeDiv' + i);
                            if (obj.className == "timeDiv bggrey") {
                                document.getElementById('timeDiv' + i).className = "timeDiv bgred";
                            }
                        }
                    }
                }
                //周一08:00前机时预约
                else if (currentDay == 1) {
                    closeTimeBegin = new Date((currentDate + " " + "00:00:00").replace(/-/g, "\/")).Format("yyyy-MM-dd hh:mm");
                    closeTimeEnd = new Date((currentDate + " " + "07:59:00").replace(/-/g, "\/")).Format("yyyy-MM-dd hh:mm");
                    for (var i = 0; i < divNum; i++) {
                        var tmp = new Date(searchDate.replace(/-/g, "\/")).DateAdd('n', i * interval).Format("yyyy-MM-dd hh:mm");
                        if (CompareDate(tmp, closeTimeBegin) && CompareDate(closeTimeEnd, tmp)) {
                            var obj = document.getElementById('timeDiv' + i);
                            if (obj.className == "timeDiv bggrey") {
                                document.getElementById('timeDiv' + i).className = "timeDiv bgred";
                            }
                        }
                    }
                }
            }
            //是普通用户，该仪器设置存在导师或课题组审核且设置了提前审核时间
            //普通用户延时无需审核，跳过审核提前时间
            if ($("#mgr").val() != "1" && $("#minAheadByTutorValue").val() != "无限制" && applyDelay != "true") {
                if ($("#needTeacher").val() == 'true' || $("#needTeamHeader").val() == 'true') {
                    //导师课题组负责人提前审核时间
                    var cantAppTimeInterval = $("#minAheadByTutorValue").val();
                    //获取不能预约的时间节点（当前时间点加上审核需要的时间点）
                    var sta = new Date().DateAdd('h', cantAppTimeInterval).format("yyyy-MM-dd hh:mm");
                    //这里使得普通用户不能预约未超过提前审核时间的时间块
                    for (var i = 0; i < divNum; i++) {
                        var temp = new Date(chooseDate).DateAdd('h', -8).DateAdd('n', i * interval).format("yyyy-MM-dd hh:mm");
                        if (CompareDate(sta, temp)) {
                            var obj = document.getElementById('timeDiv' + i);
                            if (obj.className == "timeDiv bggrey") {
                                obj.className = "timeDiv bgred";
                            }
                        }
                    }
                }
            }
            //机时预约延时只开放到最大可延时时间
            if(applyDelay=="true"){
                //单位：分钟
                var maxDelay = $("#maxDelay").val();
                var applyDelayEndTime = $("#applyDelayEndTime").val();
                var startTime = new Date(applyDelayEndTime).DateAdd('n', maxDelay).format("yyyy-MM-dd hh:mm");
                for (var i = 0; i < divNum; i++) {
                    var temp = new Date(chooseDate).DateAdd('h', -8).DateAdd('n', i * interval).format("yyyy-MM-dd hh:mm");
                    if (CompareDate(temp, startTime)) {
                        var obj = document.getElementById('timeDiv' + i);
                        if (obj.className == "timeDiv bggrey") {
                            obj.className = "timeDiv bgred";
                        }
                    }
                }
            }
            // 设置管理员可以预约普通人员不能预约的时间段（仪器开放时间设置中的最少提前预约时间段）
            if ($("#mgr").val() == "1") {
                //获取当前时间
                var sta = new Date().format("yyyy-MM-dd hh:mm");
                //这里使得本设备管理员，超级管理员，在当前时间之后，除过有人预约的模块以外，都可以预约
                for (var i = 0; i < divNum; i++) {
                    var temp = new Date(chooseDate).DateAdd('h', -8).DateAdd('n', i * interval).format("yyyy-MM-dd hh:mm");
                    if (CompareDate(temp, sta)) {
                        var obj = document.getElementById('timeDiv' + i);
                        if (obj.className == "timeDiv bgred") {
                            obj.className = "timeDiv bggrey";
                        }
                    }
                }
            }

            // var existLabRoomAdmin=$("#existLabRoomAdmin").val();
            // if($("#mgr").val() != "1") {
            //     if(configMachineLeverSecond != -1){
            //         if (existLabRoomAdmin == "false") {
            //             for (var i = 0; i < divNum; i++) {
            //                 var obj = document.getElementById('timeDiv' + i);
            //                 if (obj.className == "timeDiv bggrey") {
            //                     document.getElementById('timeDiv' + i).className = "timeDiv bgred";
            //                 }
            //             }
            //         }
            //     }
            // }
            //开放时间之外的色块变透明
            // var outOpentime=getOpenTimeArea(openTimeList).split("$");
            // var minHour=parseInt(outOpentime[0]);
            // var maxHour=parseInt(outOpentime[2]);
            // for(var i=0;i<divNum;i++){
            //     var obj = document.getElementById('timeDiv'+i);
            //     var startHour=parseInt(obj.innerText.split(":")[0]);
            //     if(startHour<minHour){
            //         document.getElementById('timeDiv'+i).className="timeDiv bgopacity";
            //         obj.innerText="";
            //     }else{
            //         if(obj.innerText != ""){
            //             var endHour=parseInt((obj.innerText.split("-")[1]).split(":")[0]);
            //             if(endHour>maxHour){
            //                 obj.className="timeDiv bgopacity";
            //                 obj.innerText="";
            //             }
            //         }
            //
            //     }
            //
            // }

            $(".timeDiv.bggrey").click(function () {
                //系统名称
                var projectName = $("#projectName").val();
                //这个flag用于点击色块完成后执行别的操作，作用 为了防止多次调用同一个方法
                //得到当前div的方位
                var thisId = parseInt($(this).attr('id').substring(7));
                if (false) {
                } else {
                    if (false) {
                    } else {
                        //点击的点之前有没有绿，有true，没有false;
                        var flagGreenFormer = false;
                        for (var i = 0; i < thisId; i++) {
                            var obj = document.getElementById('timeDiv' + i);
                            if (obj.className == "timeDiv timeChosen bggreen") {
                                flagGreenFormer = true;
                            }
                        }
                        //点后有没有绿
                        var flagGreenAfter = false;
                        for (var i = thisId + 1; i < divNum; i++) {
                            var obj = document.getElementById('timeDiv' + i);
                            if (obj.className == "timeDiv timeChosen bggreen") {
                                flagGreenAfter = true;
                            }
                        }
                        var flag = true;
                        if (true) {//之后需判冲
                            //点了绿色
                            if ($(this).hasClass("timeChosen")) {
                                //将此之后的所有绿色变灰色
                                for (var i = thisId + 1; i < divNum; i++) {
                                    var obj = document.getElementById('timeDiv' + i);
                                    if (obj.className == "timeDiv timeChosen bggreen") {
                                        document.getElementById('timeDiv' + i).className = "timeDiv bggrey";
                                    }
                                }
                                //绿变灰
                                if (!flagGreenFormer && !flagGreenAfter) {
                                    document.getElementById('timeDiv' + thisId).className = "timeDiv bggrey";
                                }
                            }
                            //不是绿色
                            else {
                                //两点之间变绿
                                if (flagGreenFormer) {
                                    for (var i = 0; i < thisId; i++) {
                                        var obj = document.getElementById('timeDiv' + i);
                                        if (obj.className == "timeDiv timeChosen bggreen") {
                                            if (isOtherExist(i, thisId)) {
                                                flag = false;
                                                alert("不能跨时间段预约！");
                                                break;
                                            } else {
                                                for (var j = i + 1; j < thisId; j++)
                                                    document.getElementById('timeDiv' + j).className = "timeDiv timeChosen bggreen";
                                            }
                                        }
                                    }
                                }
                                if (flagGreenFormer && flagGreenAfter) {
                                    //后面的点之后都变回来
                                    for (var i = thisId + 1; i < divNum; i++) {
                                        var obj = document.getElementById('timeDiv' + i);
                                        if (obj.className == "timeDiv timeChosen bggreen") {

                                            document.getElementById('timeDiv' + i).className = "timeDiv bggrey";
                                        }
                                    }
                                }
                                if (!flagGreenFormer && flagGreenAfter) {
                                    var count = 0;
                                    for (var i = 0; i < divNum; i++) {
                                        var obj2 = document.getElementById('timeDiv' + i);
                                        if (obj2.className == "timeDiv timeChosen bggreen") {
                                            count = i;
                                            break;
                                        }
                                    }
                                    if (isOtherExist(thisId, count)) {
                                        flag = false;
                                        alert("不能跨时间段预约！");
                                    } else {


                                        for (var i = thisId + 1; i < divNum; i++) {
                                            var obj = document.getElementById('timeDiv' + i);
                                            if (obj.className == "timeDiv timeChosen bggreen") {
                                                break;
                                            }
                                            if (obj.className == "timeDiv bggrey") {
                                                document.getElementById('timeDiv' + i).className = "timeDiv timeChosen bggreen";
                                            }


                                        }
                                    }

                                }
                                if (flagGreenFormer && flagGreenAfter) {
                                    for (var i = 0; i < thisId; i++) {
                                        var obj = document.getElementById('timeDiv' + i);
                                        if (obj.className == "timeDiv timeChosen bggreen") {
                                            document.getElementById('timeDiv' + i).className = "timeDiv bggrey";
                                        }

                                    }
                                }

                                if (flag) {
                                    $(this).removeClass("bggrey").addClass("timeChosen bggreen");
                                }
                            }
                        }
                        var counter = 0;
                        for (var i = 0; i < divNum; i++) {
                            var obj5 = document.getElementById('timeDiv' + i);
                            if (obj5.className == "timeDiv timeChosen bggreen") {
                                counter++;
                            }
                        }
                        var timeCounter = counter * $("#timeLineInterval").val();
                        var min = ($("#minInterval").val());
                        var max = ($("#maxInterval").val());
                        if (max != -1) {
                            if (max < timeCounter) {
                                setCookie("reservationFlag", "larger");
                            } else {
                                setCookie("reservationFlag", "true");
                            }
                        } else {
                            setCookie("reservationFlag", "true");
                        }
                        if (timeCounter < min) {
                            setCookie("reservationFlag", "lower");
                        }
                        $("#duration").html((counter * $("#timeLineInterval").val()).toFixed(2) + "小时");
                        $("#durationHours").val((counter * $("#timeLineInterval").val()).toFixed(2));
                        //江苏理工的计费方式不同
                        if ("jsutinstruments" == projectName) {
                            cacularChargeForJs();
                        } else {
                            cacularCharge();
                        }
                    }
                }

            });
        });
}


//其他方法

//JS操作cookies方法!
//写cookies
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

//比较日期大小
function CompareDate(d1, d2) {
    return ((new Date(d1.replace(/-/g, "\/"))) >= (new Date(d2.replace(/-/g, "\/"))));
}

//点击色块后计算预计费用
function cacularCharge() {
    var pUid = "";
    pUid = $("#pUid").val();
    var config = $("#configUid").val();
    var times = document.getElementsByClassName("timeDiv timeChosen bggreen");
    var begin = times[0].firstElementChild.innerText;
    var end = times[times.length - 1].firstElementChild.innerText;
    var searchDates = $("#searchDate").val();
    var myData = {
        "pUid": pUid,
        "begin": begin,
        "end": end,
        "config": config,
        "searchDates": searchDates
    }
    console.log(myData);
    $.ajax({
        type: 'post',
        async: false,
        data: myData,
        url: "../instrument/viewChargeOfMachineApp",
        success: function (data) {
            if (document.getElementById("fee") != null) {
                document.getElementById("fee").innerText = parseFloat(data).toFixed(2);
                document.getElementById("priceExpect").value = parseFloat(data).toFixed(2);
            }

        }
    })

}

//江苏理工计算预计费用
function cacularChargeForJs() {
    var insUid = $("#insUid").val();
    //所选时长
    var durationHours = $("#durationHours").val();
    //单选收费
    var items1 = $("input[name ='items1']:checked").val();
    //多选收费
    var items2 = [];
    var flag = true;
    $('input[name="items2"]:checked').each(function () {
        var item = $(this).val();
        items2.push(item);
        var number = $("#" + item).val().toString();
        if (number == "") {
            alert("请填写数量");
            //这里return false没用 只会对each()里的方法有效，还会继续执行
            flag = false;
        }
        items2.push(number);
    });
    var myData = {
        'durationHours': durationHours,
        'items1': items1,
        'items2': items2.toString(),
        'insUid': insUid
    };
    console.log(myData);
    $.ajax({
        type: 'POST',
        url: '../instrument/viewChargeOfMachineAppForJs',
        dataType: 'json',
        data: myData,
        success: function (data) {
            if (document.getElementById("fee") != null) {
                document.getElementById("fee").innerText = parseFloat(data).toFixed(2);
                document.getElementById("priceExpect").value = parseFloat(data).toFixed(2);
            }
        },
        error: function () {
            console.log("计算预计费用出错！！！");
        }
    })
}

function saveInstrumentMachineAppForSharing(insUid) {
    var searchDateChosen = $("#searchDate").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var reservationFlag = getCookie("reservationFlag");
    if (phone === null || phone === "" || !(/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(phone))) {
        alert("请填写格式正确的电话号码！");
        return false;
    } else if (email === null || email === "" || !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email))) {
        alert("请填写格式正确的邮箱地址！");
        return false;
    } else if (reservationFlag == "lower") {
        alert("少于最少预约时间块，无法预约！");
    } else if (reservationFlag == "larger") {
        alert("大于最多预约时间块，无法预约！");
    }
    else {
        var teacher = $("#teacher").val();
        var needTeacherAudit = $("#needTeacherAudits").val();
        if (needTeacherAudit == '1' && (teacher == null || teacher == '')) {
            alert("请选择导师！");
        } else {
            var direction = $("#direction").val();
            if (direction == null || direction == '') {
                alert("请填写使用方向！");
            } else {
                var content = $("#content").val();
                if (content == null || content == '') {
                    alert("请填写预约内容！");
                } else {
                    var divNum = parseInt((24 - 0) * 60 / interval);
                    for (var i = 0; i < divNum; i++) {
                        var obj5 = document.getElementById('timeDiv' + i);
                        if (obj5.className == "timeDiv timeChosen bggreen") {
                            var time = obj5.firstElementChild.innerText;
                            var $span1 = $("<span>" + time + "</span>");
                            var $i = $("<i class='fa fa-times r close' title='关闭'></i>");
                            var $selectTime = $("<input name='selectTime' type='hidden' value='" + time + "'/>");
                            var $div = $("<div></div>");
                            $div.append($selectTime);
                            $div.append($span1);
                            $div.append($i);
                            var $divNew = $("<div class='course_select sample' id='d" + i + "'></div>");
                            $divNew.append($div);
                            $(".public_message").find(".sample:last").after($divNew);
                        }
                    }
                    var currDate = $("#iStyle_DateViewer").val();
                    var labRoomAdminUsername = $("#labRoomAdminUsername").val();
                    var needTeacherAudit = $("#needTeacherAudits").val();
                    var ahead = $("#minAheadByTutorValue").val();
                    var machineFirstAudit = $("#machineFirstAudit").val();
                    console.log(ahead);
                    if ($("#minAheadByTutorValue").val() != "无限制") {
                        alert("请预约的同学注意，此设备需要导师/课题组负责人审核并且要在" + $("#minAheadByTutorValue").val() + "小时内审核，否则超时，自动拒绝审核,请及时提醒导师进行审核工作！");
                    }
                    // $("#selectDate").val(currDate);
                    //$("#searchDate").val(currDate);
                    $.ajax({
                        type: 'post',
                        async: false,
                        url: '../instrument/saveInstrumentMachineApp?insUid=' + insUid + '&schoolDeviceNumber=' + labRoomAdminUsername + '&searchDate=' + searchDateChosen + '&needTeacherAudit=' + needTeacherAudit,
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
                            if (data == "success") {
                                var str = $("#configbasicAttention").val();
                                var basicAttention = str.replace(/<[^>]+>/g, "");
                                alert("提交成功！ \n 管理员名字:" + $("#viewInstrumentmgrCname").val() + " \n 管理员电话:" + $("#mgrusertelephone").val() + "\n 注意事项:" + basicAttention);
                                window.location = "../website/instrumentShareing?currpage=1";
                            }
                            if (data == "configMachineNotExist") {
                                alert("没有正确设置机时预约相关参数，程序出错了！");
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
                            alert("缺少字段或本实验室没有实验室管理员或程序出错！");
                        }
                    });
                }
            }
        }
    }
}

function getOpenTimeArea(openTimeList) {
    var chooseDate = $("#searchDate").val();
    var currWeek = new Date(chooseDate.replace(/-/g, "\/")).getDay();
    if (currWeek == 0) {
        currWeek = 7;
    }
    var useList = new Array();
    for (var i = 0; i < openTimeList.length; i++) {
        if (openTimeList[i].weeks.indexOf(currWeek) == -1) {
            continue;
        }
        var currDate = new Date($("#searchDate").val().replace(/-/g, "\/") + " 00:00").Format("yyyy-MM-dd hh:mm");
        var DateEnd = new Date(openTimeList[i].endDate.replace(/-/g, "\/") + " 00:01").Format("yyyy-MM-dd hh:mm");
        //var DateStart = new Date(openTimeList[i].startDate.replace(/-/g, "\/") + " 00:00").DateAdd('s', -1).Format("yyyy-MM-dd hh:mm");
        var date2 = new Date(Date.parse(new Date(openTimeList[i].startDate.replace(/-/g, "\/") + " 00:00")) - 1000).Format("yyyy-MM-dd hh:mm");
        if (CompareDate(DateEnd, currDate) && CompareDate(currDate, date2)) {
            useList.push(openTimeList[i]);
        }
    }
    var beginMin = "23:59:00";
    var endMax = "00:00:00";
    for (var i = 0; i < useList.length; i++) {
        //赋值min和max
        if (beginMin > useList[i].startTime) {
            beginMin = useList[i].startTime;
        }
        if (endMax < useList[i].endTime) {
            endMax = useList[i].endTime;
        }
    }
    var startH = Number(beginMin.substring(0, 2));
    var startM = Number(beginMin.substring(3, 5));
    var endH = Number(endMax.substring(0, 2));
    var endM = Number(endMax.substring(3, 5));
    // startH=0;
    // startM=0;
    // endH=24;
    // endM=0;
    return startH + "$" + startM + "$" + endH + "$" + endM;
}

function changeRepair() {
    var isNeedRepairApp = $('input:radio[name="isNeedRepairApp"]:checked').val();
    if (isNeedRepairApp == 1) {
        $("#needRepair").hide();
        $("#notNeedRepair").show();
    }
    else {
        if (isNeedRepairApp == 2) {
            $("#needRepair").show();
            $("#notNeedRepair").hide();
        } else {
            $("#needRepair").hide()
            $("#notNeedRepair").hide();
        }
    }
}

function hideForDelay() {
    var appOriginalUid = "";
    appOriginalUid = $("#appOriginalUid").val();
    if (appOriginalUid != "") {
        $("#detail").hide();
    }
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


function CompareDate2(d1, d2) {
    return ((new Date(d1.replace(/-/g, "\/"))) > (new Date(d2.replace(/-/g, "\/"))));
}
