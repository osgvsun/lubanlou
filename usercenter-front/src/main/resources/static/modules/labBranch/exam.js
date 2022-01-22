layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate

	//向世界问个好
	layer.msg('进入考试管理');

	form.render(null, 'exambox');
	// console.log(new Date('2016-01-05T06:32:32.000+00:00'))
	function renderTime(date) {
		var dateee = new Date(date).toJSON();
		return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
	}
	console.log(labRoomId)
	//执行题库管理
	table.render({
		elem: '#subjecttab',
		url: timetableHost + '/api/labroom/getConfigQuestionList', //数据接口
		where: {"labRoomId": labRoomId},
		title: '题库管理',
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			curr: 1, //设定初始在第 5 页				
			groups: 1, //只显示 1 个连续页码				
			first: false, //不显示首页				
			last: false //不显示尾页
		},
		parseData: function(res){ //res 即为原始返回的数据
			return {
				"code": res.code, //解析接口状态
				"msg": res.msg, //解析提示文本
				"count": res.data.total, //解析数据长度
				"data": res.data.records //解析数据列表
			};
		},
		cols: [
			[ //表头
				{
					fixed: 'left',
					title: '序号',
					width: 50,
					align: 'center',
					type: 'numbers'
				}, {
					field: 'questionName',
					title: '题库名称',
					minWidth: 100,
					sort: true
				}, {
					field: 'cname',
					title: '创建人',
					minWidth: 100,
					sort: true
				}, {
					// field: 'createTime',
					title: '创建时间',
					minWidth: 100,
					sort: true,
					templet: function (d){
						return renderTime(d.createTime)
					}
				}, {
					title: '操作',
					width: 65,
					align: 'center',
					toolbar: '#toolbar1'
				}
			]
		],
		data: table,
		skin: 'line', //表格风格			
		even: true,
		id: 'subjecttab'
	});

	//监听行工具事件
	table.on('tool(subjecttab)', function(obj) {
		var data = obj.data;

		//删除
		if(obj.event === 'del') {
			layer.confirm('是否删除？', {
				title: '提示'
			}, function(index) {
				// obj.del();
				// layer.close(index);
				$.ajax({
					url: timetableHost + '/api/labroom/deleteQuestionPool',
					type: 'GET',
					data: {"id": data.id},
					success: function (res){
						layer.msg(res.msg);
						table.reload('subjecttab');
					}
				})
			});
		}
	});

	//搜索题库管理
	var $ = layui.$,
		subjecttabactive = {
			subjecttabreload: function() {
				var search_box = $('#subjecttab_search');

				//执行重载
				table.reload('subjecttab', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						key: {
							studentname: search_box.val()
						}
					}
				}, 'data');
			}
		};

	$('.tabsearch .subjecttab_search_btn').on('click', function() {
		var type = $(this).data('type');
		subjecttabactive[type] ? subjecttabactive[type].call(this) : '';
	});

	//打开新建题库
	var newsubjectinfo = {
		newsubjectinfo: function() {
			//layer.msg('新建题库');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新建题库',
				area: ['500px', '213px'],
				shade: 0.5,
				maxmin: true,
				content: 'newSubjectInfo?labRoomId=' + labRoomId,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newsubjectinfobtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newsubjectinfo').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newsubjectinfo[method] ? newsubjectinfo[method].call(this, othis) : '';
	});
	//执行考试管理
	table.render({
		elem: '#examtab',
		url: timetableHost + '/api/labroom/getConfigExamList', //数据接口
		title: '考试管理',
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			curr: 1, //设定初始在第 5 页				
			groups: 1, //只显示 1 个连续页码				
			first: false, //不显示首页				
			last: false //不显示尾页
		},
		parseData: function(res){ //res 即为原始返回的数据
			return {
				"code": res.code, //解析接口状态
				"msg": res.msg, //解析提示文本
				"count": res.data.total, //解析数据长度
				"data": res.data.records //解析数据列表
			};
		},
		cols: [
			[ //表头
				{
					fixed: 'left',
					title: '序号',
					width: 50,
					align: 'center',
					type: 'numbers'
				}, {
					field: 'name',
					title: '考试名称',
					minWidth: 100,
					sort: true
				}, {
					field: 'totalscore',
					title: '考试总分',
					minWidth: 100,
					sort: true
				}, {
					field: 'admittancescore',
					title: '准入分值',
					minWidth: 100,
					sort: true
				}, {
					field: 'range',
					title: '考试范围',
					minWidth: 100,
					sort: true
				}, {
					field: 'time',
					title: '考试时间',
					minWidth: 100,
					sort: true
				}, {
					title: '操作',
					width: 65,
					align: 'center',
					toolbar: '#toolbar2'
				}
			]
		],
		data: table,
		skin: 'line', //表格风格			
		even: true,
		id: 'examtab'
	});

	//监听行工具事件
	table.on('tool(examtab)', function(obj) {
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

	//搜索考试管理
	var $ = layui.$,
		examtabactive = {
			examtabreload: function() {
				var search_box = $('#examtab_search');

				//执行重载
				table.reload('examtab', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						key: {
							studentname: search_box.val()
						}
					}
				}, 'data');
			}
		};

	$('.tabsearch .examtab_search_btn').on('click', function() {
		var type = $(this).data('type');
		examtabactive[type] ? examtabactive[type].call(this) : '';
	});

	//打开新建考试
	var newexaminfo = {
		newexaminfo: function() {
			//layer.msg('新建考试');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新建考试',
				area: ['600px', '500px'],
				shade: 0.5,
				maxmin: true,
				content: 'newExamInfo?labRoomId=' + labRoomId,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newexaminfobtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newexaminfo').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newexaminfo[method] ? newexaminfo[method].call(this, othis) : '';
	});
});