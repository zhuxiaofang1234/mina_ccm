// pages/queryInfo/index.js
const app = getApp()
const api = app.globalData.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalCount: 0,
    page: 1,
    size: 10,
    hospitalName: "",
    inputValue: "",
    records: [],
    hospitalInfo: [],
    imageType: "default",
    description: '请输入医院名称查询'
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取输入的搜索字段
  inputTyping: function (e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  //清除搜索字段
  clearInput: function (e) {
    this.setData({
      inputValue: "",
      hospitalName: "",
    });
  },

  //点击搜索
  getSerachResult: function () {
    if (this.data.inputValue) {
      this.getHospitalList();
    }

  },

  //获取搜索的设备
  getHospitalList() {
    var that = this;
    var page = this.data.page;
    var size = this.data.size;
    var queryData = {
      'current': page,
      'size': size,
      'hospitalName': this.data.inputValue
    };

    wx.showLoading({
      title: '努力查询中....',
    })
    api.getHospitalList(queryData).then(res => {
      wx.hideLoading();
      that.setData({
        loadingShow: false,
        hospitalName: this.data.inputValue
      });

      //此处模拟数据
      if (res.code == 0) {
        var resData = res.data;
        var records = resData.records;   
        if (records.length !== 0) {
          this.setData({
            records: records,
          })   
        } else {
          this.setData({
            records:[],
            imageType: "search",
            description: '没有找到查询的医院你可以点击下方按钮新增医院'
          })
        }
      } else {
        this.setData({
          imageType: "error",
          description: '数据请求失败'
        })
      }
    }, err => {
      this.setData({
        imageType: "error",
        description: '数据请求失败'
      })
    });
  },
 
  //新增医院
  toCreateHospital() {
    wx.navigateTo({
      url: '/pages/createHospital/index?type=add',
    })
  },
  //编辑医院
  toUpdateHospital(e) {
    var hospitalId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/createHospital/index?type=edit&hospitalId=' + hospitalId,
    })
  },
  
})