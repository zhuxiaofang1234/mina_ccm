// pages/fault/index.js
const app = getApp()
const api = app.globalData.api
const util = app.globalData.util
Page({

  /**
   * 页面的初始数据
   */
  data: {
    functionConfig: 1,
    beforeFunctionConfigPic: [], //仪器调试确认
    customerTraining: 1,
    beforeCustomerTrainingPic: [], //客户培训
    productMeasure: 1, //是否需要计量
    installTrainReportPic: [], //安装培训报告
    guaranteeCardPic: [], //保修卡
    calibrationReportPic: [], //校准报告
    btnDisabled: false,
    functionConfigItems: [{
        name: '是',
        value: '1',
        checked: 'true'
      },
      {
        name: '否',
        value: '2',
      }
    ],
    customerTrainingItems: [{
        name: '是',
        value: '1',
        checked: 'true'
      },
      {
        name: '否',
        value: '2',
      }
    ],
    productMeasureItems: [{
        name: '是',
        value: '1',
        checked: 'true'
      },
      {
        name: '否',
        value: '2',
      }
    ],
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
    this.showData();
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

  showData: function () {
    var InstallData = wx.getStorageSync('InstallData');
    var functionConfig = InstallData.functionConfig ? InstallData.functionConfig : this.data.functionConfig;
    var customerTraining =  InstallData.customerTraining ? InstallData.customerTraining :this.data.customerTraining;
    var productMeasure = InstallData.productMeasure ? InstallData.productMeasure :this.data.productMeasure
  
      var functionConfigItems = this.data.functionConfigItems;
      for (var i = 0, len = functionConfigItems.length; i < len; ++i) {
        functionConfigItems[i].checked = functionConfigItems[i].value == functionConfig;
      }
      this.setData({
        functionConfigItems
      })
  
      var customerTrainingItems = this.data.customerTrainingItems;
      for (var i = 0, len = customerTrainingItems.length; i < len; ++i) {
        customerTrainingItems[i].checked = customerTrainingItems[i].value == customerTraining;
      }
      this.setData({
        customerTrainingItems
      })
    
      var productMeasureItems = this.data.productMeasureItems;
      for (var i = 0, len = productMeasureItems.length; i < len; ++i) {
        productMeasureItems[i].checked = productMeasureItems[i].value == productMeasure;
      }
      this.setData({
        productMeasureItems
      })
    
    //从缓存里读取显示信息
    this.setData({
      beforeFunctionConfigPic: InstallData.beforeFunctionConfigPic ? InstallData.beforeFunctionConfigPic : [], //仪器调试确认
      beforeCustomerTrainingPic: InstallData.beforeCustomerTrainingPic ? InstallData.beforeCustomerTrainingPic : [], //客户培训
      installTrainReportPic: InstallData.installTrainReportPic ? InstallData.installTrainReportPic : [], //安装培训报告
      guaranteeCardPic: InstallData.guaranteeCardPic ? InstallData.guaranteeCardPic : [], //保修卡
      calibrationReportPic: InstallData.calibrationReportPic ? InstallData.calibrationReportPic : [], //校准报告  
      functionConfig,
      customerTraining,
      productMeasure
    });
  },

  //功能配置
  functionConfigChange: function (e) {
    var InstallData = wx.getStorageSync('InstallData');
    const value = e.detail.value;
    this.setData({
      functionConfig: value
    })
    InstallData.functionConfig = value
    wx.setStorageSync('InstallData', InstallData)
    this.changeRadio(value, this.data.functionConfigItems)
  },
  //客户培训
  customerTrainingChange: function (e) {
    var InstallData = wx.getStorageSync('InstallData');
    const value = e.detail.value;
    this.setData({
      customerTraining: value
    })
    InstallData.customerTraining = value;
    wx.setStorageSync('InstallData', InstallData)
    this.changeRadio(value, this.data.customerTrainingItems)
  },

  //是否计量
  productMeasureChange: function (e) {
    var InstallData = wx.getStorageSync('InstallData');
    const value = e.detail.value;
    this.setData({
      productMeasure: value
    })
    InstallData.productMeasure = value
    wx.setStorageSync('InstallData', InstallData)
    this.changeRadio(value, this.data.productMeasureItems)
  },

  changeRadio(value, items) {
    for (var i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value == value;
    }
    this.setData({
      items: items
    });
  },

  //上传处理前图片
  uploadImg(e) {
    this.changeData(e)
    this.setData({
      btnDisabled: false
    })
  },

  //上传按钮禁用
  disableBtn(e) {
    this.setData({
      btnDisabled: true
    })
  },

  deleteImg(e) {
    this.changeData(e)
  },

  changeData: function (e) {
    const {
      type
    } = e.target.dataset;
    let imgList = e.detail.imgList;
    var InstallData = wx.getStorageSync('InstallData');
    switch (type) {
      case 'FunctionConfig': //仪器调试确认
        this.setData({
          beforeFunctionConfigPic: imgList,
        })
        InstallData.beforeFunctionConfigPic = imgList
        break;
      case 'CustomerTraining': //客户培训
        this.setData({
          beforeCustomerTrainingPic: imgList,
        })
        InstallData.beforeCustomerTrainingPic = imgList
        break;
      case 'installTrainReport': //安装培训报告
        this.setData({
          installTrainReportPic: imgList,
        })
        InstallData.installTrainReportPic = imgList
        break;
      case 'guaranteeCard': //保修卡
        this.setData({
          guaranteeCardPic: imgList,
        })
        InstallData.guaranteeCardPic = imgList
        break;
      case 'calibrationReport': //校准报告
        this.setData({
          calibrationReportPic: imgList,
        })
        InstallData.calibrationReportPic = imgList
        break;
    }
    wx.setStorageSync('InstallData', InstallData)
  },

  nextStep(e) {
    if (this.data.beforeFunctionConfigPic.length == 0) {
      this.setData({
        error: '请上传仪器功能配置图片'
      });
      return
    }
    if (this.data.beforeCustomerTrainingPic.length == 0) {
      this.setData({
        error: '请上传客户培训图片'
      });
      return
    }
    if (this.data.installTrainReportPic.length == 0) {
      this.setData({
        error: '请上传安装培训报告'
      });
      return
    }
    if (this.data.guaranteeCardPic.length == 0) {
      this.setData({
        error: '请上传保修卡'
      });
      return
    }
    if (this.data.calibrationReportPic.length == 0) {
      this.setData({
        error: '请上传校准报告'
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
    this.setData({
      showOneButtonDialog: true
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
    var InstallData = wx.getStorageSync('InstallData');
    var postData = InstallData.firstPageData;
    postData.beforeExteriorPic = this.getCode(InstallData.beforeExteriorPic); //外观
    postData.beforePackingListPic = this.getCode(InstallData.beforePackingListPic); //装箱清单
    postData.beforeInstallEnvPic = this.getCode(InstallData.beforeInstallEnvPic); //市电压
    postData.afterInstallEnvPic = this.getCode(InstallData.afterInstallEnvPic); //零地电压
    postData.beforeFunctionConfigPic = this.getCode(InstallData.beforeFunctionConfigPic); //调试确认
    postData.beforeCustomerTrainingPic = this.getCode(InstallData.beforeCustomerTrainingPic); //客户培训
    postData.installTrainReportPic = this.getCode(InstallData.installTrainReportPic); //安装培训报告
    postData.guaranteeCardPic = this.getCode(InstallData.guaranteeCardPic); //保修卡
    postData.calibrationReportPic = this.getCode(InstallData.calibrationReportPic); //校准报告
    postData.functionConfig = this.data.functionConfig;
    postData.customerTraining = this.data.customerTraining;
    postData.productMeasure = this.data.productMeasure;
    postData.mobilePhone = '+86' + wx.getStorageSync('mobile'); ;
    postData.infoSource = 6;
    var myDate = new Date();
    var curTime = util.formatTime(myDate).substring(10);
    postData.createUser = this.data.createUser;
    postData.createTime = this.data.date + curTime;
    api.stockinstall(postData).then(res => {
      if (res.code == 0) {
        var idArr = [];
        for (var i in res.data) {
          idArr.push(res.data[i]);
        }
        const id = idArr.join(',');
        setTimeout(() => {
          wx.hideLoading();
          wx.reLaunch({
            url: '/pages/webView/index?type=install&id=' + id
          })
        }, 1000)
          //清除缓存的数据
       wx.removeStorageSync('InstallData');
      } else if(res.code==1){
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: res.msg,
          showCancel: false,
          confirmColor: '#009fab'
        })
      }
    }, err => {
      wx.showModal({
        title: '提示',
        content: '提交失败，请重试',
        showCancel: false,
        confirmColor: '#009fab'
      })
    })
  },
  goback: function () {
    wx.navigateBack({
      delta: 1
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