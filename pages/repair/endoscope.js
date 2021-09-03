// 内镜维修
const app = getApp()
const api = app.globalData.api
const util = app.globalData.util
Page({
  /**
   * 页面的初始数据
   */
  data: {
    /*维修环境检查*/
    esdo: [], //科室全览
    esth: [], //温、湿度
    escp: [], //市电
    eszg: [], //零地
    esl5: [], //现场5s
    esoe: [], //其它
    /*故障确认*/
    esfvp: [], //故障确认-故障视频/照片
    esoma: [], //其它
    /*维修过程记录*/
    estp: [], //拆机图片
    esfp: [], //故障件图片
    esop: [], //其它
    /*维修效果确认 */
    essv: [], //软件版本
    estlbi: [], //镜体信息
    esswdote: [], //设备开机工作图
    esle: [], //日志导出
    eslbi: [], //镜体图像
    eseo: [], //其它
    faultDesc:"",
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
      esdo: repairData.esdo ? repairData.esdo : [], //科室全览
      esth: repairData.esth ? repairData.esth : [], //温湿度
      escp: repairData.escp ? repairData.escp : [], //市电
      eszg: repairData.eszg ? repairData.eszg : [], //零地
      esl5: repairData.esl5 ? repairData.esl5 : [], //现场5s
      esoe: repairData.esoe ? repairData.esoe : [], //维修检查-其他
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
    if (this.data.esdo.length == 0) {
      this.setData({
        error: '请上传科室全览图片'
      });
      return
    }
    if (this.data.esth.length == 0) {
      this.setData({
        error: '请上传温、湿度图片'
      });
      return
    }
    if (this.data.escp.length == 0) {
      this.setData({
        error: '请上传市电图片'
      });
      return
    }
    if (this.data.eszg.length == 0) {
      this.setData({
        error: '请上传零地图片'
      });
      return
    }
    if (this.data.esl5.length == 0) {
      this.setData({
        error: '请上传现场5s图片'
      });
      return
    }
     //从缓存里读取显示信息
     var repairData = wx.getStorageSync('repairData');
     this.setData({
      esfvp: repairData.esfvp ? repairData.esfvp : [], //故障确认-故障视频/照片
      esoma: repairData.esoma ? repairData.esoma : [], //其它
      estp: repairData.estp ? repairData.estp : [], //拆机图片
      esfp: repairData.esfp ? repairData.esfp : [], //故障件图片
      esop: repairData.esop ? repairData.esop : [], //维修过程记录-其它
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
    if (this.data.esfvp.length == 0) {
      this.setData({
        error: '请上传故障图片'
      });
      return
    }
    if (this.data.estp.length == 0) {
      this.setData({
        error: '请上传拆机图片'
      });
      return
    }
    if (this.data.esfp.length == 0) {
      this.setData({
        error: '请上传故障件图片'
      });
      return
    }

     //从缓存里读取显示信息
     var repairData = wx.getStorageSync('repairData');
     this.setData({
      essv: repairData.essv ? repairData.essv : [], ///软件版本
      estlbi: repairData.estlbi ? repairData.estlbi : [], //镜体信息
      esswdote: repairData.esswdote ? repairData.esswdote : [],//设备开机工作图
      esle: repairData.esle ? repairData.esle : [], //日志导出
      eslbi:repairData.eslbi ? repairData.eslbi:[],//镜体图像
      eseo:repairData.eseo ? repairData.eseo:[],//其它
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
    if (this.data.essv.length == 0) {
      this.setData({
        error: '请上传软件版本图片'
      });
      return
    }
    if (this.data.estlbi.length == 0) {
      this.setData({
        error: '请上传镜体信息图片'
      });
      return
    }
    if (this.data.esswdote.length == 0) {
      this.setData({
        error: '请上传设备开机工作图片'
      });
      return
    }
    if (this.data.esle.length == 0) {
      this.setData({
        error: '请上传日志导出图片'
      });
      return
    }
    if (this.data.eslbi.length == 0) {
      this.setData({
        error: '请上传镜体图像'
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
    console.log(repairData);
    /*维修环境检查 */
    postData.esdo = this.getCode(repairData.esdo);//科室全览
    postData.esth = this.getCode(repairData.esth); //温湿度
    postData.escp = this.getCode(repairData.escp); //市电
    postData.eszg = this.getCode(repairData.eszg); //零地
    postData.esl5 = this.getCode(repairData.esl5); //现场5s
    postData.esoe = this.getCode(repairData.esoe); //其他
    /**故障确认 */
    postData.esfvp = this.getCode(repairData.esfvp); //故障照片
    postData.esoma = this.getCode(repairData.esoma); //其它
    postData.estp = this.getCode(repairData.hsfvp); //拆机图片
    postData.esfp = this.getCode(repairData.hsfbp);//故障件图片
    postData.esop = this.getCode(repairData.hstp);//其它
     /*维修效果确认 */
     postData.essv = this.getCode(repairData.essv);///软件版本
     postData.estlbi = this.getCode(repairData.estlbi), //镜体信息
     postData.esswdote = this.getCode(repairData.esswdote),//设备开机工作图
     postData.esle = this.getCode(repairData.esle), //日志导出
     postData.eseo = this.getCode(repairData.eseo),//其他
     postData.faultDesc = this.data.faultDesc;
     postData.mobilePhone = '+86' + wx.getStorageSync('mobile'); 
     postData.createUser = this.data.createUser;
     postData.serviceTime = this.data.date + curTime;
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