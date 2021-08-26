// components/select-search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isSelect:false,
    selectedData:'超声',
    radioItems: [
      {name: '超声', value: '0', checked: true},
      {name: '内镜', value: '1'},
      {name: '检验', value: '2'},
  ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectData:function(){
      this.setData({
        isSelect:!this.data.isSelect
      })
    },
    radioChange:function(e){
      let selectData = e.detail.value;
     let newArr =  this.data.radioItems.filter(function(item){
        return item.value == selectData
      });
      console.log(newArr);
      let that = this;
      that.setData({
        selectedData:newArr[0].name,
        isSelect:false
      })
    }
  }
})
