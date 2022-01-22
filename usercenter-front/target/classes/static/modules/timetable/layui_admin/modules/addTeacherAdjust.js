layui.config({
    version: '1545041465480' //为了更新 js 缓存，可忽略
});
var contextPath = $("meta[name='contextPath']").attr("content");
var zuulUrl = $("#zuulServerUrl").val() + "/timetable/";
var checked=new Array();
layui.use(['laypage', 'layer', 'table', 'element','form'], function() {
    var admin = layui.admin,
        laypage = layui.laypage //分页
        ,
        layer = layui.layer //弹层
        ,
        table = layui.table //表格
        ,
        form = layui.form  //表单
        ,
        $ = layui.jquery,
        element = layui.element //元素操作

    //向世界问个好
    // layer.msg('进入页面名称');
    //执行一个表单
    table.render({
        elem: '#test',
        // toolbar: '#toolbarDemo', //开启头部工具栏，并为其绑定左侧模板
        // defaultToolbar: [],
        url: zuulUrl + "api/school/apiCourseSchedulingTeacherList",
        title: '教师列表',
        method: 'post',
        contentType: "application/json;charset=UTF-8",
        headers: {Authorization: getJWTAuthority()},
        cellMinWidth: 100,
        page: true, //开启分页
        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
            //curr: 5, //设定初始在第 5 页
            groups: 1, //只显示 1 个连续页码
            first: false, //不显示首页
            last: false //不显示尾页
        },
        cols: [
            [ //表头
                {
                    type: 'checkbox',
                    fixed: 'left'
                },
                // {
                //     fixed: 'left',
                //     title: '序号',
                //     type: 'numbers',
                //     width: 50
                // },
                {
                    field: 'text',
                    title: '教师姓名',
                    align: 'center',
                    sort: true
                }, {
                field: 'id',
                title: '工号',
                align: 'center',
                sort: true
            }
            ]
        ],
        id: 'test',
        // data: [],
        skin: 'line', //表格风格
        even: false,
        limits: [5 ,10, 15, 20],
        limit: 5, //每页默认显示的数量
        done: function (res) {
            // 设置换页勾选之前的
            // console.log(checked);
            //在缓存中找到PM_CODE ,然后设置data表格中的选中状态
            //循环所有数据，找出对应关系，设置checkbox选中状态
            for(var i=0;i<res.data.length;i++){
                for(var j=0;j<checked.length;j++){
                    if(res.data[i].id==checked[j].username){
                        //这里才是真正的有效勾选
                        res.data[i]["LAY_CHECKED"]='true';
                        //找到对应数据改变勾选样式，呈现出选中效果
                        var index= res.data[i]['LAY_TABLE_INDEX'];
                        $('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').prop('checked', true);
                        $('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').next().addClass('layui-form-checked');
                    }
                }
            }
        }
    });


    var $ = layui.$,
        active = {
            reload: function() {
                var search = $('#search').val();

                //执行重载
                table.reload('test', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        // key: {
                        search: search
                        // }
                    },
                    contentType: "application/json;charset=UTF-8",
                }, 'data');
            }
        };


    $('.search_line .reload').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    var $ = layui.$,
        save = {
            save: function() {
                // layer.msg('baocun')
                // $.each(checked,function () {
                //
                // });
                // var teachers = checked.join(',');
                parent.$('#teachers').val(JSON.stringify(checked));
                var index1 = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                parent.layer.close(index1); //再执行关闭
            }
        };


    $('.search_line .save').on('click', function() {
        var type = $(this).data('type');
        save[type] ? save[type].call(this) : '';
    });
    table.on('checkbox(test)', function(obj){
        console.log(obj.checked); //当前是否选中状态
        console.log(obj.data); //选中行的相关数据
        console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
        // if(obj.checked){
        if(obj.type == 'all'){
            if(obj.checked) {
                var cache = table.cache['test'];
                for (var j = 0; j < cache.length; j++) {
                    for(var i=checked.length-1;i>-1;i--){
                        if(checked[i].username == cache[j].id){
                            checked.splice(i,1);
                        }
                    }
                }
                for (var i = 0; i < cache.length; i++) {
                    checked.push({username:cache[i].id,cname:cache[i].text});
                }
                // $.cookie("checkedCourse",checked);
            }else {
                var cache = table.cache['test'];
                for (var j = 0; j < cache.length; j++) {
                    for(var i=checked.length-1;i>-1;i--){
                        if(checked[i].username == cache[j].id){
                            checked.splice(i,1);
                        }
                    }
                }
            }
        }else if(obj.type == 'one'){
            if(obj.checked) {
                for(var i=checked.length-1;i>-1;i--){
                    if(checked[i].username == obj.data.id){
                        checked.splice(i,1);

                    }
                }
                checked.push({username:obj.data.id,cname:obj.data.text});
            }else {
                for(var i=checked.length-1;i>-1;i--){
                    if(checked[i].username == obj.data.id){
                        checked.splice(i,1);
                    }
                }
            }
        }
        // }
        console.log(checked);
    });
    //头工具栏事件
    table.on('toolbar(test)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'save':
                var groupId = $("input[name='group']:checked").val();
                if(groupId == undefined){
                    layer.msg('请先选择一个小组!');
                    break;
                }
                $.ajax({
                    // url: weekUrl + "?term=16&weekday=-1",
                    url: zuulUrl + "api/timetable/manage/apiSaveGroupStudentBySelfArrange",
                    headers: {Authorization: getJWTAuthority()},
                    data: JSON.stringify({students: checked,groupId: 0,inGroupId: groupId}),
                    async: false,
                    type: "post",
                    contentType: "application/json;charset=UTF-8",
                    success: function (res) {
                        // console.log(res);
                        if(res){
                            layer.msg('添加成功');
                            table.reload('test',{
                                page: 1,
                                headers: {Authorization: getJWTAuthority()},
                            });
                            checked = [];
                        }

                    },
                    error: function (res) {
                        // layer.msg(res);
                    }
                });
                break;
        };
    });

});
function getJWTAuthority() {
    var authorization ="";
    initDirectoryEngine({
        getHostsUrl:contextPath+"/shareApi/getHosts",
        getAuthorizationUrl:contextPath+"/shareApi/getAuthorization"
    });
    getAuthorization({
        async:false,
        success:function(data){
            authorization =data;
        }
    });
    return authorization;
}