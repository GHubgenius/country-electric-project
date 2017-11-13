import io from './io'
import config from './config'

let base = config.pcHost
let apiUrl = {
  getBasicWiget: { // 获取表头
    method: 'post',
    url: '/widget/getBasicWidgets'
  },
  getFormList: { // 查询表单列表
    method: 'post',
    url: '/form/getFormBySpId'
  },
  addForm: { // 表单新增
    method: 'post',
    url: '/form/addForm'
  },
  updateForm: { // 表单新增
    method: 'post',
    url: '/form/updateForm'
  },
  getOrganisation: {
    method: 'post',
    url: '/group/getAllchildrenGroups'
  },
  saveDataConfig: { // 数据项配置保存
    method: 'post',
    url: '/widgetSelects/save'
  },
  queryDataConfig: { // 查询数据项配置
    method: 'post',
    url: '/widgetSelects/getBySelectTypes'
  },
  addMember: { // 人员信息新增
    method: 'post',
    url: '/member/addMember'
  },
  updateMember: { // 人员信息修改
    method: 'post',
    url: '/member/updateMember'
  },
  delMember: { // 人员信息修改
    method: 'post',
    url: '/member/delMember '
  },
  getMemberList: { // 获取人员列表
    method: 'post',
    url: '/member/getMembers'
  },
  getMemberInfoById: { // 获取人员列表
    method: 'post',
    url: '/member/getMemberInfoById'
  },
  getAllchildrenGroups: { // 群组查询
    method: 'post',
    url: '/group/getAllchildrenGroups'
  },
  getImportHistory: { // 查询导入历史
    method: 'post',
    url: '/importLog/statistics'
  },
  getImportDetailList: { // 查询导入详情列表
    method: 'post',
    url: '/importLog/getImportLogDetails'
  },
  getOrganisationCount: { // 查询组织架构下人员的统计信息
    method: 'post',
    url: '/member/statistics'
  },
  saveMenu: { // 文案配置保存菜单
    method: 'post',
    url: '/menu/addMenus'
  },
  getMenu: {// 获取文案配置
    method: 'post',
    url: '/menu/getMenus'
  }
}
let apiUrlObj = {}
for (let key in apiUrl) {
  let methodVal = apiUrl[key]['method'] || 'get'
  apiUrlObj[key] = params => { return io[methodVal](`${base}${apiUrl[key]['url']}`, params) }
}

export default apiUrlObj
