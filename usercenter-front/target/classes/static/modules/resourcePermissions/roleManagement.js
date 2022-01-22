layui.use(['element', 'layer'], function () {
    var element = layui.element,
        layer = layui.layer,
        $ = layui.jquery;

    getRoleList();
    //列表刷新
    function getRoleList() {
        $.ajax({
            url: oauth2Host + '/rbac/getAllRole',
            type: 'GET',
            success: function (res) {
                console.log(res)
                let data = res;
                $('#role_list').empty();
                for (let i = 0; i < data.length; i++) {
                    let tr = `<tr>
                                <td>${ i + 1}</td>
                                <td>${data[i].name}</td>
                                <td>${data[i].ename}</td>
                                <td>${data[i].type}</td>
                                <td>${data[i].cname}</td>
                                <td>
<!--                                    <button type="button" class="layui-btn layui-btn-sm layui-btn-normal">编辑</button>-->
                                    <button type="button" class="layui-btn layui-btn-sm layui-btn-normal" onclick="roleAuthorization(${data[i].uid})">授权</button>
                                    <button type="button" class="layui-btn layui-btn-sm layui-btn-danger" onclick="deleteRole(${data[i].uid},this)">删除</button>
                                </td>
                              </tr>`;
                    $('#role_list').append(tr);
                }
            }
        });
    }


    //新增角色列表
    $('.addRole').on('click', function () {
        layer.open({
            type: 1,
            title: '新增节点',
            shade: 0.3,
            area: ['800px', '500px'],
            content: $('.model_add_role'),
            btn: ['确定', '取消'],
            yes: function(index, layero) {

                let nameRole = $("input[name=nameRole]").val();
                let ename = $("input[name=ename]").val();
                let type = $("input[name=type]").val();
                $.ajax({
                    url: oauth2Host + '/rbac/addRole',
                    type: 'POST',
                    data: { 'name': nameRole, 'ename': ename, 'type': type, "cname": name },
                    success: function (res) {
                        getRoleList();
                        layer.close(index);
                        $('.add_role_form')[0].reset();
                    }
                })
            },
            btn2: function() {

            }
        })
    })

    // 角色授权
    window.roleAuthorization = function (id) {
        layer.open({
            type: 2,
            title: '角色授权',
            shade: 0.3,
            area: ['800px', '500px'],
            content: 'roleAuthorization?roleId=' + id,
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                //点击确认触发 iframe 内容中的按钮提交
                var submit = layero.find('iframe').contents().find("#addLicense");
                submit.click();
            }
        })
    }
})
//角色删除
function deleteRole(id, obj) {
    var formData = new FormData();
    formData.append('uid', id)
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("DELETE", oauth2Host + "/rbac/deleteRole", true);
    xmlhttp.send(formData);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            $(obj).closest('tr').remove();
            layer.msg('删除成功')
        }
    }
}