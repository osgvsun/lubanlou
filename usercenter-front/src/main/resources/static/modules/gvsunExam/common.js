// 此处放值需要频繁调用的js
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
 * 渲染章节
 */
function findChapterMap(siteId, moduleType) {
    let data = {};
    $.ajax({
        url: httpBaseUrl + '/api/editExam/findChapterMap?siteId=' + siteId,
        type: 'POST',
        async: false,
        data: {'moduleType': moduleType},
        dataType: 'json',
        success: function (res) {
            data = res;
        }
    })
    return data;
}
/**
 * 渲染小结
 */
function findLessonMap(chapterId) {
    let data = {};
    $.ajax({
        url: httpBaseUrl + '/api/editExam/findLessonMap',
        type: 'POST',
        async: false,
        data: {'chapterId': chapterId},
        dataType: 'json',
        success: function (res) {
            data = res;
        }
    })
    return data;
}
/**
 * 学院列表
 */
function findAllAcademys() {
    let data = {};
    let course = findCourseSiteById(siteId).title;
    if (course === "全校考试") {
        $.ajax({
            url: httpBaseUrl + '/api/findAllAcademys',
            type: 'GET',
            async: false,
            dataType: 'json',
            success: function (res) {
                data = res;
            }
        })
        return data;
    }
}
/**
 * 根据学院动态获取班级列表
 */
function findAllClasses(schoolAcademy) {
    let data = {};
    $.ajax({
        url: httpBaseUrl + '/api/findAllClasses',
        type: 'GET',
        async: false,
        data: {"schoolAcademy": schoolAcademy},
        dataType: 'json',
        success: function (res) {
            data = res;
        }
    })
    return data;
}
/**
 * 查询所有试卷库分类
 */
function findAllExamQuestpoolCategory(selector, form) {
    $.ajax({
        url: httpBaseUrl + '/api/findAllExamQuestpoolCategory',
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (res) {
            let data = res;
            if (data) {
                for (let i in data) {
                    let option = `<option value="${data[i].id}">${data[i].title}</option>`;
                    $(selector).append(option);
                    form.render();
                }
            }
        }
    })
}
/**
 * 根据试卷库分类渲染试卷库
 */
function findExamQuestionpool(category, selector, form) {
    $.ajax({
        url: httpBaseUrl + '/api/findExamQuestionpool',
        type: 'GET',
        async: false,
        data: {"category": category},
        dataType: 'json',
        success: function (res) {
            $(selector).empty();
            let data = res;
            if (data) {
                let options = `<option>请选择</option>`;
                $(selector).append(options);
                for (let i in data) {
                    let option = `<option value="${data[i].examQuestionpoolId}">${data[i].title}</option>`;
                    $(selector).append(option);
                    form.render();
                }
            }
        }
    })
}
/**
 * 通过课程id查询课程
 */
function findCourseSiteById(siteId) {
    let data = {};
    $.ajax({
        url: httpBaseUrl + '/api/findCourseSiteById',
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
 * 根据补考状态，获取当前课程补考所对应的原考试
 */
function findMakeUpExamList(selector, siteId) {
    let data = {};
    $.ajax({
        url: httpBaseUrl + '/api/findMakeUpExamList',
        type: 'GET',
        async: false,
        data: {"siteId": siteId},
        dataType: 'json',
        success: function (res) {
            data = res;
            if (data) {
                for (let i in data) {
                    let option = `<option value="${data[i].id}">${data[i].title}</option>`;
                    $(selector).append(option);
                    layui.form.render('select');
                }
            }
        }
    })
}
/**
 * 方法 切换课程
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
            }
            $.ajax({
                url: httpBaseUrl + '/api/findAllTCourseSite',
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
            selectAllTCourseSite(layui.$, xm);
        }
    })
}
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
 * 判断学生是否在课程中
 */
function getIsStudentInSite(siteId, username) {
    let flag = true;
    $.ajax({
        url: httpBaseUrl + '/views/isStudentInSite',
        type: 'GET',
        async: false,
        data: {"cid": siteId, "username": username},
        success: function (res) {
            flag = res;
        }
    })
    return flag;
}