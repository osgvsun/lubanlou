layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer'], function() {
	var $ = layui.jquery,
		form = layui.form,
		table = layui.table,
		layer = layui.layer;

	//基本信息渲染
	let basicInformation = JSON.parse(localStorage['basicInformation']);
	$('.deviceName').text(basicInformation.deviceName + '(' + basicInformation.schoolDevice + ')');
	$('.li_cell:eq(0)').append(basicInformation.devicePattern);
	$('.li_cell:eq(1)').append(basicInformation.lcCenterName + '(' + basicInformation.departmentNumber + ')');
	$('.li_cell:eq(2)').append(basicInformation.labRoomName);
	$('.li_cell:eq(3)').append(basicInformation.manufacturer);
	$('.li_cell:eq(4)').append(basicInformation.devicePrice + '元');

	form.render(null, 'noticemanagebox');

	let configUid = ''

	let data = getInstrumentConfig(uid);
	if (data.code === 0 && data.data !== null && data.data !== "") {
		configUid = data.data.uid;
		window.sessionStorage.removeItem('configUid');
		window.sessionStorage.setItem('configUid', configUid);
	}
	//信息
	form.val('noticemanagebox', {
		"": "" //备用
	});

	//打开新增仪器公告
	var newnoticemanage = {
		newnoticemanage: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增仪器公告',
				area: ['500px', '225px'],
				shade: 0.5,
				maxmin: true,
				content: 'newNoticeManage?uid=' + uid,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newnoticemanagebtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newnoticemanage').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newnoticemanage[method] ? newnoticemanage[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#noticemanage',
		url: httpDeviceUrl + 'getInstrumentNoticeList', //数据接口
		where: {"configUid": configUid},
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
					field: 'title',
					title: '公告名称',
					sort: true
				}, {
					field: 'content',
					title: '公告内容',
					sort: true
				}, {
					field: 'submitCname',
					title: '发布人',
					sort: true
				}, {
					field: 'submitTime',
					title: '发布时间',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 120
				}
			]
		],
		id: 'noticemanage',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(noticemanage)', function(obj) {
		let data = obj.data;
		console.log(data)
		//打开编辑仪器公告
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑仪器公告',
				area: ['500px', '225px'],
				shade: 0.5,
				maxmin: true,
				content: 'editNoticeManage',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero, index) {
					// layer.setTop(layero); //重点2
					let iframe = window['layui-layer-iframe' + index];
					iframe.child(data)
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#editnoticemanagebtn");
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
				$.ajax({
					url: httpDeviceUrl + 'delInstrumentNotice',
					type: 'POST',
					data: {"noticeUid": data.uid},
					success: function (res) {
						if (res.code === 0) {
							layer.msg("删除成功");
							obj.del();
							layer.close(index);
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
				table.reload('noticemanage', {
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