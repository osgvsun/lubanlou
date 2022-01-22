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

	form.render(null, 'newtraningbox');

	//监听提交
	form.on('submit(newtraningbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		console.log(field)
		// $.ajax({
		// 	url: httpAccessUrl + '/saveAccessAuth?entityId=' + '' + '&entityType=' + '' + '&username=' + field.username + '&datetime=' + field.timerange + '&rank=' + field.rank + '&flag=1',
		// 	type: 'POST',
		// 	// data: {"entityId": "", "entityType": "", "username": field.username, "datetime": field.timerange, "flag": 1, "rank": field.rank},
		// 	success: function (res) {
		// 		console.log(res)

		// 	}
		// })
		$.ajax({
			url: httpAccessUrl + '/saveAccessAgreement?entityId=' + '' + '&entityType=' + '' + '&username=' + field.username + '' + '&content=' + field.content,
			type: 'POST',
			success: function (res) {
				console.log(res)
				if (res.code === 0) {
					parent.layui.table.reload('securitylist'); //重载表格
					parent.layer.close(index); //再执行关闭
					parent.layer.msg('新增安全协议书成功');
				} else {
					parent.layer.msg(res.msg);
				}
			}
		})
		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
	});



});