<template>
    <div class="">
        <Header></Header>
        <Main></Main>
        <div :class="{ cart_show: showCart }" class="cart">
            <NuxtChild></NuxtChild>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    path: "/",
    data() {
        return {
            showCart: false,
        };
    },
    watch: {
        $route: {
            immediate: true,
            handler(newRoute, oldRoute) {
                if (newRoute.name === "index-cart") {
                    this.showCart = true;
                } else {
                    this.showCart = false;
                }
            },
        },
    },
    methods: {
        ...mapActions(['GET_CART_FROM_STORAGE'])
    },
    mounted() {
        window.FocusVisible("data-focus-visible");
        this.GET_CART_FROM_STORAGE();
    },
};
</script>

<style lang='sass'>
@import '~/assets/sass/main.sass'
.cart
    position: fixed
    top: 0
    right: 0
    width: 100%
    height: 100%
    background: rgba(0,0,0, 0.2)
    @include dFlex(flex-end, stretch)
    opacity: 0
    display: none
    z-index: 10
    height: 100vh
    min-height: 575px
    &_show
        display: flex
        animation: showOpacity 0.5s ease 1 forwards
@keyframes showOpacity 
    100% 
        opacity: 1
    

       
</style>
