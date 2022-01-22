/**
 * Created by Administrator on 2017/8/7.
 */
function newOpenSet(commonConfigId){
    if(commonConfigId){//编辑
    }else {//新建
        commonConfigId = "-1";
    }
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '新建开放设置',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['1000px', '420px'],
            content: '../common/newOpenSet?commonConfigId='+commonConfigId,
            end: function(){
                location.reload();
            }
        });
    });
}
//保存
function saveOpenSet() {
    $.ajax({
        type: "POST",
        url: "../common/saveOpenSet",
        data: $("#myForm").serialize(),//表单数据
        dataType:"json",
        success: function (data) {
            if(data=="success"){
                alert("添加成功！");
                closeLayer();
            }else{
                alert("添加失败！");
            }
        }
    });
}
//取消关闭弹窗
function closeLayer(){
    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.layer.close(index);//关闭弹窗
}