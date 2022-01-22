var contextPath = $("meta[name='contextPath']").attr("content");
var zuulUrl ="";
$(document).ready(function () {
    zuulUrl =$("#zuulServerUrl").val()+"/timetable/";
    var url = zuulUrl + "api/timetable/common/apiViewTimetableInfo";
    $("#table_timetable_info").bootstrapTable({
        //使用get请求到服务器获取数据
        method: "POST",
        //必须设置，不然request.getParameter获取不到请求参数
        contentType: "application/x-www-form-urlencoded",
        //获取数据的Servlet地址
        url: url,
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParams: queryParams,
        ajaxOptions:{
            headers: {Authorization: getJWTAuthority()}
        },
        //表格显示条纹
        striped: true,
        cache: false,
        //启动分页
        pagination: false,
        //是否启用排序
        sortable: true,
        //排序方式
        sortOrder: "asc",
        sortName: 'cname',
        //每页显示的记录数
        //当前第几页
        pageNumber: 1,
        //记录数可选列表
        pageList: [5, 10, 15, 20, 25],
        //是否启用查询
        search: false,
        searchAlign: 'left',
        //是否启用详细信息视图
        detailView: false,
        //表示服务端请求
        sidePagination: "server",
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParamsType: "limit",
        //json数据解析
        responseHandler: function (res) {
            return {
                "rows": res.rows,
                "total": res.total
            };
        },
        //数据列
        columns: [{
            //field: 'Number',//可不加
            title: '序号',//标题  可不加
            width: "5%",
            formatter: function (value, row, index) {
                return index + 1;
            }
        }, /*{
            title: "教学班编号",
            field: "courseNo",
            width: "20%",
            sortable: true
        }, {
            title: "课程名称",
            field: "courseNumber",
            width: "20%",
            sortable: true,
            formatter: function (value, row, index) {
                return row.courseName + "(" + row.courseNumber + ")";
            }
        }, */{
            title: "排课时间",
            field: "timetable",
            width: "25%",
            sortable: true
        }, {
            title: "所属实验室",
            field: "labInfo",
            width: "22%",
            sortable: true
        }, {
            title: "授课教师",
            field: "teachers",
            width: "10%",
            sortable: true
        }, {
            title: "辅导",
            field: "tutors",
            width: "10%",
            sortable: true
        }, {
            title: "实验项目",
            field: "items",
            width: "15%",
            sortable: true
        }, {
            title: "操作",
            field: "empty",
            width: "18%",
            formatter: function (value, row, index) {
                var rt = "<button  onclick='doEduReCourse("+ row.sameNumberId + ")' ><span class='glyphicon glyphicon-edit'>编辑</span></button>&nbsp;";
                rt += "<button  onclick='deleteTimetable(" + row.sameNumberId + ")' ><span class='glyphicon glyphicon-remove'>删除</span></button>&nbsp;";
                return rt;
            }
        }]
    });

    $('#labRoom_id').select2({
        width: "95%",
        closeOnSelect: false,
        cache: false,
        placeholder: '请输入实验室...',
        placeholderOption: "first",
        ajax: {
            url: zuulUrl + "api/labroom/apiLabRoomListBySelect",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority());
            },
            type: "post",
            data: function (params) {
                var classes = "";
                // $("input:checkbox[name='classes']:checked").each(function() { // 遍历name=standard的多选框
                //     classes += $(this).val()+",";
                // });
                $("#section_box >div").each(function(){
                    // alert($(this).attr("id"));  //打印子div的ID
                    if($(this).hasClass('layui-form-checked')){
                        classes += $(this).attr("value")+",";
                    }
                });
                classes = classes.slice(0,classes.length-1);
                var weekss = "";
                $("#week_box>div").each(function(){
                    // alert($(this).attr("id"));  //打印子div的ID
                    if($(this).hasClass('layui-form-checked')){
                        weekss += $(this).attr("value")+",";
                    }
                });
                weekss = weekss.slice(0,weekss.length-1);
                var soft = $('#soft_id').val();
                // var classes = $('#classes').val();
                // var classes = $('#section_box').val();
                // var weeks = $('#weeks').val();

                var arr = new Object();
                arr.soft = soft.join();
                arr.search = params.term;
                arr.role = role;
                arr.createdBy = username;
                arr.academyNumber = $('#academyNumber').val();
                arr.term = $('#term').val();
                // arr.classes = classes.join();
                arr.classes = classes;
                arr.weekday= $('#weekday').val();
                arr.courseDetailNo= $('#courseDetailNo').val();
                // arr.weeks= weeks.join();
                arr.weeks= weekss;
                var arrs = JSON.stringify(arr);
                return arrs;
                /*var query = {
                    soft: soft.join(),
                    search: params.term,
                    academyNumber: $('#academyNumber').val(),
                    term: $('#term').val(),
                    classes: classes.join(),
                    weekday: $('#weekday').val(),
                    courseDetailNo: $('#courseDetailNo').val(),
                    weeks: weeks.join()
                }
                return query;*/
            },
            results: function (data, page) {
                return {
                    results: data
                };
            }
        }
    });

    $('#soft_id').select2({
        width: "95%",
        closeOnSelect: false,
        placeholder: '请输入软件...',
        placeholderOption: "first",
        ajax: {
            url: zuulUrl + "api/software/apiSoftWareListBySelect",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority());
            },
            delay: 250,//延时0.5秒之后再进行请求
            type: "post",
            data: function (params) {
                var arr = new Object();
                arr.search = params.term;
                arr.academyNumber = $('#academyNumber').val();
                var arrs = JSON.stringify(arr);
                return arrs;

            },
            results: function (data, page) {
                return {
                    results: data
                };
            }
        }
    });

    $('#courseDetailNo').select2({
        width: "95%",
        placeholderOption: "first"
    });
    $('#teacherRelated').select2({
        width: "89%",
        placeholder: '请输入授课教师...',
        placeholderOption: "first",
        ajax: {
            url: zuulUrl + "api/user/apiUserListBySelect",
            dataType: "json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority());
            },
            delay: 250,//延时0.5秒之后再进行请求
            type: "post",
            data: function (params) {
                var query = {
                    search: params.term,
                    academyNumber: academyNumber,
                    userRole: '1'
                }
                return query;
            },
            results: function (data, page) {
                return {
                    results: data
                };
            }
        }
    });

    $('#tutorRelated').select2({
        width: "89%",
        placeholder: '请输入辅导...',
        placeholderOption: "first",
        ajax: {
            url: zuulUrl + "api/user/apiUserListBySelect",
            dataType: "json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority());
            },
            delay: 250,//延时0.5秒之后再进行请求
            type: "post",
            data: function (params) {
                var query = {
                    search: params.term,
                    academyNumber: academyNumber,
                    userRole: '1'
                }
                return query;
            },
            results: function (data, page) {
                return {
                    results: data
                };
            }
        }
    });

    $('#weekday').select2({
        width: "89%",
        placeholder: '请选择星期...',
        ajax: {
            url: zuulUrl + "api/timetable/common/apiWeekDayListBySelect",
            dataType: "json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority());
            },
            delay: 250,//延时0.5秒之后再进行请求
            type: "post",
            data: function (params) {
                var classes = "";
                // $("input:checkbox[name='classes']:checked").each(function() { // 遍历name=standard的多选框
                //     classes += $(this).val()+",";
                // });
                $("#section_box >div").each(function(){
                    // alert($(this).attr("id"));  //打印子div的ID
                    if($(this).hasClass('layui-form-checked')){
                        classes += $(this).attr("value")+",";
                    }
                });
                classes = classes.slice(0,classes.length-1);
                var weekss = "";
                $("#week_box>div").each(function(){
                    // alert($(this).attr("id"));  //打印子div的ID
                    if($(this).hasClass('layui-form-checked')){
                        weekss += $(this).attr("value")+",";
                    }
                });
                weekss = weekss.slice(0,weekss.length-1);
                var labRoomIds = $('#labRoom_id').val();
                var query = {
                    // search: params.term,
                    term: $('#term').val(),
                    courseNo: $('#courseNo').val(),
                    classes: classes,
                    weeks: weekss,
                    labRoomIds:  labRoomIds.join(),
                }
                // $('#classes').empty();
                // $('#week').empty();
                return query;
            },
            results: function (data, page) {
                return {
                    results: data
                };
            }
        }
    });

    $('#classes').select2({
        width: "89%",
        closeOnSelect: false,
        placeholder: '请选择节次...',
        placeholderOption: "first",
        allowClear: true,
        ajax: {
            url: zuulUrl + "api/timetable/common/apiClassListBySelect",
            dataType: "json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority());
            },
            delay: 250,//延时0.5秒之后再进行请求
            type: "post",
            data: function (params) {
                var query = {
                    search: params.term,
                    courseDetailNo: $('#weekday').val()
                }
                return query;
            },
            results: function (data, page) {
                return {
                    results: data
                };
            }
        }
    });

    // $('#weeks').select2({
    //     width: "95%",
    //     closeOnSelect: false,
    //     placeholder: '请选择周次...',
    //     cache: false,
    //     placeholderOption: "first",
    //     allowClear: true,
    //     ajax: {
    //         url: zuulUrl + "api/timetable/common/apiWeekListBySelect",
    //         contentType: "application/json",
    //         dataType: "json",
    //         beforeSend: function(request) {
    //             request.setRequestHeader("Authorization", getJWTAuthority());
    //         },
    //         async: false,
    //         type: "post",
    //         data: function (params) {
    //             var classes = $('#classes').val();
    //             var labRoomIds = $('#labRoom_id').val();
    //             var arr = new Object();
    //             arr.search =         params.term;
    //             arr.term =           $('#term').val();
    //             arr.classes =        classes.join();
    //             arr.weekday =        $('#weekday').val();
    //             arr.courseDetailNo = "";
    //             arr.labRoomIds =     labRoomIds.join();
    //             var arrs = JSON.stringify(arr);
    //             return arrs;
    //
    //             /*var query = {
    //                 search: params.term,
    //                 term: $('#term').val(),
    //                 classes: classes.join(),
    //                 weekday: $('#weekday').val(),
    //                 courseDetailNo: "",
    //                 labRoomIds: labRoomIds.join()
    //             }
    //             return query;*/
    //         },
    //         results: function (data, page) {
    //             return {
    //                 results: data
    //             };
    //         }
    //     }
    // });

    //实验项目
    $('#items').select2({
        width: "95%",
        closeOnSelect: false,
        placeholder: '请选择实验项目...',
        placeholderOption: "first",
        allowClear: true,
        ajax: {
            url: zuulUrl + "api/operation/apiOperationItemListBySelect",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority());
            },
            delay: 250,//延时0.5秒之后再进行请求
            type: "post",
            data: function (params) {
                var arr = new Object();
                arr.search = params.term;
                arr.courseNumber = $('#courseNumber').val();
                arr.academyNumber = $('#academyNumber').val();
                var arrs = JSON.stringify(arr);
                return arrs;

                /* var query = {
                     search: params.term,
                     academyNumber: $('#academyNumber').val(),
                     courseNumber: $('#courseNumber').val()
                 }
                 return query;*/
            },
            results: function (data, page) {
                return {
                    results: data
                };
            }
        }
    });

    /*
    *二次不分批排课弹出窗口
    */
    $("#submitButton").on('click', function () {
        if (validform().form()) {
            var arr = new Object();
            arr.courseNo = $("#courseNo").val();
            arr.courseDetailNo = $("#courseDetailNo").val();
            arr.groupId = 0;
            if($("#groupId").val()!=""){
                arr.groupId = $("#groupId").val();
            }
            //arr.weeks = $("#weeks").val();   //周次
            arr.weekday = $("#weekday").val();
            arr.status = 10;
            arr.timetableStyle = $("#timetableStyle").val();
            //arr.classes = $("#classes").val();    //节次
            arr.labRoomIds = $("#labRoom_id").val();
            arr.tearchs = $("#teacherRelated").val();
            arr.items = $("#items").val();
            arr.tutors = $("#tutorRelated").val();
            arr.createdBy= username;
            //周次节次读取
            var classs = "";
            // $("input:checkbox[name='classes']:checked").each(function() { // 遍历name=standard的多选框
            //     classs += $(this).val()+",";
            // });
            $("#section_box >div").each(function(){
                // alert($(this).attr("id"));  //打印子div的ID
                if($(this).hasClass('layui-form-checked')){
                    classs += $(this).attr("value")+",";
                }
            });
            arr.classes = eval("([" + classs.slice(0,classs.length-1) + "])");
            var weekss = "";
            $("#week_box>div").each(function(){
                // alert($(this).attr("id"));  //打印子div的ID
                if($(this).hasClass('layui-form-checked')){
                    weekss += $(this).attr("value")+",";
                }
            });
            arr.weeks = eval("([" + weekss.slice(0,weekss.length-1) + "])");
            var arrs = JSON.stringify(arr);
            $.ajax({
                url: zuulUrl + "api/school/apiSaveCourseTimetableAppointment",
                contentType: "application/json;charset=utf-8",
                headers:{Authorization: getJWTAuthority()},
                async: false,
                dataType: "json",
                type: "post",
                //async: false,
                data: arrs,
                success: function (json) {
                    if (json.responseText == "no") {
                        alert("所选择的实训室资源冲突，请重新选择或者用调整排课操作，谢谢。");
                        isConflict = 0;
                    }
                }
            });
            //window.parent.location.reload();
            refreshBootstrapTable();
            $("#weeks").val("").change();
        } else {
            alert("请验证输入！");
        }
    })

    $("#form_lab").validate();

    //星期 实验室 change 事件在下面
    $("#classes").change(function () {
        $(this).valid();
    });

    $("#weeks").change(function () {
        $(this).valid();
    });

    $("#teacherRelated").change(function () {
        $(this).valid();
    });

    layui.use(['layer', 'form', 'element', 'jquery', 'layer'], function () {
        var layer = layui.layer
            , form = layui.form
            , element = layui.element
            , $ = layui.$
            , layer = layui.layer;
        // getWeekday1();
        getClasses1();
        getWeeks1();
        function getWeekday1(){
            var weekss = "";
            // $("input:checkbox[name='week']:checked").each(function() {
            //     weekss += $(this).val()+",";
            // });
            $("#week_box>div").each(function(){
                // alert($(this).attr("id"));  //打印子div的ID
                if($(this).hasClass('layui-form-checked')){
                    weekss += $(this).attr("value")+",";
                }
            });
            weekss = weekss.slice(0,weekss.length-1);
            var classs = "";
            // $("input:checkbox[name='classes']:checked").each(function() {
            //     classs += $(this).val()+",";
            // });
            $("#section_box >div").each(function(){
                // alert($(this).attr("id"));  //打印子div的ID
                if($(this).hasClass('layui-form-checked')){
                    classs += $(this).attr("value")+",";
                }
            });
            classs = classs.slice(0,classs.length-1);
            var data1 = JSON.stringify({
                "weeks": weekss,
                "labRoomId": "176",
                // "term": termId,
                "type": 1,
                "classes": classs
            });
            $.ajax({
                url: usableListUrl,
                type: "POST",
                data: data1,
                headers: {Authorization: getJWTAuthority()},
                async: false,
                contentType: "application/json;charset=UTF-8",
                success: function (result) {
                    var list = result.results;    //返回的数据
                    var weekday = document.getElementById("weekday");
                    var option = document.createElement("option");
                    // option.setAttribute("value", '');                
                    // option.innerText = "请选择123";             
                    // weekday.appendChild(option);          
                    for (var i = 0; i < list.length; i++) {
                        // 创建添加option属性
                        var option = document.createElement("option");
                        option.setAttribute("value", list[i].id);                  // 给option的value添加值
                        option.innerText = "星期"+list[i].text;             // 打印option对应的纯文本 （超级管理员、管理员）
                        weekday.appendChild(option);                          // 给select 添加option子标签
                        form.render("select");                                // 刷性select，显示出数据
                    }
                }
            });
        }


        function getClasses1() {
            var nowclass = [];
            var listclass = [];
            // $("input:checkbox[name='classes']").each(function() {
            //     // nowclass += $(this).val()+",";
            //     nowclass.push($(this).val());
            // });
            $("#section_box >div").each(function(){
                nowclass.push($(this).attr("value"));
            });
            // nowclass = nowclass.slice(0,nowclass.length-1);
            var weekday = $('#weekday').val();
            var weekss = "";
            // $("input:checkbox[name='week']:checked").each(function() {
            //     weekss += $(this).val()+",";
            // });
            $("#week_box>div").each(function(){
                // alert($(this).attr("id"));  //打印子div的ID
                if($(this).hasClass('layui-form-checked')){
                    weekss += $(this).attr("value")+",";
                }
            });
            weekss = weekss.slice(0,weekss.length-1);
            var labRoomIds = $('#labRoom_id').val();
            var data1 = JSON.stringify({
                "weeks": weekss,
                "labRoomIds": labRoomIds.join(),
                "term": $('#term').val(),
                "type": 2,
                "weekday": weekday
            });
            $.ajax({
                url: zuulUrl + "api/timetable/common/apiClassListBySelect",
                type: "POST",
                data: data1,
                headers: {Authorization: getJWTAuthority()},
                // async: false,
                contentType: "application/json;charset=UTF-8",
                success: function (result) {
                    var list = result.results;    //返回的数据
                    //add_role_name给select定义的id
                    for (var i = 0; i < list.length; i++) {
                        // listclass += list[i].id+",";
                        listclass.push(list[i].id);
                        if(nowclass.indexOf(list[i].id) == -1){
                            // $("#section_box").append(" <input type=\"checkbox\" name=\"classes\" id='classes" + list[i].id + "' title='" + list[i].text + "' value='" + list[i].id + "' lay-filter=\"classes_choose\" >");
                            var x = "<div lay-filter='classes_choose' name='classes' value=" + list[i].id + " class=\"layui-unselect layui-form-checkbox\"><span>"+ list[i].text+"</span><i class='layui-icon layui-icon-ok'></i></div>"
                            $("#section_box").append(x);
                            form.render("checkbox");
                        }
                    }
                    // var x = "<div lay-filter='classes_choose' name='classes' value='111' class=\"layui-unselect layui-form-checkbox\"><span>1111</span><i class='layui-icon layui-icon-ok'></i></div>"
                    // $("#section_box").append(x);
                    for (var i = 0; i < nowclass.length; i++){
                        if(listclass.indexOf(nowclass[i]) == -1){
                            $("div[name='classes']:eq(0)").remove();
                            // $("div[name='classes']:eq(0)").prev().remove();
                            form.render("checkbox");
                        }
                    }
                    allRule('section_all', 'section_box')
                    oppositeRule('section_opposite', 'section_box')
                    noneRule('section_none', 'section_box')
                    optionRule('section_box')
                    clickRule('section_box')
                    showWeeks('section_box')
                }
            });
        }

        function getWeeks1() {
            var nowweek = [];
            var listweek = [];
            // $("input:checkbox[name='week']").each(function() {
            //     nowweek.push($(this).val());
            // });
            $("#week_box >div").each(function(){
                nowweek.push($(this).attr("value"));
            });
            var weekday = $('#weekday').val();
            var classs = "";
            // $("input:checkbox[name='classes']:checked").each(function() {
            //     classs += $(this).val()+",";
            // });
            $("#section_box >div").each(function(){
                // alert($(this).attr("id"));  //打印子div的ID
                if($(this).hasClass('layui-form-checked')){
                    classs += $(this).attr("value")+",";
                }
            });
            classs = classs.slice(0,classs.length-1);
            console.log(classs)
            var labRoomIds = $('#labRoom_id').val();
            var data1 = JSON.stringify({
                "classes": classs,
                "labRoomIds": labRoomIds.join(),
                "term": $('#term').val(),
                "type": 3,
                "weekday": weekday
            });
            $.ajax({
                // url: weekUrl + "?term=16&weekday=-1",
                url: zuulUrl + "api/timetable/common/apiWeekListBySelect",
                headers: {Authorization: getJWTAuthority()},
                data: data1,
                // async: false,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                success: function (result) {
                    var list = result.results;    //返回的数据
                    //add_role_name给select定义的id
                    // $("#week_box").empty();
                    for (var i = 0; i < list.length; i++) {
                        listweek.push(list[i].id);
                        if(nowweek.indexOf(list[i].id) == -1){
                            // $("#week_box").append(" <input type=\"checkbox\" name=\"week\" title='第" + list[i].text + "周' value='" + list[i].id + "' lay-filter=\"allChoose_1\">");
                            var x = "<div lay-filter='allChoose_1' name='week' id='week"+ list[i].id +"' value=" + list[i].id + " class=\"layui-unselect layui-form-checkbox\"><span>第"+ list[i].text+"周</span><i class='layui-icon layui-icon-ok'></i></div>"
                            $("#week_box").append(x);
                            form.render("checkbox");
                        }
                    }
                    for (var i = 0; i < nowweek.length; i++){
                        if(listweek.indexOf(nowweek[i]) == -1){
                            $("div[name='week']:eq(0)").remove();
                            // $("input:checkbox[name='week']:eq(0)").prev().remove();
                            form.render("checkbox");
                        }
                    }
                    allRule('week_all', 'week_box');
                    oppositeRule('week_opposite', 'week_box');
                    noneRule('week_none', 'week_box');
                    optionRule('week_box')
                    clickRule('week_box')
                    showClasses('week_box')
                }
            });
        }
        function showWeeks(section){
            $("#"+section+" .layui-form-checkbox").each(function(i,j){
                j.onclick=function(){
                    this.classList.toggle('layui-form-checked');
                    // oldChecked toggle
                    if(this.getAttribute('oldChecked')==null){
                        this.setAttribute('oldChecked','');
                    }else{
                        this.removeAttribute('oldChecked');
                    }
                        getWeeks1();
                }
            });
        }
        function showClasses(section){
            $("#"+section+" .layui-form-checkbox").each(function(i,j){
                j.onclick=function(){
                    this.classList.toggle('layui-form-checked');
                    // oldChecked toggle
                    if(this.getAttribute('oldChecked')==null){
                        this.setAttribute('oldChecked','');
                    }else{
                        this.removeAttribute('oldChecked');
                    }
                    getClasses1();
                }
            });
        }
        form.on('checkbox(allChoose_1)', function(data){
            console.log(data.elem); //得到checkbox原始DOM对象
            console.log(data.elem.checked); //是否被选中，true或者false
            console.log(data.value); //复选框value值，也可以通过data.elem.value得到
            console.log(data.othis); //得到美化后的DOM对象
            getClasses1();
        });
        form.on('checkbox(classes_choose)', function(data){
            console.log(data.elem); //得到checkbox原始DOM对象
            console.log(data.elem.checked); //是否被选中，true或者false
            console.log(data.value); //复选框value值，也可以通过data.elem.value得到
            console.log(data.othis); //得到美化后的DOM对象
            getWeeks1();
        });
        $("#weekday").change(function () {
            $(this).valid();
            getClasses1();
            getWeeks1();
        });
        $("#labRoom_id").change(function () {
            $(this).valid();
            getClasses1();
            getWeeks1();
        });
    })
});

