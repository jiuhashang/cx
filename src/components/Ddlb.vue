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
      value1: [],
      value2: []
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
              show: false,
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
              show: false,
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
    async getData() {
      const result1 = await this.$http.get('/cx/cxLdDateElectricIn/getTodayAllAmount')
      const result2 = await this.$http.get('/cx/cxLdDateElectricOut/getTodayAllAmount')
      const res1 = result1.data.data
      this.value1 = res1.map(item => item.amount)
      const res2 = result2.data.data
      this.time = res2.map(item => item.hour)
      this.value2 = res2.map(item => item.amount)
      this.updateChart()
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
      }, 5*60*1000)
    }
  },
  computed: {
    value() {
      let value = []
      for(let i = 0; i < this.value1.length; i++) {
        if(this.value1[i] === null) {
          value.push(null)
        } else {
          value.push(this.value2[i] - this.value1[i])
        }
      }
      return value
    }
  }
}
</script>

<style lang="scss" scoped>
</style>