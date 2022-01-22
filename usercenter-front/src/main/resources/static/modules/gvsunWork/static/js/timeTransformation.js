/**
 * 方法 时间格式转换    2021-03-10T06:41:38.000+00:00
 *                   2021-03-10T06:41:38Z
 */
function renderTime(date) {
    var dateee = new Date(date).toJSON();
    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

<!--日期计算 -->
/*
 *根据起始日期，间隔天数，推算截止日期
 */
window.getNewData = function(dateTemp, days) {
    var dateTemp = dateTemp.split("-");
    var daysTemp = dateTemp[2].split(" ");
    var timeTemp = daysTemp[1].split(":");
    // var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + daysTemp[0] + ' ' + timeTemp[0] + ':' : ); //转换为MM-DD-YYYY格式
    var nDate = new Date(dateTemp);
    var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
    var rDate = new Date(millSeconds);
    var year = rDate.getFullYear();
    var month = rDate.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var date = rDate.getDate();
    if (date < 10) date = "0" + date;
    var hours = rDate.getHours();
    if (hours < 10) hours = "0" + hours;
    var minutes = rDate.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    var seconds = rDate.getSeconds();
    if (seconds < 10) seconds = "0" + seconds;
    return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
};
/*
 *根据起止日期计算间隔天数
 */
function  getDaysBetween(startDate,endDate){
    var  startDate = Date.parse(startDate);
    var  endDate = Date.parse(endDate);
    var days=(endDate - startDate)/(1*24*60*60*1000);
    return  days;
};
/*
 *删除数组中指定项
 */
function removeArrValue(arr, val){
    for (let i = 0; i < arr.length; i++){
        if (arr[i] == val){
            arr.splice(i, 1);
            break;
        }
    }
    return arr;
}
/*
 * 方法用于上传文件回显后删除
 */
window.deleteFile = function (id, _this){
    let tr = _this.parentNode.parentNode;
    resourceContainer.deleteFileById({
        success: function(res){
            let url = $('#fileUrl');
            let arrId = url.val().split(',');
            let newId = removeArrValue(arrId, id);
            url.val(newId.toString());
            layer.msg('删除成功');
            tr.remove();
        },
        fail: function(res){
            console.log("失败" + res)
        },
        fileId: id,
        needToken: false
    })
}
/**
 * 方法用于回显文件下载
 * @param id
 */
window.fileDownload = function (id){
    resourceContainer.downLoadFile({
        fileId: id,
        fail: function (res){
            console.log("失败" + res);
        }
    })
}
/*
 * 去重
 */
function duplicateRemoval(studentArr){
    let obj = {};
    let student = studentArr.reduce((cur, next) => {
        obj[next.value] ? "" : obj[next.value] = true && cur.push(next);
        return cur;
    }, []); //设置cur默认类型为数组，并且初始值为空的数组
    return student;
}
/*
 * 方法封装需循环调用 获取小组成员
 * */
function getStudent(assignmentId, username, student, siteId){
    $.ajax({
        url: httpBaseUrl + 'api/notInGroupStudents',
        type: 'GET',
        async: false,
        data: {"assignmentId": assignmentId, "usernames": username, "cid": siteId},
        success: function (res){
            let data = res;
            student = res;
            student = data.map(v => {
                return {"value": v.username, "title": v.cname}
            })
        }
    });
    return student;
}

/**
 * 数据筛选
 */
function filterStudent(d, x){
    let result = []
    for(let i = 0; i < x.length; i++) {
        result.push(d.find((v, t) => {
            return v.username == x[i]
        }))
    }
    return result
}

/**
 * 方法  获取当前登陆数据源信息
 */
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

/**
 * 方法  新增/编辑章节渲染
 */
//渲染章
function selectChapter(chapter, form, siteId){
    $.ajax({
        url: httpBaseUrl + 'api/chapterListApi',
        type: 'GET',
        async: false,
        data: {"moduleType": chapter, "cid": siteId},
        success: function (res){
            for (let i = 0;i < res.length; i++){
                let chapterList = `<option value="${res[i].id}">${res[i].name}</option>`;
                $('#chapter').append(chapterList);
                form.render('select');
            }

        }
    });
}

/**
 * 方法 小节渲染
 */
function lessonData(results, form){
    //渲染节
    $.ajax({
        url: httpBaseUrl + 'api/lessonListApi',
        type: 'GET',
        async: false,
        data: {"chapterId": results},
        success: function (res){
            for (let i = 0; i < res.length; i++){
                let lessonList = `<option value="${res[i].id}">${res[i].title}</option>`;
                $('#lesson').append(lessonList);
                form.render('select');
            }
        }
    })
}

/**
 * 方法触发   新建/编辑 在提交表单是触发
 * 参数说明 （表单数据， 系统设置内容，穿梭框对象， 普通作业开启重复作业批量添加时的数量，小组作业自定义批量添加小组, 作业要求， 作业类型）
 */

function getField(field, getConfiguration, transfer, numOrdinary, groupNum, requirement, category) {
    let repeatTitles = $('.repeatTitles');
    let repeatRequirements = $('.repeatRequirements');
    let repeatStarts = $('.repeatStarts');
    let repeatEnds = $('.repeatEnds');
    let arrRepeatTitles = [];
    let arrRepeatRequirements = [];
    let arrRepeatStarts = [];
    let arrRepeatEnds = [];
    // 是否同步总成绩
    field['isGradeToTotalGrade'] = 0
    field['requirement'] = requirement;
    if (field.groupIds !== "") {
        field["groupIds"] = field.groupIds.split(",");
    } else {
        field["groupIds"] = [];
    }
    //默认配置项
    if (getConfiguration.transcript == '0'){
        field['isToGradebook'] = '0';
    }
    if (getConfiguration.duplicateChecking == '0'){
        field['isDuplicateChecking'] = '0';
    }
    repeatTitles.each(function (index, obj){
        arrRepeatTitles.push($(obj).val());
    })
    repeatRequirements.each(function (index, obj){
        arrRepeatRequirements.push($(obj).val());
    })
    repeatStarts.each(function (index, obj){
        arrRepeatStarts.push($(obj).val());
    })
    repeatEnds.each(function (index, obj){
        arrRepeatEnds.push($(obj).val());
    })


    //小组作业 自定义小组
    let teamName = $('.teamName');
    let profession = $('.profession');
    let arrTeamName = [];
    let arrProfession = [];
    teamName.each(function (index, obj){
        arrTeamName.push($(obj).val())
    });
    profession.each(function (index, obj){
        let count = index + 1;
        let c = [];
        let b = [];
        transfer.getData('profession0' + count).map((v, i) => {
            c.push(v.value);
        });
        arrProfession.push(c.toString())
    })
    //判断是否是小组作业
    if (field.type == '0'){
        field['isGroup'] = '0';
    } else {
        field['isGroup'] = '1';
    }
    if (category === "knowledge" || category == 'null' || category == null || category === ""){
        field['category'] = "1";
    } else if (category === 'skill') {
        field['category'] = "200";
    } else if (category === 'experience'){
        field['category'] = "3";
    } else {
        field['category'] = "200";
        field['type'] = "200";
    }
    //根据开始时间类型设置开始日期
    if (field.starttype == '1'){
        if (selectDateTime == ''){
            alert('开始时间为课表节次，请选择开始节次时间');
            return false;
        } else {
            field['startDate'] = selectDateTime;
        }
    }

    //普通作业判断是否开启重复
    if (field.repeatwork == '不开启重复作业'){
        field['repeatNum'] = '';
        field['repeatTitles'] = [];
        field['repeatRequirements'] = [];
        field['repeatStarts'] = [];
        field['repeatEnds'] = [];
    } else {
        //重复作业操作
        if (numOrdinary == "" || numOrdinary == null || numOrdinary == undefined){
            // field['repeatNum'] = '';
        } else {
            field['repeatNum'] = numOrdinary;
            $('.new_normal_homework').empty();
        }
        if (repeatTitles.val() != null || repeatRequirements.val() != null){
            field['repeatNum'] = '';
            field['repeatTitles'] = arrRepeatTitles;
            field['repeatRequirements'] = arrRepeatRequirements;
            field['repeatStarts'] = arrRepeatStarts;
            field['repeatEnds'] = arrRepeatEnds;
        }
    }
    //根据小组来源提交数据
    if (field.groupSource == 1){
        field['groupUsernames'] = arrProfession;
        field['groupTitle'] = arrTeamName;
        //自定义
        if(parseFloat(groupNum) != 'NaN') {
            field['groupNum'] = groupNum;
            $('.new_team_homework').empty();
        }
    } else {
        field['groupUsernames'] = [];
        field['groupTitle'] = [];
        field['groupNum'] = '';
    }

    return field;
}

/**
 * 引用方法 封装localStorage 加有效时限
 */

class Storage{
    constructor(name){
        this.name = 'storage';
    }
    // 1209600000  //默认缓存14天
    //设置缓存
    setItem(params){
        let obj = {
            name:'',
            value:'',
            expires: '',
            startTime: new Date().getTime()//记录何时将值存入缓存，毫秒级
        }
        let options = {};
        //将obj和传进来的params合并
        Object.assign(options,obj,params);
        if(options.expires){
            //如果options.expires设置了的话
            //以options.name为key，options为值放进去
            localStorage.setItem(options.name,JSON.stringify(options));
        }else{
            //如果options.expires没有设置，就判断一下value的类型
            let type = Object.prototype.toString.call(options.value);
            //如果value是对象或者数组对象的类型，就先用JSON.stringify转一下，再存进去
            if(Object.prototype.toString.call(options.value) == '[object Object]'){
                options.value = JSON.stringify(options.value);
            }
            if(Object.prototype.toString.call(options.value) == '[object Array]'){
                options.value = JSON.stringify(options.value);
            }
            localStorage.setItem(options.name,options.value);
        }
    }
    //拿到缓存
    getItem(name){
        let item = localStorage.getItem(name);
        //先将拿到的试着进行json转为对象的形式
        try{
            item = JSON.parse(item);
        }catch(error){
            //如果不行就不是json的字符串，就直接返回
            item = item;
        }
        //如果有startTime的值，说明设置了失效时间
        if(item.startTime){
            let date = new Date().getTime();
            //何时将值取出减去刚存入的时间，与item.expires比较，如果大于就是过期了，如果小于或等于就还没过期
            if(date - item.startTime > item.expires){
                //缓存过期，清除缓存，返回false
                localStorage.removeItem(name);
                return false;
            }else{
                //缓存未过期，返回值
                return item.value;
            }
        }else{
            //如果没有设置失效时间，直接返回值
            return item;
        }
    }
    //移出缓存
    removeItem(name){
        localStorage.removeItem(name);
    }
    //移出全部缓存
    clear(){
        localStorage.clear();
    }
}

/**
 * 方法  作业要求 添加附件回显
 * 参数说明 （上传文件列表， 插入元素节点， 资源容器认证参数。，。。。）
 */

function tableAttachmentEcho(fileUrl, pblist, siteEnName, siteSecret) {
    if (fileUrl != "" && fileUrl != null && fileUrl){
        $('#fileUrl').val(fileUrl);
        let fileIdArr = fileUrl.split(",");
        resourceContainer.getFilesByIds({
            success: function(data){
                let result = data;
                for (let i = 0; i < result.length; i++){
                    let row = `<tr><td class="wordbreak">${result[i].fileName}</td><td>${(result[i].size / 1024).toFixed(1) }kb </td><td>已上传</td><td><button type="button" class="layui-btn layui-btn-xs layui-btn-danger demo-delete" onclick="deleteFile(${result[i].id}, this)">删除</button></td></tr>`;
                    pblist.append(row);
                }


            },
            fail: function(res){
                console.log('失败' + res);
            },
            fileIds: fileIdArr,
            siteEnName: siteEnName,
            siteSecret: siteSecret
        })
    }
}

/**
 * 方法 普通作业开启重复作业时新增模版
 */

function addHomeworkModel(homeworkModelCount){
    let row = `<div class="layui-form-item once_normal_homework_box">
						<div class="fill_box">
							<div class="layui-row layui-col-space20 layui-form-item">
								<div class="layui-col-lg12">
									<label class="layui-form-label">作业名称</label>
									<div class="layui-input-block">
										<input class="layui-input repeatTitles" autoComplete="off" placeholder="请输入"/>
									</div>
								</div>
								<div class="layui-col-lg8">
									<label class="layui-form-label">开始时间</label>
									<div class="layui-input-block">
										<input class="layui-input repeatStarts" id="startdate${homeworkModelCount}" autoComplete="off"
											   placeholder="请输入"/>
									</div>
								</div>
								<div class="layui-col-lg4">
									<label class="layui-form-label">时长</label>
									<div class="layui-input-block">
										<input type="hidden" name="repeatEnds" class="repeatEnds">
											<input class="layui-input repeat_inputtext" name="duration" autoComplete="on"
												   lay-verify="required" value="14"/>
											<font>天</font>
									</div>
								</div>
								<div class="layui-col-lg12">
									<label class="layui-form-label">作业要求</label>
									<div class="layui-input-block">
										<textarea id="requirement${homeworkModelCount}" class="repeatRequirements" style="display: none;"
												  placeholder="请输入作业要求" lay-verify="requirement"></textarea>
									</div>
								</div>
								<div class="layui-col-lg12 tr">
									<input class="layui-btn layui-btn-red deletenormalhomework" type="button"
										   onclick="getDelnormal(this);" value="删除作业"/>
								</div>
							</div>
						</div>
					</div>`;
    return row;
}

/**
 * 方法 切换课程
 */
function selectAllTCourseSite($layui, xm) {
    $('.searchbox .layui-btn').on('click', function() {
        var cid = xm.getValue('valueStr');
        var url = parent.location.href;
        if (url.indexOf("#") > 0)
        {
            url = url.slice(url.indexOf("#"));
        }
        parent.location.href="mainindex?cid="+cid + url;
    });
}

/**
 * 获取所有的课程
 */
function setCourseSite(selector, siteId, layui$){
    var xm = xmSelect.render({
        el: `${selector}`,
        paging: true,
        pageRemote: true,
        filterable: true,
        radio: true,
        style: {
            width: '200px',
        },
        theme: {
            color: '#aaa',
        },
        remoteMethod: function(val, cb, show, pageIndex){
            //这里如果val为空, 则不触发搜索
            if(!val){
                let courseData = findCourseSiteById(siteId)
                return cb([{ "value": courseData.id, "name": courseData.title, "selected": true}]);
                // return cb([])
            }
            $.ajax({
                url: httpBaseUrl + '/api/getAllCourseInfoApi',
                type: 'GET',
                data: {"page": pageIndex, "limit": 10, "search": val},
                success: function (res) {
                    let result = res.data.map(v => {
                        return {"value": v.id, "name": v.title}
                    });
                    // 此处没有查重过滤
                    let page = Math.ceil(res.count / 10);
                    cb(result, page);
                },
                error: function (err) {
                    cb([], 0)
                }
            })
            //切换课程
            selectAllTCourseSite(layui$, xm);
        }
    })
}
/*
 * 根据课程id查询单个课程 此接口来自于考试
 */
function findCourseSiteById(siteId) {
    let data = {};
    $.ajax({
        url: httpBaseUrlExam + '/api/findCourseSiteById',
        type: 'GET',
        async: false,
        data: {"siteId": siteId},
        dataType: 'json',
        success: function (res) {
            data = res;
        }
    })
    return data;
}
/**
 * 获取附件类型
 */
function getAppendixType(str) {
    let arr = str.split(",");
    let string = '';
    for (let i = 0; i < arr.length; i++) {
        arr[i] == "0" ? string = " 所有" : arr[i] == "1" ? string += " PDF" : arr[i] == "2" ? string += " WORD" : arr[i] == "3" ? string += " EXCEL" : arr[i] == "4" ? string += " 图片" : "";
    }
    return string;
}

/**
 * 获取要求附件
 */
function getAttachment(fileUrl, form, siteEnName, siteSecret) {
    let fileid = [];
    if (fileUrl) {
        fileid = fileUrl.split(",");
    } else {
        fileid = [];
        let row = `<div class="layui-input-block">
										<a href="javascript:void(0)">
											<input type="button" class="layui-input readinputbtn" name="file" autocomplete="off" value="无" readonly="readonly" />
										</a>
								   </div>`;
        $('#fileDownload').append(row);
        form.render();
    }
    //渲染提交附件
    resourceContainer.getFilesByIds({
        success: function (data){
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    let row = `<div class="layui-input-block">
										<a href="javascript:void(0)" class="file_download" title="下载附件" onclick="fileDownload(${data[i].id})">
											<input type="button" class="layui-input readinputbtn" name="file" autocomplete="off" value="${data[i].fileName}" readonly="readonly" />
										</a>
								   </div>`;
                    $('#fileDownload').append(row);
                    form.render();
                }
            }

        },
        fail: function (res){
            console.log("失败:" + res);
            if (fileid || fileid.length === 0) {
                let row = `<div class="layui-input-block">
										<a href="javascript:void(0)">
											<input type="button" class="layui-input readinputbtn" name="file" autocomplete="off" value="无" readonly="readonly" />
										</a>
								   </div>`;
                $('#fileDownload').append(row);
                form.render();
            }
        },
        fileIds: fileid,
        siteEnName:siteEnName,
        siteSecret:siteSecret
    })
}

