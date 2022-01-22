layui.use(['table', 'laypage', 'layer', 'form'], function(){
    var $ = layui.jquery,
        table = layui.table,
        layer = layui.layer,
        form = layui.form;
        laypage = layui.laypage;

    if (type === 'edit'){
        getSysteRoom(1, 10, buildNumbers, campusNumbers, "")
    } else {
        getSysteRoom(1, 10)
    }
    function getSysteRoom(page, limit, buildNumbers, campusNumbers, systemRoomNames) {
        $('#addSystemRoom').empty();
        $('.data-block').remove();
        $.ajax({
            url: timetableHost + '/api/labroom/getSystemRoom',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                         "buildNumber": buildNumbers,
                         "campusNumber": campusNumbers,
                         "page": page,
                         "limit": limit,
                         "systemRoomName": systemRoomNames
                   }),
            success: function (res) {
                let data = res.data;
                if (data.length !== 0) {
                    for (let i = 0; i < data.length; i++) {
                        let tr = `<tr>
                                    <td>${data[i].roomNo}</td>
                                    <td>${data[i].roomNumber}</td>
                                    <td>${data[i].roomName}</td>
                                    <td>${data[i].campusName}</td>
                                    <td>${data[i].buildName}</td>
                                    <td>${data[i].floorNo}</td>
                                    <td><button type="button" class="layui-btn layui-btn-primary layui-border-blue" onclick="setRoomNumber('${data[i].roomNumber}', '${data[i].roomName}')">选择</button></td>
                                  </tr>`;
                        $('#addSystemRoom').append(tr);
                    }
                    setPage(res.count, page, limit, buildNumbers, campusNumbers, systemRoomNames);
                } else {
                    let div = `<div class="data-block" 无数据</div>`;
                    $('table').after(div);
                }
            }
        })
    }

    function setPage(total, page, limit, buildNumbers, campusNumbers, systemRoomNames) {
        //自定义首页、尾页、上一页、下一页文本
        laypage.render({
            elem: 'page',
            curr: page,
            count: total,
            limit: limit,
            limits: [10, 20, 50, 100, 200],
            first: '首页',
            last: '尾页',
            prev: '<em>←</em>',
            next: '<em>→</em>',
            layout: ['count', 'prev', 'page', 'next', 'skip', 'limit'],
            jump: function (obj, first) {
                console.log(obj)
                if (!first) {
                    getSysteRoom(obj.curr, obj.limit, buildNumbers, campusNumbers, systemRoomNames);//obj.curr输入的要跳转的页码
                }
            }
        });
    }
    window.setRoomNumber = function (roomId, room) {
        // let roomNumberStr = roomId;
        // roomNumberArr =
        let roomNumberArr = [];
        roomNumberArr.push(roomId, room)
        // parent.getValue(roomNumberStr);
        parent.getValue(roomNumberArr);
        let index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
    }

    $('.search').on('click', function () {
        let roomName = $("input[name='title']").val();
        if (type === 'edit'){
            getSysteRoom(1, 10, buildNumbers, campusNumbers, roomName);
        } else {
            getSysteRoom(1, 10, "", "", roomName);
        }
    })
});