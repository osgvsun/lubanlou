layui.config({
    version: '1545041465480' //为了更新 js 缓存，可忽略
});

layui.use(['laypage', 'layer', 'table', 'element'], function() {
    var admin = layui.admin,
        laypage = layui.laypage //分页
        ,
        layer = layui.layer //弹层
        ,
        table = layui.table //表格
        ,
        $ = layui.jquery,
        element = layui.element //元素操作
    if($.cookie('current') != 'SUPERADMIN') {
        $("a[name=setAttendance]").remove();
    }
    // 获取权限
    $.ajax({
        url: 'getCurrentUser',
        type: 'GET',
        headers: {
            "x-datasource": getCookie('datasource.cookie'),
        },
        success: function (res) {
            let data = res;
            let authorities = data.authorityMap.GvsunLims;
            $.cookie("username", data.username);
            $.cookie("cname", data.cname);
            $('.username').text(data.cname);
            console.log(authorities)
            $.cookie("authorities", JSON.stringify(authorities))
            if (authorities.length > 0 && !$.cookie('current')) {
                for (let i = 0; i < authorities.length; i++) {
                    if (authorities[i].name === 'SUPERADMIN') {
                        $.cookie('current', authorities[i].name);
                        $.cookie('authorities_name', authorities[i].cname)
                    } else {
                        $.cookie('current', authorities[0].name);
                        $.cookie('authorities_name', authorities[0].cname);
                    }
                }
            } else if (authorities.length === 0){
                layer.msg('当前用户暂无权限');
            }
            $('.authorities').text($.cookie('authorities_name'));
        }
    })
    // 		let authorities = c.authorityMap.GvSunFinancial;
    // console.log(authorities)
    // 		$.cookie("username", c.username);
    // 		$.cookie("cname", c.cname);
    // 		$.cookie("authorities", JSON.stringify(authorities))
    // 		if (authorities.length > 0 && !$.cookie('current')) {
    // 			$.cookie('current', authorities[0].name);
    // 		} else if (authorities.length === 0){
    // 			layer.msg('当前用户暂无权限');
    // 		}

    if (!$.cookie('current')) {
        layer.open({
            type: 2 //此处以iframe举例
            ,
            title: '切换用户权限',
            area: ['500px', '240px'],
            shade: 0.5,
            maxmin: true,
            content: 'switchPermissions',
            zIndex: layer.zIndex //重点1
            ,
            success: function(layero) {
                layer.setTop(layero); //重点2
            },
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                //点击确认触发 iframe 内容中的按钮提交
                var submit = layero.find('iframe').contents().find("#switchpermissionsbtn");
                submit.click();
            }
        });
    }
    //打开切换用户权限
    var switchpermissions = {
        switchpermissions: function() {
            //layer.msg('切换用户权限');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '切换用户权限',
                area: ['500px', '240px'],
                shade: 0.5,
                maxmin: true,
                content: 'switchPermissions',
                zIndex: layer.zIndex //重点1
                ,
                success: function(layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['确定', '取消'],
                yes: function(index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#switchpermissionsbtn");
                    submit.click();
                }
            });
            //layer.full(index);
        }
    };
    $('.switchpermissions').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        switchpermissions[method] ? switchpermissions[method].call(this, othis) : '';
    });

    $("#courseAttendance").click();
    let hash = window.location.hash;
    console.log(hash)
    if (hash){
        let hash1 = window.location.hash;
        console.log(hash1)
        let url = hash1.substring(1, hash1.length);
        console.log(url)
        $("#iframe").attr("src", url);
    }


});