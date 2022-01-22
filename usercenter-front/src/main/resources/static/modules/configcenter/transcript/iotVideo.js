var path=''//资源容器路径
var video_init = {
	LabRoomAgent:new Object(),
	initRtmpVideo: function () {
		playerSrc = 'rtmp://localhost:19513/live/430';
	},
	getLabRoomAgents:function () {
		if(schoolRoomNo == 'null'){
			isIot = false;
			return false;
		}
		$.ajax({
			url:apiGateWayHost+'/timetable/api/labroom/getAgentsByLabRoomId?labRoomId='+schoolRoomNo,
			type: 'get',
			async: false,
			success:function (res) {
				// console.log(res);
				// hardwareIp = res.data[0].hardwareIp;
				if (res.data == null){
					layer.alert('未获取到物联信息!');
					return false;
				}
				LabRoomAgent = res.data;
				// $('#showlive').attr('src','<img src="'+ iotHost +'/station/'+ LabRoomAgent[0].hardwareIp +'/usb/mjpgstreamer"/>')
				$.each(LabRoomAgent,function (index,item) {
					if(item.hardwareType == 549){
						playerSrc = item.pcUrl;
						mobileUrl = item.mobileUrl;
						pcUrlFlv = item.pcUrlFlv;
						// playerSrc = 'rtmp://'+ LabRoomAgent[index].commonServer.serverIp +':'+ LabRoomAgent[index].commonServer.serverSn +'/live/'+LabRoomAgent[index].hardwareIp.split('.')[LabRoomAgent[index].hardwareIp.split('.').length-2]+LabRoomAgent[index].hardwareIp.split('.')[LabRoomAgent[index].hardwareIp.split('.').length-1];
					}else if(item.hardwareType == 872){
						$('#showlive').attr('src',iotHost +'/station/'+ LabRoomAgent[index].hardwareIp +'/usb/mjpgstreamer');
						// path = '物联/工位仪/'+LabRoomAgent[index].hardwareIp+'/'+courseId+'/'+proId+'/'+$('.student_username').text();
					}
				})

				// path = '物联/工位仪/'+LabRoomAgent[0].hardwareIp+'/'+courseId+'/'+proId+'/'+$('.student_username').text();
			},
			error: function () {
				layui.use(['layer'], function() {
					var $ = layui.$,
						layer = layui.layer;
					layer.msg('获取工位仪IP失败')
				})
				console.log("timetable get agents error");
			}
		})
		return LabRoomAgent;
	},
	startVideo:function () {
		location.href = iotHost+'/station/'+LabRoomAgent[0].hardwareIp+'/usb/'+currentUsername+''
	},
	isImage:function (fileName) {
		let regExp = /\.(JPG|GIF|PNG|JPEG|BMP|ICO)$/i;
		if (fileName && fileName.search(regExp) !== -1) {
			return true;
		} else {
			return false;
		}
	},
	isVideo:function (fileName) {
		let regExp = /\.(MP4|MPEG|AVI|nAVI|ASF|MOV|WMV|3GP|RMVB|RM)$/i;
		if (fileName && fileName.search(regExp) !== -1) {
			return true;
		} else {
			return false;
		}
	},
	getFiles:function () {
		if(schoolRoomNo == 'null'||schoolRoomNo == ''){
			$('#usbLive').hide();
			$('#rtmpLive').hide();
			$('#takePhoto').hide();
			$('#recordVideo').hide();
			$('.photograph').hide();
			return false;
		}
		if(LabRoomAgent==null||LabRoomAgent.length == 0){
			layer.alert('未获取到物联信息!')
			return false;
		}
		$.each(LabRoomAgent,function (index,item) {
			if(item.hardwareType == 872){
				path = '物联/工位仪/'+LabRoomAgent[index].hardwareIp+'/'+courseId+'/'+proId+'/'+$('.student_username').text();
			}
		})
		if(path == ''){
			console.error('获取目录id时必须要设置path属性');
			return false;
		}
		resourceContainer.getDirectoryIdByPath({
			path: path,
			success:function (directoryId) {
				console.log(directoryId)
				resourceContainer.getDirectoryInfoByPath({
					path: path,
					// path: path,
					success:function (res) {
						console.log(res)
						imageFiles = '';
						videoFiles = '';
						$.each(res.fileIds,function (i,d) {
							resourceContainer.getFileById({
								success:function(result){
									// console.log(result);
									if(resourceContainer.isImage(result.fileName)){
										imageFiles+=result.id+',';
									}else if(resourceContainer.isVideo(result.fileName)){
										videoFiles+=result.id+',';
									}
									// $('#img_business').attr("src", result.url);
								},
								fail:function(){
									layer.msg(d+'文件获取失败！');
								},
								fileId:d,
								needToken:true
							});
						})
						imageFiles = (imageFiles.substring(imageFiles.length - 1) == ',') ? imageFiles.substring(0, imageFiles.length - 1) : imageFiles
						videoFiles = (videoFiles.substring(videoFiles.length - 1) == ',') ? videoFiles.substring(0, videoFiles.length - 1) : videoFiles
						getVideoFiles();
					},
					fail: function (reason) {
						alert("获取目录信息失败:" + reason);
					},
					needToken:true
				})
			},
			fail: function (reason) {
				alert("获取目录id失败:" + reason);
			},
			needToken:true
		})

	},

}
layui.use(['layer'], function() {
	var $ = layui.$,
		layer = layui.layer;

})

