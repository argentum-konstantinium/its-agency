<template>
    <div class="product-list">
        <div class="product-list__header">
            <span class="product-list__number">{{ productsNumber }}</span>
            <button @click="clearCart" class="product-list__reset-cart">
                очистить список
            </button>
        </div>
        <ul v-if="CART_LENGTH > 0" class="product-list__list">
            <ProductListItem
                class="product-list__item"
                v-for="item in CART"
                :key="item.index"
                :product-data="item"
                :quantity="item.quantity"
                :removed="item.removed"
            ></ProductListItem>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {
            clearedCart: false,
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
        ...mapActions(["REMOVE_ALL_PRODUCTS"]),
        clearCart() {
            this.REMOVE_ALL_PRODUCTS();
        },
    },
    mounted() {
        

    },
};
</script>