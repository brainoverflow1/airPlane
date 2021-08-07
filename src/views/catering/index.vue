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

    <div class="tableTitle">{{ tableTitle }}</div>
    <infiniteTable
      v-if="tableData&&tableData.list&&tableData.list.length>0"
      ref="infiniteTable"
      main-height="100px"
      :main-data="tableData"
    />
    <el-row :gutter="50">
      <el-col :span="12">
        <div class="tableTitle">{{ tableTitle1 }}</div>
        <infiniteTable
          v-if="tableData1&&tableData1.list&&tableData1.list.length>0"
          ref="infiniteTable"
          main-height="400px"
          :main-data="tableData1"
        />
      </el-col>
      <el-col :span="12">
        <div class="tableTitle">{{ tableTitle2 }}</div>
        <infiniteTable
          v-if="tableData2&&tableData2.list&&tableData2.list.length>0"
          ref="infiniteTable"
          main-height="400px"
          :main-data="tableData2"
        />
      </el-col>
    </el-row>

    <div class="tableTitle">{{ tableTitle3 }}</div>
    <infiniteTable
      v-if="tableData3&&tableData3.list&&tableData3.list.length>0"
      ref="infiniteTable"
      main-height="500px"
      :main-data="tableData3"
    />
    <br>
    <br>
    <br>
    <div class="tableTitle1">{{ `${cabin_food.name}：${cabin_food.data.score} ` }}</div>

    <el-row :gutter="50">
      <el-col :span="12">
        <div class="tableTitle">{{ tableTitle4 }}</div>
        <infiniteTable
          v-if="tableData4&&tableData4.list&&tableData4.list.length>0"
          ref="infiniteTable"
          main-height="400px"
          :main-data="tableData4"
        />
      </el-col>
      <el-col :span="12">
        <div class="tableTitle">{{ tableTitle5 }}</div>
        <infiniteTable
          v-if="tableData5&&tableData5.list&&tableData5.list.length>0"
          ref="infiniteTable"
          main-height="400px"
          :main-data="tableData5"
        />
      </el-col>
    </el-row>

    <div class="tableTitle">{{ tableTitle6 }}</div>
    <infiniteTable
      v-if="tableData6&&tableData6.list&&tableData6.list.length>0"
      ref="infiniteTable"
      main-height="500px"
      :main-data="tableData6"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCateringList, getCateringOptions } from '@/api/main'
import infiniteTable from './infiniteTable'
export default {
  name: 'Dashboard',
  components: {
    infiniteTable
  },
  data() {
    return {
      cabin_food: {},
      tableTitle: '',
      tableData: {},
      tableTitle1: '',
      tableData1: {},
      tableTitle2: '',
      tableData2: {},
      tableTitle3: '',
      tableData3: {},
      tableTitle4: '',
      tableData4: {},
      tableTitle5: '',
      tableData5: {},
      tableTitle6: '',
      tableData6: {},
      allData: {},
      positive_ratio: {},
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
      getCateringOptions().then(res => {
        this.options = res
        const data = this.options.filter(data => data.id === 'month')[0]
        this.form.month = [data.data[0]]
        this.onSubmit()
      })
    },
    getList(data) {
      getCateringList(data).then(res => {
        this.allData = res
        this.cabin_food = this.allData.cabin_food || { data: {}}
        this.tableData = {}
        this.tableTitle = this.allData.statistics.name
        this.$set(this.tableData, 'list', JSON.parse(JSON.stringify(this.allData.statistics.data)))
        this.tableData1 = {}
        this.tableTitle1 = this.allData.complaint_grade.name
        this.$set(this.tableData1, 'list', JSON.parse(JSON.stringify(this.allData.complaint_grade.data)))
        this.tableData2 = {}
        this.tableTitle2 = this.allData.complaint_classification.name
        this.$set(this.tableData2, 'list', JSON.parse(JSON.stringify(this.allData.complaint_classification.data)))
        this.tableData3 = {}
        this.tableTitle3 = this.allData.comment.name
        this.$set(this.tableData3, 'list', JSON.parse(JSON.stringify(this.allData.comment.data)))
        this.tableData4 = {}
        this.tableTitle4 = this.allData.line_cabin_food.name
        this.$set(this.tableData4, 'list', JSON.parse(JSON.stringify(this.allData.line_cabin_food.data)))
        this.tableData5 = {}
        this.tableTitle5 = this.allData.food_remain.name
        this.$set(this.tableData5, 'list', JSON.parse(JSON.stringify(this.allData.food_remain.data)))
        this.tableData6 = {}
        this.tableTitle6 = this.allData.cabin_opinion.name
        this.$set(this.tableData6, 'list', JSON.parse(JSON.stringify(this.allData.cabin_opinion.data)))
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
