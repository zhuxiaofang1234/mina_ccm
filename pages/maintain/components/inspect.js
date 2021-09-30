// pages/maintain/components/endoscope.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    maintenanceData:{
      type:Object,
      value:{}
    } 
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的初始数据
   */
  data: { 
  },

  lifetimes:{
    ready: function() {
      let maintenanceData = this.data.maintenanceData;
     var endoscopeArr  = [
       {
         title:'整机外观',
         imgList:maintenanceData.emea
       },
       {
        title:'温/湿度',
        imgList:maintenanceData.emth
       },
       {
        title:'市电',
        imgList:maintenanceData.emcp
       },
       {
        title:'零地',
        imgList:maintenanceData.emzg
       },
       {
        title:'洗消间全览',
        imgList:maintenanceData.emfvow
       },
       {
        title:'镜体储存环境',
        imgList:maintenanceData.emlse
       },
       {
        title:'主机点检报告',
        imgList:maintenanceData.emhsir
       },
       {
        title:'软件版本',
        imgList:maintenanceData.emsv
       },
       {
        title:'导光接口',
        imgList:maintenanceData.emli
       },
       {
        title:'消毒液',
        imgList:maintenanceData.emd
       },
       {
        title:'其它',
        imgList:maintenanceData.emoe
       },
     ];
     this.setData({
      endoscopeArr,
      endoscopeJson:maintenanceData.endoscopeJson
     });
    },

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //预览图片
   previewImage(e) {
    const {index,list} = e.currentTarget.dataset;
    const urls = list.map((item)=>{
        return item.url
      })
    wx.previewImage({
      urls: urls,
      current: urls[index]
    })
  },

  }
})
