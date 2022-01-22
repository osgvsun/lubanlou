const evaluationHost =apiGateWayHost+"/configcenter/";
var checked=new Array();
layui.config({
	base:'../../'
}).extend({
	index:'lib/index'
}).use(['index','form', 'element', 'laydate', 'laypage', 'table', 'layer'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table,
		layer = layui.layer;

	// //向世界问个好
	// layer.msg('进入师生互选变更申请审核(系主任)');
	//
	// form.render(null, 'academicdeanexaminetutorbox');
	//
	// //信息
	// form.val('academicdeanexaminetutorbox', {
	// 	"template": "1"
	// });
	var timetableId,//进入页面的第一个模板id
		config1,
		config2,
		config3,
		businessId,//前一个流程的timetableId(学校通知),
		processKey;//当前模板流程
	// configType=55;
	// 获取子流程信息
	let getNextConfigId = new Promise((resolve, reject) => {
		$.ajax({
			url: evaluationHost + 'api/configType/configTypes/father/'+configType,
			type:'get',
			async: false,
			success:function (res){
				config1 = configType;
				config2 = res.data[0].id;
				config3 = res.data[0].childList[0].id;
				resolve('getNextConfigId Success')
				// console.log(res);
				// getNextConfigInfo();
			},
			error:function () {
				layer.msg("获取下一个流程模板列表失敗！");
			}
		});

	})
	// 获取所有学校通知
	let getAllSchooleMessage = new Promise((resolve, reject) => {
		$.ajax({
			url: evaluationHost + 'api/timetable/infoByExactSearch',
			type:'post',
			data: JSON.stringify({configTypeId: configType,page:1,limit:999}),
			async: false,
			contentType: "application/json;charset=UTF-8",
			success:function (res){
				let templates = '';
				let firstTimetable;
				$.each(res.data,function (key, value) {
					let name = '';
					let date = '';
					$.each(value.timetableProcessDTOS[0].configIndicators,function (index, item) {
						if(item.indicatorEname === 'name'){
							name = value.timetableProcessDTOS[0].timetableResults[0][`evaluationScore${index+1}`];
							return false;
						}
						// else if(item.indicatorName.indexOf('|globelDate|')!=-1){
						// 	date = value.timetableProcessDTOS[0].timetableResults[0][`evaluationScore${index+1}`];
						// 	// return false;
						// }
						// if(item.indicatorEname === 'name')
						// 	name  = value.timetableProcessDTOS[0].timetableResults[0][`evaluationScore${index+1}`];
					})
					if(key === 0){
						firstTimetable =value.id;
						templates += `<a class="breadcrumb_select" data="${value.id}">${name}</a>`
					}else{
						templates += `<a data="${value.id}">${name}</a>`
					}
				})
				$('.breadcrumb_division').html(templates);
				selectBtnBox();
				$('.breadcrumb_division a').eq(0).click();
				resolve('getAllSchooleMessage Success')
			},
			error:function () {
				layer.msg("获取学校通知失敗！");
			}
		});

	})
	Promise.all([getNextConfigId, getAllSchooleMessage]).then((result) => {
		console.log(result)               //['成功了', 'success']
	}).catch((error) => {
		console.log(error)
	})
	element.on('tab(docDemoTabBrief)', function(data){
		if(data.index === 0){
			table.render({
				elem: '#academicdeanexaminetutor',
				// url: layui.setter.base + 'json/academicRelationship.json', //数据接口
				url: `${evaluationHost}api/timetableResult/noAuditUsers/result`, //数据接口
				where: {businessId: businessId},
				title: '对照名单',
				cellMinWidth: 100,
				page: false, //开启分页
				page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
					layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
					//curr: 5, //设定初始在第 5 页
					groups: 1, //只显示 1 个连续页码
					first: false, //不显示首页
					last: false //不显示尾页
				},parseData: function(res){ //res 即为原始返回的数据
					// console.log(res);
					var pdata = {
						"code": res.code, //解析接口状态
						"msg": res.msg, //解析提示文本
						"count": res.count, //解析数据长度
						"data": [] //解析数据列表
					}
					pdata.data = [];
					if(res.data){
						$.each(res.data,function (index,item) {
							var group = {};
							group.timetableId = item.timetableId;
							group.timetableResultId = item.timetableResultId;
							group.timetableProcessId = item.timetableProcessId;
							group.indicatorEname = item.indicatorEname;
							group.targetUsername = item.studentUsername;
							group.enabled = item.enabled;
							group.targetCname = item.studentCname;
							let tu= JSON.parse(item.studentInfo);
							let tus = '';
							$.each(tu,function (m,n) {
								tus+=`【${m}】${n} &nbsp;`
							})
							group.targetUserInfo = tus
							group.initiatorCname = item.teacherCname;
							group.initiatorUsername = item.teacherUsername;
							let iu= JSON.parse(item.teacherInfo);
							let ius = '';
							$.each(iu,function (m,n) {
								ius+=`【${m}】${n} &nbsp;`
							})
							group.initiatorUserInfo = ius;
							pdata.data.push(group);
						})
					}
					// console.log(pdata);
					return pdata;
				},
				cols: [
					[ //表头
						{fixed: 'left', type: 'checkbox',rowspan:'2', width: 35},
						{fixed: 'left',title: '序号',rowspan:'2',type: 'numbers',width: 50},
						{field: 'initiatorCname',title: '导师信息',align:'center',rowspan:'2'},
						{field: 'initiator',title: '退选学生',align:'center',colspan: '3'},
						{fixed: 'right',title: '操作',align:'center',rowspan:'2',toolbar: '#toolbar'}
					],
					[
						{field: 'targetCname',title: '学生姓名',align:'center',sort: true},
						{field: 'targetUsername',title: '学生学号',align:'center',sort: true},
						{field: 'targetUserInfo',title: '学生信息',align:'center',sort: true},
					]
				],
				id: 'academicdeanexaminetutor',
				data: table,
				// skin: 'line', //表格风格
				even: false,
				limits: [5, 7, 10, 20],
				limit: 5, //每页默认显示的数量
				done: function(res, curr, count){
					layuiRowspan('initiator', 1); //支持单个
					layuiRowspan(['initiatorUsername', 'userInfo'], 1); //支持数组
					// 设置换页勾选之前的
					// console.log(checked);
					//在缓存中找到PM_CODE ,然后设置data表格中的选中状态
					//循环所有数据，找出对应关系，设置checkbox选中状态
					for(var i=0;i<res.data.length;i++){
						for(var j=0;j<checked.length;j++){
							if(res.data[i].timetableResultId==checked[j].timetableResultId){
								//这里才是真正的有效勾选
								res.data[i]["LAY_CHECKED"]='true';
								//找到对应数据改变勾选样式，呈现出选中效果
								var index= res.data[i]['LAY_TABLE_INDEX'];
								$('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').prop('checked', true);
								$('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').next().addClass('layui-form-checked');
							}
						}
					}
				}
			});
		}else{
			table.render({
				elem: '#academicdeanexaminetutor',
				// url: layui.setter.base + 'json/academicRelationship.json', //数据接口
				url: `${evaluationHost}api/timetableResult/allUsers/result`, //数据接口
				where: {businessId: businessId},
				title: '对照名单',
				cellMinWidth: 100,
				page: false, //开启分页
				page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
					layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
					//curr: 5, //设定初始在第 5 页
					groups: 1, //只显示 1 个连续页码
					first: false, //不显示首页
					last: false //不显示尾页
				},parseData: function(res){ //res 即为原始返回的数据
					// console.log(res);
					var pdata = {
						"code": res.code, //解析接口状态
						"msg": res.msg, //解析提示文本
						"count": res.count, //解析数据长度
						"data": [] //解析数据列表
					}
					pdata.data = [];
					if(res.data){
						$.each(res.data,function (index,item) {
							var group = {};
							group.timetableId = item.timetableId;
							group.timetableResultId = item.timetableResultId;
							group.timetableProcessId = item.timetableProcessId;
							group.indicatorEname = item.indicatorEname;
							group.targetUsername = item.studentUsername;
							group.enabled = item.enabled;
							group.targetCname = item.studentCname;
							let tu= JSON.parse(item.studentInfo);
							let tus = '';
							$.each(tu,function (m,n) {
								tus+=`【${m}】${n} &nbsp;`
							})
							group.targetUserInfo = tus
							group.initiatorCname = item.teacherCname;
							group.initiatorUsername = item.teacherUsername;
							let iu= JSON.parse(item.teacherInfo);
							let ius = '';
							$.each(iu,function (m,n) {
								ius+=`【${m}】${n} &nbsp;`
							})
							group.initiatorUserInfo = ius;
							pdata.data.push(group);
						})
					}
					// console.log(pdata);
					return pdata;
				},
				cols: [
					[ //表头
						{fixed: 'left',title: '序号',rowspan:'2',type: 'numbers',width: 50},
						{field: 'initiatorCname',title: '申请人',align:'center',rowspan:'2',colspan: '1'},
						{field: 'initiator',title: '退选学生',align:'center',colspan: '3',rowspan:'1'},
						{field: 'type',title: '操作',align:'center',rowspan:'2',colspan: '1',
							templet: function(d){
								// console.log(d.LAY_INDEX); //得到序号。一般不常用
								// console.log(d.LAY_COL); //得到当前列表头配置信息（layui 2.6.8 新增）。一般不常用
								let type = '';
								switch (d.indicatorEname) {
									case 'deleteTargetUsers' :
										type = '<span style="color: #ff5722!important;">退选</span>';
										break;
									case 'addTargetUsers' :
										type = '<span style="color: #16b51c!important;">添加</span>';
										break;
								}
								//得到当前行数据，并拼接成自定义模板
								return type;
							}},
						{field: 'status',title: '审核状态',align:'center',rowspan:'2',colspan: '1',
							templet: function(d){
								// console.log(d.LAY_INDEX); //得到序号。一般不常用
								// console.log(d.LAY_COL); //得到当前列表头配置信息（layui 2.6.8 新增）。一般不常用
								let status = '';
								switch (d.enabled) {
									case 0 :
										status = '未审核';
										break;
									case 1 :
										status = '<span style="color: #16b51c!important;">审核通过</span>';;
										break;
									case 2 :
										status = '<span style="color: #ff5722!important;">审核拒绝</span>';;
										break;
								}
								//得到当前行数据，并拼接成自定义模板
								return status;
							}}
					],
					[
						{field: 'targetCname',title: '学生姓名',align:'center',sort: true},
						{field: 'targetUsername',title: '学生学号',align:'center',sort: true},
						{field: 'targetUserInfo',title: '学生信息',align:'center',sort: true},
					]
				],
				id: 'academicdeanexaminetutor',
				data: table,
				// skin: 'line', //表格风格
				even: false,
				limits: [5, 7, 10, 20],
				limit: 5, //每页默认显示的数量
				done: function(res, curr, count){
					layuiRowspan('initiator', 1); //支持单个
					layuiRowspan(['initiatorUsername', 'userInfo'], 1); //支持数组
				}
			});
		}
		// console.log(data);
	});
	function audit(enabled,timetableResultId,targetUsername,targetCname,initiatorusername,initiatorcname){
		let timetableResultIds = ''
		let initiatorCname = ''
		let initiatorUsername = ''
		let students = ''
		let apiStudentUserDTOList = [];
		if(!timetableResultId){
			initiatorCname = checked[0].teacherCname;
			initiatorUsername = checked[0].teacherUsername;
			$.each(checked,function (key,value) {
				timetableResultIds+=value.timetableResultId+',';
				students+=value.cname+',';
				apiStudentUserDTOList.push({
					receiverUsername:  value.username
				})
			})
			timetableResultIds = (timetableResultIds.substring(timetableResultIds.length - 1) == ',') ? timetableResultIds.substring(0, timetableResultIds.length - 1) : timetableResultIds;
			students = (students.substring(students.length - 1) == ',') ? students.substring(0, students.length - 1) : students;
		}else{
			initiatorCname = initiatorcname;
			initiatorUsername = initiatorusername;
			students = targetCname;
			apiStudentUserDTOList.push({
				receiverUsername:  targetUsername
			})
			timetableResultIds =  timetableResultId;
		}
		$.ajax({
			url: `${evaluationHost}api/timetableResult/resultEnabled?timetableResultIds=${timetableResultIds}&enabled=${enabled}`,
			async: false,
			type: 'post',
			success:function (res){
				if(res.code == 0){
					layer.msg(res.msg);
					layui.table.reload('academicdeanexaminetutor'); //重载表格
					if(enabled === 1){
						let msg = new Object();
						msg['apiUserDTOList'] = apiStudentUserDTOList;
						msg['createUsername'] = currentUsername;
						msg['project'] = 'usercenterFront';
						msg['topic'] = 'deselection_tutor_notice';
						msg['sendFlag'] = 'all';
						msg['messageContent'] = `{"type": "学业","username": "${initiatorCname}","url": "teacherInformationCenter/configcenter/registration/mainIndex?configType=${configType}"}`;
						$.ajax({
							// url: apiGateWayHost + '/message/api/message/sendMsg',
							url: apiGateWayHost+'/message/api/message/sendMsg',
							type: 'POST',
							data: JSON.stringify(msg),
							contentType: "application/json;charset=utf-8",
							async: false,
							success: function (res) {
								if (res.code == 0) {
									layer.msg(res.data);
								} else {
									layer.msg(res.msg);
								}
							},
							error: function () {
								layer.msg("信息发送报错!");
							}
						})
						msg['apiUserDTOList'] = [{
							receiverUsername:  initiatorUsername
						}];
						msg['createUsername'] = currentUsername;
						msg['project'] = 'usercenterFront';
						msg['topic'] = 'student_change_notice';
						msg['sendFlag'] = 'all';
						msg['messageContent'] = `{"type": "学业","studentName": "${students}","url": "teacherInformationCenter/configcenter/registration/mainIndex?configType=${configType}"}`;
						$.ajax({
							// url: apiGateWayHost + '/message/api/message/sendMsg',
							url: apiGateWayHost+'/message/api/message/sendMsg',
							type: 'POST',
							data: JSON.stringify(msg),
							contentType: "application/json;charset=utf-8",
							async: false,
							success: function (res) {
								if (res.code == 0) {
									layer.msg(res.data);
								} else {
									layer.msg(res.msg);
								}
							},
							error: function () {
								layer.msg("信息发送报错!");
							}
						})
					}
				}
			},
			error:function () {
				layer.msg("审核失败！");
			}
		});
	}
	//审核通过所选申请
	var passacademicdeanexaminetutor = {
		passacademicdeanexaminetutor: function() {
			layer.confirm('确认通过所选的申请吗？', {
				title: '提示'
			}, function(index) {
				if(!checked || checked.length === 0){
					layer.msg('请先勾选!');
					layer.close(index);
					return false;
				}
				audit(1);
				layer.close(index);
			});
		}
	};
	$('.passacademicdeanexaminetutor').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		passacademicdeanexaminetutor[method] ? passacademicdeanexaminetutor[method].call(this, othis) : '';
	});

	//审核拒绝所选申请
	var refuseacademicdeanexaminetutor = {
		refuseacademicdeanexaminetutor: function() {
			layer.confirm('确认拒绝所选的申请吗？', {
				title: '提示'
			}, function(index) {
				if(!checked || checked.length === 0){
					layer.msg('请先勾选!');
					layer.close(index);
					return false;
				}
				audit(2);
				layer.close(index);
			});
		}
	};
	$('.refuseacademicdeanexaminetutor').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		refuseacademicdeanexaminetutor[method] ? refuseacademicdeanexaminetutor[method].call(this, othis) : '';
	});
	table.render({
		elem: '#academicdeanexaminetutor',
		// url: layui.setter.base + 'json/academicRelationship.json', //数据接口
		url: `${evaluationHost}api/timetableResult/noAuditUsers/result`, //数据接口
		where: {businessId: businessId},
		title: '对照名单',
		cellMinWidth: 100,
		page: false, //开启分页
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			//curr: 5, //设定初始在第 5 页
			groups: 1, //只显示 1 个连续页码
			first: false, //不显示首页
			last: false //不显示尾页
		},parseData: function(res){ //res 即为原始返回的数据
			// console.log(res);
			var pdata = {
				"code": res.code, //解析接口状态
				"msg": res.msg, //解析提示文本
				"count": res.count, //解析数据长度
				"data": [] //解析数据列表
			}
			pdata.data = [];
			if(res.data){
				$.each(res.data,function (index,item) {
					var group = {};
					group.timetableId = item.timetableId;
					group.timetableResultId = item.timetableResultId;
					group.timetableProcessId = item.timetableProcessId;
					group.indicatorEname = item.indicatorEname;
					group.targetUsername = item.studentUsername;
					group.enabled = item.enabled;
					group.targetCname = item.studentCname;
					let tu= JSON.parse(item.studentInfo);
					let tus = '';
					$.each(tu,function (m,n) {
						tus+=`【${m}】${n} &nbsp;`
					})
					group.targetUserInfo = tus
					group.initiatorCname = item.teacherCname;
					group.initiatorUsername = item.teacherUsername;
					let iu= JSON.parse(item.teacherInfo);
					let ius = '';
					$.each(iu,function (m,n) {
						ius+=`【${m}】${n} &nbsp;`
					})
					group.initiatorUserInfo = ius;
					pdata.data.push(group);
				})
			}
			// console.log(pdata);
			return pdata;
		},
		cols: [
			[ //表头
				{fixed: 'left', type: 'checkbox',rowspan:'2', width: 35},
				{fixed: 'left',title: '序号',rowspan:'2',type: 'numbers',width: 50},
				{field: 'initiatorCname',title: '导师信息',align:'center',rowspan:'2'},
				{field: 'initiator',title: '退选学生',align:'center',colspan: '3'},
				{fixed: 'right',title: '操作',align:'center',rowspan:'2',toolbar: '#toolbar'}
			],
			[
				{field: 'targetCname',title: '学生姓名',align:'center',sort: true},
				{field: 'targetUsername',title: '学生学号',align:'center',sort: true},
				{field: 'targetUserInfo',title: '学生信息',align:'center',sort: true},
			]
		],
		id: 'academicdeanexaminetutor',
		data: table,
		// skin: 'line', //表格风格
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5, //每页默认显示的数量
		done: function(res, curr, count){
			layuiRowspan('initiator', 1); //支持单个
			layuiRowspan(['initiatorUsername', 'userInfo'], 1); //支持数组
			// 设置换页勾选之前的
			// console.log(checked);
			//在缓存中找到PM_CODE ,然后设置data表格中的选中状态
			//循环所有数据，找出对应关系，设置checkbox选中状态
			for(var i=0;i<res.data.length;i++){
				for(var j=0;j<checked.length;j++){
					if(res.data[i].timetableResultId==checked[j].timetableResultId){
						//这里才是真正的有效勾选
						res.data[i]["LAY_CHECKED"]='true';
						//找到对应数据改变勾选样式，呈现出选中效果
						var index= res.data[i]['LAY_TABLE_INDEX'];
						$('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').prop('checked', true);
						$('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').next().addClass('layui-form-checked');
					}
				}
			}
		}
	});
	//控制表格合并
	// table.init('academicdeanexaminetutor', {
	// 	done: function(res, curr, count) {
	// 		layuiRowspan('tutorname', 1); //支持单个
	// 		//layuiRowspan(['tutordirection', 'tutorplan'], 1); //支持数组
	// 		//layuiRowspan("8",1,true);
	// 	}
	// });
	table.on('checkbox(academicdeanexaminetutor)', function(obj){
		console.log(obj.checked); //当前是否选中状态
		console.log(obj.data); //选中行的相关数据
		console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
		// if(obj.checked){
		if(obj.type == 'all'){
			if(obj.checked) {
				var cache = table.cache['academicdeanexaminetutor'];
				for (var j = 0; j < cache.length; j++) {
					for(var i=checked.length-1;i>-1;i--){
						if(checked[i].timetableResultId == cache[j].timetableResultId){
							checked.splice(i,1);
						}
					}
				}
				for (var i = 0; i < cache.length; i++) {
					checked.push({username:cache[i].targetUsername,cname:cache[i].targetCname,teacherCname:cache[i].initiatorCname,teacherUsername:cache[i].initiatorUsername,timetableResultId:cache[i].timetableResultId});
				}
				// $.cookie("checkedCourse",checked);
			}else {
				var cache = table.cache['academicdeanexaminetutor'];
				for (var j = 0; j < cache.length; j++) {
					for(var i=checked.length-1;i>-1;i--){
						if(checked[i].timetableResultId == cache[j].timetableResultId){
							checked.splice(i,1);
						}
					}
				}
			}
		}else if(obj.type == 'one'){
			if(obj.checked) {
				for(var i=checked.length-1;i>-1;i--){
					if(checked[i].timetableResultId == obj.data.timetableResultId){
						checked.splice(i,1);

					}
				}
				checked.push({username:obj.data.targetUsername,cname:obj.data.targetCname,teacherCname:obj.data.initiatorCname,teacherUsername:obj.data.initiatorUsername,timetableResultId:obj.data.timetableResultId});
			}else {
				for(var i=checked.length-1;i>-1;i--){
					if(checked[i].timetableResultId == obj.data.timetableResultId){
						checked.splice(i,1);
					}
				}
			}
		}
		// }
		console.log(checked);
	});
	//监听行工具事件
	table.on('tool(academicdeanexaminetutor)', function(obj) {
		var data = obj.data;
		//单条申请审核通过
		if(obj.event === 'pass') {
			layer.confirm('确认通过此申请吗？', {
				title: '提示'
			}, function(index) {
				audit(1,data.timetableResultId,data.targetUsername,data.targetCname,data.initiatorUsername,data.initiatorCname);
				layer.close(index);
			});
		}
		//单条申请审核拒绝
		if(obj.event === 'refuse') {
			layer.confirm('确认拒绝此申请吗？', {
				title: '提示'
			}, function(index) {
				audit(2,data.timetableResultId);
				layer.close(index);
			});
		}
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('academicdeanexaminetutor', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						key: {
							searchid: searchbox.val()
						}
					}
				}, 'data');
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
	function selectBtnBox() {
		//分项切换
		$(".breadcrumb_division a").click(
			function() {
				$(this).addClass("breadcrumb_select").siblings().removeClass("breadcrumb_select");
				if($(this).attr('data')){
					$.ajax({
						url: evaluationHost + 'api/timetable/infoByExactSearch',
						type:'post',
						data: JSON.stringify({configTypeId: config2,businessId: $(this).attr('data'),page:1,limit:999}),
						async: false,
						contentType: "application/json;charset=UTF-8",
						success:function (res){
							let childtemplates = '<option value="">可切换项目</option>';
							let firstTimetable;
							$.each(res.data,function (key, value) {
								let name = '';
								let date = '';
								if(key === 0)
									firstTimetable =value.id;
								$.each(value.timetableProcessDTOS[0].configIndicators,function (index, item) {
									if(item.indicatorEname === 'name'){
										name = value.timetableProcessDTOS[0].timetableResults[0][`evaluationScore${index+1}`];
										return false;
									}
									// else if(item.indicatorName.indexOf('|globelDate|')!=-1){
									// 	date = value.timetableProcessDTOS[0].timetableResults[0][`evaluationScore${index+1}`];
									// 	// return false;
									// }
									// if(item.indicatorEname === 'name')
									// 	name  = value.timetableProcessDTOS[0].timetableResults[0][`evaluationScore${index+1}`];
								})
								childtemplates += `<option value="${value.id}">${name}</option>`
							})
							$('[name="template"]').html(childtemplates);
							form.render('select');
							form.on('select(templateSelect)', function(data){
								getSchoolMessageInfo(data.value);
								table.reload('academicdeanexaminetutor', {
									page: {
										curr: 1 //重新从第 1 页开始
									},
									where: {
										businessId: data.value
									}
								}, 'data');
							})
							$('[name="template"]').val(firstTimetable);
							form.render('select');
							getSchoolMessageInfo(firstTimetable);
							businessId = firstTimetable;
							table.reload('academicdeanexaminetutor', {
								page: {
									curr: 1 //重新从第 1 页开始
								},
								where: {
									businessId: businessId
								}
							}, 'data');
						},
						error:function () {
							layer.msg("获取学校通知失敗！");
						}
					});
				}
			}
		);
	}
	function getSchoolMessageInfo(timetableId) {
		$.ajax({
			url: evaluationHost + 'api/timetable/info?timetableId=' + timetableId,
			dataType: 'json',
			async: false,
			type: 'get',
			success: function (res) {
				let name = '';
				let date = '';
				let otherInfos = '&nbsp;';
				$.each(res.data[0].timetableProcessDTOS[0].configIndicators,function (index, item) {
					if(item.indicatorEname === 'name'){
						name = res.data[0].timetableProcessDTOS[0].timetableResults[0][`evaluationScore${index+1}`];
					}else if(item.indicatorName.indexOf('|globelDate|')!=-1){
						date = `${item.indicatorCname}：${res.data[0].timetableProcessDTOS[0].timetableResults[0][`evaluationScore${index+1}`]}`;
						// return false;
					}
					// else{
					// 	otherInfos+=`${item.indicatorCname}：${res.data[0].timetableProcessDTOS[0].timetableResults[0][`evaluationScore${index+1}`]}`
					// }
				})
				let info = `${name}
							<div class="li_cell_box">
								<div class="li_cell"><i class="layui-icon layui-icon-console"></i>${date}</div>
<!--								<div class="li_cell"><i class="layui-icon layui-icon-component"></i>范围：全校</div>-->
							</div>`
				$('.templateInfo').html(info);
				$('.templateOtherInfo').html(otherInfos);
			},
			error: function (err) {
				console.log(err)
			}
		});
	}
});

//传递子页面锚
$(function() {
	$(".layui-tab-title li a").click(function() {
		var name = $(this).attr("name");
		top.location.hash = name; //设置锚点
	});
});