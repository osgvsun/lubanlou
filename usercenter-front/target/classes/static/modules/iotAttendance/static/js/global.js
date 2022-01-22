//页面滚动显示置顶按钮
$(window).scroll(
	function() {
		var hh = $(window).height();
		var hi = $(document).scrollTop();
		if(hi > hh) {
			$('.top').slideDown("300")
		} else {
			$('.top').slideUp("300")
		};
	}
);

//置顶
$('.top').click(function() {
	$('html, body').animate({
		scrollTop: 0
	}, 'slow');
});

//锚平滑滚动
$('a[href*="#"]:not([href="#"])').click(function() {
	if(location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		if(target.length) {
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 600);
			return false;
		}
	}
});