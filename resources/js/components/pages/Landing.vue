<template>
    <div>
        <landing-nav navcolor="navbar-dark bg-default"></landing-nav>
        <div class="main-content">
            <div class="container">
                <h1>Hello</h1>
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