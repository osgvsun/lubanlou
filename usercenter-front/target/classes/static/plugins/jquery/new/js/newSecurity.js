$(function () {
    var myData= {
        "uid":$("#uid").val()
    }
    $.ajax({
        type: 'POST',
        async: false,
        url: '../common/getSecurityContent',
        data:myData,
        success: function(data) {
            /*var E = window.wangEditor
            var editor = new E('#content')
            editor.create()*/
            editor.txt.html(data)
        },
        error:function() {
        }
    });
})
function saveNewSecurity(){
    var uid=$('#uid').val();
    var content = editor.txt.html();
    var name = $("#name").val();
    var myData ={
        "content":content,
        "name":name,
        "uid":uid
    }
    $.ajax({
        type: 'post',
        async: false,
        url: '../common/saveSecurity',
        data: myData,
        success: function(data) {
            window.location.href ="../common/securityList";
        },
        error:function() {
        }
    });
}