<template>
    <nav class="nav">
        <ul class="nav__list">
            <li v-for="(item, index) in links" :key="index" class="nav__item">
                <a :title="item.name" :href="item.href" class="nav__link">{{ item.name }}</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        links: Object,
    },
};
</script>

<style lang="sass">
@import '~/assets/sass/mixins.sass'
.nav
    &__list
        @include dFlex(flex-start, center)
        @include fontCfg(14px, 125%, 400)
        text-transform: uppercase
        
    &__item
        &:not(:last-child)
            margin-right: 1.7143em
@media(max-width: 1440px)
    .nav 
        &__list
            font-size: 12px
@media(max-width: 990px)
    .nav 
        &__list
            font-size: 11px
        &__item
            &:not(:last-child)
                margin-right: 1em
@media(max-width: 768px)
    .nav 
        max-width: 300px
        &__list
            display: block
            font-size: 14px
        &__item
            &:not(:last-child)
                margin-bottom: 1em
                margin-right: 0
</style>