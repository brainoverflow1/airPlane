<template>
  <div class="dashboard-container">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item v-for="option in options" :key="option.id" :label="option.name">
        <el-select v-model="form[option.id]" :clearable="true" multiple filterable :placeholder="option.placeholder">
          <el-option
            v-for="item in option.data"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="年-月">
        <el-select v-model="form.year" multiple filterable placeholder="请选择日期">
          <el-option
            v-for="item in options.year"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="日">
        <el-select v-model="form.day" multiple filterable placeholder="请选择日期">
          <el-option
            v-for="item in options.day"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="航班号">
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
        <el-select v-model="form.month" multiple filterable placeholder="请选择舱位">
          <el-option
            v-for="item in options.month"
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
      </el-form-item>
      <el-form-item label="航线分类">
        <el-select v-model="form.arilinecategory" multiple filterable placeholder="请选择分类">
          <el-option
            v-for="item in options.arilinecategory"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="区域化">
        <el-select v-model="form.area" multiple filterable placeholder="请选择区域">
          <el-option
            v-for="item in options.area"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="配餐代理人">
        <el-select v-model="form.agent" multiple filterable placeholder="请选择配餐代理人">
          <el-option
            v-for="item in options.agent"
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
    <div class="chartBox">
      <div class="chartContainerBlock">
        <line-chart v-if="month.data" :chart-data="month" />
      </div>
      <div class="chartContainerBlock">
        <bar-chart v-if="total.data" :chart-data="total.data" class-name="totalChart" width="75%" :title="total.name" />
      </div>
      <div class="chartContainer">
        <bar-chart v-if="total_fc.data" :chart-data="total_fc.data" bar-color="#F56C6C" :title="total_fc.name" />
      </div>
      <div class="chartContainer">
        <bar-chart v-if="total_y.data" :chart-data="total_y.data" :title="total_y.name" />
      </div>
      <div class="chartContainer">
        <DatasetBarChart v-if="foodCategoryFc.data" :chart-data="foodCategoryFc.data" bar-color="#F56C6C" :title="foodCategoryFc.name" />
      </div>
      <div class="chartContainer">
        <DatasetBarChart v-if="food_category_y.data" :chart-data="food_category_y.data" :title="food_category_y.name" />
      </div>
      <div class="chartContainer">
        <DatasetBarChart v-if="purpose.data" :chart-data="purpose.data" :title="purpose.name" />
      </div>
      <div class="chartContainer">
        <DatasetBarChart v-if="card.data" :chart-data="card.data" :title="card.name" />
      </div>
      <div class="chartContainer">
        <DatasetBarChart v-if="sex.data" :chart-data="sex.data" :title="sex.name" />
      </div>
      <div class="chartContainer">
        <DatasetBarChart v-if="age.data" :chart-data="age.data" :title="age.name" />
      </div>
      <div class="chartContainerBlock">
        <DatasetBarChart v-if="native.data" :chart-data="native.data" :title="native.name" />
      </div>
    </div>
    <div class="tableTitle">{{ lineTableTitle }}</div>
    <infiniteTable v-if="lineTableData&&lineTableData.list&&lineTableData.list.length>0" main-height="500px" :main-data="lineTableData" />

    <div class="tableTitle">{{ tableTitle }}</div>
    <infiniteTable v-if="tableData&&tableData.list&&tableData.list.length>0" main-height="500px" :main-data="tableData" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from './BarChart'
import DatasetBarChart from './DatasetBarChart'

import LineChart from './LineChart'
import { getList, getOptions } from '@/api/main'
import infiniteTable from './infiniteTable'
export default {
  name: 'Dashboard',
  components: {
    BarChart,
    LineChart,
    DatasetBarChart,
    infiniteTable
  },
  data() {
    return {
      lineTableTitle: '',
      lineTableData: {},
      tableTitle: '',
      tableData: {},
      allData: {},
      month: {},
      total: {},
      total_fc: {},
      total_y: {},
      purpose: {},
      sex: {},
      card: {},
      age: {},
      native: {},
      foodCategoryFc: {},
      food_category_y: {},
      lineChartData: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145]
      },
      form: {
        day: '',
        month: '',
        year: '',
        area: '',
        arilinecategory: '',
        depart: '',
        arrive: '',
        airline: '',
        agent: ''
      },
      options: [],
      areaOptions: [
        { value: 'us', label: '美洲' },
        { value: 'as', label: '亚洲' }
      ],
      airlineOptions: [
        { value: 'us', label: '美加航线' },
        { value: 'as', label: '中印航线' }
      ],
      departOptions: [
        { value: 'us', label: '洛杉矶' },
        { value: 'as', label: '北京' }
      ],
      inboundOptions: [
        { value: 'us', label: '洛杉矶' },
        { value: 'as', label: '北京' }
      ],
      numberOptions: [
        { value: 'CA931', label: 'CA931' },
        { value: 'CA932', label: 'CA932' }
      ]
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
      getOptions().then(res => {
        this.options = res
        const data = this.options.filter(data => data.id === 'month')[0]
        console.log(data)
        this.form.month = [data.data[0]]
        // this.form.year = [this.options.year[0]]
        this.onSubmit()
        console.log(res)
      })
    },
    getList(data) {
      getList(data).then(res => {
        this.allData = res
        this.month = this.allData.month || []
        this.total = this.allData.total
        this.total_fc = this.allData.total_fc
        this.total_y = this.allData.total_y
        this.foodCategoryFc = this.allData.food_category_fc
        this.food_category_y = this.allData.food_category_y
        this.purpose = this.allData.purpose
        this.card = this.allData.card
        this.sex = this.allData.sex
        this.age = this.allData.age
        this.native = this.allData.native
        this.tableData = {}
        this.tableTitle = this.allData.opinion.name
        this.$set(this.tableData, 'list', JSON.parse(JSON.stringify(this.allData.opinion.data)))
        this.lineTableData = {}
        this.lineTableTitle = this.allData.line.name
        this.$set(this.lineTableData, 'list', JSON.parse(JSON.stringify(this.allData.line.data)))
      })
    },
    onSubmit() {
      const data = {}
      for (const item in this.form) {
        data[item] = (this.form[item] && this.form[item].length > 0) ? this.form[item].join(',') : undefined
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
  margin-left: 30px;
    width: 45%;
    display: inline-block;
  }
  .chartContainerBlock{
    margin-left: 30px;
    text-align: center;
    width: 90%;
  }
  .totalChart{
    display: inline-block;
  }
  .tableTitle{
    margin: 30px 0;
    font-size: 20px;
    color: #509FEF;
    font-weight: bold;
  }
</style>
