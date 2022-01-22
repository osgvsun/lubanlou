
var path = $("meta[name='contextPath']").attr("content");
//资源容器url
var uploadFileHost = $("#uploadFileHost").val();
//删除列表
// $(".delete_box").click(function () {
//     $(this).parents("tr").remove();
// })
/*unction remove2(){
    var contextPath = /!*[[@{/}]]*!/'';
    location.href=contextPath+"gvsunTms/system/newNotices";
}*/

//设置学生和组长
function setStu(id){
    //获取groupId
    var groupId=$("#groupId").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'editGroupStudentRole?id='+id+'&role='+0+'&groupId='+groupId;
}
function setLead(id){
    //获取groupId
    var groupId=$("#groupId").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'editGroupStudentRole?id='+id+'&role='+2+'&groupId='+groupId;
}
function setRole(id) {
    layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        shadeClose: true,
        skin: 'yourclass',
        content: $("#roleBox"),
        end:function () {
            $("#roleBox").hide();
        }
    });
    $('#studentId').val(id)
}
function setRoleList() {
    var roleList="";
    var contextPath = /*[[@{/}]]*/'';
    $("input[name='choose']:checked").each(
        function(){
            roleList += $(this).val()+",";
        }
    )
    $("#roleList").val(roleList);
    $("#addRole").submit();
    layer.closeAll();
}
// layui.use('form', function(){
//     var $ = layui.jquery
//         ,form = layui.form //获取form模块
//     var contextPath = /*[[@{/}]]*/'';
//     form.render({
//         // elem: '#deviceExcel'
//         url: contextPath+'setRole'
//         ,accept: 'file' //普通文件
//         ,exts: 'xls|xlsx|xlsm'
//         ,auto: false
//         //,multiple: true
//         ,bindAction: '#beginUpload'
//         ,done: function(res) {
//             //TODO 后面需要传入题库的id
//             // location.href = contextPath + 'manage/learnManage?siteId='+siteId;
//             // location.href= contextPath +'manage/importAttendance';
//             layer.alert("导入成功", function(){
//                 window.parent.location.reload();
//                 layer.closeAll();
//
//             });
//         }
//     });
// });

/*时间选择器*/
layui.use('laydate', function(){
    var laydate = layui.laydate;
    //时间选择器
    laydate.render({
        elem: '#data_box1'
        ,type: 'datetime'
    });
    laydate.render({
        elem: '#data_box2'
        ,type: 'datetime'
    });
    laydate.render({
        elem: '#data_box3'
        ,type: 'date'
    });
    laydate.render({
        elem: '#data_box4'
        ,type: 'datetime'
    });
});
function DoCheck()
{
    var ch=document.getElementsByName("choose");
    alert(ch)
    if(document.getElementsByName("allChecked")[0].checked==true)
    {
        for(var i=0;i<ch.length;i++)
        {
            ch[i].checked=true;
        }
    }else{
        for(var i=0;i<ch.length;i++)
        {
            ch[i].checked=false;
        }
    }
}

//站点id
var siteId = $("#siteId").val();
//站点名称
var siteName = $("#siteName").val();
//站点创建人
var createUser = $("#createUser").val();
//小组id
var groupId=$("#groupId").val();
//小组名字
var groupTitle=$("#groupTitle").val();

