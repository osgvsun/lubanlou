/** 网格选择，ctrl键选择和shift键选择 */
$(document).ready(function () {
    pictextEventInit();
    pictextEventInit2();
});

function pictextEventInit() {
    var key = 0; //记录ctrl/shift键
    var val = ","; //记录已经选择的值
    var ibe = -1; //记录初始值
    $(window).keydown(function (e) {
        if (e.ctrlKey) {
            key = 1;
        } else if (e.shiftKey) {
            key = 2;
        }
        $(".startvalue").val("初始值:" + ibe + " key:" + key);
    }).keyup(function () {
        key = 0;
    });
    $(".pictext_net").unbind("click").click(function () {
        var i = $(this).index();
        if (ibe != -1 && key == 2) {
            $(this).siblings().removeClass("opacity1 pictext_select");
            val = ",";
            for (var ii = Math.min(i, ibe); ii <= Math.max(i, ibe); ii++) {
                val += ii + ",";
                $(".pictext_net").eq(ii).addClass("pictext_select");
            }
        } else if (key == 1) {
            if (val.indexOf("," + i + ",") != -1) {
                val = val.replace("," + i + ",", ",");
                $(this).removeClass("opacity1 pictext_select");
            } else {
                val += i + ",";
                $(this).addClass("pictext_select");
                ibe = i;
            }
        } else {
            $(this).addClass("pictext_select").siblings().removeClass("opacity1 pictext_select");
            ibe = i;
            val = "选中值:" + i + ",";
        }
        $(".ivalue").val(val);
        //右键menu hide
        $(".content_box>.user_detail").hide();
        //工具栏可点击
        pictextTriggerTools(this)
    });
    $(".pictext_net").click(function (event) {
        event.stopPropagation();
    });
    $(".startvalue").click(function (event) {
        event.stopPropagation();
    });
    $(".ivalue").click(function (event) {
        event.stopPropagation();
    });
}

//文件点击使工具栏显示
function pictextTriggerTools(_this) {
    let noFolder = false;
    //如果选中的有一个文件夹就不可选然后return
    for (let i = 0; i < $(".pictext_select").length; i++) {
        if ($(".pictext_select:eq(" + i + ")").attr("data-file-type") === "folder") {
            noFolder = true;
            break;
        }
    }
    if (noFolder) {
        toggleTools(false)
        return;
    }
    //获取数据
    let file = getFileDataByDom(_this)
    switch (file.type) {
        case "folder":
            //文件夹
            break;
        default:
            //文件
            toggleTools(true)
            break;
    }
}

//通过文件dom获取数据
function getFileDataByDom(dom) {
    let $dom = $(dom)
    return {
        id: $dom.attr("data-file-id"),
        name: $dom.find(".pn_info").text(),
        type: $dom.attr("data-file-type") || "",
        url: $dom.attr("data-file-url"),
        creator: $dom.attr("data-file-creator")
    }
}

//双击事件
function pictextEventInit2() {
    $(".pictext_net").dblclick(function (e) {
        // 文件为预览，未知则提示，文件夹则进入并更新面包屑；
        // folder为文件夹，unknow是未知，其他的都可以打开；
        let file = getFileDataByDom(e.currentTarget)
        let unpreSuffix;
        if (file.type.includes("unpreview_")) {
            let fileTypeArr = file.type.split("_")
            file.type = fileTypeArr[0];
            unpreSuffix = fileTypeArr[1];
        }
        switch (file.type) {
            case "folder":
                // 进入下一级，更新面包屑
                parent.window.viewDeepFolder(file.id, function () {
                    parent.window.resourcesCloudBreadCrumb.add(file);
                })
                break;
            case "unknow":
                // 提示未知
                top.layer.msg("未知文件，请下载后查看")
                break;
            case "unpreview":
                top.layer.msg(unpreSuffix + "文件暂不支持在线预览，请下载后查看")
                break;
            default:
                //预览文件
                previewfiles(file)
                break;
        }
    })
}

/** 网格选择，ctrl键选择和shift键选择 over */

//预览事件
function previewfiles(file) {
    let index = layer.open({
        type: 2,//此处以iframe举例
        title: '预览',
        area: ['500px', '165px'],
        shade: 0.5,
        maxmin: true,
        content: `previewFiles?url=${encodeURIComponent(file.url)}&type=${file.type}`
    });
    layer.full(index);

    function escFn(e) {
        if (e.which === 27) {
            layer.close(index);
        }
    }

    //esc关闭预览（当焦点不在预览窗口时
    $(document).keydown(escFn);
    $(top.document).keydown(escFn);
}

//工具栏操作
function toggleTools(bool) {
    let $ = parent.window.$;
    if (!bool) {
        $(".downloadfiles").addClass("po_btn_disabled")
        $(".basic_head_info").addClass("po_btn_disabled")
        $(".deletefiles").addClass("po_btn_disabled")
        $(".copyfiles").addClass("po_btn_disabled")
        $(".movefiles").addClass("po_btn_disabled")
    } else {
        $(".downloadfiles").removeClass("po_btn_disabled")
        $(".basic_head_info").removeClass("po_btn_disabled")
        $(".deletefiles").removeClass("po_btn_disabled")
        $(".copyfiles").removeClass("po_btn_disabled")
        $(".movefiles").removeClass("po_btn_disabled")
    }
}

