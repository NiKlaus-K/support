// pages/worker/worker.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    worker:{
      photo: 'http://img3.a0bi.com/upload/ttq/20161015/1476518118768.png',
      name:'王五',
      mobile:'15649831654',
      comment:'发达是甲方爬山的服哦你按键佛熬时间爱上碰到',
      introduce:'酒叟发觉是佛山的房价来看撒娇的覅偶阿斯顿发了撒旦教佛我阿里上飞机拉水电费技术的路口附近恐龙当家',
      comment_num: 123,
      area: '山东省烟台市'
    },
    comment:{
      id:1,
      name:"张三",
      avatar:'http://img3.a0bi.com/upload/ttq/20161015/1476518118768.png',
      content:'我的看法度搜发生的纠纷拉水电费那到时见覅偶爱上对方就奥法',
      time:'Wed Jul 24 2019 01:52:09 GMT+0800 (中国标准时间) ',
      like:12,
      reply:{
        id:1,
        name:'李四',
        content:'就打发i就打发iOS的叫法是觉得覅的覅奇偶就打发iOS的叫法是觉得覅的覅奇偶就打发iOS的叫法是觉得覅的覅奇偶就打发iOS的叫法是觉得覅的覅奇偶OS的叫法是觉得覅的覅奇偶'
      }
    }

  },
  onLoad: function (options) {
    this.setData({
      title: options.title
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})