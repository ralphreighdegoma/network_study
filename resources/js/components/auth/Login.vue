<template>
    <div>
        <landing-nav navcolor="navbar-transparent navbar-light"></landing-nav>
          <div class="main-content bg-gradient-primary ">
            <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
           
            </div>
            <!-- Page content -->
            <div class="container mt--8 pb-5">
            <div class="row justify-content-center">
                <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary border-0 mb-0">
                    <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <h1>Login</h1>
                        <small>login in with credentials</small>
                    </div>
                    <form role="form">
                        <div class="form-group mb-3">
                            <div class="input-group input-group-merge input-group-alternative">
                                <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                                </div>
                                <input class="form-control" placeholder="Email" type="email">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group input-group-merge input-group-alternative">
                                <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                                </div>
                                <input class="form-control" placeholder="Password" type="password">
                            </div>
                        </div>
                       
                        <div class="text-center">
                        <button type="button" class="btn btn-primary my-4">Login</button>
                        </div>
                    </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                         <router-link class="text-light" to="/forgot-password">
                            <small>Forgot password?</small>
                        </router-link>
                    </div>
                    <div class="col-6 text-right">
                        <router-link class="text-light" to="/register">
                            <small>Create new account</small>
                        </router-link>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import LandingNavVue from '../layout/LandingNav.vue'

export default {
    components: {
        LandingNav: LandingNavVue
    }
}
</script>