layui.define(function (e) {
    layui.use('form',function () {
        var form=layui.form;
        //饼图
        var pieOption = {
            tooltip: {   //提示框：鼠标悬浮交互时的信息提示
                trigger:'item',
                formatter: '{b}:{c}: ({d}%)'
            },
            legend: { //图例
                data:[],//图例内容数组，每一项代表一个系列的name
                // x:'500',
                // orient:'vertical',//布局方式 vertical竖直
                orient:'horizontal' ,
                x:'left',
            },
            series: [{//驱动图表生成的数据内容数组，数组中每一个项为一个系列的选项和数据，确定适用的类型
                itemStyle : {
                    normal : {
                        label : {
                            position:'inner'
                        },
                        labelLine : {
                            show : true
                        }
                    },

                },
                type: 'pie',
                data:[]
            }],
        };
        //条形图
        var barOption = {
            title: {//标题
                text: '专利数量'
            },
            tooltip: {   //提示框：鼠标悬浮交互时的信息提示
                trigger:'item'
            },
            legend: { //图例
                data:[],//图例内容数组，每一项代表一个系列的name
                orient:'horizontal',//布局方式 vertical竖直
            },
            xAxis: {
                data:[]
            },
            yAxis: {},
            dataZoom: [{
                type: 'slider',
                show: true,
                height:20
            }],
            series: [{//驱动图表生成的数据内容数组，数组中每一个项为一个系列的选项和数据，确定适用的类型
                name: '专利数量',
                type: 'bar',
                data:[]
            }]
        };
        //堆积柱状图
        var MbarOption={
            tooltip : {
                trigger : 'axis',
                showDelay : 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data:[],
            },
            xAxis :  [
                {
                    type : 'category',
                    data : [],

                    axisPointer: {
                        type: 'shadow'
                    },
                },
            ],
            dataZoom: [{
                type: 'slider',
                show: true,
                height:20
            }],
            yAxis :
                [
                    {
                        type : 'value'
                    }
                ],
            series : []
        };
        //堆积条形图
        var MlinnerOption = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data:[]
            },
            grid:{
                left:'2%',
                right:'2%',
                bottom:'10%',
                containLabel: true
            },
            calculable : true,
            xAxis : [
                {
                    type : 'value'
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    data :[]
                }
            ],
            series : []
        };

        //年龄分布统计
        var x=0;
        var AgeStaticNum=[];
        var AgeClos=['35岁及以下','36-45','46-55','56-60','60岁以上']
        $.ajax({
            url:userCenterHost + '/usercenter/statisticAgeDistribution',
            type:'GET',
            async:false,
            success:function (res) {
                if(!res.code){
                    var test=res.data;
                    var ageLevel1Count=0;
                    var ageLevel2Count=0;
                    var ageLevel3Count=0;
                    var ageLevel4Count=0;
                    var ageLevel5Count=0;
                    //修复图表显示数据有误的问题以及剔除传过来的数据 2020.3.9
                    for(var age in test){
                        if(age<35&&age>0){
                            ageLevel1Count=parseInt(ageLevel1Count)+parseInt(test[age]);
                        }
                        if(age<45&&age>=36){
                            //此年龄段内的人数

                            ageLevel2Count=parseInt(ageLevel2Count)+parseInt(test[age]);
                        }
                        if(age<55&&age>=46){

                            ageLevel3Count=parseInt(ageLevel3Count)+parseInt(test[age]);
                        }
                        if(age<60&&age>=56){

                            ageLevel4Count=parseInt(ageLevel4Count)+parseInt(test[age]);
                        }
                        if(age>=60&&age<=168){

                            ageLevel5Count=parseInt(ageLevel5Count)+parseInt(test[age]);
                        }
                    }
                    AgeStaticNum.push({
                            value:ageLevel1Count,
                            name:'35岁及以下'
                        },
                        {
                            value:ageLevel2Count,
                            name:'36-45'
                        },
                        {
                            value:ageLevel3Count,
                            name:'46-55'
                        },
                        {
                            value:ageLevel4Count,
                            name:'56-60'
                        },
                        {
                            value:ageLevel5Count,
                            name:'60岁以上'
                        }
                    )
                    /* while(x<100){
                         var y=x+interval;
                         AgeClos.push(x+'~'+y);
                         var ageCount=0;
                         for(var age in test){
                             console.log(parseInt(age));
                             console.log(parseInt(x));
                             console.log(parseInt(age)<parseInt(x));
                             if(age<y&&age>=x){
                                 //此年龄段内的人数
                                 ageCount=parseInt(ageCount)+parseInt(test[age]);
                             }
                         }
                         AgeStaticNum.push({
                             value:ageCount,
                             name:x+'~'+y
                         })
                         x=y;
                     }*/
                }
                else {
                    console.log(res.msg);
                }


            }
        });
        /*        //获取所设置的时间间隔
                /!* var interval=$("#ageInterval").val();*!/
                $("#ageInterval").bind('input porpertychange',function () {
                    var interval2=$("#ageInterval").val();
                    var x=0;
                    var AgeStaticNum2=[];
                    var AgeClos2=[];
                    $.ajax({
                        url:userCenterHost + '/usercenter/statisticAgeDistribution',
                        type:'GET',
                        success:function (res) {
                            if(!res.code){
                                var test=res.data;
                                while(x<100){
                                    var y=parseInt(x)+parseInt(interval2);
                                    AgeClos2.push(x+'~'+y);
                                    console.log(x+'~'+y);
                                    var ageCount=0;
                                    for(var age in test){
                                        if(age<y&&age>=x){
                                            //此年龄段内的人数
                                            ageCount=parseInt(ageCount)+parseInt(test[age]);
                                        }
                                    }
                                    AgeStaticNum2.push({
                                        value:ageCount,
                                        name:x+'~'+y
                                    })
                                    x=y;
                                }
                                //获取饼图图表
                                var option =agePieChart.getOption();
                                agePieChart.clear();
                                option.series[0].data= AgeStaticNum2;
                                option.legend.data= AgeClos2;
                                option.legend[0].data=AgeClos2;
                                var option1 =agePieChart.getOption();
                                agePieChart.setOption(option);
                            }
                            else {
                                console.log(res.msg);
                            }


                        }
                    });
                })*/
        //年龄分布饼图
        var agePieOption = {
            /*                title: {//标题
                                text: '',
                                left:'left'
                            },*/
            tooltip: {   //提示框：鼠标悬浮交互时的信息提示
                trigger:'item',
                formatter: '{b}:{c}: ({d}%)'
            },
            legend: { //图例
                data:AgeClos,//图例内容数组，每一项代表一个系列的name
                x:'right',
                orient:'vertical',//布局方式 vertical竖直
            },
            series: [{//驱动图表生成的数据内容数组，数组中每一个项为一个系列的选项和数据，确定适用的类型
                type: 'pie',
                data:AgeStaticNum,
                x:'center'
            }],
        };

        // 基于准备好的dom，初始化echarts实例
        var myPieChart = echarts.init(document.getElementById('pie'));
        var agePieChart = echarts.init(document.getElementById('agePie'));
        var myBarChart = echarts.init(document.getElementById('bar'));
        var myMbarChart = echarts.init(document.getElementById('Mbar'));
        var myMLinnerChart = echarts.init(document.getElementById('MLinner'));


// 使用刚指定的配置项和数据显示图表。
        myBarChart.setOption(barOption);
        myMbarChart.setOption(MbarOption);
        myPieChart.setOption(pieOption);
        agePieChart.setOption(agePieOption);
        myMLinnerChart.setOption(MlinnerOption);

       /*
       * 图表初始化数据
       * */
        //部门分布统计（饼图）
        $.ajax({
            url:userCenterHost + '/usercenter/statisticDepartment',
            type:'GET',
            data:{
                username:currentUsername
            },
            async:false,
            success:function (res) {
                var departmentClos=[];
                var departmentStaticNum=[]
                if(!res.code){
                    var data=res.data;
                    for(var department in data){
                        departmentClos.push(department);
                        departmentStaticNum.push({value: data[department],name:department})
                    }
                }
                else{
                    console.log(res.msg);
                }
                //获取饼图图表
                var MyPieOption = myPieChart.getOption();
                myPieChart.clear();
                MyPieOption.legend[0].data=departmentClos;
                // MyPieOption.xAxis[0].data=departmentClos;
                MyPieOption.series[0].data=departmentStaticNum;
                myPieChart.setOption(MyPieOption);

            }
        });

       //教学获奖情况 （堆积柱状图）
        $.ajax({
            url:userCenterHost + '/usercenter/statisticEducationAward',
            type:'GET',
            success:function (res) {
                var eduAwardCols=res.years;
                var eduAwardNum=[];
                var eduAwardLevel=[];
                var data=res.factorMap;
                for(var itemType in data){
                    eduAwardLevel.push(itemType);
                    eduAwardNum.push(
                        {
                            name:itemType,
                            type:'bar',
                            data:data[itemType]
                        })
                }
                //获取堆积柱状图图表
                var MbarOption = myMbarChart.getOption();
                myMbarChart.clear();
                MbarOption.legend[0].data=eduAwardLevel;
                MbarOption.xAxis[0].data=eduAwardCols;
                MbarOption.series=eduAwardNum;
                myMbarChart.setOption(MbarOption);
            }

        })

        //专利数量 （按年份统计专利数量）
        $.ajax({
            url:userCenterHost + '/usercenter/statisticAuthorizedPatent',
            type:'GET',
            success:function (res) {
                var patentClos=[];
                var patentNum=[];
                if(!res.code){
                    var data=res.data;
                    for(var patent in data){
                        //从时间戳中获取整年
                      /*  var date=new Date(parseInt(patent));
                        var patentYear = date.getFullYear();//获奖年份*/
                        patentClos.push(patent);
                        patentNum.push({value: data[patent],name:patent})
                    }
                }
                else {
                    console.log(res.msg);
                }
                //获取柱状图图表
                var myBarOption = myBarChart.getOption();
                myBarChart.clear();
                myBarOption.legend[0].data=patentClos;
                myBarOption.xAxis[0].data=patentClos;
                myBarOption.series[0].data=patentNum;
                myBarChart.setOption(myBarOption);


            }
        });

        //学缘结构（堆积条形图）；统计不同毕业学习的人员岗位人数统计
        $.ajax({
            url:userCenterHost + '/usercenter/statisticSchool',
            type:'GET',
            success:function (res) {
                var postCateGory=[];
                var schoolCateGory=[];
                var valueYData=[];
                schoolCateGory=res.schools;
                var data=res.factorMap;
                for(var itemType in data){
                    if(!($.inArray(itemType,postCateGory)+1)){
                        postCateGory.push(itemType);
                    }
                    valueYData.push({
                        name:itemType,
                        type:'bar',
                        stack: '学缘结构',
                        itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                        data:data[itemType]
                    })
                }
                //获取堆积条形图图表
                var MlinnerOption = myMLinnerChart.getOption();
                myMLinnerChart.clear();
                MlinnerOption.legend[0].data=postCateGory;
                MlinnerOption.yAxis[0].data=schoolCateGory;
                MlinnerOption.series=valueYData;
                myMLinnerChart.setOption(MlinnerOption);

            }
        });
        /*饼图信息切换*/
        form.on('select(pieStaticChart)',function (data) {
            var pieChart=data.value;
            if(pieChart=='post'){
                //岗位人员分布统计信息
                $.ajax({
                    url:userCenterHost + '/usercenter/statisticJobCategory',
                    type:'GET',
                    success:function (res) {
                        if(!res.code){
                            var data=res.data;
                            var postClos=[];
                            var postStaticNum=[];
                            for(var postCategory in data){
                                postClos.push(postCategory);
                                postStaticNum.push({value: data[postCategory],name:postCategory})
                            }
                            //获取饼图图表
                            var option =myPieChart.getOption();
                            option.series[0].data=postStaticNum;
                            option.legend.data=postClos;
                            option.legend[0].data=postClos;
                            myPieChart.setOption(option);
                        }
                        else{
                            console.log(res.msg);
                        }

                    }
                })
            }
            else if(pieChart=='department'){
                //部门人员分布统计
                $.ajax({
                    url:userCenterHost + '/usercenter/statisticDepartment',
                    type:'GET',
                    success:function (res) {
                        if(!res.code){
                            var data=res.data;
                            var departmentClos=[];
                            var departmentStaticNum=[];
                            for(var department in data){
                                departmentClos.push(department);
                                departmentStaticNum.push({value: data[department],name:department})
                            }
                            //获取饼图图表
                            var option =myPieChart.getOption();
                            myPieChart.clear();
                            option.series[0].data=departmentStaticNum;
                            option.legend.data=departmentClos;
                            option.legend[0].data=departmentClos;
                            myPieChart.setOption(option);
                        }
                        else{
                            console.log(res.msg);
                        }

                    }

                })
            }
            else if(pieChart=='professional'){
                //职称人员分布统计
                $.ajax({
                    url:userCenterHost + '/usercenter/statisticPosition',
                    type:'GET',
                    success:function (res) {
                        if(!res.code){
                            var data=res.data;
                            var professionalClos=[];
                            var professionalStaticNum=[];
                            for(var professional in data){
                                professionalClos.push(professional);
                                professionalStaticNum.push({value: data[professional],name:professional})
                            }
                            //获取饼图图表
                            var option =myPieChart.getOption();
                            myPieChart.clear();
                            option.series[0].data=professionalStaticNum;
                            option.legend.data=professionalClos;
                            option.legend[0].data=professionalClos;
                            myPieChart.setOption(option);
                        }
                        else{
                            alert(res.msg);
                        }


                    }
                })
            }
            else if(pieChart=='HighestProportion'){
                $.ajax({
                    url:userCenterHost + '/usercenter/statisticHighestProportion',
                    type:'GET',
                    success:function (res) {
                        if(!res.code){
                            var data=res.data;
                            var HighestProportionClos=[];
                            var HighestProportionStaticNum=[];
                            for(var HighestProportion in data){
                                HighestProportionClos.push(HighestProportion);
                                HighestProportionStaticNum.push({value: data[HighestProportion],name:HighestProportion})
                            }
                            //获取饼图图表
                            var option =myPieChart.getOption();
                            myPieChart.clear();
                            option.series[0].data=HighestProportionStaticNum;
                            option.legend.data=HighestProportionClos;
                            option.legend[0].data=HighestProportionClos;
                            myPieChart.setOption(option);
                        }
                        else{
                            alert(res.msg);
                        }
                    }

                })
            }
            else if(pieChart=='highestDegree'){
                $.ajax({
                    url:userCenterHost + '/usercenter/statisticHighestDegree',
                    type:'GET',
                    success:function (res) {
                        if(!res.code){
                            var data=res.data;
                            var highestDegreeClos=[];
                            var highestDegreeStaticNum=[];
                            for(var highestDegree in data){
                                highestDegreeClos.push(highestDegree);
                                highestDegreeStaticNum.push({value: data[highestDegree],name:highestDegree})
                            }
                            //获取饼图图表
                            var option =myPieChart.getOption();
                            myPieChart.clear();
                            option.series[0].data=highestDegreeStaticNum;
                            option.legend.data=highestDegreeClos;
                            option.legend[0].data=highestDegreeClos;
                            myPieChart.setOption(option);
                        }

                    }

                })
            }
            else if(pieChart=='articalJcr'){
                $.ajax({
                    url:userCenterHost + '/usercenter/jcr',
                    type:'GET',
                    success:function (res) {
                            var articalJcrClos=[];
                            var articalJcrStaticNum=[];
                            for(var articalJcr in res){
                                articalJcrClos.push(articalJcr);
                                articalJcrStaticNum.push({value: res[articalJcr],name:articalJcr})
                            }
                            //获取饼图图表
                            var option =myPieChart.getOption();
                            myPieChart.clear();
                            option.series[0].data=articalJcrStaticNum;
                            option.legend.data=articalJcrClos;
                            option.legend[0].data=articalJcrClos;
                            myPieChart.setOption(option);
                        }

                })
            }
        });
      /*  堆积柱状图信息切换*/
        form.on('select(MBarStaticChart)',function (data) {
            var MbarChart=data.value;
            if(MbarChart=='eduAward'){
                //获奖信息统计（获奖等级，人数，时间统计）
                var eduAwardCols=[];
                var eduAwardNum=[];
                var eduAwardLevel=[];
                //教学获奖情况 （堆积柱状图）
                $.ajax({
                    url:userCenterHost + '/usercenter/statisticEducationAward',
                    type:'GET',
                    async:false,
                    success:function (res) {
                        eduAwardCols=res.years;
                        var data=res.factorMap;
                        for(var itemType in data){
                            eduAwardLevel.push(itemType)
                            eduAwardNum.push(
                                {
                                    name:itemType,
                                    type:'bar',
                                    data:data[itemType]
                                })
                        }
                        //获取堆积柱状图图表
                        var MbarOption = myMbarChart.getOption();
                        myMbarChart.clear();
                        MbarOption.legend[0].data=eduAwardLevel;
                        MbarOption.xAxis[0].data=eduAwardCols
                        MbarOption.series=eduAwardNum;
                        myMbarChart.setOption(MbarOption);
                    }

                });
            }
            else if(MbarChart=='scienceAward'){
                //获奖信息统计（获奖等级，人数，时间统计）
                var scienceAwardCols=[];
                var scienceAwardNum=[];
                var scienceAwardLevel=[];
                //科研获奖情况（堆积柱状图）
                $.ajax({
                    url:userCenterHost + '/usercenter/statisticResearchAward',
                    type:'GET',
                    success:function (res) {
                        scienceAwardCols=res.years;
                        var data=res.factorMap;
                        for(var itemType in data){
                            scienceAwardLevel.push(itemType)
                            scienceAwardNum.push(
                                {
                                    name:itemType,
                                    type:'bar',
                                    data:data[itemType]
                                })
                        }
                        //获取堆积柱状图图表
                        var MbarOption = myMbarChart.getOption();
                        myMbarChart.clear();
                        MbarOption.legend[0].data=scienceAwardLevel;
                        MbarOption.xAxis[0].data=scienceAwardCols
                        MbarOption.series=scienceAwardNum;
                        myMbarChart.setOption(MbarOption);
                    }

                });

            }
            else if(MbarChart=='eduProject'){
                //项目信息统计（项目等级，人数，时间统计）
                var eduProjectCols=[];
                var eduProjectNum=[];
                //教学项目情况（堆积柱状图）
                $.ajax({
                    url:userCenterHost + '/usercenter/statisticEducationProject',
                    type:'GET',
                    async:false,
                    success:function (res) {
                        eduProjectCols=res.years;
                        var data=res.factorMap;
                        for(var itemType in data){
                            eduProjectNum.push({
                                    name:itemType,
                                    type:'bar',
                                    data:data[itemType]
                                }
                            )
                        }
                        //获取堆积柱状图图表
                        var MbarOption = myMbarChart.getOption();
                        myMbarChart.clear();
                        MbarOption.legend[0].data=['国家级','省部级','厅局级','校级'];
                        MbarOption.xAxis[0].data=eduProjectCols;
                        MbarOption.series=eduProjectNum;
                        myMbarChart.setOption(MbarOption);
                    }

                });
            }
            else if(MbarChart=='scienceProject'){
                //项目信息统计（项目等级，人数，时间统计）
                var scienceProjectCols=[];
                var scienceProjectNum=[];
                var scienceProjectLevel=[];
                //科研项目情况 （堆积柱状图）
                $.ajax({
                    url:userCenterHost + '/usercenter/statisticResearchProject',
                    type:'GET',
                    async:false,
                    success:function (res) {
                        scienceProjectCols=res.years;
                        var data=res.factorMap;
                        for(var itemType in data){
                            scienceProjectLevel.push(itemType)
                            scienceProjectNum.push(
                                {
                                    name:itemType,
                                    type:'bar',
                                    data:data[itemType]
                                })
                        }
                        //获取堆积柱状图图表
                        var MbarOption = myMbarChart.getOption();
                        myMbarChart.clear();
                        MbarOption.legend[0].data=scienceProjectLevel;
                        MbarOption.xAxis[0].data=scienceProjectCols;
                        MbarOption.series=scienceProjectNum;
                        myMbarChart.setOption(MbarOption);
                    }

                });
            }
            else if(MbarChart=='artical'){
                //论文信息统计（当年的影响因子和时间按区间统计）
                var articalCols=[];
                var articalNum=[];
                //发表论文情况情况（堆积柱状图）
                $.ajax({
                    url:userCenterHost + '/usercenter/impactFactor',
                    type:'GET',
                    async:false,
                    success:function (res) {
                        if(res.years){
                            articalCols=res.years
                        }
                        var data=res.factorMap;
                        for(var count in data) {
                            articalNum.push({
                                name: count,
                                type: 'bar',
                                stack:'论文信息',
                                itemStyle: {normal: {label: {show: true, position: 'insideRight'}}},
                                data: data[count]
                            })
                        }
                        //获取堆积柱状图图表
                        var MbarOption = myMbarChart.getOption();
                        myMbarChart.clear();
                        MbarOption.xAxis[0].data=articalCols;
                        MbarOption.series=articalNum;
                        myMbarChart.setOption(MbarOption);
                    }

                });
            }
            else if(MbarChart=='projectMoney'){
                //论文信息统计（当年的影响因子和时间按区间统计）
                var projectMoneyCols=[];
                var projectMoneyNum=[];
                //发表论文情况情况（堆积柱状图）
                $.ajax({
                    url:userCenterHost + '/usercenter/projectMoney',
                    type:'GET',
                    async:false,
                    success:function (res) {
                        if(res.years){
                            projectMoneyCols=res.years
                        }
                        var data=res.factorMap;
                        for(var count in data) {
                            projectMoneyNum.push({
                                name: count,
                                type: 'bar',
                                itemStyle: {normal: {label: {show: true, position: 'insideRight'}}},
                                data: data[count]
                            })
                        }
                        //获取堆积柱状图图表
                        var MbarOption = myMbarChart.getOption();
                        myMbarChart.clear();
                        MbarOption.legend[0].data=['横向课题','纵向课题'];
                        MbarOption.xAxis[0].data=projectMoneyCols;
                        MbarOption.series=projectMoneyNum;
                        myMbarChart.setOption(MbarOption);
                    }

                });
            }
        });
    }),
        e("manage_echart",{})
});


