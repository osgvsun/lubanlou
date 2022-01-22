var contextPath = $("meta[name='contextPath']").attr("content");
var url = "";
var urlChild = "";
var zuulUrl ="";
var TableInit = "";
$(document).ready(function () {
    zuulUrl =$("#zuulServerUrl").val()+"/timetable/";
    url = zuulUrl +"api/timetable/manage/apiTimetableBatchList";
    urlChild = zuulUrl + "api/timetable/manage/apiTimetableGroupList";
    //初始化bootstrapTable
    initBootstrapTable();

    $("#search").on("input", function () {
        var params = $("#table_list").bootstrapTable('getOptions')
        params.ajaxOptions.headers.Authorization =getJWTAuthority();
        params.silent=true;
        $("#table_list").bootstrapTable('refresh', params);
    })

    $("#submitButton").on('click', function () {
        var batchName = $("#batchName").val();
        var countGroup = $("#countGroup").val();
        var numbers = $("#numbers").val();
        var maxGroupNum = $("#maxGroupNum").val();
        var startDate = $("input[name='startDate']").val();
        var endDate = $("input[name='endDate']").val();
        if (batchName == null || batchName == '') {
            layer.msg("请填写批次名称", {icon: 2});
            return false;
        }
        if (countGroup == null || countGroup == '') {
            layer.msg("请填写每批组数", {icon: 2});
            return false;
        }
        if (numbers == null || numbers == '') {
            layer.msg("请填写每组人数", {icon: 2});
            return false;
        }
        if (maxGroupNum == null || maxGroupNum == '') {
            layer.msg("请填写每人可选组数", {icon: 2});
            return false;
        }
        if (startDate == null || startDate == '') {
            layer.msg("请填写选课开始日期", {icon: 2});
            return false;
        }
        if (endDate == null || endDate == '') {
            layer.msg("请填写选课结束日期", {icon: 2});
            return false;
        }

        var arr = new Object();
        arr.courseNo = $("#courseNo").val();
        arr.batchName = $("#batchName").val();
        arr.countGroup = $("#countGroup").val();
        arr.numbers = $("#numbers").val();
        arr.startDate = startDate;
        arr.endDate = endDate;
        arr.role = role;
        arr.createdBy = username;
        arr.ifselect = $("input[name='ifselect']:checked").val();
        arr.maxGroupNum = $("#maxGroupNum").val();
        var arrs = JSON.stringify(arr);
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiSaveTimetableBatch",
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            dataType: "json",
            type: "post",
            data: arrs,
            success: function (json) {
                if (json.responseText == "no") {
                    alert("所选择的实训室资源冲突，请重新选择或者用调整排课操作，谢谢。");
                    isConflict = 0;
                }
            }
        });
        refreshBootstrapTable();
    })
});

function setDefaultDate(date) {
    var myDate = new Date(date);
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    month = (month.toString().length == 1) ? ("0" + month) : month;
    day = (day.toString().length == 1) ? ("0" + day) : day;
    var result = myDate.getFullYear() + '-' + month + '-' + day; //当前日期
    return result;
}

function showdiv() {
    if ($("#divAddBatch").css("display") == 'none') {//如果show是隐藏的
        $("#divAddBatch").css("display", "block");//show的display属性设置为block（显示）

        //$("#divGrid").css("display","none");//show的display属性设置为none（隐藏）
    } else {//如果show是显示的
        $("#divAddBatch").css("display", "none");//show的display属性设置为none（隐藏）
        //$("#divGrid").css("display","block");//show的display属性设置为none（隐藏）
    }
}

