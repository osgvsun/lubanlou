layui.use(['form', 'element', 'layer', 'upload'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		layer = layui.layer,
		upload = layui.upload;

	//向世界问个好
	//layer.msg('');	

	//监听提交
	form.on('submit(editmaterialbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('materialuse'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	form.render(null, 'editmaterialbox');

	//信息
	form.val('editmaterialbox', {
		"material": 1,
		"num": "test2"
	});

});