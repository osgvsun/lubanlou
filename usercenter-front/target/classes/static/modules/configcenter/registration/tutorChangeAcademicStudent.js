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
	//layer.msg('');

	form.render(null, 'tutorchangeacademicstudentbox');

	//监听提交
	form.on('submit(tutorchangeacademicstudentbtn)', function(data) {
		var field = data.field; //获取提交的字段
		let usernames = ''
		let students = ''
		$.each(checked,function (key,value) {
			usernames+=value.username+',';
			students+=value.cname+',';
		})
		usernames = (usernames.substring(usernames.length - 1) == ',') ? usernames.substring(0, usernames.length - 1) : usernames
		students = (students.substring(students.length - 1) == ',') ? students.substring(0, students.length - 1) : students
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
							resolve('editUserResult success');
						} else {
							layer.msg(res.msg);
						}
					},
					error: function () {
						layer.msg("调用保存学生接口报错!");
					}
				})
			})
			return editUResult;
		}
		if(usernames === ''){
			layer.msg('请先选择学生!')
			return false;
		}
		getAddOrDelete.then(function (result) {
			console.log(result);
			let flag = false;
			let timetableResult = new Object();
			timetableResult['timetableId'] = timetableId;
			timetableResult['initialStep'] = type === 'admin' ? 1 : 2;
			timetableResult['initiatorUsername'] = currentUsername;
			timetableResult['initiatorCname'] = currentCname;
			timetableResult['enabled'] =  1;
			let configIndicators = type === 'admin' ? result.timetableProcessDTOS[0].configIndicators : result.timetableProcessDTOS[1].configIndicators;
			$.each(configIndicators,function (index, item) {
				if(item.indicatorEname === 'addTargetUsers'){
					timetableResult[`evaluationScore${index+1}`] = usernames;
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
			var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
			if(type && type!=='admin'){
				parent.layui.table.reload('academicstudentlist'); //重载表格
				parent.layer.close(index); //再执行关闭
			}else{
				let msg = new Object();
				let apiUserDTOList = [];
				$.each(usernames.split(','), function (key, value) {
					apiUserDTOList.push({
						receiverUsername:  value
					})
				})
				msg['apiUserDTOList'] = apiUserDTOList;
				msg['createUsername'] = currentUsername;
				msg['project'] = 'usercenterFront';
				msg['topic'] = 'tutor_change_notice';
				msg['messageContent'] = `{"type": "学业","username": "${teacher}","url": "teacherInformationCenter/configcenter/registration/mainIndex?configType=${parent.configType}"}`;
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
					receiverUsername:  teacherusername
				}];
				msg['createUsername'] = currentUsername;
				msg['project'] = 'usercenterFront';
				msg['topic'] = 'new_student_notice';
				msg['messageContent'] = `{"cname": "学业导师","studentName": "${students}","url": "teacherInformationCenter/configcenter/registration/mainIndex?configType=${parent.configType}"}`;
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
							parent.layui.table.reload('academicrelationship'); //重载表格
							parent.layer.close(index); //再执行关闭
						} else {
							layer.msg(res.msg);
						}
					},
					error: function () {
						layer.msg("信息发送报错!");
					}
				})
			}
			// type === 'admin' ? parent.layui.table.reload('academicrelationship') : parent.layui.table.reload('academicstudentlist'); //重载表格
			// parent.layer.close(index); //再执行关闭

		});
		// let user = {
		// 	username: username,
		// 	timetableId: timetableId,
		// 	type: 'TARGET'
		// }
		// $.ajax({
		// 	url: evaluationHost + 'api/timetableProcess/regroup/users',
		// 	type:'POST',
		// 	data: user,
		// 	// contentType:"application/json;charset=utf-8",
		// 	async: false,
		// 	success:function (res){
		// 		if(res.code == 0){
		// 			layer.msg(res.msg);
		// 			var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		// 			parent.layui.table.reload('academicrelationship'); //重载表格
		// 			parent.layer.close(index); //再执行关闭
		// 		}else{
		// 			layer.msg(res.msg);
		// 		}
		// 	},
		// 	error:function () {
		// 		layer.msg("调用后台接口报错!");
		// 	}
		// });
	});

	// //信息
	// form.val('tutorchangeacademicstudentbox', {
	// 	"originalstudentinfo": "【姓名】test1，【性别】test2，【年龄】test3"
	// });

	//添加所选学生
	var addstudentlist = {
		addstudentlist: function() {
			layer.msg('已添加所选学生！');
		}
	};
	$('.addstudentlist').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		addstudentlist[method] ? addstudentlist[method].call(this, othis) : '';
	});

	//取消所选学生
	var cancelstudentlist = {
		cancelstudentlist: function() {
			layer.msg('已取消所选学生！');
		}
	};
	$('.cancelstudentlist').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		cancelstudentlist[method] ? cancelstudentlist[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#tutorchangeacademicstudent',
		url: `${evaluationHost}api/timetableProcess/deleted/users?timetableId=${timetableId}&type=TARGET`, //数据接口
		title: '列表',
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
				},{
				fixed: 'left',
				title: '序号',
				type: 'numbers',
				width: 50
			}, {
				field: 'cname',
				title: '姓名',
				align: 'center',
				sort: true
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
			}
			// , {
			// 		fixed: 'right',
			// 		title: '操作',
			// 		toolbar: '#toolbar',
			// 		width: 110
			// 	}
			]
		],
		parseData: function(res){ //res 即为原始返回的数据
			var pdata = {
				"code": 0, //解析接口状态
				"msg": "", //解析提示文本
				"count": res.count, //解析数据长度
				"data": [] //解析数据列表
			};
			let userList = res.data.timetableProcessTargetDTOS;
			$.each(userList,function (key,value) {
				let user = new Object();
				user['cname'] = value.targetCname ;
				user['username'] = value.targetUsername;
				let u= JSON.parse(value.userInfo);
				let us = '';
				$.each(u,function (m,n) {
					us+=`【${m}】${n} &nbsp&nbsp`
				})
				user['userInfo'] = us;
				pdata.data.push(user);
			})
			// pdata.data = parmaData(res);
			return pdata;
		},
		id: 'tutorchangeacademicstudent',
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
	table.on('checkbox(tutorchangeacademicstudent)', function(obj){
		// console.log(obj.checked); //当前是否选中状态
		// console.log(obj.data); //选中行的相关数据
		// console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
		// if(obj.checked){
		if(obj.type == 'all'){
			if(obj.checked) {
				var cache = table.cache['tutorchangeacademicstudent'];
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
				var cache = table.cache['tutorchangeacademicstudent'];
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
		// console.log(checked);
		let str = '';
		$.each(checked,function (key,value) {
			str+= `<div class="layui-inline add_nav_box">
							<div class="mix_short_input add_nav_single">
								<input class="layui-input readinputbtn" type="button" name="originalstudentinfo" data-username="${value.username}" data-cname="${value.cname}" disabled="disabled" readonly="readonly" value="【姓名】${value.cname}【学号】${value.username}"/>
								<label class="layui-icon layui-icon-close delete_nav " onClick="deletenav(this);" title="取消选择"></label>
							</div>
						</div>`
		})
		$('.inline_inside').html(str);
	});
	//监听行工具事件
	table.on('tool(tutorchangeacademicstudent)', function(obj) {
		var data = obj.data;
		//添加学生
		if(obj.event === 'addstudent') {
			layer.msg('已添加！');
		}
		//取消选择学生
		if(obj.event === 'cancelstudent') {
			layer.msg('已取消选择！');
		}
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('tutorchangeacademicstudent', {
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
	//退选功能菜单
	window.deletenav = function (obj){
	// function deletenav(obj) {
		let username = $(obj).prev().attr('data');
		for(var i=checked.length-1;i>-1;i--){
			if(checked[i].username == username){
				checked.splice(i,1);
			}
		}
		var cache = table.cache['tutorchangeacademicstudent'];
		for (var j = 0; j < cache.length; j++) {
			if(username == cache[j].username){
				table.cache['tutorchangeacademicstudent'][j]["LAY_CHECKED"]='false';
				$('.layui-table tr[data-index=' + j + '] input[type="checkbox"]').prop('checked', false);
				$('.layui-table tr[data-index=' + j + '] input[type="checkbox"]').next().removeClass('layui-form-checked');
				return false;
			}
		}
		$(obj).parents(".add_nav_single").remove();
	}
});

