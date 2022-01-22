var show_personConfig_uid=GetQueryString("showConfigUid");
var beOperatedUsername=GetQueryString('changeRole');
var currentRole=JSON.parse(localStorage['role']).roleList[0].id;
var userId = JSON.parse(localStorage['role']).id;
var tableField=[{title:'序号', width:100,  type:"numbers"}] ;
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
                    tableField.push({field: show_config_data[i].config.field, title:show_config_data[i].config.name, align:'center',width:'120'});
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
        if(show_personConfig_uid==34||show_personConfig_uid==35){
            tableField.push({field: 'showFile', title: '项目文件',align: 'center', toolbar: '#showFile',width:100});
        }
            tableField.push({fixed: 'right', title: '操作',align: 'center', toolbar: '#edit1',width:200});
    }
});
layui.define(function(e) {
    layui.use(['index', 'form', 'laydate', 'upload','table','layer'], function() {
        var $ = layui.$,
            admin = layui.admin,
            element = layui.element,
            layer = layui.layer,
            laydate = layui.laydate,
            form = layui.form,
            upload = layui.upload,
            table=layui.table;
        //定义一个待删除的变量，存放待删除的文件id，点击提交时再删除资源容器对应的id
        var toBeDeleteFile=[];
        //教学项目表格渲染
        table.render({
            elem: '#eduProjectInfo'
            ,url: userCenterHost+'/getUserEducationProjectInfo'
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
        //教学获奖表格渲染
        table.render({
            elem: '#eduAwardInfo'
            ,url: userCenterHost+'/getUserEducationAwardInfo'
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
        //教材出版表格渲染
        table.render({
            elem: '#textbookPublishInfo'
            ,url: userCenterHost+'/getUserBookPublishInfo'
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

        //立项起止时间
        laydate.render({
            elem: '#projectStartStopTime_add',
            type: 'month',
            range: true
        });
        laydate.render({
            elem: '#projectStartStopTime',
            type: 'month',
            range: true
        });
        laydate.render({
            elem: '#projectStartStopTimeInput',
            type: 'month',
            range: true
        });

        //授奖时间
        laydate.render({
            elem: '#awardTime_add',
            type: 'year'
        });
        laydate.render({
            elem: '#awardTime',
            type: 'year'
        });
        laydate.render({
            elem: '#awardTimeInput',
            type: 'year'
        });

        //出版时间
        laydate.render({
            elem: '#publishTime_add'
        });
        laydate.render({
            elem: '#publishTime'
        });
        laydate.render({
            elem: '#publishTimeInput'
        });

        /* 监听提交 */
        form.on('submit(eduProjectInfo)', function(data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                ,btn: ['确定','取消'] //按钮
                ,yes:function(){
                    $(".clearForm").trigger("click");
                    $("#eduProjectInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    $("#eduProjectInfoAdd").hide();
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
                        url: userCenterHost + '/saveUserEducationProjectInfo',
                        data:field,
                        dataType: 'json',
                        method: 'POST'
                        ,success: function(res){
                            if(!res.code){
                                parent.layer.alert("提交成功！")
                                table.reload('eduProjectInfo');
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
        form.on('submit(eduAwardInfo)', function(data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                ,btn: ['确定','取消'] //按钮
                ,yes:function(){
                    $(".clearForm").trigger("click");
                    $("#eduAwardInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    $("#eduAwardInfoAdd").hide();
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
                        url: userCenterHost + '/saveUserEducationAwardInfo',
                        data:field,
                        dataType: 'json',
                        method: 'POST'
                        ,success: function(res){
                            if(!res.data){
                                parent.layer.alert("提交成功！");
                                table.reload('eduAwardInfo');
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
        form.on('submit(textbookPublishInfo)', function(data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                ,btn: ['确定','取消'] //按钮
                ,yes:function(){
                    $(".clearForm").trigger("click");
                    $("#textbookPublishInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    $("#textbookPublishInfoAdd").hide();
                    layer.closeAll();
                    var field=data.field;
                    field['username']=beShowUsername;
                    admin.req({
                        url: userCenterHost + '/saveUserBookPublishInfo',
                        data:field,
                        dataType: 'json',
                        method: 'POST'
                        ,success: function(res){
                            if(!res.code){
                                parent.layer.alert("提交成功！");
                                table.reload('textbookPublishInfo');
                                $(".header_edit").show();
                            }
                            else{
                                console.log(res.msg);
                                parent.layer.alert("提交失败");
                            }
                        }
                    })
                }
            })
            return false;
        });


        //上传文件，选完文件后不自动上传,点击开始上传按钮上传
        //layui框架的upload.js的上传方法已根据公司资源容器进行修改，升级框架请注意
        var lsPdListView = $('#lsPdList');

        //教学项目证书(新增)
        var paclistView =$('.projectAwardCertificate').next().find('.pacList');
        var projectDocument=[];
        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/教学相关/教学项目',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '.projectAwardCertificate',
                    url: resourceContainerHostForUpload +  '/gvsunResource/uploadFile', //上传接口
                    accept: 'file', //普通文件
                    multiple: true, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '.pacbtn',
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

                            paclistView.append(tr);
                        });
                    },

                    done: function (fileId,index, upload) {//上传完成后保存文件信息
                        var fileIds=fileId.fileIds;
                        $("#projectAddFileIds").val(fileIds);
                        for(var i=0;i<index.length;i++){
                            delete $(this)[0].files[index[i]];
                            var tr =paclistView.find('tr#upload-'+ index[i]);
                            tr.each(function() {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                                tds.eq(3).html('<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="projectAddFileIds" id='+fileIds[i]+'>删除</button>');
                                /* return delete $(this).files[index]; //删除文件队列已经上传成功的文件*/
                                $(this).error(index, upload);
                            })
                        }

                    },
                    error: function(index, upload){
                        for(var i=0;i<index.length;i++){
                            var tr = paclistView.find('tr#upload-'+ index[i]);
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
        // /编辑
        var paclistView_edit =$('.projectAwardCertificate_edit').next().find('.pacList');
        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/教学相关/教学项目',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '.projectAwardCertificate_edit',
                    url: resourceContainerHostForUpload +  '/gvsunResource/uploadFile', //上传接口
                    accept: 'file', //普通文件
                    multiple: true, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '.pacbtn_edit',
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

                            paclistView_edit.append(tr);
                        });
                    },
                    done: function (fileId,index, upload) {//上传完成后保存文件信息
                        projectDocument.push(fileId.fileIds);
                        if($("#fileIds.project_fileId").val().length){
                            var fileIdInput= $("#fileIds.project_fileId").val().split(',');
                        }
                        else{
                            var fileIdInput=[];
                        }
                        var fileIds=fileId.fileIds;
                        for(var i=0;i<fileIds.length;i++){
                            fileIdInput.push(fileIds);
                        };
                        $("#fileIds.project_fileId").val(fileIdInput);
                        for(var i=0;i<index.length;i++){
                            delete $(this)[0].files[index[i]];
                            var tr =paclistView_edit.find('tr#upload-'+ index[i]);
                            tr.each(function() {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                                tds.eq(3).html('<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="fileIds.project_fileId" id='+fileIds[i]+'>删除</button>');
                                /* return delete $(this).files[index]; //删除文件队列已经上传成功的文件*/
                                $(this).error(index, upload);
                            })
                        }

                    },
                    error: function(index, upload){
                        for(var i=0;i<index.length;i++){
                            var tr = paclistView_edit.find('tr#upload-'+ index[i]);
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


        //教学获奖获奖证书
        var waclistView =$('.winAwardCertificate').next().find('.wacList');
        var winDocument=[];
        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/教学相关/教学获奖',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '.winAwardCertificate',
                    url: ''/*resourceContainerHostForUpload +  '/gvsunResource/uploadFile'*/, //上传接口
                    accept: 'file', //普通文件
                    multiple: true, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '.wacbtn',
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

                            waclistView.append(tr);
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
                        $(".winAddfileId").val(fileIds);
                        for (var i=0;i<index.length;i++){
                            delete $(this)[0].files[index[i]];
                            var tr =waclistView.find('tr#upload-'+ index[i]);
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                                tds.eq(3).html('<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="winAddfileId" id='+fileIds[i]+'>删除</button>');
                                $(this).error(index, upload);
                            })
                        }

                    },
                    error: function(index, upload){
                        for(var i=0;i<index.length;i++){
                            var tr = waclistView.find('tr#upload-'+ index[i]);
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
        var waclistView_edit =$('.winAwardCertificate_edit').next().find('.wacList');
        // 编辑
        resourceContainer.getDirectoryIdByPath({
            path: '用户中心/教学相关/教学获奖',
            success: function (directoryId) {
                uploadListIns = upload.render({
                    elem: '.winAwardCertificate_edit',
                    url: resourceContainerHostForUpload +  '/gvsunResource/uploadFile', //上传接口
                    accept: 'file', //普通文件
                    multiple: true, //多个上传
                    auto: false, //是否直接选择文件后上传
                    bindAction: '.wacbtn_edit',
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

                            waclistView_edit.append(tr);
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
                        winDocument.push(fileId.fileIds);
                        var fileIds=fileId.fileIds;
                        if($("#fileIds.win_fileId").val().length){
                            fileIdInput= $("#fileIds.win_fileId").val().split(',');
                        }
                        else {
                            var fileIdInput=[];
                        }
                        for(var i=0;i<fileIds.length;i++){
                            fileIdInput.push(fileIds[i]);

                        };
                        $("#fileIds.win_fileId").val(fileIdInput);
                        for(var i=0;i<index.length;i++){
                            delete $(this)[0].files[index[i]];
                            var tr =waclistView_edit.find('tr#upload-'+ index[i])
                            tr.each(function () {
                                tds = $(this).children();
                                tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                                tds.eq(3).html('<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="fileIds.win_fileId" id='+fileIds[i]+'>删除</button>');
                                // return delete $(this).files[index]; //删除文件队列已经上传成功的文件
                                $(this).error(index, upload);
                            })
                        }

                    },
                    error: function(index, upload){
                        for(var i=0;i<index.length;i++){
                            var tr = waclistView_edit.find('tr#upload-'+ index);
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

        $(document).on("click", '.delete-btn',function () {
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


        //监听教学项目编辑
        table.on('tool(eduProjectInfo)', function(obj){
            var data = obj.data;
            var fileId=data.fileIds;
            var fileAlId=fileId.substring(fileId.indexOf("[") + 1,fileId.indexOf("]"));
            var arrFileId = fileAlId.split(',');

            if(obj.event === 'detail'){
                layer.msg('ID：'+ data.id + ' 的查看操作');
            }
            else if(obj.event === 'del'){
                layer.confirm('真的删除行么', function(index){
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/deleteUserEducationProjectInfo',
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
            else if(obj.event === 'edit'){
                /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
                var edit_div='#eduProjectInfo_uid';
                paclistView_edit.empty();
                editStandard(data,edit_div);
                $("#fileIds.project_fileId").val(arrFileId);
                var projectStartStopTime=$("#projectStartTime").val()+' - '+$("#projectEndTime").val();
                $("#projectStartStopTime").val(projectStartStopTime);
                form.render();
                if(arrFileId.length>0){
                    resourceContainer.getFilesByIds({
                        success:function(fileVo) {
                            $.each(fileVo, function (index, item) {
                                var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + item.fileName + '</td>', '<td>' + item.size + '</td>', '<td>上传成功</td>','<td>','<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="fileIds.project_fileId" id="'+item.id+'">删除</button>', '</td>', '</tr>'].join('')),
                                    tds = tr.children();
                                paclistView_edit.append(tr);
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
                    ,area: ['80%', '50%']
                    ,id: 'layerDemo1'//防止重复弹出
                    ,content: $('#edit_eduProjectInfo')
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
                                ,id: 'eduProject_showFile'+data.id //防止重复弹出
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
        //监听教学获奖编辑
        table.on('tool(eduAwardInfo)', function(obj){
            var data = obj.data;
            var fileId=data.fileIds;
            var fileAlId=fileId.substring(fileId.indexOf("[") + 1,fileId.indexOf("]"));
            var arrFileId = fileAlId.split(',');
            if(obj.event === 'detail'){
                layer.msg('ID：'+ data.id + ' 的查看操作');
            }
            else if(obj.event === 'del'){
                layer.confirm('真的删除行么', function(index){
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/deleteUserEducationAwardInfo',
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
            else if(obj.event === 'edit'){
                /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
                var edit_div='#eduAwardInfo_uid';
                editStandard(data,edit_div);
                $("#fileIds.win_fileId").val(arrFileId)
                waclistView_edit.empty();
                form.render();
                resourceContainer.getFilesByIds({
                    success:function(fileVo) {
                        $.each(fileVo, function (index, item) {
                            var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + item.fileName + '</td>', '<td>' + item.size + '</td>', '<td>上传成功</td>','<td>','<button type="button" class="layui-btn layui-btn-xs layui-btn-danger delete-btn" data="fileIds.win_fileId" id="'+item.id+'">删除</button>', '</td>', '</tr>'].join('')),
                                tds = tr.children();
                            waclistView_edit.append(tr);
                        });
                    },
                    fail:function(res) {
                        alert("接口请求错误"+res);
                    },
                    fileIds:arrFileId,
                    needToken:true
                });
                layer.open({
                    type: 1
                    ,title:'编辑'
                    ,area: ['60%', '50%']
                    ,id: 'layerDemo2' //防止重复弹出
                    ,content: $('#edit_eduAwardInfo')
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
                            });
                            layer.open({
                                type: 1
                                ,title:'获奖证书'
                                ,area: ['60%', '50%']
                                ,id: 'eduAward_showFile'+data.id //防止重复弹出
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
        //监听教材出版信息编辑
        table.on('tool(textbookPublishInfo)', function(obj){
            var data = obj.data;
            if(obj.event === 'detail'){
                layer.msg('ID：'+ data.id + ' 的查看操作');
            }
            else if(obj.event === 'del'){
                layer.confirm('真的删除行么', function(index){
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/deleteUserBookPublishInfo',
                        data: data,
                        dataType: 'json',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("删除成功!");
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
            else if(obj.event === 'edit'){
                /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
                var edit_div='#textbookPublishInfo_uid';
                editStandard(data,edit_div);
                form.render();
                layer.open({
                    type: 1
                    ,title:'编辑'
                    ,area: ['60%', '50%']
                    ,id: 'layerDemo3' //防止重复弹出
                    ,content: $('#edit_textbookPublishInfo')
                    ,btnAlign: 'c' //按钮居中
                    ,shade: 0 //不显示遮罩
                    ,yes: function(){
                        layer.closeAll();
                    }
                });

            }
        });
        active = {
            reload_eduAward: function () {
                var awardNameReload=$('#awardNameInput');
                var awardDegreeReload=$('#awardDegreeInput');
                var awardTimeReload=$('#awardTimeInput');

                //执行重载
                table.reload('eduAwardInfo', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        awardName: awardNameReload.val(),
                        awardDegree:awardDegreeReload.val(),
                        awardTime:awardTimeReload.val()
                    }
                });
            },
            reload_eduProject: function () {
                var projectNameReload=$('#projectNameInput');
                var projectSourceReload=$('#projectSourceInput');
                var projectStartStopTimeReload=$('#projectStartStopTimeInput');

                //执行重载
                table.reload('eduProjectInfo', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        projectName: projectNameReload.val(),
                        projectSource:projectSourceReload.val(),
                        projectStartStopTime:projectStartStopTimeReload.val()
                    }
                });
            },
            reload_textBook: function () {
                var bookNameReload=$('#bookNameInput');
                var pressReload=$('#pressInput');
                var publishTimeReload=$('#publishTimeInput');
                var bookNatureReload=$('#bookNatureInput');

                //执行重载
                table.reload('textbookPublishInfo', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        bookName: bookNameReload.val(),
                        press:pressReload.val(),
                        publishTime:publishTimeReload.val(),
                        bookNature:bookNatureReload.val()
                    }
                });
            },

        };
        /*
  * 下拉框数据读取显示
  * */

        //项目来源
        $.ajax({
            url:userCenterHost + '/dropDownBoxController/getProjectSource',
            type:'GET',
            success:function (res) {
                if(!res.code){
                    var data=res.data;
                    for(var i=0;i<data.length;i++){
                        var option= '<option value="'+data[i].projectSource+'">'+data[i].projectSource+'</option>';
                        $(".projectSource").append(option);
                        form.render();
                    }
                }
                else{
                    console.log(res.msg);
                }

            }

        })
        //获奖等级
        $.ajax({
            url:userCenterHost+'/dropDownBoxController/getRank',
            type:'GET',
            success:function (res) {
                if(!res.code){
                    var data=res.data;
                    for(var i=0;i<data.length;i++){
                        var option= '<option value="'+data[i].rank+'">'+data[i].rank+'</option>';
                        $(".awardDegree").append(option);
                        form.render();
                    }
                }
                else{
                    console.log(res.msg);
                }

            }

        });
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
                    console.log(res.msg);
                }

            }

        });
        //教材性质
        $.ajax({
            url:userCenterHost+'/dropDownBoxController/getBookNature',
            type:'GET',
            success:function (res) {
                if(!res.code){
                    var data=res.data;
                    for(var i=0;i<data.length;i++){
                        var option= '<option value="'+data[i].bookNature+'">'+data[i].bookNature+'</option>';
                        $(".bookNature").append(option);
                        form.render();
                    }
                }
                else{
                    console.log(res.msg);
                }

            }

        })


        $('.eduawardInput .layui-btn').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
        $('.eduprojectInput .layui-btn').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
        $('.textbookInput .layui-btn').on('click',function(){
            var type=$(this).data('type');
            active[type] ? active[type].call(this) : '';
        })

    }), e("teachingDetailTab", {});
})


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

