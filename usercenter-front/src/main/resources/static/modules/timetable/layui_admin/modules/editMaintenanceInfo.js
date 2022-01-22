layui.use(['index', 'form', 'layer', 'element'], function() {
	var $ = layui.$,
		admin = layui.admin,
		element = layui.element,
		layer = layui.layer,
		form = layui.form;

	//向世界问个好
	//layer.msg('编辑设备保养内容');

	form.render(null, 'editmaintenanceinfobox');

	//监听提交
	form.on('submit(editmaintenanceinfo)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		//parent.layui.table.reload('projectinfo'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	//编辑设备保养内容信息
	form.val('editmaintenanceinfobox', {
		"info": "test1" //保养内容
	});
});