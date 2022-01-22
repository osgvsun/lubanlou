layui.use(['form', 'element', 'table', 'layer'], function() {
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

	form.render(null, 'equipmenttimebookingbox');

	let data = getInstrumentConfig(uid);
	getBusinessAudit();
	$.ajax({
		url: httpDeviceUrl + 'getMachineBillingHourOptions',
		type: 'GET',
		async: false,
		success: function (res) {
			let data = res;
			let len = data.data.length;
			if (data.code === 0 && len !== 0) {
				for (let i = 0; i < len; i++) {
					let option = `<div class="layui-col-lg12">
									<input type="radio" name="billingHourInDictionary" value="${data.data[i].code}" title="${data.data[i].cname}" lay-filter="billingduration">
								  </div>`;
					$('.billingHourInDictionary').append(option);
				}
				form.render();
			}
		}
	})

	let configMachineUid = '';
	if (data.code === 0 && data.data !== null && data.data !== "") {
		let configUid = data.data.uid;
		window.sessionStorage.setItem('configUid', configUid);
		$.ajax({
			url: httpDeviceUrl + 'getConfigMachineInfo',
			type: 'GET',
			async: false,
			data: {"configUid": configUid},
			success: function (res) {
				let result = res;
				if (result.code === 0 && result.data.length !== 0) {
					configMachineUid = result.data.uid;
					window.sessionStorage.setItem('configMachineUid', configMachineUid);
					form.val('equipmenttimebookingbox', {
						"minAheadHour": result.data.minAheadHour,
						"maxAheadHour": result.data.maxAheadHour,
						"minAheadByTutor": result.data.minAheadByTutor,
						"isPreheat": result.data.isPreheat,
						"preheatTime": result.data.preheatTime,
						"timeLineInterval": result.data.timeLineInterval,
						"isCancel": result.data.isCancel,
						"aheadCancel": result.data.aheadCancel,
						"timesCancel": result.data.timesCancel,
						"countPerTime": result.data.countPerTime,
						"deductCreditScore": result.data.deductCreditScore,
						"isDelay": result.data.isDelay,
						"minDelayAhead": result.data.minDelayAhead,
						"maxDelay": result.data.maxDelay,
						"isApo": result.data.isApo,
						"needAudit": result.data.needAudit,
						"billingHourInDictionary": result.data.billingHourInDictionary,
						"firstexamine": result.data.auditStatus.split(',')[0],
						"secondexamine": result.data.auditStatus.split(',')[1],
					});
					if(result.data.isPreheat === "1") {
						$(".preheatingduration_box").show();
					} else {
						$(".preheatingduration_box").hide();
						$("input[name='preheatTime']").removeAttr('lay-verify');
					}
					if(result.data.isCancel === "1") {
						$(".cancelbooking_box").show();
					} else {
						$(".cancelbooking_box").hide();
						$("input[name='aheadCancel']").removeAttr('lay-verify');
						$("input[name='timesCancel']").removeAttr('lay-verify');
						$("input[name='deductCreditScore']").removeAttr('lay-verify');
					}
					if(result.data.isDelay === "1") {
						$(".delaytime_box").show();
					} else {
						$(".delaytime_box").hide();
						$("input[name='minDelayAhead']").removeAttr('lay-verify');
						$("input[name='maxDelay']").removeAttr('lay-verify');
					}
					if(result.data.needAudit == "1") {
						$(".examine_box").show();
					} else {
						$(".examine_box").hide();
					}

				} else {
					layer.msg(result.msg);
				}
			}
		})
	} else if (data.code !== 0){
		layer.msg(data.msg);
	}
	function getBusinessAudit() {
		$.ajax({
			url: httpDeviceUrl + 'getBusinessAudit?configUid=' + window.sessionStorage.getItem('configUid'),
			type: 'GET',
			async: false,
			success: function (res) {
				let data = res.data;
				let result = group(data, 'auditLevel');
				// 一级审核渲染
				for (let i = 0; i < result.length; i++) {
					if (result[i].key === 1) {
						let result_first = result[i].data;
						for (let j = 0; j < result_first.length; j++) {
							let option = `<option value="${result_first[j].auditSwitch}">${result_first[j].auditCName}</option>`;
							$("select[name='firstexamine']").append(option);
						}
					}
					if (result[i].key === 2) {
						let result_first = result[i].data;
						for (let j = 0; j < result_first.length; j++) {
							let option = `<option value="${result_first[j].auditSwitch}">${result_first[j].auditCName}</option>`;
							$("select[name='secondexamine']").append(option);
						}
					}
					form.render();
				}
			}
		})
	}

	//数据结果重构
	function group(arr, key) {
		let map = {}, arrList = [];
		for (let i = 0; i < arr.length; i++) {
			let newArr = arr[i];
			if (!map[newArr[key]]) {
				arrList.push({
					key: newArr[key],
					data: [newArr]
				});
				map[newArr[key]] = newArr;
			} else {
				for (let j = 0; j < arrList.length; j++) {
					let d = arrList[j];
					if (d.key == newArr[key]) {
						d.data.push(newArr);
						break;
					}
				}
			}
		}
		return arrList;
	}
	//开放预约模版设置
	setOpenTemplateList();
	function setOpenTemplateList() {
		$.ajax({
			url: httpDeviceUrl + 'getAppointmentOpeningSettingsTemplateList',
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
	form.on('submit(equipmenttimebookingbtn)', function(data) {
		var field = data.field; //获取提交的字段
		let configMachineUid = window.sessionStorage.getItem('configMachineUid');
		field['uid'] = configMachineUid;
		field['auditStatus'] = field.firstexamine + ',' + field.secondexamine;
		$.ajax({
			url: httpDeviceUrl + 'saveOrUpdateConfigMachineBasicInfo?configUid=' + window.sessionStorage.getItem('configUid'),
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

	form.on('radio(billingduration)', function(data){
		$.ajax({
			url: httpDeviceUrl + 'saveOrUpdateConfigMachineBilling?configUid=' + window.sessionStorage.getItem('configUid'),
			type: 'POST',
			data: {"billingHourInDictionary": data.value},
			success: function (res) {
				if (res.code === 0) {
					layer.msg("计费时长保存成功");
				} else {
					layer.msg(res.msg);
				}
			}
		})
	});
	//需要预热时间
	form.on('radio(preheatingduration)', function(data) {
		var abc = data.value;
		if(abc == "1") {
			$(".preheatingduration_box").show();
			if (!$("input[name='preheatTime']").attr('lay-verify')) {
				$("input[name='preheatTime']").attr('lay-verify', 'required');
			}
		} else {
			$(".preheatingduration_box").hide();
			$("input[name='preheatTime']").removeAttr('lay-verify');
		}
	});

	//可以取消预约
	form.on('radio(cancelbooking)', function(data) {
		var abc = data.value;
		if(abc == "1") {
			$(".cancelbooking_box").show();
			if (!$("input[name='aheadCancel']").attr('lay-verify')) {
				$("input[name='aheadCancel']").attr('lay-verify', 'required');
				$("input[name='timesCancel']").attr('lay-verify', 'required');
				$("input[name='deductCreditScore']").attr('lay-verify', 'required');
			}
		} else {
			$(".cancelbooking_box").hide();
			$("input[name='aheadCancel']").removeAttr('lay-verify');
			$("input[name='timesCancel']").removeAttr('lay-verify');
			$("input[name='deductCreditScore']").removeAttr('lay-verify');
		}
	});

	//可以延时
	form.on('radio(delaytime)', function(data) {
		var abc = data.value;
		if(abc == "1") {
			$(".delaytime_box").show();
			if (!$("input[name='minDelayAhead']").attr('lay-verify')) {
				$("input[name='minDelayAhead']").attr('lay-verify', 'required');
				$("input[name='maxDelay']").attr('lay-verify', 'required');
			}
		} else {
			$(".delaytime_box").hide();
			$("input[name='minDelayAhead']").removeAttr('lay-verify');
			$("input[name='maxDelay']").removeAttr('lay-verify');
		}
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

	//打开新增开放时间设置
	var newopentime = {
		newopentime: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增开放时间设置',
				area: ['700px', '535px'],
				shade: 0.5,
				maxmin: true,
				content: 'newOpenTime?configMachineUid=' +  window.sessionStorage.getItem('configMachineUid'),
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newopentimebtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newopentime').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newopentime[method] ? newopentime[method].call(this, othis) : '';
	});

	//打开从模板处添加开放时间
	var opentimetemplate = {
		opentimetemplate: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '从模板处添加开放时间',
				area: ['500px', '441px'],
				shade: 0.5,
				maxmin: true,
				content: 'openTimeTemplate',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero, index) {
					// layer.setTop(layero); //重点2
					var iframe = window['layui-layer-iframe' + index];
					// 向子页面的全局函数child传参
					iframe.child(configMachineUid);
				},
				btn: ['添加', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#opentimetemplatebtn");
					submit.click();
				}
			});
			layer.full(index);
		}
	};
	$('.opentimetemplate').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		opentimetemplate[method] ? opentimetemplate[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#opentime',
		url: httpDeviceUrl + 'getMachineOpenTimes', //数据接口
		where: {"configMachineUid": configMachineUid},
		title: '列表',
		cellMinWidth: 100,
		page: false, //开启分页
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			//curr: 5, //设定初始在第 5 页				
			groups: 1, //只显示 1 个连续页码				
			first: false, //不显示首页				
			last: false //不显示尾页
		},
		cols: [
			[ //表头
				{
					fixed: 'left',
					title: '序号',
					type: 'numbers',
					width: 50
				}, {
					field: 'startDate',
					title: '已设置开放日期范围',
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
					field: 'startTime',
					title: '开放时间范围',
					minWidth: 160,
					sort: true,
					templet: function (d) {
						return d.startTime + '-' + d.endTime
					}
				}, {
					field: 'openRank',
					title: '等级',
					sort: true,
					templet: function (d) {
						return d.openRank === '1' ? '全部' : d.openRank === '2' ? 'B级及以上' : d.openRank === '3' ?'A级' : '';
					}
				}, {
					field: 'minAheadTime',
					title: '最小提前预约时间(小时)',
					minWidth: 158,
					sort: true
				}, {
					field: 'maxAheadTime',
					title: '最大提前预约时间(小时)',
					minWidth: 158,
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#opentimetoolbar',
					width: 120
				}
			]
		],
		id: 'opentime',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(opentime)', function(obj) {
		let data = obj.data;
		//打开编辑开放时间设置
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑开放时间设置',
				area: ['700px', '535px'],
				shade: 0.5,
				maxmin: true,
				content: 'editOpenTime',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero, index) {
					// layer.setTop(layero); //重点2
					let iframe = window['layui-layer-iframe' + index];
					iframe.child(data)
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#editopentimebtn");
					submit.click();
				}
			});
			//layer.full(index);
		};
		//删除
		if(obj.event === 'del') {
			layer.confirm('是否删除？', {
				title: '提示'
			}, function(index) {
				$.ajax({
					url: deviceHost + 'delConfigOpenTime?uid=' + data.uid,
					type: 'POST',
					success: function (res) {
						table.reload('nobooking');
						layer.close(index);
					}
				})
			});
		}
	});

	var $ = layui.$,
		opentimeactive = {
			reload: function() {
				var searchbox = $('#opentimesearchbox');

				//执行重载
				table.reload('opentime', {
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

	$('.search_line .opentimesearch').on('click', function() {
		var type = $(this).data('type');
		opentimeactive[type] ? opentimeactive[type].call(this) : '';
	});

	//打开新增不可预约时间设置
	var newnobooking = {
		newnobooking: function() {
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
				content: 'newNoBooking?configMachineUid=' + window.sessionStorage.getItem('configMachineUid'),
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newnobookingbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newnobooking').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newnobooking[method] ? newnobooking[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#nobooking',
		url: httpDeviceUrl + 'getMachineNotOpenTimes', //数据接口
		where: {"configMachineUid": configMachineUid},
		title: '列表',
		cellMinWidth: 100,
		page: false, //开启分页
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			//curr: 5, //设定初始在第 5 页				
			groups: 1, //只显示 1 个连续页码				
			first: false, //不显示首页				
			last: false //不显示尾页
		},
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
						return d.startDate + '至' + d.endDate;
					}
				}, {
					field: 'weekdays',
					title: '不可预约星期',
					minWidth: 110,
					sort: true
				}, {
					field: 'startTime',
					title: '不可预约时间范围',
					minWidth: 160,
					sort: true,
					templet: function (d) {
						return d.startTime + '-' + d.endTime;
					}
				}, {
					field: 'info',
					title: '备注',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#nobookingtoolbar',
					width: 120
				}
			]
		],
		id: 'nobooking',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(nobooking)', function(obj) {
		var data = obj.data;
		//打开编辑不可预约时间设置
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑不可预约时间设置',
				area: ['700px', '535px'],
				shade: 0.5,
				maxmin: true,
				content: 'editNoBooking',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero, index) {
					// layer.setTop(layero); //重点2
					let iframe = window['layui-layer-iframe' + index];
					iframe.child(data)
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#editnobookingbtn");
					submit.click();
				}
			});
			//layer.full(index);
		};
		//删除
		if(obj.event === 'del') {
			layer.confirm('是否删除？', {
				title: '提示'
			}, function(index) {
				$.ajax({
					url: deviceHost + 'delConfigOpenTime?uid=' + data.uid,
					type: 'POST',
					success: function (res) {
						table.reload('nobooking');
						layer.close(index);
					}
				})
			});
		}
	});

	var $ = layui.$,
		nobookingactive = {
			reload: function() {
				var searchbox = $('#nobookingsearchbox');

				//执行重载
				table.reload('nobooking', {
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

	$('.search_line .nobookingsearch').on('click', function() {
		var type = $(this).data('type');
		nobookingactive[type] ? nobookingactive[type].call(this) : '';
	});

	//计费费用
	table.render({
		elem: '#billing',
		url: httpDeviceUrl + 'getConfigMachineInfo',
		where: {"configUid": window.sessionStorage.getItem('configUid')},
		cellMinWidth: 100,
		page: false,
		parseData: function (res) {
			return {
				"code": res.code,
				"msg": res.msg,
				"count": res.data.length,
				"data": [res.data]
			}
		},
		cols: [[
			{
				field: 'left',
				title: '序号',
				type: 'numbers'
			}, {
				field: 'billingOutsideSchool',
				title: '校外',
			}, {
				field: 'billingOutsideAcademy',
				title: '校内其他学院',
			}, {
				field: 'billingInsideAcademy',
				title: '学院内',
			}
		]],
		id: 'billing'
	})
	//新增计费费用字段
	var billing = {
		billing: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '新增计费费用设置',
				area: ['700px', '535px'],
				shade: 0.5,
				maxmin: true,
				content: 'newBilling?configUid=' + window.sessionStorage.getItem('configUid'),
				zIndex: layer.zIndex //重点1
				,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newbillingbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.billing').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		billing[method] ? billing[method].call(this, othis) : '';
	});
	//新增其他字段
	var othercontent = {
		othercontent: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '新增其他字段设置',
				area: ['700px', '535px'],
				shade: 0.5,
				maxmin: true,
				content: 'newOtherContent?uid=' + uid,
				zIndex: layer.zIndex //重点1
				,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newothercontentbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.othercontent').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		othercontent[method] ? othercontent[method].call(this, othis) : '';
	});
	//其他内容字段
	table.render({
		elem: '#othercontent'
		, url: httpDeviceUrl + 'getInstrumentAppExtendsInfoFieldList'
		, cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
		, where: {"configUid": window.sessionStorage.getItem('configUid')}
		, page: false
		, cols: [[
			{field: 'left', width: 80, title: '序号', type: 'numbers'}
			, {field: 'fieldName', title: '字段名称'}
			, {field: 'necessary', title: '是否必填', sort: true, templet: function (d) {
					return d.necessary === '1' ? '是' : '否';
				}}
			, {field: 'note', title: '备注'}
			, {field: 'right', width: 137, title: '操作', toolbar: '#othertoolbar'}
		]],
		id: 'othercontent'
	});

	table.on('tool(othercontent)', function (obj) {
		var data = obj.data;
		//删除
		if(obj.event === 'del') {
			layer.confirm('是否删除？', {
				title: '提示'
			}, function(index) {
				$.ajax({
					url: httpDeviceUrl + 'delInstrumentAppExtendsInfoField',
					type: 'POST',
					data: {"uid": data.uid},
					success: function (res) {
						if (res.code === 0) {
							table.reload('othercontent');
							layer.close(index);
							layer.msg('删除成功');
						} else {
							layer.msg(res.msg);
						}
					}
				})
			});
		}
	})

	window.GetValue = function (name) {
		setTemplate(name)
	}
	function setTemplate(name) {
		// 基础对象封装
		let formsJson = $("#equipmenttimebookingbox").serializeArray();
		let formObj = {};
		for (let i = 0; i < formsJson.length; i++) {
			if (formsJson[i].value !== '') {
				formObj[formsJson[i].name] = formsJson[i].value;
			}
		}
		$.ajax({
			url: httpDeviceUrl + 'saveAppointmentOpeningSettingsTemplate',
			type: 'POST',
			data: {"templateName": name, "configMachineJson": JSON.stringify(formObj)},
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
	var saveastimetemplate = {
		saveastimetemplate: function() {
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
	$('.saveastimetemplate').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		saveastimetemplate[method] ? saveastimetemplate[method].call(this, othis) : '';
	});
	//监听模版选择并同步渲染
	form.on('select(template)', function (obj) {
		let templateName = obj.value;
		$.ajax({
			url: httpDeviceUrl + 'getAppointmentOpeningSettingsData',
			type: 'GET',
			data: {"templateName": templateName},
			success: function (res) {
				let data = res.data;
				for (let i = 0; i < data.length; i++) {
					if (data[i].tableName === 'ConfigMachine' && data[i].tableValue !== null) {
						form.val('equipmenttimebookingbox', JSON.parse(data[i].tableValue));
					}
				}
			}
		})
	})
});