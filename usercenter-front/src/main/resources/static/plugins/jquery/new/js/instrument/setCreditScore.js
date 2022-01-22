/**
 * Created by Administrator on 2017/8/24.
 */
function saveConfigCreditScoreBatch() {
    $.ajax({
        type: "POST",
        url: '../instrument/saveConfigCreditScoreBatch',
        data: $("#configCreditScore").serialize(),//表单数据
        //dataType:"json",
        success: function (data) {
            if(data=="success"){
                alert("批量保存成功")
            }
            var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
            parent.layer.close(index);//关闭弹窗
        }
    });
}
