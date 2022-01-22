layui.config({
    base: $("meta[name='contextPath']").attr("content")+'/layui_admin/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    index: 'lib/index', //主入口模块
    // deviceBatchGlobal: 'modules/deviceBatchGlobal', //如果 mymod.js 是在根目录，也可以不用设定别名
    // formSelects: 'modules/formSelects', //如果 mymod.js 是在根目录，也可以不用设定别名
});
var contextPath = $("meta[name='contextPath']").attr("content");
var zuulUrl = $("#zuulServerUrl").val() + "/timetable/";
var records = [];
var removeRecords = [];
var tagLesson='';
var studentNumber;
layui.use(['laypage', 'layer', 'table', 'element'], function() {
	var admin = layui.admin,
		laypage = layui.laypage //分页
		,
		layer = layui.layer //弹层
		,
		table = layui.table //表格
		,
		form = layui.form,
		$ = layui.jquery,
		// formSelects = layui.formSelects,
		element = layui.element //元素操作

    getCourseInfo();
    var timetableConfigInfo = getTimetableConfig('timetable');//timetable  redis配置
    var requiredItemSelect = (timetableConfigInfo!=null&&timetableConfigInfo.requiredItemSelect !=null) ? timetableConfigInfo.requiredItemSelect: false;
    var singleSelectFromTeacher = (timetableConfigInfo!=null&&timetableConfigInfo.singleSelectFromTeacher !=null) ? timetableConfigInfo.singleSelectFromTeacher: false;
    //true,可以进行开放软件管理功能，true必选，false或者不设置为非必选
    var requiredSoftManage = (timetableConfigInfo!=null&&timetableConfigInfo.requiredSoftManage !=null) ? timetableConfigInfo.requiredSoftManage: false;
    var requiredVirtualImage = (timetableConfigInfo!=null&&timetableConfigInfo.requiredVirtualImage !=null) ? timetableConfigInfo.requiredVirtualImage: false;
    var requiredTimetableStation = (timetableConfigInfo!=null&&timetableConfigInfo.requiredTimetableStation !=null) ? timetableConfigInfo.requiredTimetableStation: false;
    if(requiredTimetableStation){
        $('.switch-button').append('<input type="checkbox" name="close" lay-skin="switch" lay-filter="switchTest" lay-text="桌号开|桌号关">');
        var deskNum = [];
        for (let j=1;j<201;j++) {
            deskNum.push({id:j,text:j});
        }
    }
    if(requiredSoftManage){
        $('.switch-button').append('<input type="checkbox" class="switchSoft" name="soft" lay-skin="switch" lay-filter="switchSoft" lay-text="软件筛选|软件筛选">');
        var softWare = getSoftWareList()
    }
    if(requiredVirtualImage){
        $('.switch-button').append('<input type="checkbox" class="switchVirtual" name="virtual" lay-skin="switch" lay-filter="switchVirtual" lay-text="虚拟镜像|虚拟镜像">');
        var virtuals = getVirtualList()
    }
    //true,可以进行开放虚拟镜像相关功能，true必选，false或者不设置为非必选
    function getCourseInfo() {
        var courseNo = $('#courseNo').val();
        var term = $('#termid').val();
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/school/getEducationalSchedulingCourseInfo",
            // headers: {Authorization: getJWTAuthority(),"x-datasource": "limsproduct"},
            data: JSON.stringify({courseNo: courseNo,termId: term}),
            // async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                studentNumber = res.studentNumber;
            }
        });
    }
    //获取软件
    function getSoftWareList(){
        let s = [];
        $.ajax({
            url: zuulUrl + "api/software/apiSoftWareListBySelect",
            data: JSON.stringify({academyNumber: $('#academyNumber').val()}),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            async: false,
            type: "post",
            success: function (res) {
                // console.log(res);
                s = res.results;
            }
        });
        return s;
    }
    //获取软件
    function getVirtualList(){
        let s = [];
        $.ajax({
            url: zuulUrl + "api/timetable/virtual/virtualImages",
            // data: JSON.stringify({academyNumber: $('#academyNumber').val()}),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            async: false,
            type: "get",
            success: function (res) {
                // console.log(res);
                s = res;
            }
        });
        return s;
    }
    let cols = [{fixed: 'left', title: '序号', type: 'numbers', width: 50},
        {field: 'timetable', title: '排课时间', width: '15%', sort: true},
        {field: 'items', title: '实验项目', width: '10%', sort: true},
        {field: 'labInfo', title: '地点', width: '15%', sort: true},
        {field: 'teachers', title: '教师', width: '15%', sort: true},
        {field: 'tutors', title: '辅导', width: '15%', sort: true},
        // {field: 'scope', title: '起止桌号', width: '15%', sort: true,
        // templet: function (d) {
        //     if(d.station && d.station.length>0){
        //         return d.station[0]+'~'+d.station[d.station.length-1];
        //     }else{
        //         return '未设置桌号';
        //     }
        // }},
        {fixed: 'right', title: '操作', toolbar: '#line_toolbar'}]
    if(requiredSoftManage){
        cols.splice(6,0,{field: 'softwares', title: '软件', width: '15%', sort: true,});
    }
    if(requiredVirtualImage){
        cols.splice(6,0,{field: 'virtuals', title: '虚拟镜像', width: '15%', sort: true,});
    }
    if(requiredTimetableStation){
        cols.splice(6,0,{
            field: 'scope',
            title: '起止桌号',
            width: '15%',
            sort: true,
            templet: function (d) {
                if(d.station && d.station.length>0){
                    return d.station[0]+'~'+d.station[d.station.length-1];
                }else{
                    return '未设置桌号';
                }
            }});
    }
