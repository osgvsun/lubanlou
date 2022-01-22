var contextPath = $("meta[name='contextPath']").attr("content");
var zuulServerUrl = $("#zuulServerUrl").val();
var zuulUrl =$("#zuulServerUrl").val()+"/timetable/";
$(document).ready(function () {
    zuulUrl =$("#zuulServerUrl").val()+"/timetable/";
    $('#teacher').select2({
        width: "89%",
        placeholder: '请选择授课教师...',
        placeholderOption: "first",
        ajax: {
            url: zuulUrl + "api/user/apiUserListBySelect",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority());
            },
            dataType: "json",
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

    $('#courseNumber').select2({
        width: "89%",
        placeholder: '请选择课程信息...',
        placeholderOption: "first",
        ajax: {
            url: zuulUrl + "api/school/apiSchoolCourseInfoListBySelect",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority());
            },
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            delay: 250,//延时0.5秒之后再进行请求
            type: "post",
            data: function (params) {
                var arr = new Object();
                arr.search = params.term;
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

    $('#term').select2({
        width: "89%",
        placeholder: '请选择学期信息...',
        placeholderOption: "first",
        ajax: {
            url: zuulUrl + "api/school/apiSchoolTermListBySelect",
            contentType: "application/json;charset=utf-8",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority());
            },
            dataType: "json",
            delay: 250,//延时0.5秒之后再进行请求
            type: "post",
            data: function (params) {
                var arr = new Object();
                arr.search = params.term;
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

   $('#academyNumber').select2({
        width: "89%",
        placeholder: '请选择学院信息...',
        placeholderOption: "first",
        ajax: {
            url: zuulUrl + "api/school/apiSchoolAcademyListBySelect",
            contentType: "application/json;charset=utf-8",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority());
            },
            dataType: "json",
            delay: 250,//延时0.5秒之后再进行请求
            type: "post",
            data: function (params) {
                var arr = new Object();
                arr.search = params.term;
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

    $("#submitButton").on('click', function () {
        if (validform().form()) {
            var arr = new Object();
            arr.courseNumber = $("#courseNumber").val();
            arr.term = $("#term").val();
            arr.academyNumber = $("#academyNumber").val();
            arr.teacher = $("#teacher").val();
            arr.id = $("#selfId").val();
            arr.courseCount = $("#courseCount").val();
            arr.courseCode = $("#courseCode").val();
            arr.students = $("#students").val();
            var arrs = JSON.stringify(arr);
            $.ajax({
                url: zuulUrl + "api/timetable/self/apiSaveTimetableSelfCourse",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                type: "post",
                headers:{Authorization: getJWTAuthority()},
                async: false,
                data: arrs,
                success: function (json) {
                    if (json.code == "200") {
                        if (json.result == "no") {
                            alert("所选择的实训室资源冲突，请重新选择或者用调整排课操作，谢谢。");
                            isConflict = 0;
                        }
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                    }else if (json.code == "401") {
                        alert(json.msg);
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                    }else if (json.code == "300") {
                        alert(json.msg);
                    }
                }
            });
        } else {
            alert("请验证输入！");
        }
    })

    $("#form_lab").validate();

    $("#labRoom_id").change(function () {
        $(this).valid();
    });

    $("#teacherRelated").change(function () {
        $(this).valid();
    });
});

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

var childIndex;
//弹出选择学生窗口
function newStudents() {
    childIndex = layer.open({
        type: 1,
        title: '添加学生',
        maxmin: true,
        shadeClose: true,
        area: ['100%', '100%'],
        content: $("#newStudents")
    });
    layer.full(childIndex);
}

function schoolClassSearch() {
    $('.search_schoolClass').show();
    $('.search_single').hide();
}

function singleSearch() {
    $('.search_schoolClass').hide();
    $('.search_single').show();
    var cname=document.getElementById("cname").value;
    var username=document.getElementById("username1").value;
    $.ajax({
        // url:zuulServerUrl+"/limsproduct/limsproduct/LabRoomStationReservation/findUserByCnameAndUsername?cname="+cname+"&username="+username+"&page=1",
        url:zuulUrl + "api/user/userList?cname="+cname+"&username="+username+"&page=1",
        type:"POST",
        success:function(data){//AJAX查询成功
            document.getElementById("user_body_single").innerHTML=data;
        }
    });
}
function queryUser(){
    var cname;
    var username;
    cname=document.getElementById("cname").value;
    username=document.getElementById("username1").value;
    $.ajax({
        url:zuulUrl + "api/user/userList/findUserByCnameAndUsername?cname="+cname+"&username="+username+"&page=1",
        type:"POST",
        success:function(data){//AJAX查询成功
            document.getElementById("user_body_single").innerHTML=data;

        }
    });

}
function cancleQuery(){
    var cname="";
    var username="";
    $('#cname').val("");
    $('#username1').val("");
    $.ajax({
        url:zuulUrl + "api/user/userList/findUserByCnameAndUsername?cname="+cname+"&username="+username+"&page=1",
        type:"POST",
        success:function(data){//AJAX查询成功
            document.getElementById("user_body_single").innerHTML=data;

        }
    });
}
function queryClass(grade){
    var className;
    className=document.getElementById("class_search").value;
    getSchoolClasses(grade,className);

}
function cancleQueryClass(grade){
    getSchoolClasses(grade);

}
//首页
function firstPage(page){
    var cname=document.getElementById("cname").value;
    var username=document.getElementById("username1").value;
    $.ajax({
        url:zuulUrl + "api/user/userList/findUserByCnameAndUsername?cname="+cname+"&username="+username+"&page="+page,
        type:"POST",
        success:function(data){//AJAX查询成功
            document.getElementById("user_body_single").innerHTML=data;

        }
    });
}
//上一页
function previousPage(page){
    if(page==1){
        page=1;
    }else{
        page=page-1;
    }
    var cname=document.getElementById("cname").value;
    var username=document.getElementById("username1").value;
    $.ajax({
        url:zuulUrl + "api/user/userList/findUserByCnameAndUsername?cname="+cname+"&username="+username+"&page="+page,
        type:"POST",
        success:function(data){//AJAX查询成功
            document.getElementById("user_body_single").innerHTML=data;

        }
    });
}
//下一页
function nextPage(page,totalPage){
    if(page>=totalPage){
        page=totalPage;
    }else{
        page=page+1
    }
    var cname=document.getElementById("cname").value;
    var username=document.getElementById("username1").value;
    $.ajax({
        url:zuulUrl + "api/user/userList/findUserByCnameAndUsername?cname="+cname+"&username="+username+"&page="+page,
        type:"POST",
        success:function(data){//AJAX查询成功
            document.getElementById("user_body_single").innerHTML=data;
        }
    });
}
//末页
function lastPage(page){
    var cname=document.getElementById("cname").value;
    var username=document.getElementById("username1").value;
    $.ajax({
        url:zuulUrl + "api/user/userList/findUserByCnameAndUsername?cname="+cname+"&username="+username+"&page="+page,
        type:"POST",
        success:function(data){//AJAX查询成功
            document.getElementById("user_body_single").innerHTML=data;

        }
    });
}
function addUser(){
    var array=new Array();
    var s = "";
    var flag; //判断是否一个未选
    console.log($("input[name='CK_name']"));
    $("input[name='CK_name']:checkbox").each(function() { //遍历所有的name为CK_name的 checkbox
        if ($(this)[0].checked) { //判断是否选中
            flag = true; //只要有一个被选择 设置为 true
        }
    })

    if (flag) {
        $("input[name='CK_name']:checkbox").each(function() { //遍历所有的name为selectFlag的 checkbox
            if ($(this)[0].checked) { //判断是否选中
//                                            array.push($(this).val()); //将选中的值 添加到 array中
                s+=$(this).val()+";";   //如果选中，将value添加到变量s中
            }
        })
        var str = $('#students').val()  +s;
        $('#students').val(str);
        layer.close(layer.index)
        // var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        //
        // parent.layer.close(index); //再执行关闭
    } else {
        alert("请至少选择一条记录");
    }
}
//ajax查询班级用户列表
function putSchoolClassesUser(){
    var obj = document.getElementsByName("username");
    var s='';//如果这样定义var s;变量s中会默认被赋个null值
    for(var i=0;i<obj.length;i++){
        if(obj[i].checked) //取到对象数组后，我们来循环检测它是不是被选中
            s+=obj[i].value+'\n';   //如果选中，将value添加到变量s中
    }
    var str = $('#students').val() +'\n' +s;
    $('#students').val(str);
    // $("#newStudents").window('close');
    layer.close(childIndex);
}

function jumpto(id) {
    var bottombox = document.getElementById(id);
    bottombox.scrollIntoView();
}

//ajax查询用户的班级表
function getSchoolClasses(grade,search){
    if(search == undefined){search=''};
    $.ajax({
        type: "POST",
        url: zuulUrl + "api/timetable/self/apiGetSchoolClassesByGradeAndSearch?grade=" + grade + "&search=" + search,
        contentType: "application/json;charset=utf-8",
        headers:{Authorization: getJWTAuthority()},
        async: false,
        success:function(data){
            var jslength=1;
            var currLine=1;
            for(var js2 in data){jslength++;}
            if(jslength==0){alert("本周无课程数据");}else{}
            var tableStr="<table id='listTable' width='80%' cellpadding='0'><tr><td colspan=3><b>选择班级</b>&nbsp;&nbsp;" +
                "<input type='text' id='class_search' value='"+ search +"' placeholder='搜索班级'/>" +
                "<a onclick='queryClass("+ grade +");' class='searchLink'>搜索</a>&nbsp;&nbsp;" +
                "<a onclick='cancleQueryClass("+ grade +");' class='searchLink'>取消</a>" +
            "</td></tr>";//新建html字符
            $.each(data,function(key,values){
                if(currLine%3==0){
                    tableStr = tableStr + "<td><a class='btn btn-common' href='javascript:void(0)' onclick=\"getSchoolClassesUser('"+ key +"')\">" + values + "</a></td><tr>";
                }else  if(currLine%3==1){
                    tableStr = tableStr + "<tr><td><a class='btn btn-common' href='javascript:void(0)' onclick=\"getSchoolClassesUser('"+ key +"')\">" + values + "</a></td>";
                }
                else  if(currLine%3==2){
                    tableStr = tableStr + "<td><a class='btn btn-common' href='javascript:void(0)' onclick=\"getSchoolClassesUser('"+ key +"')\">" + values + "</a></td>";
                }
                currLine=currLine+1
                jslength=jslength+1;
            });
            tableStr = tableStr + "</tr></table>";
            document.getElementById('schoolClasses').innerHTML=tableStr;
            jumpto('schoolClasses');
        },
        error:function(){
            //alert("加载课表失败!");
        }
    });
}

//ajax查询班级用户列表
function getSchoolClassesUser(classNumber){
    $.ajax({
        type: "POST",
        url: zuulUrl + "api/timetable/self/apiGetSchoolClassesUser?classNumber=" + classNumber,
        contentType: "application/json;charset=utf-8",
        headers:{Authorization: getJWTAuthority()},
        dataType:'json',
        async: false,
        success:function(data){
            var jslength=1;
            var currLine=1;
            var allLine=1;
            for(var js2 in data){jslength++;}
            if(jslength==0){alert("本周无课程数据");}else{}

            var tableStr="<table id='listTable' width='80%' cellpadding='0'><tr><td><b>选择学生</b></td><td colspan=3><input class='btn btn-primary btn-lg' type='button' onclick='putSchoolClassesUser()' value='提交'/></td></tr>";//新建html字符
            $.each(data,function(key,values){
                if(currLine%4==0){
                    tableStr = tableStr + "<td><input name='username' id='username" + allLine + "' type='checkbox' value='" + key + "' checked='checked' />" + key + "：" + values + "</a></td><tr>";
                }else  if(currLine%4==1){
                    tableStr = tableStr + "<tr><td><input name='username' id='username" + allLine + "' type='checkbox' value='" + key + "' checked='checked' />" + key + "：" + values + "</a></td>";
                }else  if(currLine%4==2){
                    tableStr = tableStr + "<td><input name='username' id='username" + allLine + "' type='checkbox' value='" + key + "' checked='checked' />" + key + "：" + values + "</a></td>";
                }else if(currLine%4==3){
                    tableStr = tableStr + "<td><input name='username' id='username" + allLine + "' type='checkbox' value='" + key + "' checked='checked' />" + key + "：" + values + "</a></td>";
                }
                //currLine=currLine%4;
                jslength=jslength+1;
                currLine = currLine +1;
                allLine =allLine+1;
            });
            if(currLine%4==0){
                tableStr = tableStr + "</table>";
            }else if(currLine%4==1){
                tableStr = tableStr + "<td>&nbsp;</td><td>&nbsp;</td><td&nbsp;></td></tr></table>";
            }else if(currLine%4==2){
                tableStr = tableStr + "<td>&nbsp;</td><td>&nbsp;</td></tr></table>";
            }else if(currLine%4==3){
                tableStr = tableStr + "<td>&nbsp;</td></tr></table>";
            }

            document.getElementById('schoolClassesUser').innerHTML=tableStr;
            jumpto('schoolClassesUser');
        },
        error:function(){
            //alert("加载课表失败!");
        }
    });
}

// 新建课程
function newSchoolCourseInfo() {
    var url = location.origin + '/teacherInformationCenter/timetable/newSchoolCourseInfoForSelf';
    var index = layer.open({
        type: 2,
        title: '新建课程',
        maxmin: true,
        shadeClose: true,
        area: ['600px', '500px'],
        content: url,
        end: function () {
            // refreshBootstrapTable();
        }
    });
    // layer.full(index);

}