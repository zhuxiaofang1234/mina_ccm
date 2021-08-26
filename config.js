const config = {
  dev: { //开发环境
    //domain: "http://127.0.0.1:86", //后台接口地址3
    //domain:"http://ccs-gateway:9999"
    domain:'http://h.sonoscape.com:19999'
  },
  prod: { //生产环境
    domain: "https://ccm.sonoscape.com:8093",
  },
  backgroudImages: [{
      url: "http://www.sonoscape.com.cn/statics/css/images/banner-3.jpg"
    },
    {
      url: "http://www.sonoscape.com.cn/uploadfile/2018/0831/20180831051949809.jpg"
    },
    {
      url: "http://www.sonoscape.com.cn/statics/css/images/banner-2.jpg"
    },
    {
      url: "http://www.sonoscape.com.cn/statics/css/images/banner-1.jpg"
    }
  ],
  indexGrid: [{
      url: "/pages/form/index",
      iconLabel: '新建客诉',
      iconPath: "images/home/add-fill.png"
    },
    {
      url: "/pages/form-list/index?type=0",
      iconLabel: '表单列表',
      iconPath: "images/home/list.png"
    },
    {
      url: "/pages/return/index",
      iconLabel: '返回配件',
      iconPath: "images/home/land transportation.png"
    },
    {
      url: "/pages/form-list/index",
      iconLabel: '上传附件',
      iconPath: "images/home/pic.png"
    },
    {
      url: "/pages/internal-form/index",
      iconLabel: '内部单',
      iconPath: "images/home/writing.png"
    },
    {
      url: "/pages/my/index",
      iconLabel: '我的',
      iconPath: "images/home/bussiness-man-fill.png"
    },
    {
      url: "/pages/feedback/index",
      iconLabel: '设置',
      iconPath: "images/set.png"
    },
    {
      url: "/pages/help/index",
      iconLabel: '反馈',
      iconPath: "images/home/smile.png"
    },
    {
      url: "/pages/help/index",
      iconLabel: '帮助',
      iconPath: "images/home/help.png"
    },
  ]
}

const domain = config.prod.domain
//const domain = config.dev.domain

module.exports = {
  domain,
  backgroudImages: config.backgroudImages,
  indexGrid: config.indexGrid
}