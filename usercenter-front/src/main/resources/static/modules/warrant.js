/** layuiAdmin.std-v1.2.1 LPPL License By http://www.layui.com/admin/ */ ;

layui.define(function(e) {
    layui.use(['table','element'], function () {
        var e = (layui.$, layui.table);
        var $ = layui.jquery,
            element = layui.element;//Tab的切换功能，切换事件监听等，需要依赖element模块

        e.render({
            elem: "#warrant",
            url: userCenterHost + '/usercenter/getAdminAuthorityList',
            method:'GET',
            title: '授权管理',
            cellMinWidth: 100,
            cols: [
                [
                    {title:'序号', width:100, type:"numbers"},
                    {field: 'uid', title: 'uid',hide:true},
                    {field: 'name', title: '栏目名称',align: 'center'},
                    {field: 'count', title: '栏目组人数',align: 'center'}
                    ,{fixed: 'right', title: '操作',align: 'center', toolbar: '#edit_warrant',width:200}
                ]
            ],
            page: true,
            limits:[10,20,30,40,50,60,70,80,90,200],
            skin: "line"
        });
        var $ = layui.$,
            active = {
                reload: function() {
                    /*url: layui.setter.base + "json/management/educateInfo.js",*/
                    var name= $("#name").val();
                    //执行重载
                    e.reload('warrant', {
                        page: {
                            curr: 1 //重新从第 1 页开始
                        },
                        where: {
                                name:name
                        }
                    })
                }
            };
        //监听表格操作
        e.on('tool(warrant)', function(obj){
            var data = obj.data;
            var date = new Date().getTime();
            if(obj.event === 'detail'){
                var name =data.name+"的授权详情信息" ;
                url="tabContent/warrantDetail?uid="+data.id+'&warrantType=2';
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content: ' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date //
                });
                element.tabChange('component-tabs-brief',date);

            }
            if(obj.event === 'teacherWarrantDetail'){
                var name =data.name+"的(教师权限)授权详情信息" ;
                url="tabContent/warrantDetail?uid="+data.id+'&warrantType=1';
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content: ' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date //
                });
                element.tabChange('component-tabs-brief',date);

            }
            if(obj.event === 'studentWarrantDetail'){
                var name =data.name+"的(学生权限)授权详情信息" ;
                url="tabContent/warrantDetail?uid="+data.id+'&warrantType=0';
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content: ' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date //
                });
                element.tabChange('component-tabs-brief',date);

            }
            if(obj.event === 'edit'){
                var name =data.roleCname+"的权限菜单配置" ;
                url="../tabContent/AuthorityMenuManage?role="+data.roleName;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content: ' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date//
                });
                element.tabChange('component-tabs-brief',date);
            }
        });

        $('.warrantInput .layui-btn').on('click', function() {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });

    }), e("warrant", {})
});