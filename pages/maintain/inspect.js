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
    cmdo:[],//科室全览
    cmth:[],//温/湿度
    cmcp:[], //市电
    cmzg:[],//零地
    cmhteotv:[],//HGB本底电压
    cmoteotv:[],//光学本底电压
    cml5:[],//现场5S
    cmoe:[],//其它

    /*设备性能检查 */
    cmp:[],//本底
    cmr:[], //重复性
    cmc:[],//可比性
    cmqcc:[],//质控&校准
    cmsd:[],//散点图
    cmel:[],//日志导出
    cmop:[],//其它

    /* 设备保养记录*/
    cmtwmdr:[],//整机除尘
    cmcpcp:[],//计数池&CRP池
    cmsns:[],//采样针&拭子
    cmbop:[],//泵体
    cmoo:[], //光学1
    cmltbb:[],//液管&缓冲瓶
    cmot:[],//光学2 
    cmor:[],//其它

    /*保养效果确认 */
    cmeaa:[],//设备外观
    cmcpcpa:[],//计数池&CRP池
    cmsnsa:[],//采样针&拭子
    cmbopa:[],//泵体
    cmpoifpa:[],//内部液路照片
    cmntra:[],//正常计数结果
    cmvia:[],//版本信息
    cmoa:[],//其它
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
    //显示运行环境检查数据
    this.setData({
      cmdo: maintenanceData.cmdo ? maintenanceData.cmdo : [], 
      cmth: maintenanceData.cmth ? maintenanceData.cmth : [], 
      cmcp: maintenanceData.cmcp ? maintenanceData.cmcp : [], 
      cmzg: maintenanceData.cmzg ? maintenanceData.cmzg : [], 
      cmhteotv: maintenanceData.cmhteotv ? maintenanceData.cmhteotv : [], 
      cmoteotv: maintenanceData.cmoteotv ? maintenanceData.cmoteotv : [], 
      cml5: maintenanceData.cml5 ? maintenanceData.cml5 : [], 
      cmoe: maintenanceData.cmoe ? maintenanceData.cmoe : [], 
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
    if (this.data.cmdo.length == 0) {
      this.setData({
        error: '请上传科室全览的图片'
      });
      return
    }
    if (this.data.cmth.length == 0) {
      this.setData({
        error: '请上传温/湿度图片'
      });
      return
    }
    if (this.data.cmcp.length == 0) {
      this.setData({
        error: '请上传市电图片'
      });
      return
    }
    if (this.data.cmzg.length == 0) {
      this.setData({
        error: '请上传零地图片'
      });
      return
    }
    if (this.data.cmhteotv.length == 0) {
      this.setData({
        error: '请上传HGB本底电压图片'
      });
      return
    }
    if (this.data.cmoteotv.length == 0) {
      this.setData({
        error: '请上传光学本底电压图片'
      });
      return
    }
    if (this.data.cml5.length == 0) {
      this.setData({
        error: '请上传现场5s图片'
      });
      return
    };

     //显示设备性能检查数据
     var maintenanceData = wx.getStorageSync('maintenanceData');
     this.setData({
      cmp: maintenanceData.cmp ? maintenanceData.cmp : [], 
      cmr: maintenanceData.cmr ? maintenanceData.cmr : [], 
      cmc: maintenanceData.cmc ? maintenanceData.cmc : [],
      cmqcc: maintenanceData.cmqcc ? maintenanceData.cmqcc : [],
      cmsd: maintenanceData.cmsd ? maintenanceData.cmsd : [], 
      cmel: maintenanceData.cmel ? maintenanceData.cmel : [], 
      cmop: maintenanceData.cmop ? maintenanceData.cmop : [], 
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
    if (this.data.cmp.length == 0) {
      this.setData({
        error: '请上传本底图片'
      });
      return
    }
    if (this.data.cmr.length == 0) {
      this.setData({
        error: '请上传重复性图片'
      });
      return
    }
    if (this.data.cmc.length == 0) {
      this.setData({
        error: '请上传可比性图片'
      });
      return
    }
    if (this.data.cmqcc.length == 0) {
      this.setData({
        error: '请上传质控&校准图片'
      });
      return
    }
    if (this.data.cmsd.length == 0) {
      this.setData({
        error: '请上传散点图'
      });
      return
    };
    if (this.data.cmel.length == 0) {
      this.setData({
        error: '请上传日志导出'
      });
      return
    };
    //显示设备保养记录
    var maintenanceData = wx.getStorageSync('maintenanceData');
    this.setData({
      cmtwmdr: maintenanceData.cmtwmdr ? maintenanceData.cmtwmdr : [], 
      cmcpcp: maintenanceData.cmcpcp ? maintenanceData.cmcpcp : [], 
      cmsns: maintenanceData.cmsns ? maintenanceData.cmsns : [],
      cmbop: maintenanceData.cmbop ? maintenanceData.cmbop : [], 
      cmoo: maintenanceData.cmoo ? maintenanceData.cmoo : [], 
      cmltbb: maintenanceData.cmltbb ? maintenanceData.cmltbb : [], 
      cmot: maintenanceData.cmot ? maintenanceData.cmot : [],
      cmor: maintenanceData.cmor ? maintenanceData.cmor : [],
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
    if (this.data.cmtwmdr.length == 0) {
      this.setData({
        error: '请上传整机除尘图片'
      });
      return
    };
    if (this.data.cmcpcp.length == 0) {
      this.setData({
        error: '请上传计数池&CRP池图片'
      });
      return
    };
    if (this.data.cmsns.length == 0) {
      this.setData({
        error: '请上传采样针&拭子图片'
      });
      return
    };
    if (this.data.cmbop.length == 0) {
      this.setData({
        error: '请上传泵体图片'
      });
      return
    };
    if (this.data.cmoo.length == 0) {
      this.setData({
        error: '请上传光学1图片'
      });
      return
    };
    if (this.data.cmltbb.length == 0) {
      this.setData({
        error: '请上传液管&缓冲瓶图片'
      });
      return
    };
    if (this.data.cmot.length == 0) {
      this.setData({
        error: '请上传光学2图片'
      });
      return
    };
    var maintenanceData = wx.getStorageSync('maintenanceData');
    this.setData({
      cmeaa: maintenanceData.cmeaa ? maintenanceData.cmeaa : [], 
      cmcpcpa: maintenanceData.cmcpcpa ? maintenanceData.cmcpcpa : [], 
      cmsnsa: maintenanceData.cmsnsa ? maintenanceData.cmsnsa : [],
      cmbopa: maintenanceData.cmbopa ? maintenanceData.cmbopa : [], 
      cmpoifpa: maintenanceData.cmpoifpa ? maintenanceData.cmpoifpa : [], 
      cmntra: maintenanceData.cmntra ? maintenanceData.cmntra : [], 
      cmvia: maintenanceData.cmvia ? maintenanceData.cmvia : [], 
      cmoa: maintenanceData.cmoa ? maintenanceData.cmoa : [], 
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
    if (this.data.cmeaa.length == 0) {
      this.setData({
        error: '请上传设备外观图片'
      });
      return
    }
    if (this.data.cmcpcpa.length == 0) {
      this.setData({
        error: '请上传计数池&CRP池图片'
      });
      return
    }
    if (this.data.cmsnsa.length == 0) {
      this.setData({
        error: '请上传采样针&拭子图片'
      });
      return
    }
    if (this.data.cmbopa.length == 0) {
      this.setData({
        error: '请上传泵体图片'
      });
      return
    }
    if (this.data.cmpoifpa.length == 0) {
      this.setData({
        error: '请上传内部液路照片'
      });
      return
    }
    if (this.data.cmntra.length == 0) {
      this.setData({
        error: '请上传正常计数结果照片'
      });
      return
    }
    if (this.data.cmvia.length == 0) {
      this.setData({
        error: '请上传版本信息照片'
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
    var maintenanceData = wx.getStorageSync('maintenanceData');
    var postData = maintenanceData.firstPageData;
    /*运行环境检查 */
    postData.cmdo = this.getCode(maintenanceData.cmdo);
    postData.cmth = this.getCode(maintenanceData.cmth);
    postData.cmcp = this.getCode(maintenanceData.cmcp);
    postData.cmzg = this.getCode(maintenanceData.cmzg);
    postData.cmhteotv = this.getCode(maintenanceData.cmhteotv);
    postData.cmoteotv = this.getCode(maintenanceData.cmoteotv);
    postData.cml5 = this.getCode(maintenanceData.cml5);
    postData.cmoe = this.getCode(maintenanceData.cmoe);

    /*设备性能检查 */
    postData.cmp = this.getCode(maintenanceData.cmp);
    postData.cmr = this.getCode(maintenanceData.cmr);
    postData.cmc = this.getCode(maintenanceData.cmc);
    postData.cmqcc = this.getCode(maintenanceData.cmqcc);
    postData.cmel = this.getCode(maintenanceData.cmel);
    postData.cmop = this.getCode(maintenanceData.cmop);

    /* 设备保养记录*/
    postData.cmtwmdr = this.getCode(maintenanceData.cmtwmdr);
    postData.cmcpcp = this.getCode(maintenanceData.cmcpcp);
    postData.cmsns = this.getCode(maintenanceData.cmsns);
    postData.cmbop = this.getCode(maintenanceData.cmbop);
    postData.cmoo = this.getCode(maintenanceData.cmoo);
    postData.cmltbb = this.getCode(maintenanceData.cmltbb);
    postData.cmot = this.getCode(maintenanceData.cmot);
    postData.cmor = this.getCode(maintenanceData.cmor);

    /*保养效果确认 */
    postData.cmeaa = this.getCode(maintenanceData.cmeaa);
    postData.cmcpcpa = this.getCode(maintenanceData.cmcpcpa);
    postData.cmsnsa = this.getCode(maintenanceData.cmsnsa);
    postData.cmbopa = this.getCode(maintenanceData.cmbopa);
    postData.cmpoifpa = this.getCode(maintenanceData.cmpoifpa);
    postData.cmntra = this.getCode(maintenanceData.cmntra);
    postData.cmvia = this.getCode(maintenanceData.cmvia);
    postData.cmoa = this.getCode(maintenanceData.cmoa);
    
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