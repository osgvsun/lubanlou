layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer', 'transfer', 'util'], function () {
    var $ = layui.jquery,
        admin = layui.admin,
        form = layui.form,
        element = layui.element,
        laydate = layui.laydate,
        laypage = layui.laypage,
        table = layui.table,
        layer = layui.layer,
        transfer = layui.transfer,
        util = layui.util

    form.render(null, 'setmanagerbox');
    //获取管理员类别
    $.ajax({
        url: labRoomHost + '/api/labroom/getAdminClass',
        type: 'GET',
        success: function (res){
            let data = res.data;
            let strObj = [];
            if (res.code == 0){
                for (let i in data){
                    strObj.push({"value": i , "name": data[i]});
                }
                console.log(strObj)
                for (let i = 0; i < strObj.length; i++){
                    let str = `<option value="${strObj[i].value}">${strObj[i].name}</option>`;
                    $('select[name=server]').append(str);
                    form.render();
                }
            }
        }
    })

    let transferWidth = 280;
    let transferHeight = 324;
    //获取实验室
    apiCommonSelectBySelect("labRoomList", null, function (res) {
        //复制到实验室穿搜框
        transfer.render({
            id: "labselected",
            elem: '#labselected',
            title: ['未选择', '已选择'], //自定义标题
            data: res.results, //数据
            parseData: function (res) {
                return {
                    "value": res.id, //数据值
                    "title": res.text //数据标题
                }
            },
            width: transferWidth,
            height: transferHeight, //定义高度
            showSearch: true, //显示搜索框
        })
    });

    // 获取可用人员
    apiCommonSelectBySelect("userList", null, function (res) {
        //复制到人员穿搜框
        transfer.render({
            id: "managerselected",
            elem: '#managerselected',
            title: ['未选择', '已选择'], //自定义标题
            data: res.results, //数据
            parseData: function (res) {
                return {
                    "value": res.id, //数据值
                    "title": res.text //数据标题
                }
            },
            width: transferWidth, //定义宽度
            height: transferHeight, //定义高度
            showSearch: true //显示搜索框
        })
    });

    //监听提交
    form.on('submit(setmanagerbtn)', function (data) {
        let field = data.field; //获取提交的字段

        let labTwo = [];
        let peopleTwo = [];

        let labArr = transfer.getData("labselected");
        let peopleArr = transfer.getData("managerselected");

        if (field.server === "") {
            layer.msg("请选择实验室类别", {icon: 5})
            return false;
        }
        if (labArr.length === 0) {
            layer.msg("至少选择一个实验室吧", {icon: 5})
            return false;
        }
        if (peopleArr.length === 0) {
            layer.msg("至少选择一个管理员吧", {icon: 5})
            return false;
        }

        Array.prototype.forEach.call(labArr, function (obj, index) {
            labTwo.push(obj.value);
        })
        Array.prototype.forEach.call(peopleArr, function (obj, index) {
            peopleTwo.push(obj.value);
        })

        $.ajax({
            url: labRoomHost + "/api/labroom/saveMultipleManager",
            type: "POST",
            data: {labTwo: labTwo.toString(), peopleTwo: peopleTwo.toString(), typeId: field.server},
            dataType: "JSON",
            success: function (res) {
                if (res[0].toString().split("异常提示：")[1] === "") {
                    layer.msg("操作成功", {icon: 6})
                } else {
                    layer.alert(`<p><b>注：除提示的人员外其他人员已经设置完成</b></p>${res[0]}`, {title: "Alert"});
                }
            }
        })
        //提交 Ajax 成功后，关闭当前弹层并重载表格
        // parent.layui.table.reload('setmanagerbox'); //重载表格
        // var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        // parent.layer.close(index); //再执行关闭
    });

    //信息
    form.val('setmanagerbox', {
        "": "", //备用
    });
});