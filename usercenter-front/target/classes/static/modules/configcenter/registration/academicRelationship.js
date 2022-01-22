const evaluationHost =apiGateWayHost+"/configcenter/";
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

	var templateId,//进入页面的第一个模板id
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
					templates += `<a data="${value.id}">${name}</a>`
					if(key === 0)
						firstTimetable =value.id;
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
	//打开上传师生对应关系表
	var uploadacademicrelationship = {
		uploadacademicrelationship: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '上传师生对应关系表',
				area: ['700px', '480px'],
				shade: 0.5,
				maxmin: true,
				content: 'uploadAcademicRelationship.html'
			});
			//layer.full(index);
		}
	};
	$('.uploadacademicrelationship').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		uploadacademicrelationship[method] ? uploadacademicrelationship[method].call(this, othis) : '';
	});

	table.render({
		elem: '#academicrelationship',
		// url: layui.setter.base + 'json/academicRelationship.json', //数据接口
		url: `${evaluationHost}api/timetableProcess/usersByConfigType`, //数据接口
		where: {configType: config3,businessId: businessId},
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
					$.each(item.timetableProcessTargetDTOS,function (i,d) {
						if(!d.isDelete){
							var group = {};
							group.timetableId = item.timetableId;
							group.targetUsername = d.targetUsername;
							group.targetCname = d.targetCname;
							let tu= JSON.parse(d.userInfo);
							let tus = '';
							$.each(tu,function (m,n) {
								tus+=`【${m}】${n}<br/>`
							})
							group.targetUserInfo = tus
							group.initiatorCname = item.timetableProcessInitiatorDTOS[0].initiatorCname;
							group.initiatorUsername = item.timetableProcessInitiatorDTOS[0].initiatorUsername;
							let iu= JSON.parse(item.timetableProcessInitiatorDTOS[0].userInfo);
							let ius = '';
							$.each(iu,function (m,n) {
								ius+=`【${m}】${n}<br/>`
							})
							group.initiatorUserInfo = ius;
							pdata.data.push(group);
						}

					})
				})
			}
			// console.log(pdata);
			return pdata;
		},
		cols: [
			[ //表头
				// {fixed: 'left',title: '序号',rowspan:'2',type: 'numbers',width: 50},
				{field: 'initiator',title: '导师信息',align:'center',rowspan:'2',toolbar: '#tutorcell'},
				{field: 'initiator',title: '学生',align:'center',colspan: '3'},
				{fixed: 'right',title: '操作',align:'center',rowspan:'2',toolbar: '#toolbar'}
			],
			[
				{field: 'targetCname',title: '学生姓名',align:'center',sort: true},
				{field: 'targetUsername',title: '学生学号',align:'center',sort: true},
				{field: 'targetUserInfo',title: '学生信息',align:'center',sort: true},
			]
		],
		id: 'academicrelationship',
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
	//控制表格合并
	// table.init('academicrelationship', {
	// 	done: function(res, curr, count) {
	// 		layuiRowspan('tutorname', 1); //支持单个
	// 		layuiRowspan(['direction', 'plan'], 1); //支持数组
	// 		//layuiRowspan("8",1,true);
	// 	}
	// });

	//监听行工具事件
	table.on('tool(academicrelationship)', function(obj) {
		var data = obj.data;
		//打开调整学生名单
		if(obj.event === 'changestudent') {
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '请调整学生名单',
				area: ['800px', '580px'],
				shade: 0.5,
				maxmin: true,
				content: 'tutorChangeAcademicStudent?timetableId='+data.timetableId+'&type=admin&teacher='+data.initiatorCname+'&teacherusername='+data.initiatorUsername,
				zIndex: layer.zIndex //重点1
				,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					var submit1 = layero.find('iframe').contents().find("#tutorchangeacademicstudentbtn");
					submit1.click();
					// let cnames = '';
					// let usernames = '';
					// layero.find("iframe")[0].contentWindow.$(".inline_inside").find('.add_nav_box').each(function () {
					// 	cnames  += $(this).find('.add_nav_single').find('.readinputbtn').attr('data-cname')+',';
					// 	usernames += $(this).find('.add_nav_single').find('.readinputbtn').attr('data-username')+',';
					// })
					// usernames = (usernames.substring(usernames.length - 1) == ',') ? usernames.substring(0, usernames.length - 1) : usernames
					// cnames = (cnames.substring(cnames.length - 1) == ',') ? cnames.substring(0, cnames.length - 1) : cnames
					// var index = layer.open({
					// 	type: 2 //此处以iframe举例
					// 	,
					// 	title: '发送退选通知',
					// 	area: ['800px', '365px'],
					// 	shade: 0.5,
					// 	maxmin: true,
					// 	content: `sendMessage?usernames=${usernames}&cnames=${cnames}&teacherUsername=${data.initiatorUsername}&teacherCname=${data.initiatorCname}`,
					// 	zIndex: layer.zIndex //重点1
					// 	,
					// 	success: function(layero) {
					// 		layer.setTop(layero); //重点2
					// 	},
					// 	btn: ['发送', '取消'],
					// 	yes: function(index, layero) {
					// 		//点击确认触发 iframe 内容中的按钮提交
					// 		var submit1 = layero.find('iframe').contents().find("#sendmessagebtn");
					// 		submit1.click();
					// 		var submit2 = layero.parents().find('iframe').contents().find("#tutorchangeacademicstudentbtn");
					// 		submit2.click();
					// 		// layer.close(layero);
					// 	}
					// });
				}
			});
			layer.full(index);
		};

		//退订学生
		if(obj.event === 'cancelstudent') {
			layer.confirm('是否退订该学生？（退订后不可撤回）', {
				title: '提示'
			}, function(index) {
				let getAddOrDelete = new Promise((resolve, reject) => {
					$.ajax({
						url: evaluationHost+'api/timetable/info?timetableId='+data.timetableId,
						dataType: 'json',
						async: false,
						type: 'get',
						success:function (res){
							resolve(res.data[0])
						},
						error:function () {
							layer.msg("获取对应分项模板失敗！");
						}
					});

				})
				function editUserResult(timetableResult) {
					let editUResult = new Promise((resolve, reject) => {
						$.ajax({
							url: evaluationHost + 'api/timetableResult/users/result',
							type: 'POST',
							data: JSON.stringify(timetableResult),
							contentType: "application/json;charset=utf-8",
							async: false,
							success: function (res) {
								if (res.code == 0) {
									layer.msg(res.msg);
									layer.close(index);
									table.reload('academicrelationship');
									resolve('editUserResult success');
								} else {
									layer.msg(res.msg);
								}
							},
							error: function () {
								layer.msg("调用后台接口报错!");
							}
						})
					})
					return editUResult;
				}

				getAddOrDelete.then(function (result) {
					// console.log(result);
					let flag = false;
					let timetableResult = new Object();
					timetableResult['timetableId'] = data.timetableId;
					timetableResult['initialStep'] = 1;
					timetableResult['initiatorUsername'] = currentUsername;
					timetableResult['initiatorCname'] = currentCname;
					timetableResult['enabled'] = 1;
					$.each(result.timetableProcessDTOS[0].configIndicators,function (index, item) {
						if(item.indicatorEname === 'deleteTargetUsers'){
							timetableResult[`evaluationScore${index+1}`] = data.targetUsername;
							flag = true;
							return false;
						}
					})
					if(!flag){
						layer.alert('请配置流程分项以及对应配置项!')
						return false;
					}
					return editUserResult(timetableResult);
				}).then(function (res) {
					console.log(res);
					let msg = new Object();
					msg['apiUserDTOList'] = [{
						receiverUsername:  data.targetUsername
					}];
					msg['createUsername'] = currentUsername;
					msg['project'] = 'usercenterFront';
					msg['topic'] = 'deselection_tutor_notice';
					msg['sendFlag'] = 'all';
					msg['messageContent'] = `{"type": "学业","username": "${data.initiatorCname}","url": "teacherInformationCenter/configcenter/registration/mainIndex?configType=${configType}"}`;
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
						receiverUsername:  data.initiatorUsername
					}];
					msg['createUsername'] = currentUsername;
					msg['project'] = 'usercenterFront';
					msg['topic'] = 'student_change_notice';
					msg['sendFlag'] = 'all';
					msg['messageContent'] = `{"type": "学业","studentName": "${data.targetCname}","url": "teacherInformationCenter/configcenter/registration/mainIndex?configType=${configType}"}`;
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
				});


				// var index = layer.open({
				// 	type: 2 //此处以iframe举例
				// 	,
				// 	title: '发送退选通知',
				// 	area: ['800px', '365px'],
				// 	shade: 0.5,
				// 	maxmin: true,
				// 	content: `sendMessage?usernames=${data.targetUsername}&cnames=${data.targetCname}&teacherUsername=${data.initiatorUsername}&teacherCname=${data.initiatorCname}&timetableId=${data.timetableId}`,
				// 	zIndex: layer.zIndex //重点1
				// 	,
				// 	success: function(layero) {
				// 		layer.setTop(layero); //重点2
				// 	},
				// 	btn: ['发送', '取消'],
				// 	yes: function(index, layero) {
				// 		//点击确认触发 iframe 内容中的按钮提交
				// 		var submit = layero.find('iframe').contents().find("#sendmessagebtn");
				// 		submit.click();
				// 	}
				// });

			});
		}
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('academicrelationship', {
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
								businessId = data.value;
								table.reload('academicrelationship', {
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
							table.reload('academicrelationship', {
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