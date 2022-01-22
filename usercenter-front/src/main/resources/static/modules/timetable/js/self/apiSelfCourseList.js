
var contextPath = $("meta[name='contextPath']").attr("content");
var zuulUrl ="";
var businessType = "";// 审核参数
var businessUid = "-1";
var historyFlag = 0;
var timetableFlag = 0;
$(document).ready(function () {
    // 页面参数传递
    businessType = $("#businessType").val();

    zuulUrl =$("#zuulServerUrl").val()+"/timetable/";
    document.cookie = "term=NONE";// 判断默认学期
    c_start=document.cookie.indexOf("selfType=");
    c_end=document.cookie.indexOf(";",c_start);
    getTimetablePlanView();
    for (var i=0;i<25;i++){
        MergeCell("tb"+i,0,25,0);
    }
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
    arr.status = $("input[name='view_status']:checked").val();
    arr.offset = params.offset;
    arr.limit = params.limit;
    arr.search = $("#search").val();
    arr.sort = params.sort;
    arr.order = params.order;
    arr.length = 6;
    arr.createdBy = username;
    arr.academyNumber = academyNumber;
    arr.role = role;
    if(historyFlag == 1){
        arr.backupType = "SelfTimetableAudit";
    }
    var arrs = JSON.stringify(arr);
    return arrs;
};

/*
*查看排课弹出窗口
*/
function viewTimetableInfo(selfId) {
    var index = layer.open({
        type: 2,
        title: '查看排课情况',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/common/viewTimetableInfo?style=1&selfId=' + selfId
    });
    layer.full(index);
}

/*
*二次不分批排课弹出窗口
*/
function newSelfReNoGroupCourse(term, selfId) {
    var index = layer.open({
        type: 2,
        title: '二次自主不分批排课',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/self/newSelfReTimetableCourse?currpage=1&flag=0&timetableStyle=5&selfId=' + selfId + "&term=" + term
        + '&tableAppId=' + 0,
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(index);
}

/*
*二次不分批排课弹出窗口
*/
function newSelfReNoGroupCourseByDateFormat(term, selfId) {
    var index = layer.open({
        type: 2,
        title: '二次自主不分批排课',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/self/newSelfReTimetableCourseByDateFormat?currpage=1&flag=0&timetableStyle=5&selfId=' + selfId + "&term=" + term
        + '&tableAppId=' + 0,
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(index);
}
//撤回发布
function recallSchoolCourse(selfId) {
    if (confirm('是否确认撤回发布状态？')) {
        var arr = new Object();
        arr['selfId'] = selfId;
        arr['status'] = 10;
        arr['createdBy'] = username;
        var arrs = JSON.stringify(arr);
        //获取jwt认证，获取token
        //getJWTAuthority();
        $.ajax({
            url: zuulUrl + "api/timetable/common/apiTimetablePublic",
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            dataType: "json",
            type: "post",
            data: arrs,
            success: function (json) {
                if(json.text === 'OK'){
                    layer.msg('<font style="color: #fff">撤回成功!</font>');
                    refreshBootstrapTableLayer();
                }
            },
            error: function () {
                layer.msg('后台出了点问题，请重试!', {
                    icon: 1,
                });
                return false;
            }
        });
    }
}
/*
*二次不分批排课弹出窗口
*/
function newSelfReGroupCourse(term, selfId) {
    var index = layer.open({
        type: 2,
        title: '二次自主分批排课',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/self/newSelfReGroupCourse?currpage=1&flag=0&selfId=' + selfId + "&term=" + term + "&groupId=-1"
        + '&tableAppId=' + 0,
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(index);
}

function newSelfCourse(selfId) {
    var url = location.origin + '/teacherInformationCenter/lims/timetable/self/newSelfCourse?id=-1&term=-1';
    if(selfId!=null){
        url = location.origin + '/teacherInformationCenter/lims/timetable/self/newSelfCourse?id='+ selfId +'&term=-1';
    }
    var index = layer.open({
        type: 2,
        title: '教学班管理',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: url,
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(index);
}

function publicTimetable(timetableStyle, selfId, status) {
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
        data: arrs,
        success: function (json) {
            if (status == 1) {
                $.ajax({
                    url: contextPath + "/labRoom/sendLabScheduleToIOT",
                    contentType: "application/json;charset=utf-8",
                    async: true,
                    dataType: "json",
                    type: "post",
                    data: arrs,
                    success: function (json) {
                        // alert("banana");
                    }
                });
            }
        }
    });
    refreshBootstrapTableLayer();
}

function deleteTimetable(term, selfId) {
    if (confirm('是否确认删除？')) {
        var arr = new Object();
        arr.id = selfId;
        arr.term = term;
        var arrs = JSON.stringify(arr);
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiDeleteTimetableBySelfId",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            type: "post",
            data: arrs,
            headers:{Authorization: getJWTAuthority()},
            async: false,
            success: function (json) {
            }
        });
        refreshBootstrapTableLayer();
    }
}

function deleteTimetableSelfCourse(selfId) {
    var arr = new Object();
    arr.id = selfId;
    var arrs = JSON.stringify(arr);
    if (confirm('是否确认删除？')) {
        $.ajax({
            url: zuulUrl + "api/timetable/self/apiDeleteTimetableSelfCourse",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            type: "post",
            data: arrs,
            headers:{Authorization: getJWTAuthority()},
            async: false,
            success: function (json) {
            }
        });
        refreshBootstrapTableLayer();
    }
}

// 删除timetable_appointment_same_number
function deleteTimetableByBySameNumberId(sameNumberId) {
    if (confirm('删除后数据无法恢复，是否确认删除？')) {
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiDeleteTimetableBySameNumberId?id=" + sameNumberId+"&createdBy="+username,
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            dataType: "json",
            type: "post",
            success: function (json) {
                layer.msg("已删除！");
            },
            error: function () {
                layer.msg('后台出了点问题，请重试!', {
                    icon: 1,
                });
                return false;
            }
        });
        refreshBootstrapTableLayer();
    }
}

function refreshBootstrapTable() {
    var url = "";
    if(historyFlag == 1){
        getTimetablePlanView();
        historyFlag = 0;
    }
    url = zuulUrl + "api/timetable/self/apiSelfCourseListByPage";
    var params = $("#table_list").bootstrapTable('getOptions')
    params.ajaxOptions.headers.Authorization =getJWTAuthority();
    params.url = url;
    params.silent=true;
    $("#table_list").bootstrapTable('refresh', params);
}

function refreshBootstrapTableLayer() {
    var url = "";
    if(historyFlag == 1){
        getTimetablePlanView();
        historyFlag = 0;
    }
    url = zuulUrl + "api/timetable/self/apiSelfCourseListByPage";
    var params = $("#table_list").bootstrapTable('getOptions')
    params.ajaxOptions.headers.Authorization =getJWTAuthority();
    params.url = url;
    params.silent=true;
    var pageNumber = params.pageNumber;
    if(timetableFlag == 1){
        getTimetablePlanView(pageNumber);
    }else if(timetableFlag == 3){
        getTimetableHistoryView(pageNumber)
    }
}
// 排课视图中不保留调课完成后的管理类操作
function getTimetablePlanView(pageNumber) {
    if(pageNumber == null){
        pageNumber = 1;
    }
    historyFlag = 0;
    timetableFlag = 1;
    $("#allRadio").prop("checked",true);
    document.cookie = "selfType=PLAN";
    //初始化表格,动态从服务器加载数据
    $("#table_list").bootstrapTable('destroy');
    var url = zuulUrl + "api/timetable/self/apiSelfCourseListByPage";
    $("#table_list").bootstrapTable({
        //使用get请求到服务器获取数据
        method: "post",
        //必须设置，不然request.getParameter获取不到请求参数
        contentType: "application/json;charset=utf-8",
        //获取数据的Servlet地址
        dataType: "json",
        url: url,
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
            width: "11%",
            sortable: true,
            formatter: function (value, row, index) {/*+"<br/>教学班编号"+"<br/>[" + row.courseNo + "]"+"<br/>"*/
                var result = row.courseName + "<br>(" + row.courseNumber + ")<br>"+"<br/>";
                if (row.timetableStyle == 6 && row.baseActionAuthDTO.addActionAuth) {
                    result += "<a href='javascript:;' class='btn btn-xs green' onclick=\"selfBatchManage('" + row.selfId + "')\" ><span class='glyphicon glyphicon-edit'>批/组管理</span></a>&nbsp;";
                }
                return result;
            }
        }, {
            title: "所属学院",
            field: "academyName",
            width: "10%",
            sortable: true
        }, {
            title: "已排课表",
            field: "timetableDTOs",
            width: "38%",
            formatter: function (value, row, index) {
                var rt = "";
                var timetableDTOs = row.timetableDTOs;
                if (timetableDTOs.length > 0 && (row.timetableStyle == 4 || row.timetableStyle == 6)) {
                    rt += '<table id="tb' + index + '" border="1"><tr><td width="10%">批/组</td><td width="7%">周次</td><td width="7%">星期</td><td width="7%">节次</td><td width="18%">实验室</td><td width="15%">授课教师</td><td width="18%">实验项目</td><td width="6%">选课类型</td><td width="10%">选课时间</td><td width="7%">名单</td>';
                    if (row.timetableStatus==1 && row.baseActionAuthDTO.deleteManageAuth) {
                        rt += '<td width="7%">操作</td>';
                    }
                    rt += "</tr>";
                }
                if (timetableDTOs.length > 0 && row.timetableStyle != 4 && row.timetableStyle != 6) {
                    rt += '<table border="1"><tr><td width="7%">周次</td><td width="7%">星期</td><td width="7%">节次</td><td width="32%">实验室</td><td width="15%">授课教师</td><td width="32%">实验项目</td>';
                    if (row.timetableStatus==1 && row.baseActionAuthDTO.deleteManageAuth) {
                        rt += '<td width="7%">操作</td>';
                    }
                    rt += "</tr>";
                }
                var count = Number(0);
                for (var i = 0, len = timetableDTOs.length; i < len; i++) {
                    if (timetableDTOs.length > 0&&(row.timetableStyle==4||row.timetableStyle==6)) {
                        var startDate = new Date(timetableDTOs[i].startDate);
                        var endDate = new Date(timetableDTOs[i].endDate);
                        var group_button_reality = 'group_button_reality_' + timetableDTOs[i].groupId;
                        var group_div_reality = 'div_reality_' + timetableDTOs[i].groupId;
                        var result = "<button  id='" + group_button_reality + "' class='btn btn-xs green' onclick=\"setTimetableGroupNumbersReality('" + row.selfId + "'," + timetableDTOs[i].groupId +","+timetableDTOs[i].groupNumbers+"," + timetableDTOs[i].groupStudents+",8)\" title='编辑' ><span class='glyphicon glyphicon'>" + timetableDTOs[i].groupStudents + "/" + timetableDTOs[i].groupNumbers + "</span></button>&nbsp;";
                        rt += "<tr><td>" + timetableDTOs[i].batchName +"/" + timetableDTOs[i].groupName + "</td><td>";
                        if (timetableDTOs[i].startWeek == timetableDTOs[i].endWeek) {
                            rt += timetableDTOs[i].endWeek;
                        } else {
                            rt += timetableDTOs[i].startWeek + "-" + timetableDTOs[i].endWeek;
                        }
                        rt += "</td><td>" + timetableDTOs[i].weekday + "</td><td>";
                        if (timetableDTOs[i].startClass == timetableDTOs[i].endClass) {
                            rt += timetableDTOs[i].endClass;
                        } else {
                            rt += timetableDTOs[i].startClass + "-" + timetableDTOs[i].endClass;
                        }
                        rt += "</td><td>" + timetableDTOs[i].labInfo + "</td><td>" + timetableDTOs[i].teachers + "</td><td>" + timetableDTOs[i].items + "</td><td>";
                        if (timetableDTOs[i].ifSelect == 0) {
                            rt += "系统分配";
                        } else if (timetableDTOs[i].ifSelect == 1) {
                            rt += "学生自选";
                        }
                        rt += "</td><td>" + startDate.toLocaleDateString() + "~" + endDate.toLocaleDateString();
                        rt += "</td><td>" + result + "</td>";
                        if (row.timetableStatus==1 && row.baseActionAuthDTO.deleteManageAuth) {
                            rt += "<td><a href='javascript:;' class='btn btn-xs' title='删除'  onclick=\"deleteTimetableByBySameNumberId(" + timetableDTOs[i].sameNumberId + ")\" >删除</a></td>";
                        }
                        rt += "</tr><tr id=" + group_div_reality + " style=\"display: none;\"></tr>"
                    }
                    if (timetableDTOs.length > 0&&row.timetableStyle!=4&&row.timetableStyle!=6) {
                        rt += "<tr><td>";
                        if (timetableDTOs[i].startWeek == timetableDTOs[i].endWeek) {
                            rt += timetableDTOs[i].endWeek;
                        } else {
                            rt += timetableDTOs[i].startWeek + "-" + timetableDTOs[i].endWeek;
                        }
                        rt += "</td><td>" + timetableDTOs[i].weekday + "</td><td>";
                        if (timetableDTOs[i].startClass == timetableDTOs[i].endClass) {
                            rt += timetableDTOs[i].endClass;
                        } else {
                            rt += timetableDTOs[i].startClass + "-" + timetableDTOs[i].endClass;
                        }
                        rt += "</td><td>" + timetableDTOs[i].labInfo + "</td><td>" + timetableDTOs[i].teachers + "</td><td>" + timetableDTOs[i].items + "</td>";
                        if (row.timetableStatus==1 && row.baseActionAuthDTO.deleteManageAuth) {
                            rt += "<td><a href='javascript:;' class='btn btn-xs' title='删除'  onclick=\"deleteTimetableByBySameNumberId(" + timetableDTOs[i].sameNumberId + ")\" >删除</a></td>";
                        }
                        rt += "</tr>";
                    }
                }
                if (timetableDTOs.length > 0) {
                    rt += '</table>';
                }
                return rt;
            }
        }, {
            title: "上课教师",
            field: "cname",
            width: "6%",
            sortable: true,
            formatter: function (value, row, index) {
                return row.cname + "<br>(" + row.username + ")";
            }
        }, {
            title: "学生名单",
            field: "student",
            width: "5%",
            formatter: function (value, row, index) {

                var result = "";
                result = "<a href='javascript:;' class='btn btn-xs green' title='查看'  onclick=\"timetableCourseStudents(" + row.termId + ",'" + row.selfId + "')\" >名单(" + row.student + ")</a>";
                return result;
            }
        }, {
            title: "操作",
            width: "15%",
            field: "empty",
            formatter: function (value, row, index) {
                var id = value;
                var result = "";
                if (row.timetableStatus == 0) {
                    if (row.baseActionAuthDTO.addActionAuth) {
                        result += "<table><tr><td height=\"25px\">";
                        if(selfBatch)
                            result += "<a href='javascript:;' class='btn btn-xs green' title='编辑'  onclick=\"newSelfReNoGroupCourse(" + row.termId + ",'" + row.selfId + "')\" ><span class='glyphicon glyphicon-plus'>不分批排</span></a>&nbsp;";
                        if(selfNoBatch)
                            result += "<a href='javascript:;' class='btn btn-xs green' title='编辑'  onclick=\"newSelfReGroupCourse(" + row.termId + ",'" + row.selfId + "')\" ><span class='glyphicon glyphicon-plus'>分批排课</span></a>&nbsp;";
                        result += "</td></tr></table>";
                    }
                } else  if (row.timetableStatus == 1) {
                    result += "排课已发布<br>";
                    if (row.baseActionAuthDTO.selectGroupActionAuth && row.timetableStyle == 6) {
                        if (row.isSelect == 1) {
                            result += "<a href='javascript:;' class='btn btn-xs green' title='编辑'  onclick=\"newSelfReGroupCourse(" + row.termId + ",'" + row.selfId + "')\" ><span class='glyphicon glyphicon-check'>学生选课</span></a>&nbsp;";
                        } else {
                            result += "<a href='javascript:;' class='btn btn-xs green' title='编辑'  onclick=\"newSelfReGroupCourse(" + row.termId + ",'" + row.selfId + "')\" ><span class='glyphicon glyphicon-check'>查看选课</span></a>&nbsp;";
                        }
                    }
                    if(row.baseActionAuthDTO.addActionAuth)
                        result = result + "<button class='btn btn-xs' style='background: #ff4040' title='编辑'  onclick=\"recallSchoolCourse('" + row.selfId + "')\" ><span class='glyphicon glyphicon-add' style='color: white;'>撤回发布</span></button>";
                } else if (row.timetableStatus == 2 || row.timetableStatus == 5) {// 待审核 || 审核中
                    if(auditOrNot) {// 设置需要审核
                        if(row.baseActionAuthDTO.auditActionAuth) {
                            result += "<a href='javascript:;' class='btn btn-xs green' onclick=\"auditTimetable(" + row.termId + ",'" + row.selfId + "')\" ><span class='glyphicon glyphicon-remove'>审核排课</span></a>";
                        }else {
                            result += row.auditors;
                        }
                    }else {// 设置不需要审核
                        if (row.baseActionAuthDTO.publicActionAuth) {
                            result += "<a href='javascript:;' class='btn btn-xs green' title='查看'  onclick=\"publicTimetable('" + row.timetableStyle + "','" + row.selfId + "',1)\" ><span class='glyphicon glyphicon-ok'>发布排课</span></a>&nbsp;";
                        }
                    }
                } else if(row.timetableStatus == 3){
                    if (row.baseActionAuthDTO.publicActionAuth) {
                        result += "<a href='javascript:;' class='btn btn-xs green' title='查看'  onclick=\"publicTimetable('" + row.timetableStyle + "','" + row.selfId + "',1)\" ><span class='glyphicon glyphicon-ok'>发布排课</span></a>&nbsp;";
                    }else {
                        result += "待发布";
                    }
                } else if(row.timetableStatus == 4) {
                    result += "审核未通过";
                } else if (row.timetableStatus == 10) {
                    if (row.baseActionAuthDTO.addActionAuth) {
                        if (row.timetableStyle == 5) {
                            result += "<table><tr><td height=\"25px\"><a href='javascript:;' class='btn btn-xs green' title='编辑'  onclick=\"newSelfReNoGroupCourse(" + row.termId + ",'" + row.selfId + "')\" ><span class='glyphicon glyphicon-edit'>不分批调</span></a>&nbsp;";
                        } else if (row.timetableStyle == 6) {
                            result += "<table><tr><td height=\"25px\"><a href='javascript:;' class='btn btn-xs green' title='编辑'  onclick=\"newSelfReGroupCourse(" + row.termId + ",'" + row.selfId + "')\" ><span class='glyphicon glyphicon-edit'>分批调整</span></a>&nbsp;";
                        } else {
                            result += "<table><tr><td height=\"25px\">&nbsp;";
                        }
                        if (row.timetableStyle == 5||row.timetableStyle == 6) {
                            if(auditOrNot) {
                                // 需要审核
                                result += "<a href='javascript:;' class='btn btn-xs green' title='编辑'  onclick=\"publicTimetable('" + row.timetableStyle + "','" + row.selfId + "',2)\" ><span class='glyphicon glyphicon-check'>排课完成</span></a></div></td></tr>&nbsp;";
                            }else{
                                // 不需要审核
                                result += "<a href='javascript:;' class='btn btn-xs green' title='编辑'  onclick=\"publicTimetable('" + row.timetableStyle + "','" + row.selfId + "',3)\" ><span class='glyphicon glyphicon-check'>排课完成</span></a></div></td></tr>&nbsp;";
                            }
                            result += "<tr><td height=\"25px\"><div style=\"height:20px;\"><a href='javascript:;' class='btn btn-xs green' title='编辑'  onclick=\"deleteTimetable(" + row.termId + ",'" + row.selfId + "')\" ><span class='glyphicon glyphicon-remove'>删除排课</span></a></div></td></tr>&nbsp;";
                        }
                        result += '</tr></table>';
                    }
                } else if (!row.baseActionAuthDTO.addActionAuth && !row.baseActionAuthDTO.deleteActionAuth && !row.baseActionAuthDTO.updateActionAuth && !row.baseActionAuthDTO.publicActionAuth && !row.baseActionAuthDTO.publicActionAuth) {
                    result += "<b>操作未授权</b>";
                }
                return result;
            }
        }, {
            title: "计划维护&nbsp;<button class='btn btn-xs green' title='添加'  onclick=\"newSelfCourse()\" ><span style='color: white;' class='glyphicon glyphicon-plus'>添加计划</span></button>",
            width: "10%",
            field: "empty",
            formatter: function (value, row, index) {
                var id = value;
                var result = "";
                if (row.timetableStatus == 1) {
                    /*如果未授权*/
                } else if (!row.baseActionAuthDTO.addActionAuth && !row.baseActionAuthDTO.deleteActionAuth && !row.baseActionAuthDTO.updateActionAuth && !row.baseActionAuthDTO.publicActionAuth) {
                    result += "<b>操作未授权</b>";
                } else if (row.timetableStatus == 0) {
                    if (row.baseActionAuthDTO.addActionAuth) {
                        result += "<table>";
                        result += "<tr><td height=\"25px\"><div style=\"height:20px;\"><a href='javascript:;' class='btn btn-xs green' title='编辑'  onclick=\"newSelfCourse(" + row.selfId + ")\" ><span class='glyphicon glyphicon-plus'>编辑</span></a>&nbsp;";
                        result += "<a href='javascript:;' class='btn btn-xs green' title='编辑'  onclick=\"deleteTimetableSelfCourse(" + row.selfId + ")\" ><span class='glyphicon glyphicon-plus'>删除</span></a>&nbsp;</td></tr></table>";

                    }
                }
                return result;
            }
        }]
    });
    //默认展开
    $("#table_list").bootstrapTable('expandRow', 1);

    $("#term").on("change", function () {
        var params = $("#table_list").bootstrapTable('getOptions');
        params.ajaxOptions.headers.Authorization =getJWTAuthority();
        params.silent=true;
        $("#table_list").bootstrapTable('refresh', params);
    })
    $("#search").keydown("input", function (event) {
        var params = $("#table_list").bootstrapTable('getOptions');
        params.ajaxOptions.headers.Authorization =getJWTAuthority();
        params.silent=true;
        if (event.keyCode==13){
            $("#table_list").bootstrapTable('refresh', params);
        }
        // $("#table_list").bootstrapTable('refresh', params);
    })

}
function getTimetableHistoryView(pageNumber) {
    if(pageNumber == null){
        pageNumber = 1;
    }
    historyFlag = 1;
    timetableFlag = 3;
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
            formatter: function (value, row, index) {/*+"<br/>教学班编号"+"<br/>[" + row.courseNo + "]"*/
                return row.courseName + "<br/>(" + row.courseNumber + ")"+"<br/>";
            }
        },  {
            title: "已排课表",
            field: "timetableDTOs",
            width: "31%",
            formatter: function (value, row, index) {
                var rt = "";
                var timetableDTOs = row.timetableDTOs;
                if (timetableDTOs.length > 0&&(row.timetableStyle==4||row.timetableStyle==6)) {
                    rt += '<table border="1"><tr><td width="21%">批/组</td><td width="14%">周次</td><td width="12%">星期</td><td width="14%">节次</td><td width="28%">实验室</td><td width="6%">选课类型</td><td width="10%">选课时间</td><td width="6%">名单</td></tr>';
                }
                if (timetableDTOs.length > 0&&row.timetableStyle!=4&&row.timetableStyle!=6) {
                    rt += '<table border="1"><tr><td width="15%">周次</td><td width="15%">星期</td><td width="15%">节次</td><td width="50%">实验室</td></tr>';
                }
                var count = Number(0);
                for (var i = 0, len = timetableDTOs.length; i < len; i++) {
                    if (timetableDTOs.length > 0&&(row.timetableStyle==4||row.timetableStyle==6)) {
                        var startDate = new Date(timetableDTOs[i].startDate);
                        var endDate = new Date(timetableDTOs[i].endDate);
                        var group_button_reality = 'group_button_reality_' + timetableDTOs[i].groupId;
                        var group_div_reality = 'div_reality_' + timetableDTOs[i].groupId;
                        var result = "<button  id='" + group_button_reality + "' class='btn btn-xs green' onclick=\"setTimetableGroupNumbersReality('" + row.courseNo + "'," + timetableDTOs[i].groupId +","+timetableDTOs[i].groupNumbers+","+ timetableDTOs[i].groupStudents+",6)\" title='编辑' ><span class='glyphicon glyphicon'>" + timetableDTOs[i].groupStudents + "/" + timetableDTOs[i].groupNumbers + "</span></button>";
                        rt += "<tr><td>" + timetableDTOs[i].batchName +"/" + timetableDTOs[i].groupName + "</td><td>";
                        if (timetableDTOs[i].startWeek == timetableDTOs[i].endWeek) {
                            rt += timetableDTOs[i].endWeek;
                        } else {
                            rt += timetableDTOs[i].startWeek + "-" + timetableDTOs[i].endWeek;
                        }
                        rt += "</td><td>" + timetableDTOs[i].weekday + "</td><td>";
                        if (timetableDTOs[i].startClass == timetableDTOs[i].endClass) {
                            rt += timetableDTOs[i].endClass;
                        } else {
                            rt += timetableDTOs[i].startClass + "-" + timetableDTOs[i].endClass;
                        }
                        rt += "</td><td>" + timetableDTOs[i].labInfo + "</td><td>";
                        if (timetableDTOs[i].ifSelect == 0) {
                            rt += "系统分配";
                        } else if (timetableDTOs[i].ifSelect == 1) {
                            rt += "学生自选";
                        }
                        rt += "</td><td>" + startDate.toLocaleDateString() + "~" + endDate.toLocaleDateString();
                        rt += "</td><td>" + result + "</td></tr>";
                        rt += "<tr id=" + group_div_reality + " style=\"display: none;\"></tr>"
                    }
                    if (timetableDTOs.length > 0&&row.timetableStyle!=4&&row.timetableStyle!=6) {
                        rt += "<tr><td>";
                        if (timetableDTOs[i].startWeek == timetableDTOs[i].endWeek) {
                            rt += timetableDTOs[i].endWeek;
                        } else {
                            rt += timetableDTOs[i].startWeek + "-" + timetableDTOs[i].endWeek;
                        }
                        rt += "</td><td>" + timetableDTOs[i].weekday + "</td><td>";
                        if (timetableDTOs[i].startClass == timetableDTOs[i].endClass) {
                            rt += timetableDTOs[i].endClass;
                        } else {
                            rt += timetableDTOs[i].startClass + "-" + timetableDTOs[i].endClass;
                        }
                        rt += "</td><td>" + timetableDTOs[i].labInfo + "</td></tr>";
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
        }]
    });
    //默认展开
    $("#table_list").bootstrapTable('expandRow', 1);

    $("#term").on("change", function () {
        var params = $("#table_list").bootstrapTable('getOptions');
        $("#table_list").bootstrapTable('refresh', params);
    })
    $("#search").keydown("input", function (event) {
        var params = $("#table_list").bootstrapTable('getOptions');
        if (event.keyCode==13){
            $("#table_list").bootstrapTable('refresh', params);
        }
        // $("#table_list").bootstrapTable('refresh', params);
    })
}

