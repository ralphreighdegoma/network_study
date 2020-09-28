<template>
   <div>
        <base-header type="gradient-danger" class="pb-6 pb-8 pt-5 pt-md-8">
        
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-md-12">
                    <div class="container">
                       <product-list></product-list>
                    </div>
                </div>
            </div>
            
        </div>

    </div>
</template>

<script>
import ProductListVue from './ProductList.vue'
export default {
    components: {
        ProductList: ProductListVue
    }
}
</script>