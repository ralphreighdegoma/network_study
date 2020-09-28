import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index';
import DashboardLayout from '@/layout/DashboardLayout';
import AuthLayout from '@/layout/AuthLayout';
import Layout from '@/layout/Layout';

Vue.use(Router)

const routes =  [
  {
    path: '/',
    redirect: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        meta: {
          title: 'Dashboard',
          requiresAuthCustomer: true
        },
        component: () => import('./views/customer/Dashboard.vue')
      },
      {
        path: '/products',
        name: 'products',
        meta: {
          title: 'Products',
          requiresAuthCustomer: true
        },
        component: () => import('./views/customer/Products.vue')
      },
      {
        path: '/account',
        name: 'account',
        meta: {
          title: 'Profile',
          requiresAuthCustomer: true
        },
        component: () => import('./views/customer/UserProfile.vue')
      },
      {
        path: '/referral-code',
        name: 'referral-code',
        meta: {
          title: 'Referral Code',
          requiresAuthCustomer: true
        },
        component: () => import('./views/customer/ReferralCode.vue')
      },
      {
        path: '/withdraw',
        name: 'withdraw',
        meta: {
          title: 'WithDraw',
          requiresAuthCustomer: true
        },
        component: () => import('./views/customer/Withdraw.vue')
      },
      {
        path: '/orders',
        name: 'customer-orders',
        meta: {
          title: 'Customer Orders',
          requiresAuthCustomer: true
        },
        component: () => import('./views/customer/orders/Orders.vue')
      },
      {
        path: '/order/:id',
        name: 'customer-order',
        meta: {
          title: 'Customer Order',
          requiresAuthCustomer: true
        },
        component: () => import('./views/customer/orders/Order.vue')
      },
      {
        path: '/networking',
        name: 'networking',
        meta: {
          title: 'Networking',
          requiresAuthCustomer: true
        },
        component: () => import('./views/customer/Networking.vue')
      },
      {
        path: '/ewallet',
        name: 'ewallet',
        meta: {
          title: 'Ewallet',
          requiresAuthCustomer: true
        },
        component: () => import('./views/customer/Ewallet.vue')
      },
      {
        path: '/withdraw/:id',
        name: 'withdraw',
        meta: {
          title: 'Withdraw',
          requiresAuthCustomer: true
        },
        component: () => import('./views/customer/WithdrawDetail.vue')
      },
    ]
  },

  {
    path: '/',
    redirect: 'admin-dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/admin/dashboard',
        name: 'admin-dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        meta: {
          title: 'Dashboard',
          requiresAuthAdmin: true
        },
        component: () => import('./views/admin/Dashboard.vue')
      },
      {
        path: '/admin/account',
        name: 'admin-account',
        meta: {
          title: 'Account',
          requiresAuthAdmin: true
        },
        component: () => import('./views/admin/UserProfile.vue')
      },
      {
        path: '/admin/products',
        name: 'admin-products',
        meta: {
          title: 'Products',
          requiresAuthAdmin: true
        },
        component: () => import('./views/admin/products/Products.vue')
      },
      {
        path: '/admin/product/add',
        name: 'admin-product-add',
        meta: {
          title: 'Add Product',
          requiresAuthAdmin: true
        },
        component: () => import('./views/admin/products/AddProduct.vue')
      },
      {
        path: '/admin/product/edit/:id',
        name: 'admin-product-edit',
        meta: {
          title: 'Edit Product',
          requiresAuthAdmin: true
        },
        component: () => import('./views/admin/products/EditProduct.vue')
      },
      {
        path: '/admin/product/delete/:id',
        name: 'admin-product-delete',
        meta: {
          title: 'Delete Product',
          requiresAuthAdmin: true
        },
        component: () => import('./views/admin/products/DeleteProduct.vue')
      },
      {
        path: '/admin/orders',
        name: 'admin-orders',
        meta: {  
          title: 'Orders',
          requiresAuthAdmin: true
        },
        component: () => import('./views/admin/orders/Orders.vue')
      },

      {
        path: '/admin/order/:id',
        name: 'admin-order',
        meta: {  
          title: 'Order',
          requiresAuthAdmin: true
        },
        component: () => import('./views/admin/orders/Order.vue')
      },
      {
        path: '/admin/withdraws',
        name: 'admin-withdraws',
        meta: {  
          title: 'Withdraws',
          requiresAuthAdmin: true
        },
        component: () => import('./views/admin/withdraw/Withdraws.vue')
      },
      {
        path: '/admin/withdraw/:id',
        name: 'admin-withdraws',
        meta: {  
          title: 'Withdraws',
          requiresAuthAdmin: true
        },
        component: () => import('./views/admin/withdraw/Withdraw.vue')
      },
     
    ]
  },

  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        meta: {
          title: 'Login',
          requiresVisitor: true
        },
        component: () => import('./views/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        meta: {
          title: 'Register',
          requiresVisitor: true
        },
        component: () => import('./views/Register.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/product/:id/:slug',
        name: 'product',
        meta: {
          title: 'product',
          requiresAuth: true
        },
        component: () => import('./views/Product.vue')
      },

      {
        path: '/checkout',
        name: 'checkout',
        meta: {
          title: 'Checkout',
          requiresAuth: true
        },
        component: () => import('./views/Checkout.vue')
      },

      {
        path: '/order-success',
        name: 'order-success',
        meta: {
          title: 'Order Success',
          requiresAuth: true
        },
        component: () => import('./views/OrderSuccess.vue')
      },
      
      {
        path: '*',
        name: 'not-found',
        meta: {
          title: '404',
        },
        component: () => import('./views/404.vue')
      }
    ]
  }
] 

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
});

const DEFAULT_TITLE = 'ka oban';
router.afterEach((to) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({path: '/login'})
    } else {
      next()
    }

  }else if(to.matched.some(record => record.meta.requiresVisitor)){
      if (store.getters.isAuthenticated && !store.getters.isAdmin) {
          next({path: '/dashboard'})
      }else if(store.getters.isAuthenticated && store.getters.isAdmin) {
          next({path: '/admin/dashboard'})
      } else {
          next()
      }
  }else if(to.matched.some(record => record.meta.requiresAuthAdmin)){
    if (!store.getters.isAuthenticated || !store.getters.isAdmin) {
        next({path: '/login'})
    } else if(store.getters.isAuthenticated && !store.getters.isAdmin) {
        next({path: '/dashboard'})
    }else {
      next()
    }
  } else if(to.matched.some(record => record.meta.requiresAuthCustomer)){
    if (!store.getters.isAuthenticated) {
        next({path: '/login'})
    } else if(store.getters.isAuthenticated && store.getters.isAdmin) {
        next({path: '/admin/dashboard'})
    }else {
      next()
    }
  }else {
    next() // make sure to always call next()!
  }
})

export default router;
