const util = require('../../utils/util.js');

// pages/worker/worker.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isDisplay: true,
    userInfo: {},
    openid: ''
  },
  /*
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    try {
      let userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        if (userInfo.length > 1) {
          this.setData({
            userInfo: userInfo,
            openid: userInfo.openid
          })
        } else {
          // 获取用户信息
          this.onGetUserInnfo();
          // 获取用户openid
          this.onGetUserOpenid();
        }
      } else {
        // 获取用户信息
        this.onGetUserInnfo();
        // 获取用户openid
        this.onGetUserOpenid();
      }
    } catch (e) {
      console.log(e)
    }
  },
  // 获取用户信息
  bindGetUserInfo: function (e) {
    const that = this
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo,
          isDisplay: true
        })
        that.data.userInfo.openid = that.data.openid
        wx.setStorageSync('userInfo', that.data.userInfo)
      }
    })
  },
  onGetUserInnfo() {
    // 查看是否授权
    const that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo'] === false) {
          // 未授权
          that.setData({
            isDisplay: false
          })
        } else if (res.authSetting['scope.userInfo'] === true) {
          // 已经授权
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo: res.userInfo,
                isDisplay: true
              })
              that.data.userInfo.openid = that.data.openid
              wx.setStorageSync('userInfo', that.data.userInfo)
            }
          })
        } else {
          // res.authSetting['scope.userInfo']不存在的时候
          that.setData({
            isDisplay: false
          })
        }
      }
    })
  },
  onGetUserOpenid() {
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        console.log("云函数【login】调用成功！", res);
        this.setData({
          openid: res.result.openid
        })
        this.data.userInfo.openid = this.data.openid
        wx.setStorageSync('userInfo', this.data.userInfo)
      },
      fail: err => {
        console.log("云函数【login】调用失败！", err)
      }
    })
  }
})