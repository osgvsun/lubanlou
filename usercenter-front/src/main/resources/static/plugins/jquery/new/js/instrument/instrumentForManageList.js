$(".snd_click").on("click",".can_chose",function () {
    $(this).removeClass("can_chose").addClass("already_chose");
    $(this).siblings().removeClass("can_chose").addClass("no_chose");
    var text = $(this).text();
    var $span = $("<span>"+text+"<i class='fa fa-close'></i></span>");
    $(this).parent().parent().siblings("a").find(".chose_option").append($span);
    var id = $(this).eq(0).attr('id');
    findCollect(id);
})
$(".osnd_click").on("click",".can_chose",function () {
    $(this).removeClass("can_chose").addClass("already_chose");
    $(this).siblings().removeClass("can_chose").addClass("no_chose");
    var text = $(this).text();
    var $span = $("<span>"+text+"<i class='fa fa-close'></i></span>");
    $(this).parent().parent().siblings("a").find(".chose_option").append($span);
    var id = $(this).eq(0).attr('id');
    findCollectForOpen(id);
})
$(".asnd_click").on("click",".can_chose",function () {
    $(this).removeClass("can_chose").addClass("already_chose");
    $(this).siblings().removeClass("can_chose").addClass("no_chose");
    var text = $(this).text();
    var $span = $("<span>"+text+"<i class='fa fa-close'></i></span>");
    $(this).parent().parent().siblings("a").find(".chose_option").append($span);
    var id = $(this).eq(0).attr('id');
    findCollectForAgent(id);
})
$(".psnd_click").on("click",function (){
    var low_price =lowPrice.value;
    var hight_price=hightPrice.value;
    findCollectForPrice(low_price,hight_price);
})
function findCollectForAgent(text){
    setCookie("isAgent",text);
    window.location.reload();
}
function findCollectForOpen(text){
    setCookie("isOpen",text);
    window.location.reload();
}
function findCollectForPrice(text1,text2){
    setCookie("lowPrice",text1);
    setCookie("hightPrice",text2);
    window.location.reload();
}
function findCollect(text){
    setCookie("collectText",text);
    window.location.reload();
}
function cancelCollect(){
    setCookie("collectText","");
    window.location.reload();
}
function cancelCollectForOpen(){
    setCookie("isOpen","");
    window.location.reload();
}
function cancelCollectForAgent(){
    setCookie("isAgent","");
    window.location.reload();
}
$(".chose_option").on("click",".fa-close",function () {
    //var text = $(this).parent().text();
    $(this).parents(".channel_nav_a").siblings("div").find(".already_chose").removeClass("already_chose").addClass("can_chose");
    $(this).parents(".channel_nav_a").siblings("div").find(".no_chose").removeClass("no_chose").addClass("can_chose");
    $(this).parent().remove();

})