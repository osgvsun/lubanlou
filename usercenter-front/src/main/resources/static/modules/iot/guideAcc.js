layui.use(['index', 'form', 'laypage', 'laydate', 'layer', 'table', 'element'], function() {
    var $ = layui.$,
        admin = layui.admin,
        element = layui.element,
        layer = layui.layer,
        form = layui.form,
        laydate = layui.laydate,
        laypage = layui.laypage,
        table = layui.table;

    //向世界问个好
    layer.msg('进入数据交换');

    form.render(null, 'guideAcc');

    // //打开新增门禁指南页面
    // var newaccess = {
    //     newaccess: function() {
    //         //layer.msg('');
    //         var that = this;
    //         //多窗口模式，层叠置顶
    //         var index = layer.open({
    //             type: 2 //此处以iframe举例
    //             ,
    //             title: '新增指南',
    //             area: ['710px', '515px'],
    //             shade: 0.3,
    //             maxmin: true,
    //             content: 'guideNewAcc',
    //             zIndex: layer.zIndex //重点1
    //             ,
    //             success: function(layero) {
    //                 layer.setTop(layero); //重点2
    //             },
    //             btn: ['保存', '取消'],
    //             yes: function(index, layero) {
    //                 //点击确认触发 iframe 内容中的按钮提交
    //                 var submit = layero.find('iframe').contents().find("#newaccessbtn");
    //                 submit.click();
    //             }
    //         });
    //         //layer.full(index);
    //     }
    // };
    // $('.newaccess').on('click', function() {
    //     var othis = $(this),
    //         method = othis.data('method');
    //     newaccess[method] ? newaccess[method].call(this, othis) : '';
    // });

    //执行表单
    table.render({
        elem: '#guideacctab',
        // url: iotHost + "/api/content/ListContentAcc", //数据接口
        url: layui.setter.base + "json/guideAcc.json", //数据接口
        title: '表单',
        cellMinWidth: 130,
        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
            curr: 1, //设定初始在第 1 页
            groups: 1, //只显示 1 个连续页码
            first: false, //不显示首页
            last: false //不显示尾页
        },
        cols: [
            [ //表头
                {
                    field: 'id',
                    title: '序号',
                    sort: true,
                }, {
                    field: 'Name',
                    title: '标题',
                    sort: true,
                // }, {
                //     field: 'content',
                //     title: '指南超链接',
                //     sort: true,
                //     templet: function(d){
                //         return '<a href="'+d.content+'" target="_blank" class="layui-table-link">' + d.content + '</a>'
                //     }
                }, {
                    fixed: 'right',
                    title: '操作',
                    width: 120,
                    align: 'center',
                    toolbar: '#operation'
                // }, {
                //     fixed: 'right',
                //     title: '部署指南',
                //     width: 200,
                //     align: 'center',
                //     toolbar: '#control'
                }
            ]
        ],
        request:{
            pageName:"current",
            limitName:"pageSize"
        },
        data: table,
        skin: 'line', //表格风格
        even: true,
        page: true,
        id: 'guideacctab',
        limits: [5, 7, 10, 20],
        limit: 10 ,//每页默认显示的数量

    });
    function getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    let c = getCookie('datasource.cookie');
    console.log(c)
    //监听行工具事件
    table.on('tool(guideacctab)', function(obj) {
        //同步数据
        if(obj.event === 'syncIotData'){
            if(confirm('确认同步吗?')) {
                $.ajax({
                    url: iotHost + '/api/openApi/syncIotData/',
                    type: 'post',
                    async: true,
                    headers: {
                        "x-datasource": getCookie('datasource.cookie'),
                    },
                    beforeSend: function () {
                        loading("数据拼命同步中,请耐心等待......");
                    },
                    success: function (res) {
                        if (res.code == 0) {
                            parent.layer.alert("同步成功!")
                            table.reload('guideacctab');
                        } else
                            parent.layer.alert(res.msg);

                    },
                    error: function () {
                        alert("同步接口请求失败！")
                        window.location.reload();

                    }
                })
            }
        }
    });
    //展示进度条
    function loading(msg){
        msgindex = layer.msg(msg, {
            icon:16,
            shade:[0.1, '#fff'],
            time:false,  //不自动关闭
            offset:"100px"
        })
    }
});