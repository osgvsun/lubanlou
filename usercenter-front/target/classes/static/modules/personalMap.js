layui.define(function (e) {
    layui.use(['index', 'form', 'laydate', 'table', 'upload','element'], function () {
        var $ = layui.$,
            admin = layui.admin,
            layer = layui.layer,
            laydate = layui.laydate,
            form = layui.form,
            upload = layui.upload,
            table = layui.table,
            element = layui.element;
        var e = (layui.$, layui.table);
        e.render({
            elem: "#courseInfo",
            url: teachHost+"userCenter/getPersonalCourseSite",
            parseData: function(res){ //res 即为原始返回的数据
                res={
                    "code":0,
                    "data":res
                }
                return {

                    "code": res.code,
                    "data":res.data
                }
            },
            where:{
                username:currentUsername
            },
            method:'GET',
            title: '基本信息',
            cellMinWidth: 100,
            cols: [
                [   {title:'序号', type:'numbers',width:50,align: 'center'},
                    {field: 'cid', title: '课程编号', width: 100, sort: true,align: 'center'},
                    {field: 'siteName', title: '课程名称', width: 200,align: 'center'},
                    {field: 'siteDetail', title: '课程信息', width: 100,align: 'center'},
                    {field: 'cname', title: '授课老师', width: 100,align: 'center'},
                    {fixed: 'right', title: '操作', align: 'center', toolbar: '#courseInfo_edit',width: 200}
                ]
            ],
            page: false,
            limits:[10,20,30,40,50,60,70,80,90,100],
            skin: "line"
        });
        e.on('tool(courseInfo)', function(obj){
            console.log(obj)
            var data = obj.data ;
            if(obj.event=='courseEdit'){
                var date = new Date().getTime();
                var name =data.siteName+"的课程图谱" ;
                // var url='tabContent/personInfo/basicInfo?enterpriseName='+data.enterpriseName+'&showConfigUid='+basicInfoUid+'&changeRole='+role;
                var url="selectedMap?siteId="+data.cid+'&siteName='+data.siteName;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content: ' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="800px"></iframe>'
                    ,id:date //实际使用一般是规定好的id，这里以时间戳模拟下
                });
                element.tabChange('component-tabs-brief',date);

            }

        });
        form.on('submit(courseForm)', function (data) {
            console.log(data)
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                , btn: ['确定', '取消'] //按钮
                , yes: function () {
                    $("#addMenu").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    layer.closeAll();
                    var field=data.field;
                    field.username = currentUsername
                    console.log(field)

                    admin.req({
                        url: teachHost+"userCenter/saveTCourseSite",
                        data: field,
                        method: 'POST',
                        dataType: "text",
                        success: function (res) {
                            if (res=='ok') {
                                parent.layer.alert("提交成功!");
                                $(".clearForm").trigger("click");
                                $("#addMenu").hide();
                                location.reload();
                            }
                            else{
                                console.log(res);
                                parent.layer.alert('保存失败！');
                            }

                        }
                    })
                    // }
                }
            })
            $("#AddBBtn").prop("disabled", true);
            return false;
        });
        $(document).ready(function () {
            $('.header_edit').click(function () {
                $("#AddBBtn").prop("disabled", true);
                $("#addMenu").slideDown();
            })
            $(".edit_hide").click(
                function () {
                    $("#AddBBtn").prop("disabled", false);
                    $("#addMenu").hide();
                }
            );
        });




        /* 自定义验证规则 */
        form.verify({
            title: function (value) {
                if (value.length < 5) {
                    return '标题至少得5个字符啊';
                }
            },
            pass: [/(.+){6,12}$/, '密码必须6到12位'],
            content: function (value) {
                layedit.sync(editIndex);
            }
        });

        /* 监听提交 */
    });
    e('personalMap', {});
});


