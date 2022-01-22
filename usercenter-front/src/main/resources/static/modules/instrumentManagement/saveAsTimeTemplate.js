layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate;

	form.render(null, 'saveastimetemplatebox');

	//监听提交
	form.on('submit(saveastimetemplatebtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.GetValue(field.name);
		parent.layui.table.reload('saveastimetemplatebox'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});
});