function uploadGroupDocument(id){
    var groupDocumentId = id;
    layui.use('layer', function() { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer;
        layer.open({
            type: 1
            , offset: 'auto' //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
            , area: '900px'
            , title: '上传立项文件'
            , content: '<div style="padding: 20px 100px;">' + '<div class="layui-upload">'+
            '<button type="button" class="layui-btn layui-btn-normal" id="stageFile1">'+'选择多文件'+'</button>'+
            '<div class="layui-upload-list">'+
            '<table class="layui-table">'+
            '<thead>'+
            '<tr>'+'<th>'+'文件名'+'</th>'+
            '<th>'+'大小'+'</th>'+
            '<th>'+'状态'+'</th>'+
            '<th>'+'操作'+'</th>'+
            '</tr>'+'</thead>'+
            '<tbody id="stageList1">'+'</tbody>'+
            '</table>'+
            '</div>'+
            '<button type="button" class="layui-btn" id="stageAction1">'+'开始上传'+'</button>'+
            '</div>'+ '</div>'
            , btn: '关闭全部'
            , btnAlign: 'c' //按钮居中
            , shade: 0 //不显示遮罩
            , yes: function () {
                layer.closeAll();
            }
        });

        layui.use('upload', function () {
            // var contextPath = /*[[@{/}]]*/'';
            var $ = layui.jquery
                , upload = layui.upload;
            //指定允许上传的文件类型
            //多文件上传
            var demoListView = $('#stageList1')
                ,uploadListIns = upload.render({
                elem: '#stageFile1'
                ,url: uploadFileHost
                ,accept: 'file'
                ,multiple: true
                ,auto: false
                ,bindAction: '#stageAction1'
                , before: function (obj) {
                    //小组id传入tag4
                    var tag4 = "creative_" + groupId;
                    this.data = {
                        'username': createUser, 'fileTag1': "file"
                        , 'tag1': "gvsuntms", 'tag2': siteId, 'tag3': "creative", 'tag4': tag4
                        , 'tagTitle1': "教学平台", 'tagTitle2': siteName, 'tagTitle3': "体验", 'tagTitle4': groupTitle
                    };
                }
                ,choose: function(obj){
                    var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                    //读取本地文件
                    obj.preview(function(index, file, result){
                        var tr = $(['<tr id="upload-'+ index +'">'
                            ,'<td>'+ file.name +'</td>'
                            ,'<td>'+ (file.size/1014).toFixed(1) +'kb</td>'
                            ,'<td>等待上传</td>'
                            ,'<td>'
                            ,'<button class="layui-btn layui-btn-mini demo-reload layui-hide">重传</button>'
                            ,'<button class="layui-btn layui-btn-mini layui-btn-danger demo-delete">删除</button>'
                            ,'</td>'
                            ,'</tr>'].join(''));

                        //单个重传
                        tr.find('.demo-reload').on('click', function(){
                            obj.upload(index, file);
                        });

                        //删除
                        tr.find('.demo-delete').on('click', function(){
                            delete files[index]; //删除对应的文件
                            tr.remove();
                            uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                        });

                        demoListView.append(tr);
                    });
                }
                ,done: function(res, index, upload){
                    if(res.code>0){
                        this.error(index, upload);
                    }else{ //上传成功
                        $.ajax({
                            //url: "${pageContext.request.contextPath}/product/tcoursesite/fileUpload?type=3&moduleType=${moduleType}&siteId="+${tCourseSite.id},
                            url: path + '/creative/saveWkUpload?',
                            type: 'POST',
                            async: false,
                            data: {
                                'siteId': siteId,
                                'name': res.fileName,
                                'newUrl': res.fileUrl,
                                'size': res.fileSize,
                                'groupId': groupId,
                                'type': groupDocumentId
                            },
                            dataType: 'json',
                            success: function (data2) {
                                alert("上传成功");
                                location.href = path + '/creative/groupDocument?groupId=' + groupId;
                            },
                            error: function (returndata) {
                                alert("上传失败");
                            }
                        });
                        var tr = demoListView.find('tr#upload-'+ index)
                            ,tds = tr.children();
                        tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                        tds.eq(3).html(''); //清空操作
                        return delete this.files[index]; //删除文件队列已经上传成功的文件
                    }
                    this.error(index, upload);
                }
                ,error: function(index, upload){
                    var tr = demoListView.find('tr#upload-'+ index)
                        ,tds = tr.children();
                    tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                    tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                }
            });
        });
    });
}
//弹出框
$('#stage1').click(function () {
    layui.use('layer', function() { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer;
        layer.open({
            type: 1
            , offset: 'auto' //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
            , area: '900px'
            , title: '上传立项文件'
            , content: '<div style="padding: 20px 100px;">' + '<div class="layui-upload">'+
            '<button type="button" class="layui-btn layui-btn-normal" id="stageFile1">'+'选择多文件'+'</button>'+
            '<div class="layui-upload-list">'+
            '<table class="layui-table">'+
            '<thead>'+
            '<tr>'+'<th>'+'文件名'+'</th>'+
            '<th>'+'大小'+'</th>'+
            '<th>'+'状态'+'</th>'+
            '<th>'+'操作'+'</th>'+
            '</tr>'+'</thead>'+
            '<tbody id="stageList1">'+'</tbody>'+
            '</table>'+
            '</div>'+
            '<button type="button" class="layui-btn" id="stageAction1">'+'开始上传'+'</button>'+
            '</div>'+ '</div>'
            , btn: '关闭全部'
            , btnAlign: 'c' //按钮居中
            , shade: 0 //不显示遮罩
            , yes: function () {
                layer.closeAll();
            }
        });

        layui.use('upload', function () {
            // var contextPath = /*[[@{/}]]*/'';
            var $ = layui.jquery
                , upload = layui.upload;
            //指定允许上传的文件类型
            //多文件上传
            var demoListView = $('#stageList1')
                ,uploadListIns = upload.render({
                elem: '#stageFile1'
                ,url: uploadFileHost
                ,accept: 'file'
                ,multiple: true
                ,auto: false
                ,bindAction: '#stageAction1'
                , before: function (obj) {
                //小组id传入tag4
                var tag4 = "creative_" + groupId;
                this.data = {
                    'username': createUser, 'fileTag1': "file"
                    , 'tag1': "gvsuntms", 'tag2': siteId, 'tag3': "creative", 'tag4': tag4
                    , 'tagTitle1': "教学平台", 'tagTitle2': siteName, 'tagTitle3': "体验", 'tagTitle4': groupTitle
                };
            }
                ,choose: function(obj){
                    var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                    //读取本地文件
                    obj.preview(function(index, file, result){
                        var tr = $(['<tr id="upload-'+ index +'">'
                            ,'<td>'+ file.name +'</td>'
                            ,'<td>'+ (file.size/1014).toFixed(1) +'kb</td>'
                            ,'<td>等待上传</td>'
                            ,'<td>'
                            ,'<button class="layui-btn layui-btn-mini demo-reload layui-hide">重传</button>'
                            ,'<button class="layui-btn layui-btn-mini layui-btn-danger demo-delete">删除</button>'
                            ,'</td>'
                            ,'</tr>'].join(''));

                        //单个重传
                        tr.find('.demo-reload').on('click', function(){
                            obj.upload(index, file);
                        });

                        //删除
                        tr.find('.demo-delete').on('click', function(){
                            delete files[index]; //删除对应的文件
                            tr.remove();
                            uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                        });

                        demoListView.append(tr);
                    });
                }
                ,done: function(res, index, upload){
                    if(res.code>0){
                        this.error(index, upload);
                    }else{ //上传成功
                        $.ajax({
                            //url: "${pageContext.request.contextPath}/product/tcoursesite/fileUpload?type=3&moduleType=${moduleType}&siteId="+${tCourseSite.id},
                            url: path + '/creative/saveWkUpload?',
                            type: 'POST',
                            async: false,
                            data: {
                                'siteId': siteId,
                                'name': res.fileName,
                                'newUrl': res.fileUrl,
                                'size': res.fileSize,
                                'groupId': groupId,
                                'type': 3011
                            },
                            dataType: 'json',
                            success: function (data2) {
                                alert("上传成功");
                                location.href = path + '/creative/groupDocument?groupId=' + groupId;
                            },
                            error: function (returndata) {
                                alert("上传失败");
                            }
                        });
                        var tr = demoListView.find('tr#upload-'+ index)
                            ,tds = tr.children();
                        tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                        tds.eq(3).html(''); //清空操作
                        return delete this.files[index]; //删除文件队列已经上传成功的文件
                    }
                    this.error(index, upload);
                }
                ,error: function(index, upload){
                    var tr = demoListView.find('tr#upload-'+ index)
                        ,tds = tr.children();
                    tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                    tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                }
            });
        });
    });
});
//弹出框
$('#stage2').click(function () {
    layui.use('layer', function() { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer;
        layer.open({
            type: 1
            , offset: 'auto' //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
            , area: '900px'
            , title: '上传立项文件'
            , content: '<div style="padding: 20px 100px;">' + '<div class="layui-upload">'+
            '<button type="button" class="layui-btn layui-btn-normal" id="stageFile2">'+'选择多文件'+'</button>'+
            '<div class="layui-upload-list">'+
            '<table class="layui-table">'+
            '<thead>'+
            '<tr>'+'<th>'+'文件名'+'</th>'+
            '<th>'+'大小'+'</th>'+
            '<th>'+'状态'+'</th>'+
            '<th>'+'操作'+'</th>'+
            '</tr>'+'</thead>'+
            '<tbody id="stageList2">'+'</tbody>'+
            '</table>'+
            '</div>'+
            '<button type="button" class="layui-btn" id="stageAction2">'+'开始上传'+'</button>'+
            '</div>'+ '</div>'
            , btn: '关闭全部'
            , btnAlign: 'c' //按钮居中
            , shade: 0 //不显示遮罩
            , yes: function () {
                layer.closeAll();
            }
        });

        layui.use('upload', function () {
            // var contextPath = /*[[@{/}]]*/'';
            var $ = layui.jquery
                , upload = layui.upload;
            //指定允许上传的文件类型
            //多文件上传
            var demoListView = $('#stageList2')
                ,uploadListIns = upload.render({
                elem: '#stageFile2'
                ,url: uploadFileHost
                ,accept: 'file'
                ,multiple: true
                ,auto: false
                ,bindAction: '#stageAction2'
                , before: function (obj) {
                    //小组id传入tag4
                    var tag4 = "creative_" + groupId;
                    this.data = {
                        'username': createUser, 'fileTag1': "file"
                        , 'tag1': "gvsuntms", 'tag2': siteId, 'tag3': "creative", 'tag4': tag4
                        , 'tagTitle1': "教学平台", 'tagTitle2': siteName, 'tagTitle3': "体验", 'tagTitle4': groupTitle
                    };
                }
                ,choose: function(obj){
                    var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                    //读取本地文件
                    obj.preview(function(index, file, result){
                        var tr = $(['<tr id="upload-'+ index +'">'
                            ,'<td>'+ file.name +'</td>'
                            ,'<td>'+ (file.size/1014).toFixed(1) +'kb</td>'
                            ,'<td>等待上传</td>'
                            ,'<td>'
                            ,'<button class="layui-btn layui-btn-mini demo-reload layui-hide">重传</button>'
                            ,'<button class="layui-btn layui-btn-mini layui-btn-danger demo-delete">删除</button>'
                            ,'</td>'
                            ,'</tr>'].join(''));

                        //单个重传
                        tr.find('.demo-reload').on('click', function(){
                            obj.upload(index, file);
                        });

                        //删除
                        tr.find('.demo-delete').on('click', function(){
                            delete files[index]; //删除对应的文件
                            tr.remove();
                            uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                        });

                        demoListView.append(tr);
                    });
                }
                ,done: function(res, index, upload){
                    if(res.code>0){
                        this.error(index, upload);
                    }else{ //上传成功
                        $.ajax({
                            //url: "${pageContext.request.contextPath}/product/tcoursesite/fileUpload?type=3&moduleType=${moduleType}&siteId="+${tCourseSite.id},
                            url: path + '/creative/saveWkUpload?',
                            type: 'POST',
                            async: false,
                            data: {
                                'siteId': siteId,
                                'name': res.fileName,
                                'newUrl': res.fileUrl,
                                'size': res.fileSize,
                                'groupId': groupId,
                                'type': 3012
                            },
                            dataType: 'json',
                            success: function (data2) {
                                alert("上传成功");
                                location.href = path + '/creative/groupDocument?groupId=' + groupId;
                            },
                            error: function (returndata) {
                                alert("上传失败");
                            }
                        });
                        var tr = demoListView.find('tr#upload-'+ index)
                            ,tds = tr.children();
                        tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                        tds.eq(3).html(''); //清空操作
                        return delete this.files[index]; //删除文件队列已经上传成功的文件
                    }
                    this.error(index, upload);
                }
                ,error: function(index, upload){
                    var tr = demoListView.find('tr#upload-'+ index)
                        ,tds = tr.children();
                    tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                    tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                }
            });
        });


    });
});
$('#stage3').click(function () {
    layui.use('layer', function() { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer;
        layer.open({
            type: 1
            , offset: 'auto' //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
            , area: '900px'
            , title: '上传立项文件'
            , content: '<div style="padding: 20px 100px;">' + '<div class="layui-upload">'+
            '<button type="button" class="layui-btn layui-btn-normal" id="stageFile3">'+'选择多文件'+'</button>'+
            '<div class="layui-upload-list">'+
            '<table class="layui-table">'+
            '<thead>'+
            '<tr>'+'<th>'+'文件名'+'</th>'+
            '<th>'+'大小'+'</th>'+
            '<th>'+'状态'+'</th>'+
            '<th>'+'操作'+'</th>'+
            '</tr>'+'</thead>'+
            '<tbody id="stageList3">'+'</tbody>'+
            '</table>'+
            '</div>'+
            '<button type="button" class="layui-btn" id="stageAction3">'+'开始上传'+'</button>'+
            '</div>'+ '</div>'
            , btn: '关闭全部'
            , btnAlign: 'c' //按钮居中
            , shade: 0 //不显示遮罩
            , yes: function () {
                layer.closeAll();
            }
        });

        layui.use('upload', function () {
            // var contextPath = /*[[@{/}]]*/'';
            var $ = layui.jquery
                , upload = layui.upload;
            //指定允许上传的文件类型
            //多文件上传
            var demoListView = $('#stageList3')
                ,uploadListIns = upload.render({
                elem: '#stageFile3'
                ,url: uploadFileHost
                ,accept: 'file'
                ,multiple: true
                ,auto: false
                ,bindAction: '#stageAction3'
                , before: function (obj) {
                    //小组id传入tag4
                    var tag4 = "creative_" + groupId;
                    this.data = {
                        'username': createUser, 'fileTag1': "file"
                        , 'tag1': "gvsuntms", 'tag2': siteId, 'tag3': "creative", 'tag4': tag4
                        , 'tagTitle1': "教学平台", 'tagTitle2': siteName, 'tagTitle3': "体验", 'tagTitle4': groupTitle
                    };
                }
                ,choose: function(obj){
                    var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                    //读取本地文件
                    obj.preview(function(index, file, result){
                        var tr = $(['<tr id="upload-'+ index +'">'
                            ,'<td>'+ file.name +'</td>'
                            ,'<td>'+ (file.size/1014).toFixed(1) +'kb</td>'
                            ,'<td>等待上传</td>'
                            ,'<td>'
                            ,'<button class="layui-btn layui-btn-mini demo-reload layui-hide">重传</button>'
                            ,'<button class="layui-btn layui-btn-mini layui-btn-danger demo-delete">删除</button>'
                            ,'</td>'
                            ,'</tr>'].join(''));

                        //单个重传
                        tr.find('.demo-reload').on('click', function(){
                            obj.upload(index, file);
                        });

                        //删除
                        tr.find('.demo-delete').on('click', function(){
                            delete files[index]; //删除对应的文件
                            tr.remove();
                            uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                        });

                        demoListView.append(tr);
                    });
                }
                ,done: function(res, index, upload){
                    if(res.code>0){
                        this.error(index, upload);
                    }else{ //上传成功
                        $.ajax({
                            //url: "${pageContext.request.contextPath}/product/tcoursesite/fileUpload?type=3&moduleType=${moduleType}&siteId="+${tCourseSite.id},
                            url: path + '/creative/saveWkUpload?',
                            type: 'POST',
                            async: false,
                            data: {
                                'siteId': siteId,
                                'name': res.fileName,
                                'newUrl': res.fileUrl,
                                'size': res.fileSize,
                                'groupId': groupId,
                                'type': 3013
                            },
                            dataType: 'json',
                            success: function (data2) {
                                alert("上传成功");
                                location.href = path + '/creative/groupDocument?groupId=' + groupId;
                            },
                            error: function (returndata) {
                                alert("上传失败");
                            }
                        });
                        var tr = demoListView.find('tr#upload-'+ index)
                            ,tds = tr.children();
                        tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                        tds.eq(3).html(''); //清空操作
                        return delete this.files[index]; //删除文件队列已经上传成功的文件
                    }
                    this.error(index, upload);
                }
                ,error: function(index, upload){
                    var tr = demoListView.find('tr#upload-'+ index)
                        ,tds = tr.children();
                    tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                    tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                }
            });
        });
    });
});
$('#stage4').click(function () {
    layui.use('layer', function() { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer;
        layer.open({
            type: 1
            , offset: 'auto' //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
            , area: '900px'
            , title: '上传立项文件'
            , content: '<div style="padding: 20px 100px;">' + '<div class="layui-upload">'+
            '<button type="button" class="layui-btn layui-btn-normal" id="stageFile4">'+'选择多文件'+'</button>'+
            '<div class="layui-upload-list">'+
            '<table class="layui-table">'+
            '<thead>'+
            '<tr>'+'<th>'+'文件名'+'</th>'+
            '<th>'+'大小'+'</th>'+
            '<th>'+'状态'+'</th>'+
            '<th>'+'操作'+'</th>'+
            '</tr>'+'</thead>'+
            '<tbody id="stageList4">'+'</tbody>'+
            '</table>'+
            '</div>'+
            '<button type="button" class="layui-btn" id="stageAction4">'+'开始上传'+'</button>'+
            '</div>'+ '</div>'
            , btn: '关闭全部'
            , btnAlign: 'c' //按钮居中
            , shade: 0 //不显示遮罩
            , yes: function () {
                layer.closeAll();
            }
        });

        layui.use('upload', function () {
            // var contextPath = /*[[@{/}]]*/'';
            var $ = layui.jquery
                , upload = layui.upload;
            //指定允许上传的文件类型
            //多文件上传
            var demoListView = $('#stageList4')
                ,uploadListIns = upload.render({
                elem: '#stageFile4'
                ,url: uploadFileHost
                ,accept: 'file'
                ,multiple: true
                ,auto: false
                ,bindAction: '#stageAction4'
                , before: function (obj) {
                    //小组id传入tag4
                    var tag4 = "creative_" + groupId;
                    this.data = {
                        'username': createUser, 'fileTag1': "file"
                        , 'tag1': "gvsuntms", 'tag2': siteId, 'tag3': "creative", 'tag4': tag4
                        , 'tagTitle1': "教学平台", 'tagTitle2': siteName, 'tagTitle3': "体验", 'tagTitle4': groupTitle
                    };
                }
                ,choose: function(obj){
                    var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
                    //读取本地文件
                    obj.preview(function(index, file, result){
                        var tr = $(['<tr id="upload-'+ index +'">'
                            ,'<td>'+ file.name +'</td>'
                            ,'<td>'+ (file.size/1014).toFixed(1) +'kb</td>'
                            ,'<td>等待上传</td>'
                            ,'<td>'
                            ,'<button class="layui-btn layui-btn-mini demo-reload layui-hide">重传</button>'
                            ,'<button class="layui-btn layui-btn-mini layui-btn-danger demo-delete">删除</button>'
                            ,'</td>'
                            ,'</tr>'].join(''));

                        //单个重传
                        tr.find('.demo-reload').on('click', function(){
                            obj.upload(index, file);
                        });

                        //删除
                        tr.find('.demo-delete').on('click', function(){
                            delete files[index]; //删除对应的文件
                            tr.remove();
                            uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
                        });

                        demoListView.append(tr);
                    });
                }
                ,done: function(res, index, upload){
                    if(res.code>0){
                        this.error(index, upload);
                    }else{ //上传成功
                        $.ajax({
                            //url: "${pageContext.request.contextPath}/product/tcoursesite/fileUpload?type=3&moduleType=${moduleType}&siteId="+${tCourseSite.id},
                            url: path + '/creative/saveWkUpload?',
                            type: 'POST',
                            async: false,
                            data: {
                                'siteId': siteId,
                                'name': res.fileName,
                                'newUrl': res.fileUrl,
                                'size': res.fileSize,
                                'groupId': groupId,
                                'type': 3014
                            },
                            dataType: 'json',
                            success: function (data2) {
                                alert("上传成功");
                                location.href = path + '/creative/groupDocument?groupId=' + groupId;
                            },
                            error: function (returndata) {
                                alert("上传失败");
                            }
                        });
                        var tr = demoListView.find('tr#upload-'+ index)
                            ,tds = tr.children();
                        tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
                        tds.eq(3).html(''); //清空操作
                        return delete this.files[index]; //删除文件队列已经上传成功的文件
                    }
                    this.error(index, upload);
                }
                ,error: function(index, upload){
                    var tr = demoListView.find('tr#upload-'+ index)
                        ,tds = tr.children();
                    tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                    tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
                }
            });
        });
    });
});


