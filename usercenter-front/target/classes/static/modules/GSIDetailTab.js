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
        if(beShowgsiName)
        $.ajax({
            url: userCenterHost + '/getAllGSIByName',
            data: {
                gsiName: beShowgsiName
            },
            type: "GET",
            success: function (res) {
                if(!res.code){
                    var data=res.data[0]||null;
                    for (var item in data) {
                            $("input"+"[name="+item+"]").val(data[item]);
                    }
                    resourceContainer.getFileById({
                        success:function(result){
                            $('#photo_img').attr("src", result.url);
                        },
                        fail:function(){
                            alert('图像获取失败！');
                            $('#photo_img').attr("src",'');
                        },
                        fileId:data.idPhoto||0,
                        needToken:true
                    })
                }
                else{
                    console.log(res.msg);
                }

            }
        });
        else{
            $.ajax({
                url: userCenterHost + '/getInfoByUserId',
                data: {
                    userId: beShowuserId
                },
                type: "GET",
                success: function (res) {
                    if(!res.code){
                        var data=res.data[0]||null;
                        for (var item in data) {
                            $("input"+"[name="+item+"]").val(data[item]);
                        }
                        resourceContainer.getFileById({
                            success:function(result){
                                $('#photo_img').attr("src", result.url);
                            },
                            fail:function(){
                                alert('图像获取失败！');
                                $('#photo_img').attr("src",'');
                            },
                            fileId:data.idPhoto||0,
                            needToken:true
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
        form.render(null, 'showBasicInfo');
        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/事业单位注册文件/负责人证件照',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '#idPhotoFile',
                    url: resourceContainerHostForUpload +  '/gvsunResource/uploadFile', //上传接口
                    accept: 'file', //普通文件
                    multiple: false, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '#idPhotoBtn',
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
                        if($('#idPhoto').val()!=="") {
                            resourceContainer.deleteFileById({
                                fileId: $('#idPhoto').val(),
                                success: function () {
                                    alert("负责人证件照上传成功！，已删除先前文件")
                                    $('#idPhoto').val(fileId.fileIds[0])
                                },
                                fail:function (msg) {
                                    console.log(msg)
                                    alert('重新上传失败！')
                                }
                            })
                        }
                        else{
                            console.log(fileId.fileIds[0])
                            $('#idPhoto').val(fileId.fileIds[0])
                            alert("负责人证件照上传成功！")
                        }

                    },
                    error: function(index, upload){
                        console.log(index)

                    }
                });

            },
            fail: function (reason) {
                alert("获取目录id失败:" + reason);
            }, needToken: true
        });
        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/事业单位注册文件/事业单位证明材料',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '#gsiDataFile',
                    url: resourceContainerHostForUpload +  '/gvsunResource/uploadFile', //上传接口
                    accept: 'file', //普通文件
                    multiple: false, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '#gsiDataBtn',
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
                        if($('#gsiData').val()!=="") {
                            resourceContainer.deleteFileById({
                                fileId: $('#gsiData').val(),
                                success: function () {
                                    alert("事业单位证明材料上传成功！，已删除先前文件")
                                    console.log(fileId.fileIds[0])
                                    $('#gsiData').val(fileId.fileIds[0])
                                },
                                fail:function (msg) {
                                    console.log(msg)
                                    alert('重新上传失败！')
                                }
                            })
                        }
                        else{
                            console.log(fileId.fileIds[0])
                            $('#gsiData').val(fileId.fileIds[0])
                        }
                        alert("事业单位证明材料上传成功！")
                    },
                    error: function(index, upload){
                        console.log(upload)
                        alert('事业单位证明材料上传失败，请重传')

                    }
                });

            },
            fail: function (reason) {
                alert("获取目录id失败:" + reason);
            }, needToken: true
        });

        /*入党时间*/
        laydate.render({
            elem: '#partyTime'
        });


        /* 自定义验证规则 */
        // form.verify({
        //     title: function(value) {
        //         if(value.length < 5) {
        //             return '标题至少得5个字符啊';
        //         }
        //     },
        //     pass: [/(.+){6,12}$/, '密码必须6到12位'],
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
        form.on('submit(gsiInfo)', function (data) {
            var field = data.field
            console.log(field)
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                , btn: ['确定', '取消'] //按钮
                , yes: function () {
                    $("#basicInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    layer.closeAll();
                        admin.req({
                            url: userCenterHost + '/changeGSIUser',
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
        //人事类别提交
        form.on('submit(personnelCategory)', function (data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                , btn: ['确定', '取消'] //按钮
                , yes: function () {
                    $(".clearForm").trigger("click");
                    $("#personnelCategoryAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    $("#personnelCategoryAdd").hide();
                    layer.closeAll();
                    var field=data.field;
                    field['username']=beShowUsername;
                    admin.req({
                        url: userCenterHost + '/saveUserPersonnelCategoryInfo',
                        data:field,
                        dataType: 'json',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("提交成功!");
                                table.reload('personnelCategoryInfo');
                                $(".buttonAdd").show();
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
    window.location.href = userCenterHost + '/reportExport/comprehensiveSituation?username=' + currentUsername;
}
var user=$("input[name='gsiName']") ;
user.each(function(){
    $(this).val(currentUsername);
});


