layui.use(['layer', 'element', 'form'], function() {
	var $ = layui.jquery,
		form = layui.form

	form.render(null, 'switchpermissionsbox');
	<!--权限-->
	$.ajax({
		url: httpBaseUrl + 'auth/switchPermissionsApi',
		type: 'GET',
		data: {"cid": siteId, "username": username},
		async: false,
		success: function (data){
			let result = data;
			for (let i = 0; i < result.length; i++){
				let row = `<div class="layui-inline"><input type="radio" name="authId" value="${result[i].id}" title="${result[i].cname}" ${result[i].nowAuthority == 1 ? 'checked': ''}></div>`
				$('#permissions').append(row);
				form.render();
			}
		}
	})
	//监听提交
	form.on('submit(switchpermissionsbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var authId = $('input[name="authId"]:checked').val();
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		field["cid"] = siteId;
		field["username"] = username;
		if ((authId == "" || authId == undefined || authId == null)) {
			alert('请选择权限！');
		} else {
			$.ajax({
				url: httpBaseUrl + 'auth/changeUserRole',
				type: 'POST',
				data: field,
				success: function (data){
					console.log(123)
					var _body = window.parent;
					var _iframe1=_body.document.getElementById('iframe');
					_body.location.reload(true);
					parent.layer.close(index); //再执行关闭
				}
			})
		}
	});
});