//导师意见弹出框
function addRemote(period) {
    layer.open({
        type: 1,
        title: false,
        // closeBtn: 0,
        shadeClose: true,
        skin: 'yourclass',
        content: $("#remoteBox")
    });
    $("#period").val(period);
}

//专家意见弹出框
function addRemoteExpert(period,settingId) {
    layer.open({
        type: 1,
        title: false,
        // closeBtn: 0,
        shadeClose: true,
        skin: 'yourclass',
        content: $("#remoteBox")
    });
    $("#period").val(period);
    $("#settingId").val(settingId);
}

function editRemote(comment,result,totalScore,id,period) {
    layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        shadeClose: true,
        skin: 'yourclass',
        content: $("#remoteBox")
    });
    $("#comment").val(comment);
    $("#result").val(result);
    $("#totalScore").val(totalScore);
    $("#id").val(id);
    $("#period").val(period);
}

function editRemoteExpert(comment,totalScore,id,period,reviewId) {
    layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        shadeClose: true,
        skin: 'yourclass',
        content: $("#remoteBox")
    });
    $("#comment").val(comment);
    $("#totalScore").val(totalScore);
    $("#id").val(id);
    $("#period").val(period);
    $("#settingId").val(reviewId);
}

function surelab() {
    var count=$("#count").val();
    var title=$("#title").val();
    if(parseInt(title)>parseInt(count)){
        alert("组数大于未分组人数");
        return false;
    }
    $("#form").submit();
    layer.closeAll();
}
//导师评语表单字数限制提示
function chkmaxsms(vobj1,vmax)   {
    var   str=vobj1.value;
    var   strlen=str.length;

    if(strlen>vmax)   {
        alert('请将字数控制在500个以内');
        eval(vobj1.value=str.substr(0,vmax));
    }
}
function cancelOutline() {
    layer.closeAll();
}
//设置权重类型
function getType(type) {
        $('#assignmentFunctionType').val(type);
        $('#examFunctionType').val(type);
        $('#testFunctionType').val(type);
        $('#sExamFunctionType').val(type);
        $('#attendenceType').val(type);
        $('#experimentFunctionType').val(type);
        $('#exScoreFunctionType').val(type);
        $('#groupFunctionType').val(type);
        $('#groupTeachFunctionType').val(type);
        $('#allWeightFunctionType').val(type);
        $('#actionFullMarkType').val(type);
}
//小组首页
function homePageGroupStudent(){
    var siteId=$("#siteId").val();
    var groupId=$("#groupId").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'groupStudent?currpage=1&groupId='+groupId;
}
//小组末页
function lastPageGroupStudent(){
    var siteId=$("#siteId").val();
    var groupId=$("#groupId").val();
    var contextPath = /*[[@{/}]]*/'';
    var totalPage=$("#totalPage").val();
    location.href=contextPath+'groupStudent?currpage='+totalPage+'&groupId='+groupId;
}
//小组上一页
function previousPageGroupStudent(){
    var siteId=$("#siteId").val();
    var groupId=$("#groupId").val();
    var contextPath = /*[[@{/}]]*/'';
    var currpage=$("#currpage").val();
    if(currpage>1){
        currpage=parseInt(currpage)-1;
    }else{
        currpage=1;
    }
    location.href=contextPath+'groupStudent?currpage='+currpage+'&groupId='+groupId;
}
//小组下一页
function nextPageGroupStudent(){
    var siteId=$("#siteId").val();
    var groupId=$("#groupId").val();
    var contextPath = /*[[@{/}]]*/'';
    var currpage=$("#currpage").val();
    var totalPage=$("#totalPage").val();
    if(parseInt(currpage)<parseInt(totalPage)){
        currpage=parseInt(currpage)+1;
    }else{
        currpage=totalPage;
    }
    location.href=contextPath+'groupStudent?currpage='+currpage+'&groupId='+groupId;
}
//小组
function jumpToGroupStudent(page){
    //获取groupId
    var groupId=$("#groupId").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'groupStudent?currpage='+page+'&groupId='+groupId;
}

