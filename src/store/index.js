import Vue from 'vue'
import Vuex from 'vuex'
import { news } from '@/api'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    newslist: {}
  },
  getters: {
  },
  mutations: {
    SETNEWSLIST (state, value) {
      state.newslist = value
    }
  },
  actions: {
    // 获得疫情数据
    getNews ({ commit }) {
      news().then(resolve => {
        if (resolve.data.code === 200) {
          commit('SETNEWSLIST', resolve.data.newslist[0])
        }
      })
    }
  },
  modules: {
  }
})
