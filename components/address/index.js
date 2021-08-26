// components/address/index.js
const app = getApp()
const api = app.globalData.api
const util = app.globalData.util
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
    countryData:[],
    provinceData:[],
    cityData:[],
    region:[0,0,0],
    lastChoseRegion:[0,0,0],
    curCountryId:7,
    proviceId:'',
    cityId:'',

  },
  lifetimes: {
    attached: function () {
      this.getGetCountry(); 
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取国家
    getGetCountry(){
      var that = this;
      api.GetCountry().then(res => {
        if (res.code == 0) {
          var countryData = res.data;
          this.setData({
            countryData,
            curCountryId:countryData[0].yatId, //默认第一条
          })
          //获取默认省份
          let type="init"
          this.triggerEvent('showLoading',true);
          that.getProvince(type,countryData[0].yatId);
        }
      });
    },

    //获取省份
    getProvince: function (type,Id) {
      var that = this;
      api.GetProvince(Id).then(res => {
        if (res.code == 0) {
          var provinceData = res.data;
          this.setData({
            provinceData,
          });
          if(type=='init'){
            console.log('初次进入')
            this.setData({
              proviceId:provinceData[0].yatId
            });
            //获取默认的城市     
            that.getCity(this.data.proviceId)
          }else{
            console.log('改变国家')
            let curProviceIndex = that.data.region[1];
            if(provinceData.length!==0){
              let curProviceId  = provinceData[curProviceIndex].yatId;
              that.getCity(curProviceId)
            }  
          }    
        }
      })
    },

    //获取当前城市
    getCity: function (Id) {
      var that = this;
      api.GetCity(Id).then(res => {
        if (res.code == 0) {
          var cityData = res.data;
          that.setData({
            cityData
          });
          setTimeout((    
          )=>{
            that.triggerEvent('showLoading',false);
          },600)
         
        }
      })
    },
   
    bindChange(e){
      let data = e.detail.value; 
      this.setData({
        region:data
      })
       //国家索引改变了
      if(this.data.lastChoseRegion[0]!==data[0]){
        this.setData({
          region:[data[0],0,0]
        })
      //根据索引获取当前国家
      let curCountry = this.data.countryData[data[0]];
      //获取当前国家的省份
      let type=""
      this.triggerEvent('showLoading',true);
      if(curCountry.yatId){
        this.getProvince(type,curCountry.yatId);
      }else{
        this.triggerEvent('showLoading',false);  
      }
      
      }
       
       //如果当前省份索引改变获取当前省份城市
       if(data[1]!==this.data.lastChoseRegion[1]){
        this.setData({
          region:[data[0],data[1],0]
        })
        //获取当前国家的省份的城市
        this.triggerEvent('showLoading',true);
        let curProvince = this.data.provinceData[data[1]];
         let curProvinceId = curProvince.yatId;
        this.getCity(curProvinceId);
       }
      this.setData({
        lastChoseRegion:e.detail.value
      })
      
    }
  }
})