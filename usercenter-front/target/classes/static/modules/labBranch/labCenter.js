layui.use(['form'], function () {
    var form = layui.form,
        $ = layui.jquery;

    form.render();

    function setHeadTitle(url, labCenterId) {
        $.ajax({
            url: timetableHost + "/api/labCenter/getLabCenterById",
            type: 'POST',
            async: false,
            data: {"labCenterId": labCenterId},
            success: function (res) {
                if (res.data) {
                    $('.layui-card-header>span').append(res.data.centerName);
                }
                }
        })
    }
    function setHeadTitleLabAnnex(labAnnexId) {
        $.ajax({
            url: timetableHost + "/api/labCenter/getLabCenterById",
            type: 'POST',
            async: false,
            data: {"labAnnexId": labCenterId},
            success: function (res) {
                if (res.data) {
                    $('.layui-card-header>span').append(res.data.labName);
                }
            }
        })
    }
    function setCenterAndLabCenter(labCenterId, type) {
        cookie.set("labCenterId", labCenterId);
        if (type === 'center') {
            setHeadTitle('getLabCenterById', labCenterId)
            $.ajax({
                url: timetableHost + '/api/labCenter/getLabInfoByLabCenter',
                type: 'POST',
                data: {"labCenterId": labCenterId},
                success: function (res) {
                    console.log(res)
                    let data = res;
                    if (res.code === 0) {
                        for (let i = 0; i < data.data.length; i++) {
                            let url = location.origin + "/teacherInformationCenter/labBranch/labCatalog?labRoomId=" + data.data[i].labRoomId;
                            let labDiv = `<div class="grid-item">
                            <div class="card_box">
                                <div class="card_tit" ${data.data[i].labRoomName.length + data.data[i].labRoomNumber.length > 20 ? "style='padding: 1px 10px'" : '' }>
                                    <input type="checkbox" name="modularbox" />
                                    <a href="javascript:;" onclick="setLabRoomName(\'${data.data[i].labRoomName}\',\'${url}\', 'center')" lay-tips="进入此房间">
                                        <span ${data.data[i].labRoomName.length + data.data[i].labRoomNumber.length > 20 ? "style='display: inline-block; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; width: 70%; line-height: 25px'" : ''}>${data.data[i].labRoomNumber ? data.data[i].labRoomNumber + '#' + data.data[i].labRoomName : ''  + data.data[i].labRoomName}</span>
                                        <i class="layui-icon layui-icon-next" ${data.data[i].labRoomName.length + data.data[i].labRoomNumber.length > 20 ? "style='top: -7px'" : ""}></i>
                                    </a>
                                </div>
                                <div class="card_body">
                                    <i class="fa fa-hdd-o card_icon_select"></i>
                                    <i class="fa fa-lightbulb-o card_icon_select"></i>
                                    <i class="fa fa-credit-card card_icon_select"></i>
                                </div>
                                <div class="card_bottom">
                                    <i class="fa fa-calendar fl card_icon_select"></i>
<!--                                    <label class="fa fa-question-circle card_state">状态不明</label>-->
                                    <i class="fa fa-wifi fr card_icon_select"></i>
                                </div>
                            </div>
                        </div>`;
                            $('.grid').append(labDiv);
                        }
                    }
                }
            });
        } else {
            setHeadTitleLabAnnex(labCenterId);
            $.ajax({
                url: timetableHost + '/api/labroom/getListLabOfAnnex',
                type: 'POST',
                data: {"labAnnexId": labCenterId},
                success: function (res) {
                    console.log(res)
                    let data = res;
                    if (res.code === 0) {
                        for (let i = 0; i < data.data.length; i++) {
                            let url = location.origin + "/teacherInformationCenter/labBranch/labCatalog?labRoomId=" + data.data[i].labRoomId;
                            let labDiv = `<div class="grid-item">
                            <div class="card_box">
                                <div class="card_tit" ${data.data[i].labRoomName.length + data.data[i].labRoomNumber.length > 20 ? "style='padding: 1px 10px'" : '' }>
                                    <input type="checkbox" name="modularbox" />
                                    <a href="javascript:;" onclick="setLabRoomName(\'${data.data[i].labRoomName}\',\'${url}\','LabOfAnnex')" lay-tips="进入此房间">
                                        <span ${data.data[i].labRoomName.length + data.data[i].labRoomNumber.length > 20 ? "style='display: inline-block; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; width: 70%; line-height: 25px'" : ''}>${data.data[i].labRoomNumber ? data.data[i].labRoomNumber + '#' + data.data[i].labRoomName : ''  + data.data[i].labRoomName}</span>
                                        <i class="layui-icon layui-icon-next" ${data.data[i].labRoomName.length + data.data[i].labRoomNumber.length > 20 ? "style='top: -7px'" : ""}></i>
                                    </a>
                                </div>
                                <div class="card_body">
                                    <i class="fa fa-hdd-o card_icon_select"></i>
                                    <i class="fa fa-lightbulb-o card_icon_select"></i>
                                    <i class="fa fa-credit-card card_icon_select"></i>
                                </div>
                                <div class="card_bottom">
                                    <i class="fa fa-calendar fl card_icon_select"></i>
<!--                                    <label class="fa fa-question-circle card_state">状态不明</label>-->
                                    <i class="fa fa-wifi fr card_icon_select"></i>
                                </div>
                            </div>
                        </div>`;
                            $('.grid').append(labDiv);
                        }
                    }
                }
            });
        }

    }

    setCenterAndLabCenter(labCenterId, type)
    //实验室搜索
    window.labRoomSearch = function () {
        let searchVal = $("#searchbox").val();
        if (searchVal) {
            Array.prototype.forEach.call($(".grid-item a"), function (obj, index) {
                let labRoomName = $(obj).find("span").text()
                if (PinyinMatch.match(labRoomName, searchVal)) {
                    $(obj).parents(".grid-item").show();
                } else {
                    $(obj).parents(".grid-item").hide();
                }
            })
        } else {
            $(".grid-item").show();
        }
    };
    // 实验室点击事件
    window.setLabRoomName = function (name, url, status) {
        cookie.set("labRoomName", name);
        cookie.set("status", status);
        location.href = url;
    }
})