// pages/internal-form/index.js
const API = require('../../utils/api')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusType: [{
        "status": 0,
        "statusLabel": "全部"
      },
      {
        "status": 1,
        "statusLabel": "待审核"
      },
      {
        "status": 2,
        "statusLabel": "待现场"
      },
      {
        "status": 3,
        "statusLabel": "已驳回"
      },
      {
        "status": 5,
        "statusLabel": "搜索"
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
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
    this.doneShow()
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
  doneShow: function () {
    // 获取订单列表
  },
  getFormList: function () {
    var that = this
    API.internalFormList().then(function (res) {
      if (res.code == 200) {
        that.setData({
          formList: res.data
        })
      } else {
        that.setData({
          form_list: null
        })
      }
    })
  },
  //tslist
  getFormTsList: function () {
    var that = this
    API.formTsList().then(function (res) {
      if (res.code == 200) {
        that.setData({
          formList: res.data
        })
      } else {
        that.setData({
          form_list: null
        })
      }
    })
  },
  //tap点击
  statusTap: function (e) {
    console.log(e)
    const curType = e.currentTarget.dataset.index;
    this.data.currentType = curType
    this.setData({
      currentType: curType
    });
    this.onShow()
  },
})