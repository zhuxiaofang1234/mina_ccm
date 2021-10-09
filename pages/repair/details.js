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
    var repairData = wx.getStorageSync('repairData');
    console.log(repairData)
    this.setData({
      repairData: repairData,
      baseData: repairData.firstPageData,
      deviceType:repairData.firstPageData.deviceType
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
          if (that.data.deviceType == 1) { //超声
            that.submit_ultrasonic();
          } else if (that.data.deviceType == 2) { //内镜
            that.submit_endoscope();
          } else if (that.data.deviceType == 3) { //检验
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
   var repairData = wx.getStorageSync('repairData');
   var postData = repairData.firstPageData;

    /*维修环境检查 */
    postData.hsdo = this.getCode(repairData.hsdo);//科室全览
    postData.hsth = this.getCode(repairData.hsth); //温湿度
    postData.hscp = this.getCode(repairData.hscp); //市电
    postData.hszg = this.getCode(repairData.hszg); //零地
    postData.hsl5 = this.getCode(repairData.hsl5); //现场5s
    postData.hsQR = this.getCode(repairData.hsQR); //二维码粘贴
    postData.hsoe = this.getCode(repairData.hsoe); //其他
    /**故障确认 */
    postData.hs512v = this.getCode(repairData.hs512v); //5V/12V电压
    postData.hssii = this.getCode(repairData.hssii); //系统信息界面
    postData.hsfvp = this.getCode(repairData.hsfvp); //故障/视频照片
    postData.hsfbp = this.getCode(repairData.hsfbp);//故障板图片
    postData.hstp = this.getCode(repairData.hstp);//拆机图片
     /*维修效果确认 */
     postData.hshsi = this.getCode(repairData.hshsi);///硬件自检
     postData.hskt = this.getCode(repairData.hskt), //键盘测试
     postData.hsle = this.getCode(repairData.hsle),//存储空间
     postData.hsss = this.getCode(repairData.hsss), //日志导出
     postData.hsswdote = this.getCode(repairData.hsswdote),//设备开机工作图
     postData.hsbpw = this.getCode(repairData.hsbpw),//探头始波
     postData.faultDesc = repairData.faultDesc;
    postData.mobilePhone = '+86' + wx.getStorageSync('mobile'); 
    postData.createUser = this.data.createUser;
    postData.serviceTime = this.data.date + curTime;

    postData.signature = this.data.src; //签名
    postData.signatureType = this.data.signatureType; //签名类型

    this.submit_data(postData);

  },

  //内镜数据
  submit_endoscope() {

    //获取系统当前时间
    var myDate = new Date();
    var curTime = util.formatTime(myDate).substring(10);
    var repairData = wx.getStorageSync('repairData');
    var postData = repairData.firstPageData;

     /*维修环境检查 */
     postData.esdo = this.getCode(repairData.esdo);//科室全览
     postData.esth = this.getCode(repairData.esth); //温湿度
     postData.escp = this.getCode(repairData.escp); //市电
     postData.eszg = this.getCode(repairData.eszg); //零地
     postData.esl5 = this.getCode(repairData.esl5); //现场5s
     postData.esQR = this.getCode(repairData.esQR); //二维码粘贴
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
      postData.faultDesc = repairData.faultDesc;
      postData.mobilePhone = '+86' + wx.getStorageSync('mobile'); 
      postData.createUser = this.data.createUser;
      postData.serviceTime = this.data.date + curTime;
      postData.signature = this.data.src; //签名
      postData.signatureType = this.data.signatureType; //签名类型

    this.submit_data(postData);
  },


  //检验数据
  submit_inspect() {

   //获取系统当前时间
   var myDate = new Date();
   var curTime = util.formatTime(myDate).substring(10);
   var repairData = wx.getStorageSync('repairData');
   var postData = repairData.firstPageData;
   /*维修环境检查 */
   postData.csdo = this.getCode(repairData.csdo);//科室全览
   postData.csth = this.getCode(repairData.csth); //温湿度
   postData.csteotv = this.getCode(repairData.csteotv); //本底电压
   postData.cszg = this.getCode(repairData.cszg); //零地
   postData.csmtuorp = this.getCode(repairData.csmtuorp); //配套使用试剂照片
   postData.csl5 = this.getCode(repairData.csl5); //现场5s
   postData.csQR = this.getCode(repairData.csQR); //二维码粘贴
   postData.csoe = this.getCode(repairData.csoe); //其他
   /**故障确认 */
   postData.csvpofp = this.getCode(repairData.csvpofp); //故障照片
   postData.csfl = this.getCode(repairData.csfl); //故障日志
   postData.csivii = this.getCode(repairData.csivii); //仪器版本信息界面 
   postData.csppofp = this.getCode(repairData.csppofp);//处理故障部件图片
   postData.csitapsi = this.getCode(repairData.csitapsi);//仪器温度、压力状态界面
   postData.csamsi = this.getCode(repairData.csamsi);//仪器温度、压力状态界面

    /*维修效果确认 */
    postData.csbtr = this.getCode(repairData.csbtr);//本底测试结果界面
    postData.csrdi = this.getCode(repairData.csrdi), //重复性数据界面
    postData.csqctri = this.getCode(repairData.csqctri),//质控测试结果界面
    postData.cssdrdi = this.getCode(repairData.cssdrdi), //散点图原始数据界面
    postData.cscci = this.getCode(repairData.cscci),//校准系数界面 
    postData.csntrri = this.getCode(repairData.csntrri),//正常测试结果报告界面 
    postData.csle = this.getCode(repairData.csle),//日志导出 
    postData.faultDesc = repairData.faultDesc;
    postData.mobilePhone = '+86' + wx.getStorageSync('mobile'); 
   postData.createUser = this.data.createUser;
   postData.serviceTime = this.data.date + curTime;
    postData.signature = this.data.src; //签名
    postData.signatureType = this.data.signatureType; //签名类型
    this.submit_data(postData);
  },


  //提交数据
  submit_data(postData) {
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

})