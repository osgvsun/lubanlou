layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate
	setCourseTable(1);
	function setCourseTable(currWeek) {
		$.ajax({
			url: httpBaseUrl + 'api/getSectionWeek',
			type: "GET",
			async: false,
			data: {"cid": siteId, "currWeek": currWeek},
			success: function (res) {
				let data = res;
				let tdLen = data.topInfo.length;
				$("select[name='weekList']").empty();
				$('.tab_timetable').find('tbody').empty();
				$('.tab_timetable').find('thead').find('tr').empty();
				let theadTr = `<th class="tab_timetable_tit">
								<div>
									<span>星期</span>
									<div class="tab_timetable_titline"></div>
									<span>节次</span>
								</div>
							   </th>`;
				$('.tab_timetable').find('thead').find('tr').append(theadTr);
				if (data.weekList) {
					for(let i of data.weekList) {
						let option = `<option value="${data.weekList[i - 1]}">第${data.weekList[i - 1]}周</option>`;
						$("select[name='weekList']").append(option);
					}
				}
				form.val('chooseclassbox', {
					"weekList": data.currWeek
				})
				if (data.topInfo) {
					for (let i in data.topInfo) {
						let th = `<th>
								<div class="th_subtit">${data.topInfo[i].topDate}</div>
								<div class="th_maintit">${data.topInfo[i].weekDay}</div>
							  </th>`;
						// $('.tab_timetable>thead>tr').append()
						$('.tab_timetable_tit').after(th);
					}
				}
				if (data.doubleClass) {
					for (let i in data.doubleClass) {
						let tr = `<tr class="tr${i}">
								<th>
									<div class="th_maintit">第${data.doubleClass[i].startClassInt}节</div>
									<div class="th_subtit">${data.doubleClass[i].classStartTime + '-' + data.doubleClass[i].classEndTime}</div>
								</th>
							  </tr>`;
						$('.tab_timetable').find('tbody').append(tr);
						for (let j = 0; j < tdLen; j++) {
							let td = `<td data-method="offset" data-type="auto"></td>`;
							$('.tr' + i).append(td);
						}
					}
				}
			}
		})
	}
	form.on('select(weekList)', function(data){
		setCourseTable(data.value);
	});

	//监听提交
	form.on('submit(chooseclassbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		let seletDate = $('#selectDate').val()
		if (seletDate == null || seletDate == "" || seletDate == undefined){
			layer.msg('请选择开始节次');
			return false;
		} else {
			parent.getDateTime(seletDate);
		}
		parent.layer.close(index); //再执行关闭
	});

	form.render(null, 'chooseclassbox');
	//点击确定节次
	$("tbody td").on("click", function() {
		$(this).toggleClass("timetale_td_select").siblings("td").removeClass("timetale_td_select");
		$(this).parent("tr").siblings("tr").find("td").removeClass("timetale_td_select");
		let selectTime = $(this).closest('tr').find('.th_subtit').html().split("-")[0];
		let selectDate = $(this).closest('tbody').prev().find('th .th_subtit').eq($(this).index() - 1).html();
		let str = selectDate + ' ' + selectTime + ':00';
		$('#selectDate').val(str)
	});

//排除
	$("body").click(function() {
		$("td").removeClass("timetale_td_select");
	});

	$("td").on("click", function(event) {
		event.stopPropagation();
	});
});
