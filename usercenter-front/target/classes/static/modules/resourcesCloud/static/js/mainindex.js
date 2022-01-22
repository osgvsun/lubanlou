//You are a curious person, I like you (●'◡'●)
console.log("%c" + `                                                                   ______            _________
_____________________________  ___________________________   _________  /_________  _______  /
__  ___/  _ \\_  ___/  __ \\  / / /_  ___/  ___/  _ \\_  ___/   _  ___/_  /_  __ \\  / / /  __  / 
_  /   /  __/(__  )/ /_/ / /_/ /_  /   / /__ /  __/(__  )    / /__ _  / / /_/ / /_/ // /_/ /  
/_/    \\___//____/ \\____/\\__,_/ /_/    \\___/ \\___//____/     \\___/ /_/  \\____/\\__,_/ \\__,_/   
                                                                                              `, "color:#625EFD;")
//左侧栏、导航栏目录跳转定位
$(function () {
    $(".head_nav a").click(function () {
        var name = $(this).attr("name");
        window.location.hash = name; //设置锚点
    });
    $(".head_tool>a").click(function () {
        var name = $(this).attr("name");
        window.location.hash = name; //设置锚点
    });
    $(".main_tit a").click(function () {
        var name = $(this).attr("name");
        window.location.hash = name; //设置锚点
    });
    $(".sub_tit a").click(function () {
        var name = $(this).attr("name");
        window.location.hash = name; //设置锚点
    });
});

/*window.onhashchange = function() { //监听锚点的变化
	var hash = window.location.hash;
	hash = hash.substring(1, hash.length);
	alert(hash);
	$("#iframe").attr("src", hash);
}*/

//页面刷新读取标签地址
/*document.addEventListener('DOMContentLoaded', function() { //刷新
	var hash = window.location.hash;
	var url = hash.substring(1, hash.length);
	$("#iframe").attr("src", url);
}, false)*/

document.addEventListener('DOMContentLoaded', function () { //刷新
    let folderType = sessionStorage.getItem("folderType") || 0;
    document.querySelectorAll("a[data-folderType]")[folderType].click();
}, false);

//左侧栏点击效果
$(".mt_box_tit").click(
    function () {
        $(this).find(".fa").removeClass("fa-angle-down").addClass("fa-angle-right");
        $(this).addClass("mt_select").siblings().removeClass("mt_select");
        $(this).parents(".mt_box").siblings().find(".mt_box_tit").removeClass("mt_select");
        $(this).parents(".mt_box").siblings().find(".fa").removeClass("fa-angle-right").addClass("fa-angle-down");
        $(this).parents(".mt_box").siblings(".mt_box").find(".mt_box_tit").removeClass("mt_select");
        $(this).parents(".sub_mt_box").siblings(".mt_box_tit").addClass("mt_select");
        $(this).parents(".sub_mt_box").siblings(".mt_box_tit").find(".fa").removeClass("fa-angle-down").addClass("fa-angle-right");
    }
);

//左侧栏抽屉效果
$(".mt_box_tit").click(
    function () {
        $(this).siblings(".sub_mt_box").slideToggle();
        $(this).parent(".mt_box").siblings().find(".sub_mt_box").slideUp();
        $(this).parents(".mt_box").siblings(".mt_box").find(".sub_mt_box").slideUp();
    }
);

//logo点击事件
$(".head_logo").click(function () {
    sessionStorage.setItem("folderType", "0")
    let hrefArr = location.href.split("#");
    if (hrefArr.length >= 2) {
        location.href = hrefArr[0];
    } else {
        location.reload();
    }
})

/**登录信息*/
$.ajax({
    url: userCenterHost + '/usercenter/getTeacherBasicInfo',
    async: false,
    type: "GET",
    data: {
        username: currentUsername
    },
    contentType: "application/json",
    success: function (res) {
        if (!res.code) {
            var data = res.data;
            localStorage['role'] = JSON.stringify(data);
            if (data.roleList.length) {
                role_name = data.roleList[0].roleName;
                localStorage['roleCname'] = data.roleList[0].roleCname;
                resourcesCloudUserSetting();
            } else {
                alert("接口返回用户权限出错！")
            }
        } else {
            alert(res.msg);
        }
    }
});

// 文件系统中的用户信息显示
function resourcesCloudUserSetting() {
    let role = JSON.parse(localStorage['role']);
    let userCname = role.cname;
    //资源容器cname设置
    resourceContainer.userCname = userCname
    //用户名
    $(".user_info .head_tit>label").text(userCname)
    $(".user_info .ud_info>div:eq(0)").text(userCname);
    $(".user_info .ud_info>div:eq(1)").text(localStorage['roleCname']);
}