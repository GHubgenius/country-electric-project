<template>
    <section>
        <TitleSet></TitleSet>
        <div class="pb-right-content">
        <h3 class="pb-title">查询条件</h3>
        <searchCheck
            name="搜索项"
            ref="normalSearch"
            @focus="normalSearchFocus"
            :show="normalShow"
            :allData="basicData"
            :checkData="normalChecked"
            @getData="getNormalData"
        ></searchCheck>
        <div>
            <renderSearch :renderData='normalSearchData' :grid="grid"></renderSearch>
        </div>

        <h3 class="pb-title">高级查询条件</h3>
        <searchCheck
            name="高级搜索项"
            ref="highSearch"
            @focus="highSearchFocus"
            :show="highShow"
            :allData="basicData"
            @getData="getHighData"
            :checkData="highChecked"
            type="高级搜索"
        ></searchCheck>
        <div><renderSearch :renderData='highSearchData' :grid="grid"></renderSearch></div>
        <h3 class="pb-title">列表项</h3>
        <searchCheck
                name="列表搜索项"
                ref="listSearch"
                @focus="listSearchFocus"
                :show="listShow"
                :allData="basicData"
                @getData="getListData"
                :checkData="listChecked"
                type="列表搜索"
        ></searchCheck>
        <div><renderSearchList :renderData='listData'></renderSearchList></div>
        <el-button type="primary" class="saveDataConfig" size="small" @click="saveConfig">保存</el-button>
      </div>
    </section>
</template>
<script>
    import searchCheck from 'modules/pc/personManage/components/searchCheck'
    import renderSearch from 'modules/pc/personManage/components/renderSearch.vue'
    import renderSearchList from 'modules/pc/personManage/components/renderSearchList.vue'
    import TitleSet from 'modules/pc/personManage/components/title'
    import utils from 'src/common/js/utils'
    import { mapActions } from 'vuex'
    import api from 'api'
    export default{
      data () {
        return {
          normalShow: false,
          highShow: false,
          listShow: false,
          tableData: [
            {date: '-', name: '-', address: '-'},
            {date: '-', name: '-', address: '-'},
            {date: '-', name: '-', address: '-'}
          ],
          tableConfig: [
            {prop: 'date', width: '180', label: '日期'},
            {prop: 'name', width: '180', label: '姓名'},
            {prop: 'address', width: '', label: '地址'}
          ],
          basicData: [],
          normalSearchData: [],
          highSearchData: [],
          listData: [],
          normalChecked: [],
          highChecked: [],
          listChecked: [],
          grid: ''
        }
      },
      components: {
        searchCheck,
        renderSearch,
        TitleSet,
        renderSearchList
      },
      methods: {
        normalSearchFocus () {
          this.normalShow = true
          this.highShow = false
          this.listShow = false
        },
        highSearchFocus () {
          this.normalShow = false
          this.highShow = true
          this.listShow = false
        },
        listSearchFocus () {
          this.normalShow = false
          this.highShow = false
          this.listShow = true
        },
        getNormalData (data) {
          console.log(data, 'normal')
          this.normalSearchData = data
        },
        getHighData (data) {
          this.highSearchData = data
        },
        getListData (data) {
          this.listData = data
        },
        saveConfig () {
          let advancedQueryData = [...this.highSearchData]
          let queryData = [...this.normalSearchData]
          let tableData = [...this.listData]
          advancedQueryData.map(res => {
            res['selectType'] = 'advancedQuery'
          })
          queryData.map(res => {
            res['selectType'] = 'query'
          })
          tableData.map(res => {
            res['selectType'] = 'table'
          })
          let param = {
            advancedQuery: advancedQueryData,
            query: queryData,
            table: tableData,
            formId: this.$store.state.formCheckBasic.formId,
            selectTypes: ['advancedQuery', 'query', 'table']
          }
          api.saveDataConfig(param).then(res => {
            console.log(res)
            this.$message.success(res)
            window.location.href = '#/personList'
          }, errMsg => {
            this.$message.warning(errMsg)
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
          console.log(f1, 'f1')
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
      mounted () {
        const _this = this
        document.onclick = function (e) {
          _this.normalShow = false
          _this.highShow = false
          _this.listShow = false
        }
        utils.clickDocHide(this, ['normalSearch', 'highSearch', 'listSearch'])
      },
      created () {
        this.getConfigData().then(result => {
          this.highSearchData = result.advancedQuery
          this.normalSearchData = result.query
          this.listData = result.table
          this.normalChecked = result.query
          this.highChecked = result.advancedQuery
          this.listChecked = result.table
        })
      }
    }
</script>
<style scoped lang="scss">
    section{
    }

    .saveDataConfig{
        margin-top: 20px;
    }
</style>
