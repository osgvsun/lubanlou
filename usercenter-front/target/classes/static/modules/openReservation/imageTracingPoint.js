layui.use(['form', 'element'], function () {
    var $ = layui.jquery,
        form = layui.form,
        element = layui.element;

    let drawingStyle = {}; // 绘制过程中样式
    let gImageLayer; //涂层绘制
    let gMap; //容器标注
    let gFirstFeatureLayer; // 实例化
    let gFirstMaskLayer; // 涂抹层
    var mv = new Vue({
        el: '#app',
        data() {
            return {
                imageUrl: '',
                baseImg: ''
            }
        },
        mounted() {
           this.setImage();

        },
        methods: {
            getFileById(id) {
                return new Promise((resolve, reject) => {
                    resourceContainer.getFileById({
                        success: function (data) {
                            resolve(data.url)
                        },
                        fail: function (reason) {
                            console.log("失败:" + reason);
                        },
                        fileId: id,
                        needToken: true
                    });
                });
            },
            async setImage() {
                this.imageUrl = await this.getFileById(cookie.get('laboratoryLayoutImages'));
                this.setCoating();
            },

            // 设置涂层
            setCoating() {
                gMap = new AILabel.Map('map', {
                    center: {x: 250, y: 177}, // 为了让图片居中
                    zoom: 800,
                    mode: 'PAN', // 绘制线段
                    refreshDelayWhenZooming: true, // 缩放时是否允许刷新延时，性能更优
                    zoomWhenDrawing: true,
                    panWhenDrawing: true,
                    zoomWheelRatio: 5, // 控制滑轮缩放缩率[0, 10), 值越小，则缩放越快，反之越慢
                    withHotKeys: true // 关闭快捷键
                });
                gImageLayer = new AILabel.Layer.Image(
                    'first-layer-image', // id
                    {
                        // src: 'http://ali.download.lubanlou.com/group1/M00/03/40/rBJ0pV7jPGeAAtALAAIZ4U7sKWQ213.jpg',
                        // src: '../modules/openReservation/static/images/user_head.jpg',
                        src: this.imageUrl,
                        width: 500,
                        height: 354,
                        crossOrigin: true, // 如果跨域图片，需要设置为true
                        position: { // 左上角相对中心点偏移量
                            x: 0,
                            y: 0
                        },
                        grid: { // 3 * 3
                            columns: [{color: '#9370DB'}, {color: '#FF6347'}],
                            rows: [{color: '#9370DB'}, {color: '#FF6347'}]
                        }
                    }, // imageInfo
                    {name: '第一个图片图层'}, // props
                    {zIndex: 5} // style
                );
                gMap.addLayer(gImageLayer);
                // 实例化
                gFirstFeatureLayer = new AILabel.Layer.Feature(
                    'first-layer-feature', // id
                    {name: '第一个矢量图层'}, // props
                    {zIndex: 10} // style
                );
                gMap.addLayer(gFirstFeatureLayer);

                // 涂抹层
                gFirstMaskLayer = new AILabel.Layer.Mask(
                    'first-layer-mask', // id
                    {name: '第一个涂抹图层'}, // props
                    {zIndex: 11, opacity: .5} // style
                );
                gMap.addLayer(gFirstMaskLayer);

                // 绘制结束
                gMap.events.on('drawDone', (type, data, data1) => {
                    if (type === 'POINT') {
                        const pointFeature = new AILabel.Feature.Point(
                            `${ +new Date() }`,
                            { ...data, sr: 10 },
                            { "name": '空闲' },
                            drawingStyle
                        );
                        gFirstFeatureLayer.addFeature(pointFeature)
                    }
                });
                let tracingPointData = []
                if ( cookie.get('childPoint')) {
                    tracingPointData = JSON.parse(cookie.get('childPoint'))
                }
                for (let i = 0; i < tracingPointData.length; i++) {
                    let point = new AILabel.Feature.Point(
                        tracingPointData[i].id,
                        tracingPointData[i].shape,
                        { name: "预约状态"},
                        { fillStyle: tracingPointData[i].style.fillStyle, lineCap: tracingPointData[i].style.lineCap}
                    )
                    gFirstFeatureLayer.addFeature(point);
                };
                gMap.events.on('featureSelected', feature => {
                    gMap.setActiveFeature(feature);
                });
                gMap.events.on('featureUnselected', () => {
                    // 取消featureSelected
                    gMap.setActiveFeature(null);
                });
                gMap.events.on('featureUpdated', (feature, shape) => {
                    feature.updateShape(shape);
                });
                gMap.events.on('featureDeleted', ({id: featureId}) => {
                    gFirstFeatureLayer.removeFeatureById(featureId);
                });

                gMap.events.on('dblClick', (feature, shape) => {
                    let pointShape = gFirstFeatureLayer.getTargetFeatureWithPoint(feature.global);
                    const featureUpdate = new AILabel.Feature.Point(
                        pointShape.id,
                        pointShape.shape,
                        { name: "预约状态"},
                        { fillStyle: '#fcf', lineCap: pointShape.style.lineCap}
                    )
                    gFirstFeatureLayer.removeFeatureById(pointShape.id);
                    gFirstFeatureLayer.addFeature(featureUpdate)
                })

            },
            zoomIn() {
                gMap.zoomIn();
            },
            zoomOut() {
                gMap.zoomOut();
            },
            setMode(mode, type) {
                gMap.setMode(mode);
                // 后续对应模式处理
                switch (gMap.mode) {
                    case 'PAN': {
                        break;
                    }
                    case 'POINT': {
                        if (type == 1) {
                            drawingStyle = { fillStyle: '#46a82c' };
                        } else if (type == 2){
                            drawingStyle = { fillStyle: '#e1a42a' };
                        } else if (type == 3){
                            drawingStyle = { fillStyle: '#e63522' };
                        } else if (type == 4){
                            drawingStyle = { fillStyle: '#7d7d7d' };
                        }
                        gMap.setDrawingStyle(drawingStyle);
                        break;
                    }
                    default:
                        break;
                }
            },
            exportImage() {
                return gMap.exportLayersToImage(
                    {x: 0, y: 0, width: 500, height: 354},
                    { type: 'base64', format: 'image/png'}
                );
            },
            async savebtn() {
                this.exportImage();
                this.baseImg = await this.exportImage();
                const rleData = gFirstFeatureLayer.getAllFeatures();
                let laboratoryLayoutImagesPointInfo = [];
                // laboratoryLayoutImagesPointInfo.push({ base64: this.baseImg})
                for (let i = 0; i < rleData.length; i++) {
                    laboratoryLayoutImagesPointInfo.push({id: rleData[i].id, props: rleData[i].props, shape: rleData[i].shape, style: rleData[i].style })
                }
                window.sessionStorage.setItem("laboratoryLayoutImagesPointInfo", JSON.stringify(laboratoryLayoutImagesPointInfo));
                let index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                parent.layer.close(index); //再执行关闭
            }
        }
    })
})