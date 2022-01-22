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

	form.render(null, 'setopenreservationlabbox');

	//周末时间范围
	laydate.render({
		elem: '#weekend',
		type: 'time',
		range: true
	});

	//工作日时间范围
	laydate.render({
		elem: '#workingday',
		type: 'time',
		range: true
	});

	//监听提交
	form.on('submit(setopenreservationlabbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('setopenreservationlabbox'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	//信息
	form.val('setopenreservationlabbox', {
		"": "" //备注
	});

});