var evaluationHost =$('#apiGateWayHost').val()+"/configcenter/";
var templateId =$('#templateId').val();
var timeFlag = 1;//0:已结束1:进行中2:未开始
//可视化视频
var parent = document.getElementById("videobox");
var cols = [];//根据模板获取列表表头
function flashChecker() {
    var hasFlash = 0;　　　　 //是否安装了flash
    var flashVersion = 0;　　 //flash版本

    if (document.all) {
        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (swf) {
            hasFlash = 1;
            VSwf = swf.GetVariable("$version");
            flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
        }
    } else {
        if (navigator.plugins && navigator.plugins.length > 0) {
            var swf = navigator.plugins["Shockwave Flash"];
            if (swf) {
                hasFlash = 1;
                var words = swf.description.split(" ");
                for (var i = 0; i < words.length; ++i) {
                    if (isNaN(parseInt(words[i]))) continue;
                    flashVersion = parseInt(words[i]);
                }
            }
        }
    }
    return {
        f: hasFlash,
        v: flashVersion
    };
}

var fls = flashChecker();
var s = "";
// if (!fls.f) {
//     parent.src = "./video/flvvideo"; //判断当前没有flash组件则加载flv播放
// } else {
//     parent.src = "./video/flashvideo"; //判断当前有flash组件则加载flash播放
// }
layui.define(function (exports) {
    var admin = layui.admin;

    layui.use(['form', 'element', 'table', 'laydate', 'laypage', 'layer'], function () {
        var $ = layui.$,
            admin = layui.admin,
            form = layui.form,
            element = layui.element,
            table = layui.table,
            laydate = layui.laydate,
            laypage = layui.laypage,
            layer = layui.layer;

        //向世界问个好
        layer.msg('进入实验室安全管理');

        // 获取当前选中的实验室的id
        function getLabRoomId() {
            return $(".labrelated_change>select:eq(0) :selected").val();
        }

        // 获取所有实验室：下拉框
        $.ajax({
            url: timetableHost + "/api/labroom/apiGetLabRoomList",
            type: "POST",
            dataType: "JSON",
            contentType: 'application/json; charset=UTF-8',
            success: function (data) {
                let labRoomList = data.data, labRoomStr = "";
                // 设置进select
                $.each(labRoomList, function (index, obj) {
                    labRoomStr += `<option value="${obj.labRoomId}">${obj.labRoomName}</option>`
                })
                $(".labrelated_change>select:eq(0)").append(labRoomStr)
                form.render("select", "labsecurity")
                // 如果有值就默认选中第一个
                if (labRoomList.length > 0) {
                    $("select[lay-filter=labRoomSelect]+.layui-form-select>.layui-anim>dd:eq(1)").click();
                }
            }, error: function (e) {
                layer.msg("实验室列表加载失败！", {icon: 2});
            }
        })

        // 当实验室列表改变
        form.on('select(labRoomSelect)', function (data) {
            // 修改摄像头下实验室的名称显示
            $(".lab_name").text(data.elem[data.elem.selectedIndex].text);
            // 值为空返回
            if (!data.value) {
                return false;
            }
            // 视频播放取消
            parent.src = "";
            // 获取摄像头
            getCameraListOfLab();
            // 安全员
            getLabRoomSafetyOfficer();
            // 左下3个
            getLabRoomBasicInfoList(1);
            getLabRoomBasicInfoList(2);
            getLabRoomBasicInfoList(3);
            //
            getTemplateInfo();
            // 右边3个table
            renderInspectrecordTable();
            renderInspectresultTable();
            renderSafetyinstructionTable();
        });

        form.on('select(labRoomCamera)', function (data) {
            // 值为空返回false
            if (!data.value) {
                parent.src = ""
                return false;
            }
            // 获取摄像头的数据
            $.ajax({
                url: timetableHost + "/api/labroom/getIpOfLabCamera",
                type: "POST",
                data: JSON.stringify({cameraId: data.value}),
                dataType: "JSON",
                contentType: 'application/json; charset=UTF-8',
                success: function (data) {
                    //动态设置摄像头的值
                    let rtmp = data.data;
                    sessionStorage.setItem("cameraURL", rtmp);
                    var randomnumber = Math.floor(Math.random() * 100000);
                    if (!fls.f) {
                        parent.src = "./video/flvvideo?t=" + randomnumber; //判断当前没有flash组件则加载flv播放
                    } else {
                        parent.src = "./video/flashvideo?t=" + randomnumber; //判断当前有flash组件则加载flash播放
                    }
                }
            })
        })

        // 实验室摄像头：当选择实验室后再调用，需要实验室id
        function getCameraListOfLab() {
            $.ajax({
                url: timetableHost + "/api/labroom/getCameraListOfLab",
                type: "POST",
                data: JSON.stringify({labRoomId: getLabRoomId()}),
                dataType: "JSON",
                contentType: 'application/json; charset=UTF-8',
                success: function (data) {
                    // 通过实验室id获取摄像头数据列表
                    let cameraList = data.data, cameraStr = "";
                    if (cameraList.length === 0) {
                        // layer.msg("这个实验室暂时没有摄像头！", {icon: 7})
                        $(".labrelated_change>select:eq(1)").html(`<option value="">暂无摄像头</option>`);
                        form.render("select", "labsecurity")
                        return false;
                    } else {
                        // 循环拼接数据
                        $.each(cameraList, function (index, obj) {
                            cameraStr += `<option value="${obj.id}">${obj.text}</option>`;
                        })
                        $(".labrelated_change>select:eq(1)").html(`<option value="">摄像头</option>`);
                        $(".labrelated_change>select:eq(1)").append(cameraStr)
                        // 重新渲染
                        form.render("select", "labsecurity")
                        // 有值就默认选中第一个
                        $("select[lay-filter=labRoomCamera]+.layui-form-select>.layui-anim>dd:eq(1)").click();
                    }
                }
            })
        }


        // 实验室安全员
        function getLabRoomSafetyOfficer() {
            form.render(null, 'labsecurity');
            $.ajax({
                url: timetableHost + "/api/labroom/getLabRoomSafetyOfficer",
                type: "POST",
                data: JSON.stringify({labRoomId: getLabRoomId()}),
                dataType: "JSON",
                contentType: 'application/json; charset=UTF-8',
                success: function (data) {
                    let safeManObj = data.data;
                    //安全员信息
                    form.val('labsecurity', {
                        "name": safeManObj.cname, //姓名
                        "age": safeManObj.age, //年龄
                        "tel": safeManObj.telephone, //电话
                        "jobid": safeManObj.username, //工号
                        "workyears": safeManObj.workingYears, //工龄
                        "title": safeManObj.title //职称
                    });
                }
            })
        }

        //打开实验室温湿度页面
        var humiture = {
            humiture: function () {
                //layer.msg('实验室温湿度');
                var that = this;
                //多窗口模式，层叠置顶
                var index = layer.open({
                    type: 2,//此处以iframe举例
                    title: '实验室温湿度',
                    area: ['390px', '326px'],
                    shade: 0.3,
                    maxmin: true,
                    content: 'humiture?labRoomId=' + getLabRoomId()
                });
                //layer.full(index);
            }
        };
        $('.humiture').on('click', function () {
            //判断是否选择实验室
            if (!getLabRoomId()) {
                layer.msg('请选择实验室！', {icon: 2});
                return false;
            }
            var othis = $(this),
                method = othis.data('method');
            humiture[method] ? humiture[method].call(this, othis) : '';
        });

        // 视频下面三块地方
        // 1、 获取实验列表、危险源、三废、安全须知
        function getLabRoomBasicInfoList(type = 1) {
            $.ajax({
                url: timetableHost + "/api/labroom/getLabRoomBasicInfoList",
                type: "POST",
                data: JSON.stringify({labRoomId: getLabRoomId(), type}),
                dataType: "JSON",
                contentType: 'application/json; charset=UTF-8',
                success: function (data) {
                    let str = "";
                    $.each(data.data, function (index, obj) {
                        str += `<li><a href="javascript:void(0)" lay-tips="${obj.tip}">${obj.text}：${obj.tip}</a></li>`
                    })
                    $(".news_list_container ul:eq(" + (type - 1) + ")").html(str);
                }
            })
        }

        //======================================================================================
        function getTemplateInfo() {
            $.ajax({
                url: evaluationHost + 'api/template/info?templateId='+templateId,
                type:'get',
                async: false,
                success:function (res){
                    $('#clientId').val(res.data.sourceProject);
                },
                error:function () {
                    layer.msg("获取模板信息失敗！");
                }
            });
        }
        //获取表头
        function getTableHeader(type) {
            $.ajax({
                url: evaluationHost + 'api/configIndicator/displayIndicator?templateId='+templateId,
                type:'get',
                async: false,
                success:function (res) {
                    console.log(res);
                    var coll = [];
                    var col = [];
                    col.push(
                        // {type:'checkbox'},
                        {title:'序号',width:50,type:"numbers"}
                    );
                    $.each(res.data,function (index,item){
                        col.push({
                            field: 'header'+item.id, title:item.indicatorCname,sort: true,align:'center'
                        })
                    });
                    if(type == 0){
                        col.push(
                            {field: 'currentStep',title: '当前阶段', align: 'center'},
                            {title: '操作',minWidth: 150, align: 'center', toolbar: '#toolFinished'}
                        );
                    }else if(type == 1){
                        col.push(
                            {field: 'currentStep',title: '当前阶段', align: 'center'},
                            {title: '操作',minWidth: 150, align: 'center', toolbar: '#toolOngoing'}
                        );
                    }
                    coll.push(col);
                    cols = coll;
                },
                error:function (){
                    layer.msg("获取模板列表失敗！");
                }
            });
        }
        //执行实验室安全巡检记录表单
        function renderInspectrecordTable() {
            getTableHeader(1);
            var primarySearch = $("#labRoomSelect option:selected").text();//获取实验室名称
            table.render({
                elem: '#inspectrecord',
                // url: timetableHost + "/api/labroom/getLabSafetyInspectRecord", //数据接口
                url: evaluationHost + 'api/timetable/info?templateId='+templateId+'&timeFlag=1&primarySearch='+primarySearch, //数据接口
                title: '实验室安全巡检记录',
                page: true,
                page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                    layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
                    curr: 1, //设定初始在第 5 页
                    groups: 1, //只显示 1 个连续页码
                    first: false, //不显示首页
                    last: false //不显示尾页
                },
                parseData: function(res){ //res 即为原始返回的数据
                    console.log(res);
                    var pdata = {
                        "code": 0, //解析接口状态
                        "msg": "", //解析提示文本
                        "count": res.total, //解析数据长度
                        "data": [] //解析数据列表
                    };
                    if(res.data.length>0){
                        firstStepName = res.data[0].timetableProcessDTOS[0].processCname;
                        pdata.data = [];
                        $.each(res.data ,function (index,item){
                            var record = {};
                            record.id = item.id;
                            record.step = item.currentStep;
                            record.nextFlag = 0;
                            record.timeFlag = timeFlag;
                            if(item.timetableProcessDTOS.length!=0){
                                if(item.timetableProcessDTOS[0].timetableResults.length!=0){
                                    $.each(item.timetableProcessDTOS,function (i,d) {
                                        if(d.processStep == item.currentStep){
                                            record.currentStep = d.processCname;
                                            if(d.authorityNames!=null){
                                                if(d.authorityNames.length==0){
                                                    record.nextFlag = 1;
                                                }else{
                                                    $.each(d.authorityNames,function (k,v) {
                                                        $.each(authorities,function (dex,val) {
                                                            if(v == val.authority){
                                                                record.nextFlag = 1;
                                                            }
                                                        })
                                                    })
                                                }

                                            }
                                        }else if(item.currentStep == 0){
                                            record.currentStep = '已结束';
                                        }
                                    });
                                    $.each(item.timetableProcessDTOS[0].configIndicators,function (i,d) {
                                        if(d.isShow == 1 || d.isShow == 2){
                                            if(d.indicatorName == 'current'||d.indicatorName == 'currentLogin'||d.contentType == 'select'||d.contentType == 'multiSelect'){
                                                record['header'+d.id] = item.timetableProcessDTOS[0].timetableResults[0]['evaluationScore'+(i+1)].split('_')[1]
                                            }else{
                                                record['header'+d.id] = item.timetableProcessDTOS[0].timetableResults[0]['evaluationScore'+(i+1)]
                                            }

                                        }
                                    });
                                    pdata.data.push(record);
                                }
                            }
                        });
                        console.log(pdata);
                    }
                    return pdata;
                },
                cols: cols,
                method: "GET",
                // contentType: 'application/json; charset=UTF-8',
                // where: {
                //     labRoomId: getLabRoomId()
                // },
                // parseData: function (res) {
                //     res.code = 0;
                //     return res;
                // },
                data: table,
                skin: 'line', //表格风格
                even: true,
                id: 'inspectrecord',
                limits: [5, 7, 10, 20],
                limit: 5,//每页默认显示的数量
                request:{
                    page:'page',
                    limit:'limit'
                },
            });
        }

        //搜索实验室安全巡检记录
        var $ = layui.$,
            inspectrecordactive = {
                inspectrecordreload: function () {
                    var search_box = $('#inspectrecord_search');

                    //执行重载
                    table.reload('inspectrecord', {
                        page: {
                            curr: 1 //重新从第 1 页开始
                        },
                        where: {
                            // key: {
                                search: search_box.val()
                            // }
                        }
                    }, 'data');
                }
            };

        $('.tabsearch .inspectrecord_search_btn').on('click', function () {
            var type = $(this).data('type');
            inspectrecordactive[type] ? inspectrecordactive[type].call(this) : '';
        });
        //监听行工具操作
        table.on("tool(inspectrecord)",function (obj) {
            var data=obj.data;
            //删除
            if(obj.event === 'del'){
                layer.confirm('are you sure?', function(index){
                    // obj.del(); //删除对应行（tr）的DOM结构
                    $.ajax({
                        url:  evaluationHost + 'api/timetable/deleteAll?timetableIds='+data.id,
                        // data: jsonData,
                        async: false,
                        type: "POST",
                        // contentType: "application/json;charset=UTF-8",
                        success:function (res){
                            console.log(res);
                            // location.reload();
                            table.reload('inspectrecord')
                        },
                        error: function () {
                            alert("后台出了点问题，请重试！");
                            return false;
                        }
                    });
                    layer.close(index);
                    //向服务端发送删除指令
                });
            }
            //下一阶段
            if(obj.event === 'nextstep'){
                var index = layer.open({
                    type: 2 //此处以iframe举例
                    ,
                    title: '阶段流转',
                    area: ['390px', '260px'],
                    shade: 0,
                    maxmin: true,
                    content: '../configcenter/stepCircle?timetableId='+data.id+'&clientId='+$('#clientId').val()+'&templateId='+templateId+'&step='+data.step,
                    zIndex: layer.zIndex //重点1
                    ,
                    success: function(layero) {
                        layer.setTop(layero); //重点2
                    }
                });
                layer.full(index);
            }
            //阶段总览
            if(obj.event === 'detail'){
                var index = layer.open({
                    type: 2 //此处以iframe举例
                    ,
                    title: '阶段总览',
                    area: ['390px', '260px'],
                    shade: 0,
                    maxmin: true,
                    content: '../configcenter/stepInfo?timetableId='+data.id+'&clientId='+$('#clientId').val()+'&templateId='+templateId+'&step='+data.step,
                    zIndex: layer.zIndex //重点1
                    ,
                    success: function(layero) {
                        layer.setTop(layero); //重点2
                    }
                });
                layer.full(index);
            }
        });
        //执行实验室检查结果表单
        function renderInspectresultTable() {
            getTableHeader(0);
            var primarySearch = $("#labRoomSelect option:selected").text();//获取实验室名称
            table.render({
                elem: '#inspectresult',
                // url: timetableHost + "/api/labroom/getLabSafetyInspectResult", //数据接口
                url: evaluationHost + 'api/timetable/info?templateId='+templateId+'&timeFlag=0&primarySearch='+primarySearch, //数据接口
                title: '实验室检查结果',
                page: true,
                page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                    layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
                    curr: 1, //设定初始在第 5 页
                    groups: 1, //只显示 1 个连续页码
                    first: false, //不显示首页
                    last: false //不显示尾页
                },
                parseData: function(res){ //res 即为原始返回的数据
                    console.log(res);
                    var pdata = {
                        "code": 0, //解析接口状态
                        "msg": "", //解析提示文本
                        "count": res.total, //解析数据长度
                        "data": [] //解析数据列表
                    };
                    if(res.data.length>0){
                        firstStepName = res.data[0].timetableProcessDTOS[0].processCname;
                        pdata.data = [];
                        $.each(res.data ,function (index,item){
                            var record = {};
                            record.id = item.id;
                            record.step = item.currentStep;
                            record.nextFlag = 0;
                            record.timeFlag = timeFlag;
                            if(item.timetableProcessDTOS.length!=0){
                                if(item.timetableProcessDTOS[0].timetableResults.length!=0){
                                    $.each(item.timetableProcessDTOS,function (i,d) {
                                        if(d.processStep == item.currentStep){
                                            record.currentStep = d.processCname;
                                            if(d.authorityNames!=null){
                                                if(d.authorityNames.length==0){
                                                    record.nextFlag = 1;
                                                }else{
                                                    $.each(d.authorityNames,function (k,v) {
                                                        $.each(authorities,function (dex,val) {
                                                            if(v == val.authority){
                                                                record.nextFlag = 1;
                                                            }
                                                        })
                                                    })
                                                }

                                            }
                                        }else if(item.currentStep == 0){
                                            record.currentStep = '已结束';
                                        }
                                    });
                                    $.each(item.timetableProcessDTOS[0].configIndicators,function (i,d) {
                                        if(d.isShow == 1 || d.isShow == 2){
                                            if(d.indicatorName == 'current'||d.indicatorName == 'currentLogin'||d.contentType == 'select'||d.contentType == 'multiSelect'){
                                                record['header'+d.id] = item.timetableProcessDTOS[0].timetableResults[0]['evaluationScore'+(i+1)].split('_')[1]
                                            }else{
                                                record['header'+d.id] = item.timetableProcessDTOS[0].timetableResults[0]['evaluationScore'+(i+1)]
                                            }

                                        }
                                    });
                                    pdata.data.push(record);
                                }
                            }
                        });
                        console.log(pdata);
                    }
                    return pdata;
                },
                cols: cols,
                method: "GET",
                // contentType: 'application/json; charset=UTF-8',
                // where: {
                //     labRoomId: getLabRoomId()
                // },
                // parseData: function (res) {
                //     res.code = 0;
                //     return res;
                // },
                data: table,
                skin: 'line', //表格风格
                even: true,
                id: 'inspectresult',
                limits: [5, 7, 10, 20],
                limit: 5 //每页默认显示的数量
            });
        }

        //搜索实验室检查结果
        var $ = layui.$,
            inspectresultactive = {
                inspectresultreload: function () {
                    var search_box = $('#inspectresult_search');

                    //执行重载
                    table.reload('inspectresult', {
                        page: {
                            curr: 1 //重新从第 1 页开始
                        },
                        where: {
                            key: {
                                studentname: search_box.val()
                            }
                        }
                    }, 'data');
                }
            };

        $('.tabsearch .inspectresult_search_btn').on('click', function () {
            var type = $(this).data('type');
            inspectresultactive[type] ? inspectresultactive[type].call(this) : '';
        });
        //监听行工具操作
        table.on("tool(inspectresult)",function (obj) {
            var data=obj.data;
            //删除
            if(obj.event === 'del'){
                layer.confirm('are you sure?', function(index){
                    // obj.del(); //删除对应行（tr）的DOM结构
                    $.ajax({
                        url:  evaluationHost + 'api/timetable/deleteAll?timetableIds='+data.id,
                        // data: jsonData,
                        async: false,
                        type: "POST",
                        // contentType: "application/json;charset=UTF-8",
                        success:function (res){
                            console.log(res);
                            // location.reload();
                            table.reload('inspectrecord')
                        },
                        error: function () {
                            alert("后台出了点问题，请重试！");
                            return false;
                        }
                    });
                    layer.close(index);
                    //向服务端发送删除指令
                });
            }
            //下一阶段
            if(obj.event === 'nextstep'){
                var index = layer.open({
                    type: 2 //此处以iframe举例
                    ,
                    title: '阶段流转',
                    area: ['390px', '260px'],
                    shade: 0,
                    maxmin: true,
                    content: '../configcenter/stepCircle?timetableId='+data.id+'&clientId='+$('#clientId').val()+'&templateId='+templateId+'&step='+data.step,
                    zIndex: layer.zIndex //重点1
                    ,
                    success: function(layero) {
                        layer.setTop(layero); //重点2
                    }
                });
                layer.full(index);
            }
            //阶段总览
            if(obj.event === 'detail'){
                var index = layer.open({
                    type: 2 //此处以iframe举例
                    ,
                    title: '阶段总览',
                    area: ['390px', '260px'],
                    shade: 0,
                    maxmin: true,
                    content: '../configcenter/stepInfo?timetableId='+data.id+'&clientId='+$('#clientId').val()+'&templateId='+templateId+'&step='+data.step,
                    zIndex: layer.zIndex //重点1
                    ,
                    success: function(layero) {
                        layer.setTop(layero); //重点2
                    }
                });
                layer.full(index);
            }
        });
        //执行实验室安全须知表单
        function renderSafetyinstructionTable() {
            table.render({
                elem: '#safetyinstruction',
                url: timetableHost + "/api/labroom/getLabRoomBasicInfoList", //数据接口
                title: '实验室安全须知',
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
                            fixed: 'left',
                            title: '序号',
                            width: 50,
                            align: 'center',
                            type: 'numbers'
                        }, {
                        field: 'tip',
                        title: '安全须知内容',
                        minWidth: 130,
                    }
                    ]
                ],
                method: "POST",
                contentType: 'application/json; charset=UTF-8',
                where: {
                    labRoomId: getLabRoomId(),
                    type: 4
                },
                parseData: function (res) {
                    res.code = 0;
                    return res;
                },
                data: table,
                skin: 'line', //表格风格
                even: true,
                id: 'safetyinstruction',
                page: false,
                limits: [5, 7, 10, 20],
                limit: 5 //每页默认显示的数量
            });
        }

        //搜索实验室安全须知
        var $ = layui.$,
            safetyinstructionactive = {
                safetyinstructionreload: function () {
                    var search_box = $('#safetyinstruction_search');

                    //执行重载
                    table.reload('safetyinstruction', {
                        page: {
                            curr: 1 //重新从第 1 页开始
                        },
                        where: {
                            key: {
                                studentname: search_box.val()
                            }
                        }
                    }, 'data');
                }
            };

        $('.tabsearch .safetyinstruction_search_btn').on('click', function () {
            var type = $(this).data('type');
            safetyinstructionactive[type] ? safetyinstructionactive[type].call(this) : '';
        });

    });
    // 要exports
    exports("labSecurity")
});

//实验室信息切换
$(".news_list_container").hover(
    function () {
        $(this).find(".news_list").show();
        $(this).addClass("news_selected");
        $(this).siblings().find(".news_list").hide();
        $(this).siblings().removeClass("news_selected")
    }
);

$(".news_container .news_list_container:nth-child(2)").addClass("news_selected");

//信息盒子高度
var x = $(".control_left_box").height();
var y = $(".video_box_limit").height();
//var z = $(document).height();
$(".list_box").height(x - y);

//收缩左侧可视化盒子
$(".left_control_btn").click(
    function () {
        $(this).toggleClass("left_control_change_btn");
        $(".control_right").toggleClass("control_right_change");
        $(".control_left").toggle();
    }
);
