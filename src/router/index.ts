import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Register from '@/auth/Register.vue';
import Login from '@/auth/Login.vue';
import Index from '@/secure/Index.vue';
import Dashboard from '@/secure/dashboard/Dashboard.vue';
import Users from '@/secure/users/Users.vue';
import CreateUser from '@/secure/users/CreateUser.vue';
import UpdateUser from '@/secure/users/UpdateUser.vue';
import Roles from '@/secure/roles/Roles.vue';
import CreateRole from '@/secure/roles/CreateRole.vue';
import UpdateRole from '@/secure/roles/UpdateRole.vue';
import Products from '@/secure/products/Products.vue';
import CreateProduct from '@/secure/products/CreateProduct.vue';
import UpdateProduct from '@/secure/products/UpdateProduct.vue';

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
        { path: '/users/create', component: CreateUser },
        { path: '/users/:id/edit', component: UpdateUser },
        { path: '/roles', component: Roles },
        { path: '/roles/create', component: CreateRole },
        { path: '/roles/:id/edit', component: UpdateRole },
        { path: '/products', component: Products },
        { path: '/products/create', component: CreateProduct },
        { path: '/products/:id/edit', component: UpdateProduct },
      ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
