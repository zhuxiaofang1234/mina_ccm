// pages/repairAcceptance/index.js
const app = getApp()
const api = app.globalData.api
const util = app.globalData.util
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maintenanceOrderPic: [], //维修工单
    calibrationAndDebuggingRecordPic: [], //校准调试记录表
    btnDisabled: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    showOneButtonDialog: false,
    createUser: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let repairData = wx.getStorageSync('repairData');
    let maintenanceOrderPic = repairData.maintenanceOrderPic ? repairData.maintenanceOrderPic : [];
    let calibrationAndDebuggingRecordPic = repairData.calibrationAndDebuggingRecordPic ? repairData.calibrationAndDebuggingRecordPic : [];
    this.setData({
      maintenanceOrderPic,
      calibrationAndDebuggingRecordPic,
      sn: repairData.firstPageData.sn,
      deviceType: repairData.firstPageData.deviceType
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

  //上传图片
  uploadImg(e) {
    const {
      type
    } = e.target.dataset;
    let arr = e.detail.imgList;
    if (type == 'maintenanceOrder') {
      this.setData({
        maintenanceOrderPic: arr
      })
      let repairData = wx.getStorageSync('repairData');
      repairData.maintenanceOrderPic = arr;
      wx.setStorageSync('repairData', repairData)

    } else if (type == 'calibrationAndDebuggingRecord') {
      this.setData({
        calibrationAndDebuggingRecordPic: arr
      })
      let repairData = wx.getStorageSync('repairData');
      repairData.calibrationAndDebuggingRecordPic = arr;
      wx.setStorageSync('repairData', repairData)
    }
    setTimeout(() => {
      this.setData({
        btnDisabled: false
      })
    }, 100)
  },


  goback: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  //服务人员
  getCreateUser: function (e) {
    this.setData({
      createUser: e.detail.value
    })
  },

  //服务日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
    })
  },
  nextStep(e) {
    //获取系统当前时间
    var myDate = new Date();
    var curTime = util.formatTime(myDate);
    var curDate = curTime.substring(0, 10);
    this.setData({
      date: curDate
    })
    if (this.data.maintenanceOrderPic.length == 0) {
      this.setData({
        error: '请上传维修工单'
      });
      return
    }
    if (this.data.calibrationAndDebuggingRecordPic.length == 0) {
      this.setData({
        error: '请上传校准调试记录表'
      });
      return
    }
    this.setData({
      showOneButtonDialog: true,
    })
  },

  //确定
  tapDialogButton: function (e) {
    const type = e.detail.index;
    if (type == 0) {
      this.setData({
        showOneButtonDialog: false
      })
      return
    }
    if (type == 1 && !this.data.createUser) {
      this.setData({
        error: '请输入服务人员姓名'
      });
      return
    }
    this.setData({
      showOneButtonDialog: false
    })
    wx.showLoading({
      title: '提交中...',
    })
    //获取系统当前时间
    var myDate = new Date();
    let repairData = wx.getStorageSync('repairData');
    var postData = repairData.firstPageData;
    postData.malfunctionBeanVoList = this.getCodeDesc(repairData.malfunctionBeanVoList);
    postData.voltageBeanVoList =  this.getCodeDesc(repairData.voltageBeanVoList);
    postData.testDataList =  this.getCodeDesc(repairData.testDataList);
    postData.maintenanceOrderPic = this.getCode(repairData.maintenanceOrderPic);
    postData.calibrationAndDebuggingRecordPic = this.getCode(repairData.calibrationAndDebuggingRecordPic);
    postData.mobilePhone = '+86' + wx.getStorageSync('mobile')
    var curTime = util.formatTime(myDate).substring(10);
    postData.createUser = this.data.createUser;
    postData.createTime = this.data.date + curTime;
    console.log(postData)
    api.addServiceInfo(postData).then(res => {
      if (res.code == 0) {
        const id = res.data.id;
        setTimeout(() => {
          wx.removeStorageSync('repairData');
          wx.hideLoading();
          wx.reLaunch({
            url: '/pages/webView/index?type=repair&id=' + id
          })
        }, 800)
      } else {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '提交失败，请重试',
          showCancel: false,
          confirmColor: '#009fab'
        })
      }
    }, err => {
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: '提交失败，请重试',
        showCancel: false,
        confirmColor: '#009fab'
      })
    })
  },

  //获取hashCode
  getCode: function (arr) {
    var codeArr = []
    if (arr instanceof Array) {
      arr.forEach(item => {
        codeArr.push(item.code)
      });
    }
    return codeArr
  },

  //带说明的上传
  getCodeDesc: function (arr) {
    var newArr = [];
    if (arr instanceof Array) {
       newArr = arr.map(function (item, index) {
        var obj = {};
        obj['beforeProcessPic'] = [item['beforeProcessPic'][0].code];
        obj['afterProcessPic'] = [item['afterProcessPic'][0].code];
        obj['processDesc'] = item.processDesc;
        return obj
      });
    }
    return newArr
  },

  //上传按钮禁用
  disableBtn(e) {
    this.setData({
      btnDisabled: true
    })
  }
})