<template>
    <header class="header">
        <Logo class="header__logo"></Logo>
        <div class="header__wrapper">
            <Nav class="header__nav" :links="links"></Nav>
            <Contacts class="header__contacts"></Contacts>
            <Menu class="header__menu"></Menu>
        </div>
    </header>
</template>
<script>
export default {
    data() {
        return {
            links: {
                0: {
                    name: "Продукты",
                    href: "#",
                },
                1: {
                    name: "Цвета",
                    href: "#",
                },
                2: {
                    name: "Вдохновение",
                    href: "#",
                },
                3: {
                    name: "Советы",
                    href: "#",
                },
                4: {
                    name: "Найти магазин",
                    href: "#",
                },
            },
        };
    },
};
</script>

<style lang="sass">
 
.header
    @include dFlex(space-between, center)
    background: #fff
    padding: 36px 64px
    color: #1f2020
    &__logo
        max-width: 131px
    &__wrapper
        @include dFlex(space-between, center)
        flex-basis: 1490px
    &__contacts
        margin-left: auto
        margin-right: 7.785%
</style>