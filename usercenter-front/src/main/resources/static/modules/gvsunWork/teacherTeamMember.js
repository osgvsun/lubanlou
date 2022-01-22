layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var $ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate

	//向世界问个好
	//layer.msg('');

	form.render(null, 'teacherteammemberbox');

	$.ajax({
		url: httpBaseUrl + 'api/groupMemberDisplay',
		type: 'GET',
		data: {"groupId": parentData, "assignmentId": assignmentId},
		success: function (data){
			let result = data;
			for (let i = 0; i < result.length; i++){
				let row = `<div class="layui-card">
							<div class="layui-card-header cname">${result[i].cname}</div>
							<input type="hidden" class="username" value="${result[i].username}">
							<input type="hidden" class="assignmentIds" value="${result[i].assignmentId}">
							<input class="layui-input gradingId" type="hidden" value="${result[i].groupId}">
							<div class="layui-card-body">
								<div class="layui-row layui-col-space20">
									<div class="layui-col-lg12">
										<label class="layui-form-label">评分</label>
										<div class="layui-input-block">
											<input type="number" class="layui-input finalGrading" name="score" autoComplete="off"
												   lay-verify="required" value="${result[i].finalScore}" placeholder="请输入评分"/>
										</div>
									</div>
									<div class="layui-col-lg12">
										<label class="layui-form-label">评语</label>
										<div class="layui-input-block">
											<textarea class="layui-textarea comment" name="comment" autoComplete="off"
													  lay-verify="required" placeholder="请输入评语">${result[i].comments ? result[i].comments : ''}</textarea>
										</div>
									</div>
								</div>
							</div>
						</div>`;
				$('.layui-fluid').append(row);
				form.render();
			}
			
		}
	})
	//监听提交
	form.on('submit(teacherteammemberbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		let gradingId = [];
		let finalGrading = [];
		let comment = [];
		let cname = [];
		let username = [];
		let assignmentIds = [];

		$.each($(".gradingId"), function (index, obj) {
			gradingId.push($(obj).val());
		});
		$.each($(".cname"), function (index, obj) {
			cname.push($(obj).text());
		});
		$.each($(".username"), function (index, obj) {
			username.push($(obj).val());
		});
		$.each($(".assignmentIds"), function (index, obj) {
			assignmentIds.push($(obj).val());
		});
		$.each($(".finalGrading"), function (index, obj) {
			finalGrading.push($(obj).val());
		});
		$.each($(".comment"), function (index, obj) {
			comment.push($(obj).val());
		});

		let gradingVOList = gradingId.map((v, i) => {
			return {"groupId": gradingId[i], "finalScore": finalGrading[i], "comments": comment[i], "cname": cname[i], "username": username[i], "assignmentId": assignmentIds[i]}
		})
		$.ajax({
			url: httpBaseUrl + 'api/groupMemberCommentAndScore?siteId=' + siteId + '&username=' + currUsername + '&assignmentId=' + assignmentId + '&groupId=' + parentData,
			type: "POST",
			data: JSON.stringify(gradingVOList),
			contentType: 'application/json',
			success: function (data){
				console.log(data)
				parent.layui.table.reload('correctlist'); //重载表格
				parent.layer.close(index); //再执行关闭
			}
		})
	});
});