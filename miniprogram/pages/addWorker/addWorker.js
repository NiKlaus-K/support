// pages/addWorker/addWorker.js



const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        worker: {
            name: '',
            photo: '',
            mobile: '',
            introduce: '',
            area: ''
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    /**
     * 保存按钮事件
     */
    onAddWorker: function() {
        const db = wx.cloud.database()
        db.collection('worker').add({
            data: {
                count: 1
            },
            success: res => {
                // 在返回结果中会包含新创建的记录的 _id
                this.setData({
                    counterId: res._id,
                    count: 1
                })
                wx.showToast({
                    title: '新增记录成功',
                })
                console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
            },
            fail: err => {
                wx.showToast({
                    icon: 'none',
                    title: '新增记录失败'
                })
                console.error('[数据库] [新增记录] 失败：', err)
            }
        })
    },
    formSubmit: function(e) {
        console.log(e)
        const db = wx.cloud.database()
        let el = e.detail.value
        // let worker = {
        //     name: el.name,
        //     photo: el.photo,
        //     mobile: el.mobile,
        //     introduce: el.introduce,
        //     area: el.area
        // }
        // console.log("worker:" + worker)
        // console.log("worker:" + worker.name)
        // console.log("worker:" + worker.photo)
        // console.log("worker:" + worker.mobile)
        // console.log("worker:" + worker.introduce)
        db.collection('worker').add({
            data: {
                name: el.name,
                photo: el.photo,
                mobile: el.mobile,
                introduce: el.introduce,
                area: el.area
            },
            success: res => {
                // 在返回结果中会包含新创建的记录的 _id
                this.setData({
                    workerId: res._id,
                    name: el.name,
                    photo: el.photo,
                    mobile: el.mobile,
                    introduce: el.introduce,
                    area: el.area
                })
                wx.showToast({
                    title: '新增记录成功',
                })
                console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
            },
            fail: err => {
                wx.showToast({
                    icon: 'none',
                    title: '新增记录失败'
                })
                console.error('[数据库] [新增记录] 失败：', err)
            }
        })
    }

    // ,
    // test: function (e) {
    //   const db = wx.cloud.database()
    //   console.log(e)
    //   const name = e.detail.detail.value
    //   console.log(name)
    //   db.collection('worker').add({
    //     data: {
    //       name: name
    //     },
    //     success: res => {
    //       // 在返回结果中会包含新创建的记录的 _id
    //       this.setData({
    //         workerId: res._id,
    //         name: name
    //       })
    //       wx.showToast({
    //         title: '新增记录成功',
    //       })
    //       console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
    //     },
    //     fail: err => {
    //       wx.showToast({
    //         icon: 'none',
    //         title: '新增记录失败'
    //       })
    //       console.error('[数据库] [新增记录] 失败：', err)
    //     }
    //   })
    // }


})