<template>
  <div class="dashboard-container">
    <el-form :inline="true" :model="form" class="demo-form-inline">

      <el-form-item label="年">
        <el-select v-model="form.year" multiple filterable placeholder="请选择日期">
          <el-option
            v-for="item in options.year"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="月">
        <el-select v-model="form.month" multiple filterable placeholder="请选择日期">
          <el-option
            v-for="item in options.month"
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
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="chartBox">
      <div class="chartContainer">
        <line-chart v-if="allData.quarter" :chart-data="allData.quarter" />
      </div>
      <div class="chartContainer">
        <BarStackChart v-if="stackData" :chart-data="stackData" title="餐饮满意度" />
      </div>
      <div class="chartContainerBlock">
        <bar-chart v-if="allData.o_dissat" :chart-data="allData.o_dissat" title="不满意因素" />
      </div>
      <div class="chartContainer">
        <bar-chart v-if="allData.o_age" :chart-data="allData.o_age" title="各年龄段满意度" />
      </div>
      <div class="chartContainer">
        <bar-chart v-if="allData.o_sex" :chart-data="allData.o_sex" title="性别满意度" />
      </div>
      <div class="chartContainer">
        <bar-chart v-if="allData.o_member" :chart-data="allData.o_member" title="会员满意度" />
      </div>
      <div class="chartContainer">
        <bar-chart v-if="allData.o_country" :chart-data="allData.o_country" title="国籍满意度" />
      </div>
      <div class="chartContainer">
        <bar-chart v-if="allData.o_purpose" :chart-data="allData.o_purpose" title="出行目的满意度" />
      </div>
      <div class="chartContainer">
        <bar-chart v-if="allData.o_card" :chart-data="allData.o_card" title="卡别满意度" />
      </div>

    </div>
    <div class="tableTitle">旅客评论</div>
    <infiniteTable v-if="tableData&&tableData.list&&tableData.list.length>0" ref="infiniteTable" main-height="500px" :main-data="tableData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from './BarChart'
import BarStackChart from './BarStackChart'
import LineChart from './LineChart'
import { getOcssList, getOcssOptions } from '@/api/main'
import infiniteTable from './infiniteTable'
export default {
  name: 'Dashboard',
  components: {
    BarChart,
    LineChart,
    BarStackChart,
    infiniteTable
  },
  data() {
    return {
      stackData: {},
      tableData: {},
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
        class: '',
        arilinecategory: '',
        depart: '',
        arrive: '',
        airline: '',
        agent: ''
      },
      options: {
        class: [],
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
    this.getOptions()
  },
  methods: {
    getOptions() {
      getOcssOptions().then(res => {
        this.options = res
        this.form.year = [this.options.year[0]]
        this.onSubmit()
        console.log(res)
      })
    },
    getList(data) {
      getOcssList(data).then(res => {
        this.allData = res
        this.stackData = {
          '全舱': this.allData.o_total,
          '经济舱': this.allData.o_ytotal,
          '两舱': this.allData.o_fctotal
        }
        this.tableData = {}

        this.$set(this.tableData, 'list', JSON.parse(JSON.stringify(this.allData.o_comment)))
        // this.tableData = { list: this.allData.o_comment }
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
  .tableTitle{
    margin: 30px 0;
    font-size: 20px;
    color: #509FEF;
    font-weight: bold;
  }
</style>
