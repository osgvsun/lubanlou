//信誉积分
function doAppChargeCredit(appUid, type){
    var win = layer.open({
        type: 2
        ,title: '信誉积分'
        ,shade: 0.3
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../instrument/doAppChargeCredit?appUid='+appUid +'&amp;type='+type,
        end: function(){
        }
    });
    layer.full(win);
}
function doAppChargeConfirm(appUid, type,confirmType){
	layer.ready(function(){
	    layer.open({
	        type: 2,
	        title: '费用确认',
	        fix: true,
	        maxmin:true,		        
	        shift:-1,
	        closeBtn: 1,
	        shadeClose: true,
	        move:false,
	        maxmin: false,
	        area: ['1000px', '420px'],
	        content: '../instrument/doAppChargeConfirm?appUid='+appUid+'&type='+type+'&confirmType='+confirmType,
	        end: function(){
               // window.location.reload();
	        }
	    });
	});
}
//保存费用确认
function saveAppChargeConfirm(appUid,confirmType,type){
    $.ajax({
        dataType:'text',
        type:'GET',
        url: "../instrument/saveAppChargeConfirm?appUid="+appUid+"&confirmType="+confirmType+"&type="+type,
        success: function () {
            parent.location.reload();
            var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
            parent.layer.close(index);//关闭弹窗

        },
        error:function () {
            var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
            parent.layer.close(index);//关闭弹窗

        }
    });

}

function viewAppChargeDetailAfterConfirm(appUid, type){
    window.location.href='../instrument/viewAppChargeDetailAfterConfirm?appUid='+appUid+'&type='+type;
}

function viewAppChargeDetailBeforeConfirm(appUid, type){
    window.location.href='../instrument/viewAppChargeDetailBeforeConfirm?appUid='+appUid+'&type='+type;
}

$(".newAppCharge").click(function(){
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
        ,content: '../instrument/newAppCharge?uid='+uid


        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
})
$(".alterAppCharge").click(function(){
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
        ,content: '../instrument/alterAppCharge?uid='+uid


        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
})

$(".viewAppCharge").click(function(){
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
        ,content: '../instrument/viewAppCharge?uid='+uid


        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
})
$(".resConfirmAppCharge").click(function(){
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
        ,content: '../instrument/resConfirmAppCharge?uid='+uid


        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
})
$(".confirmPayment").click(function(){
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
        ,content: '../instrument/confirmPayment?uid='+uid


        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
})
$(".viewPayment").click(function(){
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
        ,content: '../instrument/viewPayment?uid='+uid


        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
})