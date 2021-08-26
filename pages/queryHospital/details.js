// pages/queryInfo/index.js
const app = getApp()
const api = app.globalData.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hospitalInfo: '',
    imageType: "default",
    hospitalid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hospitalid:options.hospitalid
    })
    console.log(options.hospitalid)
    if(options.hospitalid && options.hospitalid!=='undefined'){
      this.getHospitalInfo(options.hospitalid);
    }
    
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
 
 
  //获取医院详情信息
  getHospitalInfo(id) {
    wx.showLoading({
      title: '数据加载中....',
    })
    var that = this;
    api.getHospitalInfo(id).then(res => {
      wx.hideLoading();
      if (res.code == 0) {
        console.log(res.data);
        this.setData({
          hospitalInfo: res.data,
          contactJson: res.data.contactJson ? res.data.contactJson : []
        });
       
        //that.EchoHospitalAddress(res.data.country, res.data.provinces, res.data.city);
      }else{
        this.setData({
          hospitalInfo:'',
        });
      }
    })
  },

   //编辑医院
   toUpdateHospital(e) {
    var hospitalId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/createHospital/index?type=edit&hospitalId=' + hospitalId,
    })
  },

  //回显医院地址
  EchoHospitalAddress(country, province, city) {
    var that = this;
 
    if (country) {
      let r1 = api.getArea(country);
      let r2 = api.getArea(province);
      var r3 = api.getArea(city);
      Promise.all([r1, r2, r3]).then((result) => {
        var countryName, provinceName, cityName;
        if (result[0].code == 0) {
          countryName = result[0].data[0].yatCnname;
        } else {
          countryName = ""
        }
        if (result[1].code == 0) {
          provinceName = result[1].data[0].yatCnname;
        } else {
          provinceName = ""
        }
        if (result[2].code == 0) {
          cityName = result[2].data[0].yatCnname;
        } else {
          cityName = ""
        }
        var hospitalAddress = countryName + ' ' + provinceName + ' ' + cityName;
        that.setData({
          [`formData.hospitalAddress`]: hospitalAddress
        })

      }).catch((error) => {
        console.log(error)
      })
    }
  }
  
})