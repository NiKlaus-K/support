// components/selectWorker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: 5
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: {},
    workerList: [],
    workerListBySearch: [],
    isShowPopup: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getWorkerList: async function() {
      const { result } = await wx.cloud.callFunction({
        name: 'worker',
        data: {
          action: 'getWorkerList'
        }
      })
      this.setData({
        workerList: result,
        workerListBySearch: result
      })
    },
    openWorkerList: function () {
      this.getWorkerList()
      this.setData({
        isShowPopup: true
      })
    },
    closeWorkerList: function() {
      this.setData({
        isShowPopup: false
      })
    },
    searchWorker: function(e) {
      let value = e.detail.value
      let resultBySearch = this.data.workerList.filter(item => item.name.indexOf(value) > -1)
      this.setData({
        workerListBySearch: resultBySearch
      })
    },
    clickWorker: function(e) {
      // console.log("clickWorker=============>", e)
      // console.log("clickWorker=============>", e.currentTarget.dataset.id)
      let selectedId = e.currentTarget.dataset.id
      let selectedWorker = this.data.workerListBySearch.find(item => item._id === selectedId)
      this.setData({
        selected: selectedWorker
      })
      this.triggerEvent('updateSelect', selectedWorker)
      this.closeWorkerList()
    },
    // handleInputBlur(event) {
    //   console.log(event)
    //   this.triggerEvent('linblur', event);
    // },
  }
})