//得到查询的参数
function queryParams(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        // limit: params.limit,   //页面大小

        sort: params.sort,
        order: params.order,
        courseNo: $("#courseNo").val()
    };
    return temp;
};

/*
*查看学生名单
*/
function schoolCourseStudents(term, courseNo) {
    var index = layer.open({
        type: 2,
        title: '查看学生选课情况',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/schoolCourseStudnetList?term=' + term + '&courseNo=' + courseNo
    });
    layer.full(index);
}

function validform() {
    return $("#form_lab").validate();
}

function  doValidProperty() {
    $("#weeks").val("").change();
    $("#labRoom_id").val("").change();
}

function checkSelected(){
    //初始化
    $("#tr_soft").hide();
    $("#soft_id").val(null);
    $("#labRoom_id").val(null);
    $('input:checkbox[name=select_check]:checked').each(function(k){
        if("SOFTWARE"==$(this).val()){
            $("#tr_soft").show();
        }
    })
}

function deleteTimetable(id) {
    if (confirm('是否确认删除？')) {
        $.ajax({
            url: zuulUrl + "api/timetable/manage/apiDeleteTimetableBySameNumberId?id=" + id+"&createdBy="+username,
            contentType: "application/json;charset=utf-8",
            headers:{Authorization: getJWTAuthority()},
            async: false,
            dataType: "json",
            type: "post",
            //async: false,
            success: function (json) {
            }
        });
        refreshBootstrapTable();
    }
}

