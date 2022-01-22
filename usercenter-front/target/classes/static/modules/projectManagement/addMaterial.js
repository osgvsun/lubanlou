layui.config({
	base:'../'
}).extend({
	index:'lib/index'
})
layui.use(['form', 'element', 'layer', 'upload'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		layer = layui.layer,
		upload = layui.upload;

	$.ajax({
		url: `${timetableHost}lims/api/asset/getAllAssetList`,
		dataType: 'json',
		type: 'get',
		success: function (res) {
			$.each(res.data, function (i, d) {
				$(`[name='assetIds']`).append(new Option(d.chName, d.id));// 下拉菜单里添加元素
			});
			form.render("select");
		}

	})
	//监听提交
	form.on('submit(addmaterialbtn)', function(data) {
		var field = data.field; //获取提交的字段
		$.ajax({
			url: `${timetableHost}api/operation/saveOperationItemAsset`,
			data: field,
			dataType: 'json',
			type: 'post',
			success: function (res) {
				if(res.code === 0){
					layer.msg(res.msg);
					let index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
					parent.layer.close(index); //再执行关闭
				}
			}

		})

	});

	form.render(null, 'addmaterialbox');

	//信息
	form.val('addmaterialbox', {
		"": ""
	});

});