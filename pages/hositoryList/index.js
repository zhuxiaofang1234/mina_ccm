// pages/hositoryList/index.js
const app = getApp()
const api = app.globalData.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['维修', '装机', '保养'],
    activeIndex: 0,
    inputVal: "",
    loadingShow: false, // loading状态（加载中/无数据）的控制
    loadingStatus: true, // loading组件的显示控制
    totalCount: 0,
    page: 1,
    size: 15,
    hospitalName: "",
    recordList:[],
    url:'/h/data/servicedetail/page',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecordList()
  },

  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
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
  //切换tab
  getIndex(e) {
    let index = e.detail.index;
    let url;
    switch (index) {
      case '0':
        url='/h/data/servicedetail/page'
        break;
      case '1':
        url='/h/data/servicestockinstallrecord/page'
        break;
      case '2':
        url='/h/data/maintenancedetail/page'
        break;
        default:
          url='/h/data/servicedetail/page'
    }
    this.setData({
      totalCount: 0,
      inputVal: "",
      page: 1,
      size: 15,
      activeIndex: e.detail.index,
      url:url,
      recordList:[],
    });
    this.getRecordList();
  },
  //选择搜索结果
  selectResult: function (e) {
    const {
      id
    } = e.currentTarget.dataset;
    let url;
    switch (parseInt(this.data.activeIndex)) {
      case 0:
        url='/pages/webView/index?type=repair&id=' + id
        break;
      case 1:
        url= '/pages/webView/index?type=install&id=' + id
        break;
      case 2:
        url='/pages/webView/index?type=maintain&id=' + id
        break;
    }
    wx.navigateTo({
      url: url,
    })
  },

  //取消搜索
  clearInput: function (e) {
    this.setData({
      page: 1,
      inputVal: "",
    });
    setTimeout(() => {
      this.getRecordList()
    }, 600)
  },

  //点击搜索
  getSerachResult: function () {
    this.setData({
      page: 1
    });
    setTimeout(() => {
      this.getRecordList()
    }, 600)
  },

  //手机键盘搜索
  search: function (e) {
    this.setData({
      inputVal: e.detail.value,
      page: 1,
    });
    setTimeout(() => {
      this.getRecordList()
    }, 600)
  },

  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
      that.setData({
        page: 1,
        inputVal: ""
      })
      that.getRecordList()
    }, 1500);
  },

  onReachBottom: function () {
    if (!this.data.loadingShow) {
      this.setData({
        loadingShow: true,
      })
      if (this.data.page >= this.data.pages) { //不显示加载
        this.setData({
          loadingStatus: false //显示没有更多数据
        })
      } else {
        this.setData({
          loadingStatus: true, //显示加载更多
          page: this.data.page + 1,
        })
        setTimeout(() => {
          this.getRecordList(true)
        }, 600)
      }
    }
  },
  //获取列表数据
  getRecordList: function (append) {
    var that = this;
    var page = this.data.page;
    var size = this.data.size;
    var queryData = {
      'current': page,
      'size': size,
    };
    if (this.data.inputVal.trim()) {
      queryData.sn = this.data.inputVal;
    }
    if (!append) {
      wx.showLoading({
        title: '加载中....',
      })
    }
    let url = this.data.url;
    api.getHistoryList(url,queryData).then(res => {
      wx.hideLoading();
      that.setData({
        loadingShow: false
      });
      if (res.code == 0) {
        var resData = res.data;
        console.log(resData)
        var curList = append ? that.data.recordList : [];
        that.setData({
          recordList: curList.concat(resData.records),
          totalCount: resData.total,
          pages: resData.pages
        });
      }
    });
  },
})