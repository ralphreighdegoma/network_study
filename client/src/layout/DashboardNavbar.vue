<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <div class="form-group mb-0">
                <base-input placeholder="Search"
                            class="input-group-alternative"
                            alternative=""
                            addon-right-icon="fas fa-search">
                </base-input>
            </div>
        </form>
        <ul class="navbar-nav align-items-center d-none d-md-flex">
            <li class="nav-item dropdown">
                <base-dropdown class="nav-link pr-0" position="right">
                    <div class="media align-items-center" slot="title">
                    <span class="avatar avatar-sm rounded-circle">
                      <img v-if="user && user.avatar" alt="Image placeholder" :src="user.avatar">
                      <img v-else alt="Image placeholder" src="/img/theme/default.jpg">
                    </span>
                        <div class="media-body ml-2 d-none d-lg-block">
                            <span class="mb-0 text-sm  font-weight-bold">{{user ? user.name : 'account'}}</span>
                        </div>
                    </div>

                    <template v-if="user && user.user_type == 'admin'">
                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Welcome!</h6>
                        </div>

                        <router-link to="/admin/account" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>My Account</span>
                        </router-link>

                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item" @click="logout">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </a>
                    </template>
                    <template v-else>
                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Welcome!</h6>
                        </div>

                        <router-link to="/account" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>My Account</span>
                        </router-link>

                        <div class="dropdown-divider"></div>
                        <span class="dropdown-item" @click="logout">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </span>
                    </template>
                </base-dropdown>
            </li>
        </ul>
    </base-nav>
</template>
<script>
  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: ''
      };
    },
    computed: {
       user(){
        return this.$store.getters.authUser;
      },
    },
    methods: {
      logout(){
        this.$store.dispatch('logout');
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      }
    },
    mounted(){
      this.$store.dispatch('fetchAuthUser');
    }
  };
</script>
