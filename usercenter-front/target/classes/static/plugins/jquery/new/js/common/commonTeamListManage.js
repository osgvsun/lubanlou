//设置透支额度
function manageOverdraftLimit(commonTeamUid){
    $('#external-frame', window.parent.document).height(700)
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '设置透支额度',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['540px', '400px'],
            content: '../commonteam/manageCommonTeamOverdraftLimit?commonTeamUid='+commonTeamUid,
            end:function () {
                window.location.reload();
            }
        });
    });
}
//保存透支额度
function saveCommonTeamOverdraftLimit(commonTeamUid){
    var overdraftLimit=$("#overdraftLimit").val();
    if(overdraftLimit==""||overdraftLimit== null){
        alert("请输入值！");
        return false;
    }
    var reNum=/^\d+$/;
    if(reNum.test(overdraftLimit)) {
        var myData={
            'overdraftLimit' :overdraftLimit ,
            'commonTeamUid' : commonTeamUid,
        }
        $.ajax({
            url:'../commonteam/saveCommonTeamOverdraftLimit',
            type: 'POST',
            async: false,
            data: myData,
            success: function (data) {
                if(data=='success') {
                    alert("保存设置成功")
                    window.parent.location.reload();
                    var index=parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                }
            }
        });
    } else {
        if(overdraftLimit < 0) {
            alert("不能为负数！");
        } else {
            alert("请输入数字！");
        }
        return false;
    }
}