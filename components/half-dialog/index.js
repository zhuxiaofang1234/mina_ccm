// components/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false
    },
    title:{
      type:String,
      value:'标题'
    },
    loading:{
      type:Boolean,
      value:false
    }
  },
  options: {
    multipleSlots: true
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
    handleClose() {
      this.triggerEvent('cancle')
    },
    handleSure(e){
      this.triggerEvent('sure')
    },
    handleSalaryChange(e) {
      console.log(this.data.salaryList[e.detail.value[0]])
    }
  }
})
