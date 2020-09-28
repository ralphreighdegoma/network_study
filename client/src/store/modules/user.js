import router from '../../router';

const state  = {
    authenticated: localStorage.getItem('authenticated') || null,
    user: null,
    isAdmin: localStorage.getItem('authenticatedAdmin') || null,
    referral_code: null,
    network: null,
    ewallet: null,
    withdraws: [],
    all_withdraw: [],
    withdraw: null
}

const mutations = {
    AUTHENTICATED(state, payload){
        if(payload.user_type === 'admin'){
            localStorage.setItem('authenticated', true);
            localStorage.setItem('authenticatedAdmin', true);
            state.isAdmin = true
            state.authenticated = true;
        }else {
            localStorage.setItem('authenticated', true);
            state.authenticated = true;
        }
    },
    FETCH_AUTH_USER(state, payload){
        state.user = payload;
    },
    GET_REFERRAL_CODE(state, payload){
        state.referral_code = payload;
    },
    GET_NETWORK(state, payload){
        state.network = payload;
    },
    GET_EWALLET(state, payload){
        state.ewallet = payload;
    },
    WITHDRAWS(state, payload){
        state.withdraws = [...state.withdraws, payload];
    },
    GET_CUSTOMER_WITHDRAWS(state, payload){
        state.withdraws  = payload;
    },
    GET_ALL_WITHDRAWS(state, payload){
        state.all_withdraw  = payload;
    },
    WITHDRAW(state, payload){
        state.withdraw  = payload;
    },
    UPDATE_WITHDRAW(state, payload){
        state.withdraw  = payload;
    }
}

