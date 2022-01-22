var contextPath = $("meta[name='contextPath']").attr("content");
// var zuulUrl ="";
var zuulUrl = $("#zuulServerUrl").val() + "/timetable/";
// var studentTimetableUrl = zuulUrl + "api/school/judgeTimetableConflictByStudent";
var msgindex;
$(document).ready(function () {
    // zuulUrl =$("#zuulServerUrl").val()+"/timetable/";


});
function showJudgeTimetable(flag1) {
    layui.use(['layer', 'form', 'element', 'jquery', 'layer'], function () {
        var layer = layui.layer
            , form = layui.form
            , element = layui.element
            , $ = layui.$
            , layer = layui.layer;
        if (flag1 == 1){
        getWeekday1();
        getClasses1();
        getWeeks1();
        function getWeekday1(){
            var term = $('#term').val();
            var timetableStyle = $('#timetableStyle').val();
            var courseNo = $('#courseNo').val();
            // var data1 = JSON.stringify({
            //     "term": $('#term').val(),
            //     "type": 2,
            // });
            $.ajax({
                url: zuulUrl + "api/timetable/common/apiDateListJudgeConflictByStu?type=2&termId="+term+"&timetableStyle="+timetableStyle+"&courseNo="+courseNo,
                type: "GET",
                // data: data1,
                headers: {Authorization: getJWTAuthority()},
                // async: false,
                contentType: "application/json;charset=UTF-8",
                success: function (result) {
                    var list = result.results;    //返回的数据
                    //add_role_name给select定义的id
                    for (var j = 0; j < list.length; j++) {
                        // listclass += list[i].id+",";
                        // $("#section_box").append(" <input type=\"checkbox\" name=\"classes\" id='classes" + list[i].id + "' title='" + list[i].text + "' value='" + list[i].id + "' lay-filter=\"classes_choose\" >");
                        var x = "<div lay-filter='classes_choose' name='weekdays' value=" + list[j].id + " class=\"layui-unselect layui-form-checkbox\"><span>"+ list[j].text+"</span><i class='layui-icon layui-icon-ok'></i></div>"
                        $("#weekday_box").append(x);
                        form.render("checkbox");
                    }
                    // var x = "<div lay-filter='classes_choose' name='classes' value='111' class=\"layui-unselect layui-form-checkbox\"><span>1111</span><i class='layui-icon layui-icon-ok'></i></div>"
                    // $("#section_box").append(x);
                    allRule('weekday_all', 'weekday_box')
                    oppositeRule('weekday_opposite', 'weekday_box')
                    noneRule('weekday_none', 'weekday_box')
                    optionRule('weekday_box')
                    clickRule('weekday_box')
                    // showWeeks('weekday_box')
                }
            });
        }


        function getClasses1() {
            var term = $('#term').val();
            var timetableStyle = $('#timetableStyle').val();
            var courseNo = $('#courseNo').val();
            // var data1 = JSON.stringify({
            //     "term": $('#term').val(),
            //     "type": 2,
            // });
            $.ajax({
                url: zuulUrl + "api/timetable/common/apiDateListJudgeConflictByStu?type=3&termId="+term+"&timetableStyle="+timetableStyle+"&courseNo="+courseNo,
                type: "GET",
                // data: data1,
                headers: {Authorization: getJWTAuthority()},
                // async: false,
                contentType: "application/json;charset=UTF-8",
                success: function (result) {
                    var list = result.results;    //返回的数据
                    //add_role_name给select定义的id
                    for (var j = 0; j < list.length; j++) {
                        // listclass += list[i].id+",";
                        // $("#section_box").append(" <input type=\"checkbox\" name=\"classes\" id='classes" + list[i].id + "' title='" + list[i].text + "' value='" + list[i].id + "' lay-filter=\"classes_choose\" >");
                        var x = "<div lay-filter='classes_choose' name='classes' value=" + list[j].id + " class=\"layui-unselect layui-form-checkbox\"><span>"+ list[j].text+"</span><i class='layui-icon layui-icon-ok'></i></div>"
                        $("#section_box").append(x);
                        form.render("checkbox");
                    }
                    // var x = "<div lay-filter='classes_choose' name='classes' value='111' class=\"layui-unselect layui-form-checkbox\"><span>1111</span><i class='layui-icon layui-icon-ok'></i></div>"
                    // $("#section_box").append(x);
                    allRule('section_all', 'section_box')
                    oppositeRule('section_opposite', 'section_box')
                    noneRule('section_none', 'section_box')
                    optionRule('section_box')
                    clickRule('section_box')
                    // showWeeks('section_box')
                }
            });
        }

        function getWeeks1() {
            var term = $('#term').val();
            var timetableStyle = $('#timetableStyle').val();
            var courseNo = $('#courseNo').val();
            // var data1 = JSON.stringify({
            //     "term": $('#term').val(),
            //     "type": 2,
            // });
            $.ajax({
                // url: weekUrl + "?term=16&weekday=-1",
                url: zuulUrl + "api/timetable/common/apiDateListJudgeConflictByStu?type=1&termId="+term+"&timetableStyle="+timetableStyle+"&courseNo="+courseNo,
                headers: {Authorization: getJWTAuthority()},
                // data: data1,
                // async: false,
                type: "GET",
                contentType: "application/json;charset=UTF-8",
                success: function (result) {
                    var list = result.results;    //返回的数据
                    for (var j = 0; j < list.length; j++) {
                        // $("#week_box").append(" <input type=\"checkbox\" name=\"week\" title='第" + list[i].text + "周' value='" + list[i].id + "' lay-filter=\"allChoose_1\">");
                        var x = "<div lay-filter='allChoose_1' name='week' id='week"+ list[j].id +"' value=" + list[j].id + " class=\"layui-unselect layui-form-checkbox\"><span>第"+ list[j].id+"周</span><i class='layui-icon layui-icon-ok'></i></div>"
                        $("#week_box").append(x);
                        form.render("checkbox");
                    }
                    allRule('week_all', 'week_box');
                    oppositeRule('week_opposite', 'week_box');
                    noneRule('week_none', 'week_box');
                    optionRule('week_box')
                    clickRule('week_box')
                    // showClasses('week_box')
                }
            });
        }
        }

    });
    layui.use(['layer', 'form', 'element', 'jquery', 'layer'], function () {
        var layer = layui.layer
            , form = layui.form
            , element = layui.element
            , $ = layui.$
            , layer = layui.layer;

        form.on('submit(timetableSubmit)', function(data){
            var data1;
            var classs = "";
            // $("input:checkbox[name='classes']:checked").each(function() { // 遍历name=standard的多选框
            //     classs += $(this).val()+",";
            // });
            $("#section_box >div").each(function(){
                // alert($(this).attr("id"));  //打印子div的ID
                if($(this).hasClass('layui-form-checked')){
                    classs += $(this).attr("value")+",";
                }
            });
            // classs = classs.slice(0,classs.length-1);
            var weekss = "";
            // $("input:checkbox[name='week']:checked").each(function() {
            //     weekss += $(this).val()+",";
            // });
            $("#week_box >div").each(function(){
                // alert($(this).attr("id"));  //打印子div的ID
                if($(this).hasClass('layui-form-checked')){
                    weekss += $(this).attr("value")+",";
                }
            });
            // weekss = weekss.slice(0,weekss.length-1);
            var weekdayss = "";
            // $("input:checkbox[name='week']:checked").each(function() {
            //     weekss += $(this).val()+",";
            // });
            $("#weekday_box >div").each(function(){
                // alert($(this).attr("id"));  //打印子div的ID
                if($(this).hasClass('layui-form-checked')){
                    weekdayss += $(this).attr("value")+",";
                }
            });
            // weekdayss = weekdayss.slice(0,weekdayss.length-1);
            data.field.sections = classs;
            data.field.weeks = weekss;
            data.field.termId = $("#term").val();
            data.field.weekdays = weekdayss;
            if($("#timetableStyle").val() == 5){
                data.field.selfId = $("#selfId").val();
            }else{
                // data.field.courseNo = "225151-17-10061363";
                data.field.courseNo = $("#courseNo").val();
            }
            data.field.timetableStyle = $("#timetableStyle").val();
            data1 = JSON.stringify(data.field);
            if(data.field.sections == "" || data.field.weeks == "" || data.field.weekdays==""){
                alert("请选择周次/节次/星期!")
                return false;
            }
            $.ajax({
                url: zuulUrl + "api/school/judgeTimetableConflictByStudent",
                headers: {Authorization: getJWTAuthority()},
                data: data1,
                // async: false,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                beforeSend: function () {
                    loading("数据提交中，请稍后......");
                },
                success: function (result) {
                    // var index = layer.msg("上传成功")
                    layer.close(msgindex);
                    $("#table_student1").html("");
                    console.log(result);
                    var section = result.data[0].sections;
                    var week = result.data[0].weeks;
                    var weekday = result.data[0].weekdays;
                    var sectionss=section.slice(0,section.length-1).split(",");
                    var weekss=week.slice(0,week.length-1).split(",");
                    var weekdayss=weekday.slice(0,weekday.length-1).split(",");

                    var str = "";
                    str+="<table class='tab_stu' id='tab_stu' border='1' align='center'><caption>";
                    str+="学生判冲";
                    str+="<span>(可拖动鼠标多选)</span>";
                    str+="<div style='float: right;'>";
                    str+="<button class='layui-btn' onclick='chooseLabRoom()'>选择实验室</button>";
                    str+="</div>";
                    str+="</caption>";
                    str+="<thead>";
                    str+="<tr>";
                    str+="<th>星期</th>";
                    str+="<th>节次</th>";
                    for(var i=0;i<weekss.length;i++){
                        str+="<th>第"+weekss[i]+"周</th>";
                    }
                    str+="</tr>";
                    str+="</thead>";
                    // str+="<tbody id='select_box'>";
                    var haved
                    for(var i=0;i<weekdayss.length;i++){
                        str+="<tbody data-album='"+ weekdayss[i] +"'>";
                        for(var j=0;j<sectionss.length;j++){
                            str+="<tr class='check_box'>"
                            if(haved!=i){
                                str+="<td class='not_check' data='"+ weekdayss[i] +"' rowspan='"+ sectionss.length +"'>星期"+weekdayss[i]+"</td>";
                                haved = i;
                            }
                            str+="<td class='not_check'>第"+sectionss[j]+"节</td>";
                            for(var y=0;y<weekss.length;y++){
                                for(var x=1;x<result.data.length;x++){
                                    // console.log(result.data[x]);
                                    if(result.data[x].week == weekss[y]){
                                        if(result.data[x].weekday == weekdayss[i]){
                                            if(result.data[x].section == sectionss[j]){
                                                str+="<td data='"+ result.data[x].tag +"'><span data='"+ result.data[x].tag +"'>"+ result.data[x].conflictRate +"</span></td>";
                                            }
                                        }
                                    }
                                }
                            }
                            str+="</tr>"
                        }
                        str+="</tbody>";
                    }
                    str+="</tbody>";
                    str+="</table>";

                    $("#table_student1").append(str);
                    // $("#tab_stu").selectable({ filter: "td" });
                    $("[data-album]").selectable({ filter: "td",
                        start: function() {
                            $( "#tab_stu td" ).each(function() {
                                if($(this).hasClass('ui-selected')){
                                    $(this).removeClass("ui-selected");
                                }
                            });
                        }
                    });
                }
            });
            // var index = parent.layer.getFrameIndex(window.name);
            // parent.layer.close(index);//关闭当前页

            return false;
        });

        function loading(msg){
            msgindex = layer.msg(msg, {
                icon:16,
                shade:[0.1, '#fff'],
                time:false  //不自动关闭
            })
        }
    })
}

