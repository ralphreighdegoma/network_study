<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card shadow">
                    <div class="card-body px-lg-5 pt-3 pb-5">
                        <div class="text-center text-muted mb-4">
                            <img class="company-logo" src="/img/logo.png" />
                            <h2>Login</h2>
                            <small>login with credentials</small>
                        </div>
                        <base-alert type="danger" class="d-flex justify-content-between align-items-center" v-if="errors.length > 0">
                           <div class="d-flex flex-column">
                                <span class="alert-inner--text mb-2" v-for="(error, i) in errors" :key="i"><strong>Oops!</strong> {{error}}</span>
                           </div>
                            <button type="button" class="close" @click="errors = []">
                                <span>&times;</span>
                            </button>
                        </base-alert>
                        <form role="form">
                            <base-input class="mb-3"
                                        placeholder="Email"
                                        v-model="model.email">
                            </base-input>

                            <base-input class=""
                                        placeholder="Password"
                                        type="password"
                                        v-model="model.password">
                            </base-input>
                            <div class="text-muted text-center">
                                <small>Create an account? Register <router-link to="/register" class="text-danger">here</router-link></small>
                            </div>
                            <div class="text-center">
                                <base-button type="danger" class="mt-4 btn-block" @click="login">Login <img v-if="loading" width="25" class="ml-1 mt--2" src="/img/loading.gif" /></base-button>
                            </div>
                        </form>
                    </div>
                </div>
               
            </div>
        </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
      return {
        model: {
          email: '',
          password: '',
        },
        errors:[],
        loading: false
      }
    },
    methods: {
        login(){
            this.loading = true;
            let vm =  this;
            window.axios.get('/sanctum/csrf-cookie').then(() => {
                this.$store.dispatch('login', this.model).then((res) => {
                    console.log(res);
                    if(res.status === 'error'){
                        vm.errors = res.errors
                    }else {
                        vm.errors = [];
                        vm.model.email = "";
                        vm.model.password = "";
                    }
                    this.loading = false;
                }).catch(err =>{
                     this.errors = err;
                     this.loading = false;
                });
                
            }).catch(err => {
                console.log(err)
                this.loading = false;
            });
        },
    }
  }
</script>
<style>
</style>
