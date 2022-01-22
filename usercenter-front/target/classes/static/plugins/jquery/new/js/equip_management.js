/*文本编辑*/
$(".dn_edit").click(
	function() {
		$(this).hide();
		$(this).siblings(".fa-save").show();
		$(this).siblings("input[type=text]").removeClass("decoration_none").attr("disabled", false);
	}
);
$(".dn_save").click(
	function() {
		$(this).hide();
		$(this).siblings(".fa-edit").show();
		$(this).siblings("input[type=text]").addClass("decoration_none").attr("disabled", true);
	}
);
$(".new_line_btn").click(
	function() {
		$(".new_line").slideDown(300);
	}
);
//获取新增设备
$(".showAddInstrument").click(
	function() {
        var obj = $(this);
        var groupId = obj.attr('data');
		$.ajax({
			url:'../project/showAddInstrument',
			data:{'groupId':groupId},
			//dataType:'json',
			type:'POST',
			success:function (data) {
                console.log(obj.data());
                obj.parent().siblings().find(".instrumentUid option").remove();
                obj.parent().siblings().find(".instrumentUid").append("<option value=''>请选择</option>");
				$.each(data,function (n,value) {
					console.log(n+":"+value[0]);
                    obj.parent().siblings().find(".instrumentUid").append("<option value='"+value[0]+"'>"+value[1]+"</option>");
                })

            },
			error:function () {

            }
		});
		$(this).parent().siblings().find(".showAddInstrumentdiv").slideDown(300);
	}
);
$(".reshowAddInstrument").click(
	function() {
		$(".showAddInstrumentdiv").slideUp(300);
	}
);
$(".reset").click(
	function() {
		$(this).parent().parent(".new_line").slideUp(300);
	}
);
$(".new_charge_btn").click(
	function() {
		$(".new_charge_box").slideDown(300);
	}
);
$(".new_charge_close").click(
	function() {
		$(".new_charge_box").slideUp(300);
	}
);

$(".new_project_btn").click(
	function() {
		$(".new_project_box").slideDown(300);
	}
);
$(".new_project_close").click(
	function() {
		$(".new_project_box").slideUp(300);
	}
);
$(".set_nav .db_little_tit").click(
	function() {
		var a = $(this).index();
		$(this).addClass("dlt_blue").removeClass("dlt_grey").siblings().removeClass("dlt_blue").addClass("dlt_grey");
		$(".set_content").eq(a).addClass("set_content_select").siblings().removeClass("set_content_select");
	}
);
/*置顶*/
$(window).scroll(
	function() {
		var hh = $(window).height() / 2.5;
		var hi = $(document).scrollTop();
		if(hi > hh) {
			$('.top').slideDown("100")
		} else {
			$('.top').slideUp("100")
		}
	}
);
$('.top').click(function() {
	$('html, body').animate({
		scrollTop: 0
	}, 'slow');
});