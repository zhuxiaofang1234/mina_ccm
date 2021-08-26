const app = getApp()
const api = app.globalData.api
const auth = app.globalData.auth

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
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

  onLoad: function (options) {

  },
  formInputChange(e) {
    var that = this
    const {
      field
    } = e.currentTarget.dataset
    that.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  submitForm() {
    var that = this
    this.selectComponent('#reg-form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
          wx.showToast({
            title: errors[firstError[0]].message,
            icon: 'loading',
            mask: true
          })

        }
      } else {
        let username = this.data.formData.username
        let password = this.data.formData.password
        auth.api_register(username, password).then(res => {
          if (res.code == 200) {
            app.globalData.hasRegistered = true
            app.globalData.openId = res.data.user.openid
            wx.setStorageSync('token', res.data.token)
            wx.setStorageSync('mobile', res.data.user.mobile);
            console.log(res.data.user.openid)
            wx.setStorageSync('openId', res.data.user.openid)
            wx.setStorageSync('token_expires_at', res.data.expires_at)
            wx.setStorageSync('token_exp_at', res.data.exp_at)
            app.globalData.userInfo.nickname = res.data.user.nickname
            console.log('nickname'+ res.data.user.nickname)
            wx.showToast({
              title: '绑定成功'
            })
           wx.switchTab({
             url: '/pages/my/index',
           })
           //wx.navigateBack()
          }
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    app.globalData.hasUserInfo = true
    this.submitForm()
  }
})
