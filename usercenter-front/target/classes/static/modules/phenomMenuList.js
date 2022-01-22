layui.define(function (e) {
    layui.use(['table','layer'],function () {
        var $ = layui.$,
            layer = layui.layer,
            table = layui.table;
        // 人才称号表格显示
        table.render({
            elem: "#menu",
            url:userCenterHost+'/usercenter/dropDownBoxController/getTalent',
            method: 'GET',
            title:'人才称号',
            cellMinWidth: 100,
            cols: [
                [   {title:'序号', width:50, type:"numbers"},
                    {field: 'id', title: '序号', width: 100, sort: true ,hide:true},
                    {field: 'talent', title: '人才称号', width: 500, align: 'center'},
                    {field: 'sequence', title: '排序', width: 80, sort: true,edit:'text'},
                    {title: '操作', align: 'center', toolbar: '#edit'}
                ]
            ],
            parseData:function(res){
                console.log(res);
            },
            page: false,
            limit:10,
            skin: "line"
        });
        //监听行工具操作
        table.on("tool(menuList)",function (obj) {
            var menuId=obj.data.id;
            //删除人才称号
            if(obj.event === 'del'){
                $.ajax({
                    url:userCenterHost+'/usercenter/dict/deleteTalent/'+menuId,
                    type:'post',
                    success:function () {
                        layer.msg("删除成功！");
                        obj.del();
                        table.reload("menu")
                    },
                    error:function () {
                        alert("删除接口请求失败！")
                    }
                })
            }
            // 编辑人才称号
            if(obj.event==='edit'){
                $("#talent_edit").val(obj.data.talent);
                $("#sequence").val(obj.data.sequence);
                layer.open({
                    type: 1
                    , title: '编辑称号'
                    , area: ['50%', '60%']
                    , id: 'layerDemo'//防止重复弹出
                    , content: $('#edit_talent')
                    , btn: '提交修改'
                    , btnAlign: 'c' //按钮居中
                    , shade: 0 //不显示遮罩
                    , yes: function () {
                        var editTalentListObject={
                            talent:$("#talent_edit").val(),
                            sequence:$("#sequence").val()
                        };
                        var editTalentList=JSON.stringify(editTalentListObject);
                        $.ajax({
                            type:'POST',
                            url:userCenterHost+'/usercenter/dict/modifyTalent',
                            async:false,
                            data:editTalentList,
                            // dataType: 'json',
                            contentType: 'application/json; charset=UTF-8',
                            success:function () {
                                layer.msg("修改成功！");
                                table.reload("menu");
                                layer.closeAll();
                            },
                            error:function () {
                                alert("修改接口請求失敗！");
                            }
                        })
                    }
                });
            }
            //排序下降
            if(obj.event==='desc'){
                var thiss=$(this).parent().parent().parent().parent();
                var currOrder=thiss.next().children("td[data-field=sequence]").children("div").text();
                //获取下一个的人才称号信息
                var nextTalent=thiss.next().children("td[data-field=talent]").children("div").text();
                var nextTalentId=thiss.next().children("td[data-field=id]").children("div").text();
                thiss.insertAfter(thiss.next());//下移
                var descTalent=JSON.stringify({
                    talent:obj.data.talent,
                    sequence:currOrder,
                    id:obj.data.id
                });
                var nextDescTalent=JSON.stringify({
                    talent:nextTalent,
                    sequence:obj.data.sequence,
                    id:nextTalentId
                });
                $.ajax({
                    type:'POST',
                    url:userCenterHost+'/usercenter/dict/modifyTalent',
                    data:descTalent,
                    async:'false',
                    // dataType: 'json',
                    contentType: 'application/json; charset=UTF-8',
                    success:function () {
                        layer.msg("修改排序成功！");
                        table.reload("menu")
                    },
                    error:function () {
                        alert("添加接口請求失敗！");
                    }
                })
                $.ajax({
                    type:'POST',
                    url:userCenterHost+'/usercenter/dict/modifyTalent',
                    data:nextDescTalent,
                    async:'false',
                    // dataType: 'json',
                    contentType: 'application/json; charset=UTF-8',
                    success:function () {
                        layer.msg("修改排序成功！");
                        table.reload("menu")
                    },
                    error:function () {
                        alert("添加接口請求失敗！");
                    }
                })
            }
            // 排序上升
            if(obj.event==='asc'){
                var thiss=$(this).parent().parent().parent().parent();
                var currOrder=thiss.prev().children("td[data-field=sequence]").children("div").text();
                //获取上一个的部门信息
                var prevTalent=thiss.prev().children("td[data-field=talent]").children("div").text();
                var prevTalentId=thiss.prev().children("td[data-field=id]").children("div").text();
                thiss.insertBefore(thiss.prev());//下移
                var ascTalent=JSON.stringify({
                    talent:obj.data.talent,
                    sequence:currOrder,
                    id:obj.data.id
                });
                var prevAscTalent=JSON.stringify({
                    talent:prevTalent,
                    sequence:obj.data.sequence,
                    id:prevTalentId
                });
                $.ajax({
                    type:'POST',
                    url:userCenterHost+'/usercenter/dict/modifyTalent',
                    data:ascTalent,
                    // dataType: 'json',
                    async:'false',
                    contentType: 'application/json; charset=UTF-8',
                    success:function () {
                        layer.msg("修改排序成功！");
                        table.reload("menu")
                    },
                    error:function () {
                        alert("添加接口請求失敗！");
                    }
                })
                $.ajax({
                    type:'POST',
                    url:userCenterHost+'/usercenter/dict/modifyTalent',
                    data:prevAscTalent,
                    // dataType: 'json',
                    async:'false',
                    contentType: 'application/json; charset=UTF-8',
                    success:function () {
                        layer.msg("修改排序成功！");
                        table.reload("menu")
                    },
                    error:function () {
                        alert("添加接口請求失敗！");
                    }
                })
            }

        }),


        //监听单元格编辑
        table.on('edit(menuList)', function(obj){
          /*  var value = obj.value //得到修改后的值
                ,field = obj.field; //得到字段*/
            var field=obj.data;//得到修改后的数据集合
            var editTalent=JSON.stringify(field);
            $.ajax({
                type:'POST',
                url:userCenterHost+'/usercenter/dict/modifyTalent',
                async:'false',
                data:editTalent,
                // dataType: 'json',
                contentType: 'application/json; charset=UTF-8',
                success:function () {
                    table.reload("menu");
                    layer.msg("修改排序成功！");
                },
                error:function () {
                    alert("修改接口請求失敗！");
                }
            })


        });
        active={
            addMenu:function () {
                $("#addMenu").slideDown();
            },
            // 增加人才称号
            add:function(){
                var inputTalent=JSON.stringify({'talent':$("#menuName").val()});
                $.ajax({
                    type:'POST',
                    url:userCenterHost+'/usercenter/dict/addTalent',
                    data:inputTalent,
                    // dataType: 'json',
                    contentType: 'application/json; charset=UTF-8',
                    success:function () {
                        layer.msg("添加成功！");
                        $("#addMenu").slideUp();
                        table.reload("menu")
                    },
                    error:function () {
                        alert("添加接口請求失敗！");
                    }
                })
            },
            cancel:function () {
                $("#addMenu").slideUp();
            }
        }
        $('.layui-btn').on('click', function(){
            var othis = $(this), type = othis.data('type');
            active[type] ? active[type].call(this, othis) : '';
        })
    })
    e("phenomMenuList",{})
})