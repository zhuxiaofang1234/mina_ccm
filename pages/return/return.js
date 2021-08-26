// pages/return/return.js
const app = getApp()
const API = require('../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formId: null,
    showTopTips: false,
    returnTypeIndex: 1,
    returnType: ["新料返回", "旧料返回"],
    recycleType: ["总部", "东北区", "华北区", "华东区", "华南区", "华中区", "西北区", "西南区"],
    recycleTypeIndex: 0,
    formData: {

    },
    rules: [{
        name: 'return_pn',
        rules: {
          required: true,
          message: 'PN是必填项'
        },
      },
      {
        name: 'return_name',
        rules: {
          required: true,
          message: '配件名称是必填项'
        },
      },
      {
        name: 'return_sn',
        rules: {
          required: true,
          message: 'SN是必填项'
        },
      },
      {
        name: 'return_courier_number',
        rules: {
          required: true,
          message: '运单号是必填项'
        },
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var formId = options.id
    this.setData({
      formId: formId,
      ['formData.id']: formId
    })
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
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  submitForm() {
    this.selectComponent('#login-form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
      } else {
        wx.showLoading({
          title: '处理中..'
        })
        console.log(this.data.formData)
        API.accessoryReturn(this.data.formData).then(res => {
          if (res.code == 200) {
            wx.hideLoading()
            wx.navigateBack()
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            });
            setTimeout(function() {
              wx.hideLoading()
            }, 1500)
          }
        })

      }
    })
  },
  //bindRecycleChange
  bindReturnTypeChange: function(e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      returnTypeIndex: e.detail.value,
      [`formData.return_type`]: e.detail.value,
    })
  },
  bindRecycleChange: function(e) {
    this.setData({
      recycleTypeIndex: e.detail.value,
      [`formData.returned_to`]: e.detail.value,
    })
  },
})