// components/select-filter/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchUrl: {
      type: String,
      value: ""
    },
    pickerName: {
      type: String,
      value: ""
    },
    placeholder: {
      type: String,
      value: ""
    },
    range_key: {
      type: String,
      value: ""
    },
    paramKey: {
      type: String,
      value: ""
    },
    items: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    index: 0,
    stringValue: "",
    showPicker: false,
    cursor: 0,
    // items: [],
    formData: {

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    searchToPage(searchKey) {
      let that = this
      let _url = this.data.searchUrl
      const _q = that.properties.paramKey
      var _data = {}
      _data[_q] = searchKey

      wx.request({
        url: _url,
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + wx.getStorageSync('token')
        },
        data: _data,
        success(res) {
          if (res.data.code == 200 && res.data.data) {
            console.log(res)
            that.setData({
              items: res.data.data,
              showPicker: true,
              index: 0
            })
          } else {
            wx.showModal({
              title: '错误',
              content: '发生错误' + res.data.code,
            })
            that.setData({
              items: [],
              showPicker: false
            })
          }
        }
      })
    },
    inputSearchTyping(e) {
      console.log(e)
      if (e.detail.value.length < 2) {
        console.log('length < 2')
        this.setData({
          showPicker: false
        })
        return
      }
      this.data.cursor = 0
      this.searchToPage(e.detail.value)
    },
    bindSelectFilterChange(e) {
      console.log(e)
      console.log(this.data.items[e.detail.value])
      let list = this.data.items[e.detail.value]
      this.setData({
        list: list,
        index: e.detail.value
      })
      //触发事件 传递值到父组件
      this.triggerEvent('selectFilterChangeEvent', {
        list: this.data.list
      })
    }

  }
})
