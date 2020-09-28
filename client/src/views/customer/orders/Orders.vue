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
                            <h4>LIST OF YOUR RECENT ORDERS</h4>
                        </div>
                        <div class="card-body p-0">
                        <template v-if="orders">
                        <div class="table-responsive">
                            <base-table thead-classes="thead-light"
                                        :data="orders.data">
                            <template slot="columns">
                                <th>Order No.</th>
                                <th>Title</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Date</th>
                            </template>

                            <template slot-scope="{row}">
                                <th scope="row">
                                    #{{ row.id }}
                                </th>
                                <td>
                                    <router-link :to="`/order/${row.id}`" class="text-dark">{{row.product_order.product.title}}</router-link>
                                </td>
                                <td>
                                    {{row.quantity}}
                                </td>
                                <td>
                                    <badge v-if="row.status == 'complete'"  type="success">{{row.status}}</badge>
                                    <badge v-if="row.status == 'on-delivery'"  type="info">{{row.status}}</badge>
                                    <badge v-if="row.status == 'pending'"  type="warning">{{row.status}}</badge>
                                    <badge v-if="row.status == 'reject'"  type="danger">{{row.status}}</badge>
                                    <badge v-if="row.status == 'refund'"  type="default">{{row.status}}</badge>
                                </td>
                                <td>
                                    ₱ {{row.total}}
                                </td>
                                 <td>
                                    {{orderDate(row.created_at)}}
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
        orders(){
            return this.$store.getters.customer_orders;
        }
    },
    methods: {
        orderDate(date){
            return moment(date).format('ll'); 
        }
    },
    mounted(){
        this.$store.dispatch('fetchCustomerOrders')
    }
}
</script>