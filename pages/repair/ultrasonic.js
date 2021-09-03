// 超声维修
const app = getApp()
const api = app.globalData.api
const util = app.globalData.util
Page({
  /**
   * 页面的初始数据
   */
  data: {
    /*维修环境检查 */
    hsdo:[],//科室全览
    hsth:[],//温湿度
    hscp:[],//市电
    hszg:[],//零地
    hsl5:[],//现场5s
    hsoe:[],//维修检查-其他
    /**故障确认 */
    hs512v:[],//5V/12V电压
    hssii:[],//系统信息界面
    hsfvp:[],//故障确认-故障/视频照片
    /*维修过程记录*/
    hsfbp:[],//故障板图片
    hstp:[],//拆机图片
    /*维修效果确认 */
    hshsi:[], //硬件自检
    hskt:[],//键盘测试
    hsle:[],//日志导出
    hsss:[],//存储空间
    hsswdote:[],//设备开机工作图
    hsbpw:[],//探头始波
    btnDisabled: false,
    environment: true,
    faultSure: false,
    repairEffect: false,
    faultDesc:"",
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
      hsdo: repairData.hsdo ? repairData.hsdo : [], //科室全览
      hsth: repairData.hsth ? repairData.hsth : [], //温湿度
      hscp: repairData.hscp ? repairData.hscp : [], //市电
      hszg: repairData.hszg ? repairData.hszg : [], //零地
      hsl5: repairData.hsl5 ? repairData.hsl5 : [], //现场5s
      hsoe: repairData.hsoe ? repairData.hsoe : [], //维修检查-其他
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
    if (this.data.hsdo.length == 0) {
      this.setData({
        error: '请上传科室全览图片'
      });
      return
    }
    if (this.data.hsth.length == 0) {
      this.setData({
        error: '请上传温、湿度图片'
      });
      return
    }
    if (this.data.hscp.length == 0) {
      this.setData({
        error: '请上传市电图片'
      });
      return
    }
    if (this.data.hszg.length == 0) {
      this.setData({
        error: '请上传零地图片'
      });
      return
    }
    if (this.data.hsl5.length == 0) {
      this.setData({
        error: '请上传现场5s图片'
      });
      return
    }
     //从缓存里读取显示信息
     var repairData = wx.getStorageSync('repairData');
     this.setData({
      hs512v: repairData.hs512v ? repairData.hs512v : [], //5V/12V电压
      hssii: repairData.hssii ? repairData.hssii : [], //系统信息界面
      hsfvp: repairData.hsfvp ? repairData.hsfvp : [], //故障/视频照片
      hsfbp:repairData.hsfbp ? repairData.hsfbp:[],//故障板图片
      hstp:repairData.hstp ? repairData.hstp:[],//拆机图片
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
    if (this.data.hs512v.length == 0) {
      this.setData({
        error: '请上传5V/12V电压图片'
      });
      return
    }
    if (this.data.hssii.length == 0) {
      this.setData({
        error: '请上传系统信息界面图片'
      });
      return
    }
    if (this.data.hsfvp.length == 0) {
      this.setData({
        error: '请上传故障图片'
      });
      return
    }
    if (this.data.hstp.length == 0) {
      this.setData({
        error: '请上传拆机图片'
      });
      return
    }
    if (this.data.hsfbp.length == 0) {
      this.setData({
        error: '请上传维修过程故障板图片'
      });
      return
    }
     //从缓存里读取显示信息
     var repairData = wx.getStorageSync('repairData');
     this.setData({
      hshsi: repairData.hshsi ? repairData.hshsi : [], ///硬件自检
      hskt: repairData.hskt ? repairData.hskt : [], //键盘测试
      hsss: repairData.hsss ? repairData.hsss : [],//存储空间
      hsle: repairData.hsle ? repairData.hsle : [], //日志导出
      hsswdote:repairData.hsswdote ? repairData.hsswdote:[],//设备开机工作图
      hsbpw:repairData.hsbpw ? repairData.hsbpw:[],//探头始波
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
    if (this.data.hshsi.length == 0) {
      this.setData({
        error: '请上传硬件自检图片'
      });
      return
    }
    if (this.data.hskt.length == 0) {
      this.setData({
        error: '请上传键盘测试图片'
      });
      return
    }
    if (this.data.hsss.length == 0) {
      this.setData({
        error: '请上传存储空间图片'
      });
      return
    }
    if (this.data.hsle.length == 0) {
      this.setData({
        error: '请上传日志导出图片'
      });
      return
    }
    if (this.data.hsswdote.length == 0) {
      this.setData({
        error: '请上传设备开机工作图'
      });
      return
    }
    if (this.data.hsbpw.length == 0) {
      this.setData({
        error: '请上传探头始波图片'
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
    postData.hsdo = this.getCode(repairData.hsdo);//科室全览
    postData.hsth = this.getCode(repairData.hsth); //温湿度
    postData.hscp = this.getCode(repairData.hscp); //市电
    postData.hszg = this.getCode(repairData.hszg); //零地
    postData.hsl5 = this.getCode(repairData.hsl5); //现场5s
    postData.hsoe = this.getCode(repairData.hsoe); //其他
    /**故障确认 */
    postData.hs512v = this.getCode(repairData.hs512v); //5V/12V电压
    postData.hssii = this.getCode(repairData.hssii); //系统信息界面
    postData.hsfvp = this.getCode(repairData.hsfvp); //故障/视频照片
    postData.hsfbp = this.getCode(repairData.hsfbp);//故障板图片
    postData.hstp = this.getCode(repairData.hstp);//拆机图片
     /*维修效果确认 */
     postData.hshsi = this.getCode(repairData.hshsi);///硬件自检
     postData.hskt = this.getCode(repairData.hskt), //键盘测试
     postData.hsle = this.getCode(repairData.hsle),//存储空间
     postData.hsss = this.getCode(repairData.hsss), //日志导出
     postData.hsswdote = this.getCode(repairData.hsswdote),//设备开机工作图
     postData.hsbpw = this.getCode(repairData.hsbpw),//探头始波
     postData.faultDesc = this.data.faultDesc;
    postData.mobilePhone = '+86' + wx.getStorageSync('mobile'); 
    postData.createUser = this.data.createUser;
    postData.serviceTime = this.data.date + curTime;
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