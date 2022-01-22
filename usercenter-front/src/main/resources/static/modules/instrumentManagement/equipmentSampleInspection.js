layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer'], function() {
	var $ = layui.jquery,
		form = layui.form,
		table = layui.table,
		layer = layui.layer;

	//基本信息渲染
	let basicInformation = JSON.parse(localStorage['basicInformation']);
	$('.deviceName').text(basicInformation.deviceName + '(' + basicInformation.schoolDevice + ')');
	$('.li_cell:eq(0)').append(basicInformation.devicePattern);
	$('.li_cell:eq(1)').append(basicInformation.lcCenterName + '(' + basicInformation.departmentNumber + ')');
	$('.li_cell:eq(2)').append(basicInformation.labRoomName);
	$('.li_cell:eq(3)').append(basicInformation.manufacturer);
	$('.li_cell:eq(4)').append(basicInformation.devicePrice + '元');

	form.render(null, 'equipmentsampleinspectionbox');

	let data = getInstrumentConfig(uid);
	let configMachineUid = '';
	if (data.code === 0 && data.data !== null && data.data !== "") {
		let configUid = data.data.uid;
		window.sessionStorage.setItem('configUid', configUid);
	}

	let configUid = window.sessionStorage.getItem("configUid");
	let configSpecimenUid = '';
	$.ajax({
		url: httpDeviceUrl + 'getConfigSpecimenInfo',
		type: 'GET',
		async: false,
		data: {"configUid": configUid},
		success: function (res) {
			let data = res;
			let len = data.data.length;
			if (data.code === 0 && len !== 0) {
				configSpecimenUid = data.data.uid;
				window.sessionStorage.setItem("configSpecimenUid", configSpecimenUid);
				//信息
				form.val('equipmentsampleinspectionbox', {
					"maxReceive": data.data.maxReceive,
					"minAheadDay": data.data.minAheadDay,
					"maxAheadDay": data.data.maxAheadDay,
					"needAudit": data.data.needAudit,
					"sendSpecimenForm": data.data.sendSpecimenForm,
					"receiveReportForm": data.data.receiveReportForm,
					"isCancel": data.data.isCancel,
					"aheadCancel": data.data.aheadCancel,
					"timesCancel": data.data.timesCancel,
					"pricePerTime": data.data.pricePerTime,
					"deductCreditScore": data.data.deductCreditScore,
					"pricePerTime": data.data.pricePerTime
				});
				if(data.data.needAudit === "1") {
					$(".examine_box").show();
				} else {
					$(".examine_box").hide();
				}
				if(data.data.isCancel === "1") {
					$(".cancelbooking_box").show();
				} else {
					$(".cancelbooking_box").hide();
				}
			}
		}
	})

	//开放预约模版设置
	setOpenTemplateList();
	function setOpenTemplateList() {
		$.ajax({
			url: httpDeviceUrl + 'getSpecimenOpeningSettingsTemplateList',
			type: 'GET',
			success: function (res) {
				let data = res;
				$("select[name='template']").empty();
				$("select[name='template']").append(`<option value="">请选择模板</option>`);
				for (let i = 0; i < data.data.length; i++) {
					let option = `<option value="${data.data[i]}">${data.data[i]}</option>`;
					$("select[name='template']").append(option);
					form.render();
				}
			}
		});
	}
	//监听提交
	form.on('submit(equipmentsampleinspectionbtn)', function(data) {
		var field = data.field; //获取提交的字段
		let configMachineUid = window.sessionStorage.getItem('configMachineUid');
		field['uid'] = configMachineUid;
		$.ajax({
			url: httpDeviceUrl + 'saveOrUpdateConfigSpecimenBasicInfo?configUid=' + window.sessionStorage.getItem('configUid'),
			type: 'POST',
			data: field,
			success: function (res) {
				if (res.code === 0) {
					layer.msg("保存成功");
				} else {
					layer.msg(res.msg);
				}
			}
		})
	});



	//需要审核
	form.on('radio(examine)', function(data) {
		var abc = data.value;
		if(abc == "1") {
			$(".examine_box").show();
		} else {
			$(".examine_box").hide();
		}
	});

	//可以取消预约
	form.on('radio(cancelbooking)', function(data) {
		var abc = data.value;
		if(abc == "1") {
			$(".cancelbooking_box").show();
		} else {
			$(".cancelbooking_box").hide();
		}
	});

	//打开新增样品送检属性准入
	var newsampleattribute = {
		newsampleattribute: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增样品送检属性准入',
				area: ['500px', '405px'],
				shade: 0.5,
				maxmin: true,
				content: 'newSampleAttribute',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero, index) {
					layer.setTop(layero); //重点2
					// let iframe = window['layui-layer-iframe' + index];
					// iframe.child(window.sessionStorage.setItem('configMachineUid', configMachineUid))
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newsampleattributebtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newsampleattribute').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newsampleattribute[method] ? newsampleattribute[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#sampleattribute',
		url: httpDeviceUrl + 'getConfigSpecimenExtend', //数据接口
		where: {"configSpecimenUid": configSpecimenUid},
		title: '列表',
		cellMinWidth: 100,
		page: false, //开启分页
		limit: 0,
		cols: [
			[ //表头
				{
					fixed: 'left',
					title: '序号',
					type: 'numbers',
					width: 50
				}, {
					field: 'name',
					title: '属性名称',
					sort: true
				}, {
					field: 'style',
					title: '描述方式',
					sort: true,
					templet: function (d) {
						return d.style === "0" ? "单选框" : d.style === "1" ? "多选框" : d.style === "2" ? "输入框" : "";
					}
				}, {
					field: 'choice1',
					title: '选项1',
					sort: true,
					templet: function (d) {
						return d.choice1 + (d.multiChoiceMust1 !== null ? d.multiChoiceMust1 : '');
					}
				}, {
					field: 'choice2',
					title: '选项2',
					sort: true,
					templet: function (d) {
						return d.choice2 + (d.multiChoiceMust2 !== null ? d.multiChoiceMust2 : '');
					}
				}, {
					field: 'choice3',
					title: '选项3',
					sort: true,
					templet: function (d) {
						return d.choice3 + (d.multiChoiceMust3 !== null ? d.multiChoiceMust3 : '');
					}
				}, {
					field: 'choice4',
					title: '选项4',
					sort: true,
					templet: function (d) {
						return d.choice4 +  (d.multiChoiceMust4 !== null ? d.multiChoiceMust4 : '');
					}
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#sampleattributetoolbar',
					width: 80
				}
			]
		],
		id: 'sampleattribute',
		data: table,
		skin: 'line', //表格风格			
		even: false,
	});

	//监听行工具事件
	table.on('tool(sampleattribute)', function(obj) {
		var data = obj.data;
		//删除
		if(obj.event === 'del') {
			layer.confirm('是否删除？', {
				title: '提示'
			}, function(index) {
				$.ajax({
					url: httpDeviceUrl + 'delConfigSpecimenExtend',
					type: 'POST',
					data: {"uid": data.uid},
					success: function (res) {
						if (res.code === 0) {
							obj.del();
							layer.close(index);
							table.reload('sampleattribute');
						}
					}
				})
			});
		}
	});

	var $ = layui.$,
		sampleattributeactive = {
			reload: function() {
				var searchbox = $('#sampleattributesearchbox');

				//执行重载
				table.reload('sampleattribute', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						key: {
							labname: searchbox.val()
						}
					}
				}, 'data');
			}
		};

	$('.search_line .sampleattributesearch').on('click', function() {
		var type = $(this).data('type');
		sampleattributeactive[type] ? sampleattributeactive[type].call(this) : '';
	});

	//打开新增可接样时间设置
	var newreceivesample = {
		newreceivesample: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增可接样时间设置',
				area: ['700px', '465px'],
				shade: 0.5,
				maxmin: true,
				content: 'newReceiveSample',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newreceivesamplebtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newreceivesample').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newreceivesample[method] ? newreceivesample[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#receivesample',
		url: httpDeviceUrl + 'getSpecimenOpenTimes', //数据接口
		where: {"configSpecimenUid": configSpecimenUid},
		title: '列表',
		cellMinWidth: 100,
		page: false, //开启分页
		limit: 0,
		cols: [
			[ //表头
				{
					fixed: 'left',
					title: '序号',
					type: 'numbers',
					width: 50
				}, {
					field: 'startDate',
					title: '已设置可接样日期范围',
					minWidth: 180,
					sort: true,
					templet: function (d) {
						return d.startDate + '至' + d.endDate
					}
				}, {
					field: 'weekdays',
					title: '开放星期',
					minWidth: 110,
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#receivesampletoolbar',
					width: 80
				}
			]
		],
		id: 'receivesample',
		data: table,
		skin: 'line', //表格风格			
		even: false,
	});

	//监听行工具事件
	table.on('tool(receivesample)', function(obj) {
		var data = obj.data;
		//删除
		if(obj.event === 'del') {
			layer.confirm('是否删除？', {
				title: '提示'
			}, function(index) {
				$.ajax({
					url: httpDeviceUrl + 'delConfigOpenTime',
					type: 'POST',
					data: {"uid": data.uid},
					success: function (res) {
						obj.del();
						layer.close(index);
						table.reload('receivesample');
					}
				})
			});
		}
	});

	var $ = layui.$,
		receivesampleactive = {
			reload: function() {
				var searchbox = $('#receivesamplesearchbox');

				//执行重载
				table.reload('receivesample', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						key: {
							labname: searchbox.val()
						}
					}
				}, 'data');
			}
		};

	$('.search_line .receivesamplesearch').on('click', function() {
		var type = $(this).data('type');
		receivesampleactive[type] ? receivesampleactive[type].call(this) : '';
	});

	//打开新增不可预约时间设置
	var newnoreceivesample = {
		newnoreceivesample: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增不可预约时间设置',
				area: ['700px', '535px'],
				shade: 0.5,
				maxmin: true,
				content: 'newNoReceiveSample',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newnoreceivesamplebtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newnoreceivesample').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newnoreceivesample[method] ? newnoreceivesample[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#noreceivesample',
		url: httpDeviceUrl + 'getSpecimenNotOpenTimes', //数据接口
		where: {"configSpecimenUid": configSpecimenUid},
		title: '列表',
		cellMinWidth: 100,
		page: false, //开启分页

		cols: [
			[ //表头
				{
					fixed: 'left',
					title: '序号',
					type: 'numbers',
					width: 50
				}, {
					field: 'startDate',
					title: '已设置不可预约日期范围',
					minWidth: 180,
					sort: true,
					templet: function (d) {
						return d.startDate + '至' + d.endDate
					}
				}, {
					field: 'weekdays',
					title: '不可预约星期',
					minWidth: 110,
					sort: true
				}, {
					field: 'info',
					title: '备注',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#noreceivesampletoolbar',
					width: 80
				}
			]
		],
		id: 'noreceivesample',
		data: table,
		skin: 'line', //表格风格			
		even: false,
	});

	//监听行工具事件
	table.on('tool(noreceivesample)', function(obj) {
		var data = obj.data;
		//删除
		if(obj.event === 'del') {
			layer.confirm('是否删除？', {
				title: '提示'
			}, function(index) {
				$.ajax({
					url: httpDeviceUrl + 'delConfigOpenTime',
					type: 'POST',
					data: {"uid": data.uid},
					success: function (res) {
						obj.del();
						layer.close(index);
						table.reload('noreceivesample');
					}
				})
			});
		}
	});

	var $ = layui.$,
		noreceivesampleactive = {
			reload: function() {
				var searchbox = $('#noreceivesamplesearchbox');

				//执行重载
				table.reload('noreceivesample', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						key: {
							labname: searchbox.val()
						}
					}
				}, 'data');
			}
		};

	$('.search_line .noreceivesamplesearch').on('click', function() {
		var type = $(this).data('type');
		noreceivesampleactive[type] ? noreceivesampleactive[type].call(this) : '';
	});
	window.GetValue = function (name) {
		setTemplate(name)
	}
	function setTemplate(name) {
		// 基础对象封装
		let formsJson = $("#equipmentsampleinspectionbox").serializeArray();
		let formObj = {};
		for (let i = 0; i < formsJson.length; i++) {
			if (formsJson[i].value !== '') {
				formObj[formsJson[i].name] = formsJson[i].value;
			}
		}
		$.ajax({
			url: httpDeviceUrl + 'saveSpecimenSettingsTemplate',
			type: 'POST',
			data: {"templateName": name, "configSpecimenJson": JSON.stringify(formObj)},
			success: function (res) {
				if (res.code === 0) {
					setOpenTemplateList();
					layer.msg('模版保存成功');
				} else {
					layer.msg(res.msg);
				}
			}
		})
	}
	//打开另存为模板
	var saveassampletemplate = {
		saveassampletemplate: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '另存为模板',
				area: ['500px', '170px'],
				shade: 0.5,
				maxmin: true,
				content: 'saveAsTimeTemplate',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['添加', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#saveastimetemplatebtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.saveassampletemplate').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		saveassampletemplate[method] ? saveassampletemplate[method].call(this, othis) : '';
	});
	//监听模版选择并同步渲染
	form.on('select(template)', function (obj) {
		let templateName = obj.value;
		$.ajax({
			url: httpDeviceUrl + 'getSpecimenOpeningSettingsData',
			type: 'GET',
			data: {"templateName": templateName},
			success: function (res) {
				let data = res.data;
				for (let i = 0; i < data.length; i++) {
					if (data[i].tableName === 'ConfigSpecimen' && data[i].tableValue !== null) {
						form.val('equipmentsampleinspectionbox', JSON.parse(data[i].tableValue));
					}
				}
			}
		})
	})
});