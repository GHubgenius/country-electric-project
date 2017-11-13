<template>
    <section>
        <TitleSet></TitleSet>
        <div class="pb-right-content">
        <el-form :model="ruleForm" label-width="60px" class="ruleForm">
        <h3 class="pb-title">菜单文案</h3>
        <el-form-item label="菜单一" prop="menu1">
        <el-input v-model="ruleForm.menu1"></el-input>
        </el-form-item>
        <el-form-item label="菜单二" prop="menu2">
            <el-input v-model="ruleForm.menu2"></el-input>
        </el-form-item>
        <el-form-item label="菜单三" prop="menu3">
            <el-input v-model="ruleForm.menu3"></el-input>
        </el-form-item>
        <el-form-item label="菜单四" prop="menu4">
            <el-input v-model="ruleForm.menu4"></el-input>
        </el-form-item>
        <el-form-item label="菜单五" prop="menu5">
            <el-input v-model="ruleForm.menu5"></el-input>
        </el-form-item>
        <el-form-item label="菜单六" prop="menu6">
            <el-input v-model="ruleForm.menu6" readonly></el-input>
        </el-form-item>
        <el-form-item label="菜单七" prop="menu6">
            <el-input v-model="ruleForm.menu7" readonly></el-input>
        </el-form-item>
        <h3 class="pb-title">信息分类</h3>
        <el-form-item label="分类一" prop="menu1">
            <el-input v-model="ruleForm.menu8"></el-input>
        </el-form-item>
        <el-form-item label="分类二" prop="menu2">
            <el-input v-model="ruleForm.menu9"></el-input>
        </el-form-item>
        <h3 class="pb-title">APP页面标题</h3>
        <el-form-item label="分类一" prop="menu1">
            <el-input v-model="ruleForm.menu10"></el-input>
        </el-form-item>
        <el-form-item label="分类二" prop="menu2">
            <el-input v-model="ruleForm.menu11"></el-input>
        </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitForm()" size="small">保存</el-button>
        <el-button size="small">恢复默认</el-button>
        </div>
    </section>
</template>
<script>
import TitleSet from 'modules/pc/personManage/components/title'
import api from 'api'
export default {
  data () {
    return {
      ruleForm: {
        menu1: '人员列表',
        menu2: '人员统计',
        menu3: '表单配置',
        menu4: '数据项配置',
        menu5: '统计配置',
        menu6: '文案配置',
        menu7: '模板配置',
        menu8: '基本信息',
        menu9: '更多信息',
        menu10: '基本信息',
        menu11: '更多信息'
      }
    }
  },
  methods: {
    submitForm () {
      let param = {
        menus: [
          {name: this.ruleForm.menu1, url: '#/personList'},
          {name: this.ruleForm.menu2, url: '#/personCount'},
          {name: this.ruleForm.menu3, url: ''},
          {name: this.ruleForm.menu4, url: '#/dataConfig'},
          {name: this.ruleForm.menu5, url: '#/countConfig'},
          {name: this.ruleForm.menu6, url: '#/wordConfig'},
          {name: this.ruleForm.menu7, url: '#/modelConfig'}
        ]
      }
      console.log(param)
      api.saveMenu(param).then(res => {
        this.$message.success('保存成功')
      }, err => {
        this.$message.warning(err)
      })
    }
  },
  components: {
    TitleSet
  },
  created () {
    api.getMenu({}).then(res => {
      console.log(res)
    }, err => {
      this.$message.warning(err)
    })
  }
}
</script>
<style scoped lang="scss">

    .ruleForm{
        margin-top: 25px;
        width: 50%;
        h3{
            margin:15px 0
        }
        .el-form-item{
            margin-left: 30px;
        }
    }
</style>
