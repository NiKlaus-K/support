// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署(云端安装依赖)”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  env: 'support-v715d',
  traceUser: true,
})

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(wxContext)
  return {
    openid : wxContext.OPENID
  }
}
