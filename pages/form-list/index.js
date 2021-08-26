const app = getApp()
const api = app.globalData.api
const auth = app.globalData.auth

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['全部', 'TS处理', '现场处理', '待回访', '待评价'],
    statusType: [{
        "status": 0,
        "statusLabel": "全部"
      },
      {
        "status": 1,
        "statusLabel": "TS处理"
      },
      {
        "status": 2,
        "statusLabel": "现场处理"
      },
      {
        "status": 3,
        "statusLabel": "待回访"
      },
      {
        "status": 4,
        "statusLabel": "待评价"
      }
    ],
    hasRefund: true,
    currentType: 1,
    tabClass: ["", "", "", "red-dot", ""],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.refreshToken()
    if (options && options.type) {
      if (options.type == 0) {
        this.setData({
          hasRefund: true,
          currentType: options.type
        })
      } else {
        this.setData({
          hasRefund: false,
          currentType: options.type
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success (res) {
        console.log('token exists')
      },
      fail (res) {
        that.refreshToken()
      }
    })
    this.doneShow()
  },
  refreshToken() {
    auth.api_login().then(res => {
      if (res.code == 200) {
        console.log(res)
        wx.removeStorageSync('token')
        wx.removeStorageSync('token_expires_at')
        wx.removeStorageSync('token_exp_at')
        wx.setStorageSync('token', res.data.token)
        wx.setStorageSync('token_expires_at', res.data.expires_at)
        wx.setStorageSync('token_exp_at', res.data.exp_at);
        wx.setStorageSync('mobile', res.data.user.mobile);
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  doneShow: function() {
    // 获取订单列表
    var that = this
    let curType = that.data.currentType
    if (curType == 0) {
      that.getFormList()
    } else if (curType == 1) {
      that.getFormTsList()
    } else if (curType == 2) {
      that.getFormSiteTreatList()
    } else if (curType == 3) {
      that.getFormVistList()
    } else if (curType == 4) {
      that.getFormTsMarkList()
    }
  },
  //全部
  getFormList: function() {
    var that = this
    api.myFormlist().then(function(res) {
      if (res.code == 200) {
        console.log('form list here')
        console.log(typeof(res.data))
        that.setData({
          formList: res.data
        })
      } else {
        that.setData({
          form_list: null
        })
      }
    })
  },
  //getFormSiteTreatList 待现场处理 申请配件、完工确认、后续处理
  getFormSiteTreatList: function() {
    var that = this
    api.formList('/form/site/list').then(function(res) {
      if (res.code == 200) {
        that.setData({
          formList: res.data
        })
      } else {
        that.setData({
          form_list: null
        })
      }
    })
  },
  //回访
  getFormVistList: function() {

  },
  //TS评分
  getFormTsMarkList: function() {
    var that = this
    api.formList('/form/ts/mark/list').then(function(res) {
      if (res.code == 200) {
        that.setData({
          formList: res.data
        })
      } else {
        that.setData({
          form_list: null
        })
      }
    })
  },
  //tslist
  getFormTsList: function() {
    var that = this
    api.formTsList().then(function(res) {
      if (res.code == 200) {
        that.setData({
          formList: res.data
        })
      } else {
        that.setData({
          form_list: null
        })
      }
    })
  },
  //tap点击
  statusTap: function(e) {
    const curType = e.currentTarget.dataset.index
    this.data.currentType = curType
    this.setData({
      currentType: curType
    });
    this.onShow()
  },
  //buttons
  siteConfirmTap: function(e) {
    const that = this;
    const formId = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认?',
      content: '确认该表单现场操作已经完成?',
      success: function(res) {
        if (res.confirm) {
          //发送后端请求
          api.updateForm('/form/operation/site/confirm', {
            id: formId
          }).then(function(res) {
            if (res.code == 200) {
              wx.showToast({
                title: '操作成功!',
              })
              that.doneShow()
            } else {
              wx.showToast({
                title: res.msg,
              })
            }
          })
        }
      }
    })
  },
  tsTap(e) {
    wx.navigateTo({
      url: './ts/ts?id=' + e.currentTarget.dataset.id,
    })
  },
  applyTap(e) {
    wx.redirectTo({
      url: './apply/apply?id=' + e.currentTarget.dataset.id,
    })
  },
  markTap(e) {
    wx.navigateTo({
      url: './tsmark/tsmark?id=' + e.currentTarget.dataset.id,
    })
  },
  visitTap(e) {
    wx.navigateTo({
      url: '/pages/form-list/visit/visit?id=' + e.currentTarget.dataset.id,
    })
  },
  extraTap(e) {
    wx.navigateTo({
      url: './extra/extra?id=' + e.currentTarget.dataset.id + '&machine_type=' + e.currentTarget.dataset.machine_type,
    })
  }
})