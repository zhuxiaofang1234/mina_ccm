// pages/maintain/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var maintenanceData = wx.getStorageSync('maintenanceData');
    console.log(maintenanceData)
    this.setData({
      maintenanceData:maintenanceData,
      baseData:maintenanceData.firstPageData,
      productLine:maintenanceData.firstPageData.productLine
    });
    console.log(this.data.productLine)
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

  //预览图片
  previewImage(e) {
    const {index,list} = e.currentTarget.dataset;
    const urls = list.map((item)=>{
        return item.url
      })
    wx.previewImage({
      urls: urls,
      current: urls[index]
    })
  },

  //服务确认
  serviceConfirm(){
    wx.showActionSheet({
      itemList: ['电子签字', '已纸质档签字', '无需签字'],
      success (res) {
        console.log(res.tapIndex)
        if(res.tapIndex==0){
          wx.navigateTo({
            url: '/pages/signature/index',
          })
        }
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  }
})