layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer', 'layedit', 'upload'], function() {
	var $ = layui.jquery,
		form = layui.form,
		element = layui.element,
		layedit = layui.layedit,
		upload = layui.upload;

	let uploadFileType = '';
	//根据设置权限显示表单
	setConfigShow(type, title_head);
	//页面数据渲染
	$.ajax({
		url: httpBaseUrl + 'api/assignmentApi',
		type: 'GET',
		async: false,
		data: {"assignmentId": assignmentApi, "cid": siteId},
		success: function (res){
			uploadFileType = res.appendixType;
			//信息
			form.val('studentsubmitnormalhomeworkbox', {
				"title": res.title,
				"category": res.category === 1 ? "知识" : res.category === 200 ? "技能" : res.category === 3 ? "体验" : "",
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
				"enclosure": enclosureShow(res.appendixType),

			});

			 $("div[name=requirement]").html(res.requirement)
			getAttachment(res.fileUrl, form, siteEnName, siteSecret);
		}
	});

	$.ajax({
		url: httpBaseUrl + 'api/studentNormalHomeworkDetailApi',
		type: 'GET',
		data: {"assignmentId": assignmentApi , "username": currentUsername},
		success: function (res){
			let submitTime = res.submitTime;
			let fileUrl = res.fileUrl;
			$('#fileUrl').val(""); // 渲染的时候先清空缓存
			 if (submitTime == 0){
				 $('#fileUrl').val(fileUrl);
				 layedit.setContent(index,res.commitContent);
				 if (fileUrl != "" && fileUrl != null && fileUrl){
					 $('#fileUrl').val(fileUrl);
					 let c = fileUrl.split(",");
					 resourceContainer.getFilesByIds({
						 success: function(data){
							 let result = data;

							 for (let i = 0; i < result.length; i++){
								 let row = `<tr><td class="wordbreak">${result[i].fileName}</td><td>${(result[i].size / 1024).toFixed(1) }kb </td><td>已上传</td><td><button type="button" class="layui-btn layui-btn-xs layui-btn-danger demo-delete" onclick="deleteFile(${result[i].id}, this)">删除</button></td></tr>`;
								 pblist.append(row);
							 }


						 },
						 fail: function(res){

						 },
						 fileIds:c,
						 siteEnName: siteEnName,
						 siteSecret: siteSecret
					 })
				 }
			 }
		}
	})
	// res.folderId   //文件ID

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

	layedit.build('requirement2', {
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
	})
	//监听提交
	form.on('submit(studentsubmitnormalhomeworkbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		let submitContent = $('#requirement').val(); // 当前作业内容
		let fileUrl = $('#fileUrl').val(); //上传文件id
		$.ajax({
			url: httpBaseUrl + 'api/commitTAssignmentApi?username=' + currentUsername,
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({"assignmentId": assignmentApi, "submitTime": 1, "commitContent": submitContent, "fileUrl": fileUrl}),
			success: function (data){
				parent.layer.msg(data.msg)
				parent.layui.table.reload('homeworklist'); //重载表格
				parent.layer.close(index); //再执行关闭
			}
		})
	});
	//保存草稿
	form.on('submit(studnetsavenormalhomeworkbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		let submitContent = $('#requirement').val(); // 当前作业内容
		let fileUrl = $('#fileUrl').val(); //上传文件id
		$.ajax({
			url: httpBaseUrl + 'api/commitTAssignmentApi?username=' + currentUsername,
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({"assignmentId": assignmentApi, "submitTime": 0, "commitContent": submitContent, "fileUrl": fileUrl}),
			success: function (data){
				parent.layer.msg(data.msg)
				parent.layui.table.reload('homeworklist'); //重载表格
				parent.layer.close(index); //再执行关闭
			}
		})
	});

	form.render(null, 'studentsubmitnormalhomeworkbox');
	//上传文件，选完文件后不自动上传,点击开始上传按钮上传

	//导入
	var pblist = $('#pblist');
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
					$("#fileUrl").val(""); //清空数据，避免数据重复
					obj.preview(function(index, file, result){
						fileSize = file.size;
						fileName = file.name;
					});

				},
				choose: function(obj) {
					var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
					//读取本地文件
					obj.preview(function(index, file, result) {
						var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td><div class="layui-progress" lay-filter="progress-demo-'+ index +'"><div class="layui-progress-bar" lay-percent=""></div></div></td>', '<td>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

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
							tds.eq(3).html('<button type="button"  class="layui-btn layui-btn-xs layui-btn-danger demo-delete" data="lsProjectAddfileId" onclick="delfile(this)" id='+fileIds[i]+'>删除</button>'); //清空操作



						}
					 //上传成功隐藏上传按钮
                     // $("#uploadfilesbtn").css("display","none")
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
	 window.delfile= function(e) {
		$(e).parent().parent().remove();
		uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
	}

});