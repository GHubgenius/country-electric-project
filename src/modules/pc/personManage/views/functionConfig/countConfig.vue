<template>
    <section>
        <TitleSet></TitleSet>
        <div class="pb-right-content">
        <h3 class="pb-title">统计项</h3>
        <searchCheck
                name="搜索项"
                ref="countSearch"
                @focus="countSearch"
                :allData="basicData"
                :checkData="countChecked"
                @getData="getCountData"
                type="统计搜索"
                :show="countShow">
        </searchCheck>
        <div id="echartsArea">
            <p v-if="data.length == 0">暂无数据</p>
           <!-- <div class="echartsBox" v-for="(item, index) in data">
                <div :id='`echarts-left${index}`' style="width: 45%;height: 300px"></div>
                <div :id='`echarts-right${index}`' style="width: 45%;height: 300px"></div>
            </div>-->
        </div>
        <el-button type="primary" size="small" @click="saveCount">保存</el-button>
        </div>
    </section>
</template>
<script>
import searchCheck from 'modules/pc/personManage/components/searchCheck'
import TitleSet from 'modules/pc/personManage/components/title'
import utils from 'src/common/js/utils'
import { mapActions } from 'vuex'
import api from 'api'
var echarts = require('echarts')
export default {
  data () {
    return {
      countShow: false,
      data: [
      ],
      getData: [],
      basicData: [],
      countChecked: []
    }
  },
  methods: {
    countSearch () {
      this.countShow = true
    },
    saveCount () {
      this.getData.map(res => {
        res['selectType'] = 'statistics'
      })
      let param = {
        statistics: this.getData,
        selectTypes: ['statistics'],
        formId: this.$store.state.formCheckBasic.formId
      }
      api.saveDataConfig(param).then(res => {
        this.$message.success('保存成功')
        window.location.href = '#/personCount'
      }, err => {
        this.$message.warning(err)
      })
    },
    renderEcharts () {
      let box = document.getElementById('echartsArea')
      box.innerHTML = ''
      this.data.map((res, i) => {
        let line = document.createElement('div')
        line.className = 'echartsBox'
        line.style.width = '80%'
        line.style.border = '1px solid #eeede9'
        line.style.margin = '15px 0'
        line.style.padding = '15px'
        line.style.display = 'flex'
        let leftDom = document.createElement('div')
        let rightDom = document.createElement('div')
        leftDom.style.width = '45%'
        leftDom.style.height = '300px'
        rightDom.style.width = '45%'
        rightDom.style.height = '300px'
        box.appendChild(line)
        line.appendChild(leftDom)
        line.appendChild(rightDom)
        var myChartL = echarts.init(leftDom);
        myChartL.setOption(res.pieOpt);
        var myChartR = echarts.init(rightDom);
        myChartR.setOption(res.colunmOpt);
      })
    },
    getCountData (data) {
      this.getData = data
      this.data = []
      data.map(res => {
        let cxtext = []
        let cxvalue = []
        let ptext = []
        let pvalue = []
        this.data.push(
          {
            colunmOpt: {
              tooltip: {},
              legend: {data: [res.lable]},
              xAxis: {
                data: cxtext
              },
              yAxis: {},
              series: [{
                name: res.lable,
                type: 'bar',
                data: cxvalue
              }]
            },
            pieOpt: {
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: ptext
              },
              series: [
                {
                  name: res.lable,
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data: pvalue,
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            }
          }
        )
        // 二层循环
        res.items.map(item => {
          cxtext.push(item.text)
          cxvalue.push(2)
          ptext.push(item.text)
          pvalue.push({value: 2, name: item.text})
        })
      })
      this.renderEcharts()
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
      f1.data.map(res => {
        if (res.type === 'combo') {
          this.basicData.push(res)
        }
      })
      let param = {
        formId: f1.formId,
        selectTypes: ['statistics']
      }
      const f2 = await this.getSavedData(param)
      return f2
    },
    ...mapActions(
      ['getBasicWiget']
    )
  },
  components: {
    searchCheck,
    TitleSet
  },
  mounted () {
    const _this = this
    document.onclick = function (e) {
      _this.countShow = false
    }
    utils.clickDocHide(this, ['countSearch'])
    // this.renderEcharts()
    this.getConfigData().then(result => {
      console.log(result, 'then')
      this.countChecked = result.statistics
    })
  }
}
</script>
<style lang="scss" scoped>
@import "~styles/base/vars.scss";
#echartsArea p{
    margin: 30px 0;
    width: 100%;
}
</style>
