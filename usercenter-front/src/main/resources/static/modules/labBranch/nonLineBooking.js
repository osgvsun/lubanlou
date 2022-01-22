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
	layer.msg('进入非线编预约');

	form.render(null, 'nonlinebookingbox');

	//执行一个表单
	table.render({
		elem: '#nonlinebooking',
		url: layui.setter.base + 'json/nonLineBooking.json', //数据接口						
		title: '非线编预约',
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
					width: 40
				}, {
					field: 'number',
					title: '镜像编号',
					sort: true
				}, {
					field: 'name',
					title: '镜像名称',
					sort: true
				}, {
					field: 'link',
					title: '硬件链接',
					sort: true
				}, {
					field: 'pic',
					title: '图片编号',
					sort: true
				}, {
					field: 'supplier',
					title: '供应商',
					sort: true
				}, {
					field: 'remark',
					title: '备注',
					sort: true
				}, {
					field: 'record',
					title: '预约记录',
					sort: true
				}
			]
		],
		id: 'nonlinebooking',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(nonlinebooking)', function(obj) {
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

	//打开添加非线编预约
	var addnonlinebooking = {
		addnonlinebooking: function() {
			//layer.msg('添加非线编预约');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '添加非线编预约',
				area: ['600px', '540px'],
				shade: 0.5,
				maxmin: true,
				content: 'addNonLineBooking',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['添加', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#addnonlinebookingbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.addnonlinebooking').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		addnonlinebooking[method] ? addnonlinebooking[method].call(this, othis) : '';
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('nonlinebooking', {
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