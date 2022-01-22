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
		form.render(null, 'photographfile');
		//信息
		form.val('photographfile', {
			"": "" //备用
		});
		imageShow()
		function imageShow() {
			var str = '';
			$.each(files.split(','),function (i,d) {
				resourceContainer.getFileById({
					success: function (data) {
						str+='<div class="fileshow_bag" title="'+ data.fileName +'">' +
							'<div class="fileshow_box_limit">' +
							'<img data="'+ d +'" class="imgshow file_download" data-method="imgshow" src="'+ data.url +'"/>' +
							'</div>' +
							'</div>';
					}, fail: function (reason) {
						console.log("读取资源失败:" + reason);
					}, fileId:d, username: currentUsername, needToken: true
				});

			})
			$('.fileshow_bag_limit').html(str);
			// $.each($(".file_download"), function (index, obj) {
			// 	resourceContainer.getFileById({
			// 	    success: function (data) {
			// 	        $(obj).attr("src", data.url);
			// 			$(obj).parents().attr('title',data.fileName);
			// 	    }, fail: function (reason) {
			// 	        console.log("读取资源失败:" + reason);
			// 	    }, fileId: $(obj).attr("data"), username: currentUsername, needToken: true
			// 	});
			// });
		}

		//打开查看图片页面
		var imgshow = {
			imgshow: function() {
				//layer.msg('');
				var that = this;
				//多窗口模式，层叠置顶
				var url = $(that).attr('data');
				var index = layer.open({
					type: 2 //此处以iframe举例
						,
					title: '查看图片',
					area: ['390px', '326px'],
					shade: 0.3,
					maxmin: true,
					content: 'imgShow?fileUrl='+url
				});
				layer.full(index);
			}
		};
		$('.imgshow').on('click', function() {
			var othis = $(this),
				method = othis.data('method');
			imgshow[method] ? imgshow[method].call(this, othis) : '';
		});

	});
});