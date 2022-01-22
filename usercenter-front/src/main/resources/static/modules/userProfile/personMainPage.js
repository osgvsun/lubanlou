var serverHostArray = document.location.href.split('/');
var serverHostFilter = serverHostArray[0] + "//" + serverHostArray[2] + "/";

function initUserCenter() {
    return {userCenterHost: serverHostFilter + "/api/usercenter"};
}
var userCenterHost = initUserCenter();
$(document).ajaxSend(function (event, jqxhr, settings) {
    var ajaxUrl = settings.url;
    if (ajaxUrl.indexOf("getAuthorization") != -1) {
        settings.async = false;
    }
});

//获取链接携带参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if (r != null) return r[2];
    return null;
}

//获取备操作人的username
var beShowUsername = GetQueryString("username");
var beCname = decodeURI(GetQueryString("cname"));

// resourceContainer.initResourceContainer({
//     oauth2Host: initOauth2Host(),
//     siteName: "用户中心",
// });

//下载文件
function downLoadFile(fileId) {
    resourceContainer.getFileById({
        success: function (fileDto) {
            window.location.href = fileDto.url;
        }, fail: function (msg) {
            console.log(msg);
        }, fileId: fileId,
        needToken: true
    });
}

//获取页面栏目信息
$.ajax({
    url: serverHostFilter + 'api/usercenter/cms/getPersonalHomepageMenu',
    type: 'GET',
    dataType: 'json',
    data: {
        username: beShowUsername
    },
    success: function (res) {
        if (!res.code) {
            var menuListData = res.data;
            for (var i = 0; i < menuListData.length; i++) {
                var menuLi = '<li id="' + menuListData[i].id + '">' + menuListData[i].menuName + '</li>';
                $("#leader").append(menuLi);
            }
            if (menuListData[0]){
                $.ajax({
                    url: serverHostFilter + 'api/usercenter/cms/getPersonalHomepageMenuContent',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        id: menuListData[0].id
                    },
                    success: function (res) {
                        if (!res.code) {
                            var thisMenuContent = res.data;
                            $(".content").append('<div>' + thisMenuContent + '</div>');
                        } else {
                            console.log(res.msg);
                        }
                    },
                    fail: function () {
                        alert("获取内容请求失败！")
                    }
                })
            }

            var myTab = document.getElementById("menu"); //整个div
            var myLi = myTab.getElementsByTagName("li"); //数组

            for (var i = 0; i < myLi.length; i++) {
                myLi[i].setAttribute("index", i);
                myLi[i].onclick = function () {
                    for (var i = 0; i < myLi.length; i++) {
                        if (this.getAttribute("index") == i) {
                            myLi[i].style.color = "#fff";
                            myLi[i].style.backgroundColor = '#a09e9b61';
                            var menuId = this.id;
                            if (menuId != null) {
                                $(".content div").remove();
                                $.ajax({
                                    url: serverHostFilter + 'api/usercenter/cms/getPersonalHomepageMenuContent',
                                    type: 'GET',
                                    dataType: 'json',
                                    data: {
                                        id: menuId,
                                    },
                                    success: function (res) {
                                        if (!res.code) {
                                            var thisMenuContent = res.data;
                                            $(".content").append('<div>' + thisMenuContent + '</div>');
                                        } else {
                                            console.log(res.msg);
                                        }
                                    },
                                    fail: function () {
                                        alert("获取内容请求失败！")
                                    }
                                })
                            }
                        } else {
                            myLi[i].style.color = "";
                            myLi[i].style.backgroundColor = "";
                        }
                    }
                }
            }
        } else {
            console.log(res.content);
            layer.msg("获取栏目失败！")
        }
    }
});
$(function () {
    setTimeout(() => {
        $("#title").html(beCname + '的个人主页');
    })
})


