<!--弹出层js-->
function show(){
    $(".lbOverlay").css({"height":window.screen.availHeight});
    $(".lbOverlay").show();

    var st=$(document).scrollTop(); //页面滑动高度
    var objH=$(".hidden_pro_au").height();//浮动对象的高度
    var ch=$(window).height();//屏幕的高度
    var objT=Number(st)+(Number(ch)-Number(objH))/2;   //思路  浮动高度+（（屏幕高度-对象高度））/2
    $(".hidden_pro_au").css("top",objT);

    var sl=$(document).scrollLeft(); //页面滑动左移宽度
    var objW=$(".hidden_pro_au").width();//浮动对象的宽度
    var cw=$(window).width();//屏幕的宽度
    var objL=Number(sl)+(Number(cw)-Number(objW))/2; //思路  左移浮动宽度+（（屏幕宽度-对象宽度））/2
    $(".hidden_pro_au").css("left",objL);
    $(".hidden_pro_au").slideDown("20000");//这里显示方式多种效果
}
function closeDiv(){
    $(".lbOverlay").hide();
    $(".hidden_pro_au").hide();
}

$(".cancel").click(function () {
    $(".hidden_pro_au").hide()
})