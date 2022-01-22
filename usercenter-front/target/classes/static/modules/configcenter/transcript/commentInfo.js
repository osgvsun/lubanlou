layui.config({
	base:'../'
}).extend({
	index:'lib/index'
}).use(['index','laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
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

	form.render(null, 'commentinfobox');

	//信息
	form.val('commentinfobox', {
		"": "" //备份
	});

	//监听提交
	form.on('submit(commentinfobtn)', function(data) {
		var field = data.field; //获取提交的字段
		var commentinfodetail = field.commentinfodetail;
		parent.$("#commentinfoDeatil_"+commentId).val(commentinfodetail);
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		// parent.layui.table.reload('commentinfobox'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});
});