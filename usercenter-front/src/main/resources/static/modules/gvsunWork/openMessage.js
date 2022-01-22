layui.use(['layer', 'element', 'form'], function() {
    var layer = layui.layer,
        $ = layui.jquery,
        form = layui.form

    form.render(null, 'messagebox');
    $.ajax({
        url: httpBaseUrl + 'api/getUserListInfo',
        type: 'GET',
        async: false,
        data: {"usernames": receiver},
        success: function (res) {
            let data = res;
            let len = data.length
            if (len <= 1) {
                form.val('messagebox', {
                    "telephone": data[0].phone,
                    "emailAddress": data[0].email,
                    "cname": data[0].cname
                })
            } else {
                $("input[name=telephone],input[name=emailAddress]").closest('.layui-form-item').remove();
                for (let i = 0; i < data.length; i++) {
                    let  phoneEmail = `<div className="layui-form-item">
                                            <div className="layui-inline">
                                                <label className="layui-form-label">手机号码：<font style="color: red;">*</font></label>
                                                <div className="layui-input-inline">
                                                    <input type="text" name="telephone" lay-verify="required|phone" autoComplete="off"
                                                           className="layui-input">
                                                </div>
                                            </div>
                                            <div className="layui-inline">
                                                <label className="layui-form-label">邮箱地址：<font style="color: red;">*</font></label>
                                                <div className="layui-input-inline">
                                                    <input type="text" name="emailAddress" lay-verify="required|email" autoComplete="off"
                                                           className="layui-input">
                                                </div>
                                            </div>
                                       </div>`;
                    $("input[name=cname]").closest('.layui-form-item').before(phoneEmail);
                }
            }

        }
    });
    //监听提交
    form.on('submit(messagebtn)', function(data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        let topic = [];
        $("input[name=topic]:checked").each(function (index, obj) {
            topic.push($(obj).val())
        })
        let receivers = receiver.toString().split(",");
        let telephones = [];
        let emails = [];
        if (receivers.length > 1) {
            $("input[name=telephone]").each(function (index, obj) {
                telephones.push($(obj).val());
            });
            $("input[name=emailAddress]").each(function (index, obj) {
                emails.push($(obj).val());
            })
        } else {
            telephones.push(field.telephone);
            emails.push(field.email);
        }
        $.ajax({
            url: httpBaseUrl + 'api/sendMessage',
            type: 'GET',
            data: {"siteId": siteId, "assignmentId": assignmentId, "telephone": telephones.toString(), "email": emails.toString(), "content": field.content, "topic": topic.toString(), "sender": sender, "receiver": receiver},
            success: function (res) {
                parent.layer.msg("发送成功");
                parent.layer.close(index); //再执行关闭
            }
        })
    })
});