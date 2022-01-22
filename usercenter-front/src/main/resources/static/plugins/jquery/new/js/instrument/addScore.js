$(function(){
    var len = $(".auditform").find(".scoreStar").length;

    for(var i = 0; i <= len;i++){
        var s =  $("#star"+i).attr("data");
        console.log(s);
        $("#star"+i).raty({
            path    : '../images',

            starOff : 'star-off.png',

            starOn  : 'star-on.png',
            width:"200px;",
            readOnly: true,
            score: s
        });
    }


});