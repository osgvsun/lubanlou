var evaluationHost =apiGateWayHost+"/configcenter/";
layui.config({
	base:'../'
}).extend({
	index:'lib/index'
}).use(['index','laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
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

	// form.render(null, 'changeteacherbox');
	getTimetableInfo();
	//获取所有学生
	function getTimetableInfo(){
		$.ajax({
			url: evaluationHost + 'api/timetable/info?timetableId=' + timetableId,
			dataType: 'json',
			async: false,
			type: 'get',
			success: function (res) {
				// console.log(res);
				var str = '';
				$.each(res.data[0].timetableProcessDTOS[0].timetableProcessInitiators,function (index,item) {
					str+='<div class="layui-inline">' +
						'<input type="radio" name="teacher" value="'+ item.initiatorUsername +'" title="'+ item.initiatorCname +'" checked="">' +
						'</div>'
				})
				$('.teacher_list').html(str);
				var currteacher = parent.$('.teacher_username').text();
				$("input[name=teacher][value="+ currteacher +"]").prop("checked","true");
				form.render();
			}
		});
	}
	//监听提交
	form.on('submit(changeteacherbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		var cname = $('input[name="teacher"]:checked').attr('title');
		parent.$('.teacher_username').html(field.teacher);
		parent.$('.teacher_name').html(cname);
		// parent.layui.table.reload('changeteacherbox'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	//信息
	form.val('changeteacherbox', {
		"": "" //备注
	});

});