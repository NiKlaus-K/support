// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'support-v715d'
})

const db = cloud.database().collection('users')

// 云函数入口函数
exports.main = async (event, context) => {

  let searchRes = await db.where({
    openid: event.userInfo.openid
  }).get()

  if(searchRes.data.length === 0) {
    db.add({
      data: {
        nickName: event.userInfo.nickName,
        gender: event.userInfo.gender,
        language: event.userInfo.language,
        city: event.userInfo.city,
        province: event.userInfo.province,
        country: event.userInfo.country,
        avatarUrl: event.userInfo.avatarUrl,
        openid: event.userInfo.openid
      },
    })
  } else if (isUpdate(searchRes.data[0], event.userInfo)) {
    db.where({
      openid: event.userInfo.openid
    }).update({
      data: {
        nickName: event.userInfo.nickName,
        gender: event.userInfo.gender,
        language: event.userInfo.language,
        city: event.userInfo.city,
        province: event.userInfo.province,
        country: event.userInfo.country,
        avatarUrl: event.userInfo.avatarUrl
      },
    })
  } else {
    return true
  }
  return true
}

const isUpdate = (searchRes, currentUserInfo) => {
  let keys =  Object.keys(currentUserInfo);
  console.log("============>", keys)
  let flag = keys.some(item => searchRes[item] !== currentUserInfo[item])
  return flag
}