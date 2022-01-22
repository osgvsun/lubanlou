// 自动点击展开
function autoChooseFirstFloor(step) {
    treeBindClickEvent();
    //校区 楼宇 楼层
    let autoIndexArr = [0, 0, 0]
    //获取cookie里的位置
    let cookieTreeArr = cookie.get('labTreeIndex');
    if (cookieTreeArr != undefined) {
        autoIndexArr = cookieTreeArr.split(",");
    }
    switch (step) {
        case 1:
            //校区
            $(`.eleTree-node-content:eq(${autoIndexArr[0]})`).click();
            break;
        case 2:
            //楼宇
            $(`.eleTree-node-content:eq(${autoIndexArr[0]})+.eleTree-node-group .eleTree-node-content:eq(${autoIndexArr[1]})`).click();
            break;
        case 3:
            //楼层
            $(`.eleTree-node-content:eq(${autoIndexArr[0]})+.eleTree-node-group .eleTree-node-content:eq(${autoIndexArr[1]})+.eleTree-node-group .eleTree-node-content:eq(${autoIndexArr[2]})`).click();
            break;
    }
}

function treeBindClickEvent() {
    // 添加点击事件
    $(".eleTree-node-content").unbind("click").click(function () {
        // 是最后一层才添加这个class
        if ($(this).parents(".eleTree-node").attr("data-id").toString().split("_")[1] === "floorNo") {
            $(".eleTree-node-content").removeClass("eleTree-node-content-clicked")
            $(this).addClass("eleTree-node-content-clicked")
        }
    });
}

/*
 * 此处修改，分离，用户中心公共方法，避免页面访问走用户中心文件
 */
/**
 * 获取置顶浏览器参数 解析中文
 * @param name
 * @returns {string|null}
 */
function getQueryVariableWithZhongWen(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}