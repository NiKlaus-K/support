// pages/addWorker/addWorker.js
// 引入外部js，并定义实例
// var cityArray = require('../../utils/cityArray.js')
// var arrays = cityArray.getAreaInfo();

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        photoTemp: '',
        photo: '',
        mobile: '',
        introduce: '',
        area: '',
        citysIndex: [0, 0, 0]
    },

    onLoad: function(options) {
      
    },

    formSubmit: function(e) {
        // console.log(e);
        const db = wx.cloud.database();
        let el = e.detail.value;
        // 上传图片到云服务器，然后then
        wx.cloud.uploadFile({
          cloudPath: 'workerPhotos/' + this.data.name + this.data.photoTemp.match(/\.[^.]+?$/)[0], // 上传至云端的路径
          filePath: this.data.photoTemp, // 小程序临时文件路径
        }).then( res =>{
          console.log('[上传照片] 成功：', res)
          // 返回文件 ID
          // console.log(res.fileID)
          this.setData({
            photo: res.fileID
          });
          db.collection('workers').add({
            data: {
              name: el.name,
              photo: this.data.photo,
              mobile: el.mobile,
              introduce: el.introduce,
              area: el.area
            },
            success: res => {
              wx.showToast({
                title: '新增员工成功',
              })
              console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
              // 保存后清空页面
              this.setData({
                form_info: '',
                isClear: true,
                photo: '',
                photoTemp:'',
                name: ''
              })
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '新增员工失败'
              })
              console.error('[数据库] [新增记录] 失败：', err)
            }
          })
        })
        .catch ( reason => {
          console.log('照片上传失败：' + reason);
        });
    },
  bindKeyInput: function (e) {
    this.setData({
      name: e.detail.detail.value
    })
  },
  // 上传图片
  addPhoto: function(e){
      this.setData({
         photoTemp: e.detail.current[0]
      })
  },
  doUpload: function () {
    wx.cloud.uploadFile({
      cloudPath: 'workerPhotos/' + this.data.name + this.data.photoTemp.match(/\.[^.]+?$/)[0], // 上传至云端的路径
      filePath: this.data.photoTemp, // 小程序临时文件路径
      // success: res => {
      //   console.log('[上传照片] 成功：', res)
      //   // 返回文件 ID
      //   console.log(res.fileID)
      //   this.setData({
      //     photo : res.fileID
      //   })
      // },
      // fail: e => {
      //   console.error('[上传文件] 失败：', e)
      //   wx.showToast({
      //     icon: 'none',
      //     title: '上传照片失败',
      //   })
      // }
    })
  }

  // doUpload: function () {
  //   // 选择图片
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function (res) {

  //       wx.showLoading({
  //         title: '上传中',
  //       })
  //       const filePath = res.tempFilePaths[0]
  //       // 上传图片
  //       const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
  //       wx.cloud.uploadFile({
  //         cloudPath,
  //         filePath,
  //         success: res => {
  //           console.log('[上传文件] 成功：', res)
  //           app.globalData.fileID = res.fileID
  //           app.globalData.cloudPath = cloudPath
  //           app.globalData.imagePath = filePath
  //           wx.navigateTo({
  //             url: '../storageConsole/storageConsole'
  //           })
  //         },
  //         fail: e => {
  //           console.error('[上传文件] 失败：', e)
  //           wx.showToast({
  //             icon: 'none',
  //             title: '上传失败',
  //           })
  //         },
  //         complete: () => {
  //           wx.hideLoading()
  //         }
  //       })

  //     },
  //     fail: e => {
  //       console.error(e)
  //     }
  //   })
  // },
    
  //   // 城市选择器——开始
  // func_changeCitysChange: function (e) {
  //   var that = this;
  //   var cityArray = that.data.cityArray;

  //   var address = '';
  //   if (that.data.ssq == undefined) {
  //     //下面方法中没有设置ssq，应该给它默认值 ，此时citysIndex相当于[0,0,0]
  //     var citysIndex = that.data.citysIndex;
  //     for (let i in citysIndex) {
  //       address += cityArray[i][citysIndex[i]]
  //     }
  //   } else {
  //     address = that.data.ssq;
  //   }

  //   wx.showModal({
  //     title: '',
  //     content: address + '',
  //   })
  // },
  // func_changeCitysChangeColumn: function (e) {
  //   var that = this;
  //   var cityArray = that.data.cityArray;

  //   var list1 = []; //存放第二列数据，即市的列
  //   var list2 = []; //存放第三列数据，即区的列

  //   var citysIndex = [];
  //   //主要是注意地址文件中的字段关系，省、市、区关联的字段有 sheng、di、level
  //   switch (e.detail.column) {
  //     case 0:
  //       //滑动左列
  //       for (let i = 0, len = arrays.length; i < len; i++) {
  //         if (arrays[i]['name'] == cityArray[0][e.detail.value]) {
  //           var sheng = arrays[i]['sheng'];
  //         }
  //         if (arrays[i]['sheng'] == sheng && arrays[i]['level'] == 2) {
  //           list1.push(arrays[i]['name']);
  //         }
  //         if (arrays[i]['sheng'] == sheng && arrays[i]['level'] == 3 && arrays[i]['di'] == arrays[1]['di']) {
  //           list2.push(arrays[i]['name']);
  //         }
  //       }


  //       citysIndex = [e.detail.value, 0, 0];
  //       var ssq = cityArray[0][e.detail.value] + list1[0] + list2[0] + '';

  //       that.setData({
  //         global_sheng: sheng
  //       });
  //       break;
  //     case 1:
  //       //滑动中列
  //       var di;
  //       var sheng = that.data.global_sheng;
  //       list1 = cityArray[1];
  //       for (let i = 0, len = arrays.length; i < len; i++) {
  //         if (arrays[i]['name'] == cityArray[1][e.detail.value]) {
  //           di = arrays[i]['di'];
  //         }
  //       }
  //       for (let i = 0, len = arrays.length; i < len; i++) {
  //         if (arrays[i]['sheng'] == sheng && arrays[i]['level'] == 3 && arrays[i]['di'] == di) {
  //           list2.push(arrays[i]['name']);
  //         }
  //       }
  //       citysIndex = [that.data.citysIndex[0], e.detail.value, 0];

  //       var ssq = cityArray[0][that.data.citysIndex[0]] + list1[e.detail.value] + list2[0] + '';

  //       break;
  //     case 2:
  //       //滑动右列
  //       list1 = cityArray[1];
  //       list2 = cityArray[2];
  //       citysIndex = [that.data.citysIndex[0], that.data.citysIndex[1], e.detail.value];

  //       var ssq = cityArray[0][that.data.citysIndex[0]] + list1[that.data.citysIndex[1]] + list2[e.detail.value] + '';
  //       break;
  //   }

  //   that.setData({
  //     "cityArray[1]": list1,//重新赋值中列数组，即联动了市
  //     "cityArray[2]": list2,//重新赋值右列数组，即联动了区
  //     citysIndex: citysIndex,//更新索引
  //     ssq: ssq,//获取选中的省市区
  //   });
  // },
  //  // 城市选择器结束
})