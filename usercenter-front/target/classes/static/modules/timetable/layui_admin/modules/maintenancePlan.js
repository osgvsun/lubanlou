layui.use(['index', 'form', 'laypage', 'layer', 'table', 'element'], function() {
	var $ = layui.$,
		admin = layui.admin,
		element = layui.element,
		layer = layui.layer,
		form = layui.form,
		laypage = layui.laypage,
		table = layui.table,
		element = layui.element;

	//向世界问个好
	layer.msg('进入设备保养计划');

	//执行设备保养计划列表表单
	table.render({
		elem: '#maintenanceplanlist',
		url: layui.setter.base + "json/maintenancePlan.json", //数据接口						
		title: '设备保养计划列表',
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			curr: 1, //设定初始在第 5 页				
			groups: 1, //只显示 1 个连续页码				
			first: false, //不显示首页				
			last: false //不显示尾页
		},
		cols: [
			[ //表头
				{
					fixed: 'left',
					field: 'name',
					title: '保养名称',
					minWidth: 160,
					sort: true
				},
				{
					field: 'state',
					title: '状态',
					minWidth: 80,
					sort: true
				}, {
					field: 'lastdate',
					title: '上次保养日期',
					minWidth: 160,
					sort: true
				}, {
					field: 'nextdate',
					title: '下次计划保养日期',
					minWidth: 160,
					sort: true
				}, {
					field: 'loop',
					title: '循环方式',
					minWidth: 80,
					sort: true
				}, {
					field: 'add',
					title: '联系方式',
					minWidth: 220,
					sort: true,
					templet: '<div><div>保养单位：{{ d.add }}</div><div>保养人员：{{ d.person }}</div><div>联系电话：{{ d.tel }}</div></div>'

				},
				/*{
									field: 'person',
									title: '保养人员',
									minWidth: 100,
									sort: true
								},{
									field: 'tel',
									title: '联系电话',
									minWidth: 100,
									sort: true
								},*/
				{
					fixed: 'right',
					title: '操作',
					width: 160,
					align: 'center',
					toolbar: '#operation'
				}
			]
		],
		data: table,
		skin: 'line', //表格风格			
		even: true,
		id: 'maintenanceplanlist',
		page: true,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//搜索
	var $ = layui.$,
		active = {
			reload: function() {
				var search_box = $('#search_box');

				//执行重载
				table.reload('maintenanceplanlist', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						key: {
							studentname: search_box.val()
						}
					}
				}, 'data');
			}
		};

	$('.tabsearch .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});

	//监听行工具事件
	table.on('tool(maintenanceplanlist)', function(obj) { //注：tool是工具条事件名，maintenanceplanlist 是 table 原始容器的属性 lay-filter="对应的值"
		var data = obj.data //获得当前行数据
			,
			layEvent = obj.event; //获得 lay-event 对应的值
		/*if(layEvent === 'reportdetail') {
			layer.msg('查看提交内容详情');
		};*/

		//打开编辑设备保养计划
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑设备保养计划',
				area: ['390px', '260px'],
				shade: 0.3,
				maxmin: true,
				content: 'editMaintenancePlan.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#editmaintenanceplan");
					submit.click();
				}
			});
			layer.full(index);
		};
		$('.editmaintenanceplan').on('click', function() {
			var othis = $(this),
				method = othis.data('method');
			editmaintenanceplan[method] ? editmaintenanceplan[method].call(this, othis) : '';
		});
	});

	//打开新建设备保养计划页面
	var newmaintenanceplan = {
		newmaintenanceplan: function() {
			layer.msg('新建设备保养计划');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新建设备保养计划',
				area: ['390px', '260px'],
				shade: 0.3,
				maxmin: true,
				content: 'newMaintenancePlan.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newmaintenanceplan");
					submit.click();
				}
			});
			layer.full(index);
		}
	};
	$('.newmaintenanceplan').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newmaintenanceplan[method] ? newmaintenanceplan[method].call(this, othis) : '';
	});
});