<template>
    <header class="header">
        <button class="header__burger-btn" @click="setState" :class="{'header__burger-btn_active': state}">
            <svg
                class="header__burger-img"
                width="24"
                height="14"
                viewBox="0 0 24 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
            >
                <title>Меню</title>
                <rect
                    class="header__burger-elem header__burger-elem_top"
                    width="24"
                    height="2"
                    fill="#1F2020"
                />
                <rect
                    class="header__burger-elem header__burger-elem_middle"
                    y="6"
                    width="24"
                    height="2"
                    fill="#1F2020"
                />
                <rect
                    class="header__burger-elem header__burger-elem_bottom"
                    y="12"
                    width="24"
                    height="2"
                    fill="#1F2020"
                />
            </svg>
        </button>
        <Logo class="header__logo"></Logo>
        <div class="header__wrapper header__wrapper_full-size">
            <HeaderNav class="header__nav" :links="links"></HeaderNav>
            <HeaderContacts class="header__contacts"></HeaderContacts>
            <HeaderMenu
                :cart-quantity="CART_LENGTH"
                class="header__menu"
            ></HeaderMenu>
        </div>
        <NuxtLink class="header__cart-link" to="/cart" :title="'Корзина; товаров' + CART_LENGTH">{{ CART_LENGTH }}</NuxtLink>
    </header>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            links: {
                0: {
                    name: "Продукты",
                    href: "#",
                },
                1: {
                    name: "Цвета",
                    href: "#",
                },
                2: {
                    name: "Вдохновение",
                    href: "#",
                },
                3: {
                    name: "Советы",
                    href: "#",
                },
                4: {
                    name: "Найти магазин",
                    href: "#",
                },
            },
            state: false,
        };
    },
    computed: {
        ...mapGetters(["CART_LENGTH", "CART"]),
    },
    methods: {
        setState(){
            this.state = !this.state;
        }
    }
};
</script>

<style lang="sass">
.header
    @include dFlex(space-between, center)
    background: #fff
    padding: 36px 64px
    color: #1f2020
    position: fixed
    top: 0
    left: 0
    width: 100% 
    z-index: 10
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25)
    &__burger-btn, &__cart-link
        display: none
    &__logo
        max-width: 131px
    &__wrapper
        @include dFlex(space-between, center)
        flex-basis: 77.604%
    &__contacts
        margin-left: auto
        margin-right: 7.785%
        font-size: 16px
@media (max-width: 1280px)
    .header
        padding: 15px 32px
        &__logo
            max-width: 115px
        &__wrapper
            flex-basis: 79.99%
            display: grid
            grid-template-areas: "header-nav header-menu" "header-nav header-contacts"
            grid-template-columns: auto 140px
            grid-row-gap: 15px
        &__nav
            grid-area: header-nav
        &__contacts
            margin-right: 5%
            font-size: 14px
            grid-area: header-contacts
        &__menu
            grid-area: header-menu
            justify-self: end
@media(max-width: 990px)
    .header
        &__contacts
            font-size: 13px
@media(max-width: 768px)
   
    .header
        padding: 21px 24px
        &__logo
            z-index: 1
        &__wrapper
            opacity: 0
            position: absolute
            width: 100%
            height: 100vh
            left: 0
            top: 0
            padding: 50px 32px
            background: #fff
            grid-template-areas: "header-nav" "header-menu" "header-contacts"
            grid-template-columns: 100%
            grid-template-rows: auto min-content min-content
            pointer-events: none
            visibility: hidden

        &__burger-btn
            display: block
            position: relative
            z-index: 1
            &_active
                .header__burger-elem
                    &_top
                        transform: translateY(45%) rotate(-45deg) translateX(2px)
                    &_middle
                        transform: scale(0)
                    &_bottom
                        transform: translateY(-45%) rotate(45deg) translateX(2px)
                &~.header__wrapper
                
                    pointer-events: all 
                    visibility: visible
                    animation: showOpacity 0.5s ease 1 forwards
        &__burger-img
            overflow: hidden
        &__burger-elem
            transform-origin: center
            transition: 0.3s all ease
        &__contacts
            font-size: 16px
            justify-self: start
            margin-left: 0
            margin-right: 0
        &__menu
           justify-self: start
        &__cart-link
            
            font-size: 12px
            height: 20px
            width: 20px
            border-radius: 50%
            background: #7BB899
            @include dFlex(center, center)

</style>