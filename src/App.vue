<template>
  <div id="app">
    <el-row class="example" v-show="false">
      <!-- <img src="./assets/logo.png"> -->
      <el-button>{{ msg }}</el-button>

      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-row>

    <el-row class="example" v-show="true">
      <region-selector ref="regionSelector" @change="changeHandler"/>
    </el-row>
  </div>
</template>

<script>
import RegionSelector from '@/packages/regionSelector/src/Main'
import request from '@/network'
import { mapMutations } from 'vuex'

export default {
  name: 'app',
  components: {
    RegionSelector
  },
  data() {
    return {
      msg:  'Welcome to Your Vue.js App',

      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
    }
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
          this[mutationList[nextLevel]](res.resultJson)
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/style.scss";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: cornsilk;
  padding: 20px;
}
</style>
