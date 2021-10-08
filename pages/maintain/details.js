// pages/maintain/details.js
const app = getApp()
const api = app.globalData.api
const util = app.globalData.util
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    showOneButtonDialog: false,
    createUser: "",
    signatureType:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var maintenanceData = wx.getStorageSync('maintenanceData');
    this.setData({
      maintenanceData: maintenanceData,
      baseData: maintenanceData.firstPageData,
      productLine: maintenanceData.firstPageData.productLine
    });
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //预览图片
  previewImage(e) {
    const {
      index,
      list
    } = e.currentTarget.dataset;
    const urls = list.map((item) => {
      return item.url
    })
    wx.previewImage({
      urls: urls,
      current: urls[index]
    })
  },

  //服务确认
  serviceConfirm() {
    var that = this;
    wx.showActionSheet({
      itemList: ['电子签字', '已纸质档签字', '无需签字'],
      success(res) {
        that.setData({
          signatureType:res.tapIndex+1
        });
        console.log(that.data.signatureType);
        if (res.tapIndex == 0) {
          wx.navigateTo({
            url: '/pages/signature/index',
          })
        } else { //无需签名直接提交
          wx.showLoading({
            title: '提交中...',
          })
          if (that.data.productLine == 1) { //超声
            that.submit_ultrasonic();
          } else if (that.data.productLine == 2) { //内镜
            that.submit_endoscope();
          } else if (that.data.productLine == 3) { //检验
            that.submit_inspect();
          }
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
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


  //取消签字
  cancelSign() {
    this.setData({
      src: ''
    })
  },

  //提交
  submitForm() {
    //获取系统当前时间
    var myDate = new Date();
    var curTime = util.formatTime(myDate);
    var curDate = curTime.substring(0, 10);
    this.setData({
      date: curDate
    })
    this.setData({
      showOneButtonDialog: true
    })
  },
  //确定
  tapDialogButton: function (e) {
    var that = this;
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
    if (this.data.productLine == 1) { //超声
      this.submit_ultrasonic();
    } else if (this.data.productLine == 2) { //内镜
      this.submit_endoscope();
    } else if (this.data.productLine == 3) { //检验
      this.submit_inspect();
    }
  },

  //超声数据
  submit_ultrasonic() {
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
    postData.hmQR = this.getCode(maintenanceData.hmQR);
    postData.hmoa = this.getCode(maintenanceData.hmoa);

    postData.mobilePhone = '+86' + wx.getStorageSync('mobile');
    postData.createUser = this.data.createUser;
    postData.serviceTime = this.data.date + curTime;
    postData.signature = this.data.src; //签名

    this.submit_data(postData);

  },

  //内镜数据
  submit_endoscope() {

    //获取系统当前时间
    var myDate = new Date();
    var curTime = util.formatTime(myDate).substring(10);
    var maintenanceData = wx.getStorageSync('maintenanceData');
    var postData = maintenanceData.firstPageData;

    /*运行环境检查 */
    postData.emea = this.getCode(maintenanceData.emea); //整机外观
    postData.emth = this.getCode(maintenanceData.emth); //温湿度
    postData.emcp = this.getCode(maintenanceData.emcp); //市电
    postData.emzg = this.getCode(maintenanceData.emzg); //零地
    postData.emfvow = this.getCode(maintenanceData.emfvow); //洗消间全览
    postData.emlse = this.getCode(maintenanceData.emlse); //镜体储存环境
    postData.emsv = this.getCode(maintenanceData.emsv); //软件版本
    postData.emhsir = this.getCode(maintenanceData.emhsir); //主机点检报告
    postData.emli = this.getCode(maintenanceData.emli); //导光接口
    postData.emd = this.getCode(maintenanceData.emd); //消毒液
    postData.emQR = this.getCode(maintenanceData.emQR); //二维码粘贴
    postData.emoe = this.getCode(maintenanceData.emoe); ////其它

    //镜体
    maintenanceData.endoscopeJson.forEach((item) => {
      item.seriesId = item.seriesId.name;
      item.angularSurveying = that.getCode(item.angularSurveying);
      item.headEndShield = that.getCode(item.headEndShield);
      item.siromb = that.getCode(item.siromb);
    });
    postData.endoscopeJson = maintenanceData.endoscopeJson;
    postData.mobilePhone = '+86' + wx.getStorageSync('mobile');
    postData.createUser = this.data.createUser;
    postData.serviceTime = this.data.date + curTime;
    postData.signature = this.data.src; //签名

    this.submit_data(postData);
  },


  //检验数据
  submit_inspect() {

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
    postData.cmQR = this.getCode(maintenanceData.cmQR); //二维码粘贴
    postData.cmoa = this.getCode(maintenanceData.cmoa);

    postData.mobilePhone = '+86' + wx.getStorageSync('mobile');
    postData.createUser = this.data.createUser;
    postData.serviceTime = this.data.date + curTime;
    postData.signature = this.data.src; //签名

    this.submit_data(postData);

  },


  //提交数据
  submit_data(postData) {
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
      } else if (res.code == 1) {
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

})