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
      hour: [],
      amountIn: [], // 发电量
      amountOut: [] // 用电量
    }
  },
  mounted () {
    this.initChart()
    this.getData()
    this.startInterval()
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
            // min: 0,
            // max: 250,
            // interval: 50,
            axisLabel: {
              formatter: '{value}'
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.05)',
                // width: 1,
                // type: 'solid'
              }
            }
          },
          {
            type: 'value',
            // min: 0,
            // max: 25,
            // interval: 5,
            axisLabel: {
              formatter: '{value}'
            },
            splitLine: {
              show: false,
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
            name: '实时发电量',
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
                return value
              }
            }
          },
          {
            name: '实时用电量',
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
                return value
              }
            }
          }
        ]
      }
      
      option && this.myChart.setOption(option)
    },
    getData() {
      axios.get('/cx/cxGfDateElectricIn/getTodayAllAmount').then(result => {
        const res = result.data.data
        this.hour = res.map(item => item.hour)
        this.amountIn = res.map(item => item.amountIn)
        this.amountOut = res.map(item => item.amountOut)
        this.updateChart()
      })
    },
    updateChart() {
      var option = {
        xAxis: {
          data: this.hour
        },
        series: [
          {
            data: this.amountIn
          },
          {
            data: this.amountOut
          }
        ]
      }
      this.myChart.setOption(option)
    },
    startInterval() {
      if(this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        this.getData()
      }, 15*60*1000)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>