/**
 *  table表格中 文件回显
 */
// 此方法用于获取文件  //批量获取渲染不出
window.getFileId = function (fileId){
    if (fileId !== "" && fileId !== null && parseFloat(fileId).toString() !== "NaN"){
        fileId = fileId.split(",");
        for (let i = 0; i < fileId.length; i++){
            resourceContainer.getFileById({
                success: function (data){
                    let saveFile = $('#saveFile').html('');

                    if (saveFile == undefined || saveFile == null || saveFile == "" || saveFile){
                        let row = `<a class="file_download" onclick="fileDownload(${data.id})" title="下载附件">${data.fileName.split(".", 1)}</a>`;
                        $('#saveFile').append(row)
                    } else {
                        let row = `<a class="file_download" onclick="fileDownload(${data.id})" title="下载附件">${data.fileName.split(".", 1) + ' ' + '|'}</a>`;
                        $('#saveFile').append(row)
                    }
                    sessionStorage.setItem("saveFile", saveFile.html())
                },
                fail: function (res){
                    console.log("失败:" + res);
                },
                fileId: fileId[i],
                needToken: true
            })
        }
    } else {
        sessionStorage.setItem("saveFile", "");
    }
}
/**
 * 设置权限控制
 */
function setConfigShow(type, title_head) {
    if (type === null || type === "null" || type === "") {
        type = 'knowledge';
    }
    if (title_head === null || title_head === "null" || title_head === "") {
        title_head = 'assignment';
    }
    if (type === "200") {
        type = 'skill';
    }
    $.ajax({
        url: httpBaseUrl + 'api/getConfigShowData',
        type: 'GET',
        async: false,
        data: {"module": type, "type": title_head},
        success: function (res){
            let data = res;
            if (data) {
                if (data.transcript === 1) {
                    $("input[name='isToGradebook']").parent().parent().show();

                }
                if (data.duplicateChecking === 1) {
                    $("input[name='isDuplicateChecking']").parent().parent().show();
                }
                if (data.transcript === 1 && data.duplicateChecking === 0) {
                    $("input[name='isToGradebook']").parent().parent().addClass('layui-col-lg4').removeClass('layui-col-lg3');
                    $("input[name='commitTime']").parent().parent().addClass('layui-col-lg4').removeClass('layui-col-lg3');
                    $("input[name='submitLate']").parent().parent().addClass('layui-col-lg4').removeClass('layui-col-lg3');
                }
                if (data.transcript === 0 && data.duplicateChecking === 1) {
                    $("input[name='isDuplicateChecking']").parent().parent().show();
                    $("input[name='commitTime']").parent().parent().addClass('layui-col-lg4').removeClass('layui-col-lg3');
                    $("input[name='submitLate']").parent().parent().addClass('layui-col-lg4').removeClass('layui-col-lg3');
                }
                if (data.experiment === 1 && data.lesson === 1) {
                    $("input[name='lessonId']").parent().parent().show();
                    $("input[name='project']").parent().parent().show();
                    $("input[name='chapterId']").parent().parent().addClass('layui-col-lg4').removeClass('layui-col-lg12');
                    $("input[name='lessonId']").parent().parent().addClass('layui-col-lg4').removeClass('layui-col-lg6');
                    $("input[name='project']").parent().parent().addClass('layui-col-lg4').removeClass('layui-col-lg6');
                }
                if (data.experiment === 0 && data.lesson === 1) {
                    $("input[name='lessonId']").parent().parent().show();
                    $("input[name='chapterId']").parent().parent().addClass('layui-col-lg6').removeClass('layui-col-lg12');
                }
                if (data.experiment === 1 && data.lesson === 0) {
                    $("input[name='project']").parent().parent().show();
                    $("input[name='chapterId']").parent().parent().addClass('layui-col-lg6').removeClass('layui-col-lg12');
                }
            }
        }
    })
}

