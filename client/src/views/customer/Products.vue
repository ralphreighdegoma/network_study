<template>
    <div>
         <base-header class="header pb-7 pt-5 pt-lg-7 d-flex align-items-center">
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
        <div class="container-fluid mt-6">
            <div class="row products" v-if="products">
                <div class="col-md-4 mb-4 mt-6 mb-4" v-for="(product, i) in products.data" :key="i">
                    <div class="card card-shadow">
                        <div class=" products__featureImage mt--6">
                             <div class="products__featureImage__img" :style="`background-image: url('${product.featureImage}')`">
                                <div class="wrap" v-if="product.discount">
                                    <span class="ribbon6">{{product.discount}}% Discount</span>
                                </div>
                             </div>
                        </div>
                        <div class="card-body">
                            <div class="">
                                <h4>{{product.title}}</h4>
                                <el-rate
                                    v-model="ratevalue"
                                    disabled
                                    show-score
                                    text-color="#ff9900">
                                </el-rate>
                                <div class="row justify-content-between align-items-center">
                                    <div class="mt-3 col-7">
                                        <router-link class="btn btn-primary btn-sm" :to="`/checkout?productid=${product.id}&qty=1`">Checkout</router-link>
                                        <router-link class="btn btn-default btn-sm" :to="`/product/${product.id}/${product.slug}`">Details</router-link>
                                    </div>
                                     <div class="mt-3 col-5">
                                         <h4>
                                             <template v-if="product.saleprice != 'null'">
                                                 <strike><small>₱{{product.price}}</small></strike> ₱{{product.saleprice}}
                                             </template>
                                             <template v-else>
                                                 ₱{{product.price}}
                                             </template>
                                         </h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
             <div class="row justify-content-center align-items-center" v-else>
                 <h3 class="text-center">Loading...</h3>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .el-rate__icon {
        font-size: 18px !important;
    }
</style>
<script>
export default {
    data(){
        return {
            ratevalue: 5
        }
    },
    computed: {
        products(){
            return this.$store.getters.products;
        }
    },
    methods:{

    },
    mounted(){
        this.$store.dispatch('fetchAllCustomerProducts');
    }
}
</script>