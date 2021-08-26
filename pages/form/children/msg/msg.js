// pages/form/children/msg/msg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  
  goList(e) {
    wx.reLaunch({
      url: '/pages/form-list/index',
    })
  },
  
  goBack() {
    wx.navigateBack()
  }

  
})