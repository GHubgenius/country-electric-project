<template>
    <section>
        <TitleSet></TitleSet>
        <div class="pb-right-content pb-import-modules"
             v-loading.fullscreen.lock="loading"
             element-loading-text="正在上传文件"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
            <div style="text-align: left;display: inline-block" class="backArea">
                <div  @click="back"><i class="el-icon-arrow-left"></i>返回</div>
            </div>
            <h3 class="pb-title">批量导入人员信息</h3>
            <el-form :inline="true"  class="demo-form-inline" labelWidth="60px">
                <el-form-item label="文件：">
                    <el-input  style="width: 350px" v-model="uploadName" readonly></el-input>
                </el-form-item>
                <el-upload
                        class="upload-demo"
                        ref="upload"
                        :action="uploadUrl"
                        :on-change="beforeUpload"
                        :on-success="uploadSuccess"
                        :on-error="uploadError"
                        :auto-upload="false"
                        :multiple="false"
                        list-type="text"
                        :show-file-list="false"
                        :file-list="fileList">
                    <el-button size="small" type="primary">选择文件</el-button>
                </el-upload>
                <el-button size="small" type="primary" style="margin-left: 5px"@click="downloadModule">模板下载</el-button>
            </el-form>
            <el-button  size="small" type="primary" @click="submitUpload">导入</el-button>
            <el-row style="margin: 15px 0">
                <el-col :span="4">数据总数：<span>{{uploadInfo.total}}</span></el-col>
                <el-col :span="4">正常数：<span class="color-Success">{{uploadInfo.normal}}</span></el-col>
                <el-col :span="4">重复数：<span class="color-Blue">{{uploadInfo.repeat}}</span></el-col>
                <el-col :span="4">错误数：<span class="color-Danger">{{uploadInfo.error}}</span></el-col>
            </el-row>
            <h3 class="pb-title">导入历史</h3>
            <p class="historyinfo">导入历史明细</p>
            <el-table
                    :data="tableData"
                    class="tablelist"
            >
                <el-table-column align="center" prop="importTime" :width="180">
                </el-table-column>
                <el-table-column align="center" prop="deptName" :width="280">
                </el-table-column>
                <el-table-column align="center"  :width="280">
                    <template scope="scope">
                        导入数据<span class="color-Danger">{{scope.row.total}}</span>条
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button type="text" size="small"@click="lookDetail(scope.row.id)">查看结果</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    class="pageBox"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next"
                    :total="totalNumber">
            </el-pagination>
        </div>
    </section>
</template>
<script>
import TitleSet from 'modules/pc/personManage/components/title'
import config from 'api/config'
import api from 'api'
let base = config.pcHost
export default{
  data () {
    return {
      fileList: [],
      uploadName: '',
      loading: false,
      upError: false,
      success: false,
      uploadInfo: {
        total: 0,
        normal: 0,
        repeat: 0,
        error: 0
      },
      tableData: [
      ],
      uploadUrl: base + '/member/importMembers',
      currentPage: 1,
      pageSize: 10,
      totalNumber: 0
    }
  },
  methods: {
    back () {
      window.history.go(-1)
    },
    beforeUpload (file) {
      console.log(file.name)
      if (file.name.split('.')[1] !== 'xls') {
        this.$message.warning('仅支持上传模板文件')
        return
      }
      if (this.upError === true) {
        this.uploadName = ''
        this.upError = false
        return
      }
      if (this.success === true) {
        this.uploadName = ''
        this.success = false
        return
      }
      this.uploadName = file.name
    },
    submitUpload () {
      if (this.uploadName === '') {
        this.$message.warning('请先选择需要上传的文件')
        return
      }
      this.loading = true
      console.log(this.fileList)
      this.$refs.upload.submit();
    },
    uploadSuccess (res) {
      console.log(res)
      this.loading = false
      this.success = true
      if (res.resCode === '0' || res.resCode === '200') {
        this.$message.success('文件上传成功')
        this.uploadInfo.total = res.data.importCount
        this.uploadInfo.normal = res.data.successCount
        this.uploadInfo.repeat = res.data.repeatCount
        this.uploadInfo.error = res.data.failedCount
        this.getImportHis()
      } else {
        this.$message.warning(res.resMsg)
      }
    },
    uploadError (err) {
      console.log(err)
      this.loading = false
      this.upError = true
      this.$message.success('文件上传失败')
    },
    lookDetail (id) {
      window.sessionStorage.importDetailId = id
      window.location.href = '#/importDetail'
    },
    downloadModule () { // 模板下载
      window.location.href = base + '/widget/dowLoadMould?spId=15458313213xxx'
    },
    getImportHis () {
      let param = {
        pageSize: this.pageSize,
        pageNo: this.currentPage
      }
      api.getImportHistory(param).then(res => {
        this.tableData = res.data
        this.totalNumber = res.dataCount
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getImportHis()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getImportHis()
    }
  },
  components: {
    TitleSet
  },
  created () {
    this.getImportHis()
  }
}
</script>
<style lang="scss" scoped>
    @import '~styles/base/vars';
    .pb-title{margin: 30px 0}
    .upload-demo{
        display: inline-block;
        margin-top: 4px;
    }
    .tablelist{
        margin-top: -44px;
    }

    .pb-right-content{
        text-align: left;
    }
    .pageBox{
        float: right;
        margin-top: 15px;
    }
    .backArea{
        &:hover{
            cursor: pointer;
            color:$color-primary;
        }
        i{
            margin-right: 5px;
        }
    }
</style>
