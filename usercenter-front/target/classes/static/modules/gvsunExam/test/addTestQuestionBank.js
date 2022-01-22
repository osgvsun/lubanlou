layui.use(['laypage', 'layer', 'table', 'element', 'form'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form

	form.render(null, 'addtestquestionbankbox');

    //题库类别
    $.ajax({
        url: httpBaseUrl + '/api/findAllExamQuestpoolCategory',
        type: 'GET',
        success: function (res) {
            console.log(res)
            let data = res;
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    let option = `<option value="${data[i].id}">${data[i].title}</option>`;
                    $('#selectqpCategory').append(option);
                    form.render('select');
                }
            }
        }
    })

	//监听提交
	form.on('submit(addtestquestionbankbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('addtestquestionbankbox');
		parent.layer.close(index); //再执行关闭 
	});

    form.on('select(selectCategory)',function () {
        var qpCategory = $("#selectqpCategory").val();
        var isOpen = $("#selectQuestionPoolIsOpen").val();
        $.ajax({
            url: httpBaseUrl + '/views/test/updateQuestionPool?selectType=' + isOpen + '&categoryId=' + qpCategory + '&sitedId=' + siteId,
            type: "GET",
            dataType: "json",
            success: function (data) {
                var str = "<option value=" + "" + ">" + "请选择" + "</option>";
                for (var i = 0; i < data.length; i++) {
                    str += "<option value=" + data[i].questionpoolId + ">" + data[i].title + "</option>";
                }
                ;
                $("#tCourseSiteOpt").empty();
                $("#tCourseSiteOpt").html(str);
                form.render();

            }
        });
    });

    form.on('select(selectqpOpen)',function () {
        var qpCategory = $("#selectqpCategory").val();
        var isOpen = $("#selectQuestionPoolIsOpen").val();
        $.ajax({
            url: httpBaseUrl + '/views/test/updateQuestionPool?selectType=' + isOpen + '&categoryId=' + qpCategory + '&sitedId=' + siteId,
            type: "GET",
            dataType: "json",
            success: function (data) {
                var str = "<option value=" + "" + ">" + "请选择" + "</option>";
                for (var i = 0; i < data.length; i++) {
                    str += "<option value=" + data[i].questionpoolId + ">" + data[i].title + "</option>";
                }
                ;
                $("#tCourseSiteOpt").empty();
                $("#tCourseSiteOpt").html(str);
                form.render();

            }
        });
    });

    //下拉框判断
    form.on('select(addly)', function(data) {
        var textbox = data.value;
        var boox=document.getElementById("addly_loop");
        var div=document.getElementById("addly_loop").innerHTML;
        var qpCategory = $("#selectqpCategory").val();
        var isOpen = $("#selectQuestionPoolIsOpen").val();
        $("#addly_loop").empty();
        boox.innerHTML=div;
        $(".btn-add-box").click(function(){
            $(this).hide()
            $(this).siblings(".btn-cancel-box").show()
        })
        $(".btn-cancel-box").click(function(){
            $(this).hide();
            $(this).siblings(".btn-add-box").show()
        })
        //获取section
        var currsection=$("#currsection").val();

        getQuestionByPool(textbox, 1, 10)

        var contextPath = /*[[@{/}]]*/'';
        // location.href=contextPath+"addTestQuestionBank?questionPoolId="+textbox+"&currsection="+currsection + '&limit=' + 10 +'&page=' + 1 + '&categoryId=' + qpCategory + '&selectType=' + isOpen;
    });

    function getQuestionByPool(questionPoolId, page, pageSize) {
        $.ajax({
            url: httpBaseUrl + '/views/test/getQuestionsByPoolId',
            type: 'GET',
            data: {"questionPoolId": questionPoolId, "page": page, "pageSize": pageSize},
            success: function (res) {
                console.log(res)
                let data = res.data;
                if (res.code !== 0) {
                    layer.msg(res.msg)
                } else if (data) {
                    $('.line_bag').remove(); //防止页面污染
                    for (let i = 0; i < data.length; i++) {
                        let questions = `<div class="line_bag">
                                            <div class="line_bag_content">
                                                <div class="lbc_tit">
                                                    <span>${i + 1}、</span>
                                                    <span>${data[i].title}</span>
                                                </div>
                                                <div class="lbc_content_items lbc_content${i}">
                                                   
                                                </div>
                                            </div>
                                            <div class="line_bag_bottom">
                                                <div class="lab_left">
                                                    <div class="lbb_left_tit">
                                                        <span>${data[i].type === 1 ? "多选题" : data[i].type === 2 ? "判断题" : data[i].type === 4 ? "单选题" :data[i].type === 5 ? "简答题" : data[i].type === 8 ? "简答题" : ""}</span>
                                                    </div>
                                                    <span class="code">${data[i].itemAnswer}</span>
                                                </div>
                                                <div class="lbb_right">
                                                    <input type="checkbox" name="open" checked value="${data[i].id}" lay-skin="switch" lay-filter="switchTest" lay-text="未添加|已添加" id="cheh${data[i].id}">
                                                </div>
                                            </div>
                                         </div>`;
                        $('#page').before(questions);
                        let itemOptions = data[i].itemOptions;
                        for (let j = 0; j < itemOptions.length; j++) {
                            let items = `<div>
                                            <span class="code">${itemOptions[j].optionText}</span>
                                         </div>`;
                            $('.lbc_content' + i).append(items);
                        }
                    }
                }
                setPage(page, pageSize, res.count ,questionPoolId)
            }
        })
    }

    function setPage(page, limit, count, questionPoolId) {
        synchronousSelect(); // 每次调用分页方法渲染页面选中题目
        laypage.render({
            elem: 'page',
            count: count,
            first: '首页',
            last: '尾页',
            limit: limit,
            curr: page,
            prev: '<em>←</em>',
            next: '<em>→</em>',
            theme: '#1E9FFF',
            layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
            jump: function(obj, first) {
                var questionPoolId = $("#tCourseSiteOpt").val();
                if (!first){
                    getQuestionByPool(questionPoolId, obj.curr, obj.limit);
                }

            }
        });
        form.render();
    }

    let switchSelect = [];  //存放
    let selectVal = [];
    //监听指定开关
    form.on('switch(switchTest)', function(data) {
        let checked = data.elem.checked;
        let elem = data.elem;
        let id = elem.getAttribute("id")
        let val = elem.getAttribute("value");
        //记录当前选中题目的记录
        if (checked == false){
            switchSelect.push(id);
            selectVal.push(val);
        } else {
            // switchSelect.remove(id)
            removeByValue(switchSelect, id);
            removeByValue(selectVal, val);
        }
        let archivedArr = switchSelect;
        // synchronousSelect(switchSelect);
        window.sessionStorage.setItem('switchSelect',JSON.stringify(archivedArr));
        window.sessionStorage.setItem('num', selectVal);
    });
    //删除数组指定位置的项
    function removeByValue(arr, val) {
        for(var i = 0; i < arr.length; i++) {
            if(arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    }

    //选中项回显
    function synchronousSelect(){
        let arrSelect = JSON.parse(window.sessionStorage.getItem('switchSelect'));
        console.log(arrSelect)
        $('input[type=checkbox]').each(function (index, obj){
            let _this = obj.getAttribute('id');
            if (arrSelect != null){
                for (let i = 0; i < arrSelect.length; i++){
                    if (_this == arrSelect[i]){
                        $(obj).removeAttr('checked');
                        form.render();
                        break;
                    } else if (_this != arrSelect[i]) {
                        $(obj).attr('checked', 'checked');
                        form.render();
                    }
                }
            }
        })
    }
	//自定义首页、尾页、上一页、下一页文本
	window.selectRandomQuestion = function(num){
        // sessionStorage.setItem('num', num);
        //获取section
        // var currsection=$("#currsection").val();
        //获取目前选中的下拉框的值
        var questionPoolId = $("#tCourseSiteOpt").val();
        sessionStorage.setItem('sectionIds', questionPoolId);
        var contextPath = /*[[@{/}]]*/'';
        $.ajax({
            type: 'POST',
            url: httpBaseUrl + '/views/test/selectRandomQuestionStr',
            async: false,
            data: {questionPoolId:questionPoolId, num:num},
            success: function (result) {
                if (result.resCode == 0) {
                    alert(result.resMsg);
                } else {
                    window.sessionStorage.setItem('num', result.data);
                    let data =result.data.split(',');
                    let arrData = [];
                    if (data.length != 0){
                        for (let i = 0; i < data.length; i++){
                            arrData.push('cheh' + data[i]);
                        }
                    }
                    sessionStorage.setItem('switchSelect', JSON.stringify(arrData));
                    // location.href=contextPath+"addTestQuestionBank?questionPoolId="+questionPoolId+"&currsection="+num;
                    // $('.layui-unselect').removeClass('layui-form-onswitch');
                    synchronousSelect();
                }
            }
        });
    }
});

