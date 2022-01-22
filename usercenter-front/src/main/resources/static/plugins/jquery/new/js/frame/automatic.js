var btn=document.getElementById("add_line");
var boox=document.getElementById("show_line_box");
btn.onclick=function(){
    //发送ajax请求 获取题库
    var contextPath = /*[[@{/}]]*/'';
    var optionHtml="";
    $.ajax({
        async :false,
        url: contextPath+"getAllQuestionPool",
        type:"POST",
        success:function(data){//AJAX查询成功
           // optionHtml+=""
            $.each(data,function(name,value) {

                optionHtml+="<option value='"+value.id+"'>"+value.title+"</option>"
            });
        }
    });
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
        "                                        <input type=\"text\" name=\"examSectionTitle_"+buNum+"\" placeholder=\"请输入\" class=\"layui-input\" />\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                            </td>\n" +
        "                            <td>\n" +
        "                                <div class=\"layui-form-item\">\n" +
        "                                    <div class=\"layui-input-inline input_boc\">\n" +
        "                                        <input type=\"hidden\"/>\n" +
        "                                        <input type=\"number\" min=\"0\" name=\"itemscore_"+buNum+"\" id=\"itemscore_"+buNum+"\" placeholder=\"请输入\" class=\"layui-input\" onblur=\"calcTotalScore("+buNum+")\" />\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                            </td>\n" +
        "                            <td>\n" +
        "                                <div class=\"layui-form-item\">\n" +
        "                                    <div class=\"layui-input-inline input_boc\">\n" +
        "                                        <input type=\"hidden\"/>\n" +
        "                                        <input type=\"number\" min=\"0\" name=\"itemcount_"+buNum+"\" id=\"itemcount_"+buNum+"\" placeholder=\"请输入\" class=\"layui-input\" onblur=\"calcTotalScore("+buNum+")\"/>\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                            </td>\n" +
        "                            <td>\n" +
        "                                <div class=\"layui-form-item\">\n" +
        "                                    <div class=\"layui-input-inline input_boc\">\n" +
        "                                        <input type=\"hidden\"/>\n" +
        "                                        <input type=\"text\" id=\"itemTotalScore_"+buNum+"\" placeholder=\"自动计算\" class=\"layui-input\" disabled=\"none\" />\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                            </td>\n" +
        "                              <td>\n" +
        "                                <div class=\"layui-form-item\" style=\"margin-left:-20px;\">\n" +
        "                                    <div class=\"layui-input-inline select_boc\">\n" +
        "                                        <select id=\"questionpoolId_"+buNum+"\"name=\"questionpoolId_"+buNum+"\" lay-verify=\"required\" lay-search=\"\" onchange=\"changeOptions("+buNum+")\">\n" +
        "                                        <option value=\"0\">请选择</option>\n" +
                                                 optionHtml +
        "                                        </select>\n" +
        "                                     </div>\n" +
        "                                 </div>\n" +
        "                            </td>\n" +
        "                            <td>\n" +
        "                             <div class=\"layui-form-item\" style=\"margin-left:-20px;\">\n" +
        "                                 <div class=\"layui-input-inline select_boc\">\n" +
        "                                    <select id=\"questionType_"+buNum+"\" name=\"questionType_"+buNum+"\" lay-verify=\"required\" lay-search=\"\">\n" +
        "                                        <option value=\"0\">请选择</option>\n" +
        "                                        <option value=\"4\">单选题</option>\n" +
        "                                        <option value=\"1\">多选题</option>\n" +
        "                                        <option value=\"2\">判断题</option>\n" +
        "                                        <option value=\"8\">填空题</option>\n" +
        "                                        <option value=\"5\">简答题</option>\n" +
        "                                      </select>\n" +
        "                                   </div>\n" +
        "                               </div>\n" +
        "                            </td>\n" +
        "                            <td>\n" +
        "                                <button type=\"button\" class=\"u-all-btn btn-all-delete\" onclick=\"deleteSection(this)\">\n" +
        "                                    <img src=\"../images/questionpool/delete.png\" title=\"删除\" alt=\"\"/>\n" +
        "                                </button>\n" +
        "                                <button type=\"button\" class=\"u-all-btn btn-all-modify\" onclick=\"editSection(this)\">\n" +
        "                                    <img src=\"../images/questionpool/xiuai.png\" title=\"修改\" alt=\"\"/>\n" +
        "                                </button>\n" +
        "                                <button type=\"button\" class=\"u-all-btn btn-all-sure\" onclick=\"sureSection(this)\">\n" +
        "                                    <img src=\"../images/questionpool/sure.png\" title=\"确定\" alt=\"\"/>\n" +
        "                                </button>\n" +
        "                            </td>\n" +
        "                            <input type=\"hidden\" name=\"examSectionId\" value=\""+buNum+"\"></input>\n" +
        "                            <input type=\"hidden\" id=\"parameter\" name=\"parameter\" value=\"0\"></input>\n" +
        "                        </tr>";
    $("#show_line_box").append(tem);
}

function changeOptions(buNum) {
    var contextPath = /*[[@{/}]]*/'';
    var options = '<option value="0">请选择</option>';
    //获取该题库下的所有题型的个数
    $.ajax({
        async :false,
        url:contextPath+"/gvsunTms/examPool/calcQuestionpoolNum",
        data:{'questionpoolId':$("#questionpoolId_"+buNum+" option:selected").val()},
        type:"POST",
        //dataType:'json',
        success:function(data){//AJAX查询成功
            $.each(data,function(key,values){
                options += '<option value="'+key+'">'+values+'</option>';
            });
        },
        error:function(){
            alert("信息错误！");
        }
    });
    document.getElementById("questionType_"+buNum).innerHTML=options;
}