//小组新增人首页
function homePageSiteStudent(){
    var siteId=$("#siteId").val();
    var groupId=$("#groupId").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'siteStudent?currpage=1&siteId='+siteId+'&groupId='+groupId;
}
//小组新增人末页
function lastPageSiteStudent(){
    var siteId=$("#siteId").val();
    var groupId=$("#groupId").val();
    var contextPath = /*[[@{/}]]*/'';
    var totalPage=$("#totalPage").val();
    location.href=contextPath+'siteStudent?currpage='+totalPage+'&siteId='+siteId+'&groupId='+groupId;
}
//小组新增人上一页
function previousPageSiteStudent(){
    var siteId=$("#siteId").val();
    var groupId=$("#groupId").val();
    var contextPath = /*[[@{/}]]*/'';
    var currpage=$("#currpage").val();
    if(currpage>1){
        currpage=parseInt(currpage)-1;
    }else{
        currpage=1;
    }
    location.href=contextPath+'siteStudent?currpage='+currpage+'&siteId='+siteId+'&groupId='+groupId;
}
//小组新增人下一页
function nextPageSiteStudent(){
    var siteId=$("#siteId").val();
    var groupId=$("#groupId").val();
    var contextPath = /*[[@{/}]]*/'';
    var currpage=$("#currpage").val();
    var totalPage=$("#totalPage").val();
    if(parseInt(currpage)<parseInt(totalPage)){
        currpage=parseInt(currpage)+1;
    }else{
        currpage=totalPage;
    }
    location.href=contextPath+'siteStudent?currpage='+currpage+'&siteId='+siteId+'&groupId='+groupId;
}
//小组新增人
function jumpToSiteStudent(page){
    //获取groupId
    var siteId=$("#siteId").val();
    var groupId = $("#groupId").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'siteStudent?currpage='+page+'&siteId='+siteId+'&groupId='+groupId;
}
function addStudent() {
    var addStudentList="";
    var siteId=$("#siteId").val();
    var groupId=$("#groupId").val();
    var contextPath = /*[[@{/}]]*/'';
    $("input[name='choose']:checked").each(
        function(){
            addStudentList += $(this).val()+",";
        }
    )
    $("#addStudentList").val(addStudentList);
    $.ajax({
        data: {'siteId': siteId,'addStudentList':addStudentList,'groupId':groupId},
        url: contextPath + "checkLeader",
        dataType: 'json',
        type: "POST",
        success: function (data) {
            if(data) {
                $("#myForm1").submit();
            }else{
                alert("每组只能存在一个组长");
                return false;
            }
        },
       /* error: function () {
            alert("每组只能存在一个组长");
            return false;
        }*/

    });

}
function deleteStudent() {
    var deleStudentList="";
    var deleStudentIdList="";
    var contextPath = /*[[@{/}]]*/'';
    $("input[name='choose']:checked").each(
        function() {
            deleStudentList += $(this).val()+",";
            deleStudentIdList += $(this).next().next().val()+",";
        }
    )
    $("#deleStudentIdList").val(deleStudentIdList);
    $("#deleStudentList").val(deleStudentList);
    $("#myForm").submit();

}
//返回
function  quitStudent() {
    var contextPath = /*[[@{/}]]*/'';
    var id=$("#groupId").val();
    location.href=contextPath+'groupStudent?groupId='+id;
}
function addActivity() {
    var contextPath = /*[[@{/}]]*/'';
    var progress=editor1.txt.html();
    var remarks=editor2.txt.html();

    if($.trim($("#data_box1").val())==""){
        alert("请填写活动时间");
        return false;
    }else{
        $("#data_box1").val();
    }
    if(editor1.txt.text()==""){
        alert("请填写项目进展");
        return false;
    }else{
        $("#progress").val(progress);
    }
    if($.trim($("#address").val())==""){
        alert("请填写工作地点");
        return false;
    }else{
        $("#address").val();
    }

    $("#remarks").val(remarks);
    $("#githubAddress").val();
    $("#documentId").val();
    $("#activityId").val();
   /* $("#address").val();
    $("#progress").val(progress);
    $("#githubAddress").val();
    $("#data_box1").val();
    $("#documentId").val();*/
    $("#myForm").submit();
}
//批量新增
function batchAdd() {
    layer.open({
        type: 1,
        title: false,
        // closeBtn: 0,
        shaFdeClose: true,
        skin: 'yourclass',
        content: $("#batchAdd")
    });
}

