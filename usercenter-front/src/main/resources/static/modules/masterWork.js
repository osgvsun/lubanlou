layui.define(function (e) {
    layui.use(['index', 'form', 'laydate','table'], function() {
        var $ = layui.$,
            admin = layui.admin,
            element = layui.element,
            layer = layui.layer,
            laydate = layui.laydate,
            form = layui.form,
            table=layui.table;
        $(document).ready(function(){
            var dataObject=JSON.parse(localStorage['tree']).nextLevelConfigSet;
            var role=JSON.parse(localStorage['role']).roleList[0].roleName;
            var userId = JSON.parse(localStorage['role']).id;
            for(var i=0;i<dataObject.length;i++){
                if(dataObject[i].config.name=="文章专利管理"&&dataObject[i].config.admin!=1)
                {
                    if(role=='ROLE_TEACHER'||role=='ROLE_STUDENT'){
                        if(dataObject[i].config.adminSetting==1||dataObject[i].config.selfSetting==1){
                            var personTree=dataObject[i].nextLevelConfigSet;
                            for (var j = 0; j < personTree.length; j++) {
                                if (personTree[j].config.adminSetting==1||personTree[j].config.selfSetting==1) {
                                    $('#'+personTree[j].config.tableName).css("display","block");
                                    var level3 = personTree[j].nextLevelConfigSet;
                                    var tableField=[{title:'序号', width:100,  type:"numbers"}] ;
                                    for (var k = 0; k < level3.length; k++) {
                                        if(level3[k].config.adminSetting==1||level3[k].config.selfSetting==1){
                                            if(level3[k].config.field=='transformSituation'){
                                                tableField.push({
                                                    field: level3[k].config.field,
                                                    title: level3[k].config.name,
                                                    align: 'center',
                                                    width: '120',
                                                    templet: function(d){
                                                       var data=d.transformSituation;
                                                        if(d.transformSituation=='0'){
                                                            data='否';
                                                        }
                                                        if(d.transformSituation=='1'){
                                                            data='是';
                                                        }
                                                        return data;
                                                    }
                                                });
                                            }
                                            else {
                                                tableField.push({field: level3[k].config.field, title:level3[k].config.name, align:'center',width:'120'});
                                            }

                                            $("."+level3[k].config.field).parent().parent().show();
                                            var editField=document.getElementsByName(level3[k].config.field);
                                            for(var r=0;r<editField.length;r++)
                                            {
                                                if(level3[k].config.edit == 0||level3[k].config.edit == 1){
                                                    editField[r].disabled=true
                                                }
                                            }
                                        }
                                        else{
                                            $("."+level3[k].config.field).removeAttr("lay-verify");
                                        }
                                    }
                                    var table1 = personTree[j].config.tableName;
                                    if (table1 == 'user_master_work_info') {
                                        tableField.push({fixed: 'right', title: '操作',align: 'center', toolbar: '#edit1',width:200});
                                        table.render({
                                            elem: '#masterWorkInfo'
                                            ,url: userCenterHost+'/getUserMasterWorkInfo'
                                            ,method:'post'
                                            ,where:{
                                                userId: userId
                                            },
                                            parseData: function (result) {
                                                var filterData = result.data.filter((d) => {
                                                    return d.publicationTime = d.publicationTime.split('-')[0];
                                                });
                                                return {
                                                    "code": 0,
                                                    "data": filterData
                                                };
                                            }
                                            ,cols: [tableField]
                                            //,skin: 'line' //表格风格
                                            ,even: true
                                            ,page: false //是否显示分页
                                            //,limits: [5, 7, 10]
                                            //,limit: 5 //每页默认显示的数量
                                        });
                                    }
                                    if (table1 == 'user_authorized_patent_info') {
                                        tableField.push({fixed: 'right', title: '操作',align: 'center', toolbar: '#edit2',width:200});
                                        table.render({
                                            elem: '#authorizedPatentInfo'
                                            ,url: userCenterHost+'/getUserAuthorizedPatentInfo'
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
                                    }
                                }
                            }
                        }
                    }
                    break;
                }
            }
        });

        //代表作发表时间
        laydate.render({
            elem: '#publicationTime_add',
            type: 'year'
        });
        laydate.render({
            elem: '#publicationTime',
            type: 'year'
        });

        //授权专利获批年份
        laydate.render({
            elem: '#patentTime_add',
            type: 'year'
        });
        laydate.render({
            elem: '#patentTime',
            type: 'year'
        });

        /* 监听提交 */
        form.on('submit(masterWorkInfo)', function(data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                ,btn: ['确定','取消'] //按钮
                ,yes:function(){
                    $(".clearForm").trigger("click");
                    $("#masterInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    $("#masterInfoAdd").hide();
                    layer.closeAll();
                    var field=data.field;
                    field['username']=currentUsername;
                    admin.req({
                        url: userCenterHost + '/saveUserMasterWorkInfo',
                        data:field,
                        dataType: 'json',
                        method: 'POST'
                        ,success: function(res){
                            if(!res.code){
                                parent.layer.alert("提交成功！");
                                table.reload('masterWorkInfo');
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
        form.on('submit(authorizedPatentInfo)', function(data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                ,btn: ['确定','取消'] //按钮
                ,yes:function(){
                    $(".clearForm").trigger("click");
                    $("#authorizedPatentInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    $("#authorizedPatentInfoAdd").hide();
                    layer.closeAll();
                    var field=data.field;
                    field['username']=currentUsername;
                    admin.req({
                        url: userCenterHost + '/saveUserAuthorizedPatentInfo',
                        data:field,
                        dataType: 'json',
                        method: 'POST'
                        ,success: function(res){
                            if(!res.code){
                                parent.layer.alert("提交成功！");
                                table.reload('authorizedPatentInfo');
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
        //监听代表作编辑
        table.on('tool(masterWorkInfo)', function(obj){
            var data = obj.data;
            if(obj.event == 'detail'){
                layer.msg('ID：'+ data.id + ' 的查看操作');
            }
            else if(obj.event == 'del'){
                layer.confirm('真的删除行么', function(index){
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/deleteUserMasterWorkInfo',
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
                var edit_div='#masterWorkInfo_uid';
                editStandard(data,edit_div);
                form.render();
                layer.open({
                    type: 1
                    ,title:'编辑'
                    ,area: ['60%', '50%']
                    ,id: 'layerDemo1' //防止重复弹出
                    ,content: $('#edit_masterWorkInfo')
                    ,btnAlign: 'c' //按钮居中
                    ,shade: 0 //不显示遮罩
                    ,yes: function(){
                        layer.closeAll();
                    }
                });
            }
        });
        //监听授权专利信息编辑
        table.on('tool(authorizedPatentInfo)', function(obj){
            var data = obj.data;
            if(obj.event == 'detail'){
                layer.msg('ID：'+ data.id + ' 的查看操作');
            }
            else if(obj.event == 'del'){
                layer.confirm('真的删除行么', function(index){
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/deleteUserAuthorizedPatentInfo',
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
                var edit_div='#authorizedPatentInfo_uid';
                editStandard(data,edit_div);
                for (var i = 0; i < Object.entries(data).length; i++) {
                    if(Object.entries(data)[i][0]=='transformSituation'){
                        $("input[name='transformSituation'][value='"+Object.entries(data)[i][1]+"']").attr("checked",true);
                        if(Object.entries(data)[i][1]==0){
                            $(".transferAmount").hide();
                        }
                    }
                }
                form.render();
                layer.open({
                    type: 1
                    ,title:'编辑'
                    ,area: ['60%', '50%']
                    ,id: 'layerDemo2'//防止重复弹出
                    ,content: $('#edit_authorizedPatentInfo')
                    ,btnAlign: 'c' //按钮居中
                    ,shade: 0 //不显示遮罩
                    ,yes: function(){
                        layer.closeAll();
                    }
                });
            }
        });
        /*
    * 下拉框数据读取显示
    * */

        //本人角色
        $.ajax({
            url:userCenterHost+'/dropDownBoxController/getCharacter',
            type:'GET',
            data:{fromMasterWork:'true'},
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

        })

    });
    e('masterWork',{});
});



$(".header_edit").click(
	function() {
		$(this).hide();
		$(this).parents().siblings(".layui-card-body").find(".detail_item").hide();
		$(this).parents().siblings(".layui-card-body").find(".fill_box").slideDown();
	}
);

$(".edit_hide").click(
	function() {
		$(this).parents().parents().parents().parents().parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
		$(this).parents().parents().parents().parents(".fill_box").hide();
		$(this).parents().parents().parents().parents().siblings(".detail_item").fadeIn();
	}
);

$(".tstrue").click(
	function() {
		$(".transferAmount").show();
	}
);
$(".tsfalse").click(
	function() {
        $(".transferAmount").removeAttr("lay-verify");
        $(".transferAmount").val('');
		$(".transferAmount").hide();
	}
);
var user=$("input[name='username']") ;
user.each(function(){
    $(this).val(currentUsername);
});