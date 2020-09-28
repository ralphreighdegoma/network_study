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
                    <card shadow type="secondary">
                      <template v-if="order">
                        <div slot="header">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h3>ORDER #: {{order.id}}</h3>
                                    <h5>Date: {{orderDate(order.created_at)}}</h5>
                                </div>
                                <div>
                                    <badge v-if="order.status == 'complete'" class="badge-lg" type="success">{{order.status}}</badge>
                                    <badge v-if="order.status == 'on-delivery'" class="badge-lg" type="info">{{order.status}}</badge>
                                    <badge v-if="order.status == 'pending'" class="badge-lg" type="warning">{{order.status}}</badge>
                                    <badge v-if="order.status == 'reject'" class="badge-lg" type="danger">{{order.status}}</badge>
                                    <badge v-if="order.status == 'refund'" class="badge-lg"  type="default">{{order.status}}</badge>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4">
                            <div class="row">
                                <div class="col-md-7">
                                    <h4 class="mb-4">Information Details</h4>
                                    <hr class="mt-3">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <h5><strong class="mr-2">Name:</strong> {{order.fname}} {{order.lname}}</h5>
                                            </div>
                                            <div class="mb-3">
                                                <h5><strong class="mr-2">Address:</strong> {{order.address}}</h5>
                                            </div>
                                            <div class="mb-3">
                                                <h5><strong class="mr-2">City:</strong> {{order.city}}</h5>
                                            </div>
                                            <div class="mb-3">
                                                <h5><strong class="mr-2">Country:</strong> {{order.country}}</h5>
                                            </div>
                                            <div class="mb-3">
                                                <h5><strong class="mr-2">Region:</strong> {{order.region}}</h5>
                                            </div>
                                            <div class="mb-3">
                                                <h5><strong class="mr-2">PostCode:</strong> {{order.postcode}}</h5>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <h5><strong class="mr-2">Phone:</strong> {{order.phone}}</h5>
                                            </div>
                                            <div class="mb-3">
                                                <h5><strong class="mr-2">Email:</strong> {{order.email}}</h5>
                                            </div>
                                            <div class="mb-3">
                                                <h5><strong class="mr-2">Order Note:</strong></h5>
                                                <p>{{order.note}}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-4">
                                         <h4 class="mb-4">Payment Details</h4>
                                        <hr class="mt-3">
                                        <div>
                                            <div class="mb-3">
                                                <h5><strong class="mr-2">Reference No:</strong> {{order.reference_no}}</h5>
                                            </div>
                                            <div class="mb-3">
                                                <h5><strong class="mr-2">Payment Type:</strong> {{order.payment_method}}</h5>
                                            </div>
                                            <div class="mb-3">
                                                <h5><strong class="mr-2">Payment Method:</strong> {{order.payment_type}}</h5>
                                            </div>
                                            <div class="mb-3">
                                                <h5><strong class="mr-2">File:</strong></h5>
                                                <el-image 
                                                    style="width: 150px"
                                                    :src="order.file" 
                                                    :preview-src-list="[order.file]">
                                                </el-image>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <div class="order_detail">
                                        <div class="">
                                            <div class="product-checkout">
                                                <div class="product-checkout--img">
                                                    <img :src="order.product_order.product.featureImage"/>
                                                </div>
                                                <div class="product-checkout__info">
                                                    <h4><router-link :to="`/product/${order.product_order.product.id}/${order.product_order.product.slug}`">{{order.product_order.product.title}}</router-link></h4>
                                                </div>
                                            </div>

                                            <table class="table table-borderless">
                                                <thead>
                                                    <tr>
                                                        <th scope="col"></th>
                                                        <th scope="col"></th>
                                                        <th scope="col"></th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                            
                                                <tfoot>
                                                    
                                                    <tr>
                                                        <th>Quantity</th>
                                                        <th></th>
                                                        <th></th>
                                                        <td>{{order.quantity}}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Subtotal</th>
                                                        <th></th>
                                                        <th></th>
                                                        <td><strong class="text-danger">₱ {{order.subtotal}}</strong></td>
                                                    </tr>
                                                     <tr>
                                                        <th>Discount</th>
                                                        <th></th>
                                                        <th></th>
                                                        <td>{{order.discount ? `${order.discount}%` : 0}}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Delivery</th>
                                                        <th></th>
                                                        <th></th>
                                                        <td>Free Delivery</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Total</th>
                                                        <th></th>
                                                        <th></th>
                                                        <td><strong class="text-danger">₱ {{order.total}}</strong></td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                           
                                        </div>
                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                      </template>
                      <template v-else>
                          <div class="text-center">
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

        }
    },
    computed: {
        order(){
            return this.$store.getters.customer_order;
        }
    },
    methods: {
        orderDate(date){
            return moment(date).format('ll'); 
        }
    },
    mounted(){
        this.$store.dispatch('fetchCustomerOrderDetail', this.$route.params.id)
    }
}
</script>