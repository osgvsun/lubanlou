
 /*表单提交检验*/
function checkForm(){
    //获取标题
    var title=$("#title").val();
    //获取分类
    var category=$("#category").val();
    //获取创建时间
    var createdTime=$("#createdTime").val();

    if(title==""){
        alert("请输入标题");
        return false;
    }
    if(category == ""){
        alert("请选择题库的分类");
        return false;
    }
    if(createdTime == ""){
        alert("请选择题库的创建时间");
        return false;
    }
    return true;
}