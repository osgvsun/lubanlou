layui.use(['form', 'laydate', 'element', 'transfer', 'formSelects', 'layedit', 'upload', 'transfer'], function() {
	var $ = layui.jquery,
		form = layui.form,
		laydate = layui.laydate,
		layer = layui.layer,
		formSelects = layui.formSelects,
		layedit = layui.layedit,
		upload = layui.upload,
		element = layui.element,
		transfer = layui.transfer;

	let storage = new Storage();
	let category = type;
	if (type === null || type === "null" || type === "") {
		type = 'knowledge';
	}
	if (title_head === null || title_head === "null" || title_head === "") {
		title_head = 'assignment';
	}
	if (type === "200") {
		type = 'skill';
	}
	//根据设置权限显示表单
	let getConfiguration = {};
	$.ajax({
		url: httpBaseUrl + 'api/getConfigShowData',
		type: 'GET',
		async: false,
		data: {"module": type, "type": title_head},
		success: function (res){
			let data = res;
			getConfiguration = data;
			if (data != null){
				if(data.lesson == '1'){
					$('#lesson').closest('.layui-col-lg4').show();

				} else {
					$("select[name='lesson']").removeAttr("lay-verify");
				}
				if(data.transcript == '1'){
					$("input[name='isToGradebook']").closest('.layui-col-lg4').show();
				}
				if(data.duplicateChecking == '1'){
					$("input[name='isDuplicateChecking']").closest('.layui-col-lg4').show();
				}
				if(data.group == '0'){
					$("input[name='type']").each(function (index, obj){
						if ($(obj).val() == '1'){
							obj.disabled = true
						}
						form.render();
					})
				}
				if(data.onlineMarking == '0'){
					// $("input[name='isToGradebook']").closest('.layui-col-lg4').hide();
				}
				if(data.repeatAssignment == '0'){ //重复作业
					$("input[name='repeatwork']").each(function (index, obj){
						if ($(obj).val() == '开启重复作业'){
							obj.disabled = true
						}
						form.render();
					})
				}

				let selectArrType = [];
				for (let value in data) {
					if (value === 'noLimit') {
						selectArrType.push({"name": value, "value": data[value]})
					}
					if (value === 'pdf') {
						selectArrType.push({"name": value, "value": data[value]})
					}
					if (value === 'word') {
						selectArrType.push({"name": value, "value": data[value]})
					}
					if (value === 'excel') {
						selectArrType.push({"name": value, "value": data[value]})
					}
					if (value === 'pic') {
						selectArrType.push({"name": value, "value": data[value]})
					}
					if (value === 'txt') {
						selectArrType.push({"name": value, "value": data[value]})
					}
				}
				let selectArr = [];
				for (let i = 0; i < selectArrType.length; i++) {
					if (selectArrType[i].name === 'noLimit' && selectArrType[i].value === 1) {
						selectArr.push(
							{"name": "所有", "value": 0},
							{"name": "PDF", "value": 1},
							{"name": "WORD", "value": 2},
							{"name": "EXCEL", "value": 3},
							{"name": "图片", "value": 4},
							{"name": 'TXT', "value": 5});
						i = selectArrType.length;
					} else if (selectArrType[i].name === 'pdf' && selectArrType[i].value === 1) {
						selectArr.push({"name": "PDF", "value": 1})
					} else if (selectArrType[i].name === 'word' && selectArrType[i].value === 1) {
						selectArr.push({"name": "WORD", "value": 2})
					} else if (selectArrType[i].name === 'excel' && selectArrType[i].value === 1) {
						selectArr.push({"name": "EXCEL", "value": 3})
					} else if (selectArrType[i].name === 'pic' && selectArrType[i].value === 1) {
						selectArr.push({"name": "图片", "value": 4})
					} else if (selectArrType[i].name === 'txt' && selectArrType[i].value === 1) {
						selectArr.push({"name": "TXT", "value": 5})
					}
				}
				if (selectArr.length === 0) {
					$('#appendixType1').removeAttr('lay-verify').removeAttr('_lay-verify');
					$("input[name='appendixType']").removeAttr('lay-verify');
				}
				formSelects.data('appendixType', 'local', {
					arr: selectArr
				})
				if (data.experiment === 1 && type === "skill") {
					$('#project').closest('.layui-col-lg4').show();
					// 渲染实验项目
					projectData(siteId, form);
				}
				if (data.experiment !== 1) {
					$("select[name='project']").removeAttr("lay-verify");
				}
			} else {
				$('#lesson').closest('.layui-col-lg4').show();
				$("input[name='isToGradebook']").closest('.layui-col-lg4').show();
				$("input[name='isDuplicateChecking']").closest('.layui-col-lg4').show();
			}

			if (type === "knowledge" || type == 'null' || type == '' || type === null){
				selectChapter(1, form, siteId);
			} else if (type === 'skill') {
				selectChapter(200, form, siteId);
			} else if (type === 'experience'){
				selectChapter(3, form, siteId);
				//根据需求章节可选
			} else {
				selectChapter(200, form, siteId);
			}
		}
	});

	formSelects.on('appendixType', function(id, vals, val, isAdd, isDisabled){
		let nameStatus = val.value;
		let isAddStatus = isAdd;
		let arr = [];
		for (let i = 0; i < vals.length; i++) {
			if (vals[i].value == '0'){
				arr.push(0);
			} else {
				arr.push(vals[i].value);
			}
		}
		if (nameStatus == '0' && isAddStatus){
			$('#appendixType1').next().find('dd').each(function (index, obj) {
				if ($(obj).attr('lay-value') != '0') {
					$(obj).addClass('xm-dis-disabled');
					$(obj).removeClass('xm-select-this')
					formSelects.value('appendixType', ['0'])
				}
			});
		}
		if (vals.length == 0 || (nameStatus == '0' && isAddStatus == false)) {
			$('#appendixType1').next().find('dd').each(function (index, obj) {
				if (index > 2) {
					$(obj).removeClass('xm-dis-disabled');
				}
			});
		}


	}, true);
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
	var requirement = layedit.build('requirement', {
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
	//数据同步
	form.verify({
		requirement: function (value){
			layedit.sync(requirement);
		}
	});
	//监听日期天数的变化
	let startdateVal = $('#startdate').val();
	if (startdateVal == null || startdateVal == ""){
		let d = new Date();
		startdateVal =d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
	} else {
		startdateVal = $('#startdate').val();
	}
	//页面初次加载时日期默认14天
	$("#endDate").val(getNewData(startdateVal, 14));
	$(".short_inputtext").bind('input porpertychange',function(){
		let days = $(this).val();
		$("#endDate").val(getNewData(startdateVal, days));
	});

	//监听提交
	form.on('submit(newhomeworkbtn)', function(data) {
		var field = data.field; //获取提交的字段
		let requirementContent = layedit.getContent(requirement)
		var parentIndex = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		let arr = getField(field, getConfiguration, transfer, numOrdinary, numTeam, requirementContent, category);
		let chapter=getConfiguration.chapter
		if(field.chapterId==-1 && chapter==1){
			layer.msg("请选择所属章节")
		}else {
			$.ajax({
				type: 'POST',
				url: httpBaseUrl + "api/saveAssignmentApi?cid=" + siteId + '&username=' + username,
				data: JSON.stringify(arr),
				contentType: "application/json",
				async: false,
				success: function (res) {
					//提交 Ajax 成功后，关闭当前弹层并重载表格
					//$.ajax({});
					parent.layer.close(parentIndex); //再执行关闭
					parent.layui.table.reload('homeworklist'); //重载表格

				},
				error: function (s) {
					console.log(s)
				}
			});
		}


	});


	//保存草稿
	form.on('submit(savehomeworkbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		let requirementContent = layedit.getContent(requirement)
		//获取用户编辑的内容用于保存回显数据
		let arr = getField(field, getConfiguration, transfer, numOrdinary, numTeam, requirementContent, category);
		storage.setItem({
			name: 'saveDraft',
			value: arr,
			expires: '1209600000'   //默认缓存14天
		});
		localStorage.setItem('status', 1);
		parent.layer.close(index); //再执行关闭
	});
	let status = localStorage.getItem('status');  //使用未封装方法 包裹 进行状态确认 回显数据
	if (status == 1) {
		let saveDraft = storage.getItem('saveDraft');

		form.val('newhomeworkbox', {
			//基础信息回显
			"title": saveDraft.title,
			"chapterId": saveDraft.chapterId,
			"lessonId": saveDraft.lessonId,
			"starttype": saveDraft.starttype,
			//作业设置
			"isToGradebook": saveDraft.isToGradebook,
			"isDuplicateChecking": saveDraft.isDuplicateChecking,
			"isGradeToStudent": saveDraft.isGradeToStudent,
			"commitTime": saveDraft.commitTime,
			"submitLate": saveDraft.submitLate,
			"commitType": saveDraft.commitType,
			//作业要求
			"requirement": layedit.setContent(requirement, saveDraft.requirement),
			//作业类型
			"type": saveDraft.type,

		});

		formSelects.value('appendixType', saveDraft.appendixType.split(','));
		if (saveDraft.starttype == 0){
			$(".startclass").hide();
			$(".startdate").show();
			$(".startduration").show();
			form.val('newhomeworkbox', {
				"startDate": saveDraft.startDate,
				"duration": saveDraft.duration
			});
		};

		if (saveDraft.commitTime == 1) {
			$(".submitnum_box").show();
			form.val('newhomeworkbox', {
				"submitnum": saveDraft.submitnum
			})
		}
		//作业类型
		if (saveDraft.type == 1){
			form.val('newhomeworkbox', {
				"groupSource": saveDraft.groupSource
			})
			//小组作业回显
			if (saveDraft.groupSource == '1') {
				if (parseFloat(saveDraft.groupNum) != 'NaN') {
					getChildTeam(saveDraft.groupNum); //小组自定义批量添加赋值
				}
				// if ()  小组自定义添加暂缓
			}

		} else {
			form.val('newhomeworkbox', {
				"repeatwork": saveDraft.repeatwork
			});
			//类型下级细分
			// 普通作业回显
			if (saveDraft.repeatwork == "开启重复作业") {
				if (parseFloat(saveDraft.repeatNum) != 'NaN') {
					getChildOrdinary(saveDraft.repeatNum); //重复作业批量添加赋值
				}
				if (saveDraft.repeatStarts.length != 0){ //根据新增次数回显
					$(".normal_homework_box").show();
					for (let i = 0; i < saveDraft.repeatStarts.length; i++) {
						let row = addHomeworkModel(i);
						$('.new_normal_homework').append(row);
					}
					//赋值操作
					$('.once_normal_homework_box').each(function (index, obj) {
						$(obj).find('.repeatTitles').val(saveDraft.repeatTitles[index]);
						$(obj).find('.repeatStarts').val(saveDraft.repeatStarts[index])
						$(obj).find('.repeatEnds').val(saveDraft.repeatEnds[index])
						$(obj).find('.repeatRequirements').val(saveDraft.repeatRequirements[index])
					})

				}

			}
		}
		//附件回显
		tableAttachmentEcho(saveDraft.fileUrl, $('#pblist'), siteEnName, siteSecret);
	}

	form.on('select(chapter)', function(data){
		let results = data.value;
		//渲染节
		$.ajax({
			url: httpBaseUrl + 'api/lessonListApi',
			type: 'GET',
			data: {"chapterId": results},
			success: function (res){
				for (let i = 0; i < res.length; i++){
					let lessonList = `<option value="${res[i].id}">${res[i].title}</option>`;
					$('#lesson').append(lessonList);
					form.render('select');
				}
			}
		})
	});

	form.render(null, 'newhomeworkbox');
	//信息
	form.val('newhomeworkbox', {
		"score": "100",
		"category": (category === 'knowledge' || category === 'null' || category === null || category === '') ? '知识' : category === 'skill' ? '实验作业' :  category === 'experience' ? '体验作业' : (category == '200' && title_head == 'data') ? '实验数据' : (category == '200' && title_head == 'report') ? '实验报告' : '',
		"duration": "14"
	});

	//开始时间
	form.on('radio(starttype)', function(starttype) {
		var starttype = starttype.value;
		if(starttype == "1") {
			$(".startclass").show();
			$(".startdate").hide();
			$(".startduration").hide();
		} else {
			$(".startclass").hide();
			$(".startdate").show();
			$(".startduration").show();
		}
	});

	//打开选择开始节次
	var chooseclass = {
		chooseclass: function() {
			//layer.msg('新增作业');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '选择开始节次',
				area: ['660px', '445px'],
				shade: 0.5,
				maxmin: true,
				content: 'chooseClass',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#chooseclassbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.chooseclass').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		chooseclass[method] ? chooseclass[method].call(this, othis) : '';
	});

	//作业开始时间
	laydate.render({
		elem: '#startdate',
		type: 'date',
		format: "yyyy-MM-dd HH:mm:ss",
		// 当前日期 --添加下面这句
		value: new Date(),
		done: function(value, date, endDate) {

		}
	});
	//作业开始时间
	laydate.render({
		elem: '#startDate',
		type: 'date',
		format: "yyyy-MM-dd HH:mm:ss",
		// 当前日期 --添加下面这句
		value: new Date(),
		done: function(value, date, endDate) {

		}
	});

	//提交次数
	form.on('radio(submittimes)', function(submittimes) {
		var submittimes = submittimes.value;
		if(submittimes == "0") {
			$(".submitnum_box").hide();
		} else {
			$(".submitnum_box").show();
		}
	});

	//提交形式
	form.on('select(submittype)', function(submittype) {
		var submittype = submittype.value;
		if(submittype == "1") {
			$(".enclosure_type").show();
		} else if(submittype == "3") {
			$(".enclosure_type").show();
		} else {
			$(".enclosure_type").hide();
			$("#appendixType1").removeAttr("_lay-verify");
			$("#appendixType1").removeAttr("lay-verify");
			$("input[name=appendixType]").removeAttr("lay-verify");

		}
		form.render()
	});

	//附件类型	
	//formSelects.value('enclosure', [2, 3, 4], true); //多个举例
	// formSelects.value('enclosure', [1], true); //测试数据



	//上传文件，选完文件后不自动上传,点击开始上传按钮上传

	//导入
	var pblist = $('#pblist');
	//获取当前课程ID，标题
	let courseId;
	let coursetitle;
	let dataCourse = findCourseSiteById(siteId);
	courseId = dataCourse.id;
	coursetitle = dataCourse.title;
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
					username: username, //上传人
					directoryId: directoryId,//目录id
					shareState: "私有",
				},
				field:'files',
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

	//批量添加普通作业
	var morenormalhomework = {
		morenormalhomework: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '批量添加普通作业',
				area: ['500px', '200px'],
				shade: 0.5,
				maxmin: true,
				content: 'moreNormalHomework',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['添加', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#morenormalhomeworkbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.morenormalhomework').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		morenormalhomework[method] ? morenormalhomework[method].call(this, othis) : '';
	});

	//普通作业——重复作业
	form.on('radio(repeatwork)', function(repeatwork) {
		var repeatwork = repeatwork.value;
		if(repeatwork == "不开启重复作业") {
			$(".normal_homework_box").hide();
		} else {
			$(".normal_homework_box").show();
		}
	});


	/**
	 * 重复作业开启后操作
	 */


	//小组作业——分组形式
	form.on('radio(teamtype)', function(teamtype) {
		var teamtype = teamtype.value;
		if(teamtype == 0) {
			$(".team_homework_box").hide();
		} else {
			$(".team_homework_box").show();
		}
	});

	//批量添加小组作业
	var moreteamhomework = {
		moreteamhomework: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '批量添加小组作业',
				area: ['500px', '200px'],
				shade: 0.5,
				maxmin: true,
				content: 'moreTeamHomework',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['添加', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#moreteamhomeworkbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.moreteamhomework').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		moreteamhomework[method] ? moreteamhomework[method].call(this, othis) : '';
	});

	//作业类型
	form.on('radio(worktype)', function(worktype) {
		var worktype = worktype.value;
		if(worktype == "0") {
			//普通作业显示
			$(".normal_homework").show();
			$(".normal_homework_quick").slideDown();
			//小组作业不显示
			$(".team_homework").hide();
			$(".team_homework_quick").slideUp();
			//小组作业清空
			$(".new_team_homework>.once_team_homework_box").remove();
			$(".team_homework_box").hide();
			$("input:radio[value='体验分组']").prop("checked", true);
			$("input:radio[value='自定义']").prop("checked", false);
			$("select[name='categoryId']").removeAttr("lay-verify");
			$("select[name='groupIds']").removeAttr("lay-verify");
			$("select[xm-select='groupIds']").removeAttr("_lay-verify")
			$("input[name='groupIds']").removeAttr("lay-verify");
			form.render(); //更新全部，不能删除
		} else {
			//普通作业不显示
			$(".normal_homework").hide();
			$(".normal_homework_quick").slideUp();
			//小组作业显示
			let groupCategory = setGroupCategory(siteId)
			if (groupCategory) {
				for (let i = 0; i < groupCategory.length; i++) {
					let option = `<option value="${groupCategory[i].id}">${groupCategory[i].name}</option>`;
					$("select[name=categoryId]").append(option);
				}
			}

			$(".team_homework").show();
			$(".team_homework_quick").slideDown();

			if (!$("select[name='categoryId']").attr("lay-verify")) {
				$("select[name='categoryId']").attr("lay-verify", "required");
				$("select[name='groupIds']").attr("lay-verify", "required");
			}

			//普通作业清空
			$(".new_normal_homework>.once_normal_homework_box").remove();
			$(".normal_homework_box").hide();
			form.render(); //更新全部，不能删除
		}
	});
	//小组类别监听
	form.on('select(group_category)', function (data) {
		let categoryId = data.value;
		$.ajax({
			url: httpBaseUrl + 'api/getGroupByCategoryId',
			type: 'GET',
			async: false,
			data: {"categoryId": categoryId},
			success: function (res) {
				if (res) {
					let result = res.map(v => {
						return {"name": v.groupTitle, "value": v.id};
					});

					formSelects.data('groupIds', 'local', {
						arr: result
					})
				}
			}
		})
	})
	let homeworkModelCount = 0;
	$(".oncenormalhomework").click(function() {
			// $(".new_normal_homework:last").append($(".new_once_normal>.once_normal_homework_box").clone()); //

			homeworkModelCount += 1;
			// 使用模版方法
			let row = addHomeworkModel(homeworkModelCount);
			$('.new_normal_homework').append(row);
			let id = `#startdate${homeworkModelCount}`
			laydate.render({
				elem: id,
				type: 'date',
				format: "yyyy-MM-dd HH:mm:ss",
				// 当前日期 --添加下面这句
				value: new Date(),
				done: function(value, date, endDate) {

				}
			});
			//监听日期天数的变化
			let startdateVal = $(id).val();
			if (startdateVal == null || startdateVal == ""){
				let d = new Date();
				startdateVal =d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
			} else {
				startdateVal = $(id).val();
			}
			//页面初次加载时日期默认14天
			$(".repeatEnds").val(getNewData(startdateVal, 14));
			$(".repeat_inputtext").bind('input porpertychange',function(){
				let days = $(this).val();
				$(this).prev().val(getNewData(startdateVal, days));
			});

			var requirement = layedit.build(`requirement${homeworkModelCount}`, {
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
			//数据同步
			form.verify({
				requirement: function (value){
					layedit.sync(requirement);
				}
			});
		}
	);
	//删除本次普通/小组作业
	window.getDelnormal = function (obj) {
		$(obj).parents(".once_normal_homework_box").remove();
	}

	if ($("input[name=type]").val() === "0") {
		$("select[name='categoryId']").removeAttr("lay-verify");
		$("select[name='groupIds']").removeAttr("lay-verify");
		$("select[xm-select='groupIds']").removeAttr("_lay-verify")
		$("input[name='groupIds']").removeAttr("lay-verify");
	} else {
		//小组作业显示
		let groupCategory = setGroupCategory(siteId)
		if (groupCategory) {
			for (let i = 0; i < groupCategory.length; i++) {
				let option = `<option value="${groupCategory[i].id}">${groupCategory[i].name}</option>`;
				$("select[name=categoryId]").append(option);
			}
		}

		$(".team_homework").show();
		$(".team_homework_quick").slideDown();

		if (!$("select[name='categoryId']").attr("lay-verify")) {
			$("select[name='categoryId']").attr("lay-verify", "required");
			$("select[name='groupIds']").attr("lay-verify", "required");
		}
	}
});

