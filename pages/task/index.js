// pages/faq/index.js
const app = getApp();
const api  = app.globalData.api
const auth = app.globalData.auth
const util = app.globalData.util;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openType: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    auth.checkJwt().then(res => {
      if (!res) {
        auth.refreshToken()
      }
    })
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
  //现场维修
  goRepair(e) {
    if (this.data.wechatPhone) {
      wx.navigateTo({
        url: '/pages/repair/index'
      })
    }
  },
  getPhoneNumber(e) {
    console.log(e)
  },

  //现场装机
  goInstall(e) {
    if (this.data.wechatPhone) {
      wx.navigateTo({
        url: '/pages/install/index'
      })
    }
  },
  //设备保养
  goEquipmentMaintain(e) {
    if (this.data.wechatPhone) {
      wx.navigateTo({
        url: '/pages/equipmentMaintain/index'
      })
    }
  },
  //信息查询
  toQueryInfo(){
    wx.navigateTo({
      url: '/pages/queryInfo/index',
    })
  },

  //医院信息录入
  toCreateHospital(){
    wx.navigateTo({
      url: '/pages/selectHospital/index?type=details'
    })
  },

  //检测登录状态
  checkLoginStatus:function(e){
    auth.checkHasLogined().then(res => {
      if (!res) {
        wx.showModal({
          title: '提示',
          content: '请先登录!',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.switchTab({
                url: '/pages/my/index',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
              wx.showToast({
                title: '不登录注册所有功能将无法使用',
                icon: 'none'
              })
            }
          }
        })
      } else {
        wx.navigateTo({
          url: e.currentTarget.dataset.url,
        })
      }
    })  
  }
   
})