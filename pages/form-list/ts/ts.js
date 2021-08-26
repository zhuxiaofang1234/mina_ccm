// pages/form-list/ts/ts.js
//ts apply的实现想法 一个搜索阔 搜索配件 一个picker显示搜索结果 选中后往一个array push
//ts 默认是[] 选中即弹框告知 确认 选中后不可修改
const app = getApp()
const api = app.globalData.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultIndex: 0,
    results: [
      { name: '请选择', value: "CHOOSE"},
      { name: '转派工', value: "ASSIGN"},
      { name: '已经解决,直接结束', value: "SOLVED"}
    ],
    searchUrl: app.globalData.apiUrl + "/auto/part",
    tsList: {
      apply_num: 1
    },
    badList: {},
    faulty_list: [],
    advice_replace_list: [],
    adviceIndex: 0,
    slideButtons: [{
      type: 'warn',
      text: '删除',
      extClass: 'test',
      src: global.isDemo ? '/page/weui/example/cell/icon_del.svg' : '/example/cell/icon_del.svg', // icon的路径
    }],
    rules: [
      { 
        name: 'next',
        rules: { required: true, message: '处理结果必填' },
      },
      { 
        name: 'process_schema',
        rules: { required: true, message: '处理方案必填' },
      },
      ],
  },
  bindResultChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail)
    let next = this.data.results[e.detail.value].value
    this.setData({
      resultIndex: e.detail.value,
      ['formData.next']: next
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ['formData.id']: options.id
    })
  },
  onShow: function (e) {

  },
  onPnChangeEvent(e) {
    console.log(e)
    let tmp = e.detail.list
    tmp.apply_num = 1
    this.setData({
      tsList: tmp
    })
  },
  addAdvicePn(e) {
    console.log(e)
    console.log(this.data.advice_replace_list.length)
    let list = this.data.advice_replace_list
    let length = this.data.advice_replace_list.length
    list.push(this.data.tsList)
    console.log(list)
    this.setData({
      advice_replace_list: list
    })
    console.log(this.data.advice_replace_list)
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`tsList.${field}`]: e.detail.value
    })
  },
  textareaChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  slideButtonTap(e) {
    console.log('slide button tap', e)
    let index = e.currentTarget.dataset['idx']
    let tmp = this.data.faulty_list
    tmp.splice(index, 1)
    this.setData({
      faulty_list: tmp
    })
  },
  slideAdButtonTap(e) {
    console.log(e)
    let index = e.currentTarget.dataset['id']
    let tmp = this.data.advice_replace_list
    tmp.splice(index, 1)
    this.setData({
      advice_replace_list: tmp
    })
  },
  addFaultyPn(e) {
    console.log(e)
    let list = this.data.faulty_list
    list.push(this.data.badList)
    console.log(list)
    this.setData({
      faulty_list: list
    })
    console.log(this.data.faulty_list)
  },
  faultyFormInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`badList.${field}`]: e.detail.value
    })
  },
  submitForm(e) {
    console.log(e)
    this.setData({
      ['formData.advice_replace_list']: this.data.advice_replace_list,
      ['formData.faulty_list']: this.data.faulty_list
    })
    this.selectComponent('#ts-form').validate((valid, errors) => {
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
        api.tsProcess(this.data.formData).then(res => {
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