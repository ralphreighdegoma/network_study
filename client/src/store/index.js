import Vue from 'vue';
import Vuex from 'vuex';
// import router from '../router';
import user from './modules/user';
import product from './modules/product';
import order from './modules/order';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        dataCount: null,
        data_orders_analytics: null,
        data_sales_analytics: null
    },

    mutations: {
        DATA_COUNT(state, payload){
              state.dataCount = payload;  
        },
        GET_ALL_ORDERS_ANALYTICS(state, payload){
            state.data_orders_analytics = payload;  
        },
        GET_ALL_SALES_ANALYTICS(state, payload){
            state.data_sales_analytics = payload;  
        }
    },

    actions: {
        analyticsCount({commit}){
            return new Promise((resolve, reject) => {
                window.axios.get('/api/analytics-count')
                .then((res) => {
                    commit('DATA_COUNT', res.data);
                    resolve(res.data);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        fetchAllSalesAnalytics({commit}, payload){
            return new Promise((resolve, reject) => {
                window.axios.get(`/api/fetch-all-sales-analytics`, payload)
                .then((res) => {
                    resolve(res.data);
                    commit('GET_ALL_SALES_ANALYTICS', res.data);
                }).catch((err) => {
                    console.log(err); 
                    reject(err);
                });
            });
            
        },
        fetchAllOrdersAnalytics({commit}, payload){
            return new Promise((resolve, reject) => {
                window.axios.get(`/api/fetch-all-orders-analytics`, payload)
                .then((res) => {
                    resolve(res.data);
                    commit('GET_ALL_ORDERS_ANALYTICS', res.data);
                }).catch((err) => {
                    console.log(err); 
                    reject(err);
                });
            });
            
        },
    },

    getters: {
        datacount(state){
            return state.dataCount;
        },
        dataSalesAnalytics(state){
            return state.data_sales_analytics;
        },
        dataOrdersAnalytics(state){
            return state.data_orders_analytics;
        }
    },

    modules: {
        user,
        product,
        order
    }

});