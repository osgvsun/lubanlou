/**
 * Created by Administrator on 2017/9/7.
 */
function saveWebsiteAnswer(questionUid,currpage) {
    if(editor.txt.html()){
        var content = editor.txt.html();
    }else{
        alert("请输入问题内容！");
        return false;
    }
    var myData ={
        "content":content,
        "questionUid":questionUid
    }
    $.ajax({
        type: 'post',
        async: false,
        url: '../tUser/saveWebsiteAnswer',
        data: myData,
        success: function(data) {
            window.location.href ="../tUser/showWebsiteAnswer?currpage="+currpage+"&questionUid="+questionUid;
        },
        error:function() {
        }
    });
}
