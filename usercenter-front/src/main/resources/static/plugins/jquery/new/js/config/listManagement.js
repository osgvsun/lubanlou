/**
 * Created by Administrator on 2017/7/31.
 */
//弹出黑名单新增弹框
function addPeopleToList(instrumentUid,remark){
    if(remark==3){
        var needAudit = $("#needAudit").val();
    }else{
       var needAudit = "";
    }
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '添加人员',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['1000px', '420px'],
            content: '../config/showAllUser?currpage=1&instrumentUid='+instrumentUid+"&remark="+remark+"&needAudit="+needAudit,
            end: function(){
                location.reload();
            }
        });
    });
}
//添加选中的人员
function addUser(remark){
    if(remark==3){
        var needAudit = $("#needAudit").val();
    }else{
        var needAudit = "";
    }
    var instrumentUid = $("#instrumentUid").val();
    var array=new Array();
    var flag; //判断是否一个未选
    $("input[name='CK_name']:checkbox").each(function() { //遍历所有的name为CK_name的 checkbox
        if ($(this).attr("checked")) { //判断是否选中
            flag = true; //只要有一个被选择 设置为 true
        }
    })

    if (flag) {
        $("input[name='CK_name']:checkbox").each(function() { //遍历所有的name为selectFlag的 checkbox
            if ($(this).attr("checked")) { //判断是否选中
                array.push($(this).val()); //将选中的值 添加到 array中
            }
        })
        //将要所有要添加的数据传给后台处理
        //window.location.href="${pageContext.request.contextPath}/tcoursesite/saveUserAuthority?authorityId="+${authority.id}+"&array="+array;
        $.ajax({
            url:"../config/saveUserToBlackList?instrumentUid="+instrumentUid+"&array="+array+"&remark="+remark+"&needAudit="+needAudit,
            //dataType:'json',
            type:'POST',
            success:function(){
                var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                parent.layer.close(index);//关闭弹窗
            }
        })
        //window.location.href="../instrument/saveUserToTraining?trainingUid="+trainingUid+"&array="+array;
    } else {
        alert("请至少选择一个学生");
    }
}
//保存人员到免审核名单
function saveInnerSameUserAudit(instrumentUid){
    //此处本来是选择导师还是实验室管理员还是设备管理员审核，通过取openRankResult的值达到相应审核目的
    // 现简化，免审核即最高的实验室管理员免审核
   // var rank=openRankResult.value;
    //设置rank=3
    var rank=3;
    var beginTime = "";
    var endTime = "";
    var needAudit = $("#needAudit").val();
    var array=new Array();
    if ($("#queryUserNumber").val()!=null && $("#queryUserNumber").val()!='') {
        array.push($("#queryUserNumber").val()); //将选中的值 添加到 array中
        $.ajax({
            url:"../config/saveUserToRankList?instrumentUid="+instrumentUid+"&array="+array+"&beginTime="+beginTime+"&endTime="+endTime+"&needAudit="+needAudit+"&rank="+rank,
            //dataType:'json',
            type:'POST',
            success:function(data){
                if(data == "success"){
                    window.location.href="../config/configListRankList?currpage=1&insUid="+instrumentUid+"&needAudit="+needAudit;
                }else if(data == "false"){
                    alert("该学生在黑名单中，不可添加！请从黑名单中删除该学生，方可添加！");
                }
            }
        })
    }else{
        alert("请至少选择一条记录");
    }
}
//保存人员到名单
function saveInnerSameUser(instrumentUid,remark){
    if(remark!=1)
        var rank="";
    //授权名单不需要免审核层级
    //var rank=openRankResult.value;
    if(remark==3){
        var needAudit = $("#needAudit").val();
    }else{
        var needAudit = "";
    }
    var array=new Array();
    if (remark == 1){//添加到黑名单
        if($("#reason").val()){
            var reason = $("#reason").val();
        }else{
            alert("请选择拉黑原因");
            return false;
        }
        if($("#disableTime").val()){
            var disableTime = $("#disableTime").val();
        }else{
            alert("请选择拉黑天数");
            return false;
        }
        layer.confirm('拉入黑名单后，该学生会被从其他名单移除', {
            btn: ['确定','取消'] //按钮
        }, function(){
            if ($("#queryUserNumber").val()!=null && $("#queryUserNumber").val()!='') {
                array.push($("#queryUserNumber").val()); //将选中的值 添加到 array中
                $.ajax({
                    url:"../config/saveUserToBlackList?instrumentUid="+instrumentUid+"&array="+array+"&reason="+reason+"&disableTime="+disableTime,
                    //dataType:'json',
                    type:'POST',
                    success:function(data){
                        if(data == "success"){
                            window.location.href="../config/configListBlackList?currpage=1&insUid="+instrumentUid;
                        }else if(data == "false"){
                            alert("该学生已在黑名单中，若您想修改拉黑时间请取消现有拉黑后，重新加入！");
                        }
                    }
                })
            }else{
                alert("请至少选择一条记录");
            }
        }, function(){

        });
    }else if (remark == 3){//保存到授权名单或免审核名单
        if($("#beginTime").val()){
         var beginTime = $("#beginTime").val();
         }else {
         alert("请选择开始时间！");
         return false;
         }
         if($("#endTime").val()){
         var endTime = $("#endTime").val();
         }else {
         alert("请选择结束时间！");
         return false;
         }
         if(beginTime > endTime){
         alert("开始时间不可大于结束时间！");
         return false;
         }
        if ($("#queryUserNumber").val()!=null && $("#queryUserNumber").val()!='') {
            array.push($("#queryUserNumber").val()); //将选中的值 添加到 array中
            $.ajax({
                url:"../config/saveUserToRankList?instrumentUid="+instrumentUid+"&array="+array+"&beginTime="+beginTime+"&endTime="+endTime+"&needAudit="+needAudit+"&rank="+rank,
                //dataType:'json',
                type:'POST',
                success:function(data){
                    if(data == "success"){
                        window.location.href="../config/configListRankList?currpage=1&insUid="+instrumentUid+"&needAudit="+needAudit;
                    }else if(data == "false"){
                        alert("该学生在黑名单中，不可添加！请从黑名单中删除该学生，方可添加！");
                    }
                }
            })
        }else{
            alert("请至少选择一条记录");
        }
    }else{//准入等级名单的添加
        //var rank = $("#rank").selected().val();
        var rank=openRankResult.value;
        if ($("#queryUserNumber").val()!=null && $("#queryUserNumber").val()!='') {
            array.push($("#queryUserNumber").val()); //将选中的值 添加到 array中
            $.ajax({
                url:"../config/saveUserToAuthList?instrumentUid="+instrumentUid+"&array="+array+"&rank="+rank,
                //dataType:'json',
                type:'POST',
                success:function(data){
                   if(data == "success"){
                       window.location.href="../config/configListAuthList?currpage=1&insUid="+instrumentUid;
                   }else if(data == "false"){
                       alert("该学生在黑名单中，不可添加！请从黑名单中删除该学生，方可添加！");
                   }
                }
            })
        }else{
            alert("请选择要添加的人员！");
        }
    }
}