/**
 * 渲染- 实验项目
 */
function projectData(siteId, form) {
    $.ajax({
        url: httpBaseUrl + 'api/getAllExpProjectInSite',
        type: 'GET',
        async: false,
        data: {"siteId": siteId},
        success: function (res) {
            for (let i = 0;i < res.length; i++){
                let chapterList = `<option value="${res[i].id}">${res[i].experimentName}</option>`;
                $('#project').append(chapterList);
                form.render('select');
            }
        }
    })
}
/**
 * 附件类型回显
 */
function enclosureShow(appendixType) {
    let str = '';
    if (appendixType) {
        let arr = appendixType.split(",");
        for (let i in arr) {
            if (arr[i] === "0") {
                str += '所有';
            } else if (arr[i] === "1") {
                str += ' ' + 'PDF';
            } else if (arr[i] === "2") {
                str += ' ' + 'WORD';
            } else if (arr[i] === "3") {
                str += ' ' + 'EXCEL';
            } else if (arr[i] === "4") {
                str += ' ' + '图片';
            }
        }
    }
    return str;
}

/**
 * 上传限制
 */
function uploadFile(appendixType) {
    let fileType = '';
    if (appendixType) {
        let arr = appendixType.split(",");
        for (let i in arr) {
            if (arr[i] === "0") {
                fileType = 'JPG|GIF|PNG|JPEG|DOC|DOCX|XLS|XLSX|PDF'
            } else if (arr[i] === "1") {
                fileType += 'PDF|';
            } else if (arr[i] === "2") {
                fileType += 'DOC|DOCX|';
            } else if (arr[i] === "3") {
                fileType += 'XLS|XLSX|';
            } else if (arr[i] === "4") {
                fileType += 'JPG|GIF|PNG|JPEG|';
            }
        }
    }
    return fileType;
}
/**
 * 小组类别
 */
