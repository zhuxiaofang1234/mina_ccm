// 小程序开发api接口工具包
const CONFIG = require("../config")
const app = getApp()
/**
 * 子域名 prefix
 */
var subDomain = ''
/**
 * 封装wx HTTP请求
 */
var request = function request(_url, _data, _method, needSubDomain = false) {
  var url = CONFIG.domain + (needSubDomain ? '/' + subDomain : '') + _url;
  let token = wx.getStorageSync('token');
  let _header = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      method: _method,
      data: _data,
      header: _header,
      success: function success(request) {
        resolve(request.data)
      },
      fail: function fail(e) {
        if (e.errMsg === "request:fail timeout") {
          wx.showToast({
            icon: "none",
            title: "网络连接超时,请稍后重试"
          })
        }
        reject(e)
      }    
    })
  })
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function(callback) {
  var Promise = this.constructor;
  return this.then(function(value) {
    Promise.resolve(callback()).then(function() {
      return value;
    });
  }, function(reason) {
    Promise.resolve(callback()).then(function() {
      throw reason;
    })
  })
}

// loading加载提示
const showLoading = () => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中...',
      mask: true,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

// 关闭loading
const hideLoading = () => {
  return new Promise((resolve) => {
    wx.hideLoading()
    resolve()
  })
}

