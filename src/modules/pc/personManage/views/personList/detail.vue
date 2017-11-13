<template>
  <div class="detailbox" id="detailbox" v-loading="loading" element-loading-text="正在加载...">
    <div class="widget-wrapper" v-if="!loading">
    <el-form :label-position="labelPosition" label-width="80px" :model="formValue" ref="formValue">
      <el-row>
        <el-col :span="(!item.widget.col || (item.widget.col / layout > 1)) ? 24 : ((item.widget.col * 24) / layout)" v-for="item in formdata.items" class="widget-view" :style="{height: 'separator|subform'.indexOf(item.widget.type) === -1 ? 36*item.widget.row +'px' : 'auto'}" :widgetname="item.widget.widgetId">
          <div class="widget_item" v-if="'separator|subform|username|usertel'.indexOf(item.widget.type) === -1">
              <span class="widget_item__label">{{!item.label?'':(item.label+':')}}</span>
              <!-- <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                <el-button>上左</el-button>
              </el-tooltip> -->
              <div class="widget_item__content">
                <div class="widget_item__text" v-if="item.widget.type === 'image'" :class="{nopic:!memberDetail[item.widget.widgetId]}">
                    <img :src="memberDetail[item.widget.widgetId]" alt="" width="110" height="150">
                </div>
                <div class="widget_item__text" v-if="item.widget.type === 'deptgroup'">
                    <el-tag v-for="etag in memberDetail[item.widget.widgetId]">{{groupMap[etag]}}</el-tag>
                </div>
                <div class="widget_item__text" v-if="item.widget.type === 'datetime'">
                    {{formatData(memberDetail[item.widget.widgetId])}}
                </div>
                <div class="widget_item__text" v-if="'image|deptgroup|datetime'.indexOf(item.widget.type) === -1">
                    {{memberDetail[item.widget.widgetId]}}
                </div>
              </div>
          </div>

          <div class="separator" v-if="item.widget.type === 'separator'">
            <div class="fl-label" v-if="item.label">
              <span class="label-title">{{item.label}}</span>
            </div>
            <div class="fl-description dot" v-if="item.description">{{item.description}}</div>
            <div class="fl-widget">
              <div class="fui_separator">
                <div class="sep-line"></div>
                <div></div>
              </div>
            </div>
          </div>
          <div class="subform" v-if="item.widget.type === 'subform'" :widgetname="item.widget.widgetId">
            <div class="fl-label" v-if="item.label">
              <span class="label-title">{{item.label}}</span>
            </div>
            <div class="fl-description dot" v-if="item.description">{{item.description}}</div>
            <div class="fl-widget">
              <el-table
              :data="memberDetail[item.widget.widgetId]"
              border
              style="width: 100%">
                <el-table-column
                  :label="sublist.label"
                  align="center"
                  v-for="sublist in item.widget.items">
                  <template slot-scope="scope">
                    <span v-if="sublist.widget.type === 'datetime'">{{formatData(scope.row[sublist.widget.widgetId])}}</span>
                    <span v-else>{{scope.row[sublist.widget.widgetId]}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>

        </el-col>
      </el-row>
    </el-form>
    </div>
  </div>
</template>
<script>
import Upload from 'components/pc/upload'
import config from 'api/config'
import api from 'api/pc'
import util from 'common/js/util'
import { mapState } from 'vuex'
export default {
  props: ['memberId'],
  data () {
    return {
      formValue: {},
      memberDetail: {},
      uploadAction: config.pcHost + '/member/uploadPic',
      mid: this.memberId,
      loading: true,
      layout: 4,
      labelPosition: 'right'
    }
  },
  computed: {
    ...mapState({
      formdata: state => state.formStructBasic.content,
      groupMap: state => state.groupMap
    })
  },
  created () {
    this.getMemberDetail(this.mid)
  },
  mounted () {
    console.log(this.formdata)
    let formValue = {}
    for (let variable of this.formdata.items) {
      if (variable.widget.type !== 'subform') {
        if ('space|separator'.indexOf(variable.widget.type) !== -1) continue
        formValue[variable.widget.widgetId] = ''
      } else {
        formValue[variable.widget.widgetId] = [{}]
        for (let chdvariable of variable.widget.items) {
          formValue[variable.widget.widgetId][0][chdvariable.widget.widgetId] = ''
        }
      }
    }
    this.formValue = formValue
    this.layout = this.formdata.layout.substring(5)
    this.labelPosition = this.formdata.labelPosition
  },
  methods: {
    getMemberDetail (memberId) {
      this.loading = true
      api.getMemberInfoById({memberId: memberId}).then(data => {
        this.memberDetail = data
        this.loading = false
      }, resMsg => {
        this.$alert(resMsg, '错误', {confirmButtonText: '确定', type: 'error'})
      })
    },
    formatData (data) {
      return util.formatDate.format(data)
    }
  },
  watch: {
    memberId (val) {
      this.getMemberDetail(val)
    }
  },
  components: {
    Upload
  }
}
</script>
<style lang="scss" scoped>
.detailbox{
  min-height: 300px;
  .widget-view{
    // height: 50px;
    .widget_item{
      height: 34px;
      position: relative;
      .widget_item__label{
        width: 80px;
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 14px;
        color: #5a5e66;
        line-height: 34px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
      }
      .widget_item__content{
        width: 100%;
        text-align: left;
        display: block;
        padding-left: 80px;
        line-height: 34px;
        position: absolute;
        right: 0;
        font-size: 12px;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
        .nopic{
          width: 110px;
          height: 150px;
          background: url(~assets/images/nopic.png) no-repeat;
        }
      }
    }
    .el-form-item{
      margin-bottom: 8px;
    }
    .fl-label{
      text-align: left;
      height: 30px;
      line-height: 30px;
      margin: 10px 0;
      position: relative;
      .label-title{
        font-weight: bold;
        font-size: 14px;
        position: absolute;
        left: 0px;
        top: 0px;
      }
      .label-opt{
        position:absolute;
        right: 0px;
        top: 0px;
      }
    }
    .separator{
      text-align: left;
      display: block;
      padding-left: 15px;
      border-left: 3px solid #f67a18;
      margin: 10px auto;
      .fl-label {
        height: 24px;
        line-height: 24px;
      }
    }
    .fl-widget{
      display: block;
      .sep-line{}
      .fui_user{}
      .fui_user, .fui_dept{
        max-width: 100%;
        height: 40px;
      }

    }
    .el-table{
      font-size: 12px;
    }
  }
}
</style>
<style lang="scss">
  .previewbox{
    .el-date-editor.el-input{
      width: 100%!important;
    }
    .el-form-item__label{
      font-size: 12px!important;
    }
    .el-table th{
      padding:5px 0!important;
    }
    .headUpload{
      .el-upload--picture-card{
        width: 108px;
        height: 136px;
      }
    }
    .el-form-item__error{
      padding-top: 0;
    }
  }
</style>
