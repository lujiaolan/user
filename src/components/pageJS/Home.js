/**
 * Created by Udea-Manager on 2017/4/25.
 */
import IEcharts from 'vue-echarts-v3';
export default {
    components: {
        IEcharts
    },
    data: function () {
        return {
            baseInfo: [],
            line: null,
            pie: null,
            lineXAxisData: [],
            lineData: {
                deposits: [],
                outOfGold: []
            }
        }
    },
    methods: {
        getLineData() {
            const self = this;
            const postData = {
                apId: self.$store.state.domain.domain.domain.apId,
                userId: self.$store.state.user.userinfo._id,
                sortBy: {
                    dayStat: 1
                }
            };
            self.$ajax.post('/statistics/crm/user/outOfGold',postData).then(function (res) {
                console.log('/statistics/crm/user/outOfGold',res);
                if(res.data.retCode === 0){
                    res.data.data.forEach(function (item) {
                        self.lineXAxisData.push(item.dayStat);
                        self.lineData.deposits.push(item.amount.deposits);
                        self.lineData.outOfGold.push(item.amount.outOfGold);
                    })
                }
                // console.log('self.lineXAxisData',self.lineXAxisData);
                // console.log('self.lineData',self.lineData);
            }).catch(function () {
            })
        },
        // Echart前30天日期的显示
        chartDate() {
            var startDate = [];//30天前日期
            var endDate = [];//当前日期
            var xAxisData = [];

            // 30天日期的显示 start
            function fun_date(aa) {
                var date0 = new Date();
                endDate = date0.getFullYear() + "-" + (date0.getMonth() + 1) + "-" + date0.getDate();//当前日期
                date0.setDate(date0.getDate() + aa);
                startDate = date0.getFullYear() + "-" + (date0.getMonth() + 1) + "-" + date0.getDate();//30天前日期
            }

            fun_date(-29);//30天前的日期
            function getDate(datestr) {
                var temp = datestr.split("-");
                var date = new Date(temp[0], temp[1] - 1, temp[2]);
                // console.log(date);
                return date;
            }

            var startTime = getDate(startDate);//30天前日期
            var endTime = getDate(endDate);//当前日期
            while ((endTime.getTime() - startTime.getTime()) >= 0) {
                var year = startTime.getFullYear();
                var month = startTime.getMonth().toString().length == 1 ? "0" + (startTime.getMonth() + 1).toString() : startTime.getMonth();
                var day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
                xAxisData.push(year + "-" + month + "-" + day);
                startTime.setDate(startTime.getDate() + 1);
            }
            //console.log("xAxisData:"+xAxisData);//得出近三十天的日期
            // 30天日期的显示 end
            return xAxisData;
        },
        // 测试图表样式的随机数据
        randomChartData() {
            // Echart图表随机数据 start
            var dataSrc = [];
            for (var j = 0; j < 6; j++) {
                var data = [];
                for (var i = 0; i < 30; i++) {
                    data[i] = Math.random().toFixed(2) * 100;
                }
                dataSrc[j] = data;
            }
            // Echart图表随机数据 end
            return dataSrc;
        },
        drawChartLine() {
            this.getLineData();
            this.line = {
                color: ['#ee1a1a', '#3f93e3'],
                title: {
                    text: '出入金',
                    textStyle: {
                        color: '#3f93e3',
                        fontWeight: 'normal'
                    },
                    padding: [20, 5, 5, 20]
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: [{
                        name: '入金',
                        icon: 'rect'
                    }, {
                        name: '出金',
                        icon: 'rect'
                    }],
                    top: '15',
                    right: '1%',
                    itemHeight: '6',
                    orient: 'vertical',
                    textStyle: {
                        color: '#333'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '4%',
                    containLabel: true
                },
                xAxis: {
                    boundaryGap: true,
                    data: this.lineXAxisData,
                    axisLine: {
                        lineStyle: {
                            color: '#333'
                        }
                    },
                    axisTick: {
                        alignWithLabel: true
                    }
                },
                yAxis: {
                    axisLine: {
                        lineStyle: {
                            color: '#333'
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                series: [
                    {
                        name: '入金',
                        type: 'line',
                        data: this.lineData.deposits
                    },
                    {
                        name: '出金',
                        type: 'line',
                        data: this.lineData.outOfGold
                    }
                ],
                backgroundColor: '#f3f9ff'
            };
        },
        drawChartPie() {
            var xAxisData = this.chartDate();//x轴数据，存储的是近30天的日期
            var dataSrc = this.randomChartData();

            var itemStyle = {
                normal: {},
                emphasis: {
                    barBorderWidth: 1,
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowColor: 'rgba(0,0,0,0.5)'
                }
            };
            var pieLegendData = ["黄金", "加元", "欧元", "港元", "美元", "日元"];
            var pieSeriesData = [];
            for (var i = 0; i < pieLegendData.length; i++) {
                var pieData = {
                    name: pieLegendData[i],
                    type: 'bar',
                    stack: 'one',
                    itemStyle: itemStyle,
                    barWidth: '15',
                    data: dataSrc[i]
                };
                pieSeriesData.push(pieData);
            }
            this.pie = {
                color: ["#ef9037", "#d34747", "#343e57", "#5acbdb", "#2866ab", "#45323a"],
                title: {
                    text: '成交量',
                    textStyle: {
                        color: '#3f93e3',
                        fontWeight: 'normal'
                    },
                    padding: [20, 5, 5, 20]
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} <br/> {c}"
                },
                legend: {
                    data: pieLegendData,
                    align: 'left',
                    top: '15',
                    right: '1%',
                    itemHeight: '6',
                    orient: 'vertical',
                    textStyle: {
                        color: '#333'
                    }
                },
                xAxis: {
                    data: xAxisData,//横坐标显示数据为日期
                    silent: false,
                    axisLine: {
                        lineStyle: {
                            color: '#333'
                        },
                    },
                    axisTick: {
                        alignWithLabel: true,
                    }
                },
                yAxis: {
                    axisLine: {
                        lineStyle: {
                            color: '#333'
                        },
                    },
                    splitLine: {
                        show: false
                    }
                },
                grid: {
                    left: '3%',
                    right: '5%',
                    bottom: '4%',
                    containLabel: true
                },
                series: pieSeriesData,
                backgroundColor: '#f3f9ff'
            }
        },
    },
    mounted() {
        this.drawChartPie();
        this.drawChartLine();
    }
}
