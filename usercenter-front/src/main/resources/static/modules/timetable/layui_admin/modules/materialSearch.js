layui.config({
    base: $("meta[name='contextPath']").attr("content")+'/layui_admin/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    index: 'lib/index', //主入口模块
    // deviceBatchGlobal: 'modules/deviceBatchGlobal', //如果 mymod.js 是在根目录，也可以不用设定别名
    // formSelects: 'modules/formSelects', //如果 mymod.js 是在根目录，也可以不用设定别名
});
var contextPath = $("meta[name='contextPath']").attr("content");
var authorityName = $('#authorityName').val();

var layout = [
	//{name: 'id', field: 'id', headerClass: 'value_col', colClass: 'value_col'},
	{
		name: '物资名称',
		field: 'id',
		// field: 'name',
		treeNodes: true,
		headerClass: 'value_col',
		colClass: 'value_col',
		edit: 'text'
	},
	{
		name: 'CAS号',
		field: 'cas',
		headerClass: 'value_col',
		colClass: 'value_col',
		edit: 'text'
	},
	{
		name: '物资类别',
		field: 'classification',
		headerClass: 'value_col',
		colClass: 'value_col',
	},
	{
		name: '库存数量',
		field: 'amount',
		headerClass: 'value_col',
		colClass: 'value_col',
		edit: 'text'
	},
	{
		name: '计量单位',
		field: 'unit',
		headerClass: 'value_col',
		colClass: 'value_col',
		edit: 'text'
	},
	{
		name: '物资规格',
		field: 'specification',
		headerClass: 'value_col',
		colClass: 'value_col',
		edit: 'text'
	},
	{
		name: '入出库日期',
		field: 'date',
		headerClass: 'value_col',
		colClass: 'value_col',
		edit: 'text'
	},
    {
        name: '入库人',
        field: 'username',
        headerClass: 'value_col',
        colClass: 'value_col',
        edit: 'text'
    },
	{
		name: '所在仓库',
		// field: 'warehouse',
		field: 'cabinet',
		headerClass: 'value_col',
		colClass: 'value_col',
		edit: 'text'
	},
	{
		name: '操作',
		headerClass: 'value_col',
		colClass: 'value_col nowrap',
		style: 'width: 200px!Important;',
		render: function(row) {
			// console.log(row);
			if(row.flag == 0){
                return [
                    // '<a class="layui-btn layui-btn-xs detail" data-method="detail" lay-tips="查看物资详情">查看</a>',
                    // '<a class="layui-btn layui-btn-xs layui-btn-green edit" data-method="edit" lay-tips="编辑物资信息">编辑</a>',
                    // '<a class="layui-btn layui-btn-xs layui-btn-warm record" data-method="record" onclick=\'outAndInRecord("","'+row.id+'")\' lay-tips="查看出入库记录">出入库记录</a>',
                    // '<a class="layui-btn layui-btn-xs layui-btn-red" data-method="" lay-tips="物资申购">申购</a>',
                ].join('');
			}else if(row.flag == 1&&row.status==4){
			    // console.log(row)
                var id = row.id;
                var pid = row.pid;
                if(authorityName !='ROLE_TEACHER'){
                    return [
                        '<a class="layui-btn layui-btn-xs layui-btn-green" onclick=\'editItem("'+row.id+'","'+row.pid+'")\' lay-tips="编辑物资信息">编辑</a>',
                        '<a class="layui-btn layui-btn-xs detail" data-method="QRcode" onclick=\'itemWarehouseOut("'+row.id+'","'+row.pid+'")\' lay-tips="物资出库">出库</a>',
                        '<a class="layui-btn layui-btn-xs layui-btn-red" onclick=\'itemApply("'+row.id+'","'+row.pid+'")\' lay-tips="物资申领">申领</a>',
                        '<a class="layui-btn layui-btn-xs layui-btn-warm" onclick=\'outAndInRecord("'+row.id+'","'+row.pid+'")\' lay-tips="查看出入库记录">出入库记录</a>',

                    ].join('');
                }else{
                    return [
                        '<a class="layui-btn layui-btn-xs layui-btn-red" onclick=\'itemApply("'+row.id+'","'+row.pid+'")\' lay-tips="物资申领">申领</a>',
                        '<a class="layui-btn layui-btn-xs layui-btn-warm" onclick=\'outAndInRecord("'+row.id+'","'+row.pid+'")\' lay-tips="查看出入库记录">出入库记录</a>',

                    ].join('');
                }

			}else if(row.flag == 1&&row.status==1){
                // console.log(row)
                var id = row.id;
                var pid = row.pid;
                if(authorityName == 'ROLE_ACADEMYLEVELM'||authorityName == 'ROLE_EXCENTERDIRECTOR'){
                    return [
                        '<a class="layui-btn layui-btn-xs detail" data-method="QRcode" onclick=\'checkItem("'+row.id+'","'+row.pid+'")\' lay-tips="记录审核">审核</a>',
                    ].join('');
                }else{
                    return '';
                }

            }else if(row.flag == 1&&row.status==2){
                // console.log(row)
                var id = row.id;
                var pid = row.pid;
                return [
                    '<a class="layui-btn layui-btn-xs detail" data-method="QRcode" onclick=\'checkItem("'+row.id+'","'+row.pid+'")\' lay-tips="确认入库">确认入库</a>',
                ].join('');
            }else if(row.flag == 1&&row.status==0){
                return '';
            }
		}
	}
];

