const evaluationHost =apiGateWayHost+"/configcenter/";
var taskList = [];//并行阶段集合
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

	var url,//列表api
		timeFlag = 1,//0:已结束1:进行中2:未开始
		curruserdetail,//当前登录人个人信息
		authorities,//当前登录人拥有权限
		templateId,//进入页面的第一个模板id
		cols = [],//根据模板获取列表表头
		firstStepName,//当前模板第一阶段名称
		exactSearchDTO  = [],//记录列表筛选项
		currentauth = $.cookie('currauth'),
		currentauthName =  $.cookie("currentauthName"),
		deleteFlag = 0 ,//0不可以删除 1可以删除
		infoCname,//总览按钮文本
		businessId,//前一个流程的timetableId(学校通知)
		allProcess,//所有阶段信息
		config1,
		config2,
		config3,
		processKey;//当前模板流程
	var nextStepName = new Array();
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
				// console.log(res)
				let templates = '';
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
					templates += `<option value="${value.id}">${name}</option>`
				})
				$('[name="template"]').append(templates);
				form.render('select');
				form.on('select(templateSelect)', function(data){
					getSchoolMessageInfo(data.value);
					businessId = data.value;
					//执行重载
					table.reload('academictutorlist', {
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
				resolve('getAllSchooleMessage Success')
			},
			error:function () {
				layer.msg("获取学校通知失敗！");
			}
		});

	})
	let getAllTemplates = new Promise((resolve, reject) => {
		$.ajax({
			url: evaluationHost + 'api/template/infoByConfigType?configType='+config2,
			type:'get',
			async: false,
			success:function (res){
				if(res.data.length==1){
					templateId = res.data[0].id;
					processKey = res.data[0].processKey;
				}else if(res.data.length == 0){
					layer.msg("当前业务未创建模板!");
				}else{
					$('.timetable_tool').removeClass('layui-hide');
					var str = '';
					$.each(res.data,function (index,item){
						str +='<option value="'+ item.id +'">'+ item.templateCname +'</option>'
					});
					$('#template').append(str);
					processKey = res.data[0].processKey;
					templateId = res.data[0].id;
					form.render('select');
				}
				resolve('getAllTemplates Success')
			},
			error:function () {
				layer.msg("获取模板列表失敗！");
			}
		});

	})
	let getTemplateInfo = new Promise((resolve, reject) => {
		$.ajax({
			url: evaluationHost + 'api/template/info?templateId='+templateId,
			type:'get',
			async: false,
			success:function (res){
				nextStepCname = res.data.nextStepCname;
				infoCname = res.data.infoCname;
				$('.layui-card-header span').html(res.data.templateCname);
				$(document).attr("title",res.data.templateCname);
				$('#clientId').val(res.data.sourceProject);
				resolve('getTemplateInfo Success')
			},
			error:function () {
				layer.msg("获取模板信息失敗！");
			}
		});

	})
	Promise.all([getNextConfigId, getAllSchooleMessage, getAllTemplates, getTemplateInfo]).then((result) => {
		console.log(result)               //['成功了', 'success']
	}).catch((error) => {
		console.log(error)
	})
	getInfoByAuthorityName(currentauth);
	getTemplateProcess(currentauth);
	window.commonListRouteByTimeFlag = function (flag,obj) {
		var step1st = null;
		timeFlag = flag;
		var data = {
			exactSearchDTOList: exactSearchDTO,
			templateId: templateId,
			timeFlag: timeFlag,
			processStep: step1st
		};
		table.reload('academictutorlist', {
			page: {
				curr: 1 //重新从第 1 页开始
			},
			where:data
			// url: evaluationHost + 'api/timetable/info?templateId='+templateId+'&timeFlag='+flag
		});
	};
	//根据权限获取筛选项
	function getInfoByAuthorityName(currentauth) {
		$.cookie("currauth",currentauth);
		//是否有继承字段需要筛选
		// if(extendsField){
		// 	let fields = extendsField.split(',');
		// 	$.each(fields,function (key, value) {
		// 		if(value){
		// 			exactSearchDTO.push({
		// 				configIndicatorId: value.split('@')[2],
		// 				searchValue: value.split('@')[3]
		// 			})
		// 		}
		// 	})
		// }
		$.ajax({
			url: evaluationHost + 'api/templateAuthority/infoByAuthorityName?authorityName='+currentauth+'&templateId='+templateId,
			type:'get',
			async: false,
			success:function (res){
				// console.log(res);
				if(res.data!=null&&res.data.length>0){
					$.each(res.data,function (index,item) {
						var searchValue;
						if(item.configIndicatorSearchName == 'company'){//企业,事业,单位,公司
							if(curruserdetail.data.enterpriseUser!=null){
								searchValue = curruserdetail.data.enterpriseUser.id+'_'+curruserdetail.data.enterpriseUser.enterpriseName;
							}else if(curruserdetail.data.governmentUser!=null){
								searchValue = curruserdetail.data.governmentUser.id+'_'+curruserdetail.data.governmentUser.gsiName;
							}
						}else if(item.configIndicatorSearchName == 'academy'){//当前登录人学院
							searchValue = curruserdetail.data.normalUser.college+'_'+curruserdetail.data.normalUser.collegeName;
						}else if(item.configIndicatorSearchName == 'currentuser'){//当前登录人相关
							searchValue = currentUsername+'_'+currentCname;
						}
						exactSearchDTO.push({
							configIndicatorId: item.configIndicatorId,
							searchValue: searchValue
						})
					})
				}
			},
			error:function () {
				layer.msg("获取筛选项失敗！");
			}
		});
	}
	function getTemplateProcess(currentauth) {
		$.ajax({
			url: evaluationHost + 'api/templateProcess/infoByTemplateAndStep?templateId='+templateId+'&authorityName='+currentauth,
			type:'get',
			async: false,
			success:function (res){
				// console.log(res);
				allProcess = res.data;
				let taskStep = 0;
				$.each(allProcess,function (i,d) {
					if(d.parallelTask!=0){
						taskStep = taskStep == 0 ? d.processStep : (taskStep == d.processStep ? taskStep : d.processStep);
						taskList.push({step: taskStep,task: d.parallelTask,name: d.processCname});
					}
				})
				$.each(res.data,function (index,obj) {
					if(obj.processStep === 1){
						firstStepName = obj.processCname;
						$('.uploadacademictutorlist').attr('lay-tips',firstStepName);
						if(obj.authorityNamesEdit.length == 0){
							$('.uploadacademictutorlist').removeClass('layui-hide');
						}else{
							$.each(obj.authorityNamesEdit,function (index,item) {
								if(item == currentauth){
									$('.uploadacademictutorlist').removeClass('layui-hide');
								}
							})
						}
					}
				})
				getTableHeader();
				tableRender();
			},
			error:function () {
				layer.msg("获取第一阶段信息失败！");
			}
		});
	}
	//获取表头
	function getTableHeader(stepShow) {
		var url = stepShow ? evaluationHost + 'api/configIndicator/displayIndicator?templateId='+templateId+'&stepShow='+stepShow : evaluationHost + 'api/configIndicator/displayIndicator?templateId='+templateId
		$.ajax({
			url: url,
			type:'get',
			async: false,
			success:function (res) {
				// console.log(res);
				var coll = [];
				var col = [];
				col.push(
					// {type:'checkbox'},
					{title:'序号',width:50,type:"numbers"}
				);
				$.each(res.data,function (index,item){
					col.push({
						field: 'header'+item.id, title:item.indicatorCname,align:'center'
					})
				});
				col.push(
					{field: 'currentStep',title: '当前阶段', align: 'center'},
					{fixed: 'right',title: '导师&学生名单', align: 'center',toolbar: '#userList'},
					{title: '操作', align: 'center',minWidth: 210, toolbar: '#toolbar'}
				);
				coll.push(col);
				cols = coll;
			},
			error:function (){
				layer.msg("获取模板列表失敗！");
			}
		});
	}
	function tableRender(stepShow) {

		var data = {
			exactSearchDTOList: exactSearchDTO,
			templateId: templateId,
			timeFlag: 1,
			processStep: stepShow,
			businessId: businessId
		};
		var commonTable = table.render({
			elem: '#academictutorlist',
			id: 'academictutorlist',
			// url: evaluationHost + 'api/timetable/info?templateId='+templateId+'&timeFlag=1', //数据接口
			url: evaluationHost + 'api/timetable/infoByExactSearch', //数据接口
			method:'POST',
			where: data,
			contentType: "application/json;charset=UTF-8",
			title: $('.legend_select').text(),
			// totalRow: true, //开启合计行
			// toolbar: true,
			// defaultToolbar: ['filter', 'exports', 'print', ],
			page: true, //开启分页
			page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
				layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
				//curr: 5, //设定初始在第 5 页
				groups: 1, //只显示 1 个连续页码
				first: false, //不显示首页
				last: true //显示尾页
			},
			parseData: function(res){ //res 即为原始返回的数据
				var pdata = {
					"code": 0, //解析接口状态
					"msg": "", //解析提示文本
					"count": res.total, //解析数据长度
					"data": [] //解析数据列表
				};
				pdata.data = parmaData(res);
				return pdata;
			},
			cols: cols,
			data: table,
			//skin: 'line' ,//表格风格
			even: true,
			page: true,
			limits: [5, 10, 15, 20],
			limit: 15, //每页默认显示的数量
			request:{
				page:'page',
				limit:'limit'
			},
			done:function(res,curr,count){ // 隐藏列
				// if(deleteFlag == 0){
				// 	$(".layui-table-box").find("[data-field=0]").css("display","none");
				// }
				if(infoCname!=null&&infoCname!=''){
					$('[lay-event="detail"]').html(infoCname);
				}
				if(nextStepName.length>0){
					$.each(nextStepName,function (key, value) {
						$(`[data-index="${key}"]`).find(`td:last`).find('[lay-event="nextStep"]').html(value);
					})
					// $('[lay-event="nextStep"]').html(nextStepName);
				}
				$('.layui-tab-item').height($('.layui-tab-item').children().height());
			}
		});
	}
	function parmaData(res){
		// $("div[lay-id='exprortTable']").hide();
		// console.log(res);
		var data = []
		if(res.data.length>0){
			firstStepName = res.data[0].timetableProcessDTOS[0].processCname;
			data = [];
			$.each(res.data ,function (index,item){
				var record = {};
				record.id = item.id;
				record.step = item.currentStep;
				record.nextFlag = 0;
				record.deleteFlag = 0;
				record.timeFlag = timeFlag;
				// if(newAuth){
				// 	record.newFlag = 1
				// }else{
				// 	record.newFlag = 0;
				// }
				//如果还在第一阶段则创建人和设置删除权限都可以删除
				if(item.currentStep == 1){
					if(item.timetableProcessDTOS[0].timetableResults.length>0 && item.timetableProcessDTOS[0].timetableResults[0].initiatorUsername==currentUsername){
						record.deleteFlag = 1;
					}
				}
				if(item.currentStep>0){
					if(item.timetableProcessDTOS[item.currentStep-1].authorityNamesDelete.length!=0){
						$.each(item.timetableProcessDTOS[item.currentStep-1].authorityNamesDelete,function (ii,data) {
							if(data == currentauth){
								record.deleteFlag = 1;
							}
						})
					}else{
						record.deleteFlag = 1;
					}
				}else{
					record.deleteFlag = 1;
				}
				if(timeFlag === 0)
					record.deleteFlag = 0;
				record.currentStep = '';
				if(item.timetableProcessDTOS.length!=0){
					if(item.timetableProcessDTOS[0].timetableResults.length!=0){
						$.each(item.timetableProcessDTOS,function (i,d) {
							let isTaskStep = false;//是否是并行阶段
							if(d.processStep == item.currentStep){
								if(d.isChose == 1){
									record.currentStep += d.processCname+','
								}
								nextStepName.push(d.processCname);
								// if(!isTaskStep) //不是并行阶段
								//     record.currentStep = d.processCname;
								if(d.authorityNamesEdit!=null){
									if(d.authorityNamesEdit.length==0){
										record.nextFlag = 1;
									}else{
										$.each(d.authorityNamesEdit,function (k,v) {
											if(v == currentauth){
												record.nextFlag = 1;
											}
										})
									}

								}
							}else if(item.currentStep == 0){
								record.currentStep = '已结束';
							}
						});
						$.each(item.timetableProcessDTOS,function (j,o) {
							$.each(o.configIndicators,function (i,d) {
								// if(d.isShow == 1 || d.isShow == 2){
								$.each(cols[0],function (i2,d2) {
									if(d2.field&&d2.field.replace(/[^0-9]/ig,"") === d.id.toString()){
										if(o.timetableResults.length>0){
											if(d.indicatorName == null){d.indicatorName = ''};
											if(o.timetableResults[0]['evaluationScore'+(i+1)]!=null){
												if(d.indicatorName == 'current'||d.indicatorName.indexOf('|currentLogin|')!=-1||d.contentType == 'select'){
													record['header'+d.id] = o.timetableResults[0]['evaluationScore'+(i+1)].split('_')[o.timetableResults[0]['evaluationScore'+(i+1)].split('_').length-1]
												}else if(d.contentType == 'localObject'&&d.indicatorName == 'select'){
													if(o.timetableResults[0]['evaluationScore'+(i+1)]!=null){
														record['header'+d.id] = o.timetableResults[0]['evaluationScore'+(i+1)].split('_')[o.timetableResults[0]['evaluationScore'+(i+1)].split('_').length-1]
													}
												}else if(d.contentType == 'multiSelect') {
													var objs = o.timetableResults[0]['evaluationScore' + (i + 1)].split(',');
													var str = '';
													if (objs.length > 0) {
														$.each(objs, function (i, d) {
															str += d.split('_')[d.split('_').length - 1] + ',';
														})
														str = str.slice(0, str.length - 1);
													}
													record['header' + d.id] = str;
												}else if(d.contentType == 'radio') {
													var options = d.indicatorOptions.indexOf(',')!=-1?d.indicatorOptions.split(','):d.indicatorOptions.split('，');
													record['header' + d.id] = options[Number(o.timetableResults[0]['evaluationScore'+(i+1)])-1];
												}else if(d.contentType == 'checkbox') {
													var objs = o.timetableResults[0]['evaluationScore' + (i + 1)].split(',');
													var str = '';
													if (objs.length > 0) {
														$.each(objs, function (i, d) {
															str += d.split('_')[d.split('_').length - 1] + ',';
														})
														str = str.slice(0, str.length - 1);
													}
													record['header' + d.id] = str;
												}else{
													record['header'+d.id] = o.timetableResults[0]['evaluationScore'+(i+1)]
												}
											}
										}else{
											if(record['header'+d.id] == ''||record['header'+d.id] == null){
												record['header'+d.id] = '';
											}

										}
									}
								})

								// }
							});
						})

						data.push(record);
					}
				}
			});
			// console.log(pdata);
		}
		return data;
	}
	//打开上传学业导师名单
	var uploadacademictutorlist = {
		uploadacademictutorlist: function() {
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '阶段流转',
				area: ['390px', '260px'],
				shade: 0,
				maxmin: true,
				content: '../stepCircle?clientId='+$('#clientId').val()+'&templateId='+templateId+'&step=1&firstStepName='+firstStepName+'&businessId='+businessId,
				zIndex: layer.zIndex //重点1
				,
				success: function(layero) {
					layer.setTop(layero); //重点2
				}
			});
			layer.full(index);
		}
	};
	$('.uploadacademictutorlist').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		uploadacademictutorlist[method] ? uploadacademictutorlist[method].call(this, othis) : '';
	});


	//监听行工具事件
	table.on('tool(academictutorlist)', function(obj) {
		var data = obj.data;
		//导师名单
		if(obj.event === 'initiatorList'){
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '导师名单',
				area: ['390px', '260px'],
				shade: 0,
				maxmin: true,
				content: 'targetList?timetableId='+data.id+'&type=INITIATOR',
				zIndex: layer.zIndex //重点1
				,
				success: function(layero) {
					layer.setTop(layero); //重点2
				}
			});
			layer.full(index);
		}
		//学生名单
		if(obj.event === 'targetList'){
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '学生名单',
				area: ['390px', '260px'],
				shade: 0,
				maxmin: true,
				content: 'targetList?timetableId='+data.id+'&type=TARGET',
				zIndex: layer.zIndex //重点1
				,
				success: function(layero) {
					layer.setTop(layero); //重点2
				}
			});
			layer.full(index);
		}
		if(obj.event === 'detail'){
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '阶段总览',
				area: ['390px', '260px'],
				shade: 0,
				maxmin: true,
				content: '../stepInfo?timetableId='+data.id+'&clientId='+$('#clientId').val()+'&templateId='+templateId+'&step='+data.step,
				zIndex: layer.zIndex //重点1
				,
				success: function(layero) {
					layer.setTop(layero); //重点2
				}
			});
			layer.full(index);
		}
		//下一阶段
		if(obj.event === 'nextStep'){
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '阶段流转',
				area: ['390px', '260px'],
				shade: 0,
				maxmin: true,
				content: '../stepCircle?timetableId='+data.id+'&clientId='+$('#clientId').val()+'&templateId='+templateId+'&step='+data.step,
				zIndex: layer.zIndex //重点1
				,
				success: function(layero) {
					layer.setTop(layero); //重点2
				}
			});
			layer.full(index);
		}
		//删除
		if(obj.event === 'del') {
			layer.confirm('您确定删除吗?如果删除后数据将无法复原!', function(index){
				// obj.del(); //删除对应行（tr）的DOM结构
				$.ajax({
					url:  evaluationHost + 'api/timetable/deleteAll?timetableIds='+data.id,
					// data: jsonData,
					async: false,
					type: "POST",
					// contentType: "application/json;charset=UTF-8",
					success:function (res){
						// console.log(res);
						location.reload();
					},
					error: function () {
						alert("后台出了点问题，请重试！");
						return false;
					}
				});
				layer.close(index);
				//向服务端发送删除指令
			});
		}
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');
				//执行重载
				table.reload('academictutorlist', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						search: searchbox.val()
					}
				}, 'data');
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
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
				let info = `<legend>
								${name}
								<div class="li_cell_box">
									<div class="li_cell"><i class="layui-icon layui-icon-console"></i>${date}</div>
<!--									<div class="li_cell"><i class="layui-icon layui-icon-component"></i>范围：全校</div>-->
								</div>
							</legend>
							<span class="layui-breadcrumb breadcrumb_top" lay-separator="|">
							<!--<a href="#.html" name="#.html" target="i" class="breadcrumb_btn">返回按钮(备用)</a>-->
							</span>`
				$('.templateInfo').html(info);
				$('.templateOtherInfo').html(otherInfos);
			},
			error: function (err) {
				console.log(err)
			}
		});
	}
});