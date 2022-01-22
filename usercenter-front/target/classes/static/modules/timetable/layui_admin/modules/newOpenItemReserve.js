var contextPath = $("meta[name='contextPath']").attr("content");
var zuulUrl = $("#zuulServerUrl").val() + "/timetable/";

function getJWTAuthority() {
    var authorization = "";
    initDirectoryEngine({
        getHostsUrl: contextPath + "/shareApi/getHosts",
        getAuthorizationUrl: contextPath + "/shareApi/getAuthorization"
    });
    getAuthorization({
        async: false,
        success: function (data) {
            authorization = data;
        }
    });
    return authorization;
}

layui.use(['index', 'form', 'laydate', 'upload', 'laypage', 'layer', 'table', 'element'], function () {
    var $ = layui.$,
        admin = layui.admin,
        element = layui.element,
        layer = layui.layer,
        laydate = layui.laydate,
        form = layui.form,
        upload = layui.upload,
        laypage = layui.laypage,
        table = layui.table,
        formSelects = layui.formSelects;
    //上半部分判断新建还是编辑
    var flag;
    $(function () {
        var index = layer.msg('数据加载中...', {
            icon: 16,
            shade: 0.01,
            time: 0
        });
//    判断是否有selfId
        let selfId = $("#selfId").val();
        let itemId = $("#itemId").val();
        flag = (selfId == null || selfId == 'null' || selfId == '');
        console.log(selfId, itemId);
        if (!flag) {
            js_joinEdit();
            //   ajax
            $.ajax({
                url: zuulUrl + "api/timetable/self/apiGetTimetableSelfCourseForOpenItemEditData",
                type: "post",
                data: JSON.stringify({selfId, itemId}),
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                headers: {Authorization: getJWTAuthority()},
                success: function (data) {
                    layer.close(index);
                    console.log("data", data)
                    //设置值
                    dataAssigna(data);
                    //table Render
                    renderTable();
                }, error: function (e) {
                    layer.close(index);
                    layer.msg('加载失败', {icon: 5});
                }
            });
        } else {
            newFormRender();
            layer.close(index);
        }
    })

    //新建form渲染
    function newFormRender() {
        /**页面初始化**/
        //表单初始化
        form.render(null, 'newOpenItemReserveBox');
        //开始日期
        laydate.render({
            elem: '#startdate',
            type: 'datetime'
        });
        //保养结束日期
        laydate.render({
            elem: '#enddate',
            type: 'datetime'
        });
        //多选初始化
        formSelects.config('academyList', {
            keyName: 'text',
            keyVal: 'id',
        }, true);
        formSelects.config('gradeList', {
            keyName: 'text',
            keyVal: 'id',
        }, true);
        formSelects.config('majorList', {
            keyName: 'text',
            keyVal: 'id',
        }, true);
        formSelects.btns('academyList', ['remove']);
        formSelects.btns('gradeList', ['remove']);
        formSelects.btns('majorList', ['remove']);

        /**页面数据初始化**/
        var obj = new Object();
        obj.term = $("#term").val();
        $.ajax({
            url: zuulUrl + "api/timetable/self/apiGetItemAndOpenRangeForSelfCourseForOpenItem",
            type: "post",
            data: JSON.stringify(obj),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            async: false,//flag导致新增里的编辑出现刷新加载问题
            headers: {Authorization: getJWTAuthority()},
            success: function (data) {
                //项目
                let {itemList} = data;
                //学院
                let {academyList} = data;
                //年级
                let {gradeList} = data;
                //专业
                let {majorList} = data;
                /**实验项目 select init**/
                let itemListHtml;
                itemList.forEach(function (currentValue, index) {
                    itemListHtml += `<option value="${currentValue.id}">${currentValue.text}</option>`
                })
                $("select[name=itemList]").html(`<option value="">请选择项目名称</option>`);
                $("select[name=itemList]").append(itemListHtml);
                /**开放学院 select init**/
                formSelects.data('academyList', 'local', {
                    arr: academyList
                });
                formSelects.data('gradeList', 'local', {
                    arr: gradeList
                });
                formSelects.data('majorList', 'local', {
                    arr: majorList
                });
                //刷新newOpenItemReserveBox里的所有select
                form.render('select', "newOpenItemReserveBox");
            }
        })

        //    编辑里的数据显示在input上
        inputRender();
    }

    /**表单事件**/
    //监听表单 第一个表单提交
    form.on("submit(newOpenItemReserve)", function (data) {
        // layer.msg("提交表单中");
        var index = layer.load(2);//, {time: 1 * 1000});
        var objSubmit = new Object();
        //获取表单区域所有值
        var field = data.field;
        objSubmit.selfId = field.selfId;
        objSubmit.itemId = field.itemList;
        objSubmit.courseCode = $("#courseCode").val();
        objSubmit.term = $("#term").val();
        objSubmit.numbers = Number(field.person);
        objSubmit.openAcademy = field.academyList;//"0201,0202"
        objSubmit.openGrade = field.gradeList;//"2018,2019";
        objSubmit.openMajor = field.majorList;//"025100,025400";
        objSubmit.batchName = "项目预约新建课程批次";
        objSubmit.flag = 0;
        objSubmit.startDate = new Date(field.startdate).getTime();
        objSubmit.endDate = new Date(field.enddate).getTime();
        objSubmit.ifselect = 1;
        objSubmit.maxGroupNum = 1;
        objSubmit.countGroup = 1;
        $.ajax({
            url: zuulUrl + "api/timetable/self/apiSaveTimetableSelfCourseForOpenItem",
            type: "post",
            data: JSON.stringify(objSubmit),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            headers: {Authorization: getJWTAuthority()},
            success: function (data) {
                //关闭加载图标
                layer.close(index);
                dataAssigna(data);
                js_joinEdit();
                layer.msg("<span style='color: white'>可以新建项目预约时间安排了</span>");
            }, error: function (e) {
                layer.close(index);
                layer.msg("<span style='color: white'>提交失败</span>");
            }
        })
        return false;
    })

    //显示数据
    function js_joinEdit() {
        //数据设置隐藏，其他显示的修改出现
        //提交按钮隐藏
        $("#newOpenItemReserveBox .fill_box:first-child").hide();
        $("#newOpenItemReserveBox .fill_box:nth-child(2)").show();
        //编辑按钮显示
        $("#editOpenItemReserve").removeClass("layui-hide");
    }

    //数据可修改
    function js_leaveEdit() {
        //提交按钮隐藏
        $("#newOpenItemReserveBox .fill_box:first-child").show();
        $("#newOpenItemReserveBox .fill_box:nth-child(2)").hide();
        //编辑按钮显示
        $("#editOpenItemReserve").addClass("layui-hide");
        var index = layer.msg('数据加载中...', {
            icon: 16,
            shade: 0.01,
            time: 0
        });
        newFormRender();
        layer.close(index);
    }

    function inputRender() {
        // form.render(null, "newOpenItemReserveBox")
        let show_itemName = $("#itemId").val();
        let show_startDate = $("#show_startDate").text();
        let show_endDate = $("#show_endDate").text();
        let show_numbers = $("#show_numbers").text();
        let hide_openAcademy = $("#hide_openAcademy").text();
        let hide_openGrade = $("#hide_openGrade").text();
        let hide_openMajor = $("#hide_openMajor").text();

        $("#itemList").val(show_itemName);
        $("input[name=startdate]").val(show_startDate);
        $("input[name=enddate]").val(show_endDate);
        $("input[name=person]").val(show_numbers);
        //多选编辑
        formSelects.value('academyList', hide_openAcademy.split(","));//.map(Number));
        formSelects.value('gradeList', hide_openGrade.split(","));//.map(Number));
        formSelects.value('majorList', hide_openMajor.split(","));//.map(Number));
        form.render("select", "newOpenItemReserveBox")
    }

    //数据显示赋值
    function dataAssigna(data) {
        var pattern = "yyyy-MM-dd hh:mm:ss";
        //    设置数据到显示的fill_box中，显示 隐藏
        $("#selfId").val(validateNaN(data.selfId));
        $("#groupId").val(validateNaN(data.groupId));
        $("#itemId").val(validateNaN(data.itemId));
        $("#batchId").val(validateNaN(data.batchId));
        $("#show_itemName").text(validateNaN(data.itemName));
        $("#show_startDate").text((new Date(data.startDate)).Format(pattern));
        $("#show_endDate").text((new Date(data.endDate)).Format(pattern));
        $("#show_numbers").text(validateNaN(data.numbers));
        //id
        $("#hide_openAcademy").text(validateNaN(data.openAcademy));
        $("#hide_openGrade").text(validateNaN(data.openGrade));
        $("#hide_openMajor").text(validateNaN(data.openMajor));
        //name
        $("#show_openAcademyName").text(validateNaN(data.openAcademyName));
        $("#show_openGradeName").text(validateNaN(data.openGradeName));
        $("#show_openMajorName").text(validateNaN(data.openMajorName));
    }

    function validateNaN(str) {
        if (str == null || str == 'null') {
            return "";
        }
        return str;
    }

//点击编辑触发
    $("#editOpenItemReserve").click(function () {
        js_leaveEdit();
    })

    /**项目时间安排**/
    $("#newTimeArrangeBtn").click(function () {
        let _selfId = $("#selfId").val();
        console.log("_selfId", _selfId, _selfId == null || _selfId == 'null')
        if (_selfId == null || _selfId == 'null') {
            layer.msg('请提交项目预约安排', {icon: 5});
            return false;
        }
        if (!$("#newTimeArrangeBox").hasClass("layui-hide")) {
            $("#newTimeArrangeBox").toggleClass("layui-hide");
            $(".deskScopeSwitch").toggleClass("layui-hide");
        } else {
            form.render(null, 'newTimeArrangeForm');
            //多选init
            formSelects.config('weekList', {
                keyName: 'text',
                keyVal: 'id',
            }, true);
            formSelects.config('classList', {
                keyName: 'text',
                keyVal: 'id',
            }, true);
            formSelects.config('labRoomList', {
                keyName: 'text',
                keyVal: 'id',
            }, true);
            formSelects.config('userList', {
                keyName: 'text',
                keyVal: 'id',
            }, true);
            formSelects.btns('weekList', ['remove']);
            formSelects.btns('classList', ['remove']);
            formSelects.btns('labRoomList', ['remove']);
            formSelects.btns('userList', ['remove']);
            //每次打开都是重新输入
            document.getElementById("newTimeArrangeForm").reset();
            $("#newTimeArrangeBox").toggleClass("layui-hide");
            $(".deskScopeSwitch").toggleClass("layui-hide");
            //# ajax请求数据
            //## 授课教师数据
            $.ajax({
                url: zuulUrl + "api/user/apiUserList",
                type: "get",
                data: {'userRole': 1,'academyNumber':academyNumber},
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                headers: {Authorization: getJWTAuthority()},
                success: function (data) {
                    //多选赋值
                    formSelects.data('userList', 'local', {
                        arr: data.results
                    });
                }
            });
            //## 星期
            $.ajax({
                url: zuulUrl + "api/timetable/common/apiWeekDayListBySelect",
                type: "get",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                headers: {Authorization: getJWTAuthority()},
                success: function (data) {
                    //多选赋值
                    let itemListHtml;
                    data.results.forEach(function (currentValue, index) {
                        itemListHtml += `<option value="${currentValue.id}">${currentValue.text}</option>`
                    })
                    $("select[name=weekDayList]").html(`<option value="">请选择星期</option>`);
                    $("select[name=weekDayList]").append(itemListHtml);
                    form.render('select', "newTimeArrangeForm");
                }
            });
            //## 节次
            $.ajax({
                url: zuulUrl + "api/timetable/common/apiClassListBySelect",
                type: "post",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                headers: {Authorization: getJWTAuthority()},
                success: function (data) {
                    formSelects.data('classList', 'local', {
                        arr: data.results
                    });
                }
            });
            //监听指定开关
            form.on('switch(switchTest)', function(data){
                // layer.msg(this.checked)
                if(this.checked){
                    $('.desk_scope').removeClass('layui-hide')
                    $('[id^=desk_select]').attr("lay-verify","required")
                }else{
                    $('.desk_scope').addClass('layui-hide')
                    $('[id^=desk_select]').removeAttr("lay-verify")
                    $('[id^=desk_select]').removeAttr("_lay-verify")//formselects附加属性
                }
                layui.formSelects.render('deskNumStart');
                layui.formSelects.render('deskNumEnd');
                // form.render('select')//使用这个可以注释_lay-verify
            });
            //监听下拉框
            form.on('select(weekDayList)', function (data) {
                // console.log(data.elem); //得到select原始DOM对象
                // console.log(data.value); //得到被选中的值
                // console.log(data.othis); //得到美化后的DOM对象
                labRoomSelectCheck();
            });
            //多选监听
            formSelects.on('classList', function (id, vals, val, isAdd, isDisabled) {
                //id:           点击select的id
                //vals:         当前select已选中的值
                //val:          当前select点击的值
                //isAdd:        当前操作选中or取消
                //isDisabled:   当前选项是否是disabled
                labRoomSelectCheck();
            });

            //上面3个change触发判断，3个有值就可以选实验室
            function labRoomSelectCheck() {
                //实验室不可选
                formSelects.disabled('labRoomList');
                //local模式 清空
                formSelects.data('labRoomList', 'local', {
                    arr: []
                });
                //多选赋值延迟 所以.5s后执行
                setTimeout(function () {
                    var data = form.val("newTimeArrangeForm");
                    let {weekDayList} = data;
                    // let {classList} = data;
                    let classList = formSelects.value('classList', 'valStr');
                    if (weekDayList && classList) {
                        //实验室可以选 ajax
                        formSelects.undisabled('labRoomList');
                        //ajax
                        var labRoomParams = new Object();
                        labRoomParams.term = $("#term").val();
                        labRoomParams.weekday = weekDayList;
                        labRoomParams.classes = classList;
                        labRoomParams.weeks = "";
                        labRoomParams.soft = "";
                        labRoomParams.role = role;
                        labRoomParams.createdBy = username;
                        $.ajax({
                            url: zuulUrl + "api/labroom/apiLabRoomListBySelect",
                            type: "post",
                            contentType: "application/json;charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify(labRoomParams),
                            headers: {Authorization: getJWTAuthority()},
                            success: function (data) {
                                //多选赋值
                                formSelects.data('labRoomList', 'local', {
                                    arr: data.results
                                });
                            }
                        });
                    } else {
                        //实验室不可选
                        formSelects.disabled('labRoomList');
                        //local模式 清空
                        formSelects.data('labRoomList', 'local', {
                            arr: []
                        });
                    }
                }, 500);
            }

            //## 周次
            formSelects.on('labRoomList', function (id, vals, val, isAdd, isDisabled) {
                //id:           点击select的id
                //vals:         当前select已选中的值
                //val:          当前select点击的值
                //isAdd:        当前操作选中or取消
                //isDisabled:   当前选项是否是disabled
                weekListSelectCheck();
            });

            //周次
            function weekListSelectCheck() {
                //不可选
                formSelects.disabled('weekList');
                //local模式 清空
                formSelects.data('weekList', 'local', {
                    arr: []
                });
                setTimeout(function () {
                    let labRoomList = formSelects.value('labRoomList', 'valStr');
                    console.log("labRoomList", labRoomList)
                    if (labRoomList) {
                        //有值 ajax周次
                        formSelects.undisabled('weekList');
                        var data = form.val("newTimeArrangeForm");
                        console.log("data", data);
                        //参数init
                        let weekListParams = new Object();
                        weekListParams.weekday = data.weekDayList;
                        weekListParams.term = $("#term").val();
                        weekListParams.classes = data.classList;
                        weekListParams.labRoomIds = data.labRoomList;

                        $.ajax({
                            url: zuulUrl + "api/timetable/common/apiWeekListBySelect",
                            type: "post",
                            contentType: "application/json;charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify(weekListParams),
                            headers: {Authorization: getJWTAuthority()},
                            success: function (data) {
                                console.log("data.weekList", data.results)
                                //多选赋值
                                formSelects.data('weekList', 'local', {
                                    arr: data.results
                                });
                            }
                        });
                    } else {
                        //不可选
                        formSelects.disabled('weekList');
                        //local模式 清空
                        formSelects.data('weekList', 'local', {
                            arr: []
                        });
                    }
                }, 500);
            }
        }
    })
    $("#newTimeArrangeSubmit").next("button").click(function () {
        $("#newTimeArrangeBox").toggleClass("layui-hide");
    })

    //项目预约时间安排-新建表单提交
    form.on('submit(newTimeArrangeSubmit)', function (data) {
        //提交动画
        var index = layer.load(2);
        var field = data.field;
        console.log(field);
        //第二个表单提交数据
        var arrangeObj = new Object();
        arrangeObj.station = [];
        arrangeObj.selfId = $("#selfId").val();
        arrangeObj.sameNumberId = -1;
        arrangeObj.timetableStyle = 6;
        arrangeObj.labRoomIds = formSelects.value('labRoomList', 'val').map(Number);
        arrangeObj.status = 10;
        arrangeObj.role = role;
        arrangeObj.term = term;
        arrangeObj.createdBy = username;
        arrangeObj.groupId = $("#groupId").val();
        arrangeObj.weekday = field.weekDayList;
        arrangeObj.tearchs = formSelects.value('userList', 'val');
        arrangeObj.items = [Number($("#itemId").val())];
        arrangeObj.weeks = formSelects.value('weekList', 'val').map(Number);
        arrangeObj.classes = formSelects.value('classList', 'val').map(Number);
        var startDesk = field['deskNumStart'];
        var endDesk = field['deskNumEnd'];
        if(startDesk!=""){
            if(Number(endDesk)<=Number(startDesk)){
                alert('请正确选择桌号区间!');
                layer.close(index);
                return false;
            }
            for (var n = Number(startDesk); n <= Number(endDesk); n++) {
                arrangeObj.station.push(n);
            }
        }
        // console.log(arrangeObj, "arrangeObj")
        $.ajax({
            url: zuulUrl + "api/timetable/self/apiSaveSelfReTimetable",
            type: "post",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(arrangeObj),
            headers: {Authorization: getJWTAuthority()},
            success: function (data) {
                console.log(data);
                layer.close(index);
                if (data) {
                    layer.msg("<span style='color: white'>提交成功</span>")
                    renderTable();
                } else {
                    layer.msg("<span style='color: white'>提交失败</span>")
                }
                $("#newTimeArrangeBox").toggleClass("layui-hide");
            }, error: function (e) {
                layer.close(index);
                layer.msg("<span style='color: white'>提交失败</span>")
            }
        })
        return false;
    })

    //提交后刷新table
    function renderTable() {
        //执行已选设备表单
        table.render({
            elem: '#selectedlist',
            url: zuulUrl + "api/timetable/manage/apiTimetableGroupList", //数据接口
            where: {batchId: $("#batchId").val(),createdBy:username,role:role},
            method: "post",
            title: '已选设备',
            contentType: "application/json;charset=utf-8",
            headers: {Authorization: getJWTAuthority()},
            parseData: function (res) { //res 即为原始返回的数据
                console.log("res", res, res.rows);
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.msg, //解析提示文本
                    "count": res.total, //解析数据长度
                    "data": res.rows.length > 0 ? res.rows[0].timetables : []//解析数据列表
                };
            },
            page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
                curr: 1, //设定初始在第 5 页
                groups: 1, //只显示 1 个连续页码
                first: false, //不显示首页
                last: false //不显示尾页
            },
            cols: [
                [ //表头
                    {
                        fixed: 'weekday',
                        title: '星期',
                        type: 'numbers',
                        templet: function (d) {
                            return `星期${d.weekday}`;
                        }
                    },
                    {
                        field: 'weeks',
                        title: '周次',
                        sort: true,
                        templet: function (d) {
                            return `[${d.startWeek}-${d.endWeek}]周`;
                        }
                    },
                    {
                        field: 'state',
                        title: '节次',
                        sort: true,
                        templet: function (d) {
                            return `[${d.startClass}-${d.endClass}]节`;
                        }
                    }, {
                        field: 'station',
                        title: '起止桌号',
                        sort: true,
                        templet: function (d) {
                            if(d.station && d.station.length>0){
                                return `${d.station[0]}-${d.station[d.station.length-1]}`;
                            }else{
                                return `未设置桌号`;
                            }

                        }
                    }, {
                    field: 'labInfo',
                    title: '实验室',
                    sort: true
                }, {
                    field: 'teachers',
                    title: '授课教师'
                }, {
                    fixed: 'right',
                    title: '操作',
                    width: 120,
                    align: 'center',
                    toolbar: '#operation'
                }
                ]
            ],
            data: table,
            skin: 'line', //表格风格
            even: true,
            id: 'selectedlist',
            page: true,
            limits: [5, 7, 10, 20],
            limit: 5 //每页默认显示的数量
        });
    }

    //监听行工具事件
    table.on('tool(selectedlist)', function (obj) { //注：tool是工具条事件名，selectedlist 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        console.log("dataaa", data);
        layEvent = obj.event; //获得 lay-event 对应的值
        /*if(layEvent === 'reportdetail') {
            layer.msg('查看提交内容详情');
        };*/
        var id = data.sameNumberId;
        //打开查看详情
        if (obj.event === 'del') {
            layer.confirm('真的删除行么', function (index) {
                layer.close(index);
                let msgIndex = layer.load(2);
                $.ajax({
                    url: zuulUrl + "api/timetable/manage/apiDeleteTimetableBySameNumberId?id=" + id+"&createdBy="+username,
                    type: "post",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    headers: {Authorization: getJWTAuthority()},
                    success: function (data) {
                        obj.del();
                        layer.close(msgIndex);
                    }, error: function (e) {
                        layer.close(msgIndex);
                        layer.msg("<span style='color: white'>删除失败</span>")
                    }
                })

            });
        }
        ;
    });
});