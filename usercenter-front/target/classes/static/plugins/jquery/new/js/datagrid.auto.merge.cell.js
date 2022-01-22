/*************************************************
 * Description 自动合并单元格插件
 * 
 * @author 陈乐为
 * @date 2017-5-10
 **/
$.extend($.fn.datagrid.methods, {
    autoMergeCells : function (jq, fields) {
        return jq.each(function () {
            var target = $(this);
            if (!fields) {
                fields = target.datagrid("getColumnFields");
            }
            var rows = target.datagrid("getRows");
            var i = 0,
            j = 10, // 用groupOrder判断是否合并
            temp = {};
            for (i; i < rows.length; i++) {
                var row = rows[i]; // 第一行的object
                j = 10;
                var t = 0;
                for (j; j >= 0; j--) { // 共11个fields
                    var field = fields[j]; // fields[0]=schoolTerm
                    var tf = temp[field];
                    var tfv = '';
                    if(j == 10) {
                    	// 最后一栏‘组序‘                    	
                    	if (!tf) {// 第一步
                    		tf = temp[field] = {};
                    		tf[row[field]] = [i];
//                    		alert("if if="+i+"】【"+j);
                    	} else {
                    		var field = fields[10];
                    		tfv = tf[row[field]];
                    		if (tfv) {//第四步、第七步
                    			tfv.push(i);
                    			t = 1;
//                    			alert("if else if="+i+"】【"+j);
                    			// push 向数组的末尾添加一个或多个元素，并返回新的长度
                    		} else {
                    			tfv = tf[row[field]] = [i];
//                    			alert("if else else="+i+"】【"+j+"】【"+tf[row[field]]);
                    		}
                    	}
                    }else if(j != 7 && j != 6 && j!= 5) {// 周次和时间列不合并
                    	if (!tf) {// 第二步
                    		tf = temp[field] = {};
                    		tf[row[field]] = [i];// =0;
//                    		alert("else if="+i+"】【"+j+"】【"+tf[row[field]]);
                    	} else {
                    		// 第一条与第二条无法合并的问题仍然存在，目前的解决方法是在页面隐藏按钮
//                    		var field = fields[10];
//                    		if(i == 1) {
//                    			tfv = tf[row[field]];
//                    			if (tfv) {
//                    				tfv.push(i);
////                    			alert("else else if"+i+"】【"+j);
//                    				// push 向数组的末尾添加一个或多个元素，并返回新的长度
//                    			} else {
//                    				tfv = tf[row[field]] = [i];
////                    			alert("else else else="+i+"】【"+j);
//                    			}
//                    		}else {
                    			var field = fields[10];
                    			tfv = tf[row[field]];
                    			if (tfv) {
                    				tfv.push(i);
//                    			alert("else else if"+i+"】【"+j);
                    				// push 向数组的末尾添加一个或多个元素，并返回新的长度
                    			} else {
                    				tfv = tf[row[field]] = [i];
//                    			alert("else else else="+i+"】【"+j);
                    			}
//                    		}
                    	}
                    }
                }
            }
            $.each(temp, function (field, colunm) {
                $.each(colunm, function () {
                    var group = this;
                    // field 栏位name属性
                    // colunm 每列需要合并的单元格数组
                    
                    if (group.length > 1) {
                        var before,
                        after,
                        megerIndex = group[0];
                        for (var i = 0; i < group.length; i++) {
                            before = group[i];
                            after = group[i + 1];
                            if (after && (after - before) == 1) {
                                continue;
                            }
                            var rowspan = before - megerIndex + 1;
                            if (rowspan > 1) {
                                target.datagrid('mergeCells', {
                                    index : megerIndex,
                                    field : field,
                                    rowspan : rowspan
                                });
                            }
                            if (after && (after - before) != 1) {
                                megerIndex = after;
                            }
                        }
                    }
                });
            });
        });
    }
});