//1.图表的resize()方法在除图表等其他组件上是否适用
// 2.移动端适配问题
// 3.怎么将数据和图表分开

window.onload = function(){

    // 造数据
    function getData(length,num){
        let arr = [];
        for(let i=0;i<(length);i++){
            arr.push(Math.round(Math.random()*num));
        }
        return arr;
    }

    // 柱状图
    let barArr = [];
    // 饼图
    let pieArr = [];
    // 线形图
    let lineArr = [];
    (function(){
        barArr = getData(6,800);
        pieArr = getData(5,10000)
        lineArr = getData(7,40000);
    }());

    // 定时器调用
    this.setInterval(function(){
        barArr = getData(6,800);
        pieArr = getData(5,10000)
        lineArr = getData(7,40000)
        createCharts(barArr,pieArr,lineArr);
    },2000);

    
    // 创建图表方法
    function createCharts(barArr,pieArr,lineArr){
        // 柱状图
        // 1.初始化
        let barChart = echarts.init(document.querySelector('.barChart'));

        // 2.配置项
        let barOption = {
            title:{
                // text:'图表展示'
            },
            tooltip:{
                show:false
            },
            legend:{
                left:12,
                top:10,
                textStyle:{
                    fontSize:12,
                    color:'#fff'
                },
                data:['类型']
            },
            grid:{//控制图表大小，不同图表控制大小的组件不一样
                top:'30%',
                right:16,
                bottom:'15%'
            },
            xAxis: {
                axisLine:{
                    lineStyle:{
                        color:'#CCCCCC'
                    }
                },
                data: ["h5","js","css3","php","node","vue"]
            },
            yAxis: {
                axisLine:{
                    lineStyle:{
                        color:'#CCCCCC'
                    }
                }
            },
            series: [{
                name: '类型',
                type: 'bar',
                itemStyle:{
                    color:'#91c7ae',
                    
                },
                data: barArr
            }]
        };

        // 3.设置
        barChart.setOption(barOption);
        // end


        // 饼图 begin
        let pieChart = echarts.init(document.querySelector('.pieChart'));

        let pieOption = {
            title: {
                show:false
                // text: '某站点用户访问来源',
                // subtext: '纯属虚构',
                // left: 'center'
            },
            tooltip: {
                show:false,
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                // 图例布局朝向
                orient: 'horizontal',
                bottom: 'bottom',
                textStyle:{
                    fontSize:12,
                    color:'#fff'
                },
                data: ['程序员', '设计师', '律师', '公务员', '销售']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['46%', '40%'],//饼图位置调整
                    data: [
                        {value: pieArr[0], name: '程序员'},
                        {value: pieArr[1], name: '设计师'},
                        {value: pieArr[2], name: '律师'},
                        {value: pieArr[3], name: '公务员'},
                        {value: pieArr[4], name: '销售'}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        
        pieChart.setOption(pieOption);
        // end

        // 线形图 begin
        let lineChart = echarts.init(document.querySelector('.lineChart'));

        let lineOption = {
            tooltip:{
                show:false
            },
            grid:{//控制图表大小，不同图表控制大小的组件不一样
                left:'14%',
                top:'20%',
                right:25,
                bottom:'15%'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLine:{
                    lineStyle:{
                        color:'#CCCCCC'
                    }
                },
                data: ['程序员', '公务员', '律师', '设计师', '新媒体', '销售', '直播']
            },
            yAxis: {
                type: 'value',
                axisLine:{
                    lineStyle:{
                        color:'#CCCCCC'
                    }
                }
            },
            series: [{
                data: lineArr,
                type: 'line',
                itemStyle:{
                    color:'#91c7ae',
                },
                areaStyle: {}
            }]
        };

        lineChart.setOption(lineOption);

        // end


        // 自适应
        window.onresize = function(){
            barChart.resize();
            pieChart.resize();
            lineChart.resize();
        }
    }
}