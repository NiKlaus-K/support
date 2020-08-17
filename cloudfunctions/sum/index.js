// 云函数入口函数
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()

exports.main = (event, context) => {
  console.log("event:", event)
  console.log("context:", context)
  return {
    sum: event.a + event.b
  }
}