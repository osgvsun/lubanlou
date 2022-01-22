var btn=document.getElementById("add_line");
var boox=document.getElementById("show_line_box");

var num=0;
btn.onclick=function(){
    num = $("#show_line_box>tr:last").attr("id");
    if(num==undefined){
        num=0;
    }
    num=parseInt(num);
    //将这个长度存入cookie中
    $.cookie("sectionlength",num+1);
    var term = "";
    term+="<tr id='"+(num+1)+"'>\n" +
        "                            <td>"+(num+1)+"</td>\n" +
        "                            <td>\n" +
        "                                <div class=\"layui-form-item\">\n" +
        "                                   <div class=\"layui-input-inline input_boc\">\n" +
        "                                    <input type=\"hidden\"/>\n" +
        "                                    <input type=\"text\"  id='section"+(num+1)+"' name='section"+(num+1)+"' required=\"required\" placeholder=\"请输入\" class=\"layui-input\" />\n" +
        "                                                                        </div>\n" +
        "                                                                </div>\n" +
        "                              </td>\n" +
        "                               <td>\n" +
        "                                   <div class=\"layui-form-item\">\n" +
        "                                          <div class=\"layui-input-inline input_boc\">\n" +
        "                                              <input type=\"hidden\"/>\n" +
        "                                                <input id='itemscore"+(num+1)+"' min=\"0\" name='itemscore"+(num+1)+"'  required=\"required\"  type=\"number\"  placeholder=\"\" class=\"layui-input\" />\n" +
        "                                           </div>\n" +
        "                                  </div>\n" +
        "                           </td>\n" +
        "                           <td>\n" +
        "                                  <div class=\"layui-form-item\">\n" +
        "                                           <div class=\"layui-input-inline input_boc\">\n" +
        "                                                <input type=\"hidden\"/>\n" +
        "                                                <input type=\"text\" id='itemcount"+(num+1)+"' required=\"required\" name='itemcount"+(num+1)+"' readonly=\"readonly\" placeholder=\"\" class=\"layui-input\" />\n" +
        "                                            </div>\n" +
        "                                   </div>\n" +
        "                                </td>\n" +
        "                           <td>\n" +
        "                                   <div class=\"layui-form-item\">\n" +
        "                                           <div class=\"layui-input-inline input_boc\">\n" +
        "                                                <input type=\"hidden\"/>\n" +
        "                                                <input type=\"text\" id='totalscore"+(num+1)+"' required=\"required\" name='totalscore"+(num+1)+"' readonly=\"readonly\" placeholder=\"\" class=\"layui-input\" />\n" +
        "                                          </div>\n" +
        "                                   </div>\n" +
        "                               </td>\n" +
        "                          <td>\n" +
        "                                    <button type=\"button\" class=\"u-all-btn btn-all-add\" onclick=\"addSection("+(num+1)+")\">\n" +
        "                                        <img src=\"../images/questionpool/addd.png\" title=\"新增\" alt=\"\"/>\n" +
        "                                    </button>\n" +
        "                                   <button type=\"button\" class=\"u-all-btn btn-all-see\" onclick=\"seeSection("+(num+1)+")\">\n" +
        "                                        <img src=\"../images/questionpool/see.png\" title=\"查看\" alt=\"\"/>\n" +
        "                                   </button>\n" +
        "                                   <button type=\"button\" class=\"u-all-btn btn-all-delete\" onclick=\"deleteSection(this,'"+(num+1)+"')\">\n" +
        "                                       <img src=\"../images/questionpool/delete.png\" title=\"删除\" alt=\"\"/>\n" +
        "                                  </button>\n" +
        "                                    <button type=\"button\" class=\"u-all-btn btn-all-modify\" onclick=\"editSection('"+(num+1)+"')\" >\n" +
        "                                        <img src=\"../images/questionpool/xiuai.png\" title=\"修改\" alt=\"\"/>\n" +
        "                                    </button>\n" +
        "                                    <button type=\"button\" class=\"u-all-btn btn-all-sure\" onclick=\"sureSection('"+(num+1)+"')\">\n" +
        "                                        <img src=\"../images/questionpool/sure.png\" title=\"确定\" alt=\"\"/>\n" +
        "                                    </button>\n" +
        "                                </td>\n" +
        "                      </tr>";
    $("#show_line_box").append(term);

}

