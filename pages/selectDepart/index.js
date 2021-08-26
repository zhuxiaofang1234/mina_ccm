import departList from '../../utils/hospitalDepart.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    zimu_list: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    departList: [],
    scroll: '', //滚动到指定 id值的子元素
    touchmove: 0, //给字母导航添加背景色 1 添加 0不添加
    nav_height: '', //字母导航单个元素高度
    hiddenn: true, //hint_box 提示框 展示隐藏
    nav_text: '', //hint_box 提示框里面的文本
  },
  onLoad: function (options) {
    console.log(options);
    const {type} = options;

    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        that.setData({
          windowHeight: res.windowHeight,
          indexTop: res.windowHeight / 2 - 260
        });
      }
    })
    this.setData({
      departList: departList,
      type:type
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.get_height();
  },
  //取高度
  get_height: function () {
    var that = this
    var query = wx.createSelectorQuery();
    query.select('#nav_item').boundingClientRect();
    query.exec(function (res) {
      that.setData({
        nav_height: res[0].height,
      })
    })
  },
  touchstart: function (e) {
    const {
      id
    } = e.target.dataset;
    this.setData({
      scroll: id,
      startPageY: e.touches[0].pageY,
      hidden: true,
      nav_text: id
    })
  },
  touchmove: function (e) {
    const {
      id
    } = e.target.dataset;
    let y = this.getArrIndex(id);
    let indexY = e.touches[0].pageY;
    let nav_height = 20;
    let letter = this.getArrEnglish(Math.round((indexY - this.data.startPageY) / nav_height), y);
    //获取对应的字母
    if (letter) {
      this.setData({
        scroll: letter,
        nav_text: letter
      })
    }
  },
  touchend: function () {
    this.setData({
      touchmove: 0,
      hidden: false
    })
  },

  //获取touchstart字母数组角标
  getArrIndex(english) {
    for (var x = 0; x < this.data.zimu_list.length; x++) {
      if (english == this.data.zimu_list[x]) {
        return x;
      }
    }
  },
  //num 移动了多少位 index 当前字母,返回当前触摸位置节点的字母
  getArrEnglish(num, index) {
    var english = this.data.zimu_list[index + num];
    if (!(1 > num + index > 26)) {
      return english;
    } else {
      return 'C';
    }
  },
  //选择部门
  toSelectDepart(e) {
    let hospitalDept = e.target.dataset.name;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.setData({
      hospitalDept: hospitalDept,
      [`formData.hospitalDept`]: hospitalDept
    });
    if(this.data.type=='contact'){
      prevPage.setData({
        installedDepartment: hospitalDept,
        [`contactData.installedDepartment`]: hospitalDept
      });
    }
    
    wx.navigateBack({
      delta: 1,
    })
  }
})