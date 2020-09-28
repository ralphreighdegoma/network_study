<template>
     <div>
        <section class="mt-5 mb-5 checkout">
            <div class="container">
                <div class="mb-5 mt-5">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>Checkout</el-breadcrumb-item>
                        <el-breadcrumb-item>Details</el-breadcrumb-item>
                        <el-breadcrumb-item>Payments</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <ValidationObserver v-slot="{invalid}">
                <div class="row">
                            <div class="col-lg-5 order-xl-2 mb-5">
                    <div class="order_detail">
                        <div class="" v-if="product">
                            <div class="product-checkout">
                                <div class="product-checkout__img" :style="`background-image: url('${product.featureImage}')`">
                                    <div class="wrap" v-if="product.discount">
                                        <span class="ribbon6">{{product.discount}}% Discount</span>
                                    </div>
                                </div>
                               
                                <div class="product-checkout__info">
                                    <h4>{{product.title}}</h4>
                                </div>
                            </div>

                            <table class="table">
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
                                        <td>{{data.quantity}}</td>
                                    </tr>
                                    <tr>
                                        <th>Subtotal</th>
                                        <th></th>
                                        <th></th>
                                        <td><strong class="text-danger">₱ {{product.saleprice !== 'null' ? (product.saleprice *data.quantity) :  (product.price * data.quantity)}}</strong></td>
                                    </tr>
                                     <tr>
                                        <th>Discount</th>
                                        <th></th>
                                        <th></th>
                                        <td>{{product.discount ? `${product.discount} %` : '0'}}</td>
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
                                        <td>
                                            <strong class="text-danger" v-if="product.saleprice">₱  {{total(product.saleprice !== 'null' ? product.saleprice : product.price, product.discount)}}</strong>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <button class="btn btn-primary btn-block" :disabled="invalid" @click="onPlaceOrder">{{payment ? 'Back' : 'Next'}}</button>
                        </div>
                        <div class="text-center" v-else>
                            <h3 class="mt-5">Loading...</h3>
                        </div>
                    </div>
                </div>
                <div class="col-lg-7 order-xl-1 mb-5">
                    <div v-if="!payment" class="card shadow">
                        <div class="card-body">
                            <form action="" method="post">
                                <div class="row">
                                    <div class="col">
                                        <div class="form-group">
                                            <ValidationProvider rules="required" v-slot="{errors}">
                                                
                                                <label for="">
                                                    <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
                                                    <span v-else>First Name 
                                                        <span class="text-danger">*</span>
                                                    </span>
                                                    </label>
                                                <input type="text" v-model="data.fname" class="form-control">
                                            </ValidationProvider>
                                           
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-group">
                                            <ValidationProvider rules="required" v-slot="{errors}">
                                                <label for="">
                                                    <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
                                                    <span v-else>Last Name 
                                                        <span class="text-danger">*</span>
                                                    </span>
                                                </label>
                                                <input type="text" v-model="data.lname" class="form-control">
                                            </ValidationProvider>
                                            
                                        </div>
                                    </div>
                                </div>
                            
                                <div class="form-group">
                                    <ValidationProvider rules="required" v-slot="{errors}">
                                        <label for="">
                                            <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
                                            <span v-else>Street Address 
                                                <span class="text-danger">*</span>
                                            </span>
                                        </label>
                                         <input type="text" v-model="data.address" class="form-control" placeholder="House number or street name">
                                    </ValidationProvider>
                                   
                                </div>
                                <div class="form-group">
                                    <ValidationProvider rules="required" v-slot="{errors}">
                                        <label for="">
                                            <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
                                            <span v-else>Town/City
                                                <span class="text-danger">*</span>
                                            </span>
                                        </label>
                                          <input type="text" v-model="data.city" class="form-control">
                                    </ValidationProvider>
                                   
                                </div>
                                <div class="form-group">  
                                    <ValidationProvider rules="required" v-slot="{errors}">
                                        <label for="">
                                            <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
                                            <span v-else>State / Country 
                                                <span class="text-danger">*</span>
                                            </span>
                                        </label>
                                        <country-select v-model="data.country" :countryName="true" :country="data.country" topCountry="US" class="form-control" />
                                    </ValidationProvider>

                                </div>
                                <div class="form-group">
                                     <ValidationProvider rules="required" v-slot="{errors}">
                                        <label for="">
                                            <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
                                            <span v-else>Region
                                                <span class="text-danger">*</span>
                                            </span>
                                        </label>
                                       <region-select v-model="data.province" :regionName="true" :countryName="true" :country="data.country" :region="data.province" class="form-control" />
                                    </ValidationProvider>
                                </div>
                                <div class="form-group">
                                    <ValidationProvider rules="required" v-slot="{errors}">
                                        <label for="">
                                            <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
                                            <span v-else>Postcode / ZIP
                                                <span class="text-danger">*</span>
                                            </span>
                                        </label>
                                         <input type="text" v-model="data.zipcode" class="form-control">
                                    </ValidationProvider>
                                  
                                </div>
                                <div class="form-group">
                                     <ValidationProvider rules="required" v-slot="{errors}">
                                        <label for="">
                                            <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
                                            <span v-else>Phone
                                                <span class="text-danger">*</span>
                                            </span>
                                        </label>
                                          <input type="text" v-model="data.phoneNumber" class="form-control">
                                    </ValidationProvider>      
                                </div>
                                <div class="form-group">
                                     <ValidationProvider rules="required" v-slot="{errors}">
                                        <label for="">
                                            <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
                                            <span v-else>Email Address
                                                <span class="text-danger">*</span>
                                            </span>
                                        </label>
                                        <input type="text" v-model="data.email" class="form-control">
                                    </ValidationProvider>
                                </div>

                                <div class="form-group">
                                    <label for="">Order Notes (optional)</label>
                                    <textarea v-model="data.note" class="form-control" rows="5" placeholder="Note about your order, e.g special note for delivery"></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="" v-else>
                        <div class="card shadow bg-secondary">
                            <div class="card-header">
                                <div class="">
                                   <h4>Choose Payment Methods</h4>
                                </div>
                            </div>
                           <div class="card-body">
                              
                              <el-collapse accordion>
                                <el-collapse-item name="1">
                                    <template slot="title">
                                        Pay via Remittance
                                    </template>
                                    <ValidationObserver v-slot="{invalid}">
                                         <ValidationProvider rules="required" v-slot="{errors}">
                                            <label for="">
                                                <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
                                                <span v-else>Choose payments
                                                    <span class="text-danger">*</span>
                                                </span>
                                            </label>
                                             <select class="form-control" v-model="remittance.method">
                                                <option value="">Select Payment</option>
                                                 <optgroup label="Over-the-Counter Banks">
                                                        <option value="Asia United Bank (AUB)">Asia United Bank (AUB)</option>
                                                        <option value="Banco de Oro (BDO)">Banco de Oro (BDO)</option>
                                                        <option value="Bank of the Philippine Islands (BPI)">Bank of the Philippine Islands (BPI)</option>
                                                        <option value="Chinabank">Chinabank</option>
                                                        <option value="EastWest Bank">EastWest Bank</option>
                                                        <option value="Landbank">Landbank</option>
                                                        <option value="Metrobank">Metrobank</option>
                                                        <option value="Philippine National Bank (PNB)">Philippine National Bank (PNB)</option>
                                                        <option value="Rizal Commercial Banking Corp (RCBC)">Rizal Commercial Banking Corp (RCBC)</option>
                                                        <option value="Robinsons Bank">Robinsons Bank</option>
                                                        <option value="Security Bank">Security Bank</option>
                                                        <option value="Unionbank">Unionbank</option>
                                                </optgroup>
                                               <optgroup label="Non-banking Payment Channels">
                                                    <option value="Cebuana Lhuillier">Cebuana Lhuillier</option>
                                                    <option value="LBC">LBC</option>
                                                    <option value="M Lhuillier">M Lhuillier</option>
                                                    <option value="Palawan Pawnshop">Palawan Pawnshop</option>
                                                    <option value="RD Pawnshop">RD Pawnshop</option>
                                               </optgroup>
                                            </select>
                                        </ValidationProvider>
                                        <ValidationProvider rules="required" v-slot="{errors}">
                                            <label for="">
                                                <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
                                                <span v-else>Reference Number
                                                    <span class="text-danger">*</span>
                                                </span>
                                            </label>
                                            <input type="text" v-model="remittance.reference_number" class="form-control">
                                        </ValidationProvider>

                                        <el-upload
                                        class="upload-demo mt-4 mb-4"
                                        action="#"
                                        :on-change="handleUpload"
                                        :auto-upload="false">
                                        <el-button size="small" type="info" round>Click to upload</el-button>
                                        <div slot="tip" class="el-upload__tip">Please take a clear picture of the MONEY TRANSFER RECEIPT and click upload </div>
                                        </el-upload>

                                         <button class="btn btn-primary btn-block mt-4 mb-4" :disabled="invalid" @click="remittancePay">Pay Now <img v-if="loading" width="25" class="ml-1 mt--2" src="/img/loading.gif" /></button>
                                    </ValidationObserver>
                                    <div><strong>Note:</strong> When you choose remittance as your payment method, your order status is pending. Because we will verify your reference number in order to complete your order.</div>
                                  
                                </el-collapse-item>
                                <el-collapse-item name="2">
                                    <template slot="title">
                                        Pay via Gcash
                                    </template>
                                    <div>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;</div>
                                </el-collapse-item>
                                
                            </el-collapse>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
                </ValidationObserver>

            </div>
        </section>
    </div>
