function saveTest(){
    var id=$("#testId").val();
    var zuulServerUrl=$("#zuulServerUrl").val();
    var testTitle=$("#testTitle").val();
    var testScoreTest=$("#testScoreTest").val();
    var entryScore=$("#entryScore").val();
    var deviceId=$("#deviceId").val();
    var academyNumber=$("#academyNumber").val();
    var timeLimit=$("#mins").val();
    var startDateTest=$("#startdateTest").val();
    var dueDateTest=$("#duedateTest").val();
    var timeLimitOneTest=$('input[name="timelimitOneTest"]:checked').val();
    if (timeLimitOneTest==2){
        timeLimitOneTest=$("#customTime").val();
    }
    var toGradeBook=$('input[name="checknameTest"]:checked').val();
    var toStudent=$('input[name="checkname1Test"]:checked').val();
    var toTotalGrade=$('input[name="checkname2Test"]:checked').val();
    var answerToStudent=$('input[name="checkname3Test"]:checked').val();
    var needSubmit=$('input[name="testNeedSubmit"]:checked').val();
    var itemType=$("#itemType").val();
    var sectionNames=new Array();
    $("input[name='sectionName']").each(function(j,item){
        sectionNames.push(item.value)
    });
    var questionIds=new Array();
    $("input[name='questionIdTest']").each(function(j,item){
        questionIds.push(item.value)
    });
    var itemTypes=new Array();
    $("input[name='itemTypeTest']").each(function(j,item){
        itemTypes.push(item.value)
    });
    var itemQuantities=new Array();
    $("input[name='itemQuantityTest']").each(function(j,item){
        itemQuantities.push(item.value)
    });
    var itemScores=new Array();
    $("input[name='itemScoreTest']").each(function(j,item){
        itemScores.push(item.value)
    });
    var content=$("#contentTest").val();
    var testFrom='question';
    var arr = new Object();
    arr.id=id;
    arr.testTitle = testTitle;
    arr.testScoreTest = testScoreTest;
    arr.timeLimit = timeLimit;
    arr.startDateTest = startDateTest;
    arr.dueDateTest = dueDateTest;
    arr.timeLimitOneTest = timeLimitOneTest;
    arr.toGradeBook = toGradeBook;
    arr.toStudent = toStudent;
    arr.toTotalGrade = toTotalGrade;
    arr.answerToStudent = answerToStudent;
    arr.needSubmit = needSubmit;
    arr.sectionNames=sectionNames;
    arr.questionIds=questionIds;
    arr.itemTypes=itemTypes;
    arr.itemQuantities=itemQuantities;
    arr.itemScores=itemScores;
    arr.testFrom=testFrom;
    arr.content=content;
    var data = JSON.stringify(arr);
    $.ajax({
        type: 'POST',
        async: false,
        url: zuulServerUrl+'/examserver/examApi/saveTest',
        contentType:"application/json;charset=utf-8",
        dataType:"json",
        data:data,
        success: function(res) {
            var myData={
                "id":res,
                "testName":testTitle,
                "beginTime":startDateTest,
                "endTime":dueDateTest,
                "totalScore":testScoreTest,
                "accessScore":entryScore,
                "instrument":deviceId,
                "academyNumber":academyNumber,
                "itemType":itemType,

            }
            $.ajax({
                // url: $("#contextPath").val()+"/questionPool/saveTest",
                // url:"${pageContext.request.contextPath}/questionPool/saveTest",
                url:"../questionPool/saveTest",
                type:"post",
                data: myData,
                success: function () {
                    // location.replace(document.referrer);
                    // document.referrer //前一个页面的URL
                    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                    parent.layer.close(index);
                }
            })
        },
    });
}


var contextPath = $("meta[name='contextPath']").attr("content");
function changeTr(type){
    //判断题目数量是否超过该类型题目数量总数
    $.ajax({
        async :false,
        data: {'questionpoolId':$("#addTrquestionIdTest option:selected").val(),'type':type},
        url: contextPath+"/examApi/question/getItemCount",
        type:"POST",
        success:function(data){//AJAX查询成功
            $.each(data,function(key,values){
                $("#addTrquestionIdTest option:selected").text(values);
            });
        }
    });
}

//输入内容是数字
function changeNumber(obj){
    var price=$(obj).val();
    price = price.replace(/[^\d.]/g,"");
    //必须保证第一个为数字而不是.
    price = price.replace(/^\./g,"");
    //保证只有出现一个.而没有多个.
    price = price.replace(/\.{2,}/g,".");
    //保证.只出现一次，而不能出现两次以上
    price = price.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    $(obj).val(price);
}

//删除当前已添加的题库
function deleteThisTr(obj){
    $(obj).parent().parent().remove();
}

