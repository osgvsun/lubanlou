//页面滚动显示置顶按钮
$(window).scroll(
    function () {
        var hh = $(window).height();
        var hi = $(document).scrollTop();
        if (hi > hh) {
            $('.top').slideDown("300")
        } else {
            $('.top').slideUp("300")
        }
        ;
    }
);

//置顶
$('.top').click(function () {
    $('html, body').animate({
        scrollTop: 0
    }, 'slow');
});

//锚平滑滚动
$('a[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 600);
            return false;
        }
    }
});

//页面路径跳转
/*$(".publishedproject").click(
	function() {
	$(".mainiframe").attr({
		src:"songjiang"
	});
	$(this).addClass("mt_select").siblings("a").removeClass("mt_select");
	return false;
	}
);*/

//文件系统页面中的退出
function resourcesCloudLogout() {
    top.layer.confirm('是否退出?', {title: '提示'}, function (index) {
        layer.close(index);
        //do something
        localStorage.clear();
        sessionStorage.clear();
        $.cookie('currauth', '');
        $.cookie('currentauthName', '');
        location.href = serverHost + 'logout';
    });
}