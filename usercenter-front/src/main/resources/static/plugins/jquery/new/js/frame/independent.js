var btn=document.getElementById("add_line");
var boox=document.getElementById("show_line_box");
//获取contextPath
var contextPath = $("meta[name='contextPath']").attr("content");
//点击导入按钮的全局变量
var currUploadFlag = 0;
btn.onclick=function(){
    var tem = "";
    var bu = $("#show_line_box>tr:last").attr("id");
    if(bu==undefined){
        bu=0;
    }
    var buNum = parseInt(bu)+1;
    tem +="<tr id='"+buNum+"'>\n" +
        "                            <td>"+buNum+"</td>\n" +
        "                            <td>\n" +
        "                                <div class=\"layui-form-item\">\n" +
        "                                    <div class=\"layui-input-inline input_boc\">\n" +
        "                                        <input type=\"hidden\"/>\n" +
        "                                        <input id='examSectionTitle_"+buNum+"' name='examSectionTitle_"+buNum+"' type=\"text\"  placeholder=\"请输入\" class=\"layui-input\" />\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                            </td>\n" +
        "                            <td>\n" +
        "                                <div class=\"layui-form-item\">\n" +
        "                                    <div class=\"layui-input-inline input_boc\">\n" +
        "                                        <input type=\"hidden\"/>\n" +
        "                                        <input id='itemScore_"+buNum+"' name='itemScore_"+buNum+"' type=\"number\"  placeholder=\"请输入\" class=\"layui-input\" onblur=\"calcTotalScore("+buNum+")\"/>\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                            </td>\n" +
        "                            <td>\n" +
        "                                <div class=\"layui-form-item\">\n" +
        "                                    <div class=\"layui-input-inline input_boc\">\n" +
        "                                        <input type=\"hidden\"/>\n" +
        "                                        <input id='itemCount_"+buNum+"' name='itemCount_"+buNum+"' type=\"text\"  placeholder=\"导入试题后自动呈现\" disabled=\"disabled\" class=\"layui-input\" />\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                            </td>\n" +
        "                            <td>\n" +
        "                                <div class=\"layui-form-item\">\n" +
        "                                    <div class=\"layui-input-inline input_boc\">\n" +
        "                                        <input type=\"hidden\"/>\n" +
        "                                        <input type=\"text\" id=\"itemTotalScore_"+buNum+"\" placeholder=\"自动计算总分\" disabled=\"disabled\" class=\"layui-input\" />\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                            </td>\n" +
        "                            <td>\n" +
        "                                <button type=\"button\" class=\"u-all-btn btn-all-see\" onclick='seeSection("+buNum+")'>\n" +
        "                                    <img src=\"../images/questionpool/see.png\" title=\"查看\" alt=\"\"/>\n" +
        "                                </button>\n" +
        "                                    <button type=\"button\" id='upload_"+buNum+"' class=\"u-all-btn btn-all-import\" onclick=\"showUpload("+buNum+")\">\n" +
        "                                        <img src=\"../images/questionpool/dao.png\" title=\"导入\" alt=\"\"/>\n" +
        "                                    </button>\n" +

        "                                <button type=\"button\" class=\"u-all-btn btn-all-delete\" onclick=\"deleteSection(this)\">\n" +
        "                                    <img src=\"../images/questionpool/delete.png\" title=\"删除\" alt=\"\"/>\n" +
        "                                </button>\n" +
        "                                <button type=\"button\" class=\"u-all-btn btn-all-modify\" onclick=\"editSection(this,"+buNum+")\">\n" +
        "                                    <img src=\"../images/questionpool/xiuai.png\" title=\"修改\" alt=\"\"/>\n" +
        "                                </button>\n" +
        "                                <button type=\"button\" class=\"u-all-btn btn-all-sure\" onclick=\"sureSection(this)\">\n" +
        "                                    <img src=\"../images/questionpool/sure.png\" title=\"确定\" alt=\"\"/>\n" +
        "                                </button>\n" +
        "                            </td>\n" +
        "                            <td id='itemParameter"+buNum+"'>\n"  +
        "                            </td>\n" +
        "                            <input type=\"hidden\" name=\"examSectionId\" value=\""+buNum+"\"></input>\n" +
        "                            <input type=\"hidden\" id=\"parameter\" name=\"parameter\" value=\"0\"></input>\n" +
        "                        </tr>";
    $("#show_line_box").append(tem);
}

