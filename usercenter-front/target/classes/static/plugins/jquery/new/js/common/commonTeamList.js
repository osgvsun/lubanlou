function getLeaderMail(){
    var teamLeader = $('#teamLeader1').val();
    $.ajax({
        type: 'post',
        dataType:"text",
        async: false,
        url: '../commonteam/getLeaderMail?teamLeader='+teamLeader,
        success: function(data) {
            $("#leaderMail").val(data);
        }
    });
}
$(".editCommonTeam").each(function(i,e){
    $(e).on("click",function(){
        //$("#editForm").css("display","");
        var uid = $(e).attr('data');
        $.ajax({
            url:'../commonteam/editCommonTeam?uid='+uid,
            type:'POST',
            error:function (request){
                alert('请求错误!');
            },
            success:function(data){

                $("#teamNumber").val(data.teamNumber);
                $("#teamName1").val(data.teamName);
                $("#price").val(data.price);
               //$("#teamLeader1").find("option[value='"+data.teamLeader+"']").attr("selected",true);
                //var operatorText = $("#teamLeader1").find("option[value='"+data.teamLeader+"']").text();
                //$("#teamLeader1_chzn").find("a.chzn-single").find("span").text(operatorText);
                $("#type").find("option[value='"+data.type+"']").attr("selected",true);
                var operatorText = $("#type").find("option[value='"+data.type+"']").text();
                $("#type_chzn").find("a.chzn-single").find("span").text(operatorText);
                $("#number").val(data.number);
                $("#uid").val($(e).attr('data'));
                var $editForm = $("#editForm").clone();
                $editForm.addClass(uid);
                $editForm.attr("id","editForm"+uid);
                $editForm.find("form").attr("id","commonTeam"+uid);
                $editForm.find(".teamNumber").addClass("teamNumber"+uid);
                $editForm.find(".teamName1").addClass("teamName1"+uid);
                $editForm.find(".type").addClass("type"+uid);
                $editForm.find("#teacherLeader").addClass("teamLeader"+uid);
                $editForm.find("form").attr("name","commonTeam"+uid);
                $editForm.find("#teacherLeader").attr("onclick","searchLeader()");
                $editForm.find("#teacherLeader").addClass("leader");
                var saveStr = "<i class=\"fa fa-save submitedit saveForm ml10\" data=\""+uid+"\" onclick=\"submitEditForm2(&quot;"+uid+"&quot;,&quot;"+data.teamNumber+"&quot;)\"></i>";
                var cancelStr ="<i class=\"fa fa-trash-o canceledit ml10 \" data=\""+uid+"\" onclick=\"cancelEdit2(&quot;"+uid+"&quot;)\"></i>";
                $editForm.find(".btn-function").find(".saveForm").remove();
                $editForm.find(".btn-function").find(".fa-trash-o").remove();
                $editForm.find(".btn-function").append(saveStr);
                $editForm.find(".btn-function").append(cancelStr);
                $("#"+uid).after($editForm);
                //$("#editForm").css("display","none");
                $("."+uid).css('display',"");
                $editForm.find(".bootstrap-select").remove();
                $(".selectpicker").selectpicker("render");
                $(".selectpicker").selectpicker("refresh");
                $("#teamNumber").val("");
                $("#teamName1").val("");
                $("#uid").val("");
                $("#type").val("");
                $(".selectpicker").selectpicker("refresh");
            }
        });
    })
})
$("#editForm .submitedit").on("click",function () {
   var uid = $(this).attr("data");
    document.getElementById("commonTeam"+uid).submit();

});
$("#editForm .canceledit").on("click",function () {
    var uid = $(this).attr("data");
    $("."+uid).css("display","none");

});
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
    $("#searchForm").attr("action","../commonteam/exportListCommonTeam");
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
            window.location.href = "../commonteam/commonTeamList?currpage=1";

        }
    });
}
function submitEditForm2(uid,teamNumberOld) {
    //document.getElementById("commonTeam"+uid).submit();
    var teamNumber = $(".teamNumber"+uid).val();
    var teamName1 = $(".teamName1"+uid).val();
    var type = $(".type"+uid).val();
    var teamLeader = $(".teamLeader"+uid).val();
    var myData = {
        "uid":uid,
        "teamNumber":teamNumber,
        "teamName1":teamName1,
        "type":type,
        "teamNumberOld":teamNumberOld,
        "teamLeader":teamLeader
    }
    $.ajax({
        url:"../commonteam/saveCommenTeamAjax",
        type:"POST",
        data:myData,
        success:function(data){//AJAX查询成功
            if (data == "haveTeamByNumber"){
                alert("该课题组编号已存在!");
            }else {
                alert("保存成功!");
                window.location.reload();
            }
        }
    })
}
function recharge(uid){
        $('#external-frame', window.parent.document).height(700)
        layer.ready(function(){
            layer.open({
                type: 2,
                title: '充值',
                fix: true,
                maxmin:true,
                shift:-1,
                closeBtn: 1,
                shadeClose: true,
                move:false,
                maxmin: false,
                area: ['540px', '400px'],
                content: '../commonteam/recharge?uid='+uid,
                end: function(){
                    // window.location.href="../commonteam/commonTeamListManage?currpage=1";
                    window.location.reload();
                }
            });
    });
}
// 保存预存金额或信誉额度充值信息
function saveRecharge(uid){
    var creditLimit=$("#creditLimit").val();
    var prestore=$("#prestore").val();
    if (creditLimit == '' && prestore == '') {
        alert("请输入您需要充值的额度")
        return false;
    }
    var myData={
        'creditLimit' :creditLimit ,
        'prestore' : prestore,
        'uid':uid,
    }
    $.ajax({
        url:'../commonteam/saveRecharge',
        type: 'POST',
        async: false,
        data: myData,
        success: function (data) {
            if(data=='success')
            {
                alert("保存设置成功")
                // window.parent.close();
                var index=parent.layer.getFrameIndex(window.name);
                parent.layer.close(index);
            }
        }
    });
}

function invalidMoney(money){
    var rg = /^(?!0+(\.0+)?$)\d+(\.\d+)?$/;
    return rg.test(money);
}
function rechargeAjax(uid,money){
    if(!invalidMoney(money)){
        alert("输入金额有误！");
    }
    var myData={
        "uid":uid,
        "money":money
    };
    $.ajax({
        url:"../commonteam/reCharge",
        type:"POST",
        data:myData,
        success:function(){//AJAX查询成功
           alert("充值成功！");
           window.location.reload();
        }
    });
}


