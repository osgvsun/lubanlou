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


/*卡片盒子*/

//批量删除
$(".batchdelete").click(
	function() {
		$(this).hide();
		$(".batchdelete_box").show();
		$(".modulartit_icon").hide();
		$(".grid-item .layui-text-top .layui-form-checkbox").css("display", "inline-block");
	}
);

//取消/完成
$(".selectcancel").click(
	function() {
		$(".batchdelete_box").hide();
		$(".batchdelete").show();
		$(".grid-item .layui-text-top .layui-form-checkbox").hide();
		$(".modulartit_icon").show();
		//location.reload(true);
	}
);

//删除所选
$(".selectdelete").click(
	function() {
		$(".layui-form-checked").parents(".grid-item").remove();
		//location.reload(true);
	}
);

//全选
$(".selectall").click(
	function() {
		$(".layui-text-top input").attr('checked', 'checked');
		$(".layui-text-top .layui-form-checkbox").addClass("layui-form-checked");
	}
);

//取消全选
$(".cancelall").click(
	function() {
		$(".layui-text-top input").removeAttr('checked');
		$(".layui-text-top .layui-form-checkbox").removeClass("layui-form-checked");
	}
);

//单个删除
$(".deletemodularlist").click(
	function() {
		$(this).parents(".grid-item").remove();
		//location.reload(true);
	}
);

//单个使用
$(".usemodularlist").click(
	function() {
		$(this).hide();
		$(this).siblings(".cancelmodularlist").show();
		$(this).parents(".grid-item").find(".layui-text-top input").attr('checked', 'checked');
		$(this).parents(".grid-item").find(".modulartit_icon").hide();
		$(this).parents(".grid-item").find(".layui-text-top .layui-form-checkbox").css("display", "inline-block").addClass("layui-form-checked");
		//location.reload(true);
	}
);

//单个取消使用
$(".cancelmodularlist").click(
	function() {
		$(this).hide();
		$(this).siblings(".usemodularlist").show();
		$(this).parents(".grid-item").find(".layui-text-top input").removeAttr('checked');
		$(this).parents(".grid-item").find(".layui-text-top .layui-form-checkbox").hide().removeClass("layui-form-checked");
		$(this).parents(".grid-item").find(".modulartit_icon").show();
		//location.reload(true);
	}
);