<template lang="">
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
                    <card shadow type="secondary">
                        <template v-if="withdraw">
                            <div slot="header">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5>Date: {{withdrawDate(withdraw.created_at)}}</h5>
                                    </div>
                                    <div>
                                        <badge v-if="withdraw.status == 'complete'" class="badge-lg" type="success">{{withdraw.status}}</badge>
                                        <badge v-if="withdraw.status == 'verify'" class="badge-lg" type="info">{{withdraw.status}}</badge>
                                        <badge v-if="withdraw.status == 'pending'" class="badge-lg" type="warning">{{withdraw.status}}</badge>
                                        <badge v-if="withdrawstatus == 'reject'" class="badge-lg" type="danger">{{withdraw.status}}</badge>
                                     
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-4 justify-content-between">
                                <div class="col-md-7">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="d-flex">
                                            <el-avatar shape="square" :size="60" :src="withdraw.user.avatar"></el-avatar>
                                            <div class="ml-3">
                                                <h3 class="text-capitalize">{{withdraw.user.name}}</h3 >
                                                <h5>{{withdraw.user.email}}</h5>
                                            </div>
                                        </div>
                                        <div class="text-center">
                                            <h1 class="h1">₱ {{withdraw.ewallet.total_deposit}}</h1>
                                            <h5 class="mt--1">Total Ewallet Balance</h5>
                                        </div>
                                    </div>
                                    <div class="mt-5">
                                        <h4 class="mb-3">Withdraw Details</h4>
                                        <hr class="mt-3">
                                        <div class="mb-3">
                                            <h5><strong class="mr-2">Name:</strong> {{withdraw.name}}</h5>
                                        </div>
                                        <div class="mb-3">
                                            <h5><strong class="mr-2">Address:</strong> {{withdraw.address}}</h5>
                                        </div>
                                        <div class="mb-3">
                                            <h5><strong class="mr-2">Phone:</strong> {{withdraw.phone}}</h5>
                                        </div>
                                        <div class="mb-3">
                                            <h5><strong class="mr-2">Amount:</strong>₱ {{withdraw.amount}}</h5>
                                        </div>
                                        <div class="mb-3">
                                            <h5><strong class="mr-2">Payment Method:</strong> {{withdraw.payment_method}}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                     <base-alert type="danger" class="d-flex justify-content-between align-items-center mb-4" v-if="errors.length > 0">
                                        <div class="d-flex flex-column">
                                            <span class="alert-inner--text mb-2" v-for="(error, i) in errors" :key="i"><strong>Oops!</strong> {{error}}</span>
                                        </div>
                                        <button type="button" class="close" @click="errors = []">
                                            <span>&times;</span>
                                        </button>
                                    </base-alert>
                                    
                                     <form action="" @submit.prevent="updateWithdraw" method="post">
                                        <div class="form-group">
                                            <label for=""><small>Status</small></label>
                                            <select ref="status" name="order_status" id="" class="form-control form-control-alternative">
                                                <option value="">Select Status</option>
                                                <option :selected="withdraw.status =='pending' ? true : false" value="pending">Pending</option>
                                                <option :selected="withdraw.status =='verify' ? true : false" value="verify">Verify</option>
                                                <option :selected="withdraw.status =='complete' ? true : false" value="complete">Complete</option>
                                                <option :selected="withdraw.status =='reject' ? true : false" value="reject">Reject</option>
                                            </select>
                                        </div>
                                       
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-primary btn-block">Update Withdraw <img v-if="loading" width="25" class="ml-1 mt--2" src="/img/loading.gif" /></button>
                                        </div>
                                        <!-- <p style="font-size: 13px"><strong>Note: </strong>When updating the order. It well automatically send an email to customer about the update of the withdraw.</p> -->
                                    </form>
                                </div>
                            </div>
                        </template>
                         <template v-else>
                            <div class="text-center mt-5 mb-5">
                                <h4>Loading...</h4>
                            </div>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    data(){
        return {
            loading: false,
            errors: []
        }
    },
    computed: {
        withdraw(){
            return this.$store.getters.fetchWithdrawDetail;
        }
    },
    methods: {
        withdrawDate(date){
            return moment(date).format('ll'); 
        },
        updateWithdraw(){
            this.loading = true;
             const status = this.$refs.status.value;

            if(!status == ''){
                this.$store.dispatch('updateWithdraw', {id: this.withdraw.id, status})
                .then(res => {
                    console.log(res);
                    this.$notify({ 
                        title: 'Success',
                        message: `Withdraw has been updated successfully`,
                        type: 'success'
                    });
                    this.loading = false
                })
                .catch(err => {
                    this.error = err;
                    this.loading = false;
                })
            }else {
                this.$notify({ 
                        title: 'Error',
                        message: `Withdraw status is required`,
                        type: 'error'
                    });
            }
        }
    },
    mounted(){
        this.$store.dispatch('fetchWithdrawDetail', this.$route.params.id)
    }
}
</script>