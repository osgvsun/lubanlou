layui.use(['layer', 'table', 'element', 'form'], function() {
	var layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		form = layui.form

	form.render(null, 'homeworklistbox');
	setCourseSite('#site', siteId, $)
	let type_head = type;
	let chapterType = '';  //存储当前页状态
	let assigmentType = '';
	if (type === "knowledge" || type == 'null' || type == '' || type == null){
		chapterType = 1;
		assigmentType = 'assignment';
		layer.msg('进入知识—普通作业');
	} else if (type === 'skill') {
		chapterType = 200;
		assigmentType = 'assignment';
		layer.msg('进入实验—普通作业');
	} else if (type === 'experience'){
		chapterType = 3;
		assigmentType = 'assignment';
		layer.msg('进入体验—普通作业');
	} else if (type === '200' && title_head === 'report') {
		chapterType = 200;
		assigmentType = 'report';
		layer.msg('进入实验报告—普通作业');
	} else if (type === '200' && title_head === 'data') {
		chapterType = 200;
		assigmentType = 'data';
		layer.msg('进入实验数据—普通作业');
	}
	//执行一个表单
	table.render({
		elem: '#homeworklist',
		url: httpBaseUrl + 'api/studentNormalHomeworkListApi', //数据接口
		method: 'GET',
		where: {"chapterType": chapterType, "type": assigmentType, "isGroup": 0, "cid": siteId, "username": username},
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
					title: '作业名称',
					sort: true
				}, {
					field: 'islate',
					title: '状态',
					templet: function (d){
						if (d.islate == 0){
							return `<font class="font_green">已提交</font>`;
						} else if (d.islate == 1){
							return `<font class="font_orange">迟交(已逾期)</font>`;
						} else if (d.islate == 2){
							return `<font class="font_grey">未提交</font>`;
						} else if (d.islate == 3){
							return `<font class="font_red">需重新提交！</font>`;
						}
					}
				}, {
					field: 'submit',
					title: '剩余提交次数',
					templet: function (d){
						if (d.timeLimit){
							return '作业提交不限次数';
						} else {
							return d.timeLimit;
						}
					},
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 200
				}
			]
		],
		id: 'homeworklist',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(homeworklist)', function(obj) {
		var data = obj.data;
		//打开编辑/提交页面
		if(obj.event === 'submit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑/提交作业',
				area: ['500px', '163px'],
				shade: 0.5,
				maxmin: true,
				content: 'studentSubmitNormalHomework?type=' + type_head + '&title=' + title_head + '&assignmentApi=' + data.id,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero, index) {
					layer.setTop(layero); //重点2
					// var iframe = window['layui-layer-iframe' + index];
					// // 向子页面的全局函数child传参
					// iframe.child(data.id);
				},
				btn: ['发布', '保存草稿', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#studentsubmitnormalhomeworkbtn");
					submit.click();

				},
				btn2: function (index, layero){
					var save = layero.find('iframe').contents().find("#studnetsavenormalhomeworkbtn");
					save.click();
				}
			});
			layer.full(index);
		};
		//打开查看页面
		if(obj.event === 'detail') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '查看作业',
				area: ['500px', '163px'],
				shade: 0.5,
				maxmin: true,
				content: 'studentNormalHomeworkDetail?assignmentId=' + data.id,
				success: function(layero, index) {
					layer.setTop(layero); //重点2
					// var iframe = window['layui-layer-iframe' + index];
					// // 向子页面的全局函数child传参
					// iframe.child(data.id);
				},
			});
			layer.full(index);
		};
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox').val();
				var islate = $('#islate').val();
				//执行重载
				table.reload('homeworklist', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						islate: islate,
						search: searchbox
					}
				}, 'data');
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
});