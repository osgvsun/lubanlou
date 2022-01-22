/**
 * Created by Administrator on 2017/8/1.
 */
function viewAppChargeDetail(appUid, type){
    window.location.href='../instrument/viewAppChargeDetailAfterConfirm?appUid='+appUid+'&type='+type;
}
function newAppCharge(appUid,type,uid){
    if(uid){
    }else{
        uid="-1";
    }
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '新建费用',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['1000px', '420px'],
            content: '../instrument/newAppCharge?appUid='+appUid+'&type='+type+'&uid='+uid,
            end: function(){
                location.reload();
            }
        });
    });
}

function saveAppCharge(appUid,type,uid) {
    $.ajax({
        type: "POST",
        url: '../instrument/saveAppCharge?appUid='+appUid+'&type='+type+'&uid='+uid,
        data: $("#myForm").serialize(),//表单数据
        //dataType:"json",
        success: function () {
            var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
            parent.layer.close(index);//关闭弹窗
        }
    });
}
function closeLayer(){
    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.layer.close(index);//关闭弹窗
}

//修改送样检测检测项折扣
function editAppDiscount(uid){
    var discount=$('#discount'+uid).val();
    var myData={
        "discount":discount,
        "uid":uid,
    }
    $.ajax({
        url:"../instrument/editAppDiscount",
        type:'POST',
        async:false,
        data:myData,
        success:function(data){//AJAX新增成功
            if(data=='noDefaultCharge'){
                alert("该时间段费率未设置！");

            }else{

            }
          //  window.location.reload();
        }
    });
}
function CompareDate(d1,d2)
{
    return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
}
function CompareHourAndMinutes(t1,t2){
    var t11=t1.split(":");
    var t21=t2.split(":");
    if(t11[0]>t21[0]){
        return true;
    }else{
        if(t11[0]==t21[0]){
            if(t11[1]>t21[1])
            {
                return true;
            }else{
                if(t11[1]==t21[1]){
                    if(t11[2]>=t21[1]){
                        return true;
                    }else{
                        return false;
                    }
                }
            }
        }
    }
}
//修改费用确认状态
function editInstrumentSpecimenAppPriceConfirm(appUid,type,priceConfirm){
    var timeFlag=true;//判断是否到预约结束时间
    if(priceConfirm=='0' && type=='1'){
        var finishTime=$('#finishTime').val().split("-")[1];
        var finishDate=$('#finishDate').val();
        var str=finishDate+" "+finishTime;
        timeFlag=Date.parse(str)<new Date().getTime();
    }
    if(timeFlag) {
        var flagRate = $('#flagRate').val();
        if (flagRate === '0') {
            // alert("该预约存在未设置收费时间段，请管理员前去设置！");
            alert("存在未设置费率！");
        } else {
            $.ajax({
                type: "POST",
                url: '../instrument/editInstrumentSpecimenAppPriceConfirm?appUid=' + appUid + '&type=' + type + '&priceConfirm=' + priceConfirm,
                data: $("#myForm").serialize(),//表单数据
                dataType: "json",
                success: function () {
                    alert("提交成功！");
                    window.location.reload();
                }
            });
        }
    }else{
        alert("预约时间未结束！");
    }
}
