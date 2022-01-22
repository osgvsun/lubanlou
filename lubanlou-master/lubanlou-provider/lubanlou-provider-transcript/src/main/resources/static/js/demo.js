window.onscroll = function() {
	var moveTop = document.documentElement.scrollTop || document.body.scrollTop;
	if(moveTop >= 100) {
		// $(".top_nav").addClass("top_nav_fix");
		// $(".top_nav").addClass("top_nav_top");
	} else {
		// $(".top_nav").removeClass("top_nav_fix");
		// $(".top_nav").removeClass("top_nav_top");
		$(".link_box").removeClass("link_box_fix");
	};
	// 左侧菜单根据右边内容变化实现不同高亮
    var length = $(".top_nav a").length;
    var item = new Array();
    var sTop = $(window).scrollTop;
    for (var i = 1; i <= length; i++) {
        item[i] = $('.link_box' + i).offsetTop;
        if (sTop > item[i]) {
            $(".top_nav " + "#"+i).addClass("top_nav_select").siblings().removeClass("top_nav_select");
        }
    }
};

$(".top_nav a").click(
	function() {
		$(this).addClass("top_nav_select");
		$(this).siblings().removeClass("top_nav_select");
		$(".link_box").addClass("link_box_fix");
	}
);

$(".top_nav a:first-child").addClass("top_nav_select");

$('.top').click(function() {
	$('html, body').animate({
		scrollTop: 0
	}, 'slow');
});
$('.bottom').click(function() {
    $('html, body').animate({
        scrollTop: document.body.clientHeight
    }, 'slow');
});