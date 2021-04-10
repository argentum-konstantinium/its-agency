<template>
    <div class="cart__content">
        <div class="cart__header">
            <h3 class="cart__headline">Корзина</h3>
            <NuxtLink to="/">
                <button @click="resetCart" class="cart__close">
                    <svg
                        role="img"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Закрыть</title>
                        <path
                            d="M18 6L6 18"
                            stroke="#1F2020"
                            stroke-width="1.4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M6 6L18 18"
                            stroke="#1F2020"
                            stroke-width="1.4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </NuxtLink>
        </div>
        <div class="cart__body">
            <ProductList class="cart__product-list"> </ProductList>
        </div>
        <CartFooter :sum="CART_SUM"></CartFooter>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(['CART_SUM']),
    },
    methods: {
        ...mapActions(["REMOVE_ALL_PRODUCTS"]),
        resetCart() {
            this.REMOVE_ALL_PRODUCTS();
        },
    },
     
};
</script>

<style lang="sass">
.cart
    &__content
        background: #fff
        flex-basis: 600px
        padding: 40px
        display: grid
        grid-template-columns: 100%
        grid-template-rows: min-content auto min-content
    &__header
        @include dFlex(space-between, center)
    &__headline
        @include fontCfg(30px, 88%, 500, -0.04em)
    &__close
        border-radius: 50%
        width: 48px
        height: 48px
        border: 1px solid rgba(0, 0, 0, 0.1)
        @include dFlex(center, center)
    &__body
        margin-top: calc(100vh * 0.07692)
    
</style>