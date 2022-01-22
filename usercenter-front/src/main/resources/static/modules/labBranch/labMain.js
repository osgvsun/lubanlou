layui.config({
    base: httpBaseUrl + "teachPublic/layui/modules/"
}).use(['laypage', 'layer', 'table', 'element', 'eleTree', 'jquery', 'code', 'form', 'slider', 'layCascader'], function () {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        eleTree = layui.eleTree,
        code = layui.code,
        form = layui.form,
        slider = layui.slider,
        layCascader = layui.layCascader;

   var cascader = layCascader({
        elem: '#demo1',
        extendStyle: true,
        clearable: true,
        // options: [],
        props: {
            strictMode: true,
            lazy: true,
            lazyLoad: function (node, resolve) {
                var level = node.level;
                console.log(level)
                console.log(node)
                setTimeout(() => {
                    var nodes = []
                    // var nodes = Array.from({ length: level + 2 }).map(function (item) {
                    //     return {
                    //         value: ++id,
                    //         label: '选项' + id,
                    //         leaf: level >= 1
                    //     };
                    // });

                    if (level == 0 && node.root) {
                        $.ajax({
                            url: labRoomHost + '/api/labroom/getAllSystemCampus',
                            type: 'GET',
                            async: false,
                            success: function (res) {
                                console.log(res)
                                let data = res.data;
                                nodes = data.map(v => {
                                    return { value: v.campusNumber, label: v.campusName, leaf: level >= 1}
                                })
                            }
                        })
                    }
                    if (!node.root) {
                        if (node.level == 0) {
                            $.ajax({
                                url: labRoomHost + '/api/labroom/getSystemBuildingsByCampusNumber',
                                type: 'POST',
                                async: false,
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    campusNumber: node.value
                                }),
                                success: function (res){
                                    console.log(res)
                                    let data = res.data;
                                    nodes = data.map(v => {
                                        return { value: v.buildNumber, label: v.buildName, leaf: level >= 1}
                                    })
                                }
                            })
                        }
                        if (node.level == 1) {
                            $.ajax({
                                url: labRoomHost + '/api/labroom/getSystemFloorsByBuildNumber',
                                type: 'POST',
                                async: false,
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    buildNumber: node.value
                                }),
                                success: function (res){
                                    console.log(res)
                                    let data = res.data;
                                    nodes = data.map(v => {
                                        return { value: v.floorNo, label: v.floorName, leaf: level >= 1}
                                    })
                                }
                            })
                        }
                    }
                    // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                    resolve(nodes);
                }, 1000)
            }
        }
    });

   var  authorities, //当前登录人拥有权限
        currauth = [], //当前登录人选择权限
        currentauth = cookie('currauth'), //存储当前权限
        currentauthName = cookie("currentauthName"), //当前登录名存储
        currusername = cookie("username"); //获取当前登录用户名

    getCurrentUser();
    /**
     * 获取当前登录人的权限
     */
    function getCurrentUser() {
        $.ajax({
            url: 'getCurrentUser',
            type: 'GET',
            async: false,
            success: function (res) {
                currusername = res.username;
                authorities = res.authorityMap.GvsunLims;
                if (authorities.length > 0) {
                    if (currentauth == undefined || currentauth == '' || currentauth == 'undefined') {
                        currauth.push(authorities[0].name);
                        cookie.set("currauth",currauth[0]);
                        currentauthName = authorities[0].cname;
                    } else {
                        currauth.push(currentauth);
                        currentauthName = cookie.get("currentauthName");
                        // cookie.set("currauth",currauth[0]);
                        // currentauthName = authorities[0].cname;
                    }
                    $('.changeAuth').html('切换权限（'+ currentauthName +'）');
                } else {
                    currentauth = 'visitor';
                    currentauthName = '游客';
                }
            }
        })
    };

    if (currentauthName) {
        $('.changeAuth').html('切换权限（'+ currentauthName +'）');
    }
    //切换权限
    $('.changeAuth').on('click', function(){
        var str = '';
        str+='<div class="layui-form">';
        $.each(authorities,function (index,item) {
            if(currentauth == item.name){
                str+=' <input type="radio" name="auth" value="'+ item.name +'" title="'+ item.cname +'" checked="">'
            }else{
                str+=' <input type="radio" name="auth" value="'+ item.name +'" title="'+ item.cname +'">'
            }

        });
        form.render();
        str+='</div>'
        layer.confirm(str,{
            btn: ['确定'],
            title : '请选择权限',
            closeBtn :0,//不显示关闭按钮
            area:['800px','250px'],
            // offset: 'auto',
            success: function(){
                form.render();
            },
            btn1: function (index) {
                cookie.set("currauth",$("input[name='auth']:checked").val());
                cookie.set("currentauthName", $("input[name='auth']:checked").attr("title"));
                window.location.reload()
            }
        });
    });

    // 楼层楼宇选择
    cascader.changeEvent((value, Node) => {
        let arr = cascader.getCheckedNodes();
        if (value) {
            $(".layui-card-header>span:eq(0)").text(arr[0].label + arr[1].label + arr[2].label);
            $.ajax({
                url: labRoomHost + '/api/labroom/getLabRoomsByFloorId',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    authorityName: cookie('currauth'),
                    buildNumber: arr[1].value,
                    floorNo: arr[2].value,
                    username: currusername
                }),
                success: function (res) {
                    console.log(res)
                    let data = res.data;
                    let html = '';
                    let labUrl = location.origin + "/teacherInformationCenter/labBranch/labCatalog"
                    for (let i = 0; i < data.length; i++) {
                        html += returnLabRoomDiv(data[i].labRoomId, data[i].labRoomName, data[i].labRoomNumber,labUrl + "?labRoomId=" + data[i].labRoomId, "状态不明")
                    }
                    // div值渲染进去
                    $(".duo>.grid").html(html);
                    $('#page').css("display", "none");
                    // setPage(page, limit, res.count, 'my')
                }
            })
        }
    })


    function getJWTAuthority() {
        var authorization ="";
        $.ajax({
            type: "POST",
            async: false,
            url: oauth2 + "/getAuthorization",
            data: { "siteEnName": siteEnName, "username": currusername, "type": 1},
            success: function (data) {
                authorization = data.result;
            }
        });
        return authorization;
    }


    //实验室名字显示
    if (cookie.get("labTitle")) {
        $(".layui-card-header>span:eq(0)").text(cookie.get("labTitle"));
    }

    form.render(null, 'labmainbox');

    // 目录树查询
    $(".eleTree-search1").on("input", function () {
        el1.search($(this).val());
    })

    // 获取实验室校区数据
    let labSystemCampus = [];
    // 提示的文字
    let loadLabel = "Loading..."
    let emptyLabel = "暂无数据"
    function c() {
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
    }


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
                cookie.set("labTreeOriginIndex", d.data.index);
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
        // 参数
        let dataParams = {[dataNumKey_current]: dataId};
        // 获取实验室传【楼宇】和【楼层】// 分室筛选传 权限、当前用户
        if (level === 2) {
            dataParams[dataNumKeyArr[level - 1]] = d.data.parentData.data.id.split("_")[0];
            dataParams["authorityName"] = cookie.get("currauth");
            dataParams["username"] = currusername;
        }
        //获取返回数据里的值的name key，为了设置节点名称
        let dataNameKeyArr = ['campusName', 'buildName', 'floorName'];
        //[0根据校区获取楼宇的接口，1根据楼宇获取楼层的接口，2根据楼层获取实验室的接口]
        let requestUrlArr = ['getSystemBuildingsByCampusNumber', 'getSystemFloorsByBuildNumber', 'getLabRoomsByFloorId']
        // 校区节点点击获取楼宇的数据
        $.ajax({
            url: labRoomHost + "/api/labroom/" + requestUrlArr[level],
            type: 'POST',
            data: JSON.stringify(dataParams),
            dataType: "JSON",
            contentType: 'application/json; charset=UTF-8',
            success: function (res) {
                // 2为获取的是实验室数据
                if (level === 2) {
                    // 实验室数据添加与处理
                    renderRightLab(d, res);
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

    // 渲染右边的实验室
    function renderRightLab(d, labRoomRes) {
        // 实验室加载动画s
        let loadIconIndex = layer.load(2)
        // 修改上面的标题显示
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
        $(".layui-card-header>span:eq(0)").text(labTitle);
        // 循环实验室数据拼接html添加到页面上
        let labHtml = "";
        let labUrl = location.origin + "/teacherInformationCenter/labBranch/labCatalog"
        for (let i = 0; i < labRoomRes.data.length; i++) {
            let labRoomId = labRoomRes.data[i]['labRoomId'];
            labHtml += returnLabRoomDiv(labRoomId, labRoomRes.data[i]['labRoomName'], labRoomRes.data[i]['labRoomNumber'], labUrl + "?labRoomId=" + labRoomId, "状态不明")
        }
        // div值渲染进去
        $(".duo>.grid").html(labHtml);
        // 表单里的多选按钮重新渲染
        form.render("checkbox", "labmainbox")
        // 编辑事件
        editLabRoomEvent();
        //改变加载动画
        layer.close(loadIconIndex)
    }


    // 实验室点击事件
    window.setLabRoomName = function (name, url, allstatus) {
        cookie.set("labRoomName", name);
        cookie.set("allstatus", allstatus)
        cookie.remove('status');
        cookie.remove('labCenterId');
        location.href = url;
    }

    // 传入一些参数返回实验室的html代码
//     function returnLabRoomDiv(id, name, roomNumber, url, type) {
//         //.card_icon_select为亮图标
//         let labDiv = `<div class="grid-item">
//                             <div class="card_box">
//                                 <div class="card_tit" ${roomNumber.length + name.length > 20 ? "style='padding: 1px 10px'" : '' }>
//                                     <input type="checkbox" value="${id}" name="modularbox" />
//                                     <a href="javascript:;" onclick="setLabRoomName(\'${name}\',\'${url}\')" lay-tips="进入此房间">
//                                         <span ${roomNumber.length + name.length > 20 ? "style='display: inline-block; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; width: 70%; line-height: 25px'" : ''}>${roomNumber ? roomNumber + '#' + name : ''  + name}</span>
//                                         <i class="layui-icon layui-icon-next" ${roomNumber.length + name.length > 20 ? "style='top: -7px'" : ""}></i>
//                                     </a>
//                                     ${currentauth !== "SUPERADMIN" && currentauth !== "EXCENTERDIRECTOR" && currentauth !== "ACADEMYLEVELM" && currentauth !== "LABMANAGER" ? '' : `<label class="layui-icon layui-icon-delete deletemodularlist" title="删除此房间"></label>`}
//                                 </div>
//                                 <div class="card_body">
//                                     <i class="fa fa-hdd-o card_icon_select"></i>
//                                     <i class="fa fa-lightbulb-o card_icon_select"></i>
//                                     <i class="fa fa-credit-card card_icon_select"></i>
//                                 </div>
//                                 <div class="card_bottom">
//                                     <i class="fa fa-calendar fl card_icon_select"></i>
// <!--                                    <label class="fa fa-question-circle card_state">${type}</label>-->
//                                     <i class="fa fa-wifi fr card_icon_select"></i>
//                                 </div>
//                             </div>
//                         </div>`
//         return labDiv;
//     }



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

    //打开批量设置管理员
    var setmanager = {
        setmanager: function () {
            // layer.msg('批量设置管理员');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '批量设置管理员',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'setManager',
                zIndex: layer.zIndex //重点1
                ,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#setmanagerbtn");
                    submit.click();
                }
            });
            layer.full(index);
        }
    };
    $('.setmanager').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        setmanager[method] ? setmanager[method].call(this, othis) : '';
    });

    //打开新建实验室
    var newlab = {
        newlab: function () {
            // layer.msg('新建实验室');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '新建实验室',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'newLab',
                zIndex: layer.zIndex //重点1
                ,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#newlabbtn");
                    submit.click();
                    // 实验室刷新
                    setTimeout(function () {
                        $(".eleTree-node-content-clicked").click();
                    }, 500)
                }
            });
            layer.full(index);
        }
    };
    $('.newlab').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        newlab[method] ? newlab[method].call(this, othis) : '';
    });

    // 编辑实验室的事件
    function editLabRoomEvent() {
        //批量删除
        $(".batchdelete").click(
            function () {
                $(this).hide();
                $(".batchdelete_box").show();
                $(".modulartit_icon").hide();
                $(".grid-item .layui-text-top .layui-form-checkbox").css("display", "inline-block");
                $(".grid-item .card_tit .layui-form-checkbox").css("display", "inline-block");
            }
        );

        //取消/完成
        $(".selectcancel").click(
            function () {
                $(".batchdelete_box").hide();
                $(".batchdelete").show();
                $(".grid-item .layui-text-top .layui-form-checkbox").hide();
                $(".grid-item .card_tit .layui-form-checkbox").hide();
                $(".modulartit_icon").show();
                //location.reload(true);
            }
        );

        //删除所选
        $(".selectdelete").click(
            function () {
                //获取选中的实验室的id，然后传到后台
                let labRoomIdArr = [];
                $(".layui-form-checked").parents(".grid-item").find("input:checkbox").map(function (a, b, c) {
                    labRoomIdArr.push($(b).attr('value'));
                })
                console.log(labRoomIdArr)
                layer.confirm("确定删除吗?", {title: "提示"}, function (index) {
                    //do something
                    $.ajax({
                        url: labRoomHost + "/api/labroom/deleteLabRooms",
                        type: "GET",
                        data: {labRoomIds: labRoomIdArr.toString()},
                        dataType: "JSON",
                        contentType: "application/json;charset=UTF-8",
                        success: function (res) {
                            if (res.msg == "success") {
                                layer.msg("删除成功", {icon: 1});
                            }
                            $(".layui-form-checked").parents(".grid-item").remove();
                        }, error: function (e) {
                            layer.msg("删除失败", {icon: 5});
                        }
                    })
                    layer.close(index);
                });
            }
        );

        //全选
        $(".selectall").click(
            function () {
                $(".layui-text-top input").attr('checked', 'checked');
                $(".layui-text-top .layui-form-checkbox").addClass("layui-form-checked");
                $(".card_tit input").attr('checked', 'checked');
                $(".card_tit .layui-form-checkbox").addClass("layui-form-checked");
            }
        );

        //取消全选
        $(".cancelall").click(
            function () {
                $(".layui-text-top input").removeAttr('checked');
                $(".layui-text-top .layui-form-checkbox").removeClass("layui-form-checked");
                $(".card_tit input").removeAttr('checked');
                $(".card_tit .layui-form-checkbox").removeClass("layui-form-checked");
            }
        );

        //单个删除
        $(".deletemodularlist").click(
            function () {
                let labRoomId = $(this).parents(".grid-item").find("input:checkbox").attr("value");
                layer.confirm("确定删除吗?", {title: "提示"}, (index) => {
                    $.ajax({
                        url: labRoomHost + "/api/labroom/deleteLabRoom",
                        type: "POST",
                        data: JSON.stringify({labRoomId}),
                        dataType: "JSON",
                        contentType: "application/json;charset=UTF-8",
                        success: (res) => {
                            if (res.msg == "success") {
                                layer.msg("删除成功", {icon: 1});
                            }
                            $(this).parents(".grid-item").remove();
                        }, error: function (e) {
                            layer.msg("删除失败", {icon: 5});
                        }
                    })
                    layer.close(index);
                })
            }
        );
    }
    //根据当前权限开放按钮
    $(function (){
        if (currentauth !== "SUPERADMIN" && currentauth !== "EXCENTERDIRECTOR" && currentauth !== "ACADEMYLEVELM") {
            $('.newlab').remove();
        } else {
            $('.newlab').show();
        }
        if (currentauth !== "SUPERADMIN" && currentauth !== "EXCENTERDIRECTOR" && currentauth !== "ACADEMYLEVELM" && currentauth !== "LABMANAGER") {
            $('.setmanager, .batchdelete, .deletemodularlist').remove();
        } else {
            $('.setmanager, .batchdelete, .deletemodularlist').show();
        }
    })

    setAllLabRoom(1, 12);
    /*
     * 设置所有实验室，用于初次登录，没有权限，或者没有符合要求的实验室权限的时候
     * 显示
     */
    function setAllLabRoom(page, limit) {
        $(".layui-card-header>span:eq(0)").text('全部实验室');
        $.ajax({
            url: labRoomHost + '/api/labroom/getSelectLabRoom',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                "offset": page,
                "limit": limit,
                "search": '',
                "username": currusername
            }),
            success: function (res) {
                console.log(res)
                let data  = res;
                let html = '';
                let labUrl = location.origin + "/teacherInformationCenter/labBranch/labCatalog"
                for (let i = 0; i < data.data.length; i++) {
                    html += returnLabRoomDiv(data.data[i].id, data.data[i].labRoomName, data.data[i].labRoomNumber,labUrl + "?labRoomId=" + data.data[i].id, 1)
                }
                // div值渲染进去
                $(".duo>.grid").html(html);
                setPage(page, limit, res.count)
                $('#page').css("display", "block");
                cascader.clearCheckedNodes();
                // 编辑事件
                editLabRoomEvent();
                // 表单里的多选按钮重新渲染
                form.render("checkbox", "labmainbox")
            }
        })
    }
    function setPage(page, limit, count, status) {
        laypage.render({
            elem: 'page',
            count: count,
            first: '首页',
            last: '尾页',
            limit: limit,
            curr: page,
            prev: '<em>←</em>',
            next: '<em>→</em>',
            theme: '#1E9FFF',
            layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
            limits: [12, 40, 80, 120],
            jump: function(obj, first) {
                if (!first){
                    console.log(obj.curr)

                    if (status == 'my') {
                        getMyLabRooms(obj.curr, obj.limit)
                    } else {
                        setAllLabRoom(obj.curr, obj.limit)
                    }

                }
            }
        });
    }
    // 模块信息渲染
    function returnLabRoomDiv(id, name, number, url, status) {
        let labDiv = `<div class="grid-item">
                    <div class="card_box">
                        <div class="card_tit" ${number.length + name.length > 20 ? "style='padding: 1px 10px'" : '' }>
                            <input type="checkbox" value="${id}" name="modularbox" />
                            <a href="javascript:;" onclick="setLabRoomName(\'${name}\',\'${url}\',\'${status}\')" lay-tips="进入此房间">
                                <span ${number.length + name.length > 20 ? "style='display: inline-block; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; width: 70%; line-height: 25px'" : ''}>${number ? number + '#' + name : ''  + name}</span>
                                <i class="layui-icon layui-icon-next"></i>
                            </a>
                            ${status !== 1 || (currentauth == 'LABMANAGER' || currentauth == 'EXCENTERDIRECTOR' || currentauth == 'ACADEMYLEVELM' || currentauth == 'SUPERADMIN') ? '<label class="layui-icon layui-icon-delete deletemodularlist" title="删除此房间"></label>': ''}
                        </div>
                        <div class="card_body">
                            <i class="fa fa-hdd-o card_icon_select"></i>
                            <i class="fa fa-lightbulb-o card_icon_select"></i>
                            <i class="fa fa-credit-card card_icon_select"></i>
                        </div>
                        <div class="card_bottom">
                            <i class="fa fa-calendar fl card_icon_select"></i>
                            <i class="fa fa-wifi fr card_icon_select"></i>
                        </div>
                    </div>
                </div>`
        return labDiv;
    }

    // 我的实验室
    function getMyLabRooms(page, limit) {
        $(".layui-card-header>span:eq(0)").text('我的实验室');
        $.ajax({
            url: labRoomHost + '/api/labroom/getMyLabRooms',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                "authorityName": cookie('currauth'),
                "page": page,
                "limit": limit,
                "username": currusername
            }),
            success: function (res) {
                let data = res.data.records;
                let html = '';
                let labUrl = location.origin + "/teacherInformationCenter/labBranch/labCatalog"
                for (let i = 0; i < data.length; i++) {
                    html += returnLabRoomDiv(data[i].id, data[i].labRoomName, data[i].labRoomNumber,labUrl + "?labRoomId=" + data[i].id, "状态不明")
                }
                // div值渲染进去
                $(".duo>.grid").html(html);
                setPage(page, limit, res.count, 'my');
                // 编辑事件
                editLabRoomEvent();
                $('#page').css("display", "block");
                cascader.clearCheckedNodes();
                // 表单里的多选按钮重新渲染
                form.render("checkbox", "labmainbox")
            }
        })
    }

    // 全文检索功能
    function searchLab(page, size, word) {
        $(".layui-card-header>span:eq(0)").text('实验室检索');
        $.ajax({
            // url: apiGateWayHost + '/esearch/limsproduct/room/search',
            url: 'http://dev.gvsun.com/api' + '/esearch/limsproduct/room/search',
            type: 'GET',
            headers: { "Authorization": getJWTAuthority()},
            data: { "fields": "", "from": page, "size": size, "word": word },
            success: function (res) {
                let data = res.hits;
                let labHtml = ''
                for (let i = 0; i < data.length; i++) {
                    try{
                        labHtml += returnLabRoomDiv(data[i].sourceAsMap.labRoomDetailDTO.labRoomId, data[i].sourceAsMap.labRoomDetailDTO.labRoomName, data[i].sourceAsMap.labRoomDetailDTO.labRoomNumber, location.origin + "/teacherInformationCenter/labBranch/labCatalog?labRoomId=" + data[i].sourceAsMap.labRoomDetailDTO.labRoomId, '状态不明');
                        $(".duo>.grid").html(labHtml);
                        setPageAll(page, size, res.totalHits.value, word)
                    }
                    catch (e) {
                        console.log("发生异常:" + e)
                    }
                }
                $(".duo>.grid").html(labHtml);
                setPageAll(page, size, res.totalHits.value, word);
                cascader.clearCheckedNodes()
                $('#page').css("display", "block");
            }
        })
    }

    // 取消查询 应该记录查询前是全部实验室还是我的实验室 重置页面状态
    $('.cancelSearch').on('click', function () {
        // searchLab(0, 12, "")
        setAllLabRoom(1, 12);
        $('#searchbox').val('');
    })

    //我的实验室
    $('.my_labroom').on('click', function () {
        getMyLabRooms(0, 12)
    })
    if ((currentauth !== 'LABMANAGER' && currentauth !== 'EXCENTERDIRECTOR' && currentauth !== 'ACADEMYLEVELM' && currentauth !== 'SUPERADMIN')) {
        $('.my_labroom').css('display', 'none')
    }

    function setPageAll(page, limit, count, word) {
        console.log(page)
        // if (page === 0)
        page += 1;
        // 分页偏移量计算
        page = Math.ceil(page / limit);
        laypage.render({
            elem: 'page',
            count: count,
            first: '首页',
            last: '尾页',
            limit: limit,
            curr: page,
            prev: '<em>←</em>',
            next: '<em>→</em>',
            theme: '#1E9FFF',
            layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
            limits: [12, 40, 80, 120],
            jump: function(obj, first) {
                obj.curr = Number(obj.curr) - 1;
                if (!first){
                    searchLab(obj.curr * obj.limit, obj.limit, word)
                }
            }
        });
    }

    $('#searchbox').on('keypress', function (event) {
        if (event.keyCode == 13) {
            // $('#left,.header_title span').css("display", "none");
            let word = $(this).val();
            cookie.set("searchStatus", true);
            searchLab(0, 12, word);
        }
    })

    // 顶部切换监听
    $('.all_labroom').on('click', function () {
        setAllLabRoom(1, 12);
    })

});
//取消查询
// function cancel() {
//     window.location.href= '../labBranch/labMain';
//
// }
