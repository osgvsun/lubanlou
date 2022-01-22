window.onload=function () {
    $.ajax({
        url: userCenterHost + '/usercenter/getTeacherBasicInfo',
        async: false,
        type: "GET",
        data: {
            username: currentUsername
        },
        contentType:"application/json",
        success: function (res) {
            if(!res.code){
                var data=res.data;
                localStorage['role'] = JSON.stringify(data);
                if(data.roleList.length){
                    role_name=data.roleList[0].roleName;
                    localStorage['roleCname'] = data.roleList[0].roleCname;
                }
                else{
                    alert("接口返回用户权限出错！")
                }

            }
            else{
                alert(res.msg);
            }

        }
    });
    var currentRoleUid=JSON.parse(localStorage['role']).roleList[0].id;
    $.ajax({
        url: userCenterHost + '/usercenter/getMenuTree',
        async: false,
        type: "GET",
        data:{
            username:currentUsername,
            roleId:currentRoleUid,
            target:1
        },
        contentType: "json;charset=UTF-8",
        success: function (data) {
            console.log(data);
            localStorage['tree'] = JSON.stringify(data);
        }
    });
}