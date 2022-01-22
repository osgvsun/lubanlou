/**
 * Created by 魏好 on 2017/12/12.
 */
//新建获奖
function newCommonAward() {
    var currpage = $("#currpage").val();
    layer.ready(function () {
        layer.open({
            type: 2,
            title: '',
            fix: true,
            maxmin: true,
            shift: 5,
            shadeClose: false,
            move: false,
            maxmin: false,
            area: ['540px', '600px'],
            content: '../commonTeamAchieve/newCommonAward',
            end: function () {
                window.location.href = "../commonTeamAchieve/commonAwardList?currpage=" + currpage;
                //查询后的数据，新建就没必要带查询条件
                //targetUrl('../commonTeamAchieve/commonAwardList?currpage='+currpage);
            }
        });
    });
}

//编辑获奖
function editCommonAward(uid) {
    var currpage = $("#currpage").val();
    var insUid = $("#insUid").val();
    layer.ready(function () {
        layer.open({
            type: 2,
            title: '',
            fix: true,
            maxmin: true,
            shift: 5,
            shadeClose: false,//点击窗口外不关闭
            move: false,
            maxmin: false,
            area: ['540px', '600px'],
            content: '../commonTeamAchieve/editCommonAward?uid=' + uid,
            end: function () {
                //window.location.href = "../commonTeamAchieve/commonAwardList?currpage=" + currpage;
                //查询后的数据
                targetUrl('../commonTeamAchieve/commonAwardList?currpage='+currpage);

            }
        });
    });
}

function saveCommonAward() {
    if(judgeAwardData()<0){
        //有不符合条件的数据就不增加了
        return ;
    }else{
        //保存多个人员，用,号隔开
        var winners = "";
        var WinnerArr = $("#addAwardWinner>p");
        for(var i=0;i<WinnerArr.length;i++){
            if(i==WinnerArr.length-1){
                winners += WinnerArr[i].attributes.id.value;
            }else{
                winners += WinnerArr[i].attributes.id.value+","
            }
        }
        //设置到表单里的隐藏input里一起提交
        $("#winners").val(winners);
        //保存多个设备，和上面一样；
        var devices = "";
        var DeviceArr = $("#addAwardDevice>p");
        for(var i=0;i<DeviceArr.length;i++){
            //取-后的设备id号；
            var str = DeviceArr[i].attributes.id.value;
            var deviceUid = str.split("-")[1];
            console.log(deviceUid+" deviceUid");
            if(i==DeviceArr.length-1){
                devices += deviceUid;
            }else{
                devices += deviceUid+","
            }
            console.log(devices+" devices");//可以
        }
        $("#devices").val(devices);
        //加载动画
        var index = layer.load(2);
        $.ajax({
            type: "POST",
            url: '../commonTeamAchieve/saveCommonAward',
            data: $("#searchForm").serialize(),//表单数据
            dataType: "json",
            success: function (data) {
                if (data == "success") {
                   //关闭加载动画
                   layer.close(index);
                   layer.alert("保存成功", { icon: 1 , closeBtn: 0 },function(){
                       var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                       parent.layer.close(index);//关闭弹窗
                   });
                }
            }
        });
    }
}
$(function(){
    //第一次进也要加载获奖人员
    changeTeamAjax();
})
//切换课题组时切换重新载入获奖成员。并删除掉已经添加的成员。
function changeTeam() {
    //如果里面有p的话就提示
    if($("#addAwardWinner>p").length>0){
        layer.tips("切换课题组会清空已选择的人员哦","#teamNameSelect",{tips:[2,'#3595CC']});
    }
    $("#addAwardWinner").empty();
    //第一个进和下拉框改变 分开
    changeTeamAjax();
}
function changeTeamAjax(){
    var teamUid = $("#teamNameSelect").val();
    $.ajax({
        type: "POST",
        url: '../commonTeamAchieve/changeTeam',
        data: {teamUid: teamUid},
        dataType: "json",
        success: function (data) {
            /*<!--<p class="posRw50p"><span>人员的姓名</span><input style="display:none" value="人员的id"/><a href="javascript:void(0)" class="posAr0" title="删除">✘</a></p>-->*/
            /*<p class="posRw50p"><span>张三是是是</span><input style="display:none" value="人员的id"/><a href="javascript:void(0)" class="posAr0" title="删除">✘</a></p>*/
            /*<p class="posRw50p"><span>'+j[3]+'</span><input style="display:none" value="'+j[0]+'"/><a href="javascript:void(0)" onclick="removeWinner('+j[0]+')" class="posAr0" title="删除">✘</a></p>';*/
            //console.log(data);
            $("#awardWinner").empty();
            for (i in data) {
                //console.log(data[i])
                var j = data[i];
                //console.log(j[0])
                //为[2]是用户的id，方便查询。
                var winnerOption = '<option value="' + j[2] + '">' + j[3] + '</option>'
                $("#awardWinner").append(winnerOption);
            }
        }
    });
}
//将下拉框里的成员显示到下拉框下。相同成员不能加。
function addWinner() {
    var winnerUid = $("#awardWinner").val();
    //var obj = document.getElementById("awardWinner")
    var winnerName = $("#awardWinner option:selected").text();//obj.options[obj.selectedIndex].text;
    console.log(winnerUid + "【22】" + winnerName);
    var winnerOption = '<p class="posRw50p" id="'+winnerUid+'"><span>' + winnerName + '</span>' ;
    /*现在查询的是p标签里的id了就不需要隐藏的input <input style="display:none" value="' + winnerUid + '"/>*/
    var WinnerArr = $("#addAwardWinner>p");
        winnerOption += '<a href="javascript:void(0)" onclick="removeWinner(&quot;'+winnerUid+'&quot;)" class="posAr0" title="删除">✘</a></p>';
    //判断没有添加过再添加
    var winnerInnerHTML = $("#addAwardWinner").html();
    if (winnerUid == null || winnerUid == '') {
        layer.msg("格式错误",{time:1000});
    } else {
        //var index = winnerInnerHTML.indexOf(winnerUid);
        var index = -1;
        //var WinnerArr = $("#addAwardWinner>p");
        for(var i=0;i<WinnerArr.length;i++){
          if(winnerUid==WinnerArr[i].attributes.id.value){
              index=0;
              break;//有相同就退出
          }
        }
        if (index == -1) {
            $("#addAwardWinner").append(winnerOption);
        } else {
            layer.msg("人员已添加", {time: 1000});
        }
    }
}

