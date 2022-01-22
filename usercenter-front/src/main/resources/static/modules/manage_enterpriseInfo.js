/** layuiAdmin.std-v1.2.1 LPPL License By http://www.layui.com/admin/ */ ;
var role=GetQueryString("currentShowRole");
var dataObject=JSON.parse(localStorage['tree']).nextLevelConfigSet;
var currentUserRoleName=JSON.parse(localStorage['role']).roleList[0].roleName;
//获取此时的一级栏目id
var beWarrantMenuId;
//获取被分配的管理员栏目id
for(var i=0;i<dataObject.length;i++){
     // if(dataObject[i].config.name === "个人基本情况"&&dataObject[i].config.admin==1)
    if(true)
     {
     beWarrantMenuId=dataObject[i].config.id;
 }
}
for(var i=0;i<dataObject.length;i++) {
    // if (dataObject[i].config.name === "个人基本情况"&&dataObject[i].config.admin!=1)
    if(true)
    {
        var personTree = dataObject[i].nextLevelConfigSet;
        for (var j = 0; j < personTree.length; j++) {
            if(personTree[j].config.tableName=='user_info'){
                var basicInfoUid=personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_position_info'){
                var postInfoUid = personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_talent_info'){
                var talentInfoUid = personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_administration_info'){
                var administrationInfoUid = personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_tutor_info'){
                var tutorInfoUid = personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_academic_info'){
                var academicInfoUid = personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_personnel_category_info'){
                var personnelCategoryUid = personTree[j].config.id;
            }
        }
        break;
    }
}
if(currentUserRoleName!='ROLE_ADMIN')
{
    //非管理员权限登录时获取被分配的管理权限type值
    $.ajax({
        url:userCenterHost+'/getUserMenuConfig',
        type:'GET',
        dataType:'json',
        data:{
            username:currentUsername,
            menuId:beWarrantMenuId
        },
        success:function (res) {
            if(!res.code){
                var dataType=res.data;
                for(var i=0;i<dataType.length;i++){
                    if(dataType[i]=='ROLE_TEACHER'||dataType[i]=='ROLE_STUDENT'){
                        $("."+dataType[i]).show();
                    }
                }
            }
        }
    });
}
layui.define(function(e) {
    layui.use(["table","element",'laydate','form',"upload"], function () {
        var e = (layui.$, layui.table);
        var $ = layui.jquery
            ,element = layui.element,
            form = layui.form,
            layer = layui.layer,
            admin = layui.admin,
            upload = layui.upload
        laydate=layui.laydate; //Tab的切换功能，切换事件监听等，需要依赖element模块
        form.on('submit(enterpriseInfo)', function (data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                , btn: ['确定', '取消'] //按钮
                , yes: function () {
                    console.log(data)
                    $("#addMenu").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    layer.closeAll();
                    var field=data.field;
                    console.log(field)

                        admin.req({
                            url: userCenterHost + '/addEnterpriseUser',
                            data: field,
                            dataType: 'json',
                            method: 'GET',
                            success: function (res) {
                                if (!res.code) {
                                    parent.layer.alert("提交成功!");
                                    $(".clearForm").trigger("click");
                                    $("#addMenu").hide();
                                    location.reload();
                                }
                                else{
                                    console.log(res.msg);
                                    parent.layer.alert('保存失败！');
                                }

                            }
                        })
                    // }
                }
            })
            $(".buttonAdd").show();
            return false;
        });
        form.verify({
            idCard:[/(^\d{15}$)|(^\d{17}(\d|X)$)/,'请输入正确的身份证号码'],
            hotLine:[/(^1[3|4|5|7|8|9][0-9]\d{4,8}$)|(0\d{2,3}\-\d{7,8})/,'请输入正确的热线电话号码'],
            phone:[/^1[3|4|5|7|8|9][0-9]\d{4,8}$/,'请输入正确的手机号码'],
        })
        e.render({
            elem: "#basicInfo"
            ,url: userCenterHost + '/getAllEnterprise',
            where:{
                role:role
            }
            ,method:'GET',
            title: '基本信息',
            cellMinWidth: 100,
            cols: [
                [   {title:'序号', type:'numbers',width:100,align: 'center'},
                    {field: 'enterpriseName', title: '企业名称', width: 100, sort: true,align: 'center'},
                    {field: 'enAddress', title: '所属区域', width: 100,align: 'center'},
                    {field: 'enType', title: '企业类型', width: 100,align: 'center'},
                    {field: 'legalName', title: '法人姓名', width: 100,align: 'center'},
                    {fixed: 'right', title: '操作', align: 'center', toolbar: '#basicInfo_edit',width: 200}
                ]
            ],
            parseData:function(e){
                console.log(e);
            },
            page: true,
            limits:[10,20,30,40,50,60,70,80,90,100],
            skin: "line"
        });
        e.on('tool(basicInfo)', function(obj){
            var data = obj.data;
            if(obj.event=='basictabAdd'){
                var date = new Date().getTime();
                var name =data.enterpriseName+"的基本信息" ;
                // var url='tabContent/personInfo/basicInfo?enterpriseName='+data.enterpriseName+'&showConfigUid='+basicInfoUid+'&changeRole='+role;
                var url='tabContent/personInfo/enterpriseInfo?enterpriseName='+data.enterpriseName+'&changeRole='+role;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content: ' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date //实际使用一般是规定好的id，这里以时间戳模拟下
                });
                element.tabChange('component-tabs-brief',date);

            }
            if(obj.event=='posttabAdd'){
                var date = new Date().getTime();
                var name =data.enterpriseName+"的职称信息" ;
                var url='tabContent/personInfo/postInfo?username='+data.username+'&showConfigUid='+postInfoUid+'&changeRole='+role;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content: ' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date //实际使用一般是规定好的id，这里以时间戳模拟下
                });
                element.tabChange('component-tabs-brief',date);

            }
            if(obj.event=='basictabDel'){
                layer.confirm('真的删除行么', function (index) {
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/deleteEnterpriseUser',
                        data: {enterpriseName: data.enterpriseName},
                        dataType: 'json',
                        method: 'GET'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("删除成功!")
                                table.reload('postInfo');
                            }
                            else
                                parent.layer.alert(res.msg);
                        }
                    })
                    layer.close(index);
                });
            }
        });

        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/企业用户注册文件/营业执照附件',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '#businessLicenseAnnexFile',
                    url: resourceContainerHostForUpload +  '/gvsunResource/uploadFile', //上传接口
                    accept: 'file', //普通文件
                    multiple: false, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '#businessLicenseAnnexBtn',
                    data: {
                        fileTags: 'file',//文件类型（image,file,video）
                        siteName: '用户中心',//站点名
                        username:currentUsername, //上传人
                        directoryId: directoryId,//目录id
                        shareState: "私有",
                    },
                    field:'files',
                    before: function (obj) {//上传之前获取文件信息
                        layer.load();
                        obj.preview(function(index, file, result){
                            fileSize = file.size;
                            fileName = file.name;
                            console.log(file)
                        });
                    },

                    done: function (fileId,index, upload) {//上传完成后保存文件信息
                        if($("#businessLicenseAnnex").val()!=="") {
                            resourceContainer.deleteFileById({
                                fileId: $("#businessLicenseAnnex").val(),
                                success: function () {
                                    console.log('删除先前文件成功了')
                                    $("#businessLicenseAnnex").val(fileId.fileIds[0])
                                },
                                fail:function (msg) {
                                    console.log(msg)
                                }
                            })
                        }
                        else{
                            console.log(fileId.fileIds[0])
                            $("#businessLicenseAnnex").val(fileId.fileIds[0])
                            alert("营业执照附件上传成功！")
                        }
                        layer.closeAll('loading');
                    },
                    error: function(index, upload){
                        console.log(index)
                        layer.closeAll('loading');
                    }
                });

            },
            fail: function (reason) {
                alert("获取目录id失败:" + reason);
            }, needToken: true
        });
        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/企业用户注册文件/法定代表人附件',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '#legalRepresentativeAnnexFile',
                    url: resourceContainerHostForUpload +  '/gvsunResource/uploadFile', //上传接口
                    accept: 'file', //普通文件
                    multiple: false, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '#legalRepresentativeAnnexBtn',
                    data: {
                        fileTags: 'file',//文件类型（image,file,video）
                        siteName: '用户中心',//站点名
                        username:currentUsername, //上传人
                        directoryId: directoryId,//目录id
                        shareState: "私有",
                    },
                    field:'files',
                    before: function (obj) {//上传之前获取文件信息
                        obj.preview(function(index, file, result){
                            fileSize = file.size;
                            fileName = file.name;
                            console.log(file)
                        });
                    },

                    done: function (fileId,index, upload) {//上传完成后保存文件信息
                        if($('#legalRepresentativeAnnex').val()!=="") {
                            resourceContainer.deleteFileById({
                                fileId: $('#legalRepresentativeAnnex').val(),
                                success: function () {
                                    console.log(fileId.fileIds[0])
                                    $('#legalRepresentativeAnnex').val(fileId.fileIds[0])
                                    alert('重新上传成功，已经删除先前文件')
                                },
                                fail:function (msg) {
                                    console.log(msg)
                                    alert('重新上传失败！')
                                }
                            })
                        }
                        else{
                            console.log(fileId.fileIds[0])
                            $('#legalRepresentativeAnnex').val(fileId.fileIds[0])
                        }
                        alert("法定代表人附件上传成功！")
                    },
                    error: function(index, upload){
                        console.log(upload)
                        alert('法定代表人附件上传失败，请重传')

                    }
                });

            },
            fail: function (reason) {
                alert("获取目录id失败:" + reason);
            }, needToken: true
        });
        //查询功能
        active = {
            reload: function () {
                var enterpriseNameReload = $('#enterprisenameCheck');
                // var employeeNoReload = $('#employeeNo');

                //执行重载
                e.reload('basicInfo', {
                    url: userCenterHost + '/getAllEnterpriseByName',
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                            enterpriseName: enterpriseNameReload.val(),
                            // employeeNo:employeeNoReload.val()
                    }
                });
            },
            //根据所分配的教师还是学生的数据的管理权限完成表格数据切换
            warrantTypeChange:function () {
                var beChooseManageRoleType=$(this).val();
                //根据查询条件尽享表格数据重载
                e.reload('basicInfo', {
                    where: {
                       role:beChooseManageRoleType
                    }
                });
            },
            addMenu:function () {
                $("#addMenu").slideDown();
            },
            // 增加人才称号
            add:function(){
                var inputTalent=JSON.stringify({'talent':$("#menuName").val()});
                $.ajax({
                    type:'GET',
                    url:userCenterHost+'/addEnterpriseUser',
                    data:inputTalent,
                    // dataType: 'json',
                    contentType: 'application/json; charset=UTF-8',
                    success:function () {
                        layer.msg("添加成功！");
                        $("#addMenu").slideUp();
                        table.reload("menu")
                    },
                    error:function () {
                        alert("添加接口請求失敗！");
                    }
                })
            },
            cancel:function () {
                $("#addMenu").slideUp();
            }
        };
        $('.layui-btn').on('click', function(){
            var othis = $(this), type = othis.data('type');
            active[type] ? active[type].call(this, othis) : '';
        })
        $('.enterpriseInput .layui-btn').on('click', function(){
            var othis = $(this), type = othis.data('type');
            active[type] ? active[type].call(this, othis) : '';
        });
        }), e("manage_enterpriseInfo", {})

});
$('.header_edit').click(function () {
    $(".buttonAdd").hide();
    $(this).parents().parents().find("#addMenu").slideDown();
})
$(".edit_hide").click(
    function () {
        $(".buttonAdd").show();
        $(this).parents().parents().find("#addMenu").hide();
    }
);

