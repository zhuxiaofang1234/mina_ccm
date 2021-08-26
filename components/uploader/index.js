// components/uploader/index.js'
const App = getApp();
const CONFIG = require("../../config")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgList: { //图片列表
      type: [Array],
      value: [],
      observer: '_updateDataChange' //组件数据字段监听器，用于监听properties和data的变化
    },
    max: { //最大可以上传数
      type: [Number],
      value: 9
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showUploadBtn: true,
  },

  lifetimes: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    //监听imgList的改变
    _updateDataChange() {
      let max = this.data.max;
      let listLen = this.data.imgList.length
      if (listLen == max) {
        this.setData({
          showUploadBtn: false
        })
      } else {
        this.setData({
          showUploadBtn: true
        })
      }
    },
    upload(e) {
      let imgList = this.data.imgList; //此时imgList的数据状态还是外部传来的
      let max = this.data.max;
      let listLen = imgList.length;
      let count = parseInt(max - listLen) > 9 ? 9 : parseInt(max - listLen);
      let that = this;
      wx.chooseImage({
        count: count,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const tempFilePaths = res.tempFilePaths;
          const tempFiles = res.tempFiles;
          console.log(tempFiles)
          tempFiles.forEach(item => {
            var tempImgItem = {};
            tempImgItem.status = 'wait';
            tempImgItem.url = item.path;
            tempImgItem.code = "";
            //console.log((item.size / 1024 / 1024).toFixed(2))
            imgList.push(tempImgItem);
          });
          //更新之后同步一下data里的imgList,此时imgList包含带上传状态
          that.setData({
            imgList: imgList
          })
          if (that.data.imgList.length == max) {
            that.setData({
              showUploadBtn: false
            })
          }
          wx.showLoading({
            title: '上传中',
          })
          let promiseList = tempFilePaths.map(temp => that.uploadFilePromise(temp));
          Promise.all(promiseList).then((result) => { //顺序返回结果
            wx.hideLoading();
            result.map((item, index) => {
              var curIndex;
              if (listLen === 0) {
                curIndex = index
              } else {
                curIndex = listLen + index
              }
              var imgItem = {};
              imgItem.url = tempFilePaths[index];
              if (item == 'error') {
                imgList[curIndex].status = 'error'
              } else {
                imgList[curIndex].status = 'success'
                imgList[curIndex].code = JSON.parse(item.data).data.fileId;
              }
            });
            //更新上传状态
            that.setData({
              imgList: imgList
            })
            that.triggerEvent('disableBtn', {}, {});
            that.triggerEvent('Upload', {
              imgList: imgList
            })
          })
        }
      })
    },
    uploadFilePromise(filePath) {
      var host = CONFIG.domain;
      var url = host + '/h/data/miniofile/upload';
      return new Promise(function (resolve, reject) {
        wx.uploadFile({
          url: url,
          filePath,
          name: 'file',
          success: res => {
            // 触发图片上传事件
            let data = JSON.parse(res.data);
            if (data.code != 0) {
              resolve('error')
              wx.showToast({
                title: data.message || '上传失败',
                icon: 'none'
              })
            } else {
              resolve(res)
            }
          },
          fail: e => {
            if (e.errMsg === "request:fail timeout") {
              uni.showToast({
                icon: "none",
                title: "网络连接超时,请稍后重试"
              })
            }
            resolve('error')
          }
        });
      })
    },

    delete(e) {
      const {
        index
      } = e.currentTarget.dataset;
      var imgList = this.properties.imgList;
      imgList.splice(index, 1);
      this.setData({
        imgList: imgList,
      });
      if (imgList.length < this.data.max) {
        this.setData({
          showUploadBtn: true
        })
      }
      this.triggerEvent('Delete', {
        imgList: imgList
      })
    },

    //展示图片
    previewImage(e) {
      var that = this;
      var urls = [];
      that.data.imgList.forEach(function (item) {
        urls.push(item.url)
      })
      wx.previewImage({
        urls: urls,
        current: urls[e.currentTarget.dataset.index]
      })
    },
  }
})