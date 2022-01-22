layui.config({
    base: httpBaseUrl + "teachPublic/layui/modules/"
}).use(['laypage', 'layer', 'table', 'element', 'jquery', 'eleTree', 'code', 'form', 'slider'], function () {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        eleTree = layui.eleTree,
        code = layui.code,
        form = layui.form,
        slider = layui.slider

    //向世界问个好
    // layer.msg('进入实验分室');

    //从浏览器地址栏上获取传来的id
    let labRoomId = getQueryVariableWithZhongWen("labRoomId");

    //实验室名字显示
    let labRoomNameFromCookies = cookie.get("labRoomName");
    document.title = labRoomNameFromCookies
    $(".layui-card-header>span:eq(0)").text(cookie.get("labTitle") + "-" + labRoomNameFromCookies);

    form.render(null, 'labcatalogbox');

    $(".eleTree-search1").on("input", function () {
        el1.search($(this).val());
    })
    if (cookie.get("status")) {
        $('.header_edit').attr('href', 'labCenter?labCenterId=' + cookie.get("labCenterId") + '&type=' + cookie.get("status"))
    } else {
        $('#left').show();
    }
    if (cookie.get("searchStatus")) {
        $('#left').hide();
    }

    // 获取实验室校区数据
    let labSystemCampus = [];
    // 提示的文字
    let loadLabel = "Loading..."
    let emptyLabel = "暂无数据"
    $.ajax({
        url: labRoomHost + "/api/labroom/getAllSystemCampus",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=UTF-8",
        success: function (res) {
            // 处理data里的字段不同的数据
            for (let i = 0; i < res.data.length; i++) {
                res.data[i]['id'] = res.data[i]['campusNumber'];
                res.data[i]['label'] = res.data[i]['campusName'];
                res.data[i]['children'] = [{id: res.data[i]['id'] + "_loading", label: loadLabel}];
                delete res.data[i]['campusNumber'];
                delete res.data[i]['campusName'];
            }
            // =
            labSystemCampus = res.data;
            // init tree
            initTreeBefore();
        }, error: function (e) {
            layer.msg('校区加载失败！', {icon: 2});
        }
    })

    var el1;

    function initTreeBefore() {
        // 初始的tree数据
        let obj = {
            elem: '.ele1',
            data: labSystemCampus,
            renderAfterExpand: true, //是否在第一次展开某个树节点后才渲染其子节点
            highlightCurrent: false, //是否高亮当前选中节点，默认值是 false
            defaultExpandAll: false, //是否默认展开所有节点
            expandOnClickNode: true, //是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点
            checkOnClickNode: false, //是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点
            //defaultExpandedKeys:[23],//默认展开的节点的 key 的数组
            autoExpandParent: true, //展开子节点的时候是否自动展开父节点
            showCheckbox: false, //节点是否可被选择
            checkStrictly: false, //在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
            //defaultCheckedKeys:false,//默认勾选的节点的 key 的数组
            accordion: false, //是否每次只打开一个同级树节点展开（手风琴效果）
            indent: false, //相邻级节点间的水平缩进，单位为像素
            lazy: false, //是否懒加载子节点，需与 load 方法结合使用
            load: false,//加载子树数据的方法，仅当 lazy 属性为true 时生效
            draggable: false, //是否开启拖拽节点功能
            // contextmenuList: ["add.async", "edit", "remove"],
            searchNodeMethod: function (value, data) {
                if (!value) return true;
                // 改为拼音查询
                return PinyinMatch.match(data.label, value)
            }
        };
        // 节点点击触发事件
        eleTree.on("nodeClick(data1)", function (d) {
            //保存点击的节点以便二级页面显示
            if (d.data.index.length === 3) {
                cookie.set("labTreeIndex", d.data.index);
            }
            // id为loading和empty结尾的就return
            let currentNodeId = d.data.currentData.id;
            let currentNodeIdSplit = currentNodeId.split("_");
            let typeArr = ['loading', 'empty'];
            if (currentNodeIdSplit.length > 1 && typeArr.includes(currentNodeIdSplit[currentNodeIdSplit.length - 1])) return false;
            // 加载tree里的数据
            renderTreeFn(d)
        })

        // init tree
        el1 = eleTree.render(obj);
        // 自动加载 校区 楼宇 楼层
        autoChooseFirstFloor(1);
    }

    // 通用点击事件 1校区点击获取楼宇，2楼宇点击获取楼层，3楼层点击刷新右边的实验室
    function renderTreeFn(d) {
        // tree id
        let currentNodeId = d.data.currentData.id;
        // 向后台传输的id值
        let dataId = d.data.currentData.id.toString().split("_")[0];
        // 判断是第几层了，1校区2楼宇3楼层4就是刷新右边实验室了
        let level = d.data.index.length - 1;// -1是为了方便拿数组里的数据
        // 如果是>2就不渲染tree（这里的level 0是楼宇，1是楼层，2是实验室，因为上面-1了，2为实验室所以success方法里判断level为2调用渲染实验室的方法了
        if (level > 2) return false;
        //传参的key值
        let dataNumKeyArr = ['campusNumber', 'buildNumber', 'floorNo'];
        //获取当前要传的参的key值
        let dataNumKey_current = dataNumKeyArr[level]
        //获取返回数据里的值的name key，为了设置节点名称
        let dataNameKeyArr = ['campusName', 'buildName', 'floorName'];
        //[0根据校区获取楼宇的接口，1根据楼宇获取楼层的接口，2根据楼层获取实验室的接口]
        let requestUrlArr = ['getSystemBuildingsByCampusNumber', 'getSystemFloorsByBuildNumber', 'getLabRoomsByFloorId']
        // 校区节点点击获取楼宇的数据
        $.ajax({
            url: labRoomHost + "/api/labroom/" + requestUrlArr[level],
            type: 'POST',
            data: JSON.stringify({[dataNumKey_current]: dataId}),
            dataType: "JSON",
            contentType: 'application/json; charset=UTF-8',
            success: function (res) {
                // 2为获取的是实验室数据
                if (level === 2) {
                    // 如果不是当前实验室里的就跳转
                    if (d.data.index.toString() != cookie.get("labTreeOriginIndex")) {
                        cookie.set("labTreeOriginIndex", d.data.index.toString())
                        let labTitle;
                        // 获取所有节点数据
                        let allNodeData = el1.getAllNodeData();
                        let nodeIndex = d.data.index;
                        // 获取节点里的校区
                        let campusLabel = allNodeData[nodeIndex[0]]['label'];
                        // 获取节点里的楼宇
                        let buildLabel = allNodeData[nodeIndex[0]]['children'][nodeIndex[1]]['label'];
                        // 获取节点里的楼层
                        let floorLabel = allNodeData[nodeIndex[0]]['children'][nodeIndex[1]]['children'][nodeIndex[2]]['label']
                        // 隔断符号
                        let splitStr = "";
                        labTitle = campusLabel + splitStr + buildLabel + splitStr + floorLabel;
                        cookie.set("labTitle", labTitle);
                        location.href = "./labMain"
                    }
                    return false;
                }
                /** 下面是设置左侧目录树的代码 **/
                // 如果没有数据
                if (res.data.length === 0) {
                    // 如果是'暂无数据'的显示就不用替换了
                    if (d.data.currentData.children[0]['label'] != emptyLabel) {
                        el1.updateKeyChildren(currentNodeId, [{id: currentNodeId + "_empty", label: emptyLabel}]);
                    }
                } else {
                    // 如果来的数据和现在的数据长度一样就不更新
                    let currentNodeChildren = d.data.currentData.children;
                    if (currentNodeChildren.length !== res.data.length || currentNodeChildren[0]['label'] == loadLabel) {
                        // 添加数据
                        let arr = [];
                        for (let i = 0; i < res.data.length; i++) {
                            let resData = {
                                id: res.data[i][dataNumKeyArr[level + 1]] + "_" + dataNumKeyArr[level + 1],
                                label: res.data[i][dataNameKeyArr[level + 1]],
                                children: [{id: currentNodeId + "_loading", label: loadLabel}]
                            };
                            // 如果为楼层就不用'正在加载'的提示了，就在右边刷新实验室数据
                            if (level >= 1) {
                                delete resData['children'];
                            }
                            arr.push(resData)
                        }
                        el1.updateKeyChildren(currentNodeId, arr);
                        // 自动展开
                        autoChooseFirstFloor(level + 2)
                    }
                }
                /** 目录树的代码over **/
            }
        });
    }

    //实验室搜索
    window.labRoomChannelSearch = function () {
        let searchVal = $("#searchbox").val();
        if (searchVal) {
            Array.prototype.forEach.call($(".card_tag"), function (obj, index) {
                let labRoomName = $(obj).find("div").text()
                if (PinyinMatch.match(labRoomName, searchVal)) {
                    $(obj).show();
                } else {
                    $(obj).hide();
                }
            })
        } else {
            $(".card_tag").show();
        }
    }

    //tree over

    form.on('checkbox(test)', function (data) {
        var title = $(data.elem).attr("title");
        var isChecked = data.elem.checked;
        if (isChecked) {
            obj[title] = true;
        } else {
            obj[title] = false;
        }
        el1.reload(obj)
    });
    var arr = [];
    form.on('checkbox(menuList)', function (data) {
        var title = $(data.elem).attr("title");
        var isChecked = data.elem.checked;
        if (isChecked) {
            arr.push(title);
        } else {
            arr.splice(arr.indexOf(title), 1);
        }
        obj["contextmenuList"] = arr;
        el1.reload(obj);
    });
    slider.render({
        elem: '.slideTest',
        min: 10,
        max: 30,
        showstep: true,
        value: 16,
        change: function (value) {
            obj["indent"] = value;
            el1.reload(obj);
        }
    });

    //打开查看实验室详情
    var labdetail = {
        labdetail: function () {
            layer.msg('查看实验室详情');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2, //此处以iframe举例
                title: '查看实验室详情',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'labDetail?labRoomId=' + labRoomId
            });
            layer.full(index);
        }
    };
    $('.labdetail').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        labdetail[method] ? labdetail[method].call(this, othis) : '';
    });

    //打开实验项目
    var labproject = {
        labproject: function () {
            layer.msg('实验项目');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '实验项目',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'labProject?labRoomId=' + labRoomId
            });
            layer.full(index);
        }
    };
    $('.labproject').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        labproject[method] ? labproject[method].call(this, othis) : '';
    });

    //打开物联硬件
    var iothardware = {
        iothardware: function () {
            layer.msg('物联硬件');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '物联硬件',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'IOThardware?labRoomId=' + labRoomId
            });
            layer.full(index);
        }
    };
    $('.iothardware').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        iothardware[method] ? iothardware[method].call(this, othis) : '';
    });

    //打开物联管理员
    var iotmanager = {
        iotmanager: function () {
            layer.msg('物联管理员');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '物联管理员',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'IOTmanager?labRoomId=' + labRoomId
            });
            layer.full(index);
        }
    };
    $('.iotmanager').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        iotmanager[method] ? iotmanager[method].call(this, othis) : '';
    });

    //打开软件列表
    var softwarelist = {
        softwarelist: function () {
            layer.msg('软件列表');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '软件列表',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'softwareList?labRoomId=' + labRoomId
            });
            layer.full(index);
        }
    };
    $('.softwarelist').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        softwarelist[method] ? softwarelist[method].call(this, othis) : '';
    });

    //打开仪器设备
    var equipment = {
        equipment: function () {
            layer.msg('仪器设备');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '仪器设备',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'equipment?labRoomId=' + labRoomId
            });
            layer.full(index);
        }
    };
    $('.equipment').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        equipment[method] ? equipment[method].call(this, othis) : '';
    });

    //打开实验室管理员
    var manager = {
        manager: function () {
            layer.msg('实验室管理员');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '实验室管理员',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'manager?labRoomId=' + labRoomId
            });
            layer.full(index);
        }
    };
    $('.manager').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        manager[method] ? manager[method].call(this, othis) : '';
    });

    //打开机房电脑使用记录
    /*var computeruserecord = {
        computeruserecord: function () {
            layer.msg('机房电脑使用记录');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '机房电脑使用记录',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'computerUseRecord'
            });
            layer.full(index);
        }
    };
    $('.computeruserecord').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        computeruserecord[method] ? computeruserecord[method].call(this, othis) : '';
    });*/

    //打开授权名单管理
    var authorizationlist = {
        authorizationlist: function () {
            layer.msg('授权名单');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '授权名单',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'authorizationList'
            });
            layer.full(index);
        }
    };
    $('.authorizationlist').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        authorizationlist[method] ? authorizationlist[method].call(this, othis) : '';
    });

    //打开操作日志
    var operationlog = {
        operationlog: function () {
            layer.msg('操作日志');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '操作日志',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'operationLog'
            });
            layer.full(index);
        }
    };
    $('.operationlog').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        operationlog[method] ? operationlog[method].call(this, othis) : '';
    });

    //打开设备预约禁用时间段
    var noreservationequipment = {
        noreservationequipment: function () {
            layer.msg('设备预约禁用时间段');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '设备预约禁用时间段',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'noReservationEquipment'
            });
            layer.full(index);
        }
    };
    $('.noreservationequipment').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        noreservationequipment[method] ? noreservationequipment[method].call(this, othis) : '';
    });

    //打开设备预约开放时间段
    var openreservationequipment = {
        openreservationequipment: function () {
            layer.msg('设备预约开放时间段');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '设备预约开放时间段',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'openReservationEquipment'
            });
            layer.full(index);
        }
    };
    $('.openreservationequipment').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        openreservationequipment[method] ? openreservationequipment[method].call(this, othis) : '';
    });

    //打开非线编预约
    var nonlinebooking = {
        nonlinebooking: function () {
            layer.msg('非线编预约');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '非线编预约',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'nonLineBooking'
            });
            layer.full(index);
        }
    };
    $('.nonlinebooking').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        nonlinebooking[method] ? nonlinebooking[method].call(this, othis) : '';
    });

    //打开虚拟镜像预约(直连)
    var virtualappliancebooking = {
        virtualappliancebooking: function () {
            layer.msg('虚拟镜像预约(直连)');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '虚拟镜像预约(直连)',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'virtualApplianceBooking'
            });
            layer.full(index);
        }
    };
    $('.virtualappliancebooking').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        virtualappliancebooking[method] ? virtualappliancebooking[method].call(this, othis) : '';
    });

    //打开实验室预约设置
    var setlabreservation = {
        setlabreservation: function () {
            layer.msg('实验室预约设置');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '实验室预约设置',
                area: ['500px', '430px'],
                shade: 0.5,
                maxmin: true,
                content: 'setLabReservation?labRoomId=' + labRoomId,
                zIndex: layer.zIndex //重点1
                ,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#setlabreservationbtn");
                    submit.click();
                }
            });
        }
    };
    $('.setlabreservation').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        setlabreservation[method] ? setlabreservation[method].call(this, othis) : '';
    });

    //打开题库/考试管理
    var subjectexam = {
        subjectexam: function () {
            layer.msg('题库/考试管理');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '题库/考试管理',
                area: ['500px', '430px'],
                shade: 0.5,
                maxmin: true,
                content: 'subjectExam?labRoomId=' + labRoomId,
            });
            layer.full(index);
        }
    };
    $('.subjectexam').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        subjectexam[method] ? subjectexam[method].call(this, othis) : '';
    });

    //打开工位预约设置
    var setstationreservation = {
        setstationreservation: function () {
            layer.msg('工位预约设置');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '工位预约设置',
                area: ['500px', '365px'],
                shade: 0.5,
                maxmin: true,
                content: 'setStationReservation?labRoomId=' + labRoomId,
                zIndex: layer.zIndex //重点1
                ,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#setstationreservationbtn");
                    submit.click();
                }
            });
            //layer.full(index);
        }
    };
    $('.setstationreservation').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        setstationreservation[method] ? setstationreservation[method].call(this, othis) : '';
    });

    //打开实验室禁用时间段
    var noreservationlab = {
        noreservationlab: function () {
            layer.msg('实验室禁用时间段');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '实验室禁用时间段',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'noReservationLab?labRoomId=' + labRoomId
            });
            layer.full(index);
        }
    };
    $('.noreservationlab').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        noreservationlab[method] ? noreservationlab[method].call(this, othis) : '';
    });

    //打开实验室开放时间段
    var openreservationlab = {
        openreservationlab: function () {
            layer.msg('实验室开放时间段');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '实验室开放时间段',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'openReservationLab'
            });
            layer.full(index);
        }
    };
    $('.openreservationlab').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        openreservationlab[method] ? openreservationlab[method].call(this, othis) : '';
    });

    //打开相关资源
    var resource = {
        resource: function () {
            layer.msg('相关资源');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '相关资源',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'resource?labRoomId=' + labRoomId
            });
            layer.full(index);
        }
    };
    $('.resource').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        resource[method] ? resource[method].call(this, othis) : '';
    });

    //打开门禁记录
    var accesscontrol = {
        accesscontrol: function () {
            layer.msg('门禁记录');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '门禁记录',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'accessControl'
            });
            layer.full(index);
        }
    };
    $('.accesscontrol').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        accesscontrol[method] ? accesscontrol[method].call(this, othis) : '';
    });

    //打开准入管理
    var access = {
        access: function () {
            layer.msg('准入管理');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '准入管理',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'access'
            });
            layer.full(index);
        }
    };
    $('.access').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        access[method] ? access[method].call(this, othis) : '';
    });

    //打开考试管理
    var exam = {
        exam: function () {
            layer.msg('考试管理');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '考试管理',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'exam?labRoomId=' + labRoomId
            });
            layer.full(index);
        }
    };
    $('.exam').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        exam[method] ? exam[method].call(this, othis) : '';
    });

    //打开实验室资质
    var labqualification = {
        labqualification: function() {
            layer.msg('实验室资质');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '实验室资质',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'labQualification?labRoomId=' + labRoomId
            });
            layer.full(index);
        }
    };
    $('.labqualification').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        labqualification[method] ? labqualification[method].call(this, othis) : '';
    });

    //打开风险点
    var riskpoint = {
        riskpoint: function() {
            layer.msg('风险点');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '风险点',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'riskPoint'
            });
            layer.full(index);
        }
    };
    $('.riskpoint').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        riskpoint[method] ? riskpoint[method].call(this, othis) : '';
    });

    //打开防护要点
    var protectionpoint = {
        protectionpoint: function() {
            layer.msg('防护要点');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '防护要点',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'protectionPoint'
            });
            layer.full(index);
        }
    };
    $('.protectionpoint').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        protectionpoint[method] ? protectionpoint[method].call(this, othis) : '';
    });
    
    //根据配置中心数据设置
    let informationDetails = document.getElementById('informationDetails');
    getExperimentCenter();
    //根据房间Id去获取实验中心id
    function getExperimentCenter() {
        $.ajax({
            url: labRoomHost + '/api/labroom/getLabCenterByLabRoomId',
            type: 'GET',
            async: true,
            data: {labRoomId: labRoomId},
            success: function (res) {
                getTemplateId(res.data)
            }
        })
    }
    //根据实验中心id取templateId
    function getTemplateId(id) {
        $.ajax({
            url: apiGateWayHost + '/configcenter/api/template/infoByBusinessIdAndConfigType',
            type: 'GET',
            async: false,
            data: {BusinessId: id},
            success: function (res) {
                if (res == null){
                    getList(res.data)
                } else {
                    getList(res.data[0].id)
                }

            }
        })
    }
    //获取项目根目录
    var serverHostArray = document.location.href.split('/');
    var serverHost = serverHostArray[0] + "//" + serverHostArray[2] + "/" + serverHostArray[3] + "/";
    //根据templateId，取数据
    function getList(id) {
        $.ajax({
            url: apiGateWayHost +'/configcenter/api/configIndicator/list',
            type: 'GET',
            async: false,
            data: {templateId: id, step: 1, page: 1, limit: 999},
            success: function (res) {
                let data = res.data;
                if (data != null) {
                    for (let i = 0; i < data.length; i++){
                        var row = `<div class="card_tag configurationage" data-method="configurationage" lay-tips="查看${data[i].indicatorCname}" onclick="configurationDetails('${data[i].indicatorCname}', '${data[i].id}')">
                                       <img src="${serverHost}modules/labBranch/static/images/catalog_${Math.floor(Math.random()*27)}.png"/>
                                       <div>${data[i].indicatorCname}</div>
                                   </div>`;
                        // informationDetails.innerHTML = row
                        $('#informationDetails').append(row);
                    }

                    $('.configurationage').on('click',function () {

                    })

                }

                 window.configurationDetails = function(title, id) {
                    // console.log(id)
                    layer.msg(title);
                    var that = this;
                    //多窗口模式，层叠置顶
                    var index = layer.open({
                        type: 2 //此处以iframe举例
                        ,
                        title: title,
                        area: ['500px', '490px'],
                        shade: 0.5,
                        maxmin: true,
                        content: 'labQualification?labRoomId=' + labRoomId + '&listId=' + id,
                        cancel: function (){
                            window.sessionStorage.removeItem("templateId");
                        }
                    });
                    layer.full(index);
                }
            }
        })
    }

    /**
     * 获取登陆用户的个人信息
     */
    $.ajax({
        url: apiGateWayHost + '/usercenter/getTeacherBasicInfo',
        async: false,
        type: "GET",
        data: {
            username: username
        },
        success: function (res){
            console.log(res)
            localStorage['userInformation'] = JSON.stringify(res.data);
        }
    })

});