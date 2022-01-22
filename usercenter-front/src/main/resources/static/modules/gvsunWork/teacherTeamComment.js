layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var $ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate

	form.render(null, 'teacherteamcommentbox');

	form.val('teacherteamcommentbox', {
		'comment': parentData.comment
	})
	console.log(parentData)
	//监听提交
	form.on('submit(teacherteamcommentbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		console.log(field)
		$.ajax({
			url: httpBaseUrl + 'api/groupWorkGroupComment',
			type: 'POST',
			data: {"groupId": parentData.groupId, "comments": field.comment, "siteId": siteId, "assignmentId": assignmentId},
			success: function (res){
				parent.layer.msg('已同步到成绩');
				parent.layui.table.reload('correctlist'); //重载表格
				parent.layer.close(index); //再执行关闭
			}
		})
	});

	//信息
	form.val('teacherteamcommentbox', {
		"": "" //备用
	});

});