/**
 *  Description JS-自主排课的主入口页面
 *
 *  @author weicheng
 *  @date 2021/1/27 15:19
 */
var contextPath = $("meta[name='contextPath']").attr("content");
var urlSelf = $('#zuulServerUrl').val()+"api/timetable/self/apiSelfCourseManageByDateAndPage";
var zuulUrl ="";
var timetableFlag =0;
$(document).ready(function () {
    zuulUrl =$("#zuulServerUrl").val()+"/timetable/";
    urlSelf = zuulUrl+"api/timetable/self/apiSelfCourseManageByDateAndPage";
    document.cookie = "term=NONE";// 判断默认学期
    c_start=document.cookie.indexOf("adjustType=");
    c_end=document.cookie.indexOf(";",c_start);
    var adjustType =document.cookie.substring(c_start,c_end);
    if(adjustType.split("=")[1]=='SELF'){
        getSeflMangerView();
    }else if(adjustType.split("=")[1]=='ADJUST_HISTORY'){
        getTimetableAdjustHistoryView();
    }else if(adjustType.split("=")[1]=='SUSPEND_HISTORY'){
        getTimetableSuspendHistoryView();
    }
});

/*
 * 得到查询的参数
 **/
function queryParams(params) {
    t_start=document.cookie.indexOf("term=");
    t_end=document.cookie.indexOf(";",t_start);
    var iterm =document.cookie.substring(t_start,t_end);
    if(iterm.split("=")[1]=='NONE'){
        $("#term").val($("#termId").val());
        document.cookie = "term=YES";
    }
    var arr = new Object();
    arr.termId = $("#term").val();
    arr.offset = params.offset;
    arr.status = "ARRANGE";
    arr.limit = params.limit;
    arr.search = $("#search").val();
    arr.sort= params.sort;
    arr.order= params.order;
    arr.createdBy = username;
    arr.role = role;
    arr.academyNumber = academyNumber;
    c_start=document.cookie.indexOf("adjustType=");
    c_end=document.cookie.indexOf(";",c_start);
    var adjustType =document.cookie.substring(c_start,c_end);
    if(adjustType.split("=")[1]=='ADJUST_HISTORY'){
        arr.backupType= "AdjustTimetableAudit";
    }else if(adjustType.split("=")[1]=='SUSPEND_HISTORY'){
        arr.backupType= "CloseTimetableAudit";
    }
    var arrs = JSON.stringify(arr);
    return arrs;
};

/*
 * 查看学生名单
 **/
function schoolCourseStudents(term, courseNo) {
    var index = layer.open({
        type: 2,
        title: '查看学生选课情况',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/schoolCourseStudnetList?term=' + term + '&courseNo=' + courseNo
    });
    layer.full(index);
}

function publicTimetableForSelf(timetableStyle, selfId, status) {
    //进行jwt握手，获取token
    //getJWTAuthority();
    var arr = new Object();
    arr.selfId = selfId;
    arr.timetableStyle = timetableStyle;
    arr.status = status;
    arr.createdBy = username;
    var arrs = JSON.stringify(arr);
    $.ajax({
        url: zuulUrl + "api/timetable/common/apiTimetablePublic",
        contentType: "application/json;charset=utf-8",
        headers:{Authorization: getJWTAuthority()},
        async: false,
        dataType: "json",
        type: "post",
        //async: false,
        data: arrs,
        success: function (json) {
            refreshBootstrapTableLayer();
        }
    });
    //window.parent.location.reload();
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}

function suspendTimetable(timetableStyle,same_number_id, week) {
    //进行jwt握手，获取token
    //getJWTAuthority();
    var weeks = new Array(1);
    weeks[0] = week;
    var arr = new Object();
    arr.timetableStyle = timetableStyle;
    //调停课
    arr.status = 11;
    arr.adjustWeek = week;
    arr.weeks = weeks;
    arr.sameNumberId = same_number_id;
    var arrs = JSON.stringify(arr);
    $.ajax({
        url: zuulUrl + "api/timetable/adjust/apiTimetableAdjustSuspend",
        contentType: "application/json;charset=utf-8",
        headers:{Authorization: getJWTAuthority()},
        async: false,
        dataType: "json",
        type: "post",
        //async: false,
        data: arrs,
        success: function (json) {
            refreshBootstrapTableLayer();
        }
    });
    //window.parent.location.reload();
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}

function deleteTimetable(term, courseNo) {
    if (confirm('是否确认删除？')) {
        //获取jwt认证，获取token
        //getJWTAuthority();
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiDeleteTimetableByCourseNo?term=" + term + "&courseNo=" + courseNo+ "&createdBy=" + username,
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            dataType: "json",
            type: "post",
            //async: false,
            success: function (json) {
            }
        });
        refreshBootstrapTableLayer();
    }
}

