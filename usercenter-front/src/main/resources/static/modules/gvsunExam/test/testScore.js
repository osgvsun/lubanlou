layui.use(['laypage', 'layer', 'table', 'element', 'form'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form

	//向世界问个好
	//layer.msg('');

	form.render(null, 'testscorebox');

	//执行一个表单
	table.render({
		elem: '#testscore',
        url: httpBaseUrl + '/views/test/testScoreApi', //数据接口
        where: {'assignmentId': assignmentId, "authorityName": $.cookie('currauth'), "tCourseSiteId": siteId, "username": username},
        method: 'post',
		title: '已参加测试列表',
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
					field: 'cname',
					title: '姓名',
					sort: true,
					width: 150
				}, {
					field: 'username',
					title: '学号',
					sort: true
				}, {
					field: 'className',
					title: '班级',
					sort: true
				}, {
					field: 'score',
					title: '成绩',
					sort: true
				},{
					field: 'commitDate',
					title: '提交日期',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 240
				}
			]
		],
		id: 'testscore',
		data: table,
		skin: 'line', //表格风格
		even: false,
		limits: [30, 50, 70, 100],
		limit: 30 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(testscore)', function(obj) {
		var data = obj.data;
		//打开查看测试信息详情页面
		if(obj.event === 'detail') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '测试信息详情',
				area: ['100%', '100%'],
				shade: 0.5,
				maxmin: true,
				content: 'testScoreDetail?assignmentId='+data.testId+'&username='+data.username+'&gradingId='+data.gradingId + '&cname=' + data.cname
			});
			layer.full(index);
		};
		//打开查看考试简答题待打分页面详情
		if(obj.event === 'grade') {
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '考试信息详情',
				area: ['100%','100%'],
				maxmin: true,
				content: httpBaseUrl + 'views/examGradeDetail?assignmentId='+assignmentId+'&username='+data.username+'&gradingId='+data.gradingId + '&type=test',
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#updatetranscript");
					submit.click();
				},
				end: function () {
					//执行重载
					table.reload('examscore', {
						page: {
							curr: 1 //重新从第 1 页开始
						},
						where: {
							key: {
								assignmentId: assignmentId
							}
						}
					}, 'data');
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
				table.reload('testscore', {
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
function commitTranscript() {
    $.ajax({
        async: false,
		data: {'assignmentId': assignmentId,'type': 'test','username':username , 'siteId':siteId},
        url: "../commitGrade",
        type: "POST",
        success: function (data) {
            alert(data);
        },
        error: function (e) {
            alert('更新失败');
        }
    });
}