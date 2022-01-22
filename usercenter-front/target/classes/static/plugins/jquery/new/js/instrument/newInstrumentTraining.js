/**
 * Created by Administrator on 2017/8/25.
 */
$(function () {
    var instUid =$("#instrumentTrainingUid").val();
    $.ajax({
        type: "POST",
        url: '../instrument/getTrainingAcademyNumber?instUid='+instUid,
        //dataType:"json",
        success: function (data) {
            var arr=data.split(',');
            $('#schoolAcademy').selectpicker('val', arr);
        }
    });
})
function saveInstrumentTraining() {
    if ($("#schoolDevice").val() == "") {
        alert("请输入学校编号");
        return false;
    }
    if ($("#teacher").val() == "") {
        alert("培训老师不能为空");
        return false;
    }
    if ( $("#trainingTime").val() == "") {
        alert("培训时间不能为空");
        return false;
    }
    if ($("#maxNumber").val() == "") {
        alert("最大培训人数不能为空");
        return false;
    }
    if ($("#schoolAcademy").val() == "" || $("#schoolAcademy").val() == null) {
        alert("适用学院不能为空");
        return false;
    }
    var acalist = $('#schoolAcademy').val();
    $.ajax({
        type: "POST",
        url: '../instrument/saveInstrumentTraining?acalist='+acalist,
        data: $("#searchForm").serialize(),//表单数据
        dataType:"text",
        success: function (data) {
            if(data=="success"){
                alert("保存成功")
            }
            var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
            parent.layer.close(index);//关闭弹窗
        }
    });
}