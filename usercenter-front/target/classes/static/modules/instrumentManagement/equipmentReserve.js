layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer', 'formSelects', 'util'], function() {
	var $ = layui.jquery,
		form = layui.form,
		layer = layui.layer,
		formSelects = layui.formSelects;

	//基本信息渲染
	let basicInformation = JSON.parse(localStorage['basicInformation']);
	$('.deviceName').text(basicInformation.deviceName + '(' + basicInformation.schoolDevice + ')');
	$('.li_cell:eq(0)').append(basicInformation.devicePattern);
	$('.li_cell:eq(1)').append(basicInformation.lcCenterName + '(' + basicInformation.departmentNumber + ')');
	$('.li_cell:eq(2)').append(basicInformation.labRoomName);
	$('.li_cell:eq(3)').append(basicInformation.manufacturer);
	$('.li_cell:eq(4)').append(basicInformation.devicePrice + '元');

	form.render(null, 'equipmentreservebox');
	let college = [];
	let data = getInstrumentConfig(uid);
	if (data.code === 0 && data.data !== null && data.data !== "") {
		college = data.data.academyNumber.split(",");
		form.val('equipmentreservebox', {
			'resvIsHour': data.data.resvIsHour,
			'resvIsSpecimen': data.data.resvIsSpecimen,
			'resvCreditScore': data.data.resvCreditScore,
			'openScope': data.data.openScope
		})
		if(data.data.openScope == "2") {
			$(".collagechoose").show();
		} else {
			$(".collagechoose").hide();
		}
	} else if (data.code !== 0){
		layer.msg(data.msg);
	}
	// $.ajax({
	// 	url: httpDeviceUrl + 'getInstrumentConfig',
	// 	type: 'GET',
	// 	async: false,
	// 	data: {'uid': uid},
	// 	success: function (res) {
	// 		let data = res;
	//
	// 	}
	// });

	$.ajax({
		url: httpDeviceUrl + 'getSchoolAcademyList',
		type: 'GET',
		async: false,
		success: function (res) {
			let data = res;
			if (data.code === 0 && data.data.length !== 0) {
				console.log(1)
				for (let i = 0; i < data.data.length; i++) {
					let option = `<option value="${data.data[i].academyNumber}">${data.data[i].academyName}</option>`;
					$("#college").append(option);
					formSelects.render();
				}
			} else {
				layer.msg(data.msg);
			}
		}
	})

	//监听提交
	form.on('submit(equipmentreservebtn)', function(data) {
		var field = data.field; //获取提交的字段

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		// parent.layui.table.reload('equipmentreservebox'); //重载表格

		$.ajax({
			url: httpDeviceUrl + 'saveAppBasicSettings',
			type: 'POST',
			data: {"uid": uid, "openScope": field.openScope, "username": username, "academyNumbers": field.college, "isHour": field.resvIsHour, "isSpecimen": field.resvIsSpecimen, "creditScore": field.resvCreditScore},
			success: function (res) {
				if (res.code === 0) {
					layer.msg('保存成功');
				}
			}
		})
		// layer.msg('已保存');
	});

	//信息
	form.val('equipmentreservebox', {
		"minimumcreditscore": "0.0"
	});

	form.on('radio(receptiontarget)', function(data) {
		var abc = data.value;
		if(abc == "2") {
			$(".collagechoose").show();
		} else {
			$(".collagechoose").hide();
		}
	});

	//多选	
	//formSelects.value('', [2, 3, 4], true); //多个举例
	formSelects.value('college', college, true); //辅导教师
	// formSelects.value('college', [2, 4]);
});