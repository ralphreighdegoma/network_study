import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/index';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
    },

    mutations: {
        
    },

    actions: {
  
    },

    getters: {

    },

    modules: {
        user,
    }

});