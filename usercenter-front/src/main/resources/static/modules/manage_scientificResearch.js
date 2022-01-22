/** layuiAdmin.std-v1.2.1 LPPL License By http://www.layui.com/admin/ */ ;
var role=GetQueryString("currentShowRole");
var dataObject=JSON.parse(localStorage['tree']).nextLevelConfigSet;
var currentUserRoleName=JSON.parse(localStorage['role']).roleList[0].roleName;
//获取此时的一级栏目id
var beWarrantMenuId;
//获取被分配的管理员栏目id
for(var i=0;i<dataObject.length;i++){
    if(dataObject[i].config.name === "科研成果管理"&&dataObject[i].config.admin==1){
        beWarrantMenuId=dataObject[i].config.id;
    }
}
var longitudinal_subjectInfoUid = '';
var horizontal_subjectInfoUid = '';
var research_awardInfoUid = '';
var publicationInfoUid = '';
for(var i=0;i<dataObject.length;i++) {
    if (dataObject[i].config.name === "科研成果管理"&&dataObject[i].config.admin!=1) {
        var personTree = dataObject[i].nextLevelConfigSet;
        for (var j = 0; j < personTree.length; j++) {
            if (personTree[j].config.tableName=='user_longitudinal_subject_info'){
                longitudinal_subjectInfoUid = personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_horizontal_subject_info'){
                horizontal_subjectInfoUid = personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_research_award_info'){
                research_awardInfoUid = personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_publication_info'){
                publicationInfoUid = personTree[j].config.id;
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
            elem: "#scientificResearch"
            ,url: userCenterHost+'/statisticAllUserResearchAward'
            ,method:'GET',
            where:{
                role:role
            },
            title: '科研相关信息',
            cellMinWidth: 100,
            cols: [
                [   {title:'序号', width:100, type:"numbers",align: 'center'},
                    {field: 'employeeNo', title: '教工号', width: 100, sort: true,align: 'center'},
                    {field: 'cname', title: '姓名', width: 80,align: 'center'},
                    {field: 'longitudinalCount', title: '纵向课题项目', width: 130,align: 'center'},
                    {field: 'longitudinalCountOfCharge', title: '纵向课题负责人项目', width: 180,align: 'center'},
                    {field: 'horizontalCount', title: '横向课题项目', width: 130,align: 'center'},
                    {field: 'horizontalCountOfCharge', title: '横向课题负责人项目', width: 180,align: 'center'},
                    {field: 'totalAmountOfHorizontal', title: '横向课题合同总金额', width: 160,align: 'center'},
                    {field: 'awardCount', title: '科研获奖', width: 150,align: 'center'},
                    {field: 'publicationCount', title: '出版专著', width: 130,align: 'center'},
                    {field: 'wordCount', title: '完成总字数',align: 'center'},
                    {field:'username',title:'用户名',hide:true},
                    {fixed: 'right', title: '操作', align: 'center', toolbar: '#scientificResearch_edit', width: 400}
                ]
            ],
            page: true,
            limits:[10,20,30,40,50,60,70,80,90,200],
            skin: "line"
        });




        //科研获奖时间
        laydate.render({
            elem: '#researchAwardTime'
            //,type: 'date' //默认，可不填
        });
        e.on('tool(scientificResearch)', function(obj){
            var data = obj.data;
            if(obj.event=='longitudinalsubjecttabAdd'){
                var date = new Date().getTime();
                var name =data.cname+"的纵向项目信息" ;
/*                var oDiv=document.getElementsByClassName("longitudinalsubjectinfo");
                console.log(oDiv[0]);
                var url=oDiv[0].innerHTML;*/
                var url='tabContent/scientificResearch/longitudinalSubjectInfo?username='+data.username+'&showConfigUid='+longitudinal_subjectInfoUid+'&changeRole='+role;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content:' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date //
                });
                element.tabChange('component-tabs-brief',date);

            }
            if(obj.event=='horizontalsubjecttabAdd'){
                var date = new Date().getTime();
                var name =data.cname+"的横向课题项目信息" ;
/*                var oDiv=document.getElementsByClassName("horizontalsubjectinfo");
                console.log(oDiv[0]);
                var url=oDiv[0].innerHTML;*/
                var url='tabContent/scientificResearch/horizontalSubjectInfo?username='+data.username+'&showConfigUid='+horizontal_subjectInfoUid +'&changeRole='+role;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content:' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date//
                });
                element.tabChange('component-tabs-brief',date);

            }
            if(obj.event=='researchawardtabAdd'){
                var name =data.cname+"的科研获奖信息" ;
/*                var oDiv=document.getElementsByClassName("researchawardinfo");
                console.log(oDiv[0]);
                var url=oDiv[0].innerHTML;*/
                var url='tabContent/scientificResearch/researchAwardInfo?username='+data.username+'&showConfigUid='+research_awardInfoUid+'&changeRole='+role;
                var id=3;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content:' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:id //
                });
                element.tabChange('component-tabs-brief','3');

            }
            if(obj.event=='publicationtabAdd'){
                var name =data.cname+"的出版专著信息" ;
/*                var oDiv=document.getElementsByClassName("publicationinfo");
                console.log(oDiv[0]);
                var url=oDiv[0].innerHTML;*/
                var url='tabContent/scientificResearch/publicationInfo?username='+data.username+'&showConfigUid='+publicationInfoUid +'&changeRole='+role;
                var id=4;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content:' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:id //
                });
                element.tabChange('component-tabs-brief','4');

            }
        });


        active = {
            reload: function () {
                var cnameReload = $('#cname');
                var employeeNoReload=$('#employeeNo');

                //执行重载
                e.reload('scientificResearch', {
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
                e.reload('scientificResearch', {
                    where: {
                        role:beChooseManageRoleType
                    }
                });
            }

        };

        $('.scientificResearchInput .layui-btn').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
    }), e("manage_scientificResearch", {})
});