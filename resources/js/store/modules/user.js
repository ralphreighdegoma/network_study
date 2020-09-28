import router from '../../router/index';

const state  = {
    token: localStorage.getItem('token') || null,
    expiration: localStorage.getItem('token_expired') || null,
    user: null,
    url: `http://tienda.test/api`
}

const mutations = {
    SET_TOKEN(state, payload){
        localStorage.setItem('token', payload.access_token);
        state.token = payload.access_token;
        localStorage.setItem('token_expired', payload.expires_in);
        state.expiration = payload.expires_in;
    },
    FETCH_AUTH_USER(state, payload){
        state.user = payload;
    },
}

const actions = {
    fetchAuthUser({commit, state}, payload){
        if (state.token) {
            window.axios.get(`${state.url}/user`, {headers:{'Authorization':'Bearer ' + state.token }})
            .then((res) => {
                commit('FETCH_AUTH_USER', res.data);
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    // authentication
    login({commit, state}, payload){
        return new Promise((resolve, reject) => {
            window.axios.post(`${state.url}/login`, payload)
            .then((res) => {
                commit('SET_TOKEN', res.data)
                router.push('/');
            }).catch((err) => {
                reject(err.response.data);
            });
        });
   },

    register({commit, state, dispatch}, payload){
        return new Promise((resolve, reject) => {
            window.axios.post(`${state.url}/register`, payload)
            .then((res) => {
                commit('FETCH_AUTH_USER', res.data);
                dispatch('login', {username: payload.email, password: payload.password});
            }).catch((err) => {
                console.log(err.response); 
                let errors = [];
                Object.keys(err.response.data.errors).forEach(function (item) {
                    // console.log(item); 
                    if (item === 'name') errors.push(err.response.data.errors[item][0]);
                    if (item === 'email') errors.push(err.response.data.errors[item][0]);
                    if (item === 'password') errors.push(err.response.data.errors[item][0]);
                });
        
                reject(errors);
            });
        });
    },
    logout({commit, state, getters}, payload){
        if (getters.isAuthenticated) {
            window.axios.post(`${state.url}/logout`)
            .then((res) => {    

                localStorage.removeItem('token');
                state.token = null;
                localStorage.removeItem('token_expired');
                state.expiration = null;
                state.user = null;
                router.push('/');

            }).catch((err) => {
                localStorage.removeItem('token');
                state.token = null;
                localStorage.removeItem('token_expired');
                state.expiration = null;
                state.user = null;
                router.push('/');
                console.log(err);
            });
        }
       
   }
}

const getters = {
    isAuthenticated(state){
        return state.token !== null;
    },
    isAdmin(state){
        if (state.token !== null) {
            if (state.user) {
                return state.user.admin;
            } 
            return false; 
        }
        return false;
    },
    authUser(state){
        console.log(state.user)
        return state.user;
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}