layui.use(['element', 'form'], function() {
	var $ = layui.jquery,
		form = layui.form;

	form.render(null, 'editnoticemanagebox');
	//信息
	form.val('editnoticemanagebox', {
		"title": deitNoticeData.title,
		"content": deitNoticeData.content
	});

	//监听提交
	form.on('submit(editnoticemanagebtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		$.ajax({
			url: httpDeviceUrl + 'updateInstrumentNotice',
			type: 'POST',
			data: {"noticeUid": deitNoticeData.uid, "title": field.title, "content": field.content},
			success: function (res) {
				console.log(res)
				if (res.code === 0) {
					parent.layui.table.reload('noticemanage'); //重载表格
					parent.layer.close(index); //再执行关闭
					parent.layer.msg('编辑成功');
				} else {
					parent.layer.msg(res.msg);
				}
			}
		})
	});
});