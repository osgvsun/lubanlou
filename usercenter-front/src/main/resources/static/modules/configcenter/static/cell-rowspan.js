var execRowspan = function(fieldName, index, flag) {
	// 1为不冻结的情况，左侧列为冻结的情况
	let fixedNode = index == "1" ? $(".layui-table-body")[index - 1] : (index == "3" ? $(".layui-table-fixed-r") : $(".layui-table-fixed-l"));
	// 左侧导航栏不冻结的情况
	let child = $(fixedNode).find("td");
	let childFilterArr = [];
	// 获取data-field属性为fieldName的td
	for(let i = 0; i < child.length; i++) {
		if(child[i].getAttribute("data-field") == fieldName) {
			childFilterArr.push(child[i]);
		}
	}
	// 获取td的个数和种类
	let childFilterTextObj = {};
	for(let i = 0; i < childFilterArr.length; i++) {
		let childText = flag ? childFilterArr[i].innerHTML : childFilterArr[i].textContent;
		if(childFilterTextObj[childText] == undefined) {
			childFilterTextObj[childText] = 1;
		} else {
			let num = childFilterTextObj[childText];
			childFilterTextObj[childText] = num * 1 + 1;
		}
	}
	let canRowspan = true;
	let maxNum; //以前列单元格为基础获取的最大合并数
	let finalNextIndex; //获取其下第一个不合并单元格的index
	let finalNextKey; //获取其下第一个不合并单元格的值
	for(let i = 0; i < childFilterArr.length; i++) {
		(maxNum > 9000 || !maxNum) && (maxNum = $(childFilterArr[i]).prev().attr("rowspan") && fieldName != "8" ? $(childFilterArr[i]).prev().attr("rowspan") : 9999);
		let key = flag ? childFilterArr[i].innerHTML : childFilterArr[i].textContent; //获取下一个单元格的值
		let nextIndex = i + 1;
		let tdNum = childFilterTextObj[key];
		let curNum = maxNum < tdNum ? maxNum : tdNum;
		if(canRowspan) {
			for(let j = 1; j <= curNum && (i + j < childFilterArr.length);) { //循环获取最终合并数及finalNext的index和key
				finalNextKey = flag ? childFilterArr[i + j].innerHTML : childFilterArr[i + j].textContent;
				finalNextIndex = i + j;
				if((key != finalNextKey && curNum > 1) || maxNum == j) {
					canRowspan = true;
					curNum = j;
					break;
				}
				j++;
				if((i + j) == childFilterArr.length) {
					finalNextKey = undefined;
					finalNextIndex = i + j;
					break;
				}
			}
			childFilterArr[i].setAttribute("rowspan", curNum);
			if($(childFilterArr[i]).find("div.rowspan").length > 0) { //设置td内的div.rowspan高度适应合并后的高度
				$(childFilterArr[i]).find("div.rowspan").parent("div.layui-table-cell").addClass("rowspanParent");
				$(childFilterArr[i]).find("div.layui-table-cell")[0].style.height = curNum * 38 - 10 + "px";
			}
			canRowspan = false;
		} else {
			childFilterArr[i].style.display = "none";
		}
		if(--childFilterTextObj[key] == 0 | --maxNum == 0 | --curNum == 0 | (finalNextKey != undefined && nextIndex == finalNextIndex)) { //||(finalNextKey!=undefined&&key!=finalNextKey)
			canRowspan = true;
		}
	}
}
//合并数据表格行
var layuiRowspan = function(fieldNameTmp, index, flag) {
	let fieldName = [];
	if(typeof fieldNameTmp == "string") {
		fieldName.push(fieldNameTmp);
	} else {
		fieldName = fieldName.concat(fieldNameTmp);
	}
	for(let i = 0; i < fieldName.length; i++) {
		execRowspan(fieldName[i], index, flag);
	}
}