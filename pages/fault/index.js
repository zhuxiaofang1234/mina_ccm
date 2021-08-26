// pages/fault/index.js
const app = getApp()
const util = app.globalData.util
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    malfunctionBeanVoList: [],
    processDesc: "",
    tempObj: {},
    btnDisabled: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var repairData = wx.getStorageSync('repairData');
    var malfunctionBeanVoList = repairData.malfunctionBeanVoList ? repairData.malfunctionBeanVoList : [];
    this.setData({
      malfunctionBeanVoList: malfunctionBeanVoList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  //上传处理前图片
  uploadBeforeImg(e) {
    const {
      index
    } = e.currentTarget.dataset;
    const datas = e.detail.imgList;
    this.getchangeData(index, 'beforeProcessPic', datas)
  },

  //删除处理前图片
  deleteBeforeImg(e) {
    const {
      index
    } = e.target.dataset;
    this.deleteImg(index, 'beforeProcessPic')
  },

  //上传处理后图片
  uploadAfterImg(e) {
    const {
      index
    } = e.currentTarget.dataset;
    const datas = e.detail.imgList;
    this.getchangeData(index, 'afterProcessPic', datas)
  },

  //删除处理后图片
  deleteAfterImg(e) {
    const {
      index
    } = e.target.dataset;
    this.deleteImg(index, 'afterProcessPic')
  },

  //上传按钮禁用
  disableBtn(e) {
    this.setData({
      btnDisabled: true
    })
  },

  //获取描述
  getProcessDesc(e) {
    const {
      index
    } = e.target.dataset;
    let datas = e.detail.value;
    this.getchangeData(index, 'processDesc', datas)
  },

  //获取上传的值
  getchangeData(index, type, datas) {
    console.log(datas)
    let malfunctionBeanVoList = this.data.malfunctionBeanVoList;
    if (!malfunctionBeanVoList[index]) {
      malfunctionBeanVoList[index] = {};
    }
    malfunctionBeanVoList[index][type] = datas;
    this.setData({
      malfunctionBeanVoList: malfunctionBeanVoList,
    });
    console.log(malfunctionBeanVoList)
    let repairData = wx.getStorageSync('repairData');
    repairData.malfunctionBeanVoList = malfunctionBeanVoList;
    wx.setStorageSync('repairData', repairData)
    this.setData({
      btnDisabled: false
    })
  },

  //删除图片
  deleteImg(index, type) {
    console.log(this.data.malfunctionBeanVoList);
    this.data.malfunctionBeanVoList[index][type] = [];
    this.setData({
      malfunctionBeanVoList: this.data.malfunctionBeanVoList
    })
    let repairData = wx.getStorageSync('repairData');
    repairData.malfunctionBeanVoList = this.data.malfunctionBeanVoList;
    wx.setStorageSync('repairData', repairData)
  },

  //添加故障
  addImg: function (e) {
    const {
      type
    } = e.currentTarget.dataset;
    var tempObj = this.data.tempObj;
    tempObj[type] = e.detail.imgList;
    this.setData({
      tempObj,
      btnDisabled: false
    })
  },

  //添加处理说明
  addProcessDesc: function (e) {
    var tempObj = this.data.tempObj;
    tempObj['processDesc'] = e.detail.value;
    this.setData({
      tempObj
    })
  },

  //新增故障
  addFault: function () {
    var tempObj = this.data.tempObj;
    if (JSON.stringify(tempObj) != '{}') {
      if (!tempObj['beforeProcessPic'] || tempObj['beforeProcessPic'].length == 0) {
        this.setData({
          error: '请先上传故障处理前图片'
        });
        return
      }else if(!tempObj['afterProcessPic'] || tempObj['afterProcessPic'].length == 0){
        this.setData({
          error: '请先上传故障处后图片'
        });
        return
      }else{
        this.data.malfunctionBeanVoList.push(tempObj);
        this.setData({
          malfunctionBeanVoList: this.data.malfunctionBeanVoList,
          imgList:[],
          tempObj:{}
        });
        //加入缓存
        let repairData = wx.getStorageSync('repairData');
        repairData.malfunctionBeanVoList = this.data.malfunctionBeanVoList;
        wx.setStorageSync('repairData', repairData)
      }
    } else {
      this.setData({
        error: '请先上传故障处理信息'
      });
      return
    }
  },

  //下一步
  nextStep(e) {
    let malfunctionBeanVoList = this.data.malfunctionBeanVoList;
    let len = malfunctionBeanVoList.length;
    if (len == 0) {
      this.setData({
        error: '请至少添加一项故障处理信息'
      });
      return
    }
    let formFlag;
    malfunctionBeanVoList.forEach(function (item) {
      if ((!item['afterProcessPic'] || item['afterProcessPic'].length == 0) || (!item['beforeProcessPic'] || item['beforeProcessPic'].length == 0)) {
        formFlag = false
      } else {
        formFlag = true
      }
    });
    if (!formFlag) {
      this.setData({
        error: '请填写完整处理故障理信息'
      });
      return
    }
    wx.navigateTo({
      url: '/pages/inspection/index',
    })
  },
  goback: function () {
    wx.navigateBack({
      delta: 1
    })
  },
})