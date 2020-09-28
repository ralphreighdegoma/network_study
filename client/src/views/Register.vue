<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card shadow border-0">
                <div class="card-body px-lg-5 pt-3 pb-5">
                    <div class="text-center text-muted mb-4">
                        <img class="company-logo" src="/img/logo.png" />
                        <h2>Register</h2>
                        <small>Register with credentials</small>
                    </div>
                   <base-alert type="danger" class="d-flex justify-content-between align-items-center" v-if="errors.length > 0">
                        <div class="d-flex flex-column">
                            <span class="alert-inner--text mb-2" v-for="(error, i) in errors" :key="i"><strong>Oops!</strong> {{error}}</span>
                        </div>
                        <button type="button" class="close" @click="errors = []">
                            <span>&times;</span>
                        </button>
                    </base-alert>
                    <form role="form" class="mt-3">
                        <div v-if="!next">
                            <base-input class="mb-3"
                                    placeholder="FullName"
                                    v-model="model.name">
                            </base-input>

                            <base-input class="mb-3"
                                        placeholder="Email"
                                        v-model="model.email">
                            </base-input>
                            <base-input class="mb-3"
                                        placeholder="Phone +63(999)-999-9999"
                                        v-mask="'+63 (###)-###-####'"
                                        v-model="model.phone">
                            </base-input>
                             <base-input class=" mb-3"
                                        placeholder="Address"
                                        v-model="model.address">
                            </base-input>
                            <base-input class=" mb-3"
                                        placeholder="Referral Code"
                                        v-model="model.referral_code">
                            </base-input>
                            <div class="text-muted text-center">
                                <small>Already have an account? <router-link to="/login" class="text-danger">Login</router-link></small>
                            </div>
                            <div class="row m-2 mr-2 justify-content-end align-items-center">
                                <base-button type="danger" class="mt-4" @click="next = true">Next</base-button>
                            </div>
                        </div>
                        <div v-else>
                             <base-input alternative class=""
                                    placeholder="Password"
                                    type="password"
                                    v-model="model.password">
                            </base-input>
                            <base-input alternative class=""
                                        placeholder="Confirm Password"
                                        type="password"
                                        v-model="model.password_confirmation">
                            </base-input>

                            <div class="text-muted text-center">
                                <small>Already have an account? <router-link to="/login" class="text-danger">Login</router-link></small>
                            </div>

                            <!-- <div class="row my-4">
                                <div class="col-12">
                                    <base-checkbox class="custom-control-alternative">
                                        <span class="text-muted">I agree with the <a href="#!">Privacy Policy</a></span>
                                    </base-checkbox>
                                </div>
                            </div> -->
                            <div class="row justify-content-between align-items-center">
                                <div class="">
                                    <base-button type="default" class="mt-4 ml-3 mr-3" @click="next = false">Back</base-button>
                                </div>
                                <div class="">
                                    <base-button type="danger" class="mt-4 ml-3 mr-3" @click="register">Register <img v-if="loading" width="25" class="ml-1 mt--2" src="/img/loading.gif" /></base-button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
          
        </div>
    </div>
</template>
<script>
  export default {
    name: 'register',
    data() {
      return {
        model: {
          name: '',
          email: '',
          phone: '',
          address: '',
          referral_code: '',
          password: '',
          password_confirmation: '',
        },
         errors: [],
         next: false,
         loading: false
      }
    },
    methods :{
        register() {
            let vm =  this;
            this.loading = true;
            window.axios.get('/sanctum/csrf-cookie').then(() => {
                console.log(this.model)
                this.$store.dispatch('register', this.model).then((res) => {
                    if(res.status === 'error'){
                        vm.errors = res.errors
                    }else {
                        vm.errors = [];
                        vm.model.name = "";
                        vm.model.email = "";
                        vm.model.address = "";
                        vm.model.phone = "";
                        vm.model.referral_code = "";
                        vm.model.password = "";
                        vm.model.password_confirmation = "";
                    }
                    this.loading = false
                }).catch(err => {
                    this.errors = err
                    this.loading = false
                });
            }).catch(err => {
                console.log(err)
                this.loading = false
            });
        }
    },
    mounted(){
        if(this.$route.query.referral){
            this.model.referral_code = this.$route.query.referral;
        }
    }
  }
</script>
<style>
</style>
