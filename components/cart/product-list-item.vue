<template>
    <li class="product-item">
        <div
            :class="{ 'product-item__body_removed': removed }"
            class="product-item__body"
        >
            <div class="product-item__img-wrapp">
                <img
                    :src="require('~/assets/img/products/' + productData.img)"
                    :alt="productData.name"
                    class="product-item__img"
                />
            </div>
            <div class="product-item__text-content">
                <h3 class="product-item__name" v-html="productData.name"></h3>
                <div
                    class="product-item__cost"
                    v-html="productData.cost * productData.quantity + ' ₽'"
                ></div>
            </div>
            <div class="product-item__control">
                <button
                    class="product-item__control-btn product-item__control-btn_add"
                    @click="subQuantity"
                >
                    <svg
                        class="product-item__control-icon product-item__control-icon_add"
                        role="img"
                        width="12"
                        height="2"
                        viewBox="0 0 12 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Уменьшить количество товара</title>
                        <path
                            d="M1.3335 1H10.6668"
                            stroke="black"
                            stroke-width="1.4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
                <span class="product-item__number">{{ quantity }}</span>
                <button
                    class="product-item__control-btn product-item__control-btn_sub"
                    @click="addQuantity"
                >
                    <svg
                        class="product-item__control-icon product-item__control-icon_sub"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Увеличить количество товара</title>

                        <path
                            d="M8 3.33325V12.6666"
                            stroke="black"
                            stroke-width="1.4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M3.3335 8H12.6668"
                            stroke="black"
                            stroke-width="1.4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>

        <button
            v-if="!removed"
            @click="thisRemove"
            class="product-item__remove"
        >
            <svg
                role="img"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>Убрать товар</title>
                <g opacity="0.2">
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
                </g>
            </svg>
        </button>
        <button
            v-if="removed"
            @click="thisRepeat"
            class="product-item__remove"
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
            >
                <title>Восстановить</title>
                <path
                    d="M17 1L21 5L17 9"
                    stroke="black"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M3 11V9C3 7.93913 3.42143 6.92172 4.17157 6.17157C4.92172 5.42143 5.93913 5 7 5H21"
                    stroke="black"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M7 23L3 19L7 15"
                    stroke="black"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M21 13V15C21 16.0609 20.5786 17.0783 19.8284 17.8284C19.0783 18.5786 18.0609 19 17 19H3"
                    stroke="black"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </button>
    </li>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props: {
        productData: {
            type: Object,
            default() {
                return {};
            },
        },
        clearCart: false,
        quantity: Number,
        removed: false
    },
    computed: {},
    methods: {
        ...mapActions([
            "SUB_PRODUCT_QUANTITY",
            "ADD_PRODUCT_QUANTITY",
            "ADD_PRODUCT_TO_REMOVE",
            'CANCEL_REMOVE'
        ]),
        subQuantity() {
            if (this.quantity === 1) {
                return;
            } else {
                this.SUB_PRODUCT_QUANTITY(this.productData);
            }
        },
        addQuantity() {
            this.ADD_PRODUCT_QUANTITY(this.productData);
        },
        thisRemove() {
             
            this.ADD_PRODUCT_TO_REMOVE(this.productData);
        },
        thisRepeat() {
          
            this.CANCEL_REMOVE(this.productData);
        },
    },
    mounted() {},
};
</script>

<style lang="sass">
.product-item
    @include dFlex(space-between, center)
    font-size: 16px
    padding-bottom: 0.75em
    padding-top: 0.75em
    &:not(:last-child)
        border-bottom: 1px solid rgba(0, 0, 0, 0.1)

    &__img-wrapp
        width: 6em
        height: 6em
    &__img
        @include fluidImg
    &__body
        @include dFlex(flex-start, center)
        transition: opacity 0.3s ease-in
        &_removed
            opacity: 0.2
            pointer-events: none
    &__text-content
        flex-basis: 10.3125em
        margin-left: 0.5em

    &__name
        @include fontCfg(1em, 112%, 300, 0.02em)

        margin-bottom: 1em
    &__cost
        @include fontCfg(1em, 100%, 600, unset)
    &__control
        @include dFlex(space-between, stretch)
        flex-basis: 128px
        margin-left: auto
    &__control-btn
        @include dFlex(center, center)
        flex-basis: 2.5em
        background: #F2F2F2
        border-radius: 0.25em
        transition: background 0.2s ease-in-out
        padding: 0.25em
        &:hover
            background: #7BB899

    &__control-icon
        @include fluidImg
</style>