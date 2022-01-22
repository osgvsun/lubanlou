layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate

	form.render(null, 'newauthorizationlistbox');
	var usernameSearch = xmSelect.render({
		el: '#username',
		name: 'username',
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
	form.on('submit(newauthorizationlistbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		console.log(field)
		$.ajax({
			url: httpAccessUrl + '/saveAccessAuth?entityId=' + '' + '&entityType=' + '' + '&username=' + field.username + '&datetime=' + field.timerange + '&rank=' + field.rank + '&flag=1',
			type: 'POST',
			// data: {"entityId": "", "entityType": "", "username": field.username, "datetime": field.timerange, "flag": 1, "rank": field.rank},
			success: function (res) {
				console.log(res)
				if (res.code === 0) {
					parent.layui.table.reload('authorizationlist'); //重载表格
					parent.layer.close(index); //再执行关闭
					parent.layer.msg('新增授权名单成功');
				} else {
					parent.layer.msg(res.msg);
				}
			}
		})
		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});

	});


	//起止时间
	laydate.render({
		elem: '#timerange',
		type: 'datetime'
	});
});