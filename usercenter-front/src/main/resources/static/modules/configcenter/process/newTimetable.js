var evaluationHost =apiGateWayHost+"/configcenter/";
var zuulHost =apiGateWayHost;
layui.define(function (e) {
    layui.use(['table','layer','laydate','form'],function () {
        var $ = layui.$,
            layer = layui.layer,
            table = layui.table,
            laydate = layui.laydate,
            form = layui.form
        ;
        var step = 1;//當前階段
        var currusername;//當前登錄人的工號
        var currcname;//當前登錄人的姓名
        var selectConfig = [];//记录配置项为单选框的下标
        var multiSelectConfig = [];//记录配置项为多选框的下标
        var inputConfig = [];//记录配置项为输入框的下标
        var urlConfig = [];//记录配置项为外链的下标
        var textConfig = [];//记录配置项为多行文本框的下标
        var fileConfig = [];//记录配置项为附件的下标
        var dateConfig = [];//记录配置项为日期的下标
        var templateInfo;//模板信息
        getCurrentUser();
        getConfigByTemplateId();
        configRender();
        function getCurrentUser() {
            $.ajax({
                url: 'getCurrentUser',
                // dataType: 'json',
                async: false,
                type: 'get',
                success: function (res) {
                    currusername = res.username;
                    currcname = res.cname;
                }
            });
        }
        function getConfigByTemplateId() {
            $.ajax({
                url: evaluationHost+'api/configIndicator/list?templateId='+ templateId +'&step='+ step +'&page=1&limit=999',
                dataType: 'json',
                async: false,
                type: 'get',
                success: function (res) {
                    console.log(res);
                    var str = '';
                    // timetableId = data.data.evaluationTimetable.id;
                    $.each(res.data, function (index, item) {
                        if(item.contentType == 'select'){
                            selectConfig.push({index:(index+1),url:item.url});
                            str+='<div class="layui-row">' +
                                '<div class="layui-col-lg12">' +
                                '<label class="layui-form-label">'+ item.indicatorCname +'</label>' +
                                '<div class="layui-input-block">' +
                                '<select name="evaluationScore'+ (index+1) +'" id="selectConfig'+ (index+1) +'" lay-verify="required" lay-filter="select'+ (index+1) +'" lay-search="">' +
                                '<option value="">请选择'+ item.indicatorCname +'</option>' +
                                '</select>' +
                                '</div></div></div>';
                        }else if(item.contentType == 'multiSelect'){
                            multiSelectConfig.push({index: (index+1),url: item.url,type: item.indicatorName});
                            str+='<div class="layui-row">' +
                                '<div class="layui-col-lg12">' +
                                '<label class="layui-form-label">'+ item.indicatorCname +'</label>' +
                                '<div class="layui-input-block">' +
                                '<div id="multiSelectConfig'+ (index+1) +'" class="xm-select-demo"></div>' +
                                '</div></div></div>';
                        }else if(item.contentType == 'input'){
                            inputConfig.push({index: (index+1),url: item.url,type: item.indicatorName});
                            if(item.indicatorName=='current'||item.indicatorName=='currentLogin'){
                                str+='<div class="layui-row">' +
                                    '<div class="layui-col-lg12">' +
                                    '<label class="layui-form-label">'+ item.indicatorCname +'</label>' +
                                    '<div class="layui-input-block">' +
                                    '<input type="text" id="inputConfig'+ (index+1) +'" name="evaluationScore'+ (index+1) +'"  lay-verify="" placeholder="请填写'+ item.indicatorCname +'" autocomplete="on" class="layui-input layui-hide" />' +
                                    '<input type="text" id="inputConfigShow'+ (index+1) +'" name="evaluationScoreShow'+ (index+1) +'"  lay-verify="" placeholder="请填写'+ item.indicatorCname +'" autocomplete="on" class="layui-input layui-disabled" disabled="" />' +
                                    '</div></div></div>';
                            }else{
                                str+='<div class="layui-row">' +
                                    '<div class="layui-col-lg12">' +
                                    '<label class="layui-form-label">'+ item.indicatorCname +'</label>' +
                                    '<div class="layui-input-block">' +
                                    '<input type="text" id="inputConfig'+ (index+1) +'" name="evaluationScore'+ (index+1) +'"  lay-verify="required" placeholder="请填写'+ item.indicatorCname +'" autocomplete="on" class="layui-input" />' +
                                    '</div></div></div>';
                            }
                        }else if(item.contentType == 'url'){
                            urlConfig.push((index+1));
                            if(item.url == null){item.url='http://www.baidu.com'}
                            str+='<div class="layui-row">' +
                                '<div class="layui-col-lg12">' +
                                '<label class="layui-form-label">'+ item.indicatorCname +'</label>' +
                                '<div class="layui-input-block">' +
                                '<a id="urlConfig'+ (index+1) +'" href="'+ item.url +'" target="_blank">点我进入'+ item.indicatorCname +'</a>' +
                                '</div></div></div>';
                        }else if(item.contentType == 'text'){
                            textConfig.push((index+1));
                            str+='<div class="layui-row">' +
                                '<div class="layui-col-lg12">' +
                                '<label class="layui-form-label">'+ item.indicatorCname +'</label>' +
                                '<div class="layui-input-block">' +
                                '<textarea type="text"  id="textConfig'+ (index+1) +'" name="evaluationScore'+ (index+1) +'"   placeholder="请填写'+ item.indicatorCname +'" autocomplete="on" class="layui-textarea" ></textarea>' +
                                '</div></div></div>';
                        }else if(item.contentType == 'file'){
                            fileConfig.push((index+1));
                            str+='<div class="layui-row">' +
                                '<div class="layui-col-lg12">' +
                                '<label class="layui-form-label">'+ item.indicatorCname +'</label>' +
                                '<div class="layui-input-block">' +
                                '<button type="button" class="layui-btn" onclick="uploadFileMeeting('+ (index+1) +')">上传附件</button>' +
                                '<input id="fileUpload'+ (index+1) +'" name="evaluationScore'+ (index+1) +'" class="layui-input layui-disabled" disabled=""/>' +
                                '</div></div></div>';
                        }else if(item.contentType == 'date'){
                            dateConfig.push((index+1));
                            str+='<div class="layui-row">' +
                                '<div class="layui-col-lg12">' +
                                '<label class="layui-form-label">'+ item.indicatorCname +'</label>' +
                                '<div class="layui-input-block">' +
                                '<input type="text" id="dateConfig'+ (index+1) +'" name="evaluationScore'+ (index+1) +'"  lay-verify="required" placeholder="请选择'+ item.indicatorCname +'" autocomplete="off" class="layui-input" />' +
                                '</div></div></div>';
                        }
                    });
                    $('.tutor-block').before(str);
                    getTemplateType();
                    form.render();
                },
                error:function () {
                    alert("获取配置项失败！");
                }
            });
        }
        function configRender() {
            $.each(multiSelectConfig,function (index,item) {
                var multis = 'multiSelectConfig'+item.index;
                if(item.type==null){//数据不多
                    multis = xmSelect.render({
                        el: '#multiSelectConfig'+item.index,
                        name: 'evaluationScore'+item.index,
                        layVerify: 'required',
                        toolbar: {show: true, showIcon: false},
                        theme: {color: '#1E9FFF',},
                        model: {icon: 'hidden',},
                        data: []
                    });
                    if(item.url!=null){
                        $.ajax({
                            url: zuulHost+item.url,
                            dataType: 'json',
                            async: false,
                            type: 'post',
                            success: function (res) {
                                var data1 = [];
                                $.each(res.data, function (index, item) {
                                    var d = {name: item.text,value: item.id};
                                    data1.push(d);
                                    // str+='<option value="'+ item.id +'">'+ item.text +'</option>'
                                });
                                multis.update({
                                    data:data1
                                })
                            }
                        });
                    }
                }else if(item.type == 'search'){//数据过多需要筛选 远程搜索
                    multis = xmSelect.render({
                        el: '#multiSelectConfig'+item.index,
                        name: 'evaluationScore'+item.index,
                        layVerify: 'required',
                        autoRow: true,
                        // toolbar: { show: true,showIcon: false },
                        filterable: true,
                        remoteSearch: true,
                        theme: {color: '#1E9FFF'},
                        model: {icon: 'hidden'},
                        remoteMethod: function(val, cb, show){
                            //这里如果val为空, 则不触发搜索
                            if(!val){
                                return cb([]);
                            }
                            $.ajax({
                                url: zuulHost+item.url+'?keyword='+val,
                                async: false,
                                type: 'get',
                                success: function (res) {
                                    var data1 = [];
                                    $.each(res.data, function (index, item) {
                                        var d = {name: item.text,value: item.id};
                                        data1.push(d);
                                        // str+='<option value="'+ item.id +'">'+ item.text +'</option>'
                                    });
                                    cb(data1)
                                }
                            });
                        }
                    });
                }
            });
            $.each(dateConfig,function (index,item) {
                laydate.render({
                    elem: '#dateConfig'+item,
                    trigger: 'click',
                    // min:minDate()
                    // , range: '~'
                });
            });
            $.each(inputConfig,function (index,item) {
                var url = '';
                if(item.url != null){
                    if (item.type == 'current'){
                        url = zuulHost+item.url;
                        $.ajax({
                            url: url,
                            // dataType: 'json',
                            async: false,
                            type: 'get',
                            success: function (res) {
                                $('#inputConfig'+item.index).val(res.data[0].id+'_'+res.data[0].text);
                                $('#inputConfigShow'+item.index).val(res.data[0].text);
                                // console.log(res)
                            }
                        });
                    }else if(item.type == 'currentLogin'){
                        $('#inputConfig'+item.index).val(currusername+'_'+currcname);
                        $('#inputConfigShow'+item.index).val(currcname);
                    }
                }else{
                    $('#inputConfig'+item.index).val('10103724_沈雄威');
                    $('#inputConfigShow'+item.index).val('沈雄威');
                }
            });
            $.each(selectConfig,function (index,item) {
                    $.ajax({
                        url: zuulHost+item.url,
                        dataType: 'json',
                        async: false,
                        type: 'post',
                        success: function (res) {
                            // console.log(res)
                            $.each(res.data, function (i, d) {
                                $('#selectConfig'+item.index).append(new Option(d.text, d.id));// 下拉菜单里添加元素
                            });
                            form.render("select");
                        }
                    });
            });
        }
        //上传附件
        window.uploadFileMeeting = function (index) {
            var temp = templateInfo.templateCname+templateInfo.id+'(1)';
            openUploadWindowByPath('配置中心/业务流程记录/'+temp,index);
        };
        //获取当前模板类型
        function getTemplateType(){
            $.ajax({
                url: evaluationHost + 'api/template/info?templateId='+templateId,
                type:'get',
                async: false,
                success:function (res){
                    // console.log(res)
                    templateInfo = res.data;
                    if(templateInfo.isAudit == 1){
                        var str = '';
                        str+='<div class="layui-row">' +
                            '<div class="layui-col-lg12">' +
                            '<label class="layui-form-label">结果</label>' +
                            '<div class="layui-input-block">' +
                            '<input type="radio" name="isAudit'+ templateId +'" value="1" title="通过">' +
                            '<input type="radio" name="isAudit'+ templateId +'" value="0" title="不通过" checked>' +
                            // '<input type="text" id="isAudit'+ templateId +'" name="isAudit'+ templateId +'"  lay-verify="required" placeholder="请选择'+ item.indicatorCname +'" autocomplete="off" class="layui-input" />' +
                            '</div></div></div>';
                        $('.tutor-block').before(str);
                        // form.render();
                    }
                },
                error:function () {
                    layer.msg("获取模板信息失敗！");
                }
            });
        }
        form.on('submit(saveTimetable)', function(data){
            console.log('保存');
            // console.log(data.elem); //被执行事件的元素DOM对象，一般为button对象
            // console.log(data.form);//被执行提交的form对象，一般在存在form标签时才会返回
            // console.log(data.field);//当前容器的全部表单字段，名值对形式：{name: value}
            var d1 = data.field;
            console.log(d1);
            $.each(multiSelectConfig,function (index,item){
                var xmList = xmSelect.get('#multiSelectConfig'+item.index);
                d1['evaluationScore'+item.index] = xmList[0].getValue('valueStr')+'_'+xmList[0].getValue('nameStr')
            });
            $.each(selectConfig,function (index,item) {
                d1['evaluationScore'+item.index] += '_'+$('#selectConfig'+item.index).find("option:selected").text();
            });
            saveNewTimetable(d1,1)
        });
        function saveNewTimetable(d1,step) {
            $.ajax({
                url:evaluationHost+'api/timetable/timetableByTemplate',
                // dataType: 'json',
                data: {templateId:templateId,sourceProject:''},
                type: 'post',
                async: false,
                // contentType:"application/json;charset=utf-8",
                success:function (data) {
                    // console.log(data);
                    if(data.code == '200'){
                        d1['businessKey'] = data.data.id;
                        d1['timetableProcessId'] = data.data.timetableProcessDTOS[0].timetableProcessId;
                        var data2 = JSON.stringify(d1);
                        // 保存
                        $.ajax({
                            // url:zuulUrl+'api/meetingProcess/saveMeetingProcess',
                            url:evaluationHost+'api/timetable/result',
                            dataType: 'json',
                            data: data2,
                            type: 'post',
                            async: false,
                            contentType:"application/json;charset=utf-8",
                            success:function (res) {
                                // console.log(res);
                                if(res.id != ''&&res.id!=null){
                                    var process = new Object();
                                    process['processKey'] = 'supervisionCheck_process';//临时
                                    process['submitUser'] = currusername;
                                    process['businessKey'] = data.data.id;
                                    var isAudit = $('input[name="isAudit'+ templateId +'"]:checked').val();
                                    if(isAudit == 1){
                                        process['result'] = 'pass';
                                    }else{
                                        process['result'] = 'fail';
                                    }
                                    $.ajax({
                                        url:zuulHost+'/process/api/process/startExampleOfCheckProcess',
                                        dataType: 'json',
                                        data: JSON.stringify(process),
                                        type: 'post',
                                        async: false,
                                        contentType:"application/json;charset=utf-8",
                                        success:function (res) {
                                            // console.log(res);
                                            if(res.msg == 'success'){
                                                var index = parent.layer.getFrameIndex(window.name);
                                                parent.layer.close(index);
                                                window.parent.location.reload();
                                            }else{
                                                layer.msg(res.msg);
                                                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                                            }
                                        },
                                        error: function () {
                                            alert("后台启动流程实例报错");
                                            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                                        }
                                    })
                                }else{
                                    layer.msg('后台保存数据报错');
                                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                                }
                            },
                            error: function () {
                                alert("后台保存数据报错");
                                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                            }
                        })
                    }else{
                        alert("后台保存业务总表报错");
                        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                    }
                },
                error: function () {
                    alert("后台保存业务总表报错");
                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                }
            })
        }
    });
    e("phenomMenuList",{})
});