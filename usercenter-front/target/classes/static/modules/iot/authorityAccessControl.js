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
	layer.msg('进入授权管理-门禁');

	form.render(null, 'authorityaccesscontrol');

	//授权日期
	laydate.render({
		elem: '#accessdate',
		range: true
	});

	//授权时间
	laydate.render({
		elem: '#accesstime',
		type: "time",
		range: true
	});

	//打开新增门禁授权页面
	var newaccess = {
		newaccess: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增门禁授权',
				area: ['710px', '515px'],
				shade: 0.3,
				maxmin: true,
				content: 'authorityNewAccess',
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
			layer.full(index);
		}
	};
	$('.newaccess').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newaccess[method] ? newaccess[method].call(this, othis) : '';
	});

	//执行表单
	table.render({
		elem: '#authorityaccesscontroltab',
		// url: layui.setter.base + "json/authorityAccessControl.json", //数据接口
		url: iotHost + "/api/userAgentAuth/listAuthAccess", //数据接口
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
					field: 'username',
					title: '学工号',
					sort: true
				}, {
					field: 'cname',
					title: '姓名',
					sort: true
				}, {
					field: 'roomName',
					title: '实验室名称',
					sort: true
				}, {
					field: 'hardwareIp',
					title: 'ip地址',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					width: 120,
					align: 'center',
					toolbar: '#operation'
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
		page:true,
		id: 'authorityaccesscontroltab',
		limits: [5, 7, 10, 20],
		limit: 5 ,//每页默认显示的数量
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
				count: res.total,
				data: currentData
			}
		}
	});

	//监听行工具事件
	table.on('tool(authorityaccesscontroltab)', function(obj) {
		var data = obj.data.username;
		//console.log(obj)
		//打开编辑页面
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑门禁授权',
				area: ['710px', '508px'],
				shade: 0.5,
				maxmin: true,
				content: 'authorityEditAccess',
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
			layer.full(index);
		};
		//删除门禁信息
		if(obj.event === 'del'){
			$.ajax({
				url:iotHost+'/api/userAgentAuth/deleteAuthAccess/',
				type:'post',
				data:{
					username : data
				},
				success:function (res) {
					if (!res.code) {
						parent.layer.alert("删除成功!")
						obj.del();
						table.reload('iotaccesscontroltab');
					}
					else
						parent.layer.alert(res.msg);

				},
				error:function () {
					alert("删除接口请求失败！")
				}
			})
		}
	});

	//搜索
	var $ = layui.$,
		active = {
			reload: function() {
				var search_box = $('#search_box');

				//执行重载
				table.reload('authorityaccesscontroltab', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						key: {
							studentname: search_box.val()
						}
					}
				}, 'data');
			}
		};

	$('.searchbtn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
});