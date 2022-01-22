var contextPath = $("meta[name='contextPath']").attr("content");

//删除学生
function deleteStu(obj) {
    if(confirm("是否要删除该学生?")){
       /*/var siteId = $("#siteId").val();
        location.href=contextPath+'/manage/delStu?userId='+userId+'&siteId='+siteId;*/
        $(obj).parents("tr").remove();
    }else{
        return false;
    }
}

$(".delete_student").click(function () {
    if(confirm("是否要删除该学生?")){
        $(this).parents("tr").remove();
    } else{
        return false;
    }
})
//删除列表
$(".delete_box").click(function () {
    $(this).parents("tr").remove();
})
function cancelOutline() {
    layer.closeAll();
}
//设置权限(可以多选)
function setAuth(userId){
    $.post(contextPath+"/manage/setSiteAuth?userId="+userId, {}, function(data){
        openSchoolWindow(data,'设置课程角色');
    });
}

//设置权限(可以多选)
function setMessage(userName){
    $.post(contextPath+"/bulletin/sendMessageToUserNow?userName="+userName, {}, function(data){
        openMessageWindow(data,'信息发送');
    });
}


/*function submitInfo() {

    var title=$("#title").val();
    var content=$("#content").val();
    var email=$("#email").val();
    var  password=$("#password").val();
    console.log("qqqq",content)
    console.log("qqqq2",title)
    console.log("qqqq3",email)
    console.log("qqqq4",password)
    console.log("000",contextPath+'/gvsunTms/bulletin/saveTMessageaaa)
    $.ajax({

        url: contextPath+'/gvsunTms/bulletin/saveTMessageaaa?title='+title+'&content='+content+'&email='+email+'&password='+password,
        type:'post',
        async:true,  // 设置同步方式
        cache:false,
        success:function(data){

//                    if(data!=""){
//                        location.reload();
//                    }
        }
    });


}*/
function submitInfo() {

    var title = $("#title").val();
    var content = $("#content").val();
    var email = $("#email").val();
    var senderEmail = $("#senderEmail").val();
    var password = $("#password").val();
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
    email1 = reg.test(email);
    sendEmail=reg.test(senderEmail)
    console.log("panduan", email1)
    console.log("发件人邮箱判断", sendEmail)
    if (title==""||content=="")
    {
        alert("标题或内容不能为空")
    }
    else {
        if (email1 == true&&sendEmail==true) {

            console.log("qqqq", content)
            console.log("qqqq2", title)
            console.log("qqqq3", email)
            console.log("qqqq4", password)
            console.log("qqqq5", senderEmail)
            console.log("000", contextPath + '/gvsunTms/bulletin/saveTMessage')
            $.ajax({

                url: contextPath + '/bulletin/saveTMessage?title=' + title + '&content=' + content + '&email=' + email + '&password=' + password + '&senderEmail=' + senderEmail,
                type: 'post',
                async: true,  // 设置同步方式
                cache: false,
                success: function (data) {
                    console.log("返回数据",data)
                    if (data == true) {
                        alert("发送成功")
                        layer.closeAll();
                    }
                    else{
                        alert("发送失败")
                        layer.closeAll();
                    }
//                    if(data!=""){
//                        location.reload();
//                    }
                }
            });

        }

        else {
            alert("请输入正确的收件人或发件人邮箱格式")
        }
    }
}
function openSchoolWindow(content, title, width, height) {
    width = width || 500;
    height = height || 500;
    var offset = ((window.screen.height - height) * 0.3) + 'px';

    layer.open({
        title: title
        , content: content
        , type: 1
        , offset: offset //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
        , shade: 0.5 // 遮罩层透明度
        , shadeClose: true
        , resize: false
        , area: [width + 'px', '330px']
        , skin: 'layui-layer-rim'
    });
    layui.use('form', function(){
        var form = layui.form;
        form.render();//只有执行了这一步，部分表单元素才会自动修饰成功

        //……

        //但是，如果你的HTML是动态生成的，自动渲染就会失效
        //因此你需要在相应的地方，执行下述方法来手动渲染，跟这类似的还有 element.init();
        form.render();
    });}


function openMessageWindow(content, title, width, height) {
    width = width || 700;
    height = height || 600;
    var offset = ((window.screen.height - height) * 0.68) + 'px';

    layer.open({
        title: title
        , content: content
        , type: 1
        , offset: offset //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
        , shade: 0.5 // 遮罩层透明度
        , shadeClose: true
        , resize: false
        , area: [width + 'px', '440px']
        , skin: 'layui-layer-rim'
    });
    layui.use('form', function(){
        var form = layui.form;
        form.render();//只有执行了这一步，部分表单元素才会自动修饰成功

        //……

        //但是，如果你的HTML是动态生成的，自动渲染就会失效
        //因此你需要在相应的地方，执行下述方法来手动渲染，跟这类似的还有 element.init();
        form.render();
    });}

