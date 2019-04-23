import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        device: {
            isMobile: ['iPhone', 'Mobile'].some(userAgent => navigator.userAgent.indexOf(userAgent) > 0)
        }
    },
    getters: {
        getIsMobile(state) {
            return state.device.isMobile
        }
    },
    mutations: {},
})