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
	//layer.msg('');

	form.render(null, 'transmissionlistbox');

	//信息
	form.val('transmissionlistbox', {
		"": "" //备用
	});

	//执行表单
	table.render({
		elem: '#transmissionlisttab',
		url: layui.setter.base + "modules/resourcesCloud/static/json/transmissionList.json", //数据接口
		title: '表单',
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			curr: 1, //设定初始在第 5 页				
			groups: 1, //只显示 1 个连续页码				
			first: false, //不显示首页				
			last: false //不显示尾页
		},
		cols: [
			[ //表头
				{
					fixed: 'left',
					title: '序号',
					width: 50,
					align: 'center',
					type: 'numbers'
				}, {
					field: 'name',
					title: '文件名称',
					minWidth: 100,
					sort: true
				}, {
					field: 'type',
					title: '类型',
					minWidth: 100,
					sort: true
				}, {
					field: 'percent',
					title: '进度',
					minWidth: 100,
					sort: true
				}, {
					title: '操作',
					width: 150,
					align: 'center',
					toolbar: '#toolbar'
				}
			]
		],
		data: table,
		skin: 'line', //表格风格			
		even: true,
		id: 'transmissionlisttab'
	});

	//监听行工具事件
	table.on('tool(transmissionlisttab)', function(obj) {
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
});