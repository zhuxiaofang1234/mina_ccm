// 运行环境检查
const app = getApp()
const api = app.globalData.api
import mirrorType from '../../utils/mirrorType.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    /*运行环境检查 */
    emea:[],//整机外观
    emth:[],//温/湿度
    emcp:[], //市电
    emzg:[],//零地
    emfvow:[],//洗消间全览
    emlse:[],//镜体储存环境
    emhsir:[],//主机点检报告
    emsv:[],//软件版本
    emli:[],//导光接口
    emd:[],//消毒液
    emoe:[],//其它
    emQR:[],//二维码粘贴
    options:[],
    /*镜体 */
    endoscopeJson:[],//镜体
    mirrorBodyObj:{
      seriesId:"",
      sn:"",
      siromb:"",
      leakChecking:1,
      image:1,
      airSupplyWater:1,
      attractiveFunction:1,
      angularSurveying:[],
      headEndShield:[],
      siromb:[]
    },
    defaultOption: {
        id: '000',
        name: '镜体型号'
    },
    leakCheckingItems: [ //侧漏
      {
        name: 'OK',
        value: 1,
        checked: 'true'
      },
      {
        name: 'NG',
        value: 2
      },
    ],
  imageItems: [ //图像
    {
      name: 'OK',
      value: 1,
      checked: 'true'
    },
    {
      name: 'NG',
      value: 2
    },
  ],
  airSupplyWaterItems: [ //送气送水
    {
      name: 'OK',
      value: 1,
      checked: 'true'
    },
    {
      name: 'NG',
      value: 2
    },
  ],
  attractiveFunctionItems: [ //吸气功能
    {
      name: 'OK',
      value: 1,
      checked: 'true'
    },
    {
      name: 'NG',
      value: 2
    },
  ],
  
    btnDisabled: false,
    environment: true,
    mirrorBody:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从缓存里读取显示信息
    var maintenanceData = wx.getStorageSync('maintenanceData');
    //显示运行环境检查
    this.setData({
      options:mirrorType,
      emea: maintenanceData.emea ? maintenanceData.emea : [], //整机外观
      emth: maintenanceData.emth ? maintenanceData.emth : [], //温湿度
      emcp: maintenanceData.emcp ? maintenanceData.emcp : [], //市电
      emzg: maintenanceData.emzg ? maintenanceData.emzg : [],//零地
      emfvow: maintenanceData.emfvow ? maintenanceData.emfvow : [], //洗消间全览
      emlse: maintenanceData.emlse ? maintenanceData.emlse : [], //镜体储存环境
      emhsir: maintenanceData.emhsir ? maintenanceData.emhsir : [], //主机点检报告
      emsv:maintenanceData.emsv ? maintenanceData.emsv:[],//软件版本
      emli:maintenanceData.emli ? maintenanceData.emli:[],//导光接口
      emd:maintenanceData.emd ? maintenanceData.emd:[],//消毒液
      emQR:maintenanceData.emQR ? maintenanceData.emQR:[],//二维码粘贴
      emoe: maintenanceData.emoe ? maintenanceData.emoe : [], //其它
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

  //去镜体
  toMirrorBody(e) {
    //验证运行环境检查
    if (this.data.emea.length == 0) {
      this.setData({
        error: '请上传整机外观图片'
      });
      return
    }
    if (this.data.emth.length == 0) {
      this.setData({
        error: '请上传温/湿度图片'
      });
      return
    }
    if (this.data.emcp.length == 0) {
      this.setData({
        error: '请上传市电图片'
      });
      return
    }
    if (this.data.emzg.length == 0) {
      this.setData({
        error: '请上传零地图片'
      });
      return
    }
    if (this.data.emfvow.length == 0) {
      this.setData({
        error: '请上传洗消间全览图片'
      });
      return
    };
    if (this.data.emlse.length == 0) {
      this.setData({
        error: '请上传镜体储存环境图片'
      });
      return
    };
    if (this.data.emhsir.length == 0) {
      this.setData({
        error: '请上传主机点检报告图片'
      });
      return
    };
    if (this.data.emsv.length == 0) {
      this.setData({
        error: '请上传软件版本'
      });
      return
    };
    if (this.data.emli.length == 0) {
      this.setData({
        error: '请上传导光接口'
      });
      return
    };
    if (this.data.emd.length == 0) {
      this.setData({
        error: '请上传消毒液'
      });
      return
    };

    if (this.data.emQR.length == 0) {
      this.setData({
        error: '请上传二维码粘贴图片'
      });
      return
    };
  
     //显示镜体数据
     var maintenanceData = wx.getStorageSync('maintenanceData');
     this.setData({
      endoscopeJson: maintenanceData.endoscopeJson ? maintenanceData.endoscopeJson : [], 
     })
     this.setData({
      environment: false,
      mirrorBody: true,
    })
  },
   //运行环境检查
   toEnvironment(e) {
    this.setData({
      environment: true,
      mirrorBody:false
    })
  },
  //选择镜体型号
  change(e){
    const index = e.currentTarget.dataset.index;
   if(index==0){
    this.setData({
      'mirrorBodyObj.seriesId': e.detail
    });
   }else{
    this.getchangeData(index,'seriesId', e.detail);
   } 
  },

  //镜体数据
  formInputChange(e) {
    const {
      index,
      field
    } = e.currentTarget.dataset
    if(index==0){
      this.setData({
        [`mirrorBodyObj.${field}`]: e.detail.value
      });
    }else{
      this.getchangeData(index,field, e.detail.value);
    }  
  },
   //镜体选项
   radioChange: function (e) {
    const {index,type} = e.target.dataset;
    if(index==0){
     this.setData({
       [`mirrorBodyObj.${type}`]: e.detail.value
     });
    }else{
     this.getchangeData(index,type, e.detail.value);
    }  
 },
  //上传镜体
  uploadMirrorImg(e){
    const {
      type,index
    } = e.target.dataset;
    const imgList = e.detail.imgList;
   if(index==0){
    this.setData({
      [`mirrorBodyObj.${type}`]: imgList
    });
   }else{
    this.getchangeData(index,type, imgList);
   }
   this.setData({
    btnDisabled: false
  })
  },

  //删除镜体
  deleteMirrorImg(e){
    const {
      type,index
    } = e.target.dataset;
    console.log(type);
    const imgList = e.detail.imgList;
    console.log(imgList)
    if(index==0){
      this.setData({
        [`mirrorBodyObj.${type}`]: imgList
      });
     }else{
      this.getchangeData(index,type, imgList);
     }
  },

  //添加镜体
  addMirrorBody(){
    console.log(this.data.mirrorBodyObj);
    //表单验证
    if(!this.data.mirrorBodyObj.seriesId){
      this.setData({
        error: '请选择镜体型号'
      });
      return
    }
    if(!this.data.mirrorBodyObj.sn){
      this.setData({
        error: '请输入镜体sn'
      });
      return
    }
    if (this.data.mirrorBodyObj.angularSurveying.length == 0) {
      this.setData({
        error: '请上传角度测量'
      });
      return
    };
    if (this.data.mirrorBodyObj.headEndShield.length == 0) {
      this.setData({
        error: '请上传头端罩'
      });
      return
    };
    if (this.data.mirrorBodyObj.siromb.length == 0) {
      this.setData({
        error: '请上传镜体点检报告'
      });
      return
    };

    this.data.endoscopeJson.push(this.data.mirrorBodyObj);
    this.setData({
      endoscopeJson: this.data.endoscopeJson,
        mirrorBodyObj:{
          seriesId:"",
          siromb:"",
          maintenanceAdvice:"",
          leakChecking:1,
          image:1,
          airSupplyWater:1,
          attractiveFunction:1,
          angularSurveying:[],
          headEndShield:[],
          siromb:[]
        },
        defaultOption: {
          id: '000',
          name: '镜体型号'
      }
    });
    let maintenanceData = wx.getStorageSync('maintenanceData');
    maintenanceData.endoscopeJson = this.data.endoscopeJson;
    wx.setStorageSync('maintenanceData', maintenanceData)
  },
  //删除镜体
  deleteMirror(e){
    var that = this;
    const {index} = e.currentTarget.dataset;
    wx.showModal({
      title: '提示',
      content: '确定要删除该镜体信息吗？',
      success (res) {
        if (res.confirm) {
          that.data.endoscopeJson.splice(index,1)
          that.setData({
            endoscopeJson: that.data.endoscopeJson
          });
          var maintenanceData = wx.getStorageSync('maintenanceData');
          maintenanceData.endoscopeJson = that.data.endoscopeJson;
          wx.setStorageSync('maintenanceData', maintenanceData)
        }
      }
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

 //获取上传的值
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

 //获取上传的值
  getchangeData(index, type, datas) {
    var index = index-1;
    let endoscopeJson = this.data.endoscopeJson;
    if (!endoscopeJson[index]) {
      endoscopeJson[index] = {};
    }
    endoscopeJson[index][type] = datas;
    this.setData({
      endoscopeJson: endoscopeJson,
    });
    var maintenanceData = wx.getStorageSync('maintenanceData');
    maintenanceData.endoscopeJson = endoscopeJson;
    wx.setStorageSync('maintenanceData', maintenanceData)
    this.setData({
      btnDisabled: false
    })
  },



  //完结
  nextStep(e) {
    //验证镜体信息
    let endoscopeJson = this.data.endoscopeJson;
    let len = endoscopeJson.length;
    if (len == 0) {
      this.setData({
        error: '请至少添加一项镜体信息'
      });
      return
    }
    let formFlag;
    endoscopeJson.forEach(function (item) {
      if ((!item['seriesId'] || !item['sn'] || item['headEndShield'].length==0 || item['angularSurveying'].length==0 || item['siromb'].length==0)) {
        formFlag = false
        return 
      } else {
        formFlag = true
      }
    });
    if (!formFlag) {
      this.setData({
        error: '请先完善镜体信息'
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