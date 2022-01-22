layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
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

	form.render(null, 'newauthorizationlistbox');

	//监听提交
	form.on('submit(newauthorizationlistbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('newauthorizationlistbox'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	//信息
	form.val('newauthorizationlistbox', {
		"": "" //备用
	});

	//起止时间
	laydate.render({
		elem: '#timerange',
		type: 'datetime',
		range: true
	});
});