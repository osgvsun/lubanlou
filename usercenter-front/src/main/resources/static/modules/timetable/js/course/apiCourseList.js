var contextPath = $("meta[name='contextPath']").attr("content");
var urlPlan = $('#zuulServerUrl').val()+"api/school/apiSchoolCourseListByPage";
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
var checked=new Array();
var added=new Array();
var times=new Array();
var glbCourseNumber = "";
var batchSaveTimetableCouseNos =new Array();
var viewStatus = "";
var timetableConfig; //timetable  redis配置
var batchSaveTimetable = false; //可以进行不分批类型的批量排课，false或者不设置为多选
$.cookie("checkedCourse",checked);
$.cookie("addTeacher",added);
$.cookie("addTimes",times);
$(document).ready(function () {
    // 页面参数传递
    businessType = $("#businessType").val();

    zuulUrl =$("#zuulServerUrl").val()+"/timetable/";
    urlPlan = zuulUrl+"api/school/apiSchoolCourseListByPage";
    document.cookie = "term=NONE";// 判断默认学期
    timetableConfig = getTimetableConfig('timetable');
    batchSaveTimetable = (timetableConfig!=null&&timetableConfig.batchSaveTimetable !=null) ? timetableConfig.batchSaveTimetable: false;
    if(!batchSaveTimetable)
        $('#button_batch_save').remove();
    getTimetablePlanView();
});
function getTimetableConfig(type) {
    var config;
    $.ajax({
        url: zuulUrl + "api/common/config/apiPlatformConfigInfo?modelType="+type,
        headers: {Authorization: getJWTAuthority()},
        async: false,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            config = data;
        }
    });
    return config;
}
//得到查询的参数
function queryParams(params) {
    t_start=document.cookie.indexOf("term=");
    t_end=document.cookie.indexOf(";",t_start);
    var iterm =document.cookie.substring(t_start,t_end);
    if(iterm.split("=")[1]=='NONE'){
        $("#term").val($("#termId").val());
        document.cookie = "term=YES";
    }
    var type = $("#type").val();
    var arr = new Object();
    arr.termId = $("#term").val();
    arr.offset = params.offset;
    arr.modelType = "TIMETABLE_COURSE";
    arr.createdBy = username;
    arr.role = role;
    arr.academyNumber = academyNumber;
    if(type){
        arr.type = type;
    }
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

/*
 *查看学生名单
 */
function schoolCourseStudents(term, courseNo) {
    var index = layer.open({
        type: 2,
        title: '查看学生名单',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/schoolCourseStudnetList?term=' + term + '&courseNo=' + courseNo
    });
    layer.full(index);
}

/*
 *查看排课弹出窗口
 */
function viewTimetableInfo(courseNo) {
    var index = layer.open({
        type: 2,
        title: '查看排课情况',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/common/viewTimetableInfo?style=1&courseNo=' + courseNo
    });
    layer.full(index);
}

/*
 *调整排课弹出窗口
 */
function doAdjustTimetable(term, courseNo) {
    var index = layer.open({
        type: 2,
        title: '调整排课',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/newEduAdjustCourse?currpage=1&flag=0&courseNo=' + courseNo + "&term=" + term
        + '&tableAppId=' + 0,
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(index);
}
/*
 *学生判冲弹出窗口
 */
function studentTimetable(term, courseNo) {
    $("#courseNo").val(courseNo);
    var index = layer.open({
        type: 2,
        title: '学生判冲',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/judgeTimetableConflictByStudent?courseNo=' + courseNo
        + '&term=' + term,
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(index);
}

/*
 *直接排课弹出窗口
 */
function startTimetable(courseNo) {
    $("#courseNo").val(courseNo);
    var index = layer.open({
        type: 2,
        title: '直接排课',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/newEduDirectCourse?currpage=1&flag=0&courseNo=' + courseNo
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
function newEduReNoGroupCourse(term, courseNo) {
    let timetableStyle = (type && type=='SELF') ? 5 : 3;
    var index = layer.open({
        type: 2,
        title: '二次不分批排课',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/newEduReTimetableCourse?currpage=1&flag=0&timetableStyle='+ timetableStyle +'&courseNo=' + courseNo + "&term=" + term
        + '&tableAppId=' + 0,
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(index);
}

/*
 *二次分批排课弹出窗口
 */
function newEduReGroupCourse(term, courseNo) {
    var index = layer.open({
        type: 2,
        title: '二次分批排课',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/newEduReGroupCourse?currpage=1&flag=0&courseNo=' + courseNo + "&term=" + term + "&groupId=-1"
        + '&tableAppId=' + 0,
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(index);
}

/*
 *新教务排课
 */
function definiteCourse(term, courseNo,teacherlist,type) {
    if(type==1){
        $.cookie('addTimes','');
        $.cookie('addTeacher','');
        $.cookie('checkedCourse','');
    }
    $.cookie("addTeacher",teacherlist);
    // console.log(timetableClass);
    layer.closeAll();
    var index = layer.open({
        type: 2,
        title: '教务排课(第一步)',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/educationalSchedulingCourse?currpage=1&flag=0&courseNo=' + courseNo+ "&term=" + term+ "&type=" + type,
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(index);
}
/*
 *新教务排课 第二步
 */
function definiteCourseTwo(term, courseNo,checked,times) {
    $.cookie("checkedCourse",checked);
    $.cookie("addTimes",times);
    layer.closeAll();
    var index = layer.open({
        type: 2,
        title: '教务排课(第二步)',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/educationalSchedulingCourse?currpage=1&flag=0&courseNo=' + courseNo+ "&term=" + term+ "&step=2",
        end: function () {
            refreshBootstrapTableLayer();
        }
    });

    layer.full(index);
}
/*
 *新教务排课 第三步
 */
function definiteCourseThree(term, courseNo,teacherlist) {
    $.cookie("addTeacher",teacherlist);
    layer.closeAll();
    var index = layer.open({
        type: 2,
        title: '教务排课(第三步)',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/educationalSchedulingCourse?currpage=1&flag=0&courseNo=' + courseNo+ "&term=" + term+ "&step=3",
        end: function () {
            refreshBootstrapTableLayer();
        }
    });

    layer.full(index);
}
/*
 *新教务排课 第四步
 */
function definiteCourseFour(term, courseNo,checked) {
    $.cookie("checkedCourse",checked);
    layer.closeAll();
    var index = layer.open({
        type: 2,
        title: '教务排课(第四步)',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/educationalSchedulingCourse?currpage=1&flag=0&courseNo=' + courseNo+ "&term=" + term+ "&step=4",
        end: function () {
            refreshBootstrapTableLayer();
        }
    });

    layer.full(index);
}
/*
 *分批排课(需要判冲)(新)-第一步
 */
function judgmentBatchesCourse(term, courseNo,type) {
    if(type == 1){
        $.cookie('addTimes','');
        $.cookie('addTeacher','');
        $.cookie('checkedCourse','');
    }
    layer.closeAll();
    let timetableStyle = (type && type=='SELF') ? 6 : 4;
    var index = layer.open({
        type: 2,
        title: '分批排课(第一步)',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/educationalSchedulingReGroupCourse?courseNo=' + courseNo+ "&term=" + term+ "&step=1"+ "&timetableStyle="+ timetableStyle +"&type="+type,
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(index);
}
/*
 *分批排课(需要判冲)(新)-第er步
 */
function judgmentBatchesCourseTwo(term, courseNo,teacherlist) {
    $.cookie("addTeacher",teacherlist);
    layer.closeAll();
    let timetableStyle = (type && type=='SELF') ? 6 : 4;
    var index = layer.open({
        type: 2,
        title: '分批排课(第二步)',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/educationalSchedulingReGroupCourse?courseNo=' + courseNo+ "&term=" + term+ "&timetableStyle="+ timetableStyle +"&step=2",
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(index);
}
/*
 *分批排课(需要判冲)(新)-第三步
 */
function judgmentBatchesCourseThree(term, courseNo,groupId,type) {
    if(type == 1){
        $.cookie('addTimes','');
        $.cookie('addTeacher','');
        $.cookie('checkedCourse','');
    }
    layer.closeAll();
    let timetableStyle = (type && type=='SELF') ? 6 : 4;
    var index = layer.open({
        type: 2,
        title: '分批排课(第三步)',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/educationalSchedulingReGroupCourse?courseNo=' + courseNo+ "&term=" + term+ "&timetableStyle="+ timetableStyle +"&step=3&groupId=" + groupId,
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(index);
}
/*
 *分批排课(需要判冲)(新)-排课记录
 */
function judgmentBatchesCourseRecord(term, courseNo,groupId) {
    layer.closeAll();
    let timetableStyle = (type && type=='SELF') ? 6 : 4;
    var index = layer.open({
        type: 2,
        title: '分批排课(第三步)',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/educationalSchedulingReGroupCourse?courseNo=' + courseNo+ "&term=" + term+ "&timetableStyle="+ timetableStyle +"&step=0&groupId=" + groupId,
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(index);
}
/*
 *不分批排课(需要判冲)(新)-第二步
 */
function judgmentNoBatchesCourse(term, courseNo,type) {
    if(type == 1){
        $.cookie('addTeacher','');
    }
    layer.closeAll();
    let timetableStyle = (type && type=='SELF') ? 5 : 3;
    var index = layer.open({
        type: 2,
        title: '不分批排课(第一步)',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/educationalSchedulingCourseNoBatch?courseNo=' + courseNo+ "&term=" + term+ "&timetableStyle="+ timetableStyle +"&step=2",
        end: function () {
            refreshBootstrapTableLayer();
        },
    });
    layer.full(index);
}
/*
 *不分批排课(需要判冲)(新)-第三步
 */
function judgmentNoBatchesCourseThree(term, courseNo,teacherlist,title) {
    // let timetableStyle = 3;
    let timetableStyle = (type && type=='SELF') ? 5 : 3;
    if(!title){
        title = '不分批排课(第二步)';
    }
    $.cookie("addTeacher",teacherlist);
    if(title != '查看实验室冲突详情'){
        layer.closeAll();
    }else{
        timetableStyle = 9 //只为了教务排课查看实验室冲突详情
    }
    var judgmentNoBatchesCourseThree = layer.open({
        type: 2,
        title: title,
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/educationalSchedulingCourseNoBatch?courseNo=' + courseNo+ "&term=" + term+ "&timetableStyle="+ timetableStyle +"&step=3",
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(judgmentNoBatchesCourseThree);
}
function publicTimetable(timetableStyle, courseNo, status) {
    //进行jwt握手，获取token
    //getJWTAuthority();
    var arr = new Object();
    arr.courseNo = courseNo;
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
            refreshBootstrapTableLayer();
        }
    });
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}

function deleteTimetable(term, courseNo) {
    if (confirm('是否确认删除？')) {
        var arr = new Object();
        arr.courseNo = courseNo;
        arr.termId = term;
        arr.createdBy = username;
        var arrs = JSON.stringify(arr);
        //获取jwt认证，获取token
        //getJWTAuthority();
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiDeleteTimetableByCourseNo",
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            dataType: "json",
            type: "post",
            data: arrs,
            //async: false,
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
            url: zuulUrl + "api/timetable/manage/apiDeleteTimetableBySameNumberId?id=" + sameNumberId +"&createdBy="+username,
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            dataType: "json",
            type: "post",
            success: function (json) {
                layer.msg("<span style='color: white'>已删除！</span>");
            }
        });
        refreshBootstrapTableLayer();
    }
}
//删除教学班
function apiRemoveSchoolCourseGroupByCourseNo(courseNo,groupUID) {
    if (confirm('是否确认删除？')) {
        var arr = new Object();
        //获取jwt认证，获取token
        //getJWTAuthority();
        $.ajax({
            url: zuulUrl + "api/school/apiRemoveSchoolCourseGroupByCourseNo?groupUID=" + groupUID+"&courseNo="+courseNo,
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            dataType: "json",
            type: "post",
            //async: false,
            success: function (json) {
                layer.msg("<span style='color: white'>已删除！</span>");
            }
        });
        refreshBootstrapTableLayer();
    }
}
//获取对应教学班课程计划
function getSchoolCourseArrangeByCourseNo(courseNo,obj) {
    //获取jwt认证，获取token
    //getJWTAuthority();
    $.ajax({
        url: zuulUrl + "api/school/apiSchoolCourseArrangeByCourseNo?courseNo=" + courseNo,
        contentType: "application/json;charset=utf-8",
        headers:{Authorization: getJWTAuthority()},
        async: false,
        dataType: "json",
        type: "get",
        //async: false,
        success: function (json) {
            var rt = '<table id="courseArrange" style="display:none;" border="1"><tr><td width="15%">星期</td><td width="20%">节次</td><td width="20%">周次</td><td width="20%">实验室</td><td width="25%">授课教师</td></tr>';
            for (var i = 0, len = json.length; i < len; i++) {

                rt += "<tr><td>" + json[i].weekday + "</td><td>" + json[i].startClass + "-" + json[i].endClass+ "</td><td>" + json[i].startWeek + "-" + json[i].endWeek + "</td><td>" + json[i].labInfo + "</td><td>" + json[i].teacher + "</td></tr>";
            }
            rt += '</table>';
            $(obj).parent().append(rt);
            var X = $(obj).offset().top;  //获取当前元素x坐标
            var Y = $(obj).offset().left; //获取当前元素y坐标
            layer.open({
                type: 1,
                // skin: 'layui-layer-demo', //样式类名
                closeBtn: 0, //不显示关闭按钮
                title: false, //不显示标题
                anim: 2,
                offset: [X+20, Y],
                shade: 0.1,
                shadeClose: true, //开启遮罩关闭
                content: $('#courseArrange')
            });
            $('.layui-layer').css({'z-index':19891020,'top':'300px'});
        }
    });
}
//删除教学班
function deleteSchoolCourse(courseNo) {
    if (confirm('是否确认删除？')) {
        var arr = new Object();
        //获取jwt认证，获取token
        //getJWTAuthority();
        $.ajax({
            url: zuulUrl + "api/school/apiSchoolCourseRemoveByCourseNo?group=" + courseNo,
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            // dataType: "json",
            type: "post",
            //async: false,
            success: function (json) {
                layer.msg("<span style='color: white'>已删除！</span>");
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
//撤回发布
function recallSchoolCourse(courseNo) {
    if (confirm('是否确认撤回发布状态？')) {
        var arr = new Object();
        arr['courseNo'] = courseNo;
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
function getTimetablePlanView(pageNumber,pageSize) {
    if(pageNumber == null){
        pageNumber = 1;
    }
    historyFlag = 0;
    timetableFlag = 1;
    //获取jwt认证，获取token
    //初始化表格,动态从服务器加载数据
    $("#table_list").bootstrapTable('destroy');
    pageSize = pageSize?pageSize:15;
    // var pageSize = Number($('.page-size').text());
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
        pageSize: pageSize,
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
            width: "2%",
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
                var result = row.courseName + "<br/>(" + row.courseNumber + ")"+"<br/>"+"<br/>教学班编号"+"<br/>[" + row.courseNo + "]";
                if ((row.timetableStyle == 4 && row.baseActionAuthDTO.addActionAuth) || (row.timetableStyle == 5 && row.baseActionAuthDTO.addActionAuth)) {
                    result += "<br><button class='btn btn-xs green' onclick=\"courseBatchManage('" + row.courseNo + "')\" ><span class='glyphicon glyphicon-edit'>批/组管理</span></button>&nbsp;";
                }
                //如果未排课，可以进行合并教学班操作
                var tlength = 0;
                var timetableDTOs = row.timetableDTOs;
                if(timetableDTOs!=null){
                    tlength = timetableDTOs.length;
                }
                if(row.courseType=="GROUP"){
                    result = result + "<br><br><b>已合并教学班</b>"
                }
                if(tlength == 0&&row.courseType=="GROUP"){
                    result = result + "<br><button class='btn btn-xs green' title='编辑'  onclick=\"deleteSchoolCourse('" + row.courseNo + "')\" ><span class='glyphicon glyphicon-add' style='color: white;'>删除合并</span></button>";
                }
                if (row.timetableStatus == 1) {
                    result += "<br>排课已发布<br>";
                    if(row.baseActionAuthDTO.addActionAuth)
                        result = result + "<button class='btn btn-xs' style='background: #ff4040' title='编辑'  onclick=\"recallSchoolCourse('" + row.courseNo + "')\" ><span class='glyphicon glyphicon-add' style='color: white;'>撤回发布</span></button>";
                } else if (row.timetableStatus == 0) {
                    if (row.baseActionAuthDTO.addActionAuth) {
                        result += "<table>";
                        if(newEducationalForHitsz){
                            if(row.schoolCourseDetailDTOs.length > 0 && row.schoolCourseDetailDTOs[0].weekday > 0){
                                if(row.timetableStyle==1||row.timetableStyle==0){
                                    result += "<tr class='hitszlims_btn'><td height=\"25px\">"
                                    result += "<button class='btn btn-xs green definiteCourse' title='编辑'  onclick=\"definiteCourse(" + row.termId + ",'" + row.courseNo  + "',"+ undefined +",1)\" ><span class='glyphicon glyphicon-plus'>教务排课</span></a>&nbsp;";
                                    result += "</td></tr>";
                                }
                            }
                            if(row.timetableStyle==4||row.timetableStyle==6||row.timetableStyle==0){
                                result += "<tr class='hitszlims_btn'><td height=\"25px\">"
                                result += "<button class='btn btn-xs green' title='编辑'  onclick=\"judgmentBatchesCourse(" + row.termId + ",'" + row.courseNo + "',1)\" ><span class='glyphicon glyphicon-plus'>分批排课</span></button>&nbsp;";
                                result += "</td></tr>";
                            }
                            if(row.timetableStyle==3||row.timetableStyle==5||row.timetableStyle==0){
                                result += "<tr class='hitszlims_btn'><td height=\"25px\">"
                                result += "<button class='btn btn-xs green' title='编辑'  onclick=\"judgmentNoBatchesCourse(" + row.termId + ",'" + row.courseNo + "',1)\" ><span class='glyphicon glyphicon-plus'>不分批排课</span></button>&nbsp;";
                                result += "</td></tr>";
                            }
                        }else{
                                result += "<tr><td height=\"25px\">"
                                if(row.schoolCourseDetailDTOs.length > 0 && row.schoolCourseDetailDTOs[0].weekday > 0){
                                    if(row.timetableStyle==1||row.timetableStyle==0){
                                        result += "<button class='btn btn-xs green definiteCourse' title='编辑'  onclick=\"definiteCourse(" + row.termId + ",'" + row.courseNo  + "',"+ undefined +",1)\" ><span class='glyphicon glyphicon-plus'>教务排课</span></a>&nbsp;";
                                    }
                                }
                                if(row.timetableStyle==4||row.timetableStyle==6||row.timetableStyle==0){
                                    result += "<button class='btn btn-xs green' title='编辑'  onclick=\"judgmentBatchesCourse(" + row.termId + ",'" + row.courseNo + "',1)\" ><span class='glyphicon glyphicon-plus'>分批排课</span></button>&nbsp;";
                                }
                                if(row.timetableStyle==3||row.timetableStyle==5||row.timetableStyle==0){
                                    result += "<button class='btn btn-xs green' title='编辑'  onclick=\"judgmentNoBatchesCourse(" + row.termId + ",'" + row.courseNo + "',1)\" ><span class='glyphicon glyphicon-plus'>不分批排课</span></button>&nbsp;";
                                }
                                result += "</td></tr>";
                        }
                        result += "</table>";
                    }
                } else if (row.timetableStatus == 2 || row.timetableStatus == 5) {// 待审核 || 审核中
                    if(auditOrNot) {// 设置需要审核
                        if(row.baseActionAuthDTO.auditActionAuth) {
                            result += "<br><button class='btn btn-xs green' onclick=\"auditTimetable(" + row.termId + ",'" + row.courseNo + "')\" ><span class='glyphicon glyphicon-remove'>审核排课</span></button>";
                        }else {
                            result += `<br>${row.auditors}`;
                        }
                    }else {// 设置不需要审核
                        if (row.baseActionAuthDTO.publicActionAuth) {
                            result += "<br><button class='btn btn-xs green' title='查看'  onclick=\"publicTimetable("+row.timetableStyle+",'" + row.courseNo + "',1)\" ><span class='glyphicon glyphicon-ok'>发布排课</span></button>&nbsp;";
                        }
                    }
                }else if(row.timetableStatus == 3) {
                    if (row.baseActionAuthDTO.publicActionAuth) {
                        result += "<br><button class='btn btn-xs green' title='查看'  onclick=\"publicTimetable("+row.timetableStyle+",'" + row.courseNo + "',1)\" ><span class='glyphicon glyphicon-ok'>发布排课</span></button>&nbsp;";
                    }else {
                        result += "审核完成，请等待发布";
                    }
                }else if(row.timetableStatus == 4) {
                    result += "审核未通过";
                }else if (row.timetableStatus == 10) {
                    if (row.baseActionAuthDTO.addActionAuth) {
                        result += "<table>";
                        if(newEducationalForHitsz){
                            if(row.schoolCourseDetailDTOs.length > 0 && row.schoolCourseDetailDTOs[0].weekday > 0){
                                if (row.timetableStyle == 1) {
                                    result += "<tr class='hitszlims_btn'><td height=\"25px\">"
                                    result += "<button class='btn btn-xs green definiteCourse' title='编辑'  onclick=\"definiteCourse(" + row.termId + ",'" + row.courseNo + "'," + undefined + ",1)\" ><span class='glyphicon glyphicon-plus'>教务排课</span></a>&nbsp;";
                                    result += "</td></tr>";
                                }
                            }
                            if (row.timetableStyle == 3||row.timetableStyle == 5) {
                                result += "<tr class='hitszlims_btn'><td height=\"25px\">"
                                result += "<button class='btn btn-xs green' title='编辑'  onclick=\"judgmentNoBatchesCourse(" + row.termId + ",'" + row.courseNo + "',1)\" ><span class='glyphicon glyphicon-plus'>不分批排课</span></button>&nbsp;";
                                result += "</td></tr>";
                            }else if (row.timetableStyle == 4||row.timetableStyle == 6) {
                                result += "<tr class='hitszlims_btn'><td height=\"25px\">"
                                result += "<button class='btn btn-xs green' title='编辑'  onclick=\"judgmentBatchesCourse(" + row.termId + ",'" + row.courseNo + "',1)\" ><span class='glyphicon glyphicon-plus'>分批排课</span></button>&nbsp;";
                                result += "</td></tr>";
                            }
                            result += "<tr><td height=\"25px\"><div style=\"height:20px;\"><button class='btn btn-xs green' title='编辑'  onclick=\"deleteTimetable(" + row.termId + ",'" + row.courseNo + "')\" ><span class='glyphicon glyphicon-remove'>删除排课</span></button></div></td></tr>";
                            if(auditOrNot) {
                                // 需要审核
                                result += "<tr><td height=\"25px\"><button class='btn btn-xs green' title='编辑'  onclick=\"publicTimetable(1,'" + row.courseNo + "',2)\" ><span class='glyphicon glyphicon-check'>排课完成</span></button></td></tr>&nbsp;";
                            }else{
                                // 不需要审核
                                result += "<tr><td height=\"25px\"><button class='btn btn-xs green' title='编辑'  onclick=\"publicTimetable(1,'" + row.courseNo + "',3)\" ><span class='glyphicon glyphicon-check'>排课完成</span></button></td></tr>&nbsp;";
                            }
                        }else{
                            result += "<tr><td height=\"25px\">";
                            if (row.timetableStyle == 2) {
                                result += "<button class='btn btn-xs green' title='编辑'  onclick=\"doAdjustTimetable(" + row.termId + ",'" + row.courseNo + "')\" ><span class='glyphicon glyphicon-edit'>继续调课</span></button>&nbsp;";
                            } else if (row.timetableStyle == 1) {
                                    if(row.schoolCourseDetailDTOs.length > 0 && row.schoolCourseDetailDTOs[0].weekday > 0){
                                        result += "<button class='btn btn-xs green definiteCourse' title='编辑'  onclick=\"definiteCourse(" + row.termId + ",'" + row.courseNo + "',"+ undefined +",1)\" ><span class='glyphicon glyphicon-edit'>教务排课</span></button>&nbsp;";
                                    }
                            }else if (row.timetableStyle == 3||row.timetableStyle == 5) {
                                    result += "<button class='btn btn-xs green' title='编辑'  onclick=\"judgmentNoBatchesCourse(" + row.termId + ",'" + row.courseNo + "',1)\" ><span class='glyphicon glyphicon-edit'>不分批排课</span></button>&nbsp;";
                            } else if (row.timetableStyle == 4||row.timetableStyle == 6) {
                                // result += "<button class='btn btn-xs green' title='编辑'  onclick=\"newEduReGroupCourse(" + row.termId + ",'" + row.courseNo + "')\" ><span class='glyphicon glyphicon-edit'>分批调整</span></button>&nbsp;";
                                result += "<button class='btn btn-xs green' title='编辑'  onclick=\"judgmentBatchesCourse(" + row.termId + ",'" + row.courseNo + "',1)\" ><span class='glyphicon glyphicon-edit'>分批排课</span></button>&nbsp;";
                            }
                            result += "<tr><td height=\"25px\"><div style=\"height:20px;\"><button class='btn btn-xs green' title='编辑'  onclick=\"deleteTimetable(" + row.termId + ",'" + row.courseNo + "')\" ><span class='glyphicon glyphicon-remove'>删除排课</span></button></div></td></tr>";
                            if(auditOrNot) {
                                // 需要审核
                                result += "<tr><td height=\"25px\"><button class='btn btn-xs green' title='编辑'  onclick=\"publicTimetable(1,'" + row.courseNo + "',2)\" ><span class='glyphicon glyphicon-check'>排课完成</span></button></td></tr>&nbsp;";
                            }else{
                                // 不需要审核
                                result += "<tr><td height=\"25px\"><button class='btn btn-xs green' title='编辑'  onclick=\"publicTimetable(1,'" + row.courseNo + "',3)\" ><span class='glyphicon glyphicon-check'>排课完成</span></button></td></tr>&nbsp;";
                            }
                        }

                        result += "</table>";
                    }
                }else if (!row.baseActionAuthDTO.addActionAuth && !row.baseActionAuthDTO.deleteActionAuth && !row.baseActionAuthDTO.updateActionAuth && !row.baseActionAuthDTO.auditActionAuth && !row.baseActionAuthDTO.publicActionAuth) {
                    result += "<b>操作未授权</b>";
                }

                var timetableDTOs = row.timetableDTOs;
                var tlength = 0;
                if(timetableDTOs!=null){
                    tlength = timetableDTOs.length;
                }
                if(tlength==0){
                    if(row.courseType!="GROUP"){
                        result += "<div class='checkboxCourse' style='display:none'><input class='"+ row.courseNumber+ "' onclick=\"onCheckboxCourse('" + row.courseNumber + "')\"  name='checkGroupUID' type='checkbox' value='" + row.courseNo + "' /> 待合并教学班</div>";
                    }else{
                        result += "<div class='checkboxCourse'><b>已合并教学班</b></div>";
                    }
                    let hasLabInfo = false;
                    $.each(row.schoolCourseDetailDTOs,function (k,v) {
                        if(v.labInfo!=null && v.labInfo!=''){
                            hasLabInfo = true;
                            return false;
                        }
                    })
                    if(hasLabInfo){
                        result += "<div class='checkboxTimetable' style='display:none'><input class='batchTimetable"+ index+ "' onclick=\"onCheckboxBatchTimetable('" + row.courseNo + "',"+ index +")\"  name='checkTimetableUID' type='checkbox' value='batchTimetable" + row.courseNo + "' /> 待一键排课</div>";
                    }
                }
                return result;
            }
        }, {
            title: "所属学院",
            field: "academyName",
            width: "5%",
            sortable: true
        }, {
            title: "课程计划",
            field: "coursePlan",
            width: "20%",
            formatter: function (value, row, index) {
                //合并教学班，显示已合并的教学班信息，并提供删除
                //原始教学班，显示计划的周次节次星期
                if(row.courseType!="GROUP"){
                    var rt = '<table border="1"><tr><td width="20%">周次</td><td width="15%">星期</td><td width="20%">节次</td><td width="20%">实验室</td><td width="25%">授课教师</td></tr>';
                    var schoolCourseDetailDTOs = row.schoolCourseDetailDTOs;
                    var count = Number(0);
                    for (var i = 0, len = schoolCourseDetailDTOs.length; i < len; i++) {
                        rt += "<tr><td>" + schoolCourseDetailDTOs[i].startWeek + "-" + schoolCourseDetailDTOs[i].endWeek + "</td><td>" + schoolCourseDetailDTOs[i].weekday + "</td><td>" + schoolCourseDetailDTOs[i].startClass + "-" + schoolCourseDetailDTOs[i].endClass+ "</td><td>" + schoolCourseDetailDTOs[i].labInfo + "</td><td>" + schoolCourseDetailDTOs[i].teacher + "</td></tr>";
                    }
                    rt += '</table>';
                    if(row.schoolCourseDetailDTOs.length == 0){
                        rt = '';
                    }
                    return rt;
                }else{
                    var rt = '<table border="1"><tr><td width="30%">课程编号</td><td width="40%">教学班编号</td><td width="30%">操作</td></tr>';
                    var groupUIDs = row.groupUID.split(",");
                    for ( var i = 0; i <groupUIDs.length; i++){
                        //rt += schoolCourseDetailDTOs[i].coursePlan + "<br>";
                        if(groupUIDs[i]!=""||groupUIDs[i]!=""){
                            var dbutton ="<button class='btn btn-xs green' title='查看课程计划'" +
                                "  onclick=\"getSchoolCourseArrangeByCourseNo('" + row.courseNo+ "',this)\" ><span class='glyphicon glyphicon-add' style='color: white;'>计划</span></button>"
                            rt += "<tr><td>" + row.courseNumber + "</td><td>" + groupUIDs[i] + "</td><td>" + dbutton +  "</td></tr>";
                        }
                    }
                    rt += '</table>';
                    return rt;
                }

            }
        }, {
            title: "已排课表",
            field: "timetableDTOs",
            width: "55%",
            formatter: function (value, row, index) {
                var rt = "";
                var timetableDTOs = row.timetableDTOs;
                var tlength = 0;
                if(timetableDTOs!=null){
                    tlength = timetableDTOs.length;
                }
                /**子表表头**/
                if (tlength > 0&&(row.timetableStyle==4||row.timetableStyle==6)) {/*<td width="10%">助教</td>*/
                    rt += '<table border="1"><tr><td width="10%">批/组</td><td width="8%">周次</td><td width="5%">星期</td><td width="8%">节次</td><td width="10%">实验室</td><td width="10%">授课教师</td><td width="10%">实验项目</td><td width="6%">选课类型</td><!--<td width="10%">选课时间</td>--><td width="6%">名单</td>';
                    if (row.timetableStatus==1 && row.baseActionAuthDTO.deleteManageAuth) {
                        rt += '<td width="6%">操作</td>';
                    }
                    rt += "</tr>";
                }
                if (tlength > 0&&row.timetableStyle!=4&&row.timetableStyle!=6) {/*<td width="16%">助教</td>*/
                    rt += '<table border="1"><tr><td width="12%">周次</td><td width="12%">星期</td><td width="12%">节次</td><td width="15%">实验室</td><td width="16%">授课教师</td><td width="16%">实验项目</td>';
                    if (row.timetableStatus==1 && row.baseActionAuthDTO.deleteManageAuth) {
                        rt += '<td width="6%">操作</td>';
                    }
                    rt += "</tr>";
                }
                /**子表数据**/
                for (var i = 0, len = tlength; i < len; i++) {
                    if (timetableDTOs.length > 0&&(row.timetableStyle==4||row.timetableStyle==6)) {
                        var startDate = new Date(timetableDTOs[i].startDate);
                        var endDate = new Date(timetableDTOs[i].endDate);
                        var group_button_reality = 'group_button_reality_' + timetableDTOs[i].groupId + '_' + i;
                        var group_div_reality = 'div_reality_' + timetableDTOs[i].groupId + '_' + i;
                        var result = "<button  id='" + group_button_reality + "' class='btn btn-xs green' onclick=\"setTimetableGroupNumbersReality('" + row.courseNo + "'," + timetableDTOs[i].groupId +","+timetableDTOs[i].groupNumbers+"," + timetableDTOs[i].groupStudents+",8," + i +")\" title='编辑' ><span class='glyphicon glyphicon'>" + timetableDTOs[i].groupStudents + "/" + timetableDTOs[i].groupNumbers + "</span></button>&nbsp;";
                        rt += "<tr><td>" + timetableDTOs[i].batchName +"/" + timetableDTOs[i].groupName + "</td><td>";
                        if (timetableDTOs[i].startWeek == timetableDTOs[i].endWeek) {
                            rt += timetableDTOs[i].endWeek;
                        } else {
                            rt += timetableDTOs[i].startWeek + "-" + timetableDTOs[i].endWeek;
                        }
                        rt += "</td><td>" + timetableDTOs[i].weekday + "</td><td>";
                        if (timetableDTOs[i].startClass == timetableDTOs[i].endClass) {
                            rt += timetableDTOs[i].endClassName;
                        } else {
                            rt += timetableDTOs[i].startClassName + "-" + timetableDTOs[i].endClassName;
                        }
                        rt += "</td><td>" + timetableDTOs[i].labInfo + "</td><td>" + timetableDTOs[i].teachers;
                        if(timetableDTOs[i].tutors!=""){
                            rt +="<br>辅导:"+ timetableDTOs[i].tutors;
                        }
                        rt +="</td><td>" + timetableDTOs[i].items + "</td><td>";
                        if (timetableDTOs[i].ifSelect == 0) {
                            rt += "系统分配";
                        } else if (timetableDTOs[i].ifSelect == 1) {
                            rt += "学生自选";
                        }
                        rt += "</td>";
                        // rt +=   "<td>" + startDate.toLocaleDateString() + "~" + endDate.toLocaleDateString();
                        // rt += "</td>";
                        rt +=   "<td>" + result + "</td>";
                        if (row.timetableStatus==1 && row.baseActionAuthDTO.deleteManageAuth) {
                            rt += "<td><button class='btn btn-xs green' title='删除'  onclick=\"deleteTimetableByBySameNumberId(" + timetableDTOs[i].sameNumberId + ")\" >删除</button></td>";
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
                            rt += timetableDTOs[i].endClassName;
                        } else {
                            rt += timetableDTOs[i].startClassName + "-" + timetableDTOs[i].endClassName;
                        }
                        // rt += "</td><td>" + timetableDTOs[i].labInfo + "</td><td>" + timetableDTOs[i].teachers + "助教:"+ timetableDTOs[i].tutors +"</td><td>" + timetableDTOs[i].tutors + "</td><td>" + timetableDTOs[i].items + "</td>";
                        rt += "</td><td>" + timetableDTOs[i].labInfo + "</td><td>" + timetableDTOs[i].teachers;
                        if(timetableDTOs[i].tutors!=""){
                            rt +="<br>辅导:"+ timetableDTOs[i].tutors;
                        }
                        rt +="</td><td>" + timetableDTOs[i].items + "</td>";
                        if (row.timetableStatus==1 && row.baseActionAuthDTO.deleteManageAuth) {
                            rt += "<td><button class='btn btn-xs green' title='删除'  onclick=\"deleteTimetableByBySameNumberId(" + timetableDTOs[i].sameNumberId + ")\" >删除</button></td>";
                        }
                        rt += "</tr>";
                    }
                }
                if (tlength > 0) {
                    rt += '</table>';
                }
                return rt;
            }
        },{
            title: "学生/班级",
            field: "student",
            width: "5%",
            formatter: function (value, row, index) {
                var result = "";
                result = "<button class='btn btn-xs green' title='查看'  onclick=\"schoolCourseStudents(" + row.termId + ",'" + row.courseNo + "')\" >名单(" + row.student + ")</button><br>";
                if(row.classInfo){result += row.classInfo;}
                return result;
            }
        },{
            title: (role === "ROLE_SUPERADMIN")?"排课人<button  id='button_merge' class='btn btn-xs green' onclick=\"deleteTimetableRedisCache()\"" +
                " title='编辑' ><span class='glyphicon glyphicon' style='color: white;'>清缓存</span></button>":"排课人",
            field: "userCreateBy",
            width: "5%",
            formatter: function (value, row, index) {
                var result = "";
                result += row.userCreateBy;
                return result;
            }
        }
        ],
        onPageChange: function (number,size) {
            pageType = 1;
            getTimetablePlanView(number,size);
            pageType = 0;
        }
    });
    //默认展开
    $("#table_list").bootstrapTable('expandRow', 1);
    $("#term").on("change", function () {
        var params = $("#table_list").bootstrapTable('getOptions')
        params.ajaxOptions.headers.Authorization =getJWTAuthority();
        params.silent=true;
        $("#table_list").bootstrapTable('refresh', params);
    })
    $("#search").keydown("input", function (event) {
        var params = $("#table_list").bootstrapTable('getOptions')
        // params.ajaxOptions.headers.Authorization =getJWTAuthority();
        params.silent=true;
        if (event.keyCode==13){
            params.ajaxOptions.headers.Authorization =getJWTAuthority();
            $("#table_list").bootstrapTable('refresh', params);
        }
    })

}

function getTimetableHistoryView(pageNumber,pageSize) {
    if(pageNumber == null){
        pageNumber = 1;
    }
    historyFlag = 1;
    timetableFlag = 3;
    //初始化表格,动态从服务器加载数据
    $("#table_list").bootstrapTable('destroy');
    pageSize = pageSize?pageSize:15;
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
        pageSize: pageSize,
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
            width: "2%",
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
            width: "40%",
            formatter: function (value, row, index) {
                var rt = "";
                var timetableDTOs = row.timetableDTOs;
                if (timetableDTOs.length > 0&&(row.timetableStyle==4||row.timetableStyle==6)) {
                    rt += '<table border="1"><tr><td width="12%">批/组</td><td width="8%">周次</td><td width="8%">星期</td><td width="8%">节次</td><td width="20%">实验室</td><td width="6%">选课类型</td><!--<td width="10%">选课时间</td>--><td width="6%">名单</td></tr>';
                }
                if (timetableDTOs.length > 0&&row.timetableStyle!=4&&row.timetableStyle!=6) {
                    rt += '<table border="1"><tr><td width="15%">周次</td><td width="15%">星期</td><td width="15%">节次</td><td width="50%">实验室</td></tr>';
                }
                var count = Number(0);
                for (var i = 0, len = timetableDTOs.length; i < len; i++) {
                    if (timetableDTOs.length > 0&&(row.timetableStyle==4||row.timetableStyle==6)) {
                        var startDate = new Date(timetableDTOs[i].startDate);
                        var endDate = new Date(timetableDTOs[i].endDate);
                        var group_button_reality = 'group_button_reality_' + timetableDTOs[i].groupId + '_' + i;
                        var group_div_reality = 'div_reality_' + timetableDTOs[i].groupId + '_' + i;
                        var result = "<button  id='" + group_button_reality + "' class='btn btn-xs green' onclick=\"setTimetableGroupNumbersReality('" + row.courseNo + "'," + timetableDTOs[i].groupId +","+timetableDTOs[i].groupNumbers+","+ timetableDTOs[i].groupStudents+",6," + i +")\" title='编辑' ><span class='glyphicon glyphicon'>" + timetableDTOs[i].groupStudents + "/" + timetableDTOs[i].groupNumbers + "</span></button>";
                        rt += "<tr><td>" + timetableDTOs[i].batchName +"/" + timetableDTOs[i].groupName + "</td><td>";
                        if (timetableDTOs[i].startWeek == timetableDTOs[i].endWeek) {
                            rt += timetableDTOs[i].endWeek;
                        } else {
                            rt += timetableDTOs[i].startWeek + "-" + timetableDTOs[i].endWeek;
                        }
                        rt += "</td><td>" + timetableDTOs[i].weekday + "</td><td>";
                        if (timetableDTOs[i].startClass == timetableDTOs[i].endClass) {
                            rt += timetableDTOs[i].endClassName;
                        } else {
                            rt += timetableDTOs[i].startClassName + "-" + timetableDTOs[i].endClassName;
                        }
                        rt += "</td><td>" + timetableDTOs[i].labInfo + "</td><td>";
                        if (timetableDTOs[i].ifSelect == 0) {
                            rt += "系统分配";
                        } else if (timetableDTOs[i].ifSelect == 1) {
                            rt += "学生自选";
                        }
                        rt += "</td>";
                        rt +=    "<td>" + result + "</td></tr>";
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
                            rt += timetableDTOs[i].endClassName;
                        } else {
                            rt += timetableDTOs[i].startClassName + "-" + timetableDTOs[i].endClassName;
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
            width: "15%",
            field: "empty",
            formatter: function (value, row, index) {
                return row.academyName;
            }
        }],
        onPageChange: function (number,size) {
            pageType = 1;
            getTimetableHistoryView(number,size);
            pageType = 0;
        }
    });
    //默认展开
    $("#table_list").bootstrapTable('expandRow', 1);

    $("#term").on("change", function () {
        var params = $("#table_list").bootstrapTable('getOptions')
        params.ajaxOptions.headers.Authorization =getJWTAuthority();
        params.silent=true;
        $("#table_list").bootstrapTable('refresh', params);
        // var params = $("#table_list").bootstrapTable('getOptions')
        // $("#table_list").bootstrapTable('refresh', params);
    })
    $("#search").keydown("input", function (event) {
        var params = $("#table_list").bootstrapTable('getOptions')
        if (event.keyCode==13){
            params.ajaxOptions.headers.Authorization =getJWTAuthority();
            params.silent=true;
            $("#table_list").bootstrapTable('refresh', params);
        }
        // $("#table_list").bootstrapTable('refresh', params);
    })
}

//设置分组实际名单
function setTimetableGroupNumbersReality(courseNo, groupId,groupNumbers,groupStudentNumbers,colspanValue,i) {
    //变量：学生名单复选框的id和name
    var group_reality_check = "group_reality_check_"+groupId + '_' + i;
    if($("#div_reality_" + groupId + '_' + i).is(":hidden")) {
        $('#div_reality_' + groupId + '_' + i).show();
        $("#group_button_reality_" + groupId + '_' + i).text('返回');
        //获取学生名单
        var groupStudent = getTimetableGroupStudents(courseNo, groupId);
        var htmlInfo = "<td colspan='"+colspanValue+"'><table border=\"1\"><tr><td colspan='4'><b>查看分组学生名单</b></td></tr>";

        $.each(groupStudent.userDTOs, function (idx, obj) {
            if (obj.selected == "1") {
                htmlInfo += "<tr><td>姓名：</td><td>" + obj.cname + "</td><td>学号：</td><td>" + obj.username + ";</td></tr>";
            } else if(obj.selected == "0") {
                htmlInfo += "<tr><td>姓名：</td><td>" + obj.cname + "</td><td>学号：</td><td>" + obj.username + ";</td></tr>";
            } else if(obj.selected == "-1") {
                htmlInfo += "<tr><td>姓名：</td><td>" + obj.cname + "</td><td>学号：</td><td>" + obj.username + ";</td></tr>";
            }
        });
        htmlInfo += "</table></td>";
        $('#div_reality_' + groupId + '_' + i).html(htmlInfo);
        $(':button').attr("disabled", "true");
        $("#group_button_reality_" + groupId + '_' + i).removeAttr("disabled");
    } else {
        $("#group_button_reality_" + groupId + '_' + i).text(groupStudentNumbers+"/"+groupNumbers);
        $('#div_reality_' + groupId + '_' + i).hide();
        $(':button').removeAttr("disabled");
    }
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

// 审核页面
function auditTimetable(termId, courseNo) {
    var index = layer.open({
        type: 2,
        title: '审核排课',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/auditTimetable?businessAppUid=' + courseNo.toString()+'&businessType='+businessType+'&businessUid='+businessUid,
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(index);
}

// 获取课程的批组信息
function courseBatchManage(course_no) {
    var index = layer.open({
        type : 2,
        title : '批/组管理',
        maxmin : true,
        shadeClose : true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/batchManageList?courseNo=' + course_no+'&type=COURSE',
        end: function () {
            refreshBootstrapTableLayer();
        }
    });
    layer.full(index);
}

// 点击复选框触发
// 如果选择复选框，则所有相同的courseNumber才能现实，其余的隐藏
// 如果未选择任何复选框，所有复选框复位可选
function onCheckboxCourse(courseNumber){
    var thisClass = '.'+courseNumber;
    var cb_checked =$(thisClass+':checked');
    var checkedLength =cb_checked.length;
    if(checkedLength>0){
        $.each(cb_checked,function(){
            $(":checkbox").attr("disabled", true);
            $(thisClass).removeAttr("disabled");
        });
        glbCourseNumber = courseNumber;
    }else{
        $(":checkbox").removeAttr("disabled");
    }

}
function onCheckboxBatchTimetable(courseNo,index){
    var thisClass = '.batchTimetable'+index;
    if($(thisClass).is(':checked')){
        batchSaveTimetableCouseNos.push(courseNo);
    }else{
        batchSaveTimetableCouseNos.splice(batchSaveTimetableCouseNos.indexOf(courseNo),1);
    }
    // console.log(batchSaveTimetableCouseNos)
}
// 点击合并教学班按钮触发
// 如果点击前按钮显示“合并教学班”，则复选框显示可以开始勾选
// 如果点击前按钮显示“请确定选择”，则将勾选后的复选框教学班合并为同一个合并教学班，如果
function setMergeCourse() {
    if ($("#button_merge span").html() == "合并教学班") {
        $("#button_merge span").html("请确定合并");
        $(':button:not(#button_merge)').attr("disabled", "true");
        $("div.checkboxCourse").show();
        // document.getElementById('button_merge').removeAttribute("disabled");;

    } else {
        //开始保存
        var courseNo ="";
        //var courseNumber = glbCourseNumber;
        var thisClass = '.'+glbCourseNumber;
        var cb_checked =$(thisClass+':checked');
        $.each(cb_checked,function(){
            courseNo += $(this).val()+",";
            //courseNumber += $(this).attr("class");
        });
        /*
        * 如果只有一个合并班，则提示不必合并
        * */
        if(courseNo.split(",").length<3){
            alert("合并教学班少于两个，请重新选择！")
            return;
        }
        $("div.checkboxCourse").hide();
        $("#button_merge span").html("合并教学班");
        $(':button').removeAttr("disabled");
        var arr = new Object();
        arr.courseNo = courseNo;
        var arrs = JSON.stringify(arr);
        $.ajax({
            url: zuulUrl + "api/school/apiNewSchoolCourse",
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            dataType: "json",
            type: "post",
            data: arrs,
            //async: false,
            success: function (json) {
                layer.msg("<span style='color:white'>合并成功！</span>");
            },
            error: function () {
                layer.msg('合并出了点问题，请重试!', {
                    icon: 1,
                });
                return false;
            }
        });
        refreshBootstrapTableLayer();
    }

}
//一键排课
function batchSaveTimetableFun() {
    if ($("#button_batch_save span").html() == "一键排课") {
        $("#button_batch_save span").html("请确定排课");
        $(':button:not(#button_batch_save)').attr("disabled", "true");
        $("div.checkboxTimetable").show();
        // document.getElementById('button_merge').removeAttribute("disabled");;

    } else {
        $("div.checkboxTimetable").hide();
        $("#button_batch_save span").html("一键排课");
        $(':button').removeAttr("disabled");
        // var arr = new Object();
        // arr.courseNos = batchSaveTimetableCouseNos.join(',');
        // arr.createdBy = username;
        // var arrs = JSON.stringify(arr);
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiBatchSaveTimeTable?courseNos="+batchSaveTimetableCouseNos.join(',')+"&createdBy="+username,
            // contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            // dataType: "json",
            type: "post",
            // data: arrs,
            //async: false,
            success: function (json) {
                layer.msg("<span style='color:white'>排课成功！</span>");
            },
            error: function () {
                layer.msg('排课出了点问题，请重试!', {
                    icon: 1,
                });
                return false;
            }
        });
        refreshBootstrapTableLayer();
    }

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

//删除排课缓存
function deleteTimetableRedisCache() {
    if (confirm('是否确认删除？')) {
        var arr = new Object();
        //获取jwt认证，获取token
        //getJWTAuthority();
        $.ajax({
            url: zuulUrl + "api/timetable/deleteTimetableRedisCache" ,
            // contentType: "application/json;charset=utf-8",
            async: false,
            dataType: "json",
            type: "get",
            //async: false,
            success: function (json) {
                layer.msg('<span style="color: #fff">'+ json.data +'</span>');

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