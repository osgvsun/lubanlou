layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table,
		layer = layui.layer;

	form.render(null, 'equipmenttrainingmanagebox');
	let status = $.cookie("status");
	console.log(status)
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
			location.href = 'equipmentAdmittanceMode?entityId=' + entityId + '&entityType=' + entityType;
		}
	}

	//打开新增培训管理
	var newequipmenttrainingmanage = {
		newequipmenttrainingmanage: function() {
			//layer.msg('新增培训');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增培训',
				area: ['500px', '515px'],
				shade: 0.5,
				maxmin: true,
				content: 'newEquipmentTrainingManage?entityId=' + entityId + '&entityType=' + entityType,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newequipmenttrainingmanagebtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newequipmenttrainingmanage').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newequipmenttrainingmanage[method] ? newequipmenttrainingmanage[method].call(this, othis) : '';
	});

	//打开查看期望培训
	var trainingdatelist = {
		trainingdatelist: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '查看期望培训',
				area: ['500px', '441px'],
				shade: 0.5,
				maxmin: true,
				content: 'trainingDateList?entityId=' + entityId + '&entityType=' + entityType
			});
			layer.full(index);
		}
	};
	$('.trainingdatelist').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		trainingdatelist[method] ? trainingdatelist[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#equipmenttrainingmanage',
		url: httpAccessUrl + '/getAccessEntityTraining', //数据接口
		where: {"entityId": entityId, "entityType": entityType},
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
					width: 50,
					fixed: 'left'
				}, {
					field: 'content',
					title: '培训内容',
					sort: true
				}, {
					field: 'address',
					title: '培训地点',
					sort: true
				}, {
					field: 'trainingDateTime',
					title: '培训时间',
					sort: true
				}, {
					field: 'advanceHour',
					title: '提前预约时间',
					minWidth: 130,
					sort: true,
					templet: function (d) {
						return d.advanceHour + '小时';
					}
				}, {
					field: 'teacher',
					title: '培训教师',
					sort: true
				}, {
					field: 'maxNumber',
					title: '报名人数/最大人数',
					minWidth: 165,
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 240
				}
			]
		],
		id: 'equipmenttrainingmanage',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(equipmenttrainingmanage)', function(obj) {
		var data = obj.data;
		//打开结果录入页面
		if(obj.event === 'detail') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '结果录入',
				area: ['500px', '441px'],
				shade: 0.5,
				maxmin: true,
				content: 'trainingDetailList?entityId=' + entityId + '&entityType=' + entityType,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#trainingdetaillistbtn");
					submit.click();
				}
			});
			layer.full(index);
		};
		if (obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '编辑培训',
				area: ['500px', '515px'],
				shade: 0.5,
				maxmin: true,
				content: 'newEquipmentTrainingManage?entityId=' + entityId + '&entityType=' + entityType + '&type=edit',
				zIndex: layer.zIndex //重点1
				,
				success: function(layero, index) {
					// layer.setTop(layero); //重点2
					let body = layer.getChildFrame('body', index);
					// let iframe = window['layui-layer-iframe' + index];
					$.each(data, function (item) {
						body.find('.' + item).val(data[item]);
					    form.render();
					})
					const iframe = window['layui-layer-iframe' + index];
					// iframe.child(childData)
					iframe.renderChildForm();
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newequipmenttrainingmanagebtn");
					submit.click();
				}
			});
		};
		if (obj.event === 'del') {
			layer.confirm('真的删除培训信息吗？', function (index) {
				$.ajax({
					url: httpAccessUrl + '/deleteAccessTraining?itemId=' + data.trainingId,
					type: 'POST',
					success: function (res) {
						console.log(res)
						// obj.del();

						layer.msg('删除成功');
						table.reload('equipmenttrainingmanage');
					}
				})
			})
		};
		// 发布
		if (obj.event === 'release') {
			console.log(data)
			layer.confirm('确认发布当前培训内容？', function (index) {
				let objData = {};
				objData.status = 1;
				objData.itemId = data.trainingId;
				objData.advanceHour = data.advanceHour;
				objData.trainingDate = data.trainingDate;
				objData.address = data.address;
				objData.teacher = data.teacher;
				objData.content = data.content;
				objData.maxNumber = data.maxNumber;

				$.ajax({
					url: httpAccessUrl + '/updateAccessTraining?' + $.param(objData),
					type: 'POST',
					success: function (res) {
						layer.msg('发布成功');
						table.reload('equipmenttrainingmanage');
					}
				})
			})
		}
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('equipmenttrainingmanage', {
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