//执行一个已安排时间段表单
    table.render({
        elem: '#definiteListStepFour',
        title: '已安排时间段',
        cellMinWidth: 100
        ,page: true //开启分页
        ,page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
        layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
            //curr: 5, //设定初始在第 5 页
            groups: 3, //只显示 1 个连续页码
            first: false, //不显示首页
            last: false //不显示尾页
    },
        cols: [
            cols
        ],
        id: 'definiteListStepFour',
        data: [],
        skin: 'line', //表格风格
        even: true,
        limits: [5, 7, 10, 20],
        limit: 5 //每页默认显示的数量
    });
	//向世界问个好
	// layer.msg('进入选择排课');
    getSchedulingRecords();
    getAlRecords();
	function getAlRecords() {
        var courseNo = $('#courseNo').val();
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/timetable/common/apiViewTimetableInfo?courseNo="+courseNo,
            // headers: {Authorization: getJWTAuthority()},
            async: false,
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                console.log(res);
                table.reload('definiteListStepFour', {
                    data:res.rows
                });
            }
        });
    }
	function getSchedulingRecords() {
        var tag = $.cookie('addTimes');
        var labSelected = $.cookie('checkedCourse');
        var teacherSelected = $.cookie('addTeacher');
        var tags = tag.split(",");
        var labSelecteds = labSelected.split(",");
        var teacherSelecteds = teacherSelected.split(",");
        var timetabledata = new Array();
        var teacher_selected = new Array();
        var tutor_selected = new Array();
        var academyNumber = $('#academyNumber').val();
        var term = $('#termid').val();
        var courseNo = $('#courseNo').val();
        for (var i = 0; i < teacherSelecteds.length; i++) {
            var cols = teacherSelecteds[i].split("/");
            timetabledata.push(cols[2]);
            cols[1] == '教师'?teacher_selected.push(cols[2]):tutor_selected.push(cols[2]);
        }
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/school/apiCourseSchedulingRecordsList",
            // headers: {Authorization: getJWTAuthority()},
            data: JSON.stringify({tag: tags,academyNumber: academyNumber,courseNo: courseNo,term: term}),
            // async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                records = res.data;
                $.each(records,function (index,item) {
                    item['allSaveFlag'] = 1 ;
                })
                $.each(res.data,function (index,item) {
                    tagLesson += item.weeks+'/'+item.sections+'/'+item.weekdays+'*';
                });
                tagLesson = tagLesson.slice(0,tagLesson.length-1);
                console.log(tagLesson);
                initializationSingle(res.data);
                $.each(records, function (index, item) {
                    $('#deleteUnarrangedRecord_'+index).click(function () {
                        $('#single_form'+index).remove();
                        var tag = $.cookie('addTimes');
                        var tags = tag.split(",");
                        tags.splice(index, 1);
                        $.cookie('addTimes',tags);
                        item.allSaveFlag = 0;
                    })
                    var singleFilter = 'single_sub_'+index;
                    form.on('submit('+ singleFilter +')', function(data) {
                        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
                        var JudgeConflictTimeTableVOs = [];
                        var JudgeConflictTimeTableVO;
                        var desks = [];
                        var virtual = '';
                        var softs = [];
                        var weeks = data.field.weeks;
                        var classes = data.field.classes;
                        var weekday = data.field.weekdays;
                        var address = 'editaddress'+index;
                        var itemindex = 'editproject'+index;
                        var teacherindex = 'editteacherone'+index;
                        var tutorindex = 'editteachertwo'+index;
                        var deskStartindex = 'deskNumStart'+index;
                        var deskEndindex = 'deskNumEnd'+index;
                        var virtualindex = 'virtuals'+index;
                        var softindex = 'softWare'+index;
                        if(requiredTimetableStation){
                            var startDesk = data.field[deskStartindex];
                            var endDesk = data.field[deskEndindex];
                            if(startDesk!=""){
                                if(Number(endDesk)<=Number(startDesk)){
                                    layer.msg('请正确选择桌号区间!')
                                    return false;
                                }else if((Number(endDesk)-Number(startDesk))+1<Number(studentNumber)){
                                    layer.msg('桌号区间小于学生人数!')
                                    return false;
                                }
                                for (var n = Number(startDesk); n <= Number(endDesk); n++) {
                                    desks.push(n);
                                }
                            }
                        }
                        if(requiredVirtualImage){
                            virtual = data.field[virtualindex];
                        }
                        if(requiredSoftManage){
                            let ids = data.field[softindex].split(',');
                            $.each(ids,function (i,d) {
                                if(d)
                                    softs.push(Number(d));
                            })
                        }
                        var labRoomId = data.field[address];
                        var item = data.field[itemindex];
                        var teacher = data.field[teacherindex];
                        var tutor = data.field[tutorindex];
                        JudgeConflictTimeTableVO = recordsObject(weeks,classes,weekday,labRoomId,item,teacher,tutor,desks,virtual,softs);
                        JudgeConflictTimeTableVOs.push(JudgeConflictTimeTableVO);
                        console.log(JudgeConflictTimeTableVOs);
                        saveRecords(JudgeConflictTimeTableVOs,index);
                        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                    });
                });
            }
        });
    }
    function FormSelectComponent(obj){
        this.elId = obj.elId;
        this.name = obj.name;
        this.selectedData = [];
        this.data = obj.data;
        this.required = obj.required;
        this.tips = obj.tips;
        this.model = obj.model;
        this.init = function () {
            let that = this;
            let elid = that.elId;
            let data1 = [];
            $.each(that.data, function (index, item) {
                var d = new Object();
                if(that.elId.indexOf('virtual')!=-1){
                    d = {name: item.name,value: item.id};
                }else if(that.elId.indexOf('item')!=-1 && item.status){
                    d = {name: item.text,value: item.id, selected: true};
                }else{
                    d = {name: item.text,value: item.id};
                }
                data1.push(d);
            });
            that.elId = xmSelect.render({
                el: `#${that.elId}`,
                name: that.name,
                tips: that.tips,
                filterable: true,
                layVerify: that.required ? 'required' : '',
                // toolbar: {show: true, showIcon: false},
                theme: {color: '#1E9FFF',},
                model: {icon: 'hidden',},
                data: data1
            });
            if(that.model.indexOf('single')!=-1){
                that.elId.update({
                    radio: true,
                    clickClose: true
                })
            }
        }
    }
    function initializationSingle(res) {
        var tag = $.cookie('addTimes');
        var labSelected = $.cookie('checkedCourse');
        var teacherSelected = $.cookie('addTeacher');
        labSelected = (labSelected.substring(labSelected.length - 1) == ',') ? labSelected.substring(0, labSelected.length - 1) : labSelected
        var tags = tag.split(",");
        var labSelecteds = labSelected.split(",");
        var teacherSelecteds = teacherSelected.split(",");
        var timetabledata = new Array();
        var teacher_selected = new Array();
        var tutor_selected = new Array();
        var tutorss = new Array();
        var teacherss = new Array();
        var academyNumber = $('#academyNumber').val();
        for (var i = 0; i < teacherSelecteds.length; i++) {
            var cols = teacherSelecteds[i].split("/");
            timetabledata.push(cols[2]);
            cols[1] == '教师'?teacher_selected.push(cols[2])&&teacherss.push({id:cols[2],text:cols[0]}):tutor_selected.push(cols[2])&&tutorss.push({id:cols[2],text:cols[0]});
        }
        // var str='';
        // for(var i =0;i<res.length;i++) {
        //     str+=   '<form class="layui-form layui-col-xs12 layui-col-sm6 " action="" lay-filter="single_form'+ i +'" id="single_form'+ i +'">'+
        //         '<div class="">'+
        //         '<div class="layuiadmin-card-text">'+
        //         '<div class="layui-text-top"><i class="layui-icon layui-icon-form"></i>'+
        //         '<font>'+ res[i].weeksShow +'周</font>'+
        //         '<font>星期'+ res[i].weekdays +'</font>'+
        //         '<font>'+ res[i].sectionsShow +'节</font>'+
        //         '<input type="hidden" name="weeks" id="weeks'+ i +'" value="' + res[i].weeks + '"/>'+
        //         '<input type="hidden" name="classes" id="classes'+ i +'" value="' + res[i].sections + '"/>'+
        //         '<input type="hidden" name="weekdays" id="weekdays'+ i +'" value="' + res[i].weekdays + '"/>'+
        //         '</div>'+
        //         '<div class="layui-text-center">'+
        //         '<div class="layui-row layui-col-space5">';
        //     str+=   '<div class="layui-col-md3">'+
        //         '<select class="layui-form" name="editproject'+ i +'" id="item_select'+ i +'" xm-select="item_select'+ i +'" xm-select-skin="normal" xm-select-search="" lay-filter="">'+
        //         '<option value="">项目</option>';
        //     $.each(res[i].resultsOperationItem, function (index, item) {
        //         if(item.status){
        //             str = str + '<option value="' + item.id + '" selected="selected">' + item.text + '</option>';
        //         }else{
        //             str = str + '<option value="' + item.id + '">' + item.text + '</option>';
        //         }
        //
        //     });
        //     str+=   '</select></div>';
        //     str+=   '<div class="layui-col-md3">'+
        //         '<select class="layui-form" name="editaddress'+ i +'" id="address_select'+ i +'" xm-select="address_select'+ i +'" xm-select-skin="normal" xm-select-search="" lay-filter="" lay-verify="required" lay-vertype="tips">'+
        //         '<option value="">地点</option>';
        //     $.each(res[i].resultsLabRoom, function (index, item) {
        //         str = str + '<option value="' + item.id + '">' + item.text + '</option>';
        //     });
        //     str+=   '</select></div>';
        //     str+=   '<div class="layui-col-md3">'+
        //         '<select class="layui-form" name="editteacherone'+ i +'" id="teacher_select'+ i +'" xm-select="teacher_select'+ i +'" xm-select-skin="normal" xm-select-search="" lay-filter="" lay-verify="required" lay-vertype="tips">'+
        //         '<option value="">教师</option>';
        //     $.each(teacherss, function (index, item) {
        //         str = str + '<option value="' + item.id + '">' + item.text + '</option>';
        //     });
        //     str+=   '</select></div>';
        //     str+=   '<div class="layui-col-md3">'+
        //         '<select class="layui-form" name="editteachertwo'+ i +'" id="tutor_select'+ i +'" xm-select="tutor_select'+ i +'" xm-select-skin="normal" xm-select-search="" lay-filter="">'+
        //         '<option value="">辅导</option>';
        //     $.each(tutorss, function (index, item) {
        //         str = str + '<option value="' + item.id + '">' + item.text + '</option>';
        //     });
        //     str+=   '</select></div>'+
        //         '</div>';
        //     str+='<div class="layui-row layui-col-space5">';
        //     str+='<div class="layui-col-md3 desk_scope layui-hide">' +
        //         '<select class="layui-form" name="deskNumStart'+ i +'" id="desk_select_start'+ i +'" xm-select="desk_start_select'+ i +'" xm-select-skin="normal" xm-select-search="" xm-select-radio="" lay-filter="">'+
        //         '<option value="">起始桌号</option>';
        //     let deskNum = [];
        //     for (let j=1;j<201;j++) {
        //         deskNum.push(j);
        //     }
        //     $.each(deskNum, function (index, item) {
        //         str = str + '<option value="' + item + '">' + item + '</option>';
        //     });
        //     str+=   '</select></div>';
        //     str+='<div class="layui-col-md3 desk_scope layui-hide">' +
        //         '<select class="layui-form" name="deskNumEnd'+ i +'" id="desk_select_end'+ i +'" xm-select="desk_end_select'+ i +'" xm-select-skin="normal" xm-select-search="" xm-select-radio="" lay-filter="">'+
        //         '<option value="">截止桌号</option>';
        //     $.each(deskNum, function (index, item) {
        //         str = str + '<option value="' + item + '">' + item + '</option>';
        //     });
        //     str+=   '</select></div>';
        //     if(requiredSoftManage){
        //         str+='<div class="layui-col-md3 soft_ware layui-hide">' +
        //             '<select class="layui-form" name="softWare'+ i +'" id="soft_select'+ i +'" xm-select="soft_select'+ i +'" xm-select-skin="normal" xm-select-search="" xm-select-radio="" lay-filter="">'+
        //             '<option value="">软件</option>';
        //         $.each(softWare, function (index, item) {
        //             str = str + '<option value="' + item.id + '">' + item.text + '</option>';
        //         });
        //         str+=   '</select></div>';
        //     }
        //     str+=   '</div>';
        //     str+='</div>'+
        //         '<p class="layui-text-bottom">'+
        //         '<button type="button" class="ltb_btn layui-form" style="margin-right: 5px;" lay-submit lay-filter="single_sub_'+ i +'">保存</button>'+
        //         '<button type="button" class="ltb_btn layui-btn-red" id="deleteUnarrangedRecord_'+ i +'">删除</button>'+
        //         '</p>'+
        //         '</div>'+
        //         '</div>'+
        //         '</form>';
        //     // str+='<div class="clear"></div>'
        // }
        for(var i =0;i<res.length;i++) {
            let str = '';
            str+=   '<form class="layui-form layui-col-xs12 layui-col-sm6 " action="" lay-filter="single_form'+ i +'" id="single_form'+ i +'">'+
                '<div class="">'+
                '<div class="layuiadmin-card-text">'+
                '<div class="layui-text-top"><i class="layui-icon layui-icon-form"></i>'+
                '<font>'+ res[i].weeksShow +'周</font>'+
                '<font>星期'+ res[i].weekdays +'</font>'+
                '<font>'+ res[i].sectionsShow +'节</font>'+
                '<input type="hidden" name="weeks" id="weeks'+ i +'" value="' + res[i].weeks + '"/>'+
                '<input type="hidden" name="classes" id="classes'+ i +'" value="' + res[i].sections + '"/>'+
                '<input type="hidden" name="weekdays" id="weekdays'+ i +'" value="' + res[i].weekdays + '"/>'+
                '</div>'+
                '<div class="layui-text-center">'+
                '<div class="layui-row layui-col-space5">';
            str+=   `<div class="layui-col-md3">
                <div id="item_select${i}" class="xm-select-demo"></div>
                </div>`
            str+=   `<div class="layui-col-md3">
                <div id="address_select${i}" class="xm-select-demo"></div>
                </div>`
            str+=   `<div class="layui-col-md3">
                <div id="teacher_select${i}" class="xm-select-demo"></div>
                </div>`
            str+=   `<div class="layui-col-md3">
                <div id="tutor_select${i}" class="xm-select-demo"></div>
                </div>`
            str+=   `<div class="layui-col-md3">
                <div id="tutor_select${i}" class="xm-select-demo"></div>
                </div>`
            str+=`</div>`
            str+=`<div class="layui-row layui-col-space5">`
            if(requiredTimetableStation){
                str+=`<div class="layui-col-md3 desk_scope layui-hide">
                    <div id="desk_select_start${i}" class="xm-select-demo"></div>
                  </div>`
                str+=`<div class="layui-col-md3 desk_scope layui-hide">
                    <div id="desk_select_end${i}" class="xm-select-demo"></div>
                  </div>`
            }
            if(requiredSoftManage){
                str+=`<div class="layui-col-md3 soft_ware layui-hide">
                    <div id="soft_select${i}" class="xm-select-demo"></div>
                  </div>`
            }
            if(requiredVirtualImage){
                str+=`<div class="layui-col-md3 virtual_image layui-hide">
                    <div id="virtual_select${i}" class="xm-select-demo"></div>
                  </div>`
            }
            str+=`</div>`
            str+='</div>'+
                '<p class="layui-text-bottom">'+
                '<button type="button" class="ltb_btn layui-form" style="margin-right: 5px;" lay-submit lay-filter="single_sub_'+ i +'">保存</button>'+
                '<button type="button" class="ltb_btn layui-btn-red" id="deleteUnarrangedRecord_'+ i +'">删除</button>'+
                '</p>'+
                '</div>'+
                '</div>'+
                '</form>';
            $('.unassigned_times').append(str);
            var item_select;
            var teacher_select;
            if(requiredItemSelect){
                item_select = new FormSelectComponent({
                    elId: `item_select${i}`,
                    name: `editproject${i}`,
                    data: res[i].resultsOperationItem,
                    required: true,
                    tips: '项目',
                    model: 'multiple',
                });
            }else{
                item_select = new FormSelectComponent({
                    elId: `item_select${i}`,
                    name: `editproject${i}`,
                    data: res[i].resultsOperationItem,
                    required: '',
                    tips: '项目',
                    model: 'multiple',
                });
            }

            let address_select = new FormSelectComponent({
                elId: `address_select${i}`,
                name: `editaddress${i}`,
                data: res[i].resultsLabRoom,
                required: true,
                tips: '地点',
                model: 'multiple',
            });
            if(singleSelectFromTeacher){
                teacher_select = new FormSelectComponent({
                    elId: `teacher_select${i}`,
                    name: `editteacherone${i}`,
                    data: teacherss,
                    required: true,
                    tips: '教师',
                    model: 'single',
                });
            }else{
                teacher_select = new FormSelectComponent({
                    elId: `teacher_select${i}`,
                    name: `editteacherone${i}`,
                    data: teacherss,
                    required: true,
                    tips: '教师',
                    model: 'multiple',
                });
            }

            let tutor_select = new FormSelectComponent({
                elId: `tutor_select${i}`,
                name: `editteachertwo${i}`,
                data: tutorss,
                required: '',
                tips: '辅导',
                model: 'multiple',
            });
            if(requiredTimetableStation){
                let desk_select_start = new FormSelectComponent({
                    elId: `desk_select_start${i}`,
                    name: `deskNumStart${i}`,
                    data: deskNum,
                    required: '',
                    tips: '起始桌号',
                    model: 'single',
                });
                let desk_select_end = new FormSelectComponent({
                    elId: `desk_select_end${i}`,
                    name: `deskNumEnd${i}`,
                    data: deskNum,
                    required: '',
                    tips: '截止桌号',
                    model: 'single',
                });
                desk_select_start.init();
                desk_select_end.init();
            }
            if(requiredSoftManage){
                let soft_select = new FormSelectComponent({
                    elId: `soft_select${i}`,
                    name: `softWare${i}`,
                    data: softWare,
                    required: '',
                    tips: '软件',
                    model: 'multiple',
                });
                soft_select.init();
            }
            if(requiredVirtualImage){
                let soft_select = new FormSelectComponent({
                    elId: `virtual_select${i}`,
                    name: `virtuals${i}`,
                    data: virtuals,
                    required: '',
                    tips: '虚拟镜像',
                    model: 'multiple',
                });
                soft_select.init();
            }
            item_select.init();
            address_select.init();
            teacher_select.init();
            tutor_select.init();

        }


        // layui.formSelects.render();
        //监听指定开关-桌号
        if(requiredTimetableStation){
            form.on('switch(switchTest)', function(data){
                // layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
                //     offset: '6px'
                // });
                // layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
                if(this.checked){
                    $('.desk_scope').removeClass('layui-hide')
                    // $.each(res, function (index, item) {
                    //     xmSelect.get(`#desk_select_start${index}`)[0].update({layVerify: 'required'})
                    //     xmSelect.get(`#desk_select_end${index}`)[0].update({layVerify: 'required'})
                    // });

                }else{
                    $('.desk_scope').addClass('layui-hide')
                    // $.each(res, function (index, item) {
                    //     xmSelect.get(`#desk_select_start${index}`)[0].update({layVerify: ''})
                    //     xmSelect.get(`#desk_select_end${index}`)[0].update({layVerify: ''})
                    // });
                }
            });
        }

        //监听指定开关-软件
        if(requiredSoftManage){
            form.on('switch(switchSoft)', function(data){
                if(this.checked){
                    $('.soft_ware').removeClass('layui-hide')
                    // $.each(res, function (index, item) {
                    //     xmSelect.get(`#soft_select${index}`)[0].update({layVerify: 'required'})
                    //     xmSelect.get(`#soft_select${index}`)[0].update({layVerify: 'required'})
                    // });
                }else{
                    $('.soft_ware').addClass('layui-hide')
                    // $.each(res, function (index, item) {
                    //     xmSelect.get(`#soft_select${index}`)[0].update({layVerify: 'required'})
                    //     xmSelect.get(`#soft_select${index}`)[0].update({layVerify: 'required'})
                    // });
                }
            });
        }
        //监听指定开关-虚拟镜像
        if(requiredVirtualImage){
            form.on('switch(switchVirtual)', function(data){
                if(this.checked){
                    $('.virtual_image').removeClass('layui-hide')
                    // $.each(res, function (index, item) {
                    //     xmSelect.get(`#soft_select${index}`)[0].update({layVerify: 'required'})
                    //     xmSelect.get(`#soft_select${index}`)[0].update({layVerify: 'required'})
                    // });
                }else{
                    $('.virtual_image').addClass('layui-hide')
                    // $.each(res, function (index, item) {
                    //     xmSelect.get(`#soft_select${index}`)[0].update({layVerify: 'required'})
                    //     xmSelect.get(`#soft_select${index}`)[0].update({layVerify: 'required'})
                    // });
                }
            });
        }
        if(labSelecteds[0]!=null){
            $.each(res, function (index, item) {
                xmSelect.get(`#address_select${index}`)[0].setValue(labSelecteds)
                // layui.formSelects.value('address_select'+index, labSelecteds);
            });
        }
        if(tutor_selected.length>0){
            $.each(res, function (index, item) {
                xmSelect.get(`#tutor_select${index}`)[0].setValue(tutor_selected)
                // layui.formSelects.value('tutor_select'+index, tutor_selected);
            });
        }
        if(teacher_selected.length>0){
            $.each(res, function (index, item) {
                xmSelect.get(`#teacher_select${index}`)[0].setValue(teacher_selected)
                // layui.formSelects.value('teacher_select'+index, teacher_selected);
            });
        }
        form.render();
        // layui.formSelects.render();
    }
    //一键排课
    var methodButton = {
        saveAllRecords: function() {
            var falseflag = true;
            var JudgeConflictTimeTableVOs = [];
            $.each(records, function (index, item) {
                if(item.allSaveFlag === 1){
                    var JudgeConflictTimeTableVO;
                    var weeks = $('#weeks'+index).val();
                    var classes = $('#classes'+index).val();
                    var weekday = $('#weekdays'+index).val();
                    var item = xmSelect.get(`#item_select${index}`)[0].getValue('valueStr');
                    var labRoomId = xmSelect.get(`#address_select${index}`)[0].getValue('valueStr');
                    var teacher = xmSelect.get(`#teacher_select${index}`)[0].getValue('valueStr');
                    var tutor = xmSelect.get(`#tutor_select${index}`)[0].getValue('valueStr');
                    // var item = layui.formSelects.value('item_select'+index, 'valStr');
                    // var labRoomId = layui.formSelects.value('address_select'+index, 'valStr');
                    // var teacher = layui.formSelects.value('teacher_select'+index, 'valStr');
                    if(removeRecords.indexOf(index)==-1){
                        if(labRoomId == ''){
                            layer.msg('请选择地点');
                            falseflag = false;
                            return false;
                        }
                        if(teacher == ''){
                            layer.msg('请选择教师');
                            falseflag = false;
                            return false;
                        }
                    }
                    var desks = [];
                    var virtual = '';
                    var softs = [];
                    if(requiredTimetableStation){
                        var startDesk = xmSelect.get(`#desk_select_start${index}`)[0].getValue('valueStr');
                        var endDesk = xmSelect.get(`#desk_select_end${index}`)[0].getValue('valueStr');
                        if(startDesk!=""){
                            if(Number(endDesk)<=Number(startDesk)){
                                layer.msg(`第${index+1}个时间段请正确选择桌号区间!`)
                                return false;
                            }else if((Number(endDesk)-Number(startDesk))+1<Number(studentNumber)){
                                layer.msg(`第${index+1}个时间段桌号区间小于学生人数!`)
                                return false;
                            }
                            for (var n = Number(startDesk); n <= Number(endDesk); n++) {
                                desks.push(n);
                            }
                        }
                    }
                    if(requiredVirtualImage){
                        virtual = xmSelect.get(`#virtual_select${index}`)[0].getValue('valueStr');
                    }
                    if(requiredSoftManage){
                        let ids = xmSelect.get(`#soft_select${index}`)[0].getValue('value');
                        $.each(ids,function (i,d) {
                            if(d)
                                softs.push(Number(d));
                        })
                    }
                    // var tutor = layui.formSelects.value('tutor_select'+index, 'valStr');
                    JudgeConflictTimeTableVO = recordsObject(weeks,classes,weekday,labRoomId,item,teacher,tutor,desks,virtual,softs);
                    JudgeConflictTimeTableVOs.push(JudgeConflictTimeTableVO);
                }
            });
            console.log(JudgeConflictTimeTableVOs);
            if(falseflag){
                saveRecords(JudgeConflictTimeTableVOs,'all');
            }
        },
        showLabRoomConflictDetail: function() {
            var term = $('#termid').val();
            var courseNo = $('#courseNo').val();
            var teacherSelected = $.cookie('addTeacher');
            window.parent.window.judgmentNoBatchesCourseThree(term,courseNo,teacherSelected,'查看实验室冲突详情');
            layer.msg('12414');
        }
    };
    $('.saveAllRecords').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        methodButton[method] ? methodButton[method].call(this, othis) : '';
    });
    $('.showLabRoomConflictDetail').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        methodButton[method] ? methodButton[method].call(this, othis) : '';
    });
    function recordsObject(weeks,classes,weekday,labRoomId,item,teacher,tutor,desks,virtual,softs) {
        var JudgeConflictTimeTableVO = new Object();
        JudgeConflictTimeTableVO.weeks = weeks;
        JudgeConflictTimeTableVO.classes = classes;
        JudgeConflictTimeTableVO.weekday = weekday;
        JudgeConflictTimeTableVO.term = $('#termid').val();
        JudgeConflictTimeTableVO.courseNo = $('#courseNo').val();
        JudgeConflictTimeTableVO.labRoomId = labRoomId;
        JudgeConflictTimeTableVO.item = item;
        JudgeConflictTimeTableVO.teacher = teacher;
        JudgeConflictTimeTableVO.tutor = tutor;
        JudgeConflictTimeTableVO.status = 10;
        JudgeConflictTimeTableVO.createdBy = username;
        JudgeConflictTimeTableVO.station = desks;
        JudgeConflictTimeTableVO.virtual = virtual;
        JudgeConflictTimeTableVO.softwares = softs;
        if($('#timetableStyle').val()==1){
            JudgeConflictTimeTableVO.timetableStyle = 1;
        }else {
            JudgeConflictTimeTableVO.timetableStyle = 3;
        }

        return JudgeConflictTimeTableVO;
    }
	function saveRecords(JudgeConflictTimeTableVOs,index){
        $.ajax({
            // url: weekUrl + "?term=16&weekday=-1",
            url: zuulUrl + "api/school/apiSaveTimetableAppointmentByJudgeConflict",
            // headers: {Authorization: getJWTAuthority()},
            data: JSON.stringify(JudgeConflictTimeTableVOs),
            async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                if(res){
                    layer.msg('保存成功');
                    getAlRecords();
                    if(index!='all'){
                        $('#single_form'+index).remove();
                        var tag = $.cookie('addTimes');
                        var tags = tag.split(",");
                        tags.splice(index, 1);
                        removeRecords.push(index);
                        records[index].allSaveFlag = 0;
                        // records.splice(index, 1);
                        $.cookie('addTimes',tags);
                    }else if(index=='all'){
                        $('.unassigned_times').html('');
                        $.cookie('addTimes','');
                        $('#remove_uncourse').remove();
                        $('.saveAllRecords').remove();
                        $('.previousStep').remove();
                        var str = '<a class="layui-btn" onclick="closeLayers()">排课完成</a>';
                        $('.step_bottom').append(str);
                    }
                };
            },
            error: function (res) {
                layer.msg(res);
            }
        });
    }
    window.closeLayers = function () {
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引

        parent.layer.close(index); //再执行关闭
    };

	//监听行工具事件
	table.on('tool(definiteListStepFour)', function(obj) {
		var data = obj.data;
		if(obj.event === 'del') {
			layer.confirm('真的删除行么', function(index) {
                $.ajax({
                    url: zuulUrl + "api/timetable/manage/apiDeleteTimetableBySameNumberId?id=" + obj.data.sameNumberId+"&createdBy="+username,
                    contentType: "application/json;charset=utf-8",
                    // headers:{Authorization: getJWTAuthority()},
                    async: false,
                    dataType: "json",
                    type: "post",
                    //async: false,
                    success: function (json) {
                        getAlRecords();
                    }
                });
				layer.close(index);
			});
		}
	});

	//打开添加其他时间段排课
	var active = {
		addlesson: function(){
            var courseNo=$('#courseNo').val();
            var term=$('#termid').val();
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '添加其他时间段排课',
				area: ['500px', '500px'],
				shade: 0.5,
				maxmin: true,
				content:  contextPath + '/lims/timetable/course/addLesson?courseNo='+courseNo+'&term='+term+'&tags='+tagLesson,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#addlessonbtn");
					submit.click();
                    getAlRecords();
				}
			});
			//layer.full(index);
		}
	};
	$('.addlesson').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		active[method] ? active[method].call(this, othis) : '';
	});
    //上一步页面
    var previousStep = {
        previousStep: function() {
            var that = this;
            //多窗口模式，层叠置顶
            var courseNo = $('#courseNo').val();
            var term = $('#termid').val();
            window.parent.window.definiteCourseThree(term,courseNo);
        }
    };
    $('.previousStep').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        previousStep[method] ? previousStep[method].call(this, othis) : '';
    });
    function getTimetableConfig(type) {
        var config;
        $.ajax({
            url: zuulUrl + "api/common/config/apiPlatformConfigInfo?modelType="+type,
            // headers: {Authorization: getJWTAuthority()},
            async: false,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                config = data;
            }
        });
        return config;
    }
});
// function getJWTAuthority() {
//     var authorization ="";
//     initDirectoryEngine({
//         getHostsUrl:contextPath+"/shareApi/getHosts",
//         getAuthorizationUrl:contextPath+"/shareApi/getAuthorization"
//     });
//     getAuthorization({
//         async:false,
//         success:function(data){
//             authorization =data;
//         }
//     });
//     return authorization;
// }