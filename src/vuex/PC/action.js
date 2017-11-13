/**
 * Created by lenovo on 2017/9/19.
 */
import api from 'api'
// import axios from 'axios'
// import config from 'api/config'

// let base = config.pcHost
export default {
  getBasicWiget ({commit}) {
    let param = {
      /* formId: 'c53403d2-9e5e-472f-ba7f-a7ec95193778',
      spId: 'spId_123456789' */
    }
    return new Promise((resolve, reject) => {
      let tidy = (data) => {
        let newobj = {}
        for (let item of data) {
          newobj[item.widgetId] = {
            type: item.type
          }
        }
        return newobj
      }
      api.getBasicWiget(param).then(res => {
        commit('MT_FORMBASICCHECK', res.data)
        commit('MT_FORMTYPEMAP', tidy(res.data))
        commit('MT_FORMID', res.formId)
        commit('MT_FORMGRID', res.layout)
        resolve(res)
      }).catch(function (error) {
        reject(error);
      });
    })
  },
  getBasicWigetStruct ({commit, state}) {
    return new Promise((resolve, reject) => {
      api.getFormList({spId: state.spId}).then(res => {
        commit('MT_FORMBASICSTRUCT', res[0])
        resolve(res)
      }).catch(function (error) {
        reject(error);
      });
    })
  },
  getAllchildrenGroups ({commit, state}) {
    let recursion = (data) => {
      let result = {}
      let func = (data) => {
        for (let obj of data) {
          result[obj.id] = obj.groupName
          if (obj.children) func(obj.children)
        }
      }
      func(data)
      return result
    }
    return new Promise((resolve, reject) => {
      api.getAllchildrenGroups({groupId: 0}).then(res => {
        commit('MT_GROUPDATA', res)
        commit('MT_GROUPMAP', recursion(res))
        resolve(res)
      }).catch(function (error) {
        reject(error);
      });
    })
  }
}
