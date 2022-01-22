/*function viewInstrumentTrainingPeopleList(trainingUid){
 window.location.href="../instrument/viewInstrumentTrainingPeopleList?trainingUid="+trainingUid+"&currpage=1";
 }*/
//跳出全部人员弹窗
function addNewAuthorityUser(){
    var authorityId = $("#authorityId").val();
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '添加人员',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['1000px', '420px'],
            content: '../system/showUserWithoutAuthority?currpage=1&authorityId='+authorityId,
            end: function(){
                location.reload();
            }
        });
    });
}
//跳出学院全部人员弹窗
function addNewAcademyAuthorityUser(){
    var authorityId = $("#authorityId").val();
    var academyNumber = $("#academyNumber").val();
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '添加人员',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['1000px', '420px'],
            content: '../system/showAcademyUserWithoutAuthority?currpage=1&authorityId='+authorityId,
            end: function(){
                location.reload();
            }
        });
    });
}
//添加选中的人员
function addUser(){
    var authorityId = $("#authorityId").val();
    var array=new Array();
    var flag; //判断是否一个未选

    var checkbox = document.getElementsByName("CK_name");
    for(var k=0;k<checkbox.length;k++){
        if(checkbox[k].checked){
            flag = true; //只要有一个被选择 设置为 true
            // alert(checkbox[k].value)
        }
    }
    if (flag) {
        for(var j=0;j<checkbox.length;j++){
            if(checkbox[j].checked){
                array.push(checkbox[j].value); //将选中的值 添加到 array中
            }
        }
        //将要所有要添加的数据传给后台处理
        //window.location.href="${pageContext.request.contextPath}/tcoursesite/saveUserAuthority?authorityId="+${authority.id}+"&array="+array;
        $.ajax({
            url:"../system/saveUserToAuthority?authorityId="+authorityId+"&array="+array,
            //dataType:'json',
            type:'GET',
            success:function(){
                var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                parent.layer.close(index);//关闭弹窗
            }
        })
        //window.location.href="../instrument/saveUserToTraining?trainingUid="+trainingUid+"&array="+array;
        window.parent.location.reload();
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
    } else {
        alert("请至少选择一个学生");
    }
}

//添加学院选中的人员
function addAcademyUser(){
    var authorityId = $("#authorityId").val();
    var academyNumber = $("#academyNumber").val();
    var array=new Array();
    var flag; //判断是否一个未选
    var checkbox = document.getElementsByName("CK_name");
    for(var k=0;k<checkbox.length;k++){
        if(checkbox[k].checked){
            flag = true; //只要有一个被选择 设置为 true
            // alert(checkbox[k].value)
        }
    }
    if (flag) {
        for(var j=0;j<checkbox.length;j++){
            if(checkbox[j].checked){
                array.push(checkbox[j].value); //将选中的值 添加到 array中
            }
        }
        //将要所有要添加的数据传给后台处理
        //window.location.href="${pageContext.request.contextPath}/tcoursesite/saveUserAuthority?authorityId="+${authority.id}+"&array="+array;
        $.ajax({
            url:"../system/saveUserToAuthority?authorityId="+authorityId+"&array="+array,
            //dataType:'json',
            type:'GET',
            success:function(){
                var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                parent.layer.close(index);//关闭弹窗
            }
        })
        //window.location.href="../instrument/saveUserToTraining?trainingUid="+trainingUid+"&array="+array;
    } else {
        alert("请至少选择一个学生");
    }
}
$(function(){
    $('#termName').blur(function(){
        var name = $('#termName').val();
        $.trim(name);
        $('#yearCode').val(name.substr(0,4));
        if(name.indexOf('一') >= 0){
            $('#termCode').val(1);
        } else {
            if(name.indexOf('二') >= 0) {
                $('#termCode').val(2);
            } else {
                $('#termName').val("");
                $('#yearCode').val("");
                $('#termCode').val("");
                $.messager.alert('错误','输入有误!<br>请严格按照格式输入！');

            }
        }
    });
});

function checkTerm(){
    var inputValue = document.getElementById('termName');
    $.ajax({
        type:"POST",
        url:"../system/checkTerm",
        data:{termName:inputValue.value},
        success:function(data){
            if(data=="ok"){
                alert(inputValue.value +"已存在!");
                $("#termName").val("");
                $('#yearCode').val("");
                $('#termCode').val("");
                return false;
            }
        }
    });
}

//实验室设备管理—设备推送—选择实验中心—推送数据
function submitForm(){
        var deviceNumber = $("#deviceNumber").val();
        var options = $("#selectLabRoom option:selected");
        var labRoomId = options.data("id");
        if(labRoomId=='no'){
            alert("请选择实验室!");
        }else{
        $.ajax({
            type:"POST",
            url:"../commonDevice/pushInstrumentInfoToSchoolDevice?labRoomId="+labRoomId+"&deviceNumber="+deviceNumber,
            success:function(data){
                if(data=="success"){
                    alert("推送成功！");
                    parent.location.reload();
                    var index=parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                }
            }
        });
    }
}

function labAnnex(){
    var labCenterId = $("#labCenterId").val();
    $.ajax({
        async:false,
        type:"post",
        url:"../commonDevice/selectLabAnnex?labCenterId="+labCenterId,
        data:{id:1},  //一级产品类别的父ID
        success:function(data){
            $("#selectLabAnnex").empty();
            $("#selectLabAnnex").append("<option value= '' data-id='no'>请选择实验室</option>")
            for(var i=0;i<data.length;i++){
                $("#selectLabAnnex").append("<option value='"+data[i].labName+"' data-id='"+data[i].id+"'>"+data[i].labName+"</option>");
            }
        }
    })
}

//选中一级产品类别后，获取并刷新二级产品类别列表
function labRoom() {
    var options = $("#selectLabAnnex option:selected");
    var value = options.data("id");
    $.ajax({
        async: false,
        type: "post",
        url: "../commonDevice/selectLabRoomList?labAnnexId="+value,
        data: {id: value}, //二级产品类别的父ID
        success: function (data) {
            $("#selectLabRoom").empty();
            $("#selectLabRoom").append("<option value= '' data-id='no'>请选择实验分室</option>")
            for (var i = 0; i < data.length; i++) {
                $("#selectLabRoom").append("<option value='" + data[i].labRoomName + "' data-id='" + data[i].id + "'>" + data[i].labRoomName + "</option>");
            }
        }
    })
}