//文件右键事件
function pictextEventInit3() {
    let layer = top.layer;
    let right = $(".pictext_net")
    let fileMenu = $(".content_box>.user_detail")
    //右键点击所在处的几种情况
    let positionType = ["folder", "file", "space"]
    //文件右键
    right.contextmenu(function (e) {
        e.preventDefault();
        //判断为文件夹还是文件
        if (e.currentTarget.getAttribute("data-file-type") === "folder") {
            menuEdit(e, positionType[0])
        } else {
            menuEdit(e, positionType[1])
        }
    });

    //空白右键
    $(document.body).contextmenu(function (e) {
        e.preventDefault();
        //target是大盒子
        let t_class = e.target.getAttribute("class");
        if (!!t_class && (t_class.includes("content_form") || t_class.includes("content_box") || t_class.includes("pictext_box"))) {
            menuEdit(e, positionType[2])
        }
    });

    //操作显示 type为menu类型，是文件夹还是文件还是空白地方
    function menuEdit(e, type) {
        let $target = $(e.currentTarget)
        $target.click();
        $(".operation_mid>a").css("display", "none");
        //后续若是不同类型文件有新增功能再调整？
        $(`.operation_mid>.${type}`).css("display", "block");
        //后续判断是否在屏幕边缘点击的右键（mt
        let x = e.clientX;
        //还要加上滚动条离顶部的高度
        let y = e.clientY + $(".content_box").scrollTop();
        fileMenu.css({left: x, top: y, display: "unset"})
    }

    //menu点击操作
    $(document).unbind("click").click(function (e) {
        let $target = $(e.target);
        if ($target.parent()[0].getAttribute("class") === "operation_mid") {
            let t_index = $target.attr("data-menu-index")
            let $select = $(".pictext_select")
            let file = {
                id: $select.attr("data-file-id"),
                title: $select.find(".pn_info").text(),
                url: $select.attr("data-file-url")
            }
            //获取index
            switch (+t_index) {
                case 999:
                    //测试
                    break;
                case 0:
                    //打开
                    $select.dblclick();
                    break;
                case 1:
                    //下载
                    top.resourceContainer.downLoadFile({fileId: file.id})
                    break;
                case 2:
                    //分享
                    break;
                case 5:
                    //移动到
                    break;
                case 6:
                    //删除
                    //文件夹和文件是不一样的方法
                    if ($select.attr("data-file-type") === "folder") {
                        //文件夹
                        //文件夹里面有文件不能删除（后续加上
                        top.layer.confirm(`删除后无法恢复，是否删除<b>${file.title}</b>文件夹？`, {
                            icon: 0,
                            title: '数据无价，谨慎操作'
                        }, function (index) {
                            //do something
                            top.resourceContainer.deleteDirectoryById({
                                directoryId: file.id,
                                success: function () {
                                    layer.msg(`删除文件夹<b>${file.title}</b>成功`, {
                                        icon: 1,
                                    });
                                    $select.remove();
                                    //清除当前列表的缓存
                                    top.resourcesCloudCaches.removeCurrentData()
                                },
                                fail: function (msg) {
                                    layer.msg(msg, {
                                        icon: 2,
                                    });
                                }
                            })
                            top.layer.close(index);
                        });
                    } else {
                        //文件
                    }
                    break;
                case 7:
                    //重命名
                    break;
                case 8:
                    //详情信息
                    if ($select.attr("data-file-type") === "folder") {
                        //获取文件夹信息
                        top.resourceContainer.getDirectoryInfoById({
                            directoryId: file.id,
                            success: function (res) {
                                console.log(res)
                            }, fail: function (eMsg) {
                                console.log(eMsg)
                            }
                        })
                    } else {
                        //文件
                    }
                    break;
                case 9:
                    //上传
                    top.$(".uploadfiles").click();
                    break;
                case 10:
                    //新建文件夹
                    top.$(".newfolder").click();
                    break;
                case 11:
                    //文件夹打包压缩下载
                    break;
            }
        }
        fileMenu.hide();
        //取消选中的方法
        $(".ivalue").val('');
        $(".startvalue").val('');
        $(".pictext_net").removeClass("pictext_select").addClass("opacity1");
        //如果没有 pictext_select 则disabled tools
        if ($(".pictext_select").length === 0) {
            toggleTools(false)
        }
    })

    /**禁止的*/
    $(document).contextmenu(function (e) {
        e.preventDefault()
    })

    fileMenu.contextmenu(function (e) {
        e.preventDefault()
    })
    /**禁止的over*/

    //文件的鼠标操作
    right.mousedown(function (e) {
        /*if (e.button == 2) {
            console.log("你点了右键");
        } else if (e.button == 0) {
            console.log("你点了左键");
        } else if (e.button == 1) {
            console.log("你点了滚轮");
        }*/
    })
}