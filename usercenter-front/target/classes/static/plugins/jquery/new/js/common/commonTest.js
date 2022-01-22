$(".addQuestion").click(function () {
    var username=$('#username').val();
    var academyNumber=$('#academyNumber').val();
    var realURL="../questionPool/modifyQuestionPool?username="+username+"&uid="+academyNumber+"&questionPoolFlag=1";
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '新增题库',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: true,
            area: ['900px', '450px'],
            content: realURL,
            end: function(){
                window.location.reload();
            }
        });
    });
})
$(".editCommonConfigQuestion").click(function () {
    var username=$('#username').val();
    var academyNumber=$('#academyNumber').val();
    var str=$(this).attr("data");
    var questionPoolId=str.split(',')[0];
    var categoryForDH=str.split(',')[1];
    var realURL="../questionPool/modifyQuestionPool?questionPoolId="+questionPoolId+"&username="+username+"&uid="+academyNumber+"&categoryForDH="+categoryForDH+"&questionPoolFlag=1";
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '编辑题库',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: true,
            area: ['900px', '450px'],
            content: realURL,
            end: function(){
                window.location.reload();
            }
        });
    });
})
$(".commonConfigQuestionInfo").click(function () {
    var username=$('#username').val();
    var questionPoolId=$(this).attr("data");
    var realURL="../questionPool/questionPoolContent?questionPoolId="+questionPoolId+"&username="+username;
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '查看题库'
        ,shade: 0.3
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content:realURL,
        end: function(){
            window.location.reload();
        }
    });
    layer.full(win);
})

