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
                    <div class="card shadow">
                        <div class="card-header">
                            <h4>LIST OF REQUESTING WITHDRAW</h4>
                        </div>
                        <div class="card-body p-0">
                        <template v-if="withdraws">
                        <div class="table-responsive">
                            <base-table thead-classes="thead-light"
                                        :data="withdraws">
                           <template slot="columns">
                                <th>Name</th>
                                <th>Payment Method</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </template>

                            <template slot-scope="{row}">
                                <th>
                                    <router-link  :to="`/admin/withdraw/${row.id}`">{{row.name}}</router-link>
                                </th>
                                <td>
                                    {{row.payment_method}}
                                </td>
                                <td>
                                    ₱ {{row.amount}}
                                </td>
                                <td>
                                    <badge v-if="row.status == 'complete'"  type="success">{{row.status}}</badge>
                                    <badge v-if="row.status == 'pending'"  type="warning">{{row.status}}</badge>
                                    <badge v-if="row.status == 'verify'"  type="info">{{row.status}}</badge>
                                    <badge v-if="row.status == 'reject'"  type="danger">{{row.status}}</badge>
                                </td>
                                <td>
                                    {{withdrawDate(row.created_at)}}
                                </td>
                            </template>

                            </base-table>
                        </div>
                        </template>
                        <template v-else>
                        <div class="text-center mt-5 mb-5">
                            <h4>Loading...</h4>
                        </div>
                        </template>
                        </div>
                    </div>
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

        }
    },
    computed: {
        withdraws(){
            return this.$store.getters.fetchAllWithdraw;
        }
    },
    methods: {
        withdrawDate(date){
            return moment(date).format('ll'); 
        }
    },
    mounted(){
        this.$store.dispatch('fetchAllWithdraw')
    }
}
</script>