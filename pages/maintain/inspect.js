// 运行环境检查
const app = getApp()
const api = app.globalData.api
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
    cmQR:[],//二维码粘贴
    cmoa:[],//其它
    btnDisabled: false,
    environment: true,
    performance: false,
    maintainRecord: false,
    maintainEffect: false
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
      cmQR: maintenanceData.cmQR ? maintenanceData.cmQR : [], 
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
        error: '请上传采样针&拭子照片'
      });
      return
    }
    if (this.data.cmbopa.length == 0) {
      this.setData({
        error: '请上传泵体照片'
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
    if (this.data.cmQR.length == 0) {
      this.setData({
        error: '请上传二维码粘贴照片'
      });
      return
    }
    
    wx.navigateTo({
      url: '/pages/maintain/details',
    })
  },
  
  goback: function () {
    wx.navigateBack({
      delta: 1
    })
  },

})