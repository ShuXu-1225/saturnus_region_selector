/**
 * @description 初始化 省
 * @author ShuXu
 * @date 2021/02/04
 */

import store from '@/store'

const selector = {
  // 获取一级省市区地址 并缓存 by ShuXu
  init: function() {
    if (!store.getters.region_province || !store.getters.region_province.length) {
      store.dispatch('region/getRegionData', { type: 0 })
    }
  }
}
export default selector
