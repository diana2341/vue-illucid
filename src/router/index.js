import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage.vue'
// import Profile from '../components/ProfilePage.vue'

Vue.use(Router)

export default new Router({
    routes: [
    { path: '/', component: HomePage },
    // { path:'/profile', component: Profile}
    ]
})
