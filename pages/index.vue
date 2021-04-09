<template>
    <div class="">
        <Header></Header>
        <Main></Main>
        <NuxtChild></NuxtChild>
        <NuxtLink to="/cart">dick</NuxtLink>
    </div>
</template>

<script>
 
 
export default {
    path: '/',
    mounted() {
        window.FocusVisible('data-focus-visible')
    }
};
</script>

<style lang='sass'>
@import '~/assets/sass/main.sass'
</style>