function saveScore(flag,type){
    $("#saveFlag").val(flag);
    $("#typeFlag").val(type);
}
//首页
function homePage() {
    var siteId = $("#siteId").val();
    location.href=contextPath+'creative/tCourseSiteGroup?siteId='+siteId+'&currpage=1';
}
//末页
function lastPage(){
    var totalPage=$("#totalPage").val();
    var siteId = $("#siteId").val();
    location.href=contextPath+'creative/tCourseSiteGroup?siteId='+siteId+'&currpage='+totalPage;
}
//上一页
function previousPage(){
    var currpage=$("#currpage").val();
    var siteId = $("#siteId").val();
    if(currpage>1){
        currpage=parseInt(currpage)-1;
    }else{
        currpage=1;
    }
    location.href=contextPath+'creative/tCourseSiteGroup?siteId='+siteId+'&currpage='+currpage;
}
//下一页
function nextPage(){
    //下一页
    var currpage=$("#currpage").val();
    var totalPage=$("#totalPage").val();
    var siteId = $("#siteId").val();
    if(parseInt(currpage)<parseInt(totalPage)){
        currpage=parseInt(currpage)+1;
    }else{
        currpage=totalPage;
    }
    location.href=contextPath+'creative/tCourseSiteGroup?siteId='+siteId+'&currpage='+currpage;

}
//学生分组
function jumpToGroupStudent(page){
    //获取groupId
    var siteId=$("#siteId").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'tCourseSiteGroup?currpage='+page+'&siteId='+siteId;
}
//小组成员图片地址
$("#groupImagePath").attr("src",$("#groupImage").val());

//提交保存考勤
function saveAttendance() {
    $("#attendanceForm").submit();
}
function remove1() {
    $('#cname').val('');
    $('#username').val('');
    document.queryForm.submit();
}
//远程弹出框
function selectTime() {
    var folderId=$("#folderId").val();
    layer.open({
        type: 1,
        title: '选择考勤开始与结束时间',
        closeBtn: 1,
        shadeClose: true,
        area:['30%','40%'],
        content: $("#selectTime")
    });
    $("#folderId1").val(folderId);
}
//提交考勤开始结束时间
// function submitTime() {
//     $("#data_box1").val();
//     $("#data_box2").val()
//     $("assignmentId").val();
//     $("#formSelectTime").submit();
// }
// layui.use(['layer', 'form','laydate'], function(){
//     var layer = layui.layer
//         ,laydate=layui.laydate
//         ,form = layui.form;
//
// //监听form表单提交事件
// form.on('submit(submitTime)', function(data){
//     alert(134);
//     var assignmentId = $("#assignmentId").val();
//     $.ajax({
//         url:path+"/teach/attendanceSynchronizationOnPage",
//         type:'post',//method请求方式，get或者post
//         dataType:'json',//预期服务器返回的数据类型
//         data:JSON.stringify(data.field),//表格数据序列化
//         complete:function(res){//res为相应体,function为回调函数
//             alert(data);
//             console.log(res)
//             if(res=='1'){
//                 window.location.href = path+'/teach/attendanceSynchronizationPage?attendanceId=' + assignmentId;
//             }else{
//                 alert("系统错误!");
//                 layer.closeAll();
//                 window.location.href = path+'/teach/attendanceSynchronizationPage?attendanceId=' + assignmentId;
//             }
//         },
//         // error:function(){
//         //     layer.alert('123！',{icon:5});
//         // }
//     });
//     //return false;
// });//end form
// });//end layui.use

