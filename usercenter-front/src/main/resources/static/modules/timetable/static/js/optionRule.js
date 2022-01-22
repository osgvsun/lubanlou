// var secprt = document.querySelector('#section')
// var ipt = secprt.getElementsByTagName('input');
// 选中 可自定义修改
function checkedOn(ipt, num) {
	ipt[num].classList.add('layui-form-checked');
    ipt[num].setAttribute('oldChecked', '');
    // 没有oldChecked 为null 有则为 ''
}
// 取消 可自定义修改
function checkedOff(ipt, num) {
    ipt[num].classList.remove('layui-form-checked');
    ipt[num].removeAttribute('oldChecked');
}
// 自定义判断方法
function customChecked(ipt){
    return ipt.classList.contains('layui-form-checked');
}
// 调用 刷新
function refreshRule(section){
	clickRule(section);
	optionRule(section);
}
/**
 设置全选 反选 全部选
 参数1：按钮id
 参数2：复选框复层div的id
 */
function allRule(btnId,section){
    // 全选
    $("#"+btnId).click(function(){
        $("#"+section+" .layui-form-checkbox").addClass('layui-form-checked');
    })
}
function oppositeRule(btnId,section){
    //反选
    $("#"+btnId).click(function(){
        $("#"+section+" .layui-form-checkbox").toggleClass('layui-form-checked');
    })
}
function noneRule(btnId,section){
    $("#"+btnId).click(function(){//周次全不选
        $("#"+section+" .layui-form-checkbox").removeClass('layui-form-checked');
    })
}
// 单击
function clickRule(section){
    $("#"+section+" .layui-form-checkbox").each(function(i,j){
        j.onclick=function(){
            this.classList.toggle('layui-form-checked');
            // oldChecked toggle
            if(this.getAttribute('oldChecked')==null){
                this.setAttribute('oldChecked','');
            }else{
                this.removeAttribute('oldChecked');
            }
        }
    });
}

