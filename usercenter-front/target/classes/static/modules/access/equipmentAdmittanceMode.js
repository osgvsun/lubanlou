layui.use(['form', 'element', 'layer'], function() {
	var $ = layui.jquery,
		form = layui.form,
		element = layui.element,
		layer = layui.layer;

	form.render(null, 'equipmentadmittancemodebox');


	// 获取准入方式
	let accessEntityId = 0;
	getAccessEntityConfig(entityId, entityType, 1);
	function getAccessEntityConfig(entityId, entityType, flag) {
		$.ajax({
			url: httpAccessUrl + '/getAccessEntityConfig',
			type: 'GET',
			async: false,
			data: {"entityId": entityId, "entityType": entityType},
			success: function (res) {
				console.log(res)
				let status = [];
				if (res.code === 0) {
					let data = res.data
					accessEntityId = data[0].accessEntityId;
					$.cookie("accessEntityId", accessEntityId)
					if (flag === 1) {
						$('.content').empty();
						for (let i = 0; i < data.length; i++) {
							status.push(data[i].isOpen)
							let content = `<div class="layui-col-lg4">
										<label class="layui-form-label">${data[i].accessCode === 'SAG' ? `需要签署${data[i].accessName}：` : `需要${data[i].accessName}准入：`}</label>
										<div class="layui-input-block">
											<input type="hidden" value="${data[i].accessName}">
											<input type="radio" name="${data[i].accessCode}" value="false" title="否" lay-filter="securityagreement" ${data[i].isOpen === false ? "checked": ''}>
											<input type="radio" name="${data[i].accessCode}" value="true" title="是" lay-filter="securityagreement" ${data[i].isOpen ? "checked": ''}>
										</div>
									</div>`;
							$('.content').append(content);
							form.render();
						}
					}
					$.cookie("status", status);
					if (status[0] === true) {
						$('.exam').css("display", "inline-block");
					} else {
						$('.exam').css("display", "none");
					}
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


	form.on('radio(securityagreement)', function(data){
		let val = data.value;
		let elem = data.elem;
		if ($(elem).attr('name') === 'EXAM') {
			if (val === 'true') {
				$('.exam').css("display", "inline-block");
			} else {
				$('.exam').css("display", "none");
			}
		}
		if ($(elem).attr('name') === 'TRAINING') {
			if (val === 'true') {
				$('.training').css("display", "inline-block");
			} else {
				$('.training').css("display", "none");
			}
		}
		let code = $(elem).attr("name");
		let name = $(elem).closest('.layui-input-block').find("input:first-child").val();
		$.ajax({
			url: httpAccessUrl + '/updateAccessEntityRelate?accessCode=' + code + '&isOpen=' + val + '&accessEntityId=' + accessEntityId,
			type: 'POST',
			success: function (res) {
				if (res.code === 0) {
					getAccessEntityConfig(entityId, entityType, 1);
					layer.msg('准入方式已更新')
				}
			}
		})
	});
});