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

	form.render(null, 'blacklistbox');
	let accessEntityId = cookie.get("accessEntityId");
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
	let usernameSearch = searchUsername();
	//打开新增黑名单
	var newblacklist = {
		newblacklist: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增黑名单',
				area: ['500px', '500px'],
				shade: 0.5,
				maxmin: true,
				content: '../access/newExamFreeList?entityId=' + labRoomId + '&entityType=' + configType + '&flag=5' + '&parentTable=blacklist',
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
	$('.newblacklist').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newblacklist[method] ? newblacklist[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#blacklist',
		url: accessHost + '/getAccessAuthList', //数据接口
		where: {"entityId": labRoomId, "entityType": configType, "accessEntityId": accessEntityId, "flag": 5},
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
					field: 'reason',
					title: '拉黑原因',
					sort: true
				}, {
					field: 'datetime',
					title: '创建日期',
					sort: true
				}, {
					field: 'endDateTime',
					title: '拉黑天数',
					sort: true,
					templet: function (d) {
						return getDaysBetween(d.datetime, d.endDateTime);
					}
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 80
				}
			]
		],
		id: 'blacklist',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(blacklist)', function(obj) {
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
							table.reload('blacklist');
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
				var searchbox = usernameSearch.getValue('valueStr');
				//执行重载
				table.reload('blacklist', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						username: searchbox
					}
				}, 'data');
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});

	/*
	 *根据起止日期计算间隔天数
	 */
	function  getDaysBetween(startDate,endDate){
		var startDate = Date.parse(startDate);
		var endDate = Date.parse(endDate);
		var days=(endDate - startDate)/(1*24*60*60*1000);
		return  days;
	};
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