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
	//layer.msg('');

	form.render(null, 'equipmentsamplechargebox');

	//基本信息渲染
	let basicInformation = JSON.parse(localStorage['basicInformation']);
	$('.deviceName').text(basicInformation.deviceName + '(' + basicInformation.schoolDevice + ')');
	$('.li_cell:eq(0)').append(basicInformation.devicePattern);
	$('.li_cell:eq(1)').append(basicInformation.lcCenterName + '(' + basicInformation.departmentNumber + ')');
	$('.li_cell:eq(2)').append(basicInformation.labRoomName);
	$('.li_cell:eq(3)').append(basicInformation.manufacturer);
	$('.li_cell:eq(4)').append(basicInformation.devicePrice + '元');

	let configSpecimenUid = window.sessionStorage.getItem("configSpecimenUid");
	//监听提交
	form.on('submit(equipmentsamplechargebtn)', function(data) {
		var field = data.field; //获取提交的字段

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('equipmentsamplechargebox'); //重载表格
		layer.msg('已保存');
	});

	//信息
	form.val('equipmentsamplechargebox', {
		"": "" //备用
	});

	//打开新增附加收费
	var newsampleextracharge = {
		newsampleextracharge: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增附加收费',
				area: ['500px', '324px'],
				shade: 0.5,
				maxmin: true,
				content: 'newSampleExtraCharge',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newsampleextrachargebtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newsampleextracharge').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newsampleextracharge[method] ? newsampleextracharge[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#sampleextracharge',
		url: httpDeviceUrl + 'getSpecimenAppAdditionalCharges', //数据接口
		where: {"configSpecimenUid": configSpecimenUid},
		title: '列表',
		cellMinWidth: 100,
		page: false, //开启分页
		limit: 1000,
		cols: [
			[ //表头
				{
					fixed: 'left',
					title: '序号',
					type: 'numbers',
					width: 50
				}, {
					field: 'name',
					title: '收费项目',
					sort: true
				}, {
					field: 'price',
					title: '价格(元)',
					sort: true
				}, {
					field: 'info',
					title: '备注',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 80
				}
			]
		],
		id: 'sampleextracharge',
		data: table,
		skin: 'line', //表格风格			
		even: false
	});

	//监听行工具事件
	table.on('tool(sampleextracharge)', function(obj) {
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

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('sampleextracharge', {
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