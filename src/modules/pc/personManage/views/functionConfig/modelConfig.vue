<template>
  <section>
    <div class="showtype">
      <el-button class="Modelbtn" @click="formatc" v-if="activeTab === '0'">格式化JSON</el-button>
      <el-button type="primary" class="Modelbtn" @click="saveModelcf">保存</el-button>
    </div>
    <el-tabs type="border-card" class="Modelcf" @tab-click="handleClick">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-tickets"></i> 编辑</span>
        <div class="mapanel">
          <el-input
            type="textarea"
            :rows="20"
            placeholder="请输入内容"
            v-model="textarea" id="json_input">
          </el-input>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-view"></i> 预览</span>
        <div class="mapanel">
          <!-- <preview :formdata="JSON.parse(textarea).content"></preview> -->
          <dynamicForm :formdata="JSON.parse(textarea).content" ref="dynamicForm"></dynamicForm>
        </div>
      </el-tab-pane>
    </el-tabs>

  </section>
</template>

<script>
  import api from 'api/pc'
  import util from 'common/js/util'
  import dynamicForm from 'modules/pc/personManage/components/dynamicForm'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        textarea: '{}',
        options: [{
          value: 'TEXT',
          label: 'TEXT'
        }, {
          value: 'JSON',
          label: 'JSON'
        }],
        typeValue: 'TEXT',
        moditype: 'updateForm',
        activeTab: '0'
      }
    },
    created () {
      // this.getFormList()
    },
    computed: mapState({
      formStructBasic (state) {
        if (!state.formStructBasic) this.moditype = 'addForm'
        else this.moditype = 'updateForm'
        return state.formStructBasic || {}
      }
      // formData: state => JSON.stringify(state.formStructBasic)
    }),
    mounted () {
      setTimeout(() => {
        this.$nextTick(() => {
          this.textarea = JSON.stringify(this.formStructBasic)
        })
      }, 500)
    },
    methods: {
      // getFormList () {
      //   api.getFormList({spId: ''}).then(data => {
      //     if (data.length) {
      //       this.moditype = 'updateForm'
      //       this.textarea = JSON.stringify(data[0])
      //     } else {
      //       this.moditype = 'addForm'
      //     }
      //   }, resMsg => {
      //     this.$alert(resMsg, '错误', {confirmButtonText: '确定', type: 'error'})
      //   })
      // },
      formatc () {
        try {
          if (typeof JSON === 'object') {
            this.textarea = JSON.stringify(JSON.parse(this.textarea), null, '    ')
          } else {
            this.textarea = util.formatJson(this.textarea)
          }
        } catch (e) {}
      },
      saveModelcf () {
        api[this.moditype](JSON.parse(this.textarea)).then(data => {
          if (data === 'success') this.$message({type: 'success', message: '保存成功'})
        }, resMsg => {
          this.$alert(resMsg, '错误', {confirmButtonText: '确定', type: 'error'})
        })
      },
      handleClick (tab, event) {
        this.activeTab = tab.index
      }
    },
    // watch: {
    //   formStructBasic (val) {
    //     this.textarea = JSON.stringify(val)
    //   }
    // },
    components: {
      dynamicForm
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/base/vars.scss";
  section{
      padding: 0 15px 15px 15px;
      position: relative;
  }
  .showtype{
    display: inline-block;
    position: absolute;
    right: 32px;
    top: -2px;
    z-index: 1;
    height: 40px;
    line-height: 40px;
    .el-select{
      vertical-align: middle;
    }
    .Modelbtn{
      margin-left: 20px;
      height: 28px;
      line-height: 28px;
      vertical-align: middle;
      padding: 0 20px;
    }
  }
  .mapanel{
    margin-bottom: 50px;
  }
</style>
<style lang="scss">
  .showtype{
    input{
      height: 28px;
      width: 100px;
    }
  }

  .Modelcf{
    .el-tabs__nav{
      padding-left: 0;
    }
    .el-tabs__item{
      padding-left: 20px!important;
    }
  }

</style>
