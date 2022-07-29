<template>
<!-- 实时电量 -->
  <div class="ele">
    <div style="width: 909px; height: 172px;" ref="ele_ref"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      myChart: null,
      time: [],
      power: []
    }
  },
  mounted () {
    this.initChart()
    // this.getList()
    // this.startInterval()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(this.$refs.ele_ref)
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        grid: {
          top: '4%',
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisPointer: {
              type: 'shadow'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value}'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.05)',
                // width: 1,
                // type: 'solid'
              }
            }
          },
          {
            type: 'value',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value}'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.05)',
                // width: 1,
                // type: 'solid'
              }
            }
          }
        ],
        series: [
          {
            name: 'Evaporation',
            type: 'bar',
            barWidth: '30%',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(2, 167, 253)'
                },
                {
                  offset: 1,
                  color: 'rgb(5, 27, 67)'
                }
              ])
            },
            tooltip: {
              valueFormatter: function (value) {
                return value + ' ml';
              }
            },
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
            ]
          },
          {
            name: 'Temperature',
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 2,
              color: 'rgb(229, 159, 255)'
            },
            showSymbol: false,
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + ' °C';
              }
            },
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      }
      
      option && this.myChart.setOption(option)
    },
    // getList() {
    //   axios.post('/cdz/getChargeCount').then(result => {
    //     const res = result.data.data
    //     this.time = res.map(item => item.hour + '点').reverse()
    //     this.power = res.map(item => item.electric).reverse()
    //     this.updateChart()
    //   })
    // },
    // updateChart() {
    //   var option = {
    //     xAxis: {
    //       data: this.time
    //     },
    //     series: [
    //       {
    //         data: this.power
    //       }
    //     ]
    //   }
    //   this.myChart.setOption(option)
    // },
    // startInterval() {
    //   if(this.timer) {
    //     clearInterval(this.timer)
    //   }
    //   this.timer = setInterval(() => {
    //     this.getList()
    //   }, 15*60*1000)
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>