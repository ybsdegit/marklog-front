import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Blogs' }
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: () => import('../views/Blogs.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/blog/add',
    name: 'BlogEdit',
    component: () => import('../views/BlogEdit.vue')
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: () => import('../views/BlogDetail.vue')
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: () => import('../views/BlogEdit.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
