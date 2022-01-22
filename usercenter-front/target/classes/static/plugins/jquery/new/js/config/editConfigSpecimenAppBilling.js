// function showBillings(itemUid){
// 	var trs = document.getElementsByName(itemUid);
// 	for(var i=0;i<trs.length;i++)
// 	{
// 	    $(trs[i]).removeClass("hide");
// 	}
// }

// $(".editConfigSpecimenItemAndBilling").each(function(i,e){
//     $(e).on("click",function(){
//         //$(".editConfigSpecimenItemAndBilling").css("display","");
//         var uid = $(e).attr('data');
//         var editTr = $(".editConfigSpecimenItemAndBilling").find("tr").clone();
//         var inputText = editTr.find("input[type=text]");
//         inputText.each(function(){
//             var nameinput = $(this).attr("name");
//             $(this).attr("id",nameinput);
//         })
//         var  specimenUid = $(this).parent().parent().parent().find("tr:eq(0)").attr("id");
//         editTr.find(".fa-save").attr("onclick","saveConfigSpecimenItemBilling('"+specimenUid+"')")
//         $(this).parent().parent().parent().append(editTr);
//         $.ajax({
//             url:'../config/editConfigSpecimenItemBilling?uid='+uid,
//             type:'POST',
//             error:function (request){
//                 alert('请求错误!');
//             },
//             success:function(data){
//                 $("#billingName").val(data.billingName);
//                 $("#billingInsideAcademy").val(data.billingInsideAcademy);
//                 $("#billingOutsideAcademy").val(data.billingOutsideAcademy);
//                 $("#billingOutsideSchool").val(data.billingOutsideSchool);
//                 $("#billingInfo").val(data.billingInfo);
//                 $("#uid").val($(e).attr('data'));
//                 $("#billingInfo").parent().parent().css("display","")
//             }
//         });
//     })
// })

//保存送样检测预约设置
function saveInstrumentSpecimenItem(itemUid){
    var itemName=$('#itemName').val();
    var info=$('#itemInfo').val();
    var insUid=$('#insUid').val();
    var myData={
        "itemName":itemName,
        "info":info,
        "configSpecimenUid":$('#configSpecimenUid').val(),
        "itemUid":itemUid
    }
    $.ajax({
        url:"../config/saveInstrumentSpecimenItem",
        type:'POST',
        async:false,
        data:myData,
        success:function(data){//AJAX查询成功
            var a_tag = '<td><a class="fa fa-plus ml10" onclick="newConfigSpecimenItemAndBilling(&quot;'+data+'&quot;)"></a><a class="fa fa-trash-o ml10" onclick="deleteItem1(&quot;'+data+'&quot;)"></a></td>';
            var td =
                "<td></td>"+
                "<td>"+ itemName+ "</td>" +
                "<td></td>"+
                "<td></td>"+
                "<td></td>"+
                "<td></td>";
            var str = '<tr id="'+data+'"></tr>';
            var $str = $(str);
            $str.append($(td));
            $str.append($(a_tag));
            var $tbody = $("<tbody></tbody>");
            $tbody.append($str)
            $("#otreetable").find(".editConfigSpecimenItemAndBilling").before($tbody);
            $("#itemName").val("");
            $("#itemInfo").val("");
        }
    });
}
//保存送样检测收费项
function saveConfigSpecimenItemBilling(specimenUid){
    var billingForm = $('#'+specimenUid).siblings(".editSpecimen");
    var billingName=billingForm.find('.billingName').val();
    var billingInsideAcademy=$('#billingInsideAcademy').val();
    var billingOutsideAcademy=billingForm.find('.billingOutsideAcademy').val();
    var billingOutsideSchool=billingForm.find('.billingOutsideSchool').val();
    var billingPayUnit=billingForm.find('.billingPayUnit').val();
    var billingInfo=billingForm.find('.billingInfo').val();
    var uid=billingForm.find('.uid').val();
    var myData={
        "uid":uid,
        "billingName":billingName,
        "billingInsideAcademy":billingInsideAcademy,
        "billingOutsideAcademy":billingOutsideAcademy,
        "billingOutsideSchool":billingOutsideSchool,
        "billingInfo":billingInfo,
        "specimenUid":specimenUid,
        "billingPayUnit":billingPayUnit,
    }
    $.ajax({
        url:"../config/saveConfigSpecimenItemBilling",
        type:'POST',
        async:false,
        data:myData,
        success:function(data) {//AJAX查询成功
            var addTr = $("<tr id='"+data+"'></tr>");
            var addtd = "<td></td><td></td>"+
                        "<td>"+billingName+"</td><td>"+billingOutsideAcademy+billingPayUnit+"</td><td>"+billingOutsideSchool+billingPayUnit+
                        "</td><td>"+billingInfo+"</td><td><i class='fa fa-trash-o' onclick='deleteConfigSpecimenItemBilling(&quot;"+data+"&quot;)'></i></td>"
            var $td = $(addtd);
            addTr.append($td);
            // $("#otreetable").find(".editConfigSpecimenItemAndBilling").before(addTr)
            $("#"+specimenUid).after(addTr);
            $("#"+specimenUid).siblings(".editSpecimen").remove();
        }
    });
}

