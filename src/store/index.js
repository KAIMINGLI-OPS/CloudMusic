import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const state = {
  musiclistId:[],
  musicCount:0,
  nowmusic:'',
  nowmusicmenu:{},
  musicmenus:[],
  userPlayList:[],
  musicDuration: 0,
  isPlaying:true,
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  
  modules: {
   
  }
})
