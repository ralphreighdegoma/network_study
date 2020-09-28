<template>
    <div>
        <base-header type="gradient-danger" class="pb-6 pb-8 pt-5 pt-md-8">
        
  
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7">
            <div class="row">
     

               
            </div>
            <!-- End charts-->

            
        </div>

    </div>
</template>
<script>
  // Charts



  export default {
    computed: {
        user(){
          return this.$store.getters.authUser;
        },
    },
    components: {
      
    },
    data() {
      return {
       
      };
    },
    methods: {
      
    },
    mounted() {

      this.$store.dispatch('fetchAuthUser');
    }
  };
</script>
<style></style>
