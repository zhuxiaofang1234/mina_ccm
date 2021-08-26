// 运行环境检查
const app = getApp()
const api = app.globalData.api
const util = app.globalData.util

Page({
  /**
   * 页面的初始数据
   */
  data: {
    /*运行环境检查 */
    hmdo:[],//科室全览
    hmth:[],//温/湿度
    hmcp:[], //市电
    hmzg:[],//零地
    hml5:[],//现场5S
    hmoe:[],//其它

    /*设备性能检查 */
    hmhsi:[],//硬件自检
    hmbpw:[],//探头始波
    hmkt:[], //键盘测试
    hmss:[],//存储空间
    hmle:[],//日志导出
    hmop:[],//其它

    /* 设备保养记录*/
    hmcts:[], //屏幕清洁
    hmkp:[],//键盘面板
    hmt:[],//轨迹球
    hmtpc:[],//探头线缆
    hmds:[],//防尘网
    hmpm:[],//面板膜

    /*保养效果确认 */
    hmea:[],//设备外观
    hmkpa:[],//键盘面板
    hmtpca:[],//探头线缆
    hml5a:[],//现场5S
    hmoa:[],//其它
    btnDisabled: false,
    environment: true,
    performance: false,
    maintainRecord: false,
    maintainEffect: false,
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
    this.setData({
      hmdo: maintenanceData.hmdo ? maintenanceData.hmdo : [], //科室全览
      hmth: maintenanceData.hmth ? maintenanceData.hmth : [], //温湿度
      hmcp: maintenanceData.hmcp ? maintenanceData.hmcp : [], //市电
      hmzg: maintenanceData.hmzg ? maintenanceData.hmzg : [], //零地
      hml5: maintenanceData.hml5 ? maintenanceData.hml5 : [], //现场5s
      hmoe: maintenanceData.hmoe ? maintenanceData.hmoe : [], //其它
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
    let maintenanceData = wx.getStorageSync('maintenanceData');
    this.setData({
      [type]:arr
    })
    maintenanceData[type] = arr;
    wx.setStorageSync('maintenanceData', maintenanceData)
  },
  //运行环境检查
  toEnvironment(e) {
    this.setData({
      environment: true,
      performance: false,
      maintainRecord: false,
      maintainEffect: false
    })
  },
  //设备性能检查
  toPerformance(e) {
    //验证运行环境检查
    if (this.data.hmdo.length == 0) {
      this.setData({
        error: '请上传科室全览的图片'
      });
      return
    }
    if (this.data.hmth.length == 0) {
      this.setData({
        error: '请上传温/湿度图片'
      });
      return
    }
    if (this.data.hmcp.length == 0) {
      this.setData({
        error: '请上传市电图片'
      });
      return
    }
    if (this.data.hmzg.length == 0) {
      this.setData({
        error: '请上传零地图片'
      });
      return
    }
    if (this.data.hml5.length == 0) {
      this.setData({
        error: '请上传现场5s图片'
      });
      return
    };
     //显示设备性能检查数据
     var maintenanceData = wx.getStorageSync('maintenanceData');
     this.setData({
      hmhsi: maintenanceData.hmhsi ? maintenanceData.hmhsi : [], 
      hmbpw: maintenanceData.hmbpw ? maintenanceData.hmbpw : [], 
      hmkt: maintenanceData.hmkt ? maintenanceData.hmkt : [],
      hmss: maintenanceData.hmss ? maintenanceData.hmss : [], 
      hmle: maintenanceData.hmle ? maintenanceData.hmle : [], 
      hmop: maintenanceData.hmop ? maintenanceData.hmop : [], 
     })
    this.setData({
      environment: false,
      performance: true,
      maintainRecord: false,
      maintainEffect: false
    })
  },

  //保养记录
  toMaintainRecord(e) {
    //验证设备性能检查
    if (this.data.hmhsi.length == 0) {
      this.setData({
        error: '请上传硬件自检的图片'
      });
      return
    }
    if (this.data.hmbpw.length == 0) {
      this.setData({
        error: '请上传探头始波图片'
      });
      return
    }
    if (this.data.hmkt.length == 0) {
      this.setData({
        error: '请上传键盘测试图片'
      });
      return
    }
    if (this.data.hmss.length == 0) {
      this.setData({
        error: '请上传存储空间图片'
      });
      return
    }
    if (this.data.hmle.length == 0) {
      this.setData({
        error: '请上传日志导出图片'
      });
      return
    };
    //显示设备性能检查数据
    var maintenanceData = wx.getStorageSync('maintenanceData');
    this.setData({
      hmcts: maintenanceData.hmcts ? maintenanceData.hmcts : [], 
      hmkp: maintenanceData.hmkp ? maintenanceData.hmkp : [], 
      hmt: maintenanceData.hmt ? maintenanceData.hmt : [],
      hmtpc: maintenanceData.hmtpc ? maintenanceData.hmtpc : [], 
      hmds: maintenanceData.hmds ? maintenanceData.hmds : [], 
      hmpm: maintenanceData.hmpm ? maintenanceData.hmpm : [], 
    })

    this.setData({
      environment: false,
      performance: false,
      maintainRecord: true,
      maintainEffect: false
    })
  },

  //保养效果确认
  toMaintainEffect(e) {
    //验证设备保养记录
    if (this.data.hmcts.length == 0) {
      this.setData({
        error: '请上传屏幕清洁图片'
      });
      return
    };
    if (this.data.hmkp.length == 0) {
      this.setData({
        error: '请上传键盘面板图片'
      });
      return
    };
    if (this.data.hmt.length == 0) {
      this.setData({
        error: '请上传轨迹球图片'
      });
      return
    };
    if (this.data.hmtpc.length == 0) {
      this.setData({
        error: '请上传探头线缆图片'
      });
      return
    };
    if (this.data.hmds.length == 0) {
      this.setData({
        error: '请上传防尘网图片'
      });
      return
    };
    if (this.data.hmpm.length == 0) {
      this.setData({
        error: '请上传面板膜图片'
      });
      return
    };
    var maintenanceData = wx.getStorageSync('maintenanceData');
    this.setData({
      hmea: maintenanceData.hmea ? maintenanceData.hmea : [], 
      hmkpa: maintenanceData.hmkpa ? maintenanceData.hmkpa : [], 
      hmtpca: maintenanceData.hmtpca ? maintenanceData.hmtpca : [],
      hml5a: maintenanceData.hml5a ? maintenanceData.hml5a : [], 
      hmoa: maintenanceData.hmoa ? maintenanceData.hmoa : [], 
    })

    this.setData({
      environment: false,
      performance: false,
      maintainRecord: false,
      maintainEffect: true
    })
  },

  //完结
  nextStep(e) {
    //验证保养效果确认
    if (this.data.hmea.length == 0) {
      this.setData({
        error: '请上传设备外观图片'
      });
      return
    }
    if (this.data.hmkpa.length == 0) {
      this.setData({
        error: '请上传键盘面板图片'
      });
      return
    }
    if (this.data.hmtpca.length == 0) {
      this.setData({
        error: '请上传探头线缆图片'
      });
      return
    }
    if (this.data.hml5a.length == 0) {
      this.setData({
        error: '请上传现场5s图片'
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
    //整理提交数据
    //获取系统当前时间
    var myDate = new Date();
    var curTime = util.formatTime(myDate).substring(10); 
    var maintenanceData = wx.getStorageSync('maintenanceData');
    var postData = maintenanceData.firstPageData;
    /*运行环境检查 */
    postData.hmdo = this.getCode(maintenanceData.hmdo);
    postData.hmth = this.getCode(maintenanceData.hmth);
    postData.hmzg = this.getCode(maintenanceData.hmzg);
    postData.hmcp = this.getCode(maintenanceData.hmcp);
    postData.hml5 = this.getCode(maintenanceData.hml5);
    postData.hmoe = this.getCode(maintenanceData.hmoe);
   

    /*设备性能检查 */
    postData.hmhsi = this.getCode(maintenanceData.hmhsi);
    postData.hmbpw = this.getCode(maintenanceData.hmbpw);
    postData.hmkt = this.getCode(maintenanceData.hmkt);
    postData.hmss = this.getCode(maintenanceData.hmss);
    postData.hmle = this.getCode(maintenanceData.hmle);
    postData.hmop = this.getCode(maintenanceData.hmop);

    /* 设备保养记录*/
    postData.hmcts = this.getCode(maintenanceData.hmcts);
    postData.hmkp = this.getCode(maintenanceData.hmkp);
    postData.hmt = this.getCode(maintenanceData.hmt);
    postData.hmtpc = this.getCode(maintenanceData.hmtpc);
    postData.hmds = this.getCode(maintenanceData.hmds);
    postData.hmpm = this.getCode(maintenanceData.hmpm);

    /*保养效果确认 */
    postData.hmea = this.getCode(maintenanceData.hmea);
    postData.hmkpa = this.getCode(maintenanceData.hmkpa);
    postData.hmtpca = this.getCode(maintenanceData.hmtpca);
    postData.hml5a = this.getCode(maintenanceData.hml5a);
    postData.hmoa = this.getCode(maintenanceData.hmoa);
    postData.mobilePhone = '+86' + wx.getStorageSync('mobile'); 
    postData.createUser = this.data.createUser;
    postData.createTime = this.data.date + curTime;
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
      }else if(res.code==1){
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