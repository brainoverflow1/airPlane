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
      const series = []
      const legendData = Object.keys(data)
      for (const key in Object.values(data)[0]) {
        xAxisData.push(key)
      }
      for (const category in data) {
        if (category === '样本量' || category === '占比') {
          continue
        }
        const categorySeriesData = []
        const categoryVal = data[category]

        for (const key in categoryVal) {
          categorySeriesData.push({ sampleSize: data['样本量'][key], proportion: data['占比'] ? data['占比'][key] : '', value: categoryVal[key] })
        }

        const categoryData = {
          name: category,
          smooth: false,
          type: 'bar',
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
          boundaryGap: ['15px', '15px'],
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
               样本量：${params[x].data.sampleSize};
               ${params[x].data.proportion && '占比：' + params[x].data.proportion}
                `
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
