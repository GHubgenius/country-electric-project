<template>
    <section>
        <TitleSet></TitleSet>
        <div class="tabBox">
            <el-tabs v-model="activeName" @tab-click="handClick" class="tabLine">
                <el-tab-pane label="数据项配置" name="data">
                    <DataConfig v-if="showData"></DataConfig>
                </el-tab-pane>
                <el-tab-pane label="统计配置" name="count">
                    <div style="min-height: 600px">
                        <countConfig v-if="showCount"></countConfig>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="文案配置" name="word">
                    <wordConfig v-if="showWord"></wordConfig>
                </el-tab-pane>
                <el-tab-pane label="模板配置" name="model">
                    <modelConfig v-if="showWord"></modelConfig>
                </el-tab-pane>
            </el-tabs>
        </div>
    </section>
</template>
<script>
    import TitleSet from 'modules/pc/personManage/components/title'
    import DataConfig from './data.vue'
    import countConfig from './countConfig.vue'
    import wordConfig from './wordConfig.vue'
    import modelConfig from './modelConfig.vue'
    export default {
      data () {
        return {
          activeName: 'data',
          showData: true,
          showCount: false,
          showWord: false
        }
      },
      methods: {
        handClick (tab, event) {
          console.log(tab.name)
          this.showData = this.showCount = this.showWord = false
          if (tab.name === 'data') {
            this.showData = true
          } else if (tab.name === 'count') {
            this.showCount = true
          } else {
            this.showWord = true
          }
        }
      },
      components: {
        TitleSet,
        DataConfig,
        countConfig,
        wordConfig,
        modelConfig
      },
      created () {
      }
    }
</script>
<style lang="scss" scoped>
.tabBox{
    background: white;
}
.tabLine{
   .el-tabs__nav-wrap{
       padding-left: 50px;
   }
}
</style>
