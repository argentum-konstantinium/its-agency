<template>
    <main class="main">
        <section class="products">
            <PromoSlider></PromoSlider>
            <Aside class="products__aside"></Aside>
            <Products class="products__container"></Products>
        </section>
    </main>
</template>

<script>
export default {};
</script>

<style lang="sass">
.products
    display: grid
    grid-template-areas: "promo-slider promo-slider" "aside products-list"
    grid-template-columns: 22.5% 77.5%
    &__promo-slider
        grid-area: promo-slider
        margin-bottom: 72px
    &__aside
        grid-area: aside
        padding-left: 64px
    &__container
        grid-area: products-list
        padding-right: 64px
</style>

