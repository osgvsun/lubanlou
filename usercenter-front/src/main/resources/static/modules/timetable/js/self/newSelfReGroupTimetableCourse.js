var contextPath = $("meta[name='contextPath']").attr("content");
var zuulUrl ="";
$(document).ready(function () {
    zuulUrl =$("#zuulServerUrl").val()+"/timetable/";
    var url = zuulUrl + "api/timetable/common/apiViewTimetableInfo";
    $("#table_timetable_info").bootstrapTable({
        //使用get请求到服务器获取数据
        method: "POST",
        //必须设置，不然request.getParameter获取不到请求参数
        contentType: "application/x-www-form-urlencoded",
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
        //启动分页
        pagination: false,
        //是否启用排序
        sortable: true,
        //排序方式
        sortOrder: "asc",
        sortName: 'cname',
        //每页显示的记录数
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
            title: "排课时间",
            field: "timetable",
            width: "25%",
            sortable: true
        }, {
            title: "所属实验室",
            field: "labs",
            width: "25%",
            sortable: true
        }, {
            title: "授课教师",
            field: "teachers",
            width: "10%",
            sortable: true
        }, {
            title: "辅导",
            field: "tutors",
            width: "10%",
            sortable: true
        }, {
            title: "实验项目",
            field: "items",
            width: "15%",
            sortable: true
        }]
    });

    $('#labRoom_id').select2({
        width: "95%",
        closeOnSelect: false,
        placeholder: '请输入实验室...',
        placeholderOption: "first",
        ajax: {
            url: zuulUrl + "api/labroom/apiLabRoomListBySelect",
            contentType: "application/json;charset=utf-8",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority());
            },
            dataType: "json",
            type: "post",
            data: function (params) {
                var soft = $('#soft_id').val();
                var classes = $('#classes').val();
                var weeks = $('#weeks').val();

                var arr = new Object();
                arr.soft = soft!=null?soft.join():"";
                arr.search = params.term;
                arr.role = role;
                arr.createdBy = username;
                arr.academyNumber = $('#academyNumber').val();
                arr.term = $('#term').val();
                arr.classes = classes!=null?classes.join():"";
                arr.weekday= $('#weekday').val();
                arr.courseDetailNo= $('#courseDetailNo').val();
                arr.weeks= weeks!=null?weeks.join():"";
                var arrs = JSON.stringify(arr);
                return arrs;
               /* var query = {
                    soft: soft.join(),
                    search: params.term,
                    academyNumber: $('#academyNumber').val(),
                    term: $('#term').val(),
                    classes: classes.join(),
                    weekday: $('#weekday').val(),
                    courseDetailNo: "",
                    weeks: weeks.join()
                }
                return query;*/
            },
            results: function (data, page) {
                return {
                    results: data
                };
            }
        }
    });

    $('#soft_id').select2({
        width: "95%",
        closeOnSelect: false,
        placeholder: '请输入软件...',
        placeholderOption: "first",
        ajax: {
            url: zuulUrl + "api/software/apiSoftWareListBySelect",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority());
            },
            delay: 250,//延时0.5秒之后再进行请求
            type: "post",
            data: function (params) {
                var arr = new Object();
                arr.search = params.term;
                arr.academyNumber = $('#academyNumber').val();
                var arrs = JSON.stringify(arr);
                return arrs;
            },
            results: function (data, page) {
                return {
                    results: data
                };
            }
        }
    });

    $('#teacherRelated').select2({
        width: "89%",
        placeholder: '请输入授课教师...',
        placeholderOption: "first",
        ajax: {
            url: zuulUrl + "api/user/apiUserListBySelect",
            dataType: "json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority());
            },
            delay: 250,//延时0.5秒之后再进行请求
            type: "post",
            data: function (params) {
                var query = {
                    search: params.term,
                    academyNumber: academyNumber,
                    userRole: '1'
                }
                return query;
            },
            results: function (data, page) {
                return {
                    results: data
                };
            }
        }
    });

    $('#tutorRelated').select2({
        width: "89%",
        placeholder: '请输入辅导...',
        placeholderOption: "first",
        ajax: {
            url: zuulUrl + "api/user/apiUserListBySelect",
            dataType: "json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority());
            },
            delay: 250,//延时0.5秒之后再进行请求
            type: "post",
            data: function (params) {
                var query = {
                    search: params.term,
                    userRole: '1'
                }
                return query;
            },
            results: function (data, page) {
                return {
                    results: data
                };
            }
        }
    });

    $('#weekday').select2({
        width: "89%",
        placeholder: '请选择星期...',
        ajax: {
            url: zuulUrl + "api/timetable/common/apiWeekDayListBySelect",
            dataType: "json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority());
            },
            delay: 250,//延时0.5秒之后再进行请求
            type: "post",
            data: function (params) {
                var query = {
                    search: params.term,
                    selfId: $('#selfId').val()
                }
                $('#classes').empty();
                $('#week').empty();
                return query;
            },
            results: function (data, page) {
                return {
                    results: data
                };
            }
        }
    });

    $('#classes').select2({
        width: "89%",
        closeOnSelect: false,
        placeholder: '请选择节次...',
        placeholderOption: "first",
        allowClear: true,
        ajax: {
            url: zuulUrl + "api/timetable/common/apiClassListBySelect",
            dataType: "json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority());
            },
            type: "post",
            data: function (params) {
                var query = {
                    search: params.term,
                    courseDetailNo: $('#weekday').val()
                }
                return query;
            },
            results: function (data, page) {
                return {
                    results: data
                };
            }
        }
    });

    $('#weeks').select2({
        width: "95%",
        closeOnSelect: false,
        placeholder: '请选择周次...',
        placeholderOption: "first",
        allowClear: true,
        ajax: {
            url: zuulUrl + "api/timetable/common/apiWeekListBySelect",
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority());
            },
            type: "post",
            data: function (params) {
                var classes = $('#classes').val();
                var labRoomIds = $('#labRoom_id').val();

                var arr = new Object();
                arr.search =         params.term;
                arr.term =           $('#term').val();
                arr.classes =        classes!=null?classes.join():"";
                arr.weekday =        $('#weekday').val();
                arr.courseDetailNo = "";
                arr.labRoomIds =     labRoomIds!=null?labRoomIds.join():"";
                var arrs = JSON.stringify(arr);
                return arrs;
                /*var query = {
                    search: params.term,
                    term: $('#term').val(),
                    classes: classes.join(),
                    weekday: $('#weekday').val(),
                    courseDetailNo: "",
                    labRoomIds: labRoomIds.join()
                }
                return query;*/
            },
            results: function (data, page) {
                return {
                    results: data
                };
            }
        }
    });

    //实验项目
    $('#items').select2({
        width: "95%",
        closeOnSelect: false,
        placeholder: '请选择实验项目...',
        placeholderOption: "first",
        allowClear: true,
        ajax: {
            url: zuulUrl + "api/operation/apiOperationItemListBySelect",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority());
            },
            delay: 250,//延时0.5秒之后再进行请求
            type: "post",
            data: function (params) {
                var arr = new Object();
                arr.search = params.term;
                arr.courseNumber = $('#courseNumber').val();
                arr.academyNumber = $('#academyNumber').val();
                var arrs = JSON.stringify(arr);
                return arrs;

                /* var query = {
                     search: params.term,
                     academyNumber: $('#academyNumber').val(),
                     courseNumber: $('#courseNumber').val()
                 }
                 return query;*/
            },
            results: function (data, page) {
                return {
                    results: data
                };
            }
        }
    });

    // 虚拟镜像
    $('#virtualId').select2({
        width: "95%",
        placeholderOption: "first"
    });

    /*
    *二次不分批排课弹出窗口
    */
    $("#submitButton").on('click', function () {
        if (validform().form()) {
            var arr = new Object();
            arr.selfId = $("#selfId").val();
            arr.groupId = 0;
            if($("#groupId").val()!=""){
                arr.groupId = $("#groupId").val();
            }
            arr.weeks = $("#weeks").val();
            arr.sameNumberId = $("#sameNumberId").val();
            if($("#sameNumberId").val()==""){
                arr.sameNumberId =-1;
            }
            arr.createdBy = username;
            arr.role = role;
            arr.academyNumber = academyNumber;
            arr.weekday = $("#weekday").val();
            arr.status = 10;
            arr.timetableStyle = $("#timetableStyle").val();
            arr.classes = $("#classes").val();
            arr.labRoomIds = $("#labRoom_id").val();
            arr.tearchs = $("#teacherRelated").val();
            arr.items = $("#items").val();
            arr.tutors = $("#tutorRelated").val();
            arr.virtualId = $("#virtualId").val();
            arr.createdBy= username;
            var arrs = JSON.stringify(arr);
            $.ajax({
                url: zuulUrl + "api/timetable/self/apiSaveSelfReTimetable",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                type: "post",
                headers:{Authorization: getJWTAuthority()},
                async: false,
                data: arrs,
                success: function (json) {
                }
            });
            var index = parent.layer.getFrameIndex(window.name);
            parent.layer.close(index);
        } else {
            alert("请验证输入！");
        }
    })

    $("#form_lab").validate();

    $("#labRoom_id").change(function () {
        $(this).valid();
    });
    $("#weekday").change(function () {
        $(this).valid();
    });
    $("#classes").change(function () {
        $(this).valid();
    });
    $("#weeks").change(function () {
        $(this).valid();
    });
    $("#teacherRelated").change(function () {
        $(this).valid();
    });
    $("#virtualId").change(function () {
        $(this).valid();
    });
});

//得到查询的参数
function queryParams(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        // limit: params.limit,   //页面大小
        sort: params.sort,
        order: params.order,
        selfId: $("#selfId").val()
    };
    return temp;
};

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

function  doValidProperty() {
    $("#weeks").val("").change();
    $("#labRoom_id").val("").change();
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