var contextPath = $("meta[name='contextPath']").attr("content");
var urlPlan = "";
var zuulUrl ="";
var audit = false;// 排课是否需要审核
var businessType = "";// 审核参数
var businessUid = "-1";
$(document).ready(function () {
    // 页面参数传递
    businessType = $("#businessType").val();

    zuulUrl =$("#zuulServerUrl").val()+"/timetable/";
    urlPlan = zuulUrl+"api/timetable/student/apiStuCourseByPage";
    document.cookie = "term=NONE";// 判断默认学期
    c_start=document.cookie.indexOf("itype=");
    c_end=document.cookie.indexOf(";",c_start);
    getTimetablePlanView();
});

//得到查询的参数
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
    arr.status = $("input[name='view_status']:checked").val();
    arr.limit = params.limit;
    arr.search = $("#search").val();
    arr.sort= params.sort;
    arr.order= params.order;
    arr.createdBy = username;
    arr.role = role;
    arr.academyNumber = academyNumber;
    var arrs = JSON.stringify(arr);
    return arrs;
};

function refreshBootstrapTable() {
    url = zuulUrl + "api/timetable/student/apiStuCourseByPage";
    var params = $("#table_list").bootstrapTable('getOptions')
    params.ajaxOptions.headers.Authorization =getJWTAuthority();
    params.url = url;
    params.silent=true;
    $("#table_list").bootstrapTable('refresh', params);

}
// 排课视图中不保留调课完成后的管理类操作
function getTimetablePlanView() {
    $("#allRadio").prop("checked",true);
    //获取jwt认证，获取token
    //初始化表格,动态从服务器加载数据
    $("#table_list").bootstrapTable('destroy');
    $("#table_list").bootstrapTable({
        //使用get请求到服务器获取数据
        method: "post",
        //必须设置，不然request.getParameter获取不到请求参数
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        //获取数据的Servlet地址
        url: urlPlan,
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
        pagination: false,
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
        pageNumber: 1,
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
                // return row.courseNumber;
            }
        }, {
            title: "课程信息",
            field: "courseNumber",
            width: "8%",
            sortable: true,
            formatter: function (value, row, index) {
                return row.courseName + "<br/>(" + row.courseNumber + ")";
            }
        }, {
            title: "所属学院",
            field: "academyName",
            width: "5%",
            sortable: true
        }, {
            title: "选课信息",
            field: "timetableBatchDTOS",
            width: "84%",
            formatter: function (value, row, index) {
                var rt = "";
                var timetableBatchDTOS = row.timetableBatchDTOS;
                if (timetableBatchDTOS.length > 0) {
                    rt += '<table border="1"><tr><td width="5%">批次</td><td width="5%">每人可选组数</td><td width="10%">选课起止时间</td><td width="80%">分组信息</td></tr>';
                }
                var batchId = 0;
                for (var i = 0, len = timetableBatchDTOS.length; i < len; i++) {
                    var startDate = new Date(timetableBatchDTOS[i].startDate);
                    var endDate = new Date(timetableBatchDTOS[i].endDate);
                    var currDate = new Date();
                    // 遍历组别
                    var gp = "<table border='1'><tr><td>组别</td><td>课程安排</td><td>桌号</td><td>已选/容量</td><td>操作</td></tr>";
                    for (var j=0; j < timetableBatchDTOS[i].timetableGroupDTOs.length; j++) {
                        // 遍历timetableDTO
                        var ti = "<table id='schedule_course' border='1'><tr><td width='13%'>周次</td><td width='10%'>星期</td><td width='10%'>节次</td><td width='17%'>实验室</td><td width='10%'>教师</td><td>项目</td></tr>";
                        for (var t=0; t < timetableBatchDTOS[i].timetableGroupDTOs[j].timetables.length; t++) {
                            ti += "<tr><td>";
                            // 合并相同起止周次
                            if (timetableBatchDTOS[i].timetableGroupDTOs[j].timetables[t].startWeek == timetableBatchDTOS[i].timetableGroupDTOs[j].timetables[t].endWeek) {
                                ti += timetableBatchDTOS[i].timetableGroupDTOs[j].timetables[t].startWeek;
                            }else {
                                ti += timetableBatchDTOS[i].timetableGroupDTOs[j].timetables[t].startWeek +"-"+ timetableBatchDTOS[i].timetableGroupDTOs[j].timetables[t].endWeek;
                            }
                            ti += "</td><td>"+ timetableBatchDTOS[i].timetableGroupDTOs[j].timetables[t].weekday +"</td><td>";
                            // 合并相同起止节次
                            /*if (timetableBatchDTOS[i].timetableGroupDTOs[j].timetables[t].startClass == timetableBatchDTOS[i].timetableGroupDTOs[j].timetables[t].endClass) {
                                ti += timetableBatchDTOS[i].timetableGroupDTOs[j].timetables[t].startClass;
                            }else {
                                ti += timetableBatchDTOS[i].timetableGroupDTOs[j].timetables[t].startClass +"-"+ timetableBatchDTOS[i].timetableGroupDTOs[j].timetables[t].endClass;
                            }*/
                            ti += timetableBatchDTOS[i].timetableGroupDTOs[j].timetables[t].startClassTime +"-"+ timetableBatchDTOS[i].timetableGroupDTOs[j].timetables[t].endClassTime;
                            ti += "</td><td>"+ timetableBatchDTOS[i].timetableGroupDTOs[j].timetables[t].labInfo +"</td><td>"+ timetableBatchDTOS[i].timetableGroupDTOs[j].timetables[t].teachers +"</td>" +
                                "<td>"+ timetableBatchDTOS[i].timetableGroupDTOs[j].timetables[t].items +"</td>" +
                                "</tr>";
                        }
                        ti += "</table>";
                        
                        gp += "<tr><td>"+timetableBatchDTOS[i].timetableGroupDTOs[j].groupName+"</td><td>"+ ti +"</td><td>"+timetableBatchDTOS[i].timetableGroupDTOs[j].station+"</td>" +
                            "<td>"+ timetableBatchDTOS[i].timetableGroupDTOs[j].groupStudentNumbers +"/"+ timetableBatchDTOS[i].timetableGroupDTOs[j].groupNumber +"</td><td>";
                        // 判断是否可选/退选
                        if (currDate > startDate && currDate < endDate) {
                            if (timetableBatchDTOS[i].timetableGroupDTOs[j].selected == 1) {
                                gp += "<a href='javascript:;' class='btn btn-xs red' style='background: #CCCC33 !important;' onclick=\"dropGroupStudent(" + timetableBatchDTOS[i].timetableGroupDTOs[j].id + ")\" ><span class='glyphicon glyphicon-check'>退选</span></a>";
                            } else if (timetableBatchDTOS[i].timetableGroupDTOs[j].selected == 2) {
                                gp += "<span style='color: red'>选定组数已达上限</span>";
                            } else if (timetableBatchDTOS[i].timetableGroupDTOs[j].selected == 3) {
                                gp += "<span style='color: red'>名额已满</span>";
                            } else if (timetableBatchDTOS[i].timetableGroupDTOs[j].timetables.length == 0) {
                                gp += "<span style='color: red'>未排课</span>";
                            } else {
                                gp += "<a href='javascript:;' class='btn btn-xs green' onclick=\"selectBatchGroup(" + timetableBatchDTOS[i].timetableGroupDTOs[j].id + ")\" ><span class='glyphicon glyphicon-check'>选定</span></a>";
                            }
                        }else {
                            if (timetableBatchDTOS[i].timetableGroupDTOs[j].selected == 1) {
                                gp += "<span style='color: blue'>已选定</span>";
                            } else if (currDate > endDate) {
                                gp += "<span style='color: red'>已结束</span>";
                            } else if (currDate < startDate) {
                                gp += "<span style='color: blue'>未开始</span>";
                            }
                        }
                        gp += "</td></tr>";
                    }
                    gp += "</table>";

                    if (timetableBatchDTOS.length > 0) {
                        rt += "<tr><td>" + timetableBatchDTOS[i].batchName + "</td>" +
                            "<td>" + timetableBatchDTOS[i].maxGroupNum + "</td>" +
                            "<td>" + startDate.toLocaleDateString() + "~" + endDate.toLocaleDateString() + "</td>" +
                            "<td>" + gp + "</td></tr>";
                    }
                    batchId = timetableBatchDTOS[i].id;
                }
                if (timetableBatchDTOS.length > 0) {
                    rt += '</table>';
                }
                return rt;
            }
        }, {// 最后一列样式为纵向排列，待前端处理
            title: "",
            width: "0%",
            field: "empty",
            formatter: function (value, row, index) {
                return "";
            }
        }]
    });
    //默认展开
    $("#table_list").bootstrapTable('expandRow', 1);

    $("#term").on("change", function () {
        var params = $("#table_list").bootstrapTable('getOptions')
        params.ajaxOptions.headers.Authorization =getJWTAuthority();
        params.silent=true;
        $("#table_list").bootstrapTable('refresh', params);
    })
    $("#search").on("input", function () {
        var params = $("#table_list").bootstrapTable('getOptions')
        params.ajaxOptions.headers.Authorization =getJWTAuthority();
        params.silent=true;
        $("#table_list").bootstrapTable('refresh', params);
    })
}

// 选课
function selectBatchGroup(group) {
    if (confirm('是否确认选择？')) {
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiSelectBatchGroup?groupId=" + group +"&createdBy=" + username,
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            dataType: "json",
            type: "post",
            //async: false,
            success: function (data) {
                if(data==true){
                    alert("选课成功");
                }else {
                    alert("选课失败");
                }
            }
        });
        refreshBootstrapTable();
    }
}

//退选
function dropGroupStudent(groupId) {
    if (confirm('是否确认退选？')) {
        $.ajax({
            url: zuulUrl + "api/timetable/student/apiDeleteGroupStudent?groupId=" + groupId+"&createdBy="+username,
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            dataType: "json",
            type: "post",
            success: function (json) {
            }
        });
        refreshBootstrapTable();
    }
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

