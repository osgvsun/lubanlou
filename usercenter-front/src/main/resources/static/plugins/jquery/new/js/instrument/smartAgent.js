//编辑设备
$(".openEnterRecord").click(function(){
    //多窗口模式，层叠置顶
    var uid = $(this).attr("data");
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '门禁记录'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../smartAgent/commonHdwlogList?currpage=1&agentId='+uid
        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
})