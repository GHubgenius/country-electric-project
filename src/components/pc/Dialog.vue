<template>
<span class="custom-dialog-container">
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    ref="elDialog"
    :id="id"
    center
    append-to-body
    >
    <div slot="title" class="dialog-header">
      <span class="dialog-header__title">{{title}}1</span>
    </div>

    <!-- <div v-if="loading" class="form-mask" :element-loading-text="loadingText" v-loading="loading"></div> -->

    <slot></slot>

    <span slot="footer" class="dialog-footer" :element-loading-text="loadingText">
      <slot name="action">
        <el-button type="primary" size="medium" :loading="loading" @click="submit" >确定</el-button>
        <el-button @click="close" size="medium">关闭</el-button>
      </slot>
    </span>
  </el-dialog>
</span>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    loadingText: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 600
    }
  },
  data () {
    return {
      loading: false,
      dialogVisible: this.visible,
      id: 'dialog_' + new Date().getTime()
    }
  },
  methods: {
    close () {
      this.dialogVisible = false
    },
    submit () {
      this.loading = true

      this.$emit('on-submit')
    },
    end () {
      this.loading = false
    }
  },
  mounted () {
    // console.log(this.$refs.elDialog)

    let body = document.querySelector('#' + this.id + ' .el-dialog')

    if (body) {
      body.style.width = this.width + 'px'
    }

    // console.log('body', body)
  },
  watch: {
    dialogVisible (val) {
      if (!val) {
        this.loading = false
        this.$emit('on-close')
      }
    },
    visible (val) {
      this.dialogVisible = val
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-header{
  border-bottom: 1px #eee solid;
  text-align: center;
  line-height: 40px;
  margin-top: -20px;
  font-size: 18px;
  .dialog-header__title{

  }
}
</style>
<style lang="scss">
  .custom-dialog-container{
    .el-dialog__header{
      background-color: #EEF2F3!important;
      padding: 0!important;
    }
    .el-dialog__headerbtn{
      font-size: 24px!important;
      top: 5px;
    }
  }
</style>
