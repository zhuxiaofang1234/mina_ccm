const app = getApp()
const api = app.globalData.api
Page({
  data: {
    showTopTips: false,
    hospitalName: '请选择医院',
    hospitalDept: '请选择科室',
    sn: [],
    productLineItems: [{
        name: '超声',
        value: 1
      },
      {
        name: '内镜',
        value: 2,
        checked: 'true'
      },
      {
        name: '检验',
        value: 3
      },
    ],
    deviceStatusItems: [{
        name: '销售',
        value: 2,
        checked: 'true'
      },
      {
        name: '样机',
        value: 3,
      },
      {
        name: '备用机',
        value: 4
      },
    ],
    snItem: "",
    formData: {
      productLine: 2,
      deviceStatus: 2,
    },
    hospitalInfo: {},
    rules: [{
        name: 'productLine',
        rules: {
          required: true,
          message: '设备类型是必选项'
        },
      }, {
        name: 'deviceStatus',
        rules: {
          required: true,
          message: '装机类型是必选项'
        },
      }, {
        name: 'hospitalId',
        rules: {
          required: true,
          message: '装机医院是必选项'
        },
      }, {
        name: 'hospitalDept',
        rules: {
          required: true,
          message: '医院科室是必选项'
        },
      },
      {
        name: 'hospitalDeptContactName',
        rules: {
          required: true,
          message: '医院科室联系人是必填项'
        },
      },
      {
        name: 'hospitalDeptContactPhone',
        rules: [{
          required: true,
          message: '科室联系电话必填'
        }]
      }
    ],
    InstallData: {}
  },
  onLoad: function () {
    //从缓存里读取显示信息
    var InstallData = wx.getStorageSync('InstallData') ? wx.getStorageSync('InstallData') : {};
    console.log(InstallData)
    var formData = InstallData.firstPageData ? InstallData.firstPageData : this.data.formData;
    console.log(formData)
    this.setData({
      formData: formData
    })
    this.showData(InstallData.firstPageData);
  },
  onShow: function () {

  },

  //回显数据
  showData: function (data) {
    if (!data) {
      return
    }
    //设备类型
    var productLineItems = this.data.productLineItems;
    for (var i = 0, len = productLineItems.length; i < len; ++i) {
      productLineItems[i].checked = productLineItems[i].value == data.productLine;
    }
    //装机类型
    var deviceStatusItems = this.data.deviceStatusItems;
    for (var i = 0, len = deviceStatusItems.length; i < len; ++i) {
      deviceStatusItems[i].checked = deviceStatusItems[i].value == data.deviceStatus;
    }
    this.setData({
      sn: data.sn,
      hospitalName: data.hospitalName,
      hospitalDept: data.hospitalDept,
      [`hospitalInfo.contact`]: data.hospitalDeptContactName,
      [`hospitalInfo.contactTel`]: data.hospitalDeptContactPhone,
      deviceStatusItems,
      productLineItems
    })
  },
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  //设备类型
  radioChange: function (e) {
    var productLineItems = this.data.productLineItems;
    for (var i = 0, len = productLineItems.length; i < len; ++i) {
      productLineItems[i].checked = productLineItems[i].value == e.detail.value;
    }
    this.setData({
      productLineItems: productLineItems,
      [`formData.productLine`]: parseInt(e.detail.value)
    });
  },
  //装机类型
  deviceStatusChange: function (e) {
    var deviceStatusItems = this.data.deviceStatusItems;
    for (var i = 0, len = deviceStatusItems.length; i < len; ++i) {
      deviceStatusItems[i].checked = deviceStatusItems[i].value == e.detail.value;
    }
    this.setData({
      deviceStatusItems: deviceStatusItems,
      [`formData.deviceStatus`]: parseInt(e.detail.value)
    });
  },


  //选择医院
  toHospital() {
    wx.navigateTo({
      url: '/pages/selectHospital/index',
    })
  },

  //选择科室
  toHospitalDept() {
    wx.navigateTo({
      url: '/pages/selectDepart/index',
    })
  },

  //添加设备sn
  addSn() {
    if (!this.data.snItem) {
      wx.showToast({
        title: '请先输入要装机的SN',
        icon: "none"
      })
      return
    } else {
     let  deviceStatus =  this.data.formData.deviceStatus;
      let sndata = {
        deviceStatus:deviceStatus,
        sn:[this.data.snItem]
      };
      this.isSingleSN(deviceStatus,sndata);
    }
  },

  isSingleSN(deviceStatus, data) {
    let that = this;
    if (deviceStatus == 2) { //销售类型保持SN唯一性
      api.getRepeatSn(data).then(res => {
        if (res.code == 0) {
          let resData = res.data;
          if (resData.length !== 0) {
            let snStr = res.data.join(',');
            wx.showModal({
              title: '提示',
              content: `SN ${snStr}已存在，请重新输入`,
              showCancel: false,
              confirmColor: '#009fab'
            })
            return;
          } else {
            let sn = that.data.sn;
            sn.push(that.data.snItem);
            that.setData({
              sn: sn,
              snItem: "",
              RepeatSn: false
            })
          }
        }
      })
    } else {
      let sn = that.data.sn;
      sn.push(that.data.snItem);
      that.setData({
        sn: sn,
        snItem: "",
        RepeatSn: false
      })
    }
  },
  //删除设备编号
  deleteSN(e) {
    const {
      index
    } = e.currentTarget.dataset;
    this.data.sn.splice(index, 1);
    this.setData({
      sn: this.data.sn
    })
  },
  formSNChange(e) {
    this.setData({
      snItem: e.detail.value
    })
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    });
  },
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        if (this.data.sn.length == 0) {
          this.setData({
            error: '请输入设备SN'
          });
          return
        } else {
          var InstallData = wx.getStorageSync('InstallData') ? wx.getStorageSync('InstallData') : {};
          this.data.formData.hospitalName = this.data.hospitalName;
          let deviceStatus = this.data.formData.deviceStatus;
          this.data.formData.sn = this.data.sn;
          InstallData.firstPageData = this.data.formData;
          wx.setStorageSync('InstallData', InstallData);
          if (deviceStatus == 2) { //判断sn的唯一性
            console.log(deviceStatus)
            let sndata = {
              deviceStatus:deviceStatus,
              sn:this.data.sn
            };
            api.getRepeatSn(sndata).then(res => {
              if (res.code == 0) {
                let resData = res.data;
                if (resData.length !== 0) {
                  let snStr = res.data.join(',');
                  wx.showModal({
                    title: '提示',
                    content: `SN ${snStr}已存在，请重新输入`,
                    showCancel: false,
                    confirmColor: '#009fab'
                  })
                  return;
                } else {
                  wx.navigateTo({
                    url: '/pages/installProduct/index',
                  })
                }
              }
            })
          }else{
            wx.navigateTo({
              url: '/pages/installProduct/index',
            })
          }
        }
      }
    })
  }
});