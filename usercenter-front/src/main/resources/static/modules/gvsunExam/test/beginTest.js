var indexs = [];

var storage = window.localStorage; //缓存
var initData = {}; //初始化数据
var formData = {}; //表单提交
layui.use(['form', 'layer', 'layedit', 'laypage'], function () {
    var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        laypage = layui.laypage;
    //分页功能
    //自定义首页、尾页、上一页、下一页文本

    //链接跳转先创建副本获取test_parent_id
    if(isLink) {
        $.ajax({
            url: httpBaseUrl + '/views/test/createNewTestApi',
            type: 'GET',
            async: false,
            data: {"testId": tId, "username": currentUsername},
            success: function (res) {
                console.log(res);
                testId =res
            }
        })
    }

    function setPage(page, limit, total, examId, username) {
        laypage.render({
            elem: 'page'
            ,count: total
            ,curr: page
            ,limit: limit
            ,first: '首页'
            ,last: '尾页'
            ,prev: '<em>←</em>'
            ,next: '<em>→</em>'
            ,theme: '#F88E11',
            layout: ['count', 'prev', 'page', 'skip'],
            jump: function (obj, first) {
                if (!first) {
                    // getExamDetail(examId, username, obj.curr, obj.limit)
                    getTestDetail(examId, obj.curr, obj.limit)
                }
            }
        });
        switchPage()
    }
    //获取学生答题记录
    let recordMap = [];
    let totalRecords = 0; //获取题目的总数
    $.ajax({
        url: httpBaseUrl + '/api/getStudentAnswerRecord',
        type: 'GET',
        async: false,
        data: {"examId": testId, "username": currentUsername},
        success: function (res) {
            recordMap = res;
        }
    })
    // http://localhost:8000/gvsunExam/views/test/testInfoApi?testId=16122367&page=1&pageSize=10
    // 获取开始考试题目数据
    getTestDetail(testId, 1, 5)
    function getTestDetail(testId, page, pageSize) {
        $('.content_m_e').empty();
        $.ajax({
            url: httpBaseUrl + '/views/test/testInfoApi',
            type: 'GET',
            async: false,
            data: {"testId": testId, "page": page, "pageSize": pageSize},
            success: function (res) {
                let data = res;
                if (data) {
                    //考试基本信息渲染
                    $('.content>h1:eq(0)').text(title)
                    $('.content_l_t>li:eq(1)').text('总分：' + score);
                    //试题渲染
                    $('.content_m_c>h3>span').text(data.examItemVoCount);
                    if (data.itemVoList) {
                        for (let i = 0; i < data.itemVoList.length; i++) {
                            let title = '';
                            if (data.itemVoList[i].type !== 8) {
                                title = `<div>
                                    <a name="${data.itemVoList[i].id}"></a>
                                    <pre>
                                        <h1>${i + 1}、${data.itemVoList[i].description}</h1>
                                    </pre>
                                 </div>`;
                            } else {
                                title = `<div>
                                    <a name="${data.itemVoList[i].id}"></a>
                                    <pre>
                                        <h1>${i + 1}、${data.itemVoList[i].descriptionTemp}</h1>
                                    </pre>
                                 </div>`;
                            }
                            $('.content_m_e').append(title);
                            if (data.itemVoList[i].type === 1) {
                                $('.content_m_e').append(checkboxAnswer(data.itemVoList[i].answertext, data.itemVoList[i].id))
                            }
                            if (data.itemVoList[i].type === 4 || data.itemVoList[i].type === 2) {
                                $('.content_m_e').append(radioAnswer(data.itemVoList[i].answertext, data.itemVoList[i].id))
                            }
                            if (data.itemVoList[i].type === 8) {
                                $('.content_m_e').append(blanksAnswer(data.itemVoList[i].answertext, data.itemVoList[i].id))
                            }
                            if (data.itemVoList[i].type === 5) {
                                $('.content_m_e').append(shortAnswer(data.itemVoList[i].answertext, data.itemVoList[i].id))
                            } 
                        }
                    }
                    //页码展示
                    setPage(page, pageSize, data.examItemVoCount, testId, currentUsername)
                    //提交

                }
            }
        })
    }

    //多选题选项渲染 type = 1
    function checkboxAnswer(answer, examId) {
        let str = '';
        if (answer) {
            for (let i = 0; i < answer.length; i++) {
                // console.log(recordMap[answer[i].id])
                if (recordMap[answer[i].id] !== null && recordMap[answer[i].id] !== undefined) {
                    str += '<div><h2>' +
                        '<input type="checkbox" name="answers' + examId +'" id="answers'+ examId + '[' + i + ']' +'" rel="'+ examId + '" value="'+ answer[i].id + '" title="'+ answer[i].text + '" checked="checked">' + answer[i].text +
                        '</h2></div>'
                } else {
                    str += '<div><h2>' +
                        '<input type="checkbox" name="answers' + examId +'" id="answers'+ examId + '[' + i + ']' +'" rel="'+ examId + '" value="'+ answer[i].id + '" title="'+ answer[i].text + '">' + answer[i].text +
                        '</h2></div>'
                }
            }
        }
        return str;
    }
// 单选题渲染 type = 4 判断题渲染 type = 2
    function radioAnswer(answer, examId) {
        let str = '';
        if (answer) {
            for (let i = 0; i < answer.length; i++) {
                if (recordMap[answer[i].id] != undefined || recordMap[answer[i].id] !=null) {
                    str += '<div><h2>' +
                        '<input type="radio" name="answers' + examId +'" rel="'+ examId + '" value="'+ answer[i].id + '" title="'+ answer[i].text + '" checked="checked">' + answer[i].text +
                        '</h2></div>'
                } else {
                    str += '<div><h2>' +
                        '<input type="radio" name="answers' + examId +'" rel="'+ examId + '" value="'+ answer[i].id + '" title="'+ answer[i].text + '">' + answer[i].text +
                        '</h2></div>'
                }
            }
        }
        return str;
    }
//填空题渲染 type = 8
    function blanksAnswer(answer, examId) {
        let str = '';
        if (answer) {
            for (let i = 0; i < answer.length; i++) {
                if (recordMap[answer[i].id] !== null && recordMap[answer[i].id] !== undefined && recordMap[answer[i].id] != 'undefined' && !recordMap[answer[i].id]) {
                    str += '<div><h2>' +
                        '<input type="text" name="answertexts' + examId +'" id="answertexts' + examId + '[' + i + ']' +'" rel="' + examId + '" value="'+ recordMap[answer[i].id].answerText +'">' + recordMap[answer[i].id].answerText +
                        '<input type="hidden" name="answers'+ examId +'" rel="' + examId +'" value="'+ answer[i].id +'">' + answer[i].text +
                        '</h2></div>'
                } else {
                    str += '<div><h2>' +
                        '<input type="text" name="answertexts' + examId +'" id="answertexts' + examId + '[' + i + ']' +'" rel="' + examId + '" value="">' +
                        '<input type="hidden" name="answers'+ examId +'" rel="' + examId +'" value="'+ answer[i].id +'">'
                        '</h2></div>';
                }
            }
        }
        return str;
    }
//简答题渲染 type = 5
    function shortAnswer(answer, examId) {
        let str = '';
        if (answer) {
            for (let i = 0; i < answer.length; i++) {
                str +=  '<div>' +
                    '<textarea id="' + examId + '" name="answertexts' + examId + '" rel="'+ examId +'" style="display: none;" class="layui-textarea" lay-verify="content"></textarea>' +
                    '</div>' +
                    '<div>' +
                    '<input type="hidden" name="answers' + examId +'" rel="'+ examId +'">' +
                    '</div>'
            }
        }
        return str;
    }

    $('.layui-textarea').each(function (index, obj) {
        var index = layedit.build($(obj).attr("id"), {
            height: 100
        });
        indexs.push(index);
        form.verify({
            content: function (value) {
                layedit.sync(index);
            }
        });
        var c = $(document.getElementById("LAY_layedit_" + index)).contents().find("body");
        $(document.getElementById("LAY_layedit_" + index)).contents().find("body").bind('input propertychange', function (e) {
            var v = document.getElementById("LAY_layedit_" + index);
            var teValue = v.getAttribute('textarea')
            var te = document.querySelector("textarea[id =" + "'" + teValue + "'" + "]");
            te.innerHTML = c.text();
            var p = [];
            p.push(te.name);
            p.push(te.text);
            p.push(Date.parse(new Date()) / 1000);
            $('#time_' + te.getAttribute('rel')).val(Date.parse(new Date()) / 1000);
            set.apply(te.getAttribute('rel'));
            markQuestion1(te.getAttribute('rel'));

        });
    });

    function switchPage() {
        initData = $.parseJSON(storage.getItem('questions'));
        if (initData) {
            for (var p in initData) {
                if (p != 'set')
                    formData[p] = initData[p];
            }
            //单选按钮
            var radios = $('#myForm :input[type=radio]');
            $.each(radios, function () {
                var _ = this, v = initData[_.name] ? initData[_.name].value : null;
                var _this = $(this);
                if (v != '' && v == _.value) {
                    _.checked = true;
                    batmark(_this.attr('rel'), initData[_this.attr('name')].value);
                } else {
                    _.checked = false;
                }
            });
            //复选框
            var checkboxs = $('#myForm :input[type=checkbox]');
            $.each(checkboxs, function () {
                var _ = this, v = initData[_.id] ? initData[_.id].value : null;
                var _this = $(this);
                if (v != '' && v == _.value) {
                    _.checked = true;
                    batmark(_this.attr('rel'), initData[_this.attr('id')].value);
                } else {
                    _.checked = false;
                }
            });
            //简答题
            var textarea = $('#myForm textarea');
            $.each(textarea, function () {
                var _this = $(this);
                if (initData[_this.attr('name')]) {
                    _this.val(initData[_this.attr('name')].value);
                    CKEDITOR.instances[_this.attr('id')].setData(initData[_this.attr('name')].value);
                }
            });
            //填空题
            var texts = $('#myForm :input[type=text]');
            $.each(texts, function () {
                var _this = $(this);
                if (initData[_this.attr('id')]) {
                    _this.val(initData[_this.attr('id')] ? initData[_this.attr('id')].value : '');
                    if (initData[_this.attr('id')].value && initData[_this.attr('id')].value != '')
                        batmark(_this.attr('rel'), initData[_this.attr('id')].value);
                }
            });
        }
        //获取单选框的值
        $('#myForm :input[type=radio]').change(function () {
            debugger
            var _ = this;
            var _this = $(this);
            var p = [];
            p.push(_.name);
            if (_.checked) {
                p.push(_.value);
                p.push(Date.parse(new Date()) / 1000);
                $('#time_' + _this.attr('rel')).val(Date.parse(new Date()) / 1000);
                set.apply(formData, p);

            } else {
                p.push('');
                p.push(null);
                set.apply(formData, p);
            }
            markQuestion(_this.attr('rel'));
        });
        //填空题
        $('#myForm :input[type=text]').change(function () {
            var _this = $(this);
            var p = [];
            p.push(_this.attr('id'));
            p.push(_this.val());
            p.push(Date.parse(new Date()) / 1000);
            $('#time_' + _this.attr('rel')).val(Date.parse(new Date()) / 1000);
            set.apply(formData, p);
            markQuestion(_this.attr('rel'), true);
        });
        //多选题
        $('#myForm :input[type=checkbox]').change(function () {
            var _ = this;
            var _this = $(this);
            var p = [];
            p.push(_this.attr('id'));
            //判断是否有选中
            if (_.checked) {
                p.push(_this.val());
                p.push(Date.parse(new Date()) / 1000);
                $('#time_' + _this.attr('rel')).val(Date.parse(new Date()) / 1000);
                set.apply(formData, p);
            } else {
                p.push('');
                p.push(null);
                set.apply(formData, p);
            }
            markQuestion(_this.attr('rel'));

        });
        //简述题
        $('#myForm textarea').change(function () {
            var _ = this;
            var _this = $(this);
            var p = [];
            p.push(_.name);
            p.push(_.value);
            p.push(Date.parse(new Date()) / 1000);
            $('#time_' + _this.attr('rel')).val(Date.parse(new Date()) / 1000);
            set.apply(formData, p);
            markQuestion1(_this.attr('rel'));
        });
        var objArray = new Array();
        var fileIdArray = new Array();
        $.each($(".course-banner"), function (index, obj) {
            if ($(obj).attr("state") == 1) {
                if ($(obj).attr("data") != null && $(obj).attr("data").indexOf("/") == -1) {
                    resourceContainer.getFileById({
                        fileId: $(obj).attr("data"),
                        success: function (data) {
                            $(obj).attr("src", data.url);
                        },
                        fail: function (reason) {
                            console.log("获取文件失败:" + reason);
                        },
                        needToken: true
                    });
                    /*objArray.push(obj);
                     fileIdArray.push($(obj).attr("data"));*/
                } else {
                    $(obj).attr("src", $(obj).attr("data"));
                }
            }
        });

    }
    $(function () {
        // if () {
        //     alert("没有更多内容！");
        //     window.location.href = document.referrer;
        //     window.history.back(-1);
        // }
        // 刷新页面的情况下获取答题情况
        // 获取存取在storage中的答题情况
        initData = $.parseJSON(storage.getItem('questions'));
        if (initData) {
            for (var p in initData) {
                if (p != 'set')
                    formData[p] = initData[p];
            }
            //单选按钮
            var radios = $('#myForm :input[type=radio]');
            $.each(radios, function () {
                var _ = this, v = initData[_.name] ? initData[_.name].value : null;
                var _this = $(this);
                if (v != '' && v == _.value) {
                    _.checked = true;
                    batmark(_this.attr('rel'), initData[_this.attr('name')].value);
                } else {
                    _.checked = false;
                }
            });
            //复选框
            var checkboxs = $('#myForm :input[type=checkbox]');
            $.each(checkboxs, function () {
                var _ = this, v = initData[_.id] ? initData[_.id].value : null;
                var _this = $(this);
                if (v != '' && v == _.value) {
                    _.checked = true;
                    batmark(_this.attr('rel'), initData[_this.attr('id')].value);
                } else {
                    _.checked = false;
                }
            });
            //简答题
            var textarea = $('#myForm textarea');
            $.each(textarea, function () {
                var _this = $(this);
                if (initData[_this.attr('name')]) {
                    _this.val(initData[_this.attr('name')].value);
                    CKEDITOR.instances[_this.attr('id')].setData(initData[_this.attr('name')].value);
                }
            });
            //填空题
            var texts = $('#myForm :input[type=text]');
            $.each(texts, function () {
                var _this = $(this);
                if (initData[_this.attr('id')]) {
                    _this.val(initData[_this.attr('id')] ? initData[_this.attr('id')].value : '');
                    if (initData[_this.attr('id')].value && initData[_this.attr('id')].value != '')
                        batmark(_this.attr('rel'), initData[_this.attr('id')].value);
                }
            });
        }
        // 先去cookie中取出当前是第几页 如果没有默认是第一页

        var currpage = $.cookie('currPage');
        if (null == currpage || currpage == 'null') {
            $("#page1").show();
            $.cookie('currPage', 1);
            currpage = 1;
        } else {
            $("#page" + currpage).show();
        }
        var page3 = parseInt(currpage) - 1;
        $(".page span:eq(" + page3 + ")").addClass("page_current");

        //获取单选框的值
        $('#myForm :input[type=radio]').change(function () {
            var _ = this;
            var _this = $(this);
            var p = [];
            p.push(_.name);
            if (_.checked) {
                p.push(_.value);
                p.push(Date.parse(new Date()) / 1000);
                $('#time_' + _this.attr('rel')).val(Date.parse(new Date()) / 1000);
                set.apply(formData, p);

            } else {
                p.push('');
                p.push(null);
                set.apply(formData, p);
            }
            markQuestion(_this.attr('rel'));
        });
        //填空题
        $('#myForm :input[type=text]').change(function () {
            var _this = $(this);
            var p = [];
            p.push(_this.attr('id'));
            p.push(_this.val());
            p.push(Date.parse(new Date()) / 1000);
            $('#time_' + _this.attr('rel')).val(Date.parse(new Date()) / 1000);
            set.apply(formData, p);
            markQuestion(_this.attr('rel'), true);
        });
        //多选题
        $('#myForm :input[type=checkbox]').change(function () {
            var _ = this;
            var _this = $(this);
            var p = [];
            p.push(_this.attr('id'));
            //判断是否有选中
            if (_.checked) {
                p.push(_this.val());
                p.push(Date.parse(new Date()) / 1000);
                $('#time_' + _this.attr('rel')).val(Date.parse(new Date()) / 1000);
                set.apply(formData, p);
            } else {
                p.push('');
                p.push(null);
                set.apply(formData, p);
            }
            markQuestion(_this.attr('rel'));

        });
        //简述题
        $('#myForm textarea').change(function () {
            var _ = this;
            var _this = $(this);
            var p = [];
            p.push(_.name);
            p.push(_.value);
            p.push(Date.parse(new Date()) / 1000);
            $('#time_' + _this.attr('rel')).val(Date.parse(new Date()) / 1000);
            set.apply(formData, p);
            markQuestion1(_this.attr('rel'));
        });

        // $.ajax({
        //     url: httpBaseUrl + '/views/test/testInfoApi',
        //     type: 'GET',
        //     async: false,
        //     data: {"testId": testId, "page": 1, "pageSize": 10},
        //     success: function (res) {
        //         console.log(res)
        //     }
        // })
        var objArray = new Array();
        var fileIdArray = new Array();
        $.each($(".course-banner"), function (index, obj) {
            if ($(obj).attr("state") == 1) {
                if ($(obj).attr("data") != null && $(obj).attr("data").indexOf("/") == -1) {
                    resourceContainer.getFileById({
                        fileId: $(obj).attr("data"),
                        success: function (data) {
                            $(obj).attr("src", data.url);
                        },
                        fail: function (reason) {
                            console.log("获取文件失败:" + reason);
                        },
                        needToken: true
                    });
                    /*objArray.push(obj);
                     fileIdArray.push($(obj).attr("data"));*/
                } else {
                    $(obj).attr("src", $(obj).attr("data"));
                }
            }
        });
    })
})
// //考试页面下一页
function next(toPage) {
    //将其他的也隐藏
    //获取cookie中的值
    var currpage = $.cookie('currPage');
    $("#page" + currpage).hide();
    $("#page" + toPage).show();
    $.cookie('currPage', toPage);
    var page = parseInt(currpage) - 1;
    var page2 = parseInt(toPage) - 1;
    $(".page span:eq(" + page + ")").attr("class", "");
    $(".page span:eq(" + page2 + ")").addClass("page_current");
}