module.exports = {
  init2: function init2(a, b) {
    API_BASE_URL = a
    subDomain = b
  },
  init: function init(b) {
    subDomain = b
  },
  request: request,
  showLoading,
  hideLoading,
  //check token
  checkToken: function checkToken(token) {
    return request('/user/check-token', {
      token: token
    }, 'POST');
  },
  /**
   * 常规单列表
   */
  form_list: function form_list() {
    return request('/form/list', null, 'GET')
  },
  /**
   * 我的表单
   */
  myFormlist: function form_list() {
    return request('/form/my/list', null, 'GET')
  },

  /**
   * 常规单查看
   */
  formView: function formView(id) {
    return request('/form/view', {
      id: id
    }, 'GET')
  },
  /**
   * 配件返回列表
   */
  returnList: function returnList() {
    return request('/accessory/return/list', null, 'GET')
  },
  /**
   * 配件返回操作
   */
  accessoryReturn: function accessoryReturn(data) {
    return request('/accessory/operation/return', data, "POST")
  },
  /**
   * 内部单列表
   */
  internalFormList: function internalFormList() {
    return request('/internal/form/list', null, 'GET')
  },
  /**
   * 常规单待TS处理列表
   */
  formTsList: function formTsList() {
    return request('/form/ts/list', null, 'GET')
  },
  /**
   * 通用表单列表 url必选参数
   */
  formList: function(url) {
    return request(url, null, 'GET')
  },
  /**
   * 表单状态更新通用方法 url和data为必填参数
   */
  updateForm: function updateForm(url, data) {
    return request(url, data, 'POST')
  },
  /**
   * openid和后端api绑定
   */
  register: function register(data) {
    return request('/wechat/register', data, 'POST')
  },
  /**
   * 个人页面 拉去api的用户详情
   * 如果用户已经注册（绑定openid）则直接获取token
   * 如果用户未绑定 则 弹框提示用户绑定
   */
  getUserDetail: function getUserDetail(code) {
    return request('/wechat/userDetail', code, 'POST')
  },
  getSnInfo: function getSnInfo(sn) {
    return request('/auto/installation', sn, 'GET')
  },
  /**
   * 获取机器类型
   */
  getMachineType: function getMachineType() {
    return request('/get/machine_type', null, 'GET')
  },
  /**
   * 根据机器类型获取机器型号 get/models?machine_type=1 default
   */
  getModels: function getModel(machine_type) {
    return request('/get/models', machine_type, 'GET')
  },
  getProbe: function getProbe(model_id) {
    return request('/get/probes', model_id, 'GET')
  },
  getEndoscope: function getEndoscope(model_id) {
    return request('/get/endoscope', model_id, 'GET')
  },
  getSysConfig: function getSysConfig() {
    return request('/system/config?target=form', null, 'GET')
  },
  getUserInfo: function getUserInfo(code) {
    return request('/wechat/userinfo', code, 'POST')
  },
  //用戶 system/select?target=user
  getUser: function getUser() {
    return request('/system/select?target=user', null, 'GET')
  },
  getTsUser: function getTsUser() {
    return request('/system/select?target=tsUser', null, 'GET')
  },
  // /form/add
  addForm: function addForm(data) {
    return request('/form/add', data, 'POST')
  },
  // /get/faulty?parent_id=1
  getFaultyById: function getFaultyById(data) {
    return request('/get/faulty', data, 'GET')
  },
  //后续处理 form/operation/extra/treat
  extraTreatForm: function getFaultyById(data) {
    return request('/form/operation/extra/treat', data, 'POST')
  },
  //回访
  visitForm: function visitForm(data) {
    return request('/form/operation/visit', data, 'POST')
  },
  //ts评分 markForm
  markForm: function markForm(data) {
    return request('/form/operation/ts/mark', data, 'POST')
  },
  //ts处理 form/operation/ts/process
  tsProcess: function tsProcess(data) {
    return request('/form/operation/ts/process', data, 'POST')
  },
  //申请配件 partApply
  partApply: function tsProcess(data) {
    return request('/form/operation/part/apply', data, 'POST')
  },
  //获取附件列表 form/attachment/list?form_id=3225
  formattachment: function formattachment(data) {
    return request('/form/attachment/list', data, 'GET')
  },
  // upload images /form/attachment/add
  addFileToForm: function addFileToForm(data) {
    return request('/form/attachment/add', data, 'POST')
  },

  //获取选择的医院
  getHospitalList:function (data){
    return request('/h/data/syshospital/page', data, 'GET')
  },
  //新增维修信息
  addServiceInfo:function(data){
    return request('/h/data/servicedetail/add/servicedetail', data, 'POST') 
  },
  //新增装机信息
  stockinstall:function(data){
    return request('/h/data/servicestockinstallrecord/add/stockinstall', data, 'POST') 
  },
  //设备保养信息
  maintenance:function(data){
    return request('/h/data/maintenancedetail/add/maintenance',data,'POST')
  },
  //查看维修-历史记录
  getHistoryList:function(url,data){
    return request(url, data, 'GET')
  },
  //获取国家
  GetCountry:()=>{
    return request('/h/data/yxareatable/allData?yatLevel=2','GET');
  },
  GetProvince: (Id) => { //获取中国地区省份
    return request('/h/data/yxareatable/allData?yatParentId='+Id, 'GET');
  },
  GetCity: (Id) => { //获取城市
    return request('/h/data/yxareatable/allData?yatParentId=' + Id, 'GET');
  },
  //根据yatId获取地区信息
  getArea:(Id)=>{
    return request('/h/data/yxareatable/allData?yatId=' + Id, 'GET');
  },

  //通过设备sn查询信息
  getEquipmentBySn(data){
    return request('/h/data/equipment/page', data, 'GET')
  },
  //通过sn查询中控装机数据
  getInstallEquipmentBySn(data){
    return request('/h/data/servicestockinstallrecord/page', data, 'GET')
  },

  //通过销售订单号和物料编码查询数据
  getBarCodeInfo(data){
    return request('/h/data/servicestockinstallrecord/getBarCodeInfo', data, 'GET')
  },

   //通过设备sn查询维修数据
   getServicedetailBySn(data){
    return request('/h/data/servicedetail/page', data, 'GET')
  },
  //获取配置文件申请记录
  getConfigFileList(data){
    return request('/h/data/equipment/configFile/page', data, 'GET') 
  },

  //通过recordId获取配置详情信息
  getconfigFileDetail(recordeId){
    return request('/h/data/equipment/configFileDetail?recordeId='+recordeId, 'GET');
  },

  //根据sn查装箱清单
  getPackageChecklist:function(sn){
    return request('/h/data/equipment/packageChecklist?sn='+sn, 'POST') 
  },

  //根据sn查询历史维修记录
  getRepairInfo(sn){
    return request('/get/form/sn?sn='+sn, 'GET')  
  },

  //添加医院
  addHospitalInfo:function(data){
    return request('/h/data/syshospital/addHospitalInfo', data, 'POST') 
  },
  //修改医院
  updateHospitalInfo:function(data){
    return request('/h/data/syshospital/updateHospitalInfo', data, 'PUT') 
  },
  //查询医院信息
  getHospitalInfo:function(id){
    return request('/h/data/syshospital/getByHospitalIdToHtml/'+id, 'GET');
  },
  //装机判断sn的唯一性
  getRepeatSn(data){
    return request('/h/data/servicestockinstallrecord/getRepeatSn', data, 'POST') 
  }
}