layui.use(['index', 'form', 'laypage', 'laydate', 'layer', 'table', 'element'], function() {
	var $ = layui.$,
		admin = layui.admin,
		element = layui.element,
		layer = layui.layer,
		form = layui.form,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table;

	//向世界问个好
	layer.msg('进入物联设备-门禁');

	form.render(null, 'iotaccesscontrol');

	//打开新增门禁页面
	var newaccess = {
		newaccess: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '新增门禁',
				area: ['710px', '515px'],
				shade: 0.3,
				maxmin: true,
				content: 'iotNewAccess',
				zIndex: layer.zIndex //重点1
				,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['保存', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newaccessbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newaccess').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newaccess[method] ? newaccess[method].call(this, othis) : '';
	});

	//执行表单
	table.render({
		elem: '#iotaccesscontroltab',
		// url: layui.setter.base + "json/iotAccessControl.json", //数据接口
		url: iotHost + "/api/agent/ListIotAccess", //数据接口
		// url:iotHost + "/getAgent",
		// method: 'POST',
		// where:{hardwareType:548},
		// contentType: "application/json",
		// data:{
		// 	pageName:"page",
		// 	limitName:"size",
		// },
		title: '表单',
		cellMinWidth: 130,
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			curr: 1, //设定初始在第 1 页
			groups: 1, //只显示 1 个连续页码
			first: false, //不显示首页
			last: false //不显示尾页
		},
		cols: [
			[ //表头
				{
					fixed: 'left',
					title: '序号',
					type: 'numbers',
					width: 50,
					align: 'center'
				}, {
					field: 'roomName',
					title: '实验室名称',
					sort: true,
				}, {
					field: 'hardwareIp',
					title: 'IP地址',
					sort: true
				}, {
					field: 'hardwareName',
					title: '硬件名称',
					sort: true
				// }, {
				// 	field: 'serverIp',
				// 	title: '服务器IP',
				// 	sort: true
				}, {
					fixed: 'right',
					title: '操作',
					width: 180,
					align: 'center',
					toolbar: '#operation'
				}, {
					fixed: 'right',
					title: '实时控制',
					width: 530,
					align: 'center',
					toolbar: '#control'
			}
			]
		],
		request:{
			// pageName:"page",
			// limitName:"size"
			pageName:"current",
			limitName:"pageSize"
		},
		data: table,
		skin: 'line', //表格风格
		even: true,
		page: true,
		id: 'iotaccesscontroltab',
		limits: [5, 7, 10, 20],
		limit: 10 ,//每页默认显示的数量
		parseData:function(res) {
			// var currentData = res.data;
			var currentData = res.data.records;
			for (var i = 0; i < currentData.length; i++) {
				try {
					var status = OAuth2.isUserEnabled(currentData[i].username);
					currentData[i].status = status;
				}
				catch (e) {
					currentData[i].status = false
				}
			}

			return {
				code: res.code,
				// count: res.count,
				count: res.data.total,
				curr: res.data.current,
				data: currentData
			}
		}
	});

	//监听行工具事件
	table.on('tool(iotaccesscontroltab)', function(obj) {
		var data = obj.data.hardwareIp;
		var data1 = obj.data.hardwareMac;
		var entityId = obj.data.entityId;
		var entityType = obj.data.entityType;
		var agentIndexId = obj.data.agentIndexId;
		// console.log(obj)
		//编辑门禁信息
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '编辑门禁',
				area: ['710px', '508px'],
				shade: 0.5,
				maxmin: true,
				content: 'iotEditAccess?sn='+obj.data.sn,
				zIndex: layer.zIndex //重点1
				,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['保存', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#editaccessbtn");
					submit.click();
				}
			});
			//layer.full(index);
		};
		//删除门禁信息
		if(obj.event === 'del'){
			if(confirm('确认删除吗?')) {
				$.ajax({
					url: iotHost + '/api/agent/deleteIotAccess/',
					type: 'post',
					data: {
						hardwareIp: data
					},
					success: function (res) {
						if (!res.code) {
							parent.layer.alert("删除成功!")
							obj.del();
							table.reload('iotaccesscontroltab');
						} else
							parent.layer.alert(res.msg);

					},
					error: function () {
						alert("删除接口请求失败！")
					}
				})
			}
		}
		/**
		 * Description 绑定设备/实验室
		 *
		 * @author chenjiali
		 * @date 2021/10/27
		 */
		if(obj.event === 'bind') {
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '绑定设备/实验室',
				area: ['710px', '508px'],
				shade: 0.5,
				maxmin: true,
				content: 'iotBindAccess?sn='+obj.data.agentSn,
				zIndex: layer.zIndex //重点1
				,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['保存', '取消'],

				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#bindaccessbtn");
					submit.click();
				}
			});
			//layer.full(index);
		};
		/**
		 * Description 分路管理
		 *
		 * @author chenjiali
		 * @date 2021/10/27
		 */
		if(obj.event === 'agentIndex') {
			var index = layer.open({
				type: 2 //此处以iframe举例
				,
				title: '分路管理',
				area: ['710px', '508px'],
				shade: 0.5,
				maxmin: true,
				content: 'iotIndexAccess?sn='+obj.data.agentSn,
				zIndex: layer.zIndex //重点1
				,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['保存', '取消'],

				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#indexaccessbtn");
					submit.click();
				}
			});
			//layer.full(index);
		};
		/**
		 * Description 检查门锁状态
		 *
		 * @author chenjiali
		 * @date 2021/1/4
		 */
		if(obj.event === 'doorState'){
			$.ajax({
				url:iotHost+'/api/agent/checkDoorStatus',
				type:'post',
				data:{
					ip : data
				},
				success:function (s) {
					if (s=="1") {
						parent.layer.alert("当前门禁是关闭状态！")
						table.reload('iotaccesscontroltab');
					}
					else if(s=="0") {
						parent.layer.alert("当前门禁是打开状态！");
					}
					else
						parent.layer.alert(s);
				},
				error:function () {
					alert("接口请求失败")
				}
			})
		}

		/**
		 * Description 远程开门
		 *
		 * @author chenjiali
		 * @date 2020/10/12
		 */
		if(obj.event === 'openDoor'){
			$.ajax({
				url:iotHost+'/api/agent/doorOpen',
				type:'post',
				data:{
					hardwareIp : data
				},
				success:function (s) {
					if (s=="success") {
						parent.layer.alert("远程开门成功！")
						table.reload('iotaccesscontroltab');
					}
					else
						parent.layer.alert("远程开门失败！: "+s);

				},
				error:function () {
					alert("接口请求失败")
				}
			})
		}
		/**
		 * Description 时间校准
		 *
		 * @author chenjiali
		 * @date 2020/11/9
		 */
		if(obj.event === 'timeCorrect') {
			$.ajax({
				url:iotHost+'/api/agent/timeCorrect',
				type:'get',
				data:{
					hardwareIp : data
				},
				success:function (s) {
						parent.layer.alert(s);
				},
				error:function () {
					alert("接口请求失败")
				}
			})
		}
		/**
		 * Description 日志上传
		 *
		 * @author chenjiali
		 * @date 2020/11/9
		 */
		if(obj.event === 'logUpload') {
			$.ajax({
				url:iotHost+'/api/agent/logUpload',
				type:'get',
				data:{
					hardwareIp : data
				},
				success:function (s) {
					parent.layer.alert(s);
				},
				error:function () {
					alert("接口请求失败")
				}
			})
		}
		/**
		 * Description 数据下发
		 *
		 * @author chenjiali
		 * @date 2020/11/9
		 */
		if(obj.event === 'dataDistribute') {
			$.ajax({
				url:iotHost+'/api/agent/dataDistribute',
				type:'get',
				data:{
					hardwareIp : data
				},
				success:function (s) {
					parent.layer.alert(s);
				},
				error:function () {
					alert("接口请求失败")
				}
			})
		}
		/**
		 * Description 当天预约数据下发
		 *
		 * @author chenjiali
		 * @date 2021/1/7
		 */
		if(obj.event === 'regcard') {
			$.ajax({
				url:iotHost+'/api/reservation/regcard',
				type:'post',
				data:{
					ip : data
				},
				success:function (s) {
					if (s=="success") {
						parent.layer.alert("数据下发成功")
						table.reload('iotaccesscontroltab');
					}
					else
						parent.layer.alert("数据下发失败！: "+s);
				},
				error:function () {
					alert("接口请求失败")
				}
			})
		}
		/**
		 * Description 云地通信：远程开门
		 *
		 * @author chenjiali
		 * @date 2021/1/11
		 */
		// if(obj.event === 'openDoor_cloud'){
		// 	$.ajax({
		// 		url:iotHost+'/api/agent/opendoor',
		// 		type:'post',
		// 		data:{
		// 			ip : data ,
		// 			serverMac : data1
		// 		},
		// 		success:function (s) {
		// 			if (s=="success") {
		// 				parent.layer.alert("远程开门成功！")
		// 				table.reload('iotaccesscontroltab');
		// 			}
		// 			else
		// 				parent.layer.alert("远程开门失败！: "+s);
		// 		},
		// 		error:function () {
		// 			alert("接口请求失败")
		// 		}
		// 	})
		// }
		/**
		 * Description 云地通信：门禁数据下发
		 *
		 * @author chenjiali
		 * @date 2021/1/11
		 */
		// if(obj.event === 'regcard_cloud'){
		// 	$.ajax({
		// 		url:iotHost+'/api/reservation/DownRegcarddoor',
		// 		type:'post',
		// 		data:{
		// 			ip : data ,
		// 			serverMac : data1
		// 		},
		// 		success:function (s) {
		// 			if (s=="success") {
		// 				parent.layer.alert("数据下发成功")
		// 				table.reload('iotaccesscontroltab');
		// 			}
		// 			else
		// 				parent.layer.alert("数据下发失败！: "+s);
		// 		},
		// 		error:function () {
		// 			alert("接口请求失败")
		// 		}
		// 	})
		// }

	});
	//获取实验室下拉框数据
	$.ajax({
		url:iotHost + "/api/agent/listAccessRoom",
		dataType:"JSON",
		success:function(res){
	//回调函数
			let str = `<option value="">请选择实验室</option>`
			if (res.data.length === 0) {
				str = `<option value="">暂无实验室数据</option>`
			} else {
				for (let i = 0; i < res.data.length; i++) {
					str += `<option value="${res.data[i]['room_name']}">${res.data[i]['room_name']}</option>`
				}
			}
			$(`select[name=room_name]`).html("");
			$(`select[name=room_name]`).append(str);
			form.render('select', "iotaccesscontrol");
		},
	})

	//搜索
	var $ = layui.$,
		active = {
			reload: function() {
				var hardwareIp = $('input[name=hardwareIp]').val();
				var roomName = $('select[name=room_name]').val();

				//执行重载
				table.reload('iotaccesscontroltab', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
							hardwareIp,
							roomName
					}
				}, 'data');
			}
		};
	// //根据实验室筛选门禁
	// var chooseRoomName=$("#room_name").val();//实验室变量
	// form.on('select(chooseRoom)', function(data){
	// 	console.log(data.value); //得到被选中的值
	// 	chooseRoomName=data.value;
	// 	table.reload("iotaccesscontroltab",{
	// 		where:{
	// 			roomName:chooseRoomName
	// 		},
	// 	})
	// });

	$('.searchbtn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
});