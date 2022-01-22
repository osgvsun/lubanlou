/**
 * Created by Administrator on 2017/12/15.
 */
function saveCommonConfigCreditScore(ctype) {
    var deductionItem = "";
    var number = "";
    var centerId = -1;
    var type = $("#type").val();
    if(ctype == 'd'){
        deductionItem = $("#deductionItem").val();
    }else{
        number = $("#"+ctype+"Number").val();
    }
    var score = $("#"+ctype+"Score").val();
    //var radioname = ""+ctype+"isAllege";
    //var isAllege = $("input[name="+radioname+"]:checked").val();
    if(type == 2){
        centerId =  $("#"+ctype+"centerId").val();
    }
    var myData = {
        'ctype':ctype,
        'number':number,
        'score':score,
        'centerId':centerId,
        'deductionItem':deductionItem
    };
    console.log(myData);
    $.ajax({
        type: "POST",
        url: "../common/saveCommonConfigCreditScore?type="+type,
        data: myData,
        success: function (data) {
            if(data=="success"){
                alert("添加成功！");
                var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                parent.layer.close(index);//关闭弹窗
            }else{
                alert("添加失败！");
            }
        }
    });
}