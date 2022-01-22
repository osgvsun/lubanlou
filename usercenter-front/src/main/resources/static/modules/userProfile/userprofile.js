let rightContent = document.getElementById('option_tap');
let topTitle = document.getElementsByClassName('title_div')[0];
let introduce = document.getElementsByClassName('introduce')[0];
let peopleTable = document.getElementById('peopleTable');
function outstandingTalents() {
    peopleTable.innerHTML = '';
    introduce.innerHTML = '';
    rightContent.innerHTML = '';
    let topContent = `<i class="fa fa-arrow-circle-o-right fa-2x icon-grey" aria-hidden="true"></i>
                        <span class="title">杰出人才</span>`;
    topTitle.innerHTML = topContent;
    $.ajax({
        url: usercenterHost + '/cms/getPhenomList',
        type: 'GET',
        async: false,
        success: function (res) {
            if(!res.code){
                var data=res.data;
                for(var key in data){
                    var td='<td class="td-value">';
                    var lable='<tr><td class="td-key">'+key+'</td>';
                    var peopleValue=data[key];
                    for(var i=0;i<peopleValue.length;i++){
                        if(peopleValue[i].cname.length)
                            // var hrefUrl="../html/teacher_info.html?beUsername="+peopleValue[i].username+"&beCname="+peopleValue[i].cname+"&imgId="+peopleValue[i].identificationPhoto+'&profession='+peopleValue[i].profession;
                            var tdValue='<span><a oncontextmenu="return false" title="'+peopleValue[i].cname+'" onclick="getUserInformation('+peopleValue[i].username+', \''+ peopleValue[i].cname + '\', \''+ peopleValue[i].profession + '\')">'+peopleValue[i].cname+'</a></span>';
                        td=td+tdValue;
                    }
                    var html=lable+td+'</td></tr>';
                    $("#peopleTable").append(html);
                }
            }
            else
            {
                alert(res.msg);
            }

        }
    });
}

function getCollege() {
    let leftMenu = document.getElementsByClassName('m_s_l_ul')[0];
    //学院
    $.ajax({
        url: usercenterHost + '/dropDownBoxController/getCollege',
        type: 'GET',
        success: function (res) {
            let data = res.data;
            for (let i = 0; i < data.length; i++){
                // let rowTalents = `<li style="cursor:pointer" onclick="outstandingTalents()">杰出人才</li>`;
                let row =  `<li style="cursor:pointer" onclick="isHidden('${data[i].id}', '${data[i].college}')">${data[i].college}</li>`;
                let newDiv = document.createElement('div');
                newDiv.setAttribute('class', 'left_level');
                newDiv.innerHTML=row;
                leftMenu.appendChild(newDiv);
            }
        }
    });
}

function isHidden(id, title){
    // let show_content = document.getElementsByClassName('show_content')[0];
    peopleTable.innerHTML = '';
    introduce.innerHTML = '';
    rightContent.innerHTML = '';
    let topContent = `<i class="fa fa-arrow-circle-o-right fa-2x icon-grey" aria-hidden="true"></i>
                        <span class="title">${title}</span>`;
    topTitle.innerHTML = topContent;
    $.ajax({
        url: usercenterHost + '/gvsuncms/users',
        async: false,
        type: "GET",
        data:{collegeId: id},
        success: function (res) {
            let data = res.data;
            // userList(res)
            if (data != '' && data != null){
                for (var i = 0;i < data.length; i++){
                    let row = `<div class="intro" onclick="getUserInformation(${data[i].username}, '${data[i].cname}', '${data[i].political}')" onmouseover="outShow(this)" onmouseleave="outHide(this)">
                                   <div class="intro_left">
                                       <div class="img">
                                            <img class="pesonImg pesonImg${data[i].identificationPhoto}" src="${data.identificationPhoto ? data.identificationPhoto : 'images/userhead_bg2.png'}" data="${data[i].identificationPhoto}" />
                                       </div>
                                   </div>
                                   <div class="intro_right">
                                       <li>姓名: ${data[i].cname}</li>
                                       <li>学号: ${data[i].username}</li>
                                       <li>电话: ${data[i].phone}</li>
                                       <li>邮箱: ${data[i].email}</li>
                                       <li>状态: ${data[i].state} <i style="float: right; line-height: 30px; display: none" class="fa fa-chevron-circle-right" title="查看更多"></i></li>
                                   </div>
                               </div>`;
                    let newA = document.createElement('a');
                    newA.innerHTML=row;
                    rightContent.appendChild(newA);
                }
            }
            setImage('.pesonImg')
        }
    });
}
function outShow(obj) {
    $(obj).find('i').show()
}

