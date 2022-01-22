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

	form.render(null, 'newequipmentmanagerbox');

	//信息
	form.val('newequipmentmanagerbox', {
		"": "" //备用
	});

	$.ajax({
		url: httpDeviceUrl + 'getTeacherList',
		type: 'GET',
		async: false,
		success: function (res) {
			console.log(res)
			if (res.code === 0) {
				let data = res.data;
				for (let i = 0; i < data.length; i++) {
					let option = `<option value="${data[i].username}">${data[i].cname}</option>`;
					$("select[name=username]").append(option);
					form.render();
				}
			}
		}
	})
	//监听提交
	form.on('submit(newequipmentmanagerbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		console.log(field)
		$.ajax({
			url: httpDeviceUrl + 'addInstrumentAdmin?insUid=' + uid + '&username=' + field.username,
			type: 'POST',
			success: function (res) {
				if (res.code === 0) {
					layer.msg('新增成功')
					parent.layui.table.reload('equipmentmanager'); //重载表格
					parent.layer.close(index); //再执行关闭
				} else {
					layer.msg(res.msg);
				}
			}
		})
		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		// parent.layui.table.reload('newequipmentmanagerbox'); //重载表格
		// parent.layer.close(index); //再执行关闭
	});
});