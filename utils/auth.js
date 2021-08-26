const API = require('./api')
const util = require('./util')
const promisify = require('./promisify.js')
const get_userInfo = promisify(wx.getUserInfo)
const get_code = promisify(wx.login)
const get_setting = promisify(wx.getSetting)
const wx_request = promisify(wx.request);

//检查session状态
async function checkSession() {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success() {
        return resolve(true)
      },
      fail() {
        return resolve(false)
      }
    })
  })
}
//检查token是否在有效期内
async function checkJwt() {
  let token = wx.getStorageSync('token');
  if(!token){
    return false
  }
  let token_exp_at = wx.getStorageSync('token_exp_at')
  var end = Date.parse(new Date()) / 1000
  console.log("当前时间戳为：" + end)
  console.log("token过期时间戳为：" + token_exp_at)
  if (parseInt(end - token_exp_at) >= 0) {
    console.log('token was expired!')
    return false
  }
  return true
}

//refreshToken()
async function refreshToken() {
  console.log('start refresh token')
  api_login().then(res => {
    if (res.code == 200) {
      wx.removeStorageSync('token')
      wx.removeStorageSync('openId')
      wx.removeStorageSync('token_exp_at')
      wx.removeStorageSync('token_expires_at')
      wx.setStorageSync('token', res.data.token)
      wx.setStorageSync('token_exp_at', res.data.exp_at)
      wx.setStorageSync('token_expires_at', res.data.expires_at)
      wx.setStorageSync('openId', res.data.user.openid);
      wx.setStorageSync('mobile', res.data.user.mobile)
      
      console.log('refresh token done.')
    }
  })
}

//wx login
const login = () => {
  return Promise.all([get_setting(), get_code()])
    .then((results) => {
      const authSetting = results[0].authSetting
      const code = results[1].code
      if (util.isEmptyObject(authSetting)) {
        console.log('首次授权')
        return authSetting
      } else {
        console.log('不是第一次授权', authSetting)
        if (authSetting['scope.userInfo'] !== false) {
          return get_userInfo().then(res => {
            return res
          })
        }
      }
    }).then(res => {
      return res
    })
}
// api login
const api_login = () => {
  return Promise.all([get_code()])
    .then((results) => {
      const code = results[0].code
      return API.getUserInfo({
        code: code
      })
    }).then(res => {
      return res
    })
}
//api register
function api_register(username, password) {
  return Promise.all([get_code()])
    .then((results) => {
      const code = results[0].code
      console.log(code)
      const _data = {
        code: code,
        username: username,
        password: password
      }
      return API.register(_data)
    }).then(res => {
      return res
    })
}

//检测登录状态，返回 true / false
async function checkHasLogined() {
  const token = wx.getStorageSync('token')
  if (!token) {
    console.log('token not exists!')
    return false
  }
  const loggined = await checkSession()
  if (!loggined) {
    wx.removeStorageSync('token')
    return false
  }
  // todo 检查token是否过期
  const validToken = await checkJwt()
  if (!validToken) {
    wx.removeStorageSync('token')
    wx.removeStorageSync('token_exp_at')
    wx.removeStorageSync('token_expires_at')
    return false
  }
  return true
}

function loginOut() {
  wx.removeStorageSync('token')
  wx.removeStorageSync('uid')
}

module.exports = {
  checkHasLogined: checkHasLogined,
  loginOut: loginOut,
  login: login,
  api_login: api_login,
  api_register: api_register,
  get_code: get_code,
  checkJwt: checkJwt,
  refreshToken: refreshToken
}