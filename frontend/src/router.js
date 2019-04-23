import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: () => import('./pages/Layout.vue'),
            children: [
                {path: '/', component: () => import('./pages/Home/Home.vue')},
                {path: '*', component: () => import('./pages/NotFound/NotFound.vue')},
            ]
        },
    ]
})