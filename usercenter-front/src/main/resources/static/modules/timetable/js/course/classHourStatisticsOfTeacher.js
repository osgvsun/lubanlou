var contextPath = $("meta[name='contextPath']").attr("content");
var urlPlan = '';
var zuulUrl ="";
var audit = false;// 排课是否需要审核
var businessType = "";// 审核参数
var businessUid = "-1";
var historyFlag = 0;
var historyStatus;
var timetableFlag = 0;
var pageType = 0;
var timetableClass = [];
var teacherList = [];
$(document).ready(function () {
    // 页面参数传递
    businessType = $("#businessType").val();

    zuulUrl =$("#zuulServerUrl").val()+"/timetable/";
    urlPlan = zuulUrl+"api/school/apiClassHourStatisticsOfTeacher";
    document.cookie = "term=NONE";// 判断默认学期
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
    if(pageType == 1){
        if(historyStatus!=undefined){
            if(arr.status!=historyStatus){
                arr.status=historyStatus;
            }else{
                historyStatus = $("input[name='view_status']:checked").val();
            }
        }else{
            historyStatus = $("input[name='view_status']:checked").val();
        }
    }else{
        historyStatus = $("input[name='view_status']:checked").val();
    }
    $("input[name='view_status']").each(function(){
        if($(this).val()==arr.status){
            $(this).prop("checked",true);
        }else{
            $(this).prop("checked",false);
        }
    })
    arr.limit = params.limit;
    arr.search = $("#search").val();
    arr.sort= params.sort;
    arr.order= params.order;
    if(historyFlag == 1){
        arr.backupType = "EduTimetableAudit";
    }
    var arrs = JSON.stringify(arr);
    return arrs;
};


function refreshBootstrapTable() {
    var url = "";
    if(historyFlag == 1){
        getTimetablePlanView();
        historyFlag = 0;
    }
    url = zuulUrl + "api/school/apiSchoolCourseListByPage";
    var params = $("#table_list").bootstrapTable('getOptions')
    params.ajaxOptions.headers.Authorization =getJWTAuthority();
    params.url = url;
    params.silent=true;
    $("#table_list").bootstrapTable('refresh', params);
}
// 排课视图中不保留调课完成后的管理类操作
function getTimetablePlanView(pageNumber) {
    if(pageNumber == null){
        pageNumber = 1;
    }
    historyFlag = 0;
    timetableFlag = 1;
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
            console.log(res);
            return {
                "rows": res.data,
                "total": res.total
            };
        },
        //数据列
        columns: [{
            //field: 'Number',//可不加
            title: '序号',//标题  可不加
            width: "2%",
            formatter: function (value, row, index) {
                return index + 1;
                // return row.courseNumber;
            }
        }, {
            title: "教师",
            field: "teacherName",
            width: "8%",
            sortable: true,
            // formatter: function (value, row, index) {
            //     console.log(row)
            // }
        }, {
            title: "教师课程总学时",
            field: "totalClassHour",
            width: "5%",
            sortable: true
        }
        , {
            title: "课程学时情况",
            field: "courseOurs",
            width: "20%",
            formatter: function (value, row, index) {
                // console.log(row)
                var rt = "";
                if(row.classHourOfCourse.length>0){
                    rt += '<table border="1"><tr><td>课程名称</td><td>课程编号</td><td>课程已安排学时</td></tr>';
                    $.each(row.classHourOfCourse,function (index,item) {
                        rt += '<tr><td>'+ item.courseName +'</td><td>'+ item.courseNo +'</td><td>'+ item.classHour +'</td>'
                    })
                    rt += '</table>';
                }else{
                    rt+='暂无课程安排'
                }
                return rt;
            }

        }
        ],
        onPageChange: function (number,size) {
            pageType = 1;
            getTimetablePlanView(number);
            pageType = 0;
        }
        // onRefresh : function (params) {
        //     console.log(params);
        //     // var params = $("#table_list").bootstrapTable('getOptions')
        //     // params.ajaxOptions.headers.Authorization =getJWTAuthority();
        //     // params.silent=true;
        //     // $("#table_list").bootstrapTable('refresh', params);
        // }
    });
    //默认展开
    $("#table_list").bootstrapTable('expandRow', 1);

    // dom.on("refresh.bs.table", function() {
    //
    // });
    // $("button[name=refresh]").click(function () {
    //     var params = $("#table_list").bootstrapTable('getOptions')
    //     params.ajaxOptions.headers.Authorization =getJWTAuthority();
    //     params.silent=true;
    //     $("#table_list").bootstrapTable('refresh', params);
    // });
    $("#term").on("change", function () {
        var params = $("#table_list").bootstrapTable('getOptions')
        params.ajaxOptions.headers.Authorization =getJWTAuthority();
        params.silent=true;
        $("#table_list").bootstrapTable('refresh', params);
    })
    $("#search").keydown("input", function (event) {
        var params = $("#table_list").bootstrapTable('getOptions')
        params.ajaxOptions.headers.Authorization =getJWTAuthority();
        params.silent=true;
        if (event.keyCode==13){
            $("#table_list").bootstrapTable('refresh', params);
        }
        // $("#table_list").bootstrapTable('refresh', params);
    })

}
function refreshBootstrapTableLayer() {
    var url = "";
    if(historyFlag == 1){
        getTimetablePlanView();
        historyFlag = 0;
    }
    url = zuulUrl + "api/school/apiSchoolCourseListByPage";
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

