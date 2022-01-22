var currentRoleUid = JSON.parse(localStorage['role']).roleList[0].id;
var currentRole = JSON.parse(localStorage['role']).roleList[0].roleName;
var chooseRole = GetQueryString("role");
var chooseRoleUid=GetQueryString("roleUid");
var all_checked=new Array();
layui.define(function (e) {
    $.ajax({
        url: userCenterHost + '/getMenuTree',
        async: false,
        type: "GET",
        data:{
            roleId:currentRoleUid,
            beOperatedRoleName:chooseRole,
            target:1
        },
        contentType: "json;charset=UTF-8",
        success: function (data) {
            localStorage['currentShow_roleTree'] = JSON.stringify(data);
        }
    });
    var dataObject = JSON.parse(localStorage['currentShow_roleTree']).nextLevelConfigSet;
//绘制单个div
    function setTR(item) {
        if ((chooseRole === 'ROLE_TEACHER'||chooseRole=='ROLE_STUDENT' || chooseRole==='ROLE_UNIT' ) && item.config.admin != 1) {
            if (item.config.adminSetting == '1' || item.config.selfSetting == '1') {
                var html = '<tr id="'+item.config.href+'"><td><div style="display: inline-block"><p style="display:none" >' + JSON.stringify(item.config) + '</p><input  type="checkbox" class="checked" id="'+item.config.id+'" data-count="'+item.config.adminSetting+'"/></div> <span>' + item.config.name + '</td><td><table>';

            }
            else if (item.config.adminSetting == '0') {
                var html = '<tr id="'+item.config.href+'"><td><div style="display: inline-block"><p style="display:none" >' + JSON.stringify(item.config) + '</p><input  type="checkbox" class="unchecked" id="'+item.config.id+'" data-count="'+item.config.adminSetting+'"/></div> <span>' + item.config.name + '</td><td><table>';
            }
            else if (item.config.adminSetting == '-1' && item.config.selfSetting == '0') {
                var html = '<tr id="'+item.config.href+'"><td><div style="display: inline-block"><p style="display:none" >' + JSON.stringify(item.config) + '</p><input  type="checkbox" class="indeterminate" id="'+item.config.id+'" data-count="'+item.config.adminSetting+'"/></div> <span>' + item.config.name + '</td><td><table>';
            }
            var second = '';
            var level2 = item.nextLevelConfigSet;
            for (var j = 0; j < level2.length; j++) {
                if (level2[j].config.adminSetting == '1' || level2[j].config.selfSetting == '1') {
                    var table = '<tr><td><div style="display: inline-block"><p style="display:none">' + JSON.stringify(level2[j].config) + '</p><input type="checkbox" class="checked" id="'+level2[j].config.id+'" data-count="'+level2[j].config.adminSetting+'"/></div> <span>' + level2[j].config.name + '</td><td>';
                }
                else if (level2[j].config.adminSetting == '0') {
                    var table = '<tr><td><div style="display: inline-block"><p style="display:none">' + JSON.stringify(level2[j].config) + '</p><input type="checkbox" class="unchecked" id="'+level2[j].config.id+'" data-count="'+level2[j].config.adminSetting+'"/></div> <span>' + level2[j].config.name + '</td><td>';
                }
                else if (level2[j].config.adminSetting == '-1' && level2[j].config.selfSetting == '0') {
                    var table = '<tr><td><div style="display: inline-block"><p style="display:none">' + JSON.stringify(level2[j].config) + '</p><input type="checkbox" class="indeterminate" id="'+level2[j].config.id+'" data-count="'+level2[j].config.adminSetting+'"/></div> <span>' + level2[j].config.name + '</td><td>';
                }

                var level3 = level2[j].nextLevelConfigSet;
                var inTD = '';
                for (var k = 0; k < level3.length; k++) {
                    if (level3[k].config.adminSetting == '1' || level3[k].config.selfSetting == '1') {
                        var field = '<div style="display: inline-block"><p style="display:none">' + JSON.stringify(level3[k].config) + '</p><input type="checkbox" class="checked" id="'+level3[k].config.id+'" data-count="'+level3[k].config.adminSetting+'"/></div> <span>'
                            + level3[k].config.name +
                            '</span>'
                    }
                    else if (level3[k].config.adminSetting == '0') {
                        var field = '<div style="display: inline-block"><p style="display:none">' + JSON.stringify(level3[k].config) + '</p><input type="checkbox" class="unchecked" id="'+level3[k].config.id+'" data-count="'+level3[k].config.adminSetting+'"/></div><span>'
                            + level3[k].config.name +
                            '</span>'
                    }
                    else if (level3[k].config.adminSetting == '-1' && level3[k].config.selfSetting == '0') {
                        var field = '<div style="display: inline-block"><p style="display:none">' + JSON.stringify(level3[k].config) + '</p><input type="checkbox" class="indeterminate" id="'+level3[k].config.id+'" data-count="'+level3[k].config.adminSetting+'"/></div><span>'
                            + level3[k].config.name +
                            '</span>'
                    }

                    inTD = inTD + field;
                }
                second = second + table + inTD + '</td></tr>';
            }
            html = html + second + '</td></table></tr>';
        }
        return html;
    }

    function menu(object) {
        var html = '';
        for (var t = 0; t < object.length; t++) {
            html += setTR(object[t]);
        }
        $("#menu0").after(html);
        // 添加点击函数
        bindCheckboxEvent();
    }

    // 子菜单选中联动父菜单
    function bindCheckboxEvent(){
        $("#config_field :checkbox").unbind("click");
        $("#config_field :checkbox").click(function(){
            let _this = $(this);
            // 选中触发
            if(_this.is(":checked")){
                // 最左边一列
                if(_this.parents().length===7){
                    return;
                }
                // 右边两列里面点击
                if(_this.parents().length===11){
                    _this.parents("td").prev("td").find(":checkbox").prop("checked",true)
                }
            }else{
                // 取消选中，若当前td内的多选都没有选中，就取消上一级多选框的选中
            }
        })
    }

    window.onload = menu(dataObject);
    var ele = $("input:checkbox");
    var count = 0;
    if(delegation){
        ele.change(function () {
            var count=$(this).attr("data-count");
            $(this).attr("data-count", ++count);
            var data = $(this).attr("data-count") % 3;
            var change_config = JSON.parse($(this).parent().text());
            switch (data) {
                case 0:
                    this.checked = false;
                    $(this).removeClass();
                    $(this).addClass("unchecked");
                    // change_config.adminSetting = "0";
                    break;

                case 1:
                    this.checked = true;
                    $(this).removeClass();
                    $(this).addClass("checked");
                    // change_config.adminSetting = "1";
                    break;

                case 2:
                    this.indeterminate = true;
                    $(this).removeClass();
                    $(this).addClass("indeterminate");
                    // change_config.adminSetting = "-1";
                    break;
            }
            // change_config['username']=currentUsername;
            // change_config['currentRoleId']=currentRoleUid;
            // change_config['beOperatedRoleId']=chooseRoleUid;
            // change_config['target']='1';
            // $.ajax({
            //     url: userCenterHost + '/usercenter/editMenu',
            //     data: change_config,
            //     dataType: "TEXT",
            //     type: "POST",
            //     success: function (data) {
            //         console.log(data);
            //     }
            // })
            /*    }*/
        });
    }
    else{
        ele.change(function () {
            var change_config = JSON.parse($(this).parent().text());
            if(this.checked==true){
                $(this).removeClass();
                $(this).addClass("checked");
                var currConfig_id=$(this).attr("id");
                console.log($("#"+currConfig_id).parent().text());
                var change_config=JSON.parse($("#"+currConfig_id).parent().text());
                change_config.adminSetting='1';
                change_config['username']=currentUsername;
                change_config['currentRoleId']=currentRoleUid;
                change_config['beOperatedRoleId']=chooseRoleUid;
                change_config['target']=1;
                all_checked.push(change_config);
            }
            else
                {
                $(this).removeClass();
                $(this).addClass("unchecked");
                    var currConfig_id=$(this).attr("id");
                    console.log($("#"+currConfig_id).parent().text());
                    var change_config=JSON.parse($("#"+currConfig_id).parent().text());
                    change_config.adminSetting='0';
                    change_config['username']=currentUsername;
                    change_config['currentRoleId']=currentRoleUid;
                    change_config['beOperatedRoleId']=chooseRoleUid;
                    change_config['target']=1;
                    all_checked.push(change_config);

            }

            // change_config['username']=currentUsername;
            // change_config['currentRoleId']=currentRoleUid;
            // change_config['beOperatedRoleId']=chooseRoleUid;
            // change_config['target']=1;
            // $.ajax({
            //     url: userCenterHost + '/usercenter/editMenu',
            //     data: change_config,
            //     //dataType: "TEXT",
            //     //contentType:'application/x-www-form-urlencoded',
            //     type: "POST",
            //     success: function (data) {
            //         console.log(data);
            //     }
            // })
            /*    }*/
        });
    }


//设置true或false来这只选与不选
    $(".checked").prop("checked", true);
//设置true或false来设置不确定状态和不选
    $(".indeterminate").prop("indeterminate", true);
    e("AuthorityMenuManage",{});

})

