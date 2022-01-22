//最外层地址栏域名变更
$(function() {
	$(".layui-tab-title a").click(function() {
		var name = $(this).attr("name");
		top.window.location.hash = name; //设置锚点
	})
});