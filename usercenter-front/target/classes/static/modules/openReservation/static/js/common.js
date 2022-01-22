/*
 * xm-select 查询用户
 */
function searchUsername() {
    var usernameSearch = xmSelect.render({
        el: '#username',
        name: 'username',
        autoRow: true,
        radio: true,
        tips: '请输入用户名查询',
        toolbar: { show: true },
        theme: {color: '#0081ff'},
        style: {
          width: '200px'
        },
        filterable: true,
        remoteSearch: true,
        remoteMethod: function (val, cb, show) {
            if (!val) {
                return cb([])
            }
            $.ajax({
                url: oauth2Host + '/resource/search',
                contentType: 'application/json',
                data: {"cname": val},
                success: function (res) {
                    let result = res.data.map(v => {
                        return {"value": v.username, "name": v.cname}
                    });
                    // 此处没有查重过滤
                    cb(result);
                },
                error: function (err) {
                    cb([])
                }
            })
        }
    });
    return usernameSearch;
}

/*
 * 时间块
 */
function time_partition(start_time, end_time, interval) {
    this.start_time = start_time;
    this.end_time = end_time;
    this.interval = interval;
    this.initialize();
}
time_partition.prototype = {
    initialize: function() {
        var shour = this.start_time.getHours();
        var sminute = this.start_time.getMinutes();
        var ehour = this.end_time.getHours() || 24;
        var eminute = this.end_time.getMinutes();

        var interval = this.interval;
        var allMinute = ehour * 60 + eminute - shour * 60 - sminute;
        var divNum = allMinute / interval;
        if(divNum % 1 === 0) { //判断是不是整数
            var nTM = 0;
            var nTH = 0;
            for(var i = 0; i < divNum; i++) {
                if(i === 0) {
                    var tempHour = shour;
                    var tempMinute = sminute;
                }
                if(typeof(tempMinute) == 'string') {
                    nTM = parseInt(tempMinute);

                } else {
                    nTM = tempMinute;
                }
                if(typeof(tempHour) == 'string') {
                    nTH = parseInt(tempHour);
                } else {
                    nTH = tempHour
                }

                var ss = nTH * 60 + nTM + interval;
                var fHour = parseInt(ss / 60);
                var fMinute = ss % 60;

                tempHour = this.getTwoDigitMinuteOrHour(tempHour);
                tempMinute = this.getTwoDigitMinuteOrHour(tempMinute);
                fHour = this.getTwoDigitMinuteOrHour(fHour);
                fMinute = this.getTwoDigitMinuteOrHour(fMinute);

                // 时间输出
                var timStr = tempHour + ":" + tempMinute + "~" + fHour + ":" + fMinute;

                // 渲染时间块
                let tr = `<tr>
                                    <th>${timStr}</th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>`;
                $('#timer').append(tr);
                tempHour = fHour;
                tempMinute = fMinute;

                // 监听渲染时间块
                $('.appoiontment_time_after').remove();
            }
        }
    },
    // 预约时间块操作
    load: function (data, start, currUser) {

    },
    getTwoDigitMinuteOrHour: function (minuteOrHour) {
        if (minuteOrHour < 10 && typeof (minuteOrHour) == "number") {
            return 0 + String(minuteOrHour);//javascript之深入浅出加号
        }
        return minuteOrHour;
    },
}
/*
 * 日期
 */
