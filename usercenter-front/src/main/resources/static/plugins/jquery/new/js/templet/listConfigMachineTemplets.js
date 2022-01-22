
/**************************************************************************
 * Description 查看机时预约设置模版详情
 * @author 贺子龙
 * @date 2017-08-03
 **************************************************************************/
function viewConfigMachineTemplet(templetUid){
    if(templetUid){
    }else{
        templetUid = -1;
    }
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '模版详情',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['1200px', '600px'],
            content: '../templet/viewConfigMachineTemplet?templetUid='+templetUid,
            end: function(){
                //search()
            }
        });
    });
}