function refreshBootstrapTable() {
    var url = "";
    var view_radio =$("input[name='view_radio']:checked").val();
    if (view_radio=="course") {
        url = zuulUrl + "api/school/apiEduSchoolCourseByPage";
    }else{
        url = zuulUrl + "api/timetable/self/apiSelfCourseManageByDateAndPage";
    }
    var params = $("#table_list").bootstrapTable('getOptions')
    params.ajaxOptions.headers.Authorization =getJWTAuthority();
    params.url = url;
    params.silent=true;
    var pageNumber = params.pageNumber;
    $("#table_list").bootstrapTable('refresh', params);
}

function refreshBootstrapTableLayer() {
    var url = "";
    var view_radio =$("input[name='view_radio']:checked").val();
    if (view_radio=="course") {
    }else{
        url = zuulUrl + "api/timetable/self/apiSelfCourseManageByDateAndPage";
    }
    var params = $("#table_list").bootstrapTable('getOptions')
    params.ajaxOptions.headers.Authorization =getJWTAuthority();
    params.url = url;
    params.silent=true;
    var pageNumber = params.pageNumber;
    // $("#table_list").bootstrapTable('refresh', params);
    if(timetableFlag == 1){
        getSeflMangerView(pageNumber);
    }else if(timetableFlag == 3){
        getTimetableAdjustHistoryView(pageNumber)
    }else if(timetableFlag == 4){
        getTimetableSuspendHistoryView(pageNumber)
    }

}

/*
 *排课视图中不保留调课完成后的管理类操作
 **/
