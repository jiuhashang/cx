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
      gfAmount: [],
      cyAmountOut: []
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
        color: ['#73A4F1', '#E59FFF'],
        tooltip: {
          trigger: 'axis',
          // axisPointer: {
          //   type: 'cross',
          //   label: {
          //     backgroundColor: '#6a7985'
          //   }
          // }
        },
        grid: {
          top: '4%',
          left: '2%',
          right: '0%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'time',
            boundaryGap: false,
            splitNumber: 12,
            axisLine: {
              show: true
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              fontSize: 10,
              formatter: '{H}'
            }
          }
        ]
        ,
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.05)',
                // width: 1,
                // type: 'solid'
              }
            }
          }
        ]
        ,
        series: [
          {
            name: '光伏',
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 1,
              color: 'rgb(151, 255, 248)'
            },
            showSymbol: false,
            // label: {
            //   show: false,
            //   position: 'top'
            // },
            // areaStyle: {
            //   opacity: 0.8,
            //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //     {
            //       offset: 0,
            //       color: 'rgba(1, 132, 213, 0.4)'
            //     },
            //     {
            //       offset: 1,
            //       color: 'rgba(1, 132, 213, 0.01)'
            //     }
            //   ])
            // },
            // emphasis: {
            //   focus: 'series'
            // }
          },
          {
            name: '电网',
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 1,
              color: 'rgb(228, 159, 255)'
            },
            showSymbol: false,
            // label: {
            //   show: false,
            //   position: 'top'
            // },
            // areaStyle: {
            //   opacity: 0.8,
            //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //     {
            //       offset: 0,
            //       color: 'rgba(1, 132, 213, 0.4)'
            //     },
            //     {
            //       offset: 1,
            //       color: 'rgba(1, 132, 213, 0.01)'
            //     }
            //   ])
            // },
            // emphasis: {
            //   focus: 'series'
            // }
          }
        ]
      }
      
      option && this.myChart.setOption(option)
    },
    getData() {
      axios.get('/cx/cxGfPowerNow/getTodayAllAmount').then(result => {
        const res = result.data.data
        this.gfAmount = res.map(item => [item.time, item.gfAmount])
        this.cyAmountOut = res.map(item => [item.time, item.cyAmountOut])
        this.updateChart()
      })
    },
    updateChart() {
      var option = {
        series: [
          {
            data: this.gfAmount
          },
          {
            data: this.cyAmountOut
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
      }, 5*60*1000)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>