//阻止重复提交
var TestFlag=true;
//提交测试
function submitTest() {
    if(TestFlag){
        // $.blockUI({message: '<iframe width="100%" height="100%" scrolling="no" src=../plugin/chrome_rex_game/index.html></iframe>'});
        TestFlag=false;
        $.ajax({
            url: httpBaseUrl + '/api/saveTAssignmentItemMapping?username=' + currentUsername + '&cid=' + siteId + '&assignmentId=' + testId + "&submitTime=1" + "&simulation=0",
            type: 'POST',
            data: $('#myForm').serialize(),
            success: function (data) {
                alert(data);
                clearStorage();
                $.cookie('currPage', 1);
                $.unblockUI();
                window.history.go(-1);
                TestFlag=true;
            },
            error: function (e) {
                alert('系统异常，请稍后重试');
                setTimeout($.unblockUI, 3000);
                TestFlag=true;
            }
        })
    }
}

//存入storage
function set(k, v, t) {
    var _this = this;
    if (typeof (_this) == "object" && Object.prototype.toString.call(_this).toLowerCase() == "[object object]" && !_this.length) {
        _this[k] = {'value': v, 'time': t};
        storage.setItem('questions', $.toJSON(formData));
    }
}

//清除storage
function clearStorage() {
    storage.removeItem('questions');
}

