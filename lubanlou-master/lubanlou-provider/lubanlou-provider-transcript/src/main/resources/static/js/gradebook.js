var contextPath = $("meta[name='contextPath']").attr("content");

//删除学生
function deleteStu(obj) {
    if (confirm("是否要删除该学生?")) {
        /*/var siteId = $("#siteId").val();
         location.href=contextPath+'/manage/delStu?userId='+userId+'&siteId='+siteId;*/
        $(obj).parents("tr").remove();
    } else {
        return false;
    }
}

//删除列表
$(".delete_box").click(function () {
    $(this).parents("tr").remove();
})

//设置学生和组长
function setStu(userId) {
    location.href = contextPath + '/manage/changeRole?userId=' + userId + '&role=0';

}

function setLead(userId) {
    location.href = contextPath + '/manage/changeRole?userId=' + userId + '&role=1';
}

//设置资源共享和评委
function setRes(userId) {
    location.href = contextPath + '/manage/changeRole?userId=' + userId + '&role=3';

}

function cancelRes(userId) {
    location.href = contextPath + '/manage/changeRole?userId=' + userId + '&role=0';
}


<!--增加作业弹出框-->
function workBox() {
    var contextPath = /*[[@{/}]]*/'';
    var index = layer.open({
        type: 2,
        content: contextPath + 'workBox',
        area: ['320px', '195px'],
        maxmin: true
    });
    layer.full(index);
}

function homePage() {
    //首页
    var cname = $("#cname").val();
    var username = $("#username").val();
    var siteId = $("#siteId").val();
    location.href = contextPath + 'manage/learnManage?siteId=' + siteId + '&cname=' + cname + '&username=' + username + '&currpage=1';
}

function lastPage() {
    //末页
    var cname = $("#cname").val();
    var username = $("#username").val();
    var totalPage = $("#totalPage").val();
    var siteId = $("#siteId").val();
    location.href = contextPath + 'manage/learnManage?siteId=' + siteId + '&cname=' + cname + '&username=' + username + '&currpage=' + totalPage;
}

function previousPage() {
    //上一页
    var cname = $("#cname").val();
    var username = $("#username").val();
    var currpage = $("#currpage").val();
    var siteId = $("#siteId").val();
    if (currpage > 1) {
        currpage = parseInt(currpage) - 1;
    } else {
        currpage = 1;
    }
    location.href = contextPath + 'manage/learnManage?siteId=' + siteId + '&cname=' + cname + '&username=' + username + '&currpage=' + currpage;
}

function nextPage() {
    //下一页
    var cname = $("#cname").val();
    var username = $("#username").val();
    var currpage = $("#currpage").val();
    var totalPage = $("#totalPage").val();
    var siteId = $("#siteId").val();
    if (currpage < totalPage) {
        currpage = parseInt(currpage) + 1;
    } else {
        currpage = totalPage;
    }
    location.href = contextPath + 'manage/learnManage?siteId=' + siteId + '&cname=' + cname + '&username=' + username + '&currpage=' + currpage;

}

function homePage1() {
    //首页
    var siteId = $("#siteId").val();
    location.href = contextPath + '/manage/addStudent?siteId=' + siteId + '&currpage=1';
}

function lastPage1() {
    //末页
    var siteId = $("#siteId").val();
    var totalPage = $("#totalPage").val();
    location.href = contextPath + '/manage/addStudent?siteId=' + siteId + '&currpage=' + totalPage;
}

function previousPage1() {
    //上一页
    var siteId = $("#siteId").val();
    var currpage = $("#currpage").val();
    if (currpage > 1) {
        currpage = parseInt(currpage) - 1;
    } else {
        currpage = 1;
    }
    location.href = contextPath + '/manage/addStudent?siteId=' + siteId + '&currpage=' + currpage;
}

function nextPage1() {
    //下一页
    var currpage = $("#currpage").val();
    var totalPage = $("#totalPage").val();
    var siteId = $("#siteId").val();
    if (currpage < totalPage) {
        currpage = parseInt(currpage) + 1;
    } else {
        currpage = totalPage;
    }
    location.href = contextPath + '/manage/addStudent?siteId=' + siteId + '&currpage=' + currpage;

}

//添加学生
function addStudent() {
    var addStudentList = "";
    $("input[name='choose']:checked").each(
        function () {
            addStudentList += $(this).val() + ",";
        }
    )
    $("#addStudentList").val(addStudentList);
    $("#myForm").submit();
}

//批量导入
function importStu() {
    layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        shadeClose: true,
        skin: 'yourclass',
        content: $("#importStu")
    });
}

var siteId = $("#siteId").val();
//上传
layui.use('upload', function () {
    var $ = layui.jquery
        , upload = layui.upload;
    upload.render({
        elem: '#test1'
        , url: contextPath + 'manage/importTCourseSiteUser?siteId=' + siteId
        , accept: 'file' //普通文件
        , done: function (res) {
            alert("导入成功");
            location.href = contextPath + 'manage/learnManage?siteId=' + siteId;
        }
    });
});

<!--弹出层里面的取消按钮-->
function closeDiv() {
    layer.closeAll();
}

