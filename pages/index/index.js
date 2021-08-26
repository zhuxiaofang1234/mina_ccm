//index.js
const app = getApp()
const api = app.globalData.api
const auth = app.globalData.auth
const util = app.globalData.util

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    grids: app.globalData.indexGrid,
    userInfo: {},
    hasUserInfo: false,
    backgroudImages: app.globalData.backgroudImages,
    noticeList: [{
        "id": 1,
        title: "2020年03月17日,好消息!好消息!国内用服小程序上线啦!"
      },
      {
        "id": 2,
        title: "抗击疫情,人人有责.2020年03月17日,好消息!好消息!国内用服小程序上线啦!"
      }
    ]
  },

  onLoad: function () {
    console.log('index---onload')
    if (app.globalData.openId) {
      console.log('openId found.')
      this.setData({
        openId: app.globalData.openId
      })
    } else {
      console.log('openId miss.')
      app.readyOpenIdCallback = res => {
        if (res.code == 200) {
          console.log('in then callback.')
          app.globalData.openId = res.data.user.openid
          app.globalData.apiUserInfo = res.data.user,
            wx.setStorageSync('token', res.data.token)
            wx.setStorageSync('mobile', res.data.user.mobile);
          this.setData({
            openId: res.data.user.openid
          })
          this.init()
        }
        this.setData({
          openId: null
        })
      }
    }
  },

  onShow: function () {
    console.log(app.globalData.openId)
    if (this.data.openId || app.globalData.openId) {
      this.init()
    }
    auth.checkJwt().then(res => {
      if (!res) {
        auth.refreshToken()
      }
    })
  },
  // 初始化
  async init() {
    await api.showLoading()
    await this.getSysConfig()
    await this.getMachineType()
    await api.hideLoading()
  },

  getMachineType() {
    api.getMachineType().then(res => {
      if (res.code == 200) {
        let tmp = {
          id: 0,
          name: "请选择"
        }
        let list = res.data.data
        list.unshift(tmp)
        wx.setStorageSync('machine_type', list)
      }
    })
  },

  getSysConfig() {
    api.getSysConfig().then(res => {
      if (res.code == 200) {
        wx.setStorageSync('sys_config', res.data)
      }
    })
  },

  api_login() {
    auth.api_login().then(res => {
      if (res.code == 200) {
        this.setData({
          apiUserInfo: res.data.user
        })
        app.globalData.apiUserInfo = res.data.user
        app.globalData.hasRegistered = true
        wx.setStorageSync('token', res.data.token)
        wx.setStorageSync('mobile', res.data.user.mobile);
        wx.setStorageSync('token_expires_at', res.data.expires_at)
        wx.setStorageSync('token_exp_at', res.data.exp_at)
      }
    })
  },

  homeNavTap: function (e) {
    auth.checkHasLogined().then(res => {
      if (!res) {
        wx.showModal({
          title: '提示',
          content: '请先登录!',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.switchTab({
                url: '/pages/my/index',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
              wx.showToast({
                title: '不登录注册所有功能将无法使用',
                icon: 'none'
              })
            }
          }
        })
      } else {
        wx.navigateTo({
          url: e.currentTarget.dataset.url,
        })
      }
    })
  },
  onPullDownRefresh() {
    wx.removeStorageSync('token')
    wx.removeStorageSync('token_expires_at')
    this.api_login()
    console.log('正在刷新')
  }

})