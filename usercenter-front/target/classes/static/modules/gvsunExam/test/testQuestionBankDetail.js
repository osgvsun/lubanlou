layui.use(['laypage', 'layer', 'table', 'element', 'form'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form

	if(sessionStorage.getItem("num")) {
		showItems(sessionStorage.getItem("num"), 1, 10);
	} else {
		showItems(itemIds, 1, 10);
	}

	//题目回显
	function showItems(sectionIds, page, limit) {
		$.ajax({
			url: httpBaseUrl + '/views/test/getQuestionVoByIds',
			type: 'GET',
			async: false,
			data: {"sectionIds": sectionIds, "page": page, "limit": limit},
			success: function (res) {
				$('.font_grey').empty();
				$('.content').empty();
				let data = res;
				$('.font_grey').append('共' +data.count + '题')
				if (data.code === 0) {
					for (let i = 0; i < data.data.length; i++) {
						let content = `<div class="line_tag">
										<div class="line_bag_content line_bag_content${i}">
											<div class="lbc_tit">
												<span>${i + 1}、</span>
												<span>${data.data[i].title}</span>
											</div>
										</div>
										<div>
										<div class="line_bag_bottom">
											<div class="lbb_left">
												<div class="lbb_left_tit">
													<span>${data.data[i].type === 1 ? "多选题" : data.data[i].type === 2 ? "判断题" : data.data[i].type === 4 ? "单选题" : data.data[i].type === 5 ? "简答题" : data.data[i].type === 8 ? "填空题" : ""}</span>
												</div>
												<span class="code">${data.data[i].itemAnswer}</span>
											</div>
											<div class="lbb_right">
												<font>已添加</font>
												<font class="font_grey">未添加</font>
											</div
										</div>
								   </div>`;
						$('.content').append(content);
						for (let j = 0; j < data.data[i].itemOptions; j++) {
							let item = `<div>
										<div>
											<span class="code">${data.data[i].itemOptions[j].optionNumber}</span>
											<span class="code">${data.data[i].itemOptions[j].optionText}</span>
										</div>
									</div>`;
							$('.line_bag_content' + i).append(item);
						}
					}
					setPage(data.count, page, limit, sectionIds)
				}
			}
		})
	}

	form.render(null, 'testquestionbankdetailbox');

	//自定义首页、尾页、上一页、下一页文本
	function setPage(total, page, limit, sectionIds) {
		laypage.render({
			elem: 'page',
			count: total,
			curr: page,
			limit: limit,
			theme: '#409eff',
			first: '首页',
			last: '尾页',
			prev: '<em>←</em>',
			next: '<em>→</em>',
			layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
			jump: function(obj, first) {
				if (!first){
					showItems(sectionIds, page, limit)
				}

			}
		});
	}

});