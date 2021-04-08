<template>
  
        <Slider :options="options" :elemsClass="elemsClass">
            <slot slot="prev-btn">
                <svg
                    class="promo-slider__icon promo-slider__icon_prev"
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M50 60L30 40L50 20"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </slot>
            <slot slot="slides">
                <PromoSlide
                    v-for="(item, indexImg) in slidesImg"
                    :key="indexImg"
                    :src="require('~/assets/img/slider/' + item.img)"
                    :alt="indexImg"
                >
                    <slot slot="content">
                        <div class="promo-slide__content">
                            <h2 class="promo-slide__headline">
                                Краски {{ indexImg }}
                            </h2>
                             
                            <p class="promo-slide__descr">
                                Идеально подходят для стен и других
                                поверхностей. Найди свой идеальный цвет!
                            </p>
                        </div>
                    </slot>
                </PromoSlide>
            </slot>
            <slot slot="next-btn">
                <svg
                    class="promo-slider__icon promo-slider__icon_next"
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M30 60L50 40L30 20"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </slot>
        </Slider>
 
</template>

<script>
export default {
    data() {
        return {
            options: {
                autoplay: true,
                timeout: 3000,
                speed: 700,
                easing: "ease",
                pagination: true,
            },
            elemsClass: {
                slider: "promo-slider products__promo-slider",
                slides: {
                    active: "promo-slider__slide_active",
                },
                buttonsClass: {
                    common: "promo-slider__btn",
                    next: "promo-slider__btn_next",
                    prev: "promo-slider__btn_prev",
                },
                pagination: {
                    common: "promo-slider__pagination",
                    buttons: "promo-slider__pagination-btn",
                    activeButton: "promo-slider__pagination-btn_active",
                },
            },
            slidesImg: {
                slide1: {
                    img: "slide-1.png",
                },
                slide2: {
                    img: "slide-1.png",
                },
                slide3: {
                    img: "slide-1.png",
                },
                slide4: {
                    img: "slide-1.png",
                },
                slide5: {
                    img: "slide-1.png",
                },
                slide6: {
                    img: "slide-1.png",
                },
                slide7: {
                    img: "slide-1.png",
                },
            },
        };
    },
};
</script>

<style lang="sass">
.promo-slider
    position: relative
    &__btn
        position: absolute
        top: 50%
        transform: translateY(-50%) scale(0.8)
        z-index: 1
        transition: transform 0.2s ease-in-out
        &:hover
            transform: translateY(-50%) scale(1)

        &_prev
            left: 20.312%

        &_next
            right: 20.312%
    &__icon
        @include fluidImg
    &__pagination
        position: absolute
        bottom: 6.964%
        z-index: 1
        max-width: 124px
        left: 0
        right: 0
        margin: 0 auto
        width: 100%
        padding: 13px 24px
        font-size: 0
        background: rgba(0, 0, 0, 0.4)
        border-radius: 16px
        ul
            @include dFlex(space-between, center)
    &__pagination-btn
        width: 6px
        height: 6px
        border-radius: 50%
        background: #fff
        opacity: 0.2
        transition: opacity 0.3s linear
        &[data-focus-visible]
            box-shadow: 0 0 0 3px yellow
        &_active
            opacity: 1

.promo-slide
    position: relative
    width: 100%
    &__content
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        color: #fff
        @include dFlex(center, center)
        flex-direction: column
        font-size: 72px
    &__headline
        @include fontCfg(1em, 88%, normal, -0.02em)
    &__descr
        margin-top: 1.5em
        max-width: 29.5em
        text-align: center
        @include fontCfg(0.222222em, 130%, 500, 0.02em)
</style>