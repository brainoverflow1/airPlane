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
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      title: ''
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val.data)
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
      this.title = this.chartData.name
      this.chartData.data && this.setOptions(this.chartData.data)
    },
    setOptions(data) {
      const xAxisData = []
      const series = []
      const legendData = Object.keys(data)
      console.log('params::::::::::::::::data', data)
      for (const key in Object.values(data)[0]) {
        xAxisData.push(key)
      }
      for (const category in data) {
        const categorySeriesData = []
        const categoryVal = data[category]
        for (const key in categoryVal) {
          categorySeriesData.push({ sampleSize: categoryVal[key].sample_size, value: categoryVal[key].score })
        }
        const categoryData = {
          name: category,
          smooth: false,
          type: 'line',
          label: {
            show: true,
            position: 'top'
          },
          itemStyle: {
            normal: {
              // color: '#3888fa',
              lineStyle: {
                // color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: categorySeriesData.reverse(),
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }
        series.push(categoryData)
      }
      this.chart.setOption({
        title: {
          left: 'center',
          bottom: 0,
          text: this.title
        },
        legend: {
          data: legendData
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
            console.log('params::::::::::::::::', params)
            let data = ``
            for (const x in params) {
              data += `${params[x].seriesName}：
               满意率：${params[x].data.value};
               样本量：${params[x].data.sampleSize} \n `
              data += ' <br/> '
            }
            return data
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
        series: series
      })
    }
  }
}
</script>