function setAuthList() {
    var userId=$("#uid").val();
    var authList="";
    var contextPath = /*[[@{/}]]*/'';
    $("input[name='choose']:checked").each(
        function(){
            authList += $(this).val()+",";
        }
    )
    $("#authList").val(authList);
    $.ajax({
        data: {'userId': userId,'authList':authList},
        url: contextPath + "IfcheckLeader",
        dataType: 'json',
        type: "POST",
        success: function (data) {
            if(data) {
                $("#addAuth").submit();
                layer.closeAll();
            }else{
                alert("本人所在的组已经存在一个组长");
                layer.closeAll();
                return false;
            }
        }

    });
}
//设置学生和组长
function setStu(userId){
    location.href = contextPath+'/manage/changeRole?userId='+userId+'&role=0';

}
function setLead(userId){
    location.href = contextPath+'/manage/changeRole?userId='+userId+'&role=1';
}
//设置资源共享和评委
function setRes(userId){
    location.href = contextPath+'/manage/changeRole?userId='+userId+'&role=3';

}
function cancelRes(userId){
    location.href = contextPath+'/manage/changeRole?userId='+userId+'&role=0';
}




<!--增加作业弹出框-->
function workBox(){
    var contextPath = /*[[@{/}]]*/'';
    var index = layer.open({
        type: 2,
        content: contextPath+'workBox',
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
    location.href=contextPath+'manage/learnManage?siteId='+siteId+'&cname='+cname+'&username='+username+'&currpage=1';
}
function lastPage(){
    //末页
    var cname = $("#cname").val();
    var username = $("#username").val();
    var totalPage=$("#totalPage").val();
    var siteId = $("#siteId").val();
    location.href=contextPath+'manage/learnManage?siteId='+siteId+'&cname='+cname+'&username='+username+'&currpage='+totalPage;
}
function previousPage(){
    //上一页
    var cname = $("#cname").val();
    var username = $("#username").val();
    var currpage=$("#currpage").val();
    var siteId = $("#siteId").val();
    if(currpage>1){
        currpage=parseInt(currpage)-1;
    }else{
        currpage=1;
    }
    location.href=contextPath+'manage/learnManage?siteId='+siteId+'&cname='+cname+'&username='+username+'&currpage='+currpage;
}
function nextPage(){
    //下一页
    var cname = $("#cname").val();
    var username = $("#username").val();
    var currpage=$("#currpage").val();
    var totalPage=$("#totalPage").val();
    var siteId = $("#siteId").val();
    if(parseInt(currpage)<parseInt(totalPage)){
        currpage=parseInt(currpage)+1;
    }else{
        currpage=totalPage;
    }
    location.href=contextPath+'manage/learnManage?siteId='+siteId+'&cname='+cname+'&username='+username+'&currpage='+currpage;

}
function homePage1() {
    //首页
    var siteId = $("#siteId").val();
    var username=$("#username").val();
    var academy=$("#academy").val();
    var classes=$("#classes").val();
    var major=$("#major").val();
    location.href=contextPath+'/manage/addStudent?siteId='+siteId+'&currpage=1'+'&username='+username+'&academy='+academy+'&maior='+major+'&classes='+classes;
}
function lastPage1(){
    //末页
    var siteId = $("#siteId").val();
    var totalPage=$("#totalPage").val();
    var username=$("#username").val();
    var academy=$("#academy").val();
    var classes=$("#classes").val();
    var major=$("#major").val();
    location.href=contextPath+'/manage/addStudent?siteId='+siteId+'&currpage='+totalPage+'&username='+username+'&academy='+academy+'&maior='+major+'&classes='+classes;
}
function previousPage1(){
        var siteId = $("#siteId").val();
        var currpage=$("#currpage").val();
        if(currpage>1){
            currpage=parseInt(currpage)-1;
        }else{
            currpage=1;
        }
        location.href=contextPath+'/manage/addStudent?siteId='+siteId+'&currpage='+currpage;


}
    //上一页

function nextPage1(){
        var currpage=$("#currpage").val();
        var totalPage=$("#totalPage").val();
        var siteId = $("#siteId").val();
        if(parseInt(currpage)<totalPage){
            currpage=parseInt(currpage)+1;
        }else{
            currpage=totalPage;
        }
        location.href=contextPath+'/manage/addStudent?siteId='+siteId+'&currpage='+currpage;
}

function homeMemberPage() {
    //首页
    var cname = $("#cname").val();
    var username = $("#username").val();
    var siteId = $("#siteId").val();
    location.href=contextPath+'manage/siteMember?siteId='+siteId+'&cname='+cname+'&username='+username+'&currpage=1';
}
function lastMemberPage(){
    //末页
    var cname = $("#cname").val();
    var username = $("#username").val();
    var totalPage=$("#totalPage").val();
    var siteId = $("#siteId").val();
    location.href=contextPath+'manage/siteMember?siteId='+siteId+'&cname='+cname+'&username='+username+'&currpage='+totalPage;
}
function previousMemberPage(){
    //上一页
    var cname = $("#cname").val();
    var username = $("#username").val();
    var currpage=$("#currpage").val();
    var siteId = $("#siteId").val();
    if(currpage>1){
        currpage=parseInt(currpage)-1;
    }else{
        currpage=1;
    }
    location.href=contextPath+'manage/siteMember?siteId='+siteId+'&cname='+cname+'&username='+username+'&currpage='+currpage;
}
function nextMemberPage(){
    //下一页
    var cname = $("#cname").val();
    var username = $("#username").val();
    var currpage=$("#currpage").val();
    var totalPage=$("#totalPage").val();
    var siteId = $("#siteId").val();
    if(currpage<totalPage){
        currpage=parseInt(currpage)+1;
    }else{
        currpage=totalPage;
    }
    location.href=contextPath+'manage/siteMember?siteId='+siteId+'&cname='+cname+'&username='+username+'&currpage='+currpage;

}



//添加学生
function addStudent() {
    var addStudentList="";
    $("input[name='choose']:checked").each(
        function(){
            addStudentList += $(this).val()+",";
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
layui.use('upload', function(){
    var $ = layui.jquery
        ,upload = layui.upload;
    upload.render({
        elem: '#test1'
        ,url: contextPath+'manage/importTCourseSiteUser?siteId='+siteId
        ,accept: 'file' //普通文件
        ,done: function(res) {
            alert("导入成功");
            location.href = contextPath + 'manage/learnManage?siteId='+siteId;
        }
    });
});
<!--弹出层里面的取消按钮-->
function closeDiv(){
    layer.closeAll();
}
//导出学生名单
function exportStudent(){
    location.href = contextPath + 'manage/exportExcelStudentBySiteId';
}
//导出总成绩
function exportTotalRecords(){
    location.href = contextPath + 'manage/exportExcelStudentTotalRecordsBySiteId';
}
//导出学习小组成绩
function exportGroupRecords(){
    location.href = contextPath + 'manage/exportExcelGroupRecordsBySiteId';
}
//导出行为成绩
function exportBehaviorRecords(){
    location.href = contextPath + 'manage/exportExcelBehaviorRecordsBySiteId';
}
//导出考勤成绩
function exportAttendanceRecords(){
    location.href = contextPath + 'manage/exportExcelAttendanceRecordsBySiteId';
}
//导出作业成绩
function exportTaskRecords(){
    location.href = contextPath + 'manage/exportExcelTaskRecordsBySiteId';
}
//导出考试成绩
function exportExamRecords(){
    location.href = contextPath + 'manage/exportExcelExamRecordsBySiteId';
}
//导出测试成绩
function exportTestRecords(){
    location.href = contextPath + 'manage/exportExcelTestRecordsBySiteId';
}
//导出实验项目成绩
function exportProjectRecords(){
    location.href = contextPath + 'manage/exportExcelProjectRecordsBySiteId';
}

// 渲染
layui.use('form', function() {
    var form = layui.form;
    form.render('checkbox');
    form.render('select');
});

//学习行为查看表格放大缩小
function showMoreLess(middle, more, less) {
    var display = jQuery(middle).css('display');
    var isVisible = !display || display != 'none';
    if(!isVisible) {
        setMainFrameHeightNoScroll(window.name, 0, 400);

        if(jQuery(middle + ' .loaded').length == 0) {
            jQuery(middle + ' .tabsel a').click();
            jQuery(middle).append('<span class="loaded" style="display: none"></span>');
        }

        jQuery(more).hide();
        jQuery(less).show();
        if(jQuery.browser.msie && jQuery.browser.version == '8.0') {
            jQuery(middle).show();
        }else{
            jQuery(middle).slideDown('300', function() {
                setMainFrameHeightNoScroll(window.name, 0, 100);
            });
        }
    }else{
        jQuery(more).show();
        jQuery(less).hide();
        jQuery(middle).slideUp('300', function() {
            setMainFrameHeightNoScroll(window.name, 0, 100);
        });
    }
}
//页面按日期按用户跳转
$(window).ready(function () {
    $.each($(".tabnav").children(),function (index,obj) {
        $(obj).click(function(){
     var index = $(this).index();
     var sel = $(this);
     sel.addClass('tabsel').removeClass('tab');
     sel.siblings().addClass('tab').removeClass('tabsel');
     sel.parent().parent().find('.tabContents').eq(index).css('display', 'block');
     sel.parent().parent().find('.tabContents').eq(index).siblings().css('display', 'none');
     sel.parent().css('display', 'block');
 });
    });
    var siteId=$("#siteId").val();
    var site=$.cookie('site');
    if(site!=undefined) {
        /*var i = site.lastIndexOf(",");
      //  alert(i);
        var j = site.substring(i + 1, site.length);
        //alert(j);*/
        if (siteId !=site ) {
            $.cookie("checkedStu","", {path: '/'});
            $.cookie("site", siteId, {path: '/'})
        }
    }
    var checkedStu = $.cookie('checkedStu');
    //alert(checkedStu);
    if(checkedStu!=undefined) {
        checkedStu = checkedStu.split(',');
        for (var x = 0; x < checkedStu.length; x++) {
                $(document.getElementById(checkedStu[x])).attr('checked', true);

        }
    }
});
layui.use('form', function(){
    var form = layui.form;
    form.render();
    //全选
    form.on('checkbox(allChoose)', function(data){
        var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]');
        child.each(function(index, item){
            item.checked = data.elem.checked;
        });
        form.render('checkbox');
    });

});
layui.use('form', function(){
    var form = layui.form;
    form.render();
    //全选
    form.on('checkbox(allChooxiao)', function(data){
        var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]');
        child.each(function(index, item){
            item.checked = false;
        });
        form.render('checkbox');
    });

});

var addStudentList = $("#addStudentList").val();
layui.use('form', function() {
    var form = layui.form;
    form.render();
    form.on('checkbox(partChoose)', function (data) {
         console.log(data.elem); //得到checkbox原始DOM对象
         console.log(data.elem.checked); //是否被选中，true或者false
         console.log(data.value); //复选框value值，也可以通过data.elem.value得到
         console.log(data.othis); //得到美化后的DOM对象
        if (data.elem.checked) {
            //addStudentList += data.value+",";
            // $("#addStudentList").val(addStudentList);
            var cookieData=$.cookie("checkedStu");
            cookieData+=","+data.value+",";
            $.cookie("checkedStu",cookieData,{ path: '/'});
        } else {
            var cookieData=$.cookie("checkedStu");
            cookieData = cookieData.replace(","+data.value+",","");
            //cookieData.trim();
            $.cookie("checkedStu",cookieData,{ path: '/'});
            //alert($.cookie("checkedStu"));
        }

    });
});

function homePage2() {
    //首页
    var siteId = $("#siteId").val();
    location.href=contextPath+'/manage/getApplyStudent?currpage=1';
}
function lastPage2(){
    //末页
    var siteId = $("#siteId").val();
    var totalPage=$("#totalPage").val();
    if (totalPage == 0) {
        totalPage = 1;
    }
    location.href=contextPath+'/manage/getApplyStudent?currpage='+totalPage;
}
function previousPage2(){
    var siteId = $("#siteId").val();
    var currpage=$("#currpage").val();
    if(currpage>1){
        currpage=parseInt(currpage)-1;
    }else{
        currpage=1;
    }
    location.href=contextPath+'/manage/getApplyStudent?currpage='+currpage;


}
//上一页

function nextPage2(){
    var currpage=$("#currpage").val();
    var totalPage=$("#totalPage").val();
    var siteId = $("#siteId").val();
    if(parseInt(currpage)<totalPage){
        currpage=parseInt(currpage)+1;
    }else if (parseInt(totalPage) != 0) {
        currpage=totalPage;
    }
    location.href=contextPath+'/manage/getApplyStudent?currpage='+currpage;
}

function auditApplication(id,status) {
    console.log(id);
    console.log(status);
    $.ajax({
        url: contextPath+'/manage/auditApplication',
        data:{'id':id,'status':status},
        type: 'POST',
        dataType:'json',
        success: function(data) {
            if(data){
                alert("审核通过，成功添加该学生");
            }else {
                alert("审核未通过");
            }
            location.reload();
        },
        error:function(){
            alert("信息错误");
        }
    });
}
function deleteStudent() {
    var deleStudentList="";
    var deleStudentIdList="";
    var contextPath = /*[[@{/}]]*/'';
    $("input[name='choose']:checked").each(
        function() {
            deleStudentList += $(this).val()+",";
            deleStudentIdList += $(this).next().next().val()+",";
        }
    )

    $("#deleStudentIdList").val(deleStudentIdList);
    $("#deleStudentList").val(deleStudentList);
    if( confirm("是否确认删除？")){
        $("#myForm").submit();
    }else{
        return false;
    }


}

function deleteStudent2(siteId,userId,userName) {
    if(confirm("是否确认删除？")){
        location.href=contextPath+'/manage/delStu?siteId='+siteId+'&userId='+userId+'&userName='+userName;
        return true;
    }else{
        return false;
    }
}
function returnManage() {
    $.cookie("checkedStu","", {path: '/'});
    location.href=contextPath+'/manage/learnManage';
}
$(function() {
    var contextPath = /*[[@{/}]]*/'';
    var cname = $("#cname").val();
    var username = $("#username").val();
    var siteId = $("#siteId").val();
    var buttonString = $("#buttonString").val();
    var currpage=$("#currpage").val();
    var butt=new RegExp(buttonString);
//第一个ajax获取count总数
    /*$.ajax({
        type: "post",
        url: url,
        async: true,
        success: function (data) {
            console.log(data);*/
            layui.use(['laypage', 'layer','form'], function () {
                var laypage = layui.laypage
                    , layer = layui.layer;
                var form = layui.form;
                laypage.render({
                    elem: 'newPage'
                    , count: $("#totalRecords").val()
                    , layout: ['count', 'prev', 'page', 'next', 'skip']
                    , limit:20
                    , jump: function (obj,first) {
                        console.log(obj)
                        var curr = currpage;
                        $("#currpage").val(curr);
                        /* $.get("getContent?page="+curr
                             ,function(data){
                                 //渲染数据
                             });*/
                        if (!first) {
                            $.ajax({
                                async: false,
                                data: {'currpage': curr, 'siteId': siteId, 'username': username, 'cname': cname},
                                url: contextPath + "courseSiteManage",
                                dataType: 'json',
                                type: "POST",
                                success: function (res) {
                                    var str1 = "";
                                    var auth = new Array();
                                    $("#test12").empty();
                                    for (var i = 0; i < res.length; i++) {
                                        str1 = "<tr>" +
                                            "<td><input type='hidden' id='userId' name='userId' th:value='" + res[i].id + "'/><span>" + res[i].cname + "</span></td>" +
                                            "<td><span>" + res[i].username + "</span></td><td>";
                                        for (var j = 0; j < res[i].authorityVoList.length; j++) {
                                            str1 += "<span>" + res[i].authorityVoList[j].cname + "</span>";
                                        }
                                        str1 += "</td><td><span>" + res[i].sexy + "</td>" +
                                            "<td><span></span> </td>" + "<td><span></span> </td>" + "<td><span></span> </td>" + "<td><span></span> </td>" +
                                            "<td><span></span> </td>" + "<td><span></span> </td>" + "<td><span></span> </td>" + "<td><span></span> </td>" +
                                            "<td>";
                                        if(buttonString.indexOf("设置学生课程角色")!=-1) {
                                            str1 += "<span><input type='button' value='设置权限' onclick=setAuth(" + res[i].id + ") /></span>";
                                        }
                                        if(buttonString.indexOf("管理学生")!=-1) {
                                            str1 += "<span ><a><button type='button' title='删除' class='fa fa-trash-o' onclick=deleteStudent2('" + siteId + "','" + res[i].id + "','"+res[i].username+"') ></button></a>" +
                                                "</span><span><input type='checkbox' name='choose' value='"+res[i].username+"' lay-skin='primary'/>" +
                                                "<input type='hidden' name='choose2' value='"+res[i].id+"' lay-skin='primary' />" +
                                                "</span>";
                                        }
                                        str1+="</td></tr>";
                                        $("#test12").append(str1);
                                    }
                                    form.render('checkbox');
                                }

                            })
                        }
                    }
                });

            })
});
layui.use('form', function() {
    var form = layui.form;
    form.on('submit(formDemo)', function(data) {
        var academy = data.field.academySelect;
        var major = data.field.majorSelect;
        var classes = data.field.classesSelect;
        $("#academy").val(academy);
        $("#major").val(major);
        $("#classes").val(classes);
        $("#studentForm").submit();
    });
});
