// pages/createHospital/index.js
const app = getApp()
const api = app.globalData.api
const util = app.globalData.util
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['基本信息', '详情信息'],
    showTopTips: false,
    isShow: false,
    isShowLevel: false, //显示医院等级弹框
    isShowTag: false, //显示开立标签
    addressLoading:false,//显示地址加载
    sn: [],
    sonoTagName: '请选择开立标签',
    sonoTagList: [{
      value: 1,
      selected: false,
      title: '市场窗口'
    }, {
      value: 2,
      selected: false,
      title: '超声主委'
    }, {
      value: 3,
      selected: false,
      title: '内镜主委'
    }, {
      value: 4,
      selected: false,
      title: '研发合作'
    }, {
      value: 5,
      selected: false,
      title: '立影行动'
    }],
    hospitalLevelText: '请选择医院等级',
    hospitalLevel1: ['一级', '二级', '三级', '未定级'],
    hospitalLevel2: ['', '甲等', '乙等', '丙等', ],
    level: [0, 0],
    contactTitle: ['主任', '科员', '其他领导'],
    natureItems: [{
        name: '公立',
        value: 1,
        checked: 'true'
      },
      {
        name: '私立',
        value: 2
      }
    ],
    sonoTagName: '',
    activeIndex: 0,
    countryIndex: '',
    installedDepartment: '请选择科室',
    snItem: "",
    formData: {
      hospitalName: '',
      encoded: '', //医院编号
      hospitalAddress: "", //医院地址
      nature:1
    },
    rules1: [{
        name: 'hospitalName',
        rules: {
          required: true,
          message: '医院名称是必填项'
        },
      },
      {
        name: 'hospitalAddress',
        rules: {
          required: true,
          message: '医院地址是必填项'
        },
      }
    ],
    rules2: [{
        name: 'installedDepartment',
        rules: {
          required: true,
          message: '医院科室是必选项'
        },
      },
      {
        name: 'hospitalContactPerson',
        rules: {
          required: true,
          message: '医院科室联系人是必填项'
        },
      },
      {
        name: 'contactNumber',
        rules: [{
          required: true,
          message: '科室联系电话必填'
        }]
      }
    ],
    rules3: [

    ],
    contactData: {
      contactPosition: ''
    },
    contactJson: [],
    value: [0, 0],
    positionArr: ['主任', '科员', '其他领导'],
    positionIndex: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.type == 'edit') {
      wx.setNavigationBarTitle({
        title: '医院编辑'
      })
      var hospitalId = options.hospitalId;
      if (hospitalId) {
        this.getHospitalInfo(hospitalId);
        this.setData({
          hospitalId 
        })
      }
    } else if (options.type == 'add') {
      wx.setNavigationBarTitle({
        title: '医院录入'
      })

    }
    this.setData({
      type: options.type
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.tabBar = this.selectComponent('#tabBar');
    this.address = this.selectComponent('#address');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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

  //医院属性
  radioChange: function (e) {
    this.EchoNature(e.detail.value)
  },

  //回显医院属性
  EchoNature(nature) {
    var natureItems = this.data.natureItems;
    for (var i = 0, len = natureItems.length; i < len; ++i) {
      natureItems[i].checked = natureItems[i].value == nature;
    }
    this.setData({
      natureItems: natureItems,
      [`formData.nature`]: parseInt(nature)
    });
  },


  //医院基本信息
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    });
  },

  choseTab(e) {
    console.log(e)
  },

  //选择医院等级
  bindhospitalLevel(e) {
    let data = e.detail.value;
    this.setData({
      level: data
    })

  },

  //获取医院等级
  getHospitalLevel() {
    let level = this.data.level;
    let level1 = level[0] + 1;
    let level2 = parseInt(level1.toString() + level[1].toString());
    let hospitalLevel;
    if (level[1] != 0) {
      hospitalLevel = [level1, level2]
    } else {
      hospitalLevel = [level1]
    }
    this.setData({
      hospitalLevelText: this.data.hospitalLevel1[level[0]] + ' ' + this.data.hospitalLevel2[level[1]],
      [`formData.hospitalLevel`]: hospitalLevel
    })

  },

  //选择地址
  toSelectAddress(e) {
    this.setData({
      isShowAddress: true
    })
  },

  //选择医院等级
  toSelectLevel(e) {
    this.setData({
      isShowLevel: true
    })
  },

  //选择开立标签
  toSelectTag() {
    this.setData({
      isShowTag: true
    })
  },

  //选择开立标签
  choseItems(e) {
    this.setData({
      sonoTag: e.detail
    })
  },
  //选择医院科室
  toHospitalDept() {
    wx.navigateTo({
      url: '/pages/selectDepart/index?type=contact',
    })
  },

  /**选择联系人职位**/
  bindPositionChange(e) {
    let contactPosition = this.data.positionArr[e.detail.value]
    this.setData({
      [`contactData.contactPosition`]: contactPosition
    });
  },

  //获取联系人信息
  formInputChange2(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`contactData.${field}`]: e.detail.value
    });
  },

  //提交联系人
  submitContact() {
    this.selectComponent('#form2').validate((valid, errors) => {
      console.log('valid', valid, errors);
      console.log(this.data.contactData)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {

        this.data.contactJson.push(this.data.contactData);
        this.setData({
          contactJson: this.data.contactJson,
          contactData: {},
          positionIndex: '',

        })
      }
    })
  },

  //删除联系人
  delContact(e) {
    const {
      index
    } = e.target.dataset;
    this.data.contactJson.splice(index, 1);
    this.setData({
      contactJson: this.data.contactJson
    })
  },

  //取消地址弹框
  cancel(e) {
    const {
      type
    } = e.target.dataset;
    switch (type) {
      case 'tag':
        this.setData({
          isShowTag: false
        });
        break;
      case 'level':
        this.setData({
          isShowLevel: false
        });
        break;
      case 'address':
        this.setData({
          isShowAddress: false
        });
        break;
    };
  },
  //确定
  sure(e) {
    const {
      type
    } = e.target.dataset;
    switch (type) {
      case 'tag':
        this.setData({
          [`formData.sonoTag`]: this.data.sonoTag
        });
        this.showChoseSonoTag(this.data.sonoTag)
        this.setData({
          isShowTag: false,
        });

        break;
      case 'level':
        this.getHospitalLevel();
        this.setData({
          isShowLevel: false
        });
        break;
      case 'address':
        let address = this.getAddress();
        this.setData({
          [`formData.hospitalAddress`]: address
        });
        this.setData({
          isShowAddress: false
        });
        break;
    };
  },

  showChoseSonoTag(sonoTag) {
    let chooseSonoTag = [];
    this.data.sonoTagList.forEach((item, key) => {
      if (sonoTag.indexOf(item.value) !== -1) {
        chooseSonoTag.push(item);
      }
    })
    this.setData({
      chooseSonoTag: chooseSonoTag
    });
  },

  //去详情页面
  goDetails(e) {
    this.selectComponent('#form1').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        if (this.data.contactJson.length !== 0) {
          this.tabBar.setActiveIndex(1);
        } else {
          this.setData({
            error: '请至少填写一个联系人',
          })
        }
      }
    })
  },
  getContact(e) {
    console.log(e)
  },

  //提交审核
  submitVerify() {
    this.selectComponent('#form1').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
          this.tabBar.setActiveIndex(0);
          return
        }
      } else {
        this.selectComponent('#form3').validate((valid, errors) => {
          console.log('valid', valid, errors);
          if (!valid) {
            const firstError = Object.keys(errors)
            if (firstError.length) {
              this.setData({
                error: errors[firstError[0]].message
              })
            }
          } else if (this.data.contactJson.length == 0) {
            this.setData({
              error: '请至少填写一个联系人'
            })
            this.tabBar.setActiveIndex(0);
            return false
          } else {
            this.data.formData.contactJson = this.data.contactJson;
            this.data.formData.infoSources = 6;
            this.postHospitalInfo(this.data.formData);
          }
        })
      }
    })


  },

  //获取医院地址
  getAddress() {
    let [countryIndex, proIndex, cityIndex] = this.address.data.region;
    let {
      countryData,
      provinceData,
      cityData
    } = this.address.data;

    let countryName = '',
      provinceName = '',
      cityName = '',
      country, province, city;
    if (countryData.length !== 0) {
      countryName = countryData[countryIndex].yatCnname;
      country = countryData[countryIndex].yatId;
    }
    if (provinceData.length !== 0) {
      provinceName = provinceData[proIndex].yatCnname;
      province = provinceData[proIndex].yatId;
    }
    if (cityData.length !== 0) {
      cityName = cityData[cityIndex].yatCnname;
      city = cityData[cityIndex].yatId
    };

    this.setData({
      [`formData.country`]: country,
      [`formData.provinces`]: province,
      [`formData.city`]: city,
      city
    })
    return countryName + ' ' + provinceName + ' ' + cityName;
  },

  //提交医院信息
  postHospitalInfo(data) {
    var that = this;
    wx.showLoading({
      title: '提交中...',
    });
    var request;
    if (this.data.type == 'add') {
      request = this.addHospital(data)
    } else if (this.data.type == 'edit') {
      request = this.updateHospital(data)
    }
    request.then(res => {
      wx.hideLoading();
      if (res.code == 0) {
        wx.showModal({
          title: '提示',
          content: '提交成功',
          showCancel: false,
          confirmColor: '#009fab',
          success: function (res) {
            if (that.data.type == 'edit') {
              //获取页面栈
              let pages = getCurrentPages();
              //获取所需页面
              let prevPage = pages[pages.length - 2]; //上一页
               prevPage.getHospitalInfo(that.data.hospitalId)
               wx.navigateBack({//返回
                delta: 1
              }) 
            }else{
              wx.navigateBack({//返回
                delta: 1
              }) 

            }
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '提交失败，请重试',
          showCancel: false,
          confirmColor: '#009fab'
        })
      }
    }, err => {
      wx.showModal({
        title: '提示',
        content: '提交失败，请重试',
        showCancel: false,
        confirmColor: '#009fab'
      })
    })
  },
  //新增医院
  addHospital(data) {
    return api.addHospitalInfo(data);
  },

  //修改医院
  updateHospital(data) {
    return api.updateHospitalInfo(data);
  },

  //获取医院详情信息
  getHospitalInfo(id) {
    var that = this;
    api.getHospitalInfo(id).then(res => {
      console.log(res)
      if (res.code == 0) {
        console.log(res.data);
        this.setData({
          formData: res.data,
          contactJson: res.data.contactJson ? res.data.contactJson : []
        });
        if (res.data.sonoTag) {
          that.EchoSonoTag(res.data.sonoTag);
        }
        if (res.data.hospitalLevel) {
          that.EchoSonoHospitalLevel(res.data.hospitalLevel);
        }
        if (res.data.nature) {
          that.EchoNature(res.data.nature);
        }
        that.EchoHospitalAddress(res.data.country, res.data.provinces, res.data.city);
      }
    })
  },

  //回显开立标签
  EchoSonoTag(sonoTag) {
    console.log(sonoTag);
    if (sonoTag) {
      var sonoTag = sonoTag.split(';');
      sonoTag = sonoTag.filter(item => {
        return item
      }).map(item => parseInt(item));
      this.showChoseSonoTag(sonoTag)
    }
    this.data.sonoTagList.forEach(item => {
      if (sonoTag.indexOf(item.value) !== -1) {
        item.selected = true
      }
    })
    this.setData({
      sonoTagList: this.data.sonoTagList,
      sonoTag: sonoTag,
      [`formData.sonoTag`]: sonoTag
    })
  },

  //回显医院等级
  EchoSonoHospitalLevel(hospitalLevel) {
    var hospitalLevel1 = this.data.hospitalLevel1,
      hospitalLevel2 = this.data.hospitalLevel2;
    var level = '';
    if (hospitalLevel) {
      var statuslist = hospitalLevel.split('/');
      var statuslist = statuslist.filter(item => {
        return item
      }).map(item => parseInt(item));

      var levelData = [];
      var index1 = (statuslist[0] - 1);
      if (statuslist[1]) {

        var index2 = (statuslist[1] % 10);
        levelData[0] = index1;
        levelData[1] = index2;
        level = hospitalLevel1[index1] + '/' + hospitalLevel2[index2]
      } else {
        levelData[0] = index1;
        level = hospitalLevel1[index1]
      }
    }
    this.setData({
      hospitalLevelText: level,
      [`formData.hospitalLevel`]: statuslist,
      level: levelData
    })
  },
  showAddressLoading(e){
    this.setData({
      addressLoading:e.detail
    })
  },

  //回显医院地址
  EchoHospitalAddress(country, province, city) {
    var that = this;
      let r1 = api.getArea(country);
      let r2 = api.getArea(province);
      var r3 = api.getArea(city);
      Promise.all([r1, r2, r3]).then((result) => {
        console.log(result);
        var countryName, provinceName, cityName;
        if (result[0].code == 0) {
          countryName = result[0].data[0].yatCnname;
        } else {
          countryName = ""
        }
        if (result[1].code == 0) {
          provinceName = result[1].data[0].yatCnname;
        } else {
          provinceName = ""
        }
        if (result[2].code == 0) {
          cityName = result[2].data[0].yatCnname;
        } else {
          cityName = ""
        }
        var hospitalAddress = countryName + ' ' + provinceName + ' ' + cityName;
        that.setData({
          [`formData.hospitalAddress`]: hospitalAddress
        })

      }).catch((error) => {
        console.log(error)
      })

  }
})