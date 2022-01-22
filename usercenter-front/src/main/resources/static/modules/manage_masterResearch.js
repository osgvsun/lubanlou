/** layuiAdmin.std-v1.2.1 LPPL License By http://www.layui.com/admin/ */ ;
var role=GetQueryString("currentShowRole");
var dataObject=JSON.parse(localStorage['tree']).nextLevelConfigSet;
var currentUserRoleName=JSON.parse(localStorage['role']).roleList[0].roleName;
//获取此时的一级栏目id
var beWarrantMenuId;
//获取被分配的管理员栏目id
for(var i=0;i<dataObject.length;i++){
    if(dataObject[i].config.name === "文章专利管理"&&dataObject[i].config.admin==1){
        beWarrantMenuId=dataObject[i].config.id;
    }
}
var master_workInfoUid = '';
var authorized_patentInfoUid = '';
for(var i=0;i<dataObject.length;i++) {
    if (dataObject[i].config.name ==="文章专利管理"&&dataObject[i].config.admin!=1) {
        var personTree = dataObject[i].nextLevelConfigSet;
        for (var j = 0; j < personTree.length; j++) {
            if (personTree[j].config.tableName=='user_master_work_info'){
                master_workInfoUid = personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_authorized_patent_info'){
                authorized_patentInfoUid = personTree[j].config.id;
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
            elem: "#masterInfo"
            ,url: userCenterHost+'/statisticAllUserMasterWorkInfo'
            ,method:'GET',
            where:{
                role:role
            }
            ,contentType: 'text'
            ,title: '基本信息',
            cellMinWidth: 100,
            cols: [
                [
                    {title:'序号', width:100, type:"numbers",align: 'center'},
                    {field: 'employeeNo', title: '教工号', width: 100, sort: true,align: 'center'},
                    {field: 'cname', title: '姓名', width: 80,align: 'center'},
                    {field: 'paperCountOfFirstAuthor', title: '第一作者论文', width: 180,align: 'center'},
                    {field: 'paperCount', title: '通讯作者论文', width: 180,align: 'center'},
                    {field: 'patentCount', title: '专利数', width: 180,align: 'center'},
                    {field: 'commonPatentCount', title: '共同专利',align: 'center'},
                    {field: 'transformCount', title: '转化数量',align: 'center'},
                    {field: 'transformMoneyCount', title: '转让金额',align: 'center'},
                    {field:'username',title:'用户名',hide:true},
                    {fixed: 'right', title: '操作', align: 'center', toolbar: '#masterInfo_edit',width: 200}
                ]
            ],
            page: true,
            limits:[10,20,30,40,50,60,70,80,90,200],
            skin: "line"
        });
        e.on('tool(masterInfo)', function(obj){
            var data = obj.data;
            if(obj.event=='masterworktabAdd'){
                var date = new Date().getTime();
                var name =data.cname+"的代表作信息" ;
/*                var oDiv=document.getElementsByClassName("masterworkinfo");
                console.log(oDiv[0]);
                var url=oDiv[0].innerHTML;*/
                var url='tabContent/masterResearch/masterWorkInfo?username='+data.username+'&showConfigUid='+master_workInfoUid+'&changeRole='+role;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content:' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date//
                });
                element.tabChange('component-tabs-brief',date);

            }
            if(obj.event=='authorizedpatenttabAdd'){
                var date = new Date().getTime();
                var name =data.cname+"的授权专利信息" ;
/*                var oDiv=document.getElementsByClassName("authorizedpatentinfo");
                console.log(oDiv[0]);
                var url=oDiv[0].innerHTML;*/
                var url='tabContent/masterResearch/authorizedPatentInfo?username='+data.username+'&showConfigUid='+authorized_patentInfoUid+'&changeRole='+role;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content:' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date //
                });
                element.tabChange('component-tabs-brief',date);

            }
        });
        active = {
            reload: function () {
                var cnameReload = $('#cname');
                var employeeNoReload = $('#employeeNo');

                //执行重载
                e.reload('masterInfo', {
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
                e.reload('masterInfo', {
                    where: {
                        role:beChooseManageRoleType
                    }
                });
            }

        };

        $('.masterInput .layui-btn').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
    }), e("manage_masterResearch", {})
});