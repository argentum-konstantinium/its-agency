<template>
    <main class="main">
        <section class="products">
            <Crumbs class="products__crumbs" :crumbs="crumbs"/>
            <PromoSlider v-if="(windowWidth > 768)" />
                <h2 class="products__headline">Краски</h2>
            <Products />
        </section>
    </main>
</template>

<script>
export default {
    data() {
        return {
            windowWidth: 0,
            crumbs: [
                {
                    link: '#',
                    name: 'Главная'
                },
                {
                    link: '#',
                    name: 'Продукты'
                },
                {
                    link: '#',
                    name: 'Краски'
                }
            ],
        };
    },
    mounted() {
        this.windowWidth = window.innerWidth;
        window.addEventListener("resize", () => {
            this.windowWidth = window.innerWidth;
        });
    },
};
</script>

<style lang="sass">
.main
    
    position: relative
.products
    display: grid
    grid-template-columns: 100%
    &__headline
        display: none
    &__crumbs
        margin-left: 64px
        position: absolute
        top: 32px
        z-index: 1
    &__promo-slider
        margin-bottom: 72px
@media(max-width: 1280px)
       
    .products
        &__crumbs
            margin-left: 32px
@media(max-width: 768px)
    .products
        &__crumbs
            margin-left: 24px
            margin-top: 17px
            position: static
        &__headline
            display: block
            @include fontCfg(36px, 88%, normal, -0.04em)
            color: #1F2020
            padding: 0 24px
            margin-top: 48px
            margin-bottom: 50px
</style>

