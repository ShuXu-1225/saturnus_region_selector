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
	@change="changeHandler"
/>

<script>
import { mapMutations } from 'vuex'
export default {
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
     * 以下两个方法用于从服务端获取地址数据
     * 可以用更精简的方式实现 TODO
     */

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
```

### Props

| Name       | Type   | Default    | Options              | Description |
| ---------- | ------ | ---------- | -------------------- | ----------- |
| layoutDir  | String | horizontal | horizontal, vertical |             |
| labelWidth | String | 50px       |                      |             |
| labelAlign | String | right      | left, center, right  |             |

### Methods

| Name     | Description                                                | e.g.                                                         |
| -------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| getValue | return value like<br />    ['150000', '150200', '150203' ] | this.$refs['regionSelector'].getValue()                      |
| setValue |                                                            | this.$refs['regionSelector1'].setValue(<br />    [   '150000',   '150200',   '150203' ]<br />) |

### Events

| Name | Description | e.g. |
| ---- | ----------- | ---- |
|      |             |      |

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