// this.optionRule(ipt);
function optionRule(section) {
	var secprt = document.querySelector('#'+section);
	var ipt = secprt.getElementsByClassName('layui-form-checkbox');

    for (var i = 0; i < ipt.length; i++) {
		// 设置标识
		var flag = 'sectionson';
		ipt[i].setAttribute(flag, i);
		ipt[i].ondblclick = function() {
			// 根据下标大小决定是min max
			var min;
			var max;
			// 获取被双击的按钮的num
			var num = parseInt(this.attributes[flag].nodeValue);
			// var oldChecked = ipt[num].checked;
			var oldChecked = ipt[num].getAttribute('oldChecked')!=null;
			// console.log("oldChecked",oldChecked)
			// 遍历所有的多选框
			// var checkedObj = $("input:checked[type='checkbox']");
			var checkedObj = secprt.getElementsByClassName('layui-form-checked');
			var checkLength = checkedObj.length;
			/*
				因为只有双击触发这个方法
				默认都是1
				两种情况
				1 和 大于1
				获取min max
			*/
			// 获取min max前的点击按钮是否选中操作
			if (checkLength <= 1) {
				checkedOn(ipt, num);
				// 刷新变量
				// checkedObj = $("input:checked[type='checkbox']");
				checkedObj = secprt.getElementsByClassName('layui-form-checked');
				checkLength = checkedObj.length;
			}

			// console.log("①", num, min, max);
			if (checkedObj.length == 1) {
				min = max = num;
			} else if (checkedObj.length > 1) {
				// 设置min max值
				min = checkedObj[0].getAttribute(flag);
				max = checkedObj[checkedObj.length - 1].getAttribute(flag);
			}
			// 转换成number
			min = parseInt(min);
			max = parseInt(max);
			// console.log("②", num, min, max);
			// 获取min max后的点击按钮点击前是否被选中判断操作
			// 如果是未选中
			// if (!ipt[num].checked && max != min) {
			if (!customChecked(ipt[num]) && max != min) {
				// 判断是否比最值更最
				if (num > max) {
					max = num;
				} else if (num < min) {
					//min = num;
					for (var j = num; j >= 0; j--) {
						checkedOn(ipt, j);
					}
				}

			}
			// console.log("③", num, min, max);
			/**
			 *  中间 或 左右
			 *  一个 或 多个
			 */
			if (num == min && num == max) {
				for (var j = num; j >= 0; j--) {
					checkedOn(ipt, j);
				}
			} else {
				//判断 当前值 和 min max
				// console.log(num, min, max,checkLength);
				/**
				 * 默认是向前判断
				 * 当双击最前就向后判断
				 */

				// ↑是选中 ↓是取消
				// 实现方法 1
				if (num == min) {
					/**
					 * 当只有min max两个被选中时，中间都被选
					 * 当min后面没连着的就是向前选
					 */
					// if (ipt[Number(num) + 1].checked) {
					if (customChecked(ipt[Number(num) + 1])) {
						// jump 是用来判断当前选中的前后是否被选中的变量
						var jump = false;
						for (var j = num; j <= max; j++) {
							if (j > num) {
								if (customChecked(ipt[j]) && jump) {
									break;
								} else if (!customChecked(ipt[j])) {
									jump = true;
								}
							}
							// checkedOn(ipt,j);
							checkedOff(ipt, j);
						}
						checkedOn(ipt, num);
					} else if (checkLength == 2) {
						console.log(1)
						if (oldChecked) {
							for (var j = min; j >= 0; j--) {
								checkedOn(ipt, j);
							}
						} else {
							for (var j = max; j >= min; j--) {
								checkedOn(ipt, j);
							}
						}

					} else {
						for (var j = num; j >= 0; j--) {
							checkedOn(ipt, j);
						}
					}

				} else if (num == max) {
					var jump = false;
					for (var j = num; j >= min; j--) {
						if (j < num) {
							if (customChecked(ipt[j]) && jump) {
								break;
							} else if (!customChecked(ipt[j])) {
								jump = true;
							}
						}
						checkedOn(ipt, j);
					}
					// min max 之间被选上后再点最大就是前全选
					if (!jump) {
						for (var j = num; j >= 0; j--) {
							checkedOn(ipt, j);
						}
					}
				} else if (min <= num && num <= max) {
					// 还是要等于
					// 小范围的 min max
					var minScope;
					var maxScope;
					// 要判断前后有无被选中的按钮
					// 范围最值 minScope maxScope
					for (var j = num; j >= min; j--) {
						if (!customChecked(ipt[j])) {
							break;
						}
						minScope = j;
					}
					for (var j = num; j <= max; j++) {
						if (!customChecked(ipt[j])) {
							break;
						}
						maxScope = j;
					}
					// 转换成number
					if (!typeof(minScope) == "undefined") {
						minScope = parseInt(minScope);
					}
					if (!typeof(maxScope) == "undefined") {
						maxScope = parseInt(maxScope);
					}
					// 获取到
					// console.log(minScope, maxScope);
					// 如果 当前点击的 是 范围最大 || 范围最小
					// 默认向前 范围内后面的都取消选中
					if (minScope == maxScope || num == maxScope) {
						var jump = false;
						// >= 0 
						for (var j = num; j >= 0; j--) {
							if (j < num) {
								if (customChecked(ipt[j]) && jump) {
									break;
								} else if (!customChecked(ipt[j])) {
									jump = true;
								}
							}
							checkedOn(ipt, j);
						}
						// 判断 minScope 是否是 min
						if (min == minScope) {
							for (var j = num; j >= 0; j--) {
								checkedOn(ipt, j);
							}
						}
					}
					// 取消选中
					if (num < maxScope) {
						for (var j = Number(num) + 1; j <= maxScope; j++) {
							checkedOff(ipt, j);
						}
					}
				}
			}
		}
	}
}
