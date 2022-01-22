layui.use(['layer', 'element', 'form'], function() {
	var admin = layui.admin,
		layer = layui.layer,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form

	//向世界问个好
	//layer.msg('');

	form.render(null, 'creditscoretypebox');

	//监听提交
	form.on('submit(creditscoretypebtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('creditscoretypebox'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	//信息
	form.val('creditscoretypebox', {
		"score": "5.0"
	});
});