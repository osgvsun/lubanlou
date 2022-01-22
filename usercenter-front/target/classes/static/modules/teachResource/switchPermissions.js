layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function () {
    var $ = layui.jquery,
        element = layui.element,
        form = layui.form

    form.render(null, 'switchpermissionsbox');

    <!--权限-->
    $.ajax({
        url: httpBaseUrl + '/exam/login/getAuthorityInSite',
        type: 'GET',
        data: {"cid": siteId, "username": username},
        async: false,
        success: function (data){
            let result = data;
            for (let i = 0; i < result.length; i++){
                let row = `<div class="layui-inline"><input type="radio" name="authId" value="${result[i].authorityName}" title="${result[i].cname}" ${result[i].nowAuthority == 1 ? 'checked': ''}></div>`
                $('#authSelect').append(row);
                form.render();
            }
        }
    })
    form.val('switchpermissionsbox', {
        "authId": $.cookie('currauth')
    })
    //监听提交
    form.on('submit(switchpermissionsbtn)', function (data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        //提交 Ajax 成功后，关闭当前弹层并重载表格
        var authId = $('input[name="authId"]:checked').val();
        if ((authId == "" || authId == undefined || authId == null)) {
            alert('请选择权限！');
        } {
            $.cookie('currauth', authId);
            var _body = window.parent;
            _body.location.reload(true);
            parent.layer.close(index); //再执行关闭
        }
    });
});