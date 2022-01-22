layui.use(['laypage', 'layer', 'table', 'element', 'form'], function() {
    var layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form

    //向世界问个好
    layer.msg('进入小节资源');
    form.render(null, 'sectionlistbox');


    var knowledge = new Vue({
        el: '#sectionlistbox',
        data() {
            return {
                knowledgeList: [],
            }
        },
        created() {
            this.getKnowledgeData();
        },
        methods: {
            getKnowledgeData:function () {
                let that =this
                let knowledgeData=[]
                $.ajax({
                    type: "get",
                    url : "../modules/teachResource/knowledgeData.json",
                    dataType :"json",
                    success:function(data){
                        knowledgeData=data.data
                        that.knowledgeList=knowledgeData
                    },
                    error:function () {

                    }
                })
            },
            //打开视频列表
            toVideo:function (id) {
                window.location.href='../teachResource/videoList?id='+id
            },
            //打开图片列表
            toPicture:function (id) {
                window.location.href='../teachResource/pictureList?id='+id
            },
            //打开文件列表
            toFile:function (id) {
                window.location.href='../teachResource/fileList?id='+id
            },
            //打开链接列表
            toLink:function (id) {
                window.location.href='../teachResource/linkList?id='+id
            },

            //新增
            newsection: function() {
                var that = this;
                //多窗口模式，层叠置顶
                var index = layer.open({
                    type: 2 //此处以iframe举例
                    ,
                    title: '新增章',
                    area: ['500px', '440px'],
                    shade: 0.5,
                    maxmin: true,
                    content: 'newsection',
                    zIndex: layer.zIndex //重点1
                    ,
                    success: function(layero) {
                        layer.setTop(layero); //重点2
                    },
                    btn: ['保存',  '取消'],
                    yes: function(index, layero) {
                        //点击确认触发 iframe 内容中的按钮提交
                        var submit = layero.find('iframe').contents().find("#newchapterbtn");
                        submit.click();
                    },
                    cancel: function () {
                        that.getKnowledgeData();
                    }
                });
                layer.full(index);
            },

            //编辑
            editsection: function(id) {
                var that = this;
                //多窗口模式，层叠置顶
                var index = layer.open({
                    type: 2 //此处以iframe举例
                    ,
                    title: '编辑章',
                    area: ['500px', '440px'],
                    shade: 0.5,
                    maxmin: true,
                    content: 'newsection?sectionId='+id,
                    zIndex: layer.zIndex //重点1
                    ,
                    success: function(layero) {
                        layer.setTop(layero); //重点2
                    },
                    btn: ['保存', '取消'],
                    yes: function(index, layero) {
                        //点击确认触发 iframe 内容中的按钮提交
                        var submit = layero.find('iframe').contents().find("#newchapterbtn");
                        submit.click();
                    },
                    cancel: function () {
                        that.getKnowledgeData();
                    }
                });
                layer.full(index);
            },
            //删除节
            delsection: function(id) {
                layer.confirm('是否删除？', {
                    title: '提示'
                }, function (index) {
                    $.ajax({
                        //url: httpBaseUrl + '/views/deleteExamApi',
                        type: 'GET',
                        data: {"tAssignmentId": data.id},
                        success: function (data) {
                            if (data) {
                                obj.del();
                                layer.close(index);
                                layer.msg("删除成功", {icon: 6});
                                layui.table.reload('filelist');
                            } else {
                                layer.msg("删除失败", {icon: 5});
                            }
                        }
                    })
                    layer.close(index);
                });
            },
            //节上移
            upsection: function(id) {
                layer.confirm('是否删除？', {
                    title: '提示'
                }, function (index) {
                    $.ajax({
                        //url: httpBaseUrl + '/views/deleteExamApi',
                        type: 'GET',
                        data: {"tAssignmentId": data.id},
                        success: function (data) {
                            if (data) {
                                obj.del();
                                layer.close(index);
                                layer.msg("删除成功", {icon: 6});
                                layui.table.reload('filelist');
                            } else {
                                layer.msg("删除失败", {icon: 5});
                            }
                        }
                    })
                    layer.close(index);
                });
            },
            //节下移
            downsection: function(id) {
                layer.confirm('是否删除？', {
                    title: '提示'
                }, function (index) {
                    $.ajax({
                        //url: httpBaseUrl + '/views/deleteExamApi',
                        type: 'GET',
                        data: {"tAssignmentId": data.id},
                        success: function (data) {
                            if (data) {
                                obj.del();
                                layer.close(index);
                                layer.msg("删除成功", {icon: 6});
                                layui.table.reload('filelist');
                            } else {
                                layer.msg("删除失败", {icon: 5});
                            }
                        }
                    })
                    layer.close(index);
                });
            },

        },
        updated() {
            form.render()
        }
    })


});