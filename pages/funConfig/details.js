// pages/funConfig/details.js
const app = getApp()
const api = app.globalData.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    config:'',
    function_standard:[],//标配模板 
    function_choose:[],//选配模板
    function_try:[],//试用模板
    imageType: "default",
    description: '暂无配置文件申请详情信息'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let recordId = options.recordId;
    console.log(options)
    if(recordId){
      this.getconfigFileDetail(recordId)
    }
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
  getconfigFileDetail(id){
    wx.showLoading({
      title: '加载中....',
    })
    api.getconfigFileDetail(id).then(res=>{
      wx.hideLoading();
      if (res.code == 0) {
      console.log(res.data)
        this.setData({
          config:res.data,
          function_standard:res.data.function_standard,
          function_choose:res.data.function_choose,
          function_try:res.data.function_try,
        });
      }else {
        this.setData({
          imageType: "error",
          description: '数据请求失败'
        })
      }
    },err=>{
      wx.hideLoading();
      this.setData({
        imageType: "error",
        description: '数据请求失败'
      })
    })
  }
})