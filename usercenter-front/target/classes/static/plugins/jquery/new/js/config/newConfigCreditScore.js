/**
 * Created by Administrator on 2017/12/14.
 */
function saveConfigCreditScore(type) {
    var deductionItem = "";
    var number = "";
    var insUid = $("#insUid").val();
    if(type == 'd'){
        deductionItem = $("#deductionItem").val();
    }else{
        number = $("#"+type+"Number").val();
    }
    var score = $("#"+type+"Score").val();
    var radioname = ""+type+"isAllege";
    var isAllege = $("input[name="+radioname+"]:checked").val();
    var myData = {
        'type':type,
        'number':number,
        'score':score,
        'isAllege':isAllege,
        'deductionItem':deductionItem
    };
    console.log(myData);
    $.ajax({
        type: "POST",
        url: "../config/saveConfigCreditScore?insUid="+insUid,
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