function setTimeReservation(interval_time, configMachineUid, maxInterval, minInterval, isAcrossDay, maxAheadHour, username, userSchoolAcademy, openScope, academyNumber) {
    var cells = document.getElementById('monitor').getElementsByTagName('th');
    var clen = cells.length;
    var currentFirstDate;

    // debugger
    var formtDate = function (date) {
        var year = date.getFullYear() + '年';
        if (date.getMonth() < 9) {
            var month = '0' + (date.getMonth() + 1) + '月';
        } else {
            var month = (date.getMonth() + 1) + '月';
        }
        if (date.getDate() < 10) {
            var day = '0' + date.getDate() + '日';
        } else {
            var day = date.getDate() + '日';
        }

        var week = '(' + ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'][date.getDay()] + ')';

        // return year + month + day + ' ' + week;
        return `<div data="${date.getDay()}" style="text-align: center">${year + month + day}</div><div style="text-align: center">${week}</div>`
    }
    var addDate = function (date, n) {
        date.setDate(date.getDate() + n);
        return date;
    }
    var setDate = function (date) {
        var week = date.getDate() - 1;
        // date = addDate(date, week * -1);
        currentFirstDate = new Date(date);
        for (var i = 1; i < clen; i++) {
            cells[i].innerHTML = formtDate(i == 1 ? date : addDate(date, 1));
        }
    }
    let isTable = new time_partition(new Date('2021-10-13 00:00:00'), new Date('2021-10-14 00:00:00'), interval_time * 60);
    document.getElementById('last-week').onclick = function(){
        setDate(addDate(currentFirstDate,-7));
        setNotOpenTimes(configMachineUid, isTable, isAcrossDay, maxAheadHour, username, userSchoolAcademy, openScope, academyNumber)
    };
    document.getElementById('next-week').onclick = function(){
        setDate(addDate(currentFirstDate,7));
        setNotOpenTimes(configMachineUid, isTable, isAcrossDay, maxAheadHour, username, userSchoolAcademy, openScope, academyNumber)
    };
    setDate(new Date());
    setNotOpenTimes(configMachineUid, isTable, isAcrossDay, maxAheadHour, username, userSchoolAcademy, openScope, academyNumber)
}