//根据分类获取对应的章节列表选项
function changeTestChaptersByModuleType(tCourseSiteId,moduleType){
    var options = '<option value="">请选择</option>';
    $.ajax({
        async: false,
        type: "POST",
        url: contextPath+"/examApi/editExam/findChapterMap",
        data: {'tCourseSiteId':tCourseSiteId,'moduleType':moduleType},
        dataType:'json',
        success:function(data){
            $.each(data,function(key,values){
                options += '<option value="'+key+'">'+values+'</option>';

            });
        },
        error:function(){
            alert("信息错误！");
        }
    });
    document.getElementById("testWkChapterId").innerHTML=options;
    var lessonOptions = '<option value="">请选择</option>';
    document.getElementById("testWkLessonId").innerHTML=lessonOptions;
}

//根据章节回去对应的课时列表选项
function changeTestLessonsByChapterId(chapterId){
    var options = '<option value="">请选择</option>';
    $.ajax({
        async: false,
        type: "POST",
        url: contextPath+"/exam/editExam/findLessonMap",
        data: {'chapterId':chapterId},
        dataType:'json',
        success:function(data){
            $.each(data,function(key,values){
                options += '<option value="'+key+'">'+values+'</option>';

            });
        },
        error:function(){
            alert("信息错误！");
        }
    });
    document.getElementById("testWkLessonId").innerHTML=options;
}

//切换考试的题目来源
function testSource(testSource) {
    if(testSource=="question"){
        $("#testFromQuestionTable").show();
        $("#question_pool").hide();
    }else{
        $("#question_pool").show();
        $("#testFromQuestionTable").hide();
    }
}

//根据试卷库类型获取对应的试卷库
function changeExamQuestionpoolCategory(category){
    var options = '<option value="">请选择试卷库</option>';
    $.ajax({
        async: false,
        type: "POST",
        url: contextPath+"exam/findExamQuestionpool",
        data: {'category':category},
        dataType:'json',
        success:function(data){
            $.each(data,function(key,values){
                options += '<option value="'+key+'">'+values+'</option>';
            });
        },
        error:function(){
            alert("信息错误！");
        }
    });
    document.getElementById("examQuestionpool").innerHTML=options;
}

/* //根据试卷库回去获取试卷库类型
 function changeExamQuestionpool(examQuestionpoolId){
     var options = '<option value="">请选择试卷库分类</option>';
     $.ajax({
         async: false,
         type: "POST",
         url: contextPath+"exam/findExamQuestionpoolCategory",
         data: {'examQuestionpoolId':examQuestionpoolId},
         dataType:'json',
         success:function(data){
             $.each(data,function(key,values){
                 options += '<option value="'+key+'">'+values+'</option>';
             });
         },
         error:function(){
             alert("信息错误！");
         }
     });
     document.getElementById("examQuestionpoolCategory").innerHTML=options;
 }*/

function isExamFromFromSubScribe(flag){
    if(flag==0){
        $("#viewSubScribeExam").hide();
    }else{
        $("#viewSubScribeExam").show();
    }
}

$(function(){
    $("#viewSubScribeExam").hide();
})

//添加试题时点击确定按钮后的操作
function addTrRecord(){
    var zuulServerUrl = $("#zuulServerUrl").val();
    var sectionName = $("#addTrSectionName").val().trim();
    var questionIdTest = $("#addTrquestionIdTest").val();
    var questionIdTestHtml = $("#addTrquestionIdTest option:selected").html();
    var itemTypeTest = $("#addTritemTypeTest").val();
    var itemTypeTestHtml = $("#addTritemTypeTest option:selected").html();
    if(sectionName==""){
        alert("请填写大项名称");
        return false;
    }
    if(itemTypeTest==""){
        alert("请选择试题类型");
        return false;
    }
    var itemQuantityTest = $("#addTritemQuantityTest").val().trim();
    if(itemQuantityTest==""){
        return false;
    }else {
        /*根据需求删除*/
        /* alert(questionIdTestHtml);*/
        var itemCount = questionIdTestHtml.substring(questionIdTestHtml.indexOf("(")+1,questionIdTestHtml.indexOf(")"));
        if(itemQuantityTest>Number(itemCount)){
            alert("题库数量不足，请重新设定！");
            return false;
        }
    }
    var isReturn = false;
    //判断题目数量是否超过该类型题目数量总数
    $.ajax({
        async :false,
        data: {'questionpoolId':$("#addTrquestionIdTest option:selected").val(),'quantity':itemQuantityTest,'type':itemTypeTest},
        url:zuulServerUrl+"/examserver/examApi/checkTestItemCount",
        type:"POST",
        success:function(data){//AJAX查询成功
            if(data=="failure"){
                alert("该题型题库数量不足，请重新设定！");
                isReturn = true;
            }
        }
    });
    if(isReturn){
        return false;
    }
    var itemScoreTest = $("#addTritemScoreTest").val().trim();
    if(itemScoreTest==""){
        alert("请填写试题分值");
        return false;
    }
    //查看是否已录该题库
    var isAddPool = $("#"+questionIdTest+"_"+itemTypeTest).length>0;
    if (isAddPool) {
        alert("该题库已添加，可直接修改数量");
        return false;
    }

    var trString = '<tr id="'+questionIdTest+'_'+itemTypeTest+'">'+
        '<td><input type="text"  name="sectionName" value="'+sectionName+'" />'+'</td>'+
        '<td><input type="hidden" name="itemTypeTest" value="'+itemTypeTest+'"/>'+itemTypeTestHtml+'</td>'+
        '<td><input type="hidden" name="questionIdTest" value="'+questionIdTest+'"/>'+questionIdTestHtml+'</td>'+
        '<td><input type="text"  name="itemQuantityTest" value="'+itemQuantityTest+'"  oninput="changeNumber(this)" /></td>'+
        '<td><input type="text"  name="itemScoreTest" value="'+itemScoreTest+'" oninput="changeNumber(this)" /></td>'+
        '<td><button type="button"  onclick="deleteThisTr(this)">删除</button></td>'+
        '</tr>';
    $("#itemBody").append(trString);
    $("#addTrSectionName").val("");
    $("#addTritemTypeTest").val("");
    $("#addTritemQuantityTest").val("");
    $("#addTritemScoreTest").val("");
    $(".add_exam").hide()
}
//发送表单前的验证
function checkForm(submitFlag){
    if($("#testTitle").val().trim()==""){//判断是否填写考试名称
        alert('请填写考试名称！');
    }else if($("#mins").val().trim()==""){//判断答题时间是否填写
        alert('请填写答题时间！');
    }else if($("#testScoreTest").val().trim()==""){//判断是否填写考试分值
        alert('请填写考试分值！');
    }else if($("#startdateTest").val().trim()==""){//判断考试开始时间
        alert('请选择考试开始时间！');
    }else if($("#duedateTest").val().trim()==""){//判断考试结束时间
        alert('请选择考试结束时间！');
    }else if ($("input[name='timelimitOneTest']:checked").val()==2 && ($("#customTime").val() == null || $("#customTime").val() == '')) {
        alert('请填写提交次数！');
    } else if(!isScoreEqual()){//判断设置分数与实际题目分数是否相等
        alert('当前设置试卷总分与实际设置题目分数不符，请检查！');
    }else{
        if(submitFlag == 1){//发布
            if(confirm('本次考试仅支持50人同时在线考试，是否确认发布考试？')){
                $('#testStatus').val(submitFlag);
                saveTest();
            }
        }else{//保存
            $('#testStatus').val(submitFlag);
            saveTest();
        }
    }
}


