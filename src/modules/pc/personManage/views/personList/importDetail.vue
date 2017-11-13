<template>
    <section>
        <TitleSet></TitleSet>
        <div class="pb-right-content">
            <div style="text-align: left;" class="backArea">
                <div  @click="back"><i class="el-icon-arrow-left"></i>返回</div>
            </div>
            <renderSearch :renderData="searchAreaData" :grid="grid" ref="searhComponent" style="text-align: left">
                <div style="display: inline-block;margin-left: 15px" slot="btnArea">
                    <el-button type="primary" size="small" @click="searchTable('searhComponent')">搜索</el-button>
                </div>
            </renderSearch>
            <el-table
                    :data="tableData"
                    class="tablelist"
                    border
            >
                <el-table-column
                        type="index"
                        label="编号"
                        width="60">
                </el-table-column>
                <el-table-column
                        align="center"
                        v-for="item in tableConfig"
                        :prop="item.widgetId"
                        :label="item.lable"
                        :width="item.width">
                </el-table-column>
            </el-table>
            <el-pagination
                    class="pageBox"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next"
                    :total="totalNumber">
            </el-pagination>
        </div>
    </section>
</template>
<script>
import TitleSet from 'modules/pc/personManage/components/title'
import renderSearch from 'modules/pc/personManage/components/renderSearch'
import api from 'api'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      formInline: {
        name: '',
        phone: '',
        region: ''
      },
      tableConfig: [],
      tableData: [
      ],
      grid: '',
      currentPage: 1,
      pageSize: 10,
      totalNumber: 0,
      searchAreaData: []
    }
  },
  methods: {
    back () {
      window.history.go(-1)
    },
    search () {},
    handleSizeChange (val) {
      this.pageSize = val
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        importNo: window.sessionStorage.importDetailId
      }
      this.getDetailList(param)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        importNo: window.sessionStorage.importDetailId
      }
      this.getDetailList(param)
    },
    searchTable (ref) {
      console.log(this.$refs[ref].sizeForm)
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        importNo: window.sessionStorage.importDetailId
      }
      Object.assign(param, this.$refs[ref].sizeForm)
      this.getDetailList(param)
    },
    getDetailList (param) {
      api.getImportDetailList(param).then(res => {
        this.tableConfig = res.thead
        this.tableData = res.tbody
        this.totalNumber = res.dataCount
      })
    },
    async getSavedData (param) {
      return new Promise(function (resolve, reject) {
        api.queryDataConfig(param).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      });
    },
    async getConfigData () { // 获取保存数据和配置项
      const f1 = await this.getBasicWiget()
      console.log(f1, 'f111')
      this.basicData = f1.data
      this.grid = f1.layout
      let param = {
        formId: f1.formId,
        selectTypes: ['advancedQuery', 'query', 'table']
      }
      const f2 = await this.getSavedData(param)
      return f2
    },
    ...mapActions(
      ['getBasicWiget']
    )
  },
  components: {
    TitleSet,
    renderSearch
  },
  created () {
    let param = {
      pageSize: this.pageSize,
      pageNo: this.currentPage,
      importNo: window.sessionStorage.importDetailId
    }
    this.getDetailList(param)
    this.getConfigData().then(result => {
      this.searchAreaData = [...result.query, ...result.advancedQuery]
    })
  }
}
</script>
<style lang="scss" scoped>
    @import '~styles/base/vars';
    .backArea{
        &:hover{
            cursor: pointer;
            color:$color-primary;
        }
        i{
            margin-right: 5px;
        }
    }
.demo-form-inline{
    width: 100%;
    text-align: left;
    margin-top: 15px;
}
    .pageBox{
        text-align: right;
        margin-top: 15px;
    }
</style>