function deleteTimetableBatch(batchId) {
    if (confirm('是否确认删除？')) {
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiDeleteTimetableBatch?batchId=" + batchId+"&createdBy="+username,
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

//根据分组，获取分组数json的ajax
function saveTimetableGroupNumbers(groupId, numbers) {
    var returnNumbers = numbers;
    if (confirm('是否确认保存？')) {
        $.ajax({
            url: zuulUrl + "api/timetable/manage/saveTimetableGroupNumbers?groupId=" + groupId + "&numbers=" + numbers,
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            dataType: "json",
            type: "post",
            success: function (json) {
                numbers = json.status;
            }
        });
    }
    return numbers;
}

//根据分组，获取已分组名单json的ajax
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

//设置分组计划人数
function setTimetableGroupNumbersPlan(groupId) {
    if ($("#group_button_plan_" + groupId).text() == "确定当前选择") {
        var numbers_plan = "numbers_plan_" + groupId;
        //进行保存操作
        var numbers = saveTimetableGroupNumbers(groupId, $('#' + numbers_plan).val())
        $('#div_plan_' + groupId).hide();
        $("#group_button_plan_" + groupId).text(numbers + "人(可维护)");
        $(':button').removeAttr("disabled");
    } else {
        $('#div_plan_' + groupId).show();
        $("#group_button_plan_" + groupId).text('确定当前选择');
        $(':button').attr("disabled", "true");
        $("#group_button_plan_" + groupId).removeAttr("disabled");
    }

}

//设置分组实际名单
function setTimetableGroupNumbersReality(courseNo, groupId,groupStudentNumbers) {
    //变量：学生名单复选框的id和name
    var group_reality_check = "group_reality_check_"+groupId;
    if ($("#group_button_reality_" + groupId).text() == "确定当前选择") {
        $('#div_reality_' + groupId).hide();
        var realityNumbers =saveTimetableGroupNumbersReality(groupId,groupStudentNumbers);
        $("#group_button_reality_" + groupId).text(realityNumbers+"人(可维护)");
        $(':button').removeAttr("disabled");

    } else {
        $('#div_reality_' + groupId).show();
        $("#group_button_reality_" + groupId).text('确定当前选择');
        //获取学生名单
        var groupStudent = getTimetableGroupStudents(courseNo, groupId);
        var htmlInfo = "<table border=\"1\"><tr><td colspan='4'><b>请重新确定分组学生名单</b></td><td>选择</td></tr>";

        $.each(groupStudent.userDTOs, function (idx, obj) {
            if (obj.selected == "1") {
                htmlInfo += "<tr><td>学生姓名：</td><td>" + obj.cname + "</td><td>学生学号：</td><td>" + obj.username + ";</td><td><input id='"+group_reality_check+"' name='"+group_reality_check+"' value='"+ obj.username +"' checked=\"checked\"  type=\"checkbox\"></td></tr>";
            } else if(obj.selected == "0") {
                htmlInfo += "<tr><td>学生姓名：</td><td>" + obj.cname + "</td><td>学生学号：</td><td>" + obj.username + ";</td><td><input id='"+group_reality_check+"' name='"+group_reality_check+"' value='"+ obj.username +"' type=\"checkbox\"></td></tr>";
            } else if(obj.selected == "-1") {
                htmlInfo += "<tr><td>学生姓名：</td><td>" + obj.cname + "</td><td>学生学号：</td><td>" + obj.username + ";</td><td>已分配</td></tr>";
            }
        });
        htmlInfo += "</table>";
        $('#div_reality_' + groupId).html(htmlInfo);
        $(':button').attr("disabled", "true");
        $("#group_button_reality_" + groupId).removeAttr("disabled");
    }

}

function deleteTimetableGroup(groupId,batchId) {
    if (confirm('是否确认删除？')) {
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiDeleteTimetableGroup?groupId=" + groupId+"&createdBy="+username,
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            dataType: "json",
            type: "post",
            success: function (json) {
            }
        });
        refreshBootstrapChildTable(batchId);
    }
}

function saveTimetableGroup(batchId) {
    if (confirm('是否确认添加？')) {
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiSaveTimetableGroup?batchId=" + batchId,
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            dataType: "json",
            type: "post",
            //async: false,
            success: function (json) {
            }
        });
        refreshBootstrapChildTable(batchId);
    }
}

function saveTimetableGroupNumbersReality(groupId,groupStudentNumbers) {
    //变量：学生名单复选框的id和name
    var group_reality_check = "group_reality_check_"+groupId;
    var reality_number =groupStudentNumbers;
    if (confirm('是否确认保存？')) {
        var selectUsername = [];
        $("input[name='"+group_reality_check+"']:checked").each(function(i, n){
            selectUsername[i]=$(this).val();
        });

        var arr = new Object();
        arr.groupId = groupId;
        arr.students = selectUsername;
        var arrs = JSON.stringify(arr);
        $.ajax({
            url: zuulUrl + "api/timetable/manage/saveTimetableGroupNumbersReality",
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            dataType: "json",
            type: "post",
            data: arrs,
            success: function (json) {
                reality_number=json;
            }
        });
    }
    return reality_number;
}

