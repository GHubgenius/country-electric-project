/**
 * Created by lenovo on 2017/10/16.
 */
const utils = {}
utils.arrSplice = (arr, index1, index2) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]; // splice返回当前数组中移除的函数
  return arr;
}
utils.arrSort = (key) => {  // 数组对象根据key值排序
  return function (a, b) {
    var value1 = a[key];
    var value2 = b[key];
    return value1 - value2;
  }
}
utils.clickDocHide = (el, data) => { // 在vue中点击文本其他地方弹出框消失
  for (let i = 0; i < data.length; i++) {
    el.$refs[data[i]].$el.childNodes[0].onclick = function (e) {
      let ev = window.e || e
      ev.stopPropagation()
    }
  }
}
utils.getRootId = (data) => { // 获取一组数组中的最上层节点
  let id = []
  let pid = []
  let root = []
  for (let i = 0; i < data.length; i++) {
    id.push(data[i].id)
    pid.push(data[i].groupId)
  }
  for (let j = 0; j < pid.length; j++) {
    if (id.indexOf(pid) < 0) {
      root.push(pid[j])
    }
  }
  console.log(root)
}
utils.changeNameToVueTree = (data) => { // 改变参数名称，用于渲染vue的树形组件
 /* for (let i = 0; i < data.length; i++) {
    data[i].id = data
  } */
}
export default utils
