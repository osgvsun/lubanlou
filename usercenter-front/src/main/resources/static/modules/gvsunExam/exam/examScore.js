layui.use(['laypage', 'layer', 'table', 'element', 'form', 'upload'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
        upload = layui.upload;

	//向世界问个好
	//layer.msg('');

	form.render(null, 'examscorebox');

	//执行一个表单
	var examscoreList = table.render({
		elem: '#examscore',
		url: httpBaseUrl + '/views/examScoreApi', //数据接口
		method: 'POST',
		where: {'assignmentId': assignmentId, "username": username, "authorityName": $.cookie('currauth'), "siteId": siteId},
		title: '已参加考试列表',
		cellMinWidth: 100,
		page: true, //开启分页
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			//curr: 5, //设定初始在第 5 页
			groups: 1, //只显示 1 个连续页码
			first: false, //不显示首页
			last: false //不显示尾页
		},
        parseData: function (result) {
            sessionStorage.setItem('count', result.count);
            return {
                "code": 0,
                "msg": result.message,
                "count": result.count,
                "data": result.data
            };
        },
		cols: [
			[ //表头
				{
					fixed: 'left',
					title: '序号',
					type: 'numbers',
					width: 50
				}, {
					field: 'cname',
					title: '姓名',
					sort: true,
					width: 150
				}, {
					field: 'username',
					title: '学号',
					sort: true,
                    width: 150
				}, {
					field: 'className',
					title: '班级',
					sort: true,
                    width: 150
				}, {
					field: 'score',
					title: '成绩',
					sort: true,
                    width: 150
				}, {
					field: 'isPassing',
					title: '是否合格',
					sort: true,
                    width: 150
				}, {
					field: 'commitDate',
					title: '提交日期',
					sort: true,
                    width: 150
				}, {
					fixed: 'right',
					title: '操作',
                    align: 'center',
					toolbar: '#toolbar',
					minWidth: 800
				}
			]
		],
		id: 'examscore',
		data: table,
		skin: 'line', //表格风格
		even: false,
        limits: [30, 50, 70, 100],
        limit: 30 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(examscore)', function(obj) {
		var data = obj.data;
		//打开查看考试信息详情页面
		if(obj.event === 'detail') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '考试信息详情',
				area: ['100%','100%'],
				maxmin: true,
				content: 'examScoreDetail?assignmentId='+assignmentId+'&username='+data.username+'&gradingId='+data.gradingId + '&cname=' + data.cname
			});
			layer.full(index);
		};
        //打开查看考试简答题待打分页面详情
        if(obj.event === 'grade') {
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '考试信息详情',
                area: ['100%','100%'],
                maxmin: true,
                content: 'examGradeDetail?assignmentId='+assignmentId+'&username='+data.username+'&gradingId='+data.gradingId,
                btn: ['确定', '取消'],
                yes: function(index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#updatetranscript");
                    submit.click();
                },
                end: function () {
                    //执行重载
                    table.reload('examscore', {
                        page: {
                            curr: 1 //重新从第 1 页开始
                        },
                        where: {
                            key: {
                                assignmentId: assignmentId
                            }
                        }
                    }, 'data');
                }
            });
            layer.full(index);
        };
		//打开查看合格证书页面
		if(obj.event === 'certificate') {
            var Date=data.commitDate.split('-');
            var day=Date[2].split(' ')[0];
            $("#cname").val(data.cname);
            // sex=="1"?$("#sex").val("男"):$("#sex").val("女");
            $("#sex").val(data.sex);
            $("#userName").val(data.username);
            $("#className").val(data.className);
            $("#academyName").val(data.academyName);
            $("#score").val(data.score);
            $("#examName").val(data.title);
            $("#year").text(Date[0]);
            $("#month").text(Date[1]);
            $("#day").text(day);
            resourceContainer.getFileById({
                success:function(result){
                    $("#personal_img").attr("src",result.url);
                },
                fail:function(){

                },
                fileId: data.photoUrl,
                needToken: false
            });
            $("#code").text(data.code);
            $("#title").text(data.certificateTitle);
            $("#prefix").text(data.prefix);
            resourceContainer.getFileById({
                success:function(result){
                    $("#seal").attr("src",result.url);
                },
                fail:function(){

                },
                fileId: data.schoolPhotoUrl,
                needToken: false
            });
            layer.open({
                type: 1,
                title: '合格证',
                content:$("#certificate"),
                area: ['1030px', '600px']
            })
		};
        //下载合格证书
        if(obj.event === 'downloadPdf') {
            var Date=data.commitDate.split('-');
            var day=Date[2].split(' ')[0];
            $("#cname").val(data.cname);
            $("#sex").val(data.sex==1?"男":"女");
            $("#userName").val(data.username);
            $("#className").val(data.className);
            $("#academyName").val(data.academyName);
            $("#score").val(data.score);
            $("#examName").val(data.title);
            $("#year").text(Date[0]);
            $("#month").text(Date[1]);
            $("#day").text(day);
            resourceContainer.getFileById({
                success:function(result){
                    $("#personal_img").attr("src",result.url);
                },
                fail:function(){

                },
                fileId: data.photoUrl,
                needToken: false
            });
            $("#code").text(data.code);
            $("#title").text(data.certificateTitle);
            $("#prefix").text(data.prefix);
            resourceContainer.getFileById({
                success:function(result){
                    $("#seal").attr("src",result.url);
                },
                fail:function(){

                },
                fileId: data.schoolPhotoUrl,
                needToken: false
            });
            var element = $("#certificate");    // 这个dom元素是要导出pdf的div容器
            element.show();
            var w = element.width();    // 获得该容器的宽
            var h = element.height();    // 获得该容器的高
            var offsetTop = element.offset().top;    // 获得该容器到文档顶部的距离1
            var offsetLeft = element.offset().left;    // 获得该容器到文档最左的距离
            var canvas = document.createElement("canvas");
            var abs = 0;
            var win_i = $(window).width();    // 获得当前可视窗口的宽度（不包含滚动条）
            var win_o = window.innerWidth;    // 获得当前窗口的宽度（包含滚动条）
            if(win_o>win_i){
                abs = (win_o - win_i)/2;    // 获得滚动条长度的一半
            }
            canvas.width = w * 2;    // 将画布宽&&高放大两倍
            canvas.height = h * 2;

            var context = canvas.getContext("2d");
            context.scale(2, 2);
            //context.translate(-offsetLeft-abs,-offsetTop);
            // 这里默认横向没有滚动条的情况，因为offset.left(),有无滚动条的时候存在差值，因此
            // translate的时候，要把这个差值去掉
            html2canvas($("#certificate"),{
                //跨域获得图片
                useCORS : true,
                onrendered: function(canvas){
                    var contentWidth = canvas.width;
                    var contentHeight = canvas.height;
                    //一页pdf显示html页面生成的canvas高度;
                    var pageHeight = contentWidth / 592.28 * 841.89;
                    //未生成pdf的html页面高度
                    var leftHeight = contentHeight;
                    //页面偏移
                    var position = 0;
                    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                    var imgWidth = 595.28;
                    var imgHeight = 592.28/contentWidth * contentHeight;

                    var pageData = canvas.toDataURL('image/png', 1.0);

                    var pdf = new jsPDF('', 'pt', 'a4');

                    //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                    //当内容未超过pdf一页显示的范围，无需分页
                    if (leftHeight < pageHeight) {
                        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
                    } else {    // 分页
                        while(leftHeight > 0) {
                            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                            leftHeight -= pageHeight;
                            position -= 841.89;
                            //避免添加空白页
                            if(leftHeight > 0) {
                                pdf.addPage();
                            }
                        }
                    }
                    pdf.save(data.cname+'合格证.pdf');
                }

            });
            element.hide();
        };
        //获取雷达图  assignmentId=166057&gradingId=85736
        function radarMap() {
            var myChart = echarts.init(document.getElementById('radar-map'));
            myChart ? myChart.clear() : "";
            let radarNameObj = {};
            let radarNameArr = [];
            $.ajax({
                url: httpBaseUrl + '/views/radarMapData',
                type: 'GET',
                async: false,
                data: {"assignmentId": assignmentId, "gradingId": data.gradingId, "username": username},
                // data: {assignmentId: "166057", gradingId: "85736"},
                success: function (res) {
                   let result =  res.map((v, i) => {
                        return {name: v.sectionTitle}
                    });
                    let seriesData = res.map(item => {
                        return item.correctCount
                    });
                    let sumArr = seriesData.reduce((v, n, i) => {
                        return v + n;
                    });
                    radarNameObj = {value: seriesData};
                    radarNameArr.push(radarNameObj);
                    let arrObj = [];  //存最终学要的结果
                    if (sumArr < 10){
                        result.map((v, i) => {
                            arrObj.push(Object.assign({}, v, {max: 10}))
                        })
                    }
                    if (sumArr > 10 && sumArr < 50){
                        result.map((v, i) => {
                            arrObj.push(Object.assign({}, v, {max: 50}))
                        })
                    }
                    if (sumArr > 50 && sumArr < 100){
                        result.map((v, i) => {
                            arrObj.push(Object.assign({}, v, {max: 100}))
                        })
                    }
                    if (sumArr > 100){
                        result.map((v, i) => {
                            arrObj.push(Object.assign({}, v, {max: sumArr}))
                        })
                    }
                    arrObj[0]["axisLabel"] =  {show: true, textStyle: {fontSize: 18, color: '#333'}};
                    myChart.setOption({
                        title: {},
                        tooltip: {},
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {readOnly: false},
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        legend: {},
                        grid: {
                            position: 'left',
                        },
                        radar: {
                            // shape: 'circle',
                            // splitNumber: 5, // 雷达图圈数设置
                            name: {
                                textStyle: {
                                    color: '#fff',
                                    backgroundColor: '#999',
                                    borderRadius: 3,
                                    padding: [3, 5]
                                }
                            },
                            indicator: arrObj,
                            center: ['30%', '50%'],
                        },
                        series: [{
                            // name: '预算 vs 开销（Budget vs spending）',
                            type: 'radar',
                            animation: false,
                            // areaStyle: {normal: {}},
                            data: radarNameArr
                        }]
                    });
                    let url =  myChart.getConnectedDataURL(
                        {pixelRatio: 1,　　//导出的图片分辨率比率,默认是1
                            backgroundColor: '#fff',　　//图表背景色
                            excludeComponents:[　　//保存图表时忽略的工具组件,默认忽略工具栏
                                'toolbox'
                            ],
                            type: "png"}
                    );
                    $('#seturl').val(url);
                }
            });


        }
        // radarMap()
        //标准报告下载
        if (obj.event === 'standardReportD'){
            radarMap();
            let url = $('#seturl').val();
            var $iframe = $('<iframe id="down-file-iframe" />');
            var $form = $('<form target="down-file-iframe" method="post" />');
            $form.attr('action', httpBaseUrl + '/views/exportExamReportAsWord');
            $form.append('<input type="hidden" name="imageString" value="' + url + '" />');
            $form.append('<input type="hidden" name="assignmentId" value="' + assignmentId + '" />');
            $form.append('<input type="hidden" name="gradingId" value="' + data.gradingId + '" />');
            $form.append('<input type="hidden" name="username" value="' + username + '" />')
            // $form.append('<div>123123</div>');
            $iframe.append($form);
            $(document.body).append($iframe);
            $form[0].submit();
            $iframe.remove();
        }

        // 机构报告上传
        if(obj.event === 'agenciesReport'){
            // alert(12)
            // $('#imageOrFile').val("");
            let imageOrFile = document.getElementById("imageOrFile");
            if (imageOrFile.outerHTML){
                imageOrFile.outerHTML = imageOrFile.outerHTML
            } else {
                imageOrFile.value = "";
            }
            var file = document.getElementById('imageOrFile').click();
            $('#imageOrFile').bind('change', function () {
                var files = $(this)[0].files[0];
                if ($(this).val() != undefined){
                    resourceContainer.createDirectory({
                        path: '教学平台/考试系统/报告',
                        success: function (directoryId) {
                            // var files =
                            var formData = new FormData();
                            // formData.append('file',)
                            formData.append('siteName', '教学平台');
                            formData.append('username', username);
                            formData.append('fileTags', 'file');
                            formData.append('directoryId', directoryId);
                            formData.append('shareState', '私有');
                            formData.append('files', files);
                            resourceContainer.uploadFile({
                                formData: formData,
                                progress: function (dataProgress) { //获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数  

                                },
                                afterUploadSuccess: function (dataAfter) {
                                    resourceContainer.getFilesByIds({
                                        success: function (fileDto) {
                                            $.ajax({
                                                url: httpBaseUrl + '/views/saveReportsApi',
                                                type: 'GET',
                                                data: {"gradingId": data.gradingId, "fileName": fileDto[0].fileName,"fileId": fileDto[0].id, type: 401, "username": username},
                                                success: function (data) {
                                                    if (data == true){
                                                        layer.msg('上传成功');
                                                    }
                                                },
                                                error: function (res) {
                                                    console.log("出错了")
                                                }
                                            })
                                        },
                                        fail: function (res) {
                                            console.log("获取题目图片失败" + res);
                                        },
                                        fileIds: dataAfter.fileIds,
                                        needToken: false
                                    })
                                },
                                uploadFail: function (reason) {
                                    alert("上传失败:" + reason);
                                }
                            });
                        },
                        fail: function (res) {
                            console.log(res);
                        }
                    })
                }
            })

        }

        //专家报告上传
        if (obj.event === 'expertsReport'){
            // $('#imageOrFile').val("");
            let imageOrFile = document.getElementById("imageOrFile");
            if (imageOrFile.outerHTML){
                imageOrFile.outerHTML = imageOrFile.outerHTML
            } else {
                imageOrFile.value = "";
            }
            var file = document.getElementById('imageOrFile').click();
            $('#imageOrFile').bind('change', function () {
                var files = $(this)[0].files[0];
                if ($(this).val() != undefined){
                    resourceContainer.createDirectory({
                        path: '教学平台/考试系统/报告',
                        success: function (directoryId) {
                            // var files =
                            var formData = new FormData();
                            // formData.append('file',)
                            formData.append('siteName', '教学平台');
                            formData.append('username', username);
                            formData.append('fileTags', '图片');
                            formData.append('directoryId', directoryId);
                            formData.append('shareState', '私有');
                            formData.append('files', files);
                            resourceContainer.uploadFile({
                                formData: formData,
                                progress: function (dataProgress) { //获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数  
                                },
                                afterUploadSuccess: function (dataAfter) {
                                    resourceContainer.getFilesByIds({
                                        success: function (fileDto) {
                                            $.ajax({
                                                url: httpBaseUrl + '/views/saveReportsApi',
                                                type: 'GET',
                                                data: {"gradingId": data.gradingId, "fileName": fileDto[0].fileName,"fileId": fileDto[0].id, type: 402, "username": username},
                                                success: function (data) {
                                                    if (data == true){
                                                        layer.msg('上传成功');
                                                    }
                                                },
                                                error: function (res) {
                                                    console.log("出错了")
                                                }
                                            })
                                        },
                                        fail: function (res) {
                                            console.log("获取题目图片失败" + res);
                                        },
                                        fileIds: dataAfter.fileIds,
                                        needToken: false
                                    })
                                },
                                uploadFail: function (reason) {
                                    alert("上传失败:" + reason);
                                }
                            });
                        },
                        fail: function (res) {
                            console.log(res);
                        }
                    })
                }
            })
        }

        //机构报告下载
        if (obj.event === 'agenciesReportD'){
            $.ajax({
                url: httpBaseUrl + '/views/getReportIdApi',
                type: 'GET',
                data: {"gradingId": data.gradingId, type: 401},
                success: function (res) {
                    if (res){
                        resourceContainer.downLoadFile({
                            fileId: res,
                            fail: function (res) {
                                console.log('出错了');
                            }
                        })
                    } else {
                        alert('暂未上传报告');
                    }
                }
            })
        }
        //专家报告下载
        if (obj.event === 'expertsReportD'){
            $.ajax({
                url: httpBaseUrl + '/views/getReportIdApi',
                type: 'GET',
                data: {"gradingId": data.gradingId, type: 402},
                success: function (res) {
                    if (res){
                        resourceContainer.downLoadFile({
                            fileId: res,
                            fail: function (res) {
                                console.log('出错了');
                            }
                        })
                    } else {
                        alert('暂未上传报告');
                    }

                }
            })
        }
	});
	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('examscore', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						// key: {
                        search: searchbox.val()
						// }
					}
				}, 'data');
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});

	$('#exportedTranscript').on('click', function () {
	    if (sessionStorage.getItem('count') != 0) {
            $.ajax({
                url: httpBaseUrl + '/views/examScoreApi',
                data: {'assignmentId': assignmentId, 'page': 1, 'limit': sessionStorage.getItem('count'),  "username": username, "authorityName": $.cookie('currauth'), "siteId": siteId},
                type: 'POST',
                success: function (res) {
                    exportData = res.data;
                    exportData.forEach((item, index, arr) => {
                        item.commitDate = item.commitDate + '\t';
                        item.username = item.username + '\t';
                    });
                    examscoreList.config.title = title + "_" + "成绩单";
                    table.exportFile(examscoreList.config.id, exportData, 'xls');
                }
            })
        } else {
	        layer.msg('暂无考试详情');
        }

    });
});
function commitTranscript() {
    $.ajax({
        async: false,
        data: {'assignmentId': assignmentId,'type': 'exam','username':username , 'siteId':siteId},
        url: httpBaseUrl + "/views/commitGrade",
        type: "POST",
        success: function (data) {
            alert(data);
        },
        error: function (e) {
            alert('更新失败');
        }
    });
}