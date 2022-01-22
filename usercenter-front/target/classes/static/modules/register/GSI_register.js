var serverHostArray = document.location.href.split('/');
var serverHostFilter = serverHostArray[0] + "//" + serverHostArray[2] + "";
function bindEvent() {
    document.onkeypress = function (event) {
        let e = event || window.event;
        if (e && e.keyCode === 13) { //回车键的键值为13
            $("button[data-step-type=next]").click();
        }
    }
}
function returnlogin(){
    window.location.href='http://localhost/index';
}
var gsiDataFile="";
var idPhotoFile=""
layui.define(function (e) {
    layui.use(['upload', 'layer', 'form'],function () {
        var $ = layui.$,
            form = layui.form,
            upload = layui.upload,
            layer = layui.layer;

        $(function () {
            $.ajax({
                url: userCenterHost + "/clause/get",
                type: "GET",
                async: false,
                data: {type: '事业用户服务条款'},
                success: function (res) {
                    if (res.data.name){
                        layer.open({
                            type: 1,
                            area: ['60%', '600px'],
                            offset: '100px',
                            title: "事业用户服务条款",
                            skin: 'layui-layer-rim',
                            content: $('#details'),
                            btn: ['同意并继续'],
                            resize: false,
                            scrollbar: false,
                            move: false,
                            closeBtn:0,
                            success: function (layero, index) {
                                $.ajax({
                                    url: userCenterHost + "/clause/get",
                                    type: "GET",
                                    async: false,
                                    data: {type: '事业用户服务条款'},
                                    success: function (res) {
                                        $(".layui-layer-title").text(res.data.name);
                                        $('#infoTest').html(res.data.content);
                                        form.render();
                                    }
                                });
                                // 回车点击同意协议
                                document.onkeypress = function (event) {
                                    let e = event || window.event;
                                    if (e && e.keyCode === 13) { //回车键的键值为13
                                        $(".layui-layer-btn0").click(function () {
                                            document.onkeypress = null;
                                        })
                                        $(".layui-layer-btn0").click();
                                    }
                                };
                            },
                            // yes回调
                            yes: function (index) {
                                layer.close(index); //如果设定了yes回调，需进行手工关闭
                            },
                            // 窗口关闭触发
                            end: function () {
                                bindEvent();
                            },
                            // 关闭后回调
                            cancel:function(){
                                location.href = location.origin;
                            }
                        })
                    }
                }
            });
        })

        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/事业单位注册文件/负责人证件照',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '#idPhotoFile',
                    url: resourceContainerHostForUpload +  '/gvsunResource/uploadFile', //上传接口
                    accept: 'file', //普通文件
                    multiple: false, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '#idPhoto',
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
                        if(idPhotoFile!=="") {
                            resourceContainer.deleteFileById({
                                fileId: idPhotoFile,
                                success: function () {
                                    alert("上传成功！，已删除先前文件")
                                    idPhotoFile = fileId.fileIds[0]
                                },
                                fail:function (msg) {
                                    console.log(msg)
                                    alert('重新上传失败！')
                                }
                            })
                        }
                        else{
                            console.log(fileId.fileIds[0]);
                            idPhotoFile = fileId.fileIds[0];
                            $('#idPhotoFile').val('已成功上传文件');
                            alert("上传成功！")
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
                    bindAction: '#gsiData',
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
                        if(gsiDataFile!=="") {
                            resourceContainer.deleteFileById({
                                fileId: gsiDataFile,
                                success: function () {
                                    alert("上传成功！，已删除先前文件")
                                    console.log(fileId.fileIds[0])
                                    gsiDataFile = fileId.fileIds[0]
                                },
                                fail:function (msg) {
                                    console.log(msg)
                                    alert('重新上传失败！')
                                }
                            })
                        }
                        else{
                            console.log(fileId.fileIds[0])
                            gsiDataFile = fileId.fileIds[0]
                            $('#gsiDataFile').val('已成功上传文件');
                        }
                        alert("上传成功！")
                    },
                    error: function(index, upload){
                        console.log(upload)
                        alert('上传失败，请重传')

                    }
                });

            },
            fail: function (reason) {
                alert("获取目录id失败:" + reason);
            }, needToken: true
        });
    })
})
// 用戶註冊
function register(){
    var gsiName = $("#gsiName").val();
    var gsiAddress = $("#gsiAddress").val();
    var chargeName = $("#chargeName").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var idNumber=$("#idNumber").val();
    var address=$("#address").val();
    var username = $("#username").val();
    var pwd = $("#pwd").val();
    var repwd = $("#repwd").val();
    var schoolName = $("#datasource").val();
    var opPhone = $("#opPhone").val();

    var idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    // /^1[3|4|5|7|8|9][0-9]\d{4,8}$/
    var phoneNumberReg = /(^1[3|4|5|7|8|9][0-9]\d{4,8}$)|(0\d{2,3}\-\d{7,8})/;
    var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    var usernameReg = /.*[\u4e00-\u9fa5]+.*$/
    var pwdReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/;
    if(usernameReg.test(username) && (username.length <= 7 || username.length >= 13)){
        alert("请填写长度在7-13之间的英文格式用户名！");
        return false;
    }else if(!pwdReg.test(pwd)) {
        alert("请填写长度8~20位数字及字母组合！");
        return false;
    }else if(pwd!=repwd) {
        alert("两次密码不相同！");
        return false;
    }
    else if(gsiName === null || gsiName === "" ){
        alert("请填写企业名称！");
        return false;
    }else if(gsiAddress === null || gsiAddress === "") {
        alert("请填写所属区域！");
        return false;
    }else if(phone === null || phone === "" || !(phoneNumberReg.test(phone))) {
        alert("请填写正确的联系方式！");
        return false;
    }else if(email === null || email === "" || !(emailReg.test(email))) {
        alert("请填写格式正确的邮箱格式！");
        return false;
    }else if(address === null || address === "" ){
        alert("请填写地址！");
        return false;
    }else if(chargeName === null || chargeName === "" ){
        alert("请填写负责人姓名！");
        return false;
    }else if(idNumber === null || idNumber === "" ||!(idCardReg.test(idNumber))){
        alert("请填写身份证号码！");
        return false;
    }else if(idPhotoFile === "" ){
        alert("请上传负责人证件照！");
        return false;
    }else if(gsiDataFile === "" ){
        alert("请上传事业单位证明材料附件！");
        return false;
    }else if(schoolName === null || schoolName === ""){
        alert("请选择注册的数据源！");
        return false;
    }else if(opPhone === null || opPhone === ""||!phoneNumberReg.test(opPhone)){
        alert("请填写正确的经办人手机号！");
        return false;
    }
    else{
        var value=$("#registershow").serialize();
        console.log({
            schoolName:schoolName,
        })
        $.ajax({
            type: 'POST',
            async: false,
            url: userCenterHost+'/regForGovernments',
            data: {
                username: username,
                password:pwd,
                gsiName:gsiName,
                gsiAddress:gsiAddress,
                phone:phone,
                email:email,
                idNumber:idNumber,
                chargeName: chargeName,
                address:address,
                opPhone:opPhone,
                schoolName:schoolName,
                idPhoto:idPhotoFile,
                gsiData:gsiDataFile
            },
            success: function(res) {
                if(!res.code){
                    alert("注册成功！请等待审核");
                    window.location.href='http://localhost/index';
                }
                else {
                    alert(res.msg);
                }

            },
            error:function() {
                alert("注册失败，发生异常");
            }
        });
    }
}
 layui.use(['form'],function (){
    var $ = layui.$,
        form = layui.form;
    form.render("select");
 })

