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
	layer.msg('进入院级个人设置模板设置');

	form.render(null, 'personaltemplatesetbox');

	//打开新增模板
	var newpersonaltemplateset = {
		newpersonaltemplateset: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增模板',
				area: ['500px', '350px'],
				shade: 0.5,
				maxmin: true,
				content: 'equipmentReserve'
			});
			layer.full(index);
		}
	};
	$('.newpersonaltemplateset').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newpersonaltemplateset[method] ? newpersonaltemplateset[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#personaltemplateset',
		url: layui.setter.base + 'modules/openReservation/static/json/personalTemplateSet.json', //数据接口
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
					field: 'name',
					title: '模板名称',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 260
				}
			]
		],
		id: 'personaltemplateset',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(personaltemplateset)', function(obj) {
		var data = obj.data;
		//打开编辑
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑',
				area: ['500px', '180px'],
				shade: 0.5,
				maxmin: true,
				content: 'equipmentReserve'
			});
			layer.full(index);
		};
		//删除
		if(obj.event === 'del') {
			layer.confirm('是否删除？', {
				title: '提示'
			}, function(index) {
				obj.del();
				layer.close(index);
			});
		}
		//批量推送
		if(obj.event === 'send') {
			layer.msg('已批量推送！');
		};
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('personaltemplateset', {
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