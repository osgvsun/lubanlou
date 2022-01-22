$(".customInput:eq(0)").mouseover(function(){
    $(".customInput .selectDiv ul").removeClass('hidden');
});
$(".customInput:eq(0)").mouseout(function(){
    $(".customInput .selectDiv ul").addClass('hidden');
});
$(".customInput .selectDiv ul li").click(function(){
    $(".customInput .inputDiv input").val($(this).text());
    $(".customInput .selectDiv ul").addClass('hidden');
});