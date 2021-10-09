Component({
  /**
   * 组件的属性列表
   */
  properties: {
    repairData: {
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
      let repairData = this.data.repairData;
      let deviceType = repairData.firstPageData.deviceType;
      let faultDesc = repairData.faultDesc;
      this.setData({
        faultDesc: faultDesc
      })

      let ultrasonicRepairData = [{
          title: '维修环境检查',
          dataArr: [{
              title: '科室全览',
              imgList: repairData.hsdo
            },
            {
              title: '温/湿度',
              imgList: repairData.hsth
            },
            {
              title: '市电',
              imgList: repairData.hscp
            },
            {
              title: '零地',
              imgList: repairData.hszg
            },
            {
              title: '现场5S',
              imgList: repairData.hsl5
            },
            {
              title: '二维码粘贴',
              imgList: repairData.hsQR
            },
            {
              title: '其它',
              imgList: repairData.hsoe
            },
          ]
        },
        {
          title: '故障确认',
          dataArr: [{
              title: '5V/12V电压',
              imgList: repairData.hs512v
            },
            {
              title: '系统信息界面',
              imgList: repairData.hssii
            },
            {
              title: '故障/视频照片',
              imgList: repairData.hsfvp
            },
          ]
        },
        {
          title: '维修过程记录',
          dataArr: [{
              title: '拆机图片',
              imgList: repairData.hstp
            },
            {
              title: '故障板图片',
              imgList: repairData.hsfbp
            }
          ]
        },
        {
          title: '维修效果确认',
          dataArr: [{
              title: '硬件自检',
              imgList: repairData.hshsi
            },
            {
              title: '键盘测试',
              imgList: repairData.hskt
            },
            {
              title: '存储空间',
              imgList: repairData.hsss
            },
            {
              title: '日志导出',
              imgList: repairData.hsle
            },
            {
              title: '设备开机工作图',
              imgList: repairData.hsswdote
            },
            {
              title: '二维码粘贴',
              imgList: repairData.hmQR
            },
            {
              title: '探头始波',
              imgList: repairData.hsbpw
            }
          ]
        }
      ];

      let endoscopeRepairData = [{
          title: '维修环境检查',
          dataArr: [{
              title: '科室全览',
              imgList: repairData.esdo
            },
            {
              title: '温/湿度',
              imgList: repairData.esth
            },
            {
              title: '市电',
              imgList: repairData.escp
            },
            {
              title: '零地',
              imgList: repairData.eszg
            },
            {
              title: '现场5S',
              imgList: repairData.esl5
            },
            {
              title: '二维码粘贴',
              imgList: repairData.esQR
            },
            {
              title: '其它',
              imgList: repairData.esoe
            },
          ]
        },
        {
          title: '故障确认',
          dataArr: [{
              title: '故障视频/照片',
              imgList: repairData.esfvp
            },
            {
              title: '其它',
              imgList: repairData.esoma
            }
          ]
        },
        {
          title: '维修过程记录',
          dataArr: [{
              title: '拆机图片',
              imgList: repairData.estp
            },
            {
              title: '故障件图片',
              imgList: repairData.esfp
            },
            {
              title: '其它',
              imgList: repairData.esop
            }
          ]
        },
        {
          title: '维修效果确认',
          dataArr: [{
              title: '软件版本',
              imgList: repairData.essv
            },
            {
              title: '镜体信息',
              imgList: repairData.estlbi
            },
            {
              title: '设备开机工作图',
              imgList: repairData.esswdote
            },
            {
              title: '日志导出',
              imgList: repairData.esle
            },
            {
              title: '镜体图像',
              imgList: repairData.eslbi
            },
            {
              title: '其它',
              imgList: repairData.eseo
            }
          ]
        }
      ];


      let inspectRepairData = [{
        title: '维修环境检查',
        dataArr: [{
            title: '科室全览',
            imgList: repairData.csdo
          },
          {
            title: '温/湿度',
            imgList: repairData.csth
          },
          {
            title: '本底电压',
            imgList: repairData.csteotv
          },
          {
            title: '零地',
            imgList: repairData.cszg
          },
          {
            title: '配套使用试剂照片',
            imgList: repairData.csmtuorp
          },
          {
            title: '现场5S',
            imgList: repairData.csl5
          },
          {
            title: '二维码粘贴',
            imgList: repairData.csQR
          },
          {
            title: '其它',
            imgList: repairData.csoe
          },
        ]
      },
      {
        title: '故障确认',
        dataArr: [{
            title: '故障照片',
            imgList: repairData.csvpofp
          },
          {
            title: '故障日志',
            imgList: repairData.csfl
          },
          {
            title: '仪器版本信息界面',
            imgList: repairData.csivii
          }
        ]
      },
      {
        title: '维修过程记录',
        dataArr: [{
            title: '处理故障部件图片',
            imgList: repairData.csppofp
          },
          {
            title: '仪器温度、压力状态界面',
            imgList: repairData.csitapsi
          },
          {
            title: '自动维护设置界面',
            imgList: repairData.csamsi
          }
        ]
      },
      {
        title: '维修效果确认',
        dataArr: [{
            title: '本底测试结果界面',
            imgList: repairData.csbtr
          },
          {
            title: '重复性数据界面',
            imgList: repairData.csrdi
          },
          {
            title: '质控测试结果界面',
            imgList: repairData.csqctri
          },
          {
            title: '散点图原始数据界面',
            imgList: repairData.cssdrdi
          },
          {
            title: '校准系数界面',
            imgList: repairData.cscci
          },
          {
            title: '正常测试结果报告界面',
            imgList: repairData.csntrri
          },
          {
            title: '正常测试结果报告界面',
            imgList: repairData.csle
          },
        ]
      }
    ];

      if (deviceType == 1) {
        this.setData({
          maintainData: ultrasonicRepairData
        });
      } else if (deviceType == 2) {
        this.setData({
          maintainData: endoscopeRepairData
        });
      }else if(deviceType==3){
        this.setData({
          maintainData: inspectRepairData
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