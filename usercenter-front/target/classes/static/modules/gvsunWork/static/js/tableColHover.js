//表格单元格锁定列

$(".tab_timetable tbody tr td:nth-child(2)").hover(
	function() {
		$(this).parent().siblings("tr").find("td:nth-child(2)").toggleClass("td_line");
		$(this).parents().siblings("thead").find("th:nth-child(2)").toggleClass("td_line");
	}
);

$(".tab_timetable tbody tr td:nth-child(3)").hover(
	function() {
		$(this).parent().siblings("tr").find("td:nth-child(3)").toggleClass("td_line");
		$(this).parents().siblings("thead").find("th:nth-child(3)").toggleClass("td_line");
	}
);

$(".tab_timetable tbody tr td:nth-child(4)").hover(
	function() {
		$(this).parent().siblings("tr").find("td:nth-child(4)").toggleClass("td_line");
		$(this).parents().siblings("thead").find("th:nth-child(4)").toggleClass("td_line");
	}
);

$(".tab_timetable tbody tr td:nth-child(5)").hover(
	function() {
		$(this).parent().siblings("tr").find("td:nth-child(5)").toggleClass("td_line");
		$(this).parents().siblings("thead").find("th:nth-child(5)").toggleClass("td_line");
	}
);

$(".tab_timetable tbody tr td:nth-child(6)").hover(
	function() {
		$(this).parent().siblings("tr").find("td:nth-child(6)").toggleClass("td_line");
		$(this).parents().siblings("thead").find("th:nth-child(6)").toggleClass("td_line");
	}
);

$(".tab_timetable tbody tr td:nth-child(7)").hover(
	function() {
		$(this).parent().siblings("tr").find("td:nth-child(7)").toggleClass("td_line");
		$(this).parents().siblings("thead").find("th:nth-child(7)").toggleClass("td_line");
	}
);

$(".tab_timetable tbody tr td:nth-child(8)").hover(
	function() {
		$(this).parent().siblings("tr").find("td:nth-child(8)").toggleClass("td_line");
		$(this).parents().siblings("thead").find("th:nth-child(8)").toggleClass("td_line");
	}
);

//表格头部锁定列

$(".tab_timetable thead th:nth-child(2)").hover(
	function() {
		$(this).toggleClass("td_line");
		$(this).parents(".tab_timetable").find("tbody tr td:nth-child(2)").toggleClass("td_line");
	}
);

$(".tab_timetable thead th:nth-child(3)").hover(
	function() {
		$(this).toggleClass("td_line");
		$(this).parents(".tab_timetable").find("tbody tr td:nth-child(3)").toggleClass("td_line");
	}
);

$(".tab_timetable thead th:nth-child(4)").hover(
	function() {
		$(this).toggleClass("td_line");
		$(this).parents(".tab_timetable").find("tbody tr td:nth-child(4)").toggleClass("td_line");
	}
);

$(".tab_timetable thead th:nth-child(5)").hover(
	function() {
		$(this).toggleClass("td_line");
		$(this).parents(".tab_timetable").find("tbody tr td:nth-child(5)").toggleClass("td_line");
	}
);

$(".tab_timetable thead th:nth-child(6)").hover(
	function() {
		$(this).toggleClass("td_line");
		$(this).parents(".tab_timetable").find("tbody tr td:nth-child(6)").toggleClass("td_line");
	}
);

$(".tab_timetable thead th:nth-child(7)").hover(
	function() {
		$(this).toggleClass("td_line");
		$(this).parents(".tab_timetable").find("tbody tr td:nth-child(7)").toggleClass("td_line");
	}
);

$(".tab_timetable thead th:nth-child(8)").hover(
	function() {
		$(this).toggleClass("td_line");
		$(this).parents(".tab_timetable").find("tbody tr td:nth-child(8)").toggleClass("td_line");
	}
);