layui.use(['laypage', 'layer', 'table', 'element', 'form'], function () {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form

    //向世界问个好
    //layer.msg('');

    let pageCurr = 1; //当前页
    let pageSize = 12; //每页大小
    let total;  //总条数

    form.render(null, 'equipmentlistbox');
    getInstrumentManageList(1, 10);
    getLabRoom(form);

    function getInstrumentManageList(page, size, queryKeywords, lowPrice, highPrice, labRoomNumber, isOpen, instrumentName, instrumentNumber, agent) {
        if (page != "") {
            pageCurr = page;
        }
        if (size != "") {
            pageSize = size;
        }
        $.ajax({
            url: httpDeviceUrl + "getInstrumentManageList",
            type: "GET",
            data: {
                "page": pageCurr,
                "size": pageSize,
                "queryKeywords": queryKeywords,
                "lowPrice": lowPrice,
                "highPrice": highPrice,
                "labRoomNumber": labRoomNumber,
                "isOpen": isOpen,
                "instrumentName": instrumentName,
                "instrumentNumber": instrumentNumber,
                "agent": agent
            },
            async: false,
            success: function (res) {
                let data = res;
                if (data.code == 0) {
                    $('.layui-col-md2').remove(); //防止重复渲染
                    for (let i = 0; i < data.data.length; i++) {
                        let list = `<div class="layui-col-md2">
									<a class="img_card_box" href="equipmentBasicInfo?uid=${data.data[i].insUid}&configType=${data.data[i].configType ? data.data[i].configType : ''}" title="${data.data[i].deviceName}">
										<div class="img_card">
											<img class="img_device" data="${data.data[i].url}"/>
											<div class="img_card_title">${data.data[i].deviceName}</div>
										</div>
										<div class="img_card_bottom">
											<div class="img_title">${data.data[i].deviceName}</div>
											<div class="img_info">${data.data[i].deviceAddress == undefined ? '&nbsp;' : data.data[i].deviceAddress}</div>
										</div>
									</a>
								</div>`;
                        $('#page').before(list);
                        form.render();
                    }
                    ;
                    let imgUrl = httpBaseUrl + 'modules/instrumentManagement/static/images/noimage.jpg'
                    arrReadImg('.img_device', 'data', 18, imgUrl);
                    setPage(pageCurr, data.count, pageSize, queryKeywords, lowPrice, highPrice, labRoomNumber, isOpen, instrumentName, instrumentNumber, agent);
                } else {
                    layer.msg(data.msg)
                }
            }
        })
    }

    function setPage(page, total, limit, queryKeywords, lowPrice, highPrice, labRoomNumber, isOpen, instrumentName, instrumentNumber, agent) {
        //自定义首页、尾页、上一页、下一页文本
        laypage.render({
            elem: 'page',
            curr: page,
            count: total,
            limit: limit,
            limits: [10, 20, 50, 100, 200],
            first: '首页',
            last: '尾页',
            prev: '<em>←</em>',
            next: '<em>→</em>',
            layout: ['count', 'prev', 'page', 'next', 'skip', 'limit'],
            jump: function (obj, first) {
                console.log(obj)
                if (!first) {
                    page = obj.curr;
                    getInstrumentManageList(obj.curr, obj.limit, queryKeywords, lowPrice, highPrice, labRoomNumber, isOpen, instrumentName, instrumentNumber, agent);//obj.curr输入的要跳转的页码
                }
            }
        });
    }

    //搜索
    form.on('submit(formSearch)', function (data) {
        let field = data.field;
        if ((field.lowPrice == "" && field.highPrice != "") || (field.lowPrice != "" && field.highPrice == "")) {
            layer.msg('请输入完整的价格区间');
            return false;
        }
        ;
        getInstrumentManageList(1, 10, '', field.lowPrice, field.highPrice, field.labRoom, field.isOpen, field.instrumentName, field.instrumentNumber, field.agent)

    })
    $('.queryKeywords').on('click', function (res) {
        let queryKeywords = $('#queryKeyword').val();
        getInstrumentManageList(1, 10, queryKeywords);
    });
    $('.layui-btn-primary').on('click', function (res) {
        getInstrumentManageList(1, 10);
    })
    // resourceContainer.getFileById({
    // 	success: function (data) {
    // 		console.log(data)
    // 	}, fail: function (reason) {
    // 		console.log("读取资源失败:" + reason);
    // 	},
    // 	fileId: "200048",
    // 	username: currentUsername,
    // 	needToken: true
    // });


});
