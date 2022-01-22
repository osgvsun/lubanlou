layui.use(['laypage', 'layer', 'table', 'element', 'form'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form

	//向世界问个好
	layer.msg('进入设置证书');

	form.render(null, 'setcertificatebox');

	let childData = {};
	$.ajax({
		url: httpBaseUrl + '/api/findSchoolByProjectName',
		type: 'GET',
		async: false,
		success: function (res) {
			console.log(res)
			childData = res
			//信息
			form.val('setcertificatebox', {
				"schoolid": res.number,
				"schoolname": res.name,
				"certificate": res.title,
				"num": res.prefix
			});
			if (res.photoUrl) {
				setImage(res.photoUrl)
			}
		}
	})
	//打开编辑证书
	var editsetcertificate = {
		editsetcertificate: function() {
			//layer.msg('编辑证书');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑证书',
				area: ['500px', '450px'],
				shade: 0.5,
				maxmin: true,
				content: 'editSetCertificate?projectName='+$("#projectName").val(),
				zIndex: layer.zIndex //重点1
					,
				success: function(layero, index) {
					// layer.setTop(layero); //重点2
					const iframe = window['layui-layer-iframe' + index];
					iframe.child(childData)
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#addauthbtn");
					submit.click();
					layer.closeAll();
					layer.msg('编辑保存成功');
				},
				end: function () {
					location.reload();
				}

			});
			//layer.full(index);
		}
	};
	$('.editsetcertificate').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		editsetcertificate[method] ? editsetcertificate[method].call(this, othis) : '';
	});
	//获取图片
	// if ()
	function setImage(id) {
		resourceContainer.getFileById({
			success:function(result){
				console.log(result)
				$('.course-banner').attr("src", result.url);
				if (id){
					$('.user_head').css('background', 'url()');
				}
			},
			fail:function(res){
				console.log("失败" + res)
			},
			fileId: id,
			needToken: false
		})
	}

});