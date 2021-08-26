// pages/repairRecord/index.js
const app = getApp()
const api = app.globalData.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records:[],
    imageType: "default",
    description: '该设备暂无维修记录'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sn:options.sn
    });
    if(options.sn){
      this.getRepairInfo();   
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
  getRepairInfo(){
    var that = this;
    wx.showLoading({
      title: '努力加载中....',
    })
    let sn = this.data.sn;
    api.getRepairInfo(sn).then(res=>{
      wx.hideLoading();
      if (res.code == 200) {
        const records = res.data;
        if(records.length!==0){
          that.setData({
            records: records,
          });
        }else{
          this.setData({
            imageType: "default",
            description: '该设备暂无维修记录'
          })
        }
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
  },

  toAccessories(e){
    console.log(e);
    const {index} = e.currentTarget.dataset;
    let accessories = this.data.records[index].accessories;
    console.log(accessories);
    wx.navigateTo({
      url: '/pages/repairRecord/accessory?accessories='+JSON.stringify(accessories),
    })
  }
})