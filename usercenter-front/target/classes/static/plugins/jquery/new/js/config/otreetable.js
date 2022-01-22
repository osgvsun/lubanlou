var otreeTbody = $("#otreetable tbody");
$("#otreetable tbody").each(function(){
    if($(this).find("tr").eq(0).siblings().length>0){
        //$(this).find("tr").eq(0).siblings().css("display","none");
    }
    else {
        $(this).find("tr").eq(0).find(".fa-minus-square-o").css("display","none");
    }
})
$(".fa_icon i").click(function () {
    if ($(this).hasClass("fa-plus-square-o")){
        $(this).parent().parent().siblings().css("display","");
        $(this).removeClass("fa-plus-square-o").addClass("fa-minus-square-o");
    }
    else{
        $(this).parent().parent().siblings().css("display","none");
        $(this).removeClass("fa-minus-square-o").addClass("fa-plus-square-o");
    }

})