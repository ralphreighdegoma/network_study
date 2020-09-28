"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _index = _interopRequireDefault(require("./store/index"));

var _DashboardLayout = _interopRequireDefault(require("@/layout/DashboardLayout"));

var _AuthLayout = _interopRequireDefault(require("@/layout/AuthLayout"));

var _Layout = _interopRequireDefault(require("@/layout/Layout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/',
  redirect: 'dashboard',
  component: _DashboardLayout["default"],
  children: [{
    path: '/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: {
      title: 'Dashboard',
      requiresAuthCustomer: true
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/customer/Dashboard.vue'));
      });
    }
  }, {
    path: '/products',
    name: 'products',
    meta: {
      title: 'Products',
      requiresAuthCustomer: true
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/customer/Products.vue'));
      });
    }
  }, {
    path: '/account',
    name: 'account',
    meta: {
      title: 'Profile',
      requiresAuthCustomer: true
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/customer/UserProfile.vue'));
      });
    }
  }]
}, {
  path: '/',
  redirect: 'admin-dashboard',
  component: _DashboardLayout["default"],
  children: [{
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: {
      title: 'Dashboard',
      requiresAuthAdmin: true
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/admin/Dashboard.vue'));
      });
    }
  }, {
    path: '/admin/account',
    name: 'admin-account',
    meta: {
      title: 'Account',
      requiresAuthAdmin: true
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/admin/UserProfile.vue'));
      });
    }
  }, {
    path: '/admin/products',
    name: 'admin-products',
    meta: {
      title: 'Products',
      requiresAuthAdmin: true
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/admin/products/Products.vue'));
      });
    }
  }, {
    path: '/admin/product/add',
    name: 'admin-product-add',
    meta: {
      title: 'Add Product',
      requiresAuthAdmin: true
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/admin/products/AddProduct.vue'));
      });
    }
  }, {
    path: '/admin/product/edit/:id',
    name: 'admin-product-edit',
    meta: {
      title: 'Edit Product',
      requiresAuthAdmin: true
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/admin/products/EditProduct.vue'));
      });
    }
  }, {
    path: '/admin/product/delete/:id',
    name: 'admin-product-delete',
    meta: {
      title: 'Delete Product',
      requiresAuthAdmin: true
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/admin/products/DeleteProduct.vue'));
      });
    }
  }]
}, {
  path: '/',
  redirect: 'login',
  component: _AuthLayout["default"],
  children: [{
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login',
      requiresVisitor: true
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/Login.vue'));
      });
    }
  }, {
    path: '/register',
    name: 'register',
    meta: {
      title: 'Register',
      requiresVisitor: true
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/Register.vue'));
      });
    }
  }]
}, {
  path: '/',
  component: _Layout["default"],
  children: [{
    path: '/product/:id/:slug',
    name: 'product',
    meta: {
      title: 'product',
      requiresAuth: true
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/Product.vue'));
      });
    }
  }, {
    path: '/checkout',
    name: 'checkout',
    meta: {
      title: 'Checkout',
      requiresAuth: true
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/Checkout.vue'));
      });
    }
  }, {
    path: '*',
    name: 'not-found',
    meta: {
      title: '404'
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/404.vue'));
      });
    }
  }]
}];
var router = new _vueRouter["default"]({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active"
});
var DEFAULT_TITLE = 'ka oban';
router.afterEach(function (to) {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  _vue["default"].nextTick(function () {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});
router.beforeEach(function (to, from, next) {
  if (to.matched.some(function (record) {
    return record.meta.requiresAuth;
  })) {
    if (!_index["default"].getters.isAuthenticated) {
      next({
        path: '/login'
      });
    } else {
      next();
    }
  } else if (to.matched.some(function (record) {
    return record.meta.requiresVisitor;
  })) {
    if (_index["default"].getters.isAuthenticated && !_index["default"].getters.isAdmin) {
      next({
        path: '/dashboard'
      });
    } else if (_index["default"].getters.isAuthenticated && _index["default"].getters.isAdmin) {
      next({
        path: '/admin/dashboard'
      });
    } else {
      next();
    }
  } else if (to.matched.some(function (record) {
    return record.meta.requiresAuthAdmin;
  })) {
    if (!_index["default"].getters.isAuthenticated || !_index["default"].getters.isAdmin) {
      next({
        path: '/login'
      });
    } else if (_index["default"].getters.isAuthenticated && !_index["default"].getters.isAdmin) {
      next({
        path: '/dashboard'
      });
    } else {
      next();
    }
  } else if (to.matched.some(function (record) {
    return record.meta.requiresAuthCustomer;
  })) {
    if (!_index["default"].getters.isAuthenticated) {
      next({
        path: '/login'
      });
    } else if (_index["default"].getters.isAuthenticated && _index["default"].getters.isAdmin) {
      next({
        path: '/admin/dashboard'
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});
var _default = router;
exports["default"] = _default;