//验证当前题目总分是否和设定的分值相等
function isScoreEqual(){
    //当前考试设定的总分值
    var setScore = Number($("#testScoreTest").val());
    //当前选择的考试题的总分
    var totalScore = 0;
    //获取题目来源为题库
    var testFrom = $("input[name='testFrom']").val();
    //若题目来源为题库
    if(testFrom == 'question'){
        $("input[name='itemQuantityTest']").each(function (index,domEle){
            var number = domEle.value;
            var score = $("input[name='itemScoreTest']")[index].value;
            console.log('题目数量：'+number+'   '+'题目分数：'+score);
            totalScore += number*score;
        });
    }else if(testFrom == 'testpool'){
        //获取包含试卷库总分的文本字符串（  其格式为 “试卷库名称(试卷总分:分数)”  我们要获取的是分数)
        var title = $("#examQuestionpool").find("option:selected").text();
        var titleArray = title.split(":");
        var scoreArray = titleArray[titleArray.length-1].split(")");
        var score = scoreArray[0];
        totalScore = parseInt(score);
    }
    console.log('当前总分：'+totalScore);
    /*<![CDATA[*/
    if(setScore == totalScore && setScore != 0 && totalScore != 0){
        return true;
    }else{
        return false;
    }
    /*]]>*/
}

//自定义次数
function customTime(){
    var html = '<input type="text" id="customTime" name="customTime" style="margin-left: 20px;width:30px" onblur="writeTime()"/>';
    $("#customSpan").html(html);
}
//写入自定义次数
function writeTime(){
    var count = $("#customTime").val();
    // $("#timelimit2").val(count);
}
//提交一次
function oneTime(){
    $("#customTime").remove();
}

function add_btn1(){
    $(".add_exam").show()
}

function fause(){
    $(".add_exam").hide()
}

// 根据所选题库，判断可用题型
function getQuesType() {
    var zuulServerUrl=$("#zuulServerUrl").val();
    var quesPool = $("#addTrquestionIdTest").val();

    $.ajax({
        type:"POST",
        contentType:"application/json;charset=utf-8",
        dataType:"json",
        url:zuulServerUrl+'/examserver/questionPoolApi/getQuestionTypeByPoolId?questionPoolId='+quesPool,
        success:function (res) {
            console.log(res);
            var str='';
            $.each(res,function (index,item) {
                str+='<option value="'+ index +'">'+ item +'</option>'
            })
            $('#addTritemTypeTest').html(str);
        }
    })


}


layui.use(['laydate','layer'], function(){
    var laydate = layui.laydate,
        layer = layui.layer;

    //执行两个laydate实例，不要放在一个实例执行，会导致插件显隐问题
    laydate.render({
        elem: '#startdateTest', //指定元素
        type: 'datetime'//选择日期和时间
    });
    laydate.render({
        elem: '#duedateTest', //指定元素
        type: 'datetime'//选择日期和时间
    });
});

function back() {
    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.layer.close(index);
}