function setNotOpenTimes(configMachineUid, isTable, isAcrossDay, maxAheadHour, username, userSchoolAcademy, openScope, academyNumber) {
    $('#timer').empty();
    isTable.initialize();
    // 设置不可预约时间块, 此处计算方式消耗性能
    let notOpenTimes = NotOpenTimes(configMachineUid);
    $('#monitor>thead>tr>th').find('div:eq(0)')
    let dateArr = [];
    let weekArr = [];
    $.each($('#monitor>thead>tr>th').find('div:eq(0)'), function (index, item) {
        dateArr.push($(item).text().replace(/([年月])/g, '-').replace(/日/g, ''));
        if ($(item).attr('data') === "0") {
            weekArr.push("7")
        } else {
            weekArr.push($(item).attr('data'))
        }

    })
    let timeArr = [];
    $.each($('#timer>tr').find('th:eq(0)'), function (index, item) {
        timeArr.push($(item).text())
    })
    let nowDate = new Date().format("yyyy-MM-dd hh:mm:ss").split(' ');
    // if (!maxAheadHour) {
    //     maxAheadHour = 0;
    // }
    let appointmentDate = setAppointment(username);

    // let mDateTime = new Date().getTime() + Number(maxAheadHour) * 60 * 60 * 1000;
    // let mNewDateTime = new Date(mDateTime).format("yyyy-MM-dd hh:mm:ss").split(' ');
    let lenTime = timeArr.length;
    //此处禁用当前时间之前的模块
    for (let j = 0; j < dateArr.length; j++) {
        // 1、对比当前列表时间小于当前时间
        if (new Date(dateArr[j]).getTime() < new Date(new Date().format("yyyy-MM-dd")).getTime()) {
            for (let i = 0; i < lenTime; i++) {
                $('#timer>tr:eq(' + i + ')').find('td:eq('+ j +')').addClass('bgblue').removeClass('bggrey');
            }
        }
        // 2、当前天
        if (new Date(dateArr[j]).getTime() == new Date(new Date().format("yyyy-MM-dd")).getTime()) {
            for (let i = 0; i < lenTime; i++) {
                let timeData = timeArr[i].split('~');
                if (isByTime(timeData[0], timeData[1], nowDate[1]) && isByTime(timeData[0], timeData[1], nowDate[1])) {
                    $('#timer>tr:eq(' + i + ')').find('td:eq('+ j +')').addClass('bgblue').removeClass('bggrey');
                }
            }
        }
        // 2、当前列表时间大于当前时间
        if (new Date(dateArr[j]).getTime() >= new Date(new Date().format("yyyy-MM-dd")).getTime()) {
            // 判断是否是当前用户所在学院 userSchoolAcademy, openScope, academyNumber
            // 是
            if (openScope == 2) {
                if (academyNumber) {
                    let arr = academyNumber.split(',');
                    if (userSchoolAcademy) {
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i] === arr.academyNumber) {
                                for (let i = 0; i < notOpenTimes.length; i++) {
                                    let start = new Date(notOpenTimes[i].startDate).getTime();
                                    let end = new Date(notOpenTimes[i].endDate).getTime();
                                    for (let j = 0; j < dateArr.length; j++) {
                                        let modelDate = new Date(dateArr[j]).getTime();
                                        let nowDateTime = new Date(nowDate[0]).getTime();

                                        if (modelDate < nowDateTime) {
                                            $('#timer>tr').find('td:eq('+ j +')').addClass('bggrey');
                                        }
                                        // if (modelDate > mDateTime) {
                                        //     $('#timer>tr').find('td:eq('+ j +')').addClass('bggrey');
                                        // }
                                        // if (modelDate == new Date(mNewDateTime[0]).getTime()) {
                                        //     for (let k = 0; k < timeArr.length; k++) {
                                        //         let timeData = timeArr[k].split('~');
                                        //         if (!isByTime(timeData[0], timeData[1], mNewDateTime[1])) {
                                        //             $('#timer>tr:eq(' + k + ')').find('td:eq('+ j +')').addClass('bggrey');
                                        //         }
                                        //     }
                                        // }
                                        if (start <= modelDate && modelDate <= end) { // 日期是否在这个范围之内
                                            setPastTime(modelDate, nowDate, timeArr, j)
                                            if (notOpenTimes[i].weekdays) {
                                                let weekdays = notOpenTimes[i].weekdays.split(',');
                                                for (let n = 0; n < weekdays.length; n++) {
                                                    if (weekArr[j] === weekdays[n]) {
                                                        //时间段比较
                                                        timesCompare(timeArr, notOpenTimes[i].startTime, notOpenTimes[i].endTime, j);
                                                    }
                                                }
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
            }
            // 否 不进行限制

        }

    }


    var label_date = []; // 顶部日期存储
    var content_time = []; // 左侧时间段存储
    $("#timer>tr>td").on("click", function() {
        $(this).attr('class');
        if ($(this).attr('class')) {
            $(this).removeClass('td_select');
        } else {
            $(this).addClass('td_select');
        }
        var index = $(this).parents('tr').find('td').index($(this));
        var thAry = $('thead tr th');

        var date_str = $(thAry[index + 1]).find('div').eq(0).text();


        // 遍历日期 如果日期存在则不进行操作，否则添加
        let count = 0; //标记
        let label_index; // 下标
        let save_date = ''; //日期存储
        for (let i = 0; i < label_date.length; i++) {
            if (label_date[i] === date_str) {
                count = 1;
                label_index = i;
            }
        }
        if (count == 0) {
            label_date.push(date_str);
            label_index = label_date.length - 1;
            content_time.push([])
        }
        if (isAcrossDay == 0 && label_date.length > 1) {
            layer.msg('不允许跨天预约');
            if ($(this).attr('class')) {
                $(this).removeClass('td_select');
            }
            label_date.pop();
            content_time.pop();
        } else {
            save_date = $(this).closest('tr').find('th').text();
            let content_count = 0;
            let content_index; //下标


            for (let i = 0; i < content_time[label_index].length; i++) {
                if (content_time[label_index][i] === save_date) {
                    content_count = 1;
                    content_index = i;
                }
            }
            if (content_count === 0) {
                content_time[label_index].push(save_date);
            } else {
                content_time[label_index].splice(content_index, 1);
            }
            if (content_time[label_index].length === 0) {
                label_date.splice(label_index, 1);
                content_time.splice(label_index, 1);
            }
        }
        let app_time = '';
        for (let i = 0; i < label_date.length; i++) {
            app_time += setAppointmentTime(label_date[i], compare(content_time[i]));
        }
        if (content_time.length === 0) {
            $('.appoiontment_time_after').remove();
        }
        $('.appoiontment_time').after(app_time)
    })
}
// 日期转换
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}
function timesCompare(data, start, end, x) {
    //时分秒比较， 类比为同一天时间
    for (let k = 0; k < data.length; k++) {
        let timeData = data[k].split('~');
        if (isDateTimes(start, end, timeData[0]) || isDateTimes(start, end, timeData[1])) {
            $('#timer>tr:eq(' + k + ')').find('td:eq('+ x +')').addClass('bggrey');
        }
    }
}
function setPastTime(modelDate, nowDate, data, x) {
    let dateBy = new Date(nowDate[0]).getTime();
    for (let k = 0; k < data.length; k++) {
        let timeData = data[k].split('~');
        if (modelDate <= dateBy && isByTime(timeData[0], timeData[1], nowDate[1])) {
            $('#timer>tr:eq(' + k + ')').find('td:eq('+ x +')').addClass('bggrey');
        }
    }
}
function isDateTimes(beginStart, beginEnd, currD) { //时间是否在区间内当
    let startC = new Date('2021-11-10 ' + beginStart).getTime();
    let endC = new Date('2021-11-10 ' + beginEnd).getTime();
    let currDate = new Date('2021-11-10 ' + currD).getTime();
    if (currDate >= startC && currDate <= endC) {
        return true;
    } else {
        return false;
    }
}
function isByTime(beginStart, beginEnd, currD) { //时间是否在区间外的
    let startC = new Date('2021-11-10 ' + beginStart).getTime();
    let endC = new Date('2021-11-10 ' + beginEnd).getTime();
    let currDate = new Date('2021-11-10 ' + currD).getTime();
    if (currDate >= endC && currDate >= startC) {
        return true;
    } else {
        return false;
    }
}

//时间段排序
function compare(val) {
    let time = []
    // 1.去除重复时间
    for (let el of val) {
        let i = el.split('~')
        // 这里把一个元素里的两个时间取出来，已经存在的时间去除掉，没有的时间则保存
        time.includes(i[0]) ? time.splice(time.indexOf(i[0]), 1) : time.push(i[0])
        time.includes(i[1]) ? time.splice(time.indexOf(i[1]), 1) : time.push(i[1])
    }
    let date = []
    // 2.时间排序，拼装成时间戳方便比较值
    for (let i of time) {
        const j = '2020-01-01 ' + i
        const item = Date.parse(j)
        date.push(item)
    }
    const time2 = date.sort()
    let time3 = []
    // 3.重组时间
    for (let i = 0; i < time2.length; i = i + 2) {
        const date1 = new Date(time2[i])
        const date2 = new Date(time2[i + 1])
        const hours1 = '000' + date1.getHours()
        // 这里补零是为了保持分钟数至少是两位数，后面再用slice取后两位
        const minutes1 = '000' + date1.getMinutes()
        const hours2 = '000' + date2.getHours()
        const minutes2 = '000' + date2.getMinutes()
        const item = hours1.slice(-2) + ':' + minutes1.slice(-2) + '~' + hours2.slice(-2) + ':' + minutes2.slice(-2)
        time3.push(item)
    }
    return time3
}
// 已预约时间
function setAppointment(username) {
    let arr = [];
    $.ajax({
        url: `${appointmentHost}/appList/${1}/${99999}`,
        type: 'GET',
        async: false,
        data: {
          'appUser': username
        },
        success: function (res) {
            if (res.data) {
                arr = res.data;
            }
        }
    })
    return arr;
}
function setOptions(type, list, uid, obj) {
    let data = '';
    if (type === "RADIO") {
        for (let i = 0; i < list.length; i++) {
            let input = `<input type="radio" class="layui-input va_save" name="${uid}"
                                                       autocomplete="off"  value="${list[i].value}" title="${list[i].value}"/>`;
            data += input;
        }
    }
    if (type === "CHECKBOX") {
        for (let i = 0; i < list.length; i++) {
            let input = `<input class="va_save_checkbox" type="checkbox" name="${uid}" value="${list[i].value}" title="${list[i].value}"/>`;
            data += input;
        }
    }
    if (type === "SELECT") {
        let select = `<select class="va_save" name="${uid}">
							${setSelect(list)}
						  </select>`;
        // $(obj).append(select);

        data += select;
    }
    return data;
}

function setSelect(list) {
    let data = '';
    data += `<option>请选择</option>`
    for (let i = 0; i < list.length; i++) {
        let option = `<option value="${list[i].value}">${list[i].value}</option>`;
        data += option;
    }
    return data;
}

function setAppointmentTime(date, time) {
    $('.appoiontment_time_after').remove();
    let app_time = `<div class="layui-col-lg12 appoiontment_time_after">
                       <label class="layui-form-label">${date.replace(/([年月])/g, '-').replace(/日/g, '')}</label>
                       <div class="layui-input-block">
                           <input type="button" class="layui-input" name="date"
                                  autocomplete="off" value="${time.join()}" title="${time.join()}"/>
                       </div>
                   </div>`;
    return app_time;
}

function getCheckedBox(obj) {
    let check_val = [];
    if ($(obj).find("input[type=checkbox]")) {
        $.each($('.va_save_checkbox:checked'), function (index1, obj1) {
            check_val.push($(obj1).val())
        })
    }
    return check_val.join(',');
}
/*
 * 不可预约时间段
 */
function NotOpenTimes(configMachineUid) {
    let arr = [];
    $.ajax({
        url: deviceHost + 'getMachineNotOpenTimes',
        type: 'GET',
        async: false,
        data: {"configMachineUid": configMachineUid},
        success: function (res) {
            arr = res.data;
        }
    });
    return arr;
}
/*
 * 用户列表
 */
function setUsername() {
    var usernameSearch = xmSelect.render({
        el: '#username',
        name: 'username',
        autoRow: true,
        radio: true,
        tips: '请选择人员',
        toolbar: { show: true },
        theme: {color: '#0081ff'},
        style: {
          width: '200px'
        },
        filterable: true,
        remoteSearch: true,
        remoteMethod: function (val, cb, show) {
            if (!val) {
                return cb([])
            }
            $.ajax({
                url: oauth2Host + '/resource/search',
                contentType: 'application/json',
                data: {"cname": val},
                success: function (res) {
                    let result = res.data.map(v => {
                        return {"value": v.username, "name": v.cname}
                    });
                    // 此处没有查重过滤
                    cb(result);
                },
                error: function (err) {
                    cb([])
                }
            })
        }
    });
    return usernameSearch;
}
/*
 * 设置时间段
 */
function setPeriodTime(start_time, end_time, interval, status) {
    var shour = start_time.getHours();
    var sminute = start_time.getMinutes();
    var ehour = end_time.getHours() || 24;
    var eminute = end_time.getMinutes();

    var interval = interval;
    let arr = [];
    var allMinute = ehour * 60 + eminute - shour * 60 - sminute;
    var divNum = allMinute / interval;
    if(divNum % 1 === 0) { //判断是不是整数
        var nTM = 0;
        var nTH = 0;
        for(var i = 0; i < divNum; i++) {
            if(i === 0) {
                var tempHour = shour;
                var tempMinute = sminute;
            }
            if(typeof(tempMinute) == 'string') {
                nTM = parseInt(tempMinute);

            } else {
                nTM = tempMinute;
            }
            if(typeof(tempHour) == 'string') {
                nTH = parseInt(tempHour);
            } else {
                nTH = tempHour
            }

            var ss = nTH * 60 + nTM + interval;
            var fHour = parseInt(ss / 60);
            var fMinute = ss % 60;

            tempHour = getMinuteOrHour(tempHour);
            tempMinute = getMinuteOrHour(tempMinute);
            fHour = getMinuteOrHour(fHour);
            fMinute = getMinuteOrHour(fMinute);

            // 时间输出
            var timStr = tempHour + ":" + tempMinute + status + fHour + ":" + fMinute;

            arr.push(timStr)
            tempHour = fHour;
            tempMinute = fMinute;

        }
    }
    arr = arr.map(v => {
        return { 'name': v, 'value': v};
    })
    return arr;
}
function getMinuteOrHour(minuteOrHour) {
    if (minuteOrHour < 10 && typeof (minuteOrHour) == "number") {
        return 0 + String(minuteOrHour);//javascript之深入浅出加号
    }
    return minuteOrHour;
}
/*
 * 实验室列表
 */
function setLabs(selector) {
    var xm = xmSelect.render({
        el: `${selector}`,
        paging: true,
        pageRemote: true,
        filterable: true,
        radio: true,
        theme: {color: '#0081ff'},
        style: {
            width: '200px',
        },
        remoteMethod: function(val, cb, show, pageIndex){
            //这里如果val为空, 则不触发搜索
            if(!val){
                return cb([]);
            }
            $.ajax({
                url: labRoomHost + '/api/labroom/getSelectLabRoom',
                type: 'POST',
                headers: {'x-datasource': 'limsproduct'},
                contentType: 'application/json',
                data: JSON.stringify({"offset": pageIndex, "limit": 10, "search": val}),
                success: function (res) {
                    let result = res.data.map(v => {
                        return {"value": v.id, "name": v.labRoomName}
                    });
                    // 此处没有查重过滤
                    let page = Math.ceil(res.count / 10);
                    cb(result, page);
                },
                error: function (err) {
                    cb([], 0)
                }
            })
        }
    })
    return xm;
}