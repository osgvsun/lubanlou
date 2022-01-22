$(function () {
    var tbodyTos = document.getElementById('tbodyTos');
    setTimeout(function () {
        individualUser();
    },);
    setTimeout(function () {
        enterpriseCustomers();
    },50);
    setTimeout(function () {
        businessUsers();
    },100);
});
    function individualUser(){
        $.ajax({
            url: apiGateWayHost + "/usercenter/clause/get",
            type: "GET",
            data: {type: '个人用户服务条款'},
            success: function (res) {
                var row = `<td>1</td><td>${res.data.type}</td><td>${res.data.name == null ? "" : res.data.name}</td><td>
                <button class="layui-btn layui-btn-normal" style="${res.data.name == null ? "" : "display: none"}" onclick="addOrEdit('${res.data.type}')">新建</button>
                <button class="layui-btn layui-btn-normal" style="${res.data.name == null ? "display: none" : ""}" onclick="addOrEdit('${res.data.type}')">编辑</button>
                </td>`;
                var tr = document.createElement("tr");
                tr.innerHTML = row;
                tbodyTos.appendChild(tr);
            }
        });
    }
    function enterpriseCustomers(){
        $.ajax({
            url: apiGateWayHost + "/usercenter/clause/get",
            type: "GET",
            data: {type: '企业用户服务条款'},
            success: function (res) {
                $('#name').val(res.data.name);
                $('#content').val(res.data.content);
                var row = `<td>2</td><td>${res.data.type}</td><td>${res.data.name == null ? "" : res.data.name}</td><td>
                <button class="layui-btn layui-btn-normal" style="${res.data.name == null ? "" : "display: none"}" onclick="addOrEdit('${res.data.type}')">新建</button>
                <button class="layui-btn layui-btn-normal" style="${res.data.name == null ? "display: none" : ""}" onclick="addOrEdit('${res.data.type}')">编辑</button>
                </td>`;
                var tr = document.createElement("tr");
                tr.innerHTML = row;
                tbodyTos.appendChild(tr);
            }
        });
    }
    function businessUsers(){
        $.ajax({
            url: apiGateWayHost + "/usercenter/clause/get",
            type: "GET",
            data: {type: '事业用户服务条款'},
            success: function (res) {
                $('#name').val(res.data.name);
                $('#content').val(res.data.content);
                var row = `<td>3</td><td>${res.data.type}</td><td>${res.data.name == null ? "" : res.data.name}</td><td>
                <button class="layui-btn layui-btn-normal" style="${res.data.name == null ? "" : "display: none"}" onclick="addOrEdit('${res.data.type}')">新建</button>
                <button class="layui-btn layui-btn-normal" style="${res.data.name == null ? "display: none" : ""}" onclick="addOrEdit('${res.data.type}')">编辑</button>
               </td>`;
                var tr = document.createElement("tr");
                tr.innerHTML = row;
                tbodyTos.appendChild(tr);
            }
        });
    }

layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'element', 'slider'], function(){
    var laydate = layui.laydate //日期
        ,laypage = layui.laypage //分页
        ,layer = layui.layer //弹层
        ,table = layui.table //表格
        ,carousel = layui.carousel //轮播
        ,upload = layui.upload //上传
        ,element = layui.element //元素操作
        ,slider = layui.slider //滑块
    const E = window.wangEditor;
    const editor = new E('#contentEditor');
    editor.create();

    setTimeout(function () {
        window.addOrEdit = function (type) {
            if (type === "个人用户服务条款"){
                $.ajax({
                    url: apiGateWayHost + "/usercenter/clause/get",
                    type: "GET",
                    data: {type: '个人用户服务条款'},
                    success: function (res) {
                        $('#name').val(res.data.name);
                        // $('#content').val(res.data.content);
                        editor.txt.html(res.data.content)
                    }
                });
            } else if (type === "企业用户服务条款"){
                $.ajax({
                    url: apiGateWayHost + "/usercenter/clause/get",
                    type: "GET",
                    data: {type: '企业用户服务条款'},
                    success: function (res) {
                        $('#name').val(res.data.name);
                        // $('#content').val(res.data.content);
                        editor.txt.html(res.data.content)
                    }
                });
            } else if (type === "事业用户服务条款"){
                $.ajax({
                    url: apiGateWayHost + "/usercenter/clause/get",
                    type: "GET",
                    data: {type: '事业用户服务条款'},
                    success: function (res) {
                        $('#name').val(res.data.name);
                        // $('#content').val(res.data.content);
                        editor.txt.html(res.data.content)
                    }
                });
            }
            console.log(type);
            layer.open({
                type: 1
                , title: type
                , area: ['70%', '90%']
                , id: 1//防止重复弹出
                , content: $('#details')
                , btn: ['添加', '取消']
                // , btnAlign: 'c' //按钮居中
                , shade: 0 //不显示遮罩
                , yes: function (index, layero) {
                    // layer.closeAll();
                    var name = $('#name').val();
                    var content = editor.txt.html();
                    $.ajax({
                        url: apiGateWayHost + '/usercenter/clause/edit',
                        type: 'POST',
                        data: {type: type, name: name, content: content},
                        success: function (res) {
                            if (res.msg == "success"){
                                layer.msg('success');
                                layer.close(index);
                            }
                        }
                    })
                }
            })
        }
    },200)

});
