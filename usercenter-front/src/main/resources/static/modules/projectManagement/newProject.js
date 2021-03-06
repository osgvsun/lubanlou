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
		{fixed: 'left',title: '??????',type: 'numbers',width: 50},
		{field: 'chName', title: '????????????', sort: true},
		{field: 'category', title: '????????????', sort: true},
		{field: 'specifications', title: '????????????', width: 115, sort: true},
		{field: 'unit', title: '??????', sort: true},
		{field: 'amount', title: '??????', sort: true},
		{field: 'totalPrice', title: '??????', sort: true},
		{fixed: 'right',title: '??????',toolbar: '#materialtoolbar',width: 130}
	]];
	let deviceCols = [[
		{fixed: 'left', title: '??????', type: 'numbers', width: 50},
		// {field: 'deviceType', title: '??????', sort: true},
		{field: 'deviceNumber', title: '????????????', sort: true},
		{field: 'deviceName', title: '????????????', sort: true},
		{field: 'deviceFormat',title: '??????',sort: true},
		{field: 'devicePattern',title: '??????',sort: true},
		{field: 'devicePrice',title: '??????',sort: true},
		{fixed: 'right',title: '??????',toolbar: '#equipmenttoolbar',width: 80}
	]];
	let documentCols = [[
		{fixed: 'left', title: '??????', type: 'numbers', width: 50},
		{field: 'documentName', title: '????????????', sort: true, width: 300},
		{fixed: 'right', title: '??????', toolbar: '#uploadenclosuretoolbar', width: 120}
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
									$(`[name='${that.elId}']`).append(new Option(d.text+'('+d.id+')', d.id));// ???????????????????????????
								}else{
									$(`[name='${that.elId}']`).append(new Option(d.text, d.id));// ???????????????????????????
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
					//????????????
					filterable: true,
					layVerify: that.required ? 'required' : '',
					theme: {color: '#1E9FFF',},
					//??????????????????
					paging: true,
					pageRemote: true,
					//????????????
					remoteMethod: function(val, cb, show, pageIndex){
						//val: ??????????????????, ???????????????????????????, cb: ????????????, show: ???????????????????????????, pageIndex: ???????????????
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
								//?????????success?????????
								// console.log(res);
								let data = new Array();
								$.each(res.data,function (key,value) {
									data.push({name:`${value.text}(${value.id})`,value:value.id})
								})
								let recordPages = Math.ceil(res.count/5) ;
								// var res = res.data;
								//????????????????????????, ?????????: ????????????, ?????????: ?????????
								cb(data, recordPages)
							},
							error: function (err) {
								//?????????error?????????
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
			title: '????????????',
			page: { //???????????? laypage ???????????????????????????????????????????????????jump/elem??? - ????????????
				layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //?????????????????????
				curr: 1, //?????????????????? 5 ???
				groups: 1, //????????? 1 ???????????????
				first: false, //???????????????
				last: false //???????????????
			},
			cols: cols,
			data: renderData,
			skin: 'line', //????????????
			even: true,
			id: elId,
			page: true,
			limits: [5, 7, 10, 20],
			limit: 5 //???????????????????????????
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
			layer.msg("???????????????????????????");
			return false; //?????????????????????????????????????????????????????????????????????
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

	//????????????
	let updateTime = laydate.render({
		elem: '#updateTime'
	});
	let assetTableComponent = new TableComponent("materialuse", assetCols);
	let deviceTableComponent = new TableComponent("equipment", deviceCols);
	let documentTableComponent = new TableComponent("uploadenclosure", documentCols);
	loading("???????????????,???????????????......");
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
	//?????????????????????
	table.on('tool(materialuse)', function(obj) {
		var data = obj.data;
		//??????????????????????????????
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //?????????iframe??????
				,
				title: '??????????????????',
				area: ['508px', '350px'],
				shade: 0.5,
				maxmin: true,
				content: 'editMaterial.html',
				zIndex: layer.zIndex //??????1
				,
				success: function(layero) {
					layer.setTop(layero); //??????2
				},
				btn: ['??????', '??????'],
				yes: function(index, layero) {
					//?????????????????? iframe ????????????????????????
					var submit = layero.find('iframe').contents().find("#editmaterialbtn");
					submit.click();
				}
			});
			//layer.full(index);
		};
		//??????
		if(obj.event === 'del') {
			layer.confirm('???????????????', {
				title: '??????'
			}, function(index) {
				$.ajax({
					url: `${timetableHost}api/operation/deleteOperationItemAsset?assetRelateIds=${data.id}`,
					type: 'post',
					success: function (res) {
						if(res.data && res.data.code === 0){
							obj.del();
							layer.msg('????????????!');
							layer.close(index);
						}
					}
				})
			});
		}
	});
	//?????????????????????
	table.on('tool(equipment)', function(obj) {
		var data = obj.data;
		//??????
		if(obj.event === 'del') {
			layer.confirm('???????????????', {
				title: '??????'
			}, function(index) {
				$.ajax({
					url: `${timetableHost}api/operation/deleteOperationItemDevice?deviceRelateIds=${data.id}`,
					type: 'post',
					success: function (res) {
						if(res.data && res.data.code === 0){
							obj.del();
							layer.msg('????????????!');
							layer.close(index);
						}
					}
				})
			});
		}
	});
	//?????????????????????
	table.on('tool(uploadenclosure)', function(obj) {
		var data = obj.data;
		//??????
		if(obj.event === 'del') {
			layer.confirm('???????????????', {
				title: '??????'
			}, function(index) {
				$.ajax({
					url: `${timetableHost}api/operation/deleteOperationItemEnclosure?enclosureRelateIds=${data.id}`,
					type: 'post',
					success: function (res) {
						if(res.data && res.data.code === 0){
							obj.del();
							layer.msg('????????????!');
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
			time:false,  //???????????????
			offsetqiuchuy:"100px"
		})
	}
	//????????????
	form.on('submit(newprojectbtn)', function(data) {
		var field = data.field; //?????????????????????
		// console.log(field);
		if(pConfig['showCodeCustom'] && field['lpCodeCustom'].gblen() > 13){
			layer.msg('??????????????????!????????????13???????????????(?????????2?????????)');
			return false;
		}
		if(field['lpName'].gblen() > 50){
			layer.msg('??????????????????!????????????50???????????????(?????????2?????????)');
			return false;
		}
		field['lpCreateUser'] = currentUsername;
		let preservationOperationItemDTO = new Object();
		preservationOperationItemDTO = field;
		var data = JSON.stringify(preservationOperationItemDTO);
		// ??????
		$.ajax({
			url:`${timetableHost}api/operation/saveOperationItem`,
			dataType: 'json',
			data: data,
			type: 'post',
			// async: false,
			contentType:"application/json;charset=utf-8",
			beforeSend: function () {
				loading("???????????????,???????????????......");
			},
			complete: function (){
				layer.close(msgindex);
			},
			success:function (res) {
				// console.log(res);
				if(res.data && res.code === 0){
					layer.msg('????????????!')
					var index = parent.layer.getFrameIndex(window.name); //???????????????iframe????????????
					parent.layui.table.reload('myproject'); //????????????
					parent.layer.close(index); //???????????????
				}else{
					layer.msg(res.msg);
					return false; //?????????????????????????????????????????????????????????????????????
				}
			},
			error: function () {
				alert("????????????????????????");
				return false; //?????????????????????????????????????????????????????????????????????
			}
		});

	});

	// form.render(null, 'newprojectbox');
	//??????????????????
	var addmaterial = {
		addmaterial: function() {
			//layer.msg('');
			var that = this;
			//??????????????????????????????
			var index = layer.open({
				type: 2 //?????????iframe??????
				,
				title: '????????????',
				area: ['508px', '350px'],
				shade: 0.5,
				maxmin: true,
				content: 'addMaterial?proId='+proId,
				zIndex: layer.zIndex //??????1
				,
				success: function(layero) {
					layer.setTop(layero); //??????2
				},
				btn: ['??????', '??????'],
				yes: function(index, layero) {
					//?????????????????? iframe ????????????????????????
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
//??????????????????????????????
	var addequipment = {
		addequipment: function() {
			//layer.msg('');
			var that = this;
			//??????????????????????????????
			var index = layer.open({
				type: 2 //?????????iframe??????
				,
				title: '????????????????????????',
				area: ['900px', '750px'],
				shade: 0.5,
				maxmin: true,
				content: 'addEquipment?proId='+proId,
				zIndex: layer.zIndex //??????1
				,
				success: function(layero) {
					layer.setTop(layero); //??????2
				},
				btn: ['??????', '??????'],
				yes: function(index, layero) {
					//?????????????????? iframe ????????????????????????
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
	//??????????????????
	var uploadenclosure = {
		uploadenclosure: function() {
			//layer.msg('');
			var that = this;
			openUploadWindowByPath(`??????????????????/???????????????/${proId}`)
			//??????????????????????????????
			// var index = layer.open({
			// 	type: 2 //?????????iframe??????
			// 	,
			// 	title: '????????????',
			// 	area: ['508px', '440px'],
			// 	shade: 0.5,
			// 	maxmin: true,
			// 	content: 'uploadEnclosure?proId='+proId,
			// 	zIndex: layer.zIndex //??????1
			// 	,
			// 	success: function(layero) {
			// 		layer.setTop(layero); //??????2
			// 	},
			// 	btn: ['??????', '??????'],
			// 	yes: function(index, layero) {
			// 		//?????????????????? iframe ????????????????????????
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