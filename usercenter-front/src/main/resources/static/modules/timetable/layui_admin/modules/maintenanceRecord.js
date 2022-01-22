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
	layer.msg('进入设备保养记录');

	//执行设备保养记录列表表单
	table.render({
		elem: '#maintenancerecordlist',
		url: layui.setter.base + "json/maintenanceRecord.json", //数据接口						
		title: '设备保养记录列表',
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
					field: 'brand_img_url',
					title: '示意图',
					width: 103,
					align: 'center',
					sort: true,
					templet: function(d) {
						return '<div><img class="table_img" src="' + d.brand_img_url + '"/></div>';
					}
				}, {
					fixed: 'left',
					field: 'info',
					title: '基础信息',
					minWidth: 150,
					sort: true,
					templet: '<div><b>{{ d.info }}</b><div>设备管理员：{{ d.manager }}</div><div>所在房间：{{ d.room }}</div></div>'
				},
				//以下两部分信息综合于设备信息中展示，设备信息中仅获取字段
				/*{
					field: 'manager',
					title: '设备管理员',
					minWidth: 100,
					sort: true
				}, {
					field: 'room',
					title: '所在房间',
					minWidth: 100,
					sort: true
				}, */
				{
					field: 'startdate',
					title: '保养开始日期',
					minWidth: 120,
					sort: true
				}, {
					field: 'enddate',
					title: '保养结束日期',
					minWidth: 120,
					sort: true
				}, {
					field: 'duration',
					title: '保养用时',
					minWidth: 120,
					sort: true
				}, {
					field: 'oddnumber',
					title: '保养单号',
					minWidth: 120,
					sort: true
				}, {
					field: 'person',
					title: '保养人员',
					minWidth: 100,
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					width: 100,
					align: 'center',
					toolbar: '#operation'
				}
			]
		],
		data: table,
		skin: 'line', //表格风格			
		even: true,
		id: 'maintenancerecordlist',
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
				table.reload('maintenancerecordlist', {
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
	table.on('tool(maintenancerecordlist)', function(obj) { //注：tool是工具条事件名，maintenancerecordlist 是 table 原始容器的属性 lay-filter="对应的值"
		var data = obj.data //获得当前行数据
			,
			layEvent = obj.event; //获得 lay-event 对应的值
		/*if(layEvent === 'reportdetail') {
			layer.msg('查看提交内容详情');
		};*/

		//打开查看设备保养记录记录详情
		if(obj.event === 'detail') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '查看设备保养记录详情',
				area: ['390px', '260px'],
				shade: 0.3,
				maxmin: true,
				content: 'maintenanceRecordDetail.html'
			});
			layer.full(index);
		};
	});
});