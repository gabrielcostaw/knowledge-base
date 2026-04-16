import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) 

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        user: null
    },
    mutations: {
        toggleMenu(state, isVisible) {
            // menu nunca fica visivel sem um usuario logado
            if(!state.user) {
                state.isMenuVisible = false
                return
            }

            // se nao passar argumento, inverte o estado atual
            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setUser(state, user) {
            state.user = user
            if(user) {
                //injeta o token em todas as requisições axios automaticamente
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.isMenuVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        }
    }
})