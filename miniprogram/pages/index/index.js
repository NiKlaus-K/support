//index.js
const app = getApp()
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: null,
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
    isSearch: false,
    workers: [],
    searchWorkers: []
  },

  onLoad: function() {
    // ===========================从缓存中获取用户数据=======================================
    this.getUserInfo()
    // ===========================手动刷新完成后停止下拉刷新动效=======================================
    wx.stopPullDownRefresh()
    const db = wx.cloud.database()
    db.collection('workers').get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          // 将获取到的数据库信息通过setData的方式赋给页面
          workers: res.data
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '列表获取失败，请联系管理员'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  // =================================轮播图=================================
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
  // =================================路由跳转 带参=================================
  click:function(e){
    // console.log(e);
    let workerId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../worker/worker?title=worker&id=' + workerId
    })
  },
  // =================================添加下拉刷新（钩子函数）=================================
  onPullDownRefresh() {
    //var that = this;
    // that.setData({
    //   currentTab: 0 //当前页的一些初始数据，视业务需求而定
    // })
    this.onLoad(); //重新加载onLoad()
    // 还需要在onLoad()函数里添加一下代码，用于完成load时停止下拉刷新动画效果
    // wx.stopPullDownRefresh() //手动刷新完成后停止下拉刷新动效
  },
  // 滚动到一定高度时触发
  // onPageScroll: function(e){
  //   console.log(e);
  //   this.setData({
  //     isFixed: e.scrollTop > 78 ? 1 : 0
  //   })
  // }
  // 搜索框事件
  onChangeSearch: function(e){
    let searchValue = e.detail.value;
    if (searchValue === ''){
      this.setData({
        isSearch: false
      })
    }else{
      this.setData({
        searchWorkers: []
      })
      let workerArr = this.data.workers;
      let searchWorkerArr = []
      workerArr.forEach(item => {
        if (item.area.indexOf(searchValue) > -1) {
          searchWorkerArr.push(item);
        }
        if (item.name.indexOf(searchValue) > -1) {
          searchWorkerArr.push(item);
        }
      })
      this.setData({
        searchWorkers: searchWorkerArr,
        isSearch: true
      })
    }
  },
  onClearSearch: function(){
    this.setData({
      isSearch: false
    })
  },
  // 从缓存中获取用户数据
  getUserInfo() {
    let that = this
    wx.getStorage({
      key: 'userInfo',
      success (res) {
        that.setData({
          userInfo: res.data
        })
      },
      fail (err) {
        console.log(err)
      }
    })
  }
})
