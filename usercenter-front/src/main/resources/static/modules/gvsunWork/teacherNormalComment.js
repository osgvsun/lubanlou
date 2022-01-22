layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate

	form.render(null, 'teachernormalcommentbox');

	//监听提交
	form.on('submit(teachernormalcommentbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		$.ajax({
			url: httpBaseUrl + 'api/commonWorkBatchComment',
			type: 'POST',
			data: {"assignmentId": parentData.assignmentId, "comments": field.comment, "siteId": siteId, "usernames": username},
			success: function (res){
				parent.layer.msg('已同步到成绩');
				parent.layui.table.reload('correctlist'); //重载表格
				parent.layer.close(index); //再执行关闭
			}
		})
	});
});