layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer', 'layedit', 'upload'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		layer = layui.layer,
		element = layui.element,
		layedit = layui.layedit,
		upload = layui.upload;

	//根据设置权限显示表单
	setConfigShow(type, title_head);
	let uploadFileType = '';
	var pblist = $('#pblist');
	//页面数据渲染
	$.ajax({
		url: httpBaseUrl + 'api/assignmentApi',
		type: 'GET',
		async: false,
		data: {"assignmentId": parentData.id, "cid": siteId},
		success: function (res){
			uploadFileType = res.appendixType;
			//信息
			form.val('studentsubmitteamhomeworkbox', {
				"title": res.title,
				"category": res.category == 1 ? "知识" : "",
				"score": res.score,
				"type": res.type == 0 ? "普通作业" : "小组作业",
				"chapterId": res.chapterName,
				"lessonId": res.lessonName,
				"startDate": res.startDate,
				"duration": (new Date(res.endDate) - new Date(res.startDate))/(1000*3600*24),
				"isToGradebook": res.isToGradebook == 1 ? "添加" : "不添加",
				"repeatingcheck": "是",
				"submittimes": "无限制",
				"submitLate": res.submitLate == 0 ? "否" : "是",
				"commitType": res.commitType == 1 ? "输入文字或添加附件" : (res.commitType == 2 ? "仅输入文字" : "仅提交附件"),
				"appendixType": enclosureShow(res.appendixType),
			});
			$("div[name=requirement]").html(res.requirement)
			getAttachment(res.fileUrl, form, siteEnName, siteSecret);
		}
	});


	form.render(null, 'studentsubmitteamhomeworkbox');

	//建立题干编辑器的图片接口
	layedit.set({
		uploadImage: {
			url: '' //接口url
				,
			type: '' //默认post
		}
	});
	//注意：layedit.set 一定要放在 build 前面，否则配置全局接口将无效。
	//建立题干编辑器
	var index = layedit.build('requirement', {
		height: 125 //设置编辑器高度
			,
		tool: [
			'strong' //加粗
			, 'italic' //斜体
			, 'underline' //下划线
			, 'del' //删除线
			, '|' //分割线
			, 'left' //左对齐
			, 'center' //居中对齐
			, 'right' //右对齐
			, '|' //分割线
			, 'link' //超链接
			, 'unlink' //清除链接
			, 'image' //插入图片
		]
	});

	form.verify({
		submitContent: function (value){
			layedit.sync(index);
		}
	});
	let groupId = 0;
	$.ajax({
		url: httpBaseUrl + 'api/getGroupIdByCategoryIdAndStudent',
		type: 'GET',
		async: false,
		data: {"categoryId": categoryId, "student": currentUsername},
		success: function (res) {
			groupId = res
		}
	})
	$.ajax({
		url: httpBaseUrl + 'api/latestGroupWorkSubmitApi',
		type: 'GET',
		async: false,
		data: {"assignmentId": parentData.id, "groupId": groupId},
		success: function (res) {
			let data = res;
			if (data.list) {
				for (let i = 0; i < data.list.length; i++){
					let row = `<div class="layui-col-lg4">
							<input type="hidden" class="usernameList" value="${data.list[i].username}">
							<label class="layui-form-label cnameList">${data.list[i].cname}</label>
							<div class="layui-input-block">
								<input class="layui-input distributionList" name="responsibility" autoComplete="on" value="${data.list[i].distribution ? data.list[i].distribution : ''}"/>
							</div>
						  </div>`;
					$('#distribution').append(row);

					form.render();
				}
			}
		}
	})
	function getVoList(){
		let usernameList = [];
		let cnameList = [];
		let distribution = [];
		$.each($(".usernameList"), function (index, obj) {
			usernameList.push($(obj).val());
		});
		$.each($(".cnameList"), function (index, obj) {
			cnameList.push($(obj).text())
		});
		$.each($(".distributionList"), function (index, obj) {
			distribution.push($(obj).val())
		});
		let  distributionDTOList= cnameList.map((v, i) => {
			return {"cname": v, "distribution": distribution[i], 'username': usernameList[i]}
		})
		return distributionDTOList;
	}
	let timeLimit = parentData.timeLimit;
	//监听提交
	form.on('submit(studentsubmitteamhomeworkbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		let submitContent = $('#requirement').val(); // 当前作业内容
		let fileUrl = $('#fileUrl').val(); //上传文件id
		let assignment = parentData.id; //
		if (timeLimit == 0){
			alert('当前作业剩余提交次数为0');
			return false;
		}
		$.ajax({
			url: httpBaseUrl + 'api/commitGroupAssignmentApi?username=' + currentUsername,
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({"assignmentId": assignment, "submitTime": 1, "commitContent": submitContent, "fileUrl": fileUrl, "distributionDTOList" : getVoList(), "groupId": groupId}),
			success: function (data){
				parent.layer.msg(data.msg)
				parent.layui.table.reload('homeworklist'); //重载表格
				parent.layer.close(index); //再执行关闭
			}
		})
	});

	//保存草稿
	form.on('submit(savehomeworkbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		let submitContent = $('#requirement').val(); // 当前作业内容
		let fileUrl = $('#fileUrl').val(); //上传文件id
		let assignment = parentData.id; //
		if (timeLimit == 0){
			alert('当前作业剩余提交次数为0');
			return false;
		}
		$.ajax({
			url: httpBaseUrl + 'api/commitGroupAssignmentApi?username=' + currentUsername,
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({"assignmentId": assignment, "submitTime": 0, "commitContent": submitContent, "fileUrl": fileUrl, "distributionDTOList" : getVoList(), "groupId": groupId}),
			success: function (data){
				parent.layer.msg(data.msg)
				parent.layui.table.reload('homeworklist'); //重载表格
				parent.layer.close(index); //再执行关闭
			}
		})
	});
	//上传文件，选完文件后不自动上传,点击开始上传按钮上传

	//导入

	let courseData = findCourseSiteById(siteId)
	let courseId = courseData.id;
	let coursetitle = courseData.title;
	// let courseId ="2222"
	// let coursetitle="232323"
	resourceContainer.getDirectoryIdByPath({
		path: '教学平台/' + coursetitle + '(' + courseId + ')' + '/知识/作业',
		success: function (directoryId) {
			uploadListIns = upload.render({
				elem: '#projectbook',
				accept: 'file', //普通文件
				multiple: true, //多个上传
				auto: false, //是否直接选择文件后上传
				bindAction: '#uploadfilesbtn',
				data: {
					fileTags: 'file',//文件类型（image,file,video）
					siteName: '教学平台',//站点名
					username: currentUsername, //上传人
					directoryId: directoryId,//目录id
					shareState: "私有",
				},
				field:'files',
				exts: setAcceptMime(uploadFileType),
				progress: function(n, elem, res, index){
					// var percent = n + '%' //获取进度百分比
					element.progress('progress-demo-'+ index, n + '%'); //进度条
				},
				before: function (obj) {//上传之前获取文件信息
					obj.preview(function(index, file, result){
						fileSize = file.size;
						fileName = file.name;
					});
				},
				choose: function(obj) {
					var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
					//读取本地文件
					obj.preview(function(index, file, result) {
						var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>' +
						'<div class="layui-progress" lay-filter="progress-demo-'+ index +'"><div class="layui-progress-bar" lay-percent=""></div></div>' +
						'</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

						//单个重传
						tr.find('.demo-reload').on('click', function() {
							obj.upload(index, file);
						});

						//删除
						tr.find('.demo-delete').on('click', function() {
							delete files[index]; //删除对应的文件
							$(this).parent().parent().remove();
							uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
						});

						pblist.append(tr);
					});
				},
				done: function (fileId,index, upload) {//上传完成后保存文件信息
					var fileIds=fileId.fileIds;
					let fileUrl = $("#fileUrl");
					//多文件上传
					if (fileId) { //上传成功
						for (let i = 0; i < fileIds.length; i++) {
							resourceContainer.getFileById({
								success: function (data) {
									if (fileUrl.val() == ""){
										$("#fileUrl").val(data.id);
									} else {
										let strId = $("#fileUrl").val() + ',' + data.id;
										$("#fileUrl").val(strId);
									}

								}, fail: function (reason) {
									console.log("失败:" + reason);
								}, fileId: fileIds[i], needToken: true
							});
							var tr = pblist.find('tr#upload-' + index[i]),
								tds = tr.children();
							tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
							tds.eq(3).html('<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="lsProjectAddfileId" id='+fileIds[i]+'>删除</button>'); //清空操作

						}
						return delete this.files[index]; //删除文件队列已经上传成功的文件
					}
					$(this).error(index, upload);
				}
				,error: function(index, upload){
					for(var i=0;i<index.length;i++){
						var tr = pblist.find('tr#upload-'+ index[i]);
						tr.each(function () {
							tds = $(this).children();
							tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
							tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
						})
					}
				}
			});

		},
		fail: function (reason) {
			alert("获取目录id失败:" + reason);
		}, needToken: true
	});

	window.deleteFile = function (id, _this){
		let tr = _this.parentNode.parentNode;
		resourceContainer.deleteFileById({
			success: function(res){
				layer.msg('删除成功');
				tr.remove();
			},
			fail: function(res){
				console.log("失败" + res)
			},
			fileId: id,
			needToken: true
		})
	}
});