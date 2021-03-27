import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import router from '../router';


Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    user: {
      loggedIn: {
        token: false
      }
    },
    type: null
  },

  mutations: {
    CHEK_AUTH_TOKEN(state) {
        state.user.loggedIn.token = true
    },
    async CHEK_CLEAR_TOKEN(state) {
      state.user.loggedIn.token = false
      await axios.post('https://test.siberianspirits.ru/api/admin/exit')
      router.push('/login');
    }

  },
  actions: {
    checkout ({ commit }, payload) {
      let url = 'https://test.siberianspirits.ru/api/admin/auth'

      axios.post(url, payload)
        .then(() => {
          commit('CHEK_AUTH_TOKEN');
          router.push('/');
        })
        .catch(error => {
          console.log(error)
        })
    },
    goHome ({ commit }) {
      commit('CHEK_AUTH_TOKEN')
    },

    chek_token({ commit, state }) {
      axios.post('https://test.siberianspirits.ru/api/admin/check')
          .then(()=> {
            console.log('do:' + state.user.loggedIn.token)
          commit('CHEK_AUTH_TOKEN')
            console.log('posle:' + state.user.loggedIn.token)
        })
         .catch(()  => {
           state.user.loggedIn.token = false
           router.push('login')
        })
    },
    clear_token({ commit }) {
      commit('CHEK_CLEAR_TOKEN')
    }
  },

  getters: {
    auth(state) {
      return state.user
    },
    type(state) {
      return state.type
    }
  },
  modules: {
  }
})
