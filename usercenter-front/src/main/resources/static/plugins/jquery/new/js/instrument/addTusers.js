/**
 * Created by Administrator on 2017/8/14.
 */

//输入框绑定的方法
    $("#userName").coolautosuggest({
            url:"../tUser/coolSuggestDevice?userName=",
        onSelected:function(result){
            $("#userName").val(result.data);
            $("#queryUserNumber").val(result.id);
        }
});

//输入框绑定的方法
$("#teacherName").coolautosuggest({
    url:"../tUser/coolSuggestDeviceByrole?role=1&userName=",
    onSelected:function(result){
        $("#userName").val(result.data);
        $("#queryTeacherNumber").val(result.id);
    }
});


//输入框绑定的方法
$("#teacherLeader").coolautosuggest({
    url:"../tUser/coolSuggestDeviceByrole?role=1&userName=",
    onSelected:function(result){
        $("#teacherLeader").val(result.data);
        $("#queryLeaderNumber").val(result.id);
    }
});

function searchLeader() {
    $(".leader").coolautosuggest({
        url:"../instrument/coolSuggestInstrumentMachineAppTeacher?teacher=",
        onSelected:function(result){
            $("#teacherLeader").val(result.data);
            $("#queryLeaderNumber").val(result.id);
        }
    });
}

