/** layuiAdmin.std-v1.2.1 LPPL License By http://www.layui.com/admin/ */ ;
var role=GetQueryString("currentShowRole");
var dataObject=JSON.parse(localStorage['tree']).nextLevelConfigSet;
var currentUserRoleName=JSON.parse(localStorage['role']).roleList[0].roleName;
//获取此时的一级栏目id
var beWarrantMenuId;
//获取被分配的管理员栏目id
for(var i=0;i<dataObject.length;i++){
    if(dataObject[i].config.name === "教育背景及工作经历"&&dataObject[i].config.admin==1){
        beWarrantMenuId=dataObject[i].config.id;
    }
}
for(var i=0;i<dataObject.length;i++) {
    if (dataObject[i].config.name === "教育背景及工作经历"&&dataObject[i].config.admin!=1) {
        var personTree = dataObject[i].nextLevelConfigSet;
        for (var j = 0; j < personTree.length; j++) {
            if (personTree[j].config.tableName=='user_edubg_info'){
                var edubgInfoUid = personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_work_history_info'){
                var work_historyInfoUid = personTree[j].config.id;
            }
            if (personTree[j].config.tableName=='user_train_info'){
                var trainInfoUid = personTree[j].config.id;
            }
        }
        break;
    }
}
if(currentUserRoleName!='ROLE_ADMIN'){
    //非管理员权限登录时获取被分配的管理权限type值
    $.ajax({
        url:userCenterHost+'/usercenter/getUserMenuConfig',
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
            layer = layui.layer,
        laydate=layui.laydate; //Tab的切换功能，切换事件监听等，需要依赖element模块
        e.render({
            elem: "#educateInfo"
            ,url: userCenterHost + '/usercenter/statisticAllUserEducationBackgroundAndWorkHistory'
            ,method:'GET',
            /*,contentType: 'application/json'*/
            where:{
                role:role
            }
           ,title: '教育背景信息',
            cellMinWidth: 100,
            cols: [
                [ {title:'序号', width:100,type:"numbers",align: 'center'},
                    {
                    field: 'employeeNo', title: '教工号', width: 100, sort: true,align: 'center'},
                    {field: 'cname', title: '姓名', width: 80,align: 'center'},
                    {field: 'degree', title: '最高学位', width: 180,align: 'center'},
                    {field: 'specialty', title: '最后学历专业', width: 180,align: 'center'},
                    {field: 'graduationTime', title: '最高学位获取时间', width: 180,align: 'center'},
                    {field: 'isOverseasDegree', title: '最高学位是否海外获得',align: 'center', width: 180,templet:function (d) {
                        if(d.isOverseasDegree=='1'||d.isOverseasDegree==true){
                            var data='是';
                        }
                        if(d.isOverseasDegree=='0'||d.isOverseasDegree==false){
                            var data='否';
                        }
                        return data;

                        }},
                    {field: 'highestDegreeGetFromMotherSchool',align: 'center', title: '最高学位是否本校获得', width: 180,templet:function (d) {
                            if(d.highestDegreeGetFromMotherSchool=='1'||d.highestDegreeGetFromMotherSchool==true){
                                var data='是';
                            }
                            if(d.highestDegreeGetFromMotherSchool=='0'||d.highestDegreeGetFromMotherSchool==false){
                                var data='否';
                            }
                            return data;

                        }},
                    {field: 'currentWorkUnit', title: '当前工作单位', width: 150,align: 'center'},
                    {field: 'technology', title: '当前技术工作', width: 180,align: 'center'},
                    {field: 'professionalPost', title: '当前职务', width: 180,align: 'center'},
                    {field: 'workStartTime', title: '开始时间', width: 180,align: 'center'},
                    {field: 'trainTime', title: '进修次数', width: 180,align: 'center'},
                    {field: 'numberOfDays', title: '进修总时间', width: 180,align: 'center'},
                    {field: 'isOverseasExperience', title: '是否海外经历',align: 'center', width: 180,templet:function (d) {
                            if(d.isOverseasExperience=='1'||d.isOverseasExperience=='yes'||d.isOverseasExperience=='YES'){
                                var data='是';
                            }
                            if(d.isOverseasExperience=='0'||d.isOverseasExperience=='false'||d.isOverseasExperience=='FALSE'){
                                var data='否';
                            }
                            return data;

                        }},
                    {field:'username',title:'用户名',hide:true},
                    {fixed: 'right', title: '操作', align: 'center', toolbar: '#educateInfo_edit',width:300}
                ]
            ]
            ,page: true,
            limits:[10,20,30,40,50,60,70,80,90,200],
            skin: "line"
        });
        e.on('tool(educateInfo)', function(obj){
            var data = obj.data;

            if(obj.event=='edubgtabAdd'){
                var date = new Date().getTime();
                var name =data.cname+"的教育背景信息" ;
/*                var oDiv=document.getElementsByClassName("edubginfo");
                console.log(oDiv);
                var url=oDiv[0].innerHTML;*/
                var url='tabContent/educationInfo/edubgInfo?username='+data.username+'&showConfigUid='+edubgInfoUid+'&changeRole='+role;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content:' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date
                });
                element.tabChange('component-tabs-brief',date);

            }
            if(obj.event=='workhistorytabAdd'){
                var date = new Date().getTime();
                var name =data.cname+"的工作履历信息" ;
                var url='tabContent/educationInfo/workHistoryInfo?username='+data.username+'&showConfigUid='+work_historyInfoUid+'&changeRole='+role;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content:' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date //
                });
                element.tabChange('component-tabs-brief',date);

            }
            if(obj.event=='trainexperiencetabAdd'){
                var date = new Date().getTime();
                var name =data.cname+"的培训经历信息" ;
                var url='tabContent/educationInfo/trainExperienceInfo?username='+data.username+'&showConfigUid='+trainInfoUid+'&changeRole='+role;
                element.tabAdd('component-tabs-brief', {
                    title: name //用于演示
                    ,content:' <iframe scrolling="yes" class="x-iframe" frameborder="0" src="' + url + '" width="100%" height="600px"></iframe>'
                    ,id:date
                });
                element.tabChange('component-tabs-brief',date);

            }
        });
        active = {
            reload: function () {
                var cnameReload = $('#cname');
                var employeeNoReload=$('#employeeNo');

                //执行重载
                e.reload('educateInfo', {
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
                e.reload('educateInfo', {
                    where: {
                        role:beChooseManageRoleType
                    }
                });
            }


        };
       /* element.on('tab(component-tabs-brief)',function(){ ///jquery 1.9(不包括1.9)以下可以
            e.on('tool(edubginfo)', function(obj){
                var data = obj.data;
                if(obj.event === 'detail'){
                    console.log("qqqqqq");
                    layer.msg('ID：'+ data.id + ' 的查看操作');
                } else if(obj.event === 'del'){
                    layer.confirm('真的删除行么', function(index){
                        obj.del();
                        layer.close(index);
                    });
                } else if(obj.event === 'edit'){
                    /!*layer.alert('编辑行：<br>'+ JSON.stringify(data))*!/
                    editStandard(data);
                    layer.open({
                        type: 1
                        , title: '编辑'
                        , area: ['60%', '50%']
                        , offset: type //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                        , id: 'layerDemo1' /!*+ type*!/ //防止重复弹出
                        , content: $('#edit_edubginfo')
                        , btn: '提交'
                        , btnAlign: 'c' //按钮居中
                        , shade: 0 //不显示遮罩
                        , yes: function () {
                            layer.closeAll();
                        }
                    });
                }
            });
        });*/

        $('.educationInput .layui-btn').on('click', function(){
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
    }), e("manage_educateInfo", {})
});