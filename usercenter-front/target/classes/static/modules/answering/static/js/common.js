/*
 * 答疑
 */
function setContent() {
    var content = xmSelect.render({
        el: '#content',
        tips: '请选择答疑内容',
        style: {
            width: '200px'
        },
        theme: {
            color: '#0081ff',
        },
        radio: true
    });
    $.ajax({
        url: labRoomHost + '/api/school/apiSchoolCourseInfoListBySelect',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({"search": ""}),
        success: function (res) {
            let data = res.results;
            let arr = [];
            if (data) {
                arr = data.map(v => {
                    return { "name": v.text, "value": v.id}
                })
            }
            content.update({
                data: arr
            })
        }
    })
}
/*
 * 学期
 */
function setSemester(callback, teacher, status) {
    var semester = xmSelect.render({
        el: '#semester',
        tips: '请选择学期',
        style: {
            width: '200px'
        },
        theme: {
            color: '#0081ff',
        },
        layVerify: "required",
        radio: true,
        filterable: true,
        on: function (data) {
            if (status) {
                callback(teacher, data.arr[0].id)
            }
        }
    });
    let initValue = ''
    $.ajax({
        url: datashareHost + '/openapi/getSchoolTermList',
        type: 'GET',
        async: false,
        success: function (res) {

            let data = res.data;
            let arr = [];
            if (data) {
                arr = data.map((v, i) => {
                    if (v.nowTerm == 1) {
                        initValue = v.id
                        return { "name": v.termName, "value": v.termNumber, "id": v.id, "selected": true}
                    } else {
                        return { "name": v.termName, "value": v.termNumber, "id": v.id}
                    }
                })
            }
            semester.update({
                data: arr
            })

        }
    })
    return {vm: semester, init: initValue};
}

/*
 * 数据源
 */
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}


/*
 * 去重
 */
function duplicateRemoval(dataArr){
    let obj = {};
    let arr = dataArr.reduce((cur, next) => {
        obj[next.value] ? "" : obj[next.value] = true && cur.push(next);
        return cur;
    }, []); //设置cur默认类型为数组，并且初始值为空的数组
    return arr;
}
/*
 * 计算星期
 */
function weekDay(date){
    var dt = new Date(date.split("-")[0], date.split("-")[1]-1,date = date.split("-")[2]);
    console.log(dt)
    // var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var weekDay = ["7", "1", "2", "3", "4", "5", "6"];
    return weekDay[dt.getDay()];
}
function isDateTimes(beginStart, beginEnd, start, end) { //时间是否在区间内当
    // 如果选择时间 开始时间 > 列表时间 || 结束时间 < 列表时间
    let startC = new Date('2021-11-10 ' + beginStart).getTime();
    let endC = new Date('2021-11-10 ' + beginEnd).getTime();
    let startT = new Date('2021-11-10 ' + start).getTime();
    let endT = new Date('2021-11-10 ' + end).getTime();
    if ((endC >= startC && endC <= startT) || (endT >= startC && endT <= startT)) {
        return true;
    } else {
        return false;
    }
}
function getClasses(dataTime) {
    let data1 = dataTime.split(' - ');
    let startTime = new Date('2021-11-10 ' + data1[0]).getTime();
    let endTime = new Date('2021-11-10 ' + data1[1]).getTime();
    if (startTime > endTime) {
        layer.msg('请规范选择起始时间');
        $('#time_input').val('');
        return false;
    }
    let timeData = [];
    $.ajax({
        url: datashareHost + '/openapi/getSchoolTimeList',
        type: 'GET',
        async: false,
        success: function (res) {
            console.log(res)
            timeData = res.data;
        }
    })

    let section = []
    for (let i = 0; i < timeData.length; i++) {
        if (isDateTimes(data1[0], timeData[i].sectionStartDate, data1[1], timeData[i].sectionEndDate)) {
            section.push(timeData[i].section)
        }
    }
    return section
}
function renderTime(date) {
    var dateee = new Date(date).toJSON();
    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}
function getJWTAuthority(currUser) {
    var authorization ="";
    $.ajax({
        type: "POST",
        async: false,
        url: oauth2 + "/getAuthorization",
        data: { "siteEnName": siteEnName, "username": currUser, "type": 1},
        success: function (data) {
            authorization = data.result;
        }
    });
    return authorization;
}