</template>

<script>
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
    components: {
        ValidationProvider,
        ValidationObserver
    },
    data(){
        return {
            data: {
                lname: '',
                fname: '',
                address: '',
                country: '',
                city: '',
                province: '',
                zipcode: '',
                phoneNumber: '',
                email: '',
                note: '',
                quantity: 1
            },
            remittance: {
                method: '',
                file: '',
                reference_number: ''
            },
            payment: false,
            loading: false
        }
    },
    computed: {
        product(){
            return this.$store.getters.product;
        }
    },
    methods: {
        total(product_price, discount){
            let total = 0;
            if(discount){
                let discount1 = (product_price * discount) / 100;
                let subtotal = product_price - discount1;
                total = subtotal * this.data.quantity;  
            }else {
                total = product_price * this.data.quantity;
            }
            return total
        },
        onPlaceOrder(){
            this.payment = !this.payment
        },
        handleUpload(file, filelist) {
            console.log(file, filelist);
            // this.imageUrl = URL.createObjectURL(file.raw);
            this.remittance.file = file.raw;
        },
        remittancePay(){
            console.log(this.data, this.remittance);
            this.loading = true;
            let bodyFormData = new FormData();
            bodyFormData.append('payment_type', this.remittance.method)
            bodyFormData.append('file', this.remittance.file)
            bodyFormData.append('reference_no', this.remittance.reference_number)
            bodyFormData.append('payment_method', 'remittance')
            bodyFormData.append('product_id', this.product.id)
            bodyFormData.append('discount', this.product.discount)
            
             for (const property in this.data) {
                bodyFormData.append(property, this.data[property])
            }

            this.$store.dispatch('createOrder', bodyFormData).then((res) => {
                console.log(res)
                this.loading = false;
            }).catch(err => {
                console.log(err)
                this.loading = false;
            })


        }
    },
    mounted(){
        this.data.quantity = this.$route.query.qty;
        this.$store.dispatch('fetchProduct', this.$route.query.productid).then((res) => {
            
            console.log(res);
        })
    }
}
</script>