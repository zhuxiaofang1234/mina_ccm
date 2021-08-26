const app = getApp()
const api = app.globalData.api
Page({
    data: {
        showTopTips: false,
        hospitalName: '请选择医院',
        deviceTypeItems: [{
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
        formData: {
            deviceType: 2,
            warrantyStatus: 1,
        },
        rules: [{
                name: 'taskNo',
                rules: {
                    required: true,
                    message: '任务单号必填'
                },
            }, {
                name: 'deviceType',
                rules: {
                    required: true,
                    message: '设备类型是必选项'
                },
            },
            {
                name: 'warrantyStatus',
                rules: {
                    required: true,
                    message: '保修状态是必选项'
                },
            }, {
                name: 'sn',
                rules: {
                    required: true,
                    message: '设备SN是必填的'
                },
            }, {
                name: 'hospitalId',
                rules: {
                    required: true,
                    message: '医院是必选项'
                },
            }
        ],
    },

    onLoad: function () {
        //从缓存里读取显示信息
        var repairData = wx.getStorageSync('repairData') ? wx.getStorageSync('repairData') : {};
        var formData = repairData.firstPageData ? repairData.firstPageData : this.data.formData;
        this.setData({
            formData: formData
        });
        this.showData(repairData.firstPageData);
    },

    //回显数据
    showData: function (data) {
        if (!data) {
            return
        }
        console.log(data)

        //设备类型
        var deviceTypeItems = this.data.deviceTypeItems;
        for (var i = 0, len = deviceTypeItems.length; i < len; ++i) {
            deviceTypeItems[i].checked = deviceTypeItems[i].value == data.deviceType;
        }

        //保修状态
        var warrantyStatusItems = this.data.warrantyStatusItems;
        for (var i = 0, len = warrantyStatusItems.length; i < len; ++i) {
            warrantyStatusItems[i].checked = warrantyStatusItems[i].value == data.warrantyStatus;
        }

        this.setData({
            taskNo: data.taskNo,
            sn: data.sn,
            hospitalName: data.hospitalName,
            hospitalInfo: data.hospitalInfo,
            [`hospitalInfo.contact`]: data.hospitalDeptContactName,
            [`hospitalInfo.contactTel`]: data.hospitalDeptContactPhone,
            deviceTypeItems,
            warrantyStatusItems,
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

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


    radioChange: function (e) {
        var deviceTypeItems = this.data.deviceTypeItems;
        for (var i = 0, len = deviceTypeItems.length; i < len; ++i) {
            deviceTypeItems[i].checked = deviceTypeItems[i].value == e.detail.value;
        }
        this.setData({
            deviceTypeItems: deviceTypeItems,
            [`formData.deviceType`]: parseInt(e.detail.value)
        });
    },
    radioChange2: function (e) {
        var warrantyStatusItems = this.data.warrantyStatusItems;
        for (var i = 0, len = warrantyStatusItems.length; i < len; ++i) {
            warrantyStatusItems[i].checked = warrantyStatusItems[i].value == e.detail.value;
        }
        this.setData({
            warrantyStatusItems: warrantyStatusItems,
            [`formData.warrantyStatus`]: parseInt(e.detail.value)
        });
    },
    //选择医院
    toHospital() {
        wx.navigateTo({
            url: '/pages/selectHospital/index',
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
            if (!valid) {
                const firstError = Object.keys(errors)
                if (firstError.length) {
                    this.setData({
                        error: errors[firstError[0]].message
                    })
                }
            } else {
                var repairData = wx.getStorageSync('repairData') ? wx.getStorageSync('repairData') : {};
                this.data.formData.hospitalName = this.data.hospitalName;
                this.data.formData.hospitalInfo = this.data.hospitalInfo;
                console.log(this.data.formData)
                repairData.firstPageData = this.data.formData;
                wx.setStorageSync('repairData', repairData);

                var deviceType = this.data.formData.deviceType;
                var url;
                switch (parseInt(deviceType)) {
                    case 1:
                        url = '/pages/repair/ultrasonic';
                        break;
                    case 2:
                        url = '/pages/repair/endoscope';
                        break;
                    case 3:
                        url = '/pages/repair/inspect'
                }
                console.log(url);
                wx.navigateTo({
                    url: url,
                })
            }
        })
    },
});