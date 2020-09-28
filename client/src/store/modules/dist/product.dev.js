"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _router = _interopRequireDefault(require("../../router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var state = {
  products: null,
  product: null
};
var mutations = {
  ADD_PRODUCT: function ADD_PRODUCT(state, payload) {
    state.products.data = [payload].concat(_toConsumableArray(state.products.data));
  },
  EDIT_PRODUCT: function EDIT_PRODUCT(state, payload) {
    console.log('state.products', state.products);
    state.products.data.map(function (product) {
      return product.id === payload.id ? payload : product;
    });
  },
  DELETE_PRODUCT: function DELETE_PRODUCT(state, payload) {
    state.products.data.filter(function (product) {
      return product.id != payload.id;
    });
  },
  PRODUCTS: function PRODUCTS(state, payload) {
    state.products = payload;
  },
  PRODUCT: function PRODUCT(state, payload) {
    state.product = payload;
  }
};
var actions = {
  fetchAllProducts: function fetchAllProducts(_ref) {
    var commit = _ref.commit;
    window.axios.get("/api/admin/products").then(function (res) {
      commit('PRODUCTS', res.data);
    })["catch"](function (err) {
      console.log(err.response.data.message);
    });
  },
  fetchAllCustomerProducts: function fetchAllCustomerProducts(_ref2) {
    var commit = _ref2.commit;
    window.axios.get("/api/customer/products").then(function (res) {
      commit('PRODUCTS', res.data);
    })["catch"](function (err) {
      console.log(err.response.data.message);
    });
  },
  fetchProduct: function fetchProduct(_ref3, id) {
    var commit = _ref3.commit;
    return new Promise(function (resolve, reject) {
      window.axios.get("/api/product/".concat(id), {
        id: id
      }).then(function (res) {
        commit('PRODUCT', res.data);
        resolve(res.data);
      })["catch"](function (err) {
        reject(err);
        console.log(err.response.data.message);
      });
    });
  },
  addProduct: function addProduct(_ref4, payload) {
    var commit = _ref4.commit;
    return new Promise(function (resolve, reject) {
      window.axios.post("/api/admin/products", payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (res) {
        console.log('add success', res);
        commit('ADD_PRODUCT', res.data);
        resolve(res.data);
      })["catch"](function (err) {
        console.log('add error', err.response.data.errors);
        reject(err.response.data.errors);
      });
    });
  },
  updateProduct: function updateProduct(_ref5, payload) {
    var commit = _ref5.commit;
    return new Promise(function (resolve, reject) {
      window.axios.post("/api/admin/products/".concat(payload.id), payload.data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (res) {
        console.log('add success', res);
        commit('EDIT_PRODUCT', payload);
        resolve(res.data);
      })["catch"](function (err) {
        console.log('update error', err.response.data.errors);
        reject(err.response.data.errors);
      });
    });
  },
  editProduct: function editProduct(_ref6, id) {
    var commit = _ref6.commit;
    return new Promise(function (resolve, reject) {
      window.axios.get("/api/admin/products/".concat(id, "/edit")).then(function (res) {
        commit('PRODUCT', res.data);
        resolve(res.data);
      })["catch"](function (err) {
        reject(err);
        console.log(err.response.data.message);
      });
    });
  },
  deleteProduct: function deleteProduct(_ref7, payload) {
    var commit = _ref7.commit;
    return new Promise(function (resolve, reject) {
      window.axios["delete"]("/api/admin/products/".concat(payload.id), payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (res) {
        commit('DELETE_PRODUCT', res.data);
        resolve(res.data);

        _router["default"].push('/admin/products');
      })["catch"](function (err) {
        console.log('add error', err.message);
        reject(err);
      });
    });
  }
};
var getters = {
  products: function products(state) {
    console.log(state.products);
    return state.products;
  },
  product: function product(state) {
    return state.product;
  }
};
var _default = {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
exports["default"] = _default;