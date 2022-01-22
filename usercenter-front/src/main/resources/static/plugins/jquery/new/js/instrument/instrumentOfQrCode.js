/**
 * Created by Administrator on 2017/8/25.
 */
function newInstrumentOfQrCode(insUid){
    $.ajax({
        url:"../config/newInstrumentOfQrCode?insUid="+insUid,
        type:"GET",
        success:function(data){//AJAX查询成功
            // if(data=="success"){

            //     //window.location.reload();
            // }else{
            //     alert("生成二维码过程出错，请检查网络情况");
            // }
            if(data=='QRExist'){
                alert("已生成二维码,无需再生成！");
            }else{
                alert("生成二维码完成");
                $('#qrCodeImg').remove();
                var img="<img id='qrCodeImg' alt=\"\" src='"+data+"'style=\"width:40%\" />";
                $("#QRCode").append($(img));
                window.location.reload();
            }
        }
    });
}
