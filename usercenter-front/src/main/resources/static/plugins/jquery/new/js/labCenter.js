function newLabCenter() {
    $("#id").val("");
    $("#centerNumber").val("");
    $("#centerName").val("");
    $("#centerAddress").val("");
    $("#cname").val("");
    $("#username").val("");
    $("#academyName").val("");
    $("#academyNumber").val("");
    $("#campusName").val("");
    $("#campusNumber").val("");
    var top = $("#labCenterWindow").offset().top;
    $("#labCenterWindow").window({top:top+"px"});
    $("#labCenterWindow").window('open');
}
function editLabCenter(id) {
    $.ajax({
        type: 'POST',
        url: "../lab/editLabCenter?id="+id,
        dataType: 'json',
        success: function (data) {
            $("#id").val(data.id);
            $("#centerNumber").val(data.centerNumber);
            $("#centerName").val(data.centerName);
            $("#centerAddress").val(data.centerAddress);
            $("#cname").val(data.cname);
            $("#username").val(data.username);
            $("#academyName").val(data.academyName);
            $("#academyNumber").val(data.academyNumber);
            $("#campusName").val(data.campusName);
            $("#campusNumber").val(data.campusNumber);
            var top = $("#labCenterWindow").offset().top;
            $("#labCenterWindow").window({top:top+"px"});
            $("#labCenterWindow").window('open');
        },
        error:function () {
            alert("网络连接异常，请稍后再试")
        }
    });
}
$("#cname").coolautosuggest({
    url:encodeURI(encodeURI("../lab/getUser?username=")),
    onSelected:function(result){
        $("#username").val(result.username);
        $("#cname").val(result.data);
    }
});
$("#campusName").coolautosuggest({
    url:encodeURI(encodeURI("../lab/getCampus?campusName=")),
    onSelected:function(result){
        $("#campusNumber").val(result.campusNumber);
        $("#campusName").val(result.data);
    }
});
$("#academyName").coolautosuggest({
    url:encodeURI(encodeURI("../lab/getAcademy?academyName=")),
    onSelected:function(result){
        $("#academyNumber").val(result.academyNumber);
        $("#academyName").val(result.data);
    }
});
function saveLabCenter() {
    var form= new FormData(document.getElementById("labCenterEditor"));
    $.ajax({
        url:"../lab/saveLabCenter",
        type:"POST",
        //dataType:"json",
        data:form,
        processData:false,
        contentType:false,
        success: function (data) {
            if(data=="success"){
                alert("保存成功")
                location.reload(true);
            }else{
                alert("填写数据错误，请检查主任或学院或校区是否存在");
            }
        },
        error: function(data,error,obj) {
            alert("保存失败，请检查网络或稍后再试");
        }
    });
}