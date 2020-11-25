import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Register from '@/auth/Register.vue';
import Login from '@/auth/Login.vue';
import Index from '@/secure/Index.vue';
import Dashboard from '@/secure/dashboard/Dashboard.vue';
import Users from '@/secure/users/Users.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  {
      path: '',
      component: Index,
      children: [
        { path: '', redirect: '/dashboard' },
        { path: '/dashboard', component: Dashboard },
        { path: '/users', component: Users },
      ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
