layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laydate = layui.laydate,
		laypage = layui.laypage,
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

	form.render(null, 'powercontrollersetbox');

	let cname = '';
	$.ajax({
		url: apiGateWayHost + '/usercenter/getTeacherBasicInfo',
		type: 'GET',
		async: false,
		data: {"username": username},
		success: function (res) {
			let data = res.data;
			if (data) {
				cname = data.cname;
			}
		}
	})
	//打开新增电源控制器设置
	var newpowercontrollerset = {
		newpowercontrollerset: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增电源控制器设置',
				area: ['500px', '455px'],
				shade: 0.5,
				maxmin: true,
				content: 'newPowerControllerSet?uid=' + uid,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newpowercontrollersetbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newpowercontrollerset').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newpowercontrollerset[method] ? newpowercontrollerset[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#powercontrollerset',
		url: httpDeviceUrl + 'getInstrumentSmartAgent', //数据接口
		where: {"insUid": uid},
		title: '列表',
		cellMinWidth: 100,
		page: false, //开启分页
		limit: 1000,
		parseData: function (res) { //res 即为原始返回的数据
			return {
				"code": 0, //解析接口状态
				"data": [res.data], //解析数据列表
				"count": '1',//解析数据列表
			};
		},
		cols: [
			[ //表头
				{
					fixed: 'left',
					title: '序号',
					type: 'numbers',
					width: 50
				}, {
					field: 'agentNo',
					title: '电表编号',
					minWidth: 115,
					sort: true
				}, {
					field: 'serialNo',
					title: '电源控制器编号',
					minWidth: 150,
					sort: true
				}, {
					field: 'remark',
					title: '电表名称',
					minWidth: 115,
					sort: true
				}, {
					field: 'dbhost',
					title: 'ip地址',
					sort: true
				}, {
					field: 'port',
					title: '端口',
					sort: true
				}, {
					field: 'serverName',
					title: '物联服务器',
					minWidth: 115,
					sort: true
				}, {
					fixed: 'right',
					title: '远程',
					toolbar: '#remotetoolbar',
					width: 290
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#controllertoolbar',
					width: 90
				}
			]
		],
		id: 'powercontrollerset',
		data: table,
		skin: 'line', //表格风格			
		even: false
	});

	//监听行工具事件
	table.on('tool(powercontrollerset)', function(obj) {
		var data = obj.data;
		//开电源
		if(obj.event === 'open') {
			$.ajax({
				url: httpDeviceUrl + 'IoTOperation',
				type: 'POST',
				data: {"insUid": uid, "flag": 1, "username": username, "cname": cname},
				success: function (res) {
					layer.msg('已开电源');
					console.log(res)
				}
			})
		}
		//关电源
		if(obj.event === 'close') {
			$.ajax({
				url: httpDeviceUrl + 'IoTOperation',
				type: 'POST',
				data: {"insUid": uid, "flag": 0, "username": username, "cname": cname},
				success: function (res) {
					layer.msg('已关电源');
					console.log(res)
				}
			})
		}
		//下发预约数据
		if(obj.event === 'date') {
			$.ajax({
				url: httpDeviceUrl + 'IoTOperation',
				type: 'POST',
				data: {"insUid": uid, "flag": 3, "username": username, "cname": cname},
				success: function (res) {
					layer.msg('已下发预约数据');
					console.log(res)
				}
			})
		}
		//回推记录
		if(obj.event === 'record') {
			$.ajax({
				url: httpDeviceUrl + 'IoTOperation',
				type: 'POST',
				data: {"insUid": uid, "flag": 4, "username": username, "cname": cname},
				success: function (res) {
					layer.msg('已回推记录');
					console.log(res)
				}
			})
		}
		//解除关联
		if(obj.event === 'relieve') {
			//
			layer.confirm('是否解除关联？', {
				title: '提示'
			}, function(index) {
				$.ajax({
					url: httpDeviceUrl + 'delSmartAgent',
					type: 'POST',
					data: {"insUid": uid},
					success: function (res) {
						console.log(res)
						if (res.code === 0) {
							layer.msg('已解除关联');
							layer.close(index);
							table.reload('powercontrollerset');
						} else {
							layer.msg(res.msg);
						}

					}
				})
			});
		}
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('powercontrollerset', {
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

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
});