const util = require('../../utils/util.js');

// pages/worker/worker.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    workerId:'',
    worker:{
      photo: '',
      name:'',
      mobile:'',
      comment:'',
      introduce:'',
      comment_num: '',
      area: ''
    },
    score:'',
    comments: []

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
    let that = this;
    /**括号内的options可以改名的，结果一样，无影响，已测试！*/
    // console.log(options);//就是一个接收传递过来的参数的对象
    // 将获取到的人员ID赋值到当前页面
    this.setData({
      'workerId' : options.id //（接受url传参，不限制只能传递id变量名，可以传递多个变量名值）
    })
    console.log(this.workerId);
    /**具体逻辑实现 */
    // 查询worker信息
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('worker').where({
      // openid是什么？
      _openid : this.data.openid,
      _id : this.workerId
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          // 将获取到的数据库信息通过setData的方式赋给页面
          'worker': res.data[0]
        })
        // console.log('[数据库] [查询记录] 成功: ', res.data[0])
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '列表获取失败，请联系管理员'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      },
    })
    // 获取评论列表
    db.collection('comments').where({
      workerId:this.workerId
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res, null, 2),
          // 将获取到的数据库信息通过setData的方式赋给页面
          'comments': res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
        console.log('[comments] 成功: ', comments)

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '列表获取失败，请联系管理员'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      },
    })
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

  },
  // 提交评论——开始
  commentSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const db = wx.cloud.database()
    let el = e.detail.value
    db.collection('comments').add({
      data: {
        commentContent: el.commentContent,
        score: el.score,
        workerId: this.data.workerId,
        replyId: this.data.replyId,
        date: util.formatTime(new Date()),
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          commentContent: el.commentContent,
          score: el.score,
          workerId: this.data.workerId,
          replyId: this.data.replyId
        })
        wx.showToast({
          title: '评论成功',
        })
        console.log('[数据库] [新增评论] 成功，评论 _id: ', res._id)
        // 保存后清空页面
        this.setData({
          form_info: '',
          isClear: true
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增评论'
        })
        console.error('[数据库] [新增评论] 失败：', err)
      }
    })
    this.onLoad(); //重新加载onLoad()
  },
  // 重置按钮暂不使用
  // ,
  // formReset: function () {
  //   console.log('form发生了reset事件')
  // }
  // 提交评论——结束

  // 评分按钮事件——开始
  changeScore(e){
    // console.log('score:', e.detail.score)
    this.setData({
      score: e.detail.score
    })
    // 调用data里的数据，需要使用this.data.XXX，而不是this.XXX
    // console.log('score1:', this.data.score)
  },
  // 评分按钮事件——结束
  // 添加下拉刷新（钩子函数）——开始
  onPullDownRefresh() {
    // 重新加载评论区页面 方法暂未定义

    // 还需要在函数里添加一下代码，用于完成加载后停止下拉刷新动画效果
    // wx.stopPullDownRefresh() //手动刷新完成后停止下拉刷新动效
  },
  // 添加下拉刷新（钩子函数）——结束
  getCommentList(){
    // 查询评论嘻嘻
    const db = wx.cloud.database()
    // 查询当前用户所有的评论
    db.collection('comments').where({
      // openid是什么？
      _openid: this.data.openid,
      _id:workerId
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          // 将获取到的数据库信息通过setData的方式赋给页面
          'comments': res.data[0]
        })
        console.log('[数据库] [查询记录] 成功: ', res.data[0])
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '列表获取失败，请联系管理员'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  }
})