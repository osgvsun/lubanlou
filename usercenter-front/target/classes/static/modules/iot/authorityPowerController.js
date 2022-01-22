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
	layer.msg('进入授权管理-电源控制器');

	form.render(null, 'authoritypowercontroller');

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
	var newpower = {
		newpower: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增电源控制器授权',
				area: ['710px', '515px'],
				shade: 0.3,
				maxmin: true,
				content: 'authoritynewpower',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['保存', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newpowerbtn");
					submit.click();
				}
			});
			layer.full(index);
		}
	};
	$('.newpower').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newpower[method] ? newpower[method].call(this, othis) : '';
	});

	//执行表单
	table.render({
		elem: '#authoritypowercontrollertab',
		// url: layui.setter.base + "json/authoritypowercontroller.json", //数据接口
		url: iotHost + "/api/userAgentAuth/listAuthPower", //数据接口
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
					field: 'hardwareName',
					title: '设备名称',
					sort: true
				}, {
					field: 'roomName',
					title: '实验室名称',
					sort: true
				}, {
					field: 'time',
					title: '授权时间',
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
		id: 'authoritypowercontrollertab',
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
	table.on('tool(authoritypowercontrollertab)', function(obj) {
		var data = obj.data;
		//console.log(obj)
		//打开编辑页面
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑电源控制器授权',
				area: ['710px', '508px'],
				shade: 0.5,
				maxmin: true,
				content: 'authorityEditPower.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['保存', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#editpowerbtn");
					submit.click();
				}
			});
			layer.full(index);
		};
		//删除
		if(obj.event === 'del') {
			layer.confirm('真的删除行么', function(index) {
				obj.del();
				layer.close(index);
			});
		}
	});

	//搜索
	var $ = layui.$,
		active = {
			reload: function() {
				var search_box = $('#search_box');

				//执行重载
				table.reload('authoritypowercontrollertab', {
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