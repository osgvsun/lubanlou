layui.config({
	base:'../'
}).extend({
	index:'lib/index'
})
layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer', 'layedit', 'upload', 'util'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table,
		layer = layui.layer,
		layedit = layui.layedit,
		upload = layui.upload,
		util = layui.util;
	let msgindex;
	let proId = $("[name='id']").val();
	let pConfig;
	let userAcademyNumber = '0103';
	getCurrentUser()
		.then(function (data) {
			console.log(data);
		})
	function getCurrentUser(){
		var currentUser = new Promise(function(resolve, reject){
			$.ajax({
				url: '../configcenter/getCurrentUser2',
				// dataType: 'json',
				async: false,
				type: 'get',
				success: function (res) {
					console.log(res);
					if(res){
						userAcademyNumber = res.schoolAcademy.academyNumber;
					}
					// resolve(res);
				}
			});
			resolve('complete');
		});
		return currentUser;
	}
	let pConfigKey = [
		{show: 'showTerm',name: 'lpTerm'},
		{show: 'showCodeCustom',name: 'lpCodeCustom'},
		{show: 'showLab',name: 'lpLabId',id: 'lpLabId'},
		{show: 'showSubject',name: 'lpSubject'},
		{show: 'showCategoryRequire',name: 'lpCategoryRequire'},
		{show: 'showDepartmentHours',name: 'lpDepartmentHours'},
		{show: 'showCourseHoursTotal',name: 'lpCourseHoursTotal'},
		{show: 'showStudentNumber',name: 'lpStudentNumber'},
		{show: 'showSetNumber',name: 'lpSetNumber'},
		{show: 'showStudentNumberGroup',name: 'lpStudentNumberGroup'},
		{show: 'showCategoryMain',name: 'lpCategoryMain'},
		{show: 'showCategoryApp',name: 'lpCategoryApp'},
		{show: 'showCategoryNature',name: 'lpCategoryNature'},
		{show: 'showCategoryStudent',name: 'lpCategoryStudent'},
		{show: 'showStatusChange',name: 'lpStatusChange'},
		{show: 'showCategoryPublic',name: 'lpCategoryPublic'},
		{show: 'showCategoryRewardLevel',name: 'lpCategoryRewardLevel'},
		{show: 'showMajor',name: 'lpMajor'},
		{show: 'showTeacherAssistantId',name: 'lpTeacherAssistantId',id: 'lpTeacherAssistantId'},
		{show: 'showGuideBookTitle',name: 'lpGuideBookTitle'},
		{show: 'showGuideBookAuthor',name: 'lpGuideBookAuthor'},
		{show: 'showAssessmentMethods',name: 'lpAssessmentMethods'},
		{show: 'showIntroduction',name: 'lpIntroduction'},
		{show: 'showPreparation',name: 'lpPreparation'},
		{show: 'showUpdateUser',name: 'updateUser'},
		{show: 'showUpdateTime',name: 'updateTime'},
		{show: 'showItemAcademy',name: 'academyNumber'},
		{show: 'showPlanWeek',name: 'planWeek',id: 'planWeek'},
		{show: 'showTeacherSpeakerId',name: 'lpTeacherSpeakerId',id: 'lpTeacherSpeakerId'},
	]
	let assetCols = [[
		{fixed: 'left',title: '序号',type: 'numbers',width: 50},
		{field: 'chName', title: '物资名称', sort: true},
		{field: 'category', title: '物资类型', sort: true},
		{field: 'specifications', title: '型号规格', width: 115, sort: true},
		{field: 'unit', title: '单位', sort: true},
		{field: 'amount', title: '数量', sort: true},
		{field: 'totalPrice', title: '金额', sort: true},
		{fixed: 'right',title: '操作',toolbar: '#materialtoolbar',width: 130}
	]];
	let deviceCols = [[
		{fixed: 'left', title: '序号', type: 'numbers', width: 50},
		// {field: 'deviceType', title: '类型', sort: true},
		{field: 'deviceNumber', title: '设备编号', sort: true},
		{field: 'deviceName', title: '设备名称', sort: true},
		{field: 'deviceFormat',title: '规格',sort: true},
		{field: 'devicePattern',title: '型号',sort: true},
		{field: 'devicePrice',title: '单价',sort: true},
		{fixed: 'right',title: '操作',toolbar: '#equipmenttoolbar',width: 80}
	]];
	let documentCols = [[
		{fixed: 'left', title: '序号', type: 'numbers', width: 50},
		{field: 'documentName', title: '附件名称', sort: true, width: 300},
		{fixed: 'right', title: '操作', toolbar: '#uploadenclosuretoolbar', width: 120}
	]];
	function FormSelectComponent(obj){
		this.elId = obj.elId;
		this.selectedData = [];
		this.dataUrl = obj.dataUrl;
		this.type = obj.type;
		this.search = obj.search;
		this.model = obj.model;
		this.page = obj.page;
		this.init = function () {
			let that = this;
			let elid = that.elId;
			if(!that.page){
				let data = new Object();
				data['type'] = that.type;
				data['search'] = that.search;
				data['academyNumber'] ='';
				data['userRole'] ='';
				$.ajax({
					url: that.dataUrl,
					dataType: 'json',
					// async: false,
					data: JSON.stringify(data),
					type: 'post',
					contentType:"application/json;charset=utf-8",
					success: function (res) {
						// console.log(res);
						let elid = that.elId;
						if(that.model === 'single'){
							$.each(res.results, function (i, d) {
								if(that.type === 'schoolCourseInfoList'){
									$(`[name='${that.elId}']`).append(new Option(d.text+'('+d.id+')', d.id));// 下拉菜单里添加元素
								}else{
									$(`[name='${that.elId}']`).append(new Option(d.text, d.id));// 下拉菜单里添加元素
								}
							});
							if(that.type === 'schoolAcademyList'){
								$(`[name='${that.elId}']`).val(userAcademyNumber);
							}
							form.render("select");
						}else if(that.model === 'multiple'){
							let data1 = [];
							$.each(res.results, function (index, item) {
								var d = new Object();
								if(that.type === 'schoolCourseInfoList'){
									d = {name: item.text+'('+item.id+')',value: item.id};
								}else{
									d = {name: item.text,value: item.id};
								}
								data1.push(d);
							});
							that.elId = xmSelect.render({
								el: `#${that.elId}`,
								name: that.elId,
								filterable: true,
								layVerify: that.required ? 'required' : '',
								// toolbar: {show: true, showIcon: false},
								theme: {color: '#1E9FFF',},
								model: {icon: 'hidden',},
								data: data1
							});
						}

					}

				})
			}else{
				that.elId = xmSelect.render({
					el: `#${that.elId}`,
					name: that.elId,
					//配置搜索
					filterable: true,
					layVerify: that.required ? 'required' : '',
					theme: {color: '#1E9FFF',},
					//配置远程分页
					paging: true,
					pageRemote: true,
					//数据处理
					remoteMethod: function(val, cb, show, pageIndex){
						//val: 搜索框的内容, 不开启搜索默认为空, cb: 回调函数, show: 当前下拉框是否展开, pageIndex: 当前第几页
						let data = new Object();
						data['type'] = that.type;
						data['search'] = val;
						// data['page'] =pageIndex;
						// data['limit'] =5;
						$.ajax({
							url: that.dataUrl,
							dataType: 'json',
							// async: false,
							data: {type:that.type,search:val,page: pageIndex,limit:5},
							type: 'get',
							// contentType:"application/json;charset=utf-8",
							success: function (res) {
								//这里是success的处理
								// console.log(res);
								let data = new Array();
								$.each(res.data,function (key,value) {
									data.push({name:`${value.text}(${value.id})`,value:value.id})
								})
								let recordPages = Math.ceil(res.count/5) ;
								// var res = res.data;
								//回调需要两个参数, 第一个: 数据数组, 第二个: 总页码
								cb(data, recordPages)
							},
							error: function (err) {
								//这里是error的处理
								cb([], 0);
							}

						})
					}
				})
				if(that.model.indexOf('single')!=-1){
					that.elId.update({
						radio: true,
						clickClose: true
					})
				}
			}
			if(elid === 'academyNumber'){
				getItemById();
			}

		}

	}
	function TableComponent(elId, cols) {
		this.elId = elId;
		this.cols = cols;
		this.data = [];
		this.render = function () {
			let that = this;
			switch (elId) {
				case 'uploadenclosure' :
					if(that.data && that.data.length>0){
						getFile(that.data)
							.then(function (data) {
								that.data = data;
								renderTable(that.elId, that.data, that.cols);
							})
					}else{
						that.data = [];
						renderTable(that.elId, that.data, that.cols);
					}
					break;
				default:
					renderTable(that.elId, that.data, that.cols);
					break;
			}

		};
		this.init = function () {
			this.render();
		}
	}
	function getFile(data){
		var file = new Promise(function(resolve, reject){
			let arr = [];
			$.each(data,function (key, value) {
				resourceContainer.getFileById({
					fileId: value.resourceUrl,
					success: function (res) {
						let fileObj = new Object();
						fileObj['documentName'] = res.fileName;
						fileObj['id'] = value.id;
						fileObj['documentId'] = res.id;
						arr.push(fileObj)
						resolve(arr);
					},
					fail: function (reason) {
						console.log(reason);
					},
					needToken: true
				})
			})
		});
		return file;
	}
	function renderTable(elId, renderData, cols) {
		table.render({
			elem: `#${elId}`,
			title: '项目详情',
			page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
				layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
				curr: 1, //设定初始在第 5 页
				groups: 1, //只显示 1 个连续页码
				first: false, //不显示首页
				last: false //不显示尾页
			},
			cols: cols,
			data: renderData,
			skin: 'line', //表格风格
			even: true,
			id: elId,
			page: true,
			limits: [5, 7, 10, 20],
			limit: 5 //每页默认显示的数量
		});
	}
	$.ajax({
		url:`${timetableHost}api/common/config/apiConfigFromRedisDTOInfo`,
		async: false,
		type: 'post',
		success:function (res) {
			console.log(res);
			pConfig = res;
			// pConfig.showUpdateUser = false;
			// pConfig.showUpdateTime = false;
			// pConfig.showStudentNumberGroup = false;
			// pConfig.showCategoryRequire = false;
		},
		error: function () {
			layer.msg("获取字段配置项失败");
			return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
		}
	});
	$.each(pConfigKey,function (key,value) {
		// console.log(key+')'+value)
		if(!pConfig[value.show]){
			if(value.id){
				$(`#${value.id}`).parent().parent().remove();
			}else{
				$(`[name='${value.name}']`).parent().parent().remove();
			}

		}
	})
	if(pConfig['showLab']){
		let labRoomListSelect = new FormSelectComponent({
			elId: 'lpLabId',
			dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelectByPage`,
			type: 'labRoomList',
			model: 'multiple',
			page: true,
			required: false
		});
		labRoomListSelect.init();
	}
	if(pConfig['showPlanWeek']){
		let weekListSelect = new FormSelectComponent({
			elId: 'planWeek',
			dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelect`,
			type: 'schoolWeekList',
			model: 'multiple',
			required: false
		});
		weekListSelect.init();
	}
	if(pConfig['showTeacherSpeakerId']){
		let teacherListSelect = new FormSelectComponent({
			elId: 'lpTeacherSpeakerId',
			dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelectByPage`,
			type: 'userList',
			model: 'multiple',
			page: true,
			required: false
		});
		teacherListSelect.init();
	}
	if(pConfig['showTeacherAssistantId']){
		let tutorListSelect = new FormSelectComponent({
			elId: 'lpTeacherAssistantId',
			dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelectByPage`,
			type: 'userList',
			model: 'multiple_single',
			page: true,
		});
		tutorListSelect.init();
	}
	if(pConfig['showUpdateUser']){
		let updateUserSelect = new FormSelectComponent({
			elId: 'updateUser',
			dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelectByPage`,
			type: 'userList',
			model: 'multiple_single',
			page: true,
		});
		updateUserSelect.init();
	}
	let courseListSelect = new FormSelectComponent({
		elId: 'lpCourseNumber',
		dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelectByPage`,
		type: 'schoolCourseInfoList',
		model: 'multiple',
		page: true,
		required: true
	});
	let termListSelect = new FormSelectComponent({
		elId: 'lpTerm',
		dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelect`,
		type: 'schoolTermList',
		model: 'single'
	});
	let subjectListSelect = new FormSelectComponent({
		elId: 'lpSubject',
		dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelect`,
		type: 'systemSubjectList',
		model: 'single'
	});
	let requireListSelect = new FormSelectComponent({
		elId: 'lpCategoryRequire',
		dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelect`,
		type: 'dictionaryList',
		search: 'category_operation_item_require',
		model: 'single'
	});
	let mainListSelect = new FormSelectComponent({
		elId: 'lpCategoryMain',
		dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelect`,
		type: 'dictionaryList',
		search: 'category_operation_item_main',
		model: 'single'
	});
	let appListSelect = new FormSelectComponent({
		elId: 'lpCategoryApp',
		dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelect`,
		type: 'dictionaryList',
		search: 'category_operation_item_app',
		model: 'single'
	});
	let natureListSelect = new FormSelectComponent({
		elId: 'lpCategoryNature',
		dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelect`,
		type: 'dictionaryList',
		search: 'category_operation_item_nature',
		model: 'single'
	});
	let categoryStudentSelect = new FormSelectComponent({
		elId: 'lpCategoryStudent',
		dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelect`,
		type: 'dictionaryList',
		search: 'category_operation_item_student',
		model: 'single'
	});
	let changeListSelect = new FormSelectComponent({
		elId: 'lpStatusChange',
		dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelect`,
		type: 'dictionaryList',
		search: 'status_operation_item_change',
		model: 'single'
	});
	let publicListSelect = new FormSelectComponent({
		elId: 'lpCategoryPublic',
		dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelect`,
		type: 'dictionaryList',
		search: 'category_operation_item_public',
		model: 'single'
	});
	let levelListSelect = new FormSelectComponent({
		elId: 'lpCategoryRewardLevel',
		dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelect`,
		type: 'dictionaryList',
		search: 'category_operation_item_reward_level',
		model: 'single'
	});
	let majorListSelect = new FormSelectComponent({
		elId: 'lpMajor',
		dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelect`,
		type: 'schoolMajorList',
		model: 'single'
	});
	let academyNumberSelect = new FormSelectComponent({
		elId: 'academyNumber',
		dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelect`,
		type: 'schoolAcademyList',
		model: 'single'
	});

	//常规用法
	let updateTime = laydate.render({
		elem: '#updateTime'
	});
	let assetTableComponent = new TableComponent("materialuse", assetCols);
	let deviceTableComponent = new TableComponent("equipment", deviceCols);
	let documentTableComponent = new TableComponent("uploadenclosure", documentCols);
	loading("数据加载中,请耐心等待......");
	courseListSelect.init();
	termListSelect.init();
	subjectListSelect.init();
	requireListSelect.init();
	mainListSelect.init();
	appListSelect.init();
	natureListSelect.init();
	categoryStudentSelect.init();
	changeListSelect.init();
	publicListSelect.init();
	levelListSelect.init();
	majorListSelect.init();
	academyNumberSelect.init();
	// tutorListSelect.init();
	assetTableComponent.init();
	deviceTableComponent.init();
	documentTableComponent.init();
	//监听行工具事件
	table.on('tool(materialuse)', function(obj) {
		var data = obj.data;
		//打开编辑材料使用页面
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '编辑材料使用',
				area: ['508px', '350px'],
				shade: 0.5,
				maxmin: true,
				content: 'editMaterial.html',
				zIndex: layer.zIndex //重点1
				,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['提交', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#editmaterialbtn");
					submit.click();
				}
			});
			//layer.full(index);
		};
		//删除
		if(obj.event === 'del') {
			layer.confirm('确定删除？', {
				title: '提示'
			}, function(index) {
				$.ajax({
					url: `${timetableHost}api/operation/deleteOperationItemAsset?assetRelateIds=${data.id}`,
					type: 'post',
					success: function (res) {
						if(res.data && res.data.code === 0){
							obj.del();
							layer.msg('删除成功!');
							layer.close(index);
						}
					}
				})
			});
		}
	});
	//监听行工具事件
	table.on('tool(equipment)', function(obj) {
		var data = obj.data;
		//删除
		if(obj.event === 'del') {
			layer.confirm('确定删除？', {
				title: '提示'
			}, function(index) {
				$.ajax({
					url: `${timetableHost}api/operation/deleteOperationItemDevice?deviceRelateIds=${data.id}`,
					type: 'post',
					success: function (res) {
						if(res.data && res.data.code === 0){
							obj.del();
							layer.msg('删除成功!');
							layer.close(index);
						}
					}
				})
			});
		}
	});
	//监听行工具事件
	table.on('tool(uploadenclosure)', function(obj) {
		var data = obj.data;
		//删除
		if(obj.event === 'del') {
			layer.confirm('确定删除？', {
				title: '提示'
			}, function(index) {
				$.ajax({
					url: `${timetableHost}api/operation/deleteOperationItemEnclosure?enclosureRelateIds=${data.id}`,
					type: 'post',
					success: function (res) {
						if(res.data && res.data.code === 0){
							obj.del();
							layer.msg('删除成功!');
							layer.close(index);
						}
					}
				})
			});
		}else if(obj.event === 'download') {
			resourceContainer.downLoadFile({
				fileId: data.documentId
			})
		}
	});
	function setValue(id,name,elId) {
		let ids = id;
		let data = [];
		$.each(ids.split(','),function(i,d){
			data.push({name:`${name.split(',')[i]}(${d})`,value:d})
		})
		xmSelect.get(`#${elId}`, true).setValue(data);
	}
	function getItemById(){
		if(proId) {
			$('.edit_table').show();
			$.ajax({
				url: `${timetableHost}api/operation/getOperationItemById?id=${proId}`,
				// async: false,
				complete: function (){
					layer.close(msgindex);
				},
				success: function (res) {
					console.log(res);
					form.val('newprojectbox',res.data);
					if(pConfig['showTeacherSpeakerId'] && res.data.lpTeacherSpeakerId){
						setValue(res.data.lpTeacherSpeakerId,res.data.lpTeacherSpeakerName,'lpTeacherSpeakerId')
					}
					if(pConfig['showUpdateUser'] && res.data.updateUser){
						setValue(res.data.updateUser,res.data.updateUserName,'updateUser')
					}
					if(pConfig['showTeacherAssistantId'] && res.data.lpTeacherAssistantId){
						setValue(res.data.lpTeacherAssistantId,res.data.lpTeacherAssistantName,'lpTeacherAssistantId')
					}
						// xmSelect.get('#lpTeacherSpeakerId')[0].setValue(res.data.lpTeacherSpeakerId.split(','));
					if(pConfig['showPlanWeek'] && res.data.planWeek)
						xmSelect.get('#planWeek')[0].setValue(res.data.planWeek.split(','));
					if(pConfig['showLab'] && res.data.lpLabId){
						setValue(res.data.lpLabId,res.data.lpLabName,'lpLabId')
					}
					if(res.data.lpCourseNumber){
						setValue(res.data.lpCourseNumber,res.data.lpCourseName,'lpCourseNumber')
					}
						// xmSelect.get('#lpCourseNumber')[0].setValue(res.data.lpCourseNumber.split(','));
					assetTableComponent.data = res.data.assetDTOS;
					documentTableComponent.data = res.data.commonDocumentDTOS;
					deviceTableComponent.data = res.data.schoolDeviceDTOS;
					assetTableComponent.render();
					documentTableComponent.render();
					deviceTableComponent.render();
				}
			})
		}else{
			layer.close(msgindex);
		}
	}

	function loading(msg){
		msgindex = layer.msg(msg, {
			icon:16,
			shade:[0.1, '#fff'],
			time:false,  //不自动关闭
			offsetqiuchuy:"100px"
		})
	}
	//监听提交
	form.on('submit(newprojectbtn)', function(data) {
		var field = data.field; //获取提交的字段
		// console.log(field);
		if(pConfig['showCodeCustom'] && field['lpCodeCustom'].gblen() > 13){
			layer.msg('实验编号过长!请控制在13个字符之内(中文占2个字符)');
			return false;
		}
		if(field['lpName'].gblen() > 50){
			layer.msg('实验名称过长!请控制在50个字符之内(中文占2个字符)');
			return false;
		}
		field['lpCreateUser'] = currentUsername;
		let preservationOperationItemDTO = new Object();
		preservationOperationItemDTO = field;
		var data = JSON.stringify(preservationOperationItemDTO);
		// 保存
		$.ajax({
			url:`${timetableHost}api/operation/saveOperationItem`,
			dataType: 'json',
			data: data,
			type: 'post',
			// async: false,
			contentType:"application/json;charset=utf-8",
			beforeSend: function () {
				loading("数据提交中,请耐心等待......");
			},
			complete: function (){
				layer.close(msgindex);
			},
			success:function (res) {
				// console.log(res);
				if(res.data && res.code === 0){
					layer.msg('保存成功!')
					var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
					parent.layui.table.reload('myproject'); //重载表格
					parent.layer.close(index); //再执行关闭
				}else{
					layer.msg(res.msg);
					return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
				}
			},
			error: function () {
				alert("后台保存数据报错");
				return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
			}
		});

	});

	// form.render(null, 'newprojectbox');
	//打开添加材料
	var addmaterial = {
		addmaterial: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '添加材料',
				area: ['508px', '350px'],
				shade: 0.5,
				maxmin: true,
				content: 'addMaterial?proId='+proId,
				zIndex: layer.zIndex //重点1
				,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#addmaterialbtn");
					submit.click();
					location.reload();
				}
			});
			//layer.full(index);
		}
	};
	$('.addmaterial').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		addmaterial[method] ? addmaterial[method].call(this, othis) : '';
	});
