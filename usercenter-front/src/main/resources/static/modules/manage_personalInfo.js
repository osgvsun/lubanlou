/** layuiAdmin.std-v1.2.1 LPPL License By http://www.layui.com/admin/ */ ;
var role=GetQueryString("currentShowRole");
var dataObject=JSON.parse(localStorage['tree']).nextLevelConfigSet;
var currentUserRoleName=JSON.parse(localStorage['role']).roleList[0].roleName;
//获取此时的一级栏目id
var beWarrantMenuId;
//获取被分配的管理员栏目id
for(var i=0;i<dataObject.length;i++){
     if(dataObject[i].config.name === "个人基本情况管理"&&dataObject[i].config.admin==1){
     beWarrantMenuId=dataObject[i].config.id;
 }
}
for(var i=0;i<dataObject.length;i++) {
    if (dataObject[i].config.name === "个人基本情况管理"&&dataObject[i].config.admin!=1) {
        var personTree = dataObject[i].nextLevelConfigSet;
        for (var j = 0; j < personTree.length; j++) {
            if(personTree[j].config.tableName=='user_info'){
                var basicInfoUid=personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_position_info'){
                var postInfoUid = personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_talent_info'){
                var talentInfoUid = personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_administration_info'){
                var administrationInfoUid = personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_tutor_info'){
                var tutorInfoUid = personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_academic_info'){
                var academicInfoUid = personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_personnel_category_info'){
                var personnelCategoryUid = personTree[j].config.id;
            }
        }
        break;
    }
}
if(currentUserRoleName!='ROLE_ADMIN'){
    //非管理员权限登录时获取被分配的管理权限type值
    $.ajax({
        url:userCenterHost+'/getUserMenuConfig',
        type:'GET',
        dataType:'json',
        data:{
            username:currentUsername,
            menuId:beWarrantMenuId
        },
        success:function (res) {
            if(!res.code){
                var dataType=res.data;
                for(var i=0;i<dataType.length;i++){
                    if(dataType[i]=='ROLE_TEACHER'||dataType[i]=='ROLE_STUDENT'){
                        $("."+dataType[i]).show();
                    }
                }
            }
        }
    });
}
layui.define(function(e) {
    layui.use(["table","element",'laydate','form'], function () {
        var e = (layui.$, layui.table);
        var $ = layui.jquery
            ,element = layui.element,
            form = layui.form,
            layer = layui.layer,
        laydate=layui.laydate; //Tab的切换功能，切换事件监听等，需要依赖element模块

        //获取人员状态下拉框信息
        $.ajax({
            url: userCenterHost + '/dropDownBoxController/getPersonState',
            type: 'GET',
            async: false,
            success: function (res) {
                if(!res.code){
                    var data=res.data;
                    for (var i = 0; i < data.length; i++) {
                        var option = '<option value="' + data[i].peopleState + '">' + data[i].peopleState + '</option>';
                        $("#peopleState").append(option);
                    }
                    $("#peopleState").append('<option value="全部">全部</option>');
                }
                else{
                    alert(res.msg);
                }
            }
        });


        e.render({
            elem: "#basicInfo"
            ,url: userCenterHost + '/statisticAllTeacherBasicInfo',
            where:{
                role:role
            }
            ,method:'GET',
            title: '基本信息',
            cellMinWidth: 100,
            cols: [
                [   {title:'序号', type:'numbers',width:100,align: 'center'},
                    {field: 'employeeNo', title: '教工号', width: 100, sort: true,align: 'center'},
                    {field: 'cname', title: '姓名', width: 80,align: 'center'},
                    {field: 'gender', title: '性别', width: 80,align: 'center'},
                    {field: 'birth', title: '出生年月', width: 150,align: 'center'},
                    {field: 'nativePlace', title: '籍贯', width: 100,align: 'center'},
                    {field:'username',title:'用户名',hide:true},
                    {fixed: 'right', title: '操作', align: 'center', toolbar: '#basicInfo_edit',width: 550}
                ]
            ],
            parseData:function(e){
                console.log(e);
            },
            page: true,
            limit: 20,
            limits:[10,20,30,40,50,60,70,80,90,200],
            skin: "line"
        });
        e.on('tool(basicInfo)', function(obj){
            var data = obj.data;
            if(obj.event=='basictabAdd'){
                var date = new Date().getTime();
                var name =data.cname+"的基本信息" ;
                var url='tabContent/personInfo/basicInfo?username='+data.username+'&showConfigUid='+basicInfoUid+'&changeRole='+role;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content: ' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date //实际使用一般是规定好的id，这里以时间戳模拟下
                });
                element.tabChange('component-tabs-brief',date);

            }
            if(obj.event=='posttabAdd'){
                var date = new Date().getTime();
                var name =data.cname+"的职称信息" ;
                var url='tabContent/personInfo/postInfo?username='+data.username+'&showConfigUid='+postInfoUid+'&changeRole='+role;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content: ' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date //实际使用一般是规定好的id，这里以时间戳模拟下
                });
                element.tabChange('component-tabs-brief',date);

            }
            if(obj.event=='personnelCategoryAdd'){
                var date = new Date().getTime();
                var name =data.cname+"的人事信息" ;
                var url='tabContent/personInfo/personnelCategory?username='+data.username+'&showConfigUid='+personnelCategoryUid+'&changeRole='+role;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content: ' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date //实际使用一般是规定好的id，这里以时间戳模拟下
                });
                element.tabChange('component-tabs-brief',date);

            }
            if(obj.event=='talenttabAdd'){
                var date = new Date().getTime();
                var name =data.cname+"的人才信息" ;
                var url='tabContent/personInfo/talentInfo?username='+data.username+'&showConfigUid='+talentInfoUid+'&changeRole='+role;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content: ' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date //实际使用一般是规定好的id，这里以时间戳模拟下
                });
                element.tabChange('component-tabs-brief',date);

            }
            if(obj.event=='administrationtabAdd'){
                var date = new Date().getTime();
                var name =data.cname+"的职务信息" ;
                var url='tabContent/personInfo/administrationInfo?username='+data.username+'&showConfigUid='+administrationInfoUid+'&changeRole='+role;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content:' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date //实际使用一般是规定好的id，这里以时间戳模拟下
                });
                element.tabChange('component-tabs-brief',date);

            }
            if(obj.event=='tutortabAdd'){
                var date = new Date().getTime();
                var name =data.cname+"的导师信息" ;
                var url='tabContent/personInfo/tutorInfo?username='+data.username+'&showConfigUid='+tutorInfoUid +'&changeRole='+role;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content:' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date //实际使用一般是规定好的id，这里以时间戳模拟下
                });
                element.tabChange('component-tabs-brief',date);

            }
            if(obj.event=='academictabAdd'){
                var date = new Date().getTime();
                var name =data.cname+"的学术兼职信息" ;
                /*                var oDiv=document.getElementsByClassName("layui-tab-academicitem");
                                console.log(oDiv[0]);
                                var url=oDiv[0].innerHTML;*/
                var url='tabContent/personInfo/academicInfo?username='+data.username+'&showConfigUid='+academicInfoUid+'&changeRole='+role;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content:' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date //实际使用一般是规定好的id，这里以时间戳模拟下
                });
                element.tabChange('component-tabs-brief',date);

            }
        });
        //查询功能
        active = {
            reload: function () {
                var cnameReload = $('#cname');
                var employeeNoReload = $('#employeeNo');
                var state = $('#peopleState');
                //执行重载
                e.reload('basicInfo', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                            cname: cnameReload.val(),
                            employeeNo:employeeNoReload.val(),
                            state : state.val()
                    }
                });
            },
            //根据所分配的教师还是学生的数据的管理权限完成表格数据切换
            warrantTypeChange:function () {
                var beChooseManageRoleType=$(this).val();
                //根据查询条件尽享表格数据重载
                e.reload('basicInfo', {
                    where: {
                       role:beChooseManageRoleType
                    }
                });
            }
        };
        $('.personalInput .layui-btn').on('click', function(){
            var othis = $(this), type = othis.data('type');
            active[type] ? active[type].call(this, othis) : '';
        });
        }), e("manage_personalInfo", {})

});


