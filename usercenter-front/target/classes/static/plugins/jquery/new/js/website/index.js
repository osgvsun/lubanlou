/**
 * Created by Administrator on 2018/5/17.
 */
function moreMachineRanking() {
    $('#external-frame', window.parent.document).height(700);
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '设备排行',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['900px', '540px'],
            content:"../website/moreMachineTimeRanking?currpage=1&tage=1",
            end: function(){
            }
        });
    });
}
function morePeopleUseRanking() {
    $('#external-frame', window.parent.document).height(700);
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '人员使用排行',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['900px', '540px'],
            content:"../website/morePeopleUseRanking?currpage=1&tage=1",
            end: function(){
            }
        });
    });
}