layui.use(['layer', 'element', 'form'], function() {
	var admin = layui.admin,
		layer = layui.layer,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form

	//向世界问个好
	//layer.msg('');

	form.render(null, 'editfieldbox');

	//监听提交
	form.on('submit(editfieldbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('editfieldbox'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	//信息
	form.val('editfieldbox', {
		"set": 1, //所属设置默认值
		"project": 1, //所属分项默认值
		"name": "test1",
		"sql": "test2",
		"type": 1
	});
});