// pages/queryInfo/index.js
const app = getApp()
const api = app.globalData.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalCount: 0,
    page: 1,
    size: 10,
    snNum: "",
    inputValue: "",
    records: [],
    installInfo: [], //仪器安装信息
    erpInfo: {}, //经销商信息
    builtInfo: '',
    recordId: '',
    imageType: "default",
    description: '请输入设备SN查询'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取输入的搜索字段
  inputTyping: function (e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  //清除搜索字段
  clearInput: function (e) {
    this.setData({
      inputValue: "",
      snNum: "",
      records:[],
      builtInfo:''
    });
  },

  //点击搜索
  getSerachResult: function () {
    if (this.data.inputValue) {
      this.getEquipmentInfoBySn();
    }
  },


  //手机键盘搜索
  search: function (e) {
    if (this.data.inputValue) {
      this.getEquipmentInfoBySn();
    }
  },

  //获取设备信息
  getEquipmentInfoBySn() {
    var that = this;
    var page = this.data.page;
    var size = this.data.size;
    var queryData1 = {
      'current': page,
      'size': size,
      'snNum': this.data.inputValue
    };
    var queryData2 = {
      'current': page,
      'size': size,
      'sn': this.data.inputValue
    };
    wx.showLoading({
      title: '努力查询中....',
    })
    that.setData({
      snNum: this.data.inputValue
    });
    let r1 = api.getEquipmentBySn(queryData1);
    let r2 = api.getInstallEquipmentBySn(queryData2);
    Promise.all([r1, r2]).then(res => {
      wx.hideLoading();
      let data1 = [],
        data2 = [];
      if (res[0].code == 0) { //设备信息
        if (res[0].data.records.length !== 0) {
          data1 = res[0].data.records[0];
            this.setData({
              builtInfo: JSON.stringify(data1.builtInfo) ? JSON.stringify(data1.builtInfo) : [], //出场部件
              recordId: data1.recordId,
              configSn: data1.snNum
            })
            var saleNum = data1.saleNum,
              pn = data1.pn;
            //获取经销商信息
            if (saleNum && pn) { 
              that.getBarCodeInfo(saleNum, pn);
            }
        }else{
          that.setData({
            builtInfo:'', //出场部件
          
          }) 
        }
      }

      if (res[1].code == 0) { //装机信息
        if (res[1].data.records.length !== 0) {
          data2 = res[1].data.records[0]
        }
      }
      if(res[0].data.records.length==0 && res[1].data.records.length==0){
        that.setData({
          imageType: "search",
          description: '没有找到查询结果'
        })
      }else{
        let records = [data1, data2];
        console.log(records);
        that.setData({
          records:records
        })
      }
    
    }).catch(err => {
      wx.hideLoading();
      that.setData({
        imageType: "error",
        description: '数据请求失败'
      })

    })

  },

  //获取ERP信息
  getBarCodeInfo(saleNum, pnNum) {
    var that = this;
    var queryData = {
      'configName': 'YFOMDATA',
      'queryFilter': "(order_number='" + saleNum + "' AND item_num= '" + pnNum + "' )",
      'startTime': "2019-01-01",
    };
    api.getBarCodeInfo(queryData).then(res => {
      //此处模拟数据
      if (res.code == 0) {
        var resData = res.data;
        if (res.data && resData.length !== 0) {
          that.setData({
            erpInfo: resData[0]
          })
        }
      }
    });
  },
  //去医院
  tohospital(e) {
    var hospitalid = e.currentTarget.dataset.hospitalid;
    wx.navigateTo({
      url: '/pages/queryHospital/details?hospitalid=' + hospitalid,
    })
  }
})