<template>
  <div id="app">
    <img src="./assets/logo.png">

    <div class="example" v-show="true" style="margin-top: 40px;">
      <region-selector ref="regionSelector" @change="changeHandler"/>
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
import { mapMutations } from 'vuex'

export default {
  name: 'app',
  data() {
    return {}
  },
  mounted() {
    this.getRegionSelectorData(0)
  },
  methods: {
    ...mapMutations(
      'regionSelector',
      {
        setProvince: 'SET_PROVINCE',
        setCity: 'SET_CITY',
        setDistrict: 'SET_DISTRICT'
      }
    ),

    /**
     * 地址选择器 点选事件
     * @param level 当前点选的地址级别 0 省 1 市 2 地区
     */
    changeHandler: function (level) {
      const pCode = this.$refs['regionSelector'].getValue()[level]
      if (level !== 2) { // 最后一级 不再获取
        this.getRegionSelectorData(level + 1, pCode)
      }
    },

    /**
     * 根据选择获取下一级地址 并按要求缓存 {id, name}
     * @param nextLevel 要获取的地址级别
     * @param pCode 父节点 code
     */
    getRegionSelectorData: function (nextLevel, pCode) {
      const baseUrl = 'commonApi/common/'
      const requestList = ['getProvince', 'getCity', 'getArea']
      const keyMapList = [['provinceId', 'provinceName'], ['cityId', 'cityName'], ['areaId', 'areaName']]
      const mutationList = ['setProvince', 'setCity', 'setDistrict']
      const url = `${baseUrl}${requestList[nextLevel]}`
      const param = {}
      if (nextLevel !== 0) param[keyMapList[nextLevel - 1][0]] = pCode
      request.post(url, param).then(res => {
        if (res && res.resultJson) {
          const ls = []
          res.resultJson.map(item => {
            ls.push({
              id: item[keyMapList[nextLevel][0]],
              name: item[keyMapList[nextLevel][1]]
            })
          })
          this[mutationList[nextLevel]](ls)
        }
      })
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
