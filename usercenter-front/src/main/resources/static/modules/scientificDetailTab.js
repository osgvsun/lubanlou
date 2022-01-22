var show_personConfig_uid=GetQueryString("showConfigUid");
var beOperatedUsername=GetQueryString('changeRole');
var currentRole=JSON.parse(localStorage['role']).roleList[0].id;
var userId = JSON.parse(localStorage['role']).id;
var tableField=[{title:'序号', width:100, type:"numbers"}] ;
$.ajax({
    url: userCenterHost + '/getMenuTree',
    async: false,
    type: "GET",
    data:{
        roleId:currentRole,
        beOperatedUsername:beShowUsername,
        menuId:show_personConfig_uid,
        beOperatedRoleName:beOperatedUsername,
        target:1
    },
    contentType: "json;charset=UTF-8",
    success: function (show_data) {
        var show_config_data=show_data.nextLevelConfigSet;
        for(var i=0;i<show_config_data.length;i++){
                if(show_config_data[i].config.adminSetting==1||show_config_data[i].config.selfSetting==1){
                    tableField.push({field: show_config_data[i].config.field, title:show_config_data[i].config.name, align:'center',width:'150'});
                    $("."+show_config_data[i].config.field).parent().parent().show();
                    var editField=document.getElementsByName(show_config_data[i].config.field);
                    for(var r=0;r<editField.length;r++)
                    {
                        if(show_config_data[i].config.edit == 3){
                            editField[r].disabled=true
                        }
                    }
                }
                else{
                    $("."+show_config_data[i].config.field).removeAttr("lay-verify");
                }
        }
            tableField.push({field: 'showFile', title: '项目文件',align: 'center', toolbar: '#showFile',width:200});
            tableField.push({fixed: 'right', title: '操作',align: 'center', toolbar: '#edit1',width:200});
    }
});

