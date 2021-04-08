<template>
    <div class="menu">
        <button aria-label="Поиск" class="menu__btn">
            <svg
                role="img"
                class="menu__icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>Поиск</title>
                <path
                    d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                    stroke="#1F2020"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M17.5 17.5L13.875 13.875"
                    stroke="#1F2020"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </button>
        <button aria-label="Личный кабинет" class="menu__btn">
            <svg
                role="img"
                class="menu__icon"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>Личный кабинет</title>
                <g clip-path="url(#clip0)">
                    <circle
                        cx="11"
                        cy="23"
                        r="8.4"
                        stroke="black"
                        stroke-width="1.2"
                    />
                    <circle
                        cx="11"
                        cy="7"
                        r="3.4"
                        stroke="black"
                        stroke-width="1.2"
                    />
                </g>
                <defs>
                    <clipPath id="clip0">
                        <rect width="22" height="22" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </button>
        <button aria-label="Избранное" class="menu__btn">
            <svg
                role="img"
                class="menu__icon"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>Избранное</title>
                <path
                    d="M11.0009 19C10.745 19.0001 10.4978 18.9074 10.3052 18.739C9.57966 18.1047 8.87674 17.5067 8.25817 16.9802C6.65691 15.7048 5.16127 14.3023 3.78581 12.7865C2.67695 11.5918 2.0423 10.0341 2.00085 8.4053C1.97621 6.99164 2.48598 5.62067 3.42845 4.56595C3.88583 4.0681 4.44256 3.67154 5.06275 3.40184C5.68294 3.13214 6.35283 2.9953 7.0292 3.00012C8.05552 2.99541 9.053 3.3392 9.8581 3.97514C10.2942 4.31625 10.6791 4.71815 11.0009 5.16854C11.3231 4.71841 11.7082 4.31682 12.1446 3.97605C12.9489 3.34036 13.9453 2.99628 14.9708 3.00012C15.6472 2.9953 16.3171 3.13214 16.9372 3.40184C17.5574 3.67154 18.1142 4.0681 18.5715 4.56595C19.514 5.62067 20.0238 6.99164 19.9991 8.4053C19.9585 10.0337 19.3249 11.5915 18.2169 12.7865C16.8425 14.3013 15.3481 15.7028 13.7482 16.9775C13.1287 17.5049 12.4267 18.1029 11.6975 18.7399C11.5045 18.9081 11.257 19.0005 11.0009 19V19Z"
                    stroke="black"
                    stroke-width="1.2"
                />
            </svg>
        </button>
        <button
            aria-label="Корзина"
            class="menu__btn menu__btn_cart"
        >
            <span title="Корзина; товаров: 4" role="img">4</span>
        </button>
    </div>
</template>

<style lang="sass">
@import '~/assets/sass/mixins.sass'
.menu
    @include dFlex(flex-start, center)
    &__btn
        display: block
        &:not(:last-child)
            margin-right: 24px
        &_cart
            @include fontCfg(12px, 125%, 500)
            background: #7BB899
            border-radius: 50%
            width: 2em
            height: 2em
            span
                display: inline-flex
                align-items: center
                justify-content: center
                width: 100%
                height: 100%
                
    &__icon
        @include fluidImg
</style>