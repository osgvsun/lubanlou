var contextPath = $("meta[name='contextPath']").attr("content");
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
                    getExamDetail(examId, username, obj.curr, obj.limit)
                }
            }
        });
        switchPage();
    }

    //获取学生答题记录
    let recordMap = [];
    let totalRecords = 0; //获取题目的总数
    $.ajax({
        url: httpBaseUrl + '/api/getStudentAnswerRecord',
        type: 'GET',
        async: false,
        data: {"examId": examId, "username": currentUsername},
        success: function (res) {
            recordMap = res;
        }
    })
    console.log(recordMap)
    getExamDetail(examId, currentUsername, 1, 5)
// 获取开始考试题目数据
    function getExamDetail(examId, username, page, pageSize) {
        $('.content_m_e').empty();
        $('#questionindex tr').empty();
        $('.add_button1').empty();
        $.ajax({
            url: httpBaseUrl + '/api/getExamDetail',
            type: 'GET',
            async: false,
            data: {"examId": examId, "username": username, "page": page, "pageSize": pageSize},
            success: function (res){
                let data = res;
                if (data) {
                    //考试基本信息渲染
                    $('.content>h1:eq(0)').text(data.title)
                    $('.content_l_t>li:eq(0)').text('考试时间：' + data.totalTime + '分钟');
                    $('.content_l_t>li:eq(1)').text('考生：' + data.username);
                    $('.content_l_t>li:eq(2)').text('总分：' + data.score);
                    //题目说明
                    if (data.itemIds) {
                        for (let i = 0; i < data.itemIds.length; i++ ) {
                            let td = `<td id="itemindex${data.itemIds[i]}" onclick="gotoquestion(${data.itemIds[i]}, ${i + 1})"><a>${i + 1}</a></td>`;
                            $('#questionindex tr').append(td);
                        }
                    }
                    //试题渲染
                    $('.content_m_c>h3>span').text(data.pageModel.totalRecords);
                    if (data.examItemVoList[0]) {
                        for (let i = 0; i < data.examItemVoList[0].length; i++) {
                            // if (data.examItemVoList[i].type === )
                            let title = '';
                            if (data.examItemVoList[0][i].type !== 8) {
                                title = `<div>
                                    <a name="${data.examItemVoList[0][i].id}"></a>
                                    <pre>
                                        <h1>${i + 1}、${data.examItemVoList[0][i].description}</h1>
                                    </pre>
                                 </div>`;
                            } else {
                                title = `<div>
                                    <a name="${data.examItemVoList[0][i].id}"></a>
                                    <pre>
                                        <h1>${i + 1}、${data.examItemVoList[0][i].descriptionTemp}</h1>
                                    </pre>
                                 </div>`;
                            }

                            $('.content_m_e').append(title);
                            if (data.examItemVoList[0][i].type === 1) {
                                $('.content_m_e').append(checkboxAnswer(data.examItemVoList[0][i].answertext, data.examItemVoList[0][i].id))
                            }
                            if (data.examItemVoList[0][i].type === 4 || data.examItemVoList[0][i].type === 2) {
                                $('.content_m_e').append(radioAnswer(data.examItemVoList[0][i].answertext, data.examItemVoList[0][i].id))
                            }
                            if (data.examItemVoList[0][i].type === 8) {
                                $('.content_m_e').append(blanksAnswer(data.examItemVoList[0][i].answertext, data.examItemVoList[0][i].id))
                            }
                            if (data.examItemVoList[0][i].type === 5) {
                                $('.content_m_e').append(shortAnswer(data.examItemVoList[0][i].answertext, data.examItemVoList[0][i].id))
                            }
                            // switch (data.examItemVoList[i].type) {
                            //     case 1: ;
                            //     break;
                            // }
                        }

                    }
                    //页码展示
                    setPage(data.pageModel.currpage, data.pageModel.pageSize, data.pageModel.totalPage, examId, currentUsername)
                    //提交
                    let submitButton = `<button type="button" onclick="submitExam(${data.id}, 1, null, ${data.pageModel.totalRecords})">提交</button>`;
                    $('.add_button1').append(submitButton);
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
                    console.log(1)
                    str += '<div><h2>' +
                        '<input type="checkbox" name="answers' + examId +'" id="answers'+ examId + '[' + i + ']' +'" rel="'+ examId + '" value="'+ answer[i].id + '" title="'+ answer[i].text + '" checked="checked">' + answer[i].text +
                        '</h2></div>'
                } else {
                    console.log(2)
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
                if (recordMap[answer[i].id] != undefined || recordMap[answer[i].id] !=null  ) {
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
                console.log(recordMap[answer[i].id])
                console.log(recordMap[answer[i].id] !== null && recordMap[answer[i].id] !== undefined && recordMap[answer[i].id] != 'undefined' && !recordMap[answer[i].id])
                if (recordMap[answer[i].id] !== null && recordMap[answer[i].id] !== undefined && recordMap[answer[i].id] != 'undefined' && !recordMap[answer[i].id]) {
                    str += '<div><h2>' +
                        '<input type="text" name="answertexts' + examId +'" id="answertexts' + examId + '[' + i + ']' +'" rel="' + examId + '" value="'+ recordMap[answer[i].id].answerText +'">' + recordMap[answer[i].id].answerText +
                        '<input type="hidden" name="answers'+ examId +'" rel="' + examId +'" value="'+ answer[i].id +'">' + answer[i].text +
                        '</h2></div>';
                } else {
                    str += '<div><h2>' +
                        '<input type="text" name="answertexts1' + examId +'" id="answertexts' + examId + '[' + i + ']' +'" rel="' + examId + '" value="">' +
                        '<input type="hidden" name="answers'+ examId +'" rel="' + examId +'" value="'+ answer[i].id +'">' +
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
                str += '<div>' +
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

        form.render();
        document.getElementById("LAY_layedit_" + index).contentWindow.addEventListener("blur",dothis);
        function dothis(e) {
            var _this = this.document.body.innerText;
            var v = document.getElementById("LAY_layedit_" + index);
            var teValue = v.getAttribute('textarea');
            var te = document.querySelector("textarea[id =" + "'" + teValue + "'" + "]");
            console.log(te)
            console.log(_this);
            te.innerHTML = _this;
            console.log(te);
            var p = [];
            p.push(te.name);
            p.push(te.text);
            p.push(Date.parse(new Date()) / 1000);
            $('#time_' + te.getAttribute('rel')).val(Date.parse(new Date()) / 1000);
            set.apply(te.getAttribute('rel'));
            markQuestion1(te.getAttribute('rel'));
        }
    });

    function switchPage() {
        initData = $.parseJSON(storage.getItem('questions'));
        if (initData) {
            for (var p in initData) {
                if (p != 'set')
                    formData[p] = initData[p];
                //$("#time_"+$('[name="'+p+'"]').attr('rel')).val(initData[p].time);
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
//                    if(initData[_this.attr('name')].value && initData[_this.attr('name')].value != '')
//                        batmark(_this.attr('rel'),initData[_this.attr('name')].value);
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
        //刷新页面的情况下获取答题情况
        //获取存取在storage中的答题情况
        initData = $.parseJSON(storage.getItem('questions'));
        if (initData) {
            for (var p in initData) {
                if (p != 'set')
                    formData[p] = initData[p];
                //$("#time_"+$('[name="'+p+'"]').attr('rel')).val(initData[p].time);
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
//                    if(initData[_this.attr('name')].value && initData[_this.attr('name')].value != '')
//                        batmark(_this.attr('rel'),initData[_this.attr('name')].value);
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
        //先去cookie中取出当前是第几页 如果没有默认是第一页
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





function confirmStartExam(examId) {
    //先判断当前登录人是否还有考试次数
    var flag = false;
    $.blockUI({message: '<iframe width="100%" height="100%" scrolling="no" src=../plugin/chrome_rex_game/index.html></iframe>'});
    $.ajax({
        async: false,
        data: {'examId': examId, "username": currentUsername},
        url: httpBaseUrl + "/views/isExamCanAnswer",
        type: "POST",
        success: function (data) {
            flag = data;
            $.unblockUI();
        },
        error: function (e) {
            $.unblockUI();
        }
    });
    if (flag) {
        var examUrl = httpBaseUrl + '/api/startExam?simulation=' + 0 + '&examId=' + examId;
        layer.open({
            type: 1 //Page层类型
            , area: ['500px', '500px']
            , title: '考试须知'
            , shade: 0.6 //遮罩透明度
            , maxmin: true //允许全屏最小化
            , anim: 1 //0-6的动画形式，-1不开启
            , content: '<div style="padding:20px 50px 20px 50px;">' +
                '1、考生必须自觉服从监考员等考试工作人员管理，不得以任何理由妨碍监考员等考试工作人员履行职责，不得扰乱考场及其他考试工作地点的秩序。\n' +
                '\n<br>' +
                '2、考生凭准考证、身份证，按规定时间和准考证上各科目的考试试室、座位号参加考试。\n' +
                '\n<br>' +
                '3、考生入场，除2B铅笔、书写黑色字迹的钢笔或签字笔、直尺、圆规、三角板、橡皮、手表外，其他任何物品不准带入考试室。高中起点本、专科《数学》考试，可使用没有存储记忆功能的计算器。严禁携带各种无线通讯工具（如寻呼机、移动电话、无线耳机）、电子存储记忆录放设备以及涂改液、修正带等物品进入试室。严禁穿制服进入试室参加考试。考试室内不得自行传递工具、用品等。\n' +
                '\n<br>' +
                '4、考生应在每科开考前20分钟（第一科前移10分钟）凭准考证、有效证件（身份证、现役军人身份证件）进入试室，对号入座，入座后将准考证、身份证等有效证件放在桌面靠走道边上角，以便让监考员核验。考生领到答题卡、条形码和试卷后，须认真核对答题卡的张数，核对条形码上的姓名、考生号与自己准考证上的信息是否一致。如不一致，应向监考员提出更换。在规定的时间内用黑色字迹的签字笔或钢笔准确清楚地填写答题卡上的姓名、考生号、试室号、座位号，用2B铅笔在答题卡上根据所发试卷准确填涂试题类型（A或B），并将条形码横贴在答题卡右上角的“条形码粘贴处”栏框内。凡漏填、错填、全填或字迹不清的答卷、答题卡无效。\n' +
                '\n<br>' +
                '5、开考信号发出后才能开始答题。\n' +
                '\n<br>' +
                '6、开考15分钟后禁止迟到考生进入考场、试室，离每科考试结束前30分钟，方可交卷出场，交卷出场后不得再进入试室，也不准在考场附近逗留或交谈。\n' +
                '\n<br>' +
                '7、考生在答题卡规定的区域答题。选择题用2B铅笔在选择题答题区作答，非选择题用黑色字迹钢笔或签字笔作答。不准用规定以外的笔和纸答题，不准在答卷、答题卡上做任何标记，否则答题卡无效。考生不准随意修改答题卡上的题号，考生必须在指定的题号里作答。凡不在指定答题题号框内作答、超出答题区域作答或擅自更改题号作答，其答案一律无效。如果解答中有画表或辅助线，先用铅笔进行画线、绘图，再用黑色字迹的签字笔或钢笔描黑。\n' +
                '\n<br>' +
                '8、在考场内须保持安静、不准吸烟，不准喧哗，不准交头接耳、左顾右盼、打手势、做暗号，不准夹带、旁窥、抄袭或有意让他人抄袭，不准传抄答案或交换试卷、答题卡，不准将试卷、答题卡或草稿纸带出试室。\n' +
                '\n<br>' +
                '9、遇试卷分发错误及试题字迹模糊等问题，可举手询问；涉及试题内容的疑问，不得向监考人员询问。\n' +
                '\n<br>' +
                '10、考试终了信号发出后，立即停笔，根据监考员指令依次退出试室，不准在试室逗留。<br>' +

                '<div style="text-align: center;margin-top: 8px"><a href=' + examUrl + '><button style="background-color: red;padding:4px 8px;border-radius: 4px;cursor: pointer;"><span style="color:white;font-size: 14">开始考试</span></button></a></div>' +
                '</div>'
        });
    } else {
        alert("没有更多作答次数");
    }


}

// // //考试页面下一页
// function next(toPage) {
//     //将其他的也隐藏
//     //获取cookie中的值
//     var currpage = $.cookie('currPage');
//     $("#page" + currpage).hide();
//     $("#page" + toPage).show();
//     $.cookie('currPage', toPage);
//     var page = parseInt(currpage) - 1;
//     var page2 = parseInt(toPage) - 1;
//     $(".page span:eq(" + page + ")").attr("class", "");
//     $(".page span:eq(" + page2 + ")").addClass("page_current");
//
// }
//阻止重复提交
var examFlag=true;
//提交考试
function submitExam(examId, isAutoSubmit, fromTeach, totalRecords) {
    var isSubmit = true;
    if(examFlag){
        if (isAutoSubmit != 0) {
            // 获取未标记的题目的数量
            var totalRecords = totalRecords;
            var countNumber = $('#questionindex .tdcurrent').length;

            var restItem = totalRecords - countNumber;
            if(restItem==0){
                if (confirm('提交后不可撤回，是否提交？')) {
                    isSubmit = true;
                } else {
                    isSubmit = false;
                }
            }else {
                if (confirm('剩余' + restItem + '道尚未作答，是否提交？')) {
                    isSubmit = true;
                } else {
                    isSubmit = false;
                }
            }
        }
        if (isSubmit) {
            $.blockUI({message: '<iframe width="100%" height="100%" scrolling="no" src="../modules/gvsunExam/static/chrome_rex_game/index.html"></iframe>'});
            examFlag=false;
            $.ajax({
                url: httpBaseUrl + '/views/saveTAssignmentItemMappingRedis?username=' + currentUsername + '&cid=' + siteId + '&submitTime=1' + '&simulation=' + simulation + '&assignmentId=' + examId ,
                type: "post",
                data: $('#myForm').serialize(),
                success: function (data) {
                    alert(data);
                    clearStorage();
                    $.cookie('currPage', 1);
                    $.unblockUI();
                    window.location.href = contextPath + '/gvsunexam/examList';
                    examFlag=true;
                },
                error: function (e) {
                    alert('系统异常，请稍后重试');
                    setTimeout($.unblockUI, 3000);
                    examFlag=true;
                }
            });
        }
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
