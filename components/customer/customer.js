// components/customer/customer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchUrl: {
      type: String,
      value: ""
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    stringValue: "",
    showPicker: false,
    cursor: 0,
    customers: [],
    customerIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    searchToPage(searchKey) {
      let that = this
      wx.request({
        url: this.data.searchUrl,
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + wx.getStorageSync('token')
        },
        data: {
          q: searchKey
        },
        success(res) {
          if (res.data.code == 200 && res.data.data) {
            console.log('200')
            that.setData({
              customers: res.data.data,
              showPicker: true,
              customerIndex: 0
            })
          } else {
            wx.showModal({
              title: '错误',
              content: '发生错误' + res.data.code,
            })
            that.setData({
              customers: [],
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
    bindCustomerChange(e) {
      console.log(e)
      console.log(this.data.customers[e.detail.value])
      let customer = this.data.customers[e.detail.value]
      this.setData({
        customer: customer,
        customerIndex: e.detail.value
      })
      //触发事件 传递值到父组件
      this.triggerEvent('customerChangeEvent', {
        customer: this.data.customer
      })
    }
  }
})