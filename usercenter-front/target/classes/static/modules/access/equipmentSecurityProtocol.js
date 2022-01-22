layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate', 'layedit'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate,
		layedit = layui.layedit;

	let accessEntityId = $.cookie("accessEntityId");
	let username = $.cookie("username");
	let status = $.cookie("status");
	if (status) {
		status = status.split(",");
		if (status[0] === "true") {
			$('.exam').css("display", "inline-block");
		} else {
			$('.exam').css("display", "none");
		}
		if (status[2] === "true") {
			$('.training').css("display", "inline-block");
		} else {
			$('.training').css("display", "none");
		}
	}

	form.render(null, 'equipmentsecurityprotocolbox');

	//基本信息渲染
	// let basicInformation = JSON.parse(localStorage['basicInformation']);
	// $('.deviceName').text(basicInformation.deviceName + '(' + basicInformation.schoolDevice + ')');
	// $('.li_cell:eq(0)').append(basicInformation.devicePattern);
	// $('.li_cell:eq(1)').append(basicInformation.lcCenterName + '(' + basicInformation.departmentNumber + ')');
	// $('.li_cell:eq(2)').append(basicInformation.labRoomName);
	// $('.li_cell:eq(3)').append(basicInformation.manufacturer);
	// $('.li_cell:eq(4)').append(basicInformation.devicePrice + '元');
	console.log($.cookie("accessEntityId"))

	//信息
	form.val('equipmentsecurityprotocolbox', {
		"protocol": "test1"
	});

	//建立编辑器的图片接口
	layedit.set({
		uploadImage: {
			url: '' //接口url
				,
			type: '' //默认post
		}
	});
	//注意：layedit.set 一定要放在 build 前面，否则配置全局接口将无效。

	//建立设备安全协议编辑器
	var protocol =  layedit.build('protocol', {
						height: 125 //设置编辑器高度
							,
						tool: [
							'strong' //加粗
							, 'italic' //斜体
							, 'underline' //下划线
							, 'del' //删除线
							, '|' //分割线
							, 'left' //左对齐
							, 'center' //居中对齐
							, 'right' //右对齐
							, '|' //分割线
							, 'link' //超链接
							, 'unlink' //清除链接
							, 'image' //插入图片
						]
					});
//获取安全协议
	$.ajax({
		url: httpAccessUrl + '/getAccessAgreement',
		type: 'GET',
		async: false,
		data: {"entityId": entityId, "entityType": entityType, "page": 1, "limit": 999, "accessEntityId": accessEntityId, "accessItemId": ''},
		success: function (res) {
			console.log(res)
			let data = res.data;
			if (data.length !== 0) {
				// $('#protocol').val(data[0].content)
				layedit.setContent(protocol, data[0].content, false);
			}
		}
	})
	$('#equipmentsecurityprotocolbtn').on('click', function () {
		$.ajax({
			url: httpAccessUrl + '/saveAccessAgreement?entityId=' + entityId + '&entityType=' + entityType + '&username=' + username + '' + '&content=' + layedit.getContent(protocol),
			type: 'POST',
			success: function (res) {
				if (res.code === 0) {
					parent.layer.msg('新增安全协议书成功');
				} else {
					parent.layer.msg(res.msg);
				}
			}
		})
	})

});