function calcTotalScore(buNum) {
    //获取该大项小题分值和个数
    var itemscore = document.getElementById("itemscore_"+buNum).value;
    var itemcount = document.getElementById("itemcount_"+buNum).value;
    //如果分值和个数都不为空的话则计算该大项分数显示到页面上并将该大项分数加到总分中
    if((itemscore!="" && itemscore!=null) && (itemcount!="" && itemcount!=null)){
        if(!isNonnegative(itemscore)){//试题分数为负数时
            $("#itemscore_"+buNum).val(0);
            itemscore = 0;
        }
        if(!isNonnegative(itemcount)){//试题个数为负数时
            $("#itemcount_"+buNum).val(0);
            itemcount = 0;
        }
        //该大项的分数
        var itemTotalScore = itemscore * itemcount;
        $("#itemTotalScore_"+buNum).val(itemTotalScore);
    }else{
        $("#itemTotalScore_"+buNum).val("");
    }
    //获取该试卷库的所有大项的分数，累加并添加到试卷库总分中
    var otherItemTotalScore = document.getElementsByName("examSectionId");
    var finalScore = 0;
    for(var i=0;i<otherItemTotalScore.length;i++){
        //获取大项的分数
        var score = document.getElementById("itemTotalScore_"+otherItemTotalScore[i].value).value;
        if(score=="" || score==null){
            score = 0;
        }
        finalScore += parseInt(score);
    }
    $("#score").val(finalScore);
}

function isNonnegative(value) {//正则表达式控制大项的试题分数和试题个数为非负数
    var check= /^\d+(\.{0,1}\d+){0,1}$/;
    if(!check.test(value)){
        alert("试题分值和试题数量不能小于0！");
        return false;
    }
    else{
        return true;
    }
}

function deleteSection(obj) {//删除该大项
    if(confirm("确定要删除当前大项吗？")){
        $(obj).parents("tr").remove();
        //删除一行后试题总分值发生变化，故重新获取该试卷库的所有大项的分数，累加并添加到试卷库总分中
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
        $("#score").val(finalScore);
    }
}

function editSection(obj) {//编辑该大项
    //设置该大项parameter标志位参数值为0，确定之后为1
    $(obj).parents("tr").find("#parameter").val(0);
    $(obj).parents("tr").find('input[type!=hidden],textarea,select').prop("disabled",false);
}

function sureSection(obj) {//确定该大项
    //循环该大项所有输入值进行空判断
    var object= $(obj).parents("tr").find('input[type!=hidden],textarea');
    for(var i=0;i<object.length;i++){
        if(object[i].value=="" || object[i].value==null){
            alert("请填写本条数据所有内容之后再确定！");
            object[i].focus();
            return false;
        }
    }
    //循环该大项所有选择下拉框的值进行空判断
    var object1= $(obj).parents("tr").find('select');
    for(var j=0;j<object1.length;j++){
        if(object1[j].value==0){
            alert("请选择试题库和试题分类之后再确定！");
            object1[j].focus();
            return false;
        }
    }
    //判断用户输入题目个数是否小于等于所选试题库题型个数，否的话提醒用户题目个数不够
    var thisNum = $(obj).parents("tr").find('input[name^="examSectionId"]')[0].value;//当前大项的标号
    var thisCount = document.getElementById("itemcount_"+thisNum).value;//当前大项用户填入的题目个数
    var thisTotalObj = document.getElementById("questionType_"+thisNum);//题型select框
    var thisIndex = thisTotalObj.selectedIndex; //当前大项的题型用户的select框索引
    var thisText = thisTotalObj.options[thisIndex].text; //当前大项的题型用户的select框文本（带题目个数）
    var thisTotal = thisText.substring(5,thisText.length-2);//通过字符串截取获取到当前大项用户选择的题型在题库中的总个数
    if(parseInt(thisCount) > parseInt(thisTotal)){//倘若当前选中的题库中对应选择题型的题目个数不足
        alert("您选中的题库中对应题目个数不足！请重新选择！");
        return false;
    }
    //如果该大项的所有数据都填写完整则设置id为parameter标志位参数值为1，未确定为0
    $(obj).parents("tr").find("#parameter").val(1);
    //如果该大项的所有数据都填写完整则设置该大项的所有输入为只读
    $(obj).parents("tr").find('input[type!=hidden],textarea,select').prop("disabled",true);
}

function confirmAllValue(){//提交之前判断所有页面数据是否符合输入要求
    //试卷库名称不能为空
    var poolName = document.getElementById("examQuestionPoolTitle").value;
    if(poolName =="" || poolName==null){
        alert("请填写试卷名称！");
        document.getElementById("examQuestionPoolTitle").focus();
        return false;
    }
    //试卷库分类不能为空
    var poolCategory = document.getElementById("modules").value;
    if(poolCategory =="" || poolCategory==null){
        alert("请选择试卷分类！");
        document.getElementById("modules").focus();
        return false;
    }
    //大项不能为空且每个大项的标志位必须为1，未确定为0，点击确定之后设置值为1
    var otherItemTotalScore = document.getElementsByName("examSectionId");
    if(otherItemTotalScore.length==0){
        alert("请添加试卷大项！");
        return false;
    }else{
        //获取大项的parameter参数标记位集合，倘若还有0则不通过
        var parameterList = document.getElementsByName("parameter");
        for(var i=0;i<parameterList.length;i++){
            if(parameterList[i].value==0){
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