//打开批量添加仪器设备
	var addequipment = {
		addequipment: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '批量添加仪器设备',
				area: ['900px', '750px'],
				shade: 0.5,
				maxmin: true,
				content: 'addEquipment?proId='+proId,
				zIndex: layer.zIndex //重点1
				,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#addequipmentbtn");
					submit.click();
					location.reload();
				}
			});
			// layer.full(index);
		}
	};
	$('.addequipment').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		addequipment[method] ? addequipment[method].call(this, othis) : '';
	});
	//打开上传附件
	var uploadenclosure = {
		uploadenclosure: function() {
			//layer.msg('');
			var that = this;
			openUploadWindowByPath(`用户中心前端/项目库管理/${proId}`)
			//多窗口模式，层叠置顶
			// var index = layer.open({
			// 	type: 2 //此处以iframe举例
			// 	,
			// 	title: '上传附件',
			// 	area: ['508px', '440px'],
			// 	shade: 0.5,
			// 	maxmin: true,
			// 	content: 'uploadEnclosure?proId='+proId,
			// 	zIndex: layer.zIndex //重点1
			// 	,
			// 	success: function(layero) {
			// 		layer.setTop(layero); //重点2
			// 	},
			// 	btn: ['确定', '取消'],
			// 	yes: function(index, layero) {
			// 		//点击确认触发 iframe 内容中的按钮提交
			// 		var submit = layero.find('iframe').contents().find("#uploadenclosurebtn");
			// 		submit.click();
			// 	}
			// });
			//layer.full(index);
		}
	};
	$('.uploadenclosure').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		uploadenclosure[method] ? uploadenclosure[method].call(this, othis) : '';
	});

	String.prototype.gblen = function() {
		var len = 0;
		for (var i=0; i<this.length; i++) {
			if (this.charCodeAt(i)>127) {
				len += 2;
			} else {
				len ++;
			}
		}
		return len;
	}
});