// pages/fault/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    beforeExteriorPic: [], //外观
    beforePackingListPic: [], //装箱清单
    beforeInstallEnvPic: [], //市电压
    afterInstallEnvPic: [], //零地电压
    btnDisabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showData();
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


  showData: function () {
    //从缓存里读取显示信息
    var InstallData = wx.getStorageSync('InstallData');
    this.setData({
      beforeExteriorPic: InstallData.beforeExteriorPic ? InstallData.beforeExteriorPic : [], //外观
      beforePackingListPic: InstallData.beforePackingListPic ? InstallData.beforePackingListPic :[], //装箱清单
      beforeInstallEnvPic: InstallData.beforeInstallEnvPic ? InstallData.beforeInstallEnvPic : [], //市电压
      afterInstallEnvPic: InstallData.afterInstallEnvPic ? InstallData.afterInstallEnvPic :[], //零地电压
    })
  },

  //上传处理前图片
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

  //改变数据
  changeData(e) {
    const {
      type
    } = e.target.dataset;
    let imgList = e.detail.imgList;
    var InstallData = wx.getStorageSync('InstallData');
    switch (type) {
      case 'exterior':
        this.setData({
          beforeExteriorPic: imgList,
        })
        InstallData.beforeExteriorPic = imgList
        break;
      case 'packingList':
        this.setData({
          beforePackingListPic: imgList,
        })
        InstallData.beforePackingListPic = imgList
        break;
      case 'beforeInstallEnv':
        this.setData({
          beforeInstallEnvPic: imgList,
        })
        InstallData.beforeInstallEnvPic = imgList
        break;
      case 'afterInstallEnv':
        this.setData({
          afterInstallEnvPic: imgList,
        })
        InstallData.afterInstallEnvPic = imgList
        break;
    }
    wx.setStorageSync('InstallData', InstallData)
  },

  //上传按钮禁用
  disableBtn(e) {
    this.setData({
      btnDisabled: true
    })
  },

  //完结
  nextStep(e) {
    if (this.data.beforeExteriorPic.length == 0) {
      this.setData({
        error: '请上传产品外观'
      });
      return
    }
    if (this.data.beforePackingListPic.length == 0) {
      this.setData({
        error: '请上传装箱清单'
      });
      return
    }
    if (this.data.beforeInstallEnvPic.length == 0) {
      this.setData({
        error: '请上传市电电压环境'
      });
      return
    }
    if (this.data.afterInstallEnvPic.length == 0) {
      this.setData({
        error: '请上传零地电压环境'
      });
      return
    }
    wx.getStorageSync('InstallData');
   
    wx.navigateTo({
      url: '/pages/productTrain/index',
    })
  },
  goback: function () {
    wx.navigateBack({
      delta: 1
    })
  },
})