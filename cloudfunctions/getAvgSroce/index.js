// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'support-v715d',
  traceUser: true,
})

const db = cloud.database()
const $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('comments')
      .aggregate()
      .group({
        workerId: '$workerId',
        average: $.avg('$score')
      })
      .end()
  } catch (e) {
    console.error('云函数【getAvgSroce】调用失败！', e)
  }
}