function batmark(rel, value) {
    if (value && value != '') {
        if (!$('#itemindex' + rel).hasClass("tdcurrent")) $('#itemindex' + rel).addClass("tdcurrent");
    } else
        $('#itemindex' + rel).removeClass("tdcurrent");

}

//做题标记
function markQuestion(rel, isTextArea) {
    var t = 0;
    var f = false;

    try {
        f = $('#myForm :input[rel=' + rel + ']');
    } catch (e) {
        f = false;
    }
    if (!f) return false;
    //简答题 填空题
    if (isTextArea) {

        var nameV = 'answertexts' + rel;
        $('#myForm :input[name=' + nameV + ']').each(
            function () {
                if ($(this).val() != '') {
                    t++;
                }
            }
        )
        if ($('#myForm :input[rel=' + rel + ']').val() && $('#myForm :input[rel=' + rel + ']').val() != '' && $('#myForm :input[rel=' + rel + ']').val() != '<p></p>') t++;
    } else
        $('#myForm :input[rel=' + rel + ']').each(function () {
            if ($(this).is(':checked') && $(this).val() && $(this).val() != '' && $(this).val() != '<p></p>') t++;
        });
    if (t > 0) {
        if (!$('#itemindex' + rel).hasClass("tdcurrent")) $('#itemindex' + rel).addClass("tdcurrent");
    } else {
        $('#itemindex' + rel).removeClass("tdcurrent");
    }
}
//做题标记
function markQuestion1(rel, isTextArea) {
    isTextArea = "简答题";
    var t = 0;
    var f = false;
    try {
        f = document.querySelector("textarea[rel =" + "'" + rel + "'" + "]");
    } catch (e) {
        f = false;
    }
    if (!f) return false;
    //简答题 填空题
    if (isTextArea) {
        var nameV = 'answertexts' + rel;
        var s = $("textarea[rel =" + "'" + rel + "'" + "]");
        $("textarea[rel =" + "'" + rel + "'" + "]").each(
            function () {
                if ($(this).val() != '') {
                    t++;
                }
            }
        )
        if ($("textarea[rel =" + "'" + rel + "'" + "]").val() && $("textarea[rel =" + "'" + rel + "'" + "]").val() != '' && $("textarea[rel =" + "'" + rel + "'" + "]").val() != '<p></p>') t++;
    } else
        $("textarea[rel =" + "'" + rel + "'" + "]").each(function () {
            if ($(this).is(':checked') && $(this).val() && $(this).val() != '' && $(this).val() != '<p></p>') t++;
        });
    if (t > 0) {
        if (!$('#itemindex' + rel).hasClass("tdcurrent")) $('#itemindex' + rel).addClass("tdcurrent");
    } else {
        $('#itemindex' + rel).removeClass("tdcurrent");
    }
}
//题目跳转
function gotoquestion(itemId, index) {
    //获取当前页
    var currPage = $.cookie('currPage');
    //当前页是本页
    if (currPage != index) {
        //修改cookie中的当前页
        $.cookie('currPage', index);
        //移除和添加选中效果
        var page = parseInt(currPage) - 1;
        var page2 = parseInt(index) - 1;
        $(".page span:eq(" + page + ")").attr("class", "");
        $(".page span:eq(" + page2 + ")").addClass("page_current");
        //将当前页隐藏 秀出要跳转的页
        $("#page" + currPage).hide();
        $("#page" + index).show();
    }
    location.href = "#" + itemId;
}
