<template>
    <section>
        <TitleSet></TitleSet>
        <div class="pb-right-content">
            <div class="leftTree">
                <el-input
                        placeholder="搜索"
                        v-model="filterText"
                        class="treeSearch"
                >
                </el-input>
                <i class="el-icon-search"></i>
                <el-button type='text'class="saveDataConfig" size="small" @click="allData">全部</el-button>
                <el-tree
                        class="filter-tree"
                        :data="dataTree"
                        :props="defaultProps"
                        default-expand-all
                        node-key="id"
                        :filter-node-method="filterNode"
                        :highlight-current="true"
                        @node-click="clickGetNode"
                        ref="tree2">
                </el-tree>
            </div>
            <div class="rightCount">
                <h3 class="pb-title">{{groupName}}<span>本级点所有下级人数：</span><span class="color-primary">{{groupNum}}</span></h3>
                <div id="echartsArea" class="echarts"></div>
            </div>
        </div>
    </section>
</template>
<script>
import TitleSet from 'modules/pc/personManage/components/title'
import api from 'api'
var echarts = require('echarts')
export default {
  watch: {
    filterText (val) {
      this.$refs.tree2.filter(val);
      this.$refs.tree2.setCurrentNode(this.checkedNodeId)
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    clickGetNode (data) {
      console.log(data)
      this.checkedNodeId = data.id
      this.groupName = data.groupName
      let param = {
        groupId: this.checkedNodeId
      }
      this.getCount(param)
    },
    allData () {
      this.$refs.tree2.setCurrentNode(this.checkedNodeId)
      this.groupName = ''
      this.getCount({})
    },
    getCount (param) {
      api.getOrganisationCount(param).then(res => {
        // this.data = res
        this.getCountData(res.statistics)
        this.groupNum = res.memberCount
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
        line.style.width = '100%'
        line.style.border = '1px solid #eeede9'
        line.style.margin = '15px 0'
        line.style.padding = '15px'
        line.style.display = 'flex'
        let leftDom = document.createElement('div')
        let rightDom = document.createElement('div')
        leftDom.style.width = '48%'
        leftDom.style.height = '250px'
        rightDom.style.width = '48%'
        rightDom.style.height = '250px'
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
        let coName = []
        let coData = []
        let ptext = []
        let pvalue = []
        this.data.push(
          {
            colunmOpt: {
              tooltip: {
                trigger: 'axis',
                formatter: '{a} <br/>{b} : {c}'
              },
              xAxis: {
                data: coName
              },
              yAxis: {},
              series: [{
                name: res.lable,
                type: 'bar',
                data: coData
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
                      shadowColor: 'rgba(0, 0, 0, 0.4)'
                    }
                  }
                }
              ]
            }
          }
        )
        for (let key in res.statisticsData) {
          coName.push(key)
          coData.push(res.statisticsData[key])
          ptext.push(key)
          pvalue.push({value: res.statisticsData[key], name: key})
        }
      })
      this.renderEcharts()
    }
  },
  data () {
    return {
      checkedNodeId: '',
      filterText: '',
      dataTree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      data: [],
      groupName: '',
      groupNum: ''
    };
  },
  components: {
    TitleSet
  },
  created () {
    let param = {groupId: '17072815081291138424'}
    api.getOrganisation(param).then(res => {
      this.dataTree = res
    }, errMsg => {
      this.$message.warning(errMsg)
    })
    let paramCount = {}
    this.getCount(paramCount)
  }
}
</script>
<style lang="scss" scoped>
    @import "~styles/base/vars";
    .pb-right-content{
        overflow: hidden;
        .leftTree{
            position: relative;
            float: left;
            width: 30%;
            margin-right: 5%;
            height: 300px;
            border:1px solid $borderColor;
            overflow: auto;
            text-align: left;
            .treeSearch{
                margin-top: 15px;
                width: 90%;
                margin-left: 5%;
            }
            .el-icon-search{
                position: absolute;
                top: 22px;
                left: 7%;
                font-size: 18px;
                color: #878d99;
            }
            .filter-tree{
                width: 80%;
                margin:  auto;
            }
        }
        .rightCount{
            float: left;
            width: 60%;
            .echarts{
                margin-top: 15px;
            }
        }
    }
.saveDataConfig{
    margin-left: 15px;
}
</style>
