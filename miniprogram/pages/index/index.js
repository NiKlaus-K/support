//index.js
const app = getApp()
// 开始----------------------调用用户登录API
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    // 轮播图
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    // 是否显示面板指示点
    indicatorDots: false,
    // 是否自动切换
    autoplay: true,
    // 自动切换时间间隔
    interval: 5000,
    // 滑动动画时长
    duration: 1000,
    mobile:111254648,
    worker: []
  },

  onLoad: function() {
    wx.stopPullDownRefresh() //手动刷新完成后停止下拉刷新动效
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    // 查询worker信息——开始
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('worker').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          // 将获取到的数据库信息通过setData的方式赋给页面
          'worker': res.data
        })
        // console.log('[数据库] [查询记录] 成功: ', res.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '列表获取失败，请联系管理员'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
    // 查询worker信息——结束
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  // 轮播图
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  // 路由跳转 带参——开始
  click:function(e){
    console.log(e);
    var workerId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../worker/worker?title=worker&id=' + workerId
    })
  },
  // 路由跳转 带参——结束
  // 添加下拉刷新（钩子函数）——开始
  onPullDownRefresh() {
    //var that = this;
    // that.setData({
    //   currentTab: 0 //当前页的一些初始数据，视业务需求而定
    // })
    this.onLoad(); //重新加载onLoad()
    // 还需要在onLoad()函数里添加一下代码，用于完成load时停止下拉刷新动画效果
    // wx.stopPullDownRefresh() //手动刷新完成后停止下拉刷新动效
  }
  // 添加下拉刷新（钩子函数）——结束

})
// 结束----------------------调用用户登录API
