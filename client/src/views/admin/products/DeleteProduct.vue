<template>
    <div>
        <base-header type="gradient-danger" class="pb-6 pb-8 pt-5 pt-md-8">
        
        </base-header>

         <div class="container-fluid mt--7 mb-5">
            <div class="row">
                <div class="col-md-12">
                    <div class="container">
                       <div class="card">
                           <div class="card-body">
                               <div class="text-center mt-5 mb-5">
                                   <img width="400" src="/img/remove.svg" />
                                   <div class="mt-5 mb-4">
                                       <h4>Are you sure you want to delete this product?</h4>
                                   </div>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <base-button type="primary" @click="deleteProduct">Confirm</base-button>
                                        <router-link class="btn btn-default ml-3" to="/admin/products">Cancel</router-link>
                                   </div>
                               </div>
                           </div>
                       </div>
                    </div>
                </div>
            </div>
            
        </div>

    </div>
</template>

<script>
export default {

    methods: {
        deleteProduct(){
            this.$store.dispatch('deleteProduct', {id: this.$route.params.id}).then((res) => {
                this.$notify({
                    title: 'Success',
                    message: `Product ${res.title} has been successfully Deleted`,
                    type: 'success'
                });
            }).catch(err => console.log(err));
        }
    },
    mounted(){
        this.$store.dispatch('fetchAllProducts');
    }
}
</script>