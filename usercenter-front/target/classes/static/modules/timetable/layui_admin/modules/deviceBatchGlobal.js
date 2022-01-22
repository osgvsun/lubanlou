layui.define('formSelects', function (exports) {
    var formSelects = layui.formSelects;
    var obj = {
        renderPage: {
            curr: 1, //设定初始在第 1 页
            groups: 1, //只显示 1 个连续页码
            first: false,
            last: false,
            limit: 5,//每页默认显示的数量
            limits: [5, 7, 10, 20],
        },
        AddBtnComponent: function (elId, tableDataUrl, formSelectComponentP, tableComponentP) {
            this.elId = elId;
            this.init = function () {
                document.querySelector(this.elId).addEventListener("click", function (evt) {
                    formSelectComponentP.selectedData = formSelects.value(formSelectComponentP.elId).map(function (item) {
                        return item.value;
                    });

                    $.ajax({
                        url: tableDataUrl,
                        data: {
                            data: formSelectComponentP.selectedData,
                            page: 1,
                            limit: 1000
                        },
                        traditional: true,
                        success: function (resultData) {
                            tableComponentP.update(resultData.data);
                        },
                        error: function (err, msg) {
                            console.log(err);
                        }
                    });
                });
            };

        },
        saveSuccessCallback:function(resultData) {
            if (resultData === true) {
                alert("保存成功");
                setTimeout(function () {
                    window.parent.location.reload();
                }, 500);
                layer.closeAll();
            } else {
                alert("保存失败");
            }
        }
    };
    exports('deviceBatchGlobal', obj);
});