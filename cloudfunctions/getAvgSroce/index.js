// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
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
    console.error(e)
  }
}