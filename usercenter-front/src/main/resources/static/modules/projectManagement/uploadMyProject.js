layui.use(['form', 'element', 'layer', 'upload'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		layer = layui.layer,
		upload = layui.upload;

	//向世界问个好
	//layer.msg('');	

	//监听提交
	form.on('submit(uploadmyprojectbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('myproject'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	form.render(null, 'uploadmyprojectbox');

	//信息
	form.val('uploadmyprojectbox', {
		"": ""
	});

	//上传文件，选完文件后不自动上传,点击开始上传按钮上传

	//导入
	var pblist = $('#pblist'),
		uploadListIns = upload.render({
			elem: '#projectbook',
			url: '/upload/', //上传接口
			accept: 'file', //所有文件
			multiple: true, //多个上传
			auto: false, //是否直接选择文件后上传
			bindAction: '#uploadfilesbtn', //上传按钮
			choose: function(obj) {
				var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
				//读取本地文件
				obj.preview(function(index, file, result) {
					var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

					//单个重传
					tr.find('.demo-reload').on('click', function() {
						obj.upload(index, file);
					});

					//删除
					tr.find('.demo-delete').on('click', function() {
						delete files[index]; //删除对应的文件
						tr.remove();
						uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
					});

					pblist.append(tr);
				});
			},
			done: function(res, index, upload) {
				if(res.code == 0) { //上传成功
					var tr = pblist.find('tr#upload-' + index),
						tds = tr.children();
					tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
					tds.eq(3).html(''); //清空操作
					return delete this.files[index]; //删除文件队列已经上传成功的文件
				}
				this.error(index, upload);
			},
			error: function(index, upload) {
				var tr = pblist.find('tr#upload-' + index),
					tds = tr.children();
				tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
				tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
			}
		});
});