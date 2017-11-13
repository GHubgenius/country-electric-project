<template>
  <div class="previewbox" id="previewbox">
    <div class="widget-wrapper">
    <el-form :label-position="labelPosition" label-width="80px" :model="formValue" ref="formValue">
      <el-row>
        <el-col :span="(!item.widget.col || (item.widget.col / layout > 1)) ? 24 : ((item.widget.col * 24) / layout)" v-for="item in formdata.items" class="widget-view" :style="{height: 'separator|subform'.indexOf(item.widget.type) === -1 ? 50*item.widget.row +'px' : 'auto'}">
          <el-form-item :label="item.label" :widgetname="['_widget_' + item.widget.widgetId]" v-if="'separator|subform|username|usertel'.indexOf(item.widget.type) === -1" :prop="item.widget.widgetId" ref="dForm" :rules="{validator: (rule, value, callback) => { checkRegex(rule, value, callback, {allowBlank: item.widget.allowBlank, regex: item.widget.regex, verify: item.widget.verify, label: item.label}) }, trigger: 'blur,change'}" :class="{'is-required': !item.widget.allowBlank}">
            <el-input size="small" v-model="formValue[item.widget.widgetId]" :type="item.widget.type" v-if="'text|number'.indexOf(item.widget.type) !== -1"></el-input>
            <el-input :rows="1" size="small" v-model="formValue[item.widget.widgetId]" :type="item.widget.type" v-if="item.widget.type === 'textarea'"></el-input>
            <el-date-picker v-model="formValue[item.widget.widgetId]" size="small" type="date" placeholder="选择日期" v-if="item.widget.type === 'datetime'"></el-date-picker>
            <el-select size="small" placeholder="请选择" v-model="formValue[item.widget.widgetId]" v-if="item.widget.type === 'combo'">
              <el-option
                v-for="slist in item.widget.items"
                :key="slist.value"
                :label="slist.text"
                :value="slist.value">
              </el-option>
            </el-select>

            <upload :crop="false" :crop-width="98" :crop-height="98" :action="uploadAction" @on-check="handleLogoUploadCheck(item.widget.widgetId)" v-model="formValue[item.widget.widgetId]" :limit="1024" accept="image/png, image/jpeg" v-if="item.widget.type === 'image'" class="headUpload"></upload>

            <div class="usergroup" v-if="item.widget.type === 'usergroup'">
              <!-- <div class="fl-label" v-if="item.label">
                <span class="label-title">{{item.label}}</span>
              </div> -->
              <div class="fl-description dot" v-if="item.description">{{item.description}}</div>
              <div class="fl-widget">
                <div class="fui_user">
                  <ul class="select-list">
                    <div v-if="formValue[item.widget.widgetId].length" class="select-empty" @click="selectGroup">点击设置成员</div>
                    <div v-else>
                      <el-tag v-for="tag in formValue[item.widget.widgetId]">标签一</el-tag>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <div class="usergroup" v-if="item.widget.type === 'deptgroup'">
              <!-- <div class="fl-label" v-if="item.label">
                <span class="label-title">{{item.label}}</span>
              </div> -->
              <div class="fl-description dot" v-if="item.description">{{item.description}}</div>
              <div class="fl-widget">
                <div class="fui_dept">
                  <select-list @on-success="selectGroupSuccess($event, item.widget.widgetId)" v-model="formValue[item.widget.widgetId]"></select-list>
                </div>
              </div>
            </div>
          </el-form-item>
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
          <div class="subform" v-if="item.widget.type === 'subform'" :widgetname="['_widget_' + item.widget.widgetId]">
            <div class="fl-label" v-if="item.label">
              <span class="label-title">{{item.label}}</span>
              <span class="label-opt">
                <el-button size="mini" class="el-icon-plus" type="primary" @click="handleAdd(item.widget.widgetId)">新增</el-button>
              </span>
            </div>
            <div class="fl-description dot" v-if="item.description">{{item.description}}</div>
            <div class="fl-widget">
              <el-table
              :data="formValue[item.widget.widgetId]"
              border
              style="width: 100%">
                <el-table-column
                  prop="date"
                 :label="sublist.label"
                  :min-width="sublist.widget.type === 'datetime' ? 110 : 80" align="center" v-for="sublist in item.widget.items">
                  <template slot-scope="scope">
                    <el-input size="small" v-model="formValue[item.widget.widgetId][scope.$index][sublist.widget.widgetId]" :type="sublist.widget.type" v-if="'text|textarea|number'.indexOf(sublist.widget.type) !== -1"></el-input>
                    <el-date-picker v-model="formValue[item.widget.widgetId][scope.$index][sublist.widget.widgetId]" size="small" type="date" placeholder="选择日期" v-if="sublist.widget.type === 'datetime'"></el-date-picker>
                    <el-select size="small" placeholder="请选择" v-model="formValue[item.widget.widgetId][scope.$index][sublist.widget.widgetId]" v-if="sublist.widget.type === 'combo'">
                      <el-option
                        v-for="sslist in sublist.widget.items"
                        :key="sslist.value"
                        :label="sslist.text"
                        :value="sslist.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="50" align="center">
                  <template slot-scope="scope">
                    <i class="el-icon-delete color-Danger cur-pointer f18" @click="handleDelete(scope.$index, item.widget.widgetId)"></i>
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
//  text: 单行文本
//  textarea: 多行文本
//  number: 数字
//  datetime: 日期
//  combo: 下拉框
//  image: 图片
//  separator: 分割线
//  subform: 子表单
//  usergroup: 成员多选
//  deptgroup: 部门多选
//  username: 填报人姓名
//  usertel: 填报人手机号
import selectList from './selectList'
import Upload from 'components/pc/upload'
import config from 'api/config'
import api from 'api/pc'
export default {
  // el: '#previewbox',
  props: {
    formdata: {
      type: Object,
      default: () => {
        return {
          items: []
        }
      }
    },
    submitData: {
      type: Object
    },
    loading: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  // item.widget.widgetId
  data () {
    var checkRegex1 = (rule, value, callback) => {
      console.log(rule, value, callback)
      var regex = /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])).{6,12}$/;
      var re = new RegExp(regex);
      if (!value) {
        return callback(new Error('不能为空'));
      }
      setTimeout(() => {
        if (!re.test(value)) {
          callback(new Error('请输入正确的信息'));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      formValue: {},
      selectValue: {},
      tableData: [{}],
      checkRegex1: checkRegex1,
      // dRules: {
      //   rulesRegex: [
      //     {validator: checkRegex, trigger: 'blur'}
      //   ]
      // },
      uploadAction: config.pcHost + '/member/uploadPic'
    }
  },
  created () {
    this.init()
  },
  mounted () {
    // setTimeout(() => {
    //   this.$nextTick(function () {
    //     this.$refs.formValue.resetFields();
    //   })
    // }, 500)
  },
  computed: {
    layout () {
      return this.formdata.layout.substring(5)
    },
    labelPosition () {
      return this.formdata.labelPosition
    }
  },
  methods: {
    init () {
      // this.a = this.$createElement('div', { attrs: { id: 'myId' } }, 'aaa')
      // console.log(this.formdata)
      this.tableData.length = 1
    },
    handleDelete (index, widgetId) {
      this.formValue[widgetId].splice(index, 1);
    },
    handleAdd (widgetId) {
      let subformdata = {}
      let subformArr = this.formValue[widgetId]
      for (let key in subformArr[0]) subformdata[key] = ''
      subformArr.push(subformdata)
    },
    selectGroupSuccess (selectNode, widgetId) {
      console.log(selectNode);
      let _selectNode = []
      for (let v of selectNode) {
        _selectNode.push({
          id: v.id,
          label: v.label
        })
      }
      this.formValue[widgetId] = _selectNode
    },
    handleLogoUploadCheck (res) {
      this.$nextTick(() => {
        this.$refs.dForm.validateField(res)
      })
    },
    resetForm (formName) {
      console.log(formName)
      // this.$refs[formName].resetFields();
    },
    checkRegex (rule, value, callback, opt) {
      let re = new RegExp(opt.regex);
      let verifyObj = {
        mobile: '^((\\(\\d{2,3}\\))|(\\d{3}\\-))?1\\d{10}$',
        phone: '^(0[0-9]{2,3}\\-)?([2-9][0-9]{6,7})+(\\-[0-9]{1,4})?$',
        code: '^\\d{6}$',
        card: '(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)',
        email: '^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$'
      }
      let isverify = true
      if (typeof opt.verify !== 'undefined') {
        let rex = new RegExp(verifyObj[opt.verify]);
        console.log(rex, value)
        if (!rex.test(value)) isverify = false
      }
      if (!value) {
        if (!opt.allowBlank) {
          return callback(new Error(`${opt.label}不能为空`));
        }
        if (opt.allowBlank) {
          return callback();
        }
      }
      setTimeout(() => {
        console.log(isverify)
        if (!re.test(value) || !isverify) {
          callback(new Error('请输入正确的信息'));
        } else {
          callback();
        }
      }, 1000);
    },
    save () {
      api.addMember(this.formValue).then(data => {
        console.log(data)
      }, resMsg => {
        this.$alert(resMsg, '错误', {confirmButtonText: '确定', type: 'error'})
      })
    },
    render (h) { // h 为 createElement 函数，接受三个参数
      // tag
      // data
      // children 具体看文档吧
      return h('div', this.allComponents.map(function (componentName) {
        return h(componentName)
      }))
    }
  },
  watch: {
    formdata (val) {
      var formValue = {}
      for (let variable of val.items) {
        if (variable.widget.type !== 'subform') {
          if (variable.widget.type === 'space') continue
          if (variable.widget.type === 'deptgroup') {
            formValue[variable.widget.widgetId] = []
            continue
          }
          formValue[variable.widget.widgetId] = ''
        } else {
          formValue[variable.widget.widgetId] = [{}]
          for (let chdvariable of variable.widget.items) {
            formValue[variable.widget.widgetId][0][chdvariable.widget.widgetId] = ''
          }
        }
      }
      this.formValue = formValue
    }
  },
  components: {
    selectList,
    Upload
  }
}
</script>

<style lang="scss" scoped>
.previewbox{
  min-height: 300px;
  .widget-view{
    // height: 50px;
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
