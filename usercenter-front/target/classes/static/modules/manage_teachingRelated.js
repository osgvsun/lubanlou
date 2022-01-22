/** layuiAdmin.std-v1.2.1 LPPL License By http://www.layui.com/admin/ */ ;
var role=GetQueryString("currentShowRole");
var dataObject=JSON.parse(localStorage['tree']).nextLevelConfigSet;
var currentUserRoleName=JSON.parse(localStorage['role']).roleList[0].roleName;
//获取此时的一级栏目id
var beWarrantMenuId;
//获取被分配的管理员栏目id
for(var i=0;i<dataObject.length;i++){
    if(dataObject[i].config.name === "教学成果管理"&&dataObject[i].config.admin==1){
        beWarrantMenuId=dataObject[i].config.id;
    }
}
var education_projectInfoUid = '';
var education_awardInfoUid = '';
var book_publishInfoUid = '';
for(var i=0;i<dataObject.length;i++) {
    if (dataObject[i].config.name === "教学成果管理"&&dataObject[i].config.admin!=1) {
        var personTree = dataObject[i].nextLevelConfigSet;
        for (var j = 0; j < personTree.length; j++) {
            if (personTree[j].config.tableName=='user_education_project_info'){
                education_projectInfoUid = personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_education_award_info'){
                education_awardInfoUid = personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_book_publish_info'){
                book_publishInfoUid = personTree[j].config.id;
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
    layui.use(["table",'element','laydate'], function () {
        var e = (layui.$, layui.table);
        var $ = layui.jquery
            ,element = layui.element,
            layer=layui.layer,
        laydate=layui.laydate; //Tab的切换功能，切换事件监听等，需要依赖element模块
        e.render({
            elem: "#teachingRelatedInfo"
            ,url: userCenterHost+'/statisticAllUserEducationProject'
            ,method:'GET',
            where:{
                role:role
            }
            ,title: '基本信息',
            cellMinWidth: 100,
            cols: [
                [
                    {title:'序号', width:100,  type:"numbers"},{
                    field: 'employeeNo', title: '教工号', width: 100, sort: true,align: 'center'},
                    {field: 'cname', title: '姓名', width: 80,align: 'center'},
                    {field: 'college', title: '学院', width: 180,align: 'center'},
                    {field: 'projectCountOfTakePartIn', title: '参与教学项目', width: 180,align: 'center'},
                    {field: 'projectCountOfCharge', title: '负责教学项目', width: 180,align: 'center'},
                    {field: 'awardCount', title: '教学获奖', width: 180,align: 'center'},
                    {field: 'teachingMaterialCountOfTakePartIn', title: '参与编写教材',width: 150,align: 'center'},
                    {field: 'teachingMaterialCountOfPrimary', title: '主编教材',width: 150,align: 'center'},
                    {field: 'totalWordCount', title: '承担总次数',align: 'center'},
                    {field:'username',title:'用户名',hide:true},
                    {fixed: 'right', title: '操作', align: 'center', toolbar: '#teachingRelatedInfo_edit',width: 300}
                ]
            ],
            page: true,
            limits:[10,20,30,40,50,60,70,80,90,200],
            skin: "line"
        });

        e.on('tool(teachingRelatedInfo)', function(obj){
            var data = obj.data;
            if(obj.event=='eduprojecttabAdd'){
                var date = new Date().getTime();
                var name =data.cname+"的教学项目信息" ;
/*                var oDiv=document.getElementsByClassName("eduprojectinfo");
                console.log(oDiv[0]);
                var url=oDiv[0].innerHTML;*/
                var url='tabContent/teachingInfo/eduProjectInfo?username='+data.username+'&showConfigUid='+education_projectInfoUid+'&changeRole='+role;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content:' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date //实际使用一般是规定好的id，这里以时间戳模拟下
                });
                element.tabChange('component-tabs-brief',date);

            }
            if(obj.event=='eduawardtabAdd'){
                var date = new Date().getTime();
                var name =data.cname+"的教学获奖信息" ;
/*                var oDiv=document.getElementsByClassName("eduawardinfo");
                console.log(oDiv[0]);
                var url=oDiv[0].innerHTML;*/
                var url='tabContent/teachingInfo/eduawardInfo?username='+data.username+'&showConfigUid='+education_awardInfoUid+'&changeRole='+role;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content:' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date//实际使用一般是规定好的id，这里以时间戳模拟下
                });
                element.tabChange('component-tabs-brief',date);

            }
            if(obj.event=='textbookpublishtabAdd'){
                var date = new Date().getTime();
                var name =data.cname+"的教材出版信息" ;
/*                var oDiv=document.getElementsByClassName("textbookpublishinfo");
                console.log(oDiv[0]);
                var url=oDiv[0].innerHTML;*/
                var url='tabContent/teachingInfo/textbookPublishInfo?username='+data.username+'&showConfigUid='+book_publishInfoUid +'&changeRole='+role;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content:' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date //实际使用一般是规定好的id，这里以时间戳模拟下
                });
                element.tabChange('component-tabs-brief',date);

            }
        });
        active = {
            reload: function () {
                var cnameReload = $('#cname');
                var employeeNoReload = $('#employeeNo');

                //执行重载
                e.reload('teachingRelatedInfo', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                            cname: cnameReload.val(),
                            employeeNo:employeeNoReload.val()
                    }
                });
            },
            //根据所分配的教师还是学生的数据的管理权限完成表格数据切换
            warrantTypeChange:function () {
                var beChooseManageRoleType=$(this).val();
                //根据查询条件尽享表格数据重载
                e.reload('teachingRelatedInfo', {
                    where: {
                        role:beChooseManageRoleType
                    }
                });
            }

        };

        $('.teachingInput .layui-btn').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
    }), e("manage_teachingRelated", {})
});