import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'
import LogoutView from '@/views/LogoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin',
      name: 'admin',
      meta: { isAuthenticated : true},
      component: AdminView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView,
       redirect: {
        name: 'login'
      }
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  if(to.meta.isAuthenticated) {
    try {
      const response = await fetch('https://projekt-webbtjanst-api-hanin-96.onrender.com/admin', {
        credentials: 'include'
      })

      if(response.ok) {
        next() 
      } else {
        next("/login")
      }

    } catch(error) {
      next("/login")
    }
  } else {
    next(); //är inte skyddad. Går bara vidare.
  }
});


export default router
