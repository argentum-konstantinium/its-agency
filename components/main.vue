<template>
    <main class="main">
        <section class="products">
            <PromoSlider/>
            <Products/>
        </section>
    </main>
</template>

<script>
export default {};
</script>

<style lang="sass">
.products
    display: grid
    grid-template-columns: 100%
    &__promo-slider
        margin-bottom: 72px
</style>

