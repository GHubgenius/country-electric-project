<template>
    <section>
        <TitleSet></TitleSet>
        <div class="pb-right-content">
            <el-row class="dynav">
                <el-button icon="el-icon-arrow-left" type="text" class="color-LightBlack" @click="back" align="left">返回</el-button>
            </el-row>

            <dynamicForm :formdata="formData" :submitData="submitData" ref="dynamicForm"></dynamicForm>

            <el-row class="dyfooter">
                <el-button type="primary" @click="submitSave">保存</el-button>
            </el-row>
        </div>
    </section>
</template>
<script>
// import api from 'api/pc'
import TitleSet from 'modules/pc/personManage/components/title'
import dynamicForm from 'modules/pc/personManage/components/dynamicForm'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      submitData: {}
    }
  },
  computed: mapState({
    formData (state) {
      return state.formStructBasic.content
    }
  }),
  methods: {
    // getFormList () {
    //   api.getFormList({spId: ''}).then(data => {
    //     this.formData = data[0].content
    //     this.load = false
    //   }, resMsg => {
    //     this.$alert(resMsg, '错误', {confirmButtonText: '确定', type: 'error'})
    //   })
    // },
    submitSave () {
      this.$refs.dynamicForm.save()
    },
    back () {
      this.$router.go(-1)
      // window.history.go(-1)
    }
  },
  components: {
    TitleSet,
    dynamicForm
  }
}
</script>
<style scoped lang="scss">
    .pb-title{
        margin: 15px 0;
    }
    .formArea{
        width: 80%;
        display: flex;
        display: -ms-flexbox;
        flex-wrap: wrap;
    }
    .tableArea{
        p{
            margin: 15px 0;
        }
    }
    .dynav{
        text-align: left;
    }
    .dyfooter{
        text-align: center;
        padding: 20px;
    }
</style>
