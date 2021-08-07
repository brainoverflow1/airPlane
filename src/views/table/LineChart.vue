<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '好评率变化趋势'
    },
    chartData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions(data) {
      const xAxisData = []
      const seriesData = []
      for (const key in data) {
        xAxisData.push(key)
        seriesData.push({ sampleSize: data[key].sample_size, value: data[key].score })
      }
      this.chart.setOption({
        title: {
          left: 'center',
          bottom: 0,
          text: this.title
        },
        xAxis: {
          data: xAxisData.reverse(),
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 50,
          right: 50,
          bottom: 50,
          top: 30,
          containLabel: true
        },
        toolbox: {
          show: true,
          top: 0,
          right: 0,
          feature: {
            mark: {
              show: true
            },
            dataView: { show: true, readOnly: false },
            // magicType: { type: ['line', 'bar'] },
            // restore: {},
            saveAsImage: {}
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter(params) {
            for (const x in params) {
              return `${params[x].name}：
               满意度：${params[x].data.value};\n
               样本量：${params[x].data.sampleSize}`
            }
          },
          padding: [5, 10]
        },
        yAxis: [{
          type: 'value',
          scale: true,
          boundaryGap: true,
          axisTick: {
            show: false
          }
        }],
        series: [
          {
            name: '满意度',
            smooth: false,
            type: 'line',
            label: {
              show: true,
              position: 'top'
            },
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
            data: seriesData.reverse(),
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }]
      })
    }
  }
}
</script>
