var evaluationHost =apiGateWayHost+"/configcenter/";
var templateId;
var cdata;
layui.config({
    base:'../'
}).extend({
    index:'lib/index'
}).use(['index','tree', 'util', 'layer', 'form', 'treeSelect', 'upload'], function() {
    var tree = layui.tree;
    var util = layui.util;
    var layer = layui.layer;
    var form = layui.form;
    var treeSelect = layui.treeSelect;
    var upload = layui.upload;
    function getInfoByBusinessIdAndConfigType(){
        $.ajax({
            url: evaluationHost + 'api/template/infoByBusinessIdAndConfigType?configType='+configType+'&BusinessId='+proId,
            type:'get',
            async: false,
            success:function (res){
                console.log(res);
                if(res.code=='200'){
                    if(res.data.length>0){
                        templateId = res.data[0].id;
                        getConfigIndicatorByTemplateId();
                    }else{
                        templateId = 0;
                        getConfigIndicatorByTemplateId();
                    }

                }else{
                    layer.msg("获取template信息失败！");
                }
            },
            error:function () {
                layer.msg("获取template信息失败！");
            }
        });
    }
    function getConfigIndicatorByTemplateId(){
        if(templateId!=0){
            $.ajax({
                url: evaluationHost+'api/configIndicator/list?templateId='+ templateId +'&step=1&page=1&limit=999',
                dataType: 'json',
                async: false,
                type: 'get',
                success: function (res) {
                    console.log(res);
                    cdata = res.data;
                },
                error:function () {
                    alert("获取配置项失败！");
                }
            });
        }else{
            cdata = [];
        }

    }
    tree.render({
        elem: '#dept_tree',
        data: getData(),
        id: 'treeId',
        showCheckbox: false,     //时候显示复选框
        onlyIconControl: true,
        edit: ['del'], //操作节点的图标'add', 'update',
        showLine: false,
        click: function (obj) {
            var checked = obj.data;
            var parent;
            var str = ''
            str +='<form class="layui-form myData" lay-filter="editIndicatorForm">' +
                '<div class="layui-form-item">' +
                '<label class="layui-form-label">上级指标：</label>' +
                '<div class="layui-input-block">' +
                ' <input type="text" name="parentId" id="treeS" lay-filter="treeS" class="layui-input" readonly/>' +
                '</div>' +
                '</div>' +
                '<div class="layui-form-item">' +
                '<label class="layui-form-label">指标内容：</label>' +
                '<div class="layui-input-block">';
            if(state == 1){
                str+=' <input type="text" lay-verify="required" id="name" name="name" class="layui-input" readonly/>';
            }else{
                str+=' <input type="text" lay-verify="required" id="name" name="name" class="layui-input" />';
            }
            str+='</div>' +
                '</div>' +
                '<div class="layui-form-item">' +
                '<label class="layui-form-label">参考内容：</label>' +
                '<div class="layui-input-block">';
            if(state == 1){
                str+=' <input type="text" id="comment" name="comment" class="layui-input" readonly/>';
            }else{
                str+=' <input type="text" id="comment" name="comment" class="layui-input" />';
            }
            str+='</div>' +
                '</div>' +
                '<div class="layui-form-item">' +
                '<label class="layui-form-label">标准分：</label>' +
                '<div class="layui-input-block">';
            if(state == 1){
                str+=' <input type="text" lay-verify="number" id="score" name="score" class="layui-input" readonly/>';
            }else{
                str+=' <input type="text" lay-verify="number" id="score" name="score" class="layui-input" />';
            }
            str+='</div>' +
                '</div>' +
                ' <div class="layui-form-item tutor-block">';
            if(state == 1){
                str+='<div class="layui-input-block layui-hide">';
            }else{
                str+='<div class="layui-input-block">';
            }
            str+='<button type="button" id="editIndicator" class="layui-btn" lay-submit lay-filter="editIndicator">保存</button>' +
                '<button type="reset" class="layui-btn layui-btn-primary">重置</button>' +
                '</div>' +
                '</form>';
            $("#dept_home").html(str);
            var parseData= getData();
            treeSelect.render({
                // 选择器
                elem: '#treeS',
                // 数据
                parseData: parseData,
                data: "",
                // 异步加载方式：get/post，默认get
                type: 'get',
                // 占位符
                placeholder: '上级菜单',
                // 是否开启搜索功能：true/false，默认false
                search: true,
                // 一些可定制的样式
                style: {
                    folder: {
                        enable: true
                    },
                    line: {
                        enable: true
                    }
                },
                // 加载完成后的回调函数
                success: function (d) {
                    parent = getParent(parseData,checked.id);
                    if(parent!=undefined){
                        treeSelect.checkNode('treeS', parent);
                    }
                    $('#name').val(checked.name);
                    $('#comment').val(checked.comment);
                    $('#score').val(checked.standardScore);
                },
                click: function(d){
                    // console.log(d);
                    // console.log(d.treeId); // 得到组件的id
                    // console.log(d.current); // 得到点击节点的treeObj对象
                    // console.log(d.data); // 得到组成树的数据
                },
            });
            form.on('submit(editIndicator)', function (data) {
                var field = data.field;
                var templateDTO = new Object();
                templateDTO['processStep'] = 1;
                templateDTO['templateId'] = templateId;
                var configIndicatorDTOs = [];
                var configIndicatorDTO = new Object();
                configIndicatorDTO['id'] =  checked.id;
                configIndicatorDTO['indicatorCname'] = field['name'];
                configIndicatorDTO['comment'] = field['comment'];
                configIndicatorDTO['standardScore'] = field['score'] ;
                configIndicatorDTOs.push(configIndicatorDTO)
                templateDTO['configIndicatorDTOS'] = configIndicatorDTOs;
                var d = JSON.stringify(templateDTO);
                $.ajax({
                    // url:zuulUrl+'api/meetingProcess/saveMeetingProcess',
                    url:evaluationHost+'api/template/templateAndIndicator',
                    dataType: 'json',
                    data: d,
                    type: 'post',
                    async: false,
                    contentType:"application/json;charset=utf-8",
                    success:function (res) {
                        console.log(res);
                        if(res.code == '200'){
                            layer.msg('保存成功!');
                            window.location.reload();
                        }
                    },
                    error: function () {
                        alert("后台保存数据报错");
                        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                    }
                });
                return false;
            });

            // $(".tutor-block").removeClass('layui-hide');
        },
        operate: function(obj){
            var type = obj.type; //得到操作类型：add、edit、del
            var data = obj.data; //得到当前节点的数据
            var elem = obj.elem; //得到当前节点元素
            var id = data.id;
            var name = data.title;
            if(type === 'del'){ //删除节点
                var indicatorIds = id;
                $.ajax({
                    // url:zuulUrl+'api/meetingProcess/saveMeetingProcess',
                    url:evaluationHost+'api/template/deleteIndicatorById?indicatorIds='+indicatorIds,
                    // dataType: 'json',
                    // data: d,
                    type: 'post',
                    async: false,
                    contentType:"application/json;charset=utf-8",
                    success:function (res) {
                        console.log(res);
                        if(res.code == '200'){
                            layer.msg('删除成功!');
                            window.location.reload();
                        }
                    },
                    error: function () {
                        alert("后台保存数据报错");
                        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                    }
                });
            };
        }
    });
    //导入
    upload.render({
        elem: '#import'
        ,url: evaluationHost+'api/configIndicator/newIndicatorByExcel'
        ,accept: 'file' //普通文件
        ,exts: 'xls|xlsx' //只允许上传excel文件
        ,data: {
            configTypeId: configType,
            templateId: templateId,
            templateCname: `评分项模板(${proId})`,
            businessId:  proId,
            sourceProject: sourceProject,
            processStep: 1,
            processCname: '打分',
            isLayui: true
        }
        ,before: function (obj) {
            if(templateId == 0){
                delete this.data.templateId;
            }else{
                delete this.data.templateCname;
                delete this.data.businessId;
                delete this.data.sourceProject;
                delete this.data.processCname;
            }
        }
        ,done: function(res){
            if(res.code == 200){
                layer.msg('导入成功');
                window.location.reload();
            }else{
                layer.msg('导入失败');
            }
        }
    });
    util.event('lay-demo', {
        addIndicator: function(othis){
            // $.get('dept/edit', function(data) {
                layer.open({
                    // skin: 'selectDiv',
                    type: 2,
                    title: '新增',
                    area: ['530px','500px'],
                    content: 'newIndicator?proId='+proId+'&configType='+configType+'&sourceProject='+sourceProject,
                    btn: ['提交', '取消'],
                    yes: function (index,layero) {
                        var submit = layero.find('iframe').contents().find("#saveNew");
                        submit.click();
                    },
                    success: function (layero, index) {

                    }
                })
            // })
        },
        gain: function () {
            var checkData = tree.getChecked('treeId');
            var str = JSON.stringify(checkData);
            $.post('dept/checkedGain', {data: str}, function () {
            });
            layer.alert(JSON.stringify(checkData), {shade:0});
        },
        allSpread: function () {
            // layer.msg('一键展开')
            var data = getData();
            var flag = true;
            $.each(data,function (index,item){
                item['spread'] = true;
                if(item.children!=undefined&&item.children.length>0){
                    flag = childrenAllSpread(item);
                }
                if(!flag){
                    return false;
                }
            })
            // console.log(data);
            tree.reload('treeId', {data: data});
            $('#allSpread').addClass('layui-hide');
            $('#allFold').removeClass('layui-hide');
        },
        allFold: function () {
            // layer.msg('一键折叠')
            var data = getData();
            tree.reload('treeId', {data: data});
            $('#allFold').addClass('layui-hide');
            $('#allSpread').removeClass('layui-hide');
        }
    });
    function childrenAllSpread(item) {
        var flag = true;
        if(item.children.length>0){
            $.each(item.children,function (i,d) {
                d['spread'] = true;
                if(d.children!=undefined&&d.children.length>0){
                    flag = childrenAllSpread(d);
                }
                if(!flag){
                    return false;
                }
            })
        }
        return flag;
    }
    function childrenTreeData(d) {
        var data = new Object();
        data['title'] = d.indicatorCname+'（'+d.standardScore+'）';
        data['name'] = d.indicatorCname;
        data['id'] = d.id;
        data['comment'] = d.comment;
        data['standardScore'] = d.standardScore;
        if(d.configIndicatorDTOS.length>0){
            data['children'] = [];
            $.each(d.configIndicatorDTOS,function (i,d) {
                data['children'].push(childrenTreeData(d));
            })
        }
        return data;
    }
    function getData(){
        getInfoByBusinessIdAndConfigType();
        var data = [];
        if(cdata.length==0){
            return data;
        }else{
            $.each(cdata,function (index,item){
                var firstConfig = new Object();
                firstConfig['id'] = item.id;
                firstConfig['title'] = item.indicatorCname+'（'+item.standardScore+'）';
                firstConfig['name'] = item.indicatorCname;
                firstConfig['comment'] = item.comment;
                firstConfig['standardScore'] = item.standardScore;
                if(index==0){
                    firstConfig['open'] = true;
                }
                if(item.configIndicatorDTOS.length>0){
                    firstConfig['children'] = [];
                    $.each(item.configIndicatorDTOS,function (i,d) {
                        firstConfig['children'].push(childrenTreeData(d));
                    })
                }
                data.push(firstConfig);
            })
            return data;
        }

    }
    function getParentEach(d,id){
        var dd = new Object();
        var parent;
        var flag = true;
        $.each(d.children,function (index,item){
            if(item.id == id){
                dd['parent'] = d.id
                dd['flag'] = false;
                dd['dd'] = dd;
                flag = false;
            }else{
                if(item.children!=undefined&&item.children.length>0){
                    var data = getParentEach(item,id)
                    parent = data.parent;
                    flag = data.flag;
                    if(!flag){
                        dd = data.dd;
                        return false;
                    }else{
                        dd['flag'] = flag;
                    }
                }else{
                    dd['flag'] = flag;
                }
            }
        })
        return dd;
    }
    function getParent(parseData,id) {
        var parent;
        var flag = true;
        $.each(parseData,function(index,item){
            if(item.id == id){
                parent = null;
                flag = false;
            }else{
                if(item.children!=undefined&&item.children.length>0){
                    var data = getParentEach(item,id)
                    parent = data.parent;
                    flag = data.flag;
                    if(!flag){
                        return false;
                    }

                }

            }
        });
        return parent;
    }
});
