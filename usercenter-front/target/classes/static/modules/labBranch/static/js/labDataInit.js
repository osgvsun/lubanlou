layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function () {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form,
        laydate = layui.laydate

    /** 编辑实验室 */
    var isEdit = false;
    var labRoomDetail = {};
    if ($("form[id=editlabbox]").length !== 0) {
        isEdit = true;
        $.ajax({
            url: labRoomHost + "/api/labroom/getLabRoomById",
            type: "GET",
            async: false,
            data: {labRoomId},
            success: function (res) {
                labRoomDetail = res;
                //设置非下拉框的值，因为下拉框要等加载后再设置
                form.val("editlabbox", {
                    "number": res.labRoomNumber,
                    "name": res.labRoomName,
                    "englishname": res.labRoomEnName,
                    "systemRoom": res.systemRoom,
                    // "core": res.labCenterDTO.id,
                    // "lab": res.labAnnex,
                    // "campus": res.systemCampusDTO.campusNumber,
                    // "building": res.systemBuildDTO.buildNumber,
                    // "floor": res.floorNo,
                    "area": res.labRoomArea,
                    // "base": res.labBase,
                    // "address": res.systemRoom,
                    // "category": res.CDictionaryByLabRoomClassification,
                    "date": res.labRoomTimeCreate,
                    "capacity": res.labRoomCapacity,
                    // "sort": res.CDictionaryByLabRoomSort,
                    // "media": res.cdictionaryByIsMultimedia,
                    // "lesson": res.labRoomSubject,
                    "construction": res.isSchoolEnterpriseCooperation,
                    "productivelab": res.isRoductivity,
                    "simulationlab": res.isSimulation,
                    "detailAddress": res.labAddressDetail,
                    "describe": res.labRoomIntroduction,
                    "rule": res.labRoomRegulations,
                    "attention": res.labRoomAttentions,
                    "award": res.labRoomPrizeInformation,
                    "isOpen": res.isOpen
                })
                let option = `<option value="${res.systemRoom}" selected>${res.systemRoomName}</option>`;
                $("select[name='systemRoom']").append(option);
            }
        })
    }

    // 编辑下拉框初始化
    function editSelectInit(name) {
        //如果不是编辑就不执行
        if (!isEdit) return;
        //判断哪一个下拉框
        switch (name) {
            case "core":
                selectClick(name, labRoomDetail.labCenterDTO.id);
                break;
            case "lab":
                selectClick(name, labRoomDetail.labAnnexDTO.id);
                break;
            case "campus":
                selectClick(name, labRoomDetail.systemCampusDTO.campusNumber)
                break;
            case "building":
                selectClick(name, labRoomDetail.systemBuildDTO.buildNumber)
                break;
            case "floor":
                selectClick(name, labRoomDetail.floorNo)
                break;
            case "base":
                selectClick(name, labRoomDetail.labBase)
                break;
            /*case "address":
                selectClick(name, labRoomDetail.systemRoom)
                break;*/
            case "category":
                selectClick(name, labRoomDetail.cdictionaryByLabRoomClassification)
                break;
            case "sort":
                selectClick(name, labRoomDetail.cdictionaryByLabRoomSort)
                break;
            case "lesson":
                selectClick(name, labRoomDetail.labRoomSubject)
                break;
            case "media":
                selectClick(name, labRoomDetail.cdictionaryByIsMultimedia)
                break;
            case "systemRoom":
                selectClick(name, labRoomDetail.systemRoom)
                break;
            case "cdictionaryByLabRoom":
                selectClick(name, labRoomDetail.cdictionaryByLabRoom)
                break;
            case "labRoomNature":
                selectClick(name, labRoomDetail.labRoomNature)
        }

        function selectClick(name, value) {
            $(`select[name=${name}]+.layui-form-select>dl>dd[lay-value=${value}]`).click();
        }
    }

    /** 下拉框数据获取 新建编辑通用*/
    //实验室中心
    $.ajax({
        url: labRoomHost + "/api/labroom/findAllLabCenters",
        type: "GET",
        dataType: "JSON",
        success: function (res) {
            let str = `<option value="">请选择所属实验中心</option>`;
            if (res.data.length === 0) {
                str = `<option value="">没有实验中心数据</option>`
            } else {
                for (let i = 0; i < res.data.length; i++) {
                    str += `<option value='${res.data[i].id}'>${res.data[i].centerName}</option>`
                }
            }
            setOptionFn("core", str, form)
            //监听实验室中心选中刷新所属实验室
            form.on('select(core)', function (data) {
                // 如果为空就不请求并清空实验室数据
                if (data.value === "") {
                    setOptionFn("lab", `<option value="">请先选择所属实验中心</option>`, form)
                    return false;
                }
                // 调用获取所属实验室的方法
                apiCommonSelectBySelect("labAnnexList", data.value, function (res) {
                    //回调函数
                    let labRoomStr = `<option value="">请先选择所属实验室</option>`
                    if (res.results.length === 0) {
                        labRoomStr = `<option value="">该实验中心下没有实验室</option>`
                    } else {
                        for (let i = 0; i < res.results.length; i++) {
                            labRoomStr += `<option value="${res.results[i]['id']}">${res.results[i]['text']}</option>`
                        }
                    }
                    setOptionFn("lab", labRoomStr, form)
                    editSelectInit("lab");
                });
            });
            editSelectInit("core");
        }, error: function (e) {
            console.error("实验室中心加载失败！")
        }
    })

    //获取校区
    $.ajax({
        url: labRoomHost + "/api/labroom/getAllSystemCampus",
        type: "GET",
        dataType: "JSON",
        contentType: "application/json;charset=UTF-8",
        success: function (res) {
            let str = `<option value="">请选择所属校区</option>`;
            if (res.data.length === 0) {
                str = `<option value="">没有校区数据</option>`
            } else {
                for (let i = 0; i < res.data.length; i++) {
                    str += `<option value="${res.data[i]['campusNumber']}">${res.data[i]['campusName']}</option>`
                }
            }
            setOptionFn("campus", str, form)
            form.on('select(campus)', function (data) {
                // 调用获取所属楼宇的方法
                getSystemBuildingsByCampusNumber(data.value)
            });
            editSelectInit("campus")
        }
    })

    // 根据校区获取楼宇
    function getSystemBuildingsByCampusNumber(campusNumber) {
        if (campusNumber === "") {
            setOptionFn("building", `<option value="">请先选择所属校区</option>`, form)
            return false;
        }
        $.ajax({
            url: labRoomHost + "/api/labroom/getSystemBuildingsByCampusNumber",
            type: "POST",
            data: JSON.stringify({campusNumber}),
            dataType: "JSON",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                let str = `<option value="">请选择所属楼宇</option>`;
                if (res.data.length === 0) {
                    str = `<option value="">该校区内没有楼宇</option>`;
                    setOptionFn("floor", `<option value="">请先选择所属楼宇</option>`, form)
                } else {
                    for (let i = 0; i < res.data.length; i++) {
                        str += `<option value="${res.data[i]['buildNumber']}">${res.data[i]['buildName']}</option>`
                    }
                }
                setOptionFn("building", str, form)
                form.on('select(building)', function (data) {
                    // 通过楼宇获取楼层
                    getSystemFloorsByBuildNumber(data.value);
                    // 获取实验室地点
                    /*apiCommonSelectBySelect("systemRoomList", data.value, function (res) {
                        apiCommonSelectBySelectCallBackFn2(res, "address", "请选择实验室地点", "该楼宇内没有实验室地点数据");
                    });*/
                });
                editSelectInit("building")
            }
        })
    }

    // 通过楼宇获取楼层
    function getSystemFloorsByBuildNumber(buildNumber) {
        if (buildNumber === "") {
            setOptionFn("floor", `<option value="">请先选择所属楼宇</option>`, form)
            return false;
        }
        $.ajax({
            url: labRoomHost + "/api/labroom/getSystemFloorsByBuildNumber",
            type: "POST",
            data: JSON.stringify({buildNumber}),
            dataType: "JSON",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                let str = `<option value="">请选择所在楼层</option>`;
                if (res.data.length === 0) {
                    str = `<option value="">该楼宇内没有楼层</option>`;
                } else {
                    for (let i = 0; i < res.data.length; i++) {
                        str += `<option value="${res.data[i]['floorNo']}">${res.data[i]['floorName']}</option>`
                    }
                }
                setOptionFn("floor", str, form)
                editSelectInit("floor")
            }
        })
    }

    // 通用下拉框通用回调函数
    function apiCommonSelectBySelectCallBackFn2(res, name, a, b) {
        apiCommonSelectBySelectCallBackFn(res, name, a, b, form);
        //和公共方法多了个editSelectInit
        editSelectInit(name)
    }

    setTimeout(function () {
        // //所属房间
        // $.ajax({
        //     url: labRoomHost + "/api/labroom/getSystemRoomNotContains",
        //     type: "GET",
        //     contentType: "application/json;charset=UTF-8",
        //     dataType: "JSON",
        //     success: function (res) {
        //         //回调函数
        //         let str = `<option value="">请选择所属房间</option>`
        //         if (res.data.length === 0) {
        //             str = `<option value="">没有所属房间</option>`
        //         } else {
        //             for (let i = 0; i < res.data.length; i++) {
        //                 str += `<option value="${res.data[i]['roomNumber']}">${res.data[i]['roomName']}</option>`
        //             }
        //         }
        //         setOptionFn('systemRoom', str)
        //     }
        // });
        //实验室类型
        apiCommonSelectBySelect('dictionaryList', 'c_lab_room_type', function (res) {
            apiCommonSelectBySelectCallBackFn2(res, 'cdictionaryByLabRoom', '请选择实验室类类型', '没有实验室类型数据');
        })
        // 获取实验室基地下拉框
        apiCommonSelectBySelect("labBaseList", null, function (res) {
            apiCommonSelectBySelectCallBackFn2(res, "base", "请选择所属基地", "没有所属基地数据");
        });

        // 获取实验室类别
        apiCommonSelectBySelect("dictionaryList", "c_lab_room_classification", function (res) {
            apiCommonSelectBySelectCallBackFn2(res, "category", "请选择实验室类别", "没有实验室类别数据");
        });

        // 获取实验室分类
        apiCommonSelectBySelect("dictionaryList", "c_lab_room_sort", function (res) {
            apiCommonSelectBySelectCallBackFn2(res, "sort", "请选择实验室分类", "没有实验室分类数据");
        });

        // 获取实验室学科
        apiCommonSelectBySelect("systemSubjectList", null, function (res) {
            apiCommonSelectBySelectCallBackFn2(res, "lesson", "请选择所属学科", "没有所属学科数据");
        });

        // 获取有无多媒体
        apiCommonSelectBySelect("dictionaryList", "c_is_multimedia", function (res) {
            apiCommonSelectBySelectCallBackFn2(res, "media", "请选择有无多媒体", "没有有无多媒体数据");
        });
        // 获取实验室性质列表
        apiCommonSelectBySelect("dictionaryList", "c_lab_room_nature_type", function (res) {
            apiCommonSelectBySelectCallBackFn2(res, "labRoomNature", "请选择", "没有实验室性质数据");
        });
    }, 1000)

})