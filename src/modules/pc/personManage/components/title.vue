<template>
    <h1>{{title}}</h1>
</template>
<script>
    export default {
      data () {
        return {
          title: ''
        }
      },
      created () {
        this.title = this.$route.meta.title
      }
    }
</script>
<style lang="scss" scoped>
    h1{
        font-size: 16px;
        padding: 5px 20px;
        border-bottom: 1px solid #eeede9;
        background: #f5f5f5;
        text-align: left;
        font-weight: 100
    }
</style>
