/** layuiAdmin.std-v1.2.1 LPPL License By http://www.layui.com/admin/ */
// ;
// console.log(currentsiteEnName);
layui.define(function (e) {
    var i = (layui.$, layui.layer, layui.laytpl, layui.setter, layui.view, layui.admin);
    /*i.events.logout = function() {
        i.req({
            url: layui.setter.base + "json/user/logout.js",
            type: "get",
            data: {},
            done: function(e) {
                i.exit(function() {
                    location.href = "user/login.html"
                })
            }
        })
    },*/
    e("common", {})
});

function editStandard(data, edit_div) {
    //回显表单数据
    for (var i = 0; i < Object.entries(data).length; i++) {
        var id = "#" + Object.entries(data)[i][0];
        var thisName = Object.entries(data)[i][0]
        var text = Object.entries(data)[i][1];
        if (id === "#id") {
            $(id, $(edit_div)).val(text);
        } else {
            $(id).val(text);
        }

    }
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]);
    return null;
}

//权限切换
function roleChange(uid) {
    /*localStorage.clear();*/
    roleNameUid = uid;
    $.ajax({
        url: userCenterHost + '/getTeacherBasicInfo',
        async: false,
        data: {
            username: currentUsername,
            roleId: roleNameUid

        },
        type: "GET",
        success: function (res) {
            if (!res.code) {
                var data = res.data;
                localStorage['role'] = JSON.stringify(data);
                localStorage['roleCname'] = data.roleList[0].roleCname;
                window.location.href = serverHost + 'index?role_name=' + data.roleList[0].roleName;
            } else {
                alert(res.msg);
            }

        }
    });

}

//打开修改密码窗口
function changePassword(obj) {
    layer.open({
        type: 1
        , title: '密码修改'
        , area: ['60%', '50%']
        , id: 'layerDemo1'/* + type*/ //防止重复弹出
        , content: $('#edit_password')
        , btnAlign: 'c' //按钮居中
        , shade: 0 //不显示遮罩
        , yes: function () {
            layer.closeAll();
        }
    });

}

//修改密码方法
//参数：beModifyUsername 被修改用户的username
//      passData     修改的密码数组对象
function modifyPass(beModifyUsername, passData) {
    var newPassWord = passData.newPassword;
    var ops = passData.oldPassword;
    $.ajax({
        url: userCenterHost + '/modifyPassword',
        type: 'POST',
        async: 'false',
        data: {
            username: beModifyUsername,
            newPassword: newPassWord,
            oldPassword: ops
        },
        success: function (res) {
            alert(res.msg);
            if (res.code === 0)
                logout()
        },
        error: function () {
            alert('接口请求失败！')
        }
    })
}

//重置密码
function resetPassword(obj) {
    layer.alert('确定要重置密码吗？（重置后为初始登入密码，即用户名）', {
        closeBtn: 1    // 是否显示关闭按钮
        , btn: ['确定', '取消'] //按钮
        , yes: function (index) {
            var currentUsername = $(obj).val();
            $.ajax({
                url: userCenterHost + '/resetPassword',//实际使用请改成服务端真实接口
                data: {
                    username: currentUsername
                },
                dataType: 'text',
                type: 'POST'
                , success: function (res) {
                    if (res === 'success') {
                        layer.alert("重置成功!");
                        location.href = serverHost + 'logout';
                    } else
                        parent.layer.alert("重置失败！")
                }
            })
        }
    })
}


/*//权限配置表单联动
function changeAllCheckbox(obj){
    if(1){
        var id=$(obj).parent().parent().parent().find('input[type=checkbox]');
        console.log(id);
        id.each(function () {
            $(this).attr('checked','true');
        })
    }
}*/
$('#newPassword').keyup(function (e) {
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var enoughRegex = new RegExp("(?=.{6,}).*", "g");
    if (false == enoughRegex.test($(this).val())) {
        $('#passstrength').html('More Characters');
    } else if (strongRegex.test($(this).val())) {
        $('#passstrength').className = 'ok';
        $('#passstrength').css('color', '#ffd400')
        $('#passstrength').html('安全性：Strong!');
    } else if (mediumRegex.test($(this).val())) {
        $('#passstrength').className = 'alert';
        $('#passstrength').css('color', '#f89706')
        $('#passstrength').html('安全性：Medium!');
    } else {
        $('#passstrength').className = 'error';
        $('#passstrength').css('color', 'red')
        $('#passstrength').html('安全性：Weak!');
    }
    return true;
});

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

if (!localStorage['oauth2']) {
    localStorage['oauth2'] = oauth2;
}
if (!localStorage['dataSource']) {
    localStorage['dataSource'] = dataSource;
}
var OAuth2Js = localStorage['oauth2'] + '/oauth/OAuth2.js';
var OAuth2Script = document.createElement("script");
OAuth2Script.type = "text/javascript";
OAuth2Script.src = OAuth2Js;
OAuth2Script.onload = function () {
    if (localStorage['dataSource'] == 'true') {
        OAuth2.initOAuth2({
            oauth2Host: localStorage['oauth2'],
            clientDetail: {
                clientId: currentsiteEnName,
                clientSecret: currentsiteSecret
            },
            username: currentUsername,
            needToken: function () {
                return true;
            }

        })
    }
};
document.getElementsByTagName("head")[0].appendChild(OAuth2Script);
// document.write("<script type=\"text/javascript\" src="+OAuth2Js+"><\/script>");
/*$(document).ready(function(){
    if(localStorage['dataSource']=='true'){
        OAuth2.initOAuth2({
            oauth2Host: localStorage['oauth2'],
            clientDetail: {
                clientId: currentsiteEnName,
                clientSecret: currentsiteSecret
            },
            username: currentUsername,
            needToken: function () {
                return true;
            }

        })
    }
    })*/
//ajax请求前执行函数
/*$(document).ajaxSend(function(event, jqxhr, settings) {
        if(localStorage['dataSource']=='true'){
            var ajaxUrl=settings.url;
            var tokenResult='';
            if(ajaxUrl.indexOf("") == -1 ){
                $.ajax({
                    url: "/teacherInformationCenter/shareApi/",
                    type: 'GET',
                    async: false,
                    data: {
                        username:encryptUsername
                    },
                    success: function (token) {
                        tokenResult=token.data;
                        /!*           $.cookie('tokenResult',tokenResult)*!/
                        // jqxhr.setRequestHeader("Content-Type", "application/json;charset=utf-8") ;//ajax预请求时要设置
                        jqxhr.setRequestHeader("Authorization", tokenResult) ;
                        /!* $.ajaxSetup({
                             headers: {
                                 "Authorization": tokenResult,
                             }
                         });*!/
                    },
                    fail:function () {
                        layer.msg("获取token失败");

                    }
                });
            }
        }

    });*/

/*
* 新用户名合法性验证
* */
function checkUserName(username, oldUserName) {
    if (username.length !== undefined && (username.length < 8 || username.length > 16)) {
        layer.alert("用户名必须为8到16位");
        return false;
    }
    if (username === oldUserName) {
        layer.alert("新用户名不能和现在的用户名相同");
        return false;
    }
    return true;
}

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

//通用退出
function logout() {
    localStorage.clear();
    $.cookie('currauth', '');
    $.cookie('currentauthName', '');
    location.href = serverHost + 'webapp/logout?outUrl=' + document.location.href;
}