const actions = {
    fetchAuthUser({commit, state}){
        if (state.authenticated) {
            return new Promise((resolve, reject) => {
                window.axios.get(`/api/user`)
                .then((res) => {
                    commit('FETCH_AUTH_USER', res.data);
                    resolve(res.data);
                }).catch((err) => {
                    console.log(err.response.data);
                    reject(err.response.data);
                });
            });
        }
    },
    // authentication
    login({commit}, payload){
        return new Promise((reject) => {
            window.axios.post(`/login`, payload)
            .then(() => {
                window.axios.get(`/api/user`)
                .then((res) => {
                    if(res.data.user_type && res.data.user_type === 'admin'){
                        commit('AUTHENTICATED', res.data);
                        commit('FETCH_AUTH_USER', res.data);
                        router.push('/admin/dashboard');
                    }else {
                        commit('AUTHENTICATED', res.data);
                        commit('FETCH_AUTH_USER', res.data);
                        router.push('/dashboard');
                    }
                }).catch((err) => {
                    console.log(err.response.data.message);
                });
                
            }).catch((err) => {
                let errors = [];
                Object.keys(err.response.data.errors).forEach(function (item) {
                    // console.log(item); 
                    if (item === 'email') errors.push(err.response.data.errors[item][0]);
                    if (item === 'password') errors.push(err.response.data.errors[item][0]);
                });
                reject({status: 'error', errors});
            });
        });
   },

    register({commit}, payload){
        return new Promise((reject) => {
            window.axios.post(`/register`, payload)
            .then((res) => {
                console.log(res);
                commit('AUTHENTICATED', true);
                router.push('/dashboard');
            }).catch((err) => {
                console.log(err.response.data.errors); 
                let errors = [];
                Object.keys(err.response.data.errors).forEach(function (item) {
                    // console.log(item); 
                    if (item === 'name') errors.push(err.response.data.errors[item][0]);
                    if (item === 'email') errors.push(err.response.data.errors[item][0]);
                    if (item === 'password') errors.push(err.response.data.errors[item][0]);
                    if (item === 'address') errors.push(err.response.data.errors[item][0]);
                    if (item === 'phone') errors.push(err.response.data.errors[item][0]);
                });
        
                reject({status: 'error', errors});
            });
        });
    },
    logout({state}){
        if(state.authenticated){
            window.axios.post(`/logout`)
            .then((res) => {    
                console.log(res)
                localStorage.removeItem('authenticated');
                localStorage.removeItem('authenticatedAdmin');
                state.authenticated = null;
                state.user = null;
                state.isAdmin = null;
                router.push('/login');

            }).catch((err) => {
                localStorage.removeItem('authenticated');
                localStorage.removeItem('authenticatedAdmin');
                state.authenticated = null;
                state.user = null;
                state.isAdmin = null;
                router.push('/login');
                console.log(err);
            });
        }
   },
   editAccount({state}, payload){
        if (state.authenticated) {
            return new Promise((resolve, reject) => {
                window.axios.post(`/api/edit-account`, payload, {headers: {'Content-Type': 'multipart/form-data'}})
                .then((res) => {
                    resolve({status: 'success', data: res.data});
                }).catch((err) => {
                    console.log(err.response.data.errors); 
                    reject({status: 'error', errors: err.response.data.errors});
                });
            });
           
        }
   },
   changePassword({state}, payload){
    if (state.authenticated) {
        return new Promise((resolve, reject) => {
            window.axios.post(`/api/change-password`, payload)
            .then((res) => {
                resolve({status: 'success', data: res.data});
            }).catch((err) => {
                console.log(err.response.data.errors); 
        
                reject({status: 'error', errors: err.response.data.errors});
            });
        });
       
    }
   },
   generateCode({state, commit}){
    if (state.authenticated) {
        return new Promise((resolve, reject) => {
            window.axios.post(`/api/generate-code`)
            .then((res) => {
                resolve({status: 'success', data: res.data});
                commit('GET_REFERRAL_CODE', res.data);
            }).catch((err) => {
                console.log(err.response.data); 
                reject({status: 'error', errors: err.response.data.error});
            });
        });
       
    }
   },
   getGeneratedCode({state, commit}){
    if (state.authenticated) {
        return new Promise((resolve, reject) => {
            window.axios.get(`/api/get-generated-referral-code`)
            .then((res) => {
                resolve({status: 'success', data: res.data});
                commit('GET_REFERRAL_CODE', res.data.referral);
            }).catch((err) => {
                console.log(err.response.data); 
                reject({status: 'error', errors: err.response.data});
            });
        });
       
    }
   },
   sendWithdrawRequest({state, commit}, payload){
    if (state.authenticated) {
        return new Promise((resolve, reject) => {
            window.axios.post(`/api/request-withdraw`, payload)
            .then((res) => {
                resolve(res.data);
                commit('WITHDRAWS', res.data);
            }).catch((err) => {
                console.log(err.response.data); 
                reject(err.response.data.errors);
            });
        });
       
    }
   },
   fetchNetwork({state, commit}){
    if (state.authenticated) {
        return new Promise((resolve, reject) => {
            window.axios.get(`/api/customer/network`)
            .then((res) => {
                resolve(res.data);
                commit('GET_NETWORK', res.data);
            }).catch((err) => {
                console.log(err); 
                reject(err);
            });
        });
    }
   },

   fetchEwallet({state, commit}){
    if (state.authenticated) {
        return new Promise((resolve, reject) => {
            window.axios.get(`/api/customer/ewallet`)
            .then((res) => {
                resolve(res.data);
                commit('GET_EWALLET', res.data);
            }).catch((err) => {
                console.log(err); 
                reject(err);
            });
        });
    }
   },
   fetchCustomerWithdraws({state, commit}){
    if (state.authenticated) {
        return new Promise((resolve, reject) => {
            window.axios.get(`/api/customer/fetch-withdraws`)
            .then((res) => {
                resolve(res.data);
                commit('GET_CUSTOMER_WITHDRAWS', res.data);
            }).catch((err) => {
                console.log(err); 
                reject(err);
            });
        });
    }
   },
   fetchAllWithdraw({state, commit}){
    if (state.authenticated) {
        return new Promise((resolve, reject) => {
            window.axios.get(`/api/customer/fetch-all-withdraw`)
            .then((res) => {
                resolve(res.data);
                commit('GET_ALL_WITHDRAWS', res.data);
            }).catch((err) => {
                console.log(err); 
                reject(err);
            });
        });
    }
   },

   updateWithdraw({state, commit}, payload){
    if (state.authenticated) {
        return new Promise((resolve, reject) => {
            window.axios.post(`/api/customer/update-withdraw/${payload.id}`, payload)
            .then((res) => {
                resolve(res.data);
                commit('UPDATE_WITHDRAW', res.data);
            }).catch((err) => {
                console.log(err); 
                reject(err.response.data.errors);
            });
        });
    }
   },
   fetchWithdrawDetail({state, commit}, id){
    if (state.authenticated) {
        return new Promise((resolve, reject) => {
            window.axios.get(`/api/customer/fetch-withdraw-detail/${id}`)
            .then((res) => {
                resolve(res.data);
                commit('WITHDRAW', res.data);
            }).catch((err) => {
                console.log(err); 
                reject(err);
            });
        });
    }
   },
}

const getters = {
    isAuthenticated(state){
        return state.authenticated !== null;
    },
    isAdmin(){
        return state.isAdmin !== null;
    },
    authUser(state){
        console.log(state.user)
        return state.user;
    },
    getreferralcode(state){
        return state.referral_code;
    },
    fetchEwallet(state){
        return state.ewallet;
    },
    fetchCustomerWithdraws(state){
        return state.withdraws;
    },
    fetchAllWithdraw(state){
        return state.all_withdraw;
    },
    fetchWithdrawDetail(state){
        return state.withdraw;
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}