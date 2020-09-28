<template>
    <div class="order-success mt-5">
        <div class="container">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-8 text-center">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-md-9 text-center">
                            <img class="order-success--img" src="/img/order-success.svg" alt="">
                        </div>
                    </div>
                    <h2 class="order-success--title mt-4 mb-4">Thank you for purchasing our product</h2>
                    <p class="order-success--text">We are currently processing your order. You can find your order under <router-link to="/orders">Your Order</router-link>, to view more details and updates of your order.</p>
                    <div class="mt-4 mb-5">
                        <router-link to="/orders" class="btn btn-primary m-2">Go to Orders</router-link>
                        <router-link to="/products" class="btn btn-default m-2">Shop More</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>