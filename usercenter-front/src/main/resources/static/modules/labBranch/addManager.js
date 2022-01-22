layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate

	var serverHostArray = document.location.href.split('/');
	var serverHost = serverHostArray[0] + "//" + serverHostArray[2] + "/";

	form.render(null, 'addmanagerbox');

	//执行一个表单
	table.render({
		elem: '#addmanager',
		url: timetableHost + '/api/labroom/findUserByCnameAndUsernameByPage', //数据接口
		where: {'roomId': labRoomId, "currUsername": currentUsername, "typeId": 1},
		title: '实验室管理员',
		method: 'POST',
		cellMinWidth: 100,
		page: true, //开启分页			
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			//curr: 5, //设定初始在第 5 页				
			groups: 1, //只显示 1 个连续页码				
			first: false, //不显示首页				
			last: false //不显示尾页
		},
		parseData: function (res) { //res 即为原始返回的数据
			return {
				"code": 0, //解析接口状态
				"msg": res.msg, //解析提示文本
				"count": res.total, //解析数据长度
				"data": res.data //解析数据列表
			};
		},
		cols: [
			[ //表头
				{
					fixed: 'left',
					type: 'checkbox',
					width: 30
				}, {
					fixed: 'left',
					title: '序号',
					type: 'numbers',
					width: 40
				}, {
					field: 'cname',
					title: '姓名',
					sort: true
				}, {
					field: 'username',
					title: '工号',
					sort: true
				}, {
					field: 'academyName',
					title: '所属学院',
					sort: true
				}
			]
		],
		id: 'addmanager',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(addmanager)', function(obj) {
		var data = obj.data;

		//删除
		if(obj.event === 'del') {
			layer.confirm('是否删除？', {
				title: '提示'
			}, function(index) {
				obj.del();
				layer.close(index);
			});
		}
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('addmanager', {
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

	function fixedEncodeURI (str) {
		return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
	}
	table.on('edit(addmanager)', function (obj) {
		var value = obj.value,
			data = obj.data,
			fieId = obj.field;
	});
	$('#addmanagerbtn').on('click', function () {
		var checkStatus=table.checkStatus('addmanager'),
			data=checkStatus.data;
		usernameList = [];
		data.forEach(function (n, i) {
			usernameList.push(n.username);
		});
		console.log(usernameList);
		// console.log(usernameList);
		if (data.length <= 0){
			layer.msg('请选择一条数据');
		} else {
			$.ajax({
				url: timetableHost + '/api/labroom/saveLabRoomAdmin',
				type: 'POST',
				data:{'roomId': labRoomId, "array": fixedEncodeURI(usernameList), "typeId": 1, "username": currentUsername},
				success: function (data) {
					parent.layer.msg('添加成功');
					parent.location.reload();
					var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
				},
				fail: function () {
					layer.msg("修改失败");
				}
			})
		}
	});
});