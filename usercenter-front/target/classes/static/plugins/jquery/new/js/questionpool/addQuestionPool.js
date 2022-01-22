/*var E = window.wangEditor
var editor = new E('#editor')
// 或者 var editor = new E( document.getElementById('#editor') )
editor.customConfig.uploadImgShowBase64 = true
editor.create()*/

var contextPath = $("meta[name='contextPath']").attr("content");
/*
富文本*/
var E = window.wangEditor;
var editor1 = new E('#div1');
editor1.customConfig.debug = true;
//图片上传服务地址
editor1.customConfig.uploadImgServer = contextPath+'/file/editorPicUpload';
//图片上传到后台是的name值
editor1.customConfig.uploadFileName = 'editorPic';
//设置富文本框的菜单栏项目
editor1.customConfig.menus = [
    'head',  // 标题
    'bold',  // 粗体
    'italic',  // 斜体
    'underline',  // 下划线
    'strikeThrough',  // 删除线
    'foreColor',  // 文字颜色
    'backColor',  // 背景颜色
    'link',  // 插入链接
    'list',  // 列表
    'justify',  // 对齐方式
    'quote',  // 引用
    'emoticon',  // 表情
    'image',  // 插入图片
    'table',  // 表格
    'code',  // 插入代码
    'undo',  // 撤销
    'redo'  // 重复
]
editor1.create();
var title = $("#stem").val();
editor1.txt.html(title);
var editorArray=new Array();

//修改题目
var editorArray1 = new Array();
editorArray1.splice(0,editorArray1.length);
var count = $("#count").val();
for(var i=2;i<=count+1;i++){
    var editor = new E('#div'+i);
    editor.customConfig.debug = true;
    //图片上传服务地址
    editor.customConfig.uploadImgServer = contextPath+'/file/editorPicUpload';
    //图片上传到后台是的name值
    editor.customConfig.uploadFileName = 'editorPic';
    //设置富文本框的菜单栏项目
    editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
    ]
    editor.create();
    editorArray1[i-2]=editor;
    editor.txt.html($("#count"+i).val());
}
//简答题答案
$("#shortanswer").val($("#simple").val());
$(".choose_two").hide();
function questionType(){
    $(".short_answer_question").html("");
    $(".true_false_choice").html("");
    $(".gap_filling").html("");
    $(".choice_box").html("");
    //获取被选中的option标签
    var vs = $('select  option:selected').val();

    if (vs== "单选题")
    {   $("#type").val(4);
        if ($("#option_box") != null){
        $("#option_box").empty();
    }
       $("#option_box").append("<select name=\"mySelect\" onchange=\"show_sub(this.options[this.options.selectedIndex].value)\">\n" +
           "                                    <option value=\"\">请选择选项个数</option>\n" +
           "                                    <option value=\"2\">2</option>\n" +
           "                                    <option value=\"3\">3</option>\n" +
           "                                    <option value=\"4\">4</option>\n" +
           "                                    <option value=\"5\">5</option>\n" +
           "                                    <option value=\"6\">6</option>\n" +
           "                                    <option value=\"7\">7</option>\n" +
           "                                    <option value=\"8\">8</option>\n" +
           "                                    <option value=\"9\">9</option>\n" +
           "                                    <option value=\"10\">10</option>\n" +
           "                                </select>");

    }
    else if(vs== "多选题"){
        $("#type").val(1);
        if ($("#option_box") != null){
            $("#option_box").empty();
        }
        $("#option_box").append("<select name=\"mySelect\" onchange=\"show_sub(this.options[this.options.selectedIndex].value)\">\n" +
            "                                    <option value=\"\">请选择选项个数</option>\n" +
            "                                    <option value=\"2\">2</option>\n" +
            "                                    <option value=\"3\">3</option>\n" +
            "                                    <option value=\"4\">4</option>\n" +
            "                                    <option value=\"5\">5</option>\n" +
            "                                    <option value=\"6\">6</option>\n" +
            "                                    <option value=\"7\">7</option>\n" +
            "                                    <option value=\"8\">8</option>\n" +
            "                                    <option value=\"9\">9</option>\n" +
            "                                    <option value=\"10\">10</option>\n" +
            "                                </select>");

    }
    else{
        $("#type").val(2);
        $(".choose_two").hide();
        if(vs== "判断题"){
            $("#option_box").empty();
            $(".true_false_choice").append("<div class='true_false_choice'><table><tbody><tr><td><div class='true_false_choice_box'>对<input type='radio' name='true' value='对' title='对'/></div></td><td><div id='div12'></div></td></tr><tr><td><div class='true_false_choice_box'>错<input type='radio' name='true' value='错' title='错'/></div></td><td><div id='div13' style='margin-top:10px;'></div></td></tr></tbody></table><div class='customInput'><button type='button' class='layui-btn layui-btn-primary' style='background: #f7f7f7 !important;line-height:32px !important;' onclick=\"window.history.back();\">取消</button><button type=\"button\" onclick=\"select()\" class='layui-btn layui-btn-normal'>确定</button></div></div>");
        }
        else if(vs== "填空题"){
            $("#type").val(8);
            $("#option_box").empty();
            $(".gap_filling").append("<div class='gap_filling'><h2>设置答案说明：</h2><p>填空题答案用大括号“{}”标记。<br/>例如：Roses are {red} and violets are {blue}. 则正确答案为“red”和“blue”。<br/>使用“|”分隔同义词。<br/>例如： {They are|They're} very happy. 则正确答案为“They are”或“They are”。<br/>使用星号(*)来表示通配符。<br/>例如： It's raining {c*} and {d*s}. 则形如“c...”和“d...s”的答案均为正确答案。</p><div class='customInput'><button  class='layui-btn layui-btn-primary' style='background: #f7f7f7 !important;line-height:32px !important;' onclick=\"window.history.back();\">取消</button><button type=\"button\" onclick=\"select()\" class='layui-btn layui-btn-normal'>确定</button></div></div>");
        }
        else if(vs== "简答题"){
            $("#type").val(5);
            $("#option_box").empty();
            $(".short_answer_question").append("<div class='short_answer_question'><table><tbody><tr><td>参考答案：</td><td><textarea name='shortanswer' id='shortanswer'></textarea></td></tr></tbody></table><h2>设置答案</h2><p>简答题答案用符号&&隔开。<br/>例如： 名字&&爱好&&生日</p><div class='customInput'><button type='button' class='layui-btn layui-btn-primary' style='background: #f7f7f7 !important;line-height:32px !important;' onclick=\"window.history.back();\">取消</button><button type=\"button\" onclick=\"select()\" class='layui-btn layui-btn-normal'>确定</button></div></div>");
        }else if(vs== "请选择类型"){
            $("#option_box").empty();
        }
    }
}

