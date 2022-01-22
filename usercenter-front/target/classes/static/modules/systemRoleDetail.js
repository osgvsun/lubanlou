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
        var chooseRole=GetQueryString("role");
        if(chooseRole=='ROLE_ADMIN'){
            $("#add").css('display','none');
        }

        //某权限下的人员列表

        e.render({
            elem: "#roleDetail",
            url:userCenterHost+'/getUserInfoUnderAuthority'
            ,method:'GET',
            where:{
                roleName:chooseRole
            },
            title: '人员权限',
            cellMinWidth: 100,
            cols: [
                [
                    {title:'序号', width:100,type:"numbers"},
                    {field: 'employeeNo', title: '工号'},
                    {field: 'cname', title: '姓名',align: 'center'}
                    ,{field: 'college', title: '所属学院',align: 'center'}
                    ,{field: 'username', title: '用户名',align: 'center',hide:true}
                    ,{fixed: 'right', title: '操作',align: 'center', toolbar: '#edit_roleDetail',width:200}
                ]
            ],
            page: true,
            limits:[10,20,30,40,50,60,70,80,90,200],
            skin: "line",
        });
        //添加某权限下的人员信息列表
        e.render({
            elem: "#add_allPerson",
            url:userCenterHost+'/getUserInfoNotUnderAuthority'
            ,method:'GET',
            where:{
                roleName:chooseRole
            },
            title: '添加人员',
            cellMinWidth: 100,
            cols: [
                [
                    {type:'checkbox', fixed: 'left'},
                    {field: 'employeeNo', title: '工号'},
                    {field: 'cname', title: '姓名',align: 'center'}
                    ,{field: 'college', title: '所属学院',align: 'center'}
                    ,{field: 'username', title: '用户名',align: 'center',hide:true}
                    ,{fixed: 'right', title: '操作',align: 'center', toolbar: '#add_rolePerson',width:200}
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
                    var cname= $("#cname").val();
                    //执行重载
                    e.reload('roleDetail', {
                        page: {
                            curr: 1 //重新从第 1 页开始
                        },
                        where: {
                                cname:cname
                        }
                    })
                },
                reloadAdd: function() {
                    /*url: layui.setter.base + "json/management/educateInfo.js",*/
                    var cname= $("#cnameAdd").val();
                    //执行重载
                    e.reload('add_allPerson', {
                        page: {
                            curr: 1 //重新从第 1 页开始
                        },
                        where: {
                                cname:cname
                        }
                    })
                },
                getCheckData: function(){ //获取选中数据
                    var checkStatus = e.checkStatus('add_allPerson')
                        ,data = checkStatus.data;
                    var userList=[];
                    for(var i=0;i<data.length;i++){
                        userList[i]={username:data[i].username,role:chooseRole};
                    }
                    admin.req({
                            url: userCenterHost + '/batchAddUserAuthority',//实际使用请改成服务端真实接口
                            data: JSON.stringify(userList),
                         dataType: 'text',
                        contentType: 'application/json',
                         method: 'POST'
                        ,success: function(res){
                            if (!res.code) {
                                parent.layer.alert("添加成功!");
                                e.reload('add_allPerson');
                                e.reload('roleDetail');
                            }
                            else{
                                console.log(res.msg);
                                parent.layer.alert("添加失败！")

                            }
                        }
                    })
                },
                add:function () {
                    layer.open({
                        type: 1
                        , title: '添加人员'
                        , area: ['80%', '100%']
                        , id: 'layerDemo5'//防止重复弹出
                        , content: $('#add_role')
                        , btn: '关闭'
                        , btnAlign: 'c' //按钮居中
                        , shade: 0 //不显示遮罩
                        , yes: function () {
                            layer.closeAll();
                        }
                    });

                }
            };
        //监听表格操作
        e.on('tool(roleDetail)', function(obj){
            var data = obj.data;
            if(obj.event === 'del'){
                layer.confirm('真的删除行么', function(index){
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/deleteUserAuthority',
                        data: {username:data.username,
                            role:chooseRole},
                        dataType: 'text',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("删除成功!");
                                e.reload('add_allPerson');
                                e.reload('roleDetail');
                            }
                            else{
                                console.log(res.msg);
                                parent.layer.alert("删除失败！")
                            }

                        }
                    })
                    layer.close(index);
                });

            }
        });
        e.on('tool(add_allPerson)', function(obj){
            var data = obj.data;
            if(obj.event === 'add'){
                admin.req({
                    url:userCenterHost+'/addUserAuthority'//实际使用请改成服务端真实接口
                    ,method:'POST',
                    data: {username:data.username,
                              role:chooseRole},
                    dataType: 'text',
                    success: function(res){
                        if(!res.code){
                            parent.layer.alert("添加成功!");
                            table.reload('add_allPerson');
                        }
                        else{
                            console.log(res.msg);
                            parent.layer.alert("添加失败！")
                        }
                    }
                })

            }
        });

        $('.roleDetailInput .layui-btn').on('click', function() {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
        $('.roleDetailAddInput .layui-btn').on('click', function() {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });

    }), e("systemRoleDetail", {})
});
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if(r!=null)return  unescape(r[2]); return null;
}