function getInstrumentMachineAppStatus(){
    var uid=$("#uid").val();
    console.log(uid);
    $.ajax({
        url: "../instrument/getInstrumentMachineAppStatus?uid="+ uid,
        type: 'POST',
        async: false,
        success: function (data) {
            if(data===5) {
                alert("审核已过期");
                window.location.href="../instrument/instrumentAppAuditListAll?currpage=1&flag=-1"
            }
        }
    });
}
function back() {
    window.location.href="../instrument/instrumentAppAuditListAll?currpage=1&flag=-1"
}

function submitForm() {
    var currAuditLevel = $("#currAuditLevel").val();
    var auditCheckedresult;
    var remarks;
    var username = $('#currAuditLevelUser').val();
    if (document.getElementById("auditResult1").checked) {
        auditCheckedresult = "pass";
    } else {
        auditCheckedresult = "fail";
    }
    remarks = $('#remark_1').val();
    if (remarks == null || remarks == "") {
        alert("请填写审核意见");
        return false;
    }
    var myData = {
        "auditChecked": auditCheckedresult,
        "remarks": remarks,
        "username": username,
        "currAuditLevel": currAuditLevel,

    }
    var uid = $('#uid').val();
    $.ajax({
        url: "../instrument/saveProjectMachineAudit?uid=" + uid,
        type: 'POST',
        async: false,
        data: myData,
        success: function (data) {
            alert("提交成功");
            window.location.href="../instrument/instrumentAppAuditListAll?currpage=1&flag=-1";
        }
    });
}