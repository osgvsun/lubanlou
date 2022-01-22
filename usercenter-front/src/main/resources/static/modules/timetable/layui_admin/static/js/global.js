//页面滚动显示置顶按钮
$(window).scroll(
	function() {
		var hh = $(window).height();
		var hi = $(document).scrollTop();
		if(hi > hh) {
			$('.top').slideDown("300")
		} else {
			$('.top').slideUp("300")
		}
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

//问答
$('.q_btn').click(
	function() {
		$(this).parent().siblings('.q_box').slideToggle();
	}
);
$('.q_btn.header_edit').click(
	function() {
		$(this).toggleClass('q_btn_show');
	}
);
$('.q_reset_btn').click(
	function() {
		$(this).parents('.q_box').slideToggle();
		$(this).parents('.q_box').siblings('.layui-card-header').find('.q_btn.header_edit').toggleClass('q_btn_show');
		$(this).parents('.q_box').siblings('.caller-iconset').find('.dialogue_btn').toggleClass('dialogue_btn_select');
	}
);
$('.dialogue_btn').click(
	function() {
		$(this).toggleClass('dialogue_btn_select');
	}
);
$('.star_btn').click(
	function() {
		$(this).toggleClass('star_btn_select');
	}
);
$('.praise_btn').click(
	function() {
		$(this).toggleClass('praise_btn_select');
	}
);