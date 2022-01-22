layui.use(['element', 'layer', 'form'], function () {
    var element = layui.element,
        form = layui.form,
        layer = layui.layer,
        $ = layui.jquery;

    getLicenseList();
    // 授权列表
    function getLicenseList() {
        $.ajax({
            url: oauth2Host + '/rbac/getAllPermission',
            type: 'GET',
            success: function (res) {
                console.log(res)
                let data = res;
                $('#role_list').empty();
                for (let i = 0; i < data.length; i++) {
                    let tr = `<tr>
                                <td>${i + 1}</td>
                                <td>${data[i].name}</td>
                                <td>${data[i].inheritable ? '是' : '否'}</td>
                                <td>
                                    <button type="button" class="layui-btn layui-btn-sm layui-btn-danger" onclick="deleteLicense(${data[i].uid},this)">删除</button>
                                </td>
                              </tr>`;
                    $('#role_list').append(tr);
                }
            }
        })
    }

    // 新增许可
    $('.addRole').on('click', function () {
        layer.open({
            type: 1,
            title: '新增节点',
            shade: 0.3,
            area: ['800px', '500px'],
            content: $('.model_add_license'),
            btn: ['确定', '取消'],
            success: function (layero, index) {
                layer.setTop(layero);
            },
            yes: function(index, layero) {

                let nameRole = $("input[name=nameRole]").val();
                let inheritable = $("input[name=inheritable]").val();
                console.log(inheritable)
                $.ajax({
                    url: oauth2Host + '/rbac/addPermission',
                    type: 'POST',
                    data: { 'name': nameRole, "inheritable": inheritable },
                    success: function (res) {
                        getLicenseList();
                        layer.close(index);
                    }
                })
            },
            btn2: function() {

            }
        })
    })
})
// 许可删除
function deleteLicense(id, obj) {
    var formData = new FormData();
    formData.append('uid', id)
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("DELETE", oauth2Host + "/rbac/deletePermission", true);
    xmlhttp.send(formData);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            $(obj).closest('tr').remove();
            layer.msg('删除成功')
        }
    }
}