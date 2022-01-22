var currentRoleUid = JSON.parse(localStorage['role']).roleList[0].id;
var currentRole = JSON.parse(localStorage['role']).roleList[0].roleName;
var chooseRoleName = GetQueryString("role");
var userId = JSON.parse(localStorage['role']).id;
var all_checked=new Array();
layui.define(function (e) {
    //获取当前登录角色配置树信息
    $.ajax({
        url: userCenterHost + '/usercenter/getMenuTree',
        async: false,
        type: "GET",
        data:{
            username:currentUsername,
            roleId:currentRoleUid,
            beOperatedRoleId:currentRoleUid,
            target:2
        },
        contentType: "json;charset=UTF-8",
        success: function (data) {
            localStorage['currentShow_roleTree'] = JSON.stringify(data);
        }
    });
    var dataObject = JSON.parse(localStorage['currentShow_roleTree']).nextLevelConfigSet;
    layui.use(['index', 'form', 'laydate', 'table', 'upload'], function () {
        var $ = layui.$,
            element = layui.element;
        var basic=1;
        var master=1;
        var patent=1;
        var edu=1;
        var work=1;
        var award=1;
        var project=1;
        element.on('tab(demo)', function(data){
            console.log(data.index);
            // if(data.index==0){
            //     if(basic){
            //         basic=0;
            //         menu(dataObject)
            //     }
            // }
            if(data.index==1){
                if(edu){
                    edu=0;
                    //获取学历
                    $.ajax({
                        url:userCenterHost + '/usercenter/getUserEdubgInfo',
                        type:'POST',
                        data:{
                            userId: userId
                        },
                        success:function (res) {
                            if(!res.code){
                                console.log(res.data);
                                var data=res.data;
                                var eduHtml= seteducateTR(data);
                                $("#eduInfo").after(eduHtml);
                                $("#eduTable input[class='checked']").prop("checked",true);
                                console.log($("#eduTable input[class='checked']"));
                            }
                            else{
                                alert("获取数据失败！")
                            }
                        },
                        fail:function () {
                            alert("数据接口访问出错！")
                        }
                    })
                }

            }
            if(data.index==2){
                if(work){
                    work=0;
                    //获取工作履历
                    $.ajax({
                        url:userCenterHost + '/usercenter/getUserWorkHistoryInfo',
                        type:'POST',
                        data:{
                            userId: userId
                        },
                        success:function (res) {
                            if(!res.code){
                                console.log(res.data);
                                var data=res.data;
                                var eduHtml= setworkTR(data);
                                $("#workInfo").after(eduHtml);
                                $("#workTable input[class='checked']").prop("checked",true);
                                console.log($("#workTable input[class='checked']"));

                            }
                            else{
                                alert("获取数据失败！")
                            }
                        },
                        fail:function () {
                            alert("数据接口访问出错！")
                        }
                    })
                }

            }
            if(data.index==3){
                //获取项目信息
                if(project){
                    project=0;
                    //获取纵向项目信息
                    $.ajax({
                        url:userCenterHost + '/usercenter/getUserLongitudinalSubjectInfo',
                        type:'POST',
                        data:{
                            userId: userId
                        },
                        success:function (res) {
                            if(!res.code){
                                console.log(res.data);
                                var data=res.data;
                                var longitudinalSubjectHtml= setScienticeProjectTR(data);
                                $("#longitudinalSubjectInfo").after(longitudinalSubjectHtml);
                                $("#longitudinalSubjectTable input[class='checked']").prop("checked",true);
                                console.log($("#longitudinalSubjectTable input[class='checked']"));

                            }
                            else{
                                alert("获取数据失败！")
                            }
                        },
                        fail:function () {
                            alert("数据接口访问出错！")
                        }
                    })
                    //获取横向项目信息
                    $.ajax({
                        url:userCenterHost + '/usercenter/getUserHorizontalSubjectInfo',
                        type:'POST',
                        data:{
                            userId: userId
                        },
                        success:function (res) {
                            if(!res.code){
                                console.log(res.data);
                                var data=res.data;
                                var horizontalSubjectHtml= setScienticeProjectTR(data);
                                $("#horizontalSubjectInfo").after(horizontalSubjectHtml);
                                $("#horizontalSubjectTable input[class='checked']").prop("checked",true);
                                console.log($("#horizontalSubjectTable input[class='checked']"));
                            }
                            else{
                                alert("获取数据失败！")
                            }
                        },
                        fail:function () {
                            alert("数据接口访问出错！")
                        }
                    })
                    //获取教学项目信息
                    $.ajax({
                        url:userCenterHost + '/usercenter/getUserEducationProjectInfo',
                        type:'POST',
                        data:{
                            userId: userId
                        },
                        success:function (res) {
                            if(!res.code){
                                console.log(res.data);
                                var data=res.data;
                                var horizontalSubjectHtml= setEducateProjectTR(data);
                                $("#teachingSubjectInfo").after(horizontalSubjectHtml);
                                $("#teachingSubjectTable input[class='checked']").prop("checked",true);
                                console.log($("#teachingSubjectTable input[class='checked']"));
                            }
                            else{
                                alert("获取数据失败！")
                            }
                        },
                        fail:function () {
                            alert("数据接口访问出错！")
                        }
                    })
                }

            }
            if(data.index==4){
                if(master){
                    master=0;
                    //获取代表作信息
                    $.ajax({
                        url: userCenterHost+'/usercenter/getUserMasterWorkInfo',
                        type:'POST',
                        data:{
                            userId: userId
                        },
                        success:function (res) {
                            if(!res.code){
                                console.log(res.data);
                                var data=res.data;
                                var masterHtml= setMasterTR(data);
                                $("#menu1").after(masterHtml)
                                $("#table2 input[class='checked']").prop("checked",true);
                                console.log($("#table2 input[class='checked']"));
                            }
                            else{
                                alert("获取数据失败！")
                            }
                        },
                        fail:function () {
                            alert("数据接口访问出错！")
                        }
                    })
                }

            }
            if(data.index==5){
                //获取获奖信息
                if(award){
                    award=0;
                    //获取科研获奖信息
                    $.ajax({
                        url:userCenterHost + '/usercenter/getUserResearchAwardInfo',
                        type:'POST',
                        data:{
                            userId: userId
                        },
                        success:function (res) {
                            if(!res.code){
                                console.log(res.data);
                                var data=res.data;
                                var scientificAwardHtml= setScientificAwardTR(data);
                                $("#scientificAwardInfo").after(scientificAwardHtml);
                                $("#scientificAwardTable input[class='checked']").prop("checked",true);
                                console.log($("#scientificAwardTable input[class='checked']"));
                            }
                            else{
                                alert("获取数据失败！")
                            }
                        },
                        fail:function () {
                            alert("数据接口访问出错！")
                        }
                    })
                    //获取教学获奖信息
                    $.ajax({
                        url:userCenterHost + '/usercenter/getUserEducationAwardInfo',
                        type:'POST',
                        data:{
                            userId: userId
                        },
                        success:function (res) {
                            if(!res.code){
                                console.log(res.data);
                                var data=res.data;
                                var educateAwardHtml= setEducateAwardTR(data);
                                $("#educateAwardInfo").after(educateAwardHtml);
                                $("#educateAwardTable input[class='checked']").prop("checked",true);
                                console.log($("#educateAwardTable input[class='checked']"));
                            }
                            else{
                                alert("获取数据失败！")
                            }
                        },
                        fail:function () {
                            alert("数据接口访问出错！")
                        }
                    })
                }

            }
            if(data.index==6){
                if(patent){
                    patent=0;
                    //获取专利信息
                    $.ajax({
                        url: userCenterHost+'/usercenter/getUserAuthorizedPatentInfo',
                        type:'POST',
                        data:{
                            userId: userId
                        },
                        success:function (res) {
                            if(!res.code){
                                console.log(res.data);
                                var data=res.data;
                                var patentHtml= setPatentTR(data);
                                $("#patentInfo").after(patentHtml);
                                $("#patentTable input[class='checked']").prop("checked",true);
                                console.log($("#patentTable input[class='checked']"));
                            }
                            else{
                                alert("获取数据失败！")
                            }
                        },
                        fail:function () {
                            alert("数据接口访问出错！")
                        }
                    })
                }
            }
        });
    });
    //绘制代表作表格
    function setMasterTR(data) {
        if (1) {
            var html='<tr><td style="width: 30%">文章专利</td><td><table>'
            var second = '';
            for (var j = 0; j < data.length; j++) {
                // var table = '<tr><a href="'+data[j].thesisLink+'"><td style="text-align: left"><div style="display: inline-block;margin: 0 20px"><input type="checkbox" class="checked"/></div> <span>' +data[j].firstAuthor+'.'+ data[j].thesisTitle +'.'+data[j].periodical+'.'+data[j].publicationTime+'，'+data[j].periodicalVolume+'，'+data[j].periodicalPage+ '</td></a>';
                if (data[j].selfSetting == '1' ) {
                    var table = '<tr><td style="text-align: left"><div style="display: inline-block;margin: 0 20px"><input type="checkbox" class="checked" id="'+data[j].id+'"/></div> <a href="'+data[j].thesisLink+'" target="_self"><span>' +data[j].firstAuthor+'.'+ data[j].thesisTitle +'.'+data[j].periodical+'.'+data[j].publicationTime+'，'+data[j].periodicalVolume+'，'+data[j].periodicalPage+ '</span></a></td>';
                }
                else if (data[j].selfSetting == '0'||data[j].selfSetting == null) {
                    var table = '<tr><td style="text-align: left"><div style="display: inline-block;margin: 0 20px"><input type="checkbox" class="unchecked" id="'+data[j].id+'"/></div> <a href="'+data[j].thesisLink+'" target="_self"><span>' +data[j].firstAuthor+'.'+ data[j].thesisTitle +'.'+data[j].periodical+'.'+data[j].publicationTime+'，'+data[j].periodicalVolume+'，'+data[j].periodicalPage+ '</span></a></td>';
                }

                second = second + table + '</tr>';
            }
            html = html + second + '</td></table></tr>';
        }
        return html;
    }
    //绘制专利信息表格
    function setPatentTR(data) {
        if (1) {
            var html='<tr><td style="width: 30%">专利</td><input type="checkbox" class="checked"/><td><table class="detailInfo" border="2"><tr><td></td><td>专利名称</td><td>专利号</td><td>获批时间</td><td>本人排名</td><td>国家</td></tr>';
            var second = '';
            for (var j = 0; j < data.length; j++) {
                // var table = '<tr><a href="'+data[j].thesisLink+'"><td style="text-align: left"><div style="display: inline-block;margin: 0 20px"><input type="checkbox" class="checked"/></div> <span>' +data[j].firstAuthor+'.'+ data[j].thesisTitle +'.'+data[j].periodical+'.'+data[j].publicationTime+'，'+data[j].periodicalVolume+'，'+data[j].periodicalPage+ '</td></a>';
                if (data[j].selfSetting == '1' ) {
                    var table = '<tr><td><div><input type="checkbox" class="checked" id="'+data[j].id+'"/></div></td><td>' +data[j].patentName+'</td><td>'+ data[j].patentNum +'</td><td>'+data[j].patentTime+'</td><td>'+data[j].personRank+'</td><td>'+data[j].nation+'</td>';
                }
                else if (data[j].selfSetting == '0'||data[j].selfSetting == null) {
                    var table = '<tr><td><div><input type="checkbox" class="unchecked" id="'+data[j].id+'"/></div></td><td>' +data[j].patentName+'</td><td>'+ data[j].patentNum +'</td><td>'+data[j].patentTime+'</td><td>'+data[j].personRank+'</td><td>'+data[j].nation+'</td>';
                }

                second = second + table + '</tr>';
            }
            html = html + second + '</td></table></tr>';
        }
        return html;
    }
    //绘制学历信息表格
    function seteducateTR(data) {
        if (1) {
            var html='<tr><td style="width: 30%">学历信息</td><input type="checkbox" class="checked"/><td><table class="detailInfo" border="2"><tr><td></td><td>起止时间</td><td>学校</td><td>专业</td><td>学位</td><td>国家</td></tr>';
            var second = '';
            for (var j = 0; j < data.length; j++) {
                // var table = '<tr><a href="'+data[j].thesisLink+'"><td style="text-align: left"><div style="display: inline-block;margin: 0 20px"><input type="checkbox" class="checked"/></div> <span>' +data[j].firstAuthor+'.'+ data[j].thesisTitle +'.'+data[j].periodical+'.'+data[j].publicationTime+'，'+data[j].periodicalVolume+'，'+data[j].periodicalPage+ '</td></a>';
                if (data[j].selfSetting == '1' ) {
                    var table = '<tr><td><div><input type="checkbox" class="checked" id="'+data[j].id+'"/></div></td><td>' +data[j].enrollmentTime+'~'+data[j].graduationTime+'</td><td>'+ data[j].school +'</td><td>'+data[j].specialty+'</td><td>'+data[j].degree+'</td><td>'+data[j].nation+'</td>';
                }
                else if (data[j].selfSetting == '0'||data[j].selfSetting == null) {
                    var table = '<tr><td><div><input type="checkbox" class="unchecked" id="'+data[j].id+'"/></div></td><td>' +data[j].enrollmentTime+'~'+data[j].graduationTime+'</td><td>'+ data[j].school +'</td><td>'+data[j].specialty+'</td><td>'+data[j].degree+'</td><td>'+data[j].nation+'</td>';
                }

                second = second + table + '</tr>';
            }
            html = html + second + '</td></table></tr>';
        }
        return html;
    }
    //绘制工作经历表格
    function setworkTR(data) {
        if (1) {
            var html='<tr><td style="width: 30%">工作经历</td><input type="checkbox" class="checked"/><td><table class="detailInfo" border="2"><tr><td></td><td>起止时间</td><td>工作单位</td><td>职务</td><td>专业技术</td></tr>';
            var second = '';
            for (var j = 0; j < data.length; j++) {
                var endTime=((data[j].workEndTime== null)?"至今":data[j].workEndTime);
                // var table = '<tr><a href="'+data[j].thesisLink+'"><td style="text-align: left"><div style="display: inline-block;margin: 0 20px"><input type="checkbox" class="checked"/></div> <span>' +data[j].firstAuthor+'.'+ data[j].thesisTitle +'.'+data[j].periodical+'.'+data[j].publicationTime+'，'+data[j].periodicalVolume+'，'+data[j].periodicalPage+ '</td></a>';
                if (data[j].selfSetting == '1' ) {
                    var table = '<tr><td><div><input type="checkbox" class="checked" id="'+data[j].id+'"/></div></td><td>' +data[j].workStartTime+'~'+endTime+'</td><td>'+ data[j].workUnit +'</td><td>'+data[j].administrativePost+'</td><td>'+data[j].technology+'</td>';
                }
                else if (data[j].selfSetting == '0'||data[j].selfSetting == null) {
                    var table = '<tr><td><div><input type="checkbox" class="unchecked" id="'+data[j].id+'"/></div></td><td>' +data[j].workStartTime+'~'+endTime+'</td><td>'+ data[j].workUnit +'</td><td>'+data[j].administrativePost+'</td><td>'+data[j].technology+'</td>';
                }

                second = second + table + '</tr>';
            }
            html = html + second + '</td></table></tr>';
        }
        return html;
    }
    //绘制科研获奖表格
    function setScientificAwardTR(data) {
        if (1) {
            var html='<tr><td style="width: 30%">科研获奖信息</td><input type="checkbox" class="checked"/><td><table class="detailInfo" border="2"><tr><td></td><td>获奖名称</td><td>获奖等级</td><td>授奖单位</td><td>获奖时间</td></tr>';
            var second = '';
            for (var j = 0; j < data.length; j++) {
                // var table = '<tr><a href="'+data[j].thesisLink+'"><td style="text-align: left"><div style="display: inline-block;margin: 0 20px"><input type="checkbox" class="checked"/></div> <span>' +data[j].firstAuthor+'.'+ data[j].thesisTitle +'.'+data[j].periodical+'.'+data[j].publicationTime+'，'+data[j].periodicalVolume+'，'+data[j].periodicalPage+ '</td></a>';
                if (data[j].selfSetting == '1' ) {
                    var table = '<tr><td><div><input type="checkbox" class="checked" id="'+data[j].id+'"/></div></td><td>' +data[j].awardName+'</td><td>'+ data[j].degree +'</td><td>'+data[j].awardFromUnit+'</td><td>'+data[j].time+'</td>';
                }
                else if (data[j].selfSetting == '0'||data[j].selfSetting == null) {
                    var table = '<tr><td><div><input type="checkbox" class="unchecked" id="'+data[j].id+'"/></div></td><td>' +data[j].awardName+'</td><td>'+ data[j].degree +'</td><td>'+data[j].awardFromUnit+'</td><td>'+data[j].time+'</td>';
                }

                second = second + table + '</tr>';
            }
            html = html + second + '</td></table></tr>';
        }
        return html;
    }
    //绘制教学获奖表格
    function setEducateAwardTR(data) {
        if (1) {
            var html='<tr><td style="width: 30%">教学获奖信息</td><input type="checkbox" class="checked"/><td><table class="detailInfo" border="2"><tr><td></td><td>获奖名称</td><td>获奖等级</td><td>授奖单位</td><td>获奖时间</td></tr>';
            var second = '';
            for (var j = 0; j < data.length; j++) {
                // var table = '<tr><a href="'+data[j].thesisLink+'"><td style="text-align: left"><div style="display: inline-block;margin: 0 20px"><input type="checkbox" class="checked"/></div> <span>' +data[j].firstAuthor+'.'+ data[j].thesisTitle +'.'+data[j].periodical+'.'+data[j].publicationTime+'，'+data[j].periodicalVolume+'，'+data[j].periodicalPage+ '</td></a>';
                if (data[j].selfSetting == '1' ) {
                    var table = '<tr><td><div><input type="checkbox" class="checked" id="'+data[j].id+'"/></div></td><td>' +data[j].awardName+'</td><td>'+ data[j].awardDegree +'</td><td>'+data[j].awardFromUnit+'</td><td>'+data[j].awardTime+'</td>';
                }
                else if (data[j].selfSetting == '0'||data[j].selfSetting == null) {
                    var table = '<tr><td><div><input type="checkbox" class="unchecked" id="'+data[j].id+'"/></div></td><td>' +data[j].awardName+'</td><td>'+ data[j].awardDegree +'</td><td>'+data[j].awardFromUnit+'</td><td>'+data[j].awardTime+'</td>';
                }

                second = second + table + '</tr>';
            }
            html = html + second + '</td></table></tr>';
        }
        return html;
    }
    //绘制纵向（横向）项目信息表格
    function setScienticeProjectTR(data) {
        if (1) {
            var html='<tr><td style="width: 30%">科研项目信息</td><input type="checkbox" class="checked"/><td><table class="detailInfo" border="2"><tr><td></td><td>项目名称</td><td>项目类别</td><td>项目批准号</td><td>起止时间</td><td>项目负责人</td><td>本人排名</td></tr>';
            var second = '';
            for (var j = 0; j < data.length; j++) {
                // var table = '<tr><a href="'+data[j].thesisLink+'"><td style="text-align: left"><div style="display: inline-block;margin: 0 20px"><input type="checkbox" class="checked"/></div> <span>' +data[j].firstAuthor+'.'+ data[j].thesisTitle +'.'+data[j].periodical+'.'+data[j].publicationTime+'，'+data[j].periodicalVolume+'，'+data[j].periodicalPage+ '</td></a>';
                if (data[j].selfSetting == '1' ) {
                    var table = '<tr><td><div><input type="checkbox" class="checked" id="'+data[j].id+'"/></div></td><td>' +data[j].projectName+'</td><td>'+data[j].category+'</td><td>'+data[j].approvalNum+'</td><td>'+data[j].startTime+'~'+data[j].endTime+'</td><td>'+data[j].projectLeader+'</td><td>'+data[j].personRank+'</td>';
                }
                else if (data[j].selfSetting == '0'||data[j].selfSetting == null) {
                    var table = '<tr><td><div><input type="checkbox" class="unchecked" id="'+data[j].id+'"/></div></td><td>' +data[j].projectName+'</td><td>'+data[j].category+'</td><td>'+data[j].approvalNum+'</td><td>'+data[j].startTime+'~'+data[j].endTime+'</td><td>'+data[j].projectLeader+'</td><td>'+data[j].personRank+'</td>';
                }

                second = second + table + '</tr>';
            }
            html = html + second + '</td></table></tr>';
        }
        return html;
    }
    //绘制教学项目信息表格
    function setEducateProjectTR(data) {
        if (1) {
            var html='<tr><td style="width: 30%">教学信息</td><input type="checkbox" class="checked"/><td><table class="detailInfo" border="2"><tr><td></td><td>项目名称</td><td>项目编号</td><td>项目负责人</td><td>起止时间</td><td>项目来源</td><td>本人排名</td><td>项目性质</td></tr>';
            var second = '';
            for (var j = 0; j < data.length; j++) {
                // var table = '<tr><a href="'+data[j].thesisLink+'"><td style="text-align: left"><div style="display: inline-block;margin: 0 20px"><input type="checkbox" class="checked"/></div> <span>' +data[j].firstAuthor+'.'+ data[j].thesisTitle +'.'+data[j].periodical+'.'+data[j].publicationTime+'，'+data[j].periodicalVolume+'，'+data[j].periodicalPage+ '</td></a>';
                if (data[j].selfSetting == '1' ) {
                    var table = '<tr><td><div><input type="checkbox" class="checked" id="'+data[j].id+'"/></div></td><td>' +data[j].projectName+'</td><td>'+ data[j].projectNum +'</td><td>'+data[j].projectLeader+'</td><td>'+data[j].projectStartTime+'~'+data[j].projectEndTime+'</td><td>'+data[j].projectSource+'</td><td>'+data[j].projectPersonRank+'</td><td>'+data[j].projectNature+'</td>';
                }
                else if (data[j].selfSetting == '0'||data[j].selfSetting == null) {
                    var table = '<tr><td><div><input type="checkbox" class="unchecked" id="'+data[j].id+'"/></div></td><td>' +data[j].projectName+'</td><td>'+ data[j].projectNum +'</td><td>'+data[j].projectLeader+'</td><td>'+data[j].projectStartTime+'~'+data[j].projectEndTime+'</td><td>'+data[j].projectSource+'</td><td>'+data[j].projectPersonRank+'</td><td>'+data[j].projectNature+'</td>';
                }

                second = second + table + '</tr>';
            }
            html = html + second + '</td></table></tr>';
        }
        return html;
    }
    //绘制基本信息配置表格
    function setTR(item) {
        if ( item.config.id==1) {
            if (1) {
                var level2 = item.nextLevelConfigSet;
                for (var j = 0; j < level2.length; j++) {
                    if(level2[j].config.id=='5'){
                        if (1) {
                            var html = '<tr><td style="width: 30%"><div style="display: inline-block;width: 5%;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(level2[j].config) + '</p></div><span>' + level2[j].config.name + '</td><td id="config_field">';
                            var level3 = level2[j].nextLevelConfigSet;
                            var inTD = '';
                            for (var k = 0; k < level3.length; k++) {
                                if (level3[k].config.adminSetting == '1') {
                                    var field = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;width: 5%;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(level3[k].config) + '</p><input type="checkbox" class="checked" id="'+level3[k].config.id+'" data-count="'+level3[k].config.adminSetting+'" disabled/></div> <span style="display: inline-block;width: 45%;border-bottom: 1px solid #efefef;">'
                                        + level3[k].config.name +
                                        '</span></div>'
                                }
                                else if (level3[k].config.adminSetting == '0') {
                                    var field = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;width: 5%;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(level3[k].config) + '</p><input type="checkbox" class="unchecked" id="'+level3[k].config.id+'" data-count="'+level3[k].config.adminSetting+'" disabled/></div><span style="display: inline-block;width: 45%;border-bottom: 1px solid #efefef;">'
                                        + level3[k].config.name +
                                        '</span></div>'
                                }
                                else if (level3[k].config.adminSetting == '-1'&& level3[k].config.selfSetting == '0') {
                                    var field = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;width: 5%;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(level3[k].config) + '</p><input type="checkbox" class="unchecked" id="'+level3[k].config.id+'" data-count="'+level3[k].config.adminSetting+'"/></div><span style="display: inline-block;width: 45%;border-bottom: 1px solid #efefef;">'
                                        + level3[k].config.name +
                                        '</span></div>'
                                }
                                else if (level3[k].config.adminSetting == '-1'&& level3[k].config.selfSetting == '1') {
                                    var field = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;width: 5%;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(level3[k].config) + '</p><input type="checkbox" class="checked" id="'+level3[k].config.id+'" data-count="'+level3[k].config.adminSetting+'"/></div><span style="display: inline-block;width: 45%;border-bottom: 1px solid #efefef;">'
                                        + level3[k].config.name +
                                        '</span></div>'
                                }
                                inTD = inTD + field;
                            }
                            html = html + inTD + '</td></tr>';
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
                    var field_personPage = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(object[t].config) + '</p><input type="checkbox" class="checked" id="'+object[t].config.id+'" data-count="'+object[t].config.adminSetting+'" disabled/></div> <span style="display: inline-block;margin-right: 50px;border-bottom: 1px solid #efefef;">'
                        + object[t].config.name +
                        '</span></div>'
                }
                else if (object[t].config.adminSetting == '0') {
                    var field_personPage = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(object[t].config) + '</p><input type="checkbox" class="unchecked" id="'+object[t].config.id+'" data-count="'+object[t].config.adminSetting+'" disabled/></div><span style="display: inline-block;margin-right: 50px;border-bottom: 1px solid #efefef;">'
                        + object[t].config.name +
                        '</span></div>'
                }
                else if (object[t].config.adminSetting == '-1'&& object[t].config.selfSetting == '0') {
                    var field_personPage = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;width: 5%;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(object[t].config) + '</p><input type="checkbox" class="unchecked" id="'+object[t].config.id+'" data-count="'+object[t].config.adminSetting+'"/></div><span style="display: inline-block;width: 45%;border-bottom: 1px solid #efefef;">'
                        + object[t].config.name +
                        '</span></div>'
                }
                else if (object[t].config.adminSetting == '-1'&& object[t].config.selfSetting == '1') {
                    var field_personPage = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;width: 5%;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(object[t].config) + '</p><input type="checkbox" class="checked" id="'+object[t].config.id+'" data-count="'+object[t].config.adminSetting+'"/></div><span style="display: inline-block;width: 45%;border-bottom: 1px solid #efefef;">'
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
                                            var field_pro = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(level3[k].config) + '</p><input type="checkbox" class="checked" id="'+level3[k].config.id+'" data-count="'+level3[k].config.adminSetting+'" disabled/></div> <span style="display: inline-block;margin-right: 50px;border-bottom: 1px solid #efefef;">'
                                                + level3[k].config.name +
                                                '</span></div>'
                                        }
                                        else if (level3[k].config.adminSetting == '0') {
                                            var field_pro = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(level3[k].config) + '</p><input type="checkbox" class="unchecked" id="'+level3[k].config.id+'" data-count="'+level3[k].config.adminSetting+'" disabled/></div><span style="display: inline-block;margin-right: 50px;border-bottom: 1px solid #efefef;">'
                                                + level3[k].config.name +
                                                '</span></div>'
                                        }
                                        else if (level3[k].config.adminSetting == '-1'&& level3[k].config.selfSetting == '0') {
                                            var field_pro = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;width: 5%;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(level3[k].config) + '</p><input type="checkbox" class="unchecked" id="'+level3[k].config.id+'" data-count="'+level3[k].config.adminSetting+'"/></div><span style="display: inline-block;width: 45%;border-bottom: 1px solid #efefef;">'
                                                + level3[k].config.name +
                                                '</span></div>'
                                        }
                                        else if (level3[k].config.adminSetting == '-1'&& level3[k].config.selfSetting == '1') {
                                            var field_pro = '<div style="width: 50%;display: inline-block"><div style="display: inline-block;width: 5%;border-bottom: 1px solid #efefef;"><p style="display:none">' + JSON.stringify(level3[k].config) + '</p><input type="checkbox" class="checked" id="'+level3[k].config.id+'" data-count="'+level3[k].config.adminSetting+'"/></div><span style="display: inline-block;width: 45%;border-bottom: 1px solid #efefef;">'
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
    ele.change(function () {
        var change_config = JSON.parse($(this).parent().text());
        if(this.checked==true){
            $(this).removeClass();
            $(this).addClass("checked");
            var currConfig_id=$(this).attr("id");
            console.log($("#"+currConfig_id).parent().text());
            var change_config=JSON.parse($("#"+currConfig_id).parent().text());
            change_config.selfSetting='1';
            change_config['username']=currentUsername;
            change_config['currentRoleId']=currentRoleUid;
            change_config['beOperatedRoleId']=currentRoleUid;
            change_config['target']='2';
            all_checked.push(change_config);
        }
        else{
            $(this).removeClass();
            $(this).addClass("unchecked");
            var currConfig_id=$(this).attr("id");
            var change_config=JSON.parse($("#"+currConfig_id).parent().text());
            change_config.selfSetting='0';
            change_config['username']=currentUsername;
            change_config['currentRoleId']=currentRoleUid;
            change_config['beOperatedRoleId']=currentRoleUid;
            change_config['target']='2';
            all_checked.push(change_config);
        }
        // change_config['username']=currentUsername;
        // change_config['currentRoleId']=currentRoleUid;
        // change_config['beOperatedRoleId']=currentRoleUid;
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
    });
    //设置true或false来这只选与不选
    $(".checked").prop("checked",true);
    e("teacher_WebsiteConfig",{})
});
//提交基本信息配置结果(管理员配置)
function editConfigResult() {
    var allConfig=$("#config_field input[type=checkbox]");
    var count=0;
    for(var i=0;i<allConfig.length;i++){
        if(allConfig[i].className=='checked'){
            if(allConfig[i].id!='205'&&allConfig[i].id!='204'&&allConfig[i].id!='301'){
                count++;
            }
        }
    }
    if(count>8){
        alert("最多只能显示8项！")
    }
    else {
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

