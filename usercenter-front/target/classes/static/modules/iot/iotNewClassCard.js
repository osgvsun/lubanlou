layui.use(['index', 'form', 'laypage', 'laydate', 'layer', 'table', 'element'], function() {
	var $ = layui.$,
		admin = layui.admin,
		element = layui.element,
		layer = layui.layer,
		form = layui.form,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table;

	//向世界问个好
	//layer.msg('');

	//监听提交
	form.on('submit(newclasscardbtn)', function(data) {
		var hardwareIp = data.field.hardwareIp; //获取提交的字段
		var sn = data.field.sn; //获取提交的字段
		var roomName = data.field.room_name; //获取提交的字段
		var hardwareName = data.field.hardwareName; //获取提交的字段
		var manufacturer = data.field.manufacturer; //获取提交的字段
		var hardwareVersion = data.field.hardwareVersion; //获取提交的字段
		var deviceIndex = data.field.deviceIndex; //获取提交的字段
		var serverIp = data.field.serverIp; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

	//提交 Ajax 成功后，关闭当前弹层并重载表格
	$.ajax({
		url: iotHost + '/api/agent/addIotClassCard/',
		type: 'post',
		data: {
			hardwareIp,
			sn,
			roomName,
			hardwareName,
			manufacturer,
			hardwareVersion,
			deviceIndex,
			serverIp
		},
		success: function (res) {
			if (!res.code) {
				parent.layer.alert("添加成功!")
			}
		},
		error: function () {
			alert("添加接口请求失败！")
		},
	});
	parent.layer.close(index); //再执行关闭
	parent.layui.table.reload('iotclasscardtab'); //重载表格

});

form.render(null, 'newclasscard');
//获取实验室下拉框数据
$.ajax({
	url:iotHost + "/api/agent/listRoom",
	dataType:"JSON",
	success:function(res){
		//回调函数
		let str = `<option value="">请选择实验室</option>`
		if (res.data.length === 0) {
			str = `<option value="">暂无实验室数据</option>`
		} else {
			for (let i = 0; i < res.data.length; i++) {
				str += `<option value="${res.data[i]['room_name']}">${res.data[i]['room_name']}</option>`
			}
		}
		$(`select[name=room_name]`).html("");
		$(`select[name=room_name]`).append(str);
		form.render('select', "newclasscard");
	},
})

	//信息
	form.val('newclasscard', {
		"equipmentstate": "未连接",
		"equipmentport": "9999"
	});

});