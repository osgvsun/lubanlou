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
	//layer.msg('新建设备快速保养');

	form.render(null, 'newequipmentmaintenancebox');

	//保养开始日期
	laydate.render({
		elem: '#startdate',
		type: 'datetime'
	});
	//保养结束日期
	laydate.render({
		elem: '#enddate',
		type: 'datetime'
	});

	//监听提交
	form.on('submit(newequipmentmaintenance)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		//parent.layui.table.reload('projectinfo'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	//新建设备快速保养信息
	form.val('newequipmentmaintenancebox', {
		"": "" //
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
					title: '状态正常',
					width: 200,
					align: 'center',
					toolbar: '#state'
				}
			]
		],
		data: table,
		skin: 'line', //表格风格			
		even: true
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
					title: '用量(个)',
					width: 200,
					align: 'center',
					toolbar: '#materialnumber'
				}
			]
		],
		data: table,
		skin: 'line', //表格风格			
		even: true
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