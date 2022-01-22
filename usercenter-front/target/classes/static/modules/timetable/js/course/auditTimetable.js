var contextPath = $("meta[name='contextPath']").attr("content");
var courseNo = "";
var termId = 0;
var type = "";
var timetableStyle = 0;
var error = "";
$(document).ready(function () {
    error = $("#error").val();
    if(error == "disabled"){
        alert("审核已结束");
        window.history.go(-1);
    }
    courseNo = $("#courseNo").val();
    termId = $("#termId").val();
    type = $("#type").val();
    timetableStyle = $("#timetableStyle").val();
    if(type == "TimetableAudit"){
        getTimetableMangerView();
    }else if(type == "AdjustTimetableAudit" || type == "CloseTimetableAudit" ){
        if(timetableStyle < 5) {
            getTimetableMangerView();
        }else{
            getSelfTimetableView();
        }
    }else {
        getSelfTimetableView();
    }
});
//得到查询的参数
function queryParams(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
        // limit: params.limit,   //页面大小
        termId: termId,
        search: courseNo,
        type: type
    };
    return temp;
};
// 教务课程信息
function getTimetableMangerView() {
    $("#table_list").bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    // var url = zuulServerUrl + "/limsproduct/limsproduct/lims/api/school/apiEduSchoolCourseForAudit";
    var url = zuulServerUrl + "/timetable/api/timetable/student/apiEduSchoolCourseForAudit";
    $("#table_list").bootstrapTable({
        //使用get请求到服务器获取数据
        method: "POST",
        //必须设置，不然request.getParameter获取不到请求参数
        contentType: "application/x-www-form-urlencoded",
        //获取数据的Servlet地址
        url: url,
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParams: queryParams,
        //表格显示条纹
        striped: true,
        cache: false,
        toolbar: "#toolbar",
        //启动分页
        pagination: false,
        //是否启用查询
        search: false,
        // searchAlign: 'left',
        //是否启用详细信息视图
        detailView: false,
        //表示服务端请求
        sidePagination: "server",
        //json数据解析
        responseHandler: function (res) {
            return {
                "rows": res.rows,
                "total": res.total
            };
        },
        //数据列
        columns: [{
            title: "课程信息",
            field: "courseNumber",
            width: "20%",
            formatter: function (value, row, index) {
                return row.courseName + "<br/>(" + row.courseNumber + ")";
            }
        }, {
            title: "所属学院",
            field: "academyName",
            width: "15%",
        }, {
            title: "课程计划",
            field: "coursePlan",
            width: "30%",
            formatter: function (value, row, index) {
                var rt = '<table border="1"><tr><td width="20%">星期</td><td width="20%">节次</td><td width="20%">周次</td><td width="40%">实验室</td></tr>';
                var schoolCourseDetailDTOs = row.schoolCourseDetailDTOs;
                var count = Number(0);
                for (var i = 0, len = schoolCourseDetailDTOs.length; i < len; i++) {
                    if (schoolCourseDetailDTOs[i].weekday == 0) {
                        return "";
                    }
                    //rt += schoolCourseDetailDTOs[i].coursePlan + "<br>";
                    rt += "<tr><td>" + schoolCourseDetailDTOs[i].weekday + "</td><td>" + schoolCourseDetailDTOs[i].startClass + "-" + schoolCourseDetailDTOs[i].endClass + "</td><td>" + schoolCourseDetailDTOs[i].startWeek + "-" + schoolCourseDetailDTOs[i].endWeek + "</td><td>" + schoolCourseDetailDTOs[i].labInfo + "</td></tr>";
                }
                rt += '</table>';
                return rt;
            }
        }, {
            title: "已排课表",
            field: "timetableDTOs",
            width: "35%",
            formatter: function (value, row, index) {
                var rt = "";
                var timetableDTOs = row.timetableDTOs;
                if (timetableDTOs.length > 0&&(row.timetableStyle==4||row.timetableStyle==6)) {

                    rt += '<table border="1"><tr><td width="13%">批/组</td><td width="7%">星期</td><td width="12%">节次</td><td width="12%">周次</td><td width="13%">实验室</td><td width="10%">授课教师</td><td width="11%">实验项目</td><td width="6%">名单</td><td width="16%">备注</td></tr>';
                }
                if (timetableDTOs.length > 0&&row.timetableStyle!=4&&row.timetableStyle!=6) {
                    rt += '<table border="1"><tr><td width="12%">星期</td><td width="12%">节次</td><td width="12%">周次</td><td width="15%">实验室</td><td width="16%">授课教师</td><td width="16%">实验项目</td><td width="16%">备注</td></tr>';
                }
                var count = Number(0);
                for (var i = 0, len = timetableDTOs.length; i < len; i++) {
                    if (timetableDTOs.length > 0&&(row.timetableStyle==4||row.timetableStyle==6)) {
                        var group_button_reality = 'group_button_reality_' + timetableDTOs[i].groupId;
                        var group_div_reality = 'div_reality_' + timetableDTOs[i].groupId;
                        var result = "<button  id='" + group_button_reality + "' class='btn btn-xs green' onclick=\"setTimetableGroupNumbersReality('" + row.courseNo + "'," + timetableDTOs[i].groupId +","+timetableDTOs[i].groupNumbers+"," + timetableDTOs[i].groupStudents+",8)\" title='编辑' ><span class='glyphicon glyphicon'>" + timetableDTOs[i].groupNumbers + "/" + timetableDTOs[i].groupStudents + "</span></button>";
                        rt += "<tr><td>" + timetableDTOs[i].batchName +"/" + timetableDTOs[i].groupName + "</td><td>" + timetableDTOs[i].weekday + "</td><td>" + timetableDTOs[i].startClass + "-" + timetableDTOs[i].endClass + "</td><td>" + timetableDTOs[i].startWeek + "-" + timetableDTOs[i].endWeek + "</td><td>" + timetableDTOs[i].labInfo + "</td><td>" + timetableDTOs[i].teachers + "</td><td>" + timetableDTOs[i].items + "</td><td>" + result + "</td><td>";
                        if(timetableDTOs[i].adjustStatus == 16 && timetableDTOs[i].status == 12 ){
                            rt += "停课审核中";
                        }else if(timetableDTOs[i].adjustStatus == 1 && timetableDTOs[i].status == 12){
                            rt += "调课审核中";
                        }else if(timetableDTOs[i].adjustStatus == 1 && timetableDTOs[i].status == 15){
                            rt += "调课前数据";
                        }
                        rt += "</td></tr>";
                        rt += "<tr id=" + group_div_reality + " style=\"display: none;\"></tr>"
                    }
                    if (timetableDTOs.length > 0&&row.timetableStyle!=4&&row.timetableStyle!=6) {
                        rt += "<tr><td>" + timetableDTOs[i].weekday + "</td><td>" + timetableDTOs[i].startClass + "-" + timetableDTOs[i].endClass + "</td><td>" + timetableDTOs[i].startWeek + "-" + timetableDTOs[i].endWeek + "</td><td>" + timetableDTOs[i].labInfo + "</td><td>" + timetableDTOs[i].teachers + "</td><td>" + timetableDTOs[i].items + "</td><td>";
                        if(timetableDTOs[i].adjustStatus == 16 && timetableDTOs[i].status == 12 ){
                            rt += "停课审核中";
                        }else if(timetableDTOs[i].adjustStatus == 1 && timetableDTOs[i].status == 12){
                            rt += "调课审核中";
                        }else if(timetableDTOs[i].adjustStatus == 1 && timetableDTOs[i].status == 15){
                            rt += "调课前数据";
                        }
                        rt += "</td></tr>";
                    }
                }
                if (timetableDTOs.length > 0) {
                    rt += '</table>';
                }
                return rt;
            }
        }, {
            title: "状态",
            width: "1%",
            field: "empty",
            formatter: function (value, row, index) {
                var result = "";
                if (row.timetableStatus == 1) {
                    result += "排课已发布|";
                } else if (row.timetableStatus == 2) {
                    result += "待审核|";
                } else if(row.timetableStatus == 5) {
                    result += "审核中|";
                } else if(row.timetableStatus == 3){
                    result += "审核通过";
                } else if(row.timetableStatus == 4){
                    result += "审核拒绝";
                }
                return result;
            }
        }]
    });
}

