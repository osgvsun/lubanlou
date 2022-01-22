layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate', 'upload'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate,
		upload = layui.upload;

	var currentauth = cookie.get('currauth'); //存储当前权限
	var statusCenter = cookie.get('status'); // 判断从哪一个入口来源
	var serverHostArray = document.location.href.split('/');
	var serverHostFilter = serverHostArray[0] + "//" + serverHostArray[2] + "";
	form.render(null, 'resourcebox');
	//上传文件，选完文件后不自动上传,点击开始上传按钮上传
	let labRoomNameFromCookies = cookie.get("labRoomName");
	//展示图片
	var pblist = $('#pblist');
		resourceContainer.getDirectoryIdByPath({
			path: '实验室管理平台/实验分室管理/实验室图片/' + labRoomNameFromCookies,
			success: function (directoryId) {
			let uploadListIns = upload.render({
					elem: '#projectbook',
					// url: resourceContainerHostForUpload +  '/gvsunResource/uploadFile', //上传接口
					accept: 'images', //普通文件
					multiple: true, //多个上传
					auto: false, //是否直接选择文件后上传
					bindAction: '#pbbtn', //上传按钮
					data: {
						fileTags: 'image',//文件类型（image,file,video）
						siteName: '用户中心',//站点名
						username:currentUsername, //上传人
						directoryId: directoryId,//目录id
						shareState: "私有",
					},
					choose: function(obj) {
						var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
						//读取本地文件
						obj.preview(function(index, file, result) {
							var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>', '<img src="' + result + '" alt="' + file.name + '" class="layui-upload-img">', '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">上传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

							//单个上传
							tr.find('.demo-reload').on('click', function() {
								obj.upload(index, file);
							});

							//删除
							tr.find('.demo-delete').on('click', function() {
								delete files[index]; //删除对应的文件
								tr.remove();
								uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
							});

							pblist.append(tr);
						});
					},
					done: function(res, index, upload) {
						console.log(res)
						if(res.fileIds != 0) { //上传成功
							var tr = pblist.find('tr#upload-' + index),
								tds = tr.children();
							tds.eq(3).html('<span style="color: #5FB878;">上传成功</span>');
							tds.eq(4).html(''); //清空操作
							resourceContainer.getFileById({
								fileId: res.fileIds[0],
								success: function (res) {
									$.ajax({
										url: timetableHost +'/api/labroom/saveImageForLabRoom',
										type: 'GET',
										async: false,
										data: {resourceUrl: res.id, documentName: res.fileName, labRoomId: labRoomId, type: 4},
										success: function (res) {
											layer.msg("同步实验室成功")
										},
										error: function () {
											layer.msg("同步实验室失败")
										}
									})
								},
								fail: function (reason) {
									console.log(reason);
								},
								needToken: true
							})
							return delete this.files[index]; //删除文件队列已经上传成功的文件
						}
						this.error(index, upload);


					},
					error: function(index, upload) {
						var tr = pblist.find('tr#upload-' + index),
							tds = tr.children();
						tds.eq(3).html('<span style="color: #FF5722;">上传失败</span>');
						tds.eq(4).find('.demo-reload').removeClass('layui-hide'); //显示上传
					}
				});
			},
			fail: function (reason) {
				alert("获取目录id失败:" + reason);
			},
			needToken: true
		});


	//全景图片
	var pplist = $('#pplist');
	resourceContainer.getDirectoryIdByPath({
		path: '实验室管理平台/实验分室管理/实验室全景图/' + labRoomNameFromCookies,
		success: function (directoryId) {
			console.log(directoryId)
		let uploadListIns = upload.render({
				elem: '#projectpicture',
				// url: resourceContainerHostForUpload +  '/gvsunResource/uploadFile', //上传接口
			accept: 'images', //普通文件
			multiple: true, //多个上传
			auto: false, //是否直接选择文件后上传
			bindAction: '#ppbtn', //上传按钮
			data: {
				fileTags: 'image',//文件类型（image,file,video）
				siteName: '用户中心',//站点名
				username:currentUsername, //上传人
				directoryId: directoryId,//目录id
				shareState: "私有",
			},
			choose: function(obj) {
				var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
				//读取本地文件
				obj.preview(function(index, file, result) {
					var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>', '<img src="' + result + '" alt="' + file.name + '" class="layui-upload-img">', '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">上传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

					//单个上传
					tr.find('.demo-reload').on('click', function() {
						obj.upload(index, file);
					});

					//删除
					tr.find('.demo-delete').on('click', function() {
						delete files[index]; //删除对应的文件
						tr.remove();
						uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
					});

					pplist.append(tr);
				});
			},
			done: function(res, index, upload) {
				if(res.fileIds != 0) { //上传成功
					var tr = pplist.find('tr#upload-' + index),
						tds = tr.children();
					tds.eq(3).html('<span style="color: #5FB878;">上传成功</span>');
					tds.eq(4).html(''); //清空操作
					resourceContainer.getFileById({
						fileId: res.fileIds[0],
						success: function (res) {
							$.ajax({
								url: timetableHost +'/api/labroom/saveImageForLabRoom',
								type: 'GET',
								data: {resourceUrl: res.id, documentName: res.fileName, labRoomId: labRoomId, type: 3},
								success: function (res) {
									layer.msg("同步实验室成功")
								},
								error: function () {
									layer.msg("同步实验室失败")
								}
							})
						},
						fail: function (reason) {
							console.log(reason);
						},
						needToken: true
					})
					return delete this.files[index]; //删除文件队列已经上传成功的文件
				}
				this.error(index, upload);


			},
			error: function(index, upload) {
				var tr = pplist.find('tr#upload-' + index),
					tds = tr.children();
				tds.eq(3).html('<span style="color: #FF5722;">上传失败</span>');
				tds.eq(4).find('.demo-reload').removeClass('layui-hide'); //显示上传
			}
		});
		},
		fail: function (reason) {
			alert("获取目录id失败:" + reason);
		},
		needToken: true
	});
	//相关视频
	var pvlist = $('#pvlist');
	resourceContainer.getDirectoryIdByPath({
		path: '实验室管理平台/实验分室管理/实验室视频/' + labRoomNameFromCookies,
		success: function (directoryId) {
		let uploadListIns = upload.render({
				elem: '#projectvideo',
				// url: resourceContainerHostForUpload +  '/gvsunResource/uploadFile', //上传接口
				accept: 'video', //普通文件
				multiple: true, //多个上传
				auto: false, //是否直接选择文件后上传
				bindAction: '#pvbtn', //上传按钮
				data: {
					fileTags: 'video',//文件类型（image,file,video）
					siteName: '用户中心',//站点名
					username:currentUsername, //上传人
					directoryId: directoryId,//目录id
					shareState: "私有",
				},
				choose: function(obj) {
					var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
					//读取本地文件
					obj.preview(function(index, file, result) {
						var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">上传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

						//单个上传
						tr.find('.demo-reload').on('click', function() {
							obj.upload(index, file);
						});

						//删除
						tr.find('.demo-delete').on('click', function() {
							delete files[index]; //删除对应的文件
							tr.remove();
							uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
						});

						pvlist.append(tr);
					});
				},
				done: function(res, index, upload) {
					if(res.fileIds !=  0) { //上传成功
						var tr = pvlist.find('tr#upload-' + index),
							tds = tr.children();
						tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
						tds.eq(3).html(''); //清空操作
						resourceContainer.getFileById({
							fileId: res.fileIds[0],
							success: function (res) {
								$.ajax({
									url: timetableHost +'/api/labroom/saveImageForLabRoom',
									type: 'GET',
									data: {resourceUrl: res.id, documentName: res.fileName, labRoomId: labRoomId, type: 5},
									success: function (res) {
										layer.msg("同步实验室成功")
									},
									error: function () {
										layer.msg("同步实验室失败")
									}
								})
							},
							fail: function (reason) {
								console.log(reason);
							},
							needToken: true
						});
						return delete this.files[index]; //删除文件队列已经上传成功的文件
					}
					this.error(index, upload);
				},
				error: function(index, upload) {
					var tr = pvlist.find('tr#upload-' + index),
						tds = tr.children();
					tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
					tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示上传
				}
			});
		},
		fail: function (reason) {
			alert("获取目录id失败:" + reason);
		},
		needToken: true
	});
	$.ajax({
		url: timetableHost + '/api/labroom/LabRoomImageRestList',
		type: 'POST',
		data: {roomId: labRoomId, currentUsername: currentUsername},
		success: function (res) {
			let resoult = res.data[0].list;
			if (resoult.length != 0){
				let data = resoult.filter(item => {
					return item.type === 4;
				});
				let pblist = $('#pblist');
				let dataPanoramic = resoult.filter(item => {
					return item.type === 3;
				});
				let pplist = $('#pplist');
				let dataVideo = resoult.filter(item => {
					return item.type === 5;
				});
				let pvlist = $('#pvlist');
				let dataDocument = resoult.filter(item => {
					return item.type === 2;
				});
				let ptlist = $('#ptlist');
				for (var i = 0;i < dataDocument.length;i++){
					var row = `<tr id="upload-${i}">
								<td class="wordbreak">${dataDocument[i].documentName}</td>
								<td>未知大小</td>
								<td>已上传文件</td>
								${(currentauth !== 'LABMANAGER' && currentauth !== 'EXCENTERDIRECTOR' && currentauth !== 'ACADEMYLEVELM' && currentauth !== 'SUPERADMIN') || statusCenter === 'center' || cookie.get('allstatus') == 1 ? '' : '<td><button type="button" class="layui-btn layui-btn-xs layui-btn-danger deleted" onclick="deleteFile(${dataDocument[i].id}, ${dataDocument[i].resourceUrl}, this)">删除</button></td>'}
							   </tr>`;
					ptlist.append(row);
					form.render();
				}
				for (var i = 0;i < dataVideo.length;i++){
					var row = `<tr id="upload-${i}">
								<td class="wordbreak">${dataVideo[i].documentName}</td>
								<td>未知大小</td>
								<td>已上传文件</td>
								${(currentauth !== 'LABMANAGER' && currentauth !== 'EXCENTERDIRECTOR' && currentauth !== 'ACADEMYLEVELM' && currentauth !== 'SUPERADMIN') || statusCenter === 'center' || cookie.get('allstatus') == 1 ? '' : '<td><button type="button" class="layui-btn layui-btn-xs layui-btn-danger" onclick="deleteFile(${dataVideo[i].id}, ${dataVideo[i].resourceUrl}, this)">删除</button></td>'}
							   </tr>`;
					pvlist.append(row);
					form.render();
				}
				for (let i = 0; i < dataPanoramic.length; i++) {
					getFileById(pplist, dataPanoramic[i].resourceUrl, dataPanoramic[i].id)
				}
				for (let i = 0;i < data.length;i++){
					getFileById(pblist, data[i].resourceUrl, data[i].id)
					// let row = `<tr id="upload-${i}"><td class="wordbreak">${data[i].documentName}</td><td><img src="${data.url}" alt="${data.fileName}" class="layui-upload-img showImg" title="点击预览" onclick="openImg()"/></td><td>未知大小</td><td>已上传文件</td><td><button type="button" class="layui-btn layui-btn-xs layui-btn-danger " onclick="deleteFile(${data[i].id}, ${data[i].resourceUrl}, this); return false;">删除</button></td></tr>`;
					// pblist.append(row);
					form.render();
				}
			}
		},
		error: function () {

		}
	});

	function getFileById(addNode, fileId, deleteId, msg) {
		resourceContainer.getFileById({
			success:function(result){
				console.log(result)
				let row = `<tr id="upload-${result.id}">
							<td class="wordbreak">${result.fileName}</td>
							<td><img src="${result.url}" alt="${result.fileName}" class="layui-upload-img showImg" title="点击预览" onclick="openImg(this)"/></td>
							<td>${result.stringSize}</td>
							<td>已上传文件</td>
							${(currentauth !== 'LABMANAGER' && currentauth !== 'EXCENTERDIRECTOR' && currentauth !== 'ACADEMYLEVELM' && currentauth !== 'SUPERADMIN') || statusCenter === 'center' || cookie.get('allstatus') == 1 ? '' : '<td><button type="button" class="layui-btn layui-btn-xs layui-btn-danger " onclick="deleteFile(${deleteId}, ${result.id}, this); return false;">删除</button></td>'}
						   </tr>`;
				addNode.append(row);
			},
			fail:function(res){
				console.log("失败" + res);
			},
			fileId: fileId,
			needToken:true
		})
	};
	/*查看大图*/
	window.openImg = function (obj) {
		var src = $(obj).attr('src');
		var width = $(obj).width();
		var height = $(obj).height();
		var scaleWH = width / height;
		var bigH = 550;
		var bigW = scaleWH * bigH;
		if (bigW > 1000) {
			bigW = 1000;
			bigH = bigW / scaleWH;
		}
		// 放大预览图片
		parent.layer.open({
			type: 1,
			title: false,
			closeBtn: 1,
			shadeClose: true,
			area: [bigW + 'px', bigH + 'px'], //宽高
			content: '<img width="' + bigW + '" src="' + src + '" />'
		});
	}

	//相关文档
	var ptlist = $('#ptlist');
	resourceContainer.getDirectoryIdByPath({
		path: '实验室管理平台/实验分室管理/实验室文档/' + labRoomNameFromCookies,
		success: function (directoryId) {
		var uploadListIns = upload.render({
				elem: '#projecttool',
				// url: resourceContainerHostForUpload +  '/gvsunResource/uploadFile', //上传接口
				accept: 'file', //普通文件
				multiple: true, //多个上传
				auto: false, //是否直接选择文件后上传
				bindAction: '#ptbtn', //上传按钮
				data: {
					fileTags: 'file',//文件类型（image,file,video）
					siteName: '用户中心',//站点名
					username:currentUsername, //上传人
					directoryId: directoryId,//目录id
					shareState: "私有",
				},
				choose: function(obj) {
					var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
					//读取本地文件
					obj.preview(function(index, file, result) {
						var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">上传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

						//单个上传
						tr.find('.demo-reload').on('click', function() {
							obj.upload(index, file);
						});

						//删除
						tr.find('.demo-delete').on('click', function() {
							delete files[index]; //删除对应的文件
							tr.remove();
							uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
						});

						ptlist.append(tr);
					});
				},
				done: function(res, index, upload) {
					if(res.fileIds !=  0) { //上传成功
						var tr = ptlist.find('tr#upload-' + index),
							tds = tr.children();
						tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
						tds.eq(3).html(''); //清空操作
						resourceContainer.getFileById({
							fileId: res.fileIds[0],
							success: function (res) {
								$.ajax({
									url: timetableHost +'/api/labroom/saveImageForLabRoom',
									type: 'GET',
									data: {resourceUrl: res.id, documentName: res.fileName, labRoomId: labRoomId, type: 2},
									success: function (res) {
										layer.msg("同步实验室成功")
									},
									error: function () {
										layer.msg("同步实验室失败")
									}
								})
							},
							fail: function (reason) {
								console.log(reason);
							},
							needToken: true
						});
						return delete this.files[index]; //删除文件队列已经上传成功的文件
					}
					this.error(index, upload);
				},
				error: function(index, upload) {
					var tr = ptlist.find('tr#upload-' + index),
						tds = tr.children();
					tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
					tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示上传
				}
			});
		},
		fail: function (reason) {
			alert("获取目录id失败:" + reason);
		},
		needToken: true
	})
	window.deleteFile = function (documentId, fileID, e) {
		$.ajax({
			url: timetableHost + '/api/labroom/deleteCommonDocument',
			type: 'GET',
			data: { "documentId": documentId, "labRoomId": labRoomId},
			async: false,
			success: function () {
				resourceContainer.deleteFileById({
					success:function(data){

					},
					fail:function(res){
						console.log('失败' + res)
					},
					fileId:fileID,
					needToken: true
				})

				let tr = e.parentNode.parentNode;
				tr.remove();
				layer.msg("资源容器同步删除");
			}

		})
	}

	//根据当前权限显示界面
	$(function () {
		setTimeout(() => {
			if ((currentauth !== 'LABMANAGER' && currentauth !== 'EXCENTERDIRECTOR' && currentauth !== 'ACADEMYLEVELM' && currentauth !== 'SUPERADMIN') || statusCenter === 'center' || cookie.get('allstatus') == 1) {
				$('.layui-upload-drag').remove();
				$('thead>tr>th:last-child').remove();
				// $('tbody>tr>td:last-child').remove();
				// $('.layui-btn-danger').closest('td').css('display', 'none');
			} else {
				$('.layui-upload-drag').show();
			}
		}, 1000)
	})
});