function refreshBootstrapTable() {
    var params = $("#table_list").bootstrapTable('getOptions')
    params.ajaxOptions.headers.Authorization =getJWTAuthority();
    params.silent=true;
    $("#table_list").bootstrapTable('refresh', params);
}

function refreshBootstrapChildTable(batchId) {
    var table_id = "child_table_"+batchId;
    var params = $("#"+table_id).bootstrapTable('getOptions')
    params.ajaxOptions.headers.Authorization =getJWTAuthority();
    params.silent=true;
    $("#"+table_id).bootstrapTable('refresh', params);
}
/*
*二次不分批排课弹出窗口
*/
function doEduReGroupCourse(groupId, courseNo,batchId,sameNumberId) {
    term = $("#term").val();
    courseNo = $("#courseNo").val();
    if(typeof(sameNumberId) == "undefined"){
        sameNumberId=-1;
    }
    var index = layer.open({
        type: 2,
        title: '开始二次分批排课',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/newEduReGroupTimetableCourse?currpage=1&flag=0&timetableStyle=4&courseNo=' + courseNo + "&term=" + term + "&groupId=" + groupId
        + '&tableAppId=' + 0+ '&sameNumberId=' + sameNumberId,
        end: function () {
            var url = zuulUrl + "api/school/apiSchoolCourseListByPage";
            var opt = {
                url: url,
                silent: true,
                query: {
                    type: 1,
                    level: 2
                }
            };
            refreshBootstrapChildTable(batchId);
        }
    });
    layer.full(index);
}

function deleteTimetable(id,batchId) {
    if (confirm('是否确认删除？')) {
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiDeleteTimetableBySameNumberId?id=" + id+"&createdBy="+username,
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            dataType: "json",
            type: "post",
            success: function (json) {
            }
        });
        refreshBootstrapChildTable(batchId);
    }
}

function chooseCopyTimetableGroup(id, courseNo, batchId) {
    courseNo = $("#courseNo").val();
    var termId = $("#term").val();
    var index = layer.open({
        type: 2,
        title: '复制排课',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/chooseCopyTimetableGroup?id=' + id.toString() +
            '&batchId=' + batchId.toString() +
            '&courseNo=' + courseNo.toString() +
            '&termId='+termId.toString(),
        end:function(){
            refreshBootstrapTable();
        }
    });
    layer.full(index);
}

//得到查询的参数
function queryParams(params) {
    var arr = new Object();
    arr.courseNo= $("#courseNo").val();
    arr.sort= params.sort;
    arr.order= params.order;

    var arrs = JSON.stringify(arr);
    return arrs;
   /* var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        // limit: params.limit,   //页面大小
        courseNo: $("#courseNo").val(),
        offset: params.offset,  //页码
        limit: params.limit,
        search: $("#search").val(),
        sort: params.sort,
        order: params.order,
        length: 6
    };
    return temp;*/
};

//得到查询的参数
function queryParamschild(params) {
    var arr = new Object();
    arr.search= $("#search").val();
    arr.sort= params.sort;
    arr.order= params.order;
    arr.length= 6;
    var arrs = JSON.stringify(arr);
    return arrs;
    /*var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        // limit: params.limit,   //页面大小
        offset: params.offset,  //页码
        limit: params.limit,
        search: $("#search").val(),
        sort: params.sort,
        order: params.order,
        length: 6
    };
    return temp;*/
};

//父子表
function onExpandRow(index, row, $detail) {
    InitSubTable(index, row, $detail);
}

