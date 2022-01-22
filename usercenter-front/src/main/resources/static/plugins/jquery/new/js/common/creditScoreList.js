$(".editCreditScore").each(function(i,e){
    $(e).on("click",function(){
        $("#editForm").css("display","");
        var uid = $(e).attr('data');
        $.ajax({
            url:'../common/editCreditScore?uid='+uid,
            type:'POST',
            error:function (request){
                alert('请求错误!');
            },
            success:function(data){

                $("#deductionItem").val(data.deductionItem);
                $("#score").val(data.score);
                $("#centerId").val(data.centerId);
                $("#number").val(data.number);
                $("#ctype").val(data.ctype);
                //刷新ui
                $("#centerId").selectpicker('refresh');
                $("#academyNumber").find("option[value='"+data.academyNumber+"']").attr("selected",true);
                var operatorText = $("#academyNumber").find("option[value='"+data.academyNumber+"']").text();
                $("#academyNumber_chzn").find("a.chzn-single").find("span").text(operatorText);
                $("#info").val(data.info);
                $("#uid").val($(e).attr('data'));
            }
        });
    })
})
$(".newCommonConfigCreditScore").click(function(){
    var type = $(this).attr("data");
    //多窗口模式，层叠置顶
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '查看详情'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../common/newCommonConfigCreditScore?type='+type


        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
        ,end:function () {
            if(type == 2){
                window.location.href="../common/creditScoreList?currpage=1";
            }else{
                window.location.href="../common/creditScoreListForS?currpage=1";
            }
        }
    });
    layer.full(win);
})
var LODOP; //声明为全局变量
//导出excel文件
function SaveAsFileOld(){
    LODOP=getLodop();
    LODOP.PRINT_INIT("");
    //alert($("#myShow").html());
    LODOP.ADD_PRINT_TABLE(0,0,"100%","100%",$("#myShow").html());
    LODOP.SET_SAVE_MODE("Orientation",2); //Excel文件的页面设置：横向打印   1-纵向,2-横向;
    LODOP.SET_SAVE_MODE("PaperSize",9);  //Excel文件的页面设置：纸张大小   9-对应A4
    LODOP.SET_SAVE_MODE("Zoom",90);       //Excel文件的页面设置：缩放比例
    LODOP.SET_SAVE_MODE("CenterHorizontally",true);//Excel文件的页面设置：页面水平居中
    LODOP.SET_SAVE_MODE("CenterVertically",true); //Excel文件的页面设置：页面垂直居中
//		LODOP.SET_SAVE_MODE("QUICK_SAVE",true);//快速生成（无表格样式,数据量较大时或许用到）
    LODOP.SET_SHOW_MODE("NP_NO_RESULT",true);  //解决chrome弹出框问题
    LODOP.SAVE_TO_FILE("月报报表.xls");
};
//导出excel文件
function SaveAsFile(){
    LODOP=getLodop();
    LODOP.PRINT_INIT("");

    var strBodyStyle="<style>table,th{border:none;height:18px} td{border: 1px solid #000;height:18px}</style>";
    strHTML=strBodyStyle + "<table border=0 cellSpacing=0 cellPadding=0  width='100%' height='200' bordercolor='#000000' style='border-collapse:collapse'>";
    strHTML=strHTML + "<thead><tr>";
    //定义标题内容
    strHTML=strHTML + "<th colspan=26><b><font face='黑体' size='6'>月报报表</font></b></th></tr>";
    strHTML=strHTML + "<tr><th colspan=26>&nbsp;</th>";
    strHTML=strHTML + "</th></tr>";
    strHTML=strHTML + "<tr><th colspan=26><div align='right'>制表人：${user.cname}   制表时间：${systemTime} </div> </th>";
    strHTML=strHTML + "</th></tr>";

    var abc =  document.getElementById('printform').innerHTML;//printform是所要打印的表的名字
    abc = abc.replace("<table>","");
    abc = abc.replace("<thead>","");
    abc = strHTML + abc  + "</table>";
    LODOP.ADD_PRINT_TABLE(100,20,1100,80,abc);
    LODOP.SET_SAVE_MODE("Orientation",2); //Excel文件的页面设置：横向打印   1-纵向,2-横向;
    LODOP.SET_SAVE_MODE("PaperSize",9);  //Excel文件的页面设置：纸张大小   9-对应A4
    LODOP.SET_SAVE_MODE("Zoom",90);       //Excel文件的页面设置：缩放比例
    LODOP.SET_SAVE_MODE("CenterHorizontally",true);//Excel文件的页面设置：页面水平居中
    LODOP.SET_SAVE_MODE("CenterVertically",true); //Excel文件的页面设置：页面垂直居中
//		LODOP.SET_SAVE_MODE("QUICK_SAVE",true);//快速生成（无表格样式,数据量较大时或许用到）
    LODOP.SAVE_TO_FILE("月报报表.xls"); //文件名

};


//打印预览
function printPreview(){
    LODOP=getLodop();
    var strStyleCSS = "<link type='text/css' rel='stylesheet' href='${pageContext.request.contextPath}/css/style.css'>";
    strStyleCSS +="<link rel='stylesheet' type='text/css' href='${pageContext.request.contextPath}/css/timetable/lmsReg.css'>";
    var strHtml = strStyleCSS+"<body>"+$("#myShow").html()+"</body>";
    LODOP.PRINT_INIT("");
    LODOP.SET_PRINT_STYLE("FontSize",18);  //字体大小
    LODOP.SET_PRINT_STYLE("Bold",1);  //是否粗体，1是，0否
    LODOP.ADD_PRINT_HTM(30,30,"RightMargin:30","BottomMargin:50",strHtml);
    LODOP.PREVIEW();
}

$('#myPrint').click(function(){
    //  printPreview();
    $('#myShow .tcol').css("display","none");
    $("#myShow").jqprint();
    $('#myShow .tcol').css("display","");
});

//不通过插件导出
function SaveAsFileNew(){
    $("#searchForm").attr("action","../common/exportListCommonTeam");
    $("#searchForm").submit();
}
function saveCommonTeam(flag) {
    //var insUid = $("#uid").val();
    $.ajax({
        url: '../commonteam/saveCommonTeam?currpage=1',
        type: 'POST',
        data: $('#editForm').serialize(),
        error: function (request) {
            alert('请求错误!');
        },
        success: function () {
            window.location.href = "../common/commonTeamList?currpage=1";

        }
    });
}