function outHide(obj) {
    $(obj).find('i').hide()
}
function getUserInformation(username, cname, profession){
    peopleTable.innerHTML = '';
    introduce.innerHTML = '';
    rightContent.innerHTML = '';
    let topContent = `<i class="fa fa-arrow-circle-o-right fa-2x icon-grey" aria-hidden="true"></i>
                        <span class="title">${cname}</span>`;
    topTitle.innerHTML = topContent;
    $.ajax({
        url: usercenterHost + '/getTeacherBasicInfo',
        async: false,
        type: "GET",
        data:{username: username},
        success: function (res) {
            let data = res.data;
            if (data.length != 0){
                // for (var i = 0; i < data.length; i++){
                let row = `<div>
                                    <div class="detail_left">
                                        <div class="detail_img">
                                            <img class="img img${data.identificationPhoto}" src="${data.identificationPhoto ? data.identificationPhoto : 'images/userhead_bg2.png'}" data="${data.identificationPhoto}"/>
                                        </div>
                                    </div>
                                    <div class="detail_right">
                                        <div class="deBasicInfo">
                                            <ul>
                                                <li id="cname" style="display: none">姓名：${data.cname}</li>
                                                <li id="email" style="display: none">邮箱：${data.email}</li>
                                                <li id="phone" style="display: none">手机号：${data.phone}</li>
                                                <li id="state" style="display: none">人员状态：${data.state}</li>
                                            </ul>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div>
                                    <div class="name researchInterests">
                                        <label style="font-weight: bold;font-size: 16px;color: #5f5d5d">研究兴趣</label>
                                        <div class="text_indet" id="researchInterests">${screening(data.researchInterests)}</div>
                                    </div>
                                    <div class="name resume">
                                        <label style="font-weight: bold;font-size: 16px;color: #5f5d5d">个人简介</label>
                                        <div>
                                            <div id="resume" class="resumeInfo text_indet">${screening(data.resume)}</div>
                                        </div>
                                    </div>
                                </div>`;
                introduce.innerHTML = row;

            }
            setImage('.img');
        }
        // }
    });


    //信息显示
    personShow(username, cname, profession);
}

function screening(val) {
    let str = ``;
    if (val) {
        str = val.replace(/\r?\n/g,"<br/>").replace(/\s/g, '&nbsp');
    }
    return str
}

