layui.use(['laypage', 'layer', 'table', 'element', 'form'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form

	//向世界问个好
	layer.msg('进入权限详情');

	form.render(null, 'allauthoritybox');

	//执行一个表单
	table.render({
		elem: '#allauthority',
		url: layui.setter.base + 'json/allAuthority.json', //数据接口						
		title: '列表',
		toolbar: '#toolbars',
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
					field: 'tag',
					title: '标识',
					sort: true
				}, {
					field: 'name',
					title: '权限名称',
					sort: true
				}, {
					field: 'group',
					title: '所属权限组',
					sort: true
				}, {
					field: 'detail',
					title: '权限详细描述',
					sort: true
				}
			]
		],
		id: 'allauthority',
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
				table.reload('allauthority', {
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

//传递子页面锚
$(function() {
	$(".layui-tab-title a").click(function() {
		var name = $(this).attr("name");
		top.location.hash = name; //设置锚点
	})
});