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
	//向世界问个好
	// layer.msg('进入导师工作管理');
	// form.render(null, 'academicstudentlistbox');
	//信息
	// form.val('academicstudentlistbox', {
	// 	"": "" //备用
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
	//打开申请调整学生名单
	var applychangeacademicstudent = {
		applychangeacademicstudent: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '请调整学生名单',
				area: ['800px', '580px'],
				shade: 0.5,
				maxmin: true,
				content: 'tutorChangeAcademicStudent?timetableId='+timetableId+'&type=teacher',
				zIndex: layer.zIndex //重点1
				,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					var submit1 = layero.find('iframe').contents().find("#tutorchangeacademicstudentbtn");
					submit1.click();
				}
			});
			layer.full(index);
		}
	};
	$('.applychangeacademicstudent').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		applychangeacademicstudent[method] ? applychangeacademicstudent[method].call(this, othis) : '';
	});

	//申请退选所选学生
	var cancelacademicstudentlist = {
		cancelacademicstudentlist: function() {
			layer.confirm('确认申请退选所选的学生吗？', {
				title: '提示'
			}, function(index) {
				let usernames = ''
				$.each(checked,function (key,value) {
					usernames+=value.username+',';
				})
				usernames = (usernames.substring(usernames.length - 1) == ',') ? usernames.substring(0, usernames.length - 1) : usernames
				deleteStudent(timetableId,usernames)
				// layer.close(index);
			});
		}
	};
	$('.cancelacademicstudentlist').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		cancelacademicstudentlist[method] ? cancelacademicstudentlist[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#academicstudentlist',
		url: `${evaluationHost}api/timetableProcess/usersByCurrentUser`, //数据接口
		title: '列表',
		where:{username: currentUsername,businessId: businessId,type: 'TARGET'},
		cellMinWidth: 100,
		page: true, //开启分页			
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			//curr: 5, //设定初始在第 5 页				
			groups: 1, //只显示 1 个连续页码				
			first: false, //不显示首页				
			last: false //不显示尾页
		},
		cols: [
			[ //表头
				{
					fixed: 'left',
					type: 'checkbox',
					width: 35
				}, {
					fixed: 'left',
					title: '序号',
					type: 'numbers',
					width: 35
				}, {
					field: 'cname',
					title: '姓名',
					align: 'center',
					sort: true,
					templet: function(d){
						return `<span class="send_msg" lay-tips="点击发送通知" onclick="sendMsg('${d.cname}','${d.username}','${currentUsername}','${currentCname}')">${d.cname}</span>`;
					}
				}, {
					field: 'username',
					title: '学号',
					align: 'center',
					sort: true
				}, {
					field: 'userInfo',
					title: '个人信息',
					align: 'center',
					sort: true
				},{
					field: 'isdelete',
					title: '是否退选',
					align: 'center',
					sort: true,
					templet: function(d){
						if(d.isDelete){
							return `<span style="color: #FF5722">已退选</span>`;
						}else{
							return `<span style="color: #16b51c">√</span>`;
						}
					}
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 228
				}
			]
		],
		parseData: function(res){ //res 即为原始返回的数据
			var pdata = {
				"code": 0, //解析接口状态
				"msg": "", //解析提示文本
				"count": res.count, //解析数据长度
				"data": [] //解析数据列表
			};
			if(res.data){
				let userList;
				userList = res.data.timetableProcessTargetDTOS;
				$.each(userList,function (key,value) {
					let user = new Object();
					user['cname'] = value.targetCname;
					user['username'] = value.targetUsername;
					user['timetableId'] = value.timetableId;
					timetableId = value.timetableId;
					let u= JSON.parse(value.userInfo);
					let us = '';
					$.each(u,function (m,n) {
						us+=`【${m}】${n} &nbsp&nbsp`
					})
					user['userInfo'] = us;
					user['isDelete'] = value.isDelete;
					pdata.data.push(user);
				})
			}
			return pdata;
		},
		id: 'academicstudentlist',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
		,done: function (res) {
			// 设置换页勾选之前的
			// console.log(checked);
			//在缓存中找到PM_CODE ,然后设置data表格中的选中状态
			//循环所有数据，找出对应关系，设置checkbox选中状态
			for(var i=0;i<res.data.length;i++){
				for(var j=0;j<checked.length;j++){
					if(res.data[i].username==checked[j].username){
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
	table.on('checkbox(academicstudentlist)', function(obj){
		// console.log(obj.checked); //当前是否选中状态
		// console.log(obj.data); //选中行的相关数据
		// console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
		// if(obj.checked){
		if(obj.type == 'all'){
			if(obj.checked) {
				var cache = table.cache['academicstudentlist'];
				for (var j = 0; j < cache.length; j++) {
					for(var i=checked.length-1;i>-1;i--){
						if(checked[i].username == cache[j].username){
							checked.splice(i,1);
						}
					}
				}
				for (var i = 0; i < cache.length; i++) {
					checked.push({username:cache[i].username,cname:cache[i].cname});
				}
				// $.cookie("checkedCourse",checked);
			}else {
				var cache = table.cache['academicstudentlist'];
				for (var j = 0; j < cache.length; j++) {
					for(var i=checked.length-1;i>-1;i--){
						if(checked[i].username == cache[j].username){
							checked.splice(i,1);
						}
					}
				}
			}
		}else if(obj.type == 'one'){
			if(obj.checked) {
				for(var i=checked.length-1;i>-1;i--){
					if(checked[i].username == obj.data.username){
						checked.splice(i,1);

					}
				}
				checked.push({username:obj.data.username,cname:obj.data.cname});
			}else {
				for(var i=checked.length-1;i>-1;i--){
					if(checked[i].username == obj.data.username){
						checked.splice(i,1);
					}
				}
			}
		}
		// }
		console.log(checked);
	});
	//监听行工具事件
	table.on('tool(academicstudentlist)', function(obj) {
		var data = obj.data;
		//打开查看学生日志
		if(obj.event === 'studentworklog') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '查看学生工作日志',
				area: ['800px', '500px'],
				shade: 0.5,
				maxmin: true,
				content: 'academicStudentWorkLogDetail.html'
			});
			//layer.full(index);
		};
		//打开查看学生工作成果
		if(obj.event === 'studentachievement') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '查看学生工作成果',
				area: ['700px', '500px'],
				shade: 0.5,
				maxmin: true,
				content: 'academicStudentWorkAchievementDetail.html'
			});
			layer.full(index);
		};
		//退选学生
		if(obj.event === 'cancelstudent') {
			layer.confirm('确认申请退选该学生吗？', {
				title: '提示'
			}, function(index) {
				deleteStudent(data.timetableId, data.username)
			});
		}
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('academicstudentlist', {
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
	function deleteStudent(timetableId,username) {
		let getAddOrDelete = new Promise((resolve, reject) => {
			$.ajax({
				url: evaluationHost+'api/timetable/info?timetableId='+timetableId,
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
		getAddOrDelete.then(function (result) {
			console.log(result);
			let flag = false;
			let timetableResult = new Object();
			timetableResult['timetableId'] = timetableId;
			timetableResult['initialStep'] = 2;
			timetableResult['initiatorUsername'] = currentUsername;
			timetableResult['initiatorCname'] = currentCname;
			timetableResult['enabled'] = 0;
			$.each(result.timetableProcessDTOS[1].configIndicators,function (index, item) {
				if(item.indicatorEname === 'deleteTargetUsers'){
					timetableResult[`evaluationScore${index+1}`] = username;
					flag = true;
					return false;
				}
			})
			if(!flag){
				layer.alert('请配置流程分项以及对应配置项!')
				return false;
			}
			$.ajax({
				url: evaluationHost + 'api/timetableResult/users/result',
				type: 'POST',
				data: JSON.stringify(timetableResult),
				contentType: "application/json;charset=utf-8",
				async: false,
				success: function (res) {
					if (res.code == 0) {
						layer.msg(res.msg);
						// layer.close(index);
						table.reload('academicstudentlist');
					} else {
						layer.msg(res.msg);
					}
				},
				error: function () {
					layer.msg("调用后台接口报错!");
				}
			})
		});
	}
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
								table.reload('academicstudentlist', {
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
							table.reload('academicstudentlist', {
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
	window.sendMsg = function (studentCname,studentUsername) {
		var index = layer.open({
			type: 2 //此处以iframe举例
			,
			title: '发送通知',
			area: ['800px', '365px'],
			shade: 0.5,
			maxmin: true,
			content: `sendMessage?usernames=${studentUsername}&cnames=${studentCname}`,
			zIndex: layer.zIndex //重点1
			,
			success: function(layero) {
				layer.setTop(layero); //重点2
			},
			btn: ['发送', '取消'],
			yes: function(index, layero) {
				//点击确认触发 iframe 内容中的按钮提交
				var submit1 = layero.find('iframe').contents().find("#sendmessagebtn");
				submit1.click();
			}
		});
	}
});
//退选功能菜单
function deletenav(obj) {
	$(obj).parents(".add_nav_single").remove();
}