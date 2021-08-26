// pages/form-list/apply/apply.js
const app = getApp()
const api = app.globalData.api
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchUrl: app.globalData.apiUrl + "/auto/part",
    replace_list: [],
    slideButtons: [{
      type: 'warn',
      text: '删除',
      extClass: 'test',
      src: global.isDemo ? '/page/weui/example/cell/icon_del.svg' : '/example/cell/icon_del.svg', // icon的路径
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ['formData.id']: options.id
    })
    this.getFormDetail(options.id)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onPnChangeEvent(e) {
    console.log('onPnChange')
    console.log(e.detail)
    this.setData({
      ['applyList.apply_pn']: e.detail.list.pn,
      ['applyList.apply_name']: e.detail.list.name,
      ['applyList.type_desc']: e.detail.list.type_desc,
      ['applyList.apply_num']: 1,
      ['applyList.recycle_type']: e.detail.list.recycle_type,
    })
  },
  addPn(e) {
    console.log(e)
    let list = this.data.replace_list
    list.push(this.data.applyList)
    console.log(list)
    this.setData({
      replace_list: list
    })
    this.setData({
      applyList: {}
    })
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    console.log(field)
    this.setData({
      [`applyList.${field}`]: e.detail.value
    })
  },
  slideButtonTap(e) {
    console.log(e)
    let index = e.currentTarget.dataset['id']
    let tmp = this.data.replace_list
    tmp.splice(index, 1)
    this.setData({
      replace_list: tmp
    })
  },
  submitForm(e) {
    console.log(e)
    let apply_list = this.data.replace_list
    this.setData({
      ['formData.replace_list']: apply_list
    })
    api.partApply(this.data.formData).then(res => {
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
  },
  getFormDetail(id) {
    var that = this;
    api.formView(id).then(function (res) {
      if (res.code != 200) {
        wx.showModal({
          title: '错误',
          content: res.msg,
          showCancel: false
        })
        return;
      }
      if (res.data.advice_replace_list != '') {
        let ad_list = JSON.parse(res.data.advice_replace_list)
        let tsList = []
        if (ad_list.length > 0) {
          tsList =  ad_list.filter(lst => lst.apply_num > 0)
        }
        that.setData({
          replace_list: tsList
        })
      }
    })
  },
})