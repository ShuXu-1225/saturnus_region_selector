import RegionSelector from './packages/regionSelector/src/Main'
import regionSelectorStore from './store/modules/regionSelector'

const other_components = {
  // 这里是后续补充的组件
}

const install = function (Vue, options = {}){
  if (!options.store) {
    console.info('Please provide a store!') // 使用该组件 需要安装 vuex 并初始化 store
  }

  // 动态注册 store
  options.store.registerModule('regionSelector', regionSelectorStore)

  Object.keys(other_components).forEach(key => {
    Vue.component(key, other_components[key])
  })

  Vue.component(RegionSelector.name, RegionSelector)
}

if(typeof window !== undefined && typeof window !== 'undefined' && window.Vue) {
  // 判断 window.Vue 是否存在，因为直接引用 vue.min.js， 它会把 Vue 绑到 Window 上，我们直接引用打包好的 js 才能正常跑起来。
  install(window.Vue)
}

const plugin = {
  install,

  ...other_components
}

export default plugin
