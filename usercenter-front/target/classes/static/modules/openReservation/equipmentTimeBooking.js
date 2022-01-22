layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table,
		layer = layui.layer;

	//向世界问个好
	//layer.msg('');

	form.render(null, 'equipmenttimebookingbox');
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
	//模版列表渲染
	setOpenTemplateList();
	function setOpenTemplateList() {
		$.ajax({
			url: deviceHost + 'getAppointmentOpeningSettingsTemplateList',
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


	//监听模版选择
	form.on("select(template)", function (obj) {
		let templateName = obj.value;
		$.ajax({
			url: deviceHost + 'getAppointmentOpeningSettingsData',
			type: 'GET',
			data: {"templateName": templateName},
			success: function (res) {
				let data = res.data;
				for (let i = 0; i < data.length; i++) {
					if (data[i].tableName === 'ConfigMachine' && data[i].tableValue !== null) {
						form.val('equipmenttimebookingbox', JSON.parse(data[i].tableValue));
					}
					if (data[i].tableName === 'ConfigOpenTime' && data[i].tableValue !== null) {
						let openTimeAndNoBooking = JSON.parse(data[i].tableValue)
						let openTimeFilter = openTimeAndNoBooking.filter(v => {
							return v.status === '1';
						});
						let noBookingFilter = openTimeAndNoBooking.filter(v => {
							return v.status === '0';
						});
						setTable('opentime', colsOpenTime, openTimeFilter);
						setTable('nobooking', colsNoBooking, noBookingFilter);
					}
					if (data[i].tableName === 'InstrumentAppExtendsInfoField' && data[i].tableValue !== null) {
						setTable('othercontent', colsOtherContent, JSON.parse(data[i].tableValue));
					}
				}
			}
		})
	})
	//审核设置 审核部分先执行
	var vm = new Vue({
		el: '#app',
		data() {
			return {
				auditList: {},
				list: [],
				listLevel: [],
				level: 0,
				review: null,
				flag: true,
			}
		},
		created() {
			this.getAuditList();
			this.getLevel();
		},
		methods: {
			getAuditList() {
				let data = [];
				let examinelevelconsistent = null;
				let auditData = {};
				$.ajax({
					url: `${auditserverHost}/audit/${configType}/${uid}`,
					type: 'GET',
					async: false,
					success: function (res) {
						auditData = res.data;
						examinelevelconsistent = res.data.isAuditUnanimous;
						// data = res.data.auditConfigVOList
						// form.val()
					}
				})
				this.list = auditData;
				this.review = examinelevelconsistent;
				this.auditList = auditData;
			},
			// 获取所有审核层级
			getLevel() {
				let data = [];
				$.ajax( {
					url: `${auditserverHost}/audit/config/level`,
					type: 'GET',
					async: false,
					success: function (res) {
						// data = res.data
						let result = res.data;
						if (res.data) {
							for (let i in result) {
								data.push({"value": i, "name": result[i]})
							}
						}
					}
				})
				this.listLevel = data;
			},
			conversion(num) {
				let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
				let unit = ["", "十", "百", "千", "万"];
				num = parseInt(num);
				let getWan = (temp) => {
					let strArr = temp.toString().split("").reverse();
					let newNum = "";
					for (var i = 0; i < strArr.length; i++) {
						newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
					}
					return newNum;
				}
				let overWan = Math.floor(num / 10000);
				let noWan = num % 10000;
				if (noWan.toString().length < 4) noWan = "0" + noWan;
				return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
			}
		},
		updated() {
			form.render();
		},
	})
	//获取基础配置信息
	let configUid = '';
	let configMachineUid = '';
	let basicData = {};
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
						basicData = res;
						configMachineUid = result.data.uid;
						if (result.code === 0 && result.data.length !== 0) {
							//基础设置
							form.val('equipmenttimebookingbox', {
								// "minAheadHour": result.data.minAheadHour,
								// "maxAheadHour": result.data.maxAheadHour,
								"minAheadByTutor": result.data.minAheadByTutor,
								"minInterval": result.data.minInterval,
								"maxInterval": result.data.maxInterval,
								"timeLineInterval": result.data.timeLineInterval,
								"isAcrossDay": result.data.isAcrossDay,
								"isDelay": result.data.isDelay,
								"minDelayAhead": result.data.minDelayAhead,
								"maxDelay": result.data.maxDelay,
								"isCancel": result.data.isCancel,
								"aheadCancel": result.data.aheadCancel,
								"timesCancel": result.data.timesCancel,
								"countPerTime": result.data.countPerTime,
								"deductCreditScore": result.data.deductCreditScore
							});
							if (result.data.isDelay === "1") {
								$(".delaytimetwo_box").show();
							} else {
								$(".delaytimetwo_box").hide();
								$("input[name='minDelayAhead']").removeAttr('lay-verify');
								$("input[name='maxDelay']").removeAttr('lay-verify');
							}
							if (result.data.isCancel === "1") {
								$(".cancelbooking_box").show();
							} else {
								$(".cancelbooking_box").hide();
								$("input[name='aheadCancel']").removeAttr('lay-verify');
								$("input[name='timesCancel']").removeAttr('lay-verify');
								$("select[name='countPerTime']").removeAttr('lay-verify');
								$("input[name='deductCreditScore']").removeAttr('lay-verify');
							}
						}
					}
				})
			}
		}
	})

	form.on('radio(changeStatus)', function (data) {
		let status  = data.value;
		vm.auditList.isAuditUnanimous = eval(status.toLowerCase());
	})

	//可以延时(后续无预约)
	form.on('radio(delaytimetwo)', function(data) {
		var abc = data.value;
		if(abc == "1") {
			$(".delaytimetwo_box").show();
			if (!$("input[name='minDelayAhead']").attr('lay-verify')) {
				$("input[name='minDelayAhead']").attr('lay-verify', 'required');
				$("input[name='maxDelay']").attr('lay-verify', 'required');
			}

		} else {
			$(".delaytimetwo_box").hide();
			$("input[name='minDelayAhead']").removeAttr('lay-verify');
			$("input[name='maxDelay']").removeAttr('lay-verify');
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
				$("select[name='countPerTime']").attr('lay-verify', 'required');
				$("input[name='deductCreditScore']").attr('lay-verify', 'required');
			}
		} else {
			$(".cancelbooking_box").hide();
			$("input[name='aheadCancel']").removeAttr('lay-verify');
			$("input[name='timesCancel']").removeAttr('lay-verify');
			$("select[name='countPerTime']").removeAttr('lay-verify');
			$("input[name='deductCreditScore']").removeAttr('lay-verify');
		}
	});

	//院内预约审核层级
	form.on('select(collegeinside)', function(data) {
		let level = data.value;
		let key = $(data.elem).attr("data");
		vm.auditList.auditConfigVOList[key].auditLevelSum = parseInt(level);
		vm.auditList.auditConfigVOList[key].auditLevelVOList = [];
		vm.flag = false;
	});

	// 三层审核层级显示
	form.on('select(collegefirstexamine)', function (data) {
		let level = data.value;
		let key = $(data.elem).attr("data").split(',');
		Vue.set(vm.auditList.auditConfigVOList[key[0]].auditLevelVOList, parseInt(key[1]) - 1, {
			auditConfigLevelId: vm.list.auditConfigVOList[key[0]].auditLevelVOList[parseInt(key[1]) - 1] ? vm.list.auditConfigVOList[key[0]].auditLevelVOList[parseInt(key[1]) - 1].auditConfigLevelId : '',
			auditConfigId: vm.auditList.auditConfigVOList[key[0]].auditConfigId,
			auditLevel: level,
			auditLevelName: setAuditLevelName(level),
			levelNum: vm.auditList.auditConfigVOList[key[0]].auditLevelSum
		})
		$(data.elem).val(level)
	})

	function setAuditLevelName(val) {
		let listLevel = vm.listLevel;
		let result = '';
		for (let i = 0; i < listLevel.length; i++) {
			if (listLevel[i].value == val) {
				result = listLevel[i].name;
				i = listLevel.length;
			}
		}
		return result;
	}
	form.on(`radio(changeStatusAudit)`, function (data) {
		let status = data.value;
		let key = $(data.elem).attr("data");
		vm.auditList.auditConfigVOList[key].isParallelAudit = eval(status.toLowerCase());
	})

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
				content: 'newOpenTime?configMachineUid=' + configMachineUid,
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
				content: 'newNoBooking?configMachineUid=' + configMachineUid,
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

	//打开其他内容字段设置
	var newotherfield = {
		newotherfield: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增其他内容字段设置',
				area: ['500px', '500px'],
				shade: 0.5,
				maxmin: true,
				content: 'newOtherField?configUid=' + configUid + '&uid=' + uid,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newotherfieldbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newotherfield').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newotherfield[method] ? newotherfield[method].call(this, othis) : '';
	});

	//需要模版渲染，关闭分页效果
	function setTable(selector, colsList, dataTd) {
		let tableObj = table.render({
			elem: `#${selector}`,
			title: '列表',
			cellMinWidth: 100,
			page: false,
			cols: [
				//此处需要通过参数传入显示
				colsList
			],
			id: `${selector}`,
			data: dataTd, //列表渲染
			skin: 'line'
		});
		return tableObj;
	}

	//其他字段设置
	let colsOtherContent = [ //表头
		{
			fixed: 'left',
			title: '序号',
			type: 'numbers',
			width: 50
		}, {
			field: 'fieldName',
			title: '字段名称',
			minWidth: 180,
			sort: true
		}, {
			field: 'displayStyle',
			title: '字段类型',
			minWidth: 180,
			sort: true,
			templet: function (d) {
				return d.displayStyle === 'TEXT' ? "输入框" : d.displayStyle === 'RADIO' ? "单选框" : d.displayStyle === 'CHECKBOX' ? "复选框" : d.displayStyle === 'SELECT' ? "下拉框" : "";
			}
		}, {
			field: 'openSettingCustomFieldValueVOList',
			title: '类型内容',
			minWidth: 180,
			sort: true,
			templet: function (d) {
				let type = [];
				for (let i = 0; i < d.openSettingCustomFieldValueVOList.length; i++) {
					type.push(d.openSettingCustomFieldValueVOList[i].value);
				}
				return type.join();
			}
		}, {
			field: 'necessary',
			title: '是否必填',
			minWidth: 110,
			sort: true,
			templet: function (d) {
				return d.necessary === '1' ? '是' : '否';
			}
		}, {
			field: 'note',
			title: '备注',
			sort: true
		}, {
			fixed: 'right',
			title: '操作',
			toolbar: '#otherfieldtoolbar',
			width: 120
		}
	];

	//不可预约时间设置
	let colsNoBooking = [ //表头
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
	];

	//开放时间预约
	let colsOpenTime = [ //表头
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
		},  {
			fixed: 'right',
			title: '操作',
			toolbar: '#opentimetoolbar',
			width: 120
		}
	]

	//开放时间设置
	let colsOpenTimeData = [];
	$.ajax({
		url: deviceHost + 'getMachineOpenTimes',
		type: 'GET',
		async: false,
		data: {"configMachineUid": configMachineUid},
		success: function (res) {
			colsOpenTimeData = res.data;
		}
	});
	// 不可预约时间
	let colsNoBookingData = [];
	$.ajax({
		url: deviceHost + 'getMachineNotOpenTimes',
		type: 'GET',
		async: false,
		data: {"configMachineUid": configMachineUid},
		success: function (res) {
			colsNoBookingData = res.data;
		}
	});
	//其他内容字段
	let colsOtherContentData = [];
	$.ajax({
		url: deviceHost + 'getAppOpeningCustomFieldList',
		type: 'GET',
		async: false,
		data: {"configUid": configUid},
		success: function (res) {
			colsOtherContentData = res.data;
		}
	});
	let instanceOpenTime = setTable('opentime', colsOpenTime, colsOpenTimeData);
	window.opentimeData = function (data) {
		let newTestData = instanceOpenTime.config.data;
		let arrObj = [];
		let newData = JSON.parse(data);
		let index = -1;
		for (let i = 0; i < newTestData.length; i++) {
			if (newTestData[i].uid === newData.uid && newData.addOrEdit !== 'add') {
				index = i;
			}
			arrObj.push(newTestData[i])
		}
		if (index !== -1) {
			arrObj.splice(index, 1, newData);
		} else {
			arrObj.push(JSON.parse(data))
		}
		instanceOpenTime = setTable('opentime', colsOpenTime, arrObj);
	}
	let instanceNoBooking = setTable('nobooking', colsNoBooking, colsNoBookingData);
	window.noBookingData = function (data) {
		let newTestData = instanceNoBooking.config.data;
		let arrObj = [];
		let newData = JSON.parse(data);
		let index = -1;
		for (let i = 0; i < newTestData.length; i++) {
			if (newTestData[i].uid === newData.uid && newData.addOrEdit !== 'add') {
				index = i;
			}
			arrObj.push(newTestData[i])
		}
		if (index !== -1) {
			arrObj.splice(index, 1, newData);
		} else {
			arrObj.push(JSON.parse(data))
		}
		instanceNoBooking = setTable('nobooking', colsNoBooking, arrObj);
	}
	let instanceOtherContentData = setTable('othercontent', colsOtherContent, colsOtherContentData);
	window.otherContentData = function (data) {
		let newTestData = instanceOtherContentData.config.data;
		let arrObj = [];
		let newData = JSON.parse(data);
		let index = -1;
		for (let i = 0; i < newTestData.length; i++) {
			if (newTestData[i].uid === newData.uid && newData.addOrEdit !== 'add') {
				index = i;
			}
			arrObj.push(newTestData[i])
		}
		if (index !== -1) {
			arrObj.splice(index, 1, newData);
		} else {
			arrObj.push(JSON.parse(data))
		}
		instanceOtherContentData = setTable('othercontent', colsOtherContent, arrObj);
	}
	//监听行工具事件
	table.on('tool(othercontent)', function(obj) {
		var data = obj.data;
		//打开编辑其他内容字段设置
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑其他内容字段设置',
				area: ['500px', '340px'],
				shade: 0.5,
				maxmin: true,
				content: 'editOtherField',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#editotherfieldbtn");
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
				if (data.uid) {
					$.ajax({
						url: deviceHost + 'delAppOpeningCustomField',
						type: 'POST',
						data: {"uid": data.uid},
						success: function (res) {
							if (res.code === 0) {
								let newTestData = instanceOtherContentData.config.data;
								let spArrData = newTestData;
								let indexI = 0;
								for (let i = 0; i < newTestData.length; i++) {
									if (newTestData[i].uid === data.uid) {
										indexI = i
									}
								}
								spArrData.splice(indexI, 1)
								setTable('othercontent', colsOtherContent, spArrData);
								layer.close(index);
								layer.msg('删除成功');
							} else {
								layer.msg(res.msg);
							}
						}
					})
				} else {
					let newTestData = instanceOtherContentData.config.data;
					let spArrData = newTestData;
					let indexI = 0;
					for (let i = 0; i < newTestData.length; i++) {
						if (!newTestData[i].uid && newTestData[i].fieldName === data.fieldName && newTestData[i].displayStyle === data.displayStyle) {
							indexI = i
						}
					}
					spArrData.splice(indexI, 1)
					setTable('othercontent', colsOtherContent, spArrData);
					layer.close(index);
					layer.msg('删除成功');
				}
			});
		}
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
				success: function(layero) {
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
				if (data.uid) {
					$.ajax({
						url: deviceHost + 'delConfigOpenTime?uid=' + data.uid,
						type: 'POST',
						success: function (res) {
							layer.close(index);
							let newTestData = instanceNoBooking.config.data;
							let spArrData = newTestData;
							let indexI = 0;
							for (let i = 0; i < newTestData.length; i++) {
								if (newTestData[i].uid === data.uid) {
									indexI = i
								}
							}
							spArrData.splice(indexI, 1)
							setTable('nobooking', colsNoBooking, spArrData);
							layer.msg('删除成功');
						}
					})
				} else {
					let newTestData = instanceNoBooking.config.data;
					let spArrData = newTestData;
					let indexI = 0;
					for (let i = 0; i < newTestData.length; i++) {
						if (!newTestData[i].uid && newTestData[i].fieldName === data.fieldName && newTestData[i].displayStyle === data.displayStyle) {
							indexI = i
						}
					}
					spArrData.splice(indexI, 1)
					setTable('nobooking', colsNoBooking, spArrData);
					layer.close(index);
					layer.msg('删除成功');
				}

			});
		}
	});

	//监听行工具事件
	table.on('tool(opentime)', function(obj) {
		var data = obj.data;
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
				success: function(layero) {
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
				if (data.uid) {
					$.ajax({
						url: deviceHost + 'delConfigOpenTime?uid=' + data.uid,
						type: 'POST',
						success: function (res) {
							if (res.code === 0) {
								let newTestData = instanceOpenTime.config.data;
								let spArrData = newTestData;
								let indexI = 0;
								for (let i = 0; i < newTestData.length; i++) {
									if (newTestData[i].uid === data.uid) {
										indexI = i
									}
								}
								spArrData.splice(indexI, 1)
								setTable('opentime', colsOpenTime, spArrData);
								layer.close(index);
								layer.msg('删除成功');
							} else {
								layer.msg(res.msg);
							}
							table.reload('nobooking');
							obj.del();
							layer.close(index);
							layer.msg('删除成功');
						}
					})
				} else {
					let newTestData = instanceOpenTime.config.data;
					let spArrData = newTestData;
					let indexI = 0;
					for (let i = 0; i < newTestData.length; i++) {
						if (!newTestData[i].uid && newTestData[i].fieldName === data.fieldName && newTestData[i].displayStyle === data.displayStyle) {
							indexI = i
						}
					}
					spArrData.splice(indexI, 1)
					setTable('opentime', colsOpenTime, spArrData);
					layer.close(index);
					layer.msg('删除成功');
				}
			});
		}
	});

	//监听提交
	form.on('submit(equipmenttimebookingbtn)', function(data) {
		var field = data.field; //获取提交的字段
		if (field.isDelay == 0) {
			field.minDelayAhead = 0;
			field.maxDelay = 0;
		}
		if (field.isCancel == 0) {
			field.aheadCancel = 0;
			field.timesCancel = 0;
			field.countPerTime = "";
			field.deductCreditScore = 0;
		}
		let configOpenTimeListFromPage = instanceOpenTime.config.data.concat(instanceNoBooking.config.data);
		if (configUid !== null) {
			field['uid'] = configMachineUid;
			let otherField = instanceOtherContentData.config.data;
			for (let i = 0; i < otherField.length; i++) {
				Object.assign(otherField[i], { "instrumentUid": uid })
			}
			vm.auditList.entityId = uid;
			vm.auditList.entityType = configType;
			let auditList = vm.auditList;
			$.ajax({
				url: auditserverHost + '/audit',
				type: 'POST',
				async: false,
				contentType: 'application/json',
				data: JSON.stringify(auditList),
				success: function (res) {
					if (res.code == 0) {
						layer.msg('审核设置保存成功');
					} else {
						layer.msg(res.msg);
					}
				}
			})
			$.ajax({
				url: deviceHost + 'saveOrUpdateAppOpeningSettings',
				type: 'POST',
				async: false,
				data: {"configUid": configUid, "configMachineFromPageJson": JSON.stringify(field), "configOpenTimeListFromPageJson": JSON.stringify(configOpenTimeListFromPage), "openAppSettingCustomFieldVOListFromPageJson": JSON.stringify(instanceOtherContentData.config.data)},
				success: function (res) {
					if (res.code === 0) {
						layer.msg('已保存');
					} else {
						layer.msg(res.msg);
					}
				}
			})
		} else {
			layer.msg("请先进行预约设置");
		}

	});
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
		// 开放时间、不可预约时间预约
		let openTimeObj = instanceOpenTime.config.data;
		let noBookingObj = instanceNoBooking.config.data;
		let otherContentObj = instanceOtherContentData.config.data;

		let configOpenTimeJson = openTimeObj.concat(noBookingObj);
		$.ajax({
			url: deviceHost + 'saveAppointmentOpeningSettingsTemplate',
			type: 'POST',
			data: {"templateName": name, "configMachineJson": JSON.stringify(formObj), "configOpenTimeJson": JSON.stringify(configOpenTimeJson), "extendsInfoFieldJson": JSON.stringify(otherContentObj)},
			success: function (res) {
				if (res.code === 0) {
					layer.msg('模版保存成功');
					setOpenTemplateList();
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
				area: ['500px', '183px'],
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
});