function getSeflMangerView(pageNumber) {
    if(pageNumber == null){
        pageNumber = 1;
    }
    timetableFlag = 1;
    document.cookie = "adjustType=SELF";
    $("#table_list").bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    var url = zuulUrl + "api/timetable/self/apiSelfCourseManageByDateAndPage";
    $("#table_list").bootstrapTable({
        //使用get请求到服务器获取数据
        method: "post",
        //必须设置，不然request.getParameter获取不到请求参数
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        //获取数据的Servlet地址
        url: urlSelf,
        ajaxOptions:{
            headers:{Authorization: getJWTAuthority()}
        },
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParams: queryParams,
        //表格显示条纹
        striped: true,
        cache: false,
        toolbar: "#toolbar",
        //启动分页
        pagination: true,
        //是否启用排序
        sortable: true,
        silentSort: true,
        //排序方式
        //sortOrder: "asc",
        //sortName: 'courseName',
        //是否显示所有的列（选择显示的列）
        showColumns: true,
        showRefresh: true,
        //每页显示的记录数
        pageSize: 15,
        //当前第几页
        pageNumber: pageNumber,
        //记录数可选列表
        pageList: [5, 10, 15, 20, 25],
        //是否启用查询
        search: false,
        searchAlign: 'left',
        //是否启用详细信息视图
        detailView: false,
        //表示服务端请求
        sidePagination: "server",
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParamsType: "limit",
        //json数据解析
        responseHandler: function (res) {
            return {
                "rows": res.rows,
                "total": res.total
            };
        },
        //数据列
        columns: [{
            //field: 'Number',//可不加
            title: '序号',//标题  可不加
            width: "5%",
            formatter: function (value, row, index) {
                return index + 1;
            }
        }, {
            title: "课程信息",
            field: "courseNumber",
            width: "7%",
            sortable: true,
            formatter: function (value, row, index) {
                return row.courseName + "(" + row.courseNumber + ")"+"<br/>"+"<br/>教学班编号"+"<br/>[" + row.courseNo + "]";
            }
        }, {
            title: "所属学院",
            field: "academyName",
            width: "7%",
            sortable: true
        }, {
            title: "已排课表",
            field: "timetableDTOs",
            width: "80%",
            formatter: function (value, row, index) {
                var rt = "";
                var timetableDTOs = row.timetableDTOs;

                if (timetableDTOs.length > 0&&(row.timetableStyle==4||row.timetableStyle==6)) {
                    rt += '<table border="1"><tr><td width="8%">批/组</td><td width="10%">上课时间</td><td width="5%">节次</td><td width="16%">实验室</td><td width="12%">授课教师</td><td width="11%">实验项目</td><td width="6%">名单</td><td width="8%">学生名单</td><td width="13%">操作</td></tr>';
                }
                if (timetableDTOs.length > 0&&row.timetableStyle!=4&&row.timetableStyle!=6) {
                    rt += '<table border="1"><tr><td width="14%">上课时间</td><td width="7%">节次</td><td width="18%">实验室</td><td width="16%">授课教师</td><td width="11%">实验项目</td><td width="8%">学生名单</td><td width="13%">操作</td></tr>';
                }
                var count = Number(0);
                var studentList = "";
                studentList = "<a href='javascript:;' class='btn btn-xs green' title='查看'  onclick=\"schoolCourseStudents(" + row.termId + ",'" + row.courseNo + "')\" >名单(" + row.student + ")</a>";
                var operation = "";
                // if(authName == 'ROLE_EXCENTERDIRECTOR') {// 中心主任
                //     operation += "<a href='javascript:;' class='btn btn-xs green' title='查看'  onclick=\"publicTimetable("+row.timetableStyle+",'" + row.selfId + "',10)\" ><span class='glyphicon glyphicon-ok'>调课</span></a>&nbsp;";
                //     operation += "<a href='javascript:;' class='btn btn-xs green' title='查看'  onclick=\"publicTimetable("+row.timetableStyle+",'" + row.courseNo + "',10)\" ><span class='glyphicon glyphicon-ok'>停课</span></a>&nbsp;";
                // }else {
                //     operation += "操作未授权";
                // }

                var tlength = 0;
                if(timetableDTOs!=null){
                    tlength = timetableDTOs.length;
                }
                var isAdjust = 0;
                for (var i1 = 0, len1 = tlength; i1 < len1; i1++) {
                    if(timetableDTOs.length > 0) {
                        for (var j1 = timetableDTOs[i1].startWeek; j1 < timetableDTOs[i1].endWeek + 1; j1++) {
                            if(timetableDTOs[i1].status==1 || timetableDTOs[i1].status==11 ) {
                                if (timetableDTOs[i1].adjustStatus == 1) {
                                    isAdjust = 1;
                                } else if (timetableDTOs[i1].adjustStatus == 16) {
                                    isAdjust = 2;
                                }
                            }
                        }
                    }
                }
                for (var i = 0, len = timetableDTOs.length; i < len; i++) {
                    var teacher =timetableDTOs[i].teachers;
                    teacher = teacher.replace("</br>","");
                    if(timetableDTOs.length > 0){
                        for (var j = timetableDTOs[i].startWeek; j<timetableDTOs[i].endWeek+1; j++) {
                            var operation = "";
                            //判断状态
                            if(timetableDTOs[i].status==1 || timetableDTOs[i].status==11 ){
                                if(timetableDTOs[i].adjustStatus==1){
                                    operation ="<font>调课后数据</font><br>";
                                }else if(timetableDTOs[i].adjustStatus==16){
                                    operation ="<font>停课中</font><br>";
                                }else if(authName == 'ROLE_TEACHER') {// 教师
                                    if(isAdjust == 1 || isAdjust == 0){
                                        operation += "<button  onclick=\"doEduReCourseBySelf("+ timetableDTOs[i].sameNumberId +"," + j +",'" + timetableDTOs[i].selfId + "', '" + row.timetableStyle + "',"+ timetableDTOs[i].groupId +")\" ><span class='glyphicon glyphicon-edit'>调课</span></button>&nbsp;";
                                    }
                                    if(isAdjust == 2 || isAdjust == 0){
                                        operation += "<button  onclick=\"suspendTimetable("+row.timetableStyle+","+timetableDTOs[i].sameNumberId+","+j +")\" ><span class='glyphicon glyphicon-ok'>停课</span></button>&nbsp;";
                                    }
                                }else {
                                    operation += "操作未授权";
                                }
                            }else if(timetableDTOs[i].status==10){
                                operation ="排课未发布...";
                            }else if(timetableDTOs[i].status==15){
                                operation ="<font color='red'>调课前数据</font>";
                            }else if(timetableDTOs[i].status==16){
                                operation ="<font color='red'>已停课</font>";
                            }else{
                                if(timetableDTOs[i].adjustStatus==16){
                                    operation ="停课待审核...";
                                }else if(timetableDTOs[i].adjustStatus==1){
                                    operation ="调课待审核...";
                                }
                            }

                            if (timetableDTOs.length > 0&&(row.timetableStyle==4||row.timetableStyle==6)) {
                                var group_button_reality = 'group_button_reality_' + timetableDTOs[i].groupId + '_' + j;
                                var group_div_reality = 'div_reality_' + timetableDTOs[i].groupId + '_' + j;
                                var result = "<button  id='" + group_button_reality + "' class='btn btn-xs green' onclick=\"setTimetableGroupNumbersReality('" + row.courseNo + "'," + timetableDTOs[i].groupId +","+timetableDTOs[i].groupNumbers+"," + timetableDTOs[i].groupStudents+",8," + j +")\" title='编辑' ><span class='glyphicon glyphicon'>" + timetableDTOs[i].groupNumbers + "/" + timetableDTOs[i].groupStudents + "</span></button>&nbsp;";
                                rt += "<tr><td>" + timetableDTOs[i].batchName +"/" + timetableDTOs[i].groupName + "</td><td>第" +j+"周（星期"+ timetableDTOs[i].weekday + "）</td><td>";
                                if (timetableDTOs[i].startClass == timetableDTOs[i].endClass) {
                                    rt += timetableDTOs[i].endClass;
                                } else {
                                    rt += timetableDTOs[i].startClass + "-" + timetableDTOs[i].endClass;
                                }
                                rt += "</td><td>" + timetableDTOs[i].labInfo + "</td><td>" + teacher + "</td><td>" + timetableDTOs[i].items + "</td><td>" + result + "</td><td>" + studentList + "</td><td>" + operation + "</td></tr>";
                                rt += "<tr id=" + group_div_reality + " style=\"display: none;\"></tr>"
                            }
                            if (timetableDTOs.length > 0&&row.timetableStyle!=4&&row.timetableStyle!=6) {
                                rt += "<tr><td>第" +j+"周（星期"+ timetableDTOs[i].weekday + "）</td><td>";
                                if (timetableDTOs[i].startClass == timetableDTOs[i].endClass) {
                                    rt += timetableDTOs[i].endClass;
                                } else {
                                    rt += timetableDTOs[i].startClass + "-" + timetableDTOs[i].endClass;
                                }
                                rt += "</td><td>" + timetableDTOs[i].labInfo + "</td><td>" + teacher + "</td><td>" + timetableDTOs[i].items + "</td><td>" + studentList + "</td><td>" + operation + "</td></tr>";
                            }
                        }
                    }

                }
                if (timetableDTOs.length > 0) {
                    rt += '</table>';
                }
                return rt;
            }
        }, {
            title: "操作",
            width: "4%",
            field: "empty",
            formatter: function (value, row, index) {
                var id = value;
                var result = "" ;
                var timetableDTOs = row.timetableDTOs;
                var tlength = 0;
                if(timetableDTOs!=null){
                    tlength = timetableDTOs.length;
                }
                var isAdjust = 0;
                for (var i1 = 0, len1 = tlength; i1 < len1; i1++) {
                    if(timetableDTOs.length > 0) {
                        for (var j1 = timetableDTOs[i1].startWeek; j1 < timetableDTOs[i1].endWeek + 1; j1++) {
                            if(timetableDTOs[i1].status==12) {
                                if (timetableDTOs[i1].adjustStatus == 1) {
                                    isAdjust = 1;
                                } else if (timetableDTOs[i1].adjustStatus == 16) {
                                    isAdjust = 2;
                                }
                            }
                        }
                    }
                }
                if(row.timetableStatus==11){
                    result =   "<a href='javascript:;' class='btn btn-xs green' title='查看'  onclick=\"publicTimetableForSelf("+row.timetableStyle+",'" + row.selfId + "',12)\" ><span class='glyphicon glyphicon-ok'>调课完成</span></a>&nbsp;";
                }
                if(row.timetableStatus==12){
                    var auditButtonStr = "点击审核";
                    if(authName == 'ROLE_TEACHER'){
                        auditButtonStr = "查看审核";
                    }
                    if(isAdjust == 1) {
                        result = "<a href='javascript:;' class='btn btn-xs green' title='查看'  onclick=\"auditTimetable('" + row.selfId + "','AdjustTimetableAudit','-1','" + row.timetableStyle + "')\" ><span class='glyphicon glyphicon-ok'>" + auditButtonStr + "</span></a>&nbsp;";
                    }else if(isAdjust == 2){
                        result = "<a href='javascript:;' class='btn btn-xs green' title='查看'  onclick=\"auditTimetable('" + row.selfId + "','CloseTimetableAudit','-1','" + row.timetableStyle + "')\" ><span class='glyphicon glyphicon-ok'>" + auditButtonStr + "</span></a>&nbsp;";
                    }
                }
                if(row.timetableStatus==15){
                    result =   "<a href='javascript:;' class='btn btn-xs green' title='查看'  onclick=\"publicTimetableForSelf("+row.timetableStyle+",'" + row.selfId + "',13)\" ><span class='glyphicon glyphicon-ok'>待审核</span></a>&nbsp;";
                }
                if(row.timetableStatus==16){
                    result =   "<a href='javascript:;' class='btn btn-xs green' title='查看'  onclick=\"publicTimetableForSelf("+row.timetableStyle+",'" + row.selfId + "',13)\" ><span class='glyphicon glyphicon-ok'>待审核</span></a>&nbsp;";
                }
                return result;
            }
        }],
        onPageChange: function (number,size) {
            getSeflMangerView(number);
        }
    });
    //默认展开
    $("#table_list").bootstrapTable('expandRow', 1);

    $("#term").on("change", function () {
        var params = $("#table_list").bootstrapTable('getOptions')
        $("#table_list").bootstrapTable('refresh', params);
    })
    $("#search").keydown("input", function (event) {
        var params = $("#table_list").bootstrapTable('getOptions')
        // $("#table_list").bootstrapTable('refresh', params);
        if (event.keyCode==13){
            $("#table_list").bootstrapTable('refresh', params);
        }
    })
}