// 自主课程信息
function getSelfTimetableView() {
    $("#table_list").bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    // var url = zuulServerUrl + "/limsproduct/limsproduct/lims/api/timetable/self/apiEduSelfCourseForAudit";
    var url = zuulServerUrl + "/timetable/api/timetable/self/apiEduSelfCourseForAudit";
    $("#table_list").bootstrapTable({
        //使用get请求到服务器获取数据
        method: "POST",
        //必须设置，不然request.getParameter获取不到请求参数
        contentType: "application/x-www-form-urlencoded",
        //获取数据的Servlet地址
        url: url,
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParams: queryParams,
        //表格显示条纹
        striped: true,
        cache: false,
        toolbar: "#toolbar",
        //启动分页
        pagination: false,
        //是否启用查询
        search: false,
        //是否启用详细信息视图
        detailView: false,
        //表示服务端请求
        sidePagination: "server",
        //json数据解析
        responseHandler: function (res) {
            return {
                "rows": res.rows,
                "total": res.total
            };
        },
        //数据列
        columns: [{
            title: "课程信息",
            field: "courseNumber",
            width: "20%",
            formatter: function (value, row, index) {
                return row.courseName + "(" + row.courseNumber + ")";
            }
        }, {
            title: "所属学院",
            field: "academyName",
            width: "15%",
        }, {
            title: "已排课表",
            field: "timetableDTOs",
            width: "40%",
            formatter: function (value, row, index) {
                var rt = "";
                var timetableDTOs = row.timetableDTOs;
                if (timetableDTOs.length > 0&&(row.timetableStyle==4||row.timetableStyle==6)) {
                    rt += '<table id="tb'+index+'" border="1"><tr><td width="10%">批/组</td><td width="7%">星期</td><td width="7%">节次</td><td width="7%">周次</td><td width="18%">实验室</td><td width="15%">授课教师</td><td width="18%">实验项目</td><td width="7%">名单</td><td width="16%">备注</td></tr>';
                }
                if (timetableDTOs.length > 0&&row.timetableStyle!=4&&row.timetableStyle!=6) {
                    rt += '<table border="1"><tr><td width="7%">星期</td><td width="7%">节次</td><td width="7%">周次</td><td width="32%">实验室</td><td width="15%">授课教师</td><td width="32%">实验项目</td><td width="16%">备注</td></tr>';
                }
                var count = Number(0);
                for (var i = 0, len = timetableDTOs.length; i < len; i++) {
                    if (timetableDTOs.length > 0&&(row.timetableStyle==4||row.timetableStyle==6)) {
                        var group_button_reality = 'group_button_reality_' + timetableDTOs[i].groupId;
                        var group_div_reality = 'div_reality_' + timetableDTOs[i].groupId;
                        var result = "<button  id='" + group_button_reality + "' class='btn btn-xs green' onclick=\"setTimetableGroupNumbersReality('" + row.selfId + "'," + timetableDTOs[i].groupId +","+timetableDTOs[i].groupNumbers+"," + timetableDTOs[i].groupStudents+",8)\" title='编辑' ><span class='glyphicon glyphicon'>" + timetableDTOs[i].groupNumbers + "/" + timetableDTOs[i].groupStudents + "</span></button>&nbsp;";
                        rt += "<tr><td>" + timetableDTOs[i].batchName +"/" + timetableDTOs[i].groupName + "</td><td>" + timetableDTOs[i].weekday + "</td><td>" + timetableDTOs[i].startClass + "-" + timetableDTOs[i].endClass + "</td><td>" + timetableDTOs[i].startWeek + "-" + timetableDTOs[i].endWeek + "</td><td>" + timetableDTOs[i].labInfo + "</td><td>" + timetableDTOs[i].teachers + "</td><td>" + timetableDTOs[i].items + "</td><td>" + result + "</td><td>";
                        if(timetableDTOs[i].adjustStatus == 16 && timetableDTOs[i].status == 12 ){
                            rt += "停课审核中";
                        }else if(timetableDTOs[i].adjustStatus == 1 && timetableDTOs[i].status == 12){
                            rt += "调课审核中";
                        }else if(timetableDTOs[i].adjustStatus == 1 && timetableDTOs[i].status == 15){
                            rt += "调课前数据";
                        }
                        rt += "</td></tr>";
                        rt += "<tr id=" + group_div_reality + " style=\"display: none;\"></tr>"
                    }
                    if (timetableDTOs.length > 0&&row.timetableStyle!=4&&row.timetableStyle!=6) {
                        rt += "<tr><td>" + timetableDTOs[i].weekday + "</td><td>" + timetableDTOs[i].startClass + "-" + timetableDTOs[i].endClass + "</td><td>" + timetableDTOs[i].startWeek + "-" + timetableDTOs[i].endWeek + "</td><td>" + timetableDTOs[i].labInfo + "</td><td>" + timetableDTOs[i].teachers + "</td><td>" + timetableDTOs[i].items + "</td><td>";
                        if(timetableDTOs[i].adjustStatus == 16 && timetableDTOs[i].status == 12 ){
                            rt += "停课审核中";
                        }else if(timetableDTOs[i].adjustStatus == 1 && timetableDTOs[i].status == 12){
                            rt += "调课审核中";
                        }else if(timetableDTOs[i].adjustStatus == 1 && timetableDTOs[i].status == 15){
                            rt += "调课前数据";
                        }
                        rt += "</td></tr>";
                    }
                }
                if (timetableDTOs.length > 0) {
                    rt += '</table>';
                }
                return rt;
            }
        }, {
            title: "状态",
            width: "5%",
            field: "empty",
            formatter: function (value, row, index) {
                var result = "";
                if (row.timetableStatus == 1) {
                    result += "排课已发布";
                } else if (row.timetableStatus == 2) {
                    result += "审核中";
                } else if(row.timetableStatus == 3){
                    result += "审核通过";
                }else if(row.timetableStatus == 4){
                    result += "审核拒绝";
                }
                return result;
            }
        }]
    });
    //默认展开
    $("#table_list").bootstrapTable('expandRow', 1);

    $("#term").on("change", function () {
        var params = $("#table_list").bootstrapTable('getOptions')
        $("#table_list").bootstrapTable('refresh', params);
    })
    $("#search").on("input", function () {
        var params = $("#table_list").bootstrapTable('getOptions')
        $("#table_list").bootstrapTable('refresh', params);
    })
}