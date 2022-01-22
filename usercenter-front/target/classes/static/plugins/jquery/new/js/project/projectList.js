/**
 * Created by Administrator on 2018/7/17.
 */
function addIstrumentApp(pUid) {
    window.location.href="../project/addInstrumetApp?pUid="+pUid;
}
function  addSpecimenApp(pUid) {
    window.location.href="../project/newSpecimenAppForProject?pUid="+pUid;
}
$(".viewProjectInstrumentApp").click(function(){
    if(confirm("是否确认预约？")) {
        var pUid = $(this).attr("data");
        var pGroupId = $(this).attr("value");
        //多窗口模式，层叠置顶
        var win = layer.open({
            type: 2 //此处以iframe举例
            , title: '查看详情'
            , shade: 0
            , maxmin: true
            , offset: [ //为了演示，随机坐标
                0.4 * ($(window).height() - 300)
                , 0.4 * ($(window).width() - 390)
            ]
            , content: '../project/addInstrumetApp?pUid=' + pUid + '&pGroupId=' + pGroupId


            , success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
        layer.full(win);
    }
})

$(".viewProjectSpecimenApp").click(function(){
    var uid = $(this).attr("data");
    //多窗口模式，层叠置顶
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '查看详情'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../project/newSpecimenAppForProject?pUid='+uid


        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
})