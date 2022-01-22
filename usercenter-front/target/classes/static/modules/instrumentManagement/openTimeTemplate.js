layui.use(['form', 'element', 'table', 'layer'], function() {
	var $ = layui.jquery,
		form = layui.form,
		table = layui.table,
		layer = layui.layer;

	//向世界问个好
	//layer.msg('');

	form.render(null, 'opentimetemplatebox');

	//监听提交
	form.on('submit(opentimetemplatebtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('opentimetemplatebox'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	//信息
	form.val('opentimetemplatebox', {
		"": "" //备用
	});

	//执行一个表单
	table.render({
		elem: '#opentimetemplate',
		url: httpDeviceUrl + 'getMachineOpenTimes', //数据接口
		where: {"configMachineUid": configMachineUid},
		title: '列表',
		cellMinWidth: 100,
		page: false, //开启分页
		parseData: function (res) {
			return res;
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
					field: 'daterange',
					title: '已设置开放日期范围',
					minWidth: 180,
					sort: true
				}, {
					field: 'week',
					title: '开放星期',
					minWidth: 110,
					sort: true
				}, {
					field: 'timerange',
					title: '开放时间范围',
					minWidth: 160,
					sort: true
				}, {
					field: 'grade',
					title: '等级',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 80
				}
			]
		],
		id: 'opentimetemplate',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		// limit: Number.MAX_VALUE
	});

	//监听行工具事件
	table.on('tool(opentimetemplate)', function(obj) {
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
				table.reload('opentimetemplate', {
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