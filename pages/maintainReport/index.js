// pages/maintainReport/index.js
const app = getApp()
const api = app.globalData.api
const util = app.globalData.util
Page({
  /**
   * 页面的初始数据
   */
  data: {
    emr: [],
    pcr: [],
    equipTypeItems: [{
        name: '是',
        value: '1',
        checked: 'true'
      },
      {
        name: '否',
        value: '2',
      }
    ],
    calibration: 1,
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
    //从缓存里读取显示信息
    var maintenanceData = wx.getStorageSync('maintenanceData');
    var equipTypeItems = this.data.equipTypeItems;
    var calibration = maintenanceData.calibration ? maintenanceData.calibration : this.data.calibration;
    for (var i = 0, len = equipTypeItems.length; i < len; ++i) {
      equipTypeItems[i].checked = equipTypeItems[i].value == calibration;
    }
    this.setData({
      emr: maintenanceData.emr ? maintenanceData.emr : [],
      pcr: maintenanceData.pcr ? maintenanceData.pcr : [],
      equipTypeItems: equipTypeItems,
      sn: maintenanceData.firstPageData.sn ? maintenanceData.firstPageData.sn : "",
      calibration: calibration
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
  onShow: function () {},
  //产品校准报告
  radioChange: function (e) {
    var maintenanceData = wx.getStorageSync('maintenanceData');
    var equipTypeItems = this.data.equipTypeItems;
    for (var i = 0, len = equipTypeItems.length; i < len; ++i) {
      equipTypeItems[i].checked = equipTypeItems[i].value == e.detail.value;
    }
    maintenanceData.calibration = e.detail.value
    wx.setStorageSync('maintenanceData', maintenanceData)
    this.setData({
      equipTypeItems: equipTypeItems,
      calibration: e.detail.value
    });
  },

  //上传处理前图片
  uploadImg(e) {
    this.changeData(e)
    setTimeout(() => {
      this.setData({
        btnDisabled: false
      })
    }, 200)
  },

  //删除图片
  deleteImg(e) {
    this.changeData(e)
  },

  changeData: function (e) {
    const {
      type
    } = e.target.dataset;
    let arr = e.detail.imgList;
    var maintenanceData = wx.getStorageSync('maintenanceData');
    switch (type) {
      case 'emr':
        this.setData({
          emr: arr
        })
        maintenanceData.emr = arr
        break;
      case 'pcr':
        this.setData({
          pcr: arr
        })
        maintenanceData.pcr = arr
        break;
    }
    wx.setStorageSync('maintenanceData', maintenanceData)
  },
  //上传按钮禁用
  disableBtn(e) {
    this.setData({
      btnDisabled: true
    })
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
    if (this.data.emr.length == 0) {
      this.setData({
        error: '请上传设备保养报告图片'
      });
      return
    }
    if (this.data.emr.pcr == 0) {
      this.setData({
        error: '请上传产品校准报告图片'
      });
      return
    }
    //获取系统当前时间
    var myDate = new Date();
    var curTime = util.formatTime(myDate);
    var curDate = curTime.substring(0, 10);
    this.setData({
      date: curDate
    })
    var maintenanceData = wx.getStorageSync('maintenanceData');
    maintenanceData['calibration'] = this.data.calibration;
     wx.setStorageSync('maintenanceData', maintenanceData);
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
    //整理提交数据
    //获取系统当前时间
    var myDate = new Date();
    var curTime = util.formatTime(myDate).substring(10);

    var maintenanceData = wx.getStorageSync('maintenanceData');
    var postData = maintenanceData.firstPageData;
    console.log(maintenanceData);
    postData.boioe = this.getCode(maintenanceData.boioe);
    postData.aoioe = this.getCode(maintenanceData.aoioe);
    postData.bepc = this.getCode(maintenanceData.bepc);
    postData.aepc = this.getCode(maintenanceData.aepc);
    postData.bec = this.getCode(maintenanceData.bec);
    postData.aec = this.getCode(maintenanceData.aec);
    postData.emr = this.getCode(maintenanceData.emr);
    postData.pcr = this.getCode(maintenanceData.pcr);
    postData.calibration = this.data.calibration;
    postData.mobilePhone = '+86' + wx.getStorageSync('mobile'); 
    postData.createUser = this.data.createUser;
    postData.serviceTime = this.data.date + curTime;
    api.maintenance(postData).then(res => {
      if (res.code == 0) {
        const id = res.data.id;
        //清除缓存的数据
      wx.removeStorageSync('maintenanceData');
        setTimeout(() => {
          wx.hideLoading();
          wx.reLaunch({
            url: '/pages/webView/index?type=maintain&id=' + id
          })
        }, 1000)
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
  }
})