function chooseLabRoom() {
    var timetableClass = [];
    $( ".ui-selected" ).each(function() {
        if(!$(this).hasClass('not_check')){
            var index = $(this).attr( 'data');
            timetableClass.push(index)
        }
    });
    // alert(timetableClass)
    var data1 = JSON.stringify({
        "tag": timetableClass,
        "term": $("#term").val()
    });
    console.log(data1);
    if(timetableClass.length==0){
        alert("请至少选择一个!");
        return false;
    }
    $.ajax({
        url: zuulUrl + "/api/school/apiGetUsableList",
        headers: {Authorization: getJWTAuthority()},
        data: data1,
        async: false,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        // beforeSend: function () {
        //     loading("数据提交中，请稍后......");
        // },
        success: function (result) {
            // layer.close(msgindex);
            $('#lab_stu').remove();
            // for(var i =0;i<timetableClass.length;i++){
            //     var timetab=timetableClass[i].split("-");
            // }
            var str = "";
            str+="<table class='lab_stu' id='lab_stu' border='1' align='center'>"
            str+="<caption>";
            str+="选择实验室";
            str+="<div style='float: right;'>";
            str+="<button class='layui-btn' onclick='confirmLabRoom()'>排课</button>";
            str+="</div>";
            str+="</caption>";
            str+="<thead>"
            str+="<tr>"
            str+="<th>周次</th><th>星期</th><th>节次</th><th>项目</th><th>实验室<font color='red'> *</font></th><th>教师<font color='red'> *</font></th><th>助教</th><th>操作</th>"
            str+="</tr>"
            str+="</thead>"
            str+="<tbody>"
            for(var i=0;i<result.length;i++){
                str+="<tr>"
                str+="<td>"+ result[i].weeks +"</td>"
                str+="<td>"+ result[i].weekdays +"</td>"
                str+="<td>"+ result[i].sections +"</td>"
                str+="<td><select id='resultsOperationItem_select' class='cho_lab chzn-select'>"
                str+="<option value=''>请选择</option>"
                for(var x=0;x<result[i].resultsOperationItem.length;x++){
                    str+="<option value='"+ result[i].resultsOperationItem[x].id +"'>"+ result[i].resultsOperationItem[x].text +"</option>"
                }
                str+="</select></td>"
                str+="<td><select id='resultsLabRoom_select' class='cho_lab chzn-select'>"
                str+="<option value=''>请选择</option>"
                for(var j=0;j<result[i].resultsLabRoom.length;j++){
                    str+="<option value='"+ result[i].resultsLabRoom[j].id +"'>"+ result[i].resultsLabRoom[j].text +"</option>"
                }
                str+="</select></td>"
                str+="<td><select id='resultsTeacher_select' class='cho_lab chzn-select'>"
                str+="<option value=''>请选择</option>"
                for(var y=0;y<result[i].resultsTeacher.length;y++){
                    str+="<option value='"+ result[i].resultsTeacher[y].id +"'>"+ result[i].resultsTeacher[y].text +"</option>"
                }
                str+="</select></td>"
                str+="<td><select id='resultsTutor_select' class='cho_lab chzn-select'>"
                str+="<option value=''>请选择</option>"
                for(var z=0;z<result[i].resultsTeacher.length;z++){
                    str+="<option value='"+ result[i].resultsTeacher[z].id +"'>"+ result[i].resultsTeacher[z].text +"</option>"
                }
                str+="</select></td>"
                str+="<td><a onclick='deleteTime(this)'>删除</a></td>"
                str+="</tr>"
            }
            str+="</tbody>"
            str+="</table>"
            // $(".cho_lab").trigger("chosen:updated");
            $(".cho_lab").trigger("liszt:updated");
            $('.cho_lab').chosen();
            $('.cho_lab').searchableSelect();
            $("#table_student2").append(str);
            console.log(result);
            var config = {
                '.chzn-select': {search_contains : true},
                '.chzn-select-deselect'  : {allow_single_deselect:true},
                '.chzn-select-no-single' : {disable_search_threshold:10},
                '.chzn-select-no-results': {no_results_text:'选项, 没有发现!'},
                '.chzn-select-width'     : {width:"95%"}
            };
            for (var selector in config) {
                $(selector).chosen(config[selector]);
            }
        }
    });
}
function choLabroom(weeks,weekday,classes,labRoomId,item,teacher,tutor) {
    var JudgeConflictTimeTableVO = new Object();
    if($("#timetableStyle").val() == 5){
        JudgeConflictTimeTableVO.selfId = $("#selfId").val();;
    }else{
        // JudgeConflictTimeTableVO.courseNo = "225151-17-10061363";
        JudgeConflictTimeTableVO.courseNo = $("#courseNo").val();;
    }
    JudgeConflictTimeTableVO.weeks = weeks;
    JudgeConflictTimeTableVO.weekday = weekday;
    JudgeConflictTimeTableVO.classes = classes;
    JudgeConflictTimeTableVO.labRoomId = labRoomId;
    JudgeConflictTimeTableVO.item = item;
    JudgeConflictTimeTableVO.teacher = teacher;
    JudgeConflictTimeTableVO.tutor = tutor;
    JudgeConflictTimeTableVO.timetableStyle = $('#timetableStyle').val();
    JudgeConflictTimeTableVO.status = $('#status').val();
    JudgeConflictTimeTableVO.term = $("#term").val();
    JudgeConflictTimeTableVO.createdBy = username;
    return JudgeConflictTimeTableVO;
}
function confirmLabRoom() {
    var flag;
    console.log('确定');
    var JudgeConflictTimeTableVOs = [];
    $('#lab_stu tbody tr').each(function(i){
        var tdArr = $(this).children();
        var JudgeConflictTimeTableVO;
        var weeks = tdArr.eq(0).text();
        var weekday = tdArr.eq(1).text();
        var classes = tdArr.eq(2).text();
        var item = tdArr.eq(3).find("#resultsOperationItem_select").val();
        var labRoomId = tdArr.eq(4).find("#resultsLabRoom_select").val();
        var teacher = tdArr.eq(5).find("#resultsTeacher_select").val();
        var tutor = tdArr.eq(6).find("#resultsTutor_select").val();
        if(tdArr.eq(4).find("#resultsLabRoom_select").val()==''||tdArr.eq(5).find("#resultsTeacher_select").val()==''){
            alert("请填写必填项!")
            flag = 1;
        }
        JudgeConflictTimeTableVO = choLabroom(weeks,weekday,classes,labRoomId,item,teacher,tutor);
        JudgeConflictTimeTableVOs.push(JudgeConflictTimeTableVO);
    });
    console.log(JSON.stringify(JudgeConflictTimeTableVOs))
    if(flag == 1){
        return false;
    }else{
        $.ajax({
            url: zuulUrl + "/api/school/apiSaveTimetableAppointmentByJudgeConflict",
            headers: {Authorization: getJWTAuthority()},
            type:'post',
            data:JSON.stringify(JudgeConflictTimeTableVOs),
            async:false,  // 设置同步方式
            // cache:false,
            contentType:"application/json;charset=utf-8",
            success:function(data){
                if(data){
                    window.location.reload();
                }else{
                    alert("排课失败!")
                }
            }
        });
    }
}
function deleteTime(obj) {
    console.log("delete");
    $(obj).parent().parent().parent()[0].removeChild($(obj).parent().parent()[0]);
}
function validform() {
    return $("#form_lab").validate();
}

function checkSelected(){
    //初始化
    $("#tr_soft").hide();
    $("#soft_id").val(null);
    $("#labRoom_id").val(null);
    $('input:checkbox[name=select_check]:checked').each(function(k){
        if("SOFTWARE"==$(this).val()){
            $("#tr_soft").show();
        }
    })
}
//获取jwt认证，获取token
//getJWTAuthority();
function getJWTAuthority() {
    var authorization ="";
    initDirectoryEngine({
        getHostsUrl:contextPath+"/shareApi/getHosts",
        getAuthorizationUrl:contextPath+"/shareApi/getAuthorization"
    });
    getAuthorization({
        async:false,
        success:function(data){
            authorization =data;
        }
    });
    return authorization;
}