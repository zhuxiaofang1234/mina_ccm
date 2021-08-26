// pages/form-list/visit/visit.js
const app = getApp()
const api = app.globalData.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rules: [
      { 
        name: 'visit_status',
        rules: { required: true, message: '回访状态必填' },
      },
      { 
        name: 'visit_machine_mark',
        rules: { required: true, message: '设备状态分数必填' },
      },
      { 
        name: 'visit_response_mark',
        rules: { required: true, message: '响应及时性分必填' },
      },
      { 
        name: 'visit_repair_mark',
        rules: { required: true, message: '修复及时性分必填' },
      },
      { 
        name: 'visit_service_mark',
        rules: { required: true, message: '服务态度分必填' },
      },
      { 
        name: 'visit_tech_mark',
        rules: { required: true, message: '技术水平分必填' },
      },
      { 
        name: 'visit_overall_mark',
        rules: { required: true, message: '整体评价分必填' },
      },
      { 
        name: 'visit_mark',
        rules: { required: true, message: '回访总分无结果' },
      },
      { 
        name: 'visit_opinion',
        rules: { required: true, message: '客户意见必填' },
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      ['formData.id']: options.id
    })
    this.init()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  init() {
    let visit = { value: "0", desc: "请选择" }
    let tmp = Object.values(wx.getStorageSync('sys_config').visit_status)
    console.log(tmp)
    tmp.unshift(visit)
    this.setData({
      visit_status: tmp,
      visitIndex: 0
    })
  },
  bindVisitChange(e) {
    console.log(e)
    let v = this.data.visit_status[e.detail.value].value
    this.setData({
      ['formData.visit_status']: v,
      visitIndex: e.detail.value
    })
  },
  formInputChange(e) {
    console.log(e)
    const {field} = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
    let f = this.data.formData
    let total = parseInt(f.visit_machine_mark * 0.1) + parseInt(f.visit_response_mark * 0.1) + f.visit_repair_mark * 0.1 + f.visit_service_mark * 0.2 + f.visit_tech_mark * 0.2 + f.visit_overall_mark * 0.3
    this.setData({
      ['formData.visit_mark']: total,
      visit_mark: total
    })
  },
  submitForm(e) {
    console.log(this.data.formData)
    this.selectComponent('#visit-form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      console.log(this.data.formData)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
      } else {
        wx.showToast({
          title: '校验通过'
        })
        var that = this
        api.visitForm(this.data.formData).then(res => {
          if (res.code == 200) {
            wx.showToast({
              title: res.msg,
              icon: 'success',
              mask: true
            })
            wx.redirectTo({
              url: '/pages/form-list/index',
            })
          }
        })
      }
    })
  }
})