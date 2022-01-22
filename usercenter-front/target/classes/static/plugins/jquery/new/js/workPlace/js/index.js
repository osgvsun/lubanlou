/*$(function() {
  $( "#datepicker" ).datepicker({ firstDay: 1});
});*/
$(document).click(function (e) {
    var drag = $(".content_right"),
        dragel = $(".content_right")[0],
        target = e.target;
    var btn = $(".nav button"),
        btnel = $(".nav button")[0];
    if(btnel !== target && !$.contains(btnel, target)){
        if (dragel !== target && !$.contains(dragel, target)) {
            drag.hide();
        }
    }
});