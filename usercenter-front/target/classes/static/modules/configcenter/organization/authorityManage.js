layui.use(['laypage', 'layer', 'table', 'element', 'form'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form

	//向世界问个好
	layer.msg('进入权限管理');

	form.render(null, 'authoritymanagebox');

	//打开新增角色
	var newcharacter = {
		newcharacter: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增角色',
				area: ['582px', '488px'],
				shade: 0.5,
				maxmin: true,
				content: 'newCharacter.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newcharacterbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newcharacter').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newcharacter[method] ? newcharacter[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#authoritymanage',
		url: layui.setter.base + 'json/authorityManage.json', //数据接口						
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
					field: 'name',
					title: '角色名称',
					sort: true
				}, {
					field: 'authority',
					title: '权限级别',
					sort: true
				}, {
					field: 'group',
					title: '所属权限组',
					sort: true
				}, {
					field: 'person',
					title: '人员',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 110
				}
			]
		],
		id: 'authoritymanage',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(authoritymanage)', function(obj) {
		var data = obj.data;

		//打开编辑页面
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑字段',
				area: ['582px', '488px'],
				shade: 0.5,
				maxmin: true,
				content: 'editCharacter.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#editcharacterbtn");
					submit.click();
				}
			});
			//layer.full(index);
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
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('authoritymanage', {
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