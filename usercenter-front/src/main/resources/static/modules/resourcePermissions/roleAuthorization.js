layui.config({
    base: '../teachPublic/layui/modules/'
}).extend({
    eleTree: 'eleTree',
}).use(['element', 'eleTree', 'layer'], function () {
    var element = layui.element,
        eleTree = layui.eleTree,
        layer = layui.layer,
        $ = layui.jquery;

    //全局变量声明
    var treeObj;
    // 资源树
    var eleTreeObj = {
        elem: '.ele1',
        renderAfterExpand: true, //是否在第一次展开某个树节点后才渲染其子节点
        highlightCurrent: false, //是否高亮当前选中节点，默认值是 false
        defaultExpandAll: false, //是否默认展开所有节点
        expandOnClickNode: true, //是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点
        checkOnClickNode: false, //是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点
        //defaultExpandedKeys:[23],//默认展开的节点的 key 的数组
        autoExpandParent: true, //展开子节点的时候是否自动展开父节点
        showCheckbox: true, //节点是否可被选择
        checkStrictly: false, //在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
        //defaultCheckedKeys:false,//默认勾选的节点的 key 的数组
        accordion: false, //是否每次只打开一个同级树节点展开（手风琴效果）
        indent: false, //相邻级节点间的水平缩进，单位为像素
        lazy: false, //是否懒加载子节点，需与 load 方法结合使用
        load: false, //加载子树数据的方法，仅当 lazy 属性为true 时生效
        draggable: false, //是否开启拖拽节点功能
        searchNodeMethod: function(value, data) {
            if(!value) return true;
            return data.label.indexOf(value) !== -1;
        }
    }

    // 获取当前角色权限
    let rolePermissions = {}
    $.ajax({
        url: oauth2Host + '/rbac/getRoleResources',
        async: false,
        data: { "roleId": roleId },
        success: function (res) {
            let data = res.children;
            rolePermissions = data;
        }
    })

    let updateData = []
    $.ajax({
        url: oauth2Host + '/rbac/getResourceTree',
        async: false,
        success: function (res) {
            let data = res.children;
            res.children = data
            updateData = getTreeData(res)
            renderEleTree(getTreeData(res))
        }
    })
    // 树形组建渲染
    function renderEleTree(data) {
        eleTreeObj['data'] = data;
        let el1 = eleTree.render(eleTreeObj);
        treeObj = eleTree.render(eleTreeObj);
        $('[lay-filter="data1"]').find('.eleTree-node').find('.eleTree-node-content').eq(0).click();
        el1.expandAll();
        $(".eleTree-search1").on("change", function() {
            el1.search($(this).val());
        })
    }
    function getTreeData(res) {
        let data = [];
        if(res.children.length === 0)
            return data;
        $.each(res.children,function (index,item){
            var firstConfig = new Object();
            firstConfig['id'] = item.uid;
            firstConfig['label'] = item.attribute.name;
            firstConfig['attribute'] = item.attribute;
            firstConfig['children'] = [];
            if (item.children.length > 0) {
                firstConfig['children'] = [];
                $.each(item.children, function (i,d) {
                    let status = 0;
                    let arr = [];

                    if (rolePermissions.length !== 0) {
                        for (let i = 0; i < rolePermissions.length; i++) {
                            if (d.parent === rolePermissions[i].uid) {
                                for (let j = 0; j < rolePermissions[i].children.length; j++) {
                                    if (d.uid === rolePermissions[i].children[j].uid) {
                                        status = 1;
                                        if (d.children.length === 0 && d.attribute.permissionList.length === 0) {
                                            status = 2;
                                        }
                                        arr = rolePermissions[i].children;
                                        j = rolePermissions[i].children.length;
                                    }
                                }
                            }
                        }

                    }
                    firstConfig['children'].push(childrenTreeData(d, item.uid, arr, status));
                })
            }
            else if(item.children.length === 0){
                firstConfig['children'] = [];
                $.each(item.attribute.permissionList,function (i,d) {
                    let arr = []
                    if (rolePermissions.length !== 0) {
                        for (let i = 0; i < rolePermissions.length; i++) {
                            if (item.attribute.uid === rolePermissions[i].uid) {
                                arr = rolePermissions[i].attribute.permissionList;
                            }
                        }
                    }
                    firstConfig['children'].push(childrenTreePermission(d, item.uid, arr));
                })
            }
            // var firstConfig = new Object();
            // firstConfig['id'] = item.uid;
            // firstConfig['label'] = item.attribute.name;
            // firstConfig['attribute'] = item.attribute;

            // firstConfig['spread'] = true

            data.push(firstConfig);
        })
        return data;
    }
    function childrenTreeData(d, pid, item, status) {
        let data = new Object();
        data['label'] = d.attribute.name;
        data['id'] = pid + "_" +d.attribute.uid;
        data['children'] = [];
        data['attribute'] = d.attribute;

        if (item == undefined) {
            item = []
        }
        if (status === 1) {
            data['isOpen'] = true;
        }
        if (status === 2) {
            data['checked'] = true;
        }

        if(d.children.length > 0){
            data['children'] = [];
            $.each(d.children,function (i,d2) {
                let status = 0;
                let arr = [];
                if (item.length !== 0) {
                    for (let i = 0; i < item.length; i++) {
                        if (d2.parent === item[i].uid) {
                            for (let j = 0; j < item[i].children.length; j++) {
                                if (d2.uid === item[i].children[j].uid) {
                                    status = 1;
                                    if (d2.children.length === 0 && d2.attribute.permissionList.length === 0) {
                                        status = 2;
                                    }
                                    arr = item[i].children;
                                    j = item[i].children.length;
                                }
                            }
                        }
                    }
                }
                data['children'].push(childrenTreeData(d2, d.uid, arr, status));
            })
        }
        else if (d.children.length === 0) {
            data['children'] = [];
            $.each(d.attribute.permissionList, function (index, item1) {
                let arr = [];
                if (item.length !== 0) {
                    for (let i = 0; i < item.length; i++) {
                        if (d.attribute.uid === item[i].uid) {
                            arr = item[i].attribute.permissionList
                        }
                    }
                }
                data['children'].push(childrenTreePermission(item1, d.uid, arr))
            })
        }


        return data;
    }
    function childrenTreePermission(d, pid, item) {
        let data = new Object();
        data['label'] = d.name;
        data['id'] = pid + '_' + d.uid + '_tree_' + d.inheritable;
        data['inheritable'] = d.inheritable;
        if (item == undefined) {
            item = [];
        }
        if (item.length != 0) {
            for (let i = 0; i < item.length; i++) {
                if (item[i].uid === d.uid) {
                    data['checked'] = true
                }
            }
        }
        return data;
    }
    // 获取当前选中节点
    $('.addRole').on('click', function () {
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        eleTreeObj['data'] = updateData;
        let el1 = treeObj.getChecked(false, true);

        layer.msg('角色授权成功');
        setTimeout(() => {
            parent.layer.close(index);
        }, 1000)
    });

    // 勾选即授权
    eleTree.on("nodeChecked(data1)",function(d) {
        let status = d.isChecked;
        let data = d.data;
        let type = typeof data.currentData.id;
        let obj = {};
        if (type === 'string') {
            if (data.currentData.id.split('_').length > 3) {
                obj = {
                    "roleId": roleId,
                    "resources": [{
                        "uid": data.parentData.data.id,
                        "name": data.parentData.data.label,
                        "detail": data.parentData.data.attribute.detail,
                        "permissionList": [{ "uid": data.currentData.id.split('_')[1], "name": data.currentData.label, "inheritable": true }]
                    }]
                }
            } else {
                obj = {
                    "roleId": roleId,
                    "resources": [{
                        "uid": data.currentData.attribute.uid,
                        "name": data.currentData.attribute.name,
                        "detail": data.currentData.attribute.detail,
                        "permissionList": data.currentData.attribute.permissionList
                    }]
                }
            }
        } else {
            obj = {
                "roleId": roleId,
                "resources": [{
                    "uid": data.currentData.id,
                    "name": data.currentData.attribute.name,
                    "detail": data.currentData.attribute.detail,
                    "permissionList": data.currentData.attribute.permissionList
                }]
            }
        }
        if (status) {
            $.ajax({
                url: oauth2Host + '/rbac/allocationResourceToRole',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(obj),
                success: function (res) {

                }
            })
        } else {
            let deleteObj = {};
            if (type === 'string') {
                if (data.currentData.id.split('_').length < 3) {
                    deleteResource(data.currentData.attribute.uid);
                }
                if (data.currentData.id.split('_').length > 3) {
                    //删除角色所拥有资源的某些许可
                   deletePermissionFromRole(data.parentData.data.id, data.currentData.id.split('_')[1]);
                }
            } else {
                deleteResource(data.currentData.id);
            }

        }
    })

    //资源删除
    function deleteResource(id) {
        var formData = new FormData();
        formData.append('roleId', roleId);
        formData.append("resourceIds", id)
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("DELETE", oauth2Host + "/rbac/deleteResourceFromRole", true);
        xmlhttp.send(formData);
    }
    //删除角色所拥有资源的某些许可
    function deletePermissionFromRole(id, permissionsId) {
        var formData = new FormData();
        formData.append('roleId', roleId);
        formData.append("resourceId", id)
        formData.append("permissions", permissionsId)
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("DELETE", oauth2Host + "/rbac/deletePermissionFromRole", true);
        xmlhttp.send(formData);
    }
})