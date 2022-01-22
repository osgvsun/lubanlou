layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		form = layui.form,
		laydate = layui.laydate

	form.render(null, 'correctlistbox');

	//时间
	laydate.render({
		elem: '#searchdate',
		type: 'date',
		done: function (value,date,startDate){

		}
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
				content: 'teacherNormalBatchFileDownload',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero, index) {
					// layer.setTop(layero); //重点2
					var iframe = window['layui-layer-iframe' + index];
					// 向子页面的全局函数child传参
					iframe.child(parentData);
				},
				btn: ['下载', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#teachernormalbatchfiledownloadbtn");
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

	//打开批量评分
	var batchscore = {
		batchscore: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '批量评分',
				area: ['524px', '441px'],
				shade: 0.5,
				maxmin: true,
				content: 'teacherNormalBatchScore',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero, index) {
					// layer.setTop(layero); //重点2
					var iframe = window['layui-layer-iframe' + index];
					// 向子页面的全局函数child传参
					iframe.child(parentData);
				},
				btn: ['提交', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#teachernormalbatchscorebtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.batchscore').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		batchscore[method] ? batchscore[method].call(this, othis) : '';
	});

	//打开批量写评语
	var batchcomment = {
		batchcomment: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '批量写评语',
				area: ['524px', '441px'],
				shade: 0.5,
				maxmin: true,
				content: 'teacherNormalBatchComment',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero, index) {
					// layer.setTop(layero); //重点2
					var iframe = window['layui-layer-iframe' + index];
					// 向子页面的全局函数child传参
					iframe.child(parentData);
				},
				btn: ['提交', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#teachernormalbatchcommentbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.batchcomment').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		batchcomment[method] ? batchcomment[method].call(this, othis) : '';
	});
	let islateStatus = null
	//执行一个表单
	window.showTable = function (islate) {
		islateStatus = islate;
		var showTable = table.render({
			elem: '#correctlist',
			url: httpBaseUrl + 'api/correctedByTeacherData', //数据接口
			type: 'GET',
			where: {"assignmentId": parentData, "islate": islate, "siteId": siteId},
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
						field: 'cname',
						title: '姓名',
						width: 90,
						sort: true,
						align :'center',
						event: 'sendMessage',
						templet: function (d) {
							return '<span class="layui-table-link proStatus" style="cursor: pointer" onmouseover="showTips(this)" onmouseleave="closeTips()">' + d.cname + '</span>';
						}
					}, {
					field: 'username',
					title: '学号',
					align :'center',
					sort: true
				}, {
					field: 'similarity',
					title: '重复率',
					align :'center',
					sort: true
				}, {
					field: 'commitContent',
					title: '提交文字',
					align :'center',
					sort: true
				}, {
					field: 'file',
					title: '附件',
					align :'center',
					// toolbar: '#file'
				}, {
					fixed: 'right',
					field: 'finalGrading',
					title: '评分',
					align :'center',
					edit: 'text'
				}, {
					fixed: 'right',
					title: '操作',
					align :'center',
					toolbar: '#toolbar',
					width: 400
				}
				]
			],
			id: 'correctlist',
			data: table,
			skin: 'line', //表格风格
			even: false,
			limits: [5, 7, 10, 20],
			limit: 5, //每页默认显示的数量
			done: function (res, curr, count) {
				let data = res.data;
				for (let i = 0; i < data.length; i++) {
					let fileId = data[i].fileUrl;
					if (fileId !== "" && fileId !== null && parseFloat(fileId).toString() !== "NaN"){
						fileId = fileId.split(",");
						for (let j = 0; j < fileId.length; j++){
							resourceContainer.getFileById({
								success: function (result){
									let row = `<a class="file_download" onclick="fileDownload(${result.id})" title="下载附件">${result.fileName}</a>`;
									$("tr[data-index=" + i + "]").find("td:eq(4)").find("div").append(row)
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
		var comments=data.comment
		var grading = data.finalGrading
		console.log(grading)
		//打开写评语页面
		if(obj.event === 'comment') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '评语',
				area: ['500px', '228px'],
				shade: 0.5,
				maxmin: true,
				content: 'teacherNormalComment?comment='+comments,
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
					var submit = layero.find('iframe').contents().find("#teachernormalcommentbtn");
					submit.click();
				}
			});
			//layer.full(index);
		};
		//打开在线批阅页面
		if(obj.event === 'online') {
			let isPdf = data.fileUrl.split(',');
			let url;
			if (isPdf.length > 1){
				layer.msg("仅支持单个PDF文件批阅");
				return false;
			} else if(isPdf.length ==0){
				layer.msg("无PDF附件");
			} else {
				resourceContainer.getFileById({
					success: function (res){
						url = res.url;
						if (url.indexOf('.pdf') == -1){
							layer.msg("仅支持单个PDF文件批阅");
						} else {
							var index = layer.open({
								type: 2 //此处以iframe举例
								,
								title: '在线批阅',
								area: ['500px', '441px'],
								shade: 0.5,
								maxmin: true,
								content: 'onlineMarking?gradingId=' + data.gradingId + '&assignmentId=' + data.assignmentId + '&username=' + data.username + '&fileUrl=' + escape(url) +'&comment='+comments +'&grading='+grading,
								zIndex: layer.zIndex //重点1
								,
								success: function(layero, index) {
									layer.setTop(layero); //重点2
									// var iframe = window['layui-layer-iframe' + index];
									// // 向子页面的全局函数child传参
									// iframe.child(data.gradingId , url);
								},
								btn: ['提交', '取消'],
								yes: function(index, layero) {
									//点击确认触发 iframe 内容中的按钮提交
									var submit = layero.find('iframe').contents().find("#submitMarking");
									submit.click();
								}
							});
							layer.full(index);
						}
					},
					fail: function (res){
						console.log("失败" + res);
					},
					fileId: isPdf[0],
					needToken: false,
				})
			}
		};
		//提交成绩
		if(obj.event === 'submitscore') {
			$.ajax({
				url: httpBaseUrl + 'api/commonWorkBatchScore',
				type: 'POST',
				data: {"gradingId": data.groupId, "assignmentId": data.assignmentId, "finalScore": data.finalGrading, "siteId": siteId, "usernames": currentUsername},
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
		};
		if (obj.event === 'sendMessage') {
			let userName = data.username;
			layer.open({
				type: 2,
				title: '发送通知',
				area: ["60%", "70%"],
				content: 'openMessage?userName=' + userName + '&assignmentId=' + data.assignmentId,
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
				let searchbox = $('#searchbox');
				let searchdate = $('#searchdate');
				//执行重载
				table.reload('correctlist', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						"search": searchbox.val(),
						"submitDate": searchdate.val(),
						"assignmentId": parentData,
						"islate": islateStatus,
						"siteId": siteId
					}
				}, 'data');
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
	$(function (){
		showTable(2);
		form.render();
	})
});