function refreshBootstrapTable() {
    var url = zuulUrl + "api/timetable/common/apiViewTimetableInfo";
    var params = $("#table_timetable_info").bootstrapTable('getOptions')
    params.ajaxOptions.headers.Authorization =getJWTAuthority();
    params.url = url;
    params.silent=true;
    $("#table_timetable_info").bootstrapTable('refresh', params);
}

/*
*修改二次不分批排课弹出窗口
*/
function doEduReCourse(sameNumberId) {
    term = $("#term").val();
    courseNo = $("#courseNo").val();
    if(typeof(sameNumberId) == "undefined"){
        sameNumberId=-1;
    }
    var index = layer.open({
        type: 2,
        title: '编辑二次不分批排课',
        maxmin: true,
        shadeClose: true,
        area: ['1100px', '500px'],
        content: location.origin + '/teacherInformationCenter/lims/timetable/course/updateEduReTimetableCourse?currpage=1&flag=0&timetableStyle=3&courseNo=' + courseNo + "&term=" + term
        + '&tableAppId=' + 0+ '&sameNumberId=' + sameNumberId,
        end: function () {
            refreshBootstrapTable();
        }
    });
    layer.full(index);
}

function getJWTAuthority() {
    var authorization ="";
    initDirectoryEngine({
        getHostsUrl:contextPath+"/shareApi/getHosts",
        getAuthorizationUrl:contextPath+"/shareApi/getAuthorization"
    });
    getAuthorization({
        async:false,
        success:function(data){
            authorization =data;
        }
    });
    return authorization;
}
