// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'support-v715d',
  traceUser: true,
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  
  try {
    return await db.collection('comments')
      .where({
        workerId: event.workerId
      }).count()
  } catch(e){
    console.error('云函数【commentsCount】调用失败！', e)
  }
}