/*
*查看学生名单
*/
//pk done
function timetableCourseStudents(term, selfId) {
    var index = layer.open({
        type: 2,
        title: '查看学生选课情况',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/self/timetableCourseStudentList?term=' + term + '&selfId=' + selfId
    });
    layer.full(index);
}

function MergeCell(tableId, startRow, endRow, col) {
    var tb = document.getElementById(tableId);
    if(tb==null){
        return;
    }
    if (col >= tb.rows[0].cells.length) {
        return;
    }
    //当检查第0列时检查所有行
    if (col == 0 || endRow == 0) {
        endRow = tb.rows.length - 1;
    }
    for (var i = startRow; i < endRow; i++) {
        //程序是自左向右合并
        if (tb.rows[startRow].cells[col].innerHTML == tb.rows[i + 1].cells[col].innerHTML) {
            //如果相同则删除下一行的第0列单元格
            tb.rows[i + 1].cells[col].style.display='none';
            //更新rowSpan属性
            tb.rows[startRow].cells[col].rowSpan = (tb.rows[startRow].cells[col].rowSpan | 0) + 1;
            //当循环到终止行前一行并且起始行和终止行不相同时递归(因为上面的代码已经检查了i+1行，所以此处只到endRow-1)
            if (i == endRow - 1 && startRow != endRow) {
                MergeCell(tableId, startRow, endRow, col + 1);
            }
        } else {
            //起始行，终止行不变，检查下一列
            MergeCell(tableId, startRow, i, col + 1);
            //增加起始行
            startRow = i + 1;
        }
    }
}

