layui.use(['laypage', 'layer', 'table', 'element', 'form'], function() {
	var layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form

	//向世界问个好
	layer.msg('进入知识资源');
	form.render(null, 'examlistbox');

	findAllTCourseSite('#site', 1084, form);

	form.val('examlistbox', {
		"site": "1084"
	})

	var knowledge = new Vue({
		el: '#knowledge',
		data() {
			return {
				knowledgeList: [],
			}
		},
		created() {
			this.getKnowledgeData();
		},
		methods: {
			getKnowledgeData:function () {
				let that =this
				let knowledgeData=[]
				$.ajax({
					type: "get",
					url : "../modules/teachResource/knowledgeData.json",
					dataType :"json",
					success:function(data){
						knowledgeData=data.data
						that.knowledgeList=knowledgeData
					},
					error:function () {

					}
				})
			},
			addvideo:function () {
				layer.msg('添加视频');
				var that = this;
				//多窗口模式，层叠置顶
				var index = layer.open({
					type: 2 //此处以iframe举例
					,
					title: '添加视频',
					area: ['390px', '260px'],
					shade: 0,
					maxmin: true,
					content: 'addVideo',
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						layer.setTop(layero); //重点2
					},
					btn: ['确定', '取消'],
					yes: function(index, layero) {
						//点击确认触发 iframe 内容中的按钮提交
						var submit = layero.find('iframe').contents().find("#addvideobtn");
						submit.click();
					}
				});
				layer.full(index);
			},
			addpicture: function() {
				layer.msg('添加图片');
				var that = this;
				//多窗口模式，层叠置顶
				var index = layer.open({
					type: 2 //此处以iframe举例
					,
					title: '添加图片',
					area: ['390px', '260px'],
					shade: 0,
					maxmin: true,
					content: 'addpicture',
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						layer.setTop(layero); //重点2
					},
					btn: ['确定', '取消'],
					yes: function(index, layero) {
						//点击确认触发 iframe 内容中的按钮提交
						var submit = layero.find('iframe').contents().find("#addpicturebtn");
						submit.click();
					}
				});
				layer.full(index);
			},

			addfile: function() {
				layer.msg('添加文件');
				var that = this;
				//多窗口模式，层叠置顶
				var index = layer.open({
					type: 2 //此处以iframe举例
					,
					title: '添加文件',
					area: ['390px', '260px'],
					shade: 0,
					maxmin: true,
					content: 'addfile',
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						layer.setTop(layero); //重点2
					},
					btn: ['确定', '取消'],
					yes: function(index, layero) {
						//点击确认触发 iframe 内容中的按钮提交
						var submit = layero.find('iframe').contents().find("#addfilebtn");
						submit.click();
					}
				});
				layer.full(index);
			},
			addlink: function() {
				layer.msg('添加链接');
				var that = this;
				//多窗口模式，层叠置顶
				var index = layer.open({
					type: 2 //此处以iframe举例
					,
					title: '添加链接',
					area: ['390px', '260px'],
					shade: 0,
					maxmin: true,
					content: 'addlink',
					zIndex: layer.zIndex //重点1
					,
					success: function(layero) {
						layer.setTop(layero); //重点2
					},
					btn: ['确定', '取消'],
					yes: function(index, layero) {
						//点击确认触发 iframe 内容中的按钮提交
						var submit = layero.find('iframe').contents().find("#addlinkbtn");
						submit.click();
					}
				});
				layer.full(index);
			}



		},
		updated() {
			form.render()
		}
	})


	/**
	 * 获取所有课程信息
	 */
	function findAllTCourseSite(selector, siteId, form) {
		$.ajax({
			url: httpBaseUrl + '/api/findAllTCourseSite',
			type: 'GET',
			async: false,
			data: {"siteId": siteId},
			dataType: 'json',
			success: function (res) {
				let data = res;
				if (data) {
					for (let i in data) {
						let option = `<option value="${data[i].id}">${data[i].title}</option>`;
						$(selector).append(option);
						form.render('select');
					}
				}
			}
		})
	}




});