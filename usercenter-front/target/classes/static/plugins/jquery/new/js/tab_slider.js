(function ($) {
            $.fn.tabslider = function (options) {
                this.options = options || {};
                var $self = $(this);
                var $ul = $("ul:not('.sub_ul')", this);
                var $li = $(".menu_list", $ul);
                //var $subu = $('ul', $li);
                var endX = 0;
                var maxX = $ul.width() - $self.width();

                $li.each(function () {
                        //var i = $(this).index();
                        //console.log(i);
                        $(this).find("ul").attr("data_eq", $(this).index());
                    })
                    //$ul.after("<div calss='add_sub'></div>");
                $self.on("mousedown", function (e) {
                    var positionX = e.pageX - endX;
                    $self.on('mousemove', function (e) {
                        endX = e.pageX - positionX;
                        $ul.css({
                            "transition-duration": "0s",
                            "transition-timing-function": "cubic-bezier(0.1,0.57,0.1,1)",
                            "transform": "translate(" + endX + "px,0px)"
                        });
                        
                    }).on('mouseup', function (e) {
                        if (endX > 0) {
                            $ul.css({
                                "transition-duration": "200ms",
                                "transform": "translate(0px,0px)"
                            });
                            endX = 0;
                        } else if (endX < -maxX) {
                            endX = -maxX;
                            $ul.css({
                                "transition-duration": "200ms",
                                "transform": "translate(" + endX + "px,0px)"
                            });
                        }
                        $self.off('mousemove');
                    });
                    $(".add_sub ul").attr("style","");
                })

                $li.on("click", function () {
                    $(this).addClass("selected").siblings().removeClass("selected");
                    
                });
                /*$li.on("mouseover", function () {*/
                $li.on("click", function () {
                    
                    var $subul = $(".sub_menu", this).html();
                    $(".add_sub").html($subul).show();
                    //$(this).find(".sub_menu").show();
                    $(this).find(".menu_a").addClass("cc");
                });
                $li.on("mouseout", function () {
                    
                    //$(".add_sub").html();
                    //$(this).find(".sub_menu").hide();
                    $(this).find(".menu_a").removeClass("cc");
                });
                /*$(".add_sub").on("vmouseover", function () {
                    $(this).show();
                });*/
                /*$self.on("vmouseout", function () {
                    $(".add_sub").html("").delay(10000).hide();
                });*/
                
                /*$(".slide_box").on("vmouseout",function(){
                    //alert("sad")
                    var sdd= $li.has("selected").index()
                    console.log(sdd)
                })*/
                
            }
        })(jQuery);