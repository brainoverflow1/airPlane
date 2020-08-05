<template>
  <div class="dashboard-container">
    <el-form :inline="true" :model="form" class="demo-form-inline">

      <el-form-item label="年">
        <el-select v-model="form.year" multiple filterable placeholder="请选择区域">
          <el-option
            v-for="item in options.year"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="月">
        <el-select v-model="form.month" multiple filterable placeholder="请选择区域">
          <el-option
            v-for="item in options.month"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="日">
        <el-select v-model="form.day" multiple filterable placeholder="请选择区域">
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
        <el-select v-model="form.agent" multiple filterable placeholder="请选择区域">
          <el-option
            v-for="item in options.agent"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="chartBox">
      <div class="chartContainerBlock">
        <line-chart :chart-data="month" />
      </div>
      <div class="chartContainer">
        <bar-chart :chart-data="total" title="餐饮满意率" />
      </div>
      <div class="chartContainer">
        <bar-chart :chart-data="total_fc" title="两舱餐饮满意率" />
      </div>
      <div class="chartContainer">
        <bar-chart :chart-data="total_y" title="经济舱餐饮满意率" />
      </div>
      <div class="chartContainer">
        <bar-chart :chart-data="foodCategoryFc" title="两舱餐别满意率" />
      </div>
      <div class="chartContainerBlock">
        <bar-chart :chart-data="food_category_y" title="经济舱餐别满意率" />
      </div>
      <div class="chartContainer">
        <bar-chart :chart-data="purpose" title="出行目的满意率" />
      </div>
      <div class="chartContainer">
        <bar-chart :chart-data="card" title="卡别满意率" />
      </div>
      <div class="chartContainer">
        <bar-chart :chart-data="sex" title="性别满意率" />
      </div>
    </div>
    <el-table
      v-if="false"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="airline"
        label="航班号"
        width="180"
      />
      <el-table-column
        prop="arilineCN"
        label="航程中文"
        width="180"
      />
      <el-table-column
        prop="outside"
        label="餐食的外观意见"
        width="180"
      />
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from './BarChart'
import LineChart from './LineChart'
import { getList, getOptions } from '@/api/main'
export default {
  name: 'Dashboard',
  components: {
    BarChart,
    LineChart
  },
  data() {
    return {
      allData: {},
      month: {},
      total: {},
      total_fc: {},
      total_y: {},
      purpose: {},
      sex: {},
      card: {},
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
      options: {
        agent: [],
        airline: [],
        area: [],
        arilinecategory: [],
        arrive: [],
        day: [],
        depart: [],
        month: [],
        year: []
      },
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
    this.getList()
    this.getOptions()
  },
  methods: {
    getOptions() {
      getOptions().then(res => {
        this.options = res
        console.log(res)
      })
    },
    getList(data) {
      getList(data).then(res => {
        this.allData = res
        this.month = this.allData.month
        this.total = this.allData.total
        this.total_fc = this.allData.total_fc
        this.total_y = this.allData.total_fc
        this.foodCategoryFc = this.allData.food_category_fc
        this.food_category_y = this.allData.food_category_y
        this.purpose = this.allData.purpose
        this.card = this.allData.card
        this.sex = this.allData.sex
        console.log(res)
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
    width: 90%;
  }
</style>
