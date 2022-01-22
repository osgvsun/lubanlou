layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate

	//向世界问个好
	//layer.msg('');

	form.render(null, 'batchappointmentexaminebox');

	//监听提交
	form.on('submit(batchappointmentexaminebtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('batchappointmentexaminebox'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	//执行一个表单
	table.render({
		elem: '#batchappointmentexamine',
		url: layui.setter.base + 'modules/openReservation/static/json/batchAppointmentExamine.json', //数据接口
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
					title: '序号',
					type: 'numbers',
					width: 40
				}, {
					field: 'equipment',
					title: '预约设备',
					sort: true
				}, {
					field: 'person',
					title: '申请人(工号)',
					minWidth: 140,
					sort: true
				}, {
					field: 'type',
					title: '预约类型',
					sort: true
				}, {
					field: 'date',
					title: '日期',
					sort: true
				}, {
					field: 'time',
					title: '预约时间',
					sort: true
				}, {
					field: 'info',
					title: '预约内容',
					sort: true
				}, {
					fixed: 'right',
					title: '审核结果',
					templet: '#examineresult'
				}, {
					fixed: 'right',
					title: '审核意见',
					templet: '#examineopinion'
				}
			]
		],
		id: 'batchappointmentexamine',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});
});