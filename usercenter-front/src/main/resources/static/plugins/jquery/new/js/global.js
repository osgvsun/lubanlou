
 $(".module_tit").click(
            function () {
                $(this).siblings(".module_con").slideToggle(150)
            }
        )
 $(".group_tit").click(function(){
    $(this).parent().find('table').slideToggle(150);
 })

$(".add_1").click(
        function(){
            $("#box1").css("display","block");
            if($("#box2").css("display")=="block")
            {
                $("#box2").css("display","none");
            }
        }
    )
$(".add_2").click(
        function(){
            $("#box2").css("display","block");
            if($("#box1").css("display")=="block")
            {
                $("#box1").css("display","none");
            }
        }
    )

$(".btn_submit").click(function(){
    $(this).parent().css("display","none");
})
 $(".prodetail_tit").click(
            function () {
                $(this).siblings(".prodetail_con").slideToggle(150)
            }
        )
        
function targetUrl(url){
	 document.searchForm.action=url;
	 document.searchForm.submit();
//	window.location.href=url;
}

function targetUrlChange(url){
	document.searchForm.action=url+$('#pageSelect').val();
	document.searchForm.submit();
//	window.location.href=url+$('#pageSelect').val();
}
 function targetUrlChangeForTeamName(url,selectId){//路径，下拉框id
     document.searchForm.action=url+$('#'+selectId+' option:selected').val();
     document.searchForm.submit();
//	window.location.href=url+$('#pageSelect').val();
 }
 function targetUrlChangeAndTeamName(url,selectId,param){//路径，下拉框id，值
     document.searchForm.action=url+$('#pageSelect').val()+"&amp;"+param+"="+$('#'+selectId+' option:selected').val();
     document.searchForm.submit();
//	window.location.href=url+$('#pageSelect').val();
 }
 function turnUrl(url){
	window.location.href = url;
//	window.location.href=url+$('#pageSelect').val();
}

 $(".add_btn").click(function () {
    $("#editForm").css("display","");
 })

 function cancelEdit(){
     document.getElementById("editForm").style.display="none";
 }
 function cancelEdit1(){
     document.getElementById("editForm1").style.display="none";
 }
 Date.prototype.Format = function (fmt) {
     var o = {
         "M+": this.getMonth() + 1, //月份
         "d+": this.getDate(), //日
         "h+": this.getHours(), //小时
         "m+": this.getMinutes(), //分
         "s+": this.getSeconds(), //秒
         "q+": Math.floor((this.getMonth() + 3) / 3), //季度
         "S": this.getMilliseconds() //毫秒
     };
     if (/(y+)/.test(fmt))
         fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
     for (var k in o){
         if (new RegExp("(" + k + ")").test(fmt)) {
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
         }
     }
     return fmt;
 }
 //只能输入数字及一个小数点和后面两位小数
 function clearNoNum(obj){
     obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
     obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
     obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
     obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
     if(obj.value.indexOf(".")< 0 && obj.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
         obj.value= parseFloat(obj.value);
     }
 }