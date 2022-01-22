layui.use(['index', 'form', 'laypage', 'laydate', 'layer', 'table', 'element'], function() {
    var $ = layui.$,
        admin = layui.admin,
        element = layui.element,
        layer = layui.layer,
        form = layui.form,
        laydate = layui.laydate,
        laypage = layui.laypage,
        table = layui.table;

    //向世界问个好
    //layer.msg('');


    //监听提交
    form.on('submit(bindaccessbtn)', function(data) {
        var entityId = data.field.room_name;
        var entityType = data.field.entityType;
        var agentIndexId = data.field.agentIndex;
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        //提交 Ajax 成功后，关闭当前弹层并重载表格
        $.ajax({
            url:iotHost+'/bindAgent',
            type:'post',
            data:{
                entityId,
                entityType,
                agentIndexId
            },
            success: function (res) {
                if (!res.code) {
                    parent.layer.alert("绑定成功!")
                }
            },
            error: function () {
                alert("绑定接口请求失败！")
            },
        });
        parent.layui.table.reload('iotaccesscontroltab'); //重载表格
        parent.layer.close(index); //再执行关闭

    });

    form.render(null, 'bindaccess');

    //获取实验室下拉框数据
    $.ajax({
        url:iotHost + "/api/agent/listRoom",
        dataType:"JSON",
        success:function(res){
            //回调函数
            let str = `<option value="">请选择实验室</option>`
            if (res.data.length === 0) {
                str = `<option value="">暂无实验室数据</option>`
            } else {
                for (let i = 0; i < res.data.length; i++) {
                    str += `<option value="${res.data[i]['room_name']}">${res.data[i]['room_name']}</option>`
                }
            }
            $(`select[name=room_name]`).html("");
            $(`select[name=room_name]`).append(str);
            // form.render('select', "newaccess");
            form.render('select');
        },
    })
    //获取硬件分路
        var  page = 1;
        var size = 10;
        var agentSn = document.getElementById("sn").value;
        let data = [];
        $.ajax({
            url: iotHost + "/getAgent",
            type: 'POST',
            data: JSON.stringify({page: page,size: size, agentSn:agentSn}),
            contentType:"application/json",
            success: function (res) {
                //把数据外层的code, msg去掉
                result = res.data;
                //转换数据
                result.forEach(function (item) {
                    data.push({name: item.index, value: item.agentIndexId});
                });
                //回调函数
                let option = `<option value="">请选择硬件分路</option>`
                if (data){
                    for (let i in data){
                        option += `<option value ="${data[i].value}">${data[i].name}</option>`
                    }
                }
                $(`select[name=agentIndex]`).html("");
                $(`select[name=agentIndex]`).append(option);
                form.render('select');
            },
        })




});