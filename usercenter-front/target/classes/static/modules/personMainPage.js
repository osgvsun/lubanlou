layui.define(function (e) {
    layui.use(['index', 'form'], function (){
        var $ = layui.$,
            layer = layui.layer,
            form = layui.form;

        form.on('submit(editForm)', function (data) {
            var thisId=$(this).parent().attr("id");
            var editor=UE.getEditor("editor"+thisId);
            var editMenuName=data.field.menuName;
            var editMenuContent=editor.getContent();
            $.ajax({
                url:userCenterHost+'/usercenter/cms/editPersonalHomepageMenu',
                type:'POST',
                dataType:'json',
                data:{
                    id:thisId,
                    menuName:editMenuName,
                    content:editMenuContent,
                    username:currentUsername
                },
                success:function (res) {
                    if(!res.code){
                        layer.msg("修改成功！");
                        window.location.reload();
                    }
                    else {
                        console.log(res.msg);
                    }
                },
                fail:function () {
                    alert("修改请求失败！");
                }
            })
            return false;
        });
        $.ajax({
            url:userCenterHost+'/usercenter/cms/getPersonalHomepageMenu',
            type:'GET',
            data:{username: currentUsername},
            dataType:'json',
            success:function (res) {
                if(!res.code){
                    var menuListData=res.data;
                    for(var i=0;i<menuListData.length;i++){
                        var tapMenuHtml=' <div><div class="menuSet">' +
                            '                   <input type="checkbox"  name=\'Check[]\'/> <span id="'+menuListData[i].id+'">'+menuListData[i].menuName+'</span>' +
                            '                   <div class="operate" id="'+menuListData[i].id+'">' +
                            '                       <button type="button" class="layui-btn" onclick="editMenu(this)">编辑</button>' +
                            '                       <button type="button" class="layui-btn" onclick="deleteMenu(this)">删除</button>' +
                            '                   </div>' +
                            '               </div>';
                        $("#menuShow").append(tapMenuHtml);
                    }

                }
                else {
                    console.log(res.content);
                    layer.msg("获取数据失败！")
                }
            }
        })
        active={
            batchDeleteMenu:function () {
                        var checks = $("input[name='Check[]']:checked");
                        if(checks.length == 0){
                            alert('未选中任何项！');
                            return false;
                        }
                        //将获取的值存入数组
                        var checkData = new Array();
                        checks.each(function(){
                            checkData.push($(this).siblings('span').attr('id'));
                            $(this).parent().parent().remove();
                        });
                        alert("选中要删除的id值为:"+checkData);
                        console.log("选中要删除的id值为:"+checkData);
                        //提交数据到后台进行删除
            },
            addMenu:function () {
                $("#addMenu").slideDown();
            }
        };

        $('.operate .layui-btn').on('click', function(){
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
        $('.layui-btn-group .layui-btn').on('click', function(){
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
        $("#checkAll").bind("click",function(){
            $("input[name='Check[]']").prop("checked",this.checked);
        });
    })
    e('personMainPage',{});

})
//编辑栏目信息获取栏目内容
function editMenu (obj) {
    $(".layui-card-body").slideUp();
    var menuName=$(obj).parent().prev().text();
    var thisId=$(obj).parent().attr("id");
    console.log($("#editor"+thisId).length)
    if($("#editor"+thisId).length<=0){
        var content='';
        $.ajax({
            url:userCenterHost+'/usercenter/cms/getPersonalHomepageMenuContent',
            type:'GET',
            dataType:'json',
            data:{
                id:thisId,
            },
            success:function (res) {
                if(!res.code){
                    content=res.data;
                    var html='   <div class="layui-card-body">\n' +
                        '                   <form class="layui-form" action="" lay-filter="editForm">\n' +
                        '                                      <label>栏目名称：</label>\n' +
                        '                   <div class=\'addMenuInput\'>\n' +
                        '                       <input class="layui-input" id="menuName" name="menuName" value="'+menuName+'"/>\n' +
                        '                   </div>   ' +
                        '<div class="editor" id="editor'+thisId+'" style="width:1024px;height:500px;margin: 0 auto"></div>\n' +
                        '                       <div style="width:1024px;margin: 15px auto;text-align: right">\n' +
                        '                           <div class="layui-input-block" id="'+thisId+'">\n' +
                        '                               <button class="layui-btn" lay-submit lay-filter="editForm">立即提交</button>\n' +
                        '                               <button type="reset" class="layui-btn layui-btn-primary edit_hide" onclick="cancelEdit(this)">取消</button>\n' +
                        '                           </div>\n' +
                        '                       </div>\n' +
                        '                   </form>\n' +
                        '               </div>';
                    $(obj).parent().parent().parent().append(html);
                    var ue = UE.getEditor('editor'+thisId, {
                        toolbars: [
                            [
                                'fontfamily', //字体
                                'fontsize', //字号
                                'undo', //撤销
                                'redo', //重做
                                'forecolor', //字体颜色
                                'backcolor', //背景色
                                'background', //背景
                                'bold', //加粗
                                'italic', //斜体
                                'underline', //下划线
                                'strikethrough', //删除线
                                'fontborder', //字符边框
                                '|',
                                'paragraph',
                                'emotion', //表情
                                'superscript', //上标
                                'subscript', //下标
                                'spechars', //特殊字符
                                'customstyle', //自定义标题
                                '|',
                                'justifyleft', //居左对齐
                                'justifycenter', //居中对齐
                                'justifyright', //居右对齐
                                'directionalityltr', //从左向右输入
                                'directionalityrtl', //从右向左输入
                                'rowspacingtop', //段前距
                                'rowspacingbottom', //段后距
                                'lineheight', //行间距
                                '|',
                                'link', //超链接
                                'unlink', //取消链接
                                'inserttable',//表格
                                'simpleupload', //单图上传
                                'insertimage', //多图上传
                                // 'insertvideo', //视频
                                'insertframe', //插入ifream
                                'attachment', //上传附件
                                '|',
                                'imagenone', //默认
                                'imageleft', //左浮动
                                'imagecenter', //居中
                                'imageright', //右浮动
                                'insertorderedlist', //有序列表
                                'insertunorderedlist', //无序列表
                                '|',
                                // 'wordimage', //图片转存
                                'removeformat', //清除格式
                                'formatmatch', //格式刷
                                'autotypeset',//自动排版
                                // 'source', //源代码
                                '|',
                                'print', //打印
                                'preview', //预览
                                'horizontal', //分隔线
                                'time', //时间
                                'date', //日期
                                'fullscreen', //全屏

                            ]
                        ]
                    });
                    var editor=UE.getEditor('editor'+thisId);
                    editor.ready(function(){
                        editor.setContent(content);
                    })
                }
                else {
                    console.log(res.msg);
                }
            },
            fail:function () {
                alert("获取内容请求失败！")
            }
        })
    }
    else{
        console.log($(obj).parent().parent().next());
        $(obj).parent().parent().next().children().slideDown();
        $(obj).parent().parent().next().slideDown();
    }
}
function  addMenu() {
    var menuName=$("#menuName").val();
    var editor=UE.getEditor("editor");
    var menuContent=editor.getContent();
    $.ajax({
        url:userCenterHost+'/usercenter/cms/addPersonalHomepageMenu',
        type:'POST',
        dataType:'json',
        data:{
            menuName:menuName,
            content:menuContent,
            username:currentUsername
        },
        success:function (res) {
            if(!res.code){
                layer.msg("提交成功");
                window.location.reload();

            }
            else {
                console.log(res.msg);
                alert("提交失败！")
            }
        },
        fail:function () {
            alert("新建栏目请求失败！")
        }
    })

}
//取消新增栏目
function cancel() {
        $("#addMenu").slideUp();
}
//删除栏目信息
function deleteMenu(obj) {
    var thisId=$(obj).parent().attr("id");
    $.ajax({
        url:userCenterHost+'/usercenter/cms/deletePersonalHomepageMenu',
        type:'POST',
        dataType:'json',
        data:{
            id:thisId,
            username:currentUsername
        },
        success:function (res) {
            if(!res.code){
               window.location.reload();
            }
            else {
                console.log(res.msg);
            }
        },
        fail:function () {
            alert("删除请求失败！");
        }
    })
    
}

//取消编辑
function cancelEdit(obj) {
    $(obj).parent().parent().parent().slideUp();

}
