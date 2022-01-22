layui.config({
    base: '../teachPublic/layui/modules/'
}).extend({
    eleTree: 'eleTree',
    // dtree: 'resourcePermissions/dtree/dtree'
}).use(['element', 'layer', 'form', 'eleTree'], function () {
    var layer = layui.layer,
        eleTree = layui.eleTree,
        element = layui.element,
        $ = layui.jquery,
        form = layui.form;
    var dtree = layui.dtree;
    var eleTreeObj = {
        elem: '.ele1',
        //data: data,
        // url: configCenterHost + 'api/organization/hierarchy?uid=-1',
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
        // contextmenuList: ["add.async", "edit", "remove"],
        contextmenuList: [
            {text: "新增子节点", eventName: "add"},
            {text: "删除", eventName: "remove"}
        ],
        searchNodeMethod: function(value, data) {
            if(!value) return true;
            return data.label.indexOf(value) !== -1;
        }
    };
    setPermission();
    function setPermission() {
        $.ajax({
            url: oauth2Host + '/rbac/getResourceTree',
            // url: 'http://localhost:8765/uaa/rbac/getResourceTree',
            async: false,
            success: function (res) {
                let result = {"code": 0, "msg": "成功", "data": [res]}
                let c = getTreeData(res)
                // eleTreeObj.data =
                // var eleTreeObj = dtree.render({
                //     elem: '#demoTree1',
                //     method: 'GET',
                //     dataStyle: "layuiStyle",
                //     response: { "code": 0, "msg": "操作成功", "data": c},
                //     url: 'http://localhost:8765/uaa/rbac/getResourceTree',
                //     // response: { "code": 0, "parent": "parentId", "uid": "id", "name": "title"}
                // })
                renderEleTree(getTreeData(res))
                console.log(getTreeData(res))
            }
        })
    }

    // 树形组建渲染
    function renderEleTree(data) {
        eleTreeObj['data'] = data;
        let el1 = eleTree.render(eleTreeObj);
        $('[lay-filter="data1"]').find('.eleTree-node').find('.eleTree-node-content').eq(0).click();
        el1.expandAll();
        $(".eleTree-search1").on("change", function() {
            el1.search($(this).val());
        })
    }

    // console.log(eleTreeObj)
    function getTreeData(res) {
        let data = [];
        if(res.children.length === 0)
            return data;
        $.each(res.children,function (index,item){
            console.log(item)
            var firstConfig = new Object();
            firstConfig['id'] = item.uid;
            firstConfig['label'] = item.attribute.name;
            firstConfig['attribute'] = item.attribute;
            // if(index==0){
            // 	firstConfig['open'] = true;
            // }
            if (item.children.length > 0) {
                firstConfig['children'] = [];
                $.each(item.children, function (i,d) {
                    firstConfig['children'].push(childrenTreeData(d));
                })
            }
            else if(item.children.length === 0){
                firstConfig['children'] = [];
                $.each(item.attribute.permissionList,function (i,d) {
                    firstConfig['children'].push(childrenTreePermission(d));
                })
            }
            data.push(firstConfig);
        })
        return data;
    }
    function childrenTreeData(d) {
        console.log(d)
        let data = new Object();
        data['label'] = d.attribute.name;
        data['id'] = d.attribute.uid;
        // data['children'] = d.children
        // data['disabled'] = d.inheritable;
        if(d.children.length > 0){
            data['children'] = [];
            $.each(d.children,function (i,d2) {
                data['children'].push(childrenTreeData(d2));
            })
        }
        else if (d.children.length === 0) {
            data['children'] = [];
            $.each(d.attribute.permissionList, function (index, item) {
                data['children'].push(childrenTreePermission(item))
            })
        }
        return data;
    }
    function childrenTreePermission(d) {
        let data = new Object();
        data['label'] = d.name;
        data['id'] = d.uid;
        data['disabled'] = 'disabled';
        // data['inheritable'] = d.inheritable
        // if (d.children.length > 0) {
        //     data['children'] = [];
        //     $.each(d.children,function (i,d2) {
        //         data['children'].push(childrenTreeData(d2));
        //     })
        // }
        return data;
    }

    $('.newNode').on('click', function () {
        layer.open({
            type: 1,
            title: '新增节点',
            shade: 0.3,
            area: ['800px', '500px'],
            content: $('.model_add')
        })
    })

    let licenseData = [];
    $.ajax({
        url: oauth2Host + '/rbac/getAllPermission',
        type: 'GET',
        async: false,
        success: function (res) {
            // console.log(res)
            let data = res;
            if (data.length > 0) {
                licenseData = data.map(v => {
                    return { "name": v.name, "value": v.uid, "inheritable": v.inheritable}
                })
            }
        }
    })
    //许可
    var license = xmSelect.render({
        el: '#license',
        filterable: true,
        theme: {
            color: '#409eff'
        },
        data: licenseData
    })

    //新增子节点
    $('.sureAdd').on("click", function () {
        // var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        let parentNodeId = $('.parentNodeId').attr('title');
        let parentNodeCont = $('.parentNodeCont').val();
        let getLicense = license.getValue();
        let ename = $('.ename').val();
        let link = $('.link').val();
        let identification = $('.link').val();
        let order = $('order').val();
        let state = $("select[name=state]").val();
        if (!parentNodeId) {
            parentNodeId = -1;
        }
        if (!parentNodeCont) {
            layer.msg('请填写新增节点名称');
            return false;
        }
        let permissions = getLicense.map(v => {
            return { "uid": v.value, "name": v.name, "inheritable": v.inheritable }
        })
        let data = {
            "name": parentNodeCont,
            "parentId": parentNodeId,
            "detail": {
              "ename": ename,
              "link": link,
              "identification": identification,
              "order": order,
              "state": state
            },
            "permissions": permissions
        }
        $.ajax({
            url: oauth2Host + '/rbac/addResource',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (res) {
                console.log(res);
                layer.closeAll();
                $('.layui-form-pane')[0].reset();
                setPermission();
            }
        })
    });

    // 树节点新增
    eleTree.on("nodeAdd(data1)", function(d) {
        console.log(1)
        console.log(d.data); // 点击节点对于的数据
        console.log(d.event); // event对象
        console.log(d.node); // 点击的dom节点
        console.log(this); // 与d.node相同
        console.groupEnd();
        if (d.data.children) {
            layer.open({
                type: 1,
                title: '新增节点',
                shade: 0.3,
                area: ['800px', '500px'],
                content: $('.model_add'),
                success: function (layero, index) {
                    $(".parentNodeId").val(d.data.label).attr("title", d.data.id);
                    // layer.close(index);
                }
            })
        } else {
            layer.msg('许可节点，不允许新增');
        }

    });
    // 树节点删除
    eleTree.on("nodeRemove(data1)", function(d) {
        console.group("删除nodeRemove:")
        // console.log(d.data); // 点击节点对于的数据
        // console.log(d.node); // 点击的dom节点
        // // d.stop();                // 取消删除
        console.groupEnd();
        // 异步删除节点
        // setTimeout(function() {
        //     d.async()
        // },300)
        // nodeUpdate('del',obj);
        // $.ajax({
        //     url: 'http://localhost:8765/uaa/rbac/deleteResource',
        //     type: 'POST',
        //     // contentType: 'multipart/form-data',
        //     data: { "id": d.data.id, '_method': 'DELETE'},
        //     success: function (res) {
        //         console.log(res)
        //     }
        // })
        if (d.data.children) {
            var formData = new FormData();
            formData.append('id', d.data.id)
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("DELETE", oauth2Host + "/rbac/deleteResource", true);
            xmlhttp.send(formData);
            setPermission();
        } else {
            layer.msg('许可节点，不允许新增');
        }

    })
    // 添加节点之前事件

    eleTree.on("nodeInsertBefore(data1)",function(d) {
        console.log(d.data); // 点击节点对于的数据

    })
    // 鼠标右键事件

    eleTree.on("nodeTest(data1)",function(d) {
        console.log(d.data); // 点击节点对于的数据

    })
})