function setImage(imgClass) {
    let arr = []; //存放id
    let arrData = []; //回放
    $(imgClass).each(function (index,ele){
        let data = $(ele).attr('data');
        arrData.push(data)
        if (data != null && parseFloat(data).toString() !== "NaN") {
            arr.push(data);
        }
    });
    console.log(arrData)
    if (arr.length === 0) {
        $(imgClass).attr('src', httpBaseUrl + 'images/userhead_bg2.png');
    }
    resourceContainer.getFilesByIds({
        success: function (fileDtos) {
            for (let i = 0;i < fileDtos.length; i++) {
                $(`${imgClass}` + fileDtos[i].id).attr("src", fileDtos[i].url)
            }
        }, fail: function (msg) {
            alert(msg);
        },
        fileIds: arr,
        siteEnName: siteEnName,
        siteSecret: siteSecret
    });
}
// 根据状态动态显示
function personShow(username, cname){
    $.ajax({
        url: usercenterHost + '/getMenuTree',
        async: false,
        type: "GET",
        data: {
            roleId: 2,
            beOperatedRoleName: 'ROLE_TEACHER',
            username: username,
            target: 2
        },
        contentType: "json;charset=UTF-8",
        success: function (configTree) {
            var TreeLevel1 = configTree.nextLevelConfigSet;
            for (var i = 0; i < TreeLevel1.length; i++) {
                if (TreeLevel1[i].config.id == 1) {
                    TreeLevel2 = TreeLevel1[i].nextLevelConfigSet;
                    // 优先判断职称,姓名，邮箱，部门是否显示
                    for (var j = 0; j < TreeLevel2.length; j++) {
                        if (TreeLevel2[j].config.adminSetting == 1 || TreeLevel2[j].config.selfSetting == 1) {
                            if (TreeLevel2[j].config.id == 5) {
                                var basicTree = TreeLevel2[j].nextLevelConfigSet;
                                for (var k = 0; k < basicTree.length; k++) {
                                    if (basicTree[k].config.adminSetting == 1 || basicTree[k].config.selfSetting == 1) {
                                        if (basicTree[k].config.id == 11) {
                                            $("#cname").show();
                                        } else if (basicTree[k].config.id == 201) {
                                            $("#email").show();
                                        } else if (basicTree[k].config.id == 188) {
                                            $("#phone").show();
                                        } else if (basicTree[k].config.id == 203) {
                                            $("#state").show();
                                        }
                                    }

                                }
                            }
                            if (TreeLevel2[j].config.id == 6) {
                                var postInfoTree = TreeLevel2[j].nextLevelConfigSet;
                                for (var k = 0; k < postInfoTree.length; k++) {
                                    if (postInfoTree[k].config.field == 'profession') {
                                        if (postInfoTree[k].config.adminSetting == 1 || postInfoTree[k].config.selfSetting == 1) {
                                            $("#profession").parent().show();
                                            $("#profession").html(profession)
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // 再判断其他字段的显示
                    for (var j = 0; j < TreeLevel2.length; j++) {
                        if (TreeLevel2[j].config.adminSetting == 1 || TreeLevel2[j].config.selfSetting == 1) {
                            if (TreeLevel2[j].config.id == 5) {
                                var basicTree = TreeLevel2[j].nextLevelConfigSet;
                                for (var k = 0; k < basicTree.length; k++) {
                                    if (basicTree[k].config.adminSetting == 1 || basicTree[k].config.selfSetting == 1) {
                                        if (basicTree[k].config.id == 204) {
                                            $(".researchInterests").show();
                                            var researchInterestsHtml = '<lable style="font-weight: bold;\n' +
                                                '            font-size: 16px;color: #5f5d5d">' + basicTree[k].config.name + '</lable>' +
                                                '<div><span id="' + basicTree[k].config.field + '"></span></div>'
                                            $(".researchInterests").append(researchInterestsHtml);

                                        } else if (basicTree[k].config.id == 205) {
                                            $(".resume").show();
                                            var resumeHtml = '<lable style="font-weight: bold;\n' +
                                                '            font-size: 16px;color: #5f5d5d">' + basicTree[k].config.name + '</lable>' +
                                                '<div><pre id="' + basicTree[k].config.field + '" class="resumeInfo"></pre></div>'
                                            $(".resume").append(resumeHtml);
                                        } else if (basicTree[k].config.id != 11 && basicTree[k].config.id != 201 && basicTree[k].config.id != 73) {
                                            var userInfoHtml = ' <div class="basic_item_div">\n'
                                                + basicTree[k].config.name + '：\n' +
                                                '                                <span id="' + basicTree[k].config.field + '"></span>\n' +
                                                '                    </div>';
                                            if ($(".item_left").children(":visible").length < 4) {
                                                $(".item_left").append(userInfoHtml);
                                            } else {
                                                $(".item_right").append(userInfoHtml);
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    }

                }
                if (TreeLevel1[i].config.id == 301) {
                    if (TreeLevel1[i].config.adminSetting == 1 || TreeLevel1[i].config.selfSetting == 1) {
                        var personPage = '               <div class="basic_item_div" style="width: 100%;padding: 0 1%">\n' +
                            '                        个人主页：\n' +
                            '                        <a href="personMainPage?username=' + username + '&cname=' + cname + '" target="_blank">\n' +
                            '                           <i class="fa fa-university fa-1x"></i>' +
                            '                        </a>\n' +
                            '                    </div>';
                    }

                }

            }
            $(".deBasicInfo").append(personPage);
            console.log(configTree);
        }
    })
}
$(function () {
    $('.talents').first().get(0).click();
    getCollege();
});