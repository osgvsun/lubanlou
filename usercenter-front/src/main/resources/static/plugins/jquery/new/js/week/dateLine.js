/* 
* @Author: Marte
* @Date:   2016-12-02 10:16:43
* @Last Modified by:   Marte
* @Last Modified time: 2017-05-03 15:10:49
*/


function iStyle_LineDatepicker(target,url){
    this.target = $(target);
    this.url = url;
    this.date;
    this.scrollthread = undefined;
    this.scrolllength;
    this.initialize();  
}
iStyle_LineDatepicker.prototype = {
    initialize : function (){
        $(".iStyle_DateConteiner").attr("url",this.url);
        this.target.animate({opacity:0},0);
        this.target.width("0px");
        this.target.height("30px");
        $("#iStyle_Datebutton").mousedown(function(){
            $("#clanderiframe").parent().css({"z-index":"10000","width":"auto"});
            $("#clanderiframe").parent().animate({opacity:1},0);            
        });
        $(".iStyle_LineDater_left").click($.proxy(function(){
            this.scrollline(($(".iStyle_LineDater td").width()+2)*4);
        },this));
        $(".iStyle_LineDater_right").click($.proxy(function(){
            this.scrollline(-($(".iStyle_LineDater td").width()+2)*4);
        },this));
        
        $("#iStyle_Datebutton").click();
        setTimeout(function(){
            $("#clanderiframe").contents().find("#dpTodayInput").click();
        },200);
        $(window).resize($.proxy(function(){
            this.scrollline(-1);
        },this));
        this.bindscroll();
        this.getdate();
    },
    getdate : function () {
        var date = $("#iStyle_DateViewer").val();
        
        if(date !== ""){
            this.date = date;
            $(".iStyle_Years").text( this.date.substr(0,7));
            $("#clanderiframe").parent().css({"z-index":"-10000","overflow":"hidden","width":"0px"});
            $("#clanderiframe").parent().animate({opacity:0},0);
            var dater = $("#clanderiframe").contents().find(".WdayTable td:gt(6)[class!=WotherDay]").clone(true); //选择日期
            var daynum = $("#clanderiframe").contents().find(".WdayTable tr:eq(1)").find("td[class=WotherDay]").length; //获取月初始空余天数
            dater.removeAttr("onclick");    //移除自带点击事件
            $(".iStyle_Datepicker").text("");   //清除日期选择器
            //生成日期选择器标签
            dater.each(function(index, element) {
                var day = $(this).text();
                $(this).text("");
                var dayt = (daynum + index) % 7;
                switch(dayt){
                    case 0:
                        dayt = "星期天";
                        break;
                    case 1:
                        dayt = "星期一";
                        break;
                    case 2:
                        dayt = "星期二";
                        break;
                    case 3:
                        dayt = "星期三";
                        break;
                    case 4:
                        dayt = "星期四";
                        break;
                    case 5:
                        dayt = "星期五";
                        break;
                    case 6:
                        dayt = "星期六";
                        break;
                    
                }
                var daystitle = $('<div class = "daystitle">' + dayt + '</div>');
                var daybox = $('<div class = "daybox">' + day + '</div>');
                $(this).append(daystitle).append(daybox);
                $(this).click(function(){
                    $(".iStyle_DateWindow").attr("src",$(".iStyle_DateConteiner").attr("url") + "?wd=" + $(".iStyle_Years").text() + "-" + day);
                    is_dater.scrollline(-$(this).offset().left+351.984375);
                });
            });
            $(".iStyle_Datepicker").append(dater);
            $(".iStyle_Datepicker").width((dater.width()+2)*(dater.length));  //根据日期数重设日期选择器宽度
            
            this.scrollline($(".iStyle_Datepicker").offset().left-$(".Wselday").offset().left - parseInt($(".iStyle_Datepicker").css("left")));
            //var left1 = $(".iStyle_LineDater").offset().left;
           // var top1 = $(".iStyle_LineDater").offset().top;
           // $(".Wselday").offset({top:top1,left:left1});
            
            $(".iStyle_DateWindow").attr("src",$(".iStyle_DateConteiner").attr("url") + "?wd=" + $(".iStyle_Years").text() + "-" + $(".Wselday .daybox").text());
        }           
    },
    bindscroll : function(){
        $(".iStyle_Datepicker").mousewheel($.proxy(function (e, delta) {
            this.scrollline(delta*$(".iStyle_LineDater td").width());
        },this));
    },
    scrollline : function(length){
        //length 滚动距离
        if (this.scrollthread === undefined){
            this.scrolllength = length;
            this.scrollthread = setInterval($.proxy(function(){
                //console.log(this.scrolllength);
                var mov = Math.sqrt(Math.abs(this.scrolllength / 5) / 2);
                if (mov > 6)
                    mov = 6;
                if (this.scrolllength > 0) {
                    this.scrolllength = this.scrolllength - mov;
                    if (this.scrolllength < 0)
                        this.scrolllength = 0;
                    $(".iStyle_Datepicker").css({
                        "left": "+=" + mov + 'px'
                    });
                } else {
                    this.scrolllength = this.scrolllength + mov;
                    if (this.scrolllength > 0)
                        this.scrolllength = 0;
                    $(".iStyle_Datepicker").css({
                        "left": "-=" + mov + 'px'
                    });
                }
                if (this.scrolllength == 0){
                    clearInterval(this.scrollthread);
                    this.scrollthread = undefined;
                }
                if( parseInt($(".iStyle_Datepicker").css("left")) > 0 ){
                    $(".iStyle_Datepicker").css("left","0px");
                    clearInterval(this.scrollthread);
                    this.scrollthread = undefined;
                    return false;
                }
                if( parseInt($(".iStyle_Datepicker").css("left")) + $(".iStyle_Datepicker").width() < $(".iStyle_LineDater").width() ){
                    $(".iStyle_Datepicker").css("left",$(".iStyle_LineDater").width() - $(".iStyle_Datepicker").width() + "px");
                    clearInterval(this.scrollthread);
                    this.scrollthread = undefined;
                    return false;
                }
            },this),10);
        }
        else {
            this.scrolllength = this.scrolllength+length;
        }
    }
}