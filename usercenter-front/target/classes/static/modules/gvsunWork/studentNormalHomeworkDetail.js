layui.use(['form', 'element'], function() {
	var $ = layui.jquery,
		form = layui.form;

	form.render(null, 'studentnormalhomeworkdetailbox');
	$.ajax({
		url: httpBaseUrl + 'api/studentNormalHomeworkDetailApi',
		type: 'GET',
		async: false,
		data: {"assignmentId": assignmentId, "username": currentUsername},
		success: function (data){
			let  level = `<div class="level_select" style="left: ${data[0].rankPercent};" id="grading">${data[0].rank}</div>`;
			$('#level').append(level);
			//信息
			form.val('studentnormalhomeworkdetailbox', {
				"title": data[0].title,
				"commitDate": renderTime(data[0].commitDate),
				"commitStatus": data[0].commitStatus == 1 ? "迟交" : "正常提交",
				"checkDate": data[0].checkDate,
				"similarity": data[0].similarity,
				"comment": data[0].comment,
				"achievement": data[0].grading
			});
			$(".commitContent").html(data[0].commitContent)
			getAttachment(data[0].fileUrl, form, siteEnName, siteSecret);

			let result  = data;
			for (let i = 1; i < result.length; i++) {
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
													<input type="text" class="layui-input" autocomplete="off" disabled="disabled" readonly="readonly" value="${renderTime(data[i].commitDate)}">
												</div>
											</div>
											<div class="layui-col-lg12">
												<label class="layui-form-label">提交内容</label>
												<div class="layui-input-block">
												${data[i].commitContent}
<!--													<input type="text" class="layui-input" autocomplete="off" disabled="disabled" readonly="readonly" value="">-->
												</div>
											</div>
											<div class="layui-col-lg12" id="url${i}">
												<label class="layui-form-label">提交附件</label>
												${getAttachment1(result[i].fileUrl, '#url' + i)}
											</div>
										</div>
									  </div>`;
				$('.item_list').append(detailItem);
			}
		}
	})

	function getAttachment1(fileUrl, selector) {
		let fileid = [];
		if (fileUrl) {
			fileid = fileUrl.split(",");
		} else {
			fileid = [];
			let row = `<div class="layui-input-block">
										<a href="javascript:void(0)">
											<input type="button" class="layui-input readinputbtn" name="file" autocomplete="off" value="无" readonly="readonly" />
										</a>
								   </div>`;
			// $(selector).append(row);
			return row
		}
		//渲染提交附件
		resourceContainer.getFilesByIds({
			success: function (data){
				if (data) {
					for (let i = 0; i < data.length; i++) {
						let row = `<div class="layui-input-block">
										<a href="javascript:void(0)" class="file_download" title="下载附件" onclick="fileDownload(${data[i].id})">
											<input type="button" class="layui-input readinputbtn" name="file" autocomplete="off" value="${data[i].fileName}" readonly="readonly" />
										</a>
								   </div>`;
						$(selector).append(row);
						form.render();
					}
				}

			},
			fail: function (res){
				console.log("失败:" + res);
				if (fileid || fileid.length === 0) {
					let row = `<div class="layui-input-block">
										<a href="javascript:void(0)">
											<input type="button" class="layui-input readinputbtn" name="file" autocomplete="off" value="无" readonly="readonly" />
										</a>
								   </div>`;
					$(selector).append(row);
					form.render();
				}
			},
			fileIds: fileid,
			siteEnName:siteEnName,
			siteSecret:siteSecret
		})
		return ''
	}

});