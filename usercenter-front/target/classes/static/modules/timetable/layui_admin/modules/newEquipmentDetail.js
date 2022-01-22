layui.use(['index', 'form', 'laypage', 'layer', 'table', 'element'], function() {
	var $ = layui.$,
		admin = layui.admin,
		element = layui.element,
		layer = layui.layer,
		form = layui.form,
		laypage = layui.laypage,
		table = layui.table,
		element = layui.element;

	//向世界问个好
	//layer.msg('添加设备保养信息');

	form.render(null, 'newequipmentdetailbox');

	//监听提交
	form.on('submit(newequipmentdetail)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		//parent.layui.table.reload('projectinfo'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	//添加设备保养信息信息
	form.val('newequipmentdetailbox', {
		"": "" //
	});

	//执行设备保养列表表单
	table.render({
		elem: '#equipmentdetaillist',
		url: layui.setter.base + "json/equipmentDetailList.json", //数据接口						
		title: '设备保养列表',
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
					field: 'startdate',
					type: 'checkbox'
				}, {
					field: 'idnumber',
					title: '设备编号',
					minWidth: 100,
					sort: true
				}, {
					field: 'name',
					title: '设备名称',
					minWidth: 100,
					sort: true
				}, {
					field: 'model',
					title: '设备型号',
					minWidth: 100,
					sort: true
				}, {
					field: 'keeper',
					title: '保管员',
					minWidth: 100,
					sort: true
				}, {
					field: 'spec',
					title: '设备规格',
					minWidth: 100,
					sort: true
				}, {
					field: 'price',
					title: '设备价格',
					minWidth: 100,
					sort: true
				}
			]
		],
		data: table,
		skin: 'line', //表格风格			
		even: true,
		id: 'equipmentdetaillist',
		page: true,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//搜索
	var $ = layui.$,
		active = {
			reload: function() {
				var search_box = $('#search_box');

				//执行重载
				table.reload('equipmentdetaillist', {
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

	$('.tabsearch .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
});