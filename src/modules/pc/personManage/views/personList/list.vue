<template>
    <section>
        <TitleSet></TitleSet>
        <div class="content">
           <!-- 搜索框区域-->
            <div class="searchBox">
                <el-button type="text" class="changeSearchWay" @click="changeWay">{{searchWay}}</el-button>
                <div style="width: 90%">
                    <renderSearch :renderData="searchAreaData" :grid="grid" ref="searhComponent">
                        <div style="display: inline-block;margin-left: 15px" slot="btnArea">
                            <el-button type="primary" size="small" @click="searchTable('searhComponent')">查询</el-button>
                            <el-button size="small" @click="clearSearch('searhComponent')">清除搜索条件</el-button>
                        </div>
                    </renderSearch>
                </div>


            </div>
            <!--列表区域-->
            <div class="tabBox">
                <router-link to="/addPerson"><el-button type="primary" size="small" class="add"><i class="el-icon-plus"></i>新建</el-button></router-link>
                <a href="#/importMore"><button class="pb-btn-primary">批量导入</button></a>
                <el-table
                  :data="tableData"
                  ref="memberList"
                  class="tablelist"
                  @selection-change="handleSelectionChange">
                    <el-table-column
                      type="selection"
                      width="30">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            v-for="item in tableConfig"
                            :prop="item.widgetId"
                            :label="item.lable"
                            :width="formTypeMap[item.widgetId].type === 'datetime'?120:item.width">
                      <template slot-scope="scope">
                        <span v-if="formTypeMap[item.widgetId].type === 'datetime'">{{formatData(scope.row[item.widgetId])}}</span>
                        <template v-else-if="formTypeMap[item.widgetId].type === 'deptgroup'">
                          <el-tag :title="etag" size="small" v-for="etag in scope.row[item.widgetId]">{{etag}}</el-tag>
                        </template>
                        <span v-else :title="scope.row[item.widgetId]">{{scope.row[item.widgetId]}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" size="small"@click="lookDetail(scope.row.memberId)">查看</el-button>
                            <el-button type="text" size="small"@click="editDetail(scope.row.memberId, scope.row.$index)">编辑</el-button>
                            <el-button type="text" size="small"@click="deletesign(scope.row.memberId)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-checkbox v-model="checkedAll" @change="handleCheckAllChange" class="checkAll">全选</el-checkbox>
                <el-button size="small" @click="deleteMore" class="deleteMore" :disabled="isDisabled">批量删除</el-button>
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


        </div>

        <!--查看详细信息-->
        <el-dialog
                title="查看详细信息"
                align="center"
                :visible.sync="dialogVisible"
                class="peopleInfoDetail"
                id="peopleInfoDetail"
                width="70%">
            <person-detail :memberId="memberId"></person-detail>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="printDetail" size="small">打 印</el-button>
              <el-button @click="dialogVisible = false" size="small">导 出</el-button>
          </span>
        </el-dialog>

        <!--编辑人员信息-->
        <el-dialog
                title="编辑人员信息"
                align="center"
                :visible.sync="dialogVisibleedit"
                class="peopleInfoDetail"
                id="peopleInfoDetail"
                width="70%">
            <person-detail-edit :memberId="memberId" @close="dialogVisibleedit = false" @saveSuccess="saveSuccess" ref="pde"></person-detail-edit>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="$refs.pde.save(memberId)" size="small">确 定</el-button>
              <el-button @click="dialogVisibleedit = false" size="small">取 消</el-button>
          </span>
        </el-dialog>


    </section>
</template>
<script>
import TitleSet from 'modules/pc/personManage/components/title'
import renderSearch from 'modules/pc/personManage/components/renderSearch'
import personDetail from './detail'
import personDetailEdit from './editPerson'
import util from 'common/js/util'
import api from 'api'
import { mapActions, mapState } from 'vuex'
export default{
  data () {
   // const myself = this
    return {
      searchAreaData: [],
      searchAllData: [],
      searchWay: '切换高级搜索',
      tableConfig: [],
      tableData: [
      ],
      checkedList: [],
      checkedAll: false,
      dialogVisible: false,
      dialogVisibleedit: false,
      grid: '',
      currentPage: 1,
      pageSize: 10,
      totalNumber: 0,
      memberId: '',
      currentIndex: '',
      isDisabled: true
    }
  },
  computed: {
    ...mapState({
      formTypeMap: state => state.formTypeMap
      // groupMap: state => state.groupMap
    })
  },
  methods: {
    changeWay () {
      if (this.searchWay === '切换高级搜索') {
        this.searchWay = '切换普通搜索'
        this.searchAreaData = [...this.searchAllData.advancedQuery, ...this.searchAllData.query]
      } else {
        this.searchWay = '切换高级搜索'
        this.searchAreaData = [...this.searchAllData.query]
      }
    },
    handleCheckAllChange () {
      this.tableData.forEach(row => {
        this.$refs.memberList.toggleRowSelection(row, this.checkedAll);
      })
    },
    handleSelectionChange (val) {
      this.checkedList = val;
    },
    deleteMore () { // 批量删除
      this.$confirm('确认批量删除？')
        .then(res => {
          let _checkedList = []
          for (let item of this.checkedList) {
            _checkedList.push(item.memberId)
          }
          this.del(_checkedList)
        })
        .catch(res => {});
    },
    deletesign (id) {
      this.$confirm('确认删除？')
        .then(res => {
          this.del([id])
        })
        .catch(res => {});
    },
    del (id) {
      api.delMember({memberIds: id}).then(data => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.checkedAll = false
        this.getMemberList({pageNo: this.currentPage, pageSize: this.pageSize})
      }, error => {
        this.$message.warning(error)
      })
    },
    saveSuccess () {
      this.getMemberList({pageNo: this.currentPage, pageSize: this.pageSize})
    },
    lookDetail (id) {
      this.memberId = id
      this.dialogVisible = true
    },
    editDetail (id, index) {
      this.memberId = id
      this.currentIndex = index
      this.dialogVisibleedit = true
    },
    searchTable (ref) {
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize
      }
      Object.assign(param, this.$refs[ref].sizeForm)
      this.getMemberList(param)
    },
    clearSearch (ref) {
      this.$refs[ref].sizeForm = {}
      let param = {
        pageNo: this.currentPage,
        pageSize: this.pageSize
      }
      this.getMemberList(param)
    },
    handleSizeChange (val) {
      this.pageSize = val
      let param = {
        pageNo: this.currentPage,
        pageSize: val
      }
      Object.assign(param, this.$refs['searhComponent'].sizeForm)
      this.getMemberList(param)
    },
    handleCurrentChange (val) {
      this.pageNo = val
      let param = {
        pageNo: val,
        pageSize: this.pageSize
      }
      Object.assign(param, this.$refs['searhComponent'].sizeForm)
      this.getMemberList(param)
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
      this.basicData = f1.data
      this.grid = f1.layout
      let param = {
        formId: f1.formId,
        selectTypes: ['advancedQuery', 'query', 'table']
      }
      const f2 = await this.getSavedData(param)
      return f2
    },
    getMemberList (param) {
      api.getMemberList(param).then(res => {
        this.tableConfig = res.thead
        this.tableData = res.tbody
        this.totalNumber = res.dataCount
      }, error => {
        this.$message.warning(error)
      })
    },
    printDetail () {
      let oldstyle = document.getElementById('peopleInfoDetail').childNodes[0].attributes[1].value
      document.getElementById('peopleInfoDetail').childNodes[0].attributes[1].value = 'width: 100%;margin-top: 0;'
      window.print()
      setTimeout(() => {
        document.getElementById('peopleInfoDetail').childNodes[0].attributes[1].value = oldstyle
      }, 50)
    },
    formatData (data) {
      return util.formatDate.format(data)
    },
    // personEditSave (id) {
    //   this.memberId = id
    //   this.$refs.pde.personEditSave(id)
    //   this.dialogVisibleedit = false
    // },
    ...mapActions(
      ['getBasicWiget']
    )
  },
  components: {
    TitleSet,
    renderSearch,
    personDetail,
    personDetailEdit
  },
  created () {
    this.getConfigData().then(result => {
      /* this.highSearchData = result.advancedQuery
      this.normalSearchData = result.query
      this.listData = result.table */
      this.searchAllData = result
      this.searchAreaData = [...result.query]
    })
    this.getMemberList({pageNo: this.currentPage, pageSize: this.pageSize})
  },
  watch: {
    checkedList (val) {
      if (val.length > 0) {
        this.isDisabled = false
      } else {
        this.isDisabled = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    @import "~styles/base/vars";
    section{
        text-align: left;
    }
    .demo-form-inline{
        padding-top: 20px;
    }
    .timeLink{
        margin: 0 2px;
    }
    .content{
        background: white;
    }
    .searchBox{
        position: relative;
        background: #f5f5f5;
        padding-top: 5px;
        margin: 15px;
    }
    .changeSearchWay{
        position: absolute;
        right: 10px;
        top: 5px;
    }
    .el-icon-plus{
        margin-right: 2px;
    }
    .pb-btn-primary{
        margin-left: 10px;
    }
    .tablelist{
        width: 100%;border-top: 1px solid #e6ebf5;margin-top: 25px;margin-bottom: 15px;
        .el-tag{
          margin: 3px;
        }
    }
    .tabBox{
        margin-top: 15px;
        padding: 0px 20px 20px 20px;
    }
    .checkAll{
        margin-top: 15px;
    }
    .deleteMore{
        margin-left: 15px;
    }
    .baseInfo{
        margin: 15px auto;
        position: relative;
        .flex{
            display: flex;
            display: -ms-flexbox;
            margin: 10px 0;
            span{width: 50%}
            span:first-child{
                text-align: right;
                padding-right: 10px;
            }
            span:last-child{
                text-align: left;
            }
        }
        .imgBox{
            position: absolute;
            right: 0;
            top:-20px;
            width: 80px;
            height:100px;
            border:1px solid $borderColor;
            display: inline-block;
        }
    }
    .moreInfo{
        p{
            margin:15px 0
        }
    }
    .pageBox{
        float: right;
        margin-top: 6px;
    }
</style>
