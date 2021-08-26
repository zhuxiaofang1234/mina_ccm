// components/multiChoice/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkboxChange(e){
      console.log('checkboxChange e:',e);
      let string = "list["+e.target.dataset.index+"].selected"
          this.setData({
              [string]: !this.data.list[e.target.dataset.index].selected
          });
          console.log(this.data.list.filter(it => it.selected))
          let detailValue = this.data.list.filter(it => it.selected).map(it => it.value)
          console.log(detailValue)
          //console.log('所有选中的值为：', detailValue);
          this.triggerEvent('click', detailValue)
    },
  }
})
