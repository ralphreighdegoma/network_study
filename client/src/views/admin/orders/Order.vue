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
                                    <div class="product-order">
                                        <div class="row justify-content-between">
                                            <div class="col-md-8">
                                                <div class="d-flex">
                                                    <img class="product-order__img" :src="order.product_order.product.featureImage" alt="">
                                                    <div class="product-order__info">
                                                        <h4>{{order.product_order.product.title}}</h4>
                                                        <h5><strong class="mr-2">Quantity:</strong> x{{order.quantity}}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                             <div class="col-md-4">
                                                <div class="mb-3">
                                                    <h5><strong class="mr-2">Subtotal:</strong> ₱ {{order.subtotal}}</h5>
                                                </div>
                                                <div class="mb-3">
                                                    <h5><strong class="mr-2">Discount:</strong> {{order.discount ? `${order.discount}%` : 0}}</h5>
                                                </div>
                                                <div class="mb-3">
                                                    <h5><strong class="mr-2">Total:</strong> ₱ {{order.total}}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <h4 class="mt-5">Information Details</h4>
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
                                        <h4>Payment Details</h4>
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
                                    <form action="" @submit.prevent="updateOrder" method="post">
                                        <div class="form-group">
                                            <label for=""><small>Status</small></label>
                                            <select ref="status" name="order_status" id="" class="form-control form-control-alternative">
                                                <option value="">Select Status</option>
                                                <option :selected="order.status =='pending' ? true : false" value="pending">Pending</option>
                                                <option :selected="order.status =='on-delivery' ? true : false" value="on-delivery">On Delivery</option>
                                                <option :selected="order.status =='complete' ? true : false" value="complete">Complete</option>
                                                <option :selected="order.status =='reject' ? true : false" value="reject">Reject</option>
                                                <option :selected="order.status =='refund' ? true : false" value="refund">Refund</option>
                                            </select>
                                        </div>
                                         <div class="form-group">
                                            <label for=""><small>Note (optional) </small></label>
                                            <textarea ref="note" class="form-control form-control-alternative" rows="3" :placeholder="`Hello ${order.fname}, `"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-primary btn-block">Update Order <img v-if="loading" width="25" class="ml-1 mt--2" src="/img/loading.gif" /></button>
                                        </div>
                                        <p style="font-size: 13px"><strong>Note: </strong>When updating the order. It well automatically send an email to customer about the update of the order.</p>
                                    </form>
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
           loading: false
        }
    },
    computed: {
        order(){
            return this.$store.getters.order;
        }
    },
    methods: {
        orderDate(date){
            return moment(date).format('ll'); 
        },
        updateOrder(){
            this.loading = true;
            const status = this.$refs.status.value;
            const note = this.$refs.note.value;

            if(!status == ''){
                this.$store.dispatch('updateOrder', {id: this.order.id, status, note})
                .then(res => {
                    console.log(res)
                    this.$notify({ 
                        title: 'Success',
                        message: `Order#: ${res.id} has been updated successfully`,
                        type: 'success'
                    });
                    this.loading = false
                    this.note = `Hello ${this.order.fname},`
                })
                .catch(err => {
                    console.log(err)
                })
            }else {
                this.$notify({ 
                        title: 'Error',
                        message: `Order status is required`,
                        type: 'error'
                    });
            }
        }
    },
    mounted(){
        this.$store.dispatch('fetchOrderDetail', this.$route.params.id)
        this.$store.dispatch('fetchOrders')
    }
}
</script>