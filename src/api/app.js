import io from './io'
import config from './config'

let base = config.appHost
let apiUrl = {
  getBasicWiget: { // 获取表头
    method: 'post',
    url: '/widget/getBasicWidgets'
  },
  addForm: { // 表单新增
    method: 'post',
    url: '/form/addForm'
  },
  getMemberList: { // 获取人员列表
    method: 'post',
    url: '/member/getMembers'
  },
  getMemberInfo: {
    method: 'post',
    url: '/member/getMembers'
  }
}
let apiUrlObj = {}
for (let key in apiUrl) {
  let methodVal = apiUrl[key]['method'] || 'get'
  apiUrlObj[key] = params => { return io[methodVal](`${base}${apiUrl[key]['url']}`, params) }
}

export default apiUrlObj
