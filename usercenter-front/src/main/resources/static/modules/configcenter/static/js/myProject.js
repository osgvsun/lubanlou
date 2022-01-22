$(function() {
	$(".mt_box").click(function() {
		$(this).addClass("mb_select").siblings("button").removeClass("mb_select");
		var name = $(this).attr("name");
		parent.location.hash = name; //设置锚点
	})
});
/*window.onhashchange = function() { //监听锚点的变化
									var hash = window.location.hash;
									hash = hash.substring(1, hash.length);
									alert(hash);
									$("#iframe").attr("src", hash);
								}*/
document.addEventListener('DOMContentLoaded', function() { //刷新
	var hash = parent.location.hash;
	var url = hash.substring(1, hash.length);
	$("#soniframe").attr("src", url);
}, false)