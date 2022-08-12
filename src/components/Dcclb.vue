<template>
<!-- 锂电日充电量 -->
  <div class="dcclb">
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
          // formatter: arg => {
          //   // console.log(arg)
          //   let str = ''
          //     str = arg[0].name + '<br/>' + arg[0].seriesName + '：' + arg[0].value
          //   return str
          // },
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
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
            },
            minInterval: 10,
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
      // const res = await this.$http.get('/cx/cxLdPowerNow/getTodayAllAmount')
      // this.time = res.data.data.map(item => item.time)
      // console.log(this.time);
      // this.time = Object.keys(res.data.data).map(item => parseInt(item))
      
      // this.value = Object.values(res.data.data)
      // console.log(res.data.data);
      // this.value = res.data.data.map(item => item.power)
      this.updateChart()
    },
    updateChart() {
      var option = {
        xAxis: {
          // data: this.time
          data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
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
  }
}
</script>

<style lang="scss" scoped>
</style>