layui.use(['laypage', 'layer', 'table', 'element', 'form'], function() {
	var layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		form = layui.form

	form.render(null, 'homeworklistbox');
	setCourseSite('#site', siteId, $)
	//打开新增作业
	var newhomework = {
		newhomework: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增作业',
				area: ['500px', '440px'],
				shade: 0.5,
				maxmin: true,
				content: 'newHomework?type=' + type + '&title=' + title,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['发布', '保存草稿', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					let submit = layero.find('iframe').contents().find("#newhomeworkbtn");
					submit.click();
				},
				btn2: function (index, layero){
					let save = layero.find('iframe').contents().find("#savehomeworkbtn");
					save.click();
					return false;
				},
				btn3: function (index,layero){
					window.sessionStorage.removeItem('selectStudent');
				},
				cancel: function (){
					window.sessionStorage.removeItem('selectStudent');
				}
			});
			layer.full(index);
		}
	};
	$('.newhomework').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newhomework[method] ? newhomework[method].call(this, othis) : '';
	});
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
	} else if (type === '200' && title === 'report') {
		chapterType = 200;
		assigmentType = 'report';
		layer.msg('进入实验报告—普通作业');
	} else if (type === '200' && title === 'data') {
		chapterType = 200;
		assigmentType = 'data';
		layer.msg('进入实验数据—普通作业');
	}
	//执行一个表单
	table.render({
		elem: '#homeworklist',
		url: httpBaseUrl + 'api/teacherNormalHomeworkListApi', //数据接口
		method: 'GET',
		where: {"chapterType": chapterType, "type": assigmentType, "isGroup": 0, "cid": siteId},
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
					field: 'state',
					title: '状态',
					templet: function (d){
						let date = new Date();
						let start = new Date(d.startDate);
						let end = new Date(d.endDate)
						if (date.getTime()<start.getTime()){
							return '<font class="font_grey">未开始</font>';
						}else if(date.getTime()>start.getTime()&&date.getTime()<end.getTime() || (d.endDate == "" && start.getTime() < date.getTime())){
							return '<font class="font_green">进行中</font>';
						}else if(date.getTime()>end.getTime()){
							return '<font class="font_orange">已结束</font>';
						}
					}

				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 220
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
		//打开批改作业页面
		if(obj.event === 'correct') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '批改作业',
				area: ['500px', '163px'],
				shade: 0.5,
				maxmin: true,
				content: 'teacherNormalCorrectList?assignmentId=' + data.id,
				success: function(layero, index) {
					layer.setTop(layero); //重点2
				},

			});
			layer.full(index);
		};
		//打开编辑作业页面
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑作业',
				area: ['500px', '441px'],
				shade: 0.5,
				maxmin: true,
				content: 'editHomework?type=' + type + '&title=' + title,
				success: function(layero, index) {
					// layer.setTop(layero); //重点2
					var iframe = window['layui-layer-iframe' + index];
					// 向子页面的全局函数child传参
					iframe.child(data);
				},
				btn: ['提交', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#edithomeworkbtn");
					submit.click();
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
				content: 'teacherNormalHomeworkDetail?assignmentId=' + data.id,
				success: function (layero, index) {
					layer.setTop(layero); //重点2
					// layui 父子页面传值不稳定
				}
			});
			layer.full(index);
		};
		//删除
		if(obj.event === 'del') {
			layer.confirm('删除作业会把提交记录及成绩一并删除，是否删除？', {
				title: '提示'
			}, function(index) {
				$.ajax({
					url: httpBaseUrl + 'api/deleteAssignmentApi',
					type: 'POST',
					async: false,
					data: {"assignmentId": data.id},
					success: function (res){
						layer.msg('删除成功');
						layer.close(index);
						table.reload('homeworklist');
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
				table.reload('homeworklist', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						"search": searchbox.val(),
						"chapterType": chapterType,
						"type": assigmentType,
						"isGroup": 0,
						"cid": siteId
					}
				}, 'data');
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});

	form.val('homeworklistbox', {
		"site": siteId
	})
});