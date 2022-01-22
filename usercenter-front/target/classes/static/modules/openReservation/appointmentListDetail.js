layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table,
		layer = layui.layer;
	form.render(null, 'appointmentlistdetailbox');

	let obj = {};
	if (detail) {
		obj = JSON.parse(detail);
	}
	//信息
	form.val('appointmentlistdetailbox', {
		"name": obj.deviceName,
		"type": obj.appTypeName,
		"date": obj.appDate,
		"duration": obj.appTime,
		"hour": obj.appTotalTime,
		"station": "",
		"person": obj.appUser,
		"teacher": "",
		"manager": obj.admins
	});
});