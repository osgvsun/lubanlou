layui.config({
	version: '1545041465480' //为了更新 js 缓存，可忽略
});

layui.use(['laypage', 'layer', 'table', 'element'], function() {
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
				area: ['300px', '185px'],
				shade: 0.5,
				maxmin: true,
				content: 'switchPermissions',
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
	window.logout = function () {
		localStorage.clear();
	}
});