function getTimetableAdjustHistoryView(pageNumber) {
    if(pageNumber == null){
        pageNumber = 1;
    }
    timetableFlag = 3;
    document.cookie = "adjustType=ADJUST_HISTORY";
    //初始化表格,动态从服务器加载数据
    $("#table_list").bootstrapTable('destroy');
    var url = zuulUrl + "/api/timetable/common/apiTimetableHistory";
    $("#table_list").bootstrapTable({
        //使用get请求到服务器获取数据
        method: "POST",
        //必须设置，不然request.getParameter获取不到请求参数
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        //获取数据的Servlet地址
        url: url,
        ajaxOptions:{
            headers: {Authorization: getJWTAuthority()}
        },
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParams: queryParams,
        //表格显示条纹
        striped: true,
        cache: false,
        toolbar: "#toolbar",
        //启动分页
        pagination: true,
        //是否启用排序
        sortable: true,
        silentSort: true,
        //排序方式
        //sortOrder: "asc",
        //sortName: 'courseName',
        //是否显示所有的列（选择显示的列）
        showColumns: true,
        showRefresh: true,
        //每页显示的记录数
        pageSize: 15,
        //当前第几页
        pageNumber: pageNumber,
        //记录数可选列表
        pageList: [5, 10, 15, 20, 25],
        //是否启用查询
        search: false,
        searchAlign: 'left',
        //是否启用详细信息视图
        detailView: false,
        //表示服务端请求
        sidePagination: "server",
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParamsType: "limit",
        //json数据解析
        responseHandler: function (res) {
            return {
                "rows": res.rows,
                "total": res.total
            };
        },
        //数据列
        columns: [{
            //field: 'Number',//可不加
            title: '序号',//标题  可不加
            width: "3%",
            formatter: function (value, row, index) {
                return index + 1;
            }
        }, {
            title: "课程信息",
            field: "businessId",
            width: "5%",
            sortable: true,
            formatter: function (value, row, index) {
                return row.courseName + "<br/>(" + row.courseNumber + ")"+"<br/>"+"<br/>教学班编号"+"<br/>[" + row.courseNo + "]";
            }
        },  {
            title: "已排课表",
            field: "timetableDTOs",
            width: "31%",
            formatter: function (value, row, index) {
                var rt = "";
                var timetableDTOs = row.timetableDTOs;
                if (timetableDTOs.length > 0&&(row.timetableStyle==4||row.timetableStyle==6)) {
                    rt += '<table border="1"><tr><td width="21%">批/组</td><td width="12%">星期</td><td width="14%">节次</td><td width="14%">周次</td><td width="28%">实验室</td><td width="6%">名单</td><td width="5%">备注</td></tr>';
                }
                if (timetableDTOs.length > 0&&row.timetableStyle!=4&&row.timetableStyle!=6) {
                    rt += '<table border="1"><tr><td width="15%">星期</td><td width="15%">节次</td><td width="15%">周次</td><td width="50%">实验室</td><td width="5%">备注</td></tr>';
                }
                var count = Number(0);
                for (var i = 0, len = timetableDTOs.length; i < len; i++) {
                    if (timetableDTOs.length > 0&&(row.timetableStyle==4||row.timetableStyle==6)) {
                        var group_button_reality = 'group_button_reality_' + timetableDTOs[i].groupId + '_' + j;
                        var group_div_reality = 'div_reality_' + timetableDTOs[i].groupId + '_' + j;
                        var result = "<button  id='" + group_button_reality + "' class='btn btn-xs green' onclick=\"setTimetableGroupNumbersReality('" + row.courseNo + "'," + timetableDTOs[i].groupId +","+timetableDTOs[i].groupNumbers+","+ timetableDTOs[i].groupStudents+",6," + j +")\" title='编辑' ><span class='glyphicon glyphicon'>" + timetableDTOs[i].groupNumbers + "/" + timetableDTOs[i].groupStudents + "</span></button>";
                        rt += "<tr><td>" + timetableDTOs[i].batchName +"/" + timetableDTOs[i].groupName + "</td><td>" + timetableDTOs[i].weekday + "</td><td>";
                        if (timetableDTOs[i].startClass == timetableDTOs[i].endClass) {
                            rt += timetableDTOs[i].endClass;
                        } else {
                            rt += timetableDTOs[i].startClass + "-" + timetableDTOs[i].endClass;
                        }
                        rt += "</td><td>";
                        if (timetableDTOs[i].startWeek == timetableDTOs[i].endWeek) {
                            rt += timetableDTOs[i].endWeek;
                        } else {
                            rt += timetableDTOs[i].startWeek + "-" + timetableDTOs[i].endWeek;
                        }
                        rt += "</td><td>" + timetableDTOs[i].labInfo + "</td><td>" + result + "</td><td>" + timetableDTOs[i].termName + "</td></tr>";
                        rt += "<tr id=" + group_div_reality + " style=\"display: none;\"></tr>"
                    }
                    if (timetableDTOs.length > 0&&row.timetableStyle!=4&&row.timetableStyle!=6) {
                        rt += "<tr><td>" + timetableDTOs[i].weekday + "</td><td>";
                        if (timetableDTOs[i].startClass == timetableDTOs[i].endClass) {
                            rt += timetableDTOs[i].endClass;
                        } else {
                            rt += timetableDTOs[i].startClass + "-" + timetableDTOs[i].endClass;
                        }
                        rt += "</td><td>";
                        if (timetableDTOs[i].startWeek == timetableDTOs[i].endWeek) {
                            rt += timetableDTOs[i].endWeek;
                        } else {
                            rt += timetableDTOs[i].startWeek + "-" + timetableDTOs[i].endWeek;
                        }
                        rt += "</td><td>" + timetableDTOs[i].labInfo + "</td><td>" + timetableDTOs[i].termName + "</td></tr>";
                    }
                }
                if (timetableDTOs.length > 0) {
                    rt += '</table>';
                }

                return rt;
            }
        }, {
            title: "上课教师",
            field: "teacher",
            width: "5%",
            sortable: true,
            formatter: function (value, row, index) {
                return row.cname;
            }
        }, {
            title: "辅导",
            field: "tutor",
            width: "5%",
            sortable: true,
            formatter: function (value, row, index) {
                return row.username;
            }
        },{
            title: "创建人",
            field: "creator",
            width: "5%",
            formatter: function (value, row, index) {
                return row.classInfo;
            }
        }, {
            title: "操作",
            width: "19%",
            field: "empty",
            formatter: function (value, row, index) {
                return row.academyName;
            }
        }],
        onPageChange: function (number,size) {
            getTimetableAdjustHistoryView(number);
        }
    });
    //默认展开
    $("#table_list").bootstrapTable('expandRow', 1);

    $("#term").on("change", function () {
        var params = $("#table_list").bootstrapTable('getOptions')
        $("#table_list").bootstrapTable('refresh', params);
    })
    $("#search").keydown("input", function (event) {
        var params = $("#table_list").bootstrapTable('getOptions')
        // $("#table_list").bootstrapTable('refresh', params);
        if (event.keyCode==13){
            $("#table_list").bootstrapTable('refresh', params);
        }
    })
}

