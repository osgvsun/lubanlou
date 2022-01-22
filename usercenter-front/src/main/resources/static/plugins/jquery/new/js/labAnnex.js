function newLabAnnex() {
    $("#id").val("");
    $("#labName").val("");
    $("#labShortName").val("");
    $("#labEnName").val("");
    $("#labSubject").val("");
    $("#belongDepartment").val("");
    $("#contact").val("");
    $("#labDescription").val("");
    $("#labAttention").val("");
    $("#awardInformation").val("");
    var top = $("#labCenterWindow").offset().top;
    $("#labCenterWindow").window({top:top+"px"});
    $("#labCenterWindow").window({width:"400px"});
    $("#labCenterWindow").window('open');
}
function editLabAnnex(id) {
    $.ajax({
        type: 'POST',
        url: "../lab/editLabAnnex?id="+id,
        success: function (data) {
            $("#id").val(data.id);
            $("#labName").val(data.labName);
            $("#labShortName").val(data.labShortName);
            $("#labEnName").val(data.labEnName);
            $("#labSubject").val(data.labSubject);
            $("#labType").val(data.labType);
            $("#belongDepartment").val(data.belongDepartment);
            $("#contact").val(data.contact);
            $("#belongCenter").val(data.belongCenter);
            $("#labDescription").val(data.labDescription);
            $("#labAttention").val(data.labAttention);
            $("#awardInformation").val(data.awardInformation);
            var top = $("#labCenterWindow").offset().top;
            $("#labCenterWindow").window({top:top+"px"});
            $("#labCenterWindow").window('open');
        },
        error:function () {
            alert("网络连接异常，请稍后再试")
        }
    });
}

function saveLabAnnex() {
    var form= new FormData(document.getElementById("labCenterEditor"));
    $.ajax({
        url:"../lab/saveLabAnnex",
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

            }
        },
        error: function(data,error,obj) {
            alert("保存成功")
            location.reload(true);
        }
    });
}