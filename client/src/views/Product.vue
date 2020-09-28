<template>
    <div class="product">
        <div class="row" v-if="product">
            <div class="col-md-6">
                <div class="product__featureImage">
                    <img :src="featureImage" />
                    <div class="product__featureImage--overlay" v-if="product.images">
                        <div class="product__featureImage--overlay__images">
                            <img v-for="(image, i) in images" :key="i" :src="image" @mouseover="changeFeatureImage(image)" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="product__info p-4">
                    <h1 class="product__info--title mb-4 mt-4">{{product.title}}</h1>
                    <el-rate
                        v-model="ratevalue"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value} points">
                    </el-rate>
                    <div class="product__info--description mb-4 mt-4" v-html="product.description"></div>
                    <h3 class="product__info--price mb-5">
                        <template v-if="product.saleprice !== 'null'">
                            <small><strike>₱ {{product.price}}</strike></small> ₱ {{product.saleprice}}
                        </template>
                        <template v-else>
                            ₱ {{product.price}}
                        </template>
                    </h3>
                    <div class="row">
                        <div class="form-group col-3">
                             <el-input-number v-model="qty" @change="handleChange" :min="1" :max="10"></el-input-number>
                        </div>
                         <div class="form-group col-4 ml-4">
                            <router-link class="btn btn-block btn-primary ml-3 mt-0" :to="`/checkout?productid=${product.id}&qty=${qty}`">Checkout</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row" v-else>
            <div class="container">
                <div class="text-center mt-5">
                    <h3 class="text-center">Loading...</h3>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .el-rate__icon{
        font-size: 28px !important;
    }
</style>
<script>
export default {
    data(){
        return {
            featureImage: '',
            images: [],
            qty: 1,
            ratevalue: 5
        }
    },
    computed: {
        product(){
            return this.$store.getters.product;
        }
    },
    methods: {
        changeFeatureImage(image){
            this.featureImage = image;
        },
        checkout(){

        },
        handleChange(value){
            console.log(value);
        }
    },
    mounted(){
        this.$store.dispatch('fetchProduct', this.$route.params.id).then((res) => {
            this.featureImage = res.featureImage;
            let images = JSON.parse(res.images);
            this.images = [res.featureImage, ...images]
        })
    }
}
</script>