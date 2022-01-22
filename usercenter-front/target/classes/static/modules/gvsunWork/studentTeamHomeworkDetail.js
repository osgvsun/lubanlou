layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form;

	form.render(null, 'studentteamhomeworkdetailbox');

	//数据渲染
	console.log()
	let groupId = 0;
	if (parentData.categoryId) {
		$.ajax({
			url: httpBaseUrl + 'api/getGroupIdByCategoryIdAndStudent',
			type: 'GET',
			async: false,
			data: {"categoryId": parentData.categoryId, "student": currentUsername},
			success: function (res) {
				groupId = res
			}
		})
	} else {
		groupId = parentData.groupId;
	}

	$.ajax({
		url: httpBaseUrl + 'api/studentSubmitTeamHomeworkApi',
		type: 'GET',
		async: false,
		data: {"assignmentId": parentData.id, "groupId": groupId, "student": currentUsername},
		success: function (res){
			let  level = `<div class="level_select" style="left: ${res[0].rankPercent == null ? 0 : res[0].rankPercent};" id="grading">${res[0].rank == null ? 0 :res[0].rank}</div>`;
			$('#level').append(level);
			//信息
			form.val('studentteamhomeworkdetailbox', {
				"name": res[0].title,
				"submittime": res[0].commitDate ? renderTime(res[0].commitDate) : '',
				"submitinfo": res[0].commitContent,
				"state": res[0].commitStatus == 0 ? "正常提交" : "迟交",
				"correcttime": res[0].checkDate ? renderTime(res[0].checkDate) : '',
				"comment": res[0].comment,
				"achievement": res[0].grading,
				"person": res[0].username,
			});
			let data = res;
			if (data) {
				for (let i = 1; i < data.length; i++) {
					let detailItem = `<div class="detail_item">
										<div class="layui-row">
											<div class="layui-col-lg12">
												<label class="layui-form-label">作业名称</label>
												<div class="layui-input-block">
													<input type="text" class="layui-input" autocomplete="off" disabled="disabled" readonly="readonly" value="${data[i].title}">
												</div>
											</div>
											<div class="layui-col-lg12">
												<label class="layui-form-label">提交时间</label>
												<div class="layui-input-block">
													<input type="text" class="layui-input" autocomplete="off" disabled="disabled" readonly="readonly" value="${data[i].commitDate ? data[i].commitDate : ''}">
												</div>
											</div>
											<div class="layui-col-lg12">
												<label class="layui-form-label">提交内容</label>
												<div class="layui-input-block">
													<input type="text" class="layui-input" autocomplete="off" disabled="disabled" readonly="readonly" value="${data[i].commitContent}">
												</div>
											</div>
										</div>
									  </div>`;
					$('#team_info').find('.layui-card-body').append(detailItem);
				}
			}
		}
	})
});