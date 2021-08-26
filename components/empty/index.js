// components/empty/index.js
var PRESETS = ['error', 'search', 'default', 'network'];
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    description: String,
    image: {
      type: String,
      value: 'default',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  observers:{
    image:function(image){
    }    
  },
  ready: function () {
    if (PRESETS.indexOf(this.data.image) !== -1) {
      this.setData({
        imageUrl:
          '../../images/empty-image-' + this.data.image + '.png',
      });
    } else {
      this.setData({ imageUrl: this.data.image });
    }
   }, 

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
