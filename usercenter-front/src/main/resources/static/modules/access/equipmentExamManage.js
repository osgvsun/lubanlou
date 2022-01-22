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

	form.render(null, 'equipmentexammanagebox');

	let status = $.cookie("status");
	console.log(status)
	if (status) {
		status = status.split(",");
		if (status[0] === "true") {
			$('.exam').css("display", "inline-block");
		} else {
			location.href = 'equipmentAdmittanceMode?entityId=' + entityId + '&entityType=' + entityType;
		}
		if (status[2] === "true") {
			$('.training').css("display", "inline-block");
		} else {
			$('.training').css("display", "none");
		}
	}
	//打开新增题库
	var newcoursequestionbank = {
		newcoursequestionbank: function() {
			//layer.msg('新增题库');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增题库',
				area: ['500px', '350px'],
				shade: 0.5,
				maxmin: true,
				content: 'newcoursequestionbank.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newcoursequestionbankbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newcoursequestionbank').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newcoursequestionbank[method] ? newcoursequestionbank[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#coursequestionbank',
		url: layui.setter.base + 'json/courseQuestionBank.json', //数据接口						
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
					field: 'name',
					title: '题库名称',
					sort: true
				}, {
					field: 'person',
					title: '创建人',
					sort: true
				}, {
					field: 'time',
					title: '创建时间',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#banktoolbar',
					width: 150
				}
			]
		],
		id: 'coursequestionbank',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(coursequestionbank)', function(obj) {
		var data = obj.data;
		//打开设置页面
		if(obj.event === 'set') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '设置课程题库',
				area: ['500px', '441px'],
				shade: 0.5,
				maxmin: true,
				content: 'setCourseQuestionBank.html'
			});
			layer.full(index);
		};
		//打开编辑页面
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑课程题库',
				area: ['500px', '350px'],
				shade: 0.5,
				maxmin: true,
				content: 'editCourseQuestionBank.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#editcoursequestionbankbtn");
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
		bankactive = {
			reload: function() {
				var searchbox = $('#banksearchbox');

				//执行重载
				table.reload('coursequestionbank', {
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

	$('.search_line .banksearch').on('click', function() {
		var type = $(this).data('type');
		bankactive[type] ? bankactive[type].call(this) : '';
	});

	//打开新增考试
	var newexam = {
		newexam: function() {
			//layer.msg('新增考试');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增考试',
				area: ['500px', '441px'],
				shade: 0.5,
				maxmin: true,
				content: 'newexam.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['添加', '保存草稿', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newexambtn");
					submit.click();
				}
			});
			layer.full(index);
		}
	};
	$('.newexam').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newexam[method] ? newexam[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#examlist',
		url: layui.setter.base + 'json/examList.json', //数据接口						
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
					field: 'name',
					title: '考试名称',
					sort: true
				}, {
					field: 'state',
					title: '考试状态',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#examtoolbar',
					width: 600
				}
			]
		],
		id: 'examlist',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(examlist)', function(obj) {
		var data = obj.data;
		//打开考试成绩页面
		if(obj.event === 'score') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '考试成绩',
				area: ['500px', '441px'],
				shade: 0.5,
				maxmin: true,
				content: 'examScore.html'
			});
			layer.full(index);
		};
		//打开补考名单页面
		if(obj.event === 'list') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '补考名单',
				area: ['500px', '441px'],
				shade: 0.5,
				maxmin: true,
				content: 'makeupExamList.html'
			});
			layer.full(index);
		};
		//打开开始考试须知页面
		if(obj.event === 'startexam') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '考试须知',
				area: ['500px', '441px'],
				shade: 0.5,
				maxmin: true,
				content: 'startExam.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['开始考试'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#startexambtn");
					submit.click();
				}
			});
			//layer.full(index);
		};
		//打开查看页面
		if(obj.event === 'detail') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '查看考试详情',
				area: ['500px', '441px'],
				shade: 0.5,
				maxmin: true,
				content: 'examDetail.html'
			});
			layer.full(index);
		};
		//打开编辑页面
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑考试',
				area: ['500px', '441px'],
				shade: 0.5,
				maxmin: true,
				content: 'editExam.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#editexambtn");
					submit.click();
				}
			});
			layer.full(index);
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
		examactive = {
			reload: function() {
				var searchbox = $('#examsearchbox');

				//执行重载
				table.reload('examlist', {
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

	$('.search_line .examsearch').on('click', function() {
		var type = $(this).data('type');
		examactive[type] ? examactive[type].call(this) : '';
	});
});