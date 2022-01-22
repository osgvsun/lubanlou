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
	layer.msg('进入实验室禁用时间段');

	form.render(null, 'noreservationlabbox');

	//执行一个表单
	table.render({
		elem: '#noreservationlab',
		url: layui.setter.base + 'json/noReservationLab.json', //数据接口						
		title: '实验室禁用时间段',
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
					field: 'term',
					title: '学期',
					sort: true
				}, {
					field: 'week',
					title: '周次',
					sort: true
				}, {
					field: 'class',
					title: '节次',
					sort: true
				}, {
					field: 'day',
					title: '星期',
					sort: true
				}, {
					field: 'type',
					title: '类型',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 65
				}
			]
		],
		id: 'noreservationlab',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(noreservationlab)', function(obj) {
		var data = obj.data;

		//删除
		if(obj.event === 'del') {
			layer.confirm('是否删除？', {
				title: '提示'
			}, function(index) {
				obj.del();
				layer.close(index);
			});
		}
	});

	//打开添加实验室禁用时间段
	var addnoreservationlab = {
		addnoreservationlab: function() {
			//layer.msg('添加实验室禁用时间段');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '添加实验室禁用时间段',
				area: ['600px', '500px'],
				shade: 0.5,
				maxmin: true,
				content: 'addNoReservationLab',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['添加', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#addnoreservationlabbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.addnoreservationlab').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		addnoreservationlab[method] ? addnoreservationlab[method].call(this, othis) : '';
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('noreservationlab', {
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