layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate', 'formSelects', 'util'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate,
		formSelects = layui.formSelects,
		util = layui.util;

	//向世界问个好
	//layer.msg('');

	form.render(null, 'newnobookingbox');

	//监听提交
	form.on('submit(newnobookingbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  
		console.log(field)
		let dataStatus = field.nobookingdaterange.split("~");
		let timeStatus = field.nobookingrange.split("-");
		let dataObj = {
			"status": 0,
			"startDate": dataStatus[0],
			"endDate": dataStatus[1],
			"startTime": timeStatus[0],
			"endTime": timeStatus[1],
			"weekdays": field.week,
			"info": field.remark,
			"addOrEdit": "add"
		}
		parent.layui.table.reload('newnobookingbox'); //重载表格
		parent.noBookingData(JSON.stringify(dataObj));
		parent.layer.close(index); //再执行关闭
	});

	//已设置不可预约日期范围
	laydate.render({
		elem: '#nobookingdaterange',
		type: 'date',
		range: '~'
	});

	//不可预约时间范围
	laydate.render({
		elem: '#nobookingrange',
		type: 'time',
		range: true
	});

	//多选	
	//formSelects.value('week', [1], true); //单个举例
	//formSelects.value('week', [1, 2, 3], true); //多个举例
});