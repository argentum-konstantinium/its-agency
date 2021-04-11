<template>
    <div class="product-list">
        <div class="product-list__header">
            <span class="product-list__number">{{ productsNumber }}</span>
            <button @click="clearCart" class="product-list__reset-cart">
                очистить список
            </button>
        </div>
        <ul v-if="CART_LENGTH > 0" class="product-list__list">
            <CartProductListItem
                class="product-list__item"
                v-for="item in CART"
                :key="item.index"
                :product-data="item"
                :quantity="item.quantity"
                :removed="item.removed"
            />
        </ul>
    </div>
</template>

<style lang="sass">
.product-list
    &__header
        @include dFlex(space-between, center)
        font-size: 14px
        color: #1F2020
        padding-bottom: 0.71428em
        border-bottom: 1px solid rgba(0, 0, 0, 0.1)
    &__number
        @include fontCfg(1em, 112%, 400)
    &__reset-cart
        opacity: 0.4
        transition: 0.2s opacity ease
        &:hover
            opacity: 1
    &__list
        overflow-y: auto
        max-height: 484px
@media(max-width: 540px)
    .product-list__item
        font-size: 12px
</style>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {

        };
    },
    computed: {
        ...mapGetters(["CART", "CART_LENGTH", "REMOVE_LENGTH"]),
        productsNumber() {
            let value = Math.abs(this.CART_LENGTH - this.REMOVE_LENGTH) % 100;
            let num = value % 10;
            if (value > 10 && value < 20)
                return this.CART_LENGTH - this.REMOVE_LENGTH + " товаров";
            if (num > 1 && num < 5)
                return this.CART_LENGTH - this.REMOVE_LENGTH + " товара";
            if (num == 1)
                return this.CART_LENGTH - this.REMOVE_LENGTH + " товар";
            return this.CART_LENGTH - this.REMOVE_LENGTH + " товаров";
        },
    },
    methods: {
        ...mapActions(["RESET_CART"]),
        clearCart() {
            this.RESET_CART();
        },
    },
     
};
</script>