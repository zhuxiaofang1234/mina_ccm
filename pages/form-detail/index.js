// pages/form-detail/index.js
const app = getApp()
const api = app.globalData.api
const util = app.globalData.util

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formId: 0,
    showImg: false,
    path: '/upload/form/attachment',
    files: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var formId = e.id
    this.data.formId = formId
    this.setData({
      formId: formId,
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })
    this.getFileList()
    this.getFormDetail(formId)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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
    that.setData({
      formDetail: res.data
    })
    if (res.data.advice_replace_list != '') {
      that.setData({
        advice_replace_list: JSON.parse(res.data.advice_replace_list)
      })
    }
    if (res.data.faulty_list != '') {
      that.setData({
        faulty_list: JSON.parse(res.data.faulty_list)
      })
    }
    if (res.data.site_service_duration != '') {
      that.setData({
        site_service_duration: JSON.parse(res.data.site_service_duration)
      })
    }
  })
 },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  selectFile(files) {
    console.log('selected files', files)
    // 返回false可以阻止某次文件上传
    if (files.tempFilePaths > 2) {
      return false
    }
  },

  uplaodFile(files) {
    console.log('upload files', files)
    let token = wx.getStorageSync('token')
    let _header = {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + token
    }
    var that = this
    var name = "小程序"+files.tempFilePaths[0].slice(-15)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: app.globalData.apiUrl +"/upload/form/attachment",
        filePath: files.tempFilePaths[0],
        name: 'common',
        header: _header,
        success (res) {
            const data = JSON.parse(res.data)
            const path = data.data.path          
            let _url = app.globalData.apiUrl + path
            let _f = that.data.files
            _f.push({ url: _url})
            that.setData({
              files: _f
            })

            let formData = {
              form_id: that.data.formId,
              name: name,
              path: path
            }
            that.addFileToForm(formData)
          }
      })
    })
  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('上传成功')
    console.log('upload success', e.detail)
  },
  addFileToForm(data) {
    var that = this
    api.addFileToForm(data).then(res => {
      if (res.code == 200) {
        console.log(res)
      }
    })
  },
  /**
   * 获取图片列表
   */
  getFileList() {
    var that = this
    api.formattachment({ form_id: that.data.formId}).then(res => {
      var list = that.data.files
      res.data.forEach(e => {
        let _f = { url: app.globalData.apiUrl + e.path }
        console.log(f)
        list.push(_f)
      })
      that.setData({
        files: list
      })
    })
  },
  onShowCollapse: function () {

  },

  onHideCollapse: function () {
  },

  onTapAction: function () {
    
  }
})