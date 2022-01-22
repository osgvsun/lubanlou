/**
 * Created by Administrator on 2018/7/17.
 */
function choseInstrumentGroup(pUid,groupUid) {
    $.ajax({
        url:'../project/choseInstrumentGroup',
        type:'POST',
        data:{'pUid':pUid,'groupUid':groupUid},
        //dataType:'json',
        success:function (data) {
            alert("预约成功，请去预约设备");
            window.location.href="../project/newProjectApp?currpage=1&pAppUid="+data;
        },
        error:function () {

        }
    })
}