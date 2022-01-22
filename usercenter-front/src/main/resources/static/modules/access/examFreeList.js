layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table,
		layer = layui.layer;


	let accessEntityId = $.cookie("accessEntityId");
	let status = $.cookie("status");
	if (status) {
		status = status.split(",");
		if (status[0] === "true") {
			$('.exam').css("display", "inline-block");
		} else {
			$('.exam').css("display", "none");
		}
		if (status[2] === "true") {
			$('.training').css("display", "inline-block");
		} else {
			$('.training').css("display", "none");
		}
	}
	form.render(null, 'examfreelistbox');

	//信息
	form.val('examfreelistbox', {
		"": "" //备用
	});

	//打开新增免考试名单
	var newexamfreelist = {
		newexamfreelist: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增免考试名单',
				area: ['500px', '380px'],
				shade: 0.5,
				maxmin: true,
				content: 'newExamFreeList?entityId=' + entityId + '&entityType=' + entityType + '&flag=2' + '&parentTable=examfreelist',
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
	$('.newexamfreelist').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newexamfreelist[method] ? newexamfreelist[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#examfreelist',
		url: httpAccessUrl + '/getAccessAuthList', //数据接口
		where: {"entityId": entityId, "entityType": entityType, "accessEntityId": accessEntityId, "flag": 2},
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
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 80
				}
			]
		],
		id: 'examfreelist',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(examfreelist)', function(obj) {
		var data = obj.data;
		console.log(data)
		//删除
		if(obj.event === 'del') {
			layer.confirm('是否删除？', {
				title: '提示'
			}, function(index) {
				$.ajax({
					url: httpAccessUrl + '/deleteAccessAuth?authId=' + data.id,
					type: 'POST',
					success: function (res) {
						if (res.code === 0) {
							layer.close(index);
							layer.msg('删除成功');
							table.reload(parentData);
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
				table.reload('examfreelist', {
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