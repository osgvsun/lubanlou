layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate

	//向世界问个好
	layer.msg('进入信誉积分扣除');

	form.render(null, 'creditscoredeductbox');

	//执行一个表单
	table.render({
		elem: '#creditscorededuct',
		url: layui.setter.base + 'modules/openReservation/static/json/creditScoreDeduct.json', //数据接口
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
					width: 40
				}, {
					field: 'equipment',
					title: '设备名称(编号)',
					minWidth: 140,
					sort: true
				}, {
					field: 'info',
					title: '申请内容',
					sort: true
				}, {
					field: 'type',
					title: '预约类型',
					sort: true
				}, {
					field: 'manager',
					title: '设备管理员',
					minWidth: 145,
					sort: true
				}, {
					field: 'duration',
					title: '使用时间',
					sort: true
				}, {
					field: 'person',
					title: '申请人',
					sort: true
				}, {
					field: 'tel',
					title: '申请人联系电话',
					minWidth: 145,
					sort: true
				}, {
					field: 'amount',
					title: '实收金额',
					sort: true
				}, {
					field: 'teacher',
					title: '指导老师',
					sort: true
				}, {
					field: 'lab',
					title: '实验室',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 65
				}
			]
		],
		id: 'creditscorededuct',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(creditscorededuct)', function(obj) {
		var data = obj.data;
		//打开扣分
		if(obj.event === 'deduct') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '扣分',
				area: ['500px', '420px'],
				shade: 0.5,
				maxmin: true,
				content: 'creditScoreDeductDetail',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#creditscoredeductdetailbtn");
					submit.click();
				}
			});
			//layer.full(index);
		};
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('creditscorededuct', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						key: {
							name: searchbox.val()
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