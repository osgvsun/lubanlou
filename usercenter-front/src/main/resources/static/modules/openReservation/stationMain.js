layui.config({
	base: httpBaseUrl + "teachPublic/layui/modules/"
}).use(['laypage', 'layer', 'table', 'element', 'jquery', 'eleTree', 'code', 'form', 'slider', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		eleTree = layui.eleTree,
		code = layui.code,
		form = layui.form,
		slider = layui.slider,
		laydate = layui.laydate

	//向世界问个好
	layer.msg('进入工位预约');

	form.render(null, 'stationmainbox');

	//监听提交
	form.on('submit(usemodularbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('modularform'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	$(".eleTree-search1").on("change", function() {
		el1.search($(this).val());
	})

	// 获取实验室校区数据
	let labSystemCampus = [];
	// 提示的文字
	let loadLabel = "Loading...";
	let emptyLabel = "暂无数据";

	$.ajax({
		url: labRoomHost + "/api/labroom/getAllSystemCampus",
		type: "GET",
		dataType: "JSON",
		contentType: "application/json;charset=UTF-8",
		success: function (res) {
			// 处理data里的字段不同的数据
			for (let i = 0; i < res.data.length; i++) {
				res.data[i]['id'] = res.data[i]['campusNumber'];
				res.data[i]['label'] = res.data[i]['campusName'];
				res.data[i]['children'] = [{id: res.data[i]['id'] + "_loading", label: loadLabel}];
				delete res.data[i]['campusNumber'];
				delete res.data[i]['campusName'];
			}
			// =
			labSystemCampus = res.data;
			// init tree
			initTreeBefore();
		}, error: function (e) {
			layer.msg('校区加载失败！', {icon: 2});
		}
	})
	var el1;
	function initTreeBefore() {
		// 初始的tree数据
		let obj = {
			elem: '.ele1',
			data: labSystemCampus,
			renderAfterExpand: true, //是否在第一次展开某个树节点后才渲染其子节点
			highlightCurrent: false, //是否高亮当前选中节点，默认值是 false
			defaultExpandAll: false, //是否默认展开所有节点
			expandOnClickNode: true, //是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点
			checkOnClickNode: false, //是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点
			//defaultExpandedKeys:[23],//默认展开的节点的 key 的数组
			autoExpandParent: true, //展开子节点的时候是否自动展开父节点
			showCheckbox: false, //节点是否可被选择
			checkStrictly: false, //在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
			//defaultCheckedKeys:false,//默认勾选的节点的 key 的数组
			accordion: false, //是否每次只打开一个同级树节点展开（手风琴效果）
			indent: false, //相邻级节点间的水平缩进，单位为像素
			lazy: false, //是否懒加载子节点，需与 load 方法结合使用
			load: false,//加载子树数据的方法，仅当 lazy 属性为true 时生效
			draggable: false, //是否开启拖拽节点功能
			// contextmenuList: ["add.async", "edit", "remove"],
			searchNodeMethod: function (value, data) {
				if (!value) return true;
				// 改为拼音查询
				return PinyinMatch.match(data.label, value)
			}
		};
		// 节点点击触发事件
		eleTree.on("nodeClick(data1)", function (d) {
			//保存点击的节点以便二级页面显示
			if (d.data.index.length === 3) {
				cookie.set("labTreeOriginIndex", d.data.index);
				cookie.set("labTreeIndex", d.data.index);
			}
			// id为loading和empty结尾的就return
			let currentNodeId = d.data.currentData.id;
			let currentNodeIdSplit = currentNodeId.split("_");
			let typeArr = ['loading', 'empty'];
			if (currentNodeIdSplit.length > 1 && typeArr.includes(currentNodeIdSplit[currentNodeIdSplit.length - 1])) return false;
			// 加载tree里的数据
			renderTreeFn(d)
		});
		// init tree
		el1 = eleTree.render(obj);
		// 自动加载 校区 楼宇 楼层
		autoChooseFirstFloor(1);
	}
	// 通用点击事件 1校区点击获取楼宇，2楼宇点击获取楼层，3楼层点击刷新右边的实验室
	function renderTreeFn(d) {
		// tree id
		let currentNodeId = d.data.currentData.id;
		// 向后台传输的id值
		let dataId = d.data.currentData.id.toString().split("_")[0];
		// 判断是第几层了，1校区2楼宇3楼层4就是刷新右边实验室了
		let level = d.data.index.length - 1;// -1是为了方便拿数组里的数据
		// 如果是>2就不渲染tree（这里的level 0是楼宇，1是楼层，2是实验室，因为上面-1了，2为实验室所以success方法里判断level为2调用渲染实验室的方法了
		if (level > 2) return false;
		//传参的key值
		let dataNumKeyArr = ['campusNumber', 'buildNumber', 'floorNo'];
		//获取当前要传的参的key值
		let dataNumKey_current = dataNumKeyArr[level]
		// 参数
		let dataParams = {[dataNumKey_current]: dataId};
		// 获取实验室传【楼宇】和【楼层】// 分室筛选传 权限、当前用户
		if (level === 2) {
			dataParams[dataNumKeyArr[level - 1]] = d.data.parentData.data.id.split("_")[0];
			// dataParams["authorityName"] = cookie.get("currauth");
			// dataParams["username"] = username;
		}
		//获取返回数据里的值的name key，为了设置节点名称
		let dataNameKeyArr = ['campusName', 'buildName', 'floorName'];
		//[0根据校区获取楼宇的接口，1根据楼宇获取楼层的接口，2根据楼层获取实验室的接口]
		let requestUrlArr = ['getSystemBuildingsByCampusNumber', 'getSystemFloorsByBuildNumber', 'getLabRoomsByFloorId']
		// 校区节点点击获取楼宇的数据
		$.ajax({
			url: labRoomHost+ "/api/labroom/" + requestUrlArr[level],
			type: 'POST',
			async: false,
			data: JSON.stringify(dataParams),
			dataType: "JSON",
			contentType: 'application/json; charset=UTF-8',
			success: function (res) {
				// 2为获取的是实验室数据
				if (level === 2) {
					// 实验室数据添加与处理
					// renderRightLab(d, res);
					$('.grid').empty();
					let result = res.data;
					for (let i = 0; i < result.length; i++) {
						$('.grid').append(_domConcat(result[i]));
					}
					return false;
				}
				/** 下面是设置左侧目录树的代码 **/
				// 如果没有数据
				if (res.data.length === 0) {
					// 如果是'暂无数据'的显示就不用替换了
					if (d.data.currentData.children[0]['label'] != emptyLabel) {
						el1.updateKeyChildren(currentNodeId, [{id: currentNodeId + "_empty", label: emptyLabel}]);
					}
				} else {
					// 如果来的数据和现在的数据长度一样就不更新
					let currentNodeChildren = d.data.currentData.children;
					if (currentNodeChildren.length !== res.data.length || currentNodeChildren[0]['label'] == loadLabel) {
						// 添加数据
						let arr = [];
						for (let i = 0; i < res.data.length; i++) {
							let resData = {
								id: res.data[i][dataNumKeyArr[level + 1]] + "_" + dataNumKeyArr[level + 1],
								label: res.data[i][dataNameKeyArr[level + 1]],
								children: [{id: currentNodeId + "_loading", label: loadLabel}]
							};
							// 如果为楼层就不用'正在加载'的提示了，就在右边刷新实验室数据
							if (level >= 1) {
								delete resData['children'];
							}
							arr.push(resData)
						}
						el1.updateKeyChildren(currentNodeId, arr);
						// el1.expandAll();
						// 自动展开
						autoChooseFirstFloor(level + 2)
						form.render();
					}
				}
				/** 目录树的代码over **/
			}
		});
	}

	//预约时间段
	laydate.render({
		elem: '#searchdate',
		type: 'datetime',
		range: true
	});

	/** tree init **/
	function _domConcat(labObj) {
		let labUrl = location.origin + "/teacherInformationCenter/openReservation/"
		let urlEnum = ["stationAppointmentOne", "stationAppointmentTwo"];
		let _url = function(index){
			return `${labUrl + urlEnum[index]}?configType=STA&labRoomId=${labObj['labRoomId']}`
		}
		return `<div class="grid-item">
                    <div class="card_box">
                        <div class="card_tit">
                            <input type="checkbox" name="modularbox"/>
                            <span>${labObj['labRoomName']}</span>
                        </div>
                        <div class="card_body text_card_body layui-col-space10">
                            <span>【面积】- ${labObj['labRoomArea']}㎡</span>
                            <span>【容量】- ${labObj['labRoomCapacity'] ? labObj['labRoomCapacity'] : '0'}人</span>
                            <div style="display: inline-block; white-space: nowrap; width: 100%; overflow: hidden; text-overflow: ellipsis">【管理员】- ${labObj['admins'].join('、') ? labObj['admins'].join('、') : '暂无'}</div>
                        </div>
                        <div class="card_bottom">
                        	<label class="fl fa fa-question-circle gray_dot">${labObj['labRoomReservation'] == 1 ? '开放' : '未开放'}（可用工位:)</label>
                            <div class="fr">
                                <a href="javascript:;" onclick="setLabRoomName(\'${_url(0)}\', ${labObj['labRoomReservation']})" target="i" class="layui-btn layui-btn-xs"
                                   lay-tips="预约工位" >预约1</a>
                                <a href="javascript:;" onclick="setLabRoomName(\'${_url(1)}\', ${labObj['labRoomReservation']})" target="i" class="layui-btn layui-btn-xs"
                                lay-tips="预约工位" >预约2</a>
                            </div>
                        </div>
                    </div>
                </div>`;
	}

	window.setLabRoomName = function (url, status) {
		if (status == 1) {
			location.href = url;
		} else {
			layer.msg('实验室暂未开放，请联系管理员设置开放权限');
		}
	}
});