//删除送样检测收费项
function deleteConfigSpecimenItemBilling(billingUid){
    var myData={
        "billingUid":billingUid
    }
    $.ajax({
        url:"../config/deleteConfigSpecimenItemBilling",
        type:'POST',
        async:false,
        data:myData,
        success:function(data){//AJAX查询成功
            $('#'+billingUid).remove()
            //window.location.reload();
        }
    });
}

//保存送样检测流程选择设置
function saveConfigSpecimenAppprocedure(insUid){
    var isAuditOne;
    if ($('#isAuditOne').is(':checked')){
        isAuditOne=1;
    } else {
        isAuditOne=0;
    }
    var isAuditTwo;
    if ($('#isAuditTwo').is(':checked')){
        isAuditTwo=1;
    } else {
        isAuditTwo=0;
    }
    var isAuditThree;
    if ($('#isAuditThree').is(':checked')){
        isAuditThree=1;
    } else {
        isAuditThree=0;
    }
    var isAuditFour;
    if ($('#isAuditFour').is(':checked')){
        isAuditFour=1;
    } else {
        isAuditFour=0;
    }
    var myData={
        "isAuditOne":isAuditOne,
        "isAuditTwo":isAuditTwo,
        "isAuditThree":isAuditThree,
        "isAuditFour":isAuditFour,
        "insUid":insUid
    }
    $.ajax({
        url:"../config/saveConfigSpecimenAppprocedure",
        type:'POST',
        async:false,
        data:myData,
        success:function(data){//AJAX查询成功
            // window.location.reload();
            if(data=="success"){
                alert("修改成功！");
            }else{
                alert("修改失败！");
            }
        }
    });
}
function deleteItem(itemUid){
    layer.confirm('确定删除吗？',{icon:3,title:"提示"},function(index){
        var myData={
            "itemUid":itemUid,
        }
        $.ajax({
            url:"../config/deleteInstrumentSpecimenItem",
            type:'POST',
            async:false,
            data:myData,
            success:function(uid){//AJAX查询成功
                $('#'+uid).parent().hide(1000);
            }
        })
        layer.close(index);
    });
}
function deleteItem1(itemUid){
    layer.confirm('确定删除吗？',{icon:3,title:"提示"},function(index){
        var myData={
            "itemUid":itemUid,
        }
        $.ajax({
            url:"../config/deleteInstrumentSpecimenItem",
            type:'POST',
            async:false,
            data:myData,
            success:function(uid){//AJAX查询成功
                $('#'+uid).parent().hide(1000);
            }
        })
        layer.close(index);
    });
}
function newConfigSpecimenItemAndBillingList(){
    $(".newConfigSpecimenItemAndBillingList").css("display","");
}
// $(".deleteNewConfigSpecimenItemAndBillingList").click(function () {
//     $(".newConfigSpecimenItemAndBillingList").css("display","none");
// })
// function editInstrumentSpecimenItem(itemId){
//     var itemName = $("#"+itemId).find(".itemName").text();
//     var info = $("#"+itemId).find(".info").text();
//     $("#itemName").val(itemName);
//     $("#info").val(info);
//     $(".newConfigSpecimenItemAndBillingList").find(".fa-save").attr("onclick","saveInstrumentSpecimenItem('"+itemId+"')");
//     $(".newConfigSpecimenItemAndBillingList").css("display","");
// }
$(function () {
    $(".newConfigSpecimenItemAndBilling").click(function () {
        var editTr = $(".editConfigSpecimenItemAndBilling").find("tr").clone();
        var inputText = editTr.find("input[type=text]");
        inputText.each(function(){
            var nameinput = $(this).attr("name");
            $(this).addClass(nameinput);
        })
        var  specimenUid = $(this).parent().parent().attr("id");
        editTr.find(".fa-save").attr("onclick","saveConfigSpecimenItemBilling('"+specimenUid+"')")
        editTr.find(".fa-trash-o").attr("onclick","cancelSpecimenItemBilling('"+specimenUid+"')")
        $(this).parent().parent().parent().append(editTr);
        $(this).parent().parent().siblings().css("display","");
    })

})
function newConfigSpecimenItemAndBilling(specimenId) {
    var editTr = $(".editConfigSpecimenItemAndBilling").find("tr").clone();
    var inputText = editTr.find("input[type=text]");
    inputText.each(function(){
        var nameinput = $(this).attr("name");
        $(this).addClass(nameinput);
    })
    var  specimenUid = $(this).parent().parent().attr("id");
    editTr.find(".fa-save").attr("onclick","saveConfigSpecimenItemBilling('"+specimenId+"')")
    editTr.find(".fa-trash-o").attr("onclick","cancelSpecimenItemBilling('"+specimenId+"')")
    $("#"+specimenId).parent().append(editTr);
    $("#"+specimenId).siblings().css("display","");
}
function cancelSpecimenItemBilling(specimenUid) {
    $("#"+specimenUid).siblings(".editSpecimen").remove();
}