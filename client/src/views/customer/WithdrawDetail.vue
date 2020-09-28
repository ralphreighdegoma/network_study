
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
                                <div class="col-md-5">
                                    <!-- <table class="table table-borderless">
                                        <thead>
                                            <tr>
                                                <th scope="col">Transaction</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                    
                                        <tfoot>
                                            
                                            <tr>
                                                <td>Total Ewallet Balance</td>
                                                <td></td>
                                                <td></td>
                                                <td>₱ <strong>{{withdraw.ewallet.total_deposit}}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Withdraw Amount</td>
                                                <td></td>
                                                <td></td>
                                                <td><strong>₱ -{{withdraw.amount}}</strong></td>
                                           
                                            <tr>
                                                <td>Remaining Balance</td>
                                                <td></td>
                                                <td></td>
                                                <td><h4 class="text-danger">₱ {{withdraw.ewallet.total_deposit - withdraw.amount}}</h4></td>
                                            </tr>
                                        </tfoot>
                                    </table> -->
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
            loading: false
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
    },
    mounted(){
        this.$store.dispatch('fetchWithdrawDetail', this.$route.params.id)
    }
}
</script>