function getTimetableSuspendHistoryView(pageNumber) {
    if(pageNumber == null){
        pageNumber = 1;
    }
    timetableFlag = 4;
    document.cookie = "adjustType=SUSPEND_HISTORY";
    //初始化表格,动态从服务器加载数据
    $("#table_list").bootstrapTable('destroy');
    var url = zuulUrl + "/api/timetable/common/apiTimetableHistory";
    $("#table_list").bootstrapTable({
        //使用get请求到服务器获取数据
        method: "POST",
        //必须设置，不然request.getParameter获取不到请求参数
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        //获取数据的Servlet地址
        url: url,
        ajaxOptions:{
            headers: {Authorization: getJWTAuthority()}
        },
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParams: queryParams,
        //表格显示条纹
        striped: true,
        cache: false,
        toolbar: "#toolbar",
        //启动分页
        pagination: true,
        //是否启用排序
        sortable: true,
        silentSort: true,
        //排序方式
        //sortOrder: "asc",
        //sortName: 'courseName',
        //是否显示所有的列（选择显示的列）
        showColumns: true,
        showRefresh: true,
        //每页显示的记录数
        pageSize: 15,
        //当前第几页
        pageNumber: pageNumber,
        //记录数可选列表
        pageList: [5, 10, 15, 20, 25],
        //是否启用查询
        search: false,
        searchAlign: 'left',
        //是否启用详细信息视图
        detailView: false,
        //表示服务端请求
        sidePagination: "server",
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParamsType: "limit",
        //json数据解析
        responseHandler: function (res) {
            return {
                "rows": res.rows,
                "total": res.total
            };
        },
        //数据列
        columns: [{
            //field: 'Number',//可不加
            title: '序号',//标题  可不加
            width: "3%",
            formatter: function (value, row, index) {
                return index + 1;
            }
        }, {
            title: "课程信息",
            field: "businessId",
            width: "5%",
            sortable: true,
            formatter: function (value, row, index) {
                return row.courseName + "<br/>(" + row.courseNumber + ")"+"<br/>"+"<br/>教学班编号"+"<br/>[" + row.courseNo + "]";
            }
        },  {
            title: "已排课表",
            field: "timetableDTOs",
            width: "31%",
            formatter: function (value, row, index) {
                var rt = "";
                var timetableDTOs = row.timetableDTOs;
                if (timetableDTOs.length > 0&&(row.timetableStyle==4||row.timetableStyle==6)) {
                    rt += '<table border="1"><tr><td width="21%">批/组</td><td width="12%">星期</td><td width="14%">节次</td><td width="14%">周次</td><td width="28%">实验室</td><td width="6%">名单</td><td width="5%">备注</td></tr>';
                }
                if (timetableDTOs.length > 0&&row.timetableStyle!=4&&row.timetableStyle!=6) {
                    rt += '<table border="1"><tr><td width="15%">星期</td><td width="15%">节次</td><td width="15%">周次</td><td width="50%">实验室</td><td width="5%">备注</td></tr>';
                }
                var count = Number(0);
                for (var i = 0, len = timetableDTOs.length; i < len; i++) {
                    if (timetableDTOs.length > 0&&(row.timetableStyle==4||row.timetableStyle==6)) {
                        var group_button_reality = 'group_button_reality_' + timetableDTOs[i].groupId + '_' + j;
                        var group_div_reality = 'div_reality_' + timetableDTOs[i].groupId + '_' + j;
                        var result = "<button  id='" + group_button_reality + "' class='btn btn-xs green' onclick=\"setTimetableGroupNumbersReality('" + row.courseNo + "'," + timetableDTOs[i].groupId +","+timetableDTOs[i].groupNumbers+","+ timetableDTOs[i].groupStudents+",6," + j +")\" title='编辑' ><span class='glyphicon glyphicon'>" + timetableDTOs[i].groupNumbers + "/" + timetableDTOs[i].groupStudents + "</span></button>";
                        rt += "<tr><td>" + timetableDTOs[i].batchName +"/" + timetableDTOs[i].groupName + "</td><td>" + timetableDTOs[i].weekday + "</td><td>";
                        if (timetableDTOs[i].startClass == timetableDTOs[i].endClass) {
                            rt += timetableDTOs[i].endClass;
                        } else {
                            rt += timetableDTOs[i].startClass + "-" + timetableDTOs[i].endClass;
                        }
                        rt += "</td><td>";
                        if (timetableDTOs[i].startWeek == timetableDTOs[i].endWeek) {
                            rt += timetableDTOs[i].endWeek;
                        } else {
                            rt += timetableDTOs[i].startWeek + "-" + timetableDTOs[i].endWeek;
                        }
                        rt += "</td><td>" + timetableDTOs[i].labInfo + "</td><td>" + result + "</td><td>" + timetableDTOs[i].termName + "</td></tr>";
                        rt += "<tr id=" + group_div_reality + " style=\"display: none;\"></tr>"
                    }
                    if (timetableDTOs.length > 0&&row.timetableStyle!=4&&row.timetableStyle!=6) {
                        rt += "<tr><td>" + timetableDTOs[i].weekday + "</td><td>";
                        if (timetableDTOs[i].startClass == timetableDTOs[i].endClass) {
                            rt += timetableDTOs[i].endClass;
                        } else {
                            rt += timetableDTOs[i].startClass + "-" + timetableDTOs[i].endClass;
                        }
                        rt += "</td><td>";
                        if (timetableDTOs[i].startWeek == timetableDTOs[i].endWeek) {
                            rt += timetableDTOs[i].endWeek;
                        } else {
                            rt += timetableDTOs[i].startWeek + "-" + timetableDTOs[i].endWeek;
                        }
                        rt += "</td><td>" + timetableDTOs[i].labInfo + "</td><td>" + timetableDTOs[i].termName + "</td></tr>";
                    }
                }
                if (timetableDTOs.length > 0) {
                    rt += '</table>';
                }

                return rt;
            }
        }, {
            title: "上课教师",
            field: "teacher",
            width: "5%",
            sortable: true,
            formatter: function (value, row, index) {
                return row.cname;
            }
        }, {
            title: "辅导",
            field: "tutor",
            width: "5%",
            sortable: true,
            formatter: function (value, row, index) {
                return row.username;
            }
        },{
            title: "创建人",
            field: "creator",
            width: "5%",
            formatter: function (value, row, index) {
                return row.classInfo;
            }
        }, {
            title: "操作",
            width: "19%",
            field: "empty",
            formatter: function (value, row, index) {
                return row.academyName;
            }
        }],
        onPageChange: function (number,size) {
            getTimetableSuspendHistoryView(number);
        }
    });
    //默认展开
    $("#table_list").bootstrapTable('expandRow', 1);

    $("#term").on("change", function () {
        var params = $("#table_list").bootstrapTable('getOptions')
        $("#table_list").bootstrapTable('refresh', params);
    })
    $("#search").keydown("input", function (event) {
        var params = $("#table_list").bootstrapTable('getOptions')
        // $("#table_list").bootstrapTable('refresh', params);
        if (event.keyCode==13){
            $("#table_list").bootstrapTable('refresh', params);
        }
    })
}

