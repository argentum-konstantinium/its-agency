<template>
    <div class="product-card">
        <div class="product-card__img-wrapp">
            <img :src="require('~/assets/img/products/' + productData.img)" :alt="productData.name" class="product-card__img" />
        </div>
        <div class="product-card__body">
            <h3 class="product-card__name" v-html="productData.name"></h3>
            <div class="product-card__footer">
                <span class="product-card__cost" v-html="productData.cost + ' ₽'"></span>
                <button @click="sendAddEvent" class="product-card__add-btn">
                    <svg
                        class="product-card__add-icon"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                    >
                        <title>Добавить</title>
                        <path
                            d="M10 4.16663V15.8333"
                            stroke="#1F2020"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M4.16699 10H15.8337"
                            stroke="#1F2020"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        productData: {
            type: Object,
            default() {
                return {};
            },
        }
    },
    methods: {
        sendAddEvent() {
            this.$emit('addToCart', this.productData);
        }
    },
    mounted() {
         
    }
};
</script>

<style lang="sass">
.product-card
    font-size: 16px
    padding: 0 0 1em
    margin-top: 1em
    &:hover
        background: rgba(0, 0, 0, 0.025)
        background-clip: padding-box
    &__img-wrapp
        max-width: 278px

    &__img
        @include fluidImg
    &__body
        padding: 0 1em
    &__name
        @include fontCfg(1em, 112%, 300, 0.02em)
        margin-top: 1em
    &__cost
        @include fontCfg(1em, 100%, 600, auto)
    &__footer
        @include dFlex(space-between, center)
        margin-top: 1em
    &__add-btn
        flex-basis: 80px
        border-radius: 8px
        padding: 6px 10px
        transition: background 0.2s ease-in-out
        z-index: 1
        &:hover
            background: #7BB899
    &__add-icon
        @include fluidImg
</style>