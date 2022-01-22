layui.use(['index', 'form', 'laypage', 'laydate', 'layer', 'table', 'element'], function() {
	var $ = layui.$,
		admin = layui.admin,
		element = layui.element,
		layer = layui.layer,
		form = layui.form,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table;

	//向世界问个好
	layer.msg('进入设备保养耗材统计');

	form.render(null, 'statisticbox');

	//保养日期
	laydate.render({
		elem: '#statisticdate',
		range: true
	});

	//执行设备保养耗材统计列表表单
	table.render({
		elem: '#maintenanceStatisticlist',
		url: layui.setter.base + "json/maintenanceStatistic.json", //数据接口						
		title: '设备保养耗材统计列表',
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
					type: 'numbers'
				},
				{
					field: 'cas',
					title: 'CAS号',
					minWidth: 100,
					sort: true
				}, {
					field: 'type',
					title: '物资类别',
					minWidth: 120,
					sort: true
				}, {
					field: 'name',
					title: '物品名称',
					minWidth: 120,
					sort: true
				}, {
					field: 'model',
					title: '型号及规格',
					minWidth: 120,
					sort: true
				}, {
					field: 'price',
					title: '参考单价',
					minWidth: 100,
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					width: 120,
					align: 'center',
					toolbar: '#operation'
				}
			]
		],
		data: table,
		skin: 'line', //表格风格			
		even: true,
		id: 'maintenanceStatisticlist',
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
				table.reload('maintenanceStatisticlist', {
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
	table.on('tool(maintenanceStatisticlist)', function(obj) { //注：tool是工具条事件名，maintenanceStatisticlist 是 table 原始容器的属性 lay-filter="对应的值"
		var data = obj.data //获得当前行数据
			,
			layEvent = obj.event; //获得 lay-event 对应的值
		/*if(layEvent === 'reportdetail') {
			layer.msg('查看提交内容详情');
		};*/

		//打开查看详情
		if(obj.event === 'detail') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '查看设备保养耗材统计',
				area: ['390px', '260px'],
				shade: 0.3,
				maxmin: true,
				content: ''
			});
			layer.full(index);
		};

		//打开编辑详情
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑设备保养耗材统计',
				area: ['390px', '260px'],
				shade: 0.3,
				maxmin: true,
				content: ''
			});
			layer.full(index);
		};
	});

	//新建设备快速保养页面
	var newmaintenanceStatistic = {
		newmaintenanceStatistic: function() {
			layer.msg('新建设备快速保养');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新建设备快速保养',
				area: ['390px', '260px'],
				shade: 0.3,
				maxmin: true,
				content: 'newmaintenanceStatistic.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newmaintenanceStatistic");
					submit.click();
				}
			});
			layer.full(index);
		}
	};
	$('.newmaintenanceStatistic').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newmaintenanceStatistic[method] ? newmaintenanceStatistic[method].call(this, othis) : '';
	});
});