//上传
layui.use('upload', function(){
    var $ = layui.jquery
        ,upload = layui.upload;
    upload.render({
        elem: '#excel'
        ,url: contextPath+'manage/importAttendance'
        ,accept: 'file' //普通文件
        ,size:512000
        ,exts: 'xls|xlsx|xlsm'
        ,auto: false
        ,xhr:xhrOnProgress
        ,progress:function (value) {
            element.progress('demo',value+'%')
        }
        ,bindAction: '#beginUpload'
        ,before:function(input){
            console.log('文件上传中');
        }
        ,done: function(res) {
            //TODO 后面需要传入题库的id
            // location.href = contextPath + 'manage/learnManage?siteId='+siteId;
            // location.href= contextPath +'manage/importAttendance';
            layer.alert("导入成功", function(){
                window.parent.location.reload();
                layer.closeAll();

            });
        }
    });
});
//创建监听函数 2018/7/25
var xhrOnProgress=function(fun) {
    xhrOnProgress.onprogress = fun; //绑定监听
    //使用闭包实现监听绑
    return function() {
        //通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
        var xhr = $.ajaxSettings.xhr();
        //判断监听函数是否为函数
        if (typeof xhrOnProgress.onprogress !== 'function')
            return xhr;
        //如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
        if (xhrOnProgress.onprogress && xhr.upload) {
            xhr.upload.onprogress = xhrOnProgress.onprogress;
        }
        return xhr;
    }
}

<!--弹出层js-->
function attendanceExcel(){
    layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        shadeClose: true,
        skin: 'yourclass',
        content: $("#attendanceExcel")
    });
}

<!--弹出层里面的取消按钮-->
function closeDiv(){
    layer.closeAll();
}


//上传
layui.use('upload', function(){
    var $ = layui.jquery
        ,upload = layui.upload;
    upload.render({
        elem: '#deviceExcel'
        ,url: contextPath+'system/importDevice'
        ,accept: 'file' //普通文件
        ,exts: 'xls|xlsx|xlsm'
        ,auto: false
        //,multiple: true
        ,bindAction: '#beginUpload'
        ,done: function(res) {
            //TODO 后面需要传入题库的id
            // location.href = contextPath + 'manage/learnManage?siteId='+siteId;
            // location.href= contextPath +'manage/importAttendance';
            layer.alert("导入成功", function(){
                window.parent.location.reload();
                layer.closeAll();

            });
        }
    });
});
<!--弹出层js-->
function deviceExcel(){
    layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        shadeClose: true,
        skin: 'yourclass',
        content: $("#deviceExcel")
    });
}



// 渲染
layui.use('form', function() {
    var form = layui.form;
    // form.render('checkbox');
    form.render();
});
function check(t,oper) {
    var data_tr = $(t).parent().parent(); //获取到触发的tr
    if (oper == "MoveUp") {    //向上移动
        if ($(data_tr).prev().html() == null) { //获取tr的前一个相同等级的元素是否为空
            alert("已经是最顶部了!");
            return;
        }
        {
            $(data_tr).insertBefore($(data_tr).prev()); //将本身插入到目标tr的前面
        }
    } else {
        if ($(data_tr).next().html() == null) {
            alert("已经是最低部了!");
            return;
        }
        {
            $(data_tr).insertAfter($(data_tr).next()); //将本身插入到目标tr的后面
        }
    }
}
//小组
function jumpToRoleStudent(page){
    //获取roleId
    var roleId=$("#roleId").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'roleStudent?currpage='+page+'&roleId='+roleId;
}
//小组首页
function homePageRoleStudent(){
    var siteId=$("#siteId").val();
    var roleId=$("#roleId").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'roleStudent?currpage=1&roleId='+roleId;
}
//小组末页
function lastPageRoleStudent(){
    var siteId=$("#siteId").val();
    var roleId=$("#roleId").val();
    var contextPath = /*[[@{/}]]*/'';
    var totalPage=$("#totalPage").val();
    location.href=contextPath+'roleStudent?currpage='+totalPage+'&roleId='+roleId;
}
//小组上一页
function previousPageRoleStudent(){
    var siteId=$("#siteId").val();
    var roleId=$("#roleId").val();
    var contextPath = /*[[@{/}]]*/'';
    var currpage=$("#currpage").val();
    if(currpage>1){
        currpage=parseInt(currpage)-1;
    }else{
        currpage=1;
    }
    location.href=contextPath+'roleStudent?currpage='+currpage+'&roleId='+roleId;
}
//小组下一页
function nextPageRoleStudent(){
    var siteId=$("#siteId").val();
    var roleId=$("#roleId").val();
    var contextPath = /*[[@{/}]]*/'';
    var currpage=$("#currpage").val();
    var totalPage=$("#totalPage").val();
    if(parseInt(currpage)<parseInt(totalPage)){
        currpage=parseInt(currpage)+1;
    }else{
        currpage=totalPage;
    }
    location.href=contextPath+'roleStudent?currpage='+currpage+'&roleId='+roleId;
}
//小组角色新增人首页
function homePageSiteStudentList(){
    var siteId=$("#siteId").val();
    var roleId=$("#roleId").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'siteStudentList?currpage=1&siteId='+siteId+'&roleId='+roleId;
}
//小组角色新增人末页
function lastPageSiteStudentList(){
    var siteId=$("#siteId").val();
    var roleId=$("#roleId").val();
    var contextPath = /*[[@{/}]]*/'';
    var totalPage=$("#totalPage").val();
    location.href=contextPath+'siteStudentList?currpage='+totalPage+'&siteId='+siteId+'&roleId='+roleId;
}
//小组角色新增人上一页
function previousPageSiteStudentList(){
    var siteId=$("#siteId").val();
    var roleId=$("#roleId").val();
    var contextPath = /*[[@{/}]]*/'';
    var currpage=$("#currpage").val();
    if(currpage>1){
        currpage=parseInt(currpage)-1;
    }else{
        currpage=1;
    }
    location.href=contextPath+'siteStudentList?currpage='+currpage+'&siteId='+siteId+'&roleId='+roleId;
}
//小组角色新增人下一页
function nextPageSiteStudentList(){
    var siteId=$("#siteId").val();
    var roleId=$("#roleId").val();
    var contextPath = /*[[@{/}]]*/'';
    var currpage=$("#currpage").val();
    var totalPage=$("#totalPage").val();
    if(parseInt(currpage)<parseInt(totalPage)){
        currpage=parseInt(currpage)+1;
    }else{
        currpage=totalPage;
    }
    location.href=contextPath+'siteStudentList?currpage='+currpage+'&siteId='+siteId+'&roleId='+roleId;
}
//小组角色新增人
function jumpToSiteStudentRole(page){
    //获取groupId
    var siteId=$("#siteId").val();
    var roleId = $("#roleId").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'siteStudentList?currpage='+page+'&siteId='+siteId+'&roleId='+roleId;
}
//小组角色首页
function rolehomePage() {
    var siteId = $("#siteId").val();
    location.href=contextPath+'creative/tCourseSiteRole?siteId='+siteId+'&currpage=1';
}
//小组角色末页
function rolelastPage(){
    var totalPage=$("#totalPage").val();
    var siteId = $("#siteId").val();
    location.href=contextPath+'creative/tCourseSiteRole?siteId='+siteId+'&currpage='+totalPage;
}
//小组角色上一页
function rolepreviousPage(){
    var currpage=$("#currpage").val();
    var siteId = $("#siteId").val();
    if(currpage>1){
        currpage=parseInt(currpage)-1;
    }else{
        currpage=1;
    }
    location.href=contextPath+'creative/tCourseSiteRole?siteId='+siteId+'&currpage='+currpage;
}
//小组角色下一页
function rolenextPage(){
    //下一页
    var currpage=$("#currpage").val();
    var totalPage=$("#totalPage").val();
    var siteId = $("#siteId").val();
    if(parseInt(currpage)<parseInt(totalPage)){
        currpage=parseInt(currpage)+1;
    }else{
        currpage=totalPage;
    }
    location.href=contextPath+'creative/tCourseSiteRole?siteId='+siteId+'&currpage='+currpage;

}
//删除角色
/*function deleteRole(){
    var siteId=$("#siteId").val();
    var roleId = $("#roleId").val();
    if(confirm("确认删除吗")){
        location.href=contextPath +'creative/deleteRole?roleId='+roleId+'&siteId='+siteId;
    }
    else{
        return;
    }
}*/
function deleteRole(siteId,roleId){
    layer.confirm('确定要删除吗？',{icon:3,title:'提示'},function (index) {
        location.href=contextPath +'/course/deleteRole?siteId='+siteId+'&roleId='+roleId;
    });
}
//删除角色里的成员
function deleteRoleStudent(){
    var id=$("#id").val();
    var roleId = $("#roleId").val();
    if(confirm("确认删除吗")){
        location.href=contextPath +'creative/deleteRoleStudent?id='+id+'&roleId='+roleId;
    }
    else{
        return;
    }
}
<!--文件下载按钮-->
function downloadFile(Id){
    location.href=contextPath +'creative/downloadTeachFile?id='+Id;
}

