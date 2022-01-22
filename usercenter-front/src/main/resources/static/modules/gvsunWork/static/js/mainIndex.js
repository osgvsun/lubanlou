$(function() {
	$(".head_show a").click(function() {
		var name = $(this).attr("name");
		window.location.hash = name; //设置锚点
	})
});
document.addEventListener('DOMContentLoaded', function() { //刷新
	var hash = window.location.hash;
	var url = hash.substring(1, hash.length);
	console.log(url)
	if(window.performance.navigation.type == 1) {
		//alert("每次刷新");
		$("#iframe").attr("src", url);
	} else if (window.performance.navigation.type == 0){
		$("#iframe").attr("src", url);
	}else {
		//alert("首次被加载");
		$("#iframe").attr("src", httpBaseUrl + 'gvsunwork/teacherNormalHomeworkList');
	}
}, false);