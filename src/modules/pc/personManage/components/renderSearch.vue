<!--
渲染表单组件
-->
<template>
    <section>
        <p v-if="this.renderData.length===0" class="noData">暂无表单控件</p>
        <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
            <!--输入框text|number-->
            <el-form-item :label="item.lable"
                          v-for="item in renderData"
                          v-if="item.type == 'text'||item.type == 'number'"
                          :style="`width:${(100/gridUse)*item.col}%`"
                          class="formBox">
                <el-input v-model="sizeForm[item.widgetId]" :type="item.type" :data-id="item.widgetId"></el-input>
            </el-form-item>
            <!--下拉框-->
            <el-form-item
                    :label="item.lable"
                    v-for="item in renderData"
                    :style="`width:${(100/gridUse)*item.col}%`"
                    v-if="item.type == 'combo'"
                    class="formBox">
                <el-select v-model="sizeForm[item.widgetId]" placeholder="请选择" :data-id="item.widgetId">
                    <el-option :label="sub.text" :value="sub.value" v-for="sub in item.items"></el-option>
                </el-select>
            </el-form-item>
            <!--多行文本-->
            <el-form-item
                    :label="item.lable"
                    v-for="item in renderData"
                    :style="`width:${(100/gridUse)*item.col}%`"
                    v-if="item.type == 'textarea'"
                    class="formBox">
                <el-input :type="item.type" v-model="sizeForm[item.widgetId]"></el-input>
            </el-form-item>

            <!--日期-->
            <el-form-item :label="item.lable"
                          v-for="item in renderData"
                          v-if="item.type == 'datetime'"
                          :style="`width:${(100/gridUse)*item.col*2}%`"
                          class="formBox">
                <el-date-picker type="date"
                                placeholder="选择开始日期"
                                style="width: 48%"
                                :picker-options="form.startTimeOptions"
                                v-model="sizeForm[item.widgetId+'_start']"></el-date-picker>
                <span class="dateLine">-</span>
                <el-date-picker
                        type="date"
                        placeholder="选择结束日期"
                        :picker-options="form.endTimeOptions"
                        style="width: 48%" v-model="sizeForm[item.widgetId+'_end']"></el-date-picker>
            </el-form-item>
            <slot name="btnArea"></slot>
        </el-form>
    </section>
</template>
<script>
// import handTime from 'src/common/js/handleTime'
import util from 'common/js/util'
export default {
  data () {
    const myself = this
    return {
      sizeForm: {
      },
      gridUse: '',
      form: {
        startTimeOptions: {
          disabledDate (time) {
            const {form: {dateE}} = myself
            if (dateE) {
              return time.getTime() > new Date(dateE)
            }
            return false
          }
        },
        endTimeOptions: {
          disabledDate (time) {
            const {form: {dateS}} = myself
            if (dateS) {
              return time.getTime() < new Date(dateS)
            }
            return false
          }
        },
        dateE: '', // 用于判断日期选择范围
        dateS: ''  // 用于判断日期选择范围
      }
    }
  },
  props: {
    renderData: {
      type: Array,
      default: []
    },
    disable: {
      type: Boolean,
      default: false
    },
    grid: {
      type: String,
      default: 'grid-1'
    }
  },
  watch: {
    grid (val) {
      console.log(val)
      this.gridUse = this.grid.split('-')[1]
    },
    sizeForm (val) {
      for (let key in val) {
        if (key.indexOf('_start') > -1) {
          this.form.dateS = val[key]
          val[key] = this.formatData(val[key])
        }
        if (key.indexOf('_end') > -1) {
          this.form.dateE = val[key]
          val[key] = this.formatData(val[key])
        }
      }
      console.log(val, 213)
    }
  },
  created () {
    // console.log(handTime('2017/1/1'))
    console.log(this.formatData('2017/1/1'))
  },
  methods: {
    formatData (data) {
      return util.formatDate.format(data)
    }
  }
}
</script>
<style lang="scss" scoped>
    section{
        text-align: left;
        margin-top: 15px;
    }
    .noData{
        text-align: center;
        margin: 30px 0;
    }
    .formBox{
        display: inline-block;
        width: 50%;
    }
    .dateLine{
        width: 4%;
        display: inline-block;
        text-align: center;
    }
</style>
