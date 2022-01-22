$(".editInsMaint").each(function(i,e){
    $(e).on("click",function(){
        $("#editForm").css("display","");
        var uid = $(e).attr('data');
        var insUid = $("#insUid").val();
        $.ajax({
            url:'../instrument/editInstrumentMaint?insUid='+insUid+'&uid='+uid,
            type:'POST',
            error:function (request){
                alert('请求错误!');
            },
            success:function(data){
                $("#item").val(data.item);
                $("#content").val(data.content);
                $("#price").val(data.price);
                $("#operator").find("option[value='"+data.operator+"']").attr("selected",true);
                var operatorText = $("#operator").find("option[value='"+data.operator+"']").text();
                $("#operator_chzn").find("a.chzn-single").find("span").text(operatorText);
                $("#startDate").val(data.startDate);
                $("#endDate").val(data.endDate);
                $("#uid").val($(e).attr('data'));
            }
        });
    })
})
function saveInstrumentMaint(flag){
    var insUid = $("#insUid").val();
    if($("#startDate").val( ) =="" ||$("#endDate").val( )=="" ){
            alert("请输入时间");
    }
    else if(CompareDate($("#startDate").val( ),$("#endDate").val( ))){
        alert("开始时间不小于结束时间");
    }else{
        $.ajax({
            url:'../instrument/saveInstrumentMaint?insUid='+ insUid +'&currpage=1',
            type:'POST',
            data:$('#editForm').serialize(),
            error:function (request){
                alert('请求错误!');
            },
            success:function(){
                window.location.href="../instrument/instrumentMaintList?insUid="+insUid+"&currpage=1";

            }
        });
    }

}
layui.use('form', function(){
    var form = layui.form;

    //监听提交
    form.on('submit(formDemo)', function(data){
        layer.msg(JSON.stringify(data.field));
        return false;
    });
});
layui.use('laydate', function(){
    var laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
        elem: '#startDate' //指定元素
    });
    laydate.render({
        elem: '#endDate' //指定元素
    });
});
function CompareDate(d1,d2)
{
    return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
}
function check(form) {
    var start=form.startDate;
    var end=form.endDate;
    if(start.value==''||end.value=='') {
        alert("请输入时间");
        form.startDate.focus();
        return false;
    }
    if(CompareDate(start.value,end.value)){
        alert("开始时间不小于结束时间");
        form.startDate.focus();
        return false;
    }
    return true;
}

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
    //LODOP.SET_SAVE_MODE("QUICK_SAVE",true);//快速生成（无表格样式,数据量较大时或许用到）
    LODOP.SET_SHOW_MODE("NP_NO_RESULT",true);  //解决chrome弹出框问题
    LODOP.SAVE_TO_FILE("报表.xls");
};
//导出excel文件
function SaveAsFile(){
    LODOP=getLodop();
    LODOP.PRINT_INIT("");

    var strBodyStyle="<style>table,th{border:none;height:18px} td{border: 1px solid #000;height:18px}</style>";
    strHTML=strBodyStyle + "<table border=0 cellSpacing=0 cellPadding=0  width='100%' height='200' bordercolor='#000000' style='border-collapse:collapse'>";
    strHTML=strHTML + "<thead><tr>";
    //定义标题内容
    strHTML=strHTML + "<th colspan=26><b><font face='黑体' size='6'>报表</font></b></th></tr>";
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
//	LODOP.SET_SAVE_MODE("QUICK_SAVE",true);//快速生成（无表格样式,数据量较大时或许用到）
    LODOP.SAVE_TO_FILE("月报报表.xls"); //文件名
};

//不通过插件导出
function SaveAsFileNew(){
    $("#searchForm").attr("action","../instrument/exportListInstrumentMaint");
    $("#searchForm").submit();
}
