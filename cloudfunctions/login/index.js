// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署(云端安装依赖)”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  env: 'support0535-e681d9'
})

exports.main = (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    openid: wxContext.OPENID
  }
}
