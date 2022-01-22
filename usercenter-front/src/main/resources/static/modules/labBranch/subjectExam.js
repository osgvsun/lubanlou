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
	layer.msg('进入题库/考试管理');

	form.render(null, 'subjectexambox');

	//执行题库管理
	table.render({
		elem: '#subjecttab',
		url: layui.setter.base + "json/subjectTab.json", //数据接口						
		title: '题库管理',
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			curr: 1, //设定初始在第 5 页				
			groups: 1, //只显示 1 个连续页码				
			first: false, //不显示首页				
			last: false //不显示尾页
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
					title: '题库名称',
					minWidth: 100,
					sort: true
				}, {
					field: 'person',
					title: '创建人',
					minWidth: 100,
					sort: true
				}, {
					field: 'time',
					title: '创建时间',
					minWidth: 100,
					sort: true
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
				obj.del();
				layer.close(index);
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

	//打开新建题库管理
	var newsubject = {
		newsubject: function() {
			//layer.msg('新建题库管理');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新建题库管理',
				area: ['500px', '213px'],
				shade: 0.5,
				maxmin: true,
				content: 'newSubject',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newsubjectbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newsubject').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newsubject[method] ? newsubject[method].call(this, othis) : '';
	});

	//执行考试管理
	table.render({
		elem: '#examtab',
		url: layui.setter.base + "json/examTab.json", //数据接口						
		title: '考试管理',
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			curr: 1, //设定初始在第 5 页				
			groups: 1, //只显示 1 个连续页码				
			first: false, //不显示首页				
			last: false //不显示尾页
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

	//打开新建考试管理
	var newexam = {
		newexam: function() {
			//layer.msg('新建考试管理');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新建考试管理',
				area: ['600px', '500px'],
				shade: 0.5,
				maxmin: true,
				content: 'newExam',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newexambtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newexam').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newexam[method] ? newexam[method].call(this, othis) : '';
	});
});