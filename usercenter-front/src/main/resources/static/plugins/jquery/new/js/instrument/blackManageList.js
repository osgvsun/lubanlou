/**
 * Created by Administrator on 2017/8/24.
 */
//批量保存人员
function saveToBlackListBatch(arrayS,remark){
    if(remark==3){
        var needAudit = $("#needAudit").val();
    }else{
        var needAudit = "";
    }
    var array=new Array();
    if ($("#queryUserNumber").val()!=null && $("#queryUserNumber").val()!='') {
        array.push($("#queryUserNumber").val()); //将选中的值 添加到 array中
        //将要所有要添加的数据传给后台处理
        window.location.href="../instrument/saveToBlackListBatch?arrayS="+arrayS+"&array="+array+"&remark="+remark+"&needAudit="+needAudit

    }else{
        alert("请至少选择一条记录");
    }
}
