layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table,
		layer = layui.layer;

	form.render(null, 'equipmentadmittancemodebox');
	//实验室名字显示
	if (cookie.get("labRoomName")) {
		$("legend>span").text(cookie.get("labRoomName"));
	}
	//实验室面积、容量、管理员
	if (cookie.get("labRoomArea")) {
		$(".li_cell_box>.li_cell:eq(0)").append('面积: - ' + cookie.get("labRoomArea") + '㎡')
	}
	if (cookie.get("labRoomCapacity")) {
		$(".li_cell_box>.li_cell:eq(1)").append('容量: - ' + cookie.get("labRoomCapacity") + '人')
	}
	if (cookie.get("admins")) {
		$(".li_cell_box>.li_cell:eq(2)").append('管理员: - ' + cookie.get("admins"))
	}
	//准入方式渲染
	let accessEntityId = 0;
	getAccessEntityConfig(labRoomId, configType);
	function getAccessEntityConfig(entityId, entityType) {
		$.ajax({
			url: accessHost + '/getAccessEntityConfig',
			type: 'GET',
			async: false,
			data: {"entityId": entityId, "entityType": entityType},
			success: function (res) {
				let status = [];
				if (res.code === 0) {
					let data = res.data
					accessEntityId = data[0].accessEntityId;
					cookie.set("accessEntityId", accessEntityId)
					$('.content').empty();
					for (let i = 0; i < data.length; i++) {
						status.push(data[i].isOpen)
						let content = `<div class="layui-col-lg4">
									<label class="layui-form-label">${data[i].accessCode === 'SAG' ? `需要签署${data[i].accessName}：` : `需要${data[i].accessName}准入：`}</label>
									<div class="layui-input-block">
										<input type="hidden" value="${data[i].accessName}">
										<input type="radio" name="${data[i].accessCode}" value="true" title="是" lay-filter="securityagreement" ${data[i].isOpen ? "checked": ''}>
										<input type="radio" name="${data[i].accessCode}" value="false" title="否" lay-filter="securityagreement" ${data[i].isOpen === false ? "checked": ''}>
									</div>
								</div>`;
						$('.content').append(content);
						form.render();
					}
					cookie.set("status", status);
					if (status[2] === true) {
						$('.training').css("display", "inline-block");
					} else {
						$('.training').css("display", "none");
					}
					form.render();
				}
			}
		});
	}
	//监听提交
	form.on('submit(equipmentadmittancemodebtn)', function(data) {
		var field = data.field; //获取提交的字段

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('equipmentadmittancemodebox'); //重载表格
		layer.msg('已保存');
	});

	//监听准入方式的修改
	form.on('radio(securityagreement)', function(data){
		let val = data.value;
		let elem = data.elem;
		if ($(elem).attr('name') === 'TRAINING') {
			if (val === 'true') {
				$('.training').css("display", "inline-block");
			} else {
				$('.training').css("display", "none");
			}
		}
		let code = $(elem).attr("name");
		// let name = $(elem).closest('.layui-input-block').find("input:first-child").val();
		$.ajax({
			url: accessHost + '/updateAccessEntityRelate?accessCode=' + code + '&isOpen=' + val + '&accessEntityId=' + accessEntityId,
			type: 'POST',
			success: function (res) {
				if (res.code === 0) {
					getAccessEntityConfig(labRoomId, configType);
					layer.msg('准入方式已更新')
				}
			}
		})
	});

});

//传递子页面锚
$(function() {
	$(".field_btn_box a").click(function() {
		var name = $(this).attr("name");
		top.location.hash = name; //设置锚点
	});
	$(".breadcrumb_top .breadcrumb_btn").click(function() {
		var name = $(this).attr("name");
		top.location.hash = name; //设置锚点
	});
	$(".layui-tab-title li a").click(function() {
		var name = $(this).attr("name");
		top.location.hash = name; //设置锚点
	});
});