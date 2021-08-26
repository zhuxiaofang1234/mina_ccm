// pages/my/index.js
const app = getApp()
const api = app.globalData.api
const auth = app.globalData.auth

Page({
  /**
   * 页面的初始数据
   */
  data: {
    formData: {},
    rules: [{
        name: 'username',
        rules: {
          required: true,
          message: '用户名不能为空'
        },
      },
      {
        name: 'password',
        rules: {
          required: true,
          message: '密码输入不合法'
        },
      }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (!app.globalData.openId) {
      console.log('MY OnLoad '+ app.globalData.openId)
      wx.showToast({
        title: '请绑定账号!',
        icon: 'none',
        mask: true
      })
    } else {
      wx.getUserInfo({
        success: (res) => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
          this.data.userInfo.nickname = app.globalData.apiUserInfo.nickname
        },
      })
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    if (!app.globalData.openId) {
      wx.showToast({
        title: '请绑定账号!',
        icon: 'none',
        mask: true
      })
      this.setData({
        hasUserInfo: false
      })
    } else {
      wx.getUserInfo({
        success: (res) => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.data.userInfo.nickname = app.globalData.apiUserInfo.nickname
        },
      })
    }
  },

  aboutUs: function() {
    wx.showModal({
      title: '关于我们',
      content: 'Design & Code By SonoScape Web Team.    祝大家使用愉快！',
      showCancel: false
    })
  },

  goRegister(e) {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },

  openSite: function() {
    //个人账号不支持 web-view 个人不支持获取手机号
    wx.showModal({
      title: '提示',
      content: '开发中...',
    })
  },

  openMyList: function() {
    wx.navigateTo({
      url: '/pages/form-list/index?type=0&new_message=0'
    })
  },

  openMyAddress: function() {
    wx.chooseAddress({
      success: res => {
        console.log(res)
      }
    })
  },
})