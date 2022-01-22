var currentRoleUid = JSON.parse(localStorage['role']).roleList[0].id;
var currentRole = JSON.parse(localStorage['role']).roleList[0].roleName;
var chooseRole ='ROLE_TEACHER';
var chooseRoleUid=2;
var all_checked=new Array();
layui.define(function (e) {
    $.ajax({
        url: userCenterHost + '/usercenter/getMenuTree',
        async: false,
        type: "GET",
        data:{
            roleId:currentRoleUid,
            beOperatedRoleName:chooseRole,
            target:2
        },
        contentType: "json;charset=UTF-8",
        success: function (data) {
            localStorage['currentShow_roleTree'] = JSON.stringify(data);
        }
    });
    var dataObject = JSON.parse(localStorage['currentShow_roleTree']).nextLevelConfigSet;
//绘制基本信息配置表格
    function setTR(item) {
        if ( item.config.id==1) {
            if (1) {
                var level2 = item.nextLevelConfigSet;
                for (var j = 0; j < level2.length; j++) {
                    var html='';
                    if(level2[j].config.id=='5'){
                        if (1) {
                            var html='<tr><td><div style="display: inline-block;width: 5%;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(level2[j].config) + '</p></div><span>' + level2[j].config.name + '</td><td  id="config_field">';
                            var level3 = level2[j].nextLevelConfigSet;
                            var inTD = '';
                            for (var k = 0; k < level3.length; k++) {
                                if (level3[k].config.adminSetting == '1') {
                                    var field = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(level3[k].config) + '</p><input type="checkbox" class="checkedbox" id="'+level3[k].config.id+'" data-count="'+level3[k].config.adminSetting+'"/></div> <span style="display: inline-block;margin-right: 50px;border-bottom: 1px solid #efefef;">'
                                        + level3[k].config.name +
                                        '</span></div>'
                                }
                                else if (level3[k].config.adminSetting == '0') {
                                    var field = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(level3[k].config) + '</p><input type="checkbox" class="unchecked"  id="'+level3[k].config.id+'" data-count="'+level3[k].config.adminSetting+'"/></div><span style="display: inline-block;margin-right: 50px;border-bottom: 1px solid #efefef;">'
                                        + level3[k].config.name +
                                        '</span></div>'
                                }
                                else if (level3[k].config.adminSetting == '-1') {
                                    var field = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(level3[k].config) + '</p><input type="checkbox" class="indeterminate"  id="'+level3[k].config.id+'" data-count="'+level3[k].config.adminSetting+'"/></div><span style="display: inline-block;margin-right: 50px;border-bottom: 1px solid #efefef;">'
                                        + level3[k].config.name +
                                        '</span></div>'
                                }
                                inTD = inTD + field;
                            }
                            html = html+ inTD + '</td></tr>';
                        }
                        break;
                    }
                }
            }
        }
        return html;
    }

    function menu(object) {
        var html = '';
        for (var t = 0; t < object.length; t++) {
            html += setTR(object[t]);
            if(object[t].config.id==301){
                if (object[t].config.adminSetting == '1') {
                    var field_personPage = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(object[t].config) + '</p><input type="checkbox" class="checkedbox" id="'+object[t].config.id+'" data-count="'+object[t].config.adminSetting+'"/></div> <span style="display: inline-block;margin-right: 50px;border-bottom: 1px solid #efefef;">'
                        + object[t].config.name +
                        '</span></div>'
                }
                else if (object[t].config.adminSetting == '0') {
                    var field_personPage = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(object[t].config) + '</p><input type="checkbox" class="unchecked" id="'+object[t].config.id+'" data-count="'+object[t].config.adminSetting+'"/></div><span style="display: inline-block;margin-right: 50px;border-bottom: 1px solid #efefef;">'
                        + object[t].config.name +
                        '</span></div>'
                }
                else if (object[t].config.adminSetting == '-1') {
                    var field_personPage = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(object[t].config) + '</p><input type="checkbox" class="indeterminate" id="'+object[t].config.id+'" data-count="'+object[t].config.adminSetting+'"/></div><span style="display: inline-block;margin-right: 50px;border-bottom: 1px solid #efefef;">'
                        + object[t].config.name +
                        '</span></div>'
                }

            }
            if ( object[t].config.id==1) {
                if (1) {
                    var level2 = object[t].nextLevelConfigSet;
                    for (var j = 0; j < level2.length; j++) {
                        if(level2[j].config.id=='6'){
                            if (1) {
                                var level3 = level2[j].nextLevelConfigSet;
                                for(var k = 0; k < level3.length; k++) {
                                    if(level3[k].config.field=='profession'){
                                        if (level3[k].config.adminSetting == '1') {
                                           var field_pro = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(level3[k].config) + '</p><input type="checkbox" class="checkedbox" id="'+level3[k].config.id+'" data-count="'+level3[k].config.adminSetting+'"/></div> <span style="display: inline-block;margin-right: 50px;border-bottom: 1px solid #efefef;">'
                                                + level3[k].config.name +
                                                '</span></div>'
                                        }
                                        else if (level3[k].config.adminSetting == '0') {
                                           var field_pro = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(level3[k].config) + '</p><input type="checkbox" class="unchecked" id="'+level3[k].config.id+'" data-count="'+level3[k].config.adminSetting+'"/></div><span style="display: inline-block;margin-right: 50px;border-bottom: 1px solid #efefef;">'
                                                + level3[k].config.name +
                                                '</span></div>'
                                        }
                                        else if (level3[k].config.adminSetting == '-1') {
                                           var field_pro = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(level3[k].config) + '</p><input type="checkbox" class="indeterminate" id="'+level3[k].config.id+'" data-count="'+level3[k].config.adminSetting+'"/></div><span style="display: inline-block;margin-right: 50px;border-bottom: 1px solid #efefef;">'
                                                + level3[k].config.name +
                                                '</span></div>'
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        $("#menu0").after(html);
        $("#config_field").append(field_pro+field_personPage);
    }

    window.onload = menu(dataObject);
    var ele = $("input:checkbox");
    var count = 0;
/*    if(delegation){*/
        ele.change(function () {
            var count=$(this).attr("data-count");
            /* $(this).attr("data-count", -100);*/
            /*    if(count != -100) {*/
            $(this).attr("data-count", ++count);
            var data = $(this).attr("data-count") % 3;
            // var change_config = JSON.parse($(this).parent().text());
            switch (data) {
                case 0:
                    this.checked = false;
                    $(this).removeClass();
                    $(this).addClass("unchecked");
                    var currConfig_id= $(this).attr('id');
                    var change_config=JSON.parse($("#"+currConfig_id).parent().text());
                    change_config.adminSetting='0';
                    change_config['username']=currentUsername;
                    change_config['currentRoleId']=currentRoleUid;
                    change_config['beOperatedRoleId']=chooseRoleUid;
                    change_config['target']='2';
                    all_checked.push(change_config);
                    // change_config.adminSetting = "0";
                    break;

                case 1:
                    this.checked = true;
                    $(this).removeClass();
                    $(this).addClass("checkedbox");
                    var currConfig_id=$(this).attr('id');
                    console.log($("#"+currConfig_id).parent().text());
                    var change_config=JSON.parse($("#"+currConfig_id).parent().text());
                    change_config.adminSetting='1';
                    change_config['username']=currentUsername;
                    change_config['currentRoleId']=currentRoleUid;
                    change_config['beOperatedRoleId']=chooseRoleUid;
                    change_config['target']='2';
                    all_checked.push(change_config);
                    // change_config.adminSetting = "1";
                    break;

                case 2:
                    this.indeterminate = true;
                    $(this).removeClass();
                    $(this).addClass("indeterminate");
                    var currConfig_id=$(this).attr('id');
                    var change_config=JSON.parse($("#"+currConfig_id).parent().text());
                    change_config.adminSetting='-1';
                    change_config['username']=currentUsername;
                    change_config['currentRoleId']=currentRoleUid;
                    change_config['beOperatedRoleId']=chooseRoleUid;
                    change_config['target']='2';
                    all_checked.push(change_config);
                    // change_config.adminSetting = "-1";
                    break;
            }
            // change_config['username']=currentUsername;
            // change_config['currentRoleId']=currentRoleUid;
            // change_config['beOperatedRoleId']=chooseRoleUid;
            // change_config['target']='2';
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
  /*  }*/
   /* else{
        ele.change(function () {
            var change_config = JSON.parse($(this).parent().text());
            if(this.checked==true){
                change_config.adminSetting="1";
            }
            else{ change_config.adminSetting="0";}
            $.ajax({
                url: userCenterHost + '/usercenter/editMenu',
                beforeSend: function (request, data) {
                    data.data += "&username=" + currentUsername +"&currentRoleUid=" + currentRoleUid+"&beOperatedRoleUid=" +chooseRoleUid;
                },
                data: change_config,
                dataType: "TEXT",
                type: "POST",
                success: function (data) {
                    console.log(data);
                }
            })
            /!*    }*!/
        });

    }*/

/*    function changeAllCheckbox(){
        if(1){
            $("#"+$(obj).parent().parent().parent()[0].id+':checkbox').attr("checked",'false')
        }
    }*/
//设置true或false来这只选与不选
    $(".checkedbox").prop("checked", true);
//设置true或false来设置不确定状态和不选
    $(".indeterminate").prop("indeterminate", true);
    e("websiteConfig",{})

});
//提交基本信息配置结果(管理员配置)
function editResult() {
    var allConfig=$("#config_field input[type=checkbox]");
    var count=0;
    for(var i=0;i<allConfig.length;i++){
        if(allConfig[i].className=='checkedbox'){
            if(allConfig[i].id!='205'&&allConfig[i].id!='204'&&allConfig[i].id!='301'){
                count++;
            }
        }
    }
    if(count>8){
        alert("最多只能显示8项！")
    }
    else{
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
    }
}
