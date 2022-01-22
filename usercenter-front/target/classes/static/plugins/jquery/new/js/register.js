$(".rb_next").click(
	function() {
		$(this).parent().parent(".register_btm").removeClass("rb_block");
		$(this).parent().parent().next(".register_btm").addClass("rb_block");
		$(this).parent().parent(".register_btm").siblings(".register_top").find("div:last-child").addClass("rt_select");
		$(this).parent().parent(".register_btm").siblings(".register_top").find("div:first-child").removeClass("rt_select");

	}
);

$(".rb_prev").click(
	function() {
		$(this).parent().parent(".register_btm").removeClass("rb_block");
		$(this).parent().parent().prev(".register_btm").addClass("rb_block");
		$(this).parent().parent(".register_btm").siblings(".register_top").find("div:first-child").addClass("rt_select");
		$(this).parent().parent(".register_btm").siblings(".register_top").find("div:last-child").removeClass("rt_select");
	}
);