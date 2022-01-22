/**
 * Created by Administrator on 2017/8/7.
 */
function newEvaluation(evaluationId){
    if(evaluationId){//编辑
    }else {//新建
        evaluationId = "-1";
    }
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '新建评价',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['1000px', '420px'],
            content: '../common/newEvaluation?evaluationId='+evaluationId,
            end: function(){
                location.reload();
            }
        });
    });
}
//保存
function saveEvaluation() {
    $.ajax({
        type: "POST",
        url: "../common/saveEvaluation",
        data: $("#myForm").serialize(),//表单数据
        dataType:"json",
        success: function (data) {
            if(data=="success"){
                alert("添加成功！");
                closeLayer();
            }else{
                alert("添加失败！");
            }
        }
    });
}
//取消关闭弹窗
function closeLayer(){
    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.layer.close(index);//关闭弹窗
}
$(".editEvaluation").each(function(i,e){
    $(e).on("click",function(){
        $("#editForm").css("display","");
        var uid = $(e).attr('data');
        $.ajax({
            url:'../common/editEvaluation?uid='+uid,
            type:'POST',
            error:function (request){
                alert('请求错误!');
            },
            success:function(data){

                $("#name").val(data.name);
                $("#enable").val(data.enable);
                $("#weight").val(data.weight);
                $("#academyNumber").find("option[value='"+data.academyNumber+"']").attr("selected",true);
                var operatorText = $("#academyNumber").find("option[value='"+data.academyNumber+"']").text();
                $("#academyNumber_chzn").find("a.chzn-single").find("span").text(operatorText);
                $("#uid").val($(e).attr('data'));
            }
        });
    })
})

$(".editEvaluation1").each(function(i,e){
    $(e).on("click",function(){
        $("#editForm1").css("display","");
        var uid = $(e).attr('data');
        $.ajax({
            url:'../common/editEvaluation?uid='+uid,
            type:'POST',
            error:function (request){
                alert('请求错误!');
            },
            success:function(data){

                $("#name").val(data.name);
                $("#enable").val(data.enable);
                $("#weight").val(data.weight);
                $("#academyNumber").find("option[value='"+data.academyNumber+"']").attr("selected",true);
                var operatorText = $("#academyNumber").find("option[value='"+data.academyNumber+"']").text();
                $("#academyNumber_chzn").find("a.chzn-single").find("span").text(operatorText);
                $("#uid").val($(e).attr('data'));
            }
        });
    })
})

