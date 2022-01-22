//# sourceURL=startExam.js
var contextPath = $("meta[name='contextPath']").attr("content");


function confirmStartExam(examId){
    //先判断当前登录人是否还有考试次数
    var flag=false
    $.ajax({
        async :false,
        data: {'examId':examId},
        url: contextPath+"/exam/isExamCanAnswer",
        type:"POST",
        success:function(data) {
            flag=data;
        }
    });
    if(flag){
        var examUrl=contextPath + '/exam/startExam?simulation='+0+'&examId='+examId;
        layer.open({
            type: 1 //Page层类型
            ,area: ['500px', '600px']
            ,title: '考试须知'
            ,shade: 0.6 //遮罩透明度
            ,maxmin: true //允许全屏最小化
            ,anim: 1 //0-6的动画形式，-1不开启
            ,content: '<div style="padding:50px;">' +
            '1、考生必须自觉服从监考员等考试工作人员管理，不得以任何理由妨碍监考员等考试工作人员履行职责，不得扰乱考场及其他考试工作地点的秩序。\n' +
            '\n<br>' +
            '2、考生凭准考证、身份证，按规定时间和准考证上各科目的考试试室、座位号参加考试。\n' +
            '\n<br>' +
            '3、考生入场，除2B铅笔、书写黑色字迹的钢笔或签字笔、直尺、圆规、三角板、橡皮、手表外，其他任何物品不准带入考试室。高中起点本、专科《数学》考试，可使用没有存储记忆功能的计算器。严禁携带各种无线通讯工具（如寻呼机、移动电话、无线耳机）、电子存储记忆录放设备以及涂改液、修正带等物品进入试室。严禁穿制服进入试室参加考试。考试室内不得自行传递工具、用品等。\n' +
            '\n<br>' +
            '4、考生应在每科开考前20分钟（第一科前移10分钟）凭准考证、有效证件（身份证、现役军人身份证件）进入试室，对号入座，入座后将准考证、身份证等有效证件放在桌面靠走道边上角，以便让监考员核验。考生领到答题卡、条形码和试卷后，须认真核对答题卡的张数，核对条形码上的姓名、考生号与自己准考证上的信息是否一致。如不一致，应向监考员提出更换。在规定的时间内用黑色字迹的签字笔或钢笔准确清楚地填写答题卡上的姓名、考生号、试室号、座位号，用2B铅笔在答题卡上根据所发试卷准确填涂试题类型（A或B），并将条形码横贴在答题卡右上角的“条形码粘贴处”栏框内。凡漏填、错填、全填或字迹不清的答卷、答题卡无效。\n' +
            '\n<br>' +
            '5、开考信号发出后才能开始答题。\n' +
            '\n<br>' +
            '6、开考15分钟后禁止迟到考生进入考场、试室，离每科考试结束前30分钟，方可交卷出场，交卷出场后不得再进入试室，也不准在考场附近逗留或交谈。\n' +
            '\n<br>' +
            '7、考生在答题卡规定的区域答题。选择题用2B铅笔在选择题答题区作答，非选择题用黑色字迹钢笔或签字笔作答。不准用规定以外的笔和纸答题，不准在答卷、答题卡上做任何标记，否则答题卡无效。考生不准随意修改答题卡上的题号，考生必须在指定的题号里作答。凡不在指定答题题号框内作答、超出答题区域作答或擅自更改题号作答，其答案一律无效。如果解答中有画表或辅助线，先用铅笔进行画线、绘图，再用黑色字迹的签字笔或钢笔描黑。\n' +
            '\n<br>' +
            '8、在考场内须保持安静、不准吸烟，不准喧哗，不准交头接耳、左顾右盼、打手势、做暗号，不准夹带、旁窥、抄袭或有意让他人抄袭，不准传抄答案或交换试卷、答题卡，不准将试卷、答题卡或草稿纸带出试室。\n' +
            '\n<br>' +
            '9、遇试卷分发错误及试题字迹模糊等问题，可举手询问；涉及试题内容的疑问，不得向监考人员询问。\n' +
            '\n<br>' +
            '10、考试终了信号发出后，立即停笔，根据监考员指令依次退出试室，不准在试室逗留。<br>' +

            '<div style="text-align: center;margin-top: 8px"><button style="background-color: red"><a href='+examUrl+'><span style="color:white;font-size: 14">开始考试</span></a></button></div>' +
            '</div>'
        });
    }else{
        alert("没有更多作答次数");
    }


}

