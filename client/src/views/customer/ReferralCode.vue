<template>
    <div>
      <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center">
            <!-- Mask -->
            <span class="mask bg-gradient-danger"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center justify-content-center">
                <div class="row">
                    <div class="col-lg-12 col-md-10">
                   
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7 mb-5">
            <div class="row justify-content-center">

                <div class="col-lg-12 order-xl-1">
                    <card shadow>
                        <template>
                            <div class="text-center">

                                <template v-if="getreferralcode && !getreferralcode.order">
                                    <h4 class="mb-4">It seems like you don't have any order yet, please make an order first to enable referral.</h4>
                                    <router-link to="/products" class="btn btn-primary btn-lg">Click Here</router-link>
                                </template>
                                <template v-else>
                                    <template v-if="getreferralcode && getreferralcode.referral">
                                         <div class="d-flex justify-content-center align-items-center flex-column">
                                            <h3 class="mb-4">Copy Your Generated Referral Code</h3>
                                            <h1 class="h1 referral-code">{{getreferralcode.referral.code}}</h1>
                                            <h4 class="mt-4 mb-4">Or</h4>

                                            <p class="referral-code-link">{{`${url}/register?referral=${getreferralcode.referral.code}`}}</p>
                                            
                                        </div>
                                    </template>
                                    <template v-else>
                                         <h3 class="mb-4">It seems like you don't have a referral code yet</h3>
                                        <button @click="generateCode" class="btn btn-primary btn-lg">Generate Referral Code</button>
                                       
                                    </template>
                                    
                                </template>
                            </div>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            url: location.origin
        }
    },
    computed: {
        getreferralcode(){
            return this.$store.getters.getreferralcode;
        }
    },
    methods: {
        generateCode(){
            this.$store.dispatch('generateCode').then(() => {
                this.$notify({
                    title: 'Success',
                    message: `Referral code has been generated successfully.`,
                    type: 'success'
                });
            }).catch(err => console.log(err));
        }
    },
    mounted(){
        this.$store.dispatch('getGeneratedCode');
    }
}
</script>

