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
	layer.msg('进入物联设备-班牌');

	form.render(null, 'iotclasscard');

	//打开新增班牌页面
	var newclasscard = {
		newclasscard: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增班牌',
				area: ['710px', '515px'],
				shade: 0.3,
				maxmin: true,
				content: 'iotNewClassCard',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['保存', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newclasscardbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newclasscard').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newclasscard[method] ? newclasscard[method].call(this, othis) : '';
	});

	//执行表单
	table.render({
		elem: '#iotclasscardtab',
		// url: layui.setter.base + "json/iotClassCard.json", //数据接口
		url: iotHost + "/api/agent/ListIotClassCard", //数据接口

		title: '表单',
		cellMinWidth: 130,
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			curr: 1, //设定初始在第 5 页				
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
					sort: true
				}, {
					field: 'hardwareIp',
					title: 'IP地址',
					sort: true
				}, {
					field: 'hardwareName',
					title: '设备名称',
					sort: true
				}, {
					field: 'serverIp',
					title: '服务器IP',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					width: 120,
					align: 'center',
					toolbar: '#operation'
				}, {
					fixed: 'right',
					title: '实时控制',
					width: 520,
					align: 'center',
					toolbar: '#control'
				}
			]
		],
		request:{
			pageName:"current",
			limitName:"pageSize"
		},
		data: table,
		skin: 'line', //表格风格			
		even: true,
		page: true,
		id: 'iotclasscardtab',
		limits: [5, 7, 10, 20],
		limit: 10 ,//每页默认显示的数量
		parseData:function(res) {
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
				count: res.data.total,
				curr: res.data.current,
				data: currentData
			}
		}

	});

	//监听行工具事件
	table.on('tool(iotclasscardtab)', function(obj) {
		var data = obj.data.hardwareIp;
		//console.log(obj)
		//打开编辑页面
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑班牌',
				area: ['710px', '508px'],
				shade: 0.5,
				maxmin: true,
				content: 'iotEditClassCard?sn='+obj.data.sn,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['保存', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#editclasscardbtn");
					submit.click();
				}
			});
			//layer.full(index);
		};
		//删除
		if(obj.event === 'del') {
			if (confirm('确认删除吗?')) {
				$.ajax({
					url:iotHost+'/api/agent/deleteIotClassCard/',
					type:'post',
					data:{
						hardwareIp : data
					},
					success:function (res) {
						if (!res.code) {
							parent.layer.alert("删除成功!")
							obj.del();
							table.reload('iotclasscardtab');
						}
						else
							parent.layer.alert(res.msg);

					},
					error:function () {
						alert("删除接口请求失败！")
					}
				})
			}
		}

		/**
		 * Description 监控连接
		 *
		 * @author chenjiali
		 * @date
		 */
		if(obj.event === 'connect') {
			$.ajax({
				url:iotHost+'/api/agent/connectCard',
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
		 * Description 推送数据
		 *
		 * @author chenjiali
		 * @date
		 */
		if(obj.event === 'dataDistributeCard') {
			$.ajax({
				url:iotHost+'/api/agent/dataDistributeCard',
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
		 * Description 更新logo
		 *
		 * @author chenjiali
		 * @date
		 */
		if(obj.event === 'updatelogo') {
			$.ajax({
				url:iotHost+'/api/agent/updatelogo',
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
		 * Description 更新配置
		 *
		 * @author chenjiali
		 * @date
		 */
		if(obj.event === 'updatesetting') {
			$.ajax({
				url:iotHost+'/api/agent/updatesetting',
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
		 * Description 更新二维码
		 *
		 * @author chenjiali
		 * @date
		 */
		if(obj.event === 'updatexcxlogo') {
			$.ajax({
				url:iotHost+'/api/agent/updatexcxlogo',
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
		 * Description 更新版本
		 *
		 * @author chenjiali
		 * @date
		 */
		if(obj.event === 'updateversion') {
			$.ajax({
				url:iotHost+'/api/agent/updateversion',
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

	});

	//获取实验室下拉框数据
	$.ajax({
		url:iotHost + "/api/agent/listCardRoom",
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
			form.render('select', "iotclasscard");
		},
	})

	//搜索
	var $ = layui.$,
		active = {
			reload: function() {
				var hardwareIp = $('input[name=hardwareIp]').val();
				var roomName = $('select[name=room_name]').val();
				//执行重载
				table.reload('iotclasscardtab', {
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

	$('.searchbtn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
});