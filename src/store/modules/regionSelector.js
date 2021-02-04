const state = {
  province: [], // 省
  city: [], // 市
  district: [] // 区
}

const getters = {
  province: state => state.province, // 省
  city: state => state.city, // 市
  district: state => state.district // 区
}

const mutations = {
  SET_PROVINCE: (state, val) => {
    state.province = val
    state.city = []
    state.district = []
  },
  SET_CITY: (state, val) => {
    state.city = val
    state.district = []
  },
  SET_DISTRICT: (state, val) => {
    state.district = val
  }
}

const actions = {
  /**
   * 获取 省市区 列表
   * @param commit
   * @param state
   * @param parentCode
   * @param type 0=省 1=市 2=区
   */
  getRegionData: ({ commit, state }, { parentCode, type = 0 }) => {
    const mutationList = [
      'SET_PROVINCE',
      'SET_CITY',
      'SET_DISTRICT'
    ]
    return new Promise(resolve => {
      commit(
        mutationList[type],
        [
          {id: '', name: ''} // real region data
        ]
      )
      resolve(true)
    })
  },

  action1: ({ commit, state }, params) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, 1500)
    })
  },
  action2: async({ dispatch, commit, state }, params) => {
    await dispatch('action1', params)
    commit('mutation1', params)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
