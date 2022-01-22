const evaluationHost =apiGateWayHost+"/configcenter/";
layui.config({
	base:'../../'
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

	form.render(null, 'sendmessagebox');
	let str = ''
	if(teacherUsername){
		let info = getPhoneAndEmailByUsername(teacherUsername);
		str += `<div class="layui-col-lg12">
					<div class="layui-row">
						<div class="layui-col-lg4">
							<label class="layui-form-label">接收人:(导师)</label>
							<div class="layui-input-block">
								<input class="layui-input readinputbtn" name="name" autocomplete="on" disabled="disabled" readonly="readonly" data-username="${teacherUsername}" value="${teacherCname}"/>
							</div>
						</div>
						<div class="layui-col-lg4">
							<label class="layui-form-label">手机</label>
						<div class="layui-input-block">
							<input type="tel" class="layui-input" name="mobile" autocomplete="on" placeholder="请输入手机号码" value="${info.phone}" readonly="readonly"/>
						</div>
						</div>
						<div class="layui-col-lg4">
							<label class="layui-form-label">邮箱</label>
							<div class="layui-input-block">
								<input type="email" class="layui-input" name="email" autocomplete="on" placeholder="请输入邮箱地址" value="${info.email}" readonly="readonly" />
							</div>
						</div>
					</div>
				</div>`;
	}
	$.each(usernames.split(','),function (key,value) {
		let info = getPhoneAndEmailByUsername(value);
		str+=`<div class="layui-col-lg12">
					<div class="layui-row">
						<div class="layui-col-lg4">
							<label class="layui-form-label">接收人:(学生)</label>
							<div class="layui-input-block">
								<input class="layui-input readinputbtn" name="name" autocomplete="on" disabled="disabled" readonly="readonly" data-username="${value}" value="${cnames.split(',')[key]}"/>
							</div>
						</div>
						<div class="layui-col-lg4">
							<label class="layui-form-label">手机</label>
						<div class="layui-input-block">
							<input type="tel" class="layui-input" name="mobile" autocomplete="on" placeholder="请输入手机号码" value="${info.phone}" readonly="readonly"/>
						</div>
						</div>
						<div class="layui-col-lg4">
							<label class="layui-form-label">邮箱</label>
							<div class="layui-input-block">
								<input type="email" class="layui-input" name="email" autocomplete="on" placeholder="请输入邮箱地址" value="${info.email}" readonly="readonly"/>
							</div>
						</div>
					</div>
				</div>`
	})
	$('.messages').after(str);
	// //信息
	// form.val('sendmessagebox', {
	// 	"info": "test1",
	// 	"name": "test2",
	// 	"mobile": "test3",
	// 	"email": "test4"
	// });
	function getPhoneAndEmailByUsername(username){
	// window.getPhoneAndEmailByUsername = function (username) {
		var pae = new Object();
		if(username == ''){layer.msg('没有获取到用户名!');return false;}
		//获取用户基本信息
		$.ajaxSettings.async = false;
		$.get( apiGateWayHost + '/usercenter/getTeacherBasicInfo',{username: username}, function (res) {
			if (!res.code) {
				pae['phone'] = res.data.phone;
				pae['email'] = res.data.email;
			} else {
				console.error(res.msg);
			}
		})
		$.ajaxSettings.async = true;
		return pae;
	}
	//监听提交
	form.on('submit(sendmessagebtn)', function(data) {
		var field = data.field; //获取提交的字段
		console.log(field);
		// var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		//
		// //提交 Ajax 成功后，关闭当前弹层并重载表格
		// //$.ajax({});
		// parent.layui.table.reload('academicrelationship'); //重载表格
		// parent.layer.close(index); //再执行关闭

	});
});