//配置项管理页面
//保存配置项状态
function saveBusinessConfigStatus(id,index)
{
    var status = 'no';
    if (document.getElementById(id+'config_yes').checked) {
        status = 'yes';
        //显示配置扩展项
        showConfigurationItems(id,index );
    }
    else if (document.getElementById(id+'config_no').checked) {
        status = 'no';
        //隐藏配置扩展项
        hideConfigurationItems(id);
    }
    var myData={
        "id": id,
        "status": status,
    }
    $.ajax({
        url: "../common/saveBusinessConfigStatus",
        type: 'POST',
        async: false,
        data: myData,
        success: function (data) {
            if(data=='success')
            {
                alert("保存设置成功");
            }
        }
    });
}
//显示配置扩展项
function showConfigurationItems(id,index){
    var configurationIndex = index;
    var myData={
        "id": id,
    }
    $.ajax({
        url: "../common/showConfigurationItems",
        type: 'POST',
        async: false,
        data: myData,
        dataType: "json",
        success: function (list) {
            var num = list.length;
            for(i in list) {
                var extensionData = list[i];
                var configurationExtensionId = extensionData.id;
                var extensionId = "extension"+extensionData.id;
                var extensionIndex = configurationIndex+"-"+num;
                num--;
                var extensionItemInfo = extensionData.info;
                var extensionStatus = extensionData.businessConfigExtendStatus;
                var extensionOpenStatus = "关闭";
                var radio = "<td><input type='radio' id='extend_yes-"+configurationExtensionId+"' name='extend-"+configurationExtensionId+"' value='1' " +
                    "onclick='saveExtensionStatus(\""+configurationExtensionId+"\")' "+
                    "checked='yes'/>"+
                    "<label for='extend_yes-"+configurationExtensionId+"'>是</label>"+
                    "<input type='radio' id='extend_no-"+configurationExtensionId+"' name='extend-"+configurationExtensionId+"' value='0'" +
                    "onclick='saveExtensionStatus(\""+configurationExtensionId+"\")' " +
                    "checked='no'/>" +
                    "<label for='extend_no-"+configurationExtensionId+"'>否</label>" +
                    "<a class='fa fa-trash-o ml10' onclick='deleteBusinessConfigExtensionRecord(\""+configurationExtensionId+"\")' style='display: none'></a></td>";
                if(extensionStatus=="yes"){
                    extensionOpenStatus = "开启";
                }
                else if(extensionStatus=="no"){
                    extensionOpenStatus = "关闭";
                }
                var td3 =
                    "<td>" + extensionIndex + "</td>" +
                    "<td>" + extensionItemInfo + "</td>" +
                    "<td>" + extensionOpenStatus + "</td>";
                var td = $(td3).add($(radio));
                var trNull = "<tr id="+extensionId+"></tr>";
                var tr = $(trNull).append($(td));
                $("#" + id).after(tr);
                var closeId = "extend_no-"+configurationExtensionId;
                var openId = "extend_yes-"+configurationExtensionId;
                if(extensionStatus=="yes") {
                    // document.getElementById("#"+openId).checked=true;
                    $("#"+openId).prop("checked", true);
                    // $("#" + closeId).removeAttr('checked');
                }
                else{
                    // document.getElementById("#"+closeId).checked=true;
                    $("#"+closeId).prop("checked", true);
                    // $("#" + openId).removeAttr('checked');
                }
            }
        }
    })
}
//隐藏配置扩展项
function hideConfigurationItems(id) {
    var myData = {
        "id": id,
    }
    $.ajax({
        url: "../common/showConfigurationItems",
        type: 'POST',
        async: false,
        data: myData,
        dataType: "json",
        success: function (list) {
            var num = list.length;
            for (i in list) {
                var extensionData = list[i];
                var extensionId = "extension"+extensionData.id;
                $("#" + extensionId).remove();
            }
        }
    })
}
//页面加载配置扩展项
function  checkedYes() {
    $("body").find("*[id*='checkedStatus']").each(function(i,element){
        var statusId = $(element).attr("id");
        var status = $(element).attr("value");
        if(status=="yes"){
            var id = $(element).parent("tr").find("#checkedIdyes").val();
            var index = $(element).parent("tr").find("#checkedIndexyes").val();
            showConfigurationItems(id,index);
        }
    });
}
//保存配置扩展项状态
function saveExtensionStatus(id){
    var status = 'no';
    if (document.getElementById('extend_yes-'+id).checked) {
        status = 'yes';
    }
    else if (document.getElementById('extend_no-'+id).checked) {
        status = 'no';
    }
    var myData={
        "id": id,
        "status": status,
    }
    $.ajax({
        url: "../common/saveBusinessConfigExtendStatus",
        type: 'POST',
        async: false,
        data: myData,
        success: function (data) {
            if(data=='success')
            {
                alert("保存设置成功");
            }
        }
    });
}
//删除配置项记录
function deleteBusinessConfigurationRecord(id) {
    var myData = {
        "id":id,
    }
    $.ajax({
        url: "../common/deleteBusinessConfigurationRecord",
        type: 'POST',
        async: false,
        data: myData,
        success:function (data) {
            alert("删除配置成功！");
            $('#'+id).remove();
            window.location.reload();
        }
    });
}
//删除配置拓展项记录
function deleteBusinessConfigExtensionRecord(id){
    var myData = {
        "id":id,
    }
    $.ajax({
        url:"../common/deleteBusinessConfigExtensionRecord",
        type:'POST',
        async:false,
        data:myData,
        success:function (data) {
            alert("删除配置成功！");
            var extensionId = "extension"+id;
            $('#'+extensionId).remove();
            window.location.reload();
        }
    })
}


