<template>
    <div class="cart__footer">
        <div class="cart__sum">
            <span class="cart__sum-headline">Итого</span>
            <span class="cart__sum-number" v-html="sumString"></span>
        </div>
        <button :class="{'cart__checkout_disabled': sum === 0}" class="cart__checkout">Оформить заказ</button>
    </div>
</template>

<script>
export default {
    props: {
        sum: {
            type: Number,
            default(){
                return 0;
            }
        },

    },
    computed: {
        sumString() {
            return this.sum.toLocaleString();
        }
    }
}
</script>

<style lang="sass">
.cart
    &__footer 
        @include dFlex(space-between, center)
        font-size: 16px
        color: #1F2020
    &__sum
        &-headline
            @include fontCfg(1em, 100%, normal, unset)
            margin-bottom: 0.375em
            display: block
        &-number
            @include fontCfg(1.875em, 100%, 500, -0.02em)
            display: block
    &__checkout
        text-transform: uppercase
        @include fontCfg(0.75em, 125%, 500, 0.06em)
        padding: 1.6667em
        background: #7BB899
        border-radius: 4px
        flex-basis: 20em
        &_disabled
            pointer-events: none
            opacity: 0.5

</style>