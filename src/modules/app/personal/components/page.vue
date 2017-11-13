<template>
  <div class="box">
    <div class="page-container">
      <div class="page-content">
        <div class="mainwrap">
          <div class="maincontent">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
  }
}
</script>

<style lang="scss">
.box{
  .page-container{
    padding: 0 20px;
    background: #ececec;
    min-height: 100%;
    .el-breadcrumb{
      height: 42px;
      line-height: 42px;
      background-color: #ececec;
    }
    .page-content{
      background: #fff;
      .mainwrap{
        background-color: #ececec;
        overflow-y: auto;
        .maincontent{
          padding: 40px;
          padding-top: 20px;
          background-color: #fff;
          overflow-y: auto;
          .mcontit{
            margin-bottom: 20px;
            font-size: 20px;
            font-weight: normal;
          }
        }
      }
    }
  }
}
</style>