//导出学生名单
function exportStudent() {
    location.href = contextPath + 'manage/exportExcelStudentBySiteId';
}

//导出总成绩
function exportTotalRecords() {
    location.href = contextPath + 'manage/exportExcelStudentTotalRecordsBySiteId';
}

//导出学习小组成绩
function exportGroupRecords() {
    location.href = contextPath + 'manage/exportExcelGroupRecordsBySiteId';
}

//导出行为成绩
function exportBehaviorRecords() {
    location.href = contextPath + 'manage/exportExcelBehaviorRecordsBySiteId';
}

//导出考勤成绩
function exportAttendanceRecords() {
    location.href = contextPath + 'manage/exportExcelAttendanceRecordsBySiteId';
}

//导出实验作业成绩
function exportTaskRecords() {
    location.href = contextPath + 'manage/exportExcelTaskRecordsBySiteId';
}

//导出考试成绩
function exportExamRecords() {
    location.href = contextPath + 'manage/exportExcelExamRecordsBySiteId';
}

//导出测试成绩
function exportTestRecords() {
    location.href = contextPath + 'manage/exportExcelTestRecordsBySiteId';
}

//导出实验项目成绩
function exportProjectRecords() {
    location.href = contextPath + 'manage/exportExcelProjectRecordsBySiteId';
}

//导出作业、测试、考试、考勤、实验报告、实验作业、学习小组成绩
function exportRecords(module, siteId, type, size) {
    if (size == "0")
        alert("空表，无需导出");
    else
        location.href = contextPath + 'manage/exportExcelRecordsBySiteId?module=' + module + "&siteId=" + siteId + "&type=" + type;
}

// 渲染
layui.use('form', function () {
    var form = layui.form;
    form.render('checkbox');
    form.render('select');
});

//学习行为查看表格放大缩小
function showMoreLess(middle, more, less) {
    var display = jQuery(middle).css('display');
    var isVisible = !display || display != 'none';
    if (!isVisible) {
        setMainFrameHeightNoScroll(window.name, 0, 400);

        if (jQuery(middle + ' .loaded').length == 0) {
            jQuery(middle + ' .tabsel a').click();
            jQuery(middle).append('<span class="loaded" style="display: none"></span>');
        }

        jQuery(more).hide();
        jQuery(less).show();
        if (jQuery.browser.msie && jQuery.browser.version == '8.0') {
            jQuery(middle).show();
        } else {
            jQuery(middle).slideDown('300', function () {
                setMainFrameHeightNoScroll(window.name, 0, 100);
            });
        }
    } else {
        jQuery(more).show();
        jQuery(less).hide();
        jQuery(middle).slideUp('300', function () {
            setMainFrameHeightNoScroll(window.name, 0, 100);
        });
    }
}

//页面按日期按用户跳转
$(window).ready(function () {
    $.each($(".tabnav").children(), function (index, obj) {
        $(obj).click(function () {
            var index = $(this).index();
            var sel = $(this);
            sel.addClass('tabsel').removeClass('tab');
            sel.siblings().addClass('tab').removeClass('tabsel');
            sel.parent().parent().find('.tabContents').eq(index).css('display', 'block');
            sel.parent().parent().find('.tabContents').eq(index).siblings().css('display', 'none');
            sel.parent().css('display', 'block');
        });
    });

});

// 同步成绩册
function synchronizeGradebook(module, type, siteId, assignmentId) {
    $.ajax({
        type: "POST",
        dataType: "json",
        async: false,  // 设置同步方式
        cache: false,
        url: contextPath + '/gradebook/synchronizeGradebook',
        data: ({module: module, type: type, siteId: siteId, assignmentId: assignmentId}),
        complete: function (data) {
            alert("计算完成");
            location.reload();
        }
    });
}

function saveTTestGrading(module, type, site_id, student, obj) {
    //发送ajax请求
    var score = $("#" + obj).val();
    $.ajax({
        url: contextPath + '/gradebook/saveTTestGrading?module=' + module + '&type=' + type + '&siteId=' + site_id + '&student=' + student + '&score=' + score,
        type: 'post',
        async: false,  // 设置同步方式
        cache: false,
        complete: function (data) {
            alert("计算完成!");
            location.reload();
        }
    });
}
function a1111(site_id) {
    document.getElementById("goLoading").setAttribute("class","top_mask");
    setTimeout(synchronizeAllTTestGrading(site_id),2000);

}

function synchronizeAllTTestGrading(site_id) {

    //发送ajax请求
    $.ajax({
        url: contextPath + '/gradebook/synchronizeAllTTestGrading?siteId=' + site_id,
        type: 'post',
        async: false,  // 设置同步方式
        cache: false,
        complete: function (data) {
            alert("获取完成!");
            location.reload();
        }
    });

}
function editTranscript(student,assignmentId) {
var test = student+'_'+assignmentId
    var points = $("#"+ test).val();
    //发送ajax请求
    $.ajax({
        url: 'editRecord',
        data: {'student': student,'assignmentId': assignmentId,'points':points},
        type: 'post',
        async: false,  // 设置同步方式
        cache: false,
        success: function (data) {
            alert(data);
            location.reload();
        }
    });
}