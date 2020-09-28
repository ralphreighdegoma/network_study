"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _index = _interopRequireDefault(require("./store/index"));

var _vueWysiwyg = _interopRequireDefault(require("vue-wysiwyg"));

var _argonDashboard = _interopRequireDefault(require("./plugins/argon-dashboard"));

var _elementUi = _interopRequireDefault(require("element-ui"));

require("element-ui/lib/theme-chalk/index.css");

var _vueCountryRegionSelect = _interopRequireDefault(require("vue-country-region-select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].config.productionTip = false;

_vue["default"].use(_vueCountryRegionSelect["default"]);

_vue["default"].use(_argonDashboard["default"]);

_vue["default"].use(_vueWysiwyg["default"], {}); // config is optional. more below


_vue["default"].use(_elementUi["default"]); // global variable


_vue["default"].prototype.$serverUrl = "http://networking.test";
window.axios = require('axios');
window.axios.defaults.withCredentials = true;
window.axios.defaults.baseURL = "http://networking.test";
window._ = require('lodash');
new _vue["default"]({
  router: _router["default"],
  store: _index["default"],
  created: function created() {
    var _this = this;

    window.axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (error.response.status === 401) {
        _this.$store.dispatch('logout');
      }

      return Promise.reject(error);
    });
  },
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');