layui.use(['laypage', 'layer', 'table', 'element', 'form'], function () {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form;

    // 切换课程
    setCourseSite('#site', siteId, layui.$)
    let datasource = getCookie('datasource.cookie');
    layer.msg('进入考试准入');
    form.render(null, 'examAccessListbox');
    var tableList = table.render({
        elem: '#examAccessList',
        url: httpBaseUrl + '/views/admissionList', //数据接口
        where: {'cid': siteId,'datasource':datasource, "authorityName": $.cookie('currauth'), "username": username},
        method: 'GET',
        title: '考试准入',
        cellMinWidth: 100,
        page: true, //开启分页
        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
            //curr: 5, //设定初始在第 5 页
            groups: 1, //只显示 1 个连续页码
            first: false, //不显示首页
            last: false //不显示尾页
        },
        parseData: function(res){
            sessionStorage.setItem('count', res.count);
            return {
                "code": 0, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.count, //解析数据长度
                "data": res.data //解析数据列表
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
                sort: true
            }, {
                field: 'number',
                title: '身份证',
                sort: true
            }, {
                field: 'phone',
                title: '手机号',
                sort: true
            },{
                field: 'email',
                title: '邮箱',
                sort: true
            }, {
                field: 'level',
                title: '测评等级',
                sort: true
            }, {
                field: 'direction',
                title: '测评方向',
                sort: true
            }, {
                fixed: 'right',
                title: '操作',
                toolbar: '#toolbar',
                width: 350
            }
            ]
        ],
        id: 'examAccessList',
        data: table,
        skin: 'line', //表格风格
        even: false,
        limits: [5, 7, 10, 20],
        limit: 5 //每页默认显示的数量
    });
    table.on('tool(examAccessList)', function (obj) {
        var data = obj.data;
        if (obj.event == 'print'){
            $.ajax({
                async: false,
                data: {'username': data.username,'datasource':datasource, "cid": siteId},
                url: httpBaseUrl + "/views/admissionData",
                type: "GET",
                success: function (res) {//AJAX查询成功a
                    $('#cname').text(res.cname);
                    $('#sex').text(res.sex);
                    $('#userSchool').text(res.school);
                    $('#userGor').text(res.organization);
                    $('#cardNumber').text(res.number);
                    $('#assessmentLevel').text(res.level);
                    $('#evaluate').text(res.direction);
                    $('#appraisalDate').text(res.date);
                    $('#appraisalAddress').text(res.address.replace(/\(.*?\)/g, ''));
                    $('#subject1').text(res.subject1);
                    $('#subject2').text(res.subject2);
                    $('#time1').text(res.time1);
                    $('#time2').text(res.time2);
                    $('#room').text(res.room);
                    $('#seat').text(res.seat);
                    var element = $("#admissionTicket");    // 这个dom元素是要导出pdf的div容器
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
                    // context.translate(-offsetLeft-abs,-offsetTop);
                    // 这里默认横向没有滚动条的情况，因为offset.left(),有无滚动条的时候存在差值，因此
                    // translate的时候，要把这个差值去掉
                    html2canvas($("#admissionTicket"),{
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
                            var imgHeight = 595.28/contentWidth * contentHeight;

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
                            pdf.save(data.cname+'-准考证.pdf');
                        }

                    });
                    element.hide();
                    clearCanvas()
                }
            })

        };
        function clearCanvas()
        {
            var c=document.getElementsByTagName('canvas')[0];
            console.log('当前getContext报错不影响');
            var cxt=c.getContext("2d");
            cxt.clearRect(0,0,c.width,c.height);
        }
        function clearCanvas()
        {
            var my = document.getElementsByTagName('canvas')[0];
            if (my != null)
                my.parentNode.removeChild(my);
        }
        if (obj.event == 'picture') {
            $.ajax({
                async: false,
                data: {'username': data.username, 'datasource':datasource, "cid": siteId},
                url: httpBaseUrl + "/views/admissionData",
                type: "GET",
                success: function (res) {
                    $('#cname').text(res.cname);
                    $('#sex').text(res.sex);
                    $('#userSchool').text(res.school);
                    $('#userGor').text(res.organization);
                    $('#cardNumber').text(res.number);
                    $('#assessmentLevel').text(res.level);
                    $('#evaluate').text(res.direction);
                    $('#appraisalDate').text(res.date);
                    $('#appraisalAddress').text(res.address.replace(/\(.*?\)/g, ''));
                    $('#subject1').text(res.subject1);
                    $('#subject2').text(res.subject2);
                    $('#time1').text(res.time1);
                    $('#time2').text(res.time2);
                    $('#room').text(res.room);
                    $('#seat').text(res.seat);
                    var element = document.getElementById('admissionTicket');    // 这个dom元素是要导出pdf的div容器
                    // element.style.display = 'block';
                    $("#admissionTicket").show();
                    html2canvas(element, {
                        background: "#fff"
                    }).then(function (canvas) {
                        element.appendChild(canvas);
                        //延迟执行确保万无一失，玄学
                        setTimeout(() => {
                            var type = 'png';
                            var oCanvas = element.getElementsByTagName("canvas")[0];
                            var imgData = oCanvas.toDataURL(type);//canvas转换为图片
                            // 加工image data，替换mime type，方便以后唤起浏览器下载
                            imgData = imgData.replace(_fixType(type), 'image/octet-stream');
                            fileDownload(imgData);
                        }, 0)
                        // element.style.display = 'none';
                    });


                    function _fixType(type) {
                        type = type.toLowerCase().replace(/jpg/i, 'jpeg');
                        let r = type.match(/png|jpeg|bmp|gif/)[0];
                        return 'image/' + r;
                    };

                    //唤起浏览器下载
                    function fileDownload(downloadUrl) {
                        let aLink = document.createElement('a');
                        aLink.style.display = 'none';
                        aLink.href = downloadUrl;
                        aLink.download = data.cname + "-准考证.png";
                        // 触发点击-然后移除
                        document.body.appendChild(aLink);
                        aLink.click();
                        document.body.removeChild(aLink);
                        $('canvas').remove();
                    }
                    $("#admissionTicket").hide();
                }
            })
        }

    });

    $('#examAccessExcel').on('click', function () {
        $.ajax({
            url: httpBaseUrl + '/views/admissionList',
            data: {'cid': siteId, 'page': 1, 'datasource':datasource, "username": username, "authorityName": $.cookie('currauth'), 'limit': sessionStorage.getItem('count')},
            success: function (res) {
                console.log(res)
                // done: function(res, curr, count){
                    exportData = res.data;
                // },
                exportData.forEach((item, index, arr) => {
                    item.number = item.number + '\t';
                    item.phone = item.phone + '\t';
                })
                table.exportFile(tableList.config.id, exportData, 'xls');
            }
        })
    });
    // $('#examAccessPicture').on('click', function () {
    //
    //     var element = document.getElementById('admissionTicket');    // 这个dom元素是要导出pdf的div容器
    //     // element.style.display = 'block';
    //     $("#admissionTicket").show();
    //     var num = [];
    //     // for (var i = 0; i < 2; i++){
    //         html2canvas(element, {
    //             backgroundColor: 'white'
    //         }).then(function (canvas) {
    //             element.appendChild(canvas);
    //             //延迟执行确保万无一失，玄学
    //             setTimeout(() => {
    //                 var type = 'png';
    //                 var oCanvas = element.getElementsByTagName("canvas")[0];
    //
    //                 // 加工image data，替换mime type，方便以后唤起浏览器下载
    //                 for (var i = 0; i < 2; i++){
    //                     var imgData = canvas.toDataURL().split(';base64,')[1];//canvas转换为图片
    //                     num.push(imgData);
    //                 }
    //             // var imgUri = canvas.toDataURL().split(';base64,')[1];
    //                 console.log(num);
    //                 var zip = new JSZip();
    //
    //                 zip.file("截图.png", num, {base64: true});
    //                 zip.generateAsync({type:"blob"}).then(function(content) {
    //                         saveAs(content, "截图.zip");
    //                     });
    //                 // fileDownload(imgData);
    //             }, 0)
    //             // element.style.display = 'none';
    //         });
    //     // }
    //
    //
    //
    //     function _fixType(type) {
    //         type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    //         let r = type.match(/png|jpeg|bmp|gif/)[0];
    //         return 'image/' + r;
    //     };
    //
    //     //唤起浏览器下载
    //     function fileDownload(downloadUrl) {
    //         let aLink = document.createElement('a');
    //         aLink.style.display = 'none';
    //         aLink.href = downloadUrl;
    //         aLink.download = data.cname + "-准考证.png";
    //         // 触发点击-然后移除
    //         document.body.appendChild(aLink);
    //         aLink.click();
    //         document.body.removeChild(aLink);
    //     }
    //     $("#admissionTicket").hide();
    // });

    $('#searchCont').on('click', function () {
        var searchbox = $('#searchbox').val();
        // var searchbox = $('#searchbox');
        //执行重载
        table.reload('examAccessList', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: {
                cid: siteId,
                search: searchbox,
            }
        });
    });
    var $ = layui.$,
        active = {
            reload: function() {
                var cid = $('#site').val();
                parent.$("#teach").attr('data',teachHost+cid);
                //执行重载
                table.reload('examAccessList', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        cid: cid,
                    }
                }, 'data');
            }
        };

    $('.search_line .layui-btn').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

})