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
	getNextConfigId.then((result) => {
		console.log(result)               //['成功了', 'success']
	}).catch((error) => {
		console.log(error)
	})
	//打开申请重选导师
	var applychangeacademictutor = {
		applychangeacademictutor: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '申请重选导师',
				area: ['500px', '500px'],
				shade: 0.5,
				maxmin: true,
				content: 'applyChangeAcademicTutor.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['提交申请', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#applychangeacademictutorbtn");
					submit.click();
				}
			});
			layer.full(index);
		}
	};
	$('.applychangeacademictutor').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		applychangeacademictutor[method] ? applychangeacademictutor[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#academictutorlist',
		url: `${evaluationHost}api/timetableProcess/usersByCurrentUser`, //数据接口
		title: '列表',
		where:{username: currentUsername,typeName: 'academicAdvisor',type: 'INITIATOR'},
		cellMinWidth: 100,
		cols: [
			[ //表头
			{
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
				title: '工号',
				align: 'center',
				sort: true
			}, {
				field: 'userInfo',
				title: '个人信息',
				align: 'center',
				sort: true
			}
			// , {
			// 	fixed: 'right',
			// 	title: '操作',
			// 	align: 'center',
			// 	toolbar: '#toolbar',
			// 	width: 228
			// }
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
				userList = res.data.timetableProcessInitiatorDTOS;
				$.each(userList,function (key,value) {
					// if(!value.isDelete){
						let user = new Object();
						user['cname'] = value.initiatorCname;
						user['username'] = value.initiatorUsername;
						user['timetableId'] = value.timetableId;
						timetableId = value.timetableId;
						let u= JSON.parse(value.userInfo);
						let us = '';
						$.each(u,function (m,n) {
							us+=`【${m}】${n} &nbsp&nbsp`
						})
						user['userInfo'] = us;
						pdata.data.push(user);
					// }
				})
			}
			return pdata;
		},
		id: 'academictutorlist',
		data: table,
		skin: 'line', //表格风格			
		even: false
	});

	//监听行工具事件
	table.on('tool(academictutorlist)', function(obj) {
		var data = obj.data;
		//退选导师
		if(obj.event === 'canceltutor') {
			layer.confirm('确认申请退选该导师吗？', {
				title: '提示'
			}, function(index) {
				layer.close(index);
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
});

//退选功能菜单
function deletenav(obj) {
	$(obj).parents(".add_nav_single").remove();
}

//传递子页面锚
$(function() {
	$(".layui-tab-title li a").click(function() {
		var name = $(this).attr("name");
		top.location.hash = name; //设置锚点
	});
});