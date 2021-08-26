//app.js
const api = require('utils/api')
const auth = require('utils/auth')
const CONFIG = require('config.js')
const util = require('utils/util')

App({
  onLaunch: function() {
    console.log('APP-onLaunch')
    this.globalData.indexGrid = CONFIG.indexGrid
    this.globalData.backgroudImages = CONFIG.backgroudImages
    this.globalData.apiUrl = CONFIG.domain
   
    var that = this
    auth.api_login().then(res => {
      console.log('form ---app.js');
      if (res.code == 200) {
        that.globalData.openId = res.data.user.openid
        console.log(res.data.user.openid)
        that.globalData.apiUserInfo = res.data.user
        console.log(res.data.user)
        wx.setStorageSync('openId', res.data.user.openid);
        wx.setStorageSync('token', res.data.token);
        wx.setStorageSync('mobile', res.data.user.mobile);
        if (that.readyOpenIdCallback) {
          that.readyOpenIdCallback(res)
        }
        console.log('launch ok')
      } else if (res.code == 500) {
        that.globalData.openId = null
        wx.setStorageSync('openId', null)
        if (that.readyOpenIdCallback) {
          that.readyOpenIdCallback(res)
        }
        console.log('nothing')
      } else {
        console.log('error')
      }
    })
    this.init()

  },
  onShow(e) {
    this.globalData.launchOption = e
  },
  init() {
    var that = this
    // 检测新版本
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    /**
     * 初次加载判断网络情况
     * 无网络状态下根据实际情况进行调整
     */
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === 'none') {
          that.globalData.isConnected = false
          wx.showToast({
            title: '当前无网络',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })
    /**
     * 监听网络状态变化
     * 可根据业务需求进行调整
     */
    wx.onNetworkStatusChange(function(res) {
      if (!res.isConnected) {
        that.globalData.isConnected = false
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000,
          complete: function() {
            that.goStartIndexPage()
          }
        })
      } else {
        that.globalData.isConnected = true
        wx.hideToast()
      }
    })
  },
  globalData: {
    api: api,
    auth: auth,
    CONFIG: CONFIG,
    util: util,
    isConnected: true,
    launchOption: undefined,
    token: null,
    userInfo: null,
    hasUserInfo: false,
    apiUrl: null,
    color: '0aecc3',
    imageUrl: '',
    bgImage: '',
    param: false,
    indexGrid: null,
    backgroudImages: null,
    apiSysConfig: null,
    apiUserInfo: null
  }
})