/*新增弹出框*/
function addSection(num){
    var contextPath = /*[[@{/}]]*/'';
    var index = layer.open({
        type: 2,
        content: contextPath+'addedQuestions?currsection='+num,
        area: ['320px', '195px'],
        maxmin: true
    });
    layer.full(index);
}

/*查看弹出框*/
function seeSection(num){
    var contextPath = /*[[@{/}]]*/'';
    //获取当前大项已经选择的小题的id
    var ids = sessionStorage.getItem(num);
    var index = layer.open({
        type: 2,
        content: contextPath+'viewQuestions?sectionIds='+ids+'&sectionId='+num+'&currpage=1',
        area: ['320px', '195px'],
        maxmin: true,
    });
    layer.full(index);
}
function sureSection(num){
    //确定大项
    //获取当前大项的小题
    var itemStr = sessionStorage.getItem(num);
    if(itemStr!=null){
        var split = itemStr.split(",");
        //试题大项的标题输入设置为不可用
        $("#section"+num).attr("readonly","readonly")
        //每项试题分值设置为不可用
        $("#itemscore"+num).attr("readonly","readonly")
        //获取每项试题的分值
        var itemscore = $("#itemscore"+num).val();
        //设置小题的数量
        $("#itemcount"+num).val(split.length);
        //计算出小题的数量和总分
        $("#totalscore"+num).val(itemscore*split.length)
    }else{
        alert("请选择试题！");
    }
}
function closeWindow(){

}
$(".btn_box_add .layui-btn-normal").click(function () {
        alert(1);
       $(".addly").css("display","none");
        alert(2);
    })
//查看大项的小题
function viewSectionItem(sectionIndex){
    var itemIds = sessionStorage.getItem(sectionIndex);
    var itemIdsArray = itemIds.split(",");

}
//提交手动组卷表单
function submitMyForm(){
    //获取form对象
    var myform=$('#myForm');
    //获取所有的大项
    var sectionLength = $.cookie("sectionlength");
    if(sectionLength==null||sectionLength<=0){
        alert("请选择大项！！！");
        return false;
    }
    var idArray=new Array();
    //判断大项是否确定按钮
    var itecountS = $("input[id^='itemcount']");
    for(var item=0;item<itecountS.length;item++){
        //获取当前section的Value
        var sectionItemVal=itecountS[item].value;
        //获取当前section的id
        var itemId=itecountS[item].id;
        //截取当前sectionid的序号
        var s = itemId.substring(9,itemId.length);
        if(sectionItemVal==""){
            alert("序号"+s+"大项尚未确定！");
            return false;
        }else{
            idArray[item]=s;
            var tempSectionLength = $("<input type='text' name='sectionIndex' value='"+s+"'/>");
            myform.append(tempSectionLength);
        }
    }

    for(var i=0;i<idArray.length;i++){
        var item = sessionStorage.getItem(idArray[i]);
        if(item!=null){
            //生成一个input
            var tmpInput=$("<input type='text' name='sectionStr"+idArray[i]+"' value='"+item+"'/>");
            myform.append(tmpInput);
        }
        sessionStorage.removeItem(idArray[i]);
    }

   /* var contextPath = /!*[[@{/}]]*!/'';
    myform.attr("action", contextPath+"/gvsunTms/examPool/saveManuallyPool");
    myform.submit();*/
}
//大项的删除
function deleteSection(obj,sectionId){
    if(confirm("确定要删除当前大项吗？")){
        $(obj).parents("tr").remove();
        //删除对应的storage
        sessionStorage.removeItem(sectionId);
        //将cookie中对应的数量减1
        var length = $.cookie("sectionlength");
        $.cookie("sectionlength",parseInt(length)-1);
    }
}
function editSection(sectionId){
  //将试题大项的标题还有分值变为可写状态
    $("#section"+sectionId).attr("readonly",false);
    $("#itemscore"+sectionId).attr("readonly",false);
}
$(function(){
    //页面刷新 刚进入这个页面
    //清掉之前存的storage和cookie
    sessionStorage.clear();
    $.cookie("sectionlength",0);
})
