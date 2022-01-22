layui.define(function(exports) {
	var admin = layui.admin;

	layui.use(['form', 'element', 'table', 'laydate', 'laypage', 'layer'], function() {
		var $ = layui.$,
			admin = layui.admin,
			form = layui.form,
			element = layui.element,
			table = layui.table,
			laydate = layui.laydate,
			laypage = layui.laypage,
			layer = layui.layer;

		//向世界问个好
		//layer.msg('');

		form.render(null, 'imgshow');

		//信息
		form.val('imgshow', {
			"": "" //备用
		});
		//读取资源，返回文件存放路径
		$.each($(".img_show"),function (index,obj) {
			resourceContainer.getFileById({
				success:function(result){
					$(obj).attr("src",result.url);
					$(obj).load();
				},
				fail:function(){
					alert('文件获取失败！');
				},
				fileId:$(obj).attr("data"),
				needToken:true
			})
		});
	});

});