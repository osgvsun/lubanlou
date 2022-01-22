layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table,
		layer = layui.layer;

	let accessEntityId = $.cookie("accessEntityId");
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
	form.render(null, 'accesslistbox');

	//打开新增准入/等级名单
	var newaccesslist = {
		newaccesslist: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增准入/等级名单',
				area: ['500px', '500px'],
				shade: 0.5,
				maxmin: true,
				content: 'newExamFreeList?entityId=' + entityId + '&entityType=' + entityType + '&flag=4' + '&parentTable=accesslist',
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
	$('.newaccesslist').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newaccesslist[method] ? newaccesslist[method].call(this, othis) : '';
	});

	//执行一个表单
	var accesslist = table.render({
		elem: '#accesslist',
		url: httpAccessUrl + '/getAccessAuthList', //数据接口
		where: {"entityId": entityId, "entityType": entityType, "accessEntityId": accessEntityId, "flag": 4},
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
					type: 'checkbox',
					width: 30
				}, {
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
					field: 'rank',
					title: '准入等级',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 150
				}
			]
		],
		id: 'accesslist',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(accesslist)', function(obj) {
		var data = obj.data;
		console.log(data)
		let rankDemote = data.rank === "A" ? "B" : data.rank === "B" ? "C" : data.rank === null ? "C" : null;
		let rankUpgrade = data.rank === null || data.rank === "" ? "C" : data.rank === "C" ? "B" : data.rank === "B" ? "A" : data.rank === "A" ? "A" : "";
		console.log(rankDemote)
		//升级
		if(obj.event === 'upgrade') {
			let upgradeData = {};
			upgradeData.authId = data.id;
			upgradeData.datetime = getDate();
			upgradeData.rank = rankUpgrade;
			$.ajax({
				url: httpAccessUrl + '/updateAccessAuth?' + $.param(upgradeData),
				type: 'POST',
				success: function (res) {
					if (res.code === 0) {
						layer.msg('升级成功！');
						table.reload('accesslist');
					} else {
						layer.msg(res.msg);
					}
				}
			})
		}
		//降级
		if(obj.event === 'demote') {
			let demoteData = {};
			demoteData.authId = data.id;
			demoteData.datetime = getDate();
			demoteData.rank = rankDemote;
			$.ajax({
				url: httpAccessUrl + '/updateAccessAuth?' + $.param(demoteData),
				type: 'POST',
				success: function (res) {
					if (res.code === 0) {
						layer.msg('降级成功！');
						table.reload('accesslist');
					} else {
						layer.msg(res.msg);
					}
				}
			})
		}
		//删除
		if(obj.event === 'del') {
			layer.confirm('是否删除？', {
				title: '提示'
			}, function(index) {
				obj.del();
				layer.close(index);
				$.ajax({
					url: httpAccessUrl + '/deleteAccessAuth?authId=' + data.id,
					type: 'POST',
					success: function (res) {
						if (res.code === 0) {
							table.reload('accesslist');
						} else {
							layer.msg(res.msg);
						}
					}
				})
			});
		}
	});

	function getDate() {
		let date = new Date();
		let y = date.getFullYear();
		let m = date.getMonth() + 1;
		let d = date.getDate();

		let hh = date.getHours();
		let mm = date.getMinutes();
		let ss = date.getSeconds();
		if (m < 10) {
			m = '0' + m;
		}
		if (d < 10) {
			d = '0' + d;
		}
		if (hh < 10) {
			hh = '0' + hh;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		if (ss < 10) {
			ss = '0' + ss;
		}

		return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
	}

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('accesslist', {
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
			url: httpAccessUrl + '/getAccessAuthList', //数据接口
			data: {"entityId": entityId, "entityType": entityType, "accessEntityId": accessEntityId, "flag": 4, "page": 1, "limit": 9999},
			async: false,
			success: function (res) {
				let exportData = res.data;
				exportData.forEach((item, index, arr) => {
					item.createdTime = item.createdTime + '\t';
				});
				table.exportFile('accesslist',res.data, 'xls'); //导出数据
			}
		})
	})
});