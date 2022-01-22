var contextPath = $("meta[name='contextPath']").attr("content");
var zuulServerUrl = $("#zuulServerUrl").val();
var hostServerUrl = 'http://localhost:9019';
var refresh = true;
layui.use(['index', 'form', 'laypage', 'laydate', 'layer', 'table', 'element'], function() {
	var $ = layui.$,
		admin = layui.admin,
		element = layui.element,
		layer = layui.layer,
		form = layui.form,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table;

	//向世界问个好
	// layer.msg('进入实验报告管理');
	var username = $('#username').val();
    var endTime = '';
    var type = '';
	var auth = $('#auth').val();
	var termId = $('#termId').val()
	var cname = $('#cname').val()
    $.cookie('auth', auth, { path: '/' });
    $.cookie('cname', cname, { path: '/' });
    $.cookie('username', username, { path: '/' });
	form.render(null, 'reportlistbox');
    form.on('select(changeTerm)', function(data){
        // console.log(data.elem); //得到select原始DOM对象
        // console.log(data.value); //得到被选中的值
        // console.log(data.othis); //得到美化后的DOM对象
        $.ajax({
            async: false,
            type: "GET",
            // contentType:"application/json;charset=utf-8",
            // dataType:"json",
            url: contextPath+"/laboratoryReport/getDataListByTerm?termId="+data.value,
            success:function(data){
            	// console.log(data);
				data = eval('(' + data + ')');
                $('#course').html('');
                $('#teacher').html('');
                $('#weeks').html('');
                var cstr = '';
                var tstr = '';
                var wstr = '';
                cstr+='<option value="">请选择课程</option>';
                tstr+='<option value="">请选择教师</option>';
                wstr+='<option value="">请选择周次</option>';
            	$.each(data.courseList,function (index,item) {
                    cstr+='<option value="'+ item[0] +'">'+ item[1] +'</option>'
                })
				$.each(data.teacherList,function (index,item) {
                    tstr+='<option value="'+ item[0] +'">'+ item[1] +'('+ item[0] +')</option>'
                })
				$.each(data.weekList,function (index,item) {
                    wstr+='<option value="'+ item[1] +'">'+ item[1] +'</option>'
                })
                $('#course').append(cstr);
                $('#teacher').append(tstr);
                $('#weeks').append(wstr);
            	form.render();
            }
        });
    });
	if(auth=='STUDENT'){
		var url =  contextPath+"/laboratoryReport/listLaboratoryReportStudentData"
	}else{
        var url =  contextPath+"/laboratoryReport/listLaboratoryReportData"
	}
    var tablee = table.render({
        elem: '#reportlisttab',
        url: url, //数据接口
        // url: layui.setter.base + 'json/achievementSummary.json', //数据接口
        title: '',
        // cellMinWidth: 100,
        where: {term_id: termId},
        page: true, //开启分页
        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
            //curr: 5, //设定初始在第 5 页
            groups: 1, //只显示 1 个连续页码
            first: false, //不显示首页
            last: false //不显示尾页
        }
        ,parseData: function(res){ //res 即为原始返回的数据
            console.log(res);
            var pdata = {
                "code": 0, //解析接口状态
                "msg": "", //解析提示文本
                "count": res.count, //解析数据长度
                "data": [] //解析数据列表
            }
            pdata.data = [];
            $.each(res.data,function (index,item) {
                var teachers = item.teachers.split(',');
                var teacherss = '';
                $.each(teachers,function (i,d) {
                    teacherss+= d+'<br>'
                })
                var teacher = {};
                teacher.lesson = item.course_name;
                teacher.courseId = item.course_no;
                teacher.courseNumber = item.course_number;
                teacher.itemId = item.item_id;
                teacher.experimentId = item.experiment_id;
                teacher.project = item.item_name;
                teacher.classtime = item.item_time;
                teacher.teacher = teacherss;
                teacher.assignmentCount = item.assignment_count;
                teacher.class = item.studentclass;
                if(item.status!=null){
                    item.status == 1?teacher.state = '已发布':teacher.state = '已结项';
                }else{
                    teacher.state = '未发布';
                }
                if(item.hostType==true){
                    teacher.hostType = '查看远程主机信息';
                }else{
                    teacher.hostType = '';
                }
                endTime = item.endTime;
                type = item.type;

                pdata.data.push(teacher);

            })
            console.log(pdata);
            return pdata;
        },
        cols: [
            [ //表头
                {
                    field: 'lesson',
                    title: '课程名称'
                    // width: 400
                    // toolbar: '#lessoncell',
                    // sort: true
                    ,templet: function(d){
                        var str = ''
                        str+='<div>'+ d.lesson +'<br>('+ d.courseId +')</div>';
                        // if(auth == 'TEACHER'){
                        //     if(d.assignmentCount>0&&d.assignmentCount != null){
                        //         str+= '<a class="layui-btn layui-btn-xs" lay-event="workGrade">作业成绩</a><br/>';
                        //     }
                        //     str+= '<a class="layui-btn layui-btn-xs" lay-event="reportGrade">报告成绩</a><br/>';
                        //     if(d.assignmentCount>0&&d.assignmentCount != null){
                        //         str+= '<a class="layui-btn layui-btn-xs" lay-event="work">作业批改</a><br/>';
                        //     }
                        //     str+= '<a class="layui-btn layui-btn-xs" lay-event="report">报告批改</a><br/>'+
                        //         '<a class="layui-btn layui-btn-xs" lay-event="resource">资源查看</a><br/>';
                        // }else if(auth == 'STUDENT'){
                        //     if(d.assignmentCount>0||d.assignmentCount != null){
                        //         str+= '<a class="layui-btn layui-btn-xs" lay-event="workGrade">实验作业成绩</a><br/>';
                        //     }
                        //     str+= '<a class="layui-btn layui-btn-xs" lay-event="reportGrade">实验报告成绩</a><br/>';
                        //     if(d.assignmentCount>0||d.assignmentCount != null){
                        //         str+= '<a class="layui-btn layui-btn-xs" lay-event="work">实验作业列表</a><br/>';
                        //     }
                        //     str+= '<a class="layui-btn layui-btn-xs" lay-event="report">实验报告列表</a><br/>'+
                        //         '<a class="layui-btn layui-btn-xs" lay-event="resource">实验资源查看</a><br/>';
                        // }
                    if(auth == 'TEACHER'){
                        str+= '<a class="layui-btn layui-btn-xs" lay-event="exportGrade">导出成绩</a><br/>';
                    }
                        return  str ;
                }
                }, {
                field: 'project',
                title: '项目名称',
				// templet: '#itemName'
                templet: function(d){
                    var str= ''
                    str+='<div style="float: left;width: 100px">'+ d.project +'<br/>';
                    // str+='<a class="layui-btn layui-btn-xs" lay-event="">实验项目资料</a></div>';
                    if(auth == 'TEACHER'){
                        str+='<a class="layui-btn layui-btn-xs" lay-event="">实验项目资料</a></div>';
                        str+='<div style="float: left;width: 100px">';
                        str+='<a class="layui-btn layui-btn-xs" lay-event="">布置作业</a><br/>';
                        str+='<a class="layui-btn layui-btn-xs" lay-event="work">批改作业</a><br/>';
                        str+='<a class="layui-btn layui-btn-xs" lay-event="">分数统计</a><br/>';
                        str+='</div>'
                    }else if(auth == 'STUDENT'){
                        str+='</div><div style="float: left;width: 100px">';
                        str+='<a class="layui-btn layui-btn-xs" lay-event="work">作业管理</a><br/>';
                        str+='<a class="layui-btn layui-btn-xs" lay-event="">实验项目资料</a>';
                        str+='</div>'
                    }
                    //     str+='<a class="layui-btn layui-btn-xs" lay-event="detail">内容查看</a><br/>';
                    //     str+='<a class="layui-btn layui-btn-xs" lay-event="resourceAn">资源查看</a>'
                    return str;
                }
                // event: 'detail'
                // sort: true
            }, {
                field: 'classtime',
                title: '上课时间',
                // sort: true
            }, {
                field: 'teacher',
                title: '授课教师',
                // sort: true
            }, {
                field: 'class',
                title: '学生班级/分组',
                // sort: true
            },
            // {
            //     field: 'state',
            //     title: '状态',
				// // width: 50
            //     // sort: true
            // },
                {
                field: 'operation',
                fixed: 'right',
                title: '操作',
                toolbar: '#operation',
				// minwidth: 300
                width: 350
            }
            ]
        ],
        id: 'reportlisttab',
        // data: pdata,
        skin: 'line', //表格风格
        even: false,
        limits: [5, 10, 15, 20],
        limit: 10, //每页默认显示的数量
        done: function(res, curr, count){
            layuiRowspan('lesson', 1);
            layuiRowspan(['project', 'classtime', 'teacher', 'state'], 1); //支持数组
			if(refresh){
                // var fieName='state'
                // if(auth=='TEACHER'){
                //     $.each(tablee.config.cols,function(i,cols){
                //         $.each(cols,function(i,col){
                //             if(col.field==fieName){
                //                 col.hide=true;
                //                 return false; //跳出循环
                //             }
                //         })
                //     })
                // }else
                if(auth=='ACADEMYLEVELM'||auth=='EXCENTERDIRECTOR'){
                    $.each(tablee.config.cols,function(i,cols){
                        $.each(cols,function(i,col){
                            if(col.field=='operation'){
                                col.hide=true;
                                return false; //跳出循环
                            }
                        })
                    })
                }else if(auth=='STUDENT'){
                    $.each(tablee.config.cols,function(i,cols){
                        $.each(cols,function(i,col){
                            if(col.field=='operation'){
//                                col.hide=true;
                                // return false; //跳出循环
                            }
                        })
                    })
                }
                refresh = false;
                //执行重载
                tablee.reload()
			}
        }
    });

	//控制表格合并
	// table.init('reportlisttab', {
	// 	done: function(res, curr, count) {
	// 		layuiRowspan('lesson', 1);
	// 		layuiRowspan(['project', 'classtime', 'teacher', 'state'], 1); //支持数组
	// 		//layuiRowspan("8",1,true);
	// 	}
	// });

	//搜索
	var $ = layui.$,
		active = {
			reload: function() {
				var course = $('#course').val();
				var term = $('#term').val();
				var teacher = $('#teacher').val();
				var weeks = $('#weeks').val();
				//执行重载
				table.reload('reportlisttab', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						// key: {
                        term_id: term,
                        course_no: course,
                        user_name: teacher,
                        weeks: weeks
						// }
					}
				}, 'data');
			}
		};
	var $ = layui.$,
        reset = {
			reset: function() {
				//执行重载
				table.reload('reportlisttab', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						// key: {
                        term_id: $('#termId').val(),
                        course_no: '',
                        user_name: '',
                        weeks: ''
						// }
					}
				}, 'data');
			}
		};
    $('.tabsearch .layui-btn').on('click', function() {
        var type = $(this).data('type');
        reset[type] ? reset[type].call(this) : '';
    });
	$('.tabsearch .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});

	//监听行工具事件
	table.on('tool(reportlisttab)', function(obj) { //注：tool是工具条事件名，reportlisttab 是 table 原始容器的属性 lay-filter="对应的值"
		var data = obj.data //获得当前行数据
			,
			layEvent = obj.event; //获得 lay-event 对应的值
		/*if(layEvent === 'reportdetail') {
			layer.msg('查看提交内容详情');
		};*/

		//打开成绩查看详情
		if(obj.event === 'workGrade') {
			// console.log(data);
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '实验作业成绩查看',
				area: ['390px', '260px'],
				shade: 0.3,
				maxmin: true,
				content: zuulServerUrl+'/transcript/page/gradebookListPage?module=experiment&siteId=0&type=assignment&courseNumber='+data.courseId
			});
			layer.full(index);
		};
		//打开成绩查看详情
		if(obj.event === 'reportGrade') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '实验报告成绩',
				area: ['390px', '260px'],
				shade: 0.3,
				maxmin: true,
				content: zuulServerUrl+'/transcript/page/gradebookListPage?module=experiment&siteId=0&type=report&courseNumber='+data.courseId
			});
			layer.full(index);
		};

		//打开实验报告列表
		if(obj.event === 'report') {
            $.cookie('courseNumber', data.courseId, { path: '/' });
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '实验报告列表',
				area: ['390px', '260px'],
				shade: 0.3,
				maxmin: true,
				content: zuulServerUrl+'/experiment/projectReportInCourseUa?courseNumber='+data.courseId
			});
			layer.full(index);
		};

		//打开实验资源查看
		if(obj.event === 'resource') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '实验资源查看',
				area: ['390px', '260px'],
				shade: 0.3,
				maxmin: true,
				content: zuulServerUrl+'/experiment/experimentResourceUa?courseNumber='+data.courseId
			});
			layer.full(index);
		};
		//导出成绩
		if(obj.event === 'exportGrade') {
		    layer.msg('导出成绩')
		};

		//打开实验作业列表
		if(obj.event === 'work') {
            $.cookie('courseNumber', data.courseId, { path: '/' });
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '实验作业列表',
				area: ['390px', '260px'],
				shade: 0.3,
				maxmin: true,
				content: zuulServerUrl+'/experiment/projectWorkInCourseUa?courseNumber='+data.courseId
			});
			layer.full(index);
		};

		//打开查看详情
		if(obj.event === 'detail') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '查看详情',
				area: ['390px', '260px'],
				shade: 0.3,
				maxmin: true,
				content: contextPath + '/operation/viewOperationItemLims/1/'+data.itemId
			});
			layer.full(index);
		};
		//打开资源查看
		if(obj.event === 'resourceAn') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '资源查看',
				area: ['390px', '260px'],
				shade: 0.3,
				maxmin: true,
				content: zuulServerUrl+'/experiment/projectGuidance?experimentId='+data.experimentId
			});
			layer.full(index);
		};
		//编辑
		if(obj.event === 'edit') {
            $.cookie('courseNumber', data.courseId, { path: '/' });
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑',
				area: ['390px', '260px'],
				shade: 0.3,
				maxmin: true,
				content: zuulServerUrl+'/experiment/editExperiment?experimentId='+data.experimentId
			});
			layer.full(index);
		};
        //查看远程主机信息
        if(obj.event === 'lookHost') {
            var returnMessage;
            $.ajax({
                url: hostServerUrl+'/api/remotecontrol/getHostInfo?endTime='+endTime+'&type='+type+'&username='+username,
                dataType: "json",
                type: "get",
                success: function (reData) {
                    if(reData.status==500){
                        var html='<div class="layui-fluid">\n' +
                            '<table class="layui-table info_tab">\n' +
                            '\t<tbody>\n' +
                            '\t\t<tr>\n' +
                            '\t\t\t<th>提示</th>\n' +
                            '\t\t\t<td>内部错误</td>\n' +
                            '\t\t</tr>\n' +
                            '\t</tbody>\n' +
                            '</table>\n' +
                            '</div>';
                        layer.open({
                            type: 1,
                            title: '查看远程主机信息',
                            skin: 'layui-layer-rim', //加上边框
                            area: ['420px', '190px'], //宽高
                            content: html
                        });
                    }else if(reData.status==501 ){
                        var html='<div class="layui-fluid">\n' +
                            '<table class="layui-table info_tab">\n' +
                            '\t<tbody>\n' +
                            '\t\t<tr>\n' +
                            '\t\t\t<th>提示</th>\n' +
                            '\t\t\t<td>当前用户有正在使用的远程主机</td>\n' +
                            '\t\t</tr>\n' +
                            '\t</tbody>\n' +
                            '</table>\n' +
                            '</div>';
                        layer.open({
                            type: 1,
                            title: '查看远程主机信息',
                            skin: 'layui-layer-rim', //加上边框
                            area: ['420px', '190px'], //宽高
                            content: html
                        });
                    } else if(reData.status==502 ){
                        var html='<div class="layui-fluid">\n' +
                            '<table class="layui-table info_tab">\n' +
                            '\t<tbody>\n' +
                            '\t\t<tr>\n' +
                            '\t\t\t<th>提示</th>\n' +
                            '\t\t\t<td>远程主机已用满</td>\n' +
                            '\t\t</tr>\n' +
                            '\t</tbody>\n' +
                            '</table>\n' +
                            '</div>';
                        layer.open({
                            type: 1,
                            title: '查看远程主机信息',
                            skin: 'layui-layer-rim', //加上边框
                            area: ['420px', '190px'], //宽高
                            content: html
                        });
                    }else if(reData.status==200){
                        var ipHost = reData.data[0].ip;
                        var username = reData.data[0].username;
                        var password = reData.data[0].password;
                        //页面层
                        // layer.open({
                        //     type: 2,
                        //     title: '查看远程主机信息',
                        //     shadeClose: true,
                        //     shade: 0.8,
                        //     area: ['380px', '35%'],
                        //     content:contextPath+'/operation/viewHostInfo?ipHost='+ipHost+'&username='+username+'&password='+password+'&isTips=1'
                        // });
                        var html='<div class="layui-fluid">\n' +
                            '<table class="layui-table info_tab">\n' +
                            '\t<tbody>\n' +
                            '\t\t<tr>\n' +
                            '\t\t\t<th>IP地址</th>\n' +
                            '\t\t\t<td>'+ipHost+'</td>\n' +
                            '\t\t</tr>\n' +
                            '\t\t<tr>\n' +
                            '\t\t\t<th>用户名</th>\n' +
                            '\t\t\t<td>'+username+'</td>\n' +
                            '\t\t</tr>\n' +
                            '\t\t<tr>\n' +
                            '\t\t\t<th>密码</th>\n' +
                            '\t\t\t<td>'+password+'</td>\n' +
                            '\t\t</tr>\n' +
                            '\t\t<tr>\n' +
                            '\t\t\t<th>提示</th>\n' +
                            '\t\t\t<td><span style="color:red;font-size: 16px;font-weight:bold;">账号信息将在3小时后失效，请注意保存文件到本地</span></td>\n' +
                            '\t\t</tr>\n' +
                            '\t\t<tr>\n' +
                            '\t\t\t<th>步骤指导</th>\n' +
                            '\t\t\t<td><span style="font-size: 16px;font-weight:bold;">1、获取远程访问信息</br>2、打开远程win+R，搜索mstsc</br>3、输入远程访问信息进行访问</br></span></td>\n' +
                            '\t\t</tr>\n' +
                            '\t</tbody>\n' +
                            '</table>\n' +
                            '</div>';
                        layer.open({
                            type: 1,
                            title: '查看远程主机信息',
                            skin: 'layui-layer-rim', //加上边框
                            area: ['420px', '300x'], //宽高
                            content: html
                        });
                    }else {
                        var html='<div class="layui-fluid">\n' +
                            '<table class="layui-table info_tab">\n' +
                            '\t<tbody>\n' +
                            '\t\t<tr>\n' +
                            '\t\t\t<th>提示</th>\n' +
                            '\t\t\t<td>未知错误</td>\n' +
                            '\t\t</tr>\n' +
                            '\t</tbody>\n' +
                            '</table>\n' +
                            '</div>';
                        layer.open({
                            type: 1,
                            title: '查看远程主机信息',
                            skin: 'layui-layer-rim', //加上边框
                            area: ['420px', '190px'], //宽高
                            content: html
                        });

                    }
                }
            });
        };
		//打开项目实验报告
		if(obj.event === 'itemReport') {
            $.cookie('courseNumber', data.courseId, { path: '/' });
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '查看实验报告管理',
				area: ['390px', '260px'],
				shade: 0.3,
				maxmin: true,
				content: zuulServerUrl+'/experiment/projectReport?experimentId='+data.experimentId
			});
			layer.full(index);
		};
		//打开项目实验作业
		if(obj.event === 'itemWork') {
            $.cookie('courseNumber', data.courseId, { path: '/' });
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: data.project,
				area: ['390px', '260px'],
				shade: 0.3,
				maxmin: true,
				content: zuulServerUrl+'/experiment/projectWork?experimentId='+data.experimentId
			});
			layer.full(index);
		};
		//发布
        if(obj.event === 'release') {
            // $.cookie('username', data.courseId, { path: '/' });
            // var index = layer.open({
            // 	type: 2 //此处以iframe举例
            // 		,
            // 	title: '查看实验作业管理',
            // 	area: ['390px', '260px'],
            // 	shade: 0.3,
            // 	maxmin: true,
            // 	content: zuulServerUrl+'/experiment/editExperimentStatus?courseNumber='+data.courseId+'&labItemId='+data.itemId+'&status=1'
            // });
            // layer.full(index);
            $.ajax({
                async: false,
                type: "POST",
                // contentType:"application/json;charset=utf-8",
                // dataType:"json",
                url: zuulServerUrl+'/experiment/editExperimentStatus',
                data:{courseNumber: data.courseId,labItemId: data.itemId,status: 1},
                success:function(data){
                    if(data){
                        layer.msg('发布成功!')
                        var course = $('#course').val();
                        var term = $('#term').val();
                        var teacher = $('#teacher').val();
                        var weeks = $('#weeks').val();
                        //执行重载
                        table.reload('reportlisttab', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            },
                            where: {
                                // key: {
                                term_id: term,
                                course_no: course,
                                user_name: teacher,
                                weeks: weeks
                                // }
                            }
                        }, 'data');
                    }else{
                        layer.msg('发布失败!')
                    }
                }
            });
        };
	});
});