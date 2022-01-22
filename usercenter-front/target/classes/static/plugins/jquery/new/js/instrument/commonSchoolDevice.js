//新建设备
$(".newSchoolDevice").click(function(){
    //多窗口模式，层叠置顶
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '新增设备'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../commonDevice/newSchoolDevice'
        ,success: function(layero){
            layer.setTop(layero); //重点2

        }
    });
    layer.full(win);
})
//编辑设备
$(".editSchoolDevice").click(function(){
    //多窗口模式，层叠置顶
    var uid = $(this).attr("data");
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '编辑设备'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../commonDevice/editSchoolDevice?deviceNumber='+uid
        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
})
//编辑设备
$(".deleteSchoolDevice").click(function(){
    var uid = $(this).attr("data");
    $.ajax({
        url:"../commonDevice/deleteSchoolDevice?deviceNumber="+uid,
        type:'POST',
        async:false,
        success:function (data) {
            if(data=="success"){
                alert("成功");
                window.location.reload();
            }
            if(data=="haveInstrument"){
                alert("已推送该设备，无法删除")
            }
        },error:function () {
            alert("出错");
        }
    })
})