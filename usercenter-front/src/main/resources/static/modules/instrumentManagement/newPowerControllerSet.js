layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var $ = layui.jquery,
		element = layui.element,
		form = layui.form;

	form.render(null, 'newpowercontrollersetbox');

	$.ajax({
		url: httpDeviceUrl + 'getCommonServerList',
		type: 'GET',
		success: function (res) {
			if (res.code === 0) {
				console.log(res)
				let data = res.data;
				for (let i = 0; i < data.length; i++) {
					let option = `<option value="${data[i].id}">${data[i].serverName}</option>`;
					$("select[name='serverId']").append(option);
					form.render();
				}
			}
		}
	})
	//监听提交
	form.on('submit(newpowercontrollersetbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		let obj = {};
		obj = field;
		Object.assign(obj, {"insUid": uid, "serialNo": field.agentNo});
		$.ajax({
			url: httpDeviceUrl + 'saveOrUpdateSmartAgent',
			type: 'POST',
			data: {"insUid": uid, "agentNo": field.agentNo, "remark": field.remark, "currIp": field.currIp, "port": field.port, "serverId": field.serverId},
			success: function (res) {
				console.log(res)
				if (res.code === 0) {
					parent.layui.table.reload('powercontrollerset'); //重载表格
					parent.layer.close(index); //再执行关闭
				} else {
					layer.msg(res.msg);
				}
			}
		})
	});
});