//删除小组里的成员
/*
function deleteGroupStudent(){
    var id=$("#id").val();
    var groupId = $("#groupId").val();
    if(confirm("确认删除吗")){
        location.href=contextPath +'creative/deleteGroupStudent?id='+id+'&groupId='+groupId;
    }
    else{
        return;
    }
}*/

function deleteGroupDocumen(wkUploadId,groupId) {
    if(confirm("是否确认删除？")){
        location.href=contextPath+'/creative/deleteGroupDocument?wkUploadId='+folderId+'&groupId='+groupId;
        return true;
    }else{
        return false;
    }
}
function deleteCommen(id,groupId) {
    if(confirm("是否确认删除？")){
        location.href=contextPath+'/creative/deleteComments?id='+id+'&groupId='+groupId;
        return true;
    }else{
        return false;
    }
}


function deleteExpertComment(id,groupId) {
    if(confirm("是否确认删除？")){
        location.href=contextPath+'/creative/deleteExpertComment?id='+id+'&groupId='+groupId;
        return true;
    }else{
        return false;
    }
}

function deleteJudges(id,groupId) {
    if(confirm("是否确认删除？")){
        location.href=contextPath+'/creative/deleteJudges?id='+id+'&groupId='+groupId;
        return true;
    }else{
        return false;
    }
}
function returnViewSendingObject() {
    var siteId=$("#siteId").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'historicalRecords?siteId='+siteId;
}

function deleteCalenda(id) {
    if(confirm("是否确认删除？")){
        location.href=contextPath+'/system/deleteCalendar?id='+id;
        return true;
    }else{
        return false;
    }
}
//首页
function homePageAttendance() {
    var contextPath = /*[[@{/}]]*/'';
    var folderId = $("#folderId").val();
    var attendanceId = $("#attendanceId").val();
  if(folderId!="") {
      location.href = contextPath + 'attendance?folderId=' + folderId + '&currpage=1';
  }else{
      location.href = contextPath + 'attendanceSynchronizationPage?attendanceId=' + attendanceId + '&currpage=1';
  }
}
//上一页
function previousPageAttendance() {
    var contextPath = /*[[@{/}]]*/'';
    var folderId = $("#folderId").val();
    var currpage=$("#currpage").val();
    var attendanceId = $("#attendanceId").val();
    if(currpage>1){
        currpage=parseInt(currpage)-1;
    }else{
        currpage=1;
    }
    if(folderId!="") {
        location.href = contextPath + 'attendance?folderId=' + folderId + '&currpage=' + currpage;
    }else{
        location.href = contextPath + 'attendanceSynchronizationPage?attendanceId=' + attendanceId + '&currpage='+currpage;

    }
}
//下一页
function nextPageAttendance() {
    var currpage=$("#currpage1").val();
    var totalPage=$("#totalPage").val();
    var contextPath = /*[[@{/}]]*/'';
    var folderId = $("#folderId").val();
    var attendanceId = $("#attendanceId").val();
    if(parseInt(currpage)<totalPage){
        currpage=parseInt(currpage)+1;
    }else{
        currpage=totalPage;
    }
    if(folderId!="") {
        location.href = contextPath + 'attendance?folderId=' + folderId + '&currpage=' + currpage;
    }else{
        location.href = contextPath + 'attendanceSynchronizationPage?attendanceId=' + attendanceId + '&currpage='+currpage;

    }
}
//末页
function lastPageAttendance() {
    var folderId = $("#folderId").val();
    var totalPage=$("#totalPage").val();
    var contextPath = /*[[@{/}]]*/'';
    var attendanceId = $("#attendanceId").val();
    if(folderId!="") {
        location.href = contextPath + 'attendance?folderId=' + folderId + '&currpage='+totalPage;
    }else{
        location.href = contextPath + 'attendanceSynchronizationPage?attendanceId=' + attendanceId + '&currpage='+totalPage;

    }
}
function deleteNotice(id) {
    if(confirm("是否确认删除？")){
        location.href=contextPath+'/system/deleteNotices?id='+id;
        return true;
    }else{
        return false;
    }
}
function deleteActivit(activityId,groupId) {
    if(confirm("是否确认删除？")){
        location.href=contextPath+'/creative/deleteActivity?activityId='+activityId +'&groupId=' +groupId;
        return true;
    }else{
        return false;
    }
}
function deleteRol(roleId,siteId) {
    if(confirm("是否确认删除？")){
        location.href=contextPath+'/creative/deleteRole?roleId='+roleId +'&siteId=' +siteId;
        return true;
    }else{
        return false;
    }
}
function deleteGroupStuden(id,groupId) {
    if(confirm("是否确认删除？")){
        location.href=contextPath+'/creative/deleteGroupStudent?id='+id +'&groupId=' +groupId;
        return true;
    }else{
        return false;
    }
}

function deleteGrou(groupId,siteId) {
    if(confirm("是否确认删除？")){
        location.href=contextPath+'/creative/deleteGroup?groupId='+groupId +'&siteId=' +siteId;
        return true;
    }else{
        return false;
    }
}

