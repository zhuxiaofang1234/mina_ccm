const app = getApp()
const api = app.globalData.api
Page({
  onShareAppMessage() {
    return {
      title: 'radio',
      path: 'page/component/pages/radio/radio'
    }
  },

  data: {
    items: [
      { value: '0', name: '0.0' },
      { value: '0.5', name: '0.5' },
      { value: '1', name: '1.0', checked: 'true' },
      { value: '1.5', name: '1.5' },
      { value: '2', name: '2.0' },
      { value: '2.5', name: '2.5' },
      { value: '3', name: '3.0' },
    ],
    rules: [
      { 
        name: 'ts_mark',
        rules: { required: true, message: '分数必填' },
      },
      { 
        name: 'ts_mark_remark',
        rules: { required: true, message: '评价必填' },
      },
      ],
  },
  onLoad: function(options) {
    this.setData({
      ['formData.id']: options.id
    })
  },

  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      items,
      ['formData.ts_mark']: e.detail.value
    })
  },
  formInputChange(e) {
    console.log(e)
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  submitForm(e) {
    this.selectComponent('#ts-mark-form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      console.log(this.data.formData)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
      } else {
        wx.showToast({
          title: '校验通过'
        })
        var that = this
        api.markForm(this.data.formData).then(res => {
          if (res.code == 200) {
            wx.showToast({
              title: res.msg,
              icon: 'success',
              mask: true
            })
            wx.redirectTo({
              url: '/pages/form-list/index',
            })
          }
        })
      }
    })
  }
})