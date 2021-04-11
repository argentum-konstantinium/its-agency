<template>
    <div class="cart__content">
        <CartHeader/>
        <CartBody/>
        <CartFooter :sum="CART_SUM" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(["CART_SUM"]),
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
@media(max-width: 540px)
    .cart
        &__content
            padding: 24px
</style>