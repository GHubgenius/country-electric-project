<!--
配置列表渲染-->
<template>
    <section>
        <el-table
                :data="tableData"
                class="table"
                style="width: 100%"
                border>
            <el-table-column
                    align="center"
                    v-for="item in renderData"
                    :prop="item.prop"
                    :label="item.lable"
                    :width="item.width">
            </el-table-column>
        </el-table>
    </section>
</template>
<script>
export default {
  props: {
    renderData: {
      type: Array,
      default: []
    },
    tableData: []
  },
  created () {
  }
}
</script>
<style lang="scss" scoped>
    .table{
        margin-top: 15px;
    }
</style>
