layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function () {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form,
        laydate = layui.laydate

    //向世界问个好
    //layer.msg('');

    form.render(null, 'sitechoosebox');

    //监听提交
    form.on('submit(sitechoosebtn)', function (data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引

        //提交 Ajax 成功后，关闭当前弹层并重载表格
        var siteId = $('#siteSelect input[name="siteId"]:checked').val();
        if ((siteId == "" || siteId == undefined || siteId == null)) {
            alert('请选择课程！若无课程选择，请先使用教学平台课程复制功能');
        } else {
            if (assignmentType == 'test'){
                $.ajax({
                    url:  httpBaseUrl + '/views/test/copyTestApi',
                    data: {'sourceTestId':assignmentId, 'targetSiteId':parseInt(siteId)},
                    type: 'POST',
                    async: false,
                    success: function (res) {
                        if (res){
                            alert("复制成功");
                        }else {
                            alert("复制失败");
                        }
                    }
                });
            }else if (assignmentType == 'exam'){
                $.ajax({
                    url:  httpBaseUrl + '/views/copyExamApi',
                    data: {'sourceExamId':assignmentId,'targetSiteId':parseInt(siteId)},
                    type: 'POST',
                    async: false,
                    success: function (res) {
                        if (res){
                            alert("复制成功");
                        }else {
                            alert("复制失败");
                        }
                    }
                });
            }

        }
        parent.layer.close(index); //再执行关闭
    });


});