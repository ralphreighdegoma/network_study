import router from '../../router';

const state  = {
    products: null,
    product: null,
}

const mutations = {
    ADD_PRODUCT(state, payload){
        state.products.data = [payload, ...state.products.data]
    },
    EDIT_PRODUCT(state, payload){
        console.log('state.products', state.products);
        state.products.data.map((product) => product.id === payload.id ? payload : product)
    },
    DELETE_PRODUCT(state, payload){
        state.products.data.filter((product) => product.id != payload.id)
    },
    PRODUCTS(state, payload){
        state.products = payload;
    },
    PRODUCT(state, payload){
        state.product = payload;
    }
}

const actions = {
    fetchAllProducts({commit}){
            window.axios.get(`/api/admin/products`)
            .then((res) => {
                commit('PRODUCTS', res.data);
            }).catch((err) => {
                console.log(err.response.data.message);
            });
        
    },

    fetchAllCustomerProducts({commit}){
        window.axios.get(`/api/customer/products`)
        .then((res) => {
            commit('PRODUCTS', res.data);
        }).catch((err) => {
            console.log(err.response.data.message);
        });
    },
    fetchProduct({commit}, id){
        return new Promise((resolve, reject) => {
            window.axios.get(`/api/product/${id}`, {id})
            .then((res) => {
                commit('PRODUCT', res.data);
                resolve(res.data);
            }).catch((err) => {
                reject(err);
                console.log(err.response.data.message);
            });
        });
         
        
    },
    addProduct({commit}, payload){
        return new Promise((resolve, reject) => {
            window.axios.post(`/api/admin/products`, payload, {headers: {'Content-Type': 'multipart/form-data'}})
            .then((res) => {
                console.log('add success', res);
                commit('ADD_PRODUCT', res.data);
                resolve(res.data);
            }).catch((err) => {
                console.log('add error', err.response.data.errors);
                reject(err.response.data.errors);
            });
        });
    },

    updateProduct({commit}, payload){
        return new Promise((resolve, reject) => {
            window.axios.post(`/api/admin/products/${payload.id}`, payload.data, {headers: {'Content-Type': 'multipart/form-data'}})
            .then((res) => {
                console.log('add success', res);
                commit('EDIT_PRODUCT', payload);
                resolve(res.data);

            }).catch((err) => {
                console.log('update error', err.response.data.errors);
                reject(err.response.data.errors);
            });
        });
    },
    editProduct({commit}, id){
        return new Promise((resolve, reject) => {
            window.axios.get(`/api/admin/products/${id}/edit`)
            .then((res) => {
                commit('PRODUCT', res.data);
                resolve(res.data);
            }).catch((err) => {
                reject(err);
                console.log(err.response.data.message);
            });
        });
         
        
    },
    deleteProduct({commit}, payload){
        return new Promise((resolve, reject) => {
            window.axios.delete(`/api/admin/products/${payload.id}`, payload, {headers: {'Content-Type': 'multipart/form-data'}})
            .then((res) => {
                commit('DELETE_PRODUCT', res.data);
                resolve(res.data);
                router.push('/admin/products');
            }).catch((err) => {
                console.log('add error', err.message);
                reject(err);
            });
        });
    }

}

const getters = {
    products(state){
        console.log(state.products);
        return state.products;
    },
    product(state){
        return state.product;
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}