function initBootstrapTable() {
    //初始化表格,动态从服务器加载数据
    var TableInit = function () {
        var oTableInit = new Object();
        oTableInit.Init = function () {
            $('#table_list').bootstrapTable('destroy');
            $("#table_list").bootstrapTable({
                //使用get请求到服务器获取数据
                method: "post",
                //必须设置，不然request.getParameter获取不到请求参数
                contentType: 'application/json;charset=utf-8',
                dataType: "json",
                //获取数据的Servlet地址
                url: url,
                //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
                //设置为limit可以获取limit, offset, search, sort, order
                queryParams: queryParams,
                ajaxOptions:{
                    headers: {Authorization: getJWTAuthority()}
                },
                //表格显示条纹
                striped: true,
                cache: false,
                //启动分页
                pagination: false,
                //是否启用排序
                sortable: true,
                //排序方式
                sortOrder: "asc",
                sortName: 'courseName',
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
                detailView: true,
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
                onEditableSave: function (field, row, oldValue, $el) {
                    var startDate ="";
                    var endDate ="";
                    var batchName ="";
                    if(field=="startDate"){
                        startDate=row[field];
                    }
                    if(field=="endDate"){
                        endDate=row[field];
                    }
                    if(field=="batchName"){
                        batchName=row[field];
                    }
                    var arr = new Object();
                    arr.batchId=row.id;
                    arr.startDate=startDate;
                    arr.endDate=endDate;
                    arr.batchName=batchName;
                    var arrs = JSON.stringify(arr);
                    $.ajax({
                        url: zuulUrl + "api/timetable/manage/apiUpdateTimetableBatch",
                        type: "post",
                        contentType: "application/json",
                        dataType: "json",
                        beforeSend: function(request) {
                            request.setRequestHeader("Authorization", getJWTAuthority());
                        },
                        data:arrs,
                        success : function(data,status) {
                            if (status == "success") {
                                alert("编辑成功");
                            }
                        },
                        error: function () {
                            alert("Error");
                        },
                        complete: function () {
                        }
                    });
                    /* $table = $('#table_list').bootstrapTable({});
                     $table.bootstrapTable('updateRow', {index: row.id, row: row});*/
                },
                //数据列
                columns: [{
                    title: "批次名称",
                    field: "batchName",
                    width: "10%",
                    sortable: true,
                    editable: {
                        type: 'text',
                        mode: "inline",
                        validate: function (value) {
                            if ($.trim(value) == '') {
                                return '姓名不能为空!';
                            }
                        }
                    },
                    formatter: function (value, row, index) {
                        return row.batchName;
                    }
                }, {
                    title: "教学班编号",
                    field: "courseNo",
                    width: "25%",
                    sortable: true
                }, {
                    title: "选课方式",
                    field: "ifselect",
                    width: "10%",
                    formatter: function (value, row, index) {
                        if (row.ifselect == 0) {
                            return "自动分配名单";
                        } else {
                            return "选课分配名单";
                        }

                    },
                }, {
                    title: "开始日期",
                    field: "startDate",
                    width: "15%",
                    sortable: true,
                    formatter: function (value, row, index) {
                        return setDefaultDate(row.startDate);
                    },
                    editable: {
                        type: 'text',
                        mode: "inline",
                        validate: function (value) {
                            if ($.trim(value) == '') {
                                return '日期不能为空!';
                            }
                        }
                    }
                }, {
                    title: "结束日期",
                    field: "endDate",
                    width: "15%",
                    sortable: true,
                    formatter: function (value, row, index) {
                        return setDefaultDate(row.endDate);
                    },
                    editable: {
                        type: 'text',
                        mode: "inline",
                        validate: function (value) {
                            if ($.trim(value) == '') {
                                return '日期不能为空!';
                            }
                        }
                    }
                }, {
                    title: "<div style=\"height:20px;\">操作&nbsp;<button class='btn btn-xs green' title='添加'  onclick=\"showdiv()\" ><span class='glyphicon glyphicon-plus'>添加批次</span></button>",
                    width: "25%",
                    field: "empty",
                    formatter: function (value, row, index) {
                        var result = "";
                        if (row.baseActionAuthDTO.deleteActionAuth) {
                            result += "<div style=\"height:20px;\"><button class='btn btn-xs red' title='删除'  onclick=\"deleteTimetableBatch(" + row.id + ")\" ><span class='glyphicon glyphicon-remove'>删除</span></button>&nbsp;";
                        }
                        return result;
                    }
                }],
                onPostBody: function (index, row, $detail) {
                    $("#table_list").bootstrapTable('expandAllRows');
                },
                onExpandRow: function (index, row, $detail) {
                    InitSubTable(index, row, $detail);
                },
            });
        };
        return oTableInit;
    };
    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();
    InitSubTable = function (index, row, $detail) {
        var table_id ="child_table_"+row.id;
        var cur_table = $detail.html('<table id='+table_id+'></table>').find('table');
        var batchId = row.id;
        var startDate = row.startDate;
        var endDate = row.endDate;
        var courseNo = row.courseNo;
        var arr = new Object();
        arr.batchId= row.id;
        arr.createdBy=username;
        arr.role=role;
        var arrs = JSON.stringify(arr);
        $(cur_table).bootstrapTable('destroy');
        $(cur_table).bootstrapTable({
            method: "post", //请求方法
            contentType: 'application/json;charset=utf-8',
            dataType: "json",
            striped: false, //是否显示行间隔色
            sortable: true, //是否启用排序
            sortOrder: "asc",  //排序方式
            url: urlChild,
            dataType: "json",
            ajaxOptions:{
                headers: {Authorization: getJWTAuthority()}
            },
            pagination: false,    // 显示页码等信息
            showColumns: false,  // 选择显示的列
            clickToSelect: false, //在点击行时，自动选择rediobox 和 checkbox
            pageNumber: 1,         //首页页码
            pageSize: 10,           // 当前分页值
            pageList: [10, 20],  // 分页选页
            queryParams: arrs,//传递参数（*）
            sidePagination: 'server',   // //分页方式：client 客户端分页，server 服务端分页
            cache: false, // 不缓存
            //responseHandler: responseHandler,//格式化数据
            columns: [{
                title: '序号',//标题  可不加
                width: "5%",
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                title: '分组名称',
                width: "8%",
                field: 'groupName',
                align: 'center',
            }, {
                title: '分组情况',
                width: "25%",
                field: 'groupNumber',
                align: 'center',
                formatter: function (value, row, index) {
                    var result = "<table>";
                    result += "<tr><td height=\"25px\">当前分组计划：";
                    var group_button_plan = 'group_button_plan_' + row.id;
                    if (row.baseActionAuthDTO.updateActionAuth) {
                        result += "<button id='" + group_button_plan + "' class='btn btn-xs green' title='编辑' onclick=\"setTimetableGroupNumbersPlan(" + row.id + ")\" ><span class='glyphicon glyphicon'>" + row.groupNumber + "人(可维护)</span></button>&nbsp;";
                    } else {
                        result += row.groupNumber + "人";
                    }
                    var group_div_plan = 'div_plan_' + row.id;
                    var group_numbers_plan = 'numbers_plan_' + row.id;
                    result += "<div id=" + group_div_plan + " style=\"display: none; float:right\"><input id=" + group_numbers_plan + " type='text' value='" + row.groupNumber + "' style=\"width:50px;\"></div></td></tr>";
                    result += "<tr><td height=\"25px\">当前分组实际：";
                    var group_button_reality = 'group_button_reality_' + row.id;
                    var group_div_reality = 'div_reality_' + row.id;
                    if (row.baseActionAuthDTO.updateActionAuth) {
                        if (row.groupStudentNumbers > 0) {
                            result += "<button  id='" + group_button_reality + "' class='btn btn-xs green' onclick=\"setTimetableGroupNumbersReality('" + courseNo + "'," + row.id +","+ row.groupStudentNumbers+")\" title='编辑' ><span class='glyphicon glyphicon'>" + row.groupStudentNumbers + "人(可维护)</span></button>&nbsp;";
                        } else {
                            result += row.groupStudentNumbers + "<b>（实际名单尚未分配）</b>";
                        }
                    } else {
                        result += row.groupStudentNumbers + "人";
                    }
                    result += "</td></tr></table>";
                    result += "<div id=" + group_div_reality + " style=\"display: none;\"></div>"
                    return result;
                }
            }, {
                title: '排课信息',
                field: 'timetable',
                width: "48%",
                align: 'center',
                formatter: function (value, row, index) {
                    var rt = "";
                    var timetableDTOs = row.timetables;
                    if(timetableDTOs.length>0){
                        rt += '<table id="tb'+index+'" border="1"><tr><td width="13%">批/组</td><td width="7%">星期</td><td width="7%">节次</td><td width="7%">周次</td><td width="18%">实验室</td><td width="15%">授课教师</td><td width="15%">实验项目</td><td width="18%">排课维护</td></tr>';
                        var count = Number(0);
                        for (var i = 0, len = timetableDTOs.length; i < len; i++) {
                            var group_button_reality = 'group_button_reality_' + timetableDTOs[i].groupId;
                            var group_div_reality = 'div_reality_' + timetableDTOs[i].groupId;
                            var result = "<button  onclick='doEduReGroupCourse(" + timetableDTOs[i].groupId + ',\"' + courseNo +"\","+batchId+  ","+timetableDTOs[i].sameNumberId+")' ><span class='glyphicon glyphicon-edit'>编辑</span></button>&nbsp;";
                            result += "<button  onclick='deleteTimetable(" + timetableDTOs[i].sameNumberId + ","+batchId+")' ><span class='glyphicon glyphicon-remove'>删除</span></button>&nbsp;";
                            rt += "<tr><td>" + timetableDTOs[i].batchName +"/" + timetableDTOs[i].groupName + "</td><td>" + timetableDTOs[i].weekday + "</td><td>" + timetableDTOs[i].startClass + "-" + timetableDTOs[i].endClass + "</td><td>" + timetableDTOs[i].startWeek + "-" + timetableDTOs[i].endWeek + "</td><td>" + timetableDTOs[i].labInfo + "</td><td>" + timetableDTOs[i].teachers + "</td><td>" + timetableDTOs[i].items + "</td><td>" + result + "</td></tr>";
                            rt += "<tr id=" + group_div_reality + " style=\"display: none;\"></tr>"
                        }
                        rt += '</table>';
                    }
                    return rt;
                    var result = "";
                    if (row.timetable != null) {
                        result += row.timetable;
                    }
                    if (row.baseActionAuthDTO.addActionAuth) {
                        if (row.timetables != null && row.timetables.length > 0) {
                            result += "<div style=\"height:20px;\"><button class='btn btn-xs green' title='编辑'  onclick=\"doEduReGroupCourse(" + row.id + ",'" + row.courseNo +"',"+batchId+ ")\" ><span class='glyphicon glyphicon-plus'>继续排课</span></button>&nbsp;";
                        } else {
                            result += "<div style=\"height:20px;\"><button class='btn btn-xs green' title='编辑'  onclick=\"doEduReGroupCourse(" + row.id + ",'" + row.courseNo +","+batchId+ "')\" ><span class='glyphicon glyphicon-plus'>开始排课</span></button>&nbsp;";

                        }
                    }

                    return result;
                }
            }, {
                title: "<div style=\"height:20px;\">操作&nbsp;<button class='btn btn-xs green' title='添加'  onclick=\"saveTimetableGroup(" + batchId + ")\" ><span class='glyphicon glyphicon-plus'>添加分组</span></button>",
                width: "20%",
                field: "empty",
                formatter: function (value, row, index) {
                    var result = "<div style=\"height:20px;\">";
                    if (row.baseActionAuthDTO.deleteActionAuth) {
                        result += "<button class='btn btn-xs red' title='编辑'  onclick=\"deleteTimetableGroup(" + row.id +","+batchId+ ")\" ><span class='glyphicon glyphicon-plus'>删除</span></button>";
                    }
                    if (row.baseActionAuthDTO.addActionAuth){
                        result += "&nbsp;<button class='btn btn-xs green' title='编辑'  onclick=\"doEduReGroupCourse(" + row.id +",'" + row.courseNo + "'," + batchId + ")\" ><span class='glyphicon glyphicon-plus'>排课</span></button>&nbsp;";
                    }

                    if (row.baseActionAuthDTO.selectGroupActionAuth) {
                        result += "&nbsp;<button class='btn btn-xs red' title='编辑'  onclick=\"deleteTimetableGroup(" + row.id+","+batchId + ")\" ><span class='glyphicon glyphicon-plus'>分组确定</span></button>&nbsp;";
                    }
                    result += "&nbsp;<button class='btn btn-xs red' title='编辑'  onclick=\"chooseCopyTimetableGroup(" + row.id+",'"+ row.courseNo + "'," + batchId + ")\" ><span class='glyphicon glyphicon-plus'>复制</span></button>&nbsp;";
                    result += "</div>";
                    return result;
                }
            }]
        });

    };
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