layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate

	form.render(null, 'newequipmenttrainingmanagebox');

	window.renderChildForm = function () {
		form.render();
	}
	//培训时间
	laydate.render({
		elem: '#trainingDateTime',
		type: 'datetime'
	});

	var usernameSearch = xmSelect.render({
		el: '#username',
		name: 'teacher',
		autoRow: true,
		radio: true,
		tips: '请选择人员',
		toolbar: { show: true },
		theme: {color: '#0081ff'},
		filterable: true,
		remoteSearch: true,
		remoteMethod: function (val, cb, show) {
			if (!val) {
				return cb([])
			}
			$.ajax({
				url: oauth2Host + '/resource/search',
				contentType: 'application/json',
				data: {"cname": val},
				success: function (res) {
					let result = res.data.map(v => {
						return {"value": v.username, "name": v.cname}
					});
					// 此处没有查重过滤
					cb(result);
				},
				error: function (err) {
					cb([])
				}
			})
		}
	});
	//监听提交
	form.on('submit(newequipmenttrainingmanagebtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		//提交 Ajax 成功后，关闭当前弹层并重载表格
		$.ajax({
			url: httpAccessUrl + '/saveAccessTraining?entityId=' + entityId + '&entityType=' + entityType + '&' + $('#newequipmenttrainingmanagebox').serialize(),
			type: 'POST',
			success: function (res) {
				console.log()
				parent.layui.table.reload('equipmenttrainingmanage');
				parent.layer.close(index);
			}
		})
	});
});