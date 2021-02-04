/**
 * @description 省市区级联选择 组件
 * @author ShuXu
 * @date 2021/02/04
 */

import RegionSelector from './src/Main'

RegionSelector.install = function(Vue) {
  Vue.component(RegionSelector.name, RegionSelector)
}

export default RegionSelector
