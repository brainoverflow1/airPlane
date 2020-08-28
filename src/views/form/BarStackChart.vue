<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {

  props: {
    barColor: {
      type: String,
      default: '#509FEF'
    },
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
      let seriesData = []
      const yiban = {
        name: '一般',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideTop'
        },
        itemStyle: {
          normal: {
            color: '#F1C541',
            lineStyle: {
              color: '#F1C541',
              width: 2
            },
            areaStyle: {
              color: '#F1C541'
            }
          }
        },
        data: []
      }
      const manyi = {
        name: '满意',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideTop'
        },
        itemStyle: {
          normal: {
            color: '#5CB87A',
            lineStyle: {
              color: '#5CB87A',
              width: 2
            },
            areaStyle: {
              color: '#5CB87A'
            }
          }
        },
        data: []
      }
      const bumanyi = {
        name: '不满意',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'insideTop'
        },
        itemStyle: {
          normal: {
            color: '#F56C6C',
            lineStyle: {
              color: '#F56C6C',
              width: 2
            },
            areaStyle: {
              color: '#F56C6C'
            }
          }
        },
        data: []
      }
      for (const key in data) {
        xAxisData.push(key)
        for (const subItem in data[key]) {
          if (yiban.name === subItem) {
            yiban.data.push({ sampleSize: data[key][subItem].sample_size, value: data[key][subItem].score })
          }
          if (manyi.name === subItem) {
            manyi.data.push({ sampleSize: data[key][subItem].sample_size, value: data[key][subItem].score })
          }
          if (bumanyi.name === subItem) {
            bumanyi.data.push({ sampleSize: data[key][subItem].sample_size, value: data[key][subItem].score })
          }
        }

        seriesData = [manyi, yiban, bumanyi]

        this.chart.setOption({
          title: {
            left: 'center',
            bottom: 0,
            text: this.title
          },
          legend: {
            data: ['满意', '一般', '不满意']
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            formatter(params) {
              let text = `样本量：${params[0].data.sampleSize};`
              for (const x in params) {
                text += `<br />${params[x].seriesName}：
               ${params[x].data.value}%;\n`
              }
              return text
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
          series: seriesData
        })
      }
    }
  }
}
</script>
