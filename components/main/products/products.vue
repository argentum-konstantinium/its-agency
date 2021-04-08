<template>
    <div class="products__container">
        <div class="products__header">
            <span class="products__number" v-html="productsNumber"></span>
        </div>
        <div class="products__wrapper">
            <ProductCard
                class="products__products-card"
                v-for="(item, index) in products"
                :key="index"
                :name="item.name"
                :img="require('~/assets/img/products/' + item.img)"
                :cost="item.cost"
                :class="borderClass"
            ></ProductCard>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: fetch("/products.json").then((response) => {
                response.json().then((data) => {
                    let arr = [];
                    for (let i in data) {
                        arr.push(data[i]);
                    }
                    this.products = arr;
                    this.productsLength = arr.length;
                });
            }),
            productsLength: 0,
        };
    },
    metods: {},
    computed: {
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
            
            let value = Math.abs(this.productsLength) % 100;
            let num = value % 10;
            if (value > 10 && value < 20) return this.productsLength + ' товаров';
            if (num > 1 && num < 5) return this.productsLength + ' товара';
            if (num == 1) return this.productsLength + ' товар';
            return this.productsLength + ' товаров';
        },
    },
    mounted() {},
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
