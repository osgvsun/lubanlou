$(function(){
    var date = new Date().format("yyyy-MM-dd").substring(0,7).replace(/\//g, "-");
    $("#searchDate").val(date)
})
var searchDate = $("#searchDate").val();
var  RoundTripController=
    {
        SearchRequest:{
            "searchDate":searchDate,
        },
        Language:"CN",
    };
var ConditionController=RoundTripController;
var dateline = new dateLine();
$('.form_date').datetimepicker({
    language:  'zh-CN',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    startDate:new Date(),
    forceParse: 0,
    format:'yyyy-mm-dd'
}).on('changeDate', function(e){
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

$(function(){
    var cuurrdateStr = $("#searchDate").val().replace(/-/g, "/")+"/01";
    var currdate = new Date(cuurrdateStr);
    var enddateStr = dateline.addMonths(currdate,7)+"/01";
    var enddate = new Date(enddateStr);
    var i=0;
    while (currdate.valueOf() < enddate) {
        var date1;
        date1 = dateline.getMonthString(currdate);
        var tmpDate = dateline.getMonthString(currdate);
        var owli = $("#flightlistnav").find("li[class=navcols]").eq(i);
        var $a = owli.find("a");
        $a.attr("data-href","../instrument/doInstrumentMachineApp?insUid="+$("#insUid").val()+"&searchDate="+tmpDate)
        var div = owli.find("div");
        div.html("<em value=" + tmpDate + ">" + date1 + "</em>");
        if(i==0){
            div.attr("class", "f_l_nb");
        }

        currdate.setMonth(currdate.getMonth() + 1);
        i++;
    }

})
$("#lowlistnav").on("click",".navcols a",function(){
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

$(document).ready(function(e) {
    var dateStr = dateline.getMonthString(new Date());
    console.log(dateStr);
    changeMonth(dateStr);
});



function getBillings(uid){
	$.ajax({
	    type: 'post',
	    async: false,
	    url: '../instrument/findConfigSpecimenBillingByItemUid?itemUid='+uid, 
	    success: function(data) {

	    	console.log(data);
	    	$("#billings"+uid).html(data);
	    },
	    error:function() {
	    	alert("222");
	    }
	});
}
function saveNewSpecimenAppForProject(pUid){
    var phone = $("#phone").val();
    var email = $("#email").val();
        if (phone === null || phone === "" || !(/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(phone))) {
            alert("???????????????????????????????????????");
            return false;
        } else if (email === null || email === "" || !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email))) {
            alert("???????????????????????????????????????");
            return false;
        } else if (checkExtend(pUid)) {
            var sentTime = $('#sentTime').val();
            var expectedTime = $('#expectedTime').val();
            var searchDate = sentTime + "," + expectedTime;

            $.ajax({
                type: 'post',
                async: false,
                data: $.param({'sentTime1':sentTime,'expectedTime1':expectedTime})+'&'+$("form").serialize(),
                url: '../project/saveNewSpecimenAppForProject?pUid=' +pUid,
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
                        layer.alert("???????????????");
                        window.location = "../project/projectList?currpage=1";
                    }
                    if (data == "error") {
                        alert("?????????????????????????????????????????????");
                    }
                    if (data == "cantAfford") {
                        alert("???????????????????????????????????????");
                    }
                    if(data == 'noCommonTeam'){
                        alert('?????????????????????');
                    }
                },
                error: function () {
                    alert("?????????????????????");
                }
            });
        }
}
function saveInstrumentSpecimenAppForSharing(insUid){
    var phone = $("#phone").val();
    var email = $("#email").val();
    var direction = $("#direction").val();
    if (direction == null || direction == '') {
        alert("????????????????????????");
    }else {
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
                        alert("??????????????? \n ???????????????:" + $("#viewInstrumentmgrCname").val() + " \n ???????????????:" + $("#mgrusertelephone").val() + "\n ????????????:" + $("#configbasicAttention").val());
                        window.location = "../website/instrumentShareing?currpage=1";
                    }
                    if(data == 'noCommonTeam'){
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
function checkExtend(insUid){
    var specimenDesc="";
    var list;
    $.ajax({
        type: 'post',
        async: false,
        url: '../instrument/findConfigSpecimenExtendList?insUid='+insUid,
        success: function(data) {
            list=data;
        },
        error:function() {
            // alert("???????????????");
        }
    });
    var flag=1;
    for(var i = 0; i<list.length;i++){
        if(list[i].style==2){
            specimenDesc=specimenDesc+list[i].name+":"+$('#'+list[i].uid).val()+";";
            if($('#'+list[i].uid).val()==''){
                flag=0;
            }
        }
        if(list[i].style==0){
            var radio = document.getElementsByName(""+list[i].uid);
            for (var j=0; j<radio.length; j++) {
                if (radio[j].checked) {
                    specimenDesc=specimenDesc+list[i].name+":"+radio[j].value+";";
                }
            }
            if(radio.length<=0){
                flag=0;
            }
        }
        if(list[i].style==1){
            var checkbox = document.getElementsByName(""+list[i].uid);
            specimenDesc=specimenDesc+list[i].name+":{";
            for(var k=0;k<checkbox.length;k++){
                if(checkbox[k].checked){
                    specimenDesc=specimenDesc+checkbox[k].value+",";
                }
            }
            specimenDesc=specimenDesc.substring(0,specimenDesc.length-1);
            specimenDesc=specimenDesc+"};";
            if(checkbox.length<=0){
                flag=0;
            }
        }
    }
    if(flag==0){
    //alert("????????????????????????");
    //return false;
        //?????????false????????????true?????????????????????
        return true;
    }
    var yearStart1 = $('#sentTime').val();
    var yearEnd1 = $('#expectedTime').val();
    if (CompareDate(yearStart1, yearEnd1) == true ) {
        alert("???????????????????????????????????????");
        return false;
    }
    $("#specimenDesc").val(specimenDesc);
    return true;
}

function changeMonth(dateStr)
{
    $('#orderMonth').empty();
    var postdate=dateStr.substring(0,7);
    $.get("../project/getProjectSpecimenAppValidDate?configUid="+$("#configId").val()+"&postdate="+postdate,
        function(jsonData) {
            data=jsonData;
            var datestr=dateStr;
            var currdate = new Date(datestr);
            is_table = new iStyle_TimeMonth(currdate);
            is_table.load(data,currdate,null);
            $(".timeDiv").click(function(){
                var time = $(this).children(".timespan").html();
                if(true){//???????????????
                    if($(this).hasClass("timeChosen")){
                        alert("?????????!");
                    }
                    else{
                        if($(this).hasClass("bggreen")){
                            $(this).addClass("timeChosen");
                        }
                        $(this).siblings().removeClass("timeChosen")
                        var currDate = $("#searchDate").val();
                        if(time.length == 1){
                            time = currDate.substring(0,8)+"-0"+time;
                        }
                        else{
                            time = currDate.substring(0,8)+"-"+time;
                        }
                        resCount++;
                        resId++;
                        $("#sentTime").val(time);
                        var expectedTimedate = new Date(time);
                        var expectedTime = new Date(expectedTimedate.valueOf()+24*60*60*1000).format("yyyy-MM-dd");


                        layui.use("laydate",function(){
                            var laydate = layui.laydate;
                            //????????????laydate??????
                            laydate.render({
                                elem: '#expectedTime', //????????????
                                min: expectedTime
                            });
                        })
                    }
                    if($(this).hasClass("bggrey")){
                        $("#sentTime").val("");
                        alert("??????????????????!");
                    }
                    if($(this).hasClass("bgpink")){
                        $("#sentTime").val("");
                        alert("???????????????????????????!");
                    }
                    if($(this).hasClass("bgyellow")){
                        $("#sentTime").val("");
                        alert("????????????????????????!");
                    }
                }
            });
        });
}

//??????????????????
function CompareDate(d1,d2)
{
    return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
}
function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

//??????cookies
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function expectBillingApp(){
    var pUid = $('#configId').val();
        $.ajax({
            type: 'post',
            dataType:"text",
            async: false,
            url: '../project/expectBillingApp?pUid='+pUid,
            data: $("form").serialize(),
            success: function(data) {
                // alert(data)
                if(data=='numInvalid'){
                    alert('?????????????????????????????????');
                }else{
                    var priceStr= new Array();
                    priceStr =data.split(",");
                    $("#expectBilling").val(priceStr[0].substr(2,priceStr[0].length-3));
                    $("#priceExpect").val(priceStr[0].substr(2,priceStr[0].length-3));
                    $("#expectBillingExtra").val(priceStr[1].substr(1,priceStr[1].length-3));
                    $("#priceExpectExtra").val(priceStr[1].substr(1,priceStr[1].length-3));
                }
            },
            error:function() {
                console.log("????????????????????????");
            }
        });
}
