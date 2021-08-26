// pages/fault/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boioe: [],
    aoioe: [],
    bepc: [],
    aepc: [],
    bec: [],
    aec: [],
    btnDisabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从缓存里读取显示信息
    var maintenanceData = wx.getStorageSync('maintenanceData');
    this.setData({
      boioe: maintenanceData.boioe ? maintenanceData.boioe : [],
      aoioe: maintenanceData.aoioe ? maintenanceData.aoioe : [],
      bepc: maintenanceData.bepc ? maintenanceData.bepc : [],
      aepc: maintenanceData.aepc ? maintenanceData.aepc : [],
      bec: maintenanceData.bec ? maintenanceData.bec : [],
      aec: maintenanceData.aec ? maintenanceData.aec : [],
      sn: maintenanceData.firstPageData.sn ? maintenanceData.firstPageData.sn :""
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
    switch (type) {
      case 'boioe':
        this.setData({
          boioe: arr
        })
        maintenanceData.boioe = arr;
        break;
      case 'aoioe':
        this.setData({
          aoioe: arr
        })
        maintenanceData.aoioe = arr;
        break;
      case 'bepc':
        this.setData({
          bepc: arr
        })
        maintenanceData.bepc = arr;
        break;
      case 'aepc':
        this.setData({
          aepc: arr
        })
        maintenanceData.aepc = arr;
        break;
      case 'bec':
        this.setData({
          bec: arr
        })
        maintenanceData.bec = arr;
        break;
      case 'aec':
        this.setData({
          aec: arr
        })
        maintenanceData.aec = arr;
        break;
    }
    wx.setStorageSync('maintenanceData', maintenanceData)
  },
  nextStep(e) {
    if (this.data.boioe.length == 0) {
      this.setData({
        error: '请上传设备整体检查前的图片'
      });
      return
    }
    if (this.data.aoioe.length == 0) {
      this.setData({
        error: '请上传设备整体检查后的图片'
      });
      return
    }
    if (this.data.bepc.length == 0) {
      this.setData({
        error: '请上传设备性能检查前的图片'
      });
      return
    }
    if (this.data.aepc.length == 0) {
      this.setData({
        error: '请上传设备性能检查后的图片'
      });
      return
    }
    if (this.data.bec.length == 0) {
      this.setData({
        error: '请上传设备清洁前的图片'
      });
      return
    }
    if (this.data.aec.length == 0) {
      this.setData({
        error: '请上传设备清洁后的图片'
      });
      return
    }
    wx.navigateTo({
      url: '/pages/maintainReport/index',
    })
  },
  goback: function () {
    wx.navigateBack({
      delta: 1
    })
  },
})