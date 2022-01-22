layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table,
		layer = layui.layer;

	//向世界问个好
	//layer.msg('');

	form.render(null, 'myappointmentdetailbox');
	let obj = {};
	if (detail) {
		obj = JSON.parse(detail);
	}
	//信息
	form.val('myappointmentdetailbox', {
		"type": obj.appTypeName,
		"person": obj.appUser,
		"tel": obj.appUserPhone,
		"info": obj.appReason,
		"lab": obj.deviceName,
		"date": obj.appDate,
		"time": obj.appTime,
		"state": obj.appStutas
	});
});