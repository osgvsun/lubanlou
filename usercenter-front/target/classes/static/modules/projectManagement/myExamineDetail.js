layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer', 'layedit', 'upload', 'util'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table,
		layer = layui.layer,
		layedit = layui.layedit,
		upload = layui.upload,
		util = layui.util;

	//向世界问个好
	//layer.msg('');	

	form.render(null, 'myexaminedetailbox');

	//信息
	form.val('myexaminedetailbox', {
		"name": "test1",
		"state": "test2",
		"lesson": "test3",
		"term": "test4",
		"subject": "test5",
		"experimentalrequirement": "test6",
		"labroom": "test7",
		"classhour": "test8",
		"classsumhour": "test9",
		"lessonclasssumhour": "test10",
		"person": "test11",
		"team": "test12",
		"teammember": "test13",
		"type": "test14",
		"kind": "test15",
		"nature": "test16",
		"experimenterkind": "test17",
		"changestatus": "test18",
		"openscope": "test19",
		"awardlevel": "test20",
		"major": "test21",
		"lecturer": "test22",
		"tutor": "test23",
		"instructionname": "test24",
		"editor": "test25",
		"assessmentmethod": "test26",
		"classstart": "test27",
		"experimentcontent": "test28",
		"preparation": "test29"
	});

	//执行一个材料使用表单
	table.render({
		elem: '#materialusedetail',
		url: layui.setter.base + 'json/myExamineDetailMaterialUse.json', //数据接口
		title: '列表',
		cellMinWidth: 90,
		page: true, //开启分页			
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
					field: 'name',
					title: '物资名称',
					sort: true
				}, {
					field: 'type',
					title: '物资类型',
					sort: true
				}, {
					field: 'model',
					title: '型号\规格',
					width: 115,
					sort: true
				}, {
					field: 'unit',
					title: '单位',
					sort: true
				}, {
					field: 'num',
					title: '数量',
					sort: true
				}, {
					field: 'amount',
					title: '金额',
					sort: true
				}
			]
		],
		id: 'materialusedetail',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//执行一个仪器设备表单
	table.render({
		elem: '#equipmentdetail',
		url: layui.setter.base + 'json/myExamineDetailEquipment.json', //数据接口
		title: '列表',
		cellMinWidth: 90,
		page: true, //开启分页			
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
					field: 'type',
					title: '类型',
					sort: true
				}, {
					field: 'id',
					title: '设备编号',
					sort: true
				}, {
					field: 'name',
					title: '设备名称',
					sort: true
				}, {
					field: 'spec',
					title: '规格',
					sort: true
				}, {
					field: 'model',
					title: '型号',
					sort: true
				}, {
					field: 'unitprice',
					title: '单价',
					sort: true
				}
			]
		],
		id: 'equipmentdetail',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//执行一个查看附件表单
	table.render({
		elem: '#enclosuredetail',
		url: layui.setter.base + 'json/myExamineDetailEnclosure.json', //数据接口
		title: '列表',
		cellMinWidth: 90,
		page: true, //开启分页			
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
					field: 'name',
					title: '附件名称',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#enclosuredetailtoolbar',
					width: 80
				}
			]
		],
		id: 'enclosuredetail',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});
});