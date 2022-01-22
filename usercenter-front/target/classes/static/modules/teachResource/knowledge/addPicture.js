layui.use([ 'form', 'upload'], function() {
	var $ = layui.$,
		admin = layui.admin,
		element = layui.element,
		layer = layui.layer,
		form = layui.form,
		upload = layui.upload;

	//向世界问个好
	//layer.msg('进入添加图片');

	form.render(null, 'addpicture');

	//监听提交
	form.on('submit(addpicturebtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('addpicture'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	//基础信息
	form.val('addpicture', {
		"": "", //备用
	});

	//上传文件，选完文件后不自动上传,点击开始上传按钮上传


	//图片
	var pplist = $('#pplist');
	let courseData = findCourseSiteById(siteId)
	let courseId = courseData.id;
	let coursetitle = courseData.title;
	// let courseId ="2222"
	// let coursetitle="232323"
	let path= '教学平台/' + coursetitle + '(' + courseId + ')' + '/知识/' +chapName +'/图片';
	console.log(path)
	resourceContainer.getDirectoryIdByPath({
		path: path,
		success: function (directoryId) {
			uploadListIns = upload.render({
				elem: '#projectvideo',
				url: '/upload/', //上传接口
				accept: 'image', //普通文件
				multiple: true, //多个上传
				auto: false, //是否直接选择文件后上传
				bindAction: '#uploadfilesbtn',
				data: {
					fileTags: 'image',//文件类型（image,file,video）
					siteName: '教学平台',//站点名
					username: username, //上传人
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

						pplist.append(tr);
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
							var tr = pplist.find('tr#upload-' + index[i]),
								tds = tr.children();
							tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
							tds.eq(3).html('<button type="button"  class="layui-btn layui-btn-xs layui-btn-danger demo-delete" data="lsProjectAddfileId" onclick="delfile(this)" id='+fileIds[i]+'>删除</button>'); //清空操作



						}
						//上传成功隐藏上传按钮
						//$("#uploadfilesbtn").css("display","none")
						return delete this.files[index]; //删除文件队列已经上传成功的文件
					}
					$(this).error(index, upload);
				}
				,error: function(index, upload){
					for(var i=0;i<index.length;i++){
						var tr = pplist.find('tr#upload-'+ index[i]);
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