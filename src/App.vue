<template>
  <div id="app">
   <img src="./assets/logo.png">

    <div style="margin-top: 40px;">
      <region-selector
        ref="regionSelector"
        v-model="regionList"
        :requestList="requestList"
        responseKey="resultJson"
        :keyMapList="keyMapList"
      />
    </div>

    <div style="margin-top: 20px;">
      <button @click="getVal">get value</button>
      <button @click="setVal">set value</button>
      <button @click="reset">reset</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import store from '@/store'

// import RegionSelector from '@/main_plugin'
import RegionSelector from '../Lib/v_region_selector'
Vue.use(RegionSelector, { store })

import request from '@/network'

export default {
  name: 'app',
  data() {
    return {
      regionList: [
        // "110000", "110100", "110101"
      ],

      keyMapList : [
        ['provinceId', 'provinceName'],
        ['cityId', 'cityName'],
        ['areaId', 'areaName']
      ]
    }
  },
  computed: {
    requestList: function (){
      const that = this
      const req_province = function() {
        return new Promise(resolve => {
          request.post('commonApi/common/getProvince', {}).then(res => {
            resolve(res)
          })
        })
      }
      const req_city = function() {
        return new Promise(resolve => {
          request.post('commonApi/common/getCity', {
            provinceId: that.regionList[0]
          }).then(res => {
            resolve(res)
          })
        })
      }
      const req_district = function() {
        return new Promise(resolve => {
          request.post('commonApi/common/getArea', {
            cityId: that.regionList[1]
          }).then(res => {
            resolve(res)
          })
        })
      }
      return [
        req_province,
        req_city,
        req_district
      ]
    }
  },
  methods: {
    getVal: function () {
      // console.info(this.$refs['regionSelector'].getValue())
      console.info(this.regionList)
    },
    setVal: function () {
      // this.$refs['regionSelector'].setValue([ '150000', '150200', '150203' ])
      this.regionList = [ '150000', '150200', '150203' ]
    },
    reset: function () {
      // this.$refs['regionSelector'].setValue([ '', '', '' ])
      this.regionList = []
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/style.scss";

#app {
  padding: 20px;
  text-align: center;
  background: cornsilk;
}
</style>
