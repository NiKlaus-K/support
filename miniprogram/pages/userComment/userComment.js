const util = require('../../utils/util.js');
const db = wx.cloud.database()

Page({
  data: {
    comment: {},
  },
  onLoad: function () {
  },
  submit(){
    let commentator = wx.getStorageSync('userInfo')
    if(commentator) {
      let i = 'comment.commentator'
      this.setData({
        [i]: commentator
      })
    }
    let comment = this.data.comment
    const db = wx.cloud.database()
    db.collection('comments').add({
      data: {
        worker: comment.worker,
        score: comment.score,
        content: comment.content,
        name: comment.name,
        phone: comment.phone,
        commentator: comment.commentator,
        date: util.formatDate(new Date()),
        createDate: new Date()
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '评论成功',
        })
        console.log('[数据库] [新增评论] 成功，评论: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增评论'
        })
        console.error('[数据库] [新增评论] 失败：', err)
      }
    })
    // 清空评论填写区域
    // this.reset();
  },
  // 清空评论填写区域
  reset() {
    this.setData({
      comment: {}
    })
  },
  updateScore: function (e) {
    let i = 'comment.score'
    this.setData({
      [i]: e.detail.score
    })
  },
  updateWorker: function(e) {
    let i = 'comment.worker'
    this.setData({
      [i]: e.detail
    })
  },
  updateContent:function (e) {
    // console.log("upadateContent==========>", e)
    let i = 'comment.content'
    this.setData({
      [i]: e.detail.detail.value
    })
  },
  updateName: function(e) {
    let i = 'comment.name'
    this.setData({
      [i]: e.detail.detail.value
    })
  },
  updatePhone: function(e) {
    let i = 'comment.phone'
    this.setData({
      [i]: e.detail.detail.value
    })
  }
})