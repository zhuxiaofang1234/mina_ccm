const app = getApp()
const api = app.globalData.api
Page({
    data: {
        inputVal: "",
        loadingShow: false, // loading状态（加载中/无数据）的控制
        loadingStatus: true, // loading组件的显示控制
        totalCount: 0,
        page: 1,
        size: 15,
        hospitalName: "",
        type:'select', //页面类型
    },
    onLoad(options) {
        console.log(options)
       if(options.type){
        this.setData({
            type:options.type  
           })
       }
       if(options.type=='details'){
        wx.setNavigationBarTitle({
            title: '医院信息列表' 
          })
       }else{
        wx.setNavigationBarTitle({
            title: '选择医院' 
          }) 
       }
        this.getHospitalList()
    },

    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    },

    //选择搜索结果
    selectResult: function (e) {
        const {
            id
        } = e.currentTarget.dataset;

        if(this.data.type=='details'){
            wx.navigateTo({
              url: '/pages/queryHospital/details?hospitalid='+id,
            })

        }else{
            let [res] = this.data.hospitalList.filter((item) => {
                return item.id == id
            });
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2]; //上一个页面
            prevPage.setData({
                hospitalName: res.hospitalName,
                hospitalInfo: res,
                [`formData.hospitalId`]: res.id,
                [`formData.hospitalDeptContactName`]: res.contact,
                [`formData.hospitalDeptContactPhone`]: res.contactTel,
            })
            wx.navigateBack({
                delta: 1,
            })
        }
      
    },
    clearInput: function (e) {
        this.setData({
            page: 1,
            inputVal: "",
        });
        setTimeout(() => {
            this.getHospitalList()
        }, 600)
    },

    //点击搜索
    getSerachResult: function () {
        this.setData({
            page: 1
        });
        setTimeout(() => {
            this.getHospitalList()
        }, 600)
    },

    //手机键盘搜索
    search: function (e) {
        this.setData({
            inputVal: e.detail.value,
            page: 1,
        });
        setTimeout(() => {
            this.getHospitalList()
        }, 600)
    },

    //下拉刷新
    onPullDownRefresh: function () {
        var that = this;
        wx.showNavigationBarLoading() //在标题栏中显示加载
        setTimeout(function () {
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            that.setData({
                page: 1,
                inputVal:""
            })
            that.getHospitalList()
        }, 1500);
    },

    onReachBottom: function () {
        console.log('触底')
        if (!this.data.loadingShow) {
            this.setData({
                loadingShow: true,
            })
            if (this.data.page >= this.data.pages) { //不显示加载
                this.setData({
                    loadingStatus: false //显示没有更多数据
                })
            } else {
                this.setData({
                    loadingStatus: true, //显示加载更多
                    page: this.data.page + 1,
                })
                setTimeout(() => {
                    this.getHospitalList(true)
                }, 600)
            }
        }
    },

    //新增医院
  toCreateHospital() {
    wx.navigateTo({
      url: '/pages/createHospital/index?type=add',
    })
  },
  
    //获取列表数据
    getHospitalList: function (append) {
        var that = this;
        var page = this.data.page;
        var size = this.data.size;
        var queryData = {
            'current': page,
            'size': size,
        };
        if (this.data.inputVal.trim()) {
            queryData.hospitalName = this.data.inputVal;
        }
        if (!append) {
            wx.showLoading({
                title: '加载中....',
            })
        }
        api.getHospitalList(queryData).then(res => {
            wx.hideLoading();
            that.setData({
                loadingShow: false
            });
            if (res.code == 0) {
                var resData = res.data;
                var curList = append ? that.data.hospitalList : [];
                that.setData({
                    hospitalList: curList.concat(resData.records),
                    totalCount: resData.total,
                    pages: resData.pages
                });
            }
        });
    },
});