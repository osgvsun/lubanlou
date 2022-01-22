$(function() {
	$(".head_nav a").click(function() {
		var name = $(this).attr("name");
		window.location.hash = name; //设置锚点
	})
});
/*window.onhashchange = function() { //监听锚点的变化
													var hash = window.location.hash;
													hash = hash.substring(1, hash.length);
													alert(hash);
													$("#iframe").attr("src", hash);
													//$("#iframe").attr("src","publishedProject.html");
												}*/
/*$("#iframe").attr("src", "homeworkList.html");
document.addEventListener('DOMContentLoaded', function() { //刷新
	var hash = window.location.hash;
	var url = hash.substring(1, hash.length);
	$("#iframe").attr("src", url);
}, false)*/

document.addEventListener('DOMContentLoaded', function() { //刷新
	var hash = window.location.hash;
	var url = hash.substring(1, hash.length);
	if(window.performance.navigation.type == 1) {
		//alert("每次刷新");
		$("#iframe").attr("src", url);
	} else {
		//alert("首次被加载");
		$("#iframe").attr("src", "courseAttendance");
	}
}, false);