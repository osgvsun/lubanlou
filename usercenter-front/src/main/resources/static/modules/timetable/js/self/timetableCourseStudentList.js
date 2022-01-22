var contextPath = $("meta[name='contextPath']").attr("content");
var zuulUrl = "";
$(document).ready(function () {
    zuulUrl = $("#zuulServerUrl").val() + "/timetable/";
    var url = zuulUrl + "api/timetable/self/apiTimetableCourseStudentList";
    $("#table_student").bootstrapTable({
        //使用get请求到服务器获取数据
        method: "POST",
        //必须设置，不然request.getParameter获取不到请求参数
        contentType: "application/x-www-form-urlencoded",
        //获取数据的Servlet地址
        url: url,
        ajaxOptions: {
            headers: {Authorization: getJWTAuthority()}
        },
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParams: queryParams,
        //表格显示条纹
        striped: true,
        cache: false,
        //启动分页
        pagination: false,
        //是否启用排序
        sortable: true,
        //排序方式
        sortOrder: "asc",
        sortName: 'cname',
        //每页显示的记录数
        pageSize: 60,
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
            width: "5%",
            formatter: function (value, row, index) {
                return index + 1;
            }
        }, {
            title: "课程名称",
            field: "courseName",
            width: "20%",
            sortable: true,
            formatter: function (value, row, index) {
                return row.courseName + "(" + row.courseNumber + ")";
            }
        }, {
            title: "学生信息",
            field: "username",
            width: "15%",
            sortable: true,
            formatter: function (value, row, index) {
                return row.cname+"(" + row.username+")";
            }
        }, {
            title: "所在班级",
            field: "courseNo",
            width: "20%",
            sortable: true,
            formatter: function (value, row, index) {
                return row.className+"(" + row.classNumber+")";
            }
        }, {
            title: "授课教师",
            field: "teacherNumber",
            width: "10%",
            sortable: true,
            formatter: function (value, row, index) {
                return row.teacherNumber + "(" + row.teacherName + ")";
            }
        }, {
            title: "所属学期",
            field: "termName",
            width: "15%"
        }, {
            title: "所属学院",
            field: "academyName",
            width: "10%"
        }]
    });
});

//得到查询的参数
function queryParams(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        // limit: params.limit,   //页面大小
        search: params.search,
        offset: params.offset,  //页码
        limit: params.limit,
        sort: params.sort,
        order: params.order,
        termId: $("#term").val(),
        selfId: $("#selfId").val()
    };
    return temp;
};

function getJWTAuthority() {
    var authorization = "";
    initDirectoryEngine({
        getHostsUrl: contextPath + "/shareApi/getHosts",
        getAuthorizationUrl: contextPath + "/shareApi/getAuthorization"
    });
    getAuthorization({
        async: false,
        success: function (data) {
            authorization = data;
        }
    });
    return authorization;
}