$(".addInstrumentQuestion").click(function () {
    var username=$('#username').val();
    var uid=$('#uid').val();
    var realURL="../questionPool/modifyQuestionPool?username="+username+"&uid="+uid+"&questionPoolFlag=2";
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '新增题库'
        ,shade: 0.3
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content:realURL,
        end: function(){
            window.location.reload();
        }
    });
    layer.full(win);
})
// function configClick (obj) {
//     var username=$('#username').val();
//     var testHost=$('#testHost').val();
//     var questionPoolId=$(obj).attr("data");
//     var realURL=testHost+"questionPoolApi/questionPoolContent?questionPoolId="+questionPoolId+"&username="+username;
//     var win = layer.open({
//         type: 2 //此处以iframe举例
//         ,title: '查看题库'
//         ,shade: 0.3
//         ,maxmin: true
//         ,offset: [ //为了演示，随机坐标
//             0.4*($(window).height()-300)
//             ,0.4*($(window).width()-390)
//         ]
//         ,content:realURL,
//         end: function(){
//             window.location.reload();
//         }
//     });
//     layer.full(win);
// }
$(".editInstrumentConfigQuestion").click(function () {
    var username=$('#username').val();
    var uid=$('#uid').val();
    var str=$(this).attr("data");
    var questionPoolId=str.split(',')[0];
    var categoryForDH=str.split(',')[1];
    var realURL="../questionPool/modifyQuestionPool?questionPoolId="+questionPoolId+"&username="+username+"&uid="+uid+"&categoryForDH="+categoryForDH+"&questionPoolFlag=2";
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '编辑题库'
        ,shade: 0.3
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content:realURL,
        end: function(){
            window.location.reload();
        }
    });
    layer.full(win);
})
$(".addNewTest").click(function () {
    var username=$('#username').val();
    var academyNumber=$('#academyNumber').val();
    var questionPoolStr=$('#questionstr').val();
    var url="../exam/editExam?username="+username+"&academyNumber="+academyNumber+"&questionPoolStr="+questionPoolStr;
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '新增考试',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: true,
            area: ['900px', '450px'],
            content: url,
            end: function(){
                window.location.reload();
            }
        });
    });
})
$(".addInstrumentTest").click(function () {
    var username=$('#username').val();
    var uid=$('#uid').val();
    var questionPoolStr=$('#questionstr').val();
    var url="../exam/editExam?username="+username+"&deviceId="+uid+"&questionPoolStr="+questionPoolStr;
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '新增考试'
        ,shade: 0.3
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content:url,
        end: function(){
            window.location.reload();
        }
    });
    layer.full(win);
})
$(".beginTest").click(function () {
    var username=$('#username').val();
    var testId=$(this).attr("data");
    $.ajax({
        url: "../exam/getExamRemainingTime?username=" + username + "&examId=" + testId,
        type: 'get',
        success: function (data) {//AJAX查询成功
            if (data >0) {
                var url="../exam/startExam?username="+username+"&examId="+testId;
                var win = layer.open({
                    type: 2 //此处以iframe举例
                    ,title: '开始考试'
                    ,shade: 0.3
                    ,maxmin: true
                    ,offset: [ //为了演示，随机坐标
                        0.4*($(window).height()-300)
                        ,0.4*($(window).width()-390)
                    ]
                    ,content:url,
                    end: function(){
                        window.location.reload();
                    }
                });
                layer.full(win);
            } else {
                alert("已超过最大考试次数");
                window.location.reload();
            }
        }
    });

})
$(".getInstrumentTestScore").click(function () {
    var testId=$(this).attr("data");
    var url="../common/getInstrumentTestScore?currpage=1&testId="+testId;
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '成绩查看'
        ,shade: 0.3
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content:url,
        end: function(){
            window.location.reload();
        }
    });
    layer.full(win);
})
$(".editCommonConfigTest").click(function () {
    var username=$('#username').val();
    var academyNumber=$('#academyNumber').val();
    var str=$(this).attr("data");
    var examId=str.split(',')[0];
    var entryScoreStr=str.split(',')[1];
    var entryScore=entryScoreStr.split('-')[0];
    var examRange=str.split('-')[1];
    var questionPoolStr=$('#questionstr').val();
    var realURL="../exam/editExam?assignmentId="+examId+"&entryScore="+entryScore+"&academyNumber="+academyNumber+"&username="+username+"&questionPoolStr="+questionPoolStr;

    layer.ready(function(){
        layer.open({
            type: 2,
            title: '编辑考试',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: true,
            area: ['900px', '450px'],
            content: realURL,
            end: function(){
                window.location.reload();
            }
        });
    });
})
// $(".commonConfigTestInfo").click(function () {
//     var testHost=$('#testHost').val();
//     var academyNumber=$('#academyNumber').val();
//     var str=$(this).attr("data");
//     var examId=str.split(',')[0];
//     var entryScoreStr=str.split(',')[1];
//     var entryScore=entryScoreStr.split('-')[0];
//     var examRange=str.split('-')[1];
//     var realURL=testHost+"questionPoolApi/modifyQuestionPool?examId="+examId+"&entryScore="+entryScore+"&academyNumber="+academyNumber+"&examRange="+examRange+"&flag=0";
//     layer.ready(function(){
//         layer.open({
//             type: 2,
//             title: '查看考试',
//             fix: true,
//             maxmin:true,
//             shift:-1,
//             closeBtn: 1,
//             shadeClose: true,
//             move:false,
//             maxmin: true,
//             area: ['900px', '450px'],
//             content: realURL,
//             end: function(){
//                 window.location.reload();
//             }
//         });
//     });
// })
$(".editInstrumentTest").click(function () {
    var username=$('#username').val();
    var uid=$('#uid').val();
    var str=$(this).attr("data");
    var examId=str.split(',')[0];
    var entryScore=str.split(',')[1];
    var questionPoolStr=$('#questionstr').val();
    var realURL="../exam/editExam?assignmentId="+examId+"&entryScore="+entryScore+"&deviceId="+uid+"&username="+username+"&questionPoolStr="+questionPoolStr;;
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '编辑考试'
        ,shade: 0.3
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content:realURL,
        end: function(){
            window.location.reload();
        }
    });
    layer.full(win);
})