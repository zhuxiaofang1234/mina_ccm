// pages/repairRecord/index.js
const app = getApp()
const api = app.globalData.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: [],
    imageType: "default",
    description: '暂无装箱清单信息'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sn: options.sn
    });
    if (options.sn) {
      this.getPackageChecklist();
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
  getPackageChecklist() {
    var that = this;
    wx.showLoading({
      title: '努力加载中....',
    })
    let sn =this.data.sn;
    api.getPackageChecklist(sn).then(res => {
      wx.hideLoading();
      if (res.code == 0) {
        const records = res.data;
        if (records.length !== 0) {
          that.setData({
            records: records,
          });
          //合并相同的sn
          that.getSingleData();
        } else {
          this.setData({
            imageType: "default",
            description: '暂无装箱清单信息'
          })
        }
      } else {
        this.setData({
          imageType: "error",
          description: '数据请求失败'
        })
      }
    }, err => {
      wx.hideLoading();
      this.setData({
        imageType: "error",
        description: '数据请求失败'
      })
    })
  },

  //合并sn相同的数据
  getSingleData() {
    console.log(this.data.records);
    // 把源数据先变成目标数据的规则
    var oldDataRule = []
    this.data.records.forEach(el => {
      var oldObj = {
        deviceModel: el.deviceModel,
        devicePn: el.devicePn,
        deviceSn: el.deviceSn,
        orderSn:el.orderSn,
        probes: []
      }
      var probeObj = {
        probeModel: el.probeModel,
        probeNum: el.probeNum,
        probePn: el.probePn,
        probeSn:el.probeSn
      }
      oldObj.probes.push(probeObj)
      oldDataRule.push(oldObj)
    })
    /**
     * 先去重，后合并
     * 1、源数据去重
     * 2、把去重后的数据和源数据中相同name的数据合并citys
     */
    var newData = []
    var newObj = {}
    oldDataRule.forEach((el, i) => {
      if (!newObj[el.deviceSn]) {
        newData.push(el);
        newObj[el.deviceSn] = true;
      } else {
        newData.forEach(el => {
          if (el.deviceSn === oldDataRule[i].deviceSn) {
            el.probes = [...el.probes, ...oldDataRule[i].probes]; // es6语法
          }
        })
      }
    })
    console.log(newData); // 目标数据
    this.setData({
      newData:newData
    })
  }

})