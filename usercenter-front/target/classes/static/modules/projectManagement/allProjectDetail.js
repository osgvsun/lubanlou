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
	let pConfig;
	let pConfigKey = [
		{show: 'showTerm',name: 'termName'},
		{show: 'showLab',name: 'labRoomName'},
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
		{show: 'showTeacherAssistantId',name: 'lpTeacherAssistantId'},
		{show: 'showGuideBookTitle',name: 'lpGuideBookTitle'},
		{show: 'showGuideBookAuthor',name: 'lpGuideBookAuthor'},
		{show: 'showAssessmentMethods',name: 'lpAssessmentMethods'},
		{show: 'showIntroduction',name: 'lpIntroduction'},
		{show: 'showPreparation',name: 'lpPreparation'},
		{show: 'showPlanWeek',name: 'planWeek'},
		{show: 'showUpdateUser',name: 'updateUser'},
		{show: 'showUpdateTime',name: 'updateTime'},
		{show: 'showItemAcademy',name: 'academyName'},
		{show: 'showTeacherSpeakerId',name: 'lpTeacherSpeakerId'},
	]
	let assetCols = [[
		{fixed: 'left',title: '序号',type: 'numbers',width: 50},
		{field: 'chName', title: '物资名称', sort: true},
		{field: 'category', title: '物资类型', sort: true},
		{field: 'specifications', title: '型号规格', width: 115, sort: true},
		{field: 'unit', title: '单位', sort: true},
		{field: 'amount', title: '数量', sort: true},
		{field: 'totalPrice', title: '金额', sort: true}
	]];
	let deviceCols = [[
		{fixed: 'left', title: '序号', type: 'numbers', width: 50},
		{field: 'deviceType', title: '类型', sort: true},
		{field: 'deviceNumber', title: '设备编号', sort: true},
		{field: 'deviceName', title: '设备名称', sort: true},
		{field: 'deviceFormat',title: '规格',sort: true},
		{field: 'devicePattern',title: '型号',sort: true},
		{field: 'devicePrice',title: '单价',sort: true}
	]];
	let documentCols = [[
		{fixed: 'left', title: '序号', type: 'numbers', width: 50},
		{field: 'documentName', title: '附件名称', sort: true},
		{fixed: 'right', title: '操作', toolbar: '#enclosuredetailtoolbar', width: 80}
	]];
	// let academyNumber = '0103';
	// getCurrentUser()
	// 	.then(function (data) {
	// 		console.log(data);
	// 		// if(data){
	// 		// 	academyNumber = data.schoolAcademy.academyNumber;
	// 		// }
	// 	})
	// function getCurrentUser(){
	// 	var currentUser = new Promise(function(resolve, reject){
	// 		$.ajax({
	// 			url: '../configcenter/getCurrentUser2',
	// 			// dataType: 'json',
	// 			async: false,
	// 			type: 'get',
	// 			success: function (res) {
	// 				console.log(res);
	// 				if(res){
	// 					academyNumber = res.schoolAcademy.academyNumber;
	// 				}
	// 				// resolve(res);
	// 			}
	// 		});
	// 		resolve('complete');
	// 	});
	// 	return currentUser;
	// }
	function TableComponent(elId, cols) {
		this.elId = elId;
		this.cols = cols;
		this.data = [];
		this.render = function () {
			let that = this;
			switch (elId) {
				case 'enclosuredetail' :
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
	function loading(msg){
		msgindex = layer.msg(msg, {
			icon:16,
			shade:[0.1, '#fff'],
			time:false,  //不自动关闭
			offsetqiuchuy:"100px"
		})
	}
	let proId = $('#proId').val();
	let audit = $('#audit').val();
	$.ajax({
		url:`${timetableHost}api/common/config/apiConfigFromRedisDTOInfo`,
		async: false,
		type: 'post',
		success:function (res) {
			console.log(res);
			pConfig = res;
			// pConfig.showTeacherAssistantId = false;
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
			$(`[name='${value.name}']`).parent().parent().remove();

		}
	})
	let assetTableComponent = new TableComponent("materialusedetail", assetCols);
	let deviceTableComponent = new TableComponent("equipmentdetail", deviceCols);
	let documentTableComponent = new TableComponent("enclosuredetail", documentCols);
	assetTableComponent.init();
	deviceTableComponent.init();
	documentTableComponent.init();
	if(proId){
		$.ajax({
			url: `${timetableHost}api/operation/getOperationItemDetailById?id=${proId}`,
			// async: false,
			beforeSend: function () {
				loading("数据加载中,请耐心等待......");
			},
			success: function (res) {
				console.log(res);
				if(res.code === 0){
					//信息
					form.val('allprojectdetailbox',res.data);
					assetTableComponent.data = res.data.assetDTOS;
					deviceTableComponent.data = res.data.schoolDeviceDTOS;
					documentTableComponent.data = res.data.commonDocumentDTOS;
					assetTableComponent.render();
					deviceTableComponent.render();
					documentTableComponent.render();
				}else{
					layer.msg('后台获取详情报错')
				}

			},
			complete: function () {
				layer.close(msgindex);
			}
		})
		//监听行工具事件
		table.on('tool(enclosuredetail)', function(obj) {
			var data = obj.data;
			//删除
			if(obj.event === 'download') {
				resourceContainer.downLoadFile({
					fileId: data.resourceUrl
				})
			}
		});


	}
	if(audit){
		$('.audit_group').show();
	}else{
		$('.audit_group').remove();
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
	//监听提交
	form.on('submit(allprojectdetailbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('projectmanage'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});
	// form.render(null, 'allprojectdetailbox');
	function auditProject(result) {
		$.ajax({
			url: `${timetableHost}api/operation/auditOperationItem`,
			data: {operationItemId: proId,result: result,username: currentUsername,authorityName: audit},
			type: 'POST',
			// async: false,
			success: function (res) {
				console.log(res);
				if(res.code === 0){
					layer.msg('审核成功!');
					var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
					parent.layui.table.reload('myexamine'); //重载表格
					parent.layer.close(index); //再执行关闭
				}else{
					layer.msg('后台审核报错!')
				}

			},
			complete: function () {
				layer.close(msgindex);
			}
		})
	}
	var $ = layui.$,
		active = {
			auditsuccess: function() {
				console.log(audit);
				auditProject(1);
			},auditfail: function() {
				console.log(audit);
				auditProject(0);
			},
		};

	$('.layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
});