//替换仪器的设备管理员
function saveInstrumentManageUser(insUid,type){
    if ($("#queryTeacherNumber").val()!=null && $("#queryTeacherNumber").val()!='') {
        var queryTeacherNumber=$("#queryTeacherNumber").val(); //将选中的值 添加到 array中
        //将要所有要添加的数据传给后台处理
        $.ajax({
            url:"../config/saveInstrumentManager?instrumentUid="+insUid+"&username="+queryTeacherNumber+"&type="+type,
            type:'POST',
            success:function(data){//AJAX查询成功
               window.location.reload();
            }
        });
        // window.location.href="../config/saveInstrumentManager?instrumentUid="+insUid+"&username="+queryTeacherNumber

    }else{
        alert("请至少选择一条记录");
    }
}

//修改仪器所在实验室
function changeInstrumentLabRoom(insUid){
        var labRoom=$("#labRoom").val();
        $.ajax({
            url:"../config/changeInstrumentLabRoom?instrumentUid="+insUid+"&labRoom="+labRoom,
            type:'POST',
            success:function(data){//AJAX查询成功
                alert("修改成功");
                window.location.reload();
            }
        });
}
function userBatchSelectForAuth(insUid) {
    var keywords=$("#userSelect").val();
    window.location.href="configListAuthList?insUid="+insUid+"&keywords="+keywords+"&currpage=1";
}
function userBatchDeleteForAuth(insUid) {
        var array=new Array();
        var str;
        var flag; //判断是否一个未选
        $("input[name='CK']:checkbox").each(function() { //遍历所有的name为selectFlag的 checkbox
            if ($(this).prop("checked")) { //判断是否选中
                flag = true; //只要有一个被选择 设置为 true
            }
        });
        if (flag) {
            $("input[name='CK']:checked").each(function() { //遍历所有的name为selectFlag的 checkbox
                array.push($(this).val()); //将选中的值 添加到 array中
            });
            str=array.join(",");
            $.ajax({
                url:"../config/configListAuthListDelete?insUid="+insUid+"&array="+str,
                type:'POST',
                dataType:"json",
                success:function(data){//AJAX查询成功
                    if(data == "success"){
                        alert("批量删除成功")
                        window.location.href="../config/configListAuthList?currpage=1&insUid="+insUid;
                    }
                }
            });
            //将要所有要添加的数据传给后台处理
        } else {
            alert("请至少选择一条记录");
        }
}