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
	let status = $.cookie("status");
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
			$('.training').css("display", "none");
		}
	}
	form.render(null, 'securitylistbox');

	//信息
	form.val('securitylistbox', {
		"": "" //备用
	});

	//打开新增题库
	var newsecurity = {
		newsecurity: function() {
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
				content: 'newSecurityList',
				zIndex: layer.zIndex //重点1
				,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newsecuritylistbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newsecurity').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newsecurity[method] ? newsecurity[method].call(this, othis) : '';
	});

	//执行一个表单
	var securitylist = table.render({
		elem: '#securitylist',
		url:  httpAccessUrl + '/getAccessEntityResult', //数据接口
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
					title: '阅读人员',
					sort: true
				}, {
					field: 'createdTime',
					title: '阅读时间',
					sort: true
				}
			]
		],
		id: 'securitylist',
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
				table.reload('securitylist', {
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
	//导出名单
	$('.export_list').on('click', function () {
		layer.msg('导出中······请稍等片刻');
		$.ajax({
			url:  httpAccessUrl + '/getAccessEntityResult?page=1&limit=9999', //数据接口,
			async: false,
			success: function (res) {
				let exportData = res.data;
				exportData.forEach((item, index, arr) => {
					item.createdTime = item.createdTime + '\t';
				});
				table.exportFile('securitylist',res.data, 'xls'); //导出数据
			}
		})
	})
});