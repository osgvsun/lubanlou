layui.use(['element', 'form', 'table'], function(){
    var element = layui.element,
        form = layui.form,
        table = layui.table; //导航的hover效果、二级菜单等功能，需要依赖element模块

    form.render(null, 'expecttraningaccessbox');
//执行一个表单
    table.render({
        elem: '#expecttraningaccess',
        url: httpAccessUrl + '/getAccessEntityTrainingExpect', //数据接口
        where: {"entityId": entityId, "entityType": entityType},
        title: '列表',
        cellMinWidth: 100,
        page: true, //开启分页
        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
            //curr: 5, //设定初始在第 5 页
            groups: 1, //只显示 1 个连续页码
            first: false, //不显示首页
            last: false //不显示尾页
        },
        cols: [
            [ //表头
                {
                    fixed: 'left',
                    title: '序号',
                    type: 'numbers',
                    width: 50
                }, {
                field: 'title',
                title: '设备编号',
                sort: true
            }, {
                field: 'content',
                title: '设备名称',
                sort: true
            }, {
                field: '',
                title: '实验室',
                sort: true
            },  {
                fixed: 'right',
                title: '操作',
                toolbar: '#toolbar',
                width: 120
            }
            ]
        ],
        id: 'expecttraningaccess',
        data: table,
        skin: 'line', //表格风格
        even: false,
        limits: [5, 7, 10, 20],
        limit: 5 //每页默认显示的数量
    });
});