<template>
<!-- 锂电--充/放电功率 -->
  <div class="dcclb">
    <div style="width: 428px; height: 172px;" ref="dcclb_ref"></div>
    <div class="count">
      <span>{{ rfd.toFixed(2)}}</span>
      <span style="margin: 0 5px;">/</span>
      <span>{{ rcd.toFixed(2) }}</span>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Dcclb',
  data() {
    return {
      myChart: null,
      rfd: 0,
      rcd: 0,
      contentData: []
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
          // axisPointer: {
          //   type: 'cross',
          //   label: {
          //     backgroundColor: '#6a7985'
          //   }
          // }
        },
        grid: {
          top: '4%',
          left: '4%',
          right: '2%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'time',
            boundaryGap: false,
            splitNumber: 12,
            // minInterval: 1,
            // maxInterval: 3600 * 24 * 1000,
            axisLine: {
              show: true
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              fontSize: 10,
              formatter: '{H}'
            },
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
            name: '功率',
            type: 'line',
            // stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 1,
              color: 'rgb(119, 153, 193)'
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
                  color: 'rgba(1, 132, 213, 0.4)'
                },
                {
                  offset: 1,
                  color: 'rgba(1, 132, 213, 0.01)'
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
      const res = await this.$http.get('/cx/cxLdPowerNow/getTodayAllAmount')
      const result = res.data.data
      this.contentData = result.map(item => [item.time, item.power])

      const res1 = await this.$http.get('/cx/cxLdPowerNow/getNearPower2')
      const power = res1.data.data
      if(power > 0) {
        this.rfd = power
      } else if(power < 0) {
        this.rcd = -power
      }

      this.updateChart()
    },
    updateChart() {
      var option = {
        series: [
          {
            data: this.contentData
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
.dcclb {
  position: relative;
  .count {
    position: absolute;
    top: -38px;
    right: 8px;
    font-size: 18px;
    color: #fff;
    font-family: monoMMM-5-1;
  }
}
</style>