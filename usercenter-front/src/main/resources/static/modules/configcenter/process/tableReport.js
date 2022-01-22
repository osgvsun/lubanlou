var evaluationHost =apiGateWayHost+"/configcenter/";
layui.define(function (e) {
    layui.config({
        base:'../'
    }).extend({
        index:'lib/index'
    }).use(['index','table','form','layer'],function () {
        var $ = layui.$,
            layer = layui.layer,
            form = layui.form,
            table = layui.table;
        var url;//列表api
        var timeFlag = 1;//0:已结束1:进行中2:未开始
        var currcname;//当前登录人姓名
        var curruserdetail;//当前登录人个人信息
        var currusername;//当前登录人工号
        var currauth = [];//当前登录人选择权限
        var authorities;//当前登录人拥有权限
        var templateId;//进入页面的第一个模板id
        var cols = [];//根据模板获取列表表头
        var exactSearchDTO  = [];//记录列表筛选项
        var currentauth = $.cookie('currauth');
        var currentauthName =  $.cookie("currentauthName");
        var timeFlag ;
        var deleteFlag = 0 ;//0不可以删除 1可以删除
        var infoCname;//总览按钮文本
        var nextStepCname;//下一阶段按钮文本
        var processKey;//当前模板流程
        getAllTemplates();
        getTemplateInfo();
        getCurrentUser();
        getInfoByAuthorityName();
        getTableHeader();
        tableRender();
        // exportFileRender();
        //根据flag获取列表0:已结束1:进行中2:未开始
        var exportFlag = 0;
        function getCurrentUser() {
            $.ajax({
                url: 'getCurrentUser',
                // dataType: 'json',
                async: false,
                type: 'get',
                success: function (res) {
                    currusername = res.username;
                    currcname = res.cname;
                    authorities = res.authorityMap[$('#clientId').val()];
                }
            });
        }
        function getAllTemplates() {
            $.ajax({
                url: evaluationHost + 'api/template/infoByConfigType?configType='+configType,
                type:'get',
                async: false,
                success:function (res){
                    if(res.data.length==1){
                        templateId = res.data[0].id;
                        processKey = res.data[0].processKey;
                    }else if(res.data.length == 0){
                        layer.msg("当前业务未创建模板!");
                    }else{
                        $('.timetable_tool').removeClass('layui-hide');
                        var str = '';
                        $.each(res.data,function (index,item){
                            str +='<option value="'+ item.id +'">'+ item.templateCname +'</option>'
                        });
                        $('#template').append(str);
                        processKey = res.data[0].processKey;
                        templateId = res.data[0].id;
                        form.render('select');
                    }
                },
                error:function () {
                    layer.msg("获取模板列表失敗！");
                }
            });
        }
        function getTemplateInfo() {
            $.ajax({
                url: evaluationHost + 'api/template/info?templateId='+templateId,
                type:'get',
                async: false,
                success:function (res){
                    nextStepCname = res.data.nextStepCname;
                    infoCname = res.data.infoCname;
                    $('.legend_select').html(res.data.templateCname+'报表');
                    $(document).attr("title",res.data.templateCname);
                    $('#clientId').val(res.data.sourceProject);
                },
                error:function () {
                    layer.msg("获取模板信息失敗！");
                }
            });
        }
        //根据权限获取筛选项
        function getInfoByAuthorityName() {
            var currauth = $.cookie("currauth");
            $.ajax({
                url: evaluationHost + 'api/templateAuthority/infoByAuthorityName?authorityName='+currauth+'&templateId='+templateId,
                type:'get',
                async: false,
                success:function (res){
                    // console.log(res);
                    if(res.data!=null&&res.data.length>0){
                        $.each(res.data,function (index,item) {
                            var searchValue;
                            if(item.configIndicatorSearchName == 'company'){//企业,事业,单位,公司
                                if(curruserdetail.data.enterpriseUser!=null){
                                    searchValue = curruserdetail.data.enterpriseUser.id+'_'+curruserdetail.data.enterpriseUser.enterpriseName;
                                }else if(curruserdetail.data.governmentUser!=null){
                                    searchValue = curruserdetail.data.governmentUser.id+'_'+curruserdetail.data.governmentUser.gsiName;
                                }
                            }else if(item.configIndicatorSearchName == 'academy'){//当前登录人学院
                                searchValue = curruserdetail.data.normalUser.college+'_'+curruserdetail.data.normalUser.collegeName;
                            }else if(item.configIndicatorSearchName == 'currentuser'){//当前登录人相关
                                searchValue = currusername+'_'+currcname;
                            }
                            exactSearchDTO.push({
                                configIndicatorId: item.configIndicatorId,
                                searchValue: searchValue
                            })
                        })
                    }
                },
                error:function () {
                    layer.msg("获取筛选项失敗！");
                }
            });
        }
        //获取表头
        function getTableHeader() {
            var data1 = {
                // exactSearchDTOList: exactSearchDTO,
                configTypeId: configType,
                page: 1,
                limit: 1,
            };
            $.ajax({
                url: evaluationHost + 'api/timetable/reportDataList',
                type:'POST',
                data: JSON.stringify(data1),
                contentType: "application/json;charset=UTF-8",
                async: false,
                success:function (res) {
                    // console.log(res);
                    var coll = [];
                    var col = [];
                    var totalRows = [];
                    col.push(
                        // {type:'checkbox'},
                        {title:'序号',width:50,type:"numbers",align:'left',totalRowText:"合计："}
                    );
                    for(var i in res.data.headList){
                        col.push({
                            field: i, title:res.data.headList[i],sort: true,align:'left'
                        })
                    }
                    // $.each(res.data.headList ,function (index,item){
                    //     if(item){
                    //         totalRows.push(index)
                    //     }
                    // });
                    // $.each(res.data.headList,function (index,item){
                    //     if($.inArray(index, totalRows)!=-1){
                    //         col.push({
                    //             field: 'header'+index, title:item,sort: true,align:'left',totalRow:true
                    //         })
                    //     }else{
                    //         col.push({
                    //             field: 'header'+index, title:item,sort: true,align:'left'
                    //         })
                    //     }
                    //
                    // });
                    coll.push(col);
                    cols = coll;
                },
                error:function (){
                    layer.msg("获取模板表头失敗！");
                }
            });
        }
        function tableRender() {
            // getTableHeader();
            var data = {
                exactSearchDTOList: exactSearchDTO,
                configTypeId: configType,
            };
            var commonTable = table.render({
                elem: '#menu',
                id: 'commonList',
                // url: evaluationHost + 'api/timetable/info?templateId='+templateId+'&timeFlag=1', //数据接口
                url: evaluationHost + 'api/timetable/reportDataList', //数据接口
                method:'POST',
                where: data,
                contentType: "application/json;charset=UTF-8",
                title: $('.legend_select').text(),
                totalRow: true, //开启合计行
                // toolbar: true,
                // defaultToolbar: ['filter', 'exports', 'print', ],
                page: true, //开启分页
                page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                    layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
                    //curr: 5, //设定初始在第 5 页
                    groups: 1, //只显示 1 个连续页码
                    first: false, //不显示首页
                    last: true //显示尾页
                },
                parseData: function(res){ //res 即为原始返回的数据
                    // console.log(res);
                    var pdata = {
                        "code": 0, //解析接口状态
                        "msg": "", //解析提示文本
                        "count": res.total, //解析数据长度
                        "data": [], //解析数据列表
                        "totalRow": new Object()
                    };
                    if(res.data.dataList.length>0){
                        pdata.data = [];

                        $.each(res.data.dataList ,function (index,item){
                            var record = {};
                            for(var k in item){
                                record[k] = item[k];
                            }
                            pdata.data.push(record);
                        });
                        for(var k in res.data.sumList){
                            pdata.totalRow[k] = res.data.sumList[k];
                        }
                        // console.log(pdata);
                    }
                    return pdata;
                },
                cols: cols,
                // cols: [[
                //     {title:'序号',width:50,type:"numbers",align:"left",totalRowText:"合计："}
                //     ,{field:'createUser', width:100, title: '创建人',align:"left", sort: true}
                //     ,{field:'projectName', minWidth:80, title: '项目名称',align:"left", sort: true}
                //     ,{field:'responsibleUser', minWidth:80, title: '项目负责人',align:"left", sort: true}
                //     ,{field:'phone', title: '项目负责人联系方式',align:"left", sort: true}
                //     ,{field:'date', minWidth:200, title: '项目实施时间',align:"left", sort: true}
                //     ,{field:'projectNumber', title: '项目编号',align:"left", sort: true}
                //     ,{field:'budget', title: '经费预算',align:"left", sort: true}
                //     ,{field:'actualSum', title: '实际金额',align:"left", sort: true}
                //     ,{field:'biddingSum', title: '招标纪要实际金额（万元）',align:"left", sort: true}
                //     ,{field:'currentStep', title: '当前阶段',align:"left", sort: true}
                // ]],
                data: table,
                //skin: 'line' ,//表格风格
                even: true,
                page: true,
                limits: [5, 10, 15, 20],
                limit: 15, //每页默认显示的数量
                request:{
                    page:'page',
                    limit:'limit'
                },
                done:function(res,curr,count){ // 隐藏列
                    const limit = commonTable.config.limit;
                    if (limit != 0 && count % limit == 0) {
                        var lastPage = parseInt(count / limit)
                    }
                    if (limit != 0 && count % limit != 0) {
                        var lastPage = parseInt(count / limit) + 1;
                    }
                    if(curr!=lastPage){
                        this.elem.next().find('.layui-table-total').css("display","none");
                    }else{
                        if(res.totalRow){
                            this.elem.next().find('.layui-table-total').css("display","");
                            var that = this;
                            $.each(res.totalRow,function (index,item) {
                                // console.log(item)
                                that.elem.next().find('.layui-table-total').find("[data-field="+ index +"] .layui-table-cell").text(item);
                            })
                        }else{
                            this.elem.next().find('.layui-table-total').css("display","none");
                        }
                        // this.elem.next().find('.layui-table-total').find("[data-field=0] .layui-table-cell").text('合计：');
                    }
                }
            });
        }

        function exportFileRender(){
            var data = {
                exactSearchDTOList: exactSearchDTO,
                templateId: templateId,
                timeFlag: timeFlag
            };
            table.render({
                elem: '#exprortTable',
                id: 'exprortTable',
                // url: evaluationHost + 'api/timetable/info?templateId='+templateId+'&timeFlag=1', //数据接口
                url: evaluationHost + 'api/timetable/infoByExactSearch', //数据接口
                method:'POST',
                where: data,
                contentType: "application/json;charset=UTF-8",
                title: $('.layui-card-header').text(),
                // toolbar: true,
                // defaultToolbar: ['filter', 'exports', 'print', ],
                page: true, //开启分页
                page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                    layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
                    //curr: 5, //设定初始在第 5 页
                    groups: 1, //只显示 1 个连续页码
                    first: false, //不显示首页
                    last: false //不显示尾页
                },
                parseData: function(res){ //res 即为原始返回的数据
                    // $("div[lay-id='exprortTable']").hide();
                    // console.log(res);
                    var pdata = {
                        "code": 0, //解析接口状态
                        "msg": "", //解析提示文本
                        "count": res.total, //解析数据长度
                        "data": [] //解析数据列表
                    };
                    if(res.data.length>0){
                        pdata.data = [];
                        $.each(res.data ,function (index,item){
                            var record = {};
                            record.id = item.id;
                            record.step = item.currentStep;
                            record.nextFlag = 0;
                            record.deleteFlag = 0;
                            record.timeFlag = timeFlag;
                            if(item.timetableProcessDTOS[0].authorityNamesEdit.length!=0){
                                $.each(item.timetableProcessDTOS[0].authorityNames,function (ii,data) {
                                    $.each(currauth,function (i,d) {
                                        if(data == d){
                                            record.deleteFlag = 1;
                                            deleteFlag = 1;
                                            $('.deleteTimetable').removeClass('layui-hide');
                                        }
                                    })
                                })
                            }else{
                                record.deleteFlag = 1;
                            }
                            if(item.timetableProcessDTOS.length!=0){
                                if(item.timetableProcessDTOS[0].timetableResults.length!=0){
                                    $.each(item.timetableProcessDTOS,function (i,d) {
                                        if(d.processStep == item.currentStep){
                                            record.currentStep = d.processCname;
                                            if(d.authorityNames!=null){
                                                if(d.authorityNamesEdit.length==0){
                                                    record.nextFlag = 1;
                                                }else{
                                                    $.each(d.authorityNames,function (k,v) {
                                                        $.each(currauth,function (dex,val) {
                                                            if(v == val){
                                                                record.nextFlag = 1;
                                                            }
                                                        })
                                                    })
                                                }

                                            }
                                        }else if(item.currentStep == 0){
                                            record.currentStep = '已结束';
                                        }
                                    });
                                    $.each(item.timetableProcessDTOS,function (j,o) {
                                        $.each(o.configIndicators,function (i,d) {
                                            if(d.isShow == 1 || d.isShow == 2){
                                                if(o.timetableResults.length>0){
                                                    if(d.indicatorName == null){d.indicatorName = ''};
                                                    if(d.indicatorName == 'current'||d.indicatorName.indexOf('|currentLogin|')!=-1||d.contentType == 'select'){
                                                        record['header'+d.id] = o.timetableResults[0]['evaluationScore'+(i+1)].split('_')[o.timetableResults[0]['evaluationScore'+(i+1)].split('_').length-1]
                                                    }else if(d.contentType == 'localObject'&&d.indicatorName == 'select'){
                                                        if(o.timetableResults[0]['evaluationScore'+(i+1)]!=null){
                                                            record['header'+d.id] = o.timetableResults[0]['evaluationScore'+(i+1)].split('_')[o.timetableResults[0]['evaluationScore'+(i+1)].split('_').length-1]
                                                        }
                                                    }else if(d.contentType == 'multiSelect'){
                                                        var objs = o.timetableResults[0]['evaluationScore'+(i+1)].split(',');
                                                        var str = '';
                                                        if(objs.length>0){
                                                            $.each(objs,function (i,d) {
                                                                str+=d.split('_')[d.split('_').length-1]+',';
                                                            })
                                                            str = str.slice(0,str.length-1);
                                                        }
                                                        record['header'+d.id] = str;
                                                    }else{
                                                        record['header'+d.id] = o.timetableResults[0]['evaluationScore'+(i+1)]
                                                    }
                                                }else{
                                                    record['header'+d.id] = '';
                                                }
                                            }
                                        });
                                    })

                                    pdata.data.push(record);
                                }
                            }
                        });
                        // console.log(pdata);
                    }
                    return pdata;
                },
                cols: cols,
                data: table,
                //skin: 'line' ,//表格风格
                even: true,
                page: true,
                limits: [5, 10, 15, 20],
                limit: 999999, //每页默认显示的数量
                request:{
                    page:'page',
                    limit:'limit'
                },
                done: function () {
                    if(timeFlag == 0&&exportFlag==0){
                        $('.tabsearch').append('<button class="layui-btn export_file" type="button" onclick="exportFile()">' +
                            '                            <i class="layui-icon layui-icon-export"></i>导出' +
                            '                        </button>');
                        exportFlag++
                    }
                }
            });
        }
        //导出报表
        exportReport={
            exportReport:function () {
                let url = evaluationHost+'api/timetable/reportDataExport'
                let data = {
                    exactSearchDTOList: exactSearchDTO,
                    configTypeId: configType,
                };
                axios({
                    method: 'post',
                    url: url, // 请求地址
                    data: data, // 参数
                    responseType: 'blob',
                }).then(res => {
                    let newName = '报表.xlsx'
                    // 处理返回的文件流
                    const content = res.data

                    const blob = new Blob([content], { type: 'application/octet-stream;charset=ISO8859-1' })
                    // console.log(res.headers)
                    // const fileName = res.headers['content-disposition'].split('filename=')[1]
                    const fileName = newName
                    if ('download' in document.createElement('a')) {
                        // 非IE下载
                        const elink = document.createElement('a')
                        elink.download = fileName
                        elink.style.display = 'none'
                        elink.href = URL.createObjectURL(blob)
                        document.body.appendChild(elink)
                        elink.click()
                        URL.revokeObjectURL(elink.href) // 释放URL 对象
                        document.body.removeChild(elink)
                    } else {
                        // IE10+下载
                        navigator.msSaveBlob(blob, fileName)
                    }
                })
                // window.location.href = evaluationHost+'api/timetable/reportDataExport?configType='+configType;
                // window.open('tableReport?configType='+ configType,'_blank');
            }
        }
        $('.breadcrumb_select').on('click', function(){
            var othis = $(this), type = othis.data('type');
            exportReport[type] ? exportReport[type].call(this, othis) : '';
        })
        window.exportFile = function () {
            layer.msg('导出中······请稍等片刻')
            // var data = layui.table.cache["exprortTable"];
            var data1 = {
                exactSearchDTOList: exactSearchDTO,
                templateId: templateId,
                timeFlag: timeFlag,
            };
            //执行重载
            table.reload('exprortTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: data1,
                done: function (res) {
                    table.exportFile('exprortTable',res.data, 'xls'); //导出数据
                }
            }, 'data');

        }
        //搜索
        // var $ = layui.$,
        reload = {
            reload: function() {
                var search_box = $('#search_box');
                var data1 = {
                    exactSearchDTOList: exactSearchDTO,
                    templateId: templateId,
                    timeFlag: timeFlag,
                    search: search_box.val()
                };
                //执行重载
                table.reload('commonList', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: data1
                }, 'data');
            }
        };

        $('.tabsearch .layui-btn').on('click', function() {
            var type = $(this).data('type');
            reload[type] ? reload[type].call(this) : '';
        });
    })
    e("phenomMenuList",{})
})