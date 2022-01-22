var contextPath = $("meta[name='contextPath']").attr("content");
var zuulUrl ="";
var url ="";

$(document).ready(function () {
    zuulUrl = $("#zuulServerUrl").val()+"/timetable/";
    getSelfBatchManageView();
});

//得到查询的参数
function queryParams(params) {
    var arr = new Object();
    arr.courseNo = $("#course_no").val();
    arr.sort= params.sort;
    arr.order= params.order;
    arr.createdBy= username;
    arr.role= role;
    var arrs = JSON.stringify(arr);
    return arrs;
};

function getSelfBatchManageView() {
    $("#table_list").bootstrapTable('destroy');
    //初始化表格,动态从服务器加载数据
    var url = zuulUrl + "api/timetable/manage/apiTimetableBatchList";
    $("#table_list").bootstrapTable({
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
        onEditableSave: function (field, row, oldValue, $el) {
            var startDate ="";
            var endDate ="";
            var maxGroupNum = "";
            if(field=="startDate"){
                startDate=row[field];
            }
            if(field=="endDate"){
                endDate=row[field];
            }
            if (field == "maxGroupNum") {
                maxGroupNum = row[field];
            }
            var arr = new Object();
            arr.batchId=row.id;
            arr.startDate=startDate;
            arr.endDate=endDate;
            arr.batchName="";
            arr.maxGroupNum = maxGroupNum;
            var arrs = JSON.stringify(arr);
            $.ajax({
                url: zuulUrl + "api/timetable/manage/apiUpdateTimetableBatch",
                headers: {Authorization: getJWTAuthority()},
                type: "post",
                contentType: "application/json",
                dataType: "json",
                data: arrs,
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
        },
        //数据列
        columns: [{
            title: "批次<button class=\'btn btn-xs green\' title=\'添加\'  onclick=\"exportBatchGroupStudentList()\" ><span style=\'color: white;\' class=\'glyphicon glyphicon-plus\'>导出学生名单</span></button>",
            field: "courseNumber",
            width: "8%",
            formatter: function (value, row, index) {
                return row.batchName;
            }
        }, {
            title: "选课形式",
            field: "academyName",
            width: "8%",
            formatter: function (value, row, index) {
                var result = "";
                if (row.ifselect == 1) {
                    result = "学生自选";
                } else {
                    result = "系统分配";
                }
                return result;
            }
        }, {
            title: "每人可选组数",
            field: "maxGroupNum",
            width: "5%",
            formatter: function (value, row, index) {
                return row.maxGroupNum;
            },
            editable: {
                type: 'text',
                mode: "inline",
                validate: function (value) {
                    if ($.trim(value) == '') {
                        return '每人可选组数不能为空!';
                    }
                }
            }
        }, {
            title: "开始时间",
            field: "startDate",
            width: "5%",
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
            title: "结束时间",
            field: "endDate",
            width: "5%",
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
            title: "分组信息",
            field: "timetableDTOs",
            width: "40%",
            formatter: function (value, row, index) {
                var rt = "";
                var timetableGroupDTOs = row.timetableGroupDTOs;
                if (timetableGroupDTOs.length > 0) {
                    rt += '<table id="tb' + index + '" border="1"><tr><td width="10%">组别</td><td width="7%">计划人数</td><td width="7%">已选人数</td><td width="7%">操作</td></tr>';
                }
                var count = Number(0);
                for (var i = 0, len = timetableGroupDTOs.length; i < len; i++) {
                    var group_div_plan = 'div_plan_' + timetableGroupDTOs[i].id;
                    var group_button_plan = 'group_button_plan_' + timetableGroupDTOs[i].id;
                    var group_numbers_plan = 'numbers_plan_' + timetableGroupDTOs[i].id;
                    // 计划人数
                    var str = "<div id=" + group_div_plan + " style=\"display: none; float:center\"><input id=" + group_numbers_plan + " type='text' value='" + timetableGroupDTOs[i].groupNumber + "' style=\"width:50px;\"></div>";
                    str += "<button id='" + group_button_plan + "' class='btn btn-xs green' onclick=\"setTimetableGroupNumbersPlan(" + timetableGroupDTOs[i].id +")\" title='编辑' ><span class='glyphicon glyphicon'>" + timetableGroupDTOs[i].groupNumber + "人</span></button>";
                    // 已选人数
                    var stu = "<button class='btn btn-xs green' onclick=\"adjustGroupStudent(" + timetableGroupDTOs[i].id +")\" title='编辑' ><span class='glyphicon glyphicon'>" + timetableGroupDTOs[i].groupStudentNumbers + "人</span></button>";
                    var del = "<button class='btn btn-xs green' onclick=\"deleteGroup(" + timetableGroupDTOs[i].id +")\" title='编辑' ><span class='glyphicon glyphicon'>删除</span></button>";
                    rt += "<tr><td>"+ timetableGroupDTOs[i].groupName +"</td><td>"+ str +"</td><td>"+ stu +"</td><td>"+ del +"</td></tr>";
                }
                if (timetableGroupDTOs.length > 0) {
                    rt += '</table>';
                }
                return rt;
            }
        }, {
            title: "",
            width: "1%",
            field: "empty",
        }],
        onLoadSuccess: function(row) {
            if (row.rows[0].ifselect == 0){
                // console.log(row.ifselect)
                $("#table_list").bootstrapTable('hideColumn', "startDate");
                $("#table_list").bootstrapTable('hideColumn', "endDate");
            } else {
                $("#table_list").bootstrapTable('showColumn', "startDate");
                $("#table_list").bootstrapTable('showColumn', "endDate");
            }
        }
    });
    //默认展开
    $("#table_list").bootstrapTable('expandRow', 1);

}
function deleteGroup(id) {
    layer.confirm('确定删除吗?', {icon: 0, title:'',closeBtn:0}, function(index){
        layer.close(index);
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/timetable/manage/apiDeleteTimetableGroup?groupId="+id+"&createdBy="+username,
            headers: {Authorization: getJWTAuthority()},
            async: false,
            type: "post",
            // contentType: "application/json;charset=UTF-8",
            success: function (res) {
                if(res){
                    layer.msg("<span style='color: white'>删除成功</span>");
                    getSelfBatchManageView();
                    // getTimetableBatchList();
                }else{
                    // alert('删除失败');
                    layer.msg("<span style='color: white'>删除失败</span>");
                }
            },
            error: function (res) {
                // alert('请求错误');
                layer.msg('请求错误');
            }
        });
    });
}
// 日期格式转换
function setDefaultDate(date) {
    var myDate = new Date(date);
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    month = (month.toString().length == 1) ? ("0" + month) : month;
    day = (day.toString().length == 1) ? ("0" + day) : day;
    var result = myDate.getFullYear() + '-' + month + '-' + day; //当前日期
    return result;
}

