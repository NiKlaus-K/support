const util = require('../../utils/util.js');
const db = wx.cloud.database()

// pages/worker/worker.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShowLogin: true,
    userInfo: {},
    openid: ''
  },
  /*
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    try {
      let userInfo = wx.getStorageSync('userInfo')
      // console.log("缓存中userInfo数据", userInfo)
      if (userInfo && userInfo.openid) {
        this.setData({
          userInfo: userInfo,
          openid: userInfo.openid,
          isShowLogin: false
        })
      } else {
        // 获取用户信息
        this.onGetUserInfo();
        // 检查并更新数据库Users信息
        this.addUser(this.data.userInfo)
      }
    } catch (e) {
      console.log("onLoad=======>failed", e)
    }
  },
  // 点击授权按钮，获取用户信息
  bindGetUserInfo: function (e) {
    let that = this
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo,
          isShowLogin: false
        })
        // 获取用户openid
        that.onGetUserOpenid()
      }
    })
  },
  onGetUserInfo() {
    // 查看是否授权
    let that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] === false) {
          // 未授权
          that.setData({
            isShowLogin: true
          })
        } else if (res.authSetting['scope.userInfo'] === true) {
          // 已经授权
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo: res.userInfo,
                isShowLogin: false
              })
              // 获取用户openid
              that.onGetUserOpenid()
            }
          })
        } else {
          // res.authSetting['scope.userInfo']不存在的时候
          that.setData({
            isShowLogin: true
          })
        }
      }
    })
  },
  onGetUserOpenid() {
    let that = this
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        console.log("云函数【login】调用成功！", res);
        if (res.result && res.result.openid) {
          that.setData({
            openid: res.result.openid
          })
          that.data.userInfo.openid = that.data.openid
          wx.setStorageSync('userInfo', that.data.userInfo)
          that.addUser(that.data.userInfo)
        } else {
          // 重新登录
          that.setData({
            isShowLogin: false
          })
        }
      },
      fail: err => {
        console.log("云函数【login】调用失败！", err)
      }
    })
  },
  addUser(userInfo) {
    if(userInfo.openid) {
      wx.cloud.callFunction({
        name: "addUser",
        data:{
          userInfo: userInfo
        },
        success: res => {
          console.log("云函数【addUser】调用成功！", res);
        },
        fail: err => {
          console.log("云函数【addUser】调用失败！", err)
        }
      })
    }
  },
  addUserAccount() {
    console.log("addUserAccount")
  },
  adminLogin() {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  goComment() {
    wx.navigateTo({
      url: '../userComment/userComment'
    })
  }
})