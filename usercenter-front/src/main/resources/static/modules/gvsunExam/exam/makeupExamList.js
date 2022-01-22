layui.use(['laypage', 'layer', 'table', 'element', 'form'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form

	//向世界问个好
	//layer.msg('进入补考名单');

	form.render(null, 'makeupexamlistbox');

	//执行一个表单
	var makeupexamlist = table.render({
		elem: '#makeupexamlist',
		url: httpBaseUrl + '/views/makeupExamListApi', //数据接口
		where: {'assignmentId': assignmentId, "siteId": siteId},
		title: '补考名单',
		cellMinWidth: 100,
		page: true, //开启分页			
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			//curr: 5, //设定初始在第 5 页				
			groups: 1, //只显示 1 个连续页码				
			first: false, //不显示首页				
			last: false //不显示尾页
		},
		parseData: function (result) {
			sessionStorage.setItem('count', result.count);
			return {
				"code": 0,
				"msg": result.message,
				"count": result.count,
				"data": result.data
			};
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
					title: '原考试',
					sort: true
				}, {
					field: 'username',
					title: '学号',
					sort: true
				}, {
					field: 'cname',
					title: '姓名',
					sort: true
				}, {
					field: 'score',
					title: '成绩',
					templet: function(d){
						return d.score == null ? '未参加考试' : d.score;
					},
					sort: true
				}
			]
		],
		id: 'makeupexamlist',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('makeupexamlist', {
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

	//打开新增补考名单
	var newmakeupexamlist = {
		newmakeupexamlist: function() {
			//layer.msg('新增补考名单');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增补考名单',
				area: ['500px', '360px'],
				shade: 0.5,
				maxmin: true,
				content: 'newmakeupexamlist.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newmakeupexamlistbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newmakeupexamlist').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newmakeupexamlist[method] ? newmakeupexamlist[method].call(this, othis) : '';
	});
	$('#exportedMakeUp').on('click', function () {
		$.ajax({
			url: httpBaseUrl + '/views/makeupExamListApi',
			data: {'assignmentId': assignmentId, 'page': 1, 'limit': sessionStorage.getItem('count')},
			type: 'POST',
			success: function (res) {
				exportData = res.data;

				makeupexamlist.config.title = "补考名单";
				table.exportFile(makeupexamlist.config.id, exportData, 'xls');
			}
		})
	})
});