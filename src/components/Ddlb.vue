<template>
<!-- 锂电日放电量 -->
  <div class="ddlb">
    <div style="width: 428px; height: 172px;" ref="dcclb_ref"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      myChart: null,
      time: [],
      value: []
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
      this.myChart = echarts.init(this.$refs.dcclb_ref)
      var option = {
        color: ['#80FFA5'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          top: '4%',
          left: '3%',
          right: '2%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              fontSize: 10
            }
          }
        ],
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
        ],
        series: [
          {
            name: '电量',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 1,
              color: 'rgb(171, 112, 200)'
            },
            showSymbol: false,
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(143, 101, 164, 0.4)'
                },
                {
                  offset: 1,
                  color: 'rgba(143, 101, 164, 0.01)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            }
          }
        ]
      }
      
      option && this.myChart.setOption(option)
    },
    getData() {
      this.$http.get('/cx/cxLdDateElectricOut/getTodayAllAmount').then(result => {
        const res = result.data.data
        this.time = res.map(item => item.hour)
        this.value = res.map(item => item.amount)
        this.updateChart()
      })
    },
    updateChart() {
      var option = {
        xAxis: {
          data: this.time
        },
        series: [
          {
            data: this.value
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