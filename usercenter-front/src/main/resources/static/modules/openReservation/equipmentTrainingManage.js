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
	//实验室名字显示
	if (cookie.get("labRoomName")) {
		$("legend>span").text(cookie.get("labRoomName"));
	}
	//实验室面积、容量、管理员
	if (cookie.get("labRoomArea")) {
		$(".li_cell_box>.li_cell:eq(0)").append('面积: - ' + cookie.get("labRoomArea") + '㎡')
	}
	if (cookie.get("labRoomCapacity")) {
		$(".li_cell_box>.li_cell:eq(1)").append('容量: - ' + cookie.get("labRoomCapacity") + '人')
	}
	if (cookie.get("admins")) {
		$(".li_cell_box>.li_cell:eq(2)").append('管理员: - ' + cookie.get("admins"))
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
				area: ['500px', '530px'],
				shade: 0.5,
				maxmin: true,
				content: '../access/newEquipmentTrainingManage?entityId=' + labRoomId + '&entityType=' + configType,
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
				content: '../access/trainingDateList?entityId=' + labRoomId + '&entityType=' + configType
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
		url: accessHost + '/getAccessEntityTraining', //数据接口
		where: {"entityId": labRoomId, "entityType": configType},
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
				},  {
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
					width: 92
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
				content: '../access/trainingDetailList?entityId=' + labRoomId + '&entityType=' + configType,
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

//传递子页面锚
$(function() {
	$(".field_btn_box a").click(function() {
		var name = $(this).attr("name");
		top.location.hash = name; //设置锚点
	});
	$(".breadcrumb_top .breadcrumb_btn").click(function() {
		var name = $(this).attr("name");
		top.location.hash = name; //设置锚点
	});
	$(".layui-tab-title li a").click(function() {
		var name = $(this).attr("name");
		top.location.hash = name; //设置锚点
	});
});