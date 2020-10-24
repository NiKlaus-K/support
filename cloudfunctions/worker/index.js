// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if (event.action && worker[event.action]) {
    const result = await worker[event.action](wxContext, event)
    return result
  }
  return {
    message: 'hello there! you need to provide a valid action to use worker API.',
    error: -1,
  }
}


const db = cloud.database()
const _ = db.command
// 聚会助手 函数列表
const worker = {
  async createWorker(context, params) {
    const result = await db.collection('workers').add({
      data: {
        area: params.area,
        introduce: params.introduce,
        like: 0,
        mobile: params.mobile,
        name: params.name,
        photo: params.photo,
        createdAt: Date.now(),
        updateAt: Date.now(),
        createdBy: context.OPENID,
      }
    })
    return {
      result
    }
  },
  // 添加Like
  async addLike(context, params) {
    const worker = await db.collection('workers').where({
      _id: params.id
    }).get()
    const [worker] = worker.data
    worker.like++
    await db.collection('workers').where({
      _id: params.id
    }).update({
      data: worker
    })
    return {}
  },

  // 获取worker列表
  async getWorkerList(context, params) {
    const result = await db.collection('workers').get()
    const workerList = result.data
    return workerList
  }
}