$("tbody td").mousedown(function() {
	//每次先清除一下上次选中的单元格的背景色
	$("tbody td").css('background-color', '');

	$("tbody td").mousemove(onMousemove);
	$("tbody td").mouseup(onMouseup);
});

function onMousemove() {
	$(this).css('background-color', 'rgb(255, 199, 94)');
}

//本体悬浮移除单元格背景
/*$("body").hover(
	function() {
		$("tbody td").css('background-color', '');
	}
);*/

var cellVal = parseFloat(0, 10);
var cellIndex = 0;
var re = /(^[\-0-9][0-9]*(.[0-9]+)?)$/; //判断字符串是否为数字  
function onMouseup() {
	$("tbody").find("td").each(function() {

		if($(this).attr('style') == "background-color: rgb(255, 199, 94);") {
			var nubmer = $(this).context.innerText;
			if(!re.test(nubmer)) {
				nubmer = 0;
			}

			cellVal += parseFloat(nubmer, 10); //cellIndex
			cellIndex = $(this).context.cellIndex; //选中数据所在第几列
		}
	});
	var html = "";
	for(var i = 0; i < cellIndex; i++) {
		html += "<td></td>"
	}

	html += "<td>" + cellVal.toFixed(2) + "</td>";

	//共有多少列
	var totalTh = $("table th").size();

	for(var i = 0; i < totalTh - (cellIndex + 1); i++) {
		html += "<td></td>"
	}

	$("tfoot").html(html);
	cellVal = 0;
	cellIndex = 0;
	$("tbody td").unbind('mousemove', onMousemove);
}