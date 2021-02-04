import RegionSelector from './packages/regionSelector/src/Main'
import regionSelectorStore from './store/modules/regionSelector'

const install = function (Vue, options = {}){
  if (!options.store) {
    console.info('Please provide a store!') // 使用该组件 需要安装 vuex 并初始化 store
  }

  Vue.component(RegionSelector.name, RegionSelector)

  // 动态注册 store
  options.store.registerModule('regionSelector', regionSelectorStore)
}

// 判断 window.Vue 是否存在，因为直接引用 vue.min.js， 它会把 Vue 绑到 Window 上，我们直接引用打包好的 js 才能正常跑起来。
if (typeof window !== undefined && window.Vue) {
  window.Vue.component('v-region-selector', RegionSelector)
  install(window.Vue)
}
