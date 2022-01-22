layui.define(function (e) {
    layui.use(['form','layer','table'],function () {
        var $=layui.$,
            layer = layui.layer,
            form = layui.form,
            admin = layui.admin,
            table=layui.table;
        table.render({
            elem: '#register'
            ,url:userCenterHost +'/usercenter/auditList'
            ,method:'GET'
            ,where:{
                roleId:'1'
            }
            , cols: [//标题栏
               [
                   {title:'序号',type:'numbers', align: 'center'},
                   {field: 'username',title:'用户名',align: 'center'},
                   {field: 'cname',title:'姓名',align:'center'},
                   {field: 'userId',title:'用户id',align:'center',hide:'true'},
                   {field: 'fileId',title:'文件id',align:'center',hide:'true'},
                   {field:'status',title:'审核状态',align:'center'},
                   {fixed: 'right', title: '操作',align: 'center', toolbar: '#edit',width:200}
               ]
            ],
            parseData:function (res) {
                return {
                    "code": '0', //解析接口状态
                    "msg": '', //解析提示文本
                    "count": '', //解析数据长度
                    "data": res//解析数据列表
                };
            }
            //,skin: 'line' //表格风格
            , even: true
            ,page: false//是否显示分页
            //,limits: [5, 7, 10]
            //,limit: 5 //每页默认显示的数量
        });
        table.on('tool(register)', function (obj) {
            $("#userId").val(obj.data.userId);
            $("#fileId").val(obj.data.fileId);
            resourceContainer.getFileById({
                success:function(res){
                    $('#fileImg').attr("src", res.url);
                },
                fail:function(){
                    alert('图像获取失败！');
                    $('#fileImg').attr("src",'');
                },
                fileId:$("#fileId").val(),
                needToken:true
            })
            var index=layer.open({
                type:'1',
                title:'注册审核',
                content:$(".audit"),
                id:'1',
                area:['80%','600px'],
                btnAlign:'c',
                shade:0,
                yes:function(){
                    layer.close(index);
                }
            })
            // window.onresize=function() {
            //     layer.style(index,{
            //         width: $(window).width() - 200 + 'px',
            //     });
            // };
        });
        form.on('select(systemSite)',function (data) {
            var siteId=data.value;
            var obj = $(".multiple");
            $.ajax({
                    url:userCenterHost+'/usercenter/dropDownBoxController/getRoleListBySiteId',
                    type:'GET',
                    data:{
                        siteId:siteId
                    },
                    async: true,
                    success: function (data) {
                        if (data.length > 0) {
                            $(".systemRole").show();
                            for (var i = 0; i < data.length; i++) {
                                obj.append(new Option(data[i].authority_cname, data[i].role_id ));
                            }
                            $(".multiple").trigger("chosen:updated");
                            $(".multiple").chosen();
                        }
                    }
                });
        })
        form.on('submit(auditInfo)', function (data) {
            var auditDtoList=new Array();
            $(".systemSite").each(function(i,e){
                var siteList= $(this).val();
                var systemRoleList=$(this).parent().parent().parent().find('select').eq(1).val();
                auditDtoList.push({siteId:siteList,roleIds:systemRoleList});
            });
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                , btn: ['确定', '取消'] //按钮
                , yes: function () {
                    layer.closeAll();
                    var field=data.field;
                    // field.auditDtoList=auditDtoList;
                    // field.auditorRoleId='1';
                    // field.useDefault='0';
                    admin.req({
                        url: userCenterHost + '/usercenter/auditRegister2?auditorRoleId=1&useDefault=0&userId='+field.userId+'&state='+field.state,
                        data: JSON.stringify(auditDtoList),
                        dataType: 'json',
                        method: 'POST',
                        contentType:'application/json',
                        success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("提交成功!");
                                location.reload();
                            }
                            else{
                                console.log(res.msg);
                                parent.layer.alert('保存失败！');
                            }

                        }
                    })
                }
            })
            return false;
        });
        //获取系统下拉框
        $.ajax({
            url:userCenterHost+'/usercenter/dropDownBoxController/getSite',
            type:'GET',
            success:function (res) {
                if(!res.code){
                    var data=res.data;
                    for (var i = 0; i < data.length; i++) {
                        var option = '<option value="' + data[i].id + '">' + data[i].site + '</option>';
                        $(".systemSite").append(option);
                    }
                    form.render();
                }
                else{
                    alert(res.msg);
                }
            }
        });
       $("#add").click(function () {
           var html='   <div id="roleArrage">\n' +
               '                <div class="layui-col-lg12">\n' +
               '                    <label class="layui-form-label">管理系统</label>\n' +
               '                    <div class="layui-input-block">\n' +
               '                        <select class="layui-form-select systemSite" lay-filter="systemSite">\n' +
               '                            <option value=""></option>\n' +
               '                        </select>\n' +
               '                    </div>\n' +
               '                </div>\n' +
               '                <div class="layui-col-lg12 systemRole ">\n' +
               '                    <label class="layui-form-label">权限分配</label>\n' +
               '                    <div class="layui-input-block">\n' +
               '                        <select class="form-control form-control-chosen multiple" data-placeholder="Please select..." multiple lay-ignore>\n' +
               '                            <option></option>\n' +
               '                        </select>\n' +
               '                    </div>\n' +
               '\n' +
               '                </div>\n' +
               '            </div>';
           $("#roleArrage").append(html);
           $.ajax({
               url:userCenterHost+'/usercenter/dropDownBoxController/getSite',
               type:'GET',
               success:function (res) {
                   if(!res.code){
                       var data=res.data;
                       for (var i = 0; i < data.length; i++) {
                           var option = '<option value="' + data[i].id + '">' + data[i].site + '</option>';
                           $(".systemSite").append(option);
                       }
                       form.render();
                   }
                   else{
                       alert(res.msg);
                   }
               }
           })
           form.render();
       })
    });
    e("register/audit",{})
})