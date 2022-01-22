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
	layer.msg('进入中心自行设置项(信誉积分设置)');

	form.render(null, 'creditscoresetbox');

	//信息
	form.val('creditscoresetbox', {
		"": "" //备用
	});

	//打开新增中心自行设置项
	var newcreditscoreset = {
		newcreditscoreset: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增中心自行设置项',
				area: ['515px', '455px'],
				shade: 0.5,
				maxmin: true,
				content: 'newCreditScoreSet',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newcreditscoresetbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newcreditscoreset').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newcreditscoreset[method] ? newcreditscoreset[method].call(this, othis) : '';
	});

	//打开信誉积分设置
	var creditscoretype = {
		creditscoretype: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '信誉积分设置',
				area: ['500px', '220px'],
				shade: 0.5,
				maxmin: true,
				content: 'creditScoreType',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#creditscoretypebtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.creditscoretype').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		creditscoretype[method] ? creditscoretype[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#creditscoreset',
		url: layui.setter.base + 'modules/openReservation/static/json/creditScoreSet.json', //数据接口
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
					field: 'state',
					title: '信誉积分项',
					sort: true
				}, {
					field: 'score',
					title: '所扣分数',
					sort: true
				}, {
					field: 'center',
					title: '所属中心',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 120
				}
			]
		],
		id: 'creditscoreset',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(creditscoreset)', function(obj) {
		var data = obj.data;
		//打开编辑中心自行设置项
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑中心自行设置项',
				area: ['514px', '455px'],
				shade: 0.5,
				maxmin: true,
				content: 'editCreditScoreSet',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#editcreditscoresetbtn");
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
				table.reload('creditscoreset', {
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