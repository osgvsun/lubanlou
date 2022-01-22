var contextPath = $("meta[name='contextPath']").attr("content");
var zuulUrl ="";
$(document).ready(function () {
    zuulUrl =$("#zuulServerUrl").val()+"/timetable/";
    //获取jwt认证，获取token
    var url = zuulUrl + "api/timetable/manage/apiGroupStudentList";
    $("#table_student").bootstrapTable({
        //使用get请求到服务器获取数据
        method: "post",
        //必须设置，不然request.getParameter获取不到请求参数
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        //获取数据的Servlet地址
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
        pagination: false,
        //是否启用排序
        sortable: false,
        silentSort: false,
        //是否显示所有的列（选择显示的列）
        showColumns: false,
        showRefresh: false,
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
        columns: [ {
            title: "序号",
            field: "academyName",
            width: "8%",
            formatter: function (value, row, index) {
                return index + 1;
            }
        }, {
            title: "学生姓名",
            field: "cname",
            width: "5%",
            formatter: function (value, row, index) {
                return row.cname;
            }
        }, {
            title: "学号",
            field: "username",
            width: "5%",
            formatter: function (value, row, index) {
                return row.username;
            }
        }, {
            title: "所属班级",
            field: "className",
            width: "5%",
            formatter: function (value, row, index) {
                return row.className;
            }
        }, {
            title: "学院",
            field: "academyName",
            width: "40%",
            formatter: function (value, row, index) {
                return row.academyName;
            }
        }]
    });

});

//得到查询的参数
function queryParams(params) {
    var arr = new Object();
    arr.id = $("#groupId").val();
    var arrs = JSON.stringify(arr);
    return arrs;
};

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