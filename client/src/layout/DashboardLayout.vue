<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Ka oban"
      title="Ka oban"
    >
    <template v-if="user && user.user_type == 'admin'">
       <template slot="links">
          <sidebar-item
            :link="{
              name: 'Dashboard',
              icon: 'ni ni-chart-bar-32 text-dark',
              path: '/admin/dashboard'

            }"
          />
          <sidebar-item :link="{name: 'Orders', icon: 'ni ni-cart text-dark', path: '/admin/orders', count: order_pending_count}"/>
          <sidebar-item :link="{name: 'Products', icon: 'ni ni-bag-17 text-dark', path: '/admin/products'}"/>
           <sidebar-item :link="{name: 'Withdraws', icon: 'ni ni-curved-next text-dark', path: '/admin/withdraws'}"/>
          <sidebar-item :link="{name: 'Account', icon: 'ni ni-single-02 text-dark', path: '/admin/account'}"/>
      </template>
    </template>
    <template v-else>
      <template slot="links">
          <sidebar-item
            :link="{
              name: 'Dashboard',
              icon: 'ni ni-sound-wave text-dark',
              path: '/dashboard'
            }"
          />
          <sidebar-item :link="{name: 'Orders', icon: 'ni ni-cart text-dark', path: '/orders'}"/>
          <sidebar-item :link="{name: 'Products', icon: 'ni ni-bag-17 text-dark', path: '/products'}"/>
          <sidebar-item :link="{name: 'Referral Code', icon: 'ni ni-atom text-dark', path: '/referral-code'}"/>
          <sidebar-item :link="{name: 'Networking', icon: 'ni ni-vector text-dark', path: '/networking'}"/>
          <sidebar-item :link="{name: 'Ewallet', icon: 'ni ni-credit-card text-dark', path: '/ewallet'}"/>
          <sidebar-item :link="{name: 'Account', icon: 'ni ni-single-02 text-dark', path: '/account'}"/>
      </template>
    </template>
    
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <!-- <content-footer v-if="!$route.meta.hideFooter"></content-footer> -->
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue', //vue|blue|orange|green|red|primary,
        order_pending_count: 0
      };
    },
    computed: {
       user(){
        return this.$store.getters.authUser;
      },
      datacount(){
        return this.$store.getters.data_count;
      },
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    },
    mounted(){
      this.$store.dispatch('fetchAuthUser');
      this.$store.dispatch('analyticsCount').then((res) => {
        console.log('res', res.order_pending_count)
        this.order_pending_count = res.order_pending_count;
      });
    }
  };
</script>
<style lang="scss">
</style>