// //考试页面下一页
function next(toPage){
    //将其他的也隐藏
    //获取cookie中的值
    var currpage=$.cookie('currPage');
    $("#page"+currpage).hide();
    $("#page"+toPage).show();
    $.cookie('currPage',toPage);
    var page=parseInt(currpage)-1;
    var page2=parseInt(toPage)-1;
    $(".page span:eq("+page+")").attr("class","");
    $(".page span:eq("+page2+")").addClass("page_current");
    //将位置定位到当前页的第一道题目

    // var page=$("#currPage").val();
    // var contextPath = $("meta[name='contextPath']").attr("content");
    // var saveExamUrl=contextPath+'/exam/saveTAssignmentItemMapping?page=';
    // saveExamUrl=saveExamUrl+page+'&toPage='+toPage;
    // //获取当前页的答题记录
    // //获取当前页面未作答的题目的数量
    // var countNumber = 0;
    // //获取当前页还有多少题目没有做
    // $(".answer").each(function(i,value){
    //     //判断单选，多选，对错题是否已回答
    //     countNumber +=$(this).find("input:checked").size();
    //     //判断填空题是否已回答
    //     $(this).find("input[type='text']").each(function(i,obj){
    //         if ($(this).val().trim()!="") {
    //             countNumber++;
    //         }
    //     })
    // })
    // //var record=$.cookie(page);
    // //曾经保存过这个也页面的记录 更新记录
    // $.cookie('record'+page, countNumber);
    // //判断用户点击的是否就是当前页
    // if(page==toPage){
    //     return false;
    // }
    // document.myForm.action=saveExamUrl;
    // $('#submitTime').val(0);
    // document.myForm.submit();
}
//提交考试
function submitExam(examId,isAutoSubmit){
    // var actionUrl='../exam/saveTAssignmentItemMapping?page=';
    // var page=$("#currPage").val();
    // actionUrl=actionUrl+page+'&toPage=-1';
    // saveExam();

    //判断是否是自动提交的考试
    if(isAutoSubmit==0){
        saveExam();
        return true;
    }
    // var countNumber = 0;
    // //获取当前页还有多少题目没有做
    // $(".answer").each(function(i,value){
    //     //判断单选，多选，对错题是否已回答
    //     countNumber +=$(this).find("input:checked").size();
    //     //判断填空题是否已回答
    //     $(this).find("input[type='text']").each(function(i,obj){
    //         if ($(this).val().trim()!="") {
    //             countNumber++;
    //         }
    //     })
    // })
    var totalRecords=$("#totalRecords").val();
    // //获取未标记的题目的数量
    var countNumber=$('#questionindex.tdcurrent').length;
    var restItem=totalRecords-countNumber;
    if(confirm('剩余'+restItem+'道尚未作答，是否提交？')){
        //将提交按钮设置为不可用
        // $("#submitBtn").attr("disabled", true);
        saveExam();
        return true;
    }else{
        return false;
    }
}

