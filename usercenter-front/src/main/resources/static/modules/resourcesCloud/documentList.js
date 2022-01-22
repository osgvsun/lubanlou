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
	layer.msg('进入表单');

	form.render(null, 'documentlistbox');

	//时间范围
	laydate.render({
		elem: '#time',
		type: 'date'
	});

	//执行一个表单
	table.render({
		elem: '#documentlist',
		url: layui.setter.base + 'modules/resourcesCloud/static/json/documentList.json', //数据接口
		title: '表单',
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
					type: 'checkbox',
					width: 30
				}, {
					field: 'imgurl',
					title: '类型',
					width: 73,
					align: 'center',
					sort: true,
					templet: function(d) {
						return '<div><img class="tabline_img" src="' + d.imgurl + '"/></div>';
					}
				}, {
					title: '名称',
					//toolbar: '#namebox',
					minWidth: 300,
					sort: true,
					templet: '<div class="tabline_info"><div class="tabline_info_tit">{{ d.name }}</div><div class="xs_hint">创建人：{{ d.uploader }}</div><div class="tabline_info_text">{{ d.info }}</div></div>'
				}, {
					field: 'time',
					title: '修改时间',
					width: 200,
					sort: true
				}, {
					field: 'size',
					title: '文档大小',
					width: 150,
					sort: true
				}
			]
		],
		id: 'documentlist',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(documentlist)', function(obj) {
		var data = obj.data;
	});
});