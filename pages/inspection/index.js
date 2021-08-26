// pages/fault/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    voltageBeanVoList: [],
    testDataList: [],
    btnDisabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let repairData = wx.getStorageSync('repairData');
    let voltageBeanVoList = repairData.voltageBeanVoList ? repairData.voltageBeanVoList : [];
    let testDataList = repairData.testDataList ? repairData.testDataList : [];
    this.setData({
      voltageBeanVoList,
      testDataList
    })
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

  //上传处理前图片
  uploadBeforeImg(e) {
    const {
      type
    } = e.target.dataset;
    let arr = e.detail.imgList;
    console.log(arr)
    this.getchangeData(type, 'beforeProcessPic', arr)
  },

  //删除处理前图片
  deleteBeforeImg(e) {
    const {
      type
    } = e.target.dataset;
    this.deleteImg(type, 'beforeProcessPic')
  },

  //上传处理后图片
  uploadAfterImg(e) {
    const {
      type
    } = e.target.dataset;
    let arr = e.detail.imgList;
    console.log(arr)
    this.getchangeData(type, 'afterProcessPic', arr)
  },
  //删除处理后图片
  deleteAfterImg(e) {
    const {
      type
    } = e.target.dataset;
    this.deleteImg(type, 'afterProcessPic')
  },

  //获取上传的值
  getchangeData(type, status, datas) {
    if (type == 'voltage') {
      let voltageBeanVoList = this.data.voltageBeanVoList;
      if (!voltageBeanVoList[0]) {
        voltageBeanVoList[0] = {}
      }
      voltageBeanVoList[0][status] = datas
      this.setData({
        voltageBeanVoList: voltageBeanVoList
      })
      let repairData = wx.getStorageSync('repairData');
      repairData.voltageBeanVoList = voltageBeanVoList;
      wx.setStorageSync('repairData', repairData)

    } else if (type == 'testData') {
      let testDataList = this.data.testDataList;
      if (!testDataList[0]) {
        testDataList[0] = {}
      }
      testDataList[0][status] = datas
      this.setData({
        testDataList: testDataList
      })
      let repairData = wx.getStorageSync('repairData');
      repairData.testDataList = testDataList;
      wx.setStorageSync('repairData', repairData)
    }
    this.setData({
      btnDisabled: false
    })
  },

  deleteImg(type, status) {
    if (type == 'voltage') {
      this.data.voltageBeanVoList[0][status] = [];
      this.setData({
        voltageBeanVoList: this.data.voltageBeanVoList
      })
      let repairData = wx.getStorageSync('repairData');
      repairData.voltageBeanVoList = this.data.voltageBeanVoList;
      wx.setStorageSync('repairData', repairData)
    } else if (type == 'testData') {
      this.data.testDataList[0][status] = [];
      this.setData({
        testDataList: this.data.testDataList
      })
      let repairData = wx.getStorageSync('repairData');
      repairData.testDataList = this.data.testDataList;
      wx.setStorageSync('repairData', repairData)
    }
  },

  //处理说明
  getProcessDesc(e) {
    const {
      type
    } = e.target.dataset;
    this.getchangeData(type, 'processDesc', e.detail.value)
  },

  //上传按钮禁用
  disableBtn(e) {
    this.setData({
      btnDisabled: true
    })
  },

  nextStep(e) {
    let vList = this.data.voltageBeanVoList;
    let tList = this.data.testDataList;
    if (vList.length == 0) {
      this.setData({
        error: '请上传实地电压，零地电压'
      });
      return
    } else {
      if (!vList[0].beforeProcessPic || vList[0].beforeProcessPic.length == 0) {
        this.setData({
          error: '请上传实地电压'
        });
        return
      } else if (!vList[0].afterProcessPic || vList[0].afterProcessPic.length == 0) {
        this.setData({
          error: '请上传零地电压'
        });
        return
      }
    }
    if (tList.length == 0) {
      this.setData({
        error: '请上传测试数据'
      });
      return
    } else {
      if (!tList[0].beforeProcessPic || tList[0].beforeProcessPic.length == 0) {
        this.setData({
          error: '请上传测试前数据'
        });
        return
      } else if (!tList[0].afterProcessPic || tList[0].afterProcessPic.length == 0) {
        this.setData({
          error: '请上传测试后数据'
        });
        return
      }
    }
    wx.navigateTo({
      url: '/pages/repairAcceptance/index',
    })
  },
  goback: function () {
    wx.navigateBack({
      delta: 1
    })
  },

})