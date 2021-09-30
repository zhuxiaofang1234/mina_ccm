// pages/maintain/components/endoscope.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    maintenanceData: {
      type: Object,
      value: {}
    }
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的初始数据
   */
  data: {},

  lifetimes: {
    ready: function () {
      let maintenanceData = this.data.maintenanceData;
  
      let  productLine = maintenanceData.firstPageData.productLine;
      console.log(productLine);
      
      let ultrasonicMaintainData = [
          {
            title:'运行环境检查',
            dataArr: [{
              title: '整机外观',
              imgList: maintenanceData.hmdo
            },
            {
              title: '温/湿度',
              imgList: maintenanceData.hmth
            },
            {
              title: '市电',
              imgList: maintenanceData.hmcp
            },
            {
              title: '零地',
              imgList: maintenanceData.hmzg
            },
            {
              title: '现场5S',
              imgList: maintenanceData.hml5
            },
            {
              title: '其它',
              imgList: maintenanceData.hmoe
            },
          ]
          },
          {
            title:'设备性能检查',
            dataArr:[{
              title: '硬件自检',
              imgList: maintenanceData.hmhsi
            },
            {
              title: '探头始波',
              imgList: maintenanceData.hmbpw
            },
            {
              title: '键盘测试',
              imgList: maintenanceData.hmkt
            },
            {
              title: '存储空间',
              imgList: maintenanceData.hmss
            },
            {
              title: '日志导出',
              imgList: maintenanceData.hmle
            },
            {
              title: '其它',
              imgList: maintenanceData.hmop
            },
          ]},
          {
            title:'设备保养记录',
            dataArr:[{
              title: '屏幕清洁',
              imgList: maintenanceData.hmcts
            },
            {
              title: '键盘面板',
              imgList: maintenanceData.hmkp
            },
            {
              title: '轨迹球',
              imgList: maintenanceData.hmt
            },
            {
              title: '探头线缆',
              imgList: maintenanceData.hmtpc
            },
            {
              title: '防尘网',
              imgList: maintenanceData.hmds
            },
            {
              title: '面板膜',
              imgList: maintenanceData.hmpm
            },
          ]}, 
          {
            title:'保养效果确认',
            dataArr:[{
              title: '设备外观',
              imgList: maintenanceData.hmea
            },
            {
              title: '键盘面板',
              imgList: maintenanceData.hmkpa
            },
            {
              title: '探头线缆',
              imgList: maintenanceData.hmtpca
            },
            {
              title: '现场5S',
              imgList: maintenanceData.hml5a
            },
            {
              title: '其它',
              imgList: maintenanceData.hmoa
            }
          ]}
      ];

      let inspectMaintainData = [
        {
          title:'运行环境检查',
          dataArr: [{
            title: '科室全览',
            imgList: maintenanceData.cmdo
          },
          {
            title: '温/湿度',
            imgList: maintenanceData.cmth
          },
          {
            title: '市电',
            imgList: maintenanceData.cmcp
          },
          {
            title: '零地',
            imgList: maintenanceData.cmzg
          },
          {
            title: 'HGB本底电压',
            imgList: maintenanceData.cmhteotv
          },
          {
            title: '光学本底电压',
            imgList: maintenanceData.cmoteotv
          },
          {
            title: '现场5S',
            imgList: maintenanceData.cml5
          },
          {
            title: '其它',
            imgList: maintenanceData.cmoe
          },
        ]
        },
        {
          title:'设备性能检查',
          dataArr:[{
            title: '本底',
            imgList: maintenanceData.cmp
          },
          {
            title: '重复性',
            imgList: maintenanceData.cmr
          },
          {
            title: '可比性',
            imgList: maintenanceData.cmc
          },
          {
            title: '质控&校准',
            imgList: maintenanceData.cmqcc
          },
          {
            title: '散点图',
            imgList: maintenanceData.cmsd
          },
          {
            title: '日志导出',
            imgList: maintenanceData.cmel
          },
          {
            title: '其它',
            imgList: maintenanceData.cmop
          },
        ]},
        {
          title:'设备保养记录',
          dataArr:[{
            title: '整机除尘',
            imgList: maintenanceData.cmtwmdr
          },
          {
            title: '计数池&CRP池',
            imgList: maintenanceData.cmcpcp
          },
          {
            title: '采样针&拭子',
            imgList: maintenanceData.cmsns
          },
          {
            title: '泵体',
            imgList: maintenanceData.cmbop
          },
          {
            title: '光学1',
            imgList: maintenanceData.cmoo
          },
          {
            title: '液管&缓冲瓶',
            imgList: maintenanceData.cmltbb
          },
          {
            title: '光学2 ',
            imgList: maintenanceData.cmot
          },
          {
            title: '其它',
            imgList: maintenanceData.cmor
          },
        ]}, 
        {
          title:'保养效果确认',
          dataArr:[{
            title: '设备外观',
            imgList: maintenanceData.cmeaa
          },
          {
            title: '计数池&CRP池',
            imgList: maintenanceData.cmcpcpa
          },
          {
            title: '采样针&拭子',
            imgList: maintenanceData.cmsnsa
          },
          {
            title: '泵体',
            imgList: maintenanceData.cmbopa
          },
          {
            title: '内部液路照片',
            imgList: maintenanceData.cmpoifpa
          },
          {
            title: '正常计数结果',
            imgList: maintenanceData.cmntra
          },
          {
            title: '版本信息',
            imgList: maintenanceData.cmvia
          },
          {
            title: '其它',
            imgList: maintenanceData.cmoa
          }    
        ]}
    ];

       if(productLine==1){
          this.setData({
            maintainData:ultrasonicMaintainData
          });
       }else if(productLine==3){
        this.setData({
          maintainData:inspectMaintainData
        });
       }
     
    },

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //预览图片
    previewImage(e) {
      const {
        index,
        list
      } = e.currentTarget.dataset;
      const urls = list.map((item) => {
        return item.url
      })
      wx.previewImage({
        urls: urls,
        current: urls[index]
      })
    },

  }
})