layui.define(function (e) {
    layui.use(['index', 'form', 'laydate', 'upload','table'], function() {
        var $ = layui.$,
            admin = layui.admin,
            layer = layui.layer,
            laydate = layui.laydate,
            form = layui.form,
            upload = layui.upload,
            table=layui.table;
        //定义一个待删除的变量，存放待删除的文件id，点击提交时再删除资源容器对应的id
        var toBeDeleteFile=[];
        //横向课题表格渲染
        table.render({
            elem: '#longitudinalSubjectInfo'
            ,url: userCenterHost+'/getUserLongitudinalSubjectInfo'
            ,method:'post'
            ,where:{
                userId: userId
            }
            ,cols: [tableField]
            //,skin: 'line' //表格风格
            ,even: true
            ,page: false //是否显示分页
            //,limits: [5, 7, 10]
            //,limit: 5 //每页默认显示的数量
        });
        //纵向课题表格渲染
        table.render({
            elem: '#horizontalSubjectInfo'
            ,url: userCenterHost+'/getUserHorizontalSubjectInfo'
            ,method:'post'
            ,where:{
                userId: userId
            }
            ,cols: [tableField]
            //,skin: 'line' //表格风格
            ,even: true
            ,page: false //是否显示分页
            //,limits: [5, 7, 10]
            //,limit: 5 //每页默认显示的数量
        });
        //科研获奖表格渲染
        table.render({
            elem: '#researchAwardInfo'
            ,url: userCenterHost+'/getUserResearchAwardInfo'
            ,method:'post'
            ,where:{
                userId: userId
            }
            ,cols: [tableField]
            //,skin: 'line' //表格风格
            ,even: true
            ,page: false //是否显示分页
            //,limits: [5, 7, 10]
            //,limit: 5 //每页默认显示的数量
        });
        //专著出版表格渲染
        table.render({
            elem: '#publicationInfo'
            ,url: userCenterHost+'/getUserPublicationInfo'
            ,method:'post'
            ,where:{
                username:beShowUsername
            }
            ,cols: [tableField]
            //,skin: 'line' //表格风格
            ,even: true
            ,page: false //是否显示分页
            //,limits: [5, 7, 10]
            //,limit: 5 //每页默认显示的数量
        });

        //纵向课题起止时间
        laydate.render({
            elem: '#lsStartStopTime_add',
            type: 'month',
            range: true
        });
        laydate.render({
            elem: '#lsStartStopTime',
            type: 'month',
            range: true
        });

        //横向课题起止时间
        laydate.render({
            elem: '#hsStartStopTime_add',
            type: 'month',
            range: true
        });
        laydate.render({
            elem: '#hsStartStopTime',
            type: 'month',
            range: true
        });

        //科研获奖时间
        laydate.render({
            elem: '#raTime_add'
        });
        laydate.render({
            elem: '#raTime'
        });

        //出版专著、著作情况出版时间
        laydate.render({
            elem: '#publishTime_add',
            type: 'year'
        });
        laydate.render({
            elem: '#publishTime',
            type: 'year'
        });
        laydate.render({
            elem: '#publishTimeInput',
            type: 'year'
        });

        /* 监听提交 */
        form.on('submit(longitudinalSubjectInfo)', function(data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                ,btn: ['确定','取消'] //按钮
                ,yes:function(){
                    $(".clearForm").trigger("click");
                    $("#longitudinalSubjectInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    $("#longitudinalSubjectInfoAdd").hide();
                    layer.closeAll();
                    for(var i=0;i<toBeDeleteFile.length;i++){
                        resourceContainer.deleteFileById({
                            success:function(){
                                console.log("文件删除成功！")
                            },
                            fail:function(){
                                alert("请求删除失败！")
                            },
                            fileId:toBeDeleteFile[i],
                            needToken: true
                        })
                    }
                    var field=data.field;
                    field['username']=beShowUsername;
                    admin.req({
                        url: userCenterHost + '/saveUserLongitudinalSubjectInfo',
                        data:field,
                        dataType: 'json',
                        method: 'POST'
                        ,success: function(res){
                            if(!res.code){
                                parent.layer.alert("提交成功！");
                                table.reload('longitudinalSubjectInfo');
                                $(".header_edit").show();
                            }
                            else{
                                console.log(res.msg);
                                parent.layer.alert("提交失败")
                            }
                        }
                    })
                }
            });
            return false;
        });
        form.on('submit(horizontalSubjectInfo)', function(data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                ,btn: ['确定','取消'] //按钮
                ,yes:function(){
                    $(".clearForm").trigger("click");
                    $("#horizontalSubjectInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    $("#horizontalSubjectInfoAdd").hide();
                    layer.closeAll();
                    for(var i=0;i<toBeDeleteFile.length;i++){
                        resourceContainer.deleteFileById({
                            success:function(){
                                console.log("文件删除成功！")
                            },
                            fail:function(){
                                alert("请求删除失败！")
                            },
                            fileId:toBeDeleteFile[i],
                            needToken: true
                        })
                    }
                    var field=data.field;
                    field['username']=beShowUsername;
                    admin.req({
                        url: userCenterHost + '/saveUserHorizontalSubjectInfo',
                        data:field,
                        dataType: 'json',
                        method: 'POST'
                        ,success: function(res){
                            if(!res.code){
                                parent.layer.alert("提交成功！");
                                table.reload('horizontalSubjectInfo');
                                $(".header_edit").show();
                            }
                            else{
                                console.log(res.msg);
                                parent.layer.alert("提交失败")
                            }
                        }
                    })
                }
            })
            return false;
        });
        form.on('submit(researchAwardInfo)', function(data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                ,btn: ['确定','取消'] //按钮
                ,yes:function(){
                    $(".clearForm").trigger("click");
                    $("#researchAwardInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    $("#researchAwardInfoAdd").hide();
                    layer.closeAll();
                    for(var i=0;i<toBeDeleteFile.length;i++){
                        resourceContainer.deleteFileById({
                            success:function(){
                                console.log("文件删除成功！")
                            },
                            fail:function(){
                                alert("请求删除失败！")
                            },
                            fileId:toBeDeleteFile[i],
                            needToken: true
                        })
                    }
                    var field=data.field;
                    field['username']=beShowUsername;
                    admin.req({
                        url: userCenterHost + '/saveUserResearchAwardInfo',
                        data:field,
                        dataType: 'json',
                        method: 'POST'
                        ,success: function(res){
                            if(!res.code){
                                parent.layer.alert("提交成功！");
                                table.reload('researchAwardInfo');
                                $(".header_edit").show();
                            }
                            else{
                                console.log(res.msg);
                                parent.layer.alert("提交失败")
                            }
                        }
                    })
                }
            })
            return false;
        });
        form.on('submit(publicationInfo)', function(data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                ,btn: ['确定','取消'] //按钮
                ,yes:function(){
                    $(".clearForm").trigger("click");
                    $("#publicationInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    $("#publicationInfoAdd").hide();
                    layer.closeAll();
                    for(var i=0;i<toBeDeleteFile.length;i++){
                        resourceContainer.deleteFileById({
                            success:function(){
                                console.log("文件删除成功！")
                            },
                            fail:function(){
                                alert("请求删除失败！")
                            },
                            fileId:toBeDeleteFile[i],
                            needToken: true
                        })
                    }
                    var field=data.field;
                    field['username']=beShowUsername;
                    admin.req({
                        url: userCenterHost + '/saveUserPublicationInfo',
                        data:field,
                        dataType: 'json',
                        method: 'POST'
                        ,success: function(res){
                            if(!res.code){
                                parent.layer.alert("提交成功！");
                                table.reload('publicationInfo');
                                $(".header_edit").show();
                            }
                            else{
                                console.log(res.msg);
                                parent.layer.alert("提交失败")
                            }

                        }
                    })
                }
            })
            return false;
        });
        //上传文件，选完文件后不自动上传,点击开始上传按钮上传

        //layui框架的upload.js的上传方法已根据公司资源容器进行修改，升级框架请注意
        //纵向课题立项文件
        var lsPdListView = $('.lsProjectDoc').next().find('.lsPdList');
        var lsDocument=[];
        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/科研相关/纵向课题',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '.lsProjectDoc',
                    // url: resourceContainerHostForUpload + '/gvsunResource/uploadFile',//上传接口
                    accept: 'file', //普通文件
                    multiple: true, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '.lspdbtn',
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
                        });
                    },
                    choose: function(obj) {
                        var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                        //读取本地文件
                        obj.preview(function(index, file, result) {
                            var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

                            //单个重传
                            tr.find('.demo-reload').on('click', function() {
                                obj.upload(index, file);
                            });

                            //删除
                            tr.find('.demo-delete').on('click', function() {
                                delete files[index]; //删除对应的文件
                                $(this).parent().parent().remove();
                                uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                            });

                            lsPdListView.append(tr);
                        });
                    },
                    done: function (fileId,index, upload) {//上传完成后保存文件信息
                        var fileIds=fileId.fileIds;
                        $("#lsProjectAddfileId").val(fileIds);
                        for(var i=0;i<index.length;i++){
                            delete $(this)[0].files[index[i]];
                            var tr =  lsPdListView.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                                tds.eq(3).html('<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="lsProjectAddfileId" id='+fileIds[i]+'>删除</button>');
                                /*return delete $(this).files[index]; //删除文件队列已经上传成功的文件*/
                                $(this).error(index, upload);
                            })
                        }


                    }
                    ,error: function(index, upload){
                        for(var i=0;i<index.length;i++){
                            var tr = lsPdListView.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                                tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                            })
                        }

                    }
                });

            },
            fail: function (reason) {
                alert("获取目录id失败:" + reason);
            }, needToken: true
        });
        var lsPdListView_edit = $('.lsProjectDoc_edit').next().find('.lsPdList');
        var fileIdInput= $("#fileIds");
        console.log(fileIdInput);
        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/科研相关/纵向课题',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '.lsProjectDoc_edit',
                    // url: resourceContainerHostForUpload + '/gvsunResource/uploadFile',//上传接口
                    accept: 'file', //普通文件
                    multiple: true, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '.lspdbtn_edit',
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
                        });
                    },
                    choose: function(obj) {
                        var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                        //读取本地文件
                        obj.preview(function(index, file, result) {
                            var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

                            //单个重传
                            tr.find('.demo-reload').on('click', function() {
                                obj.upload(index, file);
                            });

                            //删除
                            tr.find('.demo-delete').on('click', function() {
                                delete files[index]; //删除对应的文件
                                $(this).parent().parent().remove();
                                uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                            });

                            lsPdListView_edit.append(tr);
                        });
                    },
                    done: function (fileId,index, upload) {//上传完成后保存文件信息
                        lsDocument.push(fileId.fileIds);
                        if($("#fileIds.lsProject_fileId").val().length){
                            var fileIdInput=$("#fileIds.lsProject_fileId").val().split(',');
                        }
                        else {
                            var fileIdInput=[]
                        }

                        var fileIds=fileId.fileIds;
                        for(var i=0;i<fileIds.length;i++){
                            console.log(fileIds[i]);
                            fileIdInput.push(fileIds[i]);

                        };
                        $("#fileIds.lsProject_fileId").val(fileIdInput);
                        for(var i=0;i<index.length;i++){
                            delete $(this)[0].files[index[i]];
                            var tr =  lsPdListView_edit.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                                tds.eq(3).html('<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="fileIds.lsProject_fileId" id='+fileIds[i]+'>删除</button>');
                                /*return delete $(this).files[index]; //删除文件队列已经上传成功的文件*/
                                $(this).error(index, upload);
                            })
                        }


                    }
                    ,error: function(index, upload){
                        for(var i=0;i<index.length;i++){
                            var tr = lsPdListView_edit.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                                tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                            })
                        }


                    }
                });

            },
            fail: function (reason) {
                alert("获取目录id失败:" + reason);
            }, needToken: true
        });

        //横向课题立项文件
        var hspdlistView = $('.hsProjectDoc').next().find('.hsPdList');
        var hsDocument=[];
        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/科研相关/横向课题',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '.hsProjectDoc',
                    // url: resourceContainerHostForUpload + '/gvsunResource/uploadFile', //上传接口
                    accept: 'file', //普通文件
                    multiple: true, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '.hspdbtn',
                    field:'files',
                    data: {
                        fileTags: 'file',//文件类型（image,file,video）
                        siteName: '用户中心',//站点名
                        username:currentUsername, //上传人
                        directoryId: directoryId,//目录id
                        shareState: "私有"
                    },
                    before: function (obj) {//上传之前获取文件信息
                        obj.preview(function(index, file, result){
                            fileSize = file.size;
                            fileName = file.name;
                        });
                    },
                    choose: function(obj) {
                        var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                        //读取本地文件
                        obj.preview(function(index, file, result) {
                            var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

                            //单个重传
                            tr.find('.demo-reload').on('click', function() {
                                obj.upload(index, file);
                            });

                            //删除
                            tr.find('.demo-delete').on('click', function() {
                                delete files[index]; //删除对应的文件
                                $(this).parent().parent().remove();
                                uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                            });

                            hspdlistView.append(tr);
                        });
                    },
                    done: function (fileId,index, upload) {//上传完成后保存文件信息
                        var fileIds=fileId.fileIds;
                        $("#hsProjectAddfileId").val(fileIds);
                        for(var i=0;i<index.length;i++){
                            delete $(this)[0].files[index[i]];
                            var tr =   hspdlistView.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                                tds.eq(3).html('<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="hsProjectAddfileId" id='+fileIds[i]+'>删除</button>');
                                /* return delete $(this).files[index]; //删除文件队列已经上传成功的文件*/
                                $(this).error(index, upload);
                            })
                        }
                    },
                    error: function(index, upload){
                        for(var i=0;i<index.length;i++){
                            var tr =hspdlistView.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                                tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                            })
                        }


                    }
                });

            },
            fail: function (reason) {
                alert("获取目录id失败:" + reason);
            }, needToken: true
        });
        var hspdlistView_edit = $('.hsProjectDoc_edit').next().find('.hsPdList');
        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/科研相关/横向课题',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '.hsProjectDoc_edit',
                    // url: resourceContainerHostForUpload + '/gvsunResource/uploadFile', //上传接口
                    accept: 'file', //普通文件
                    multiple: true, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '.hspdbtn_edit',
                    field:'files',
                    data: {
                        fileTags: 'file',//文件类型（image,file,video）
                        siteName: '用户中心',//站点名
                        username:currentUsername, //上传人
                        directoryId: directoryId,//目录id
                        shareState: "私有"
                    },
                    before: function (obj) {//上传之前获取文件信息
                        obj.preview(function(index, file, result){
                            fileSize = file.size;
                            fileName = file.name;
                        });
                    },
                    choose: function(obj) {
                        var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                        //读取本地文件
                        obj.preview(function(index, file, result) {
                            var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

                            //单个重传
                            tr.find('.demo-reload').on('click', function() {
                                obj.upload(index, file);
                            });

                            //删除
                            tr.find('.demo-delete').on('click', function() {
                                delete files[index]; //删除对应的文件
                                $(this).parent().parent().remove();
                                uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                            });

                            hspdlistView_edit.append(tr);
                        });
                    },
                    done: function (fileId,index, upload) {//上传完成后保存文件信息
                        hsDocument.push(fileId.fileIds);
                        var fileIds=fileId.fileIds;
                        if($("#fileIds.hsProject_fileId").val().length){
                            var fileIdInput= $("#fileIds.hsProject_fileId").val().split(',');
                        }
                        else {
                            var fileIdInput=[];
                        }
                        for(var i=0;i<fileIds.length;i++){
                            fileIdInput.push(fileIds[i]);

                        };
                        $("#fileIds.hsProject_fileId").val(fileIdInput);
                        for(var i=0;i<index.length;i++){
                            delete $(this)[0].files[index[i]];
                            var tr =   hspdlistView_edit.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                                tds.eq(3).html('<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="fileIds.hsProject_fileId" id='+fileIds[i]+'>删除</button>');
                                /* return delete $(this).files[index]; //删除文件队列已经上传成功的文件*/
                                $(this).error(index, upload);
                            })
                        }

                    },
                    error: function(index, upload){
                        for(var i=0;i<index.length;i++){
                            var tr =hspdlistView.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                                tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                            })
                        }


                    }
                });

            },
            fail: function (reason) {
                alert("获取目录id失败:" + reason);
            }, needToken: true
        });


        //科研获奖获奖证书
        var raaclistView = $('.raAwardCertificate').next().find('.raAcList');
        var raDocument=[];
        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/科研相关/科研获奖',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '.raAwardCertificate',
                    // url: resourceContainerHostForUpload + '/gvsunResource/uploadFile', //上传接口
                    accept: 'file', //普通文件
                    multiple: true, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '.raacbtn',
                    field:'files',
                    choose: function(obj) {
                        var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                        //读取本地文件
                        obj.preview(function(index, file, result) {
                            var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

                            //单个重传
                            tr.find('.demo-reload').on('click', function() {
                                obj.upload(index, file);
                            });

                            //删除
                            tr.find('.demo-delete').on('click', function() {
                                delete files[index]; //删除对应的文件
                                $(this).parent().parent().remove();
                                uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                            });

                            raaclistView.append(tr);
                        });
                    },
                    data: {
                        fileTags: 'file',//文件类型（image,file,video）
                        siteName: '用户中心',//站点名
                        username:currentUsername, //上传人
                        directoryId: directoryId,//目录id
                        shareState: "私有"
                    },
                    before: function (obj) {//上传之前获取文件信息
                        obj.preview(function(index, file, result){
                            fileSize = file.size;
                            fileName = file.name;
                        });
                    },
                    done: function (fileId,index, upload) {//上传完成后保存文件信息
                        var fileIds=fileId.fileIds;
                        $("#raAddfileId").val(fileIds);
                        for(var i=0;i<index.length;i++){
                            delete $(this)[0].files[index[i]];
                            var tr =  raaclistView.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                                tds.eq(3).html('<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="raAddfileId" id='+fileIds[i]+'>删除</button>');
                                /*return delete $(this).files[index]; //删除文件队列已经上传成功的文件*/
                                $(this).error(index, upload);
                            })
                        }


                    },
                    error: function(index, upload){
                        for(var i=0;i<index.length;i++){
                            var tr = raaclistView.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                                tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                            })
                        }


                    }
                });

            },
            fail: function (reason) {
                alert("获取目录id失败:" + reason);
            }, needToken: true
        });
        var raaclistView_edit = $('.raAwardCertificate_edit').next().find('.raAcList');
        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/科研相关/科研获奖',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '.raAwardCertificate_edit',
                    // url: resourceContainerHostForUpload + '/gvsunResource/uploadFile', //上传接口
                    accept: 'file', //普通文件
                    multiple: true, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '.raacbtn_edit',
                    field:'files',
                    choose: function(obj) {
                        var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                        //读取本地文件
                        obj.preview(function(index, file, result) {
                            var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

                            //单个重传
                            tr.find('.demo-reload').on('click', function() {
                                obj.upload(index, file);
                            });

                            //删除
                            tr.find('.demo-delete').on('click', function() {
                                delete files[index]; //删除对应的文件
                                $(this).parent().parent().remove();
                                uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                            });

                            raaclistView_edit.append(tr);
                        });
                    },
                    data: {
                        fileTags: 'file',//文件类型（image,file,video）
                        siteName: '用户中心',//站点名
                        username:currentUsername, //上传人
                        directoryId: directoryId,//目录id
                        shareState: "私有"
                    },
                    before: function (obj) {//上传之前获取文件信息
                        obj.preview(function(index, file, result){
                            fileSize = file.size;
                            fileName = file.name;
                        });
                    },
                    done: function (fileId,index, upload) {//上传完成后保存文件信息
                        raDocument.push(fileId.fileIds);
                        var fileIds=fileId.fileIds;
                        if($("#fileIds.ra_fileId").val().length){
                            var fileIdInput= $("#fileIds.ra_fileId").val().split(',');
                        }
                        else {
                            var fileIdInput=[];
                        }

                        for(var i=0;i<fileIds.length;i++){
                            fileIdInput.push(fileIds[i]);

                        };
                        $("#fileIds.ra_fileId").val(fileIdInput);
                        for(var i=0;i<index.length;i++){
                            delete $(this)[0].files[index[i]];
                            var tr =  raaclistView_edit.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                                tds.eq(3).html('<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="fileIds.ra_fileId" id='+fileIds[i]+'>删除</button>');
                                /*return delete $(this).files[index]; //删除文件队列已经上传成功的文件*/
                                $(this).error(index, upload);
                            })
                        }


                    },
                    error: function(index, upload){
                        for(var i=0;i<index.length;i++){
                            var tr = raaclistView_edit.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                                tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                            })
                        }

                    }
                });

            },
            fail: function (reason) {
                alert("获取目录id失败:" + reason);
            }, needToken: true
        });

        //出版专著、著作情况——封面
        var coverlistView = $('.cover').next().find('.coverList');
        var coverDocument=[];
        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/科研相关/专著封面',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '.cover',
                    url: resourceContainerHostForUpload +  '/gvsunResource/uploadFile', //上传接口
                    accept: 'jpg,png,gif', //图片
                    multiple: false, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '.coverbtn',
                    field:'files',
                    choose: function(obj) {
                        var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                        //读取本地文件
                        obj.preview(function(index, file, result) {
                            var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

                            //单个重传
                            tr.find('.demo-reload').on('click', function() {
                                obj.upload(index, file);
                            });

                            //删除
                            tr.find('.demo-delete').on('click', function() {
                                delete files[index]; //删除对应的文件
                                $(this).parent().parent().remove();
                                uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                            });

                            coverlistView.append(tr);
                        });
                    },
                    data: {
                        fileTags: 'file',//文件类型（image,file,video）
                        siteName: '用户中心',//站点名
                        username:currentUsername, //上传人
                        directoryId: directoryId,//目录id
                        shareState: "私有"
                    },
                    before: function (obj) {//上传之前获取文件信息
                        obj.preview(function(index, file, result){
                            fileSize = file.size;
                            fileName = file.name;
                        });
                    },
                    done: function (fileId,index, upload) {//上传完成后保存文件信息
                        var fileIds=fileId.fileIds;
                        $("#coverAddfileId").val(fileIds);
                        for(var i=0;i<index.length;i++){
                            delete $(this)[0].files[index[i]];
                            var tr =  coverlistView.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                                tds.eq(3).html('<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="coverAddfileId" id='+fileIds[i]+'>删除</button>');
                                /*return delete $(this).files[index]; //删除文件队列已经上传成功的文件*/
                                $(this).error(index, upload);
                            })
                        }

                    },
                    error: function(index, upload){
                        for(var i=0;i<index.length;i++){
                            var tr =coverlistView.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                                tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                            })
                        }


                    }
                });

            },
            fail: function (reason) {
                alert("获取目录id失败:" + reason);
            }, needToken: true
        });
        var coverlistView_edit = $('.cover_edit').next().find('.coverList');
        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/科研相关/专著封面',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '.cover_edit',
                    url: resourceContainerHostForUpload +  '/gvsunResource/uploadFile', //上传接口
                    accept: 'jpg,png,gif', //图片
                    multiple: false, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '.coverbtn_edit',
                    field:'files',
                    choose: function(obj) {
                        var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                        //读取本地文件
                        obj.preview(function(index, file, result) {
                            var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

                            //单个重传
                            tr.find('.demo-reload').on('click', function() {
                                obj.upload(index, file);
                            });

                            //删除
                            tr.find('.demo-delete').on('click', function() {
                                delete files[index]; //删除对应的文件
                                $(this).parent().parent().remove();
                                uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                            });

                            coverlistView_edit.append(tr);
                        });
                    },
                    data: {
                        fileTags: 'file',//文件类型（image,file,video）
                        siteName: '用户中心',//站点名
                        username:currentUsername, //上传人
                        directoryId: directoryId,//目录id
                        shareState: "私有"
                    },
                    before: function (obj) {//上传之前获取文件信息
                        obj.preview(function(index, file, result){
                            fileSize = file.size;
                            fileName = file.name;
                        });
                    },
                    done: function (fileId,index, upload) {//上传完成后保存文件信息
                        coverDocument.push(fileId.fileIds);
                        if($("#coverFileIds.cover_fileId").val().length){
                            var fileIdInput= $("#coverFileIds.cover_fileId").val().split(',');
                        }
                        else {
                            var fileIdInput=[];
                        }
                        var fileIds=fileId.fileIds;
                        for(var i=0;i<fileIds.length;i++){
                            fileIdInput.push(fileIds[i]);

                        };
                        $("#coverFileIds.cover_fileId").val(fileIdInput);
                        for(var i=0;i<index.length;i++){
                            delete $(this)[0].files[index[i]];
                            var tr =  coverlistView_edit.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                                tds.eq(3).html('<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="coverFileIds.cover_fileId" id='+fileIds[i]+'>删除</button>');
                                /*return delete $(this).files[index]; //删除文件队列已经上传成功的文件*/
                                $(this).error(index, upload);
                            })
                        }


                    },
                    error: function(index, upload){
                        for(var i=0;i<index.length;i++){
                            var tr =coverlistView_edit.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                                tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                            })
                        }


                    }
                });

            },
            fail: function (reason) {
                alert("获取目录id失败:" + reason);
            }, needToken: true
        });


        //出版专著、著作情况——扉页
        var tplistView = $('.titlePage').next().find('.tpList');
        var titleDocument=[];
        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/科研相关/专著扉页',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '.titlePage',
                    url: resourceContainerHostForUpload +  '/gvsunResource/uploadFile', //上传接口
                    accept: 'jpg,png,gif', //图片
                    multiple: false, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '.tpbtn',
                    field:'files',
                    choose: function(obj) {
                        var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                        //读取本地文件
                        obj.preview(function(index, file, result) {
                            var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

                            //单个重传
                            tr.find('.demo-reload').on('click', function() {
                                obj.upload(index, file);
                            });

                            //删除
                            tr.find('.demo-delete').on('click', function() {
                                delete files[index]; //删除对应的文件
                                $(this).parent().parent().remove();
                                uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                            });

                            tplistView.append(tr);
                        });
                    },
                    data: {
                        fileTags: 'file',//文件类型（image,file,video）
                        siteName: '用户中心',//站点名
                        username:currentUsername, //上传人
                        directoryId: directoryId,//目录id
                        shareState: "私有"
                    },
                    before: function (obj) {//上传之前获取文件信息
                        obj.preview(function(index, file, result){
                            fileSize = file.size;
                            fileName = file.name;
                        });
                    },
                    done: function (fileId,index, upload) {//上传完成后保存文件信息
                        var fileIds=fileId.fileIds;
                        $("#titleAddfileId").val(fileIds);
                        for(var i=0;i<index.length;i++){
                            delete $(this)[0].files[index[i]];
                            var tr = tplistView.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                                tds.eq(3).html('<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="titleAddfileId" id='+fileIds[i]+'>删除</button>');
                                /* return delete $(this).files[index]; //删除文件队列已经上传成功的文件*/
                                $(this).error(index, upload);
                            })
                        }


                    },
                    error: function(index, upload){
                        for(var i=0;i<index.length;i++){
                            var tr = tplistView.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                                tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                            })
                        }


                    }
                });

            },
            fail: function (reason) {
                alert("获取目录id失败:" + reason);
            }, needToken: true
        });
        var tplistView_edit = $('.titlePage_edit').next().find('.tpList');
        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/科研相关/专著扉页',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '.titlePage_edit',
                    url: resourceContainerHostForUpload +  '/gvsunResource/uploadFile', //上传接口
                    accept: 'jpg,png,gif', //图片
                    multiple: false, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '.tpbtn_edit',
                    field:'files',
                    choose: function(obj) {
                        var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                        //读取本地文件
                        obj.preview(function(index, file, result) {
                            var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

                            //单个重传
                            tr.find('.demo-reload').on('click', function() {
                                obj.upload(index, file);
                            });

                            //删除
                            tr.find('.demo-delete').on('click', function() {
                                delete files[index]; //删除对应的文件
                                $(this).parent().parent().remove();
                                uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                            });

                            tplistView_edit.append(tr);
                        });
                    },
                    data: {
                        fileTags: 'file',//文件类型（image,file,video）
                        siteName: '用户中心',//站点名
                        username:currentUsername, //上传人
                        directoryId: directoryId,//目录id
                        shareState: "私有"
                    },
                    before: function (obj) {//上传之前获取文件信息
                        obj.preview(function(index, file, result){
                            fileSize = file.size;
                            fileName = file.name;
                        });
                    },
                    done: function (fileId,index, upload) {//上传完成后保存文件信息
                        titleDocument.push(fileId.fileIds);
                        var fileIds=fileId.fileIds;
                        if($("#titlePageFileIds.title_fileId").val().length){
                            var fileIdInput= $("#titlePageFileIds.title_fileId").val().split(',');
                        }
                        else {
                            var fileIdInput=[];
                        }
                        for(var i=0;i<fileIds.length;i++){
                            fileIdInput.push(fileIds[i]);

                        };
                        $("#titlePageFileIds.title_fileId").val(fileIdInput);
                        for(var i=0;i<index.length;i++){
                            delete $(this)[0].files[index[i]];
                            var tr = tplistView_edit.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                                tds.eq(3).html('<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="titlePageFileIds.title_fileId" id='+fileIds[i]+'>删除</button>');
                                /* return delete $(this).files[index]; //删除文件队列已经上传成功的文件*/
                                $(this).error(index, upload);
                            })
                        }

                    },
                    error: function(index, upload){
                        for(var i=0;i<index.length;i++){
                            var tr = tplistView_edit.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                                tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                            })
                        }

                    }
                });

            },
            fail: function (reason) {
                alert("获取目录id失败:" + reason);
            }, needToken: true
        });


        //出版专著、著作情况——封底
        var bclistView = $('.backCover').next().find('.bcList');
        var backDocument=[];
        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/科研相关/专著封底',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '.backCover',
                    url: resourceContainerHostForUpload +  '/gvsunResource/uploadFile', //上传接口
                    accept: 'jpg,png,gif', //图片
                    multiple: false, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '.bcbtn',
                    choose: function(obj) {
                        var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                        //读取本地文件
                        obj.preview(function(index, file, result) {
                            var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

                            //单个重传
                            tr.find('.demo-reload').on('click', function() {
                                obj.upload(index, file);
                            });

                            //删除
                            tr.find('.demo-delete').on('click', function() {
                                delete files[index]; //删除对应的文件
                                $(this).parent().parent().remove();
                                uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                            });

                            bclistView.append(tr);
                        });
                    },
                    field:'files',
                    data: {
                        fileTags: 'file',//文件类型（image,file,video）
                        siteName: '用户中心',//站点名
                        username:currentUsername, //上传人
                        directoryId: directoryId,//目录id
                        shareState: "私有"
                    },
                    before: function (obj) {//上传之前获取文件信息
                        obj.preview(function(index, file, result){
                            fileSize = file.size;
                            fileName = file.name;
                        });
                    },
                    done: function (fileId,index, upload) {//上传完成后保存文件信息
                        var fileIds=fileId.fileIds;
                        $("#backAddfileId").val(fileIds);
                        for(var i=0;i<index.length;i++){
                            delete $(this)[0].files[index[i]];
                            var tr =  bclistView.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                                tds.eq(3).html('<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="backAddfileId" id='+fileIds[i]+'>删除</button>');
                                /*return delete $(this).files[index]; //删除文件队列已经上传成功的文件*/
                                $(this).error(index, upload);
                            })
                        }

                    },
                    error: function(index, upload){
                        for(var i=0;i<index.length;i++){
                            var tr =  bclistView.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                                tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                            })
                        }

                    }
                });

            },
            fail: function (reason) {
                alert("获取目录id失败:" + reason);
            }, needToken: true
        });
        var bclistView_edit = $('.backCover_edit').next().find('.bcList');
        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/科研相关/专著封底',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '.backCover_edit',
                    url: resourceContainerHostForUpload +  '/gvsunResource/uploadFile', //上传接口
                    accept: 'jpg,png,gif', //图片
                    multiple: false, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '.bcbtn_edit',
                    choose: function(obj) {
                        var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                        //读取本地文件
                        obj.preview(function(index, file, result) {
                            var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

                            //单个重传
                            tr.find('.demo-reload').on('click', function() {
                                obj.upload(index, file);
                            });

                            //删除
                            tr.find('.demo-delete').on('click', function() {
                                delete files[index]; //删除对应的文件
                                $(this).parent().parent().remove();
                                uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                            });

                            bclistView_edit.append(tr);
                        });
                    },
                    field:'files',
                    data: {
                        fileTags: 'file',//文件类型（image,file,video）
                        siteName: '用户中心',//站点名
                        username:currentUsername, //上传人
                        directoryId: directoryId,//目录id
                        shareState: "私有"
                    },
                    before: function (obj) {//上传之前获取文件信息
                        obj.preview(function(index, file, result){
                            fileSize = file.size;
                            fileName = file.name;
                        });
                    },
                    done: function (fileId,index, upload) {//上传完成后保存文件信息
                        backDocument.push(fileId.fileIds);
                        var fileIds=fileId.fileIds;
                        if($("#backCoverFileIds.back_fileId").val().length){
                            var fileIdInput= $("#backCoverFileIds.back_fileId").val().split(',');
                        }
                        else {
                            var fileIdInput=[];
                        }
                        for(var i=0;i<fileIds.length;i++){
                            fileIdInput.push(fileIds[i]);

                        };
                        $("#backCoverFileIds.back_fileId").val(fileIdInput);
                        for(var i=0;i<index.length;i++){
                            delete $(this)[0].files[index[i]];
                            var tr =  bclistView_edit.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                                tds.eq(3).html('<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="backCoverFileIds.back_fileId" id='+fileIds[i]+'>删除</button>');
                                /*return delete $(this).files[index]; //删除文件队列已经上传成功的文件*/
                                $(this).error(index, upload);
                            })
                        }

                    },
                    error: function(index, upload){
                        for(var i=0;i<index.length;i++){
                            var tr =  bclistView_edit.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                                tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                            })
                        }

                    }
                });

            },
            fail: function (reason) {
                alert("获取目录id失败:" + reason);
            }, needToken: true
        });
        $(document).on("click", '/**/.delete-btn',function () {
            toBeDeleteFile=[];
            var delid = $(this).attr('id');
            var inputFileId = $(this).attr("data");
            var theCurrentTr = $(this).parent().parent();
            theCurrentTr.remove();
            var str = $("#"+inputFileId).val();
            var currentInputfile=str.split(',');
            currentInputfile.splice(jQuery.inArray(delid,currentInputfile),1)
            $("#"+inputFileId).val(currentInputfile);
            if (delid) {
                // 找到当前行,删除
                // 找到当前行,删除
                toBeDeleteFile.push(delid)
            }
        });

        //监听纵向课题编辑
        table.on('tool(longitudinalSubjectInfo)', function(obj){
            var data = obj.data;
            var fileId=data.fileIds;
            var fileAlId=fileId.substring(fileId.indexOf("[") + 1,fileId.indexOf("]"));
            var arrFileId = fileAlId.split(',');
            if(obj.event == 'detail'){
                layer.msg('ID：'+ data.id + ' 的查看操作');
            }
            else if(obj.event == 'del'){
                layer.confirm('真的删除行么', function(index){
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/deleteUserLongitudinalSubjectInfo',
                        data: data,
                        dataType: 'json',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("删除成功!")
                                table.reload('postInfo');
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
            else if(obj.event == 'edit'){
                /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
                var edit_div='#longitudinalSubjectInfo_uid';
                editStandard(data,edit_div);
                $("#fileIds.lsProject_fileId").val(arrFileId);
                lsPdListView_edit.empty();
                var lsStartStopTime=$("#startTime",$("#longitudinalSubjectInfoTime")).val()+' - '+$("#endTime",$("#longitudinalSubjectInfoTime")).val();
                $("#lsStartStopTime").val(lsStartStopTime);
                form.render();
                if(arrFileId.length>0){
                    resourceContainer.getFilesByIds({
                        success:function(fileVo) {
                            $.each(fileVo, function (index, item) {
                                var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + item.fileName + '</td>', '<td>' + item.size + '</td>', '<td>上传成功</td>','<td>','<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="fileIds.lsProject_fileId"" id="'+item.id+'">删除</button>', '</td>', '</tr>'].join('')),
                                    tds = tr.children();
                                lsPdListView_edit.append(tr);
                            });
                        },
                        fail:function(res) {
                            alert("接口请求错误"+res);
                        },
                        fileIds:arrFileId,
                        needToken:true
                    });
                }
                layer.open({
                    type: 1
                    ,title:'编辑'
                    ,area: ['60%', '50%']
                    ,id: 'layerDemo1' //防止重复弹出
                    ,content: $('#edit_longitudinalSubjectInfo')
                    ,btnAlign: 'c' //按钮居中
                    ,shade: 0 //不显示遮罩
                    ,yes: function(){
                        layer.closeAll();
                    }
                });
            }
            else  if(obj.event=='showFile'){
                if(fileId!=null){
                    $("#demoList td").remove();
                    resourceContainer.getFilesByIds({
                        success:function(fileVo) {
                            $.each(fileVo, function (index, item) {
                                var fileHtml='<tr><td>'+item.fileName+'</td><td>'+item.size+'</td><td>'+item.upDatetime+'</td><td><a href="'+item.url+'" target="_blank"><i class="fa fa-download" aria-hidden="true"></i></a> </td>'
                                $("#demoList").append(fileHtml);
                            })
                            layer.open({
                                type: 1
                                ,title:'立项文件'
                                ,area: ['60%', '50%']
                                ,id: 'longitudinalSubject_showFile'+data.id //防止重复弹出
                                ,content:$("#fileList")
                                ,btnAlign: 'c' //按钮居中
                                ,shade: 0 //不显示遮罩
                                ,yes: function(){
                                    layer.closeAll();
                                }
                            })
                        },
                        fail:function(res) {
                            alert("接口请求错误"+res);
                        },
                        fileIds:arrFileId,
                        needToken:true
                    });
                }
            }
        });
        //监听横向课题编辑
        table.on('tool(horizontalSubjectInfo)', function(obj){
            var data = obj.data;
            var fileId=data.fileIds;
            var fileAlId=fileId.substring(fileId.indexOf("[") + 1,fileId.indexOf("]"));
            var arrFileId = fileAlId.split(',');
            if(obj.event == 'detail'){
                layer.msg('ID：'+ data.id + ' 的查看操作');
            }
            else if(obj.event == 'del'){
                layer.confirm('真的删除行么', function(index){
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/deleteUserHorizontalSubjectInfo',
                        data: data,
                        dataType: 'json',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("删除成功!")
                                table.reload('postInfo');
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
            else if(obj.event == 'edit'){
                hspdlistView_edit.empty();
                /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
                var edit_div='#edit_horizontalSubjectInfo';
                editStandard(data,edit_div);
                for (var i = 0; i < Object.entries(data).length; i++) {
                    var id = "#"+Object.entries(data)[i][0];
                    var text = Object.entries(data)[i][1];
                    $(id,$(edit_div)).val(text);
                }
                $("#fileIds.hsProject_fileId").val(arrFileId);
                var hsStartStopTime=$("#startTime",$("#horizontalSubjectInfoTime")).val()+' - '+$("#endTime",$("#horizontalSubjectInfoTime")).val();
                $("#hsStartStopTime").val(hsStartStopTime);
                form.render();
                if(arrFileId.length>0){
                    resourceContainer.getFilesByIds({
                        success:function(fileVo) {
                            $.each(fileVo, function (index, item) {
                                var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + item.fileName + '</td>', '<td>' + item.size + '</td>', '<td>上传成功</td>','<td>','<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="fileIds.hsProject_fileId" id="'+item.id+'">删除</button>', '</td>', '</tr>'].join('')),
                                    tds = tr.children();
                                hspdlistView_edit.append(tr);
                            });
                        },
                        fail:function(res) {
                            alert("接口请求错误"+res);
                        },
                        fileIds:arrFileId,
                        needToken:true
                    });
                }
                layer.open({
                    type: 1
                    ,title:'编辑'
                    ,area: ['60%', '50%']
                    ,id: 'layerDemo2' //防止重复弹出
                    ,content: $('#edit_horizontalSubjectInfo')
                    ,btnAlign: 'c' //按钮居中
                    ,shade: 0 //不显示遮罩
                    ,yes: function(){
                        layer.closeAll();
                    }
                });
            }
            else  if(obj.event=='showFile'){
                if(fileId!=null){
                    $("#demoList td").remove();
                    resourceContainer.getFilesByIds({
                        success:function(fileVo) {
                            $.each(fileVo, function (index, item) {
                                var fileHtml='<tr><td>'+item.fileName+'</td><td>'+item.size+'</td><td>'+item.upDatetime+'</td><td><a href="'+item.url+'" target="_blank"><i class="fa fa-download" aria-hidden="true"></i></a> </td>'
                                $("#demoList").append(fileHtml);
                            })
                            layer.open({
                                type: 1
                                ,title:'立项文件'
                                ,area: ['60%', '50%']
                                ,id: 'horizontalSubject_showFile'+data.id //防止重复弹出
                                ,content:$("#fileList")
                                ,btnAlign: 'c' //按钮居中
                                ,shade: 0 //不显示遮罩
                                ,yes: function(){
                                    layer.closeAll();
                                }
                            })
                        },
                        fail:function(res) {
                            alert("接口请求错误"+res);
                        },
                        fileIds:arrFileId,
                        needToken:true
                    });
                }
            }
        });
        //监听科研获奖情况编辑
        table.on('tool(researchAwardInfo)', function(obj){
            var data = obj.data;
            var fileId=data.fileIds;
            var fileAlId=fileId.substring(fileId.indexOf("[") + 1,fileId.indexOf("]"));
            var arrFileId = fileAlId.split(',');
            if(obj.event == 'detail'){
                layer.msg('ID：'+ data.id + ' 的查看操作');
            }
            else if(obj.event == 'del'){
                layer.confirm('真的删除行么', function(index){
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/deleteUserResearchAwardInfo',
                        data: data,
                        dataType: 'text',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("删除成功!")
                                table.reload('postInfo');
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
            else if(obj.event == 'edit'){
                /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
                var edit_div='#researchAwardInfo_uid';
                raaclistView_edit.empty();
                editStandard(data,edit_div);
                $("#fileIds.ra_fileId").val(arrFileId);
                form.render();
                if(arrFileId.length>0){
                    resourceContainer.getFilesByIds({
                        success:function(fileVo) {
                            $.each(fileVo, function (index, item) {
                                var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + item.fileName + '</td>', '<td>' + item.size + '</td>', '<td>上传成功</td>','<td>','<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="fileIds.ra_fileId" id="'+item.id+'">删除</button>', '</td>', '</tr>'].join('')),
                                    tds = tr.children();
                                raaclistView_edit.append(tr);
                            });
                        },
                        fail:function(res) {
                            alert("接口请求错误"+res);
                        },
                        fileIds:arrFileId,
                        needToken:true
                    });
                }
                layer.open({
                    type: 1
                    ,title:'编辑'
                    ,area: ['60%', '50%']
                    ,id: 'layerDemo3' //防止重复弹出
                    ,content: $('#edit_researchAwardInfo')
                    ,btnAlign: 'c' //按钮居中
                    ,shade: 0 //不显示遮罩
                    ,yes: function(){
                        layer.closeAll();
                    }
                });
            }
            else  if(obj.event=='showFile'){
                if(fileId!=null){
                    $("#demoList td").remove();
                    resourceContainer.getFilesByIds({
                        success:function(fileVo) {
                            $.each(fileVo, function (index, item) {
                                var fileHtml='<tr><td>'+item.fileName+'</td><td>'+item.size+'</td><td>'+item.upDatetime+'</td><td><a href="'+item.url+'" target="_blank"><i class="fa fa-download" aria-hidden="true"></i></a> </td>'
                                $("#demoList").append(fileHtml);
                            })
                            layer.open({
                                type: 1
                                ,title:'立项文件'
                                ,area: ['60%', '50%']
                                ,id: 'researchAward_showFile'+data.id //防止重复弹出
                                ,content:$("#fileList")
                                ,btnAlign: 'c' //按钮居中
                                ,shade: 0 //不显示遮罩
                                ,yes: function(){
                                    layer.closeAll();
                                }
                            })
                        },
                        fail:function(res) {
                            alert("接口请求错误"+res);
                        },
                        fileIds:arrFileId,
                        needToken:true
                    });
                }
            }
        });
        //监听出版专著，著作情况编辑
        table.on('tool(publicationInfo)', function(obj){
            var data = obj.data;
            if(obj.event == 'detail'){
                layer.msg('ID：'+ data.id + ' 的查看操作');
            }
            else if(obj.event == 'del'){
                layer.confirm('真的删除行么', function(index){
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/deleteUserPublicationInfo',
                        data: data,
                        dataType: 'json',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("删除成功!")
                                table.reload('postInfo');
                            }
                            else{
                                console.log(res.msg);
                                parent.layer.alert("删除失败！")
                            }
                        }
                    });
                    layer.close(index);
                });
            }
            else if(obj.event == 'edit'){
                /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
                var edit_div='#publicationInfo_uid';
                editStandard(data,edit_div);
                form.render();
                coverlistView_edit.empty();
                tplistView_edit.empty();
                bclistView_edit.empty();
                var coverFileId=data.coverFileIds;
                var coverFileAlId=coverFileId.substring(coverFileId.indexOf("[") + 1,coverFileId.indexOf("]"));
                var coverArrFileId = coverFileAlId.split(',');
                $("#coverFileIds.cover_fileId").val(coverArrFileId);
                if(coverArrFileId.length>0){
                    resourceContainer.getFilesByIds({
                        success:function(fileVo) {
                            $.each(fileVo, function (index, item) {
                                var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + item.fileName + '</td>', '<td>' + item.size + '</td>', '<td>上传成功</td>','<td>','<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="coverFileIds.cover_fileId" id="'+item.id+'">删除</button>', '</td>', '</tr>'].join('')),
                                    tds = tr.children();
                                coverlistView_edit.append(tr);
                            });
                        },
                        fail:function(res) {
                            alert("接口请求错误"+res);
                        },
                        fileIds:coverArrFileId,
                        needToken:true
                    });
                }

                var titleFileId=data.titlePageFileIds;
                var titleFileAlId=titleFileId.substring(titleFileId.indexOf("[") + 1,titleFileId.indexOf("]"));
                var titleArrFileId = titleFileAlId.split(',');
                $("#titlePageFileIds.title_fileId").val(titleArrFileId);
                if(titleArrFileId.length>0){
                    resourceContainer.getFilesByIds({
                        success:function(fileVo) {
                            $.each(fileVo, function (index, item) {
                                var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + item.fileName + '</td>', '<td>' + item.size + '</td>', '<td>上传成功</td>','<td>','<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="titlePageFileIds.title_fileId" id="'+item.id+'">删除</button>', '</td>', '</tr>'].join('')),
                                    tds = tr.children();
                                tplistView_edit.append(tr);
                            });
                        },
                        fail:function(res) {
                            alert("接口请求错误"+res);
                        },
                        fileIds:titleArrFileId,
                        needToken:true
                    });
                }


                var backFileId=data.backCoverFileIds;
                var backFileAlId=titleFileId.substring(backFileId.indexOf("[") + 1,backFileId.indexOf("]"));
                var backArrFileId = backFileAlId.split(',');
                $("#backCoverFileIds.back_fileId").val(backArrFileId);
                if(backArrFileId.length>0){
                    resourceContainer.getFilesByIds({
                        success:function(fileVo) {
                            $.each(fileVo, function (index, item) {
                                var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + item.fileName + '</td>', '<td>' + item.size + '</td>', '<td>上传成功</td>','<td>','<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="backCoverFileIds.back_fileId" id="'+item.id+'">删除</button>', '</td>', '</tr>'].join('')),
                                    tds = tr.children();
                                bclistView_edit.append(tr);
                            });
                        },
                        fail:function(res) {
                            alert("接口请求错误"+res);
                        },
                        fileIds:backArrFileId,
                        needToken:true
                    });
                }
                layer.open({
                    type: 1
                    ,title:'编辑'
                    ,area: ['60%', '50%']
                    ,id: 'layerDemo3' //防止重复弹出
                    ,content: $('#edit_publicationInfo')
                    ,btnAlign: 'c' //按钮居中
                    ,shade: 0 //不显示遮罩
                    ,yes: function(){
                        layer.closeAll();
                    }
                });
            }
            else  if(obj.event=='backShowFile'){
                var fileId=data.backCoverFileIds;
                if(fileId!=null){
                    var fileAlId=fileId.substring(fileId.indexOf("[") + 1,fileId.indexOf("]"));
                    var arrFileId = fileAlId.split(',');
                    $("#demoList td").remove();
                    resourceContainer.getFilesByIds({
                        success:function(fileVo) {
                            $.each(fileVo, function (index, item) {
                                var fileHtml='<tr><td>'+item.fileName+'</td><td>'+item.size+'</td><td>'+item.upDatetime+'</td><td><a href="'+item.url+'" target="_blank"><i class="fa fa-download" aria-hidden="true"></i></a> </td>'
                                $("#demoList").append(fileHtml);
                            })
                            layer.open({
                                type: 1
                                ,title:'立项文件'
                                ,area: ['60%', '50%']
                                ,id: 'backShowFile'+data.id //防止重复弹出
                                ,content:$("#fileList")
                                ,btnAlign: 'c' //按钮居中
                                ,shade: 0 //不显示遮罩
                                ,yes: function(){
                                    layer.closeAll();
                                }
                            })
                        },
                        fail:function(res) {
                            alert("接口请求错误"+res);
                        },
                        fileIds:arrFileId,
                        needToken:true
                    });
                }
            }
            else  if(obj.event=='coverShowFile'){
                var fileId=data.coverFileIds;
                if(fileId!=null){
                    var fileAlId=fileId.substring(fileId.indexOf("[") + 1,fileId.indexOf("]"));
                    var arrFileId = fileAlId.split(',');
                    $("#demoList td").remove();
                    resourceContainer.getFilesByIds({
                        success:function(fileVo) {
                            $.each(fileVo, function (index, item) {
                                var fileHtml='<tr><td>'+item.fileName+'</td><td>'+item.size+'</td><td>'+item.upDatetime+'</td><td><a href="'+item.url+'" target="_blank"><i class="fa fa-download" aria-hidden="true"></i></a> </td>'
                                $("#demoList").append(fileHtml);
                            })
                            layer.open({
                                type: 1
                                ,title:'立项文件'
                                ,area: ['60%', '50%']
                                ,id: 'covershowFile'+data.id //防止重复弹出
                                ,content:$("#fileList")
                                ,btnAlign: 'c' //按钮居中
                                ,shade: 0 //不显示遮罩
                                ,yes: function(){
                                    layer.closeAll();
                                }
                            })
                        },
                        fail:function(res) {
                            alert("接口请求错误"+res);
                        },
                        fileIds:arrFileId,
                        needToken:true
                    });
                }
            }
            else  if(obj.event=='titleShowFile'){
                var fileId=data.titlePageFileIds;
                if(fileId!=null){
                    var fileAlId=fileId.substring(fileId.indexOf("[") + 1,fileId.indexOf("]"));
                    var arrFileId = fileAlId.split(',');
                    $("#demoList td").remove();
                    resourceContainer.getFilesByIds({
                        success:function(fileVo) {
                            $.each(fileVo, function (index, item) {
                                var fileHtml='<tr><td>'+item.fileName+'</td><td>'+item.size+'</td><td>'+item.upDatetime+'</td><td><a href="'+item.url+'" target="_blank"><i class="fa fa-download" aria-hidden="true"></i></a> </td>'
                                $("#demoList").append(fileHtml);
                            })
                            layer.open({
                                type: 1
                                ,title:'立项文件'
                                ,area: ['60%', '50%']
                                ,id: 'showFiletitle'+data.id //防止重复弹出
                                ,content:$("#fileList")
                                ,btnAlign: 'c' //按钮居中
                                ,shade: 0 //不显示遮罩
                                ,yes: function(){
                                    layer.closeAll();
                                }
                            })
                        },
                        fail:function(res) {
                            alert("接口请求错误"+res);
                        },
                        fileIds:arrFileId,
                        needToken:true
                    });
                }
            }
        });
        active = {
            reload_horizontal: function () {
                var projectNameReload=$('#projectNameInput');
                var projectSourceReload=$('#projectSourceInput');
                var categoryReload=$('#categoryInput');

                //执行重载
                table.reload('horizontalSubjectInfo', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        projectName: projectNameReload.val(),
                        projectSource:projectSourceReload.val(),
                        category:categoryReload.val()
                    }
                });
            },
            reload_longitudinal: function () {
                var projectNameReload=$('#projectNameInput');
                var degreeReload=$('#degreeInput');
                var categoryReload=$('#categoryInput');

                //执行重载
                table.reload('longitudinalSubjectInfo', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        projectName: projectNameReload.val(),
                        degree:degreeReload.val(),
                        category:categoryReload.val()
                    }
                });
            },
            reload_publication: function () {
                var publicationNameReload=$('#publicationNameInput');
                var pressReload=$('#pressInput');
                var publishTimeReload=$('#publishTimeInput');

                //执行重载
                table.reload('publicationInfo', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        publicationName: publicationNameReload.val(),
                        press:pressReload.val(),
                        publishTime:publishTimeReload.val()
                    }
                });
            },
            reload_researchAward: function () {
                var productNameReload=$('#productNameInput');
                var awardNameReload=$('#awardNameInput');
                var timeReload=$('#timeInput');

                //执行重载
                table.reload('researchAwardInfo', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        productName: productNameReload.val(),
                        awardName: awardNameReload.val(),
                        time:timeReload.val()
                    }
                });
            },

        };
        /*
    * 下拉框数据读取显示
    * */

        //科研类别
        $.ajax({
            url:userCenterHost + '/dropDownBoxController/getResearchCategory',
            type:'GET',
            success:function (res) {
                if(!res.code){
                    var data=res.data;
                    for(var i=0;i<data.length;i++){
                        var option= '<option value="'+data[i].researchCategory+'">'+data[i].researchCategory+'</option>';
                        $(".category").append(option);
                        form.render();
                    }

                }
                else{
                    alert(res.msg);
                }

            }

        })
        //等级
        $.ajax({
            url:userCenterHost+'/dropDownBoxController/getRank',
            type:'GET',
            success:function (res) {
                if(!res.code){
                    var data=res.data;
                    for(var i=0;i<data.length;i++){
                        var option= '<option value="'+data[i].rank+'">'+data[i].rank+'</option>';
                        $(".degree").append(option);
                        form.render();
                    }
                }
                else{
                    alert(res.msg);
                }

            }

        })
        //本人角色
        $.ajax({
            url:userCenterHost+'/dropDownBoxController/getCharacter',
            type:'GET',
            data:{fromMasterWork:'false'},
            success:function (res) {
                if(!res.code){
                    var data=res.data;
                    for(var i=0;i<data.length;i++){
                        var option= '<option value="'+data[i].character+'">'+data[i].character+'</option>';
                        $(".characters").append(option);
                        form.render();
                    }
                }
                else{
                    alert(res.msg);
                }


            }

        });

        $('.horizontalsubjectInput .layui-btn').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
        $('.longitudinalsubjectInput .layui-btn').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
        $('.publicationInput .layui-btn').on('click',function(){
            var type=$(this).data('type');
            active[type] ? active[type].call(this) : '';
        })
        $('.researchAwardInput .layui-btn').on('click',function(){
            var type=$(this).data('type');
            active[type] ? active[type].call(this) : '';
        })

    });
    e("scientificDetailTab",{})
});


$(".header_edit").click(
    function () {
        $(".header_edit").hide();
        $(this).parents().find(".fill_box").slideDown();
    }
);

$(".edit_hide").click(
    function () {
        $(".header_edit").show();
        $(this).parents().parents().parents().parents(".fill_box").hide();
    }
);
var user=$("input[name='username']") ;
user.each(function(){
    $(this).val(currentUsername);
});


