import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/PostDetails',
      name: 'postdetails',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/Notifications',
      name: 'notifications',
      component: () => import('../views/NotificationView.vue')
    },
    {
      path: '/Settings',
      name: 'usersettings',
      component: () => import('../views/SettingsView.vue')
    },
    {
      path: '/Profile',
      name: 'profilepage',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/Profile/:nick',
      name: 'userprofilewithnick',
      component: ProfileView
    },
    {
      path: '/PostDetails/:id',
      name: 'postdetailswithid',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PostDetailsView.vue')
    },
    {
      path: '/Register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/Login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/Search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/Messages',
      name: 'messages',
      component: () => import('../views/MessagesView.vue')
    }
  ]
})

export default router
