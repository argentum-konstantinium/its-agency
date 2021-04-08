<template>
    <div class="">
        <Header></Header>
        <Main></Main>
    </div>
</template>

<script>
 
 
export default {
    mounted() {
        window.FocusVisible('data-focus-visible')
    }
};
</script>

<style lang='sass'>
@import '~/assets/sass/main.sass'
</style>