//删除选择好的成员。
function removeWinner(winnerUid) {
    console.log(winnerUid)
    $("#"+winnerUid).remove();
    layer.msg("删除人员成功",{time:1000})
}

/*下面是选择关联设备*/
$(function(){
    //设置判断是否选择下拉框里的值的值；
    //0 已选择。-1 未选择
    flag = -1;//无 var 全局
    //输入框值改变事件
    $("#awardDevice").bind("input propertychange",function(){
        //改变就设置成-1；
        flag = -1;
    })
})

//输入框值改变就将flag=-1
function InputChangeFlag(){
    flag = -1;
}
//选择下拉列表里的值就为flag = 0;
function SelectChangeFlag(){
    flag = 0;
}
//将下拉框里的设备显示到下拉框下。相同设备不能加。
function addDevice() {
    //判断是否选择下拉框里的值
    if(flag==-1){
        layer.tips("请选择下拉列表里的设备","#awardDevice",{tips:[1,'#3595CC'],time:1000});
    }else{
        var deviceName = $("#awardDevice").val();
        console.log(deviceName+"[[2");
        var winnerOption = '<p class="posRw50p" id="'+deviceName+'"><span>' + deviceName + '</span>' ;
        var WinnerArr = $("#addAwardDevice>p");
        winnerOption += '<a id="'+(WinnerArr.length+1)+'" href="javascript:void(0)" onclick="removeDevice(&quot;'+(WinnerArr.length+1) +'&quot;)" class="posAr0" title="删除">✘</a></p>';
        //判断没有添加过再添加
        if (deviceName == null || deviceName == '') {
            layer.msg("格式错误",{time:1000});
        } else {
            var index = -1;
            //var WinnerArr = $("#addAwardDevice>p");
            for (var i = 0; i < WinnerArr.length; i++) {
                console.log(deviceName + " " + WinnerArr[i].attributes.id.value);
                if (deviceName == WinnerArr[i].attributes.id.value) {
                    index = 0;
                    break;//有相同就退出
                }
            }
            if (index == -1) {
                $("#addAwardDevice").append(winnerOption);
                //$("#awardDevice").val("");//添加完成后清空输入框的值
                //增加后不用flag设置成-1;因为有输入框值改变事件
                //flag = -1;
            } else {
                layer.msg("设备已添加", {time: 1000});
            }
        }
    }
}

