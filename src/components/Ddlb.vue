<template>
<!-- 锂电--月充/放电量 -->
  <div class="ddlb">
    <div style="width: 428px; height: 172px;" ref="dcclb_ref"></div>
    <div class="count">
      <span>{{ yfdl.toFixed(2)}}</span>
      <span style="margin: 0 5px;">/</span>
      <span>{{ ycdl.toFixed(2) }}</span>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      myChart: null,
      yfdl: 0,
      ycdl: 0,
      time: [],
      amountOut: [], // 放电
      amountIn: [] // 充电
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
        color: ['#B4F494', '#AB70C8'],
        tooltip: {
          trigger: 'axis',
          // axisPointer: {
            // alwaysShowContent: true
            // type: 'cross',
            // label: {
            //   backgroundColor: '#6a7985'
            // }
          // }
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
              show: true,
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
            name: '日放电量',
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 1,
              color: 'rgb(180, 244, 148)'
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(180, 244, 148, 0.4)'
                },
                {
                  offset: 1,
                  color: 'rgba(180, 244, 148, 0.01)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            }
          },
          {
            name: '日充电量',
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 1,
              color: 'rgb(171, 112, 200)'
            },
            showSymbol: false,
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
      const result = await this.$http.get('/cx/cxLdDateElectricIn/getThisMonthAllDayAmount')
      const res = result.data.data
      this.time = res.map(item => item.day)
      this.amountOut = res.map(item => item.amountOut)
      this.yfdl = this.amountOut.filter(item => item != null).pop()
      this.amountIn = res.map(item => item.amountIn)
      this.ycdl = -this.amountIn.filter(item => item != null).pop()
      this.updateChart()
    },
    updateChart() {
      var option = {
        xAxis: {
          data: this.time
        },
        series: [
          {
            data: this.amountOut
          },
          {
            data: this.amountIn
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
.ddlb {
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