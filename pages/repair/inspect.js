// 检验维修
const app = getApp()
const api = app.globalData.api
const util = app.globalData.util
Page({
  /**
   * 页面的初始数据
   */
  data: {
    /*维修环境检查*/
    csdo:[],//科室全览
    csth:[],//温湿度
    csteotv:[],//本底电压
    cszg:[],//零地
    csmtuorp:[],//配套使用试剂照片
    csl5:[],//现场5s
    csQR:[],//二维码粘贴
    csoe:[],//维修检查-其他
    /**故障确认 */
    csvpofp:[],//故障确认-故障照片
    csfl:[],//故障日志
    csivii:[],//仪器版本信息界面 
    /*维修过程记录*/
    csppofp:[],//处理故障部件图片
    csitapsi:[],//仪器温度、压力状态界面
    csamsi:[],//自动维护设置界面
    /*维修效果确认 */
    csbtr:[], //本底测试结果界面
    csrdi:[],//重复性数据界面
    csqctri:[],//质控测试结果界面
    cssdrdi:[], //散点图原始数据界面
    cscci:[],//校准系数界面 
    csntrri:[],//正常测试结果报告界面
    csle:[],//日志导出
    btnDisabled: false,
    environment: true,
    faultSure: false,
    repairEffect: false,
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
    var repairData = wx.getStorageSync('repairData');
    this.setData({
      csdo: repairData.csdo ? repairData.csdo : [], //科室全览
      csth: repairData.csth ? repairData.csth : [], //温湿度
      csteotv: repairData.csteotv ? repairData.csteotv : [], //本底电压
      cszg: repairData.cszg ? repairData.cszg : [], //零地
      csmtuorp: repairData.csmtuorp ? repairData.csmtuorp : [], //配套使用试剂照片
      csl5: repairData.csl5 ? repairData.csl5 : [], //现场5s
      csQR: repairData.csQR ? repairData.csQR : [], //二维码粘贴
      csoe: repairData.csoe ? repairData.csoe : [], //维修检查-其他
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

  //获取故障描述
  getFaultDesc(e) {
    let repairData = wx.getStorageSync('repairData');
   this.setData({
    faultDesc:e.detail.value
   })
   repairData.faultDesc = e.detail.value;
   wx.setStorageSync('repairData', repairData);
  },

  //上传图片
  uploadImg(e) {
    this.changeData(e)
    this.setData({
      btnDisabled: false
    })
  },
  //删除
  deleteImg: function (e) {
    this.changeData(e)
  },

  //上传按钮禁用
  disableBtn(e) {
    this.setData({
      btnDisabled: true
    })
  },
  //改变数据
  changeData(e) {
    const {
      type
    } = e.target.dataset;
    let arr = e.detail.imgList;
    let repairData = wx.getStorageSync('repairData');
    this.setData({
      [type]:arr
    })
    repairData[type] = arr;
    wx.setStorageSync('repairData', repairData)
  },

  //维修环境检查
  toEnvironment(e) {
    this.setData({
      environment: true,
      faultSure: false,
      repairEffect: false
    })
  },
  //故障确认
  toFaultSure(e) {
    //验证维修环境检查
    if (this.data.csdo.length == 0) {
      this.setData({
        error: '请上传科室全览图片'
      });
      return
    }
    if (this.data. csth.length == 0) {
      this.setData({
        error: '请上传温、湿度图片'
      });
      return
    }
    if (this.data.csteotv.length == 0) {
      this.setData({
        error: '请上传本底电压图片'
      });
      return
    }
    if (this.data.cszg.length == 0) {
      this.setData({
        error: '请上传零地图片'
      });
      return
    }
    if (this.data.csmtuorp.length == 0) {
      this.setData({
        error: '请上传配套使用试剂照片'
      });
      return
    }
    if (this.data.csl5.length == 0) {
      this.setData({
        error: '请上传现场5s图片'
      });
      return
    }
    if (this.data.csQR.length == 0) {
      this.setData({
        error: '请上传二维码粘贴图片'
      });
      return
    }
     //从缓存里读取显示信息
     var repairData = wx.getStorageSync('repairData');
     this.setData({
      csvpofp: repairData.csvpofp ? repairData.csvpofp : [], //故障确认-故障视频/照片
      csfl: repairData.csfl ? repairData.csfl : [], //故障日志
      csivii: repairData.csivii ? repairData.csivii : [], //仪器版本信息界面
      csppofp: repairData.csppofp ? repairData.csppofp : [], //处理故障部件图片
      csitapsi: repairData.csitapsi ? repairData.csitapsi : [], //仪器温度、压力状态界面
      csamsi: repairData.csamsi ? repairData.csamsi : [], //自动维护设置界面
      faultDesc:repairData.faultDesc ? repairData.faultDesc :'', //故障描述
     })
    this.setData({
      environment: false,
      faultSure: true,
      repairEffect: false
    })
  },

  //维修效果确认
  toRepairEffect(e) {
    //验证故障确认
    if (this.data.csvpofp.length == 0) {
      this.setData({
        error: '请上传故障图片'
      });
      return
    }
    if (this.data.csfl.length == 0) {
      this.setData({
        error: '请上传故障日志'
      });
      return
    }
    if (this.data.csivii.length == 0) {
      this.setData({
        error: '请上传仪器版本信息界面'
      });
      return
    }
    if (this.data.csppofp.length == 0) {
      this.setData({
        error: '请上传处理故障部件图片'
      });
      return
    }
    if (this.data.csitapsi.length == 0) {
      this.setData({
        error: '请上传仪器温度、压力状态界面'
      });
      return
    }
    if (this.data.csamsi.length == 0) {
      this.setData({
        error: '请上传自动维护设置界面'
      });
      return
    }

     //从缓存里读取显示信息
     var repairData = wx.getStorageSync('repairData');
     this.setData({
      csbtr: repairData.csbtr ? repairData.csbtr : [], //本底测试结果界面
      csrdi: repairData.csrdi ? repairData.csrdi : [], //重复性数据界面
      csqctri: repairData.csqctri ? repairData.csqctri : [],//质控测试结果界面
      cssdrdi: repairData.cssdrdi ? repairData.cssdrdi : [], //散点图原始数据界面
      cscci:repairData.cscci ? repairData.cscci:[],//校准系数界面 
      csntrri:repairData.csntrri ? repairData.csntrri:[],//正常测试结果报告界面
      csle:repairData.csle ? repairData.csle:[],//正常测试结果报告界面
     })
    this.setData({
      environment: false,
      faultSure: false,
      repairEffect: true
    })
  },


  //完结
  nextStep(e) {
    if (this.data.csbtr.length == 0) {
      this.setData({
        error: '请上传本底测试结果界面'
      });
      return
    }
    if (this.data.csrdi.length == 0) {
      this.setData({
        error: '请上传重复性数据界面'
      });
      return
    }
    if (this.data.csqctri.length == 0) {
      this.setData({
        error: '请上传质控测试结果界面'
      });
      return
    }
    if (this.data.cssdrdi.length == 0) {
      this.setData({
        error: '请上传散点图原始数据界面'
      });
      return
    }
    if (this.data.cscci.length == 0) {
      this.setData({
        error: '请上传校准系数界面 '
      });
      return
    }
    if (this.data.csntrri.length == 0) {
      this.setData({
        error: '请上传正常测试结果报告界面 '
      });
      return
    }
    if (this.data.csle.length == 0) {
      this.setData({
        error: '请上传日志导出'
      });
      return
    }
    wx.navigateTo({
      url: '/pages/repair/details',
    })   
  },

  goback: function () {
    wx.navigateBack({
      delta: 1
    })
  },
})