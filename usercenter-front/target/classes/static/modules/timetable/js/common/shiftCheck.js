
let startChecked;
let onOff = false;

function handleCheck1(e,obj) {
    const boxs = document.querySelectorAll('.layui-table-fixed .layui-table-body .layui-form-checkbox');
    const boxArr = Array.from(boxs);
    if(!startChecked) startChecked = $(obj);
    onOff = startChecked.find('.layui-form-checkbox').hasClass('layui-form-checked') ? true : false;
    if(e.shiftKey) {
        let start = boxArr.indexOf($(obj).find('.layui-form-checkbox')[0]);
        let end = boxArr.indexOf(startChecked.find('.layui-form-checkbox')[0]);
        boxArr.slice(Math.min(start, end), Math.max(start, end) + 1)
            .forEach(function(value,index,arr) {
                $(value).prev().prop('checked',onOff);
                onOff?$(value).addClass('layui-form-checked'):$(value).removeClass('layui-form-checked');
            });
        // console.log(start + "+" + end);
    }
    startChecked = $(obj);
}