//根据分组，获取已分组名单json的ajax
function getTimetableGroupStudents(selfId, groupId) {
    var returnGroupStudents = "";
    $.ajax({
        url: zuulUrl + "api/timetable/manage/getSelfTimetableGroupStudents?groupId=" + groupId + "&selfId=" + selfId,
        contentType: "application/json;charset=utf-8",
        headers:{Authorization: getJWTAuthority()},
        dataType: "json",
        type: "post",
        async: false,
        success: function (json) {
            returnGroupStudents = json;
        }
    });
    return returnGroupStudents;
}

//设置分组实际名单
function setTimetableGroupNumbersReality(selfId, groupId,groupNumbers,groupStudentNumbers,colspanValue) {
    //变量：学生名单复选框的id和name
    var group_reality_check = "group_reality_check_"+groupId;
    if($("#div_reality_" + groupId).is(":hidden")) {
        $('#div_reality_' + groupId).show();
        $("#group_button_reality_" + groupId).text('返回');
        //获取学生名单
        var groupStudent = getTimetableGroupStudents(selfId, groupId);
        //var htmlInfo = "<table border=\"1\"><tr><td colspan='4'><b>请重新确定分组学生名单</b></td><td>选择</td></tr>";
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
        htmlInfo += "</table>";
        $('#div_reality_' + groupId).html(htmlInfo);
        $(':button').attr("disabled", "true");
        $("#group_button_reality_" + groupId).removeAttr("disabled");
    }else {
        $("#group_button_reality_" + groupId).text(groupStudentNumbers+"/"+ groupNumbers);
        $('#div_reality_' + groupId).hide();
        $(':button').removeAttr("disabled");
    }
}

function auditTimetable(termId, courseNo) {
    var index = layer.open({
        type: 2,
        title: '审核排课',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/auditTimetable?termId='+termId.toString()+'&businessAppUid=' + courseNo.toString()+'&businessType='+businessType+'&businessUid='+businessUid,
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(index);
}

// 获取课程的批组信息
function selfBatchManage(self_id) {
    var index = layer.open({
        type : 2,
        title : '批/组管理',
        maxmin : true,
        shadeClose : true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/batchManageList?courseNo='+self_id+'&type=SELF',
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(index);
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

