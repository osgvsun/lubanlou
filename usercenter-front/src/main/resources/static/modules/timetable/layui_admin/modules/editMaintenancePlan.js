layui.use(['index', 'form', 'laydate', 'upload', 'laypage', 'layer', 'table', 'element'], function() {
	var $ = layui.$,
		admin = layui.admin,
		element = layui.element,
		layer = layui.layer,
		laydate = layui.laydate,
		form = layui.form,
		upload = layui.upload,
		laypage = layui.laypage,
		table = layui.table;

	//向世界问个好
	//layer.msg('编辑设备保养计划');

	form.render(null, 'editmaintenanceplanbox');

	//保养开始日期
	laydate.render({
		elem: '#startdate',
		value: '2019-09-30'
	});
	//保养结束日期
	laydate.render({
		elem: '#enddate',
		value: '2019-09-30'
	});

	//监听提交
	form.on('submit(editmaintenanceplan)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		//parent.layui.table.reload('projectinfo'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	form.on('radio(statenormal)', function(data) {
		//alert(data.elem);
		//console.log(data.elem);
		//alert(data.value);//判断单选框的选中值
		var abc = data.value;
		if(abc == "多次") {
			$(".loop_box").show();
			//$("#nt").val("1");
			//$("#nf").val("");
			//alert($("#nt").val());
		} else {
			$(".loop_box").hide();
			//$("#nt").val("1");
			//$("#nf").val("");
			//alert($("#nf").val());
		}

		//console.log(data.value);
		//alert(data.othis);
		//layer.tips('开关checked：' + (this.checked ? 'true' : 'false'), data.othis);
		//layer.alert('响应点击事件');
	});

	//添加设备保养计划信息
	form.val('editmaintenanceplanbox', {
		"company": "test1", //保养单位
		"person": "test2", //保养人员姓名
		"tel": "test3", //人员联系方式
		"day": "4", //提醒时间(天)
		"loopperiod": "5", //循环周期
		"maintenance": "test6", //保养名称
		"liable": "test7" //保养责任人
	});

	//执行设备保养信息表单
	table.render({
		elem: '#maintenancedetail',
		url: layui.setter.base + "json/maintenancedetail.json", //数据接口						
		title: '设备保养信息',
		cols: [
			[ //表头
				{
					fixed: 'left',
					type: 'numbers'
				}, {
					field: 'name',
					title: '设备名称(设备编号)',
					minWidth: 100,
					sort: true,
					templet: '<div>{{ d.name }}({{ d.idnumber }})</div>'

				},
				//以下部分信息综合于设备名称中展示，设备编号中仅获取字段
				/*{
					field: 'idnumber',
					title: '设备编号',
					minWidth: 100,
					sort: true
				}, */
				{
					field: 'model',
					title: '规格型号',
					minWidth: 100,
					sort: true
				}, {
					field: 'person',
					title: '设备管理员',
					minWidth: 100,
					sort: true
				}, {
					field: 'department',
					title: '所属部门',
					minWidth: 100,
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					width: 100,
					align: 'center',
					toolbar: '#detialoperation'
				}
			]
		],
		data: table,
		skin: 'line', //表格风格			
		even: true,
		id: 'maintenancedetail'
	});

	//监听设备保养信息表单行工具事件
	table.on('tool(maintenancedetail)', function(obj) { //注：tool是工具条事件名，equipmentmaintenancelist 是 table 原始容器的属性 lay-filter="对应的值"
		var data = obj.data //获得当前行数据
			,
			layEvent = obj.event; //获得 lay-event 对应的值
		if(obj.event === 'del') {
			layer.confirm('真的删除行么', function(index) {
				obj.del();
				layer.close(index);
			});
		}
	});

	//执行设备保养内容表单
	table.render({
		elem: '#maintenanceinfo',
		url: layui.setter.base + "json/maintenanceinfo.json", //数据接口						
		title: '设备保养内容',
		cols: [
			[ //表头
				{
					fixed: 'left',
					type: 'numbers'
				}, {
					field: 'info',
					title: '保养内容',
					minWidth: 100,
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					width: 120,
					align: 'center',
					toolbar: '#infooperation'
				}
			]
		],
		data: table,
		skin: 'line', //表格风格			
		even: true,
		id: 'maintenanceinfo'
	});

	//监听设备保养内容表单行工具事件
	table.on('tool(maintenanceinfo)', function(obj) { //注：tool是工具条事件名，equipmentmaintenancelist 是 table 原始容器的属性 lay-filter="对应的值"
		var data = obj.data //获得当前行数据
			,
			layEvent = obj.event; //获得 lay-event 对应的值
		if(obj.event === 'del') {
			layer.confirm('真的删除行么', function(index) {
				obj.del();
				layer.close(index);
			});
		} else if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑设备保养内容',
				area: ['390px', '225px'],
				shade: 0.3,
				maxmin: true,
				content: 'editMaintenanceInfo.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#editmaintenanceinfo");
					submit.click();
				}
			});
			//layer.full(index);
		}
		$('.editmaintenanceinfo').on('click', function() {
			var othis = $(this),
				method = othis.data('method');
			editMaintenanceInfo[method] ? editMaintenanceInfo[method].call(this, othis) : '';
		});
	});

	//执行设备保养所需耗材表单
	table.render({
		elem: '#consumablematerial',
		url: layui.setter.base + "json/consumablematerial.json", //数据接口						
		title: '设备保养所需耗材',
		cols: [
			[ //表头
				{
					fixed: 'left',
					type: 'numbers'
				}, {
					field: 'type',
					title: '耗材品类',
					minWidth: 100,
					sort: true
				}, {
					field: 'use',
					title: '耗材用途',
					minWidth: 100,
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					width: 100,
					align: 'center',
					toolbar: '#materialoperation'
				}
			]
		],
		data: table,
		skin: 'line', //表格风格			
		even: true,
		id: 'consumablematerial'
	});

	//监听设备保养所需耗材表单行工具事件
	table.on('tool(consumablematerial)', function(obj) { //注：tool是工具条事件名，equipmentmaintenancelist 是 table 原始容器的属性 lay-filter="对应的值"
		var data = obj.data //获得当前行数据
			,
			layEvent = obj.event; //获得 lay-event 对应的值
		if(obj.event === 'del') {
			layer.confirm('真的删除行么', function(index) {
				obj.del();
				layer.close(index);
			});
		}
	});

	//添加设备保养信息页面
	var newequipmentdetail = {
		newequipmentdetail: function() {
			layer.msg('添加设备保养信息');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '添加设备保养信息',
				area: ['730px', '470px'],
				shade: 0.3,
				maxmin: true,
				content: 'newEquipmentDetail.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['添加', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newequipmentdetail");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newequipmentdetail').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newequipmentdetail[method] ? newequipmentdetail[method].call(this, othis) : '';
	});

	//添加设备保养内容页面
	var newmaintenanceinfo = {
		newmaintenanceinfo: function() {
			layer.msg('添加设备保养内容');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '添加设备保养内容',
				area: ['390px', '225px'],
				shade: 0.3,
				maxmin: true,
				content: 'newMaintenanceInfo.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['添加', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newmaintenanceinfo");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newmaintenanceinfo').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newmaintenanceinfo[method] ? newmaintenanceinfo[method].call(this, othis) : '';
	});

	//添加设备保养所需耗材页面
	var newconsumablematerial = {
		newconsumablematerial: function() {
			layer.msg('添加设备保养所需耗材');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '添加设备保养所需耗材',
				area: ['500px', '470px'],
				shade: 0.3,
				maxmin: true,
				content: 'newConsumableMaterial.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['添加', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newconsumablematerial");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newconsumablematerial').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newconsumablematerial[method] ? newconsumablematerial[method].call(this, othis) : '';
	});
});