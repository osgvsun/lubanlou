/** layuiAdmin.std-v1.2.1 LPPL License By http://www.layui.com/admin/ */ ;
layui.define(function(e) {
    layui.use(["table",'element','laydate','form'], function () {
        var e = (layui.$, layui.table);
        var $ = layui.jquery,
            admin = layui.admin
            ,element = layui.element,
            form=layui.form,
            layer = layui.layer,
            laydate=layui.laydate; //Tab的切换功能，切换事件监听等，需要依赖element模块

        e.render({
            elem: "#roleManage",
            url: userCenterHost + '/getNumberOfPersonsUnderAuthority',
            method:'GET',
            title: '权限管理',
            cellMinWidth: 100,
            cols: [
                [
                    {title:'序号', width:100, type:"numbers"},
                    {field: 'roleName', title: '权限英文名',align: 'center'},
                    {field: 'roleCname', title: '权限中文名',align: 'center'}
                    ,{field: 'count', title: '用户组人数',align: 'center'},
                    {fileId:'roleId', title:'Uid', hide:true}

                    ,{fixed: 'right', title: '操作',align: 'center', toolbar: '#edit_roleManage',width:200}
                ]
            ],
            page: false,
            skin: "line"
        });
        var $ = layui.$,
            active = {
                reload: function() {
                    /*url: layui.setter.base + "json/management/educateInfo.js",*/
                    var roleCname= $("#roleCname").val();
                    //执行重载
                    e.reload('roleManage', {
                        page: {
                            curr: 1 //重新从第 1 页开始
                        },
                        where: {
                                roleCname:roleCname
                        }
                    })
                }
            };
        //监听表格操作
        e.on('tool(roleManage)', function(obj){
            var data = obj.data;
            var date = new Date().getTime();
            if(obj.event === 'detail'){
                var name =data.roleCname+"的权限详情信息" ;
                url="tabContent/roleDetail?role="+data.roleName;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content: ' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="700px"></iframe>'
                    ,id:date
                });
                element.tabChange('component-tabs-brief',date);
            }
            if(obj.event === 'edit'){
                var name =data.roleCname+"的权限菜单配置" ;
                if(data.roleCname=='管理员'){
                  alert("请在数据库中配置！")
                }
                else{
                    url="../tabContent/AuthorityMenuManage?role="+data.roleName+"&roleUid="+data.roleId;
                    element.tabAdd('component-tabs-brief', {
                        title: name //用于演示
                        ,content: ' <iframe onload="FrameWH()" scrolling="yes" id="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                        ,id:date//
                    });
                    element.tabChange('component-tabs-brief',date);
                }

            }
        });

        $('.roleManageInput .layui-btn').on('click', function() {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });

    }), e("systemRoleManage", {})
});
function FrameWH() {
    console.log($('.permissions_title').outerHeight(true))
    var h = $(window).height() - 210;
    $("iframe").css("height",h+"px");
    $(window).resize(function () {
        FrameWH();
    });
}