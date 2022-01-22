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
	var formatDateTime = function (date) {
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h=h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		minute = minute < 10 ? ('0' + minute) : minute;
		var second=date.getSeconds();
		second=second < 10 ? ('0' + second) : second;
		return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
	};

	form.render(null, 'newsubjectinfobox');
	let cname = JSON.parse(localStorage['userInformation']).cname;
	console.log(cname)
	//监听提交
	form.on('submit(newsubjectinfobtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		console.log(field)

		let arr = {};
		arr.id = '';
		arr.title = field.name;

		$.ajax({
			url: apiGateWayHost + '/examserver/questionPoolApi/saveQuestionPool',
			type: 'POST',
			async: false,
			contentType:"application/json;charset=utf-8",
			dataType:"json",
			data: JSON.stringify(arr),
			success: function (res){
				console.log(res)
				let uuid = res;
				let obj = {};
				obj['questionName'] = field.name;
				obj['type'] = field.sort;
				obj['itemUid'] = labRoomId;
				obj['itemType'] = 'LABROOM';
				obj['username'] = username;
				obj['createTime'] = new Date();
				obj['id'] = uuid;
				obj['cname'] = cname;
				$.ajax({
					url: timetableHost + '/api/labroom/saveConfigQuestion',
					// url: "http://localhost:8762/api/labroom/saveConfigQuestion",
					type: 'POST',
					// headers: {'x-datasource': 'limsproduct'},
					contentType: 'application/json',
					data: JSON.stringify(obj),
					success: function (res){
						console.log(res)
						parent.layer.msg(res.msg);
						parent.layui.table.reload('subjecttab'); //重载表格
						parent.layer.close(index); //再执行关闭
					}
				})
			}
		})

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});

	});

	//信息
	form.val('newsubjectinfobox', {
		"": "" //备注
	});

});