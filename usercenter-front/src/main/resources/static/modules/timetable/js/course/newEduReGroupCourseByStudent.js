var contextPath = $("meta[name='contextPath']").attr("content");
var url = "";
var urlChild = "";
var zuulUrl ="";
$(document).ready(function () {
    zuulUrl =$("#zuulServerUrl").val()+"/timetable/";
    url = zuulUrl + "api/timetable/manage/apiTimetableBatchList";
    urlChild = zuulUrl + "api/timetable/manage/apiTimetableGroupList";
    //初始化表格,动态从服务器加载数据
    var TableInit = function () {
        var oTableInit = new Object();
        oTableInit.Init = function () {
            $("#table_list").bootstrapTable({
                //使用get请求到服务器获取数据
                method: "post",
                //必须设置，不然request.getParameter获取不到请求参数
                contentType: "application/json",
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
                //数据列
                columns: [{
                    title: "批次名称",
                    field: "batchName",
                    width: "10%",
                    sortable: true
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
                    }
                }, {
                    title: "结束日期",
                    field: "endDate",
                    width: "15%",
                    sortable: true,
                    formatter: function (value, row, index) {
                        return setDefaultDate(row.endDate);
                    }
                }, {
                    title: "操作",
                    width: "25%",
                    field: "empty",
                    formatter: function (value, row, index) {
                        var result = "";
                        if (row.baseActionAuthDTO.deleteActionAuth) {
                            result += "<div style=\"height:20px;\"><a href='javascript:;' class='btn btn-xs red' title='删除'  onclick=\"deleteTimetableBatch(" + row.id + ")\" ><span class='glyphicon glyphicon-remove'>删除</span>&nbsp;";
                        }
                        return result;
                    }
                }],
                onExpandRow: function (index, row, $detail) {
                    InitSubTable(index, row, $detail);
                }
            });
        };
        return oTableInit;
    };
    $("#search").on("input", function () {
        var params = $("#table_list").bootstrapTable('getOptions')
        params.ajaxOptions.headers.Authorization =getJWTAuthority();
        params.silent=true;
        $("#table_list").bootstrapTable('refresh', params);
    })
//1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

//父子表
    function onExpandRow(index, row, $detail) {
        InitSubTable(index, row, $detail);
    }

    InitSubTable = function (index, row, $detail) {
        var cur_table = $detail.html('<table></table>').find('table');
        var batchId = row.id;
        var selected = row.selected;
        var startDate = new Date(row.startDate);
        var endDate = new Date(row.endDate);
        var currDate = new Date();

        $(cur_table).bootstrapTable({
            method: "post", //请求方法
            contentType: "application/json",
            dataType: "json",
            striped: false, //是否显示行间隔色
            sortable: true, //是否启用排序
            sortOrder: "asc",  //排序方式
            url: urlChild + "?batchId=" + row.id,
            dataType: "json",
            pagination: false,    // 显示页码等信息
            showColumns: false,  // 选择显示的列
            clickToSelect: false, //在点击行时，自动选择rediobox 和 checkbox
            pageNumber: 1,         //首页页码
            pageSize: 10,           // 当前分页值
            pageList: [10, 20],  // 分页选页
            queryParams: queryParamschild,//传递参数（*）
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
                width: "15%",
                field: 'groupName',
                align: 'center',
            }, {
                title: '计划分组人数',
                width: "10%",
                field: 'groupNumber',
                align: 'center',
                formatter: function (value, row, index) {
                    var result = "";
                    result += "<div style=\"height:20px;\"><span class='glyphicon glyphicon'>" + row.groupNumber + "人</span>&nbsp;";
                    return result;
                }
            }, {
                title: '当前分组人数',
                width: "10%",
                field: 'groupStudentNumbers',
                align: 'center',
                formatter: function (value, row, index) {
                    var result = "";
                    result += row.groupStudentNumbers + "(人)";
                    return result;
                }
            }, {
                title: '排课信息',
                field: 'timetable',
                width: "40%",
                align: 'center',
                formatter: function (value, row, index) {
                    var result = "";
                    if (row.timetable != null) {
                        result += row.timetable;
                    }
                    return result;
                }
            }, {
                title: "操作",
                width: "20%",
                field: "empty",
                formatter: function (value, row, index) {
                    var result = "";
                    if (row.baseActionAuthDTO.selectGroupActionAuth) {
                        if (currDate > startDate && currDate < endDate&&selected!=1) {
                            result += "<div style=\"height:20px;\"><a href='javascript:;' class='btn btn-xs red' title='编辑'  onclick=\"selectBatchGroup(" + row.id + ")\" ><span class='glyphicon glyphicon-plus'>选定</span>&nbsp;";
                        } else if(row.selected==1){
                            result +="已选定"
                        } else {
                            if(selected!=1 && currDate > endDate){
                                result += "<b>选课时间已过期！</b>";
                            }else if(selected!=1 && currDate < startDate){
                                result += "<b>未到选课时间！</b>";
                            } else{
                                result +="-";
                            }
                        }
                    }
                    return result;
                }
            }]
        });

    };