//设置分组计划人数
function setTimetableGroupNumbersPlan(groupId) {
    if ($("#group_button_plan_" + groupId).text() == "确定当前选择") {
        var numbers_plan = "numbers_plan_" + groupId;
        //进行保存操作
        var numbers = saveTimetableGroupNumbers(groupId, $('#' + numbers_plan).val())
        $('#div_plan_' + groupId).hide();
        $("#group_button_plan_" + groupId).text(numbers + "人");
        $(':button').removeAttr("disabled");
    } else {
        $('#div_plan_' + groupId).show();
        $("#group_button_plan_" + groupId).text('确定当前选择');
        $(':button').attr("disabled", "true");
        $("#group_button_plan_" + groupId).removeAttr("disabled");
    }
}

//根据分组，获取分组数json的ajax
function saveTimetableGroupNumbers(groupId, numbers) {
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

// 查看、调整小组学生名单页面
function adjustGroupStudent(group_id) {
    var course_no = $("#course_no").val();
    var type = $("#type").val();
    var term = $("#term").val();
    var index = layer.open({
        type : 2,
        title : '分组名单管理',
        maxmin : true,
        shadeClose : true,
        area: ['600px', '400px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/adjustGroupStudent?course_no='+course_no+'&group_id='+ group_id+'&type='+ type+'&term='+ term,
        end: function () {
            getSelfBatchManageView();
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
//导出批组学生名单
function exportBatchGroupStudentList() {
    // alert("ok!");
    // window.location.href=contextPath+"/lims/timetable/course/exportBatchGroupStudentList?courseNo="+$("#course_no").val()+"&term="+$("#term").val();
    window.location.href=zuulUrl + "api/timetable/export/TimetableGroupStudents?courseNo="+$("#course_no").val();
}