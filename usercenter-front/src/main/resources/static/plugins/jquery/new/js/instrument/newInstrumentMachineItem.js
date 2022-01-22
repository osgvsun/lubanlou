/**
 * Created by Administrator on 2018/5/4.
 */
//保存收费项目
function saveInstrumentMachineItem(type) {
    var insUid = $("#insUid").val();
    var amount = $("#amount"+type).val();
    var content = $("#content"+type).val();
    if(amount%1 !== 0){
        alert('请输入整数');
    }
    var myData = {
        'insUid':insUid,
        'amount':amount,
        'content':content,
        'type':type
    }
    console.log(myData);
    $.ajax({
        url:'../jsutMachine/saveInstrumentMachineItem',
        type:'POST',
        data:myData,
        success:function (data) {
            if (data =="success"){
                alert("保存成功");
            }
            window.parent.location.reload();
            var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
            parent.layer.close(index);
        },
        error:function () {

        }
    })
}
