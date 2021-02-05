# v_region_selector [by Saturnus]

> A region selector based on Vue2, Vuex and element UI

## Install

```bash
npm i v_region_selector -S
```

## Usage

### Global Registration

```bash
import Vue from 'vue'
import store from 'vuex' // you must install vuex first

import RegionSelector from 'v_region_selector'
Vue.use(RegionSelector, { store })
```

### Using the component

```bash
<region-selector
  ref="regionSelector"
  :requestList="requestList"
  responseKey="resultJson"
  :keyMapList="keyMapList"
/>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
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
            provinceId: that.$refs['regionSelector'].getValue()[0] // 请求的入参
          }).then(res => {
            resolve(res)
          })
        })
      }
      const req_district = function() {
        return new Promise(resolve => {
          request.post('commonApi/common/getArea', {
            cityId: that.$refs['regionSelector'].getValue()[1] // 请求的入参
          }).then(res => {
            resolve(res)
          })
        })
      }
      return [
        req_province, // 获取 第一级别 地址 接口请求 promise
        req_city, // 获取 第二级别 地址 接口请求 promise
        req_district // 获取 第三级别 地址 接口请求 promise
      ]
    }
  },
  mounted() {
    this.initRegionSelector()
  },
  methods: {
    initRegionSelector: function () {
      this.$refs['regionSelector'].init()
    },
    getVal: function () {
      console.info(this.$refs['regionSelector'].getValue())
    },
    setVal: function () {
      this.$refs['regionSelector'].setValue([ '150000', '150200', '150203' ])
    }
  }
}
</script>
```

### Props

| Name        | Type   | Default                        | Options              | Description                                                  |
| ----------- | ------ | ------------------------------ | -------------------- | ------------------------------------------------------------ |
| layoutDir   | String | horizontal                     | horizontal, vertical |                                                              |
| labelWidth  | String | 50px                           |                      |                                                              |
| labelAlign  | String | right                          | left, center, right  |                                                              |
| requestList | Array  |                                |                      | the request list                                             |
| responseKey | String | ''                             |                      | key of the data in response                                  |
| keyMapList  | Array  | [['id', 'name'], [...], [...]] |                      | it`s hard to descripe in English...<br />（select 的 option 需要 key 和 value，默认 key 是 id，value 是 name。<br />如果您的接口返回值地址数据与默认不同，请参考返回值进行配置。<br />如：[['provinceId', 'provinceName'], ['cityId', 'cityName'], ['areaId', 'areaName']]） |

### Methods

| Name     | Description                                            | e.g.                                                         |
| -------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| init     | init the region selector                               | this.$refs['regionSelector'].init()                          |
| getValue | return value like<br />['150000', '150200', '150203' ] | this.$refs['regionSelector'].getValue()                      |
| setValue |                                                        | this.$refs['regionSelector1'].setValue(<br />[ '150000', '150200', '150203' ]<br />) |

### Events

| Name | Description | e.g. |
| ---- | ----------- | ---- |
| /    | /           | /    |

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev

# build for production with minification
npm run build
```



## License

[MIT](LICENSE)

