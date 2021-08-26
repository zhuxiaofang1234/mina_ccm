// pages/funConfig/index.js
const app = getApp()
const api = app.globalData.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sn:'',
    recordId:'',
    configFile:[],
    totalCount: 0,
    page: 1,
    size: 10,
    imageType: "default",
    description: '暂无配置文件申请记录'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sn:options.sn
    });
    if(options.sn){
      this.getconfigFileList();   
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
  getconfigFileList(){
    var that = this;
    var page = this.data.page;
    var size = this.data.size;
    var queryData = {
      'current': page,
      'size': size,
      'sn':this.data.sn
    };

    wx.showLoading({
      title: '努力查询中....',
    })
    api.getConfigFileList(queryData).then(res=>{
      wx.hideLoading();
      if (res.code == 0) {
        const {records} = res.data;
        this.setData({
          configFile: records,
        });
        if(records.length!==0){
          this.setData({
            recordId:records[0].id
          });
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
  goDetails(){
    wx.navigateTo({
      url: '/pages/funConfig/details?recordId='+ this.data.recordId,
    })
  }
})