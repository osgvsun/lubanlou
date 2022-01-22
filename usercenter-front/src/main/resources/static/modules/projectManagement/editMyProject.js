layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer', 'formSelects', 'layedit', 'upload', 'util'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table,
		layer = layui.layer,
		formSelects = layui.formSelects,
		layedit = layui.layedit,
		upload = layui.upload,
		util = layui.util;

	//向世界问个好
	//layer.msg('');	

	//监听提交
	form.on('submit(editmyprojectbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('myproject'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	form.render(null, 'editmyprojectbox');

	//信息
	form.val('editmyprojectbox', {
		"name": "test1",
		"id": "test2",
		"lesson": 1,
		"term": 1,
		"subject": 1,
		"experimentalrequirement": 1,
		"labroom": 1,
		"classhour": "test3",
		"classsumhour": "test4",
		"lessonclasssumhour": "test5",
		"person": "test6",
		"team": "test7",
		"teammember": "test8",
		"type": 1,
		"kind": 1,
		"nature": 1,
		"experimenterkind": 1,
		"changestatus": 1,
		"openscope": 1,
		"awardlevel": 1,
		"major": 1,
		"lecturer": 1,
		"tutor": 1,
		"instructionname": "test9",
		"editor": "test10",
		"assessmentmethod": "test11",
		"classstart": 1,
		"experimentcontent": "test12",
		"preparation": "test13"
	});

	//多选	
	//formSelects.value('', [2, 3, 4], true); //多个举例
	formSelects.value('labroom', [1], true); //所属实验室
	formSelects.value('lecturer', [1], true); //主讲教师
	formSelects.value('tutor', [1], true); //辅导教师

	//打开添加材料
	var addmaterial = {
		addmaterial: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '添加材料',
				area: ['508px', '350px'],
				shade: 0.5,
				maxmin: true,
				content: 'addMaterial.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#addmaterialbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.addmaterial').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		addmaterial[method] ? addmaterial[method].call(this, othis) : '';
	});

	//执行一个材料使用表单
	table.render({
		elem: '#materialuse',
		url: layui.setter.base + 'json/myProjectMaterialUse.json', //数据接口
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
					field: 'num',
					title: '数量',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#materialtoolbar',
					width: 130
				}
			]
		],
		id: 'materialuse',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(materialuse)', function(obj) {
		var data = obj.data;
		//打开编辑材料使用页面
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑材料使用',
				area: ['508px', '350px'],
				shade: 0.5,
				maxmin: true,
				content: 'editMaterial.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['提交', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#editmaterialbtn");
					submit.click();
				}
			});
			//layer.full(index);
		};
		//删除
		if(obj.event === 'del') {
			layer.confirm('确定删除？', {
				title: '提示'
			}, function(index) {
				obj.del();
				layer.close(index);
			});
		}
	});

	//打开批量添加仪器设备
	var addequipment = {
		addequipment: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '批量添加仪器设备',
				area: ['508px', '350px'],
				shade: 0.5,
				maxmin: true,
				content: 'addEquipment.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#addequipmentbtn");
					submit.click();
				}
			});
			layer.full(index);
		}
	};
	$('.addequipment').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		addequipment[method] ? addequipment[method].call(this, othis) : '';
	});

	//执行一个仪器设备表单
	table.render({
		elem: '#equipment',
		url: layui.setter.base + 'json/myProjectEquipment.json', //数据接口
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
					field: 'id',
					title: '设备编号',
					sort: true
				}, {
					field: 'name',
					title: '设备名称',
					sort: true
				}, {
					field: 'lab',
					title: '所属实验室',
					width: 115,
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
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#equipmenttoolbar',
					width: 80
				}
			]
		],
		id: 'equipment',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(equipment)', function(obj) {
		var data = obj.data;
		//删除
		if(obj.event === 'del') {
			layer.confirm('确定删除？', {
				title: '提示'
			}, function(index) {
				obj.del();
				layer.close(index);
			});
		}
	});

	//打开上传附件
	var uploadenclosure = {
		uploadenclosure: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '上传附件',
				area: ['508px', '440px'],
				shade: 0.5,
				maxmin: true,
				content: 'uploadEnclosure.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#uploadenclosurebtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.uploadenclosure').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		uploadenclosure[method] ? uploadenclosure[method].call(this, othis) : '';
	});

	//执行一个上传附件表单
	table.render({
		elem: '#uploadenclosure',
		url: layui.setter.base + 'json/myProjectEnclosure.json', //数据接口
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
					toolbar: '#uploadenclosuretoolbar',
					width: 130
				}
			]
		],
		id: 'uploadenclosure',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(uploadenclosure)', function(obj) {
		var data = obj.data;
		//删除
		if(obj.event === 'del') {
			layer.confirm('确定删除？', {
				title: '提示'
			}, function(index) {
				obj.del();
				layer.close(index);
			});
		}
	});
});