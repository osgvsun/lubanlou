$(function () {
    var myData= {
        "uid":$("#uid").val()
    }
    $.ajax({
        type: 'POST',
        async: false,
        url: '../config/getSecurityBook',
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
function editSecurity(){
    $(".editsecurity").css("display","none");
    $(".savesecurity").css("display","");
    $(".answer_tit_detail1").css("display","");
    $(".answer_tit_detail2").css("display","none");
    var myData={
      "uid":$("#uid").val()
    };
    $.ajax({
        type: 'POST',
        url: '../config/getSecurityText',
        //dataType:'json',
        data:myData,
        success: function(data) {
            // var E = window.wangEditor
            // var editor = new E('#content')
            // // 或者 var editor = new E( document.getElementById('#editor') )
            //
            // editor.customConfig.uploadImgUrl = '/common/editorPicUpload';
            // editor.customConfig.uploadImgFileName = 'editorPic';
            // editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
            // editor.create()
            editor.txt.html(data);
        },
        error:function() {
            //  alert("保存失败")
        }
    });

}
function saveNewSecurity(){
    var content = editor.txt.html();
    var uid = $("#uid").val();
    var insUid = $("#instrument").val();
    $(".editsecurity").css("display","");
    $(".savesecurity").css("display","none");
    $(".answer_tit_detail1").css("display","none");
    $(".answer_tit_detail2").css("display","");
    var myData ={
        "content":content,
        "uid":uid,
        "insUid":insUid
    }
    $.ajax({
        type: 'post',
        async: false,
        url: '../config/saveInstrumentSecurity',
        data: myData,
        success: function(data) {
            alert("保存成功！");
            window.location.href ="../config/editInstrumentSecurity?insUid="+insUid;
        },
        error:function() {
        }
    });
}