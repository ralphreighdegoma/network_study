import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import Landing from '../components/pages/Landing.vue';
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";

Vue.use(VueRouter);


const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing,
  },

  
  // {
  //   path: '/admin/product-add',
  //   name: 'product-add',
  //   component: AddProduct,
  //   meta: {
  //     requiresAdmin: true,
  //     progress
  //   },
  // },

  

  // {
  //   path: '/admin/slider',
  //   name: 'slider',
  //   component: Slider,
  //   meta: {
  //     requiresAuth: true,
  //     requiresAdmin: true,
  //     progress
  //   },
  // },

  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresVisitor: true,
    }
  },

  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresVisitor: true,
    }
  },
  

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }else if(to.matched.some(record => record.meta.requiresVisitor)){
      if (store.getters.isAuthenticated) {
          next({
              path: '/',
          })
      } else {
          next()
      }
  }else if(to.matched.some(record => record.meta.requiresAdmin)){
    if (!store.getters.isAdmin) {
        next({
            path: '/',
        })
    } else {
        next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;