var editor;
function show_sub(option){
    $("#single_choice").html("");
    var textbox = $('select  option:selected').val();
    var textboxc = option;
    var item = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    var wang = ['div2', 'div3', 'div4', 'div5', 'div6', 'div7', 'div8', 'div9', 'div10', 'div11'];
    var typebox = "";
    if(textbox == "单选题"){
        typebox = "radio";
    }
    else {
        typebox = "checkbox";
    }

    var tem = "";
    for(var i=0;i<parseInt(textboxc);i++){
        tem +="<table><tbody><tr><td><div>"+item[i]+"<input style='margin-left:10px;' type='"+typebox+"' name='sex' value='"+item[i]+"' title='"+item[i]+"' /></div></td><td><div id='"+wang[i]+"'></div></td></tr></tbody></table>";
    }
    $("#single_choice").append(tem)
    $(".choice_box").append("<div class='customInput'><button type='button' class='layui-btn layui-btn-primary' style='background: #f7f7f7 !important;line-height:32px !important;'  onclick=\"window.history.back();\">取消</button><button type=\"button\" onclick=\"select()\" class='layui-btn layui-btn-normal'>确定</button></div>")
    editorArray.splice(0,editorArray.length);
   for(var i=0;i<parseInt(textboxc);i++){
        var currEditor = new E('#'+wang[i])
       //图片上传服务地址
       currEditor.customConfig.uploadImgServer = contextPath+'/file/editorPicUpload';
       //图片上传到后台是的name值
       currEditor.customConfig.uploadFileName = 'editorPic';
       //设置富文本框的菜单栏项目
        currEditor.customConfig.menus = [
           'head',  // 标题
           'bold',  // 粗体
           'italic',  // 斜体
           'underline',  // 下划线
           'strikeThrough',  // 删除线
           'foreColor',  // 文字颜色
           'backColor',  // 背景颜色
           'link',  // 插入链接
           'list',  // 列表
           'justify',  // 对齐方式
           'quote',  // 引用
           'emoticon',  // 表情
           'image',  // 插入图片
           'table',  // 表格
           'code',  // 插入代码
           'undo',  // 撤销
           'redo'  // 重复
        ]
        currEditor.create();
       editorArray[i]=currEditor;
    }
}
//新增小题
function select(){
    var zuulServerUrl=$("#zuulServerUrl").val();
    var arr = new Object();
    var questionPoolId=$("#questionPoolId").val();
    arr.questionPoolId=questionPoolId;
    //新增题目类型
    var type=$("#type").val();
    arr.type = type;
    var stem = editor1.txt.html();
    var stems = stem.split("&nbsp;");
    arr.stem = stem;
    //所有选项
    var answerLabelChoices = ""
    //正确答案
    var answer = "";
    if(type==1||type==4){
        $("input[name='sex']").each(
            function(){
                answerLabelChoices += $(this).val()+",";
            }
        )

        $("input[name='sex']:checked").each(
            function(){
                answer += $(this).val()+",";
            }
        )
    } else if(type==2){
        $("input[name='true']").each(
            function(){
                answerLabelChoices += $(this).val()+",";
            }
        )

        $("input[name='true']:checked").each(
            function(){
                answer += $(this).val()+",";
            }
        )
    }
    arr.answerLabelChoices = answerLabelChoices;
    arr.answer = answer;
    //所有答案内容
    var single = "";
    if(type==1||type==4){
        for(var i=0;i<editorArray.length;i++){
            single += editorArray[i].txt.html()+",";
        }
    } else if(type==2){
        single = "";
    } else if(type==5){
        var shortanswer = $("#shortanswer").val();
        single = shortanswer;
    }
    // $("#type").val(type);
    // $("#stem").val(stems[0]);
    // $("#answer").val(answer);
    // $("#single").val(single);
    // $("#answerLabelChoices").val(answerLabelChoices);
    arr.single = single;
    var data = JSON.stringify(arr);
    $.ajax({
        type: 'POST',
        url: zuulServerUrl+'/examserver/questionPoolApi/saveQuestion',
        contentType:"application/json;charset=utf-8",
        //dataType:"json",
        data:data,
        success: function(res) {
            if(res=="success") {
                alert("保存成功");
                window.history.back();
            }else{
                alert("保存失败")
            }
        }
    });
}
//修改小题
function modify(){
    var zuulServerUrl=$("#zuulServerUrl").val();
    var arr = new Object();
    var questionPoolId=$("#questionPoolId").val();
    var itemId=$("#itemId").val();
    arr.id=itemId;
    arr.questionPoolId=questionPoolId;
    var type = $("#type").val();
    arr.type = type;
    //新题干
    var stem = editor1.txt.html();
    var stems = stem.split("&nbsp;");
    arr.stem = stem;
    //所有选项
    var answerLabelChoices = "";
    //正确答案
    var answer = "";
    if(type==1||type==4){
        $("input[name='sex']").each(
            function(){
                answerLabelChoices += $(this).val()+",";
            }
        )

        $("input[name='sex']:checked").each(
            function(){
                answer += $(this).val()+",";
            }
        )
    } else if(type==2){
        $("input[name='true']").each(
            function(){
                answerLabelChoices += $(this).val()+",";
            }
        )

        $("input[name='true']:checked").each(
            function(){
                answer += $(this).val()+",";
            }
        )
    }
    arr.answerLabelChoices = answerLabelChoices;
    arr.answer = answer;
    //所有答案内容
    var single = "";
    if(type==1||type==4){
        for(var i=0;i<(editorArray1.length)/10;i++){
            single += editorArray1[i].txt.html()+",";
        }
    } else if(type==2){
        single = "";
    } else if(type==5){
        var shortanswer = $("#shortanswer").val();
        single = shortanswer;
    }
    arr.single = single;
    var data = JSON.stringify(arr);
    $.ajax({
        type: 'POST',
        url: zuulServerUrl+'/examserver/questionPoolApi/saveQuestion',
        contentType:"application/json;charset=utf-8",
        //dataType:"json",
        data:data,
        success: function(res) {
            if(res=="success") {
                alert("保存成功");
                window.history.back();
            }else{
                alert("保存失败")
            }
        }
    });
    // $("#stem").val(stems[0]);
    // $("#answer").val(answer);
    // $("#single").val(single);
    // $("#answerLabelChoices").val(answerLabelChoices);
    // $("#myForm").submit();
}
