layui.config({
	base:'../../'
}).extend({
	index:'lib/index'
}).use(['index','laypage', 'layer', 'table', 'element'], function() {
	var admin = layui.admin,
		laypage = layui.laypage //分页
		,
		layer = layui.layer //弹层
		,
		table = layui.table //表格
		,
		$ = layui.jquery,
		element = layui.element //元素操作

	//向世界问个好
	//layer.msg('');

	var ishttps = 'https:' == document.location.protocol ? true: false;
	if(ishttps){
		$('head').append('<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">');
	}
	let mode = $('#mode').val();
	if(location.href.indexOf('#') == -1){
		if(mode && mode === 'visual'){
			// $(' #visual_show' ). click();
			let href = $(' #visual_show' ).attr('href');
			// let url = hash. substring(1, hash. length);
			$(" #iframe"). attr('src',href)
		}else{
			$(' #customSetting' ). click();
			let hash = window. location. hash;
			let url = hash. substring(1, hash. length);
			$(" #iframe"). attr('src',url)
		}
	}
	$('#visual_show').click(function () {
		let href = $(' #visual_show' ).attr('href');
		// let url = hash. substring(1, hash. length);
		$(" #iframe"). attr('src',href)
	})
	$('#personalResourceMap').click(function () {
		let href = $(' #personalResourceMap' ).attr('href');
		// let url = hash. substring(1, hash. length);
		$(" #iframe"). attr('src',href)
	})

	//打开切换用户权限
	var switchpermissions = {
		switchpermissions: function() {
			//layer.msg('切换用户权限');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '切换用户权限',
				area: ['500px', '240px'],
				shade: 0.5,
				maxmin: true,
				content: 'switchPermissions.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#switchpermissionsbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.switchpermissions').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		switchpermissions[method] ? switchpermissions[method].call(this, othis) : '';
	});
});