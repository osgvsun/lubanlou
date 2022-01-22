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
        tableSubject = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form

    //向世界问个好
    //layer.msg('');
    table.reload();//过滤数据
    form.render(null, 'testscoredetailbox');

    //执行一个表单
    var testScoreDetailExcel = table.render({
        elem: '#testscoredetail',
        url: httpBaseUrl + '/views/test/findExamDetailApi', //数据接口
        where: {'assignmentId': assignmentId, 'username': username, 'gradingId': gradingId, 'dictionary': 1},
        title: '测试信息详情',
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
                title: '选项',
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
                }
            ]
        ],
        id: 'testscoredetail',
        data: table,
        //skin: 'line', //表格风格
        even: true,
        limits: [5, 7, 10, 20],
        limit: 5 //每页默认显示的数量
    });
    var subjectivedetail =  tableSubject.render({
        elem: '#subjectivedetail',
        url: httpBaseUrl + '/views/test/findExamDetailApi', //数据接口
        where: {'assignmentId': assignmentId, 'username': username,'gradingId':gradingId, 'dictionary': 2},
        title: '主观题考试信息详情',
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
                "count":result.count,
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
                        return res.type = '多选题'
                    } else if (res.type === 2) {
                        return res.type = '判断题'
                    } else if (res.type === 4) {
                        return res.type = '单选题'
                    } else if (res.type === 5) {
                        return res.type = '简答题';
                    } else if (res.type === 8) {
                        return res.type = '填空题'
                    }
                }
            }, {
                field: 'grade',
                title: '分值',
                sort: true
            }, {
                field: 'score',
                title: '建议得分',
                sort: true
            },{
                field: 'overriderScore',
                title: '得分',
                sort: true
            }, {
                field: 'answer',
                title: '关键字',
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
                    title: '推荐答案',
                    sort: true,
                    templet: function (res) {
                        var a = res.answer;
                        for (let i = 0; i <= a.length; ++i) {
                            if (a[i]) {
                                if (a[i].isCorrect === 1) {
                                    if (res.type != 5&&res.type != 8&&res.type !=1)
                                        return '推荐答案：' + a[i].label;
                                    else if(res.type==5)
                                        return '推荐答案：' + a[i].text;
                                    else if(res.type==8){
                                        var str = '推荐答案：';
                                        for (let i = 0; i < a.length; ++i) {
                                            str += a[i].text +',';
                                        }
                                        return str;
                                    }else if (res.type ==1){
                                        var str = '推荐答案：';
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
                }
            ]
        ],
        id: 'subjectivedetail',
        data: tableSubject,
        // skin: 'line', //表格风格
        even: false,
        limits: [5, 7, 10, 20],
        limit: 5 //每页默认显示的数量
    });
    function htmlEscape(text){
        return text.replace(/[<>"&]/g, function(match, pos, originalText){
            switch(match){
                case "<": return "&lt;";
                case ">":return "&gt;";
                case "&":return "&amp;";
                case "\"":return "&quot;";
            }
        });
    }
    var $ = layui.$,
        active = {
            reload: function () {
                let searchbox = $('#searchSubjectivityBox');

                //执行重载
                table.reload('subjectivedetail', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        // key: {
                        search: searchbox.val()
                        // }
                    }
                }, 'data');
            }
        };

    $('.search_line_subjectvity .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    var $ = layui.$,
        activeSecond = {
            reload: function () {
                let searchbox = $('#searchObjectivityBox');

                //执行重载
                table.reload('testscoredetail', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        // key: {
                        search: searchbox.val()
                        // }
                    }
                }, 'data');
            }
        };

    $('.search_line_objectivity .layui-btn').on('click', function () {
        var type = $(this).data('type');
        activeSecond[type] ? activeSecond[type].call(this) : '';
    });

    $('#testScoreDetailExcel').on('click', function () {
        $.ajax({
            url: httpBaseUrl + '/views/test/findExamDetailApi',
            async: false,
            data: {'assignmentId': assignmentId,'gradingId':gradingId, 'username': username, 'page': 1,'dictionary': 1, 'limit': sessionStorage.getItem('count')},
            success: function (res) {
                exportData = res.data;
                testScoreDetailExcel.config.title = examTitle + "+" + cnameOn +"+" + "成绩单" + ":" + "分数：" + examScoreOn;
                table.exportFile(testScoreDetailExcel.config.id, exportData, 'xls');
            }
        });

    });

    $('#objectiveDetailExcel').on('click', function () {
        $.ajax({
            url: httpBaseUrl + '/views/test/findExamDetailApi',
            async: false,
            data: {'assignmentId': assignmentId,'gradingId':gradingId, 'username': username, 'page': 1,'dictionary': 2, 'limit': sessionStorage.getItem('count')},
            success: function (res) {
                debugger
                exportData = res.data;
                subjectivedetail.config.title = examTitle + "+" + cnameOn +"+" + "成绩单" + ":" + "分数：" + examScoreOn;
                tableSubject.exportFile(subjectivedetail.config.id, exportData, 'xls');
            }
        })
    });

    $('#objective').on('click', function () {
        $('#objectiveDetailExcel').hide();
        $('#testScoreDetailExcel').show();
        layui.table.reload('examscoredetail');
        $('.search_line_objectivity').show();
        $('.search_line_subjectvity').hide();

    });
    $('#subjectivity').on('click', function () {
        $('#objectiveDetailExcel').show();
        $('#testScoreDetailExcel').hide();
        layui.table.reload('subjectivedetail');
        $('.search_line_objectivity').hide();
        $('.search_line_subjectvity').show();
    });

});