function deleteGroupDocumen(wkUploadId,groupId) {
    if(confirm("是否确认删除？")){
        location.href=contextPath+'creative/deleteGroupDocument?wkUploadId='+wkUploadId+'&groupId='+groupId;
        return true;
    }else{
        return false;
    }

}
function submitmyform() {
    var re = /^\d*$/;
    var num = $("#totalScore").val();
    if($("#result").val().trim()==""){
        alert("请输入评审结果")
    }else if($("#totalScore").val().trim()=="" || (!re.test(num)) ){
        if($("#totalScore").val().trim()=="") {
            alert("请输入分数");
        }else{
            alert("分数请输入数字形式");
        }
    }else {
        document.form.submit();
    }

}

function funnyboy() {
    var re = /^\d*$/;
    var num = $("#totalScore").val();
     if($("#totalScore").val().trim()=="" || (!re.test(num))){
         if($("#totalScore").val().trim()==""){
             alert("请输入分数");
         }else{
             alert("总分请输入数字形式");
         }
    } else if($("#comment").val().trim()==""){
        alert("请输入评语")
    }else {
        document.form.submit();
    }

}

function submitExpertReview() {
    if($("#totalScore").val().trim()==""){
        alert("请输入分数")
    }else if($("#comment").val().trim()==""){
        alert("请输入评语")
    }else {
        document.form.submit();
    }
}
function NumberCheck(t) {
    var num = $(t).val();
    console.log(num);
    var re = /^\d*$/;   //^匹配字符串开始位置   \d 匹配任意一个十进制数字，等价于[0-9]  * 匹配0次 1次或者多次前面的字符  $匹配字符串的结束位置
    	if(!re.test(num)) {
            alert("请输入数字");
        }


}
function topMove1(chapterId,siteId,moduleType){
    location.href=contextPath+"/knowledge/upchapter?chapterId="+chapterId+"&siteId="+siteId+"&moduleType="+moduleType;
}
//章下移
function bottomMove1(chapterId,siteId,moduleType){
    // var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+"/knowledge/downchapter?chapterId="+chapterId+"&siteId="+siteId+"&moduleType="+moduleType;
    // location.href=contextPath+'downchapter?chapterId='+chapterId+'&siteId='+siteId+'&moduleType='+moduleType;
}
//学习行为改变时间段
function editDays() {
    var days = $("#visitByDateDaysSelect").val();
    var siteId = $("#siteId").val();
    location.href=contextPath+"/manage/behaviorScore?siteId="+siteId+"&days="+days;
}
function homePageVisitNum(){
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'visitNum?currpage=1';
}
function  previousPageVisitNum() {
    var contextPath = /*[[@{/}]]*/'';
    var currpage=$("#currpage").val();
    var totalPage=$("#totalPage").val();
    if(currpage>1){
        currpage=parseInt(currpage)-1;
    }else{
        currpage=1;
    }
    location.href=contextPath+'visitNum?currpage='+currpage;
}
function nextPageVisitNum(){
    var contextPath = /*[[@{/}]]*/'';
    //下一页
    var currpage=$("#currpage").val();
    var totalPage=$("#totalPage").val();
    if(parseInt(currpage)<parseInt(totalPage)){
        currpage=parseInt(currpage)+1;
    }else{
        currpage=totalPage;
    }
    location.href=contextPath+'visitNum?currpage='+currpage;
}
function lastPageVisitNum() {
    var contextPath = /*[[@{/}]]*/'';
    var totalPage=$("#totalPage").val();
    location.href=contextPath+'visitNum?currpage='+totalPage;
}
function jumpToVisitNum(page){
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'visitNum?currpage='+page;
}

function homePageVisitMember(){
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'visitMember?currpage=1';
}
function  previousPageVisitMember() {
    var contextPath = /*[[@{/}]]*/'';
    var currpage=$("#currpage").val();
    var totalPage=$("#totalPage").val();
    if(currpage>1){
        currpage=parseInt(currpage)-1;
    }else{
        currpage=1;
    }
    location.href=contextPath+'visitMember?currpage='+currpage;
}
function nextPageVisitMember(){
    var contextPath = /*[[@{/}]]*/'';
    //下一页
    var currpage=$("#currpage").val();
    var totalPage=$("#totalPage").val();
    if(parseInt(currpage)<parseInt(totalPage)){
        currpage=parseInt(currpage)+1;
    }else{
        currpage=totalPage;
    }
    location.href=contextPath+'visitMember?currpage='+currpage;
}
function lastPageVisitMember() {
    var contextPath = /*[[@{/}]]*/'';
    var totalPage=$("#totalPage").val();
    location.href=contextPath+'visitMember?currpage='+totalPage;
}
function jumpToVisitMember(page){
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'visitMember?currpage='+page;
}
$(function() {
    var contextPath = /*[[@{/}]]*/'';
    var deviceNumber = $("#deviceNumber").val();
    var deviceName = $("#deviceName").val();
    var deviceAddress = $("#deviceAddress").val();
    layui.use(['laypage', 'layer', 'form'], function () {
        var laypage = layui.laypage
            , layer = layui.layer;
        var form = layui.form;
        laypage.render({
            elem: 'newPagePropertylist'
            , count: $("#totalRecords").val()
            , layout: ['count', 'prev', 'page', 'next', 'skip']
            , limit: 20
            , jump: function (obj, first) {

                var curr = obj.curr;
                $("#currpage").val(curr);
                //渲染数据
                if (!first) {
                    $.ajax({
                        async: false,
                        data: {
                            'currpage': curr,
                            'deviceNumber': deviceNumber,
                            'deviceName': deviceName,
                            'deviceAddress': deviceAddress
                        },
                        url: contextPath + "systemPropertyList",
                        dataType: 'json',
                        type: "POST",
                        success: function (res) {
                            var str1 = "";
                            var auth = new Array();
                            $("#testProperty").empty();
                            for (var i = 0; i < res.length; i++) {
                                str1 = "<tr>" +
                                    "<td>" + res[i].deviceNumber + "</td>" +
                                    "<td>" + res[i].deviceName + "</td>" +
                                    "<td>" + res[i].devicePattern + "</td>" +
                                    "<td>" + res[i].deviceFormat + "</td>" +
                                    "<td>" + res[i].deviceAddress + "</td>" +
                                    "<td> <a class='layui-btn layui-btn-xs' onclick=mergeDevice('"+ res[i].deviceNumber+"')>修改</a>" +
                                    "<button class='layui-btn layui-btn-xs layui-btn-danger' type='button' title='删除' onclick=deleteSchoolDevic('"+res[i].deviceNumber+"');>删除</button>";
                                str1 += "</td></tr>";
                                $("#testProperty").append(str1);
                            }
                        }
                    })
                }
            }
        })
    })
})
function mergeDevice(deviceNumber) {
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'editSchoolDevice?deviceNumber='+deviceNumber;
}

function setGroupMark(username) {
    layer.open({
        type: 1,
        title: false,
        closeBtn: 1,
        shadeClose: true,
        skin: 'yourclass',
        content: $("#groupMarkBox")
    });
    $('#username').val(username);
}

function submitMark() {
    $("#groupMark").submit();
    layer.closeAll();
}
