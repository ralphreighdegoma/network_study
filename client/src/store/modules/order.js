import router from '../../router';

const state  = {
    orders: [],
    order: null,
    customer_orders: null,
    customer_order: null
}

const mutations = {
    CREATE_ORDER(state, payload){
        state.orders = [payload, ...state.orders];
    },
    CUSTOMER_ORDERS(state, payload){
        state.customer_orders = payload;
    },
    CUSTOMER_ORDER(state, payload){
        state.customer_order = payload;
    },

    ORDERS(state, payload){
        state.orders = payload;
    },

    ORDER(state, payload){
        state.order = payload;
    },
    UPDATE_ORDER(state, payload){
        state.order =  payload;
        state.orders.data.map((order) => order.id === payload.id ? payload : order);
    }
}

const actions = {
    createOrder({commit}, payload){
        return new Promise((resolve, reject) => {
            window.axios.post(`/api/customer/create-order`, payload, {headers: {'Content-Type': 'multipart/form-data'}})
            .then((res) => {
                commit('CREATE_ORDER', res.data);
                console.log(res.data);
                resolve(res.data);
                router.push('/order-success');
            }).catch((err) => {
                reject(err);
            });
        });
    },

    fetchCustomerOrders({commit}){
        window.axios.get(`/api/customer/orders`)
        .then((res) => {
            commit('CUSTOMER_ORDERS', res.data);
        }).catch((err) => {
            console.log(err.response.data.message);
        });
    },
    fetchCustomerOrderDetail({commit}, id){
        window.axios.get(`/api/customer/order/${id}`)
        .then((res) => {
            commit('CUSTOMER_ORDER', res.data);
            console.log('order', res)
        }).catch((err) => {
            console.log(err.response.data.message);
        });
    },
    fetchOrderDetail({commit}, id){
        window.axios.get(`/api/admin/orders/${id}`)
        .then((res) => {
            commit('ORDER', res.data);
            console.log('order', res)
        }).catch((err) => {
            console.log(err.response.data.message);
        });
    },
    fetchOrders({commit}){
        window.axios.get(`/api/admin/orders `)
        .then((res) => {
            commit('ORDERS', res.data);
            console.log('orders', res)
        }).catch((err) => {
            console.log(err.response.data.message);
        });
    },
    updateOrder({commit}, payload){
        return new Promise((resolve, reject) => {
            window.axios.put(`/api/admin/orders/${payload.id}`, payload)
            .then((res) => {
                commit('UPDATE_ORDER', res.data);
                resolve(res.data);
            }).catch((err) => {
                console.log('add error', err.response.data.errors);
                reject(err.response.data.errors);
            });
        });
    }
}

const getters = {
    orders(state){
        return state.orders;
    },
    order(state){
        return state.order;
    },
    customer_orders(state){
        return state.customer_orders;
    },
    customer_order(state){
        return state.customer_order;
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}