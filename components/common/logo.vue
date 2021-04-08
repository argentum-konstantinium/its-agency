<template>
    <div class="logo">
        <img src="~/assets/img/common/logo.svg" class="logo__img" alt="Логотип" />
    </div>
</template>

<script>
export default {
    name: "logo",
};
</script>

<style lang="sass">
@import '~/assets/sass/mixins.sass'
.logo
    &__img
        @include fluidImg
</style>