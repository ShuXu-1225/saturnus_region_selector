<template>
  <el-row class="container">
    <div class="selector-container" :style="{ flexDirection: layoutDir === 'horizontal' ? 'row' : 'column' }">
      <template v-for="i in 3">
        <div :key="i" class="item">
          <div class="label" :style="labelStyle">
            {{ i === 1 ? "省": i === 2 ? "市" : "区" }}
          </div>

          <el-select v-model="value_selector[i - 1]" placeholder="请选择" @change="changeHandler(i - 1)">
            <el-option
              v-for="item in options[i - 1]"
              :key="item['id']"
              :label="item['name']"
              :value="item['id']"
            />
          </el-select>
        </div>
      </template>
    </div>
  </el-row>
</template>

<script>
/**
 * @description 省市区级联选择 组件
 * @author ShuXu
 * @date 2021/02/04
 */

// 按需注册 第三方组件 这种引入方法 可以确保打包后 第三方标签仍可用 start
import {
  Row,
  Col,
  Select,
  Option
} from 'element-ui'
// end

import {
  // mapState,
  mapGetters,
  mapMutations,
  // mapActions
} from 'vuex'

export default {
  name: 'RegionSelector',
  components: {
    ElRow: Row,
    ElCol: Col,
    ElSelect: Select,
    ElOption: Option
  },
  props: {
    layoutDir: {
      // 布局方向
      type: String,
      default: () => 'horizontal' // vertical
    },
    labelWidth: {
      type: String,
      default: () => '50px'
    },
    labelAlign: {
      type: String,
      default: () => 'right'
    },
    requestList: {
      type: Array,
      required: true,
      default: () => []
    },
    responseKey: {
      type: String,
      default: () => ''
    },
    keyMapList: {
      type: Array,
      default: () => [
        ['id', 'name'],
        ['id', 'name'],
        ['id', 'name']
      ]
    },
  },
  data() {
    return {
      value_selector: [
        '', // province
        '', // city
        '' // district
      ]
    }
  },
  computed: {
    // 使用 matState 的写法
    // ...mapState(
    //   'regionSelector',
    //   {
    //     province: state => state.province,
    //     city: state => state.city,
    //     district: state => state.district
    //   }
    // ),

    // 使用 mapGetters 的写法
    ...mapGetters(
      'regionSelector',
      [
        'province',
        'city',
        'district'
      ]
    ),

    options: function() {
      return [
        this['province'],
        this['city'],
        this['district']
      ]
    },

    labelStyle: function() {
      return {
        width: this.labelWidth,
        textAlign: this.labelAlign,
        padding: '0 12px'
      }
    }
  },
  mounted() {},
  methods: {
    ...mapMutations(
      'regionSelector',
      {
        'setProvince': 'SET_PROVINCE',
        'setCity': 'SET_CITY',
        'setDistrict': 'SET_DISTRICT'
      }
    ),

    /**
     * 级联获取 region data
     * @param index
     */
    changeHandler: function(index) {
      for (let i = 3; i--;) { // 2 1 0
        if (i > index) this.value_selector[i] = '' // 清空 当前选择级别的所有下级选中数据
      }
      if (index !== 2) this.initNext(index + 1) // 获取下级 地址 list
      // this.$emit('change', index)
    },

    init: function () {
      this.initNext(0)
    },

    /**
     * 取值
     * @returns {string[]}
     */
    getValue: function() {
      return this.value_selector
    },

    /**
     * 初始化 下级地址 list 如果存在赋值操作 则 在其初始化成功后 操作
     * @param regionData
     * @returns {Promise<void>}
     */
    setValue: async function(regionData) {
      for ( let i in [0, 1, 2] ) { // 0 1 2
        i = parseInt(i)
        // 当赋值上级后 获取该上级对应的下级 仅当其下级获取成功时 才继续执行赋值
        if (i !== 0) {
          await this.doGetRegionData(i)
        }
        this.value_selector[i] = regionData[i]
        this.$forceUpdate()
      }
    },

    /**
     * 初始化 下级地址 list
     * @param level 0=省 1=市 2=区 'init'=初始化
     * @returns {Promise<void>}
     */
    initNext: async function(level) {
      await this.doGetRegionData(level)
    },

    /**
     * 通过接口 获取 地区列表
     * @param level
     * @returns {Promise<unknown>}
     */
    doGetRegionData: function (level) {
      const that = this
      return new Promise(resolve => {
        that.requestList[level]().then(res => {
          if (res) {
            const response = that.responseKey ? res[that.responseKey] : res
            const ls = []
            response.map(item => {
              ls.push({
                id: item[that.keyMapList[level][0]],
                name: item[that.keyMapList[level][1]]
              })
            })

            that.doSetRegionData(ls, level)
          }

          resolve(true)
        })
      })
    },

    /**
     * 将 地区列表 存放至 store
     * @param value
     * @param level
     */
    doSetRegionData: function (value, level) {
      const mutationList = [
        'setProvince',
        'setCity',
        'setDistrict'
      ]
      this[mutationList[level]](value)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .selector-container {
    width: 100%;
    display: flex;

    .item {
      margin-bottom: 22px;
      flex: 1;

      .label {
        display: inline-block;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
      }
    }
  }
}
</style>