//提交基本信息配置结果(教师配置)
/*
function editResult(){
    var allConfig=$("#config_field input[type=checkbox]");
    var all_checked=new Array();
    for(var i=0;i<allConfig.length;i++){
        if(allConfig[i].className=='checked'){
            var currConfig_id=allConfig[i].id;
            console.log($("#"+currConfig_id).parent().text());
            var change_config=JSON.parse($("#"+currConfig_id).parent().text());
            change_config.adminSetting='1';
            change_config['username']=currentUsername;
            change_config['currentRoleId']=currentRoleUid;
            change_config['beOperatedRoleId']=chooseRoleUid;
            change_config['target']=1;
            all_checked.push(change_config);
        }
        if(allConfig[i].className=='unchecked'){
            var currConfig_id=allConfig[i].id;
            console.log($("#"+currConfig_id).parent().text());
            var change_config=JSON.parse($("#"+currConfig_id).parent().text());
            change_config.adminSetting='0';
            change_config['username']=currentUsername;
            change_config['currentRoleId']=currentRoleUid;
            change_config['beOperatedRoleId']=chooseRoleUid;
            change_config['target']=1;
            all_checked.push(change_config);
        }
    }
    $.ajax({
        url: userCenterHost + '/usercenter/editMenu',
        data: JSON.stringify(all_checked),
        contentType:'application/json',
        // parseData:false,
        dataType: "TEXT",
        type: "POST",
        success: function (data) {
            alert('配置成功！');
            console.log(data);
            location.reload();
        }
    })
}*/
function editResult(){
    var allConfig=$("#config_field input[type=checkbox]");
    $.ajax({
        url: userCenterHost + '/editMenu',
        data: JSON.stringify(all_checked),
        contentType:'application/json',
        // parseData:false,
        dataType: "TEXT",
        type: "POST",
        success: function (data) {
            alert('配置成功！');
            console.log(data);
            location.reload();
        }
    })
}
