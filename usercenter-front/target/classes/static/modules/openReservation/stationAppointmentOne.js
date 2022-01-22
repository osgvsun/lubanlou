layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate', 'formSelects'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate,
		formSelects = layui.formSelects

	//向世界问个好
	//layer.msg('');

	form.render(null, 'stationappointmentonebox');
	let userSchoolAcademy = ''; // 当前登录人所在院区
	// 获取用户信息
	$.ajax({
		url: 'getCurrentUser',
		type: 'GET',
		async: false,
		success: function (res) {
			let data = res;
			userSchoolAcademy = data.schoolAcademy;
			$("input[name=person]").val(data.cname);
			$("input[name=email]").val(data.email);
			$("input[name=telephone]").val(data.phone);
		}
	});
	// 获取预约时间块单位
	let configUid = '';
	let configMachineUid = '';
	let interval_time = 0;
	let maxInterval = ''; //最大预约时间段
	let minInterval = ''; //最小预约时间段
	let isAcrossDay = ''; //是否开启跨天预约
	let maxAheadHour = ''; //最大提前预约时间
	$.ajax({
		url: deviceHost + 'getAppBasicSettings',
		type: 'GET',
		async: false,
		data: {"insUid": uid, "configType": configType},
		success: function (res) {
			configUid = res.data.uid
			if (configUid !== null && configUid !== "") {
				$.ajax({
					url: deviceHost + 'getConfigMachineInfo',
					type: 'GET',
					async: false,
					data: {"configUid": configUid},
					success: function (res) {
						let result = res;
						configMachineUid = result.data.uid;
						maxInterval = result.data.maxInterval;
						minInterval = result.data.minInterval;
						isAcrossDay = result.data.isAcrossDay;
						maxAheadHour = result.data.maxAheadHour;
						if (result.code === 0 && result.data.length !== 0) {
							//基础设置
							interval_time = parseFloat(result.data.timeLineInterval);
						}
					}
				})
			}
		}
	});
	$.ajax({
		url: deviceHost + 'getAppOpeningCustomFieldList',
		type: 'GET',
		async: false,
		data: {"configUid": configUid},
		success: function (res) {
			console.log(res)
			let data = res.data;
			for (let i = 0; i < data.length; i++) {
				if (data[i].displayStyle === "TEXT") {
					let input_text = `<div class="layui-col-lg12 other_field">
                                            <label class="layui-form-label">${data[i].note}:</label>
                                            <div class="layui-input-block">
                                                <input type="text" class="layui-input va_save" name="${data[i].uid}"
                                                       autocomplete="off"  ${data[i].necessary == 1 ? "lay-verify='required'" : ""}/>
                                            </div>
                                        </div>`;
					$('.reason').before(input_text);
				}
				else {
					let input_radio = `<div class="layui-col-lg12 other_field">
                                            <label class="layui-form-label">${data[i].note}:</label>
                                            <div class="layui-input-block">
                                                ${setOptions(data[i].displayStyle, data[i].openSettingCustomFieldValueVOList, data[i].uid, this)}
                                            </div>
                                        </div>`;
					$('.reason').before(input_radio);
				}
				form.render();
			}
		}
	});

	// 查看预约设置
	let academyNumber = '';
	let openScope = ''; //预约接待对象
	//预约须知
	$.ajax({
		url: deviceHost + "getAppBasicSettings",
		type: 'GET',
		data: {
			"configType": configType,
			"insUid": uid
		},
		dataType: "JSON",
		success: function (res) {
			let data = res.data;
			$('.basicAttention').html(data.basicAttention)
		}
	})
	// 预约时间块显示
	setTimeReservation(interval_time, configMachineUid, maxInterval, minInterval, isAcrossDay, maxAheadHour, currentUsername, userSchoolAcademy, openScope, academyNumber);

	form.on('submit(stationappointmentonebtn)', function(data) {
		let field = data.field;
		let other_arr = []
		$.each($('.other_field'), function (index, obj) {
			let newObj = {};
			newObj[$(obj).find('label').text().replace(/:/g, '')] = $(obj).find('input').attr('class') === 'va_save_checkbox' ? getCheckedBox($(obj).find('input')) : $(obj).find('.va_save').val();
			other_arr.push(newObj)
		})

		let obj_all = {
			"appUser": currentUsername,
			"appUserMail": field.email,
			"appUserPhone": field.telephone,
			"appReason": field.reason,
			"configUid": configUid,
			"extendsFieldValue": other_arr,
			"appType": configType,
			"appPoint": []
		};
		let submitDate = [];
		let pass = 0;
		let openScopeTwo = 0;
		$.each($('.appoiontment_time_after'), function (index, obj) {
			let arr = $(obj).find('input').val().split(',');
			for (let i = 0; i < arr.length; i++) {
				let timeDate = arr[i].split('~');
				let d1 = new Date('2021-11-11 ' + timeDate[0]);
				let d2 = new Date('2021-11-11 ' + timeDate[1]);
				let model = parseInt(d2 - d1) / 1000 /60 /60;
				if (minInterval > model || model > maxInterval) {
					pass = 1;
				}
			}
			let obj_arr = {"appDate": $(obj).find('label').text(), "appTime": $(obj).find('input').val() + ','};
			submitDate.push(Object.assign(obj_arr, obj_all));
		})
		if (pass === 1) {
			layer.msg('最小预约时间块：' + minInterval + '(小时) 最大预约时间块：' + maxInterval + '(小时)');
			return false;
		}
		//判断，校内开放是，当前用户有没有预约权限
		if (openScope == 2 && pass === 0) {
			if (academyNumber) {
				let arr = academyNumber.split(',');
				if (userSchoolAcademy) {
					for (let i = 0; i < arr.length; i++) {
						if (arr[i] === userSchoolAcademy.academyNumber) {
							openScopeTwo = 1;
						}
					}
				}
			}
			if (openScopeTwo === 0) {
				layer.msg('当前用户为开放预约权限，请联系管理员处理');
				return false;
			} else {
				$.ajax({
					url: `${appointmentHost}/saveAppInfo`,
					type: 'POST',
					async: false,
					data: {"appInfoVOListJson": JSON.stringify(submitDate)},
					success: function (res) {
						if (res.code === 0) {
							layer.msg('预约成功')
						} else {
							layer.msg(res.msg);
						}
					}
				})
			}

		}
		if (pass === 0 && openScope !== 2) {
			$.ajax({
				url: `${appointmentHost}/saveAppInfo`,
				type: 'POST',
				async: false,
				data: {"appInfoVOListJson": JSON.stringify(submitDate)},
				success: function (res) {
					if (res.code === 0) {
						layer.msg('预约成功')
					} else {
						layer.msg(res.msg);
					}
				}
			})
		} else {
			layer.msg('当前用户暂无预约权限')
		}
	})
});