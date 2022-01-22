/**
 * @author maxcoold PopupDiv v1.0 通用弹出层插件
 */
$.fn.PopupDiv = function(mods, options) {
	// 初始默认参数
	var PopupDivSettings = {
		modal : false,// 是否需要遮罩层
		top : null,// 弹出的绝对位置，默认居中
		left : null,// 弹出的绝对位置，默认居中
		closeTitle : false,// 是否不需要标题，默认显示
		myclass : "myWrap",// 自定义弹出层样式
		maxHeight : null,// 自定义最大高，默认适应弹出内容（ie6不支持）
		maxWidth : null,// 自定义最大宽，默认适应弹出内容（ie6不支持）
		minWidth : 500,// 自定义最小宽，默认适应弹出内容
		center : true,// 内容是否居中
		close_btn : true,// 是否启用右上的关闭按钮关闭,默认启用
		autoOpen : true,// 自动弹出窗口
		PopupDivId : "myWrap",
		ajaxUrl : null,
		close_fn_before : function() {
		},
		close_fn_later : function() {
		},
		start_fn_before : function() {
		},
		start_fn_later : function() {
		},
		open_fn_before : function() {
		},
		open_fn_later : function() {
		},
		remove_fn_before : function() {
		},
		remove_fn_later : function() {
		}
	};
	if (options == null) {
		options = mods;
	}
	var container = this;
	bool = container.data("bool");
	if (bool == null) {
		bool = true;
	}
	if (options) {
		jQuery.extend(PopupDivSettings, options);
	}
	// 接受参数
	return this.each(function() {
				switch (mods) {
					case 'open' :
						open();
						break;
					case 'close' :
						close();
						break;
					case "remove" :
						remove();
						break;
					default :
						ckStart();
				}
			})
	function open() {
		container.data("val").open_fn_before();
		container.show()
		if (container.data("val").modal) {
			addOutDiv();
		}
		$("#" + container.data("val").PopupDivId).fadeIn(function() {
			$("#" + container.data("val").PopupDivId + " .myTi_l").width($("#"
					+ container.data("val").PopupDivId + " .myTi").width()
					- $("#" + container.data("val").PopupDivId + " .myTi_r")
							.width());
			container.data("val").open_fn_later();
		});

	}
	function close() {
		container.data("val").close_fn_before();
		reOutDiv();
		$("#" + container.data("val").PopupDivId).hide();
		container.hide();
		container.data("bool", false);
		container.data("val").close_fn_later();
	}
	function remove() {
		container.data("val").remove_fn_before();
		reOutDiv();
		$("#" + container.data("val").PopupDivId).hide();
		reWrap();
		container.hide();
		container.data("val").remove_fn_later();
		container.removeData("bool").removeData("val");
	}
	function ckStart() {
		if (bool) {
			container.data("bool", false);
			container.data("val", PopupDivSettings);
			if (container.data("val").ajaxUrl !== null) {
				$.ajax({
							type : "GET",
							url : container.data("val").ajaxUrl,
							success : function(mydata) {
								container.html(mydata);
								start();
							}
						})
			} else {
				start();
			}
		} else {
			open();
		}
	}

	function start() {
		container.data("val").start_fn_before();
		addWrap();
		if (container.data("val").center) {
			container.css("margin", "0px auto");
		};

		$("#" + container.data("val").PopupDivId).css("width",
				container.width());
		$("#" + container.data("val").PopupDivId).css("maxHeight",
				container.data("val").maxHeight);
		$("#" + container.data("val").PopupDivId).css("maxWidth",
				container.data("val").maxWidth);
		$("#" + container.data("val").PopupDivId).css("minHeight",
				container.data("val").minHeight);
		$("#" + container.data("val").PopupDivId).css("minWidth",
				container.data("val").minWidth);

		if (container.data("val").minWidth > container.width()) {
			$("#" + container.data("val").PopupDivId).width(container
					.data("val").minWidth);
		}
		if (container.data("val").minHeight > (container.height() + $("#"
				+ container.data("val").PopupDivId + " .myTi").height())) {

			$("#" + container.data("val").PopupDivId).height(container
					.data("val").minHeight
					+ $("#" + container.data("val").PopupDivId + " .myTi")
							.height());

		}
		if (container.width() < $("#" + container.data("val").PopupDivId)
				.width()) {

			container.data("val").left == null ? $("#"
					+ container.data("val").PopupDivId).css(
					"left",
					document.documentElement.scrollLeft
							+ document.documentElement.clientWidth / 2
							- $("#" + container.data("val").PopupDivId).width()
							/ 2) : $("#" + container.data("val").PopupDivId)
					.css("left", container.data("val").left);
		} else {
			container.data("val").left == null ? $("#"
					+ container.data("val").PopupDivId).css(
					"left",
					document.documentElement.scrollLeft
							+ document.documentElement.clientWidth / 2
							- container.width() / 2) : $("#"
					+ container.data("val").PopupDivId).css("left",
					container.data("val").left);
		}
		if (container.height() < $("#" + container.data("val").PopupDivId)
				.height()
				- $("#" + container.data("val").PopupDivId + " .myTi").height()) {

			container.data("val").top == null ? $("#"
					+ container.data("val").PopupDivId).css(
					"top",
					document.documentElement.scrollTop
							+ document.documentElement.clientHeight
							/ 2
							- $("#" + container.data("val").PopupDivId)
									.height() / 2) : $("#"
					+ container.data("val").PopupDivId).css("top",
					container.data("val").top);
		} else {
			container.data("val").top == null ? $("#"
					+ container.data("val").PopupDivId).css(
					"top",
					document.documentElement.scrollTop
							+ document.documentElement.clientHeight / 2
							- container.height() / 2) : $("#"
					+ container.data("val").PopupDivId).css("top",
					container.data("val").top);
		}

		$("#" + container.data("val").PopupDivId).addClass(container
				.data("val").myclass);

		container.data("val").start_fn_later();
		if (container.data("val").autoOpen) {
			open();
		}
	}

	function addWrap() {
		var myWrap = document.createElement("div");
		myWrap.style.position = "absolute";
		myWrap.id = container.data("val").PopupDivId;
		myWrap.style.zIndex = 15000;

		var myTi = document.createElement("div");
		myTi.className = "myTi";
		var myTi_l = document.createElement("div");
		myTi_l.className = "myTi_l";
		var myTi_r = document.createElement("div");
		myTi_r.className = "myTi_r";

		container.wrap(myWrap);
		if (!container.data("val").closeTitle) {
			$("#" + container.data("val").PopupDivId).prepend(myTi);
			myTi.appendChild(myTi_l);
			$("#" + container.data("val").PopupDivId + " .myTi_l")
					.text(container.data("val").title);
			if (container.data("val").close_btn) {
				myTi.appendChild(myTi_r);
				$("#" + container.data("val").PopupDivId + " .myTi_r").attr(
						"class", "myTi_r close_out");
				$("#" + container.data("val").PopupDivId + " .myTi_r").click(
						function() {
							close();
						});
				$("#" + container.data("val").PopupDivId + " .myTi_r").hover(
						function() {
							$("#" + container.data("val").PopupDivId
									+ " .myTi_r").attr("class",
									"myTi_r close_on");
						}, function() {
							$("#" + container.data("val").PopupDivId
									+ " .myTi_r").attr("class",
									"myTi_r close_out");
						})
				// document.getElementById("myTi_l").onmousedown = function(e){
			}
			$("#" + container.data("val").PopupDivId + " .myTi_l").get(0).onmousedown = function(
					e) {
				e = arguments[0] || window.event;
				var x = e.layerX || e.offsetX;
				var y = e.layerY || e.offsetY;
				var thisti = document
						.getElementById(container.data("val").PopupDivId);
				document.onmousemove = function(e) {
					e = arguments[0] || window.event;
					var nowx = document.documentElement.scrollLeft
							+ (e.clientX - x);
					var nowy = document.documentElement.scrollTop
							+ (e.clientY - y);
					if (nowx < 0 && nowy < 0) {
						document.onmousemove = null;
						document.onmousedown = null;
					}
					thisti.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=4,opacity=50)";
					thisti.style.opacity = 0.5;
					thisti.style.left = nowx + "px";
					thisti.style.top = nowy + "px";
				};

				document.onmouseup = function() {
					document.onmousemove = null;
					document.onmousedown = null;
					thisti.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=4,opacity=100)";
					thisti.style.opacity = 1;
				};
			};
		}
	}
	function reWrap() {
		$("#" + container.data("val").PopupDivId).replaceWith(container);
	}
	// 添加遮罩层
	function addOutDiv() {
		var myIframe = document.createElement("iframe");
		var myDiv = document.createElement("div");
		myIframe.id = "myIframe";
		myIframe.style.position = "absolute";
		myIframe.style.zIndex = 10000;
		myIframe.style.top = "0px";
		myIframe.style.left = "0px";
		myIframe.style.height = getHeight() + "px";
		myIframe.style.width = getWidth() + "px";
		// myIframe.style.backgroundColor = "#000";
		myIframe.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=4,opacity=0)";// IE的不透明设置
		myIframe.style.opacity = 0;

		myDiv.id = "myDiv";
		myDiv.style.position = "absolute";
		myDiv.style.zIndex = 10001;
		myDiv.style.top = "0px";
		myDiv.style.left = "0px";
		myDiv.style.height = getHeight() + "px";
		myDiv.style.width = getWidth() + "px";
		document.body.appendChild(myIframe);
		document.body.appendChild(myDiv);
		myDiv.style.backgroundColor = "black";
		myDiv.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=4,opacity=50)";// IE的不透明设置
		myDiv.style.opacity = 0.5;//  
		window.onresize = re_show;
	}

	// 计算遮罩层的高
	function getHeight() {
		var winWidth
		if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
			winHeight = document.documentElement.scrollHeight;
		} else {
			winHeight = document.documentElement.clientHeight;
		}
		if (navigator.appName !== "Microsoft Internet Explorer") {
			winHeight = winHeight - 4;
		} else {
			winHeight = winHeight;
		}
		return winHeight;
	}

	// 计算遮罩层的宽
	function getWidth() {
		var winWidth;
		if (document.documentElement.scrollWidth > document.documentElement.clientWidth) {
			winWidth = document.documentElement.scrollWidth;
		} else {
			winWidth = document.documentElement.clientWidth;
		}
		if (navigator.appName !== "Microsoft Internet Explorer") {
			winWidth = winWidth - 4;
		} else {
			winWidth = winWidth;
		}
		return winWidth;
	}

	// 窗口改变时变更遮罩层的大小
	function re_show() {
		$("#myIframe").height(getHeight());
		$("#myIframe").width(getWidth());
		$("#myDiv").height(getHeight());
		$("#myDiv").width(getWidth());
	}

	// 去掉遮罩层的方法
	function reOutDiv() {
		$("#myIframe").remove();
		$("#myDiv").remove();
	}

}
