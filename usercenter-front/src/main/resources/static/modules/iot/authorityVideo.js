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
	layer.msg('进入授权管理-视频');

	form.render(null, 'authorityvideo');

	//执行表单
	table.render({
		elem: '#authorityvideotab',
		// url: layui.setter.base + "json/authorityVideo.json", //数据接口
		url: iotHost + "/api/userAgentAuth/listAuthVideo", //数据接口
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
					field: 'factory',
					title: '厂家名称',
					sort: true
				}, {
					field: 'type',
					title: '类型',
					sort: true
				}, {
					field: 'hardwareIp',
					title: 'IP地址',
					sort: true
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
		id: 'authorityvideotab',
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

	//搜索
	var $ = layui.$,
		active = {
			reload: function() {
				var search_box = $('#search_box');

				//执行重载
				table.reload('authorityvideotab', {
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