/*查看弹出框*/
function seeSection(buNum){
    //获取当前大项已经选择的小题的id
    var obj = document.getElementById("itemList"+buNum);
    if(obj==null){
        alert("请先上传题库后再点击查看！");
        return false;
    }else{
        var contextPath = /*[[@{/}]]*/'';
        var ids = "";
        ids = ids + obj.value;
        var index = layer.open({
            type: 2,
            content: contextPath+'viewIndependentQuestions?sectionIds='+ids+'&sectionId='+(buNum)+'&currpage=1',
            area: ['320px', '195px'],
            maxmin: true,
        });
        layer.full(index);
    }
}

/*弹出upload弹窗*/
function showUpload(index){
    //当前操作的大项id赋值
    currUploadFlag = index;
    $("#itemIdParameter").val(currUploadFlag);//上传弹出框关于大项id参数设置

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

/*确定上传并将数据写到相应元素中*/
function confirmUpload(){
    //通过上传弹出框中的参数获取该大项id
    var itemIdParameter = document.getElementById("itemIdParameter").value;
    //获取相应的题目个数
    var itemIdsByNum = document.getElementById("itemCount"+itemIdParameter).value;
    //将该大项题目个数添加到对应元素中
    $("#itemCount_"+itemIdParameter).val(itemIdsByNum);
    //计算该大项总分并添加到对应元素中
    calcTotalScore(itemIdParameter);
    //关闭上传弹窗并隐藏该大项的导入按钮
    closeUpload();
    document.getElementById("upload_"+itemIdParameter).style.display = "none";
    //计算总题目个数和总分并添加到对应元素中
    calcItemTotalScore();
    calcItemTotalNum();
}

/*关闭上传弹窗*/
function closeUpload(){
    $(".lbOverlay").hide();
    $(".hidden_pro_au").hide();
}

/*删除该大项*/
function deleteSection(obj) {
    if(confirm("确定要删除当前大项吗？")){
        $(obj).parents("tr").remove();
        //删除大项后试题总分值和题目个数变化
        calcItemTotalScore();
        calcItemTotalNum();
    }
}

/*编辑该大项*/
function editSection(obj,buNum) {
    //设置该大项parameter标志位参数值为0，确定之后为1
    $(obj).parents("tr").find("#parameter").val(0);
    $("#examSectionTitle_"+buNum).prop("disabled",false);
    $("#itemScore_"+buNum).prop("disabled",false);
}

/*确定该大项*/
function sureSection(obj) {
    //循环该大项所有输入值进行空判断
    var object= $(obj).parents("tr").find('input[type!=hidden],textarea');
    for(var i=0;i<object.length;i++){
        if(object[i].value=="" || object[i].value==null){
            alert("请填写本条数据所有内容且导入正确试题之后再确定！");
            object[i].focus();
            return false;
        }
    }
    //判断当前导入的试题题目数是否为0
    var examSectionId = $(obj).parents("tr").find('input[name^="examSectionId"]')[0].value;
    var itemCount = document.getElementById("itemCount"+examSectionId);
    if(itemCount=="" || itemCount==null){
        alert("请导入符合标准的试题！");
        return false;
    }else if(parseInt(itemCount.value)==0){
        alert("请导入符合标准的试题！");
        return false;
    }
    //如果该大项的所有数据都填写完整则设置id为parameter标志位参数值为1，未确定为0
    $(obj).parents("tr").find("#parameter").val(1);
    //如果该大项的所有数据都填写完整则设置该大项的所有输入为只读
    $(obj).parents("tr").find('input[type!=hidden],textarea,select').prop("disabled",true);
}

/*计算该大项成绩*/
function calcTotalScore(buNum) {
    //获取该大项小题分值和个数
    var itemscore = document.getElementById("itemScore_"+buNum).value;
    var itemcount = document.getElementById("itemCount_"+buNum).value;
    //如果分值和个数都不为空的话则计算该大项分数显示到页面上并将该大项分数加到总分中
    if((itemscore!="" && itemscore!=null) && (itemcount!="" && itemcount!=null)){
        if(!isNonnegative(itemscore)){//试题分数为负数时
            $("#itemScore_"+buNum).val(0);
            itemscore = 0;
        }
        if(!isNonnegative(itemcount)){//试题个数为负数时
            $("#itemCount_"+buNum).val(0);
            itemcount = 0;
        }
        //该大项的分数
        var itemTotalScore = itemscore * itemcount;
        $("#itemTotalScore_"+buNum).val(itemTotalScore);
    }else{
        $("#itemTotalScore_"+buNum).val("");
    }
    //所有大项总分数
    calcItemTotalScore();
}

/*提交之前判断所有页面数据是否符合输入要求*/
function confirmAllValue() {
    //试卷库名称不能为空
    var poolName = document.getElementById("examQuestionPoolTitle").value;
    if (poolName == "" || poolName == null) {
        alert("请填写试卷名称！");
        document.getElementById("examQuestionPoolTitle").focus();
        return false;
    }
    //试卷库分类不能为空
    var poolCategory = document.getElementById("modules").value;
    if (poolCategory == "" || poolCategory == null) {
        alert("请选择试卷分类！");
        document.getElementById("modules").focus();
        return false;
    }
    //大项不能为空且每个大项的标志位必须为1，未确定为0，点击确定之后设置值为1
    var otherItemTotalScore = document.getElementsByName("examSectionId");
    if (otherItemTotalScore.length == 0) {
        alert("请添加试卷大项！");
        return false;
    } else {
        //获取大项的parameter参数标记位集合，倘若还有0则不通过
        var parameterList = document.getElementsByName("parameter");
        for (var i = 0; i < parameterList.length; i++) {
            if (parameterList[i].value == 0) {
                alert("尚有未确定的大项，请检查！");
                return false;
            }
        }
    }
    //去除所有的select框和input框只可读属性
    $DisSelects = $("select,input");//获取所有select、input
    $DisSelects.attr("disabled", false); //处理之前, 全部打开
    return true;
}

/*试卷库导入*/
layui.use('upload', function(){
    var upload = layui.upload;
    //执行实例
    upload.render({
        elem: '#test10' //绑定元素
        ,url: contextPath+'/questionPool/importExamPoolItem' //上传接口
        ,accept: 'file'//允许上传所有文件类型
        ,done: function(res){
            console.log(res.msg);
            if(res.code==0){//上传成功
                alert("上传成功！");
                var itemIdsByString = res.msg;//上传试卷库题目id组成的字符串
                var itemIdsByList = itemIdsByString.split(",");//通过“，”将id字符串分隔并存入数组中
                var itemIdsByNum = itemIdsByList.length;//题目个数
                var itemIdParameter = document.getElementById("itemIdParameter").value;//通过上传弹出框中的参数获取该大项id
                //将上述信息保存到对应大项下
                $("#itemParameter"+itemIdParameter).empty();//首先清空之前的信息
                //拼接包含信息的字符串
                var html = "<input type='hidden' id='itemCount"+itemIdParameter+"' name='itemCount"+itemIdParameter+"' value='"+itemIdsByNum+"'/>\n" +
                           "<input type='hidden' id='itemList"+itemIdParameter+"' name='itemList"+itemIdParameter+"' value='"+itemIdsByList+"'/>\n";
                $("#itemParameter"+itemIdParameter).append(html);//添加html信息
            }
        }
    });
});

/*计算所有大项总分*/
function calcItemTotalScore() {
    var otherItemTotalScore = document.getElementsByName("examSectionId");
    var finalScore = 0;
    for(var i=0;i<otherItemTotalScore.length;i++){
        //获取大项的分数
        var score = document.getElementById("itemTotalScore_"+otherItemTotalScore[i].value).value;
        if(score==""){
            score = 0;
        }
        finalScore += parseInt(score);
    }
    if(finalScore==0){
        $("#score").val("");
    }else{
        $("#score").val(finalScore);
    }
}
/*计算所有题目个数*/
function calcItemTotalNum(){
    var allItemId = document.getElementsByName("examSectionId");
    var allItemNum = 0;
    for(var j=0;j<allItemId.length;j++){
        //获取大项的题目数
        var num = document.getElementById("itemCount_"+allItemId[j].value).value;
        if(num==""){
            num = 0;
        }
        allItemNum += parseInt(num);
    }
    if(allItemNum==0){
        $("#allItemNum").val("");
    }else{
        $("#allItemNum").val(allItemNum);
    }
}

/*正则表达式控制大项的试题分数和试题个数为非负数*/
function isNonnegative(value) {
    var check= /^\d+(\.{0,1}\d+){0,1}$/;
    if(!check.test(value)){
        alert("试题分值和试题数量不能小于0！");
        return false;
    }
    else{
        return true;
    }
}