<template>
  <ul class="select-list" @click="selectGroup">
    <input type="hidden" v-model="currentValue"/>
    <div v-if="!value || !value.length" class="select-empty">点击设置部门</div>
    <div class="taglist" v-else>
      <el-tag size="small" v-for="tag in currentValue">{{tag.label}}</el-tag>
    </div>
    <selectGroupTree ref="sgs" @on-success="selectedGroup"></selectGroupTree>
  </ul>
</template>

<script>
import selectGroupTree from 'components/pc/selectGroupTree'
export default {
  props: ['value'],
  data () {
    return {
    }
  },
  methods: {
    selectGroup () {
      this.$refs.sgs.open();
    },
    selectedGroup (selectNode) {
      this.$emit('on-success', selectNode)
    }
  },
  computed: {
    currentValue: {
      get: function () {
        return this.value;
      },
      set: function (val) {
        this.$emit('input', val);
      }
    }
  },
  components: {
    selectGroupTree
  }
}
</script>

<style lang="scss" scoped>
.select-list {
  background: #fff;
  height: 34px;
  border: 1px dashed #e0e0e0;
  margin-bottom: 8px;
  overflow: auto;
  .select-empty {
    cursor: pointer;
    line-height: 32px;
    text-align: center;
    color: #989898;
  }
  .taglist{
    margin-top: -4px;
    .el-tag{
      margin: 5px;
    }
  }
}
</style>
