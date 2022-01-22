layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var layer = layui.layer,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form;

	form.render(null, 'switchpermissionsbox');
	let authorities = JSON.parse($.cookie("authorities"));
	if (authorities) {
		for (let i = 0; i < authorities.length; i++) {
			let con = `<div class="layui-inline">
						   <input type="radio" name="permission" value="${authorities[i].name}" title="${authorities[i].cname}">
					   </div>`;
			$('.switchPermissions').append(con);
		}
	}
	//监听提交
	form.on('submit(switchpermissionsbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		$.cookie('current', field.permission);
		$("input[name='permission']").each(function (index, obj) {
			if ($(obj).val() === field.permission) {
				$.cookie('authorities_name', $(obj).attr('title'));
			}
		})
		var _body = window.parent;
		_body.location.reload(true);
		parent.layer.close(index); //再执行关闭
	});

	//信息
	form.val('switchpermissionsbox', {
		"permission": $.cookie('current') //备注
	});

});