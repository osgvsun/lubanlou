var show_personConfig_uid=GetQueryString("showConfigUid");
var beOperatedUsername=GetQueryString('changeRole');
var currentRole=JSON.parse(localStorage['role']).roleList[0].id;
var tableField=[{title:'序号', width:100, type:"numbers"}] ;
layui.define(function (e) {
    layui.use(['index', 'form', 'laydate','table','upload'], function() {
        var $ = layui.$,
            admin = layui.admin,
            element = layui.element,
            layer = layui.layer,
            laydate = layui.laydate,
            form = layui.form,
            upload=layui.upload,
            table=layui.table;
        if(beShowenterpriseName)
        $.ajax({
            url: userCenterHost + '/usercenter/getAllEnterpriseByName',
            data: {
                enterpriseName: beShowenterpriseName
            },
            type: "GET",
            success: function (res) {
                console.log(beShowenterpriseName)
                if(!res.code){
                    var data=res.data[0]||null;
                    for (var item in data) {
                            $("input"+"[name="+item+"]").val(data[item]);
                    }
                    console.log(data.businessLicenseAnnex)
                    resourceContainer.getFileById({
                        success:function(result){
                            console.log(result.url)
                            $('#photo_img').attr("src", result.url);
                        },
                        fail:function(){
                            alert('图像获取失败！');
                            $('#photo_img').attr("src",'');
                        },
                        fileId:data.businessLicenseAnnex||0,
                        needToken:false
                    })
                }
                else{
                    console.log(res.msg);
                }

            }
        });
        else{
            $.ajax({
                url: userCenterHost + '/usercenter/getInfoByUserId',
                data: {
                    userId: beShowuserId
                },
                type: "GET",
                success: function (res) {
                    console.log(beShowenterpriseName)
                    if(!res.code){
                        var data=res.data[0]||null;
                        for (var item in data) {
                            $("input"+"[name="+item+"]").val(data[item]);
                        }
                        console.log(data.businessLicenseAnnex)
                        resourceContainer.getFileById({
                            success:function(result){
                                console.log(result.url)
                                $('#photo_img').attr("src", result.url);
                            },
                            fail:function(){
                                alert('图像获取失败！');
                                $('#photo_img').attr("src",'');
                            },
                            fileId:data.businessLicenseAnnex||0,
                            needToken:false
                        })
                    }
                    else{
                        console.log(res.msg);
                    }

                }
            });
        }
        $(".fa-spinner").remove();
        //职称信息数据渲染
        var uploadInst = upload.render({
            elem: '#img' //绑定元素
            ,url: '/upload/' //上传接口
            ,done: function(res){
                //上传完毕回调
            }
            ,error: function(){
                //请求异常回调
            }
        });
        form.render(null, 'showBasicInfo');

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
                        width: 800
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
                        width: 800
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
        /* 自定义验证规则 */
        // form.verify({
        //     title: function(value) {
        //         if(value.length < 5) {
        //             return '标题至少得5个字符啊';
        //         }
        //     },
        //     content: function(value) {
        //         layedit.sync(editIndex);
        //     }
        // });
        form.verify({
            idCard:[/(^\d{15}$)|(^\d{17}(\d|X)$)/,'请输入正确的身份证号码'],
            hotLine:[/(^1[3|4|5|7|8|9][0-9]\d{4,8}$)|(0\d{2,3}\-\d{7,8})/,'请输入正确的热线电话号码'],
            phone:[/^1[3|4|5|7|8|9][0-9]\d{4,8}$/,'请输入正确的手机号码'],
            pass: [/(.+){6,12}$/, '密码必须6到12位'],
        })
        /* 监听提交 */
        form.on('submit(enterpriseInfo)', function (data) {
            var field = data.field
            console.log(field)
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                , btn: ['确定', '取消'] //按钮
                , yes: function () {
                    $("#basicInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    layer.closeAll();
                        admin.req({
                            url: userCenterHost + '/usercenter/changeEnterpriseUser',
                            data: field,
                            dataType: 'json',
                            method: 'GET',
                            success: function (res) {
                                if (!res.code) {
                                    parent.layer.alert("提交成功!");
                                    $(".clearForm").trigger("click");
                                    $("#basicInfoEdit").hide();
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
            $(".buttonAdd").show();
            return false;
        });

        $("#uploadPhoto").click(function () {
            layer.open({
                type:2
                ,id: 'onloadPhoto'//防止重复弹出
                ,area : ["80%","80%"]
                ,content: '../../../teacher/onloadPhoto'
                ,btn: '关闭全部'
                ,btnAlign: 'c' //按钮居中
                ,shade: 0 //不显示遮罩
                ,yes: function(){
                    layer.closeAll();
                }
            });

        })
        //基本信息入党时间表单联动
        form.on('select(political)', function (data) {
            if (data.value === '群众' || data.value === '无党派人士') {
                $('#partyTime').val('');
                $('#JoinPatyTime').css("display", 'none');
                $('#partyTime').removeAttr("lay-verify");
            } else {
                $('#JoinPatyTime').css("display", 'inline-block');
                $('#partyTime').removeAttr("lay-verify");
            }
        });

        //监听职称信息编辑
        table.on('tool(postInfo)', function (obj) {
            var data = obj.data;
            if (obj.event === 'detail') {
                layer.msg('ID：' + data.id + ' 的查看操作');
            }
            else if (obj.event === 'del') {
                layer.confirm('真的删除行么', function (index) {
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/usercenter/deleteUserPositionInfo',
                        data: data,
                        dataType: 'json',
                        method: 'POST'
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
            else if (obj.event === 'edit') {
                /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
                var edit_div = '#postInfo_uid';
                editStandard(data, edit_div);
                form.render();
                layer.open({
                    type: 1
                    , title: '编辑'
                    , area: ['60%', '50%']
                    , id: 'layerDemo1'/* + type*/ //防止重复弹出
                    , content: $('#edit_postInfo')
                    , btnAlign: 'c' //按钮居中
                    , shade: 0 //不显示遮罩
                    , yes: function () {
                        layer.closeAll();
                    }
                });
            }
        });
        form.on('submit(showBasicInfo)', function (data) {
            $(this).parents().parents().parents().siblings(".fill_box").slideDown();
            var data = data.field;
            editStandard(data);
            for (var i = 0; i < Object.entries(data).length; i++) {
                if(Object.entries(data)[i][0]=='department'){
                    var option = '<option  value="' +Object.entries(data)[i][1] + '" selected>' + Object.entries(data)[i][1] + '</option>';
                    $("#department").append(option);
                }
                if(Object.entries(data)[i][0]=='highestDegreeGetFromMatherSchool'){
                    $("input[name='highestDegreeGetFromMatherSchool'][title='"+Object.entries(data)[i][1]+"']").attr("checked",true);
                }
                if(Object.entries(data)[i][0]=='political'){
                    if(Object.entries(data)[i][1]==='群众' ||Object.entries(data)[i][1]==='无党派人士'){
                        $('#partyTime').removeAttr("lay-verify");
                        $('#JoinPatyTime').css("display", 'none');
                    }
                }
            }
            form.render();
            return false;
        });


        /* 下拉框数据读取显示
    * */


    });
    e("personalDetailTab",{})
});


$('.header_edit').click(function () {
    $(".buttonEdit").hide();
    $(this).parents().parents().find("#editMenu").slideDown();
})
$(".edit_hide").click(function () {
        console.log('wodiaonimade')
        $(".buttonEdit").show();
        $('#basicInfoEdit').hide();
    }
);
function upload() {
    window.location.href = userCenterHost + '/usercenter/reportExport/comprehensiveSituation?username=' + currentUsername;
    // $.ajax({
    //     url: userCenterHost + '/usercenter/reportExport/comprehensiveSituation',
    //     data: {
    //         username : currentUsername
    //     },
    //     type:"GET",
    //     done:function(data){
    //         data = data.data;
    //         console.log(data);
    //     }
    // })

}
var user=$("input[name='enterpriseName']") ;
user.each(function(){
    $(this).val(currentUsername);
});


