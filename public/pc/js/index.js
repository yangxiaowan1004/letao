/**
 * Created by yangxiaowan on 2018/3/4.
 */
$(function(){

    var myChart1 = echarts.init(document.querySelector(".bar"));
    var myChart2 = echarts.init(document.querySelector(".pie"));

    var option1 = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [569, 888, 1099,660, 290, 699,400]
        }]
    };
    var option2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['苹果','oppo','华为','vivo','小米','三星']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:999, name:'苹果'},
                    {value:610, name:'oppo'},
                    {value:1234, name:'华为'},
                    {value:1560, name:'vivo'},
                    {value:1048, name:'小米'},
                    {value:748, name:'三星'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    myChart1.setOption(option1);
    myChart2.setOption(option2);


})