var initTable = function(nodesData,count) {
	layui.use(['form', 'tree', 'layer', 'laypage', 'table', 'element', 'form'], function() {
		var laypage = layui.laypage,
			layer = layui.layer,
			table = layui.table,
			element = layui.element,
			form = layui.form,
			$ = layui.jquery;

		var tree1 = layui.treeGird({
			elem: '#materialtab', //传入元素选择器
			spreadable: false, //设置是否全展开，默认不展开
			checkbox: false,
			nodes: nodesData,
			layout: layout
		});


		form.render(null, '');

		//分页
		laypage.render({
			elem: 'page_line',
			count: count, //10条一页，总数据量
			layout: ['count', 'prev', 'page', 'next', 'skip'],
			jump: function(obj,first) {
				// console.log(obj)
				if(!first){
                    $.ajax({
                        // url: contextPath+"/layui_admin/json/treeGirdData.json",
                        url: contextPath+"/lims/api/material/findAssetsManageList",
                        data: {currPage: obj.curr},
                        success: function(response) {
                            // console.log(response);
                            // var data = response.treeGirdData;
							$('#materialtab').html('');
                            var tree1 = layui.treeGird({
                                elem: '#materialtab', //传入元素选择器
                                spreadable: false, //设置是否全展开，默认不展开
                                checkbox: false,
                                nodes: response.data,
                                layout: layout
                            });
                        }
                    });
				}

			}
		});

		//搜索
		var $ = layui.$,
			active = {

				reload: function() {
                    var search_box = $('#search_box').val();
                    // alert(search_box.val());
                    findAssetsManageListBySearch(search_box)

					// //执行重载
					// table.reload('reportReload', {
					// 	page: {
					// 		curr: 1 //重新从第 1 页开始
					// 	},
					// 	where: {
					// 		key: {
					// 			studentname:
					// 		}
					// 	}
					// }, 'data');
				}
			};

		$('.tabsearch .layui-btn').on('click', function() {
			var type = $(this).data('type');
			active[type] ? active[type].call(this) : '';
		});

		//查看物资详情
		var detail = {
			detail: function() {
				layer.msg('查看物资详情');
				var that = this;
				//多窗口模式，层叠置顶
				var index = layer.open({
					type: 2 //此处以iframe举例
						,
					title: '查看物资详情',
					area: ['390px', '260px'],
					shade: 0,
					maxmin: true,
					content: 'test.html',
					/*zIndex: layer.zIndex //重点1
						,
					success: function(layero) {
						layer.setTop(layero); //重点2
					},
					btn: ['确定', '取消'],
					yes: function(index, layero) {
						//点击确认触发 iframe 内容中的按钮提交
						var submit = layero.find('iframe').contents().find("#btn");
						submit.click();
					}*/
				});
				layer.full(index);
			}
		};
		$('.detail').on('click', function() {
			var othis = $(this),
				method = othis.data('method');
			detail[method] ? detail[method].call(this, othis) : '';
		});

		//编辑物资信息
		var edit = {
			edit: function() {
				layer.msg('编辑物资信息');
				var that = this;
				//多窗口模式，层叠置顶
				var index = layer.open({
					type: 2 //此处以iframe举例
						,
					title: '编辑物资信息',
					area: ['390px', '260px'],
					shade: 0,
					maxmin: true,
					content: 'test.html',
					/*zIndex: layer.zIndex //重点1
						,
					success: function(layero) {
						layer.setTop(layero); //重点2
					},
					btn: ['确定', '取消'],
					yes: function(index, layero) {
						//点击确认触发 iframe 内容中的按钮提交
						var submit = layero.find('iframe').contents().find("#btn");
						submit.click();
					}*/
				});
				layer.full(index);
			}
		};
		$('.edit').on('click', function() {
			var othis = $(this),
				method = othis.data('method');
			edit[method] ? edit[method].call(this, othis) : '';
		});
		//入库
        window.itemWarehouseIn = function () {
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '入库',
                // area: ['390px', '260px'],
                area: ['100%', '100%'],
                shade: 0,
                maxmin: true,
                content: location.origin + '/teacherInformationCenter/api/material/itemWarehouseIn?query_datasource=',
            });
            layer.full(index);
        };
        //申购
        window.itemPurchase = function () {
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '申购',
                // area: ['390px', '260px'],
                area: ['100%', '100%'],
                shade: 0,
                maxmin: true,
                content: location.origin + '/teacherInformationCenter/api/material/itemPurchase',
            });
            layer.full(index);
            // window.location.href=contextPath + '/lims/api/material/itemPurchase';
        };
        //子级-物资申领
        window.itemApply = function (id,pid) {
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '申领',
                // area: ['390px', '260px'],
                area: ['100%', '100%'],
                shade: 0,
                maxmin: true,
                content: location.origin + '/teacherInformationCenter/api/material/childItemApply?cid='+id+'&pid='+pid,
				/*zIndex: layer.zIndex //重点1
				 ,
				 success: function(layero) {
				 layer.setTop(layero); //重点2
				 },
				 btn: ['确定', '取消'],
				 yes: function(index, layero) {
				 //点击确认触发 iframe 内容中的按钮提交
				 var submit = layero.find('iframe').contents().find("#btn");
				 submit.click();
				 }*/
            });
            layer.full(index);
        };
        //子级-物资出库
        window.itemWarehouseOut = function (id,pid) {
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '出库',
                // area: ['390px', '260px'],
                area: ['100%', '100%'],
                shade: 0,
                maxmin: true,
                content: location.origin + '/teacherInformationCenter/api/material/childItemWarehouseOut?cid='+id+'&pid='+pid+'&query_datasource=',
            });
            layer.full(index);
        };


        //子级-编辑
        window.editItem = function (id,pid) {
            var str = ''
            $.ajax({
                url: contextPath+'/lims/api/material/assetsCabinetList',
                dataType: 'json',
                type: 'get',
                async: false,
                success: function (data) {
                    str = '<div style="padding: 10px" class="layui-fluid">' +
                        '<div class="layui-row layui-col-space20">' +
                        '<form class="layui-form" action="" lay-filter="editItem" id="editItem">' +
						'<div class="layui-row layui-col-space10 layui-form-item mobile_detail_item">' +
						'<div class="layui-col-lg12">' +
						'<label class="layui-form-label">库存数量</label>' +
						'<div class="layui-input-block">' +
						'<input type="hidden" name="cid" class="layui-input" value="'+ id +'">' +
						'<input type="hidden" name="pid" class="layui-input" value="'+ pid +'">' +
						'<input type="text" name="quantity" lay-verify="required" autocomplete="on" class="layui-input" value="" placeholder="请填写库存数量">' +
						'</div>' +
						'</div>';
                        // '<div class="layui-col-lg12">' +
                        // '<label class="layui-form-label">所在仓库</label>' +
                        // '<div class="layui-input-block">' +
                        // '<select id="warehouseNow" name="cabinet" lay-verify="required" lay-search>' +
                        // '<option value="">请选择</option>';
                    // $.each(data, function (index, item) {
                    //     str+='<option value="'+ item.id +'">'+ item.cabinetName +'</option>'
                    // });
                    str+=
                        // '</select>' +
                        // '</div>' +
                        // '</div>' +
						'</div>' +
						'<div class="layui-col-lg12 bottom_btnbox layui-hide">' +
                        '<button lay-filter="savewarehouse" id="savewarehouse" class="layui-btn" lay-submit>立即提交</button>' +
                    	// '<button type="reset" class="layui-btn layui-btn-primary">取消</button>' +
                        '</div>' +
						'</form>' +
						'</div>' +
						'</div>';


                }
            });
            var index = layer.open({
                type: 1 //此处以iframe举例
                ,
                title: '编辑',
                // area: ['390px', '260px'],
                area: ['500px', '200px'],
                shade: 0.3,
                shadeClose: true,
                maxmin: true,
                content: str,
                btn: ['确定', '取消'],
                yes: function(index, layero) {

                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('#editItem').contents().find("#savewarehouse");
                    submit.click();
                }
            });
            //监听提交
            form.on('submit(savewarehouse)', function(data) {
                var field = data.field; //获取提交的字段
                // console.log(field);
                var data2 = JSON.stringify(data.field);
                $.ajax({
                    url: contextPath + '/lims/api/material/editAssetsBatchQuantityAndCabinet',
                    data:data2,
                    async: false,
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    success:function (res) {
                        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                        parent.layer.close(index); //再执行关闭
                    },
                    error:function(){
                        alert("后台出了点问题，请重试！");
                        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                    }
                });

            });
            form.render();
        };
        //查看入出库记录
        window.outAndInRecord = function (id,pid) {
            // console.log(id,pid);
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '查看入出库记录',
                area: ['390px', '260px'],
                shade: 0,
                maxmin: true,
                content: location.origin + '/teacherInformationCenter/api/material/outAndInRecord?cid='+id+'&pid='+pid,
            });
            layer.full(index);
        };

        window.checkItem = function (id,pid) {
            // console.log(id,pid);
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '查看入出库记录',
                area: ['390px', '260px'],
                shade: 0,
                maxmin: true,
                content: location.origin + '/teacherInformationCenter/api/material/checkItem?cid='+id+'&pid='+pid,
                end: function () {
                    window.location.reload(true);
                }
            });
            layer.full(index);
        };
		//折叠树形表格
		$('#collapse').on('click', function() {
			layui.collapse(tree1);
		});

		//展开树形表格
		$('#expand').on('click', function() {
			layui.expand(tree1);
		});

	});

}
//获取物资类别
var data1 = [];
var data2 = [];
var chooses = [];
var warehouses = '';
var sorts = '';
var cabinetId;
var classificationId;
$.ajax({
    url: contextPath+'/lims/api/material/assetsCabinetList',
    dataType: 'json',
    type: 'get',
    async: false,
    success: function (data) {

        $.each(data, function (index, item) {
            var goodsCategory = {
                'id':item.id,
                'text':item.cabinetName
            }
            data1.push(goodsCategory);
        });
        // console.log(data1);
    }
});
$.ajax({
    url: contextPath+'/lims/api/material/assetsClassificationList',
    dataType: 'json',
    type: 'get',
    async: false,
    success: function (data) {
        $.each(data, function (index, item) {
            var goodsCategory = {
                'id':item.id,
                'text':item.cname
            }
            data2.push(goodsCategory);
        });
        // console.log(data2);
    }
});
$('#warehouse').comboboxfilter({
    url: '',
    scope: 'material',
    text: '仓库：',
    unlimitText: '全部',
    multiple: true,
    data: data1,
    onClick  : function(choose){
//            console.log(choose)
//            if(chooses.length>0){
//                for(var i=0;i<chooses.length;i++){
//                    if(chooses[i]==choose.id){
//                        console.log('重复');
//                        chooses.splice(i,1);
//                        return false;
//                    }
//                }
//                chooses.push(choose.id)
//            }else{
//                chooses.push(choose.id);
//            }
////            console.log(chooses)
//            $('.J_FilterQueryDel').on('click',function(){
//                var id = $(this).attr('data-value');
////                console.log(id)
//                for(var i=0;i<chooses.length;i++){
//                    if(chooses[i]==id){
//                        chooses.splice(i,1);
//                    }
//                }
//            });
    },
    onChange  : function(choose){
        cabinetId = choose;
        // console.log(cabinetId)
        findAssetsManageList(classificationId,cabinetId);
//         $('.J_FilterQueryDel').on('click',function(){
//             var id = $(this).attr('data-value');
// //                console.log(id)
//             var cabinetIds = cabinetId.split(",");
//             for(var i=0;i<cabinetIds.length;i++){
//                 if(cabinetIds[i]==id){
//                     cabinetIds.splice(i,1);
//                 }
//             }
//             console.log(cabinetIds)
//         });
    }
});
$('#sort').comboboxfilter({
    url: '',
    scope: 'material',
    text: '物资分类：',
    unlimitText: '全部',
    multiple: true,
    data: data2,
    onClick  : function(choose){
        // console.log(choose)
        // // chooses = chooses+','+choose.id;
        // if(chooses.length>0){
        //     for(var i=0;i<chooses.length;i++){
        //         if(chooses[i]==choose.id){
        //             console.log('重复');
        //             chooses.splice(i,1);
        //             return false;
        //         }
        //     }
        //     chooses.push(choose.id)
        // }else{
        //     chooses.push(choose.id);
        // }
        // console.log(chooses)
//            $('.J_FilterQueryDel').on('click',function(){
//                var id = $(this).attr('data-value');
////                console.log(id)
//                for(var i=0;i<chooses.length;i++){
//                    if(chooses[i]==id){
//                        chooses.splice(i,1);
//                    }
//                }
//            });
//         var items = chooses.join(',');
//         findAssetsManageList(items);
    },
    onChange  : function(choose){
//            if(warehouses!=''){
//                sorts = warehouses+','+choose;
//            }else{
//                sorts = choose;
//            }
//            console.log(sorts)
        classificationId = choose;
        // console.log(classificationId);
        findAssetsManageList(classificationId,cabinetId);
//             $('.J_FilterQueryDel').on('click',function(){
//                 var id = $(this).attr('data-value');
// //                console.log(id)
//                 var classificationIds = classificationId.split(",");
//                 for(var i=0;i<classificationIds.length;i++){
//                     if(classificationIds[i]==id){
//                         classificationIds.splice(i,1);
//                     }
//                 }
//                 console.log(classificationIds);
//             });
    }
});
function findAssetsManageList(classificationId,cabinetId) {
    var search_box = $('#search_box').val();
    $.ajax({
        // url: contextPath+"/layui_admin/json/treeGirdData.json",
        url: contextPath+"/lims/api/material/findAssetsManageList",
        data: {classificationId: classificationId,cabinetId: cabinetId,search: search_box},
        async:false,
        success: function(response) {
            // console.log(response);
            // var data = response.treeGirdData;
            $('#materialtab').html('');
            var data = response.data;
            var count = response.count;
            initTable(data,count);
        }
    });
}
function findAssetsManageListBySearch(search_box) {
    $.ajax({
        // url: contextPath+"/layui_admin/json/treeGirdData.json",
        url: contextPath+"/lims/api/material/findAssetsManageList",
        data: {search: search_box},
        async:false,
        success: function(response) {
            // console.log(response);
            // var data = response.treeGirdData;
            $('#materialtab').html('');
            var data = response.data;
            var count = response.count;
            initTable(data,count);
        }
    });
}
$.ajax({
	// url: contextPath+"/layui_admin/json/treeGirdData.json",
	url: contextPath+"/lims/api/material/findAssetsManageList",
	data: "",
	success: function(response) {
		// console.log(response);
		// var data = response.treeGirdData;
        authorityName = response.authorityName
		var data = response.data;
		var count = response.count;
		initTable(data,count);
	}
});

//收放筛选条件
$(".tagbox_toggle_btn").click(
	function() {
		$(".tag_box").slideToggle(200);
		$(".tagbox_toggle_btn span").toggleClass("layui-hide");
	}
);