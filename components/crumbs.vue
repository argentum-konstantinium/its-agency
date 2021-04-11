<template>
    <ul class="crumbs">
        <li class="crumbs__item" v-for="(item, index) in crumbs" :key="index">
            <a class="crumbs__link" :href="item.link">{{item.name}}</a>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        crumbs: Array,
    }
}
</script>

<style lang="sass">
.crumbs
    @include dFlex(space-between, center)
    width: fit-content
    &__item
        position: relative
        opacity: 0.3
        @include fontCfg(10px, 100%, normal, 0.06em)
        display: block
        transition: 0.2s opacity ease-in
        &:hover
            opacity: 1
        &:not(:first-child)::before
            position: absolute
            content: ''
            border-radius: 50%
            background: #C4C4C4
            width: 3px
            height: 3px
            left: -0.8em
            top: 50%
            transform: translateY(-50%) translateX(-50%)
        &:not(:last-child) 
            margin-right: 1.9em
    &__link
        text-transform: uppercase
        color: #fff
@media(max-width: 768px)
    .crumbs
        &__link
            color: #1F2020
            
</style>