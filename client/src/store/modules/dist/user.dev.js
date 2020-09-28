"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _router = _interopRequireDefault(require("../../router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  authenticated: localStorage.getItem('authenticated') || null,
  user: null,
  isAdmin: localStorage.getItem('authenticatedAdmin') || null
};
var mutations = {
  AUTHENTICATED: function AUTHENTICATED(state, payload) {
    if (payload.user_type === 'admin') {
      localStorage.setItem('authenticated', true);
      localStorage.setItem('authenticatedAdmin', true);
      state.isAdmin = true;
      state.authenticated = true;
    } else {
      localStorage.setItem('authenticated', true);
      state.authenticated = true;
    }
  },
  FETCH_AUTH_USER: function FETCH_AUTH_USER(state, payload) {
    state.user = payload;
  }
};
var actions = {
  fetchAuthUser: function fetchAuthUser(_ref) {
    var commit = _ref.commit,
        state = _ref.state;

    if (state.authenticated) {
      window.axios.get("/api/user").then(function (res) {
        commit('FETCH_AUTH_USER', res.data);
      })["catch"](function (err) {
        console.log(err.response.data.message);
      });
    }
  },
  // authentication
  login: function login(_ref2, payload) {
    var commit = _ref2.commit;
    return new Promise(function (reject) {
      window.axios.post("/login", payload).then(function (res) {
        if (res.data.user_type && res.data.user_type === 'admin') {
          commit('AUTHENTICATED', res.data);

          _router["default"].push('/admin/dashboard');
        } else {
          console.log('login dashboard');
          commit('AUTHENTICATED', res.data);

          _router["default"].push('/dashboard');
        }
      })["catch"](function (err) {
        var errors = [];
        Object.keys(err.response.data.errors).forEach(function (item) {
          // console.log(item); 
          if (item === 'email') errors.push(err.response.data.errors[item][0]);
          if (item === 'password') errors.push(err.response.data.errors[item][0]);
        });
        reject({
          status: 'error',
          errors: errors
        });
      });
    });
  },
  register: function register(_ref3, payload) {
    var commit = _ref3.commit;
    return new Promise(function (reject) {
      window.axios.post("/register", payload).then(function (res) {
        console.log(res);
        commit('AUTHENTICATED', true);

        _router["default"].push('/dashboard');
      })["catch"](function (err) {
        console.log(err.response.data.errors);
        var errors = [];
        Object.keys(err.response.data.errors).forEach(function (item) {
          // console.log(item); 
          if (item === 'name') errors.push(err.response.data.errors[item][0]);
          if (item === 'email') errors.push(err.response.data.errors[item][0]);
          if (item === 'password') errors.push(err.response.data.errors[item][0]);
          if (item === 'address') errors.push(err.response.data.errors[item][0]);
          if (item === 'phone') errors.push(err.response.data.errors[item][0]);
        });
        reject({
          status: 'error',
          errors: errors
        });
      });
    });
  },
  logout: function logout(_ref4) {
    var state = _ref4.state;

    if (state.authenticated) {
      window.axios.post("/logout").then(function (res) {
        console.log(res);
        localStorage.removeItem('authenticated');
        localStorage.removeItem('authenticatedAdmin');
        state.authenticated = null;
        state.user = null;
        state.isAdmin = null;

        _router["default"].push('/login');
      })["catch"](function (err) {
        localStorage.removeItem('authenticated');
        localStorage.removeItem('authenticatedAdmin');
        state.authenticated = null;
        state.user = null;
        state.isAdmin = null;

        _router["default"].push('/login');

        console.log(err);
      });
    }
  },
  editAccount: function editAccount(_ref5, payload) {
    var state = _ref5.state;

    if (state.authenticated) {
      return new Promise(function (resolve, reject) {
        window.axios.post("/api/edit-account", payload).then(function (res) {
          resolve({
            status: 'success',
            data: res.data
          });
        })["catch"](function (err) {
          console.log(err.response.data.errors);
          reject({
            status: 'error',
            errors: err.response.data.errors
          });
        });
      });
    }
  },
  changePassword: function changePassword(_ref6, payload) {
    var state = _ref6.state;

    if (state.authenticated) {
      return new Promise(function (resolve, reject) {
        window.axios.post("/api/change-password", payload).then(function (res) {
          resolve({
            status: 'success',
            data: res.data
          });
        })["catch"](function (err) {
          console.log(err.response.data.errors);
          reject({
            status: 'error',
            errors: err.response.data.errors
          });
        });
      });
    }
  }
};
var getters = {
  isAuthenticated: function isAuthenticated(state) {
    return state.authenticated !== null;
  },
  isAdmin: function isAdmin() {
    return state.isAdmin !== null;
  },
  authUser: function authUser(state) {
    console.log(state.user);
    return state.user;
  }
};
var _default = {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
exports["default"] = _default;