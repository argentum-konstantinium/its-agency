<template>
    <div class="products__container">
        <Aside
            @filterClick="changeFilter"
            class="products__aside"
            @touchend="hideAsideTouch"
            :asideState="asideState"
            @click="hideAside"
        />
        <div class="products__content">
            <div class="products__header">
                <span class="products__number" v-html="productsNumber"></span>
                <button @click="toggleAsideState" class="products__filters-btn">
                    Фильтры
                </button>
                <ProductsSelect @sortEvent="setSort" />
            </div>
            <div class="products__wrapper">
                <ProductsProductCard
                    class="products__products-card"
                    v-for="(item, index) in calculatedProducts"
                    :product-data="item"
                    :key="index"
                    @addToCart="addToCart"
                    :class="borderClass"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            products: [],
            windowWidth: 0,
            newestFiltering: false,
            availabilityFiltering: false,
            exclusivefiltering: false,
            contractFiltering: false,
            saleFiltering: false,
            sort: {
                costSortingHigh: false,
                costSortingLow: false,
                popularitySorting: false,
                newestSorting: false,
            },
            asideState: false,
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
        changeFilter(event) {
            this[event.name] = event.value;
        },
        setSort(e) {
            for (let i in this.sort) {
                if (this.sort[i]) this.sort[i] = false;
            }
            this.sort[e.name] = e.value;
        },
        setWindowWidth() {
            this.windowWidth = window.innerWidth;
        },
        toggleAsideState() {
            this.asideState = !this.asideState;
            document.body.classList.add("lock");
        },
        hideAside(e) {
            if (e.target == e.ref) {
                this.toggleAsideState();
                document.body.classList.remove("lock");
       
            }
        },
        hideAsideTouch() {
           
            this.toggleAsideState();
            document.body.classList.remove("lock");
        },
    },

    computed: {
        ...mapGetters(["PRODUCTS"]),
        borderClass() {
            if (this.windowWidth > 1367) {
                return {
                    "product-card_border_active-5_5":
                        this.products.length % 5 === 0,

                    "product-card_border_active-5_4":
                        this.products.length % 5 === 4,

                    "product-card_border_active-5_3":
                        this.products.length % 5 === 3,

                    "product-card_border_active-5_2":
                        this.products.length % 5 === 2,

                    "product-card_border_active-5_1":
                        this.products.length % 5 === 1,
                };
            }
            if (this.windowWidth <= 1367 && this.windowWidth > 990) {
                return {
                    "product-card_border_active-4_4":
                        this.products.length % 4 === 0,

                    "product-card_border_active-4_3":
                        this.products.length % 4 === 3,

                    "product-card_border_active-4_2":
                        this.products.length % 4 === 2,

                    "product-card_border_active-4_1":
                        this.products.length % 4 === 1,
                };
            }
            if (this.windowWidth <= 990 && this.windowWidth > 540) {
                return {
                    "product-card_border_active-3_3":
                        this.products.length % 3 === 0,

                    "product-card_border_active-3_2":
                        this.products.length % 3 === 2,

                    "product-card_border_active-3_1":
                        this.products.length % 3 === 1,
                };
            }
            if (this.windowWidth <= 540) {
                return {
                    "product-card_border_active-2_2":
                        this.products.length % 2 === 0,
                    "product-card_border_active-2_1":
                        this.products.length % 2 === 1,
                };
            }
        },
        productsNumber() {
            let value = Math.abs(this.products.length) % 100;
            let num = value % 10;
            if (value > 10 && value < 20)
                return this.products.length + " товаров";
            if (num > 1 && num < 5) return this.products.length + " товара";
            if (num == 1) return this.products.length + " товар";
            return this.products.length + " товаров";
        },
        calculatedProducts() {
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
            if (this.sort.costSortingHigh) {
                this.products.sort((a, b) => {
                    return b.cost - a.cost;
                });
            }
            if (this.sort.costSortingLow) {
                this.products.sort((a, b) => {
                    return a.cost - b.cost;
                });
            }
            if (this.sort.popularitySorting) {
                this.products.sort((a, b) => {
                    return b.popularity - a.popularity;
                });
            }
            if (this.sort.newestSorting) {
                this.products.sort((a, b) => {
                    return Number(b.newest) - Number(a.newest);
                });
            }
            return this.products;
        },
    },
    mounted() {
        this.GET_PRODUCTS_FROM_API();
        window.addEventListener("resize", this.setWindowWidth.bind(this), true);
    },
};
</script>

<style lang="sass">
body
    padding-bottom: 50px
.products
    &__container
        @include dFlex(space-between, stretch)
        padding: 0 64px
    &__aside
        flex-basis: 200px
    &__content
        flex-basis: 77.495%
    &__header
        color: #1F2020
        @include dFlex(space-between, center)
    &__wrapper
        display: grid
        grid-template-columns: repeat(5, 19.1117%)
        justify-content: space-between
    &__filters-btn
        display: none
@media(max-width: 1367px)
    .products
        &__wrapper
            grid-template-columns: repeat(4, 24%)
@media(max-width: 1280px)
    .products
        &__container
            padding: 0 32px
        &__content
            flex-basis: 80%
@media(max-width: 990px)
    .products
        &__wrapper
            grid-template-columns: repeat(3, 31%)
@media(max-width: 768px)
    .products
        &__container
            padding: 0 24px
        &__content
            flex-basis: 100%

        &__number
            display: none
        &__filters-btn
            display: block
            color: #1F2020
            @include fontCfg(12px, 125%, 500, 0.06em)
            text-transform: uppercase
@media(max-width: 540px)
    .products
        &__wrapper
            grid-template-columns: repeat(2, 48%)

@include productCardBorder
</style>
