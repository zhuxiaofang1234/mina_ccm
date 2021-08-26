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
    console.log(type)
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
     //获取系统当前时间
     var myDate = new Date();
     var curTime = util.formatTime(myDate);
     var curDate = curTime.substring(0, 10);
     this.setData({
       date: curDate
     })
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
    var curTime = util.formatTime(myDate).substring(10);
    var repairData = wx.getStorageSync('repairData');
    var postData = repairData.firstPageData;
    /*维修环境检查 */
    postData.csdo = this.getCode(repairData.csdo);//科室全览
    postData.csth = this.getCode(repairData.csth); //温湿度
    postData.csteotv = this.getCode(repairData.csteotv); //本底电压
    postData.cszg = this.getCode(repairData.cszg); //零地
    postData.csmtuorp = this.getCode(repairData.csmtuorp); //配套使用试剂照片
    postData.csl5 = this.getCode(repairData.csl5); //现场5s
    postData.csoe = this.getCode(repairData.csoe); //其他
    /**故障确认 */
    postData.csvpofp = this.getCode(repairData.csvpofp); //故障照片
    postData.csfl = this.getCode(repairData.csfl); //故障日志
    postData.csivii = this.getCode(repairData.csivii); //仪器版本信息界面 
    postData.csppofp = this.getCode(repairData.csppofp);//处理故障部件图片
    postData.csitapsi = this.getCode(repairData.csitapsi);//仪器温度、压力状态界面
    postData.csamsi = this.getCode(repairData.csamsi);//仪器温度、压力状态界面

     /*维修效果确认 */
     postData.csbtr = this.getCode(repairData.csbtr);//本底测试结果界面
     postData.csrdi = this.getCode(repairData.csrdi), //重复性数据界面
     postData.csqctri = this.getCode(repairData.csqctri),//质控测试结果界面
     postData.cssdrdi = this.getCode(repairData.cssdrdi), //散点图原始数据界面
     postData.cscci = this.getCode(repairData.cscci),//校准系数界面 
     postData.csntrri = this.getCode(repairData.csntrri),//正常测试结果报告界面 
     postData.csle = this.getCode(repairData.csle),//日志导出 
     postData.faultDesc = this.data.faultDesc;
     postData.mobilePhone = '+86' + wx.getStorageSync('mobile'); 
    postData.createUser = this.data.createUser;
    postData.createTime = this.data.date + curTime;
    console.log(postData);
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
  goback: function () {
    wx.navigateBack({
      delta: 1
    })
  },
})