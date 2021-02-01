// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'support-v715d',
  traceUser: true,
})

const db = cloud.database()
const $ = db.command.aggregate
const avgSroce = cloud.getAvgSroce()
console.log(avgSroce)

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(avgSroce)
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}