function setGroupCategory(siteId) {
    let data = [];
    $.ajax({
        url: httpBaseUrl + 'api/getGroupCategoryBySiteId',
        type: 'GET',
        async:false,
        data: {"siteId": siteId},
        success: function (res) {
            data = res;
        }
    });
    return data;
}
/**
 * 类型过滤
 */
function setAcceptMime(type) {
    let typeArr = [];
    let ectString = "";
    if (type !== "") {
        typeArr = type.split(",");
    }
    for (let i = 0; i < typeArr.length; i++) {
        if (typeArr[i] === "0") {
            ectString = "jpg|png|gif|bmp|jpeg|pdf|doc|docx|xlsx|xls|jpg|png|gif|bmp|jpeg|txt|mp4|zip|rar|7z";
            i = typeArr.length;
        }
        if (typeArr[i] === "1") {
            ectString += "|pdf"
        }
        if (typeArr[i] === "2") {
            ectString += "|doc|docx"
        }
        if (typeArr[i] === "3") {
            ectString += "|xlsx|xls"
        }
        if (typeArr[i] === "4") {
            ectString += "|jpg|png|gif|bmp|jpeg"
        }
        if (typeArr[i] === "5") {
            ectString += "|txt"
        }
    }
    return ectString;
}
/**
 * 发送短信/邮件处增加提示
 */
var tip_index = 0;
window.showTips = function (obj){
    //给当前单元格加事件
    let td = $(obj).parent().parent();
    tip_index = layer.tips('点击发送短信或邮件', td, {tips: [1, '#409eff'], time: 4000})
}
window.closeTips = function (){
    layer.close(tip_index);
}