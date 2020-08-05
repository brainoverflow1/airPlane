<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

const animationDuration = 6000

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
    title: {
      type: String,
      default: ''
    },
    chartData: {
      type: Object,
      required: true
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
      console.log(xAxisData)
      console.log(seriesData)

      this.chart.setOption({
        title: {
          left: 'center',
          bottom: 0,
          text: this.title
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter(params) {
            for (const x in params) {
              return `${params[x].name}：
               满意率：${params[x].data.value};\n
               样本量：${params[x].data.sampleSize}`
            }
          },
          padding: [5, 10]
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
        grid: {
          left: 10,
          right: 10,
          bottom: 50,
          top: 30,
          containLabel: true
        },
        yAxis: [{
          type: 'value',
          scale: true,
          axisTick: {
            show: false
          }
        }],
        xAxis: [{
          type: 'category',
          data: xAxisData,
          axisTick: {
            alignWithLabel: true
          }
        }],
        series: [{
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          label: {
            show: true,
            position: 'top'
          },
          data: seriesData,
          animationDuration
        }]
      })
    }
  }
}
</script>
