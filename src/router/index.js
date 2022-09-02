// import Vue from 'vue'
// import Router from 'vue-router'
import HomePage from '../components/HomePage.vue'
import {createRouter, createWebHistory } from 'vue-router'
// // import Profile from '../components/ProfilePage.vue'

// Vue.use(Router)

// export default new Router({
//     routes: [
//     { path: '/', component: HomePage },
//     // { path:'/profile', component: Profile}
//     ]
// })

const routes = [
    {
        path: '/',
        name: 'Home',
        component:HomePage
    },
    //  {
    //     path: '/',
    //     name: 'Profile',
    //     component:Profile
    // }
]
export const router = createRouter({
    history: createWebHistory(),
    routes
})
