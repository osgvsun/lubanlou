layui.use(['layer', 'table', 'element', 'form', 'laydate'], function() {
	var layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		form = layui.form,
		laydate = layui.laydate

	form.render(null, 'correctlistbox');
	//时间
	laydate.render({
		elem: '#searchdate',
		type: 'date'
	});

	//打开批量下载附件
	var batchfiledownload = {
		batchfiledownload: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '批量下载附件',
				area: ['524px', '441px'],
				shade: 0.5,
				maxmin: true,
				content: 'teacherteamBatchFileDownload',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero, index) {
					// layer.setTop(layero); //重点2
					var iframe = window['layui-layer-iframe' + index];
					// 向子页面的全局函数child传参
					iframe.child(assignmentId);
				},
				btn: ['下载', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#teacherteambatchfiledownloadbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.batchfiledownload').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		batchfiledownload[method] ? batchfiledownload[method].call(this, othis) : '';
	});

	//执行一个表单
	 window.showTable = function ($id, isLate, toolbar) {
		var showTable = table.render({
			elem: `#${$id}`,
			url: httpBaseUrl + 'api/teacherteamCorrectListApi', //数据接口
			method: 'GET',
			where: {'assignmentId': assignmentId, "islate": isLate},
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
						field: 'groupTitle',
						title: '小组名称',
						width: 120,
						sort: true,
						event: 'sendMessage',
						templet: function (d) {
							return '<span class="layui-table-link proStatus" style="cursor: pointer" onmouseover="showTips(this)" onmouseleave="closeTips()">' + d.groupTitle + '</span>';
						}
					}, {
					field: 'member',
					title: '小组分工',
					sort: true,
					templet: function (d){
						let distributionDTOList = d.distributionDTOList;
						let str = '';
						for (let i = 0; i < distributionDTOList.length; i++){
							str += '<span>'+ distributionDTOList[i].cname + ': ' +'</span><a><span>'+ distributionDTOList[i].distribution +'</span></a>' + ' | ';
						}
						return str;
					}
				}, {
					field: 'content',
					title: '提交文字',
					sort: true
				}, {
					field: 'file',
					title: '附件',
				}, {
					fixed: 'right',
					field: 'score',
					title: '小组评分',
					edit: 'text'
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: `#${toolbar}`,
					width: 350
				}
				]
			],
			id: `${$id}`,
			data: table,
			skin: 'line', //表格风格
			even: false,
			limits: [5, 7, 10, 20],
			limit: 5, //每页默认显示的数量
			done: function (res, curr, count) {
				let data = res.data;
				for (let i = 0; i < data.length; i++) {
					let fileId = data[i].fileIds;
					if (fileId !== "" && fileId !== null && parseFloat(fileId).toString() !== "NaN"){
						fileId = fileId.split(",");
						for (let j = 0; j < fileId.length; j++){
							resourceContainer.getFileById({
								success: function (result){
									let row = `<a class="file_download" onclick="fileDownload(${result.id})" title="下载附件">${result.fileName}</a>`;
									$("tr[data-index=" + i + "]").find("td:eq(3)").find("div").append(row)
								},
								fail: function (res){
									console.log("失败:" + res);
								},
								fileId: fileId[j],
								needToken: true
							})
						}
					}
				}
			}
		});
		return showTable;
	}

	//监听行工具事件
	table.on('tool(correctlist)', function(obj) {
		var data = obj.data;
		//打开写评语页面
		if(obj.event === 'comment') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '小组评语',
				area: ['500px', '228px'],
				shade: 0.5,
				maxmin: true,
				content: 'teacherTeamComment?assignmentId=' + assignmentId,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero, index) {
					// layer.setTop(layero); //重点2
					var iframe = window['layui-layer-iframe' + index];
					// 向子页面的全局函数child传参
					iframe.child(data);
				},
				btn: ['提交', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#teacherteamcommentbtn");
					submit.click();
				}
			});
			//layer.full(index);
		};
		//打开成员评分/评语页面
		if(obj.event === 'member') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '成员评分/评语',
				area: ['500px', '441px'],
				shade: 0.5,
				maxmin: true,
				content: 'teacherTeamMember?assignmentId=' + assignmentId,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero, index) {
					// layer.setTop(layero); //重点2
					var iframe = window['layui-layer-iframe' + index];
					// 向子页面的全局函数child传参
					iframe.child(data.groupId);
				},
				btn: ['提交', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#teacherteammemberbtn");
					submit.click();
				}
			});
			//layer.full(index);
		};
		//提交成绩
		if(obj.event === 'submitscore') {
			$.ajax({
				url: httpBaseUrl + 'api/groupWorkGroupScore',
				type: 'POST',
				data: {"groupId": data.groupId, "assignmentId": assignmentId, "finalScore": data.score, "siteId": siteId, "username": currentUsername},
				success: function (res){
					layer.msg('已提交到成绩册');
				}
			})
		}
		//返回修改
		if(obj.event === 'backtoedit') {
			// layer.msg('已返回修改，学生需重新提交作业');
			$.ajax({
				url: httpBaseUrl + 'api/sendBackToCorrect',
				type: 'POST',
				data: {"gradingId": data.gradingId},
				success: function (data){
					layer.msg('已返回修改，学生需重新提交作业')
				}
			})
		}
		if (obj.event === 'sendMessage') {
			let userName = [];
			for (let i = 0; i < data.distributionDTOList.length; i++) {
				userName.push(data.distributionDTOList[i].username);
			}
			layer.open({
				type: 2,
				title: '发送通知',
				area: ["60%", "70%"],
				content: 'openMessage?userName=' + userName.toString() + '&assignmentId=' + assignmentId,
				btn: ['提交', '取消'], //按钮居中
				shade: 0, //不显示遮罩
				success: function (layero, index) {
					layer.setTop(layero);
				},
				yes: function (index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#messagebtn");
					submit.click();
				}
			});
		}
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');
				var searchdate = $('#searchdate');
				//执行重载
				table.reload('correctlist', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						userSearch: searchbox.val(),
						submitDate: searchdate.val()
					}
				}, 'data');
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
	$(function (){
		showTable('correctlist', 2, 'toolbar');
		form.render();
	})
});
