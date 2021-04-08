<template>
    <label class="checkbox-label" :class="labelClass">
        <input class="checkbox-label__checkbox" :class="checkboxClass" type="checkbox" :value="value" :name="name">
        <span class="checkbox-label__custom-elem checkbox-label__custom-elem_relative">
            <span class="checkbox-label__custom-elem checkbox-label__custom-elem_children"></span>
        </span>
        <span class="checkbox-label__text" v-html="text"></span>
    </label>
</template>

<script>
export default {
    props: {
        checkboxClass: String,
        labelClass: String,
        text: String,
        name: String,
        value: String,
    }
}
</script>

<style lang="sass">
.checkbox-label 
    @include dFlex(flex-start, center)
    cursor: pointer
    &__checkbox
        @include invisibleCheckbox
        &:checked
            & ~ .checkbox-label__custom-elem_relative
                    background: #7BB899
                    .checkbox-label__custom-elem_children
                        transform: translateX(14px)
        &[data-focus-visible] ~ .checkbox-label__custom-elem_relative
            box-shadow: 0 0 0 3px rgba(43, 216, 144, 0.781)
    &__text
        @include fontCfg(12px, 100%, normal)
        text-transform: uppercase
        margin-left: 1em
        color: #1F2020
    &__custom-elem
        display: block
        &_relative
            background: #F2F2F2
            border-radius: 40px
            max-width: 36px
            width: 100% 
            padding: 7px
            transition: background 0.2s ease-in-out
        &_children
            background: #1F2020
            border-radius: 50%
            width: 8px
            height: 8px
            transition: transform 0.2s ease-in-out
</style>