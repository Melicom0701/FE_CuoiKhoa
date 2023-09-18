import { createRouter, createWebHistory } from 'vue-router'
import Poll from '../components/layout/PollManager.vue'
import LoginForm from '../components/auth/LoginForm.vue';
import Register from '../components/auth/RegisterForm.vue';
import UserList from '../components/User/UserList.vue';
import ResetPassword from '../components/auth/ResetPassword.vue';
import UserDetails from '../components/User/UserDetails.vue'
import DashBoard from '../components/layout/DashBoard.vue'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginForm,
  },
  {
    path: '/',
    name: 'dashboard',
    component: DashBoard,
    meta: { requiresAuth: true },
  },
  {
    path: '/reset-pass/:email',
    name: 'reset-pass',
    component: ResetPassword,
    props: true
  },
  {
    path: '/register',
    name:'register',
    component: Register,
  },
  {
    path: '/user',
    name:'user',
    component: UserList,
    meta: { requiresAuth: true },
  },
  {
    path: '/user-details',
    name: 'userDetails',
    component: UserDetails,
    meta: { requiresAuth: true },
  },
  {
      path: '/poll',
      name:'poll',
      component: Poll,
      meta: { requiresAuth: true },
  },

]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes,
})
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('accessToken');

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login'); // Redirect to login if user is not logged in and accessing a route that requires authentication
  } else if (to.name === 'login' && isLoggedIn) {
    next('/'); // Redirect to dashboard if user is logged in and tries to access login page
  } else {
    next(); // Continue navigation
  }
})

export default router
