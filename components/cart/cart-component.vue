<template>
    <div class="cart">
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
              
                    <ProductList> </ProductList>
                
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    methods: {
        ...mapActions(["RESET_CART"]),
        resetCart() {
            this.RESET_CART();
        },
    },
};
</script>

<style lang="sass">
.cart
    position: absolute
    top: 0
    right: 0
    width: 100%
    height: 100%
    background: rgba(0,0,0, 0.2)
    @include dFlex(flex-end, stretch)
    &__content
        background: #fff
        flex-basis: 600px
        padding: 40px
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
</style>