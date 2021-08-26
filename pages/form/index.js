const util = require('../../utils/util')
const app = getApp()
const api = app.globalData.api

Page({
  data: {
    searchUrl: app.globalData.apiUrl +"/auto/query/customer",
    multiArray: [],
    multiIndex: [0, 0],
    showTopTips: false,
    serviceTypeIndex: 0,
    serviceType: null,
    warrantyIndex: 0,
    warranty: null,
    machineIndex: 0,
    machineType: null,
    probeIndex: 0,
    models: null,
    model_id: null,
    probes: null,
    endoscopeIndex: 0,
    endoscope: null,
    rules: [
      { 
        name: 'service_type',
        rules: { required: true, message: '服务类型必填' },
      },
      { 
        name: 'sn',
        rules: { required: true, message: 'SN必填' },
      },
      { 
        name: 'delivery_recipient',
        rules: { required: true, message: '收货人姓名必填' },
      },
      {
        name: 'delivery_address',
        rules: { required: true, message: '收货人地址必填' },
      },
      { 
        name: 'delivery_telephone',
        rules: { required: true, message: '收货人电话必填' },
      },
      { 
        name: 'feedback',
        rules: { required: true, message: '客户申告必填' },
      },
      { 
        name: 'customer_id',
        rules: { required: true, message: '客户尚未选择' },
      },
      { 
        name: 'next',
        rules: { required: true, message: '流程流转尚未选择' },
      },
      ],
    formData: {
      service_type: 1
    },
    installed_at: "2016-01-01",
    radioIndex: 0,
    radioItems: [
      { name: '请选择', value: null },
      { name: '需要TS评估', value: 'TS' },
      { name: '直接到现场处理', value: 'ASSIGN' },
      { name: '坐席已电话解决', value: 'SOLVED' },
    ],
  },
  onLoad: function(options) {
    this.setData({
      serviceType: Object.values(wx.getStorageSync('sys_config').service_type),
      warranty: Object.values(wx.getStorageSync('sys_config').warranty_status),
      machineType: wx.getStorageSync('machine_type')
    })
    this.getAllTsUser()
  },
  /**
   * SN搜索
   */
  snBlur: function(e) {
    var that = this
    let data = {
      sn: e.detail.value,
    }
    that.setData({
      ['formData.sn']: e.detail.value
    })
    api.getSnInfo(data).then(res => {
      if (res.code == 200) {
        let c = res.data.customer
        let tmp = []
        tmp.push(c)
        that.setData({
          snRelateCustomer: tmp,
          ['formData.customer_id']: res.data.customer.id
        })
      }
      if (res.code == 200 && res.data.warranty) {
        that.setData({
          warrantyIndex: parseInt(res.data.warranty.warranty_status - 1),
          ['formData.warranty_status']: res.data.warranty.warranty_status,
          installed_at: res.data.installed_at > 0 ? util.timestampToDayString(res.data.installed_at, 'Y-M-D') : null,
          ['formData.installed_at']: res.data.installed_at > 0 ? util.timestampToDayString(res.data.installed_at, 'Y-M-D') : null
        })
      }
    })
  },
  getAllTsUser() {
    api.getTsUser().then(res => {
      let ts = res.data
      let tmp = {id: 0, nickname: "请选择TS"}
      ts.unshift(tmp)
      this.setData({
        all_user: ts,
        tsIndex: 0
      })
      wx.setStorageSync('all_user', res.data)
    })
  },
  /**
   * 安装日期
   */
  bindDateChange: function(e) {
    this.setData({
      installed_at: e.detail.value,
      [`formData.installed_at`]: e.detail.value
    })
  },
  tsByChange: function(e) {
    console.log(e)
    this.setData({
      ts_by: this.data.all_user[e.detail.value].id,
      tsIndex: e.detail.value,
      [`formData.ts_by`]: this.data.all_user[e.detail.value].id
    })
  },
  /**
   * 输入框监听事件
   */
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  /**
   * 服务类型变更事件
   */
  bindServiceTypeChange: function(e) {
    console.log('picker country 发生选择改变，携带值为', e);
    this.setData({
      ['formData.service_type']: this.data.serviceType[e.detail.value].value,
      serviceTypeIndex: e.detail.value
    })
  },
  /**
   * 机器类型变化事件
   */
  bindMachineTypeChange: function (e) {
    var that = this
    console.log(e)
    that.setData({
      ['formData.machine_type']: this.data.machineType[e.detail.value].id,
      ['formData.machine_type_desc']: this.data.machineType[e.detail.value].name,
      machineIndex: e.detail.value
    })
    let type = that.data.formData.machine_type
    if (that.data.formData.machine_type == 2 ) {
      type = 1
    }
    if (that.data.formData.machine_type == 4 ) {
      type = 3
    }
    api.getModels({ machine_type: type}).then(res => {
      that.setData({
        models: res.data.data
      })
      that.getModels(res.data.data)
    })
  },
  /**
   * 提交表单
   */
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
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
        
        var that = this
        api.addForm(this.data.formData).then(res => {
          if (res.code == 200) {
            that.setData({
              formData: {}
            })
            wx.navigateTo({
              url: '/pages/form/children/msg/msg',
            })
          }
        })
      }
    })
    // this.selectComponent('#form').validateField('mobile', (valid, errors) => {
    //     console.log('valid', valid, errors)
    // })
  },
  //机型选择 初始化&格式化机型数据
  getModels(models) {
    let that = this
    //transform
    let f_models = util.traverse(models)
    //default
    let tmp = {
      label: "请选择",
      value: 0,
      children: [{ label: '请选择', value: 0 }]
    }
    f_models.unshift(tmp)
    let firstListName = f_models.map(m => {
      return m.label
    })
    that.setData({
      multiArray: [firstListName, []],
      f_models,
      firstListName
    })
    let firstListOneId = f_models[0]['value']
    if (firstListOneId) {
      //如果存在，去掉取相应数组下的list
      that.searchClassInfo(firstListOneId)
    }
    that.searchClassInfo(firstListOneId)

  },
  /**
   * 搜索子机型
   */
  searchClassInfo(value) {
    let that = this
    if (value) {
      that.setData({
        firstListOneId: value
      })
    }
    that.data.f_models.map(m => {
      if (m.value == value) {
        that.setData({
          secondList: m.children
        })
      }
    })
    let secondListName = that.data.secondList.map(m => {
      return m.label
    })
    let firstListName = that.data.firstListName
    that.setData({
      multiArray: [firstListName, secondListName],  //这就是一个完整的二级联动展示了
      secondListName,
    })
  },
  bindMultiPickerColumnChange: function (e) {
    let that = this
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value)
    var data = {
      multiArray: that.data.multiArray,
      multiIndex: that.data.multiIndex
    }
    data.multiIndex[e.detail.column] = e.detail.value
    let firstListOneId_session = that.data.firstListOneId
    switch (e.detail.column) {
      case 0:
        let firstList = that.data.f_models
        var firstId = firstList[e.detail.value]['value']
        if (firstListOneId_session != firstId) { //每次滚动的时候都去和上一个做一次对比
          that.searchClassInfo(firstId) // 只要不一样，就去执行上面searchClassInfo()这个方法
        }
        data.multiIndex[1] = 0
        break
    }
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var secondList = this.data.secondList
    var select_key = e.detail.value[1]
    var col_one = e.detail.value[0]
    this.setData({
      ['formData.model_id']: secondList[select_key]['value'], //拿到下标值对应的value值就是我们要用的id
      ['formData.model_id_desc']: secondList[select_key]['label'],
      ['formData.model_id_series_desc']: this.data.f_models[e.detail.value[0]].label,
      ['formData.model_id_marketing_desc']: secondList[select_key]['label']
    })
    this.setData({
      multiIndex: e.detail.value
    })
    //获取探头或者镜体型号
    let that = this
    if (that.data.formData.machine_type == 2) {
      that.getProbe()
    } else if (that.data.formData.machine_type == 4) {
      that.getEndoscope()
    }

  },
  /**
   * 获取机型关联探头列表
   */
  getProbe: function () {
    var that = this
    api.getProbe({ model_id: that.data.formData.model_id }).then(res => {
      that.setData({
        probeIndex: 0,
        probes: res.data.data
      })
    })
  },
  /**
   * 获取机型关联镜体列表
   */
  getEndoscope: function () {
    var that = this
    api.getEndoscope({ model_id: that.data.formData.model_id }).then(res => {
      that.setData({
        endoscope: res.data.data,
        endoscopeIndex: 0
      })
    })
  },
  /**
   * 监听子组件 搜索客户 取得客户详情
   */
  onCustomerChangeEvent: function (e) {
    console.log('son component trigger me!')
    var that = this
    console.log(e)
    that.setData({
      ['formData.customer_id']: e.detail.list.id
    })
  },
  //监听探头选择和镜体选择
  bindProbeChange(e) {
    this.setData({
      probeIndex: e.detail.value,
      ['formData.probe_id']: this.data.probes[e.detail.value].id,
      ['formData.probe_id_desc']: this.data.probes[e.detail.value].name
    })
  },
  bindEndscopeChange(e) {
    this.setData({
      endoscopeIndex: e.detail.value,
      ['formData.endoscope_id']: this.data.endoscope[e.detail.value].id,
      ['formData.endoscope_id_desc']: this.data.endoscope[e.detail.value].name
    })
  },
  //保修类型编号
  warrantyChange(e) {
    console.log(e.detail)
    let status = this.data.warranty[e.detail.value].value
    console.log(this.data.warranty)
    this.setData({
      warrantyIndex: e.detail.value,
      ['formData.warranty_status']: status
    })
  },
  //是否转tS
  radioChange: function (e) {
    let val = this.data.radioItems[e.detail.value].value
    let rules = this.data.rules

    this.setData({
      radioIndex: e.detail.value,
      [`formData.next`]: val
    })
    if (this.data.formData.next == 'TS') {
      let subRule =   { name: 'ts_by',rules: { required: true, message: 'TS尚未选择' }}
      rules.push(subRule)
      this.setData({
        rules: rules
      })
    } else {
      //array del ele
      let ruleList =  rules.filter(lst => lst.name != 'ts_by')
      this.setData({
        rules: ruleList
      })
    }
  },

  openMyAddress: function () {
    wx.chooseAddress({
      success: res => {
        console.log(res)
        let addr = res.provinceName + res.cityName + res.countyName + res.detailInfo
        this.setData({
          ['formData.delivery_recipient']: res.userName,
          ['formData.delivery_telephone']: res.telNumber,
          ['formData.delivery_address']: addr
        })
      }
    })
  },

})