function saveExam(){
    var zuulServerUrl=$("#zuulServerUrl").val();
    var assignmentId=$("#assignmentId").val();
    var username=$("#username").val();
    var submitTime=$("#submitTime").val();
    var answers=new Array();
    $("input[type='radio']:checked").each(function(j,item){
        answers.push(item.value)
    });
    $("input[type='checkbox']:checked").each(function(i,item){
        answers.push(item.value)
    });
    var arr = new Object();
    arr.assignmentId = assignmentId;
    arr.submitTime = submitTime;
    arr.username = username;
    arr.answers = answers;
    // arr.answerTexts = ;
    var data = JSON.stringify(arr);
    alert("参数："+data);
    $.ajax({
        type: 'POST',
        async: false,
        url: zuulServerUrl+'/examserver/examApi/submitExam',
        contentType:"application/json;charset=utf-8",
        dataType:"json",
        data:data,
        success: function(res) {
            // window.location.reload();
             window.location.href=contextPath +"/questionPool/showExamResult?examId="+res;
            //window.location.href="${pageContext.request.contextPath}/questionPool/showExamResult?examId="+res;
        },
    });
}

var storage=window.localStorage;;
var initData = {};
var formData = {};
//存入storage
function set(k,v,t){
    var _this = this;
    if(typeof(_this) == "object"&& Object.prototype.toString.call(_this).toLowerCase() == "[object object]" && !_this.length)
    {
        _this[k] = {'value':v,'time':t};
        storage.setItem('questions',$.toJSON(formData));
    }
}
//清除storage
function clearStorage()
{
    storage.removeItem('questions');
}

function batmark(rel,value) {
    if(value && value != '')
    {
        if(!$('#itemindex'+rel).hasClass("tdcurrent"))$('#itemindex'+rel).addClass("tdcurrent");
    }
    else
        $('#itemindex'+rel).removeClass("tdcurrent");

}
//做题标记
function markQuestion(rel,isTextArea) {
    var t = 0;
    var f = false;

    try
    {
        f = $('#myForm :input[rel='+rel+']');
    }catch(e)
    {
        f = false;
    }
    if(!f)return false;
    //简答题 填空题
    if(isTextArea)
    {

        var nameV='answertexts'+rel;
        $('#myForm :input[name='+nameV+']').each(
            function(){
                if($(this).val()!=''){
                    t++;
                }
            }
        )
        if($('#myForm :input[rel='+rel+']').val() && $('#myForm :input[rel='+rel+']').val() != '' && $('#myForm :input[rel='+rel+']').val() != '<p></p>')t++;
    }
    else
        $('#myForm :input[rel='+rel+']').each(function(){if($(this).is(':checked') && $(this).val() && $(this).val() != '' && $(this).val() != '<p></p>')t++;});
    if(t > 0)
    {
        if(!$('#itemindex'+rel).hasClass("tdcurrent"))$('#itemindex'+rel).addClass("tdcurrent");
    }
    else
    {
        $('#itemindex'+rel).removeClass("tdcurrent");
    }
}
//题目跳转
function gotoquestion(itemId,index) {
    //获取当前页
    var currPage=$.cookie('currPage');
    //当前页是本页
    if(currPage!=index){
        //修改cookie中的当前页
        $.cookie('currPage',index);
        //移除和添加选中效果
        var page=parseInt(currPage)-1;
        var page2=parseInt(index)-1;
        $(".page span:eq("+page+")").attr("class","");
        $(".page span:eq("+page2+")").addClass("page_current");
        //将当前页隐藏 秀出要跳转的页
        $("#page"+currPage).hide();
        $("#page"+index).show();
    }
    location.href = "#"+itemId;
}

//定时任务
function saveanswer(){
    $.ajax({
        async :false,
        url: contextPath+"/examApi/saveanswer",
        type:"POST",
        success:function(data){//AJAX查询成功
        }
    });
}
function saveExamResult() {
    var examId=$("#examId").val();
    var username=$("#username").val();
    var score=$("#score").val();
    $.ajax({
        type: 'POST',
        async: false,
        url: '../exam/saveExamResult?examId='+examId+"&username="+username+"&score="+score,
        success: function(data) {
            var index=parent.layer.getFrameIndex(window.name);
            parent.layer.close(index);
            window.parent.location.reload();
        },
    });
}
//# sourceURL=startExam.js