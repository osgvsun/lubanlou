var format = function (time, format) {
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}
layui.use(['laypage', 'layer', 'table', 'element', 'form'], function () {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form

    //向世界问个好
    //layer.msg('');

    table.reload();//过滤数据
    form.render(null, 'examscoredetailbox');
    //执行一个表单
    table.render({
        elem: '#examscoredetail',
        url: httpBaseUrl + '/views/examGradeDetailApi', //数据接口
        where: {'assignmentId': assignmentId, 'username': username},
        title: '考试信息详情',
        cellMinWidth: 100,
        page: true, //开启分页
        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
            //curr: 5, //设定初始在第 5 页
            groups: 1, //只显示 1 个连续页码
            first: false, //不显示首页
            last: false //不显示尾页
        },
        parseData: function (result) {
            sessionStorage.setItem('count', result.count);
            return {
                "code": 0,
                "msg": result.message,
                "count": result.count,
                "data": result.data
            };
        },
        cols: [
            [ //表头
                {
                    field: 'left',
                    title: '序号',
                    type: 'numbers',
                    width: 50
                }, {
                field: 'title',
                title: '题目名称',
                sort: true
            }, {
                field: 'type',
                title: '题目类型',
                sort: true,
                templet: function (res) {
                    if (res.type === 1) {
                        return '多选题'
                    } else if (res.type === 2) {
                        return '判断题'
                    } else if (res.type === 4) {
                        return '单选题'
                    } else if (res.type === 5) {
                        return '简答题'
                    } else if (res.type === 8) {
                        return '填空题'
                    }
                }
            }, {
                field: 'grade',
                title: '分值',
                sort: true
            }, {
                field: 'score',
                title: '得分',
                sort: true
            }, {
                field: 'answer',
                title: '回答',
                templet: function (res) {
                    var a = res.answer;
                    if (res.type!=8){
                        if (res.type != 5) {
                            var strFrist = '';
                            for (let i = 0; i <= a.length; ++i) {
                                if (a[i]) {
                                    strFrist += '<span>' + a[i].label + '. ' + a[i].text + '</span>' + '<br />';
                                }
                            }
                            return strFrist;
                        } else {
                            var str = '';
                            for (let i = 0; i < a.length; ++i) {
                                str += '<span>' + a[i].label + '. ' + a[i].text + '</span>' + '<br />'
                            }
                            return str;
                        }
                    }else {
                        return '';
                    }

                },
                sort: true
            },
                {
                    field: 'isCorrect',
                    title: '正确答案',
                    sort: true,
                    templet: function (res) {
                        var a = res.answer;
                        for (let i = 0; i <= a.length; ++i) {
                            if (a[i]) {
                                if (a[i].isCorrect === 1) {
                                    if (res.type != 5&&res.type != 8&&res.type !=1)
                                        return '正确答案：' + a[i].label;
                                    else if(res.type==5)
                                        return '标准答案：' + a[i].text;
                                    else if(res.type==8){
                                        var str = '标准答案：';
                                        for (let i = 0; i < a.length; ++i) {
                                            str += a[i].text +',';
                                        }
                                        return str;
                                    }else if (res.type ==1){
                                        var str = '正確答案：';
                                        for (let i = 0; i < a.length; ++i) {
                                            if (a[i].isCorrect === 1)
                                                str += a[i].label +',';
                                        }
                                        return str;
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    field: 'label',
                    title: '我的答案',
                    sort: true,
                    templet: function (res) {
                        var a = res.answer;
                        var b = res.mapping;
                        if (res.type != 5&&res.type!=8&&res.type !=1) {
                            for (let i = 0; i < a.length; i++) {
                                if ((b[0]!=null) && (a[i].answerId == b[0].answerId)  ){
                                    return '我的答案：' + a[i].label;
                                }
                                if (b[0]==null){
                                    return "考生未答题";
                                }
                            }
                        }else if (res.type==8){
                            var src = '我的答案：';
                            for (let i = 0; i < a.length; i++) {
                                if ((b[i]!=null) && (a[i].answerId == b[i].answerId)  ){
                                    src += b[i].answerText+',';
                                }
                                if (b[0]==null){
                                    src= "考生未答题";
                                }
                            }
                            return src;
                        }else if(res.type==1){
                            var src = '我的答案：';
                            for (let i = 0; i < a.length; i++) {
                                for(let j=0;j<b.length;j++){
                                    if ((b[j]!=null) && (a[i].answerId == b[j].answerId)  ){
                                        src += a[i].label+',';
                                    }
                                }
                                if (b[0]==null){
                                    src= "考生未答题";
                                }
                            }
                            return src;
                        } else if (b[0]!=null){
                            return '我的答案：' + b[0].answerText;
                        }
                    }
                },{
                 title: '打分</br>(填空题如有多个空，需分别给各空打分，用英文逗号隔开分数，例如12,13,14)',
                 templet: function (res){
                     var str;
                     if (res.type==8)
                        str = '<input type="text" onchange="gradeItem('+res.id+','+gradingId+',this.value,'+res.grade+','+res.type+')"/>';
                     else if (res.type==5)
                         str = '<input type="number" onchange="gradeItem('+res.id+','+gradingId+',this.value,'+res.grade+','+res.type+')"/>';
                     return str;
                 }
                 // width: 80
                 }
            ]
        ],
        id: 'examscoredetail',
        data: table,
        skin: 'line', //表格风格
        even: false,
        limits: [5, 7, 10, 20],
        limit: 5 //每页默认显示的数量
    });


    var $ = layui.$,
        active = {
            reload: function () {
                var searchbox = $('#searchbox');

                //执行重载
                table.reload('examscoredetail', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        key: {
                            labname: searchbox.val()
                        }
                    }
                }, 'data');
            }
        };

    $('.search_line .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    //监听提交
    form.on('submit(updatetranscript)', function(data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引

        //提交 Ajax 成功后，关闭当前弹层并重载表格
        $.ajax({
            url: httpBaseUrl + "/views/updateTranscript",
            type: "post",
            data: {'gradingId':gradingId},
            success: function (e) {
                if (e){
                    alert("已更新成绩册");
                }
            },
            error: function (e) {
                alert('系统错误');
            }
        });
        parent.layui.table.reload('examscorebox'); //重载表格
        parent.layer.close(index); //再执行关闭
    });
});
function synchronizeAnswerDetails() {
    $.ajax({
        url: httpBaseUrl + "/api/teach/synchronizeAnswerDetails",
        type: "post",
        data: {'gradingId':gradingId},
        success: function (e) {
            alert(e);
        },
        error: function (e) {
            alert('同步失败');
            console.log(e);
        }
    });
}
function gradeItem(itemId,gradingId,obj,grade,type) {
    console.log(itemId,gradingId,obj,grade,type)
    var score=0.0;

    if (type==8){
        var scores = obj.split(',');
        for (var i=0;i<scores.length;i++){
            score +=  parseFloat(scores[i]);
        }
    }else {
        score = obj;
    }
    if (parseFloat(score)>parseFloat(grade)){
        alert("分数已超过改题分值");
        return false;
    }else {
        $.ajax({
            url: httpBaseUrl + "/views/gradeExam",
            type: "post",
            data: {'itemId':itemId,'gradingId':gradingId,'score':parseFloat(score)},
            success: function (e) {
            },
            error: function (e) {
                alert('系统错误');
            }
        });
    }
}
