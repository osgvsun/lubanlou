/**
 * Created by Administrator on 2017/9/7.
 */
function saveWebsiteQuestion(currpage) {
    var centerId = $("#centerId").val();
    if($("#tittle").val()){
        var tittle = $("#tittle").val();
    }else{
        alert("请输入问题！");
        return false;
    }
    if(editor.txt.html()){
        var content = editor.txt.html();
    }else{
        alert("请输入问题内容！");
        return false;
    }
    var myData ={
        "tittle":tittle,
        "content":content,
        "centerId":centerId
    }
    $.ajax({
        type: 'post',
        async: false,
        url: '../tUser/saveWebsiteQuestion',
        data: myData,
        success: function(data) {
            if(centerId == -1) {
                window.location.href = "../tUser/websiteQuestion?currpage=" + currpage;
            }else{
                window.location.href = "../tUser/websiteCenterQuestion?currpage=" + currpage+"&centerId="+centerId;
            }
        },
        error:function() {
        }
    });
}