//删除选择好的设备。
function removeDevice(deviceName) {
    console.log(deviceName+" deviceName")
    $("#"+deviceName).parent().remove();
    layer.msg("删除设备成功",{time:1000})
}
//效验方法
function judgeAwardData(){
    var isNum = 0;
    var judgeFlag = 0;
    judgeFlag = judegNull("请选择课题组","teamNameSelect",isNum);
    judgeFlag = judgeFlag+judegNull("请输入获奖名称","awardName",isNum);
    judgeFlag = judgeFlag+judegNull("请选择获奖日期","awardDate",isNum);
    judgeFlag = judgeFlag+judegNull("请输入备注","remarks",isNum);
    judgeFlag = judgeFlag+judegNull("请添加附件","attach",isNum);
    judgeFlag = judgeFlag+judegNull("请输入课题名称","teamProject",isNum);
    //将<1的判断显示和null写在一起，不然两个tips层不会显示。
    judgeFlag = judgeFlag+judegNull(0,0,-1);
    if(judgeFlag<0){
        layer.msg("不规范的信息", {time: 1000});
    }
    console.log(judgeFlag)
    return judgeFlag;
}
//通用判断为空的方法 或 判断 <1  isNum
function judegNull(text,id,isNum){
    var tipsColor = '#3595CC';
    if(isNum==0){
        var value = document.getElementById(id).value;
        if(value == null || value == ""){
            layer.tips(text,"#"+id,{tips:[2,tipsColor],tipsMore: true});
            return -1;
        }
        return 0;
    }else{
        isNum = 0;
        var awardWinner = $("#addAwardWinner>p").length;
        if(awardWinner<1){
            layer.tips("请添加获奖人员","#awardWinner",{tips:[2,tipsColor],tipsMore: true});
            isNum = -1;
        }
        var awardDevice = $("#addAwardDevice>p").length;
        if(awardDevice<1){
            layer.tips("请添加关联设备","#awardDevice",{tips:[2,tipsColor],tipsMore: true});
            isNum = -1;
        }
        return isNum;
    }
}
//查看人员详情的方法
function findTUserDetail(usernames){
    var currpage = $("#currpage").val();
    layer.ready(function () {
        layer.open({
            type: 2,
            title: '',
            fix: true,
            maxmin: true,
            shift: 5,
            shadeClose: true,
            move: false,
            maxmin: false,
            area: ['700px', '450px'],
            content: '../commonTeamAchieve/findTUserDetailList?usernames='+usernames
        });
    });
}
//查看设备详情的方法
function findDeviceDetail(uid){
    var currpage = $("#currpage").val();
    layer.ready(function () {
        layer.open({
            type: 2,
            title: '',
            fix: true,
            maxmin: true,
            shift: 5,
            shadeClose: true,
            move: false,
            maxmin: false,
            area: ['1200px', '450px'],
            content: '../commonTeamAchieve/findDeviceDetailList?uid='+uid
        });
    });
}
//删除方法
function deleteCommonAward(uid){
    layer.confirm('确定删除吗?', {icon: 0, title:'',closeBtn:0}, function(index){
        layer.close(index);
        window.location.href = "../commonTeamAchieve/deleteCommonAward?uid=" + uid;
    });
}