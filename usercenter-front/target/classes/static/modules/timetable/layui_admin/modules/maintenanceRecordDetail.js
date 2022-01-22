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
	//layer.msg('设备保养记录详情');

	form.render(null, 'maintenancerecorddetailbox');

	//保养开始日期
	laydate.render({
		elem: '#startdate'
	});
	//保养结束日期
	laydate.render({
		elem: '#enddate'
	});

	//监听提交
	form.on('submit(maintenancerecorddetail)', function(data) {
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
	form.val('maintenancerecorddetailbox', {
		"company": "test1", //保养单位
		"person": "test2", //保养人员姓名
		"tel": "test3", //人员联系方式
		"day": "test4", //提醒时间(天)
		"startdate": "test5", //保养开始日期
		"enddate": "test6", //保养结束日期
		"loopmode": "test7", //保养循环方式
		"loopperiod": "test8", //循环周期
		"maintenance": "test9", //保养名称
		"liable": "test10" //保养责任人
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
				}
			]
		],
		data: table,
		skin: 'line', //表格风格			
		even: true,
		id: 'maintenancedetail'
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
				}
			]
		],
		data: table,
		skin: 'line', //表格风格			
		even: true,
		id: 'maintenanceinfo'
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
				}
			]
		],
		data: table,
		skin: 'line', //表格风格			
		even: true,
		id: 'consumablematerial'
	});
});