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
var legalRepresentativeAnnexFile="";
var businessLicenseAnnexFile=""

// $('#businessLicenseAnnexFile').val('123');
console.log($('#businessLicenseAnnexFile').val())
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
                data: {type: '企业用户服务条款'},
                success: function (res) {
                    if (res.data.name){
                        layer.open({
                            type: 1,
                            area: ['60%', '60%'],
                            offset: '100px',
                            title: "企业用户服务条款",
                            skin: 'layui-layer-rim',
                            content: $('#details'),
                            btn: ['同意并继续'],
                            resize: false,
                            scrollbar: false,
                            move: false,
                            success: function (layero, index) {
                                $.ajax({
                                    url: userCenterHost + "/clause/get",
                                    type: "GET",
                                    data: {type: '企业用户服务条款'},
                                    success: function (res) {
                                        $(".layui-layer-title").text(res.data.name);
                                        $('#infoTest').html(res.data.content);
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
                                // $("#tos").attr("checked", "checked");
                                // $("#tos_bp").attr("checked", "checked");
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
            path: '用户中心/企业用户注册文件/营业执照附件',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '#businessLicenseAnnexFile',
                    url: resourceContainerHostForUpload +  '/gvsunResource/uploadFile', //上传接口
                    accept: 'file', //普通文件
                    multiple: false, //多个上传
                    title: 'lay-title="请上传一张图片吧亲"',
                    auto: false, //是否直接选择文件后上传
                    bindAction: '#businessLicenseAnnex',
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
                        if(businessLicenseAnnexFile!=="") {
                            resourceContainer.deleteFileById({
                                fileId: businessLicenseAnnexFile,
                                success: function () {
                                    businessLicenseAnnexFile = fileId.fileIds[0]
                                    alert('重新上传成功，已经删除先前文件')
                                },
                                fail:function (msg) {
                                    console.log(msg)
                                    alert('重新上传失败！')
                                }
                            })
                        }
                        else{
                            console.log(fileId.fileIds[0]);
                            businessLicenseAnnexFile = fileId.fileIds[0];
                            $('#businessLicenseAnnexFile').val('已成功上传文件');
                            alert("上传成功！")
                        }

                    },
                    error: function(index, upload){
                        console.log(upload)

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
                    bindAction: '#legalRepresentativeAnnex',
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
                        if(legalRepresentativeAnnexFile!=="") {
                            resourceContainer.deleteFileById({
                                fileId: legalRepresentativeAnnexFile,
                                success: function () {
                                    console.log(fileId.fileIds[0])
                                    legalRepresentativeAnnexFile = fileId.fileIds[0]
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
                            legalRepresentativeAnnexFile = fileId.fileIds[0]
                            $('#legalRepresentativeAnnexFile').val('已成功上传文件');
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
    var enterpriseName = $("#enterpriseName").val();
    var enAddress = $("#enAddress").val();
    var legalId = $("#legalId").val();
    var legalName = $("#legalName").val();
    var enType = $("#enType").val();
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
    else if(enterpriseName === null || enterpriseName === "" ){
        alert("请填写企业名称！");
        return false;
    }else if(enAddress === null || enAddress === "") {
        alert("请填写所在区域！");
        return false;
    }else if(enType === null || enType === "") {
        alert("请填写企业类型！");
        return false;
    }else if(phone === null || phone === "" || !(phoneNumberReg.test(phone))) {
        alert("请填写正确的联系方式！");
        return false;
    }else if(email === null || email === "" || !(emailReg.test(email))) {
        alert("请填写正确的邮箱格式！");
        return false;
    }else if(legalId === null || legalId === "" || !idCardReg.test(legalId)){
        alert("请填写格式正确的法定人身份证！");
        return false;
    }else if(address === null || address === "" ){
        alert("请填写地址！");
        return false;
    }else if(legalName === null || legalName === "" ){
        alert("请填写法人姓名！");
        return false;
    }else if(idNumber === null || idNumber === "" ){
        alert("请填写证件号码！");
        return false;
    }else if(businessLicenseAnnexFile === "" ){
        alert("请上传营业执照附件！");
        return false;
    }else if(legalRepresentativeAnnexFile === "" ){
        alert("请上传法定代表人附件附件！");
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
        $.ajax({
            type: 'POST',
            async: false,
            url: userCenterHost+'/regForEnterprise',
            data: {
                username: username,
                password:pwd,
                enterpriseName:enterpriseName,
                enAddress:enAddress,
                enType:enType,
                phone:phone,
                email:email,
                idNumber:idNumber,
                legalName: legalName,
                legalId:legalId,
                address:address,
                opPhone:opPhone,
                schoolName:schoolName,
                businessLicenseAnnex:businessLicenseAnnexFile,
                legalRepresentativeAnnex:legalRepresentativeAnnexFile
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

