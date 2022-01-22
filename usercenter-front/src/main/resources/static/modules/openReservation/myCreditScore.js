layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table,
		layer = layui.layer;

	//向世界问个好
	layer.msg('进入我的信誉积分');

	form.render(null, 'mycreditscorebox');

	//信息
	form.val('mycreditscorebox', {
		"": "" //备用
	});

	//执行一个表单
	table.render({
		elem: '#mycreditscore',
		url: layui.setter.base + 'modules/openReservation/static/json/myCreditScore.json', //数据接口
		title: '列表',
		cellMinWidth: 100,
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
					field: 'equipment',
					title: '设备名称(编号)',
					minWidth: 140,
					sort: true
				}, {
					field: 'item',
					title: '扣分项目',
					sort: true
				}, {
					field: 'duration',
					title: '预约使用时间',
					minWidth: 130,
					sort: true
				}, {
					field: 'teacher',
					title: '导师',
					sort: true
				}, {
					field: 'deductscore',
					title: '扣分(分)',
					sort: true
				}, {
					field: 'creditscore',
					title: '现在信誉积分(分)',
					minWidth: 160,
					sort: true
				}
			]
		],
		id: 'mycreditscore',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('mycreditscore', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						key: {
							searchid: searchbox.val()
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