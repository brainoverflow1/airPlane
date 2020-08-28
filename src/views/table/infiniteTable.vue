/*
 * @Author: liushuang
 * @Date: 2020-08-10 11:21:06
 * @Last Modified by: liushuang
 * @Last Modified time: 2020-08-23 18:17:22
 */
<template>
  <div class="infinite-table">
    <el-table
      ref="infiniteTable"
      v-el-table-infinite-scroll="getDataList"
      border
      infinite-scroll-disabled="infiniteScrollDisabled"
      :height="mainHeight"
      :data="showList"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="100"
      />
      <el-table-column
        v-for="(col,colIndex) in columns"
        :key="'sqlCol'+colIndex"
        :prop="colIndex"
        :label="colIndex.split('$')[0]"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="colIndex !== '图片'">{{ scope.row[colIndex] }}</span>
          <span v-if="colIndex === '图片'&&scope.row[colIndex]">{{ scope.row[colIndex] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

export default {
  name: 'InfiniteTable',
  components: {
  },
  props: {

    mainHeight: { // 表格高度
      type: String,
      default: '100%'
    },
    mainData: { // 主要数据
      type: Object,
      default() {
        return {}
      }

    }
  },
  data() {
    return {
      isLoading: false, // 滚动加载中
      showList: []// 展示的列表
    }
  },
  computed: {
    // 滚动加载没有更多了
    isNomore() {
      return this.showList.length >= this.allList.length
    },
    // 是否可以滚动加载
    infiniteScrollDisabled() {
      return this.isLoading || this.isNomore
    },
    // 所有的行
    allList() {
      this.mainData.list.forEach(item => {
        // item['图片'] && item['图片'].replace(/'/g, '"')
        if (item['图片']) {
          // item['图片'] = item['图片'].split('[')[1].split(']')[0].split(',')
        }
      })
      return this.mainData.list
    },
    // 所有的列
    columns() {
      return this.mainData.list && this.mainData.list[0]
    }
  },
  watch: {
    mainData: {
      deep: true,
      handler(val) {
        this.showList = []
        this.getDataList()
        this.$refs.infiniteTable.bodyWrapper.scrollTop = 0
      }
    }
  },
  mounted() {

  },
  methods: {
    // sql结果滚动加载处理
    getDataList() {
      // console.log(this.mainData)
      const showListLength = this.showList.length
      const endNum = showListLength + 100
      this.isLoading = true
      this.showList = this.allList.slice(0, endNum)
      console.log(this.showList)
      this.$nextTick(function() {
        this.isLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .infinite-table{
    height: 100%;
  }
</style>
