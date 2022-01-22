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

	var timeFlag = 1,//0:已结束1:进行中2:未开始
		currcname,//当前登录人姓名
		curruserdetail,//当前登录人个人信息
		currusername,//当前登录人工号
		templateId,//进入页面的第一个模板id
		cols = [],//根据模板获取列表表头
		firstStepName,//当前模板第一阶段名称
		exactSearchDTO  = [],//记录列表筛选项
		currentauth = $.cookie('currauth'),
		infoCname,//总览按钮文本
		nextStepCname,//下一阶段按钮文本
		allProcess,//所有阶段信息
		nextConfig,//下一流程
		nextClientId,//下一流程
		newAuth,//下一流程填写权限
		nextConfigFirstStepName,//子流程模板第一阶段名称
		nextTemplateId,//下一流程模板id
		processKey;//当前模板流程
	getAllTemplates();
	getTemplateInfo();
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
		table.reload('schoolmessage', {
			page: {
				curr: 1 //重新从第 1 页开始
			},
			where:data
			// url: evaluationHost + 'api/timetable/info?templateId='+templateId+'&timeFlag='+flag
		});
	};
	function getAllTemplates() {
		$.ajax({
			url: evaluationHost + 'api/template/infoByConfigType?configType='+configType,
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
			},
			error:function () {
				layer.msg("获取模板列表失敗！");
			}
		});
	}
	function getTemplateInfo() {
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
			},
			error:function () {
				layer.msg("获取模板信息失敗！");
			}
		});
	}
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
							searchValue = currusername+'_'+currcname;
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
						$('.newschoolmessage').attr('lay-tips',firstStepName);
						if(obj.authorityNamesEdit.length == 0){
							$('.newschoolmessage').removeClass('layui-hide');
						}else{
							$.each(obj.authorityNamesEdit,function (index,item) {
								if(item == currentauth){
									$('.newschoolmessage').removeClass('layui-hide');
								}
							})
						}
					}
				})
				getNextConfigId();
				getTableHeader();
				tableRender();
			},
			error:function () {
				layer.msg("获取第一阶段信息失败！");
			}
		});
	}
	//获取子流程信息
	function getNextConfigId() {
		$.ajax({
			url: evaluationHost + 'api/configType/configTypes/father/'+configType,
			type:'get',
			async: false,
			success:function (res){
				// console.log(res);
				nextConfig = res.data[0].id;
				getNextConfigInfo();
			},
			error:function () {
				layer.msg("获取下一个流程模板列表失敗！");
			}
		});

	}
	//获取子流程信息
	function getNextConfigInfo() {
		$.ajax({
			url: evaluationHost + 'api/template/infoByConfigType?configType='+nextConfig,
			type:'get',
			async: false,
			success:function (res){
				if(res.data.length>0){
					nextClientId = res.data[0].sourceProject
					nextTemplateId = res.data[0].id;
					getNextConfigTemplateProcess(currentauth);
					// getNextConfigIndicator();
				}else{
					layer.msg("下一流程未配置");
				}
			},
			error:function () {
				layer.msg("获取下一个流程模板列表失敗！");
			}
		});

	}
	function getNextConfigTemplateProcess(currentauth) {
		$.ajax({
			url: evaluationHost + 'api/templateProcess/infoByTemplateAndStep?templateId='+nextTemplateId+'&authorityName='+currentauth,
			type:'get',
			async: false,
			success:function (res){
				// console.log(res);
				$.each(res.data,function (index,obj) {
					if(obj.processStep === 1){
						nextConfigFirstStepName = obj.processCname;
						if(obj.authorityNamesEdit.length == 0){
							newAuth = true;
						}else{
							$.each(obj.authorityNamesEdit,function (index,item) {
								if(item == currentauth){
									newAuth = true;
									return false;
								}
							})
						}
					}
				})
			},
			error:function () {
				layer.msg("获取子流程第一阶段信息失败！");
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
			processStep: stepShow
		};
		var commonTable = table.render({
			elem: '#schoolmessage',
			id: 'schoolmessage',
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
				if(nextConfigFirstStepName){
					$('[lay-event="nextProcess"]').html(nextConfigFirstStepName);
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
				if(newAuth){
					record.newFlag = 1
				}else{
					record.newFlag = 0;
				}
				//如果还在第一阶段则创建人和设置删除权限都可以删除
				if(item.currentStep == 1){
					if(item.timetableProcessDTOS[0].timetableResults.length>0 && item.timetableProcessDTOS[0].timetableResults[0].initiatorUsername==currusername){
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
	//打开新增学校通知
	var newschoolmessage = {
		newschoolmessage: function() {
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '新建',
				area: ['390px', '260px'],
				shade: 0,
				maxmin: true,
				// content: 'newTimetable?flag=0&templateId='+templateId+'&clientId='+$('#clientId').val(),
				content: '../stepCircle?clientId='+$('#clientId').val()+'&templateId='+templateId+'&step=1&firstStepName='+firstStepName,
				zIndex: layer.zIndex //重点1
				,
				success: function(layero) {
					layer.setTop(layero); //重点2
				}
			});
			layer.full(index);
		}
	};
	$('.newschoolmessage').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newschoolmessage[method] ? newschoolmessage[method].call(this, othis) : '';
	});
	//监听行工具事件
	table.on('tool(schoolmessage)', function(obj) {
		var data = obj.data;
		//阶段总览
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
		//打开上传学业导师名单
		//填写子流程
		if(obj.event === 'nextProcess'){
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '阶段流转',
				area: ['390px', '260px'],
				shade: 0,
				maxmin: true,
				content: '../stepCircle?clientId='+nextClientId+'&templateId='+nextTemplateId+'&step=1&firstStepName='+nextConfigFirstStepName+'&businessId='+data.id,
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
				var search_box = $('#search_box');
				var data1 = {
					exactSearchDTOList: exactSearchDTO,
					templateId: templateId,
					timeFlag: timeFlag,
					search: search_box.val()
				};
				//执行重载
				table.reload('commonList', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: data1
				}, 'data');
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
});