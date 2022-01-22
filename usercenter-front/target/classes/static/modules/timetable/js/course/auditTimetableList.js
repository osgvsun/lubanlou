var contextPath = $("meta[name='contextPath']").attr("content");
var type = 0;
var businessType = "";
var businessAppUid = "";
var zuulUrl ="";
var audit = false;// 排课是否需要审核
$(document).ready(function () {
    zuulUrl =$("#zuulServerUrl").val()+"/timetable/";
    businessAppUid = $("#businessAppUid").val();
    type = $("#type").val();
    businessType = $("#businessType").val();
});

// 保存审核结果
function saveTimetableAudit() {
    //进行jwt握手，获取token
    //getJWTAuthority();
    var arr = new Object();
    arr.businessUid = '-1';
    arr.businessAppUid = businessAppUid;// 业务主键
    arr.businessType = businessType;// 业务类型
    arr.createdBy = username;
    arr.result = $('input:radio[name="auditResult"]:checked').val();// 审核结果
    arr.info = $("#remark").val();// 审核备注
    var arrs = JSON.stringify(arr);
    $.ajax({
        url: zuulUrl + "api/timetable/common/apiTimetableAudit",
        contentType: "application/json;charset=utf-8",
        // headers:{Authorization: getJWTAuthority()},
        async: false,
        dataType: "json",
        type: "post",
        data: arrs,
        complete:function(data){
            var index = parent.parent.layer.getFrameIndex(parent.name);
            if(index == undefined){
                window.history.go(-1);
            }else{
                parent.parent.layer.close(index);
            }
        }
    });
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