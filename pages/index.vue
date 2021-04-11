<template>
    <div class="">
        <TheHeader />
        <Main />
        <div ref="cart" @click="closeCart" :class="{ cart_show: showCart }" class="cart">
            <NuxtChild></NuxtChild>
        </div>
        <TheFooter />
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
                    document.body.classList.add('lock')
                    this.showCart = true;
                } else {
                    this.showCart = false;
                    document.body.classList.remove('lock')

                }
            },
        },
    },
    methods: {
        ...mapActions(["GET_CART_FROM_STORAGE"]),
        closeCart(e) {
            if (e.target == this.$refs.cart) {
                this.$router.push('/')
            }
        }
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
    width: 100vw
    height: 100vh
    min-height: 575px
    background: rgba(0,0,0, 0.2)
    @include dFlex(flex-end, stretch)
    opacity: 0
    display: none
    z-index: 11
  
    &_show
        display: flex
        animation: showOpacity 0.5s ease 1 forwards
@media(max-width: 768px)
    .cart
        min-height: 480px
@keyframes showOpacity
    100%
        opacity: 1
</style>
