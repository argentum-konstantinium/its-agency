<template>
    <div class="products__container">
        <div class="products__header">
            <span class="products__number" v-html="productsNumber"></span>
        </div>
        <div class="products__wrapper">
            <ProductCard
                class="products__products-card"
                v-for="(item, index) in filteredProducts"
                :product-data="item"
                :key="index"
                @addToCart="addToCart"
                :class="borderClass"
            ></ProductCard>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            products: [],
            newestFiltering: true,
            availabilityFiltering: false,
            exclusivefiltering: false,
            contractFiltering: false,
            saleFiltering: true,
        };
    },
    methods: {
        ...mapActions(["GET_PRODUCTS_FROM_API", "ADD_TO_CART"]),
        addToCart(product) {
            this.ADD_TO_CART(product);
        },
        filterBy(filter) {
            this.products = this.products.filter((elem) => {
                return elem[filter];
            });
           
        },
        
    },
    computed: {
        ...mapGetters(["PRODUCTS"]),
        borderClass() {
            return {
                "product-card_border_active-1": this.productsLength % 5 === 1,
                "product-card_border_active-2": this.productsLength % 5 === 2,
                "product-card_border_active-3": this.productsLength % 5 === 3,
                "product-card_border_active-4": this.productsLength % 5 === 4,
                "product-card_border_active-5":
                    this.productsLength % 5 === 0 && this.productsLength > 5,
            };
        },
        productsNumber() {
            let value = Math.abs(this.products.length) % 100;
            let num = value % 10;
            if (value > 10 && value < 20)
                return this.products.length + " товаров";
            if (num > 1 && num < 5) return this.products.length + " товара";
            if (num == 1) return this.products.length + " товар";
            return (this.products.length + " товаров");
        },
        filteredProducts() {
            this.products = this.PRODUCTS.map((b, idx) =>
                Object.assign({ index: idx }, b)
            );
            if (
                this.newestFiltering ||
                this.exclusiveFiltering ||
                this.contractFiltering ||
                this.saleFiltering
            ) {
                if (this.newestFiltering) {
                    this.filterBy("newest");
                }
                if (this.availabilityFiltering) {
                    this.filterBy("availability");
                }
                if (this.exclusivefiltering) {
                    this.filterBy("exclusive");
                }
                if (this.contractFiltering) {
                    this.filterBy("contract");
                }
                if (this.saleFiltering) {
                    this.filterBy("sale");
                }
            }
            return this.products;
        },
    },
    mounted() {
        this.GET_PRODUCTS_FROM_API();
    },
};
</script>

<style lang="sass">
body
    padding-bottom: 50px
.products
    &__header
        color: #1F2020
    &__wrapper
        display: grid
        grid-template-columns: repeat(5, 19.1117%)
        justify-content: space-between

@include productCardBorder
</style>
