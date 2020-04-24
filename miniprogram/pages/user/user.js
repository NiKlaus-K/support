// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息
    this.getUserInfo();
  },
  // 获取用户信息
  getUserInfo: function() {
    let userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      this.setData({
        userInfo: userInfo
      })
    }
    let openid = wx.getStorageSync('openid').openid
    if(openid){
      this.setData({
        openid: openid
      })
    }
  }
})