Page({
  data: {
    showTopTips: false,
    hospitalName: '请选择医院',
    equipTypeItems: [{
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
    warrantyStatusItems: [{
        name: '保内',
        value: 1,
        checked: 'true'
      },
      {
        name: '保外',
        value: 2,
      },
    ],
    maintainItems: [{
        name: '月度',
        value: '1'
      },
      {
        name: '季度',
        value: '2',
        checked: 'true'
      },
      {
        name: '年度',
        value: '3'
      },
    ],
    //机器类型
    machineItems: [{
      name: '销售',
      value: 1
    },
    {
      name: '样机',
      value: 2,
      checked: 'true'
    },
  ],
    formData: {
      productLine: 2,
      maintenanceType: 2,
      warrantyStatus:1,
      machineType:2,
      sn: ""
    },
    rules: [{
      name: 'sn',
      rules: {
        required: true,
        message: '设备SN必填'
      },
    }, {
      name: 'productLine',
      rules: {
        required: true,
        message: '设备类型是必选项'
      },
    },
    {
      name: 'machineType',
      rules: {
        required: true,
        message: '机器类型是必选项'
      },
    }, {
      name: 'maintenanceType',
      rules: {
        required: true,
        message: '保养类型是必选项'
      },
    },{
      name: 'warrantyStatus',
      rules: {
        required: true,
        message: '保修状态是必选项'
      },
    }
    , {
      name: 'hospitalId',
      rules: {
        required: true,
        message: '维保医院是必选项'
      },
    }]
  },
  onLoad: function () {
    //从缓存里读取显示信息
    var maintenanceData = wx.getStorageSync('maintenanceData') ? wx.getStorageSync('maintenanceData') : {};
    var formData = maintenanceData.firstPageData ? maintenanceData.firstPageData : this.data.formData;
    this.setData({
      formData: formData
    });
    console.log(this.data.formData)
    this.showData(maintenanceData.firstPageData);
  },
  //回显数据
  showData: function (data) {
    if (!data) {
      return
    }
    this.setData({
      sn: data.sn,
      hospitalName: data.hospitalName,
      hospitalInfo: data.hospitalInfo,
      [`hospitalInfo.contact`]: data.hospitalDeptContactName,
      [`hospitalInfo.contactTel`]: data.hospitalDeptContactPhone,
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
   //单项选项
   radioChange: function (e) {
    const {type} = e.target.dataset;
    this.setData({
      [`formData.${type}`]: e.detail.value
    });
 },
  
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    });
  },
  //选择医院
  toHospital() {
    wx.navigateTo({
      url: '/pages/selectHospital/index',
    })
  },
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        var maintenanceData = wx.getStorageSync('maintenanceData') ? wx.getStorageSync('maintenanceData') : {};
        var hospitalInfo = this.data.hospitalInfo;
        var contact = hospitalInfo.contact ? hospitalInfo.contact : '';
        var contactTel = hospitalInfo.contactTel ? hospitalInfo.contactTel : '';
        this.data.formData.hospitalName = this.data.hospitalName;
        this.data.formData.clientInfo = contact + '-' + contactTel;
        this.data.formData.hospitalInfo = this.data.hospitalInfo;
        maintenanceData.firstPageData = this.data.formData;
        var productLine = this.data.formData.productLine;
        var url;
        switch (parseInt(productLine)) {
          case 1:
            url = '/pages/maintain/ultrasonic';
            break;
          case 2:
            url = '/pages/maintain/endoscope';
            break;
          case 3:
            url = '/pages/maintain/inspect'
        }
        wx.setStorageSync('maintenanceData', maintenanceData);
        wx.navigateTo({
          url: url,
        })
      }
    })
  }
});