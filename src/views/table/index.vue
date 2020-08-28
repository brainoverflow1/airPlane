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
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tableTitle">旅客评论</div>
    <infiniteTable v-if="tableData&&tableData.list&&tableData.list.length>0" ref="infiniteTable" main-height="500px" :main-data="tableData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getThirdList, getThirdOptions } from '@/api/main'
import infiniteTable from './infiniteTable'
export default {
  name: 'Dashboard',
  components: {
    infiniteTable
  },
  data() {
    return {
      tableData: {},
      allData: {},

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
      }
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
        this.form.year = [this.options.year[0]]
        this.onSubmit()
        console.log(res)
      })
    },
    getList(data) {
      getThirdList(data).then(res => {
        this.allData = res
        this.tableData = {}

        this.$set(this.tableData, 'list', JSON.parse(JSON.stringify(this.allData)))
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
