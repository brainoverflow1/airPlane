<template>
  <div class="dashboard-container">
    <el-form :inline="true" :model="form" class="demo-form-inline">

      <el-form-item v-for="option in options" :key="option.id" :label="option.name">
        <el-select
          v-if="option.id!=='content'"
          v-model="form[option.id]"
          :clearable="true"
          multiple
          filterable
          :placeholder="option.placeholder"
          @change="$forceUpdate()"
        >
          <el-option
            v-for="item in option.data"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-input
          v-else
          v-model="form[option.id]"
          :clearable="true"
          :placeholder="option.placeholder"
        />
      </el-form-item>
      <!-- <el-form-item label="航班号">
        <el-select v-model="form.airline" multiple filterable placeholder="请选择航班">
          <el-option
            v-for="item in options.airline"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="舱位">
        <el-select v-model="form.class" multiple filterable placeholder="请选择舱位">
          <el-option
            v-for="item in options.class"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="出港">
        <el-select v-model="form.depart" multiple filterable placeholder="请选择港口">
          <el-option
            v-for="item in options.depart"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="进港">
        <el-select v-model="form.arrive" multiple filterable placeholder="请选择港口">
          <el-option
            v-for="item in options.arrive"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div v-if="positive_ratio&&positive_ratio.data" class="tableTitle1">{{ `${positive_ratio.name}：${positive_ratio.data.score} ` }}</div>

    <div class="chartContainerBlock">
      <line-chart v-if="allData.positive_ratio_trend&&allData.positive_ratio_trend.data" :title="allData.positive_ratio_trend.name" :chart-data="allData.positive_ratio_trend.data" />
    </div>

    <div class="tableTitle">{{ tableTitle }}</div>
    <infiniteTable v-if="tableData&&tableData.list&&tableData.list.length>0" ref="infiniteTable" main-height="500px" :main-data="tableData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getThirdList, getThirdOptions } from '@/api/main'
import infiniteTable from './infiniteTable'
import LineChart from './LineChart'
export default {
  name: 'Dashboard',
  components: {
    infiniteTable,
    LineChart
  },
  data() {
    return {
      tableTitle: '',
      tableData: {},
      allData: {},
      positive_ratio: {},
      form: {
      },
      options: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getOptions()
  },
  methods: {
    getOptions() {
      getThirdOptions().then(res => {
        this.options = res
        const data = this.options.filter(data => data.id === 'month')[0]
        console.log(data)
        this.form.month = [data.data[0]]
        this.onSubmit()
        console.log(res)
      })
    },
    getList(data) {
      getThirdList(data).then(res => {
        this.allData = res
        this.positive_ratio = this.allData.positive_ratio || { data: {}}
        this.tableData = {}
        this.tableTitle = this.allData.comment.name
        this.$set(this.tableData, 'list', JSON.parse(JSON.stringify(this.allData.comment.data)))
        // this.tableData = { list: this.allData.o_comment }
      })
    },
    onSubmit() {
      const data = {}
      for (const item in this.form) {
        data[item] = (Array.isArray(this.form[item])) ? (this.form[item] && this.form[item].length > 0) ? this.form[item].join(',') : undefined : (this.form[item] || undefined)
      }
      this.getList(data)
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }

}
 .chartBox{
    margin-top: 60px;
  }
.chartContainer{
  margin-bottom: 50px;
  margin-left: 30px;
    width: 45%;
    display: inline-block;
  }
  .chartContainerBlock{
     margin-bottom: 50px;
    margin-left: 30px;
    text-align: center;
    width: 90%;
  }
  .totalChart{
    display: inline-block;
  }
  .tableTitle1{
    margin: 30px 0;
    font-size: 36px;
    color: #0ce216be;
    font-weight: bold;
  }
  .tableTitle{
    margin: 30px 0;
    font-size: 20px;
    color: #509FEF;
    font-weight: bold;
  }
</style>
