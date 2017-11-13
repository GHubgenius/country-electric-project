<template>
    <div>
        <section data-role="searchContainer">
            <slot name="title"></slot>
            <input type="text" :placeholder="name" @focus="focus" />
            <i class="el-icon-search"></i>
            <ul v-show="isShow" id="searchUl">
                <li v-for="item in allData" v-if="item.searchlevel!=undefined">
                    <el-checkbox
                            v-if="type === '普通搜索'"
                            :label="item.widgetId"
                            :disabled = "item.searchlevel === 0?true:false"
                            v-model="checkList">{{item.lable}}</el-checkbox>
                    <el-checkbox
                            v-if="type === '高级搜索'"
                            :disabled = "item.searchlevel === 1?true:false"
                            :label="item.widgetId"
                            v-model="checkList">{{item.lable}}</el-checkbox>
                    <el-checkbox
                            v-if="type === '列表搜索' || type === '统计搜索'"
                            :label="item.widgetId"
                            v-model="checkList">{{item.lable}}</el-checkbox>
                </li>
            </ul>
        </section>
        <div style="clear: both"></div>
    </div>
</template>
<script>
    export default{
      name: '',
      props: {
        name: {
          type: String,
          default: ''
        },
        checkData: {
          type: Array,
          default: []
        },
        allData: {
          type: Array
        },
        show: {
          type: Boolean,
          default: false
        },
        type: {
          type: String,
          default: '普通搜索'
        }
      },
      data () {
        return {
          checkList: [],
          isShow: this.show
        }
      },
      methods: {
        focus () {
          this.$emit('focus')
        }
      },
      watch: {
        show (val) {
          this.isShow = val
        },
        checkList (val) {
          console.log(val, 2232)
          let data = []
          val.map(res => {
            this.allData.map(resData => {
              if (res === resData.widgetId) {
                data.push(resData)
              }
            })
          })
          this.$emit('getData', data)
        },
        checkData (val) {
          val.map(res => {
            this.checkList.push(res.widgetId)
          })
        }
      }
    }
</script>
<style scoped lang="scss">
    @import '~styles/base/vars';
    section{
        position: relative;
        text-align: right;
        display: inline-block;
        float: right;
        input{
            outline: none;
            border:none;
            border-bottom:1px solid $color-primary;
            padding: 5px 0;
        }
        ul{
            position: absolute;
            width: 150px;
            height: 180px;
            border:1px solid $borderColor;
            right: -3px;
            z-index:2;
            background: white;
            text-align: left;
            padding-left: 5px;
            overflow-y: auto;
            box-shadow: -2px 2px 4px $minor;
            overflow-x: hidden;
            li{
                margin: 5px;
            }
        }
    }
</style>