/*
 *修改二次不分批排课弹出窗口
 **/
function doEduReCourseBySelf(sameNumberId,week,courseNo, timeStyle, groupId) {
    term = $("#term").val();
    //调课标记位
    adjustStatus = 1;
    if(typeof(sameNumberId) == "undefined"){
        sameNumberId=-1;
    }
    var index = layer.open({
        type: 2,
        title: '调课',
        maxmin: true,
        // shadeClose: true,
        // closeBtn:0,
        area: ['1100px', '500px'],
        // content: location.origin + '/teacherInformationCenter/lims/timetable/course/educationalSchedulingCourseNoBatch?courseNo=' + courseNo+ "&term=" + term+ "&timetableStyle=" + timeStyle +"&adjustStatus=" + adjustStatus+ '&sameNumberId=' + sameNumberId+ '&week='+week+'&groupId='+groupId+ "&step=3",
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/adjustEduReTimetableCourse?currpage=1&flag=0&timetableStyle=' + timeStyle + '&courseNo=' + courseNo + "&term=" + term
        + '&tableAppId=' + 0+ '&sameNumberId=' + sameNumberId+ '&adjustStatus='+adjustStatus+ '&week='+week+'&groupId='+groupId,
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(index);
}

/*
 *设置分组实际名单
 **/
function setTimetableGroupNumbersReality(courseNo, groupId,groupNumbers,groupStudentNumbers,colspanValue,j) {
    //变量：学生名单复选框的id和name
    var group_reality_check = "group_reality_check_"+groupId+'_'+j;
    if($("#div_reality_" + groupId+'_'+j).is(":hidden")) {
        $('#div_reality_' + groupId+'_'+j).show();
        $("#group_button_reality_" + groupId+'_'+j).text('返回');
        //获取学生名单
        var groupStudent = getTimetableGroupStudents(courseNo, groupId);
        var htmlInfo = "<td colspan='"+colspanValue+"'><table border=\"1\"><tr><td colspan='4'><b>查看分组学生名单</b></td><td>选择</td></tr>";

        $.each(groupStudent.userDTOs, function (idx, obj) {
            if (obj.selected == "1") {
                htmlInfo += "<tr><td>姓名：</td><td>" + obj.cname + "</td><td>学号：</td><td>" + obj.username + ";</td><td>该组学生</td></tr>";
            } else if(obj.selected == "0") {
                htmlInfo += "<tr><td>姓名：</td><td>" + obj.cname + "</td><td>学号：</td><td>" + obj.username + ";</td><td><font color='red'> 未分组学生</font></td></tr>";
            } else if(obj.selected == "-1") {
                htmlInfo += "<tr><td>姓名：</td><td>" + obj.cname + "</td><td>学号：</td><td>" + obj.username + ";</td><td><font color='blue'>其他学生</font></td></tr>";
            }
        });
        htmlInfo += "</table></td>";
        $('#div_reality_' + groupId+'_'+j).html(htmlInfo);
        $(':button').attr("disabled", "true");
        $("#group_button_reality_" + groupId+'_'+j).removeAttr("disabled");
    } else {
        $("#group_button_reality_" + groupId+'_'+j).text(groupNumbers+"/"+groupStudentNumbers);
        $('#div_reality_' + groupId+'_'+j).hide();
        $(':button').removeAttr("disabled");
    }
}

/*
 *根据分组，获取已分组名单json的ajax
 **/
function getTimetableGroupStudents(courseNo, groupId) {
    var returnGroupStudents = "";
    $.ajax({
        url: zuulUrl + "api/timetable/manage/getTimetableGroupStudents?groupId=" + groupId + "&courseNo=" + courseNo,
        contentType: "application/json;charset=utf-8",
        headers:{Authorization: getJWTAuthority()},
        async: false,
        dataType: "json",
        type: "post",
        //async: false,
        success: function (json) {
            returnGroupStudents = json;
        }
    });
    return returnGroupStudents;
}

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

/*
 *审核页面
 **/
function auditTimetable(courseNo, businessType, businessUid, timetableStyle) {
    var index = layer.open({
        type: 2,
        title: '审核',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/auditTimetable?businessAppUid=' + courseNo.toString()+'&businessType='+businessType+'&businessUid='+businessUid+'&timetableStyle='+timetableStyle,
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(index);
}

