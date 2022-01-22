layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate', 'upload', 'layedit'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate,
		upload = layui.upload,
		layedit = layui.layedit;

	localStorage.clear();
	//向世界问个好
	//layer.msg('');
	form.render(null, 'equipmentbasicinfobox');
	let basicSpec = '';
	let basicScope = '';
	let basicAttention = '';
	let basicInstructions = '';
	let centerId = ''; //实验中心id
	let pblist = $('#pblist');
	let ptlist = $('#ptlist');
	let pelist = $('#pelist');
	let pvlist = $('#pvlist');

	//建立编辑器的图片接口
	layedit.set({
		uploadImage: {
			url: '' //接口url
			,
			type: '' //默认post
		}
	});
	//注意：layedit.set 一定要放在 build 前面，否则配置全局接口将无效。

	//建立主要技术指标编辑器
	var specifications = layedit.build('specifications', {
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
		]
	});

	//建立功能应用范围编辑器
	var scope = layedit.build('scope', {
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
		]
	});

	//建立注意事项编辑器
	var note = layedit.build('note', {
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
		]
	});

	//建立收费标准编辑器
	var charge = layedit.build('charge', {
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
		]
	});

	getLabRoom(form);
	// 此方法用于获取文件  //批量获取渲染不出

	window.getFilesId = function (fileId, callback, flag) {
		console.log(fileId)
		let newFileId = [];
		for (let i = 0; i < fileId.length; i++) {
			newFileId.push(fileId[i].fielId)
		}
		resourceContainer.getFilesByIds({
			success: function (res) {
				console.log(res)
				let data = res;
				let len = data.length
				// callback;
				let tbody = '';
				if (len !== 0) {
					if (flag == 1) {
						for (let i = 0; i < len; i++) {
							let uids = fileId.find(v => {
								return v.fielId == data[i].id;
							})
							tbody = `<tr>
								<td>${data[i].fileName}</td>
								<td><img src="${data[i].url}" alt="${data[i].fileName}" class="layui-upload-img showImg" title="点击预览" onclick="openImg(this)"/></td>
								<td>${data[i].stringSize}</td>
								<td>已上传</td>
								<td><button type="button" class="layui-btn layui-btn-xs layui-btn-danger demo-delete" onclick="deleteFileId('${uids.uid}', this, ${data[i].id})">删除</button></td>
							 </tr>`;
							callback.append(tbody);
							form.render();
						}

					} else if (flag == 2) {
						for (let i = 0; i < len; i++) {
							let uids = fileId.find(v => {
								return v.fielId == data[i].id;
							})
							tbody = `<tr>
								<td>${data[i].fileName}</td>
								<td>${data[i].stringSize}</td>
								<td>已上传</td>
								<td><button type="button" class="layui-btn layui-btn-xs layui-btn-normal" onclick="downLoadFile(${data[i].id})">下载</button><button type="button" class="layui-btn layui-btn-xs layui-btn-danger demo-delete" onclick="deleteFileId('${uids.uid}', this, ${data[i].id})">删除</button></td>
							 </tr>`;
							callback.append(tbody);
							form.render();
						}
					} else if (flag == 3) {
						for (let i = 0; i < len; i++) {
							let uids = fileId.find(v => {
								return v.fielId == data[i].id;
							})
							tbody = `<tr>
								<td>${data[i].fileName}</td>
								<td>${data[i].stringSize}</td>
								<td>已上传</td>
								<td><button type="button" class="layui-btn layui-btn-xs layui-btn-normal" onclick="preview('${data[i].url}', this)">预览</button><button type="button" class="layui-btn layui-btn-xs layui-btn-danger demo-delete" onclick="deleteFileId('${uids.uid}', this, ${data[i].id})">删除</button></td>
							 </tr>`;
							callback.append(tbody);
							form.render();
						}
					} else if (flag == 4) {
						//二维码
						jQuery('#qrcodeTable').qrcode({
							render: "table", //二维码生成方式
							text: `${data.url}`, //二维码内容
							width: "200", //二维码的宽度
							height: "200", //二维码的高度
							background: "#ffffff", //二维码的后景色
							foreground: "#333333", //二维码的前景色
						});
					}
				}
				$(this).attr('disabled', true);
			},
			fail: function (res) {
				console.log("失败" + res);
			},
			fileIds: newFileId,
			siteEnName: currentsiteEnName,
			siteSecret: currentsiteSecret
		})
	}
	//顶部基本信息
	getInstrumentBasic(1);
	function getInstrumentBasic(flag) {
		$.ajax({
			url: httpDeviceUrl + "getInstrumentBasicInformation",
			type: 'GET',
			async: false,
			data: {"uid": uid},
			success: function (res) {
				let data = res;
				if (data.code == 0 && data.data.length !== 0) {
					localStorage['basicInformation'] = JSON.stringify(data.data[0]);
					basicSpec = data.data[0].basicSpec;
					basicScope = data.data[0].basicScope;
					basicAttention = data.data[0].basicAttention;
					basicInstructions = data.data[0].basicInstructions;
					centerId = data.data[0].centerId;
					$('.deviceName').text('');
					$('.li_cell:eq(0)').find('span').text('');
					$('.li_cell:eq(1)').find('span').text('');
					$('.li_cell:eq(2)').find('span').text('');
					$('.li_cell:eq(3)').find('span').text('');
					$('.li_cell:eq(4)').find('span').text('');

					$('.deviceName').text(data.data[0].deviceName + '(' + data.data[0].schoolDevice + ')');
					$('.li_cell:eq(0)').find('span').append(data.data[0].devicePattern);
					$('.li_cell:eq(1)').find('span').append(data.data[0].lcCenterName + '(' + data.data[0].departmentNumber + ')');
					$('.li_cell:eq(2)').find('span').append(data.data[0].labRoomName);
					$('.li_cell:eq(3)').find('span').append(data.data[0].manufacturer);
					$('.li_cell:eq(4)').find('span').append(data.data[0].devicePrice + '元');

					form.val("equipmentbasicinfobox", {
						"labRoom": data.data[0].labRoomNumber,
					})
					if (data.data[0].insQrCodeUrl !== "" && flag === 1) {
						let arrObj = [];
						if (data.data[0].insQrCodeUrl) {
							arrObj.push(data.data[0].insQrCodeUrl);
						}
						getFilesId(arrObj, '', 4);
						// getFileId(data.data[0].insQrCodeUrl, '', 4);
					}
				} else {
					layer.msg(data.msg);
				}

			}
		});
	}


	//获取设备图片
	$.ajax({
		url: httpDeviceUrl + 'getInstrumentImgList',
		type: 'GET',
		data: {'uid': uid},
		success: function (res) {
			let data = res;
			if (data.code == 0 && data.data.length !== 0) {
				let arrObj = [];
				for (let i = 0; i < data.data.length; i++) {
					arrObj.push({"fielId": data.data[i].documentUrl, "uid": data.data[i].uid});
				}
				getFilesId(arrObj, pblist, 1);
			}
		}
	});

	//获取文档
	$.ajax({
		url: httpDeviceUrl + 'getInstrumentDocList',
		type: 'GET',
		data: {'uid': uid},
		success: function (res) {
			let data = res;
			if (data.code == 0 && data.data.length !== 0) {
				let arrObj = [];
				for (let i = 0; i < data.data.length; i++) {
					arrObj.push({"fielId": data.data[i].documentUrl, "uid": data.data[i].uid});
				}
				getFilesId(arrObj, ptlist, 2)
			}
		}
	});

	//获取附件
	$.ajax({
		url: httpDeviceUrl + 'getInstrumentAttachmentList',
		type: 'GET',
		data: {'uid': uid},
		success: function (res) {
			let data = res;
			if (data.code === 0 && data.data.length !== 0) {
				let arrObj = [];
				for (let i = 0; i < data.data.length; i++) {
					arrObj.push({"fielId": data.data[i].documentUrl, "uid": data.data[i].uid});
				}
				getFilesId(arrObj, pelist, 2);
			}
		}
	});

	//获取视频
	$.ajax({
		url: httpDeviceUrl + 'getInstrumentVideoList',
		type: 'GET',
		data: {'uid': uid},
		success: function (res) {
			let data = res;
			if (data.code === 0 && data.data.length !== 0) {
				let arrObj = [];
				for (let i = 0; i < data.data.length; i++) {
					arrObj.push({"fielId": data.data[i].documentUrl, "uid": data.data[i].uid});
				}
				getFilesId(arrObj, pvlist, 3)

			}
		}
	});

	//获取一级分类
	$.ajax({
		url: httpDeviceUrl + 'getFirstClassificationList',
		type: 'GET',
		async: false,
		success: function (res) {
			let data = res;
			if (data.code == 0 && data.data.length !== 0){
				// for (let i = 0; i < data.data.length; i)
				for (let i in data.data) {
					let input = `<input type="checkbox" name="firstlevel" class="${data.data[i].code}" value="${data.data[i].code}" title="${data.data[i].cname}" lay-filter="firstlevel">`;
					$('.firstlevel').append(input);
					form.render();
				}
			} else {
				layer.msg(data.msg)
			}
		}
	});

	//获取二级分类
	function secondlevel(code, flag) {
		$.ajax({
			url: httpDeviceUrl + 'getSecondClassificationList',
			type: 'GET',
			async: false,
			data: {'code': code},
			success: function (res) {
				let data = res;
				if (data.code === 0 && data.data.length !== null) {
					for(let i in data.data) {
						let input = `<input type="checkbox" class="${data.data[i].code}" name="secondlevel" value="${data.data[i].code}" title="${data.data[i].cname}">`;
						if (flag) {
							$('.secondlevel').parent().show();
							$('.secondlevel').append(input);
						} else {
							$('.' +`${data.data[i].code}`).next().remove();
							$('.' +`${data.data[i].code}`).remove();
						}
						form.render('checkbox');
					}
				}
				if ($('.secondlevel').children().length === 0) {
					$('.secondlevel').parent().hide();
				}
			}
		})
	}

	if ($('.secondlevel').children().length === 0) {
		$('.secondlevel').parent().hide();
	}
	//一级分类监听
	form.on('checkbox(firstlevel)', function(data){
		let code = data.value;
		let flag = data.elem.checked;
		secondlevel(code, flag);
	});
	// 提交时需要获取，configUid
	let configUid = '';
	//仪器一级、二级分类，信息
	$.ajax({
		url: httpDeviceUrl + 'getAppBasicSettings',
		type: 'GET',
		async: false,
		data: {'insUid': uid, "configType": configType},
		success: function (res) {
			let data = res;
			if (data.code === 0 && data.data !== null && data.data !== "") {
				configUid = data.data.uid;
				//一级分类回显
				if (data.data.basicType !== "" && data.data.basicType !== null) {
					let code = data.data.basicType.split(",");
					for (let i in code) {
						secondlevel(code[i], true);
						$('.' + code[i]).prop("checked", true);
					}
				}
				//二级分类回显
				if (data.data.basicTypeSecond !== "" && data.data.basicTypeSecond !== null) {
					let codeSecond = data.data.basicTypeSecond.split(",");
					for (let i in codeSecond) {
						$('.' + codeSecond[i]).prop("checked", true);
					}
				}

			} else if (data.code !== 0){
				layer.msg(data.msg);
			}
			form.render('checkbox');
		}
	})


	//富文本赋值
	layedit.setContent(specifications, basicSpec, false);
	layedit.setContent(scope, basicScope, false);
	layedit.setContent(note, basicAttention, false);
	layedit.setContent(charge, basicInstructions, false);

	//上传文件，选完文件后不自动上传,点击开始上传按钮上传
	layedit.sync(specifications);
	layedit.sync(scope);
	layedit.sync(note);
	layedit.sync(charge);

	//监听提交
	form.on('submit(equipmentbasicinfobtn)', function(data) {
		var field = data.field; //获取提交的字段

		var firstlevel = $("input[name='firstlevel']");
		var secondlevel = $("input[name='secondlevel']");
		var firstArray = [];
		var secondArray = [];
		if (firstlevel.length !== 0) {
			for (let i = 0; i < firstlevel.length; i++) {
				if (firstlevel[i].checked === true) {
					firstArray.push(firstlevel[i].value);
				}
			}
		}
		if (secondlevel.length !== 0) {
			for (let i = 0; i < secondlevel.length; i++) {
				if (secondlevel[i].checked === true) {
					secondArray.push(secondlevel[i].value);
				}
			}
		}
		var data = {
			"basicSpec": layedit.getContent(specifications),
			"basicScope": layedit.getContent(scope),
			"basicAttention": layedit.getContent(note),
			"basicInstructions": layedit.getContent(charge),
			"basicType": firstArray.join(","),
			"basicTypeSecond": secondArray.join(",")

		}

		$.ajax({
			url: httpDeviceUrl + 'saveInsConfigBasicInfo?uid=' + configUid,
			type: 'POST',
			data: data,
			success: function (res) {
				layer.msg(res.msg);
			}
		})
	});
	//预览
	window.preview = function (url, obj) {
		let oDiv = document.createElement('div');
		let oVideo = document.createElement('video');
		let oSpan = document.createElement('span');
		// let body = document.getElementsByTagName('body');
		// let video = `<video></video>`;
		oDiv.id = 'childModel';
		oVideo.src = url;
		oVideo.controls = 'controls';
		oSpan.innerHTML = 'X';
		oSpan.id = 'close';
		oDiv.appendChild(oSpan);
		oDiv.appendChild(oVideo);
		// oDiv.style.top = $(obj).offset().top - 250 + 'px';
		oDiv.style.top = '20px';
		$('.content_box').before(oDiv);
		oDiv.scrollIntoView(true);
		oSpan.onclick = function () {
			oDiv.parentNode.removeChild(oDiv);
		}
	};

	// 文件，下载
	window.downLoadFile = function (id){
		resourceContainer.downLoadFile({
			fileId:id,
			fail: function(res){
				console.log("失败" + res)
			}
		})
	};

	/*查看大图*/
	window.openImg = function (obj) {
		var src = $(obj).attr("src");
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

		// jQuery('#qrcodeCanvas').qrcode({
	// 	render: "canvas",
	// 	text: "http://www.baidu.com",
	// 	width: "200", //二维码的宽度
	// 	height: "200", //二维码的高度
	// 	background: "#ffffff", //二维码的后景色
	// 	foreground: "#409eff", //二维码的前景色
	// 	src: '../layuiadmin/static/images/user_head.jpg' //二维码中间的图片
	// });

	window.deleteFileId = function (uid, obj, fileId) {
		$.ajax({
			url: httpDeviceUrl + '/delCommonDocument?uid=' + uid,
			type: 'POST',
			success: function (res) {
				console.log(res)
				if (res.code === 0) {
					$(obj).closest('tr').remove();
					resourceContainer.deleteFileById({
						success: function (data) {

						},
						fail: function (res) {
							console.log("失败" + res);
						},
						id: fileId,
						needToken: true,
					})
					layer.msg('删除成功');
				}
			}

		})
	}
	//设备图片
	resourceContainer.getDirectoryIdByPath({
		path: '大型仪器/仪器管理/图片',
		success: function (directoryId) {
			var	uploadListIns = upload.render({
				elem: '#projectbook',
				elemList: $('#pblist'), //列表元素对象
				// url: '/upload/', //上传接口
				accept: 'images', //普通文件
				multiple: true, //多个上传
				auto: false, //是否直接选择文件后上传
				bindAction: '#pbbtn', //上传按钮
				data: {
					fileTags: 'image',//文件类型（image,file,video）
					siteName: '大型仪器',//站点名
					username: currentUsername, //上传人
					directoryId: directoryId,//目录id
					shareState: "私有",
				},
				choose: function(obj) {
					var that = this;
					var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
					//读取本地文件
					obj.preview(function(index, file, result) {
						var tr;
						// if (flag === 1) {
						var	tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>', '<img src="' + result + '" alt="' + file.name + '" class="layui-upload-img">', '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));
						// }
						// if (flag === 2) {
						// 	tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));
						// }

						//单个重传
						tr.find('.demo-reload').on('click', function() {
							obj.upload(index, file);
						});

						//删除
						tr.find('.demo-delete').on('click', function() {
							delete files[index]; //删除对应的文件
							tr.remove();
							uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
						});

						that.elemList.append(tr);
					});
				},
				done: function(res, index, upload) {
					if(res) { //上传成功
						for (let i = 0; i < res.fileIds.length; i++) {
							var tr = pblist.find('tr#upload-' + index[i]),
								tds = tr.children();
							tds.eq(3).html('<span style="color: #5FB878;">上传成功</span>');
							// tds.eq(3).html(''); //清空操作
							var data = {
								"uid": uid,
								"fileId": res.fileIds[i],
								"fileName": tds.eq(0).text(),
								"type": 1,
								"username": currentUsername,
								"centerId": centerId
							}
							$.ajax({
								url: httpDeviceUrl + 'saveCommonDocument',
								type: 'POST',
								data: data,
								async: false,
								success: function (resImgList) {
									$.ajax({
										url: httpDeviceUrl + 'getInstrumentImgList',
										type: 'GET',
										async: false,
										data: {'uid': uid},
										success: function (resList) {
											if (resList.code === 0) {
												let result = resList.data;
												let resultData = result.find(v => {
													return v.documentUrl = res.fileIds[i];
												})
												let operation = `<button type="button" class="layui-btn layui-btn-xs layui-btn-danger demo-delete" onclick="deleteFileId('${resultData.uid}', this, ${resultData.documentUrl})">删除</button>`;
												tds.eq(4).html(operation);
											}
										}
									})
								}
							})

						}
						return delete this.files[index]; //删除文件队列已经上传成功的文件
					}
					this.error(index, upload);
				},
				error: function(index, upload) {
					var tr = pblist.find('tr#upload-' + index),
						tds = tr.children();
					tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
					tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
				}
			});
		},
		fail: function (reason) {
			alert("获取目录id失败:" + reason);
		}, needToken: true
	});

	//相关文档
	resourceContainer.getDirectoryIdByPath({
		path: '大型仪器/仪器管理/文档',
		success: function (directoryId) {
			var	uploadListIns = upload.render({
				elem: '#projecttool',
				elemList: ptlist, //列表元素对象
				// url: '/upload/', //上传接口
				accept: 'file', //普通文件
				multiple: true, //多个上传
				auto: false, //是否直接选择文件后上传
				bindAction: '#ptbtn', //上传按钮
				data: {
					fileTags: 'file',//文件类型（image,file,video）
					siteName: '大型仪器',//站点名
					username: currentUsername, //上传人
					directoryId: directoryId,//目录id
					shareState: "私有",
				},
				choose: function(obj) {
					var that = this;
					var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
					//读取本地文件
					obj.preview(function(index, file, result) {
						var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));
						//单个重传
						tr.find('.demo-reload').on('click', function() {
							obj.upload(index, file);
						});

						//删除
						tr.find('.demo-delete').on('click', function() {
							delete files[index]; //删除对应的文件
							tr.remove();
							uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
						});

						that.elemList.append(tr);
					});
				},
				done: function(res, index, upload) {
					if(res) { //上传成功
						for (let i = 0; i < res.fileIds.length; i++) {
							var tr = ptlist.find('tr#upload-' + index[i]),
								tds = tr.children();
							tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
							// tds.eq(3).html(''); //清空操作
							var data = {
								"uid": uid,
								"fileId": res.fileIds[i],
								"fileName": tds.eq(0).text(),
								"type": 2,
								"username": currentUsername,
								"centerId": centerId
							}
							$.ajax({
								url: httpDeviceUrl + 'saveCommonDocument',
								type: 'POST',
								data: data,
								async: false,
								success: function (resDocList) {
									$.ajax({
										url: httpDeviceUrl + 'getInstrumentDocList',
										type: 'GET',
										async: false,
										data: {'uid': uid},
										success: function (resList) {
											if (resList.code === 0) {
												let result = resList.data;
												let resultData = result.find(v => {
													return v.documentUrl = res.fileIds[i];
												})
												let operation = `<button type="button" class="layui-btn layui-btn-xs layui-btn-danger demo-delete" onclick="deleteFileId('${resultData.uid}', this, ${resultData.documentUrl})">删除</button>`;
												tds.eq(3).html(operation);
											}
										}
									})
								}
							})

						}
						return delete this.files[index]; //删除文件队列已经上传成功的文件
					}
					this.error(index, upload);
				},
				error: function(index, upload) {
					var tr = ptlist.find('tr#upload-' + index),
						tds = tr.children();
					tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
					tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
				}
			});
		},
		fail: function (reason) {
			alert("获取目录id失败:" + reason);
		}, needToken: true
	});
	//相关文档
	resourceContainer.getDirectoryIdByPath({
		path: '大型仪器/仪器管理/附件',
		success: function (directoryId) {
			var	uploadListIns = upload.render({
				elem: '#projectenclosure',
				elemList: pelist, //列表元素对象
				// url: '/upload/', //上传接口
				accept: 'file', //普通文件
				multiple: true, //多个上传
				auto: false, //是否直接选择文件后上传
				bindAction: '#pebtn', //上传按钮
				data: {
					fileTags: 'file',//文件类型（image,file,video）
					siteName: '大型仪器',//站点名
					username: currentUsername, //上传人
					directoryId: directoryId,//目录id
					shareState: "私有",
				},
				choose: function(obj) {
					var that = this;
					var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
					//读取本地文件
					obj.preview(function(index, file, result) {
						var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));
						//单个重传
						tr.find('.demo-reload').on('click', function() {
							obj.upload(index, file);
						});

						//删除
						tr.find('.demo-delete').on('click', function() {
							delete files[index]; //删除对应的文件
							tr.remove();
							uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
						});

						that.elemList.append(tr);
					});
				},
				done: function(res, index, upload) {
					if(res) { //上传成功
						for (let i = 0; i < res.fileIds.length; i++) {
							var tr = pelist.find('tr#upload-' + index[i]),
								tds = tr.children();
							tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
							// tds.eq(3).html(''); //清空操作
							var data = {
								"uid": uid,
								"fileId": res.fileIds[i],
								"fileName": tds.eq(0).text(),
								"type": 3,
								"username": currentUsername,
								"centerId": centerId
							}
							$.ajax({
								url: httpDeviceUrl + 'saveCommonDocument',
								type: 'POST',
								data: data,
								async: false,
								success: function (resDocument) {
									$.ajax({
										url: httpDeviceUrl + 'getInstrumentAttachmentList',
										type: 'GET',
										async: false,
										data: {'uid': uid},
										success: function (resList) {
											if (resList.code === 0) {
												let result = resList.data;
												let resultData = result.find(v => {
													return v.documentUrl = res.fileIds[i];
												})
												let operation = `<button type="button" class="layui-btn layui-btn-xs layui-btn-danger demo-delete" onclick="deleteFileId('${resultData.uid}', this, ${resultData.documentUrl})">删除</button>`;
												tds.eq(3).html(operation);
											}
										}
									})
								}
							})

						}
						return delete this.files[index]; //删除文件队列已经上传成功的文件
					}
					this.error(index, upload);
				},
				error: function(index, upload) {
					var tr = pelist.find('tr#upload-' + index),
						tds = tr.children();
					tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
					tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
				}
			});
		},
		fail: function (reason) {
			alert("获取目录id失败:" + reason);
		}, needToken: true
	});
	//相关文档
	resourceContainer.getDirectoryIdByPath({
		path: '大型仪器/仪器管理/视频',
		success: function (directoryId) {
			let	uploadListIns = upload.render({
				elem: '#projectvideo',
				elemList: pvlist, //列表元素对象
				// url: '/upload/', //上传接口
				accept: 'video', //普通文件
				multiple: true, //多个上传
				auto: false, //是否直接选择文件后上传
				bindAction: '#pvbtn', //上传按钮
				data: {
					fileTags: 'video',//文件类型（image,file,video）
					siteName: '大型仪器',//站点名
					username: currentUsername, //上传人
					directoryId: directoryId,//目录id
					shareState: "私有",
				},
				choose: function(obj) {
					var that = this;
					var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
					//读取本地文件
					obj.preview(function(index, file, result) {
						var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));
						//单个重传
						tr.find('.demo-reload').on('click', function() {
							obj.upload(index, file);
						});

						//删除
						tr.find('.demo-delete').on('click', function() {
							delete files[index]; //删除对应的文件
							tr.remove();
							uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
						});

						that.elemList.append(tr);
					});
				},
				done: function(res, index, upload) {
					if(res) { //上传成功
						for (let i = 0; i < res.fileIds.length; i++) {
							var tr = pvlist.find('tr#upload-' + index[i]),
								tds = tr.children();
							tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
							// tds.eq(3).html(''); //清空操作
							var data = {
								"uid": uid,
								"fileId": res.fileIds[i],
								"fileName": tds.eq(0).text(),
								"type": 4,
								"username": currentUsername,
								"centerId": centerId
							}
							$.ajax({
								url: httpDeviceUrl + 'saveCommonDocument',
								type: 'POST',
								data: data,
								async: false,
								success: function (resVideo) {
									$.ajax({
										url: httpDeviceUrl + 'getInstrumentVideoList',
										type: 'GET',
										async: false,
										data: {'uid': uid},
										success: function (resList) {
											if (resList.code === 0) {
												let result = resList.data;
												let resultData = result.find(v => {
													return v.documentUrl = res.fileIds[i];
												})
												let operation = `<button type="button" class="layui-btn layui-btn-xs layui-btn-danger demo-delete" onclick="deleteFileId('${resultData.uid}', this, ${resultData.documentUrl})">删除</button>`;
												tds.eq(3).html(operation);
											}
										}
									})
								}
							})

						}
						return delete this.files[index]; //删除文件队列已经上传成功的文件
					}
					this.error(index, upload);
				},
				error: function(index, upload) {
					var tr = pvlist.find('tr#upload-' + index),
						tds = tr.children();
					tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
					tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
				}
			});
		},
		fail: function (reason) {
			alert("获取目录id失败:" + reason);
		}, needToken: true
	});

	//修改所属实验室
	$(".editLabRoom").on('click', function () {
		let labRoom = $("select[name='labRoom']").val();
		let labRoomId = '';
		let labRoomName = '';
		$("select[name='labRoom']").find('option').each(function (index, obj) {
			if ($(obj).val() === labRoom) {
				labRoomId = $(obj).attr('label');
				labRoomName = $(obj).text();
			}
		})
		$.ajax({
			url: httpDeviceUrl + 'changeInstrumentLabRoom',
			type: 'POST',
			data: {"insUid": uid, "labRoomId": labRoomId},
			success: function (res) {
				if (res.code === 0) {
					localStorage.removeItem('basicInformation')
					getInstrumentBasic(2);
				}
			}
		})
	})
	//打开新增设备管理员
	var newequipmentmanager = {
		newequipmentmanager: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增设备管理员',
				area: ['500px', '360px'],
				shade: 0.5,
				maxmin: true,
				content: 'newEquipmentManager?uid=' + uid,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newequipmentmanagerbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newequipmentmanager').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newequipmentmanager[method] ? newequipmentmanager[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#equipmentmanager',
		url: httpDeviceUrl + 'getInstrumentManagerList', //数据接口
		method: 'GET',
		where: {'uid': uid},
		title: '列表',
		cellMinWidth: 100,
		page: false, //开启分页
		// page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
		// 	layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
		// 	//curr: 5, //设定初始在第 5 页
		// 	groups: 1, //只显示 1 个连续页码
		// 	first: false, //不显示首页
		// 	last: false //不显示尾页
		// },
		cols: [
			[ //表头
				{
					fixed: 'left',
					title: '序号',
					type: 'numbers',
					width: 50
				}, {
					field: 'username',
					title: '学号',
					sort: true
				}, {
					field: 'cname',
					title: '管理员名称',
					sort: true
				}, {
					field: 'academyName',
					title: '所在学院',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 80
				}
			]
		],
		id: 'equipmentmanager',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		// limits: [5, 7, 10, 20],
		// limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(equipmentmanager)', function(obj) {
		var data = obj.data;
		//删除
		if(obj.event === 'del') {
			layer.confirm('是否删除？', {
				title: '提示'
			}, function(index) {
				$.ajax({
					url: httpDeviceUrl + 'delInstrumentAdmin',
					type: 'POST',
					data: {"insUid": uid, "username": data.username},
					success: function (res) {
						console.log(res)
						if (res.code === 0) {
							obj.del();
							layer.close(index);
							parent.layer.msg('删除成功')
						} else {
							parent.layer.msg(res.msg)
						}

					}
				})

			});
		}
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('equipmentmanager', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						key: {
							name: searchbox.val()
						}
					}
				}, 'data');
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});

});