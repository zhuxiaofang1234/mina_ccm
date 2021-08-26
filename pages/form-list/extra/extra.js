// pages/form-list/extra/extra.js
const app = getApp()
const api = app.globalData.api
const util = app.globalData.util
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2020-01-01',
    time: '06:00',
    service_time: '06:00',
    end_service_time: '06:00',
    service_date: '2020-01-01',
    accIndex: 0,
    site_resultIndex: 0,
    formData: {
      site_service_duration: []
    },
    slideButtons: [{
      type: 'warn',
      text: '删除',
      extClass: 'test',
      src: global.isDemo ? '/page/weui/example/cell/icon_del.svg' : '/example/cell/icon_del.svg', // icon的路径
    }],
    rules: [
      { 
        name: 'faulty_first_level_desc',
        rules: { required: true, message: '一级故障分类必填' },
      },
      { 
        name: 'faulty_secondary_desc',
        rules: { required: true, message: '二级故障分类必填' },
      },
      { 
        name: 'accessory_usage',
        rules: { required: true, message: '配件使用情况必填' },
      },
      { 
        name: 'site_result',
        rules: { required: true, message: '维修结果必填' },
      },
      { 
        name: 'site_ordered_at_date',
        rules: { required: true, message: '预约上门日期必填' },
      },
      { 
        name: 'site_ordered_at_time',
        rules: { required: true, message: '预约上门时间必填' },
      },
      { 
        name: 'site_traffic_duration',
        rules: { required: true, message: '路途时间必填' },
      },
      { 
        name: 'treatment_desc',
        rules: { required: true, message: '现场描述必填' },
      },
      ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let tmp_acc = { value: "0", "desc": "请选择" }
    let acc_usage = (Object.values(wx.getStorageSync('sys_config').accessory_usage))
    let siteResults = (Object.values(wx.getStorageSync('sys_config').site_result))
    acc_usage.unshift(tmp_acc)
    siteResults.unshift(tmp_acc)
    api.getFaultyById({
      parent_id: options.machine_type
    }).then(res => {
      console.log(res.data)
      if (res.code == 200) {
        this.initFaulty(res.data)
      }
    })
    this.setData({
      accessory_usage: acc_usage,
      siteResults: siteResults,
      ['formData.id']: options.id
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  initFaulty(data) {
    let tmp = {
      value: data.id,
      label: data.name,
      children: util.convertTree(data.all_children)
    }
    let parentFaulty = [{value: data.id, label: data.name}]
    let firstTmp = { value: "0", label: "请选择一级故障分类"}
    let firstFaulty = tmp.children
    firstFaulty.unshift(firstTmp)
    this.setData({
      parentFaulty: parentFaulty,
      parentFaultyIndex: 0,
      faulty_data: tmp,
      firstFaultyIndex: 0,
      firstFaulty: firstFaulty
    })
  },
  bindFirstFaultyChange(e) {
    let second = this.data.firstFaulty[e.detail.value].children
    let faulty_first_level_desc = this.data.firstFaulty[e.detail.value].label
    let tmp = { value: "0", label: "请选择二级故障分类" }
    second.unshift(tmp)
    this.setData({
      firstFaultyIndex: e.detail.value,
      secondFaulty: second,
      secondFaultyIndex: 0,
      ['formData.faulty_first_level_desc']: faulty_first_level_desc
    })
  },
  bindSecondFaultyChange(e) {
    console.log(e)
    let faulty_secondary_desc = this.data.secondFaulty[e.detail.value].label
    this.setData({
      secondFaultyIndex: e.detail.value,
      ['formData.faulty_secondary_desc']: faulty_secondary_desc
    })
  },
  bindAccUsageChange(e) {
    this.setData({
      accIndex: e.detail.value,
      ['formData.accessory_usage']: this.data.accessory_usage[e.detail.value].value
    })
  },
  bindFixResultChange(e) {
    //siteResults site_result
    this.setData({
      site_resultIndex: e.detail.value,
      ['formData.site_result']: this.data.siteResults[e.detail.value].value
    })
  },
  bindDateChange(e) {
    console.log(e)
    const  { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value,
      date: e.detail.value
    })
  },
  bindTimeChange(e) {
    console.log(e)
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value,
      time: e.detail.value
    })
  },
  formInputChange(e) {
    console.log(e)
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  bindServiceTimeChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value,
      service_time: e.detail.value
    })
  },
  bindEndTimeChange(e) {
    //todo 
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value,
      end_service_time: e.detail.value
    })
  },
  bindServiceDateChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value,
      service_date: e.detail.value
    })
  },
  addServiceDuration(e) {
    console.log(e)
    let durantion = this.data.formData.site_service_duration
    durantion.push({
      date: this.data.service_date,
      duration: [this.data.service_time, this.data.end_service_time]
    })

    this.setData({
      ['formData.site_service_duration']: durantion
    })
  },
  removeDurationTap(e) {
    console.log(e.currentTarget.dataset.id)
    let duration = this.data.formData.site_service_duration
    duration.splice(e.currentTarget.dataset['id'], 1)
    this.setData({
      ['formData.site_service_duration']: duration
    })
  },
  submitForm(e) {
    this.selectComponent('#extra-form').validate((valid, errors) => {
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
        api.extraTreatForm(this.data.formData).then(res => {
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