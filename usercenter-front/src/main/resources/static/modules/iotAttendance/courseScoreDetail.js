layui.use(['laypage', 'layer', 'table', 'laydate', 'element', 'form'], function() {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        laydate = layui.laydate,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form

    //向世界问个好
    layer.msg('进入成绩打分');


    //创建成绩测  周次+天+开始节次+结束节次
    var siteId = parseInt(weeks+weekday+startClass+endClass)

    //console.log(siteId)

    var assignmentId = id

   // console.log(assignmentId)

    //导出的数据
    var  excelData=[]


    $.ajax({
        url: transcriptHost+`/createGradeBook`,
        type:'post',
        data: {
            siteId:siteId,
            siteName:courseName,
            assignmentId:id,
            assignmentTitle:courseName,
            type:"attendance",
            weight:1.0,
            module:"skill"
        },
        success:function(res){
            console.log(res)
            //执行表单，加载数据
            if(res.code==200){
                renderTabPage()
            }
        },
        fail:function () {
            layer.msg("成绩册创建失败")
            window.history.back()
            location.reload();
        }
    });

    //批量保存空成绩（初始化）
    function initGrand(re){
        if(re.data.total>0){
            let result = re.data.records.map(v => {
                return {"cname": v.studentName, "username": v.username,"assignmentIdString":id ,  "siteId" : siteId , "points": 0}
            });
            console.log(result)
            $.ajax({
                url: transcriptHost + '/submitTranscriptApi',
                type:'post',
                data:JSON.stringify(result),
                dataType : 'json',
                contentType : 'application/json',
                success:function(res){
                    //执行表单，加载数据
                    renderTabPage()
                },
                fail:function () {
                    layer.msg("成绩初始化失败")
                    window.history.back()
                    location.reload();
                }
            });
        }else {
            renderTabPage({
                stCount:0
            })
        }


    };
    //自定义前端分页
    function renderTabPage(re) {
        let userSearch=''
        let stCount
        if(re!==undefined){
            if(re.username!==undefined || re.username!==""){
                userSearch  =re.username
            }
            if(re.stCount!==undefined){
                stCount =re.stCount
            }
        }
        //请求数据
        $.ajax({
            url: transcriptHost + '/gradebookListApi',
            type:'post',
            data: {'module': "skill",'type': "attendance" ,'siteId': siteId,'assignmentSearch':assignmentId , 'userSearch' :userSearch},
            success:function(res){
                console.log(res)
                if(res.length==0 && stCount!=0){
                    getStudent()
                }else {
                    let sourceData=[]
                    if(stCount!=0){
                        sourceData = res[0].transcriptInfoVos;
                    }
                    //let pageData = res.data;
                    let new_data = $.extend(true, [], sourceData);
                    console.log(new_data)
                    //执行一个表单
                    table.render({
                        elem: '#courseattendancedetail',
                        title: '列表',
                        cellMinWidth: 100,
                        page: true, //开启分页
                        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
                            //curr: 5, //设定初始在第 5 页
                            groups: 1, //只显示 1 个连续页码
                            first: false, //不显示首页
                            last: false //不显示尾页
                        },
                        cols: [
                            [ //表头
                                {fixed: 'left', title: '序号', type: 'numbers', width: 50},
                                {field: 'cname', title: '姓名', sort: true, width: 80},
                                {field: 'username', title: '学号', sort: true, width: 120},
                                {
                                    title: '打分', width: 200,
                                    templet: function (d) {
                                        var str = '<input type="number"  name="mark" value="' + d.results + '" >';

                                        return str;
                                    }
                                },
                                {fixed: 'right', title: '操作', toolbar: '#toolbar', width: 120}
                            ]
                        ],
                        id: 'courseattendancedetail',
                        data: new_data,
                        skin: 'line', //表格风格
                        even: false,
                        limits: [10, 20, 30, 50, 70, 100],
                        limit: 10, //每页默认显示的数量
                        done: function (res) {
                            let data = res.data
                            let result = data.map(v => {
                                return {"LAY_TABLE_INDEX": v.LAY_TABLE_INDEX, "cname": v.cname,"username":v.username ,  "results" : v.results}
                            });
                            excelData=result

                        }
                    });
                }
            },

        });
    }

    window.exportDate = function() {
        //设置表头
        let headers=['姓名','学号','分数']
        console.log(excelData)
        table.exportFile(headers, excelData, 'xls'); //默认导出 csv，也可以为：xls
    }

  // function renderTab(re){
  //     var userSearch=''
  //     if(re!==undefined || re!==""){
  //         userSearch  =re
  //     }
  //     //执行一个表单
  //     table.render({
  //         elem: '#courseattendancedetail',
  //         // url: '../modules/iotAttendance/static/json/courseAttendanceDetail.json', //数据接口
  //         url: transcriptHost + '/gradebookListApi',
  //         where:{'module': "skill",'type': "attendance" ,'siteId': siteId,'assignmentSearch':assignmentId , 'userSearch' :userSearch},
  //         method: 'post',
  //         headers: {
  //             "x-datasource": getCookie('datasource.cookie'),
  //         },
  //         // contentType :"json",
  //         title: '列表',
  //         cellMinWidth: 100,
  //         page: false, //开启分页
  //         page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
  //             layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
  //             //curr: 5, //设定初始在第 5 页
  //             groups: 1, //只显示 1 个连续页码
  //             first: false, //不显示首页
  //             last: false //不显示尾页
  //         },
  //         cols: [
  //             [ //表头
  //                 {fixed: 'left', title: '序号', type: 'numbers', width: 50},
  //                 {field: 'cname', title: '姓名', sort: true, width: 80},
  //                 {field: 'username', title: '学号', sort: true, width: 120},
  //                 {title: '打分', width: 200,
  //                     templet: function (d) {
  //                         var str= '<input type="number"  name="mark" value="'+ d.results +'" >';
  //
  //                         return str;
  //                     }},
  //                 {fixed: 'right', title: '操作', toolbar: '#toolbar', width: 120}
  //             ]
  //         ],
  //         id: 'courseattendancedetail',
  //         request:{
  //             pageName:"current",
  //             limitName:"size"
  //         },
  //         data: table,
  //         skin: 'line', //表格风格
  //         even: false,
  //         limits: [5, 7, 10, 20, 50, 100],
  //         limit: 10, //每页默认显示的数量
  //         parseData:function(res) {
  //             var currentData=[]
  //             if(res.length>0){
  //                 currentData = res[0].transcriptInfoVos;
  //             }
  //             return {
  //                 code: 0,
  //                 data: currentData,
  //                 // curr: res.count,
  //                 //count: res.total,
  //                 le:res.length
  //             }
  //         },
  //         done: function (res) {
  //             //如果无数据，则新建
  //             console.log(res)
  //             if(res.le==0 ){
  //                 getStudent()
  //             }else {
  //                 //do nothing
  //             }
  //         }
  //     });
  // }

  function getStudent(){
      $.ajax({
          //url: '../modules/iotAttendance/static/json/courseAttendanceDetail.json', //数据接口
          url: attendanceHost + '/getAttendanceStatus',
          type:'post',
          //type : 'get',
          data:{
              'id': id,'startTime':classDate+" "+startTime,'endTime':classDate+" "+endTime ,'hardwareIps':hardwareIps,'current':1,'size':9999
          },
          success:function(res){
              //初始化成绩册
              initGrand({
                  data:res
              })

          },
          fail:function () {
              layer.msg("成绩册创建失败")
              window.history.back()
              location.reload();
          }
      });
  }


    //监听行工具事件
    table.on('tool(courseattendancedetail)', function(obj) {
      //  console.log( $(this).closest('td').prev().find('input').val())
        var mark =  $(this).closest('td').prev().find('input').val()
        //提交打分
        if(obj.event === 'submit') {
                $.ajax({
                    url: transcriptHost+`/saveRecord`,
                    type:'post',
                    data:{
                        siteId:siteId,
                        points:mark,
                        username:obj.data.username,
                        cname : obj.data.cname,
                        assignmentId:id,
                    },
                    success:function(res){
                        renderTabPage()
                    }
                });

        };

    });

    var $ = layui.$,
        active = {
            reload: function() {
                var username = $('input[name=searchbox]').val();
                //执行重载
                renderTabPage({
                    username:username
                })

            }
        };

    $('.search_line .layui-btn').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

});