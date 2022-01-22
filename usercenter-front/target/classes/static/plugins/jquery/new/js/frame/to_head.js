$(document).ready(function(){
    $(".div2").click(function(){
        $(this).next("div").slideToggle("slow")
            .siblings(".div3:visible").slideDown("slow");
    });
});

$(document).ready(function(){
var urlstr = location.href;
/*alert((urlstr + '/').indexOf($(this).attr('href')));
alert(urlstr);*/
var urlstatus=false;
$(".div1 a").each(function () {
    /* alert(urlstr);*/
    if ((urlstr).indexOf($(this).attr('href')) > -1&&$(this).attr('href')!='') {
        $(this).addClass('first');
        $(this).parents(".div3").show();
        urlstatus = true;
    } else {
        $(this).removeClass('first');
        /*$(this).parents(".div3").hide();*/
    }
});
/*if (!urlstatus) {$(".div1 a").eq(0).addClass('first'); }*/
});



$(document).ready(function(){
    var urlstr = location.href;
    /*alert((urlstr + '/').indexOf($(this).attr('href')));
    alert(urlstr);*/
    var urlstatus=false;
    $(".content_tbox a").each(function () {
        /* alert(urlstr);*/
        if ((urlstr).indexOf($(this).attr('href')) > -1&&$(this).attr('href')!='') {
            $(this).addClass('first');
            urlstatus = true;
        } else {
            $(this).removeClass('first');
            /*$(this).parents(".div3").hide();*/
        }
    });
   /* if (!urlstatus) {
        $(".content_tbox a").eq(0).addClass('first');
    }*/
});

