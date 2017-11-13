export default process.env.NODE_ENV === 'development' ? {
  // 开发环境
  pcHost: 'http://10.0.51.191:8039/api/pc',
  appHost: 'http://10.0.51.191:8040/api/app'
} : {
  // 发布环境
  pcHost: `http://${window.location.hostname}/web`,
  appHost: `http://${window.location.hostname}/api`
}