//得到查询的参数
    function queryParams(params) {
        var arr = new Object();
        arr.courseNo= $("#courseNo").val();
        arr.offset= params.offset;  //页码
        arr.limit= params.limit;
        arr.search= $("#search").val();
        arr.sort= params.sort;
        arr.order= params.order;
        arr.role= role;
        arr.createdBy= username;
        arr.length= 6;
        var arrs = JSON.stringify(arr);
        return arrs;
        /*var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
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
        arr.offset= params.offset;  //页码
        arr.limit= params.limit;
        arr.search= $("#search").val();
        arr.sort= params.sort;
        arr.order= params.order;
        arr.createdBy=username;
        arr.role=role;
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


    $("#submitButton").on('click', function () {
        var startDate = $("input[name='startDate']").val();
        var endDate = $("input[name='endDate']").val();
        var arr = new Object();
        arr.courseNo = $("#courseNo").val();
        arr.batchName = $("#batchName").val();
        arr.countGroup = $("#countGroup").val();
        arr.numbers = $("#numbers").val();
        arr.startDate = startDate;
        arr.endDate = endDate;
        arr.ifselect = $("input[name='ifselect']:checked").val();
        var arrs = JSON.stringify(arr);
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiSaveTimetableBatch",
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            dataType: "json",
            type: "post",
            //async: false,
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

function selectBatchGroup(group) {
    if (confirm('是否确认选择？')) {
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiSelectBatchGroup?groupId=" + group+"&createdBy=" + username,
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            dataType: "json",
            type: "post",
            //async: false,
            success: function (json) {
            }
        });
        refreshBootstrapTable();
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
            //async: false,
            success: function (json) {
            }
        });
        refreshBootstrapTable();
    }
}

function deleteTimetableGroup(groupId) {
    if (confirm('是否确认删除？')) {
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiDeleteTimetableGroup?groupId=" + groupId+"&createdBy="+username,
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            dataType: "json",
            type: "post",
            //async: false,
            success: function (json) {
            }
        });
        refreshBootstrapTable();
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
        refreshBootstrapTable();
    }
}

function refreshBootstrapTable() {
    var params = $("#table_list").bootstrapTable('getOptions')
    params.ajaxOptions.headers.Authorization =getJWTAuthority();
    params.url = url;
    params.silent=true;
    $("#table_list").bootstrapTable('refresh', params);
}

/*
*二次不分批排课弹出窗口
*/
function doEduReGroupCourse(groupId, courseNo) {
    term = $("#term").val();
    courseNo = $("#courseNo").val();
    var index = layer.open({
        type: 2,
        title: '开始二次分批排课',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/newEduReGroupTimetableCourse?currpage=1&flag=0&timetableStyle=4&courseNo=' + courseNo + "&term=" + term + "&groupId=" + groupId
        + '&tableAppId=' + 0,
        end: function () {
            var params = $("#table_list").bootstrapTable('getOptions')
            params.ajaxOptions.headers.Authorization =getJWTAuthority();
            params.url = zuulUrl + "api/school/apiSchoolCourseListByPage";
            params.silent=true;
            $("#table_list").bootstrapTable('refresh', params);
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