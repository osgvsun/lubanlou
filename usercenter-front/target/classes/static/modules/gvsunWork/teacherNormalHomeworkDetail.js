layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate

	form.render(null, 'teachernormalhomeworkdetailbox');
	//根据设置权限显示表单
	setConfigShow(type, title_head);

	$.ajax({
		url: httpBaseUrl + 'api/assignmentApi',
		type: 'GET',
		async: false,
		data: {"assignmentId": assignmentId, "cid": siteId},
		success: function (res){
			//信息
			form.val('teachernormalhomeworkdetailbox', {
				"title": res.title,
				"type": res.type == 0 ? "普通作业" : "小组作业",
				"score": "100",
				"category": res.category == 1 ? "知识" : "",
				"chapterId": res.chapterName,
				// "project": "test3",
				"lessonId": res.lessonName,
				"startDate": res.startDate,
				"duration":  (new Date(res.endDate) - new Date(res.startDate))/(1000*3600*24),
				"isToGradebook": res.isToGradebook == 1 ? "添加" : "不添加",
				"isDuplicateChecking": res.isDuplicateChecking,
				"commitTime": res.commitTime ==0 ? "无限制" : "",
				"submitLate": res.submitLate == 0 ? "否" : "是",
				"commitType": res.commitType == 1 ? "输入文字或添加附件" : (res.commitType == 2 ? "仅输入文字" : "仅提交附件"),
				"appendixType": getAppendixType(res.appendixType),
			});
			$("div[name=requirement]").html(res.requirement)
			getAttachment(res.fileUrl, form, siteEnName, siteSecret);

		}
	})
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
				area: ['540px', '410px'],
				shade: 0.5,
				maxmin: true,
				content: 'teacherNormalBatchFileDownload',
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

	//执行一个表单
	window.showTable = function (islate) {
		var showTable = table.render({
			elem: '#teachernormalhomeworkdetail',
			url: httpBaseUrl + 'api/correctedByTeacherData', //数据接口
			type: 'GET',
			where: {"assignmentId": assignmentId, "islate": islate, "siteId": siteId},
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
						event: 'sendMessage',
						templet: function (d) {
							return '<span class="layui-table-link proStatus" style="cursor: pointer" onmouseover="showTips(this)" onmouseleave="closeTips()">' + d.cname + '</span>';
						}
					}, {
					field: 'username',
					title: '学号',
					sort: true
				}, {
					field: 'repeat',
					title: '重复率',
					sort: true
				}, {
					field: 'commitContent',
					title: '提交文字',
					sort: true
				}, {
					field: 'file',
					title: '附件',
				}, {
					fixed: 'right',
					field: 'finalGrading',
					edit: 'text',
					title: '评分',
					sort: true
				}, {
					fixed: 'right',
					field: 'comment',
					edit: 'text',
					title: '评语',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 80

				}
				]
			],
			id: 'teachernormalhomeworkdetail',
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

	table.on('edit(teachernormalhomeworkdetail)', function (obj) {
		var value = obj.value,
			data = obj.data,
			fieId = obj.field;
		if (fieId == "finalGrading"){
			$.ajax({
				url: httpBaseUrl + 'api/gradeAndComment',
				type: 'POST',
				data: {"gradingId": data.gradingId, "finalScore": value, "comments": data.comment, "cid": siteId, "username": currentUsername},
				success: function (res){
					// console.log(res)
					table.reload('teachernormalhomeworkdetail');
					layer.msg('评分完成');
				}
			})
		}
		if (fieId == "comment"){
			$.ajax({
				url: httpBaseUrl + 'api/gradeAndComment',
				type: 'POST',
				data: {"gradingId": data.gradingId, "comments": value, "finalScore": data.finalGrading, "cid": siteId, "username": currentUsername},
				success: function (res){
					// console.log(res)
					table.reload('teachernormalhomeworkdetail');
					layer.msg('评价完成');
				}
			})
		};
	});
	//监听行工具事件
	table.on('tool(teachernormalhomeworkdetail)', function(obj) {
		var data = obj.data;
		//打开详情页面
		if(obj.event === 'detail') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '学生作业详情',
				area: ['500px', '163px'],
				shade: 0.5,
				maxmin: true,
				content: 'studentNormalHomeworkDetail',
				success: function(layero, index) {
					// layer.setTop(layero); //重点2
					var iframe = window['layui-layer-iframe' + index];
					// 向子页面的全局函数child传参
					iframe.child(data.assignmentId);
				},
			});
			layer.full(index);
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
				var searchbox = $('#searchbox');
				var searchdate = $('#searchdate');
				//执行重载
				table.reload('teachernormalhomeworkdetail', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						search: searchbox.val(),
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
		showTable(2);
		form.render();
	})
});