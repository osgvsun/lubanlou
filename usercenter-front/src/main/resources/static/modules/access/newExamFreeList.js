layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate;

	form.render(null, 'newexamfreelistbox');
	//日期时间选择器
	laydate.render({
		elem: '#datetime'
		,type: 'datetime'
	});
	laydate.render({
		elem: '#endDateTime'
		,type: 'datetime'
	});
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

	if (flag === 4) {
		$("select[name=rank]").closest('.layui-col-lg4').show();
	}
	if (flag === 5) {
		$("textarea[name=reason]").closest('.layui-col-lg4').show();
		$(".prompt_black").show();
	}
	//监听提交
	form.on('submit(newexamfreelistbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		let objData = {};
		objData.username = field.username;
		objData.datetime = field.datetime;
		objData.endDateTime = field.endDateTime;
		objData.flag = flag;
		if (flag === 4) {
			objData.rank = field.rank;

		}
		if (flag === 5) {
			objData.reason = field.reason;
		}
		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		console.log(field)
		$.ajax({
			url: httpAccessUrl + '/saveAccessAuth?entityId=' + entityId + '&entityType=' + entityType + '&' + $.param(objData),
			type: 'POST',
			success: function (res) {
				console.log(res)
				if (res.code === 0) {
					parent.layui.table.reload(parentTable); //重载表格
					parent.layer.close(index); //再执行关闭
					parent.layer.msg('新增名单成功');
				}
			}
		})
	});
});