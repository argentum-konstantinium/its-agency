<template>
    <div class="contacts">
        <a href="tel:+74952217769" title="Позвонить" class="contacts__link contacts__link_phone">+7 (495) 221-77-69</a>
        <a href="#" class="contacts__link contacts__link_text">Заказать звонок</a>
    </div>    
</template>

<script>
export default {
    
}
</script>

<style lang="sass">
 
.contacts
    &__link
        display: block
        &_phone
            @include fontCfg(1em, 100%, 500, -0.02em)
        &_text
            @include fontCfg(0.875em, 100%, 400)
            opacity: 0.3
            margin-top: 0.14285em
@media(max-width: 768px)
    .contacts 
        &__link
            &:not(:last-child)
                margin-bottom: 0.5em
</style>