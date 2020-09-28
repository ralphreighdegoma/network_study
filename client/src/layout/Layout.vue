<template>
    <div class="main-content">
        <!-- Navbar -->
            <base-nav class="navbar navbar-horizontal navbar-expand-lg navbar-dark bg-default"
                  containerClasses="px-4 container"
                  expand>
            <router-link slot="brand" class="navbar-brand" to="/">
                ka oban
            </router-link>

            <template v-slot="{closeMenu}">
                <!-- Collapse header -->
                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                                ka oban
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <button type="button"
                                    @click="closeMenu"
                                    class="navbar-toggler"
                                    aria-label="Toggle sidenav">
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Navbar items -->
                <ul class="navbar-nav ml-auto">
                    <template v-if="!user">
                         <li class="nav-item">
                            <router-link class="nav-link nav-link-icon" to="/register">
                                <span class="nav-link-inner--text">Register</span>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link nav-link-icon" to="/login">
                                <span class="nav-link-inner--text">Login</span>
                            </router-link>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item" v-if="user && user.user_type == 'admin'">
                            <router-link class="nav-link nav-link-icon" to="/admin/dashboard">
                                <span class="nav-link-inner--text">Account</span>
                            </router-link>
                        </li>
                        <li class="nav-item" v-else>
                            <router-link class="nav-link nav-link-icon" to="/dashboard">
                                <span class="nav-link-inner--text">Account</span>
                            </router-link>
                        </li>
                    </template>
                
                </ul>
            </template>
        </base-nav>
        <div class="">
            <slide-y-up-transition mode="out-in" origin="center top">
                <router-view></router-view>
            </slide-y-up-transition>
        </div>
    </div>
</template>
<script>
  import { SlideYUpTransition } from 'vue2-transitions'

  export default {
    name: 'auth-layout',
    components: {
      SlideYUpTransition
    },
    computed: {
       user(){
        return this.$store.getters.authUser;
      },
    },
    data() {
      return {
        year: new Date().getFullYear(),
        showMenu: false
      }
    },
    mounted(){
      this.$store.dispatch('fetchAuthUser');

    }
  }
</script>
<style>
</style>
