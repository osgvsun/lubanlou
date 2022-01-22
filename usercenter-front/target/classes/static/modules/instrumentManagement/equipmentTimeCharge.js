layui.use(['form', 'element', 'table', 'layer'], function() {
	var $ = layui.jquery,
		form = layui.form,
		table = layui.table,
		layer = layui.layer;

	//向世界问个好
	//layer.msg('');

	form.render(null, 'equipmenttimechargebox');
	//基本信息渲染
	let basicInformation = JSON.parse(localStorage['basicInformation']);
	$('.deviceName').text(basicInformation.deviceName + '(' + basicInformation.schoolDevice + ')');
	$('.li_cell:eq(0)').append(basicInformation.devicePattern);
	$('.li_cell:eq(1)').append(basicInformation.lcCenterName + '(' + basicInformation.departmentNumber + ')');
	$('.li_cell:eq(2)').append(basicInformation.labRoomName);
	$('.li_cell:eq(3)').append(basicInformation.manufacturer);
	$('.li_cell:eq(4)').append(basicInformation.devicePrice + '元');

	let configMachineUid = window.sessionStorage.getItem('configMachineUid');
	//监听提交
	form.on('submit(equipmenttimechargebtn)', function(data) {
		var field = data.field; //获取提交的字段

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('equipmenttimechargebox'); //重载表格
		layer.msg('已保存');
	});


	//打开新增附加收费
	var newtimeextracharge = {
		newtimeextracharge: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增附加收费',
				area: ['500px', '324px'],
				shade: 0.5,
				maxmin: true,
				content: 'newTimeExtraCharge',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newtimeextrachargebtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newtimeextracharge').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newtimeextracharge[method] ? newtimeextracharge[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#timeextracharge',
		url: httpDeviceUrl + 'getMachineAppAdditionalCharges', //数据接口
		where: {"configMachineUid": configMachineUid},
		title: '列表',
		cellMinWidth: 100,
		page: false, //开启分页
		limit: 1000, //每页默认显示的数量
		cols: [
			[ //表头
				{
					fixed: 'left',
					title: '序号',
					type: 'numbers',
					width: 50
				}, {
					field: 'name',
					title: '收费项目',
					sort: true
				}, {
					field: 'price',
					title: '价格(元)',
					sort: true
				}, {
					field: 'info',
					title: '备注',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#timeextrachargetoolbar',
					width: 80
				}
			]
		],
		id: 'timeextracharge',
		data: table,
		skin: 'line', //表格风格			
		even: false
	});

	//监听行工具事件
	table.on('tool(timeextracharge)', function(obj) {
		var data = obj.data;
		//删除
		if(obj.event === 'del') {
			layer.confirm('是否删除？', {
				title: '提示'
			}, function(index) {
				$.ajax({
					url: httpDeviceUrl + 'delConfigAdditional',
					type: 'POST',
					data: {"uid": data.uid},
					success: function (res) {
						if (res.code === 0) {
							obj.del();
							layer.close(index);
							table.reload("timeextracharge")
						}
					}
				})
			});
		}
	});

	var $ = layui.$,
		timeextrachargeactive = {
			reload: function() {
				var searchbox = $('#timeextrachargesearchbox');

				//执行重载
				table.reload('timeextracharge', {
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

	$('.search_line .timeextrachargesearch').on('click', function() {
		var type = $(this).data('type');
		timeextrachargeactive[type] ? timeextrachargeactive[type].call(this) : '';
	});

	//打开新增收费项目
	var newchargeitem = {
		newchargeitem: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增收费项目',
				area: ['500px', '495px'],
				shade: 0.5,
				maxmin: true,
				content: 'newChargeItem',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero, index) {
					// layer.setTop(layero); //重点2
					let iframe = window['layui-layer-iframe' + index];
					iframe.child(uid)
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newchargeitembtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newchargeitem').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newchargeitem[method] ? newchargeitem[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#chargeitem',
		url: httpDeviceUrl + 'getMachineAppChargeItems', //数据接口
		where: {"uid": uid},
		title: '列表',
		cellMinWidth: 100,
		page: false, //开启分页
		limit: 1000, //每页默认显示的数量
		cols: [
			[ //表头
				{
					fixed: 'left',
					title: '序号',
					type: 'numbers',
					width: 50
				}, {
					field: 'content',
					title: '项目名称',
					minWidth: 180,
					sort: true
				}, {
					field: 'amount',
					title: '收费标准',
					minWidth: 110,
					sort: true,
					templet: function (d) {
						if (d.type === '1') {
							return d.amount + '元/小时';
						}
						if (d.type === '2') {
							return d.amount + '元/次';
						}
						if (d.type === '3') {
							return d.amount + '元/样';
						}
						if (d.type === '4') {
							return d.amount + '元/平方厘米';
						}
					}
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#chargeitemtoolbar',
					width: 80
				}
			]
		],
		id: 'chargeitem',
		data: table,
		skin: 'line', //表格风格			
		even: false,
	});

	//监听行工具事件
	table.on('tool(chargeitem)', function(obj) {
		var data = obj.data;
		//删除
		if(obj.event === 'del') {
			layer.confirm('是否删除？', {
				title: '提示'
			}, function(index) {

				$.ajax({
					url: httpDeviceUrl + 'delInstrumentMachineItem',
					type: 'POST',
					data: {"uid": data.uid},
					success: function (res) {
						obj.del();
						layer.close(index);
						table.reload("chargeitem")
					}
				})
			});
		}
	});

	var $ = layui.$,
		chargeitemactive = {
			reload: function() {
				var searchbox = $('#chargeitemsearchbox');

				//执行重载
				table.reload('chargeitem', {
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

	$('.search_line .chargeitemsearch').on('click', function() {
		var type = $(this).data('type');
		chargeitemactive[type] ? chargeitemactive[type].call(this) : '';
	});
});