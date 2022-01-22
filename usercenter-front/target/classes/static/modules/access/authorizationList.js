layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table,
		layer = layui.layer;

	let accessEntityId = 0;
	form.render(null, 'authorizationlistbox');

	$.ajax({
		url: httpAccessUrl + '/getAccessEntityConfig',
		type: 'GET',
		async: false,
		data: {"entityId": entityId, "entityType": entityType},
		success: function (res) {
			let status = [];
			if (res.code === 0) {
				let data = res.data
				accessEntityId = data[0].accessEntityId;
				$.cookie("accessEntityId", accessEntityId)
			}
		}
	})

	//打开新增授权名单
	var newauthorizationlist = {
		newauthorizationlist: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增授权名单',
				area: ['700px', '500px'],
				shade: 0.5,
				maxmin: true,
				content: 'newExamFreeList?entityId=' + entityId + '&entityType=' + entityType + '&flag=1' + '&parentTable=authorizationlist',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newexamfreelistbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newauthorizationlist').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newauthorizationlist[method] ? newauthorizationlist[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#authorizationlist',
		url: httpAccessUrl + '/getAccessAuthList', //数据接口
		where: {"entityId": entityId, "entityType": entityType, "accessEntityId": accessEntityId, "flag": 1},
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
					type: 'checkbox',
					width: 30
				}, {
					fixed: 'left',
					title: '序号',
					type: 'numbers',
					width: 40
				}, {
					field: 'username',
					title: '学号',
					sort: true
				}, {
					field: 'cname',
					title: '姓名',
					sort: true
				}, {
					field: 'college',
					title: '学院',
					sort: true
				},{
					field: 'datetime',
					title: '开始时间',
					sort: true
				},{
					field: 'endDateTime',
					title: '结束时间',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 80
				}
			]
		],
		id: 'authorizationlist',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(authorizationlist)', function(obj) {
		var data = obj.data;
		//删除
		if(obj.event === 'del') {
			layer.confirm('是否删除？', {
				title: '提示'
			}, function(index) {
				$.ajax({
					url: accessHost + '/deleteAccessAuth',
					type: 'POST',
					data: {"authId": data.id},
					success: function (res) {
						if (res.code === 0) {
							layer.close(index);
							layer.msg('删除成功');
							table.reload('authorizationlist');
						} else {
							layer.msg(res.msg);
						}
					}
				})
			});
		}
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('authorizationlist', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						key: {
							labname: searchbox.val()
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