/**
 * Created by Administrator on 2018/7/17.
 */
$(".viewProjectInstrumentAppStat").click(function(){
    var pUid = $(this).attr("data");
    var uid=$(this).attr("value");
